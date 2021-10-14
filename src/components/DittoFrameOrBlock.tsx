import React, { useContext } from "react";
import { useDitto } from "../hooks/useDitto";
import { DittoContext } from "../lib/context";
import { fragmentError } from "../lib/utils";
import {
  DittoBlockProps,
  DittoFilters,
  DittoFrameOrBlockProps,
  DittoFrameProps,
} from "./Ditto";

type Props = DittoFrameOrBlockProps;

export const DittoFrameOrBlock = (props: Props) => {
  const { children, ...otherProps } = props;
  const data = useDitto(otherProps);

  if (typeof children !== "function") {
    return fragmentError(
      `Please provide either a textId or function child to your Ditto component.`
    );
  }

  if (!data) {
    return <React.Fragment />;
  }

  return <>{children(data)}</>;
};

const useProjectId = (props: { projectId?: string }) => {
  const dittoContext = useContext(DittoContext);
  const projectId = dittoContext.projectId || props.projectId;
  if (!projectId) {
    return fragmentError(
      "No Project ID was provided to the <DittoProvider /> or <Ditto /> components."
    );
  }

  return projectId;
};

export const DittoFrame = (props: DittoFrameProps & DittoFilters) => {
  const projectId = useProjectId(props);
  return <DittoFrameOrBlock {...props} projectId={projectId} />;
};

export const DittoBlock = (props: DittoBlockProps & DittoFilters) => {
  const projectId = useProjectId(props);
  return <DittoFrameOrBlock {...props} projectId={projectId} />;
};
