import { useContext } from "react";
import { DittoContext } from "../lib/context";
import { isProductionDittoEnvironment, nullError } from "../lib/utils";

interface useDittoComponentProps {
  componentId: string;
  alwaysReturnString: boolean;
}

export const useDittoComponent = (
  props: useDittoComponentProps
):
  | string
  | {
      name: string;
      text: string;
    } => {
  const { componentId, alwaysReturnString } = props;
  const { sourceBase, sourceVariant, variant } = useContext(DittoContext);

  if (!("ditto_component_library" in sourceBase.projects)) {
    throw new Error(
      "An export file for the Component Library couldn't be found."
    );
  }

  if (variant) {
    const componentLibrary = sourceVariant?.projects.ditto_component_library;
    if (componentLibrary) {
      const value: string | { name: string; text: string } =
        "project_name" in componentLibrary && "components" in componentLibrary
          ? componentLibrary.components[componentId]
          : componentLibrary[componentId];

      if (typeof value === "object" && "text" in value) {
        return alwaysReturnString ? value.text : value;
      }

      if (value) {
        return value;
      }
    }

    if (!isProductionDittoEnvironment) {
      const message = `Text not found for componentId: "${componentId}"`;
      console.error(message);
      return message;
    }
  }

  const componentLibrary = sourceBase.projects.ditto_component_library;

  const value: string | { name: string; text: string } =
    "project_name" in componentLibrary && "components" in componentLibrary
      ? componentLibrary.components[componentId]
      : componentLibrary[componentId];

  if (!value) {
    return nullError(`Text not found for component "${componentId}"`);
  }

  if (typeof value === "object" && "text" in value) {
    return alwaysReturnString ? value.text : value;
  }

  return value;
};
