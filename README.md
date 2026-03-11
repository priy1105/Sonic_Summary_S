SonicSummary - Stealthy News Aggregator

Your personal news ninja that silently gathers headlines and Reddit reactions, then delivers audio briefings straight to your ears. *No scroll, just soul.*

---
FEATURES
- 🗞️ Scrape premium news websites (bypassing paywalls)
- 🕵️♂️ Extract live Reddit reactions (even from JS-heavy threads)
- 🔊 AI-powered audio summaries (text-to-speech with ElevenLabs)
- ⚡ Real-time updates (thanks to Bright Data's MCP magic)

---
PREREQUISITES
- Python 3.9+
- Bright Data account (https://brightdata.com)
- ElevenLabs account (https://elevenlabs.io)

---
QUICK START

1. Clone the Dojo
```
git clone https://github.com/AIwithhassan/newsninja.git
cd SonicSummary
```

2. Install Dependencies
```
pipenv install
pipenv shell
```

3. Ninja Secrets (Environment Setup)
Create .env file:
```
cp .env.example .env
```

Configure your secrets in .env:
```
# Bright Data
BRIGHTDATA_MCP_KEY="your_mcp_api_key"
BROWSER_AUTH="your_browser_auth_token"

# ElevenLabs 
ELEVENLABS_API_KEY="your_text_to_speech_key"
```

4. Prepare Your Weapons (Bright Data Setup)
- Create MCP zone: https://brightdata.com/cp/zones
- Enable browser authentication
- Copy credentials to .env

---
RUNNING THE NINJA

First terminal (Backend):
```
pipenv run python backend.py
```

Second terminal (Frontend):
```
pipenv run streamlit run frontend.py
```

---
PROJECT STRUCTURE
```
.
├── frontend.py          # Streamlit UI
├── backend.py           # API & data processing  
├── utils.py             # UTILS  
├── news_scraper.py      # News Scraper  
├── reddit_scraper.py    # Reddit Scraper  
├── models.py            # Pydantic model
├── Pipfile              # Dependency scroll
├── .env.example         # Secret map template

```

---
NOTES
- First scrape takes 15-20 seconds (good ninjas are patient)
- Reddit scraping uses real browser emulation via MCP
- Keep .env file secret (ninjas never reveal their tools)



*"In the darkness of information overload, be the ninja."* 🌑
