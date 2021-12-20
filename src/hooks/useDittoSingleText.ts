import { useContext } from "react";
import { Plurals } from "../components/Ditto";
import { DittoContext, SourceDetector, Variables, Count } from "../lib/context";
import { nullError, interpolateVariableText } from "../lib/utils";

interface useDittoSingleTextProps {
  projectId?: string;
  textId: string;
  variables: Variables;
  count?: Count;
}

export const useDittoSingleText = (props: useDittoSingleTextProps) => {
  const { projectId, textId, variables = {}, count } = props;
  const { source, variant, options } = useContext(DittoContext);

  if (!projectId) return nullError("No Project ID provided.");

  if (variant) {
    const data = source?.[projectId]?.[variant];
    if (data) {

      if (SourceDetector.isStructured(data)) {
        return interpolateVariableText(data[textId], variables).text;
      }

      if (SourceDetector.isFlat(data)) {
        return interpolateVariableText(data[textId], variables);
      }

      if (SourceDetector.isFrame(data)) {
        for (const frameId in data) {
          const frame = data[frameId];

          for (const blockId in frame.blocks) {
            const block = frame.blocks[blockId];

            if (textId in block) return interpolateVariableText(block[textId], variables).text;
          }

          if (frame.otherText && textId in frame.otherText)
            return interpolateVariableText(frame.otherText[textId], variables).text;
        }
      }
    }

    if (options?.environment !== "production") {
      const message = `Text not found for textId: "${textId}"`;
      console.error(message);
      return message;
    }
  }

  const data = source?.[projectId]?.base;
  if (!data) {
    return nullError(`Project not found with id "${projectId}"`);
  }

  if (SourceDetector.isStructured(data)) {
    return interpolateVariableText(data[textId], variables, count).text;
  }

  if (SourceDetector.isFlat(data)) {
    return interpolateVariableText(data[textId], variables, count);
  }

  if (SourceDetector.isFrame(data)) {
    for (const frameId in data) {
      const frame = data[frameId];

      for (const blockId in frame.blocks) {
        const block = frame.blocks[blockId];

        if (textId in block) return interpolateVariableText(block[textId], variables, count).text;
      }

      if (frame.otherText && textId in frame.otherText)
        return interpolateVariableText(frame.otherText[textId], variables, count).text;
    }
  }

  return `Text not found for id "${textId}"`;
};
