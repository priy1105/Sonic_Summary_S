from urllib.parse import quote_plus
from dotenv import load_dotenv
import requests
import os
from fastapi import FastAPI, HTTPException
from bs4 import BeautifulSoup
import os
from groq import Groq
from fastapi import HTTPException
import ollama
from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage, HumanMessage
from datetime import datetime
from elevenlabs import ElevenLabs
import warnings
from bs4 import XMLParsedAsHTMLWarning

load_dotenv()



class MCPOverloadedError(Exception):
    """Custom exception for MCP service overloads"""
    pass

def generate_valid_news_url(keyword: str) -> str:
    """Generate a Google News RSS search URL (No CAPTCHAs, pure XML data)"""
    q = quote_plus(keyword)
    return f"https://news.google.com/rss/search?q={q}&hl=en-US&gl=US&ceid=US:en"

## def generate_valid_news_url(keyword: str) -> str:
##     """
##     Generate a Google News search URL for a keyword with optional sorting by latest
##     
##     Args:
##         keyword: Search term to use in the news search
##         
##     Returns:
##         str: Constructed Google News search URL
##     """
##     q = quote_plus(keyword)
##     return f"https://news.google.com/search?q={q}&tbm=nws&tbs=sbd:1"


def generate_news_urls_to_scrape(list_of_keywords):
    valid_urls_dict = {}
    for keyword in list_of_keywords:
        valid_urls_dict[keyword] = generate_valid_news_url(keyword)
    
    return valid_urls_dict


def scrape_with_brightdata(url: str, target_headers: dict[str, str] | None = None) -> str:
    """Scrape a URL using BrightData"""
    # Keep compatibility with the environment names used by the original
    # Bright Data MCP scraper, which may still hold the working Web Unlocker zone.
    api_key = os.getenv("API_TOKEN") or os.getenv("BRIGHTDATA_API_KEY")
    zone = os.getenv("WEB_UNLOCKER_ZONE") or os.getenv("BRIGHTDATA_WEB_UNLOCKER_ZONE")
    if not api_key or not zone:
        raise ValueError(
            "Bright Data credentials are missing. Set API_TOKEN and WEB_UNLOCKER_ZONE "
            "or BRIGHTDATA_API_KEY and BRIGHTDATA_WEB_UNLOCKER_ZONE."
        )

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    payload = {
        "zone": zone,
        "url": url,
        "format": "raw"
    }
    # Bright Data forwards these headers to the target site. Keep this optional
    # so existing news scraping calls retain their current behavior.
    if target_headers:
        payload["headers"] = target_headers
    
    try:
        response = requests.post(
            "https://api.brightdata.com/request",
            json=payload,
            headers=headers,
            timeout=60,
        )
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"BrightData error: {str(e)}")

def clean_html_to_text(html_content: str) -> str:
    """Pass the raw XML directly to the headline extractor"""
    return html_content


def extract_headlines(xml_content: str) -> str:
    """Extract headlines directly from Google News RSS feed XML"""
    warnings.filterwarnings("ignore", category=XMLParsedAsHTMLWarning)
    soup = BeautifulSoup(xml_content, "html.parser")
    headlines = []
    
    # RSS feeds use <item> tags for articles and <title> tags for the headlines
    for item in soup.find_all('item'):
        if item.title:
            title = item.title.get_text(strip=True)
            if title and f"- {title}" not in headlines:
                headlines.append(f"- {title}")
                
        # Limit to the top 10 articles
        if len(headlines) >= 10:
            break
            
    return "\n".join(headlines)


async def collect_selected_sources(topics, source_type):
    """Fetch selected sources independently so one failure cannot cancel another."""
    news_data = {}
    reddit_data = {}

    if source_type in {"news", "both"}:
        try:
            from news_scraper import NewsScraper

            news_data = await NewsScraper().scrape_news(topics)
        except Exception as exc:
            print(f"News collection failed ({type(exc).__name__}): {exc}")
            news_data = {
                "news_analysis": {
                    topic: f"Error: News collection failed ({type(exc).__name__})."
                    for topic in topics
                }
            }

    if source_type in {"reddit", "both"}:
        try:
            from reddit_scraper import scrape_reddit_topics

            reddit_data = await scrape_reddit_topics(topics)
        except Exception as exc:
            print(f"Reddit collection failed ({type(exc).__name__}): {exc}")
            reddit_data = {
                "reddit_analysis": {
                    topic: f"Reddit analysis unavailable: {type(exc).__name__}."
                    for topic in topics
                }
            }

    return news_data, reddit_data

## def clean_html_to_text(html_content: str) -> str:
##     """Pass the raw HTML directly to the headline extractor"""
##     return html_content
## 
## 
## def extract_headlines(html_content: str) -> str:
##     """
##     Extract and concatenate headlines from Google News HTML.
##     
##     Args:
##         html_content: Raw HTML from the news page
##         
##     Returns:
##         str: Combined headlines separated by newlines
##     """
##     soup = BeautifulSoup(html_content, "html.parser")
##     print("\n--- WHAT BRIGHTDATA ACTUALLY SEES ---")
##     print(html_content[:500]) 
##     print("-------------------------------------\n")
##     
##     headlines = []
##     for element in soup.find_all(['h3', 'div']):
##         classes = element.get('class', [])
##         
##         if element.name == 'h3' or element.get('role') == 'heading' or 'MBeuO' in classes:
##             title = element.get_text(strip=True)
##             
##             if title and len(title) > 15 and f"- {title}" not in headlines:
##                 headlines.append(f"- {title}")
##                 
##         if len(headlines) >= 10:
##             break
##             
##     return "\n".join(headlines)

 #   # Target the specific tags Google News uses for titles
 #   for element in soup.find_all(['h3', 'div']):
 #       if element.name == 'h3' or element.get('role') == 'heading':
 #           title = element.get_text(strip=True)
 #           
 #           # Filter out short menu buttons, garbage text, and duplicates
 #           if title and len(title) > 15 and f"- {title}" not in headlines:
 #               headlines.append(f"- {title}")
 #               
 #       # Limit to the top 10 most recent articles
 #       if len(headlines) >= 10:
 #           break
 #           
 #   return "\n".join(headlines)


## 
## def clean_html_to_text(html_content: str) -> str:
##     """Clean HTML content to plain text"""
##     soup = BeautifulSoup(html_content, "html.parser")
##     text = soup.get_text(separator="\n")
##     return text.strip()
## 
## 
## def extract_headlines(cleaned_text: str) -> str:
##     """
##     Extract and concatenate headlines from cleaned news text content.
##     
##     Args:
##         cleaned_text: Raw text from news page after HTML cleaning
##         
##     Returns:
##         str: Combined headlines separated by newlines
##     """
##     headlines = []
##     current_block = []
##     
##     # Split text into lines and remove empty lines
##     lines = [line.strip() for line in cleaned_text.split('\n') if line.strip()]
##     
##     # Process lines to find headline blocks
##     for line in lines:
##         if line == "More":
##             if current_block:
##                 # First line of block is headline
##                 headlines.append(current_block[0])
##                 current_block = []
##         else:
##             current_block.append(line)
##     
##     # Add any remaining block at end of text
##     if current_block:
##         headlines.append(current_block[0])
##     
##     return "\n".join(headlines)


def summarize_with_ollama(headlines) -> str:
    """Summarize content using Groq"""
    prompt = f"""You are my personal news editor. Summarize these headlines into a TV news script for me, focus on important headlines and remember that this text will be converted to audio:
    So no extra stuff other than text which the podcaster/newscaster should read, no special symbols or extra information in between and of course no preamble please.
    {headlines}
    News Script:"""

    try:
        # Groq automatically looks for GROQ_API_KEY in your environment variables
        client = Groq()
        
        # Generate response using the GPT-OSS model on Groq
        response = client.chat.completions.create(
            model="openai/gpt-oss-20b", # You can also use "openai/gpt-oss-120b" if you have access to the larger one
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.4,
            max_tokens=800,
            stream=False
        )
        
        return response.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq error: {str(e)}")
    
## 
## def summarize_with_ollama(headlines) -> str:
##     """Summarize content using Ollama"""
##     prompt = f"""You are my personal news editor. Summarize these headlines into a TV news script for me, focus on important headlines and remember that this text will be converted to audio:
##     So no extra stuff other than text which the podcaster/newscaster should read, no special symbols or extra information in between and of course no preamble please.
##     {headlines}
##     News Script:"""
## 
##     try:
##         client = ollama.Client(host=os.getenv("OLLAMA_HOST", "http://localhost:11434"))
##         
##         # Generate response using the Ollama client
##         response = client.generate(
##             model="llama3.2",
##             prompt=prompt,
##             options={
##                 "temperature": 0.4,
##                 "max_tokens": 800
##             },
##             stream=False
##         )
##         
##         return response['response']
##     except Exception as e:
##         raise HTTPException(status_code=500, detail=f"Ollama error: {str(e)}")
## 

def generate_broadcast_news(api_key, news_data, reddit_data, topics):
    system_prompt = """
    You are broadcast_news_writer, a professional virtual news reporter. Generate natural, TTS-ready news reports using available sources:

    Attribute every statement to the source that supplied it. For every topic with data,
    begin with the exact phrase "According to official reports". Use it to introduce
    actual news content only. If official news was unavailable, immediately clarify that
    no official reports were retrieved, then introduce any Reddit content as
    "According to Reddit discussions". Never present Reddit opinions as official facts.
    When both sources are available, present official news first and Reddit perspectives
    separately afterward.

    Formatting rules:
    - ALWAYS start directly with the content, NO INTRODUCTIONS
    - Keep audio length 60-120 seconds per topic
    - Use natural speech transitions like "Meanwhile, Reddit discussions..."
    - Incorporate 1-2 short quotes from Reddit when available
    - Maintain neutral tone but highlight key sentiments
    - End with "To wrap up this segment..." summary

    Write in full paragraphs optimized for speech synthesis. Avoid markdown.
    """

    try:
        topic_blocks = []
        for topic in topics:
            # Safely get the analysis dictionaries, defaulting to empty dicts if missing
            news_analysis = news_data.get("news_analysis", {}) if news_data else {}
            reddit_analysis = reddit_data.get("reddit_analysis", {}) if reddit_data else {}
            
            news_content = news_analysis.get(topic, '')
            reddit_content = reddit_analysis.get(topic, '')
            
            has_news = _usable_broadcast_source(news_content)
            has_reddit = _usable_broadcast_source(reddit_content)

            context = []
            if has_news:
                context.append(f"OFFICIAL NEWS CONTENT:\n{news_content}")
            if has_reddit:
                context.append(f"REDDIT DISCUSSION CONTENT:\n{reddit_content}")
            
            if context:
                if has_news and has_reddit:
                    source_mode = (
                        "SOURCE MODE: BOTH. Start with 'According to official reports' and "
                        "summarize only the official news. Then introduce Reddit separately "
                        "with 'Meanwhile, Reddit discussions'."
                    )
                elif has_news:
                    source_mode = (
                        "SOURCE MODE: NEWS ONLY. Start with 'According to official reports' "
                        "and summarize the supplied news."
                    )
                else:
                    source_mode = (
                        "SOURCE MODE: REDDIT ONLY. Start with 'According to official reports, "
                        "no official reports were retrieved for this topic.' Then introduce "
                        "the supplied content with 'According to Reddit discussions'. Do not "
                        "imply Reddit content is official reporting."
                    )
                topic_blocks.append(
                    f"TOPIC: {topic}\n{source_mode}\n\n" +
                    "\n\n".join(context)
                )
            else:
                topic_blocks.append(
                    f"TOPIC: {topic}\nNO SOURCE DATA: Neither official news nor Reddit "
                    "discussion data could be retrieved. Create only a brief, honest spoken "
                    "notice saying that no usable source data was available for this topic. "
                    "Do not invent or imply any current events."
                )

        user_prompt = (
            "Create broadcast segments for these topics using available sources:\n\n" +
            "\n\n--- NEW TOPIC ---\n\n".join(topic_blocks)
        )

        llm = ChatGroq(
            model="openai/gpt-oss-20b", 
            api_key=api_key, 
            temperature=0.3,
            max_tokens=4000,    
        )

        response = llm.invoke([
            SystemMessage(content=system_prompt),
            HumanMessage(content=user_prompt)
        ])

        if not response.content or not response.content.strip():
             raise ValueError("Groq generated an empty response despite having data.")

        return response.content

    except Exception as e:
        raise e


def _usable_broadcast_source(content) -> bool:
    if not isinstance(content, str) or not content.strip():
        return False
    normalized = content.strip().casefold()
    unavailable_prefixes = (
        "error:",
        "reddit analysis unavailable:",
        "no usable reddit discussion content",
        "no usable content",
        "no data available",
    )
    return not normalized.startswith(unavailable_prefixes)


## def generate_broadcast_news(api_key, news_data, reddit_data, topics):
##     # Updated system message with flexible source handling
##     system_prompt = """
##     You are broadcast_news_writer, a professional virtual news reporter. Generate natural, TTS-ready news reports using available sources:
## 
##     For each topic, STRUCTURE BASED ON AVAILABLE DATA:
##     1. If news exists: "According to official reports..." + summary
##     2. If Reddit exists: "Online discussions on Reddit reveal..." + summary
##     3. If both exist: Present news first, then Reddit reactions
##     4. If neither exists: Skip the topic (shouldn't happen)
## 
##     Formatting rules:
##     - ALWAYS start directly with the content, NO INTRODUCTIONS
##     - Keep audio length 60-120 seconds per topic
##     - Use natural speech transitions like "Meanwhile, online discussions..." 
##     - Incorporate 1-2 short quotes from Reddit when available
##     - Maintain neutral tone but highlight key sentiments
##     - End with "To wrap up this segment..." summary
## 
##     Write in full paragraphs optimized for speech synthesis. Avoid markdown.
##     """
## 
##     try:
##         topic_blocks = []
##         for topic in topics:
##             news_content = news_data["news_analysis"].get(topic ) if news_data else ''
##             reddit_content = reddit_data["reddit_analysis"].get(topic) if reddit_data else ''
##             context = []
##             if news_content:
##                 context.append(f"OFFICIAL NEWS CONTENT:\n{news_content}")
##             if reddit_content:
##                 context.append(f"REDDIT DISCUSSION CONTENT:\n{reddit_content}")
##             
##             if context:  # Only include topics with actual content
##                 topic_blocks.append(
##                     f"TOPIC: {topic}\n\n" +
##                     "\n\n".join(context)
##                 )
## 
##         user_prompt = (
##             "Create broadcast segments for these topics using available sources:\n\n" +
##             "\n\n--- NEW TOPIC ---\n\n".join(topic_blocks)
##         )
## 
##         llm = ChatGroq(
##             model="openai/gpt-oss-20b", # Or "openai/gpt-oss-120b" if you have access to the larger one
##             api_key=api_key,
##             temperature=0.3,
##             max_tokens=4000,    
##         )
## 
##         response = llm.invoke([
##             SystemMessage(content=system_prompt),
##             HumanMessage(content=user_prompt)
##         ])
## 
##         return response.content
## 
##     except Exception as e:
##         raise e
## 
## 
def summarize_with_anthropic_news_script(api_key: str, headlines: str) -> str:
    """
    Summarize multiple news headlines into a TTS-friendly broadcast news script using Anthropic Claude model via LangChain.
    """
    system_prompt = """
You are my personal news editor and scriptwriter for a news podcast. Your job is to turn raw headlines into a clean, professional, and TTS-friendly news script.

The final output will be read aloud by a news anchor or text-to-speech engine. So:
- Do not include any special characters, emojis, formatting symbols, or markdown.
- Do not add any preamble or framing like "Here's your summary" or "Let me explain".
- Write in full, clear, spoken-language paragraphs.
- Keep the tone formal, professional, and broadcast-style — just like a real TV news script.
- Focus on the most important headlines and turn them into short, informative news segments that sound natural when spoken.
- Start right away with the actual script, using transitions between topics if needed.

Remember: Your only output should be a clean script that is ready to be read out loud.
"""

    try:
        llm = ChatGroq(
            model="openai/gpt-oss-20b",  # Or claude-3-sonnet for faster/lower-cost runs
            api_key=api_key,
            temperature=0.4,
            max_tokens=1000
        )

        # Invoke Claude with system + user prompt
        response = llm.invoke([
            SystemMessage(content=system_prompt),
            HumanMessage(content=headlines)
        ])

        return response.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Anthropic error: {str(e)}")


def text_to_audio_elevenlabs_sdk(
    text: str,
    voice_id: str = "JBFqnCBsd6RMkjVDRZzb",
    model_id: str = "eleven_multilingual_v2",
    output_format: str = "mp3_44100_128",
    output_dir: str = "audio",
    api_key: str = None
) -> str:
    """
    Converts text to speech using ElevenLabs SDK and saves it to audio/ directory.

    Returns:
        str: Path to the saved audio file.
    """
    
    # --- ADD THIS GUARD ---
    if not text or not text.strip():
        print("ERROR: text_to_audio_elevenlabs_sdk received empty text!")
        raise ValueError("Text for audio generation is empty.")
    
    print(f"ElevenLabs Input Text (First 120 chars): {text[:120]}")
    # ----------------------
    
    try:
        api_key = api_key or os.getenv("ELEVEN_API_KEY")
        if not api_key:
            raise ValueError("ElevenLabs API key is required.")

        # Initialize client
        client = ElevenLabs(api_key=api_key)

        # Get the audio generator
        audio_stream = client.text_to_speech.convert(
            text=text,
            voice_id=voice_id,
            model_id=model_id,
            output_format=output_format
        )

        # Ensure output directory exists
        os.makedirs(output_dir, exist_ok=True)

        # Generate unique filename
        filename = f"tts_{datetime.now().strftime('%Y%m%d_%H%M%S')}.mp3"
        filepath = os.path.join(output_dir, filename)

        # Write audio chunks to file
        with open(filepath, "wb") as f:
            for chunk in audio_stream:
                f.write(chunk)

        return filepath

    except Exception as e:
        raise e

from pathlib import Path
from gtts import gTTS
AUDIO_DIR = Path("audio")
AUDIO_DIR.mkdir(exist_ok=True)  # Create directory if it doesn't exist
def tts_to_audio(text: str, language: str = 'en', output_dir: str | os.PathLike | None = None) -> str:
    """
    Convert text to speech using gTTS (Google Text-to-Speech) and save to file.
    
    Args:
        text: Input text to convert
        language: Language code (default: 'en')
    
    Returns:
        str: Path to saved audio file
    
    Example:
        tts_to_audio("Hello world", "en")
    """
    
    # --- ADD THIS GUARD ---
    if not text or not text.strip():
        print("ERROR: tts_to_audio received empty text!")
        raise ValueError("Text for audio generation is empty.")
        
    print(f"gTTS Input Text (First 50 chars): {text[:50]}")
    # ----------------------
    
    try:
        # Generate filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
        destination = Path(output_dir) if output_dir else AUDIO_DIR
        destination.mkdir(parents=True, exist_ok=True)
        filename = destination / f"tts_{timestamp}.mp3"
        
        # Create TTS object and save
        tts = gTTS(text=text, lang=language, slow=False)
        tts.save(str(filename))
        
        return str(filename)
    except Exception as e:
        print(f"gTTS Error: {str(e)}")
        return None



## import logging
## import os
## import uuid
## from datetime import datetime
## from pathlib import Path
## from typing import Optional
## from urllib.parse import quote_plus
## 
## import requests
## from bs4 import BeautifulSoup
## from dotenv import load_dotenv
## from elevenlabs import ElevenLabs
## from gtts import gTTS
## from langchain_core.messages import HumanMessage, SystemMessage
## from langchain_groq import ChatGroq
## 
## load_dotenv()
## logger = logging.getLogger(__name__)
## 
## GROQ_MODEL = "openai/gpt-oss-20b"
## MAX_PROMPT_CHARS = 12000        # total budget for the broadcast prompt
## ELEVENLABS_CHUNK_CHARS = 9000   # stay under the per-request text limit
## 
## AUDIO_DIR = Path("audio")
## AUDIO_DIR.mkdir(exist_ok=True)
## 
## # Scrapers store failure messages as strings; never send these to the LLM
## _FAILURE_PREFIXES = ("Error analyzing", "Failed to analyze", "No Reddit results found")
## 
## 
## class ScrapeError(RuntimeError):
##     """Raised when a BrightData request fails."""
## 
## 
## # ---------- helpers ----------
## def _env(*names: str) -> Optional[str]:
##     """Return the first env var that is set and non-empty."""
##     for name in names:
##         value = os.getenv(name)
##         if value:
##             return value
##     return None
## 
## 
## def _usable(text) -> bool:
##     return isinstance(text, str) and bool(text.strip()) and not text.startswith(_FAILURE_PREFIXES)
## 
## 
## def _timestamp_name(prefix: str = "tts") -> str:
##     return f"{prefix}_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4().hex[:6]}.mp3"
## 
## 
## # ---------- news scraping ----------
## def generate_valid_news_url(keyword: str, hl: str = "en-US", gl: str = "US", ceid: str = "US:en") -> str:
##     """Build a Google News search URL for a keyword."""
##     return f"https://news.google.com/search?q={quote_plus(keyword)}&hl={hl}&gl={gl}&ceid={ceid}"
## 
## 
## def generate_news_urls_to_scrape(list_of_keywords) -> dict:
##     return {keyword: generate_valid_news_url(keyword) for keyword in list_of_keywords}
## 
## 
## def scrape_with_brightdata(url: str, timeout: int = 60) -> str:
##     """Fetch a URL through BrightData's Web Unlocker (blocking call)."""
##     token = _env("BRIGHTDATA_API_KEY", "API_TOKEN")
##     zone = _env("BRIGHTDATA_WEB_UNLOCKER_ZONE", "WEB_UNLOCKER_ZONE")
##     if not token or not zone:
##         raise ScrapeError(
##             "Missing BrightData credentials. Set BRIGHTDATA_API_KEY and "
##             "BRIGHTDATA_WEB_UNLOCKER_ZONE (or API_TOKEN and WEB_UNLOCKER_ZONE) in .env"
##         )
## 
##     try:
##         response = requests.post(
##             "https://api.brightdata.com/request",
##             json={"zone": zone, "url": url, "format": "raw"},
##             headers={
##                 "Authorization": f"Bearer {token}",
##                 "Content-Type": "application/json",
##             },
##             timeout=timeout,
##         )
##         response.raise_for_status()
##         return response.text
##     except requests.RequestException as e:
##         raise ScrapeError(f"BrightData error: {e}") from e
## 
## 
## def clean_html_to_text(html_content: str) -> str:
##     soup = BeautifulSoup(html_content, "html.parser")
##     return soup.get_text(separator="\n").strip()
## 
## 
## def extract_headlines(cleaned_text: str, limit: int = 25) -> str:
##     """Return up to `limit` unique headlines, one per line."""
##     headlines, seen, block = [], set(), []
## 
##     def flush():
##         if block:
##             first = block[0]
##             if first not in seen:
##                 seen.add(first)
##                 headlines.append(first)
##             block.clear()
## 
##     for line in (l.strip() for l in cleaned_text.split("\n")):
##         if not line:
##             continue
##         if line == "More":
##             flush()
##         else:
##             block.append(line)
##     flush()  # trailing block
## 
##     return "\n".join(headlines[:limit])
## 
## 
## # ---------- summarizing ----------
## def _groq_llm(api_key: Optional[str], temperature: float, max_tokens: int) -> ChatGroq:
##     return ChatGroq(
##         model=GROQ_MODEL,
##         api_key=api_key or os.getenv("GROQ_API_KEY"),
##         temperature=temperature,
##         max_tokens=max_tokens,
##     )
## 
## 
## def summarize_with_ollama(headlines: str) -> str:
##     """Summarize headlines into a news script with a local Ollama model."""
##     import ollama  # lazy import so the module loads without Ollama installed
## 
##     prompt = f"""You are my personal news editor. Summarize these headlines into a TV news script for me, focus on important headlines and remember that this text will be converted to audio:
## So no extra stuff other than text which the podcaster/newscaster should read, no special symbols or extra information in between and of course no preamble please.
## {headlines}
## News Script:"""
## 
##     client = ollama.Client(host=os.getenv("OLLAMA_HOST", "http://localhost:11434"))
##     response = client.generate(
##         model="llama3.2",
##         prompt=prompt,
##         options={"temperature": 0.4, "num_predict": 800},
##         stream=False,
##     )
##     return response["response"]
## 
## 
## def summarize_with_groq_news_script(api_key: str, headlines: str) -> str:
##     """Turn headlines into a TTS-friendly news script using Groq."""
##     system_prompt = """
## You are my personal news editor and scriptwriter for a news podcast. Your job is to turn raw headlines into a clean, professional, and TTS-friendly news script.
## 
## The final output will be read aloud by a news anchor or text-to-speech engine. So:
## - Do not include any special characters, emojis, formatting symbols, or markdown.
## - Do not add any preamble or framing like "Here's your summary" or "Let me explain".
## - Write in full, clear, spoken-language paragraphs.
## - Keep the tone formal, professional, and broadcast-style, just like a real TV news script.
## - Focus on the most important headlines and turn them into short, informative news segments that sound natural when spoken.
## - Start right away with the actual script, using transitions between topics if needed.
## 
## Remember: Your only output should be a clean script that is ready to be read out loud.
## """
##     # 2000 (not 1000): gpt-oss is a reasoning model, and reasoning tokens
##     # count toward max_tokens, so a low cap can leave the visible answer empty.
##     llm = _groq_llm(api_key, temperature=0.4, max_tokens=2000)
##     response = llm.invoke([
##         SystemMessage(content=system_prompt),
##         HumanMessage(content=headlines),
##     ])
##     return response.content
## 
## 
## def generate_broadcast_news(api_key, news_data, reddit_data, topics) -> str:
##     system_prompt = """
##     You are broadcast_news_writer, a professional virtual news reporter. Generate natural, TTS-ready news reports using available sources:
## 
##     For each topic, STRUCTURE BASED ON AVAILABLE DATA:
##     1. If news exists: "According to official reports..." + summary
##     2. If Reddit exists: "Online discussions on Reddit reveal..." + summary
##     3. If both exist: Present news first, then Reddit reactions
##     4. If neither exists: Skip the topic (shouldn't happen)
## 
##     Formatting rules:
##     - ALWAYS start directly with the content, NO INTRODUCTIONS
##     - Keep audio length 60-120 seconds per topic
##     - Use natural speech transitions like "Meanwhile, online discussions..."
##     - Incorporate 1-2 short quotes from Reddit when available
##     - Maintain neutral tone but highlight key sentiments
##     - End with "To wrap up this segment..." summary
## 
##     Write in full paragraphs optimized for speech synthesis. Avoid markdown.
##     """
## 
##     news_by_topic = (news_data or {}).get("news_analysis", {})
##     reddit_by_topic = (reddit_data or {}).get("reddit_analysis", {})
## 
##     topic_blocks = []
##     for topic in topics:
##         parts = []
##         news = news_by_topic.get(topic)
##         reddit = reddit_by_topic.get(topic)
##         if _usable(news):
##             parts.append(f"OFFICIAL NEWS CONTENT:\n{news}")
##         if _usable(reddit):
##             parts.append(f"REDDIT DISCUSSION CONTENT:\n{reddit}")
##         if parts:
##             topic_blocks.append(f"TOPIC: {topic}\n\n" + "\n\n".join(parts))
## 
##     if not topic_blocks:
##         raise ValueError("No usable news or Reddit content to build a broadcast from.")
## 
##     # Split the budget evenly so every topic survives, instead of
##     # cutting the tail of the combined prompt.
##     per_topic = MAX_PROMPT_CHARS // len(topic_blocks)
##     topic_blocks = [block[:per_topic] for block in topic_blocks]
## 
##     user_prompt = (
##         "Create broadcast segments for these topics using available sources:\n\n"
##         + "\n\n--- NEW TOPIC ---\n\n".join(topic_blocks)
##     )
## 
##     llm = _groq_llm(api_key, temperature=0.3, max_tokens=4000)
##     response = llm.invoke([
##         SystemMessage(content=system_prompt),
##         HumanMessage(content=user_prompt),
##     ])
##     return response.content
## 
## 
## # ---------- text to speech ----------
## def _split_text(text: str, max_chars: int) -> list[str]:
##     if len(text) <= max_chars:
##         return [text]
##     chunks, current = [], ""
##     for sentence in text.replace("\n", " ").split(". "):
##         piece = sentence + ". "
##         if current and len(current) + len(piece) > max_chars:
##             chunks.append(current.strip())
##             current = ""
##         current += piece
##     if current.strip():
##         chunks.append(current.strip())
##     return chunks
## 
## 
## def text_to_audio_elevenlabs_sdk(
##     text: str,
##     voice_id: str = "JBFqnCBsd6RMkjVDRZzb",
##     model_id: str = "eleven_multilingual_v2",
##     output_format: str = "mp3_44100_128",
##     output_dir: str = "audio",
##     api_key: Optional[str] = None,
## ) -> str:
##     """Convert text to speech with ElevenLabs and return the saved file path."""
##     api_key = api_key or _env("ELEVEN_API_KEY", "ELEVENLABS_API_KEY")
##     if not api_key:
##         raise ValueError("ElevenLabs API key is required.")
## 
##     client = ElevenLabs(api_key=api_key)
## 
##     out_dir = Path(output_dir)
##     out_dir.mkdir(parents=True, exist_ok=True)
##     filepath = out_dir / _timestamp_name()
## 
##     with open(filepath, "wb") as f:
##         for chunk_text in _split_text(text, ELEVENLABS_CHUNK_CHARS):
##             audio_stream = client.text_to_speech.convert(
##                 text=chunk_text,
##                 voice_id=voice_id,
##                 model_id=model_id,
##                 output_format=output_format,
##             )
##             for audio_chunk in audio_stream:
##                 f.write(audio_chunk)
## 
##     return str(filepath)
## 
## 
## def tts_to_audio(text: str, language: str = "en") -> Optional[str]:
##     """Fallback TTS with gTTS. Returns the file path, or None on failure."""
##     try:
##         filepath = AUDIO_DIR / _timestamp_name()
##         gTTS(text=text, lang=language, slow=False).save(str(filepath))
##         return str(filepath)
##     except Exception:
##         logger.exception("gTTS failed")
##         return None
