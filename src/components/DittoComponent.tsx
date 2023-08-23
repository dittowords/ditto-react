import React, { useMemo } from "react";
import { useDittoComponent } from "../hooks/useDittoComponent";
import { DittoComponentLibraryProps } from "./Ditto";

export const DittoComponent = (props: DittoComponentLibraryProps) => {
  const { children, componentId, variables, count, richText } = props;

  const text = useDittoComponent({
    componentId,
    variables: variables || {},
    count,
    richText
  });

  if (typeof text === "string" && typeof children === "function") {
    if (richText) {
      return <>{children(text)}</>;
    }

    return <>{children(text)}</>;
  }

  if (richText) {
    return <span dangerouslySetInnerHTML={{__html: text || "" }} />;
  }

  return <>{text}</>;
};
