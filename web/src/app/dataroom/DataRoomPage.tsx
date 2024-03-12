
// Add more as needed

import { BoxIcon, DatasiteIcon, GoogleDriveIcon, IDealsIcon } from "@/components/icons/icons";
import ContentBox from "../dashboard/ChatPage";
import { Header } from "@/components/Header";
import { InstantSSRAutoRefresh } from "@/components/SSRAutoRefresh";
import { HealthCheckBanner } from "@/components/health/healthcheck";
import { ApiKeyModal } from "@/components/openai/ApiKeyModal";
import { User } from "@phosphor-icons/react";

// Define a new component for the data room providers


// Define a new component for the data room providers
const DataRoomProviders: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex justify-center items-center">
        <BoxIcon size={80} /> {/* Adjusted the size to match the className="h-20" */}
      </div>
      <div className="flex justify-center items-center">
        <DatasiteIcon size={80} />
      </div>
      <div className="flex justify-center items-center">
        <GoogleDriveIcon size={80} />
      </div>
      {/* <div className="flex justify-center items-center">
        <IDealsIcon size={80} />
      </div> */}
      {/* <div className="flex justify-center items-center">
        <IntralinksIcon size={80} />
      </div> */}
      {/* Add more as needed */}
    </div>
  );
};

export default DataRoomProviders;

// Then use this new `DataRoomProviders` component within your `DataRoomLayout`:
export function DataRoomLayout({
  user,
  issue_id
}: {
  user: User | null;
  issue_id:number
}) {
  // ...

  return (
    <>
      <div className="bg-gray-100 p-5">
      <Header user={user} />
      <HealthCheckBanner />
      <ApiKeyModal />
      <InstantSSRAutoRefresh />
        
        {/* Insert the new DataRoomProviders component into the layout */}
        <ContentBox width="w-full" height="auto" className="bg-white p-6 rounded-lg shadow-lg lg:col-span-6">
          <DataRoomProviders />
        </ContentBox>

        {/* ... rest of your components */}
      </div>
    </>
  );
}
