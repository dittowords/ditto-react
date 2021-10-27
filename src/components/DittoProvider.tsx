import React, { useMemo } from "react";
import {
  DittoContext,
  DittoOptions,
  DittoSource,
  Source,
} from "../lib/context";

interface DittoProviderProps {
  projectId?: string;
  variant?: string;
  source: DittoSource;
  children: React.ReactNode;
  options?: DittoOptions;
}

export const DittoProvider = (props: DittoProviderProps) => {
  const { children, source, variant, projectId, options } = props;

  return (
    <DittoContext.Provider
      value={{
        options,
        source,
        variant,
        ...(projectId ? { projectId } : {}),
      }}
    >
      {children}
    </DittoContext.Provider>
  );
};
