"""Streamlit entry point for SonicSummary.

The React/shadcn-style interface is bundled by ``npm run build`` and mounted
inside Streamlit. Scraping, Groq summarization, and ElevenLabs run in this
Python process; no FastAPI server is needed for the Streamlit deployment.
"""

from __future__ import annotations

import asyncio
import base64
import json
import logging
import os
import tempfile
from pathlib import Path
from typing import Any

import streamlit as st


ROOT = Path(__file__).resolve().parent
ASSET_DIR = ROOT / "web" / "build"
logger = logging.getLogger("sonicsummary.streamlit")


def _configure_streamlit_secrets() -> None:
    """Expose supported Streamlit secrets to existing env-based modules."""
    secret_names = (
        "GROQ_API_KEY",
        "API_TOKEN",
        "WEB_UNLOCKER_ZONE",
        "BRIGHTDATA_API_KEY",
        "BRIGHTDATA_WEB_UNLOCKER_ZONE",
        "ELEVEN_API_KEY",
        "ELEVENLABS_API_KEY",
    )
    for name in secret_names:
        if os.getenv(name):
            continue
        try:
            value = st.secrets.get(name)
        except (FileNotFoundError, RuntimeError):
            value = None
        if value:
            os.environ[name] = str(value)
    if os.getenv("ELEVENLABS_API_KEY") and not os.getenv("ELEVEN_API_KEY"):
        os.environ["ELEVEN_API_KEY"] = os.environ["ELEVENLABS_API_KEY"]


def _load_component_assets() -> tuple[str, str]:
    js_path = ASSET_DIR / "index.js"
    css_path = ASSET_DIR / "styles.css"
    if not js_path.is_file() or not css_path.is_file():
        raise FileNotFoundError(
            "The Streamlit UI assets are missing. From the web folder, run "
            "`npm install` and `npm run build` before starting Streamlit."
        )
    return js_path.read_text(encoding="utf-8"), css_path.read_text(encoding="utf-8")


def _register_component():
    js, css = _load_component_assets()
    # Streamlit versions differ in how inline CSS is classified by the v2
    # component resolver. Inject the trusted, locally built stylesheet from
    # the JS module so this remains an inline component without a package
    # manifest or file-backed CSS registration.
    css_bootstrap = f"""
const sonicSummaryStyleId = "sonicsummary-component-styles";
if (!document.getElementById(sonicSummaryStyleId)) {{
  const sonicSummaryStyle = document.createElement("style");
  sonicSummaryStyle.id = sonicSummaryStyleId;
  sonicSummaryStyle.textContent = {json.dumps(css)};
  document.head.appendChild(sonicSummaryStyle);
}}
"""
    return st.components.v2.component(
        name="sonicsummary_react_ui",
        html='<div id="sonic-summary-root"></div>',
        js=f"{css_bootstrap}\n{js}",
        isolate_styles=False,
    )


async def _collect_sources(topics: list[str], source_type: str) -> tuple[dict[str, Any], dict[str, Any]]:
    # Import after Streamlit secrets have been copied into the environment.
    from utils import collect_selected_sources

    return await collect_selected_sources(topics, source_type)


def _generate_audio(topics: list[str], source_type: str) -> bytes:
    if source_type not in {"news", "reddit", "both"}:
        raise ValueError("Choose News, Reddit, or both as the source.")
    if not topics or len(topics) > 3 or any(not topic.strip() for topic in topics):
        raise ValueError("Add between one and three valid topics.")

    news_data, reddit_data = asyncio.run(_collect_sources(topics, source_type))
    from utils import generate_broadcast_news, text_to_audio_elevenlabs_sdk, tts_to_audio

    script = generate_broadcast_news(
        api_key=os.getenv("GROQ_API_KEY"),
        news_data=news_data,
        reddit_data=reddit_data,
        topics=topics,
    )
    if not script or not script.strip():
        raise RuntimeError("Groq returned an empty audio script.")

    # Streamlit Cloud filesystems are ephemeral; a temporary directory avoids
    # accumulating audio files between sessions.
    with tempfile.TemporaryDirectory(prefix="sonicsummary-") as temp_dir:
        try:
            audio_path = text_to_audio_elevenlabs_sdk(
                text=script,
                voice_id="JBFqnCBsd6RMkjVDRZzb",
                model_id="eleven_multilingual_v2",
                output_format="mp3_44100_128",
                output_dir=temp_dir,
            )
        except Exception as exc:
            logger.warning(
                "ElevenLabs failed (%s); falling back to Google Text-to-Speech",
                type(exc).__name__,
            )
            audio_path = tts_to_audio(script, output_dir=temp_dir)
        path = Path(audio_path)
        if not path.is_file():
            raise RuntimeError("ElevenLabs did not create an audio file.")
        return path.read_bytes()


def _initialize_session() -> None:
    st.session_state.setdefault("sonic_status", "idle")
    st.session_state.setdefault("sonic_error", "")
    st.session_state.setdefault("sonic_audio", "")
    st.session_state.setdefault("sonic_topics", [])
    st.session_state.setdefault("sonic_source", "both")
    st.session_state.setdefault("sonic_request", None)


def main() -> None:
    st.set_page_config(page_title="SonicSummary", page_icon="🎧", layout="wide")
    _configure_streamlit_secrets()
    _initialize_session()

    st.markdown(
        """
        <style>
          #MainMenu, [data-testid="stHeader"], [data-testid="stFooter"] { display: none; }
          [data-testid="stAppViewContainer"] { background: #f7f7fc; }
          [data-testid="stMainBlockContainer"] { padding: 0 0.75rem; max-width: 100%; }
          [data-testid="stVerticalBlock"] { gap: 0; }
        </style>
        """,
        unsafe_allow_html=True,
    )

    try:
        sonic_ui = _register_component()
    except FileNotFoundError as exc:
        st.error(str(exc))
        st.code("cd web\nnpm install\nnpm run build\ncd ..\nstreamlit run frontend.py", language="powershell")
        return

    view_data = {
        "status": st.session_state.sonic_status,
        "error": st.session_state.sonic_error,
        "audioDataUrl": st.session_state.sonic_audio,
        "topics": st.session_state.sonic_topics,
    }
    component_result = sonic_ui(
        key="sonicsummary_main",
        data=view_data,
        default={},
        on_generate_change=lambda: None,
        width="stretch",
        height=1120,
    )

    request = component_result.generate
    if isinstance(request, dict) and request.get("requestId"):
        request_id = str(request["requestId"])
        if request_id != st.session_state.sonic_request:
            st.session_state.sonic_request = request_id
            st.session_state.sonic_topics = request.get("topics", [])
            st.session_state.sonic_source = request.get("source", "both")
            st.session_state.sonic_status = "loading"
            st.session_state.sonic_error = ""
            st.session_state.sonic_audio = ""
            st.rerun()

    if st.session_state.sonic_status == "loading":
        try:
            audio_bytes = _generate_audio(
                st.session_state.sonic_topics,
                st.session_state.sonic_source,
            )
            st.session_state.sonic_audio = "data:audio/mpeg;base64," + base64.b64encode(audio_bytes).decode("ascii")
            st.session_state.sonic_status = "done"
        except Exception as exc:
            logger.error("Audio briefing generation failed (%s)", type(exc).__name__)
            st.session_state.sonic_error = str(exc) or "The briefing could not be created. Please try again."
            st.session_state.sonic_status = "error"
        st.rerun()


if __name__ == "__main__":
    main()
