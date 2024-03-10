import { getSourceMetadataForSources, listSourceMetadata } from "@/lib/sources";
import { ValidSources } from "@/lib/types";
import Image from "next/image";
import { Persona } from "../admin/personas/interfaces";
import { Divider } from "@tremor/react";
import { FiBookmark, FiCpu, FiInfo, FiX, FiZoomIn } from "react-icons/fi";
import { HoverPopup } from "@/components/HoverPopup";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { SourceMetadata } from "@/lib/search/interfaces";

const MAX_PERSONAS_TO_DISPLAY = 4;

function HelperItemDisplay({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="cursor-default hover:bg-hover-light border border-border rounded py-2 px-4">
      <div className="text-emphasis font-bold text-lg flex">{title}</div>
      <div className="text-sm">{description}</div>
    </div>
  );
}

function AllPersonaOptionDisplay({
  availablePersonas,
  handlePersonaSelect,
  handleClose,
}: {
  availablePersonas: Persona[];
  handlePersonaSelect: (persona: Persona) => void;
  handleClose: () => void;
}) {
  return (
    <Modal onOutsideClick={handleClose}>
      <div>
        <div className="flex w-full border-b border-border mb-4 pb-4">
          <h2 className="text-xl text-strong font-bold flex">
            <div className="p-1 bg-ai rounded-lg h-fit my-auto mr-2">
              <div className="text-inverted">
                <FiCpu size={16} className="my-auto mx-auto" />
              </div>
            </div>
            All Available Assistants
          </h2>

          <div
            onClick={handleClose}
            className="ml-auto p-1 rounded hover:bg-hover"
          >
            <FiX size={18} />
          </div>
        </div>
        <div className="flex flex-col gap-y-4 max-h-96 overflow-y-auto pb-4 px-2">
          {availablePersonas.map((persona) => (
            <div
              key={persona.id}
              onClick={() => {
                handleClose();
                handlePersonaSelect(persona);
              }}
            >
              <HelperItemDisplay
                title={persona.name}
                description={persona.description}
              />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export function ChatIntro() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-message-xs 2xl:w-message-sm 3xl:w-message">
        <div className="flex">
          <div className="mx-auto">
            <div className="m-auto h-[80px] w-[80px]">
              <Image src="/logo.png" alt="Logo" width="1419" height="1520" />
            </div>
            <div className="m-auto text-3xl font-bold text-strong mt-4 w-fit">
              Welcome to Mergify.ai
            </div>
            <div className="mt-1 text-center">
              I am here to streamline your diligence process.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}