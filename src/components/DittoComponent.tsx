import React from "react";
import { useDittoComponent } from "../hooks/useDittoComponent";

export interface DittoComponentProps {
  componentId: string;
  children?: (value: string | { name: string; text: string }) => JSX.Element;
}

export const DittoComponent = (props: DittoComponentProps) => {
  const { children, componentId } = props;
  const value = useDittoComponent({
    componentId,
    alwaysReturnString: typeof children !== "function",
  });

  return (
    <React.Fragment>
      {typeof children === "function" ? children(value) : value}
    </React.Fragment>
  );
};
