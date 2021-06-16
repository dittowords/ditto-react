import { useContext } from "react";
import { DittoText, DittoTextProps } from "./DittoText";
import { DittoFrameOrBlock, DittoFrameOrBlockProps } from "./DittoFrameOrBlock";
import { DittoContext } from "../lib/context";
import {fragmentError} from "../lib/utils";

interface DittoProps {
  projectId?: string;
  textId?: string;
  frameId?: string;
  blockId?: string;
  children?: React.ReactNode;
}

const isDittoTextProps = (props: DittoProps): props is DittoTextProps =>
  'textId' in props;

const isDittoFrameOrBlockProps = (props: DittoProps): props is DittoFrameOrBlockProps =>
  'frameId' in props;

export const Ditto = (_props: DittoProps) => {
  const { projectId: projectId_context } = useContext(DittoContext);
  const { projectId: projectId_prop } = _props;

  const projectId = projectId_prop || projectId_context;

  if (!projectId) 
    return fragmentError('No Project ID was provided to the <DittoProvider /> or <Ditto /> components.');

  const props = { ..._props, projectId };

  if (isDittoTextProps(props)) 
    return <DittoText {...props} />;

  if (isDittoFrameOrBlockProps(props)) 
    return <DittoFrameOrBlock {...props} />;

  return fragmentError('Invalid props provided to Ditto component; please provide "textId" or "frameId"');
}
