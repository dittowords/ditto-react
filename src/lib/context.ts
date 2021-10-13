import { createContext } from "react";

interface DittoText {
  text: string;
  tags?: string[];
}

export interface Block {
  [textId: string]: DittoText;
}

export interface Frame {
  frameName: string;
  blocks: {
    [blockId: string]: Block;
  };
  otherText?: Block;
}

export interface FormatDefaultProject {
  project_id: string;
  frames: {
    [frameId: string]: Frame;
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
