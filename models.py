from pydantic import BaseModel
from typing import List


class NewsRequest(BaseModel):
    topics: List[str]
    source_type: str



## from typing import List, Literal
## 
## from pydantic import BaseModel, Field, field_validator
## 
## 
## class NewsRequest(BaseModel):
##     topics: List[str] = Field(min_length=1, max_length=5)
##     source_type: Literal["news", "reddit", "both"]
## 
##     @field_validator("topics")
##     @classmethod
##     def clean_topics(cls, topics: List[str]) -> List[str]:
##         cleaned = list(dict.fromkeys(t.strip() for t in topics if t.strip()))
##         if not cleaned:
##             raise ValueError("At least one non-empty topic is required")
##         return cleaned