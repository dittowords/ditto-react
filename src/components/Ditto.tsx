import { useContext } from "react";
import { DittoText } from "./DittoText";
import { DittoFrameOrBlock } from "./DittoFrameOrBlock";
import { DittoComponent } from "./DittoComponent";
import { DittoContext } from "../lib/context";
import {
  isFrameOrBlockComponent,
  isTextComponent,
  fragmentError,
  isComponentLibrary,
  isProject,
} from "../lib/utils";

export interface DittoProjectProps {
  projectId?: string;
  textId?: string;
  frameId?: string;
  blockId?: string;
  filters?: {
    tags: string[];
  };
}

export interface DittoComponentLibraryProps {
  componentId: string;
}

export type DittoProps = DittoProjectProps | DittoComponentLibraryProps;

export const Ditto = (_props: DittoProps) => {
  const { projectId: projectId_context } = useContext(DittoContext);

  if (isProject(_props, projectId_context)) {
    const { projectId: projectId_prop } = _props;
    const projectId = projectId_prop || projectId_context;

    if (!projectId)
      return fragmentError(
        "No Project ID was provided to the <DittoProvider /> or <Ditto /> components."
      );

    const props = { ..._props, projectId };

    if (isTextComponent(props)) return <DittoText {...props} />;

    if (isFrameOrBlockComponent(props)) return <DittoFrameOrBlock {...props} />;
  } else if (isComponentLibrary(_props)) {
    return <DittoComponent {..._props} />;
  }

  return fragmentError(
    'Invalid props provided to Ditto component; please provide "componentId", "textId" or "frameId"'
  );
};
