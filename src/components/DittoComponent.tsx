import React, { useMemo } from "react";
import { useDittoComponent } from "../hooks/useDittoComponent";
import { DittoComponentLibraryProps } from "./Ditto";

export const DittoComponent = (props: DittoComponentLibraryProps) => {
  const { children, componentId } = props;
  const value = useDittoComponent({
    componentId,
    alwaysReturnString: typeof children !== "function",
  });

  const text = useMemo(
    () => (value !== null && typeof value === "object" ? value.text : value),
    [value]
  );

  return (
    <React.Fragment>
      {typeof children === "function" ? children(text) : text}
    </React.Fragment>
  );
};
