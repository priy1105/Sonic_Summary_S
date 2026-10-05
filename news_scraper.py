import asyncio
import os
from typing import Dict, List

from aiolimiter import AsyncLimiter
from tenacity import retry, stop_after_attempt, wait_exponential
from dotenv import load_dotenv

from utils import (
    generate_news_urls_to_scrape,
    scrape_with_brightdata,
    clean_html_to_text,
    extract_headlines,
    summarize_with_anthropic_news_script,
    summarize_with_ollama
)

load_dotenv()


class NewsScraper:
    def __init__(self) -> None:
        # The scraper is created inside the active asyncio loop. Keep the
        # limiter on the instance so Streamlit's later runs don't reuse a
        # limiter that was bound to a previous loop.
        self._rate_limiter = AsyncLimiter(5, 1)

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10)
    )
    async def scrape_news(self, topics: List[str]) -> Dict[str, str]:
        """Scrape and analyze news articles"""
        results = {}
        
        for topic in topics:
            async with self._rate_limiter:
                try:
                    urls = generate_news_urls_to_scrape([topic])
                    search_html = scrape_with_brightdata(urls[topic])
                    clean_text = clean_html_to_text(search_html)
                    headlines = extract_headlines(clean_text)
                    
                    # --- NEW DEBUG PRINT ---
                    print(f"DEBUG [{topic}]: Extracted {len(headlines)} characters of headlines.")
                    if not headlines.strip():
                        print(f"WARNING [{topic}]: No headlines found! Scraper might be blocked or HTML changed.")
                        results[topic] = "Error: No usable news headlines were returned."
                    else:
                        summary = summarize_with_anthropic_news_script(
                            api_key=os.getenv("GROQ_API_KEY"),
                            headlines=headlines
                        )
                        results[topic] = summary
                except Exception as e:
                    print(f"DEBUG [{topic}]: Scraper Error - {str(e)}")
                    results[topic] = f"Error: {str(e)}"
                await asyncio.sleep(1)  # Avoid overwhelming news sites

        return {"news_analysis" : results}

## import asyncio
## import os
## from typing import Dict, List
## 
## from aiolimiter import AsyncLimiter
## from tenacity import retry, retry_if_exception_type, stop_after_attempt, wait_exponential
## from langchain_groq import ChatGroq
## from langgraph.prebuilt import create_react_agent
## from dotenv import load_dotenv
## 
## from utils import (
##     generate_news_urls_to_scrape,
##     scrape_with_brightdata,
##     clean_html_to_text,
##     extract_headlines,
##     summarize_with_anthropic_news_script,
##     summarize_with_ollama
## )
## from mcp import ClientSession, StdioServerParameters
## from mcp.client.stdio import stdio_client
## from langchain_mcp_adapters.tools import load_mcp_tools
## 
## load_dotenv()
## 
## 
## class NewsScraper:
##     _rate_limiter = AsyncLimiter(5, 1)  # 5 requests/second
## 
##     @retry(
##         stop=stop_after_attempt(3),
##         wait=wait_exponential(multiplier=1, min=2, max=10)
##     )
##     async def scrape_news(self, topics: List[str]) -> Dict[str, str]:
##         """Scrape and analyze news articles"""
##         results = {}
##         
##         for topic in topics:
##             async with self._rate_limiter:
##                 try:
##                     urls = generate_news_urls_to_scrape([topic])
##                     search_html = scrape_with_brightdata(urls[topic])
##                     clean_text = clean_html_to_text(search_html)
##                     headlines = extract_headlines(clean_text)
##                     summary = summarize_with_anthropic_news_script(
##                         api_key=os.getenv("ANTHROPIC_API_KEY"),
##                         headlines=headlines
##                     )
##                     results[topic] = summary
##                 except Exception as e:
##                     results[topic] = f"Error: {str(e)}"
##                 await asyncio.sleep(1)  # Avoid overwhelming news sites
## 
##         return {"news_analysis" : results}



## import asyncio
## from typing import Dict, List
## import logging
## from aiolimiter import AsyncLimiter
## from dotenv import load_dotenv
## from langchain_groq import ChatGroq
## from tenacity import retry, stop_after_attempt, wait_exponential
## 
## from utils import (
##     generate_news_urls_to_scrape,
##     scrape_with_brightdata,
##     clean_html_to_text,
##     extract_headlines,
## )
## 
## load_dotenv()
## 
## import logging
## logger = logging.getLogger("news_scraper")
## 
## 
## MAX_HEADLINES = 25          # keeps the prompt small for Groq's token limits
## MAX_CONCURRENT_TOPICS = 2   # topics processed in parallel
## 
## llm = ChatGroq(model="openai/gpt-oss-20b", temperature=0.3)
## 
## 
## class NewsScraper:
##     def __init__(self):
##         self._limiter = AsyncLimiter(5, 1)  # 5 scrape requests/second
##         self._sem = asyncio.Semaphore(MAX_CONCURRENT_TOPICS)
## 
##     @retry(
##         stop=stop_after_attempt(3),
##         wait=wait_exponential(multiplier=1, min=2, max=10),
##         reraise=True,
##     )
##     async def _get_headlines(self, topic: str) -> List[str]:
##         """Scrape one topic. Raises on failure so tenacity can retry."""
##         urls = generate_news_urls_to_scrape([topic])
##         async with self._limiter:
##             # the scraper is blocking, so run it off the event loop
##             html = await asyncio.to_thread(scrape_with_brightdata, urls[topic])
## 
##         headlines = extract_headlines(clean_html_to_text(html))
##         if not headlines:
##             raise ValueError("No headlines extracted (possibly a block page)")
## 
##         if isinstance(headlines, str):
##             headlines = [h for h in headlines.splitlines() if h.strip()]
##         return headlines[:MAX_HEADLINES]
## 
##     @retry(
##         stop=stop_after_attempt(3),
##         wait=wait_exponential(multiplier=2, min=5, max=30),
##         reraise=True,
##     )
##     async def _summarize(self, topic: str, headlines: List[str]) -> str:
##         bullet_list = "\n".join(f"- {h}" for h in headlines)
##         messages = [
##             (
##                 "system",
##                 "You are a concise news analyst. Use ONLY the headlines provided. "
##                 "Do not invent facts, names, or numbers.",
##             ),
##             (
##                 "user",
##                 f"Topic: {topic}\n\nLatest headlines:\n{bullet_list}\n\n"
##                 "Write a short, spoken-style summary of the main developments. "
##                 "Group related headlines and skip duplicates.",
##             ),
##         ]
##         response = await llm.ainvoke(messages)
##         return response.content
## 
## 
##     async def _process_topic(self, topic: str) -> str:
##         async with self._sem:
##             try:
##                 headlines = await self._get_headlines(topic)
##                 summary = await self._summarize(topic, headlines)
##                 if not summary or not summary.strip():
##                     raise ValueError("LLM returned an empty summary")
##                 return summary
##             except Exception as e:
##                 logger.exception("News scrape failed for %r", topic)
##                 return f"Error analyzing '{topic}': {e!r}"
##             
##     async def scrape_news(self, topics: List[str]) -> Dict[str, Dict[str, str]]:
##         """Scrape and summarize news for each topic."""
##         summaries = await asyncio.gather(*(self._process_topic(t) for t in topics))
##         return {"news_analysis": dict(zip(topics, summaries))}
