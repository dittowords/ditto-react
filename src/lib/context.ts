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
interface FormatDefaultProject {
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

type FormatDefault = FormatDefaultProject | FormatDefaultComponentLibrary;

interface FormatStructured {
  [apiId: string]: {
    name: string;
    text: string;
    tags?: string[];
    notes?: string;
  };
}

interface FormatFlat {
  [apiId: string]: string;
}

interface SourceBase {
  projects: {
    [projectId: string]: FormatDefault | FormatFlat | FormatStructured;
  };
  exported_at: string;
}

interface SourceVariants {
  [variantApiId: string]: SourceBase;
}

export type DittoSource = SourceBase | SourceVariants;

interface DittoContext {
  projectId?: string;
  source: DittoSource;
}

export const DittoContext = createContext({} as DittoContext);
