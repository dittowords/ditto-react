import React from "react";
import Mustache from 'mustache'
import { useDittoSingleText } from "../hooks/useDittoSingleText";
import { useProjectId } from "../lib/utils";
import { DittoTextProps } from "./Ditto";

export const DittoText = (props: DittoTextProps) => {
  const { textId, children, variables = {} } = props;
  const projectId = useProjectId(props);
  const text = Mustache.render(useDittoSingleText({ projectId, textId }), variables);

  return (
    <React.Fragment>
      {typeof children === "function" ? children(text) : text}
    </React.Fragment>
  );
};
