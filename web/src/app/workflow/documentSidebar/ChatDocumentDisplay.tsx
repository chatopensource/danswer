import { HoverPopup } from "@/components/HoverPopup";
import { SourceIcon } from "@/components/SourceIcon";
import { PopupSpec } from "@/components/admin/connectors/Popup";
import { DocumentFeedbackBlock } from "@/components/search/DocumentFeedbackBlock";
import { DocumentUpdatedAtBadge } from "@/components/search/DocumentUpdatedAtBadge";
import { DanswerDocument } from "@/lib/search/interfaces";
import { FiInfo, FiRadio } from "react-icons/fi";
import { DocumentSelector } from "./DocumentSelector";
import {Issue} from "../interfaces"
import {
  DocumentMetadataBlock,
  buildDocumentSummaryDisplay,
} from "@/components/search/DocumentDisplay";

import React from 'react';

interface IssueDisplayProps {
  issue: Issue;
  isSelected: boolean;
  handleSelect: (severity: string) => void; // Adjusted for simplicity
  setPopup: (popupSpec: PopupSpec | null) => void;
  tokenLimitReached: boolean;
}



export function ChatIssueDisplay({
  issue,
  isSelected,
  handleSelect,
  setPopup,
  tokenLimitReached,
}: IssueDisplayProps) {
  return (
    <div key={issue.reasoning} className="text-sm px-3">
      <div className="flex relative w-full overflow-y-visible">
        <div className="flex-grow">
          <div className={`severity-${issue.severity.toLowerCase()} rounded-lg flex flex-shrink truncate my-2 p-2`}>
            <h3 className="font-bold">{issue.severity} Severity Issue</h3>
            <p className="text-ellipsis mx-2 my-auto">{issue.reasoning}</p>
          </div>
          <p className="mx-2 my-auto"><strong>Recommendation:</strong> {issue.immediateRecommendation}</p>
        </div>

        {/* Assuming DocumentSelector can be repurposed for selecting issues */}
        <div className="flex-none">
          <DocumentSelector
            isSelected={isSelected}
            handleSelect={() => handleSelect(issue.severity)}
            isDisabled={tokenLimitReached && !isSelected}
          />
        </div>
      </div>
    </div>
  );
}
