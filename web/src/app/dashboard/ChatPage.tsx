"use client";

import { useSearchParams } from "next/navigation";
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
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

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
    {
      name: 'Days Elapsed',
      count: daysElapsed,
    },
    {
      name: 'Closed Issues',
      count: closedIssuesCount,
    },
    {
      name: 'Price Increases',
      count: priceIncreasesCount,
    },
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
  // Determine the color of the status tag based on the status value
  const statusColor = (() => {
    switch (status) {
      case 'Screening':
        return 'bg-blue-100 text-blue-800';
      case 'Due Diligence':
        return 'bg-yellow-100 text-yellow-800';
      case 'Offer Made':
        return 'bg-green-100 text-green-800';
      case 'Offer Closed':
        return 'bg-purple-100 text-purple-800';
      case 'Passed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  })();

  return (
    <div className="company-info-section shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center">
      <SectionHeader name={`${companyName} Overview`} icon={FaBuilding} />
        {/* Status tag */}
        <span className={`status-tag text-sm font-semibold px-3 py-1 rounded-full ${statusColor}`}>
          {status}
        </span>
      </div>
      <p className="company-description text-gray-700 mb-4">{description}</p>
      {/* More structured details can be added here */}
    </div>
  );
};



interface ContentBoxProps {
  width: string;
  height: string;
  className?: string; // Add this line
  children: React.ReactNode;
}

export const ContentBox: React.FC<ContentBoxProps> = ({
  width,
  height,
  className,
  children,
}) => {
  return (
    <div
      className={`relative overflow-y-auto flex flex-col ${width} ${height} ${className}`}
    >
      {children}
    </div>
  );
};

export default ContentBox;

const FinancialsTable = () => (
  <div className="overflow-x-auto">
  <SectionHeader name="Financials" icon={FaTable} />

    <table className="min-w-full divide-y divide-gray-200">
    <tbody>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Net Income/Loss</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$3,000,000</td>
      </tr>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total Assets</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$40,000,000</td>
      </tr>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Average Contract Value</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$75,000</td>
      </tr>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fiscal Year Profit/Loss</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$3,000,000</td>
      </tr>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total Liabilities</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$15,000,000</td>
      </tr>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Annual Revenue</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$30,000,000</td>
      </tr>
    </tbody>
  </table>
  </div>
);


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
  defaultSelectedPersonaId?: number; // what persona to default to
  documentSidebarInitialWidth?: number;
}) {
  const searchParams = useSearchParams();
  const chatIdRaw = searchParams.get("chatId");
  const chatId = chatIdRaw ? parseInt(chatIdRaw) : null;

  const selectedChatSession = chatSessions.find(
    (chatSession) => chatSession.id === chatId
  );

  // Inside your ChatLayout function
  const companyName: string = "SolarVantage";
  const companyDescription: string = "SolarVantage, a solar energy technology company founded in 2016 by Lila Novak and Ethan Kang, has introduced a suite of products aimed at optimizing solar panel performance and energy management."; // Replace with actual description
  // Assume due diligence started on October 1st, 2023
  const dueDiligenceStartDate = 23

  // You would also pass in the actual counts for closed issues, open data requests, etc.
  // For this example, we'll use arbitrary numbers
  const closedIssuesCount = 11;
  const openDataRequestsCount = 3;
  const priceIncreasesCount = 2;

  return (
    <>
      

    <div className="bg-gray-100 p-5">
      <Header user={user} />
      <HealthCheckBanner />
      <ApiKeyModal />
      <InstantSSRAutoRefresh />

      <div className="container mx-auto my-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* ContentBox for CompanyInfo, taking full width on mobile */}
        <ContentBox width="w-full" height="auto" className="bg-white p-6 rounded-lg shadow-lg lg:col-span-5">
          <CompanyInfo companyName={companyName} description={companyDescription} status="Due Diligence"/>
        </ContentBox>

        {/* DocumentSidebar aligned to the right, taking 4 columns on large screens */}
        <ContentBox width="w-full " height="auto" className="bg-white p-6 rounded-lg shadow-lg lg:col-span-7 row-span-3">
          <DocumentSidebar />
        </ContentBox>

        {/* FinancialsTable below CompanyInfo */}
        <ContentBox width="w-full" height="auto" className="bg-white p-6 rounded-lg shadow-lg lg:col-span-5">
          <FinancialsTable />
        </ContentBox>

                {/* DueDiligenceStats below FinancialsTable */}
        <ContentBox width="w-full" height="auto" className="bg-white p-6 rounded-lg shadow-lg lg:col-span-5">
          <DueDiligenceStatsChart
            daysElapsed={dueDiligenceStartDate}
            closedIssuesCount={closedIssuesCount}
            priceIncreasesCount={priceIncreasesCount}
          />
        </ContentBox>

      </div>
    </div>
  );
    </>
  );
}
