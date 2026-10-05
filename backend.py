from fastapi import FastAPI, HTTPException, File, Response
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from pathlib import Path
from dotenv import load_dotenv

from models import NewsRequest
from utils import collect_selected_sources, generate_broadcast_news, text_to_audio_elevenlabs_sdk, tts_to_audio

app = FastAPI()
load_dotenv()

configured_origins = os.getenv("CORS_ORIGINS", "")
allowed_origins = [
    origin.strip().rstrip("/")
    for origin in configured_origins.split(",")
    if origin.strip()
]
allowed_origins.extend(
    origin for origin in ("http://localhost:5173", "http://127.0.0.1:5173")
    if origin not in allowed_origins
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


@app.get("/health")
async def health_check():
    return {"status": "ok"}


@app.post("/generate-news-audio")
async def generate_news_audio(request: NewsRequest):
    try:
        news_data, reddit_data = await collect_selected_sources(
            request.topics,
            request.source_type,
        )
        news_summary = generate_broadcast_news(
            api_key=os.getenv("GROQ_API_KEY"),
            news_data=news_data,
            reddit_data=reddit_data,
            topics=request.topics
        )

        try:
            audio_path = text_to_audio_elevenlabs_sdk(
                text=news_summary,
                voice_id="JBFqnCBsd6RMkjVDRZzb",
                model_id="eleven_multilingual_v2",
                output_format="mp3_44100_128",
                output_dir="audio"
            )
        except Exception as exc:
            print(
                f"ElevenLabs failed ({type(exc).__name__}); "
                "falling back to Google Text-to-Speech."
            )
            audio_path = tts_to_audio(news_summary, output_dir="audio")

        if audio_path and Path(audio_path).exists():
            with open(audio_path, "rb") as f:
                audio_bytes = f.read()

            return Response(
                content=audio_bytes,
                media_type="audio/mpeg",
                headers={"Content-Disposition": "attachment; filename=news-summary.mp3"}
            )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "backend:app",
        host="0.0.0.0",
        port=1234,
        reload=True
    )


### import asyncio
### import logging
### import os
### import sys
### from pathlib import Path
### 
### from dotenv import load_dotenv
### from fastapi import FastAPI, HTTPException, Response
### 
### from models import NewsRequest
### from news_scraper import NewsScraper
### from reddit_scraper import scrape_reddit_topics
### from utils import generate_broadcast_news, text_to_audio_elevenlabs_sdk
### 
### load_dotenv()
### logger = logging.getLogger("backend")
### logger.info("news_data=%s", news_data)
### logger.info("reddit_data=%s", reddit_data)
### # Needed only while the Reddit scraper launches `npx` (MCP) as a subprocess on Windows
### if sys.platform == "win32":
###     asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
### 
### app = FastAPI()
### 
### VALID_SOURCES = {"news", "reddit", "both"}
### 
### 
### @app.post("/generate-news-audio")
### async def generate_news_audio(request: NewsRequest):
###     if request.source_type not in VALID_SOURCES:
###         raise HTTPException(400, f"source_type must be one of {sorted(VALID_SOURCES)}")
###     if not request.topics:
###         raise HTTPException(400, "At least one topic is required")
### 
###     try:
###         news_data, reddit_data = {}, {}
### 
###         # sequential on purpose: keeps Groq's token-per-minute limit happy
###         if request.source_type in ("news", "both"):
###             news_data = await NewsScraper().scrape_news(request.topics)
### 
###         if request.source_type in ("reddit", "both"):
###             reddit_data = await scrape_reddit_topics(request.topics)
### 
###         script = await asyncio.to_thread(
###             generate_broadcast_news,
###             api_key=os.getenv("GROQ_API_KEY"),
###             news_data=news_data,
###             reddit_data=reddit_data,
###             topics=request.topics,
###         )
### 
###         audio_path = await asyncio.to_thread(
###             text_to_audio_elevenlabs_sdk,
###             text=script,
###             voice_id="JBFqnCBsd6RMkjVDRZzb",
###             model_id="eleven_multilingual_v2",
###             output_format="mp3_44100_128",
###             output_dir="audio",
###         )
### 
###         path = Path(audio_path)
###         if not path.exists():
###             raise RuntimeError("Audio file was not created")
### 
###         audio_bytes = path.read_bytes()
###         path.unlink(missing_ok=True)  # remove this line if you want to keep the files
### 
###         return Response(
###             content=audio_bytes,
###             media_type="audio/mpeg",
###             headers={"Content-Disposition": "attachment; filename=news-summary.mp3"},
###         )
### 
###     except HTTPException:
###         raise
###     except Exception as e:
###         logger.exception("generate-news-audio failed")
###         raise HTTPException(status_code=500, detail=str(e))
### 
### 
### if __name__ == "__main__":
###     import uvicorn
### 
###     uvicorn.run("backend:app", host="127.0.0.1", port=1234, loop="asyncio")

#from fastapi import FastAPI, HTTPException, File, Response
#from fastapi.responses import FileResponse
#import os
#from pathlib import Path
#from dotenv import load_dotenv
#
#from models import NewsRequest
#from utils import generate_broadcast_news, text_to_audio_elevenlabs_sdk, tts_to_audio
#from news_scraper import NewsScraper
#from reddit_scraper import scrape_reddit_topics
#import sys
#import asyncio
#
#app = FastAPI()
#load_dotenv()
#
## Force Windows to use the correct async loop for subprocesses
#if sys.platform == 'win32':
#    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
#
#
#@app.post("/generate-news-audio")
#async def generate_news_audio(request: NewsRequest):
#    try:
#        results = {}
#        
#        if request.source_type in ["news", "both"]:
#            news_scraper = NewsScraper()
#            results["news"] = await news_scraper.scrape_news(request.topics)
#        
#        if request.source_type in ["reddit", "both"]:
#            results["reddit"] = await scrape_reddit_topics(request.topics)
#
#        news_data = results.get("news", {})
#        reddit_data = results.get("reddit", {})
#        news_summary = generate_broadcast_news(
#            api_key=os.getenv("GROQ_API_KEY"),
#            news_data=news_data,
#            reddit_data=reddit_data,
#            topics=request.topics
#        )
#
#        audio_path = text_to_audio_elevenlabs_sdk(
#            text=news_summary,
#            voice_id="JBFqnCBsd6RMkjVDRZzb",
#            model_id="eleven_multilingual_v2",
#            output_format="mp3_44100_128",
#            output_dir="audio"
#        )
#
#        if audio_path and Path(audio_path).exists():
#            with open(audio_path, "rb") as f:
#                audio_bytes = f.read()
#
#            return Response(
#                content=audio_bytes,
#                media_type="audio/mpeg",
#                headers={"Content-Disposition": "attachment; filename=news-summary.mp3"}
#            )
#    
##    except Exception as e:
##        raise HTTPException(status_code=500, detail=str(e))
#
#    except Exception as e:
#        import traceback
#        traceback.print_exc()  # This prints the full error to your terminal
#        raise HTTPException(status_code=500, detail=str(e))
#
#if __name__ == "__main__":
#    import uvicorn
#    uvicorn.run("backend:app", host="0.0.0.0", port=1234, loop="asyncio")
#
