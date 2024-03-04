from fastapi import APIRouter

from danswer.db.models import User
from danswer.server.workflows.models import DocumentComparisonResult
from danswer.utils.logger import setup_logger
import openai
import fitz  # PyMuPDF

openai.api_key = 'your_openai_api_key_here'

# Assuming the `workflows` router is already defined somewhere in your code.
# If not, you would define it like so:
workflows = APIRouter(prefix="/workflows")

logger = setup_logger()

from fastapi import UploadFile, File, Depends, HTTPException
from fastapi import APIRouter
from sqlalchemy.orm import Session

from danswer.auth.users import current_admin_user
from danswer.db.engine import get_session
from danswer.utils.logger import setup_logger

logger = setup_logger()
workflows = APIRouter(prefix="/workflows")  # Assuming 'workflows' is your APIRouter instance


@workflows.post("/compare-documents", response_model=DocumentComparisonResult, tags=["workflow"])
async def compare_documents_endpoint(
        doc1: UploadFile = File(...),
        doc2: UploadFile = File(...),
        _: User = Depends(current_admin_user),
        db_session: Session = Depends(get_session)
) -> DocumentComparisonResult:
    """
    Compares two legal documents, identifies red flags, and returns a comparison.
    Accessible to admin users only.
    """
    try:
        content1 = await doc1.read()
        content2 = await doc2.read()

        # Placeholder for your actual comparison logic
        comparison_result, red_flags = compare_documents_logic(content1, content2)

        return DocumentComparisonResult(comparison=comparison_result, red_flags=red_flags)
    except Exception as e:
        logger.error(f"Error comparing documents: {str(e)}")
        raise HTTPException(status_code=500, detail="Error processing document comparison.")


def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """
    Extracts text from a PDF file's bytes using PyMuPDF.
    """
    text = ""
    with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text


def analyze_documents_with_openai(content1: str, content2: str) -> (str, list):
    """
    Uses OpenAI's API to compare two documents and identify differences and potential legal red flags.
    """
    prompt = f"Compare the following two documents and highlight differences and potential legal red flags:\n\nDocument 1:\n{content1}\n\nDocument 2:\n{content2}"

    response = openai.Completion.create(
        engine="text-davinci-003",  # Choose an appropriate engine for your use case
        prompt=prompt,
        temperature=0.5,
        max_tokens=1024,  # Adjust based on your needs
        stop=None
    )

    comparison_result = response.choices[0].text.strip()
    red_flags = ["Identify specific red flags based on the analysis."]

    return comparison_result, red_flags


def compare_documents_logic(content1: bytes, content2: bytes) -> (str, list):
    """
    Extracts text from PDF bytes, compares the two documents using OpenAI, and identifies red flags.
    """
    text1 = extract_text_from_pdf(content1)
    text2 = extract_text_from_pdf(content2)

    comparison_result, red_flags = analyze_documents_with_openai(text1, text2)

    return comparison_result, red_flags
