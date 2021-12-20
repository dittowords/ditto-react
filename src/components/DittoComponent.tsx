import React, { useMemo } from "react";
import { useDittoComponent } from "../hooks/useDittoComponent";
import { DittoComponentLibraryProps } from "./Ditto";

export const DittoComponent = (props: DittoComponentLibraryProps) => {
  const { children, componentId, variables = {}, count } = props;

  const value = useDittoComponent({
    componentId,
    alwaysReturnString: typeof children !== "function",
    variables,
    count
  });

  // const text = useMemo(
  //   () => (value !== null && typeof value === "object" ? value.text : value),
  //   [value, variables]
  // );

  const text = value !== null && typeof value === "object" ? value.text : value
  return (
    <React.Fragment>
      {typeof children === "function" ? children(text) : text}
    </React.Fragment>
  );
};
