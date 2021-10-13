import React from "react";
import { useDittoSingleText } from "../hooks/useDittoSingleText";
import { DittoTextProps } from "./Ditto";

export const DittoText = (props: DittoTextProps) => {
  const { projectId, textId, children } = props;
  const text = useDittoSingleText({ projectId, textId });

  return (
    <React.Fragment>
      {typeof children === "function" ? children(text) : text}
    </React.Fragment>
  );
};
