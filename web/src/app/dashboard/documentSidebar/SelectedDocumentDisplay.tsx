import { SourceIcon } from "@/components/SourceIcon";
import { DanswerDocument } from "@/lib/search/interfaces";
import { DocumentSelector } from "./DocumentSelector";
import { Issue } from "../interfaces";

export function SelectedDocumentDisplay({
  issue,
  handleDeselect,
}: {
  issue: Issue;
  handleDeselect: (issueId: number) => void;
}) {
  return (
    <div className="flex">
      {/* <SourceIcon sourceType={issue.source_type} iconSize={18} /> */}
      <p className="truncate break-all mx-2 my-auto text-sm max-w-4/6">
        {issue.reasoning || issue.issue_id}
      </p>
      <DocumentSelector
        isSelected={true}
        handleSelect={() => handleDeselect(issue.issue_id)}
      />
    </div>
  );
}
