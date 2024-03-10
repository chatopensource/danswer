import { DanswerDocument } from "@/lib/search/interfaces";
import { Text } from "@tremor/react";
import { ChatIssueDisplay } from "./ChatDocumentDisplay";
import { usePopup } from "@/components/admin/connectors/Popup";
import { FiAlertTriangle, FiFileText } from "react-icons/fi";
import { SelectedDocumentDisplay } from "./SelectedDocumentDisplay";
import { removeDuplicateDocs } from "@/lib/documentUtils";
import { BasicSelectable } from "@/components/BasicClickable";
import { Issue, Message, RetrievalType } from "../interfaces";
import { HEADER_PADDING } from "@/lib/constants";
import { HoverPopup } from "@/components/HoverPopup";


const currentIssues: Issue[] = [
    // Assuming there are 'High' severity issues, they would be placed here
    {
        document_type: "Employment Contract",
        issue_id: 1,
        severity: "Medium",
        reasoning: "Non-Competition and Confidentiality Clauses require legal review for enforceability and protection without over-restriction.",
        immediateRecommendation: "Review legality and adjust if needed."
    },
    {
        document_type: "Employment Contract",
        issue_id: 3,
        severity: "Medium",
        reasoning: "Termination Benefits and Severance Pay need consideration in financial planning for acquisition costs.",
        immediateRecommendation: "Incorporate severance into cost analysis."
    },
    {
        document_type: "Employment Contract",
        issue_id: 4,
        severity: "Medium",
        reasoning: "Lack of clear change of control provisions adds post-acquisition planning uncertainty.",
        immediateRecommendation: "Add or clarify control change provisions."
    },
    {
        document_type: "Employment Contract",
        issue_id: 2,
        severity: "Low",
        reasoning: "The at-will clause offers flexibility but requires lawful termination processes to avoid lawsuits.",
        immediateRecommendation: "Ensure fair, lawful termination processes."
    },
    {
        document_type: "Employment Contract",
        issue_id: 5,
        severity: "Low",
        reasoning: "Arbitration venue specificity in Houston, Texas, may introduce legal or operational challenges.",
        immediateRecommendation: "Consider a neutral arbitration venue."
    }
];


function SectionHeader({
  name,
  icon,
}: {
  name: string;
  icon: React.FC<{ className: string }>;
}) {
  return (
    <div className="text-lg text-emphasis font-medium flex pb-0.5 mb-3.5 mt-2 font-bold">
      {icon({ className: "my-auto mr-1" })}
      {name}
    </div>
  );
}

export function DocumentSidebar() {
  return (
    <div
      className="flex-initial overflow-hidden flex flex-col w-full h-screen"
      id="document-sidebar"
    >
      <div className="h-full flex flex-col">
        <div className="px-3 mb-3 flex border-b border-border">
          <SectionHeader name="Issues Flagged" icon={FiFileText} />
        </div>

        <div className="flex-grow overflow-y-auto dark-scrollbar">
          {currentIssues.length > 0 ? (
            currentIssues.map((issue, index) => (
              <div
                key={issue.issue_id}
                className={`px-3 py-2 ${index === currentIssues.length - 1 ? '' : 'border-b border-border-light'}`}
              >
                  <ChatIssueDisplay
                  issue={issue}
                />
              </div>
            ))
          ) : (
            <p className="px-3">No issues found.</p>
          )}
        </div>
      </div>
    </div>
  );
}