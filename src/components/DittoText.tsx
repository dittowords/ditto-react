import React from "react";
import { useDittoSingleText } from "../hooks/useDittoSingleText";
import { useProjectId } from "../lib/utils";
import { DittoTextProps } from "./Ditto";

export const DittoText = (props: DittoTextProps) => {
  const { textId, children, variables, count } = props;
  const projectId = useProjectId(props);
  const text = useDittoSingleText({
    projectId,
    textId,
    variables: variables || {},
    count,
  });

  if (typeof text === "string" && typeof children === "function") {
    return <>{children(text)}</>;
  }

  return <>{text}</>;
};
