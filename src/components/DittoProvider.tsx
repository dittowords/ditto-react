import React, { useMemo } from "react";
import { DittoContext, DittoSource } from "../lib/context";

interface DittoProviderProps {
  projectId?: string;
  variant?: string;
  source: DittoSource;
  children: React.ReactNode;
}

const useSource = (_source: DittoSource, variant?: string) => {
  return useMemo(() => {
    if ("projects" in _source) {
      return _source;
    } else {
      const v = variant || "base";
      const source = _source[v];
      if (!source) {
        throw new Error(`An export file for ${v} couldn't be found`);
      }

      return source;
    }
  }, [_source, variant]);
};

export const DittoProvider = (props: DittoProviderProps) => {
  const { children, source: _source, variant, projectId } = props;
  const source = useSource(_source, variant);

  return (
    <DittoContext.Provider
      value={{
        source,
        ...(projectId ? { projectId } : {}),
      }}
    >
      {children}
    </DittoContext.Provider>
  );
};
