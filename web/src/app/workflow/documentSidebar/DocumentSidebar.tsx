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


// Dummy data for issues - replace with real data fetching logic
const issuesArray = [
  // Example issues
  {
    severity: 'High',
    reasoning: 'Issue reasoning 1',
    immediateRecommendation: 'Immediate action 1',
  },
  {
    severity: 'Medium',
    reasoning: 'Issue reasoning 2',
    immediateRecommendation: 'Immediate action 2',
  },
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

export function DocumentSidebar({
  selectedMessage,
  selectedIssues,
  toggleIssueSelection,
  clearSelectedIssues,
  selectedDocumentTokens,
  maxTokens,
  isLoading,
}: {
  selectedMessage: Message | null;
  selectedIssues: Issue[] | null;
  toggleIssueSelection: (issue: Issue) => void;
  clearSelectedIssues: () => void;
  selectedDocumentTokens: number;
  maxTokens: number;
  isLoading: boolean;
}) {
  const { popup, setPopup } = usePopup();

  const selectedMessageRetrievalType = selectedMessage?.retrievalType || null;

  const selectedIssueIds =
    selectedIssues?.map((issue) => issue.issue_id) || [];

  const currentIssues = selectedMessage?.issues || null;
  // const dedupedDocuments = removeDuplicateDocs(currentDocuments || []);

  // NOTE: do not allow selection if less than 75 tokens are left
  // this is to prevent the case where they are able to select the doc
  // but it basically is unused since it's truncated right at the very
  // start of the document (since title + metadata + misc overhead) takes up
  // space
  const tokenLimitReached = selectedDocumentTokens > maxTokens - 75;
  return (
    <div
      className={`
      flex-initial 
      overflow-y-hidden
      flex
      flex-col
      w-full
      h-screen
      ${HEADER_PADDING}
      `}
      id="document-sidebar"
    >
      {popup}

      <div className="h-4/6 flex flex-col mt-4">
  <div className="px-3 mb-3 flex border-b border-border">
    <SectionHeader
      name="Issues Flagged"
      icon={FiFileText}
    />
  </div>

      {currentIssues ? (
        <div className="overflow-y-auto dark-scrollbar flex flex-col">
          <div>
            {currentIssues.length > 0 ? (
              currentIssues.map((issue, ind) => (
                <div
                  key={ind} // assuming each issue doesn't have a unique ID like document_id; adjust as needed
                  className={
                    ind === currentIssues.length - 1
                      ? "mb-5"
                      : "border-b border-border-light mb-3"
                  }
                >
                  <ChatIssueDisplay
                    issue={issue}
                    isSelected={selectedIssueIds.includes(issue.issue_id)} // Adjusted to track selected issues by severity
                    handleSelect={(severity) => {
                      // Logic to handle selection, potentially updating an array of selected severities
                      toggleIssueSelection(issue);
                    }}
                    setPopup={setPopup}
                    tokenLimitReached={tokenLimitReached}
                  />
                </div>
              ))
            ) : (
              <div className="mx-3">
                <Text>No issues found.</Text>
              </div>
            )}
          </div>
        </div>
      ) : (
        !isLoading && (
          <div className="ml-4 mr-3">
            <Text>
              Ask questions of the data in your data room.
            </Text>
          </div>
        )
      )}
    </div>


      <div className="text-sm mb-4 border-t border-border pt-4 overflow-y-hidden flex flex-col">
        <div className="flex border-b border-border px-3">
          <div className="flex">
            <SectionHeader name="Selected Documents" icon={FiFileText} />

            {tokenLimitReached && (
              <div className="ml-2 my-auto">
                <div className="mb-2">
                  <HoverPopup
                    mainContent={
                      <FiAlertTriangle
                        className="text-alert my-auto"
                        size="16"
                      />
                    }
                    popupContent={
                      <Text className="w-40">
                        Over LLM context length by:{" "}
                        <i>{selectedDocumentTokens - maxTokens} tokens</i>
                        <br />
                        <br />
                        {selectedIssues && selectedIssues.length > 0 && (
                          <>
                            Truncating: &quot;
                            <i>
                              {
                                selectedIssues[selectedIssues.length - 1]
                                  .reasoning
                              }
                            </i>
                            &quot;
                          </>
                        )}
                      </Text>
                    }
                    direction="left"
                  />
                </div>
              </div>
            )}
          </div>

          {selectedIssues && selectedIssues.length > 0 && (
            <div className="ml-auto my-auto" onClick={clearSelectedIssues}>
              <BasicSelectable selected={false}>De-Select All</BasicSelectable>
            </div>
          )}
        </div>

        {currentIssues && currentIssues.length > 0 && selectedIssues && selectedIssues.length > 0 ? (
          <div className="flex flex-col gap-y-2 py-3 px-3 overflow-y-auto dark-scrollbar max-h-full">
            {selectedIssues.map((issue) => (
              <SelectedDocumentDisplay
                key={issue.issue_id}
                issue={issue}
                handleDeselect={(issueId) => {
                  toggleIssueSelection(
                    currentIssues.find(
                      (issue) => issue.issue_id === Number(issueId)
                    )!
                  );
                }}
              />
            ))}
          </div>
        ) : (
          !isLoading && (
            <Text className="mx-3 py-3">
              Select documents from the retrieved documents section to chat
              specifically with them!
            </Text>
          )
        )}
      </div>
    </div>
  );
}
