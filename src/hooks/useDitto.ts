import { useContext } from "react";
import { DittoContext, SourceDetector, VariablesInput } from "../lib/context";
import { filterFrame, filterBlock, nullError } from "../lib/utils";

interface useDittoProps {
  projectId?: string;
  frameId: string;
  blockId?: string;
  variables?: VariablesInput;
  count?: number;
  filters?: {
    tags: string[];
  };
}

export const useDitto = (props: useDittoProps) => {
  const { projectId, frameId, blockId, filters, variables, count } = props;
  const { source, variant } = useContext(DittoContext);

  if (!projectId) return nullError("No Project ID provided.");

  if (variant) {
    const data = source?.[projectId]?.[variant];
    if (SourceDetector.isFrame(data) && frameId) {
      const frame = data[frameId];
      if (frame) {
        if (!blockId) {
          return filterFrame(frame, variables || {}, count, filters);
        }
        if (blockId in frame.blocks) {
          const block = frame.blocks[blockId];
          if (block) {
            return filterBlock(block, variables || {}, count, filters);
          }
        }
      }
    }
  }

  const data = source[projectId]?.base;
  if (!data) {
    return nullError(`Project not found with id "${projectId}"`);
  }

  if (!SourceDetector.isFrame(data)) {
    return nullError(
      `Default format must be used if passing "frameId" or "blockId"`
    );
  }

  if (!frameId) {
    return nullError("No Frame ID provided.");
  }

  const frame = data[frameId];
  if (!frame)
    return nullError(
      `Frame "${frameId}" not found this project "${projectId}"`
    );

  if (!blockId) return filterFrame(frame, variables || {}, count, filters);

  const block = frame.blocks[blockId];
  if (!block)
    return nullError(
      `Block "${blockId}" not found in frame "${frameId}" in project "${projectId}"`
    );

  return filterBlock(block, variables || {}, count, filters);
};
