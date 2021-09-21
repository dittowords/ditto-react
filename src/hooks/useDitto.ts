import { useContext } from "react";
import { DittoContext } from "../lib/context";
import { filterFrame, filterBlock, nullError } from "../lib/utils";

interface useDittoProps {
  projectId: string;
  frameId: string;
  blockId?: string;
  filters?: {
    tags: string[];
  };
}

export const useDitto = (props: useDittoProps) => {
  const { projectId, frameId, blockId, filters } = props;
  const { source } = useContext(DittoContext);

  if (!source.projects)
    return nullError("Source JSON for DittoProvider does not have projects.");

  if (!projectId) return nullError("No Project ID provided.");

  const project = source.projects[projectId];
  if (!project) {
    return `[Project not found with id "${projectId}"]`;
  }

  if (!frameId) {
    return nullError("No Frame ID provided.");
  }
  if (!(frameId in project.frames))
    return nullError(
      `Frame of ID [${frameId}] not found in this Ditto project.`
    );

  const frame = project.frames[frameId];

  if (!blockId) return filterFrame(frame, filters);

  if (!(blockId in frame.blocks))
    return nullError(
      `Block of ID [${blockId}] not found in frame of ID [${frameId}] in this Ditto project.`
    );

  const block = frame.blocks[blockId];

  return filterBlock(block, filters);
};
