from pydantic import BaseModel, Field
from typing import List


class DocumentComparisonResult(BaseModel):
    comparison: str = Field(..., description="The result of comparing the two documents.")
    red_flags: List[str] = Field(..., description="A list of identified red flags within the documents.")
