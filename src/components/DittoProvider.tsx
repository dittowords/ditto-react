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

const useSources = (source: DittoSource, variant?: string) => {
  return useMemo(() => {
    if ("projects" in source) {
      return { sourceBase: source as Source, sourceVariant: null };
    }

    const sourceBase = source.base || source.text;
    const sourceVariant = variant ? source[variant] : null;

    if (!sourceBase || (variant && !source.base))
      throw new Error(
        "If passing `variant` prop to `DittoProvider`, `variants: true` must be set in `ditto/config.yml` (re-pull after editing)"
      );

    if (variant && !sourceVariant)
      console.warn(`Couldn't find variant text for ${variant}`);

    return { sourceBase, sourceVariant };
  }, [source, variant]);
};

export const DittoProvider = (props: DittoProviderProps) => {
  const { children, source: _source, variant, projectId, options } = props;
  const { sourceBase, sourceVariant } = useSources(_source, variant);

  return (
    <DittoContext.Provider
      value={{
        options,
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
