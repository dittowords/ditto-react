import { useContext } from "react";
import { DittoText, DittoTextProps } from "./DittoText";
import { DittoFrameOrBlock, DittoFrameOrBlockProps } from "./DittoFrameOrBlock";
import { DittoComponent } from "./DittoComponent";
import { DittoContext } from "../lib/context";
import { fragmentError } from "../lib/utils";

interface DittoProjectProps {
  projectId?: string;
  textId?: string;
  frameId?: string;
  blockId?: string;
  filters?: {
    tags: string[];
  };
}

interface DittoComponentLibraryProps {
  componentId: string;
}

type DittoProps = DittoProjectProps | DittoComponentLibraryProps;

const typeIsProject = (
  props: DittoProps,
  projectIdFromContext?: string
): props is DittoProjectProps =>
  ("projectId" in props || !!projectIdFromContext) &&
  ("textId" in props || "frameId" in props || "blockId" in props);

const typeIsComponentLibrary = (
  props: DittoProps
): props is DittoComponentLibraryProps => "componentId" in props;

const componentTypeIsText = (props: DittoProps): props is DittoTextProps =>
  "textId" in props;

const componentTypeIsFrameBlock = (
  props: DittoProps
): props is DittoFrameOrBlockProps => "frameId" in props;

export const Ditto = (_props: DittoProps) => {
  const { projectId: projectId_context } = useContext(DittoContext);

  if (typeIsProject(_props, projectId_context)) {
    const { projectId: projectId_prop } = _props;
    const projectId = projectId_prop || projectId_context;

    if (!projectId)
      return fragmentError(
        "No Project ID was provided to the <DittoProvider /> or <Ditto /> components."
      );

    const props = { ..._props, projectId };

    if (componentTypeIsText(props)) return <DittoText {...props} />;

    if (componentTypeIsFrameBlock(props))
      return <DittoFrameOrBlock {...props} />;
  } else if (typeIsComponentLibrary(_props)) {
    return <DittoComponent {..._props} />;
  }

  return fragmentError(
    'Invalid props provided to Ditto component; please provide "componentId", "textId" or "frameId"'
  );
};
