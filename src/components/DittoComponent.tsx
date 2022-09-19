import React, { useMemo } from "react";
import { useDittoComponent } from "../hooks/useDittoComponent";
import { DittoComponentLibraryProps } from "./Ditto";

export const DittoComponent = (props: DittoComponentLibraryProps) => {
  const { children, componentId, variables, count } = props;

  const text = useDittoComponent({
    componentId,
    variables: variables || {},
    count,
  });

  if (typeof text === "string" && typeof children === "function") {
    return <>{children(text)}</>;
  }

  return <>{text}</>;
};
