import { useContext } from "react";
import { DittoContext, SourceDetector, VariablesInput } from "../lib/context";
import { interpolateVariableText, nullError } from "../lib/utils";

interface Args {
  componentId: string;
  variables?: VariablesInput;
  count?: number;
  richText?: boolean;
}

export const useDittoComponent = (props: Args): string | null => {
  const { componentId, variables, count, richText } = props;
  const { source, variant } = useContext(DittoContext);
  if (!("ditto_component_library" in source)) {
    throw new Error("An export file for the Component Library couldn't be found.");
  }

  if (variant) {
    const data = source?.ditto_component_library?.[variant];
    if (data && data[componentId]) {
      return interpolateVariableText(data[componentId], variables || {}, count, richText || false)
        .text;
    }
  }

  const data = source?.ditto_component_library?.base;
  if (!data) {
    return nullError("Base text not found in component library");
  }

  if (data && !data[componentId]) {
    return nullError(`Text not found for component "${componentId}"`);
  }

  if (SourceDetector.isStructured(data) || SourceDetector.isFlat(data)) {
    return interpolateVariableText(data[componentId], variables || {}, count, richText || false)
      .text;
  }

  return nullError(`Invalid format for component ${componentId}`);
};
