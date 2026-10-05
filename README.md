# SonicSummary

SonicSummary gathers current news and Reddit discussions, summarizes them with Groq, and creates a downloadable ElevenLabs audio briefing. The polished React/shadcn-style interface is embedded in Streamlit, so the Streamlit deployment runs the UI and Python workflow as one app. The FastAPI endpoint remains available for clients that still use it.

## Requirements

- Python 3.10 or newer
- Node.js 20 or newer and npm
- API credentials for Groq, Bright Data, and ElevenLabs

## Run locally

1. Install the Python dependencies from the repository root:

   ```powershell
   pip install -r requirements.txt
   ```

   Or use the existing Pipenv setup with `pipenv install`.

2. Set the environment variables in your local `.env` file. Use `.env.example` as the variable-name reference:

   ```text
   GROQ_API_KEY=...
   BRIGHTDATA_API_KEY=...
   BRIGHTDATA_WEB_UNLOCKER_ZONE=...
   ELEVEN_API_KEY=...
   ```

   Keep `.env` private; do not commit it.

3. Build the React interface into the static bundle that Streamlit mounts:

   ```powershell
   cd web
   npm ci
   npm run build
   cd ..
   ```

4. Start the app:

   ```powershell
   streamlit run frontend.py
   ```

   The browser URL is usually `http://localhost:8501`. The UI sends its topic/source selection to Streamlit, and Streamlit calls the news scraper, Reddit map/reduce summarizer, Groq, and ElevenLabs directly. You do not need to start `backend.py` for this flow.

### Frontend development

After the initial build, run the Vite watcher in one terminal while Streamlit is running in another. The watcher refreshes the bundle in `web/build`; refresh the Streamlit page after Vite reports a new build.

```powershell
# Terminal 1
cd web
npm run dev
```

```powershell
# Terminal 2, from the repository root
streamlit run frontend.py
```

## Deploy on Streamlit Community Cloud

1. Build the component locally with `cd web; npm ci; npm run build`, then commit the generated `web/build/index.js` and `web/build/styles.css` files along with the source code.
2. Push the repository to GitHub. Verify `.env` is not staged or committed.
3. In [Streamlit Community Cloud](https://share.streamlit.io/), create an app for the repository, select the branch, and set **Main file path** to `frontend.py`.
4. In the app's **Settings → Secrets**, add the API credentials in TOML format:

   ```toml
   GROQ_API_KEY = "your-groq-key"
   BRIGHTDATA_API_KEY = "your-brightdata-key"
   BRIGHTDATA_WEB_UNLOCKER_ZONE = "your-web-unlocker-zone"
   ELEVEN_API_KEY = "your-elevenlabs-key"
   ```

5. Deploy. Streamlit installs the Python dependencies from the existing Pipfile lock. The committed component bundle means deployment does not need Node.js or a separate frontend host.

Community Cloud is suitable for a demo, but free compute can sleep, resources and execution time are limited, and provider quotas still apply. A long scrape/summarization/audio request may exceed the app's available runtime. Public users can also trigger your configured provider usage, so monitor those accounts and avoid publishing credentials.

## Keep using the FastAPI API (optional)

The existing HTTP endpoint is retained for a separate client or local API development:

```powershell
pipenv run python backend.py
```

It listens on port 1234 and keeps the `/generate-news-audio` response as MP3 audio. This server is not part of the Streamlit-only deployment path.

## Project files

- `frontend.py` — Streamlit app, React component bridge, and direct Python workflow
- `web/src/` — React interface and local shadcn-style components
- `web/build/` — generated frontend bundle consumed by Streamlit
- `backend.py` — retained FastAPI API
- `news_scraper.py`, `reddit_scraper.py` — scraping and Groq analysis
- `utils.py` — Bright Data, Groq broadcast script, and ElevenLabs utilities
- `requirements.txt`, `Pipfile`, `Pipfile.lock` — Python dependency definitions
