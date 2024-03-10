import { useState } from "react";
import { Issue } from "./interfaces";

export function useIssueSelection(): [
  Issue[],
  (issue: Issue) => void,
  () => void
] {
  const [selectedIssues, setSelectedIssues] = useState<Issue[]>([]);

  function toggleIssueSelection(issue: Issue) {
    const exists = selectedIssues.some((i) => i.issue_id === issue.issue_id);
    if (exists) {
      // Deselect the issue if it's already selected
      setSelectedIssues(selectedIssues.filter((i) => i.issue_id !== issue.issue_id));
    } else {
      // Select the issue if it's not already selected
      setSelectedIssues([...selectedIssues, issue]);
    }
  }

  function clearSelectedIssues() {
    setSelectedIssues([]);
  }

  return [selectedIssues, toggleIssueSelection, clearSelectedIssues];
}
