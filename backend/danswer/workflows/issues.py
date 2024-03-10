from pydantic import BaseModel

from danswer.chat.models import Issue

# List of updated employment issues with shortened recommendations
EMPLOYMENT_ISSUES = [
    Issue(
        document_type="Employment",
        issue_id=1,
        severity="Medium",
        reasoning="Non-Competition and Confidentiality Clauses require legal review for enforceability and protection without over-restriction.",
        immediateRecommendation="Review legality and adjust if needed."
    ),
    Issue(
        document_type="Employment",
        issue_id=2,
        severity="Low",
        reasoning="The at-will clause offers flexibility but requires lawful termination processes to avoid lawsuits.",
        immediateRecommendation="Ensure fair, lawful termination processes."
    ),
    Issue(
        document_type="Employment",
        issue_id=3,
        severity="Medium",
        reasoning="Termination Benefits and Severance Pay need consideration in financial planning for acquisition costs.",
        immediateRecommendation="Incorporate severance into cost analysis."
    ),
    Issue(
        document_type="Employment",
        issue_id=4,
        severity="Medium",
        reasoning="Lack of clear change of control provisions adds post-acquisition planning uncertainty.",
        immediateRecommendation="Add or clarify control change provisions."
    ),
    Issue(
        document_type="Employment",
        issue_id=5,
        severity="Low",
        reasoning="Arbitration venue specificity in Houston, Texas, may introduce legal or operational challenges.",
        immediateRecommendation="Consider a neutral arbitration venue."
    )
]

# Generate a string representation of the issues
EMPLOYMENT_ISSUES_STRING = '\n\n'.join([
    f"Issue ID: {issue.issue_id}, Severity: {issue.severity}, Reasoning: {issue.reasoning}, Recommendation: {issue.immediateRecommendation}"
    for issue in EMPLOYMENT_ISSUES
])

print(EMPLOYMENT_ISSUES_STRING)
