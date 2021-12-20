import { useContext } from "react";
import { DittoContext, SourceDetector, Variables } from "../lib/context";
import { nullError, interpolateVariableText} from "../lib/utils";

type DittoComponentString = string;
type DittoComponentObject = {
  text: string;
};
type DittoComponent = DittoComponentString | DittoComponentObject;

interface Args {
  componentId: string;
  alwaysReturnString: boolean;
  variables: Variables;
  count?: number;
}

export const useDittoComponent = (props: Args): DittoComponent => {
  const { componentId, alwaysReturnString, variables, count } = props;
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

  const value = interpolateVariableText(data[componentId], variables, count);
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
