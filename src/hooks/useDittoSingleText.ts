import { useContext } from "react";
import { DittoContext } from "../lib/context";
import { error, nullError } from "../lib/utils";

interface useDittoSingleTextProps {
  projectId: string;
  textId: string;
}

export const useDittoSingleText = (props: useDittoSingleTextProps) => {
  const { projectId, textId } = props;
  const { source } = useContext(DittoContext);

  if (!projectId) return nullError("No Project ID provided.");

  const project = source.projects[projectId];
  if (!project) {
    return `[Project not found with id "${projectId}"]`;
  }

  // handles 'flat' format
  if (textId in project && typeof project[textId] === "string")
    return project[textId];

  for (const frameId in project.frames) {
    const frame = project.frames[frameId];

    for (const blockId in frame.blocks) {
      const block = frame.blocks[blockId];

      if (textId in block) return block[textId].text;
    }

    if (frame.otherText && textId in frame.otherText)
      return frame.otherText[textId].text;
  }

  return `[Text not found for id "${textId}"]`;
};
