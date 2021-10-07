import { createContext } from "react";

interface DittoText {
  text: string;
  tags?: string[];
}

/**
 * TODO:
 * Standardize differenes between default project format
 * and default component library format (hopefully solved
 * as a side effect of us moving away from the default
 * format completely in a future version)
 */
export interface FormatDefaultProject {
  project_id: string;
  frames: {
    [frameId: string]: {
      frameName: string;
      blocks: {
        [blockId: string]: {
          [textId: string]: DittoText;
        };
      };
      otherText?: {
        [textId: string]: DittoText;
      };
    };
  };
}

interface FormatDefaultComponentLibrary {
  project_name: string;
  components: {
    [componentApiId: string]: {
      name: string;
      text: string;
    };
  };
}

interface FormatStructuredProject {
  [apiId: string]: {
    text: string;
    tags?: string[];
    notes?: string;
  };
}

interface FormatStructuredCL {
  [apiId: string]: {
    name: string;
    text: string;
  };
}

interface FormatFlat {
  [apiId: string]: string;
}

export type ProjectFormat =
  | FormatDefaultProject
  | FormatFlat
  | FormatStructuredProject;

export type ComponentLibraryFormat =
  | FormatDefaultComponentLibrary
  | FormatFlat
  | FormatStructuredCL;

export type Project = ProjectFormat | ComponentLibraryFormat;

export interface Source {
  projects: {
    [projectId: string]: Project;
  };
  exported_at: string;
}

export interface SourceVariants {
  [variantApiId: string]: Source;
}

export type DittoSource = Source | SourceVariants;

export interface DittoOptions {
  environment?: "development" | "staging" | "production";
}

interface DittoContext {
  projectId?: string;
  variant?: string;
  sourceBase: Source;
  sourceVariant: Source | null;
  options?: DittoOptions;
}

export const DittoContext = createContext({} as DittoContext);
