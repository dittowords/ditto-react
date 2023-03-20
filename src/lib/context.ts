import { createContext } from "react";
import { Plurals } from "../components/Ditto";

export type Count = number | undefined;

type VariableList = string[];
interface VariableString {
  example?: string;
  fallback?: string;
  __type: "string";
}
interface VariableNumber {
  example?: number;
  fallback?: number;
  __type: "number";
}
interface VariableHyperlink {
  text: string;
  url: string;
  __type: "hyperlink";
}
interface VariableMap {
  [key: string]: string;
  __type: "map";
}

export type VariableData =
  | VariableString
  | VariableNumber
  | VariableHyperlink
  | VariableList
  | VariableMap;

type VariableType = string | number;
export interface VariablesInput {
  [variableId: string]: VariableType;
}

export interface TextData {
  plurals: Plurals;
  text: string;
  variables: {
    [variableName: string]: VariableData;
  };
}

export interface Block {
  text: string;
}
export interface Frame {
  frameName: string;
  blocks: Block[];
  otherText?: Block[];
}

export interface FormatDefaultProject {
  [frameId: string]: Frame;
}

interface FormatStructured {
  [id: string]: {
    text: string;
    plurals: Plurals;
    variables: {
      [variableName: string]: VariableData;
    };
  };
}

interface FormatDefaultComponentLibrary {
  [componentApiId: string]: {
    name: string;
    text: string;
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

type SourceType =
  | FormatDefaultProject
  // This type matches for:
  // - `default` and `structured` formats for the component library
  // - `structured` format for projects
  | FormatStructured
  // This type matches for both projects and the component library
  | FormatFlat
  | { [key: string]: any };

export type DittoSource = {
  [projectId: string]: {
    [variantApiId: string]: SourceType;
  };
};

export const SourceDetector = {
  isFrame: function (source: SourceType): source is FormatDefaultProject {
    if (!source) {
      return false;
    }

    const value = source[Object.keys(source)[0]];
    return value !== null && typeof value === "object" && "frameName" in value;
  },
  isFlat: function (source: SourceType): source is FormatFlat {
    if (!source) {
      return false;
    }

    const value = source[Object.keys(source)[0]];
    return typeof value === "string";
  },
  isStructured: function (source: SourceType): source is FormatStructured {
    if (!source) {
      return false;
    }

    const value = source[Object.keys(source)[0]];
    return value !== null && typeof value === "object" && !this.isFrame(source);
  },
};

interface DittoContext {
  projectId?: string;
  variant?: string;
  source: DittoSource;
}

export const DittoContext = createContext({} as DittoContext);
