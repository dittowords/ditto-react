import { useContext } from "react";
import { Count, DittoContext, SourceDetector, VariablesInput } from "../lib/context";
import { interpolateVariableText, nullError, useProjectId } from "../lib/utils";

interface useDittoSingleTextProps {
  projectId?: string | null;
  textId: string;
  variables?: VariablesInput;
  count?: Count;
  richText?: boolean;
}

export const useDittoSingleText = (props: useDittoSingleTextProps): string | null => {
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
          Boolean(props.richText),
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
                Boolean(props.richText),
              ).text;
          }

          if (frame.otherText && textId in frame.otherText)
            return interpolateVariableText(
              frame.otherText[textId],
              variables || {},
              count,
              Boolean(props.richText),
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
    return interpolateVariableText(data[textId], variables || {}, count, Boolean(props.richText))
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
            Boolean(props.richText),
          ).text;
      }

      if (frame.otherText && textId in frame.otherText)
        return interpolateVariableText(
          frame.otherText[textId],
          variables || {},
          count,
          Boolean(props.richText),
        ).text;
    }
  }

  return nullError(`Text not found for id "${textId}"`);
};
