import { useContext } from "react";
import { DittoContext } from "../lib/context";
import {
  filterFrame,
  filterBlock,
  nullError,
  isDefaultFormatProject,
  isProductionDittoEnvironment,
} from "../lib/utils";

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
  const { sourceBase, sourceVariant, variant } = useContext(DittoContext);

  if (!sourceBase.projects)
    return nullError("Source JSON for DittoProvider does not have projects.");

  if (!projectId) return nullError("No Project ID provided.");

  if (variant) {
    const project = sourceVariant?.projects[projectId];
    if (isDefaultFormatProject(project) && frameId) {
      const frame = project.frames[frameId];
      if (!blockId) {
        return filterFrame(frame, filters);
      }
      if (blockId in frame.blocks) {
        const block = frame.blocks[blockId];
        return filterBlock(block, filters);
      }
    }

    if (!isProductionDittoEnvironment) {
      const message = `Text not found for frameId: "${frameId}", blockId: "${blockId}"`;
      console.error(message);
      return message;
    }
  }

  const project = sourceBase.projects[projectId];
  if (!project) {
    return nullError(`Project not found with id "${projectId}"`);
  }
  if (!isDefaultFormatProject(project)) {
    return nullError(
      `Default format must be used if passing "frameId" or "blockId"`
    );
  }

  if (!frameId) {
    return nullError("No Frame ID provided.");
  }
  if (!(frameId in project.frames))
    return nullError(
      `Frame "${frameId}" not found this project "${projectId}"`
    );

  const frame = project.frames[frameId];

  if (!blockId) return filterFrame(frame, filters);

  if (!(blockId in frame.blocks))
    return nullError(
      `Block "${blockId}" not found in frame "${frameId}" in project "${projectId}"`
    );

  const block = frame.blocks[blockId];

  return filterBlock(block, filters);
};
