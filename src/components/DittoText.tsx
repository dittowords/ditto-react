import React from "react";
import { useDittoSingleText } from "../hooks/useDittoSingleText";
import { useProjectId } from "../lib/utils";
import { DittoTextProps } from "./Ditto";

export const DittoText = (props: DittoTextProps) => {
  const { textId, children, variables = {}, count } = props;
  const projectId = useProjectId(props);
  const text = useDittoSingleText({ projectId, textId, variables, count });

  return (
    <React.Fragment>
      {typeof children === "function" ? children(text) : text}
    </React.Fragment>
  );
};
