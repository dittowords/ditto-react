import React from "react";
import { useDitto } from "../hooks/useDitto";
import { fragmentError, useProjectId } from "../lib/utils";
import { DittoBlockProps, DittoFilters, DittoFrameOrBlockProps, DittoFrameProps } from "./Ditto";

type Props = DittoFrameOrBlockProps;

export const DittoFrameOrBlock = (props: Props): JSX.Element => {
  const { children, ...otherProps } = props;
  const data = useDitto(otherProps);

  if (typeof children !== "function") {
    return fragmentError(
      `Please provide either a textId or function child to your Ditto component.`,
    );
  }

  if (!data || typeof data !== "object") {
    return <>{data}</>;
  }

  return <>{children(data)}</>;
};

export const DittoFrame = (props: DittoFrameProps & DittoFilters) => {
  const projectId = useProjectId(props);
  return <DittoFrameOrBlock {...props} projectId={projectId} />;
};

export const DittoBlock = (props: DittoBlockProps & DittoFilters) => {
  const projectId = useProjectId(props);
  return <DittoFrameOrBlock {...props} projectId={projectId} />;
};
