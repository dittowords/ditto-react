import Mustache from 'mustache'
import { useContext } from "react";
import { DittoContext, SourceDetector, DittoSource } from "../lib/context";
import { nullError } from "../lib/utils";

type DittoComponentString = string;
type DittoComponentObject = {
  text: string;
};
type DittoComponent = DittoComponentString | DittoComponentObject;

type DittoVariables = {
  [variableId: string]: any
}
interface Args {
  componentId: string;
  alwaysReturnString: boolean;
  variables: DittoVariables;
}

const interpolateVariableText = (data: any, variables: DittoVariables) => {
  const variablesWithFallbacks = Object.keys(data.variables || {}).reduce((acc, curr) => {
    if (variables[curr]) {
      acc[curr] = variables[curr]
    } else {
      const { example, fallback } = data.variables[curr]
      acc[curr] = fallback || example
    }
    return acc;
  }, {})
  return {
    ...data,
    text: Mustache.render(data.text, variablesWithFallbacks)
  }
}
export const useDittoComponent = (props: Args): DittoComponent => {
  const { componentId, alwaysReturnString, variables } = props;
  const { source, variant, options } = useContext(DittoContext);

  if (!("ditto_component_library" in source)) {
    throw new Error(
      "An export file for the Component Library couldn't be found."
    );
  }

  if (variant) {
    const data = source?.ditto_component_library?.[variant];

    if (data && data[componentId]) {
      const value = interpolateVariableText(data[componentId], variables)
      if (SourceDetector.isStructured(data)) {
        return alwaysReturnString ? value.text : value;
      } else if (SourceDetector.isFlat(data)) {
        return value;
      }
    }

    if (options?.environment !== "production") {
      const message = `Text not found for componentId: "${componentId}"`;
      console.error(message);
      return message;
    }
  }

  const data = source?.ditto_component_library?.base;
  if (!data) {
    return nullError("Base text not found in component library");
  }

  const value = interpolateVariableText(data[componentId], variables);
  if (!value) {
    return nullError(`Text not found for component "${componentId}"`);
  }

  if (SourceDetector.isStructured(data)) {
    return alwaysReturnString ? value.text :value;
  } else if (SourceDetector.isFlat(data)) {
    return value;
  } else {
    return nullError(`Invalid format for component ${componentId}`);
  }
};
