import { useContext } from "react";
import { DittoContext, SourceDetector } from "../lib/context";
import { nullError } from "../lib/utils";

interface useDittoSingleTextProps {
  projectId?: string;
  textId: string;
}

export const useDittoSingleText = (props: useDittoSingleTextProps) => {
  const { projectId, textId } = props;
  const { source, variant, options } = useContext(DittoContext);

  if (!projectId) return nullError("No Project ID provided.");

  if (variant) {
    const data = source[projectId][variant];
    if (data) {
      if (SourceDetector.isStructured(data)) {
        return data[textId].text;
      }

      if (SourceDetector.isFlat(data)) {
        return data[textId];
      }

      if (SourceDetector.isFrame(data)) {
        for (const frameId in data) {
          const frame = data[frameId];

          for (const blockId in frame.blocks) {
            const block = frame.blocks[blockId];

            if (textId in block) return block[textId].text;
          }

          if (frame.otherText && textId in frame.otherText)
            return frame.otherText[textId].text;
        }
      }
    }

    if (options?.environment !== "production") {
      const message = `Text not found for textId: "${textId}"`;
      console.error(message);
      return message;
    }
  }

  const data = source[projectId].base;
  if (!data) {
    return nullError(`Project not found with id "${projectId}"`);
  }

  if (SourceDetector.isStructured(data)) {
    return data[textId].text;
  }

  if (SourceDetector.isFlat(data)) {
    return data[textId];
  }

  if (SourceDetector.isFrame(data)) {
    for (const frameId in data) {
      const frame = data[frameId];

      for (const blockId in frame.blocks) {
        const block = frame.blocks[blockId];

        if (textId in block) return block[textId].text;
      }

      if (frame.otherText && textId in frame.otherText)
        return frame.otherText[textId].text;
    }
  }

  return `Text not found for id "${textId}"`;
};
