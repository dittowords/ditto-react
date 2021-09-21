import { useContext } from "react";
import { DittoContext } from "../lib/context";
import { nullError } from "../lib/utils";

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
  const { source } = useContext(DittoContext);

  if (!source) return nullError(`Source not found`);

  if (!("ditto_component_library" in source.projects)) {
    throw new Error(
      "An export file for the Ditto Component Library couldn't be found."
    );
  }

  const componentLibrary = source.projects.ditto_component_library;

  const value: string | { name: string; text: string } =
    "project_name" in componentLibrary && "components" in componentLibrary
      ? componentLibrary.components[componentId]
      : componentLibrary[componentId];

  if (!value) {
    return `[Text not found for component "${componentId}"]`;
  }

  if (typeof value === "object" && "text" in value) {
    return alwaysReturnString ? value.text : value;
  }

  return value;
};
