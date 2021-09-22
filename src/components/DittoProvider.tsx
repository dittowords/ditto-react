import React, { useMemo } from "react";
import { DittoContext, DittoSource, Source } from "../lib/context";

interface DittoProviderProps {
  projectId?: string;
  variant?: string;
  source: DittoSource;
  children: React.ReactNode;
}

const useSources = (source: DittoSource, variant?: string) => {
  return useMemo(() => {
    if ("projects" in source) {
      return { sourceBase: source as Source, sourceVariant: null };
    }

    const sourceBase = source.base;
    const sourceVariant = variant ? source[variant] : null;

    if (!sourceBase) throw new Error("Couldn't find base text");
    if (!sourceVariant)
      console.warn(`Couldn't find variant text for ${variant}`);

    return { sourceBase, sourceVariant };
  }, [source, variant]);
};

export const DittoProvider = (props: DittoProviderProps) => {
  const { children, source: _source, variant, projectId } = props;
  const { sourceBase, sourceVariant } = useSources(_source, variant);

  return (
    <DittoContext.Provider
      value={{
        sourceBase,
        sourceVariant,
        variant,
        ...(projectId ? { projectId } : {}),
      }}
    >
      {children}
    </DittoContext.Provider>
  );
};
