"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AiOutlineEdit, AiOutlineCheck, AiOutlineLoading3Quarters, AiOutlineCheckCircle } from "react-icons/ai";
import { ChatSession } from "./interfaces";
import { ChatSidebar } from "./sessionSidebar/ChatSidebar";
import { Chat } from "./Chat";
import { DocumentSet, Tag, User, ValidSources } from "@/lib/types";
import { Persona } from "../admin/personas/interfaces";
import { Header } from "@/components/Header";
import { HealthCheckBanner } from "@/components/health/healthcheck";
import { ApiKeyModal } from "@/components/openai/ApiKeyModal";
import { InstantSSRAutoRefresh } from "@/components/SSRAutoRefresh";
import { DocumentSidebar } from "./documentSidebar/DocumentSidebar";
import { FaAcquisitionsIncorporated, FaBuilding, FaClock, FaSatellite, FaTable } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function SectionHeader({ name, icon, }: { name: string; icon: React.FC<{ className: string }>; }) {
  return (
    <div className="text-lg text-emphasis font-medium flex pb-0.5 mb-3.5 mt-2 font-bold">
      {icon({ className: "my-auto mr-1" })}
      {name}
    </div>
  );
}

interface DueDiligenceStatsProps {
  daysElapsed: number;
  closedIssuesCount: number;
  priceIncreasesCount: number;
}

export const DueDiligenceStatsChart: React.FC<DueDiligenceStatsProps> = ({
  daysElapsed,
  closedIssuesCount,
  priceIncreasesCount,
}) => {
  const data = [
    { name: 'Days Elapsed', count: daysElapsed },
    { name: 'Closed Issues', count: closedIssuesCount },
    { name: 'Price Increases', count: priceIncreasesCount },
  ];

  return (
    <>
      <SectionHeader name="Deal Status" icon={FaClock} />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

interface CompanyInfoProps {
  companyName: string;
  description: string;
  status: 'Screening' | 'Due Diligence' | 'Offer Made' | 'Offer Closed' | 'Passed';
}

export const CompanyInfo: React.FC<CompanyInfoProps> = ({ companyName, description, status }) => {
  const statusColor = (() => {
    switch (status) {
      case 'Screening': return 'bg-blue-100 text-blue-800';
      case 'Due Diligence': return 'bg-yellow-100 text-yellow-800';
      case 'Offer Made': return 'bg-green-100 text-green-800';
      case 'Offer Closed': return 'bg-purple-100 text-purple-800';
      case 'Passed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  })();

  return (
    <div className="company-info-section shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center">
        <SectionHeader name={`${companyName} Overview`} icon={FaBuilding} />
        <span className={`status-tag text-sm font-semibold px-3 py-1 rounded-full ${statusColor}`}>
          {status}
        </span>
      </div>
      <p className="company-description text-gray-700 mb-4">{description}</p>
    </div>
  );
};

interface ContentBoxProps {
  width: string;
  height: string;
  className?: string;
  children: React.ReactNode;
}

export const ContentBox: React.FC<ContentBoxProps> = ({
  width,
  height,
  className = '',
  children,
}) => {
  return (
    <div className={`relative overflow-y-auto flex flex-col ${width} ${height} ${className}`}>
      {children}
    </div>
  );
};

const FinancialsTable = () => {
  // State hooks for each editable financial figure
  const [netIncome, setNetIncome] = useState("$3,000,000");
  const [totalAssets, setTotalAssets] = useState("$40,000,000");
  const [ACV, setACV] = useState("$75,000");
  const [totalPL, setTotalPL] = useState("$3,000,000");
  const [totalTL, setTotalTL] = useState("$15,000,000");
  const [totalRevenue, setTotalRevenue] = useState("$30,000,000");
  // Additional states as needed

  // Function to render each row with an editable input and tooltip

  const renderEditableRow = (label, value, setValue) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{label}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
          {isEditing ? (
            <>
              <input
                className="border-2 border-gray-300 mr-2 p-1 rounded"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={() => setIsEditing(false)}
                onKeyPress={(e) => e.key === 'Enter' && (setValue(tempValue), setIsEditing(false))}
              />
              <AiOutlineCheck onClick={() => (setValue(tempValue), setIsEditing(false))} />
            </>
          ) : (
            <>
              <a className="hover:text-blue-500 cursor-pointer" onMouseOver={(e) => {}}>
                {value}
              </a>
              <AiOutlineEdit className="ml-2 cursor-pointer" onClick={() => setIsEditing(true)} />
            </>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="overflow-x-auto">
      <SectionHeader name="Financials" icon={FaTable} />
      <table className="min-w-full divide-y divide-gray-200">
        <tbody>
          {renderEditableRow("Net Income/Loss", netIncome, setNetIncome)}
          {renderEditableRow("Total Assets", totalAssets, setTotalAssets)}
          {renderEditableRow("Average Contract Value", ACV, setACV)}
          {renderEditableRow("Fiscal Year Profit/Loss", totalPL, setTotalPL)}
          {renderEditableRow("Total Liabilities", totalTL, setTotalTL)}
          {renderEditableRow("Annual Revenue", totalRevenue, setTotalRevenue)}
          {/* Additional rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export function ChatLayout({
  user,
  chatSessions,
  availableSources,
  availableDocumentSets,
  availablePersonas,
  availableTags,
  defaultSelectedPersonaId,
  documentSidebarInitialWidth,
}: {
  user: User | null;
  chatSessions: ChatSession[];
  availableSources: ValidSources[];
  availableDocumentSets: DocumentSet[];
  availablePersonas: Persona[];
  availableTags: Tag[];
  defaultSelectedPersonaId?: number;
  documentSidebarInitialWidth?: number;
}) {
  const searchParams = useSearchParams();
  const chatIdRaw = searchParams.get("chatId");
  const chatId = chatIdRaw ? parseInt(chatIdRaw) : null;

  const selectedChatSession = chatSessions.find((chatSession) => chatSession.id === chatId);

  return (
    <>
      <div className="bg-gray-100 p-5">
        <Header user={user} />
        <HealthCheckBanner />
        <ApiKeyModal />
        <InstantSSRAutoRefresh />

        <div className="container mx-auto my-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <ContentBox width="w-full" height="auto" className="bg-white p-6 rounded-lg shadow-lg lg:col-span-5">
            <CompanyInfo companyName="SolarVantage" description="SolarVantage, a solar energy technology company founded in 2016 by Lila Novak and Ethan Kang, has introduced a suite of products aimed at optimizing solar panel performance and energy management." status="Due Diligence" />
          </ContentBox>

          <ContentBox width="w-full" height="auto" className="bg-white p-6 rounded-lg shadow-lg lg:col-span-7 row-span-3">
            <DocumentSidebar />
          </ContentBox>

          <ContentBox width="w-full" height="auto" className="bg-white p-6 rounded-lg shadow-lg lg:col-span-5">
            <FinancialsTable />
          </ContentBox>

          <ContentBox width="w-full" height="auto" className="bg-white p-6 rounded-lg shadow-lg lg:col-span-5">
            <DueDiligenceStatsChart daysElapsed={23} closedIssuesCount={11} priceIncreasesCount={2} />
          </ContentBox>
        </div>
      </div>
    </>
  );
}
