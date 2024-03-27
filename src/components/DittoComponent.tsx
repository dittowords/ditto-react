import React from "react";
import { useDittoComponent } from "../hooks/useDittoComponent";
import { DittoComponentLibraryProps } from "./Ditto";

export const DittoComponent = (props: DittoComponentLibraryProps) => {
  const { children, componentId, variables, count, richText } = props;

  const text = useDittoComponent({
    componentId,
    variables: variables || {},
    count,
    richText,
  });

  if (typeof text === "string" && typeof children === "function") {
    return <>{children(text)}</>;
  }

  if (richText) {
    return <span dangerouslySetInnerHTML={{ __html: text || "" }} />;
  }

  return <>{text}</>;
};
