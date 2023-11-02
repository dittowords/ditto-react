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
    richText: props.richText === true,
  });

  if (typeof text === "string" && typeof children === "function") {
    return <>{children(text)}</>;
  }

  if (props.richText) {
    return <span dangerouslySetInnerHTML={{ __html: text || "" }}></span>;
  }

  return <>{text}</>;
};
