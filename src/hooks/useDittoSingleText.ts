import { useContext } from "react";
import { DittoContext } from "../lib/context";
import { error, nullError } from "../lib/utils";

interface useDittoSingleTextProps {
  projectId: string;
  textId: string;
}

export const useDittoSingleText = (props: useDittoSingleTextProps) => {
  const { projectId, textId } = props;
  const copy = useContext(DittoContext);

  if (!projectId) 
    return nullError('No Project ID provided.');
  
  const project = copy.projects[projectId];

  for (const frameId in project.frames) {
    const frame = project.frames[frameId];

    for (const blockId in frame.blocks) {
      const block = frame.blocks[blockId];

      if (textId in block) 
        return block[textId].text
    }

    if (frame.otherText && textId in frame.otherText) 
      return frame.otherText[textId].text
  }

  return error(`[Text not found in Ditto project with ID: [${textId}]]`);
}
