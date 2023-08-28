import { useContext } from "react";
import {
  DittoContext,
  SourceDetector,
  VariablesInput,
  Count,
} from "../lib/context";
import { nullError, interpolateVariableText, useProjectId } from "../lib/utils";

interface useDittoSingleTextProps {
  projectId?: string | null;
  textId: string;
  variables?: VariablesInput;
  count?: Count;
}

export const useDittoSingleText = (
  props: useDittoSingleTextProps,
): string | null => {
  const { textId, variables, count } = props;
  const { source, variant } = useContext(DittoContext);

  const projectId = useProjectId(props);
  if (!projectId) return nullError("No Project ID provided.");

  if (variant) {
    const data = source?.[projectId]?.[variant];
    if (data) {
      if (SourceDetector.isStructured(data) || SourceDetector.isFlat(data)) {
        return interpolateVariableText(
          data[textId],
          variables || {},
          count,
          false,
        ).text;
      }

      if (SourceDetector.isFrame(data)) {
        for (const frameId in data) {
          const frame = data[frameId];

          for (const blockId in frame.blocks) {
            const block = frame.blocks[blockId];

            if (textId in block)
              return interpolateVariableText(
                block[textId],
                variables || {},
                count,
                false,
              ).text;
          }

          if (frame.otherText && textId in frame.otherText)
            return interpolateVariableText(
              frame.otherText[textId],
              variables || {},
              count,
              false,
            ).text;
        }
      }
    }
  }

  const data = source?.[projectId]?.base;
  if (!data) {
    return nullError(`Project not found with id "${projectId}"`);
  }

  if (SourceDetector.isStructured(data) || SourceDetector.isFlat(data)) {
    return interpolateVariableText(data[textId], variables || {}, count, false)
      .text;
  }

  if (SourceDetector.isFrame(data)) {
    for (const frameId in data) {
      const frame = data[frameId];

      for (const blockId in frame.blocks) {
        const block = frame.blocks[blockId];

        if (textId in block)
          return interpolateVariableText(
            block[textId],
            variables || {},
            count,
            false,
          ).text;
      }

      if (frame.otherText && textId in frame.otherText)
        return interpolateVariableText(
          frame.otherText[textId],
          variables || {},
          count,
          false,
        ).text;
    }
  }

  return nullError(`Text not found for id "${textId}"`);
};
