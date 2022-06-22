import React from "react";
import { DittoContext, DittoSource } from "../lib/context";

interface DittoProviderProps {
  projectId?: string;
  variant?: string;
  source: DittoSource;
  children: React.ReactNode;
}

export const DittoProvider = (props: DittoProviderProps) => {
  const { children, source, variant, projectId } = props;

  return (
    <DittoContext.Provider
      value={{
        source,
        variant,
        ...(projectId ? { projectId } : {}),
      }}
    >
      {children}
    </DittoContext.Provider>
  );
};
