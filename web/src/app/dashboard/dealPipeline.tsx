"use client";

import { Dropdown } from "@/components/Dropdown";
import { Button } from "@tremor/react";
import { ProgressBar } from "react-loader-spinner";
import Image from "next/image";

// Assuming these interfaces match what the components expect
interface Option<T> {
  name: string;
  value: T;
  description?: string;
  metadata?: { [key: string]: any };
}

interface DropdownProps<T> {
  options: Option<T>[];
  selected: string;
  onSelect: (selected: Option<T> | null) => void;
}

interface ProgressBarProps {
  color?: string;
  height?: number;
  width?: number;
  progress: number;
}

export default function DealPipeline() {
  // Fetch and manage deal pipeline data
  const dropdownOptions: DropdownProps<string>['options'] = [
    { name: "Option 1", value: "option1" },
    { name: "Option 2", value: "option2" },
  ];
  const selectedOption: DropdownProps<string>['selected'] = "option1";
  const handleDropdownSelect: DropdownProps<string>['onSelect'] = (value) => {
    // Handle dropdown selection
    console.log(value); // Just for example, to do something with the value
  };

  const progressBarProps: ProgressBarProps = {
    color: "blue",
    height: 10,
    width: 200,
    progress: 91,
  };

  return (
    <>
    <div className="deal-pipeline">
      <div className="header">
        <h2>Deal Pipeline</h2>
        <div className="header-actions">
          <Dropdown
            options={dropdownOptions}
            selected={selectedOption}
            onSelect={() => {}}
          />
          <Button>Delete</Button>
        </div>
      </div>
      <div className="company-info">
        <Image
          src="/path/to/company-logo.png"
          alt="Company Logo"
          width={100}
          height={100}
        />
        <div className="company-description">
          Amplitude was founded in 2014 by Spencer Skates and Curtis Liu. The
          company specializes in digital analytics, helping businesses optimize
          digital operations. Their first product, Amplitude Analytics, was
          recognized as a significant software product, and later, they expanded
          their offerings with Amplitude Recommend and Amplitude Experiment.
        </div>
      </div>
      <div className="attributes">
        <div className="attribute">
          <span className="attribute-label">Financials</span>
        </div>
        <div className="attribute">
          <span className="attribute-label">NET INCOME/LOSS</span>
          <span className="attribute-value">-$16,522,000.00</span>
        </div>
        <div className="attribute">
          <span className="attribute-label">TOTAL ASSETS</span>
          <span className="attribute-value">$376,632,000.00</span>
        </div>
        <div className="attribute">
          <span className="attribute-label">AVERAGE CONTRACT VALUE</span>
          <span className="attribute-value">$108,515.00</span>
        </div>
        <div className="attribute">
          <span className="attribute-label">FISCAL YEAR PROFIT/LOSS</span>
          <span className="attribute-value">$6,480,000.00</span>
        </div>
        <div className="attribute">
          <span className="attribute-label">TOTAL LIABILITIES</span>
          <span className="attribute-value">$81,108,000.00</span>
        </div>
        <div className="attribute">
          <span className="attribute-label">ANNUAL REVENUE</span>
          <span className="attribute-value">$102,464,000.00</span>
        </div>
      </div>
      <div className="flags">
        {/* Flags */}
      </div>
      <div className="progress">
        <h3>In Diligence</h3>
        <ProgressBar {...progressBarProps} />
      </div>
      <div className="deal-details">
        {/* Deal details */}
      </div>
    </div>
  );
  </>)
}
