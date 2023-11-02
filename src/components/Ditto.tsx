import { useContext } from "react";
import { DittoText } from "./DittoText";
import { DittoFrameOrBlock } from "./DittoFrameOrBlock";
import { DittoComponent } from "./DittoComponent";
import { Block, DittoContext, Frame, VariablesInput } from "../lib/context";
import {
  isFrameOrBlockComponent,
  isText,
  fragmentError,
  isComponentLibrary,
  isProject,
} from "../lib/utils";

type PluralId =
  | "zero"
  | "zero_rich_text"
  | "one"
  | "one_rich_text"
  | "two"
  | "two_rich_text"
  | "few"
  | "few_rich_text"
  | "many"
  | "many_rich_text"
  | "other"
  | "other_rich_text";
export type Plurals = {
  [pluralId in PluralId]?: string;
};

export interface DittoFrameProps {
  projectId?: string | null;
  frameId: string;
  variables?: VariablesInput;
  count?: number;
  children: (frame: Frame) => React.ReactNode;
}

export interface DittoBlockProps {
  projectId?: string | null;
  frameId: string;
  blockId: string;
  variables?: VariablesInput;
  count?: number;
  children: (block: Block) => React.ReactNode;
}

export interface DittoTextProps {
  projectId?: string;
  textId: string;
  variables?: VariablesInput;
  count?: number;
  richText?: boolean;
  children?: (text: string) => React.ReactNode;
}

export interface DittoComponentLibraryProps {
  componentId: string;
  richText?: boolean;
  variables?: VariablesInput;
  count?: number;
  children?: (text: string) => React.ReactNode;
}

export interface DittoFilters {
  filters?: {
    tags: string[];
  };
}

export type DittoFrameOrBlockProps = DittoFilters &
  (DittoFrameProps | DittoBlockProps);

export type DittoProjectProps = DittoFilters &
  (DittoFrameProps | DittoBlockProps | DittoTextProps);

export type DittoProps = DittoProjectProps | DittoComponentLibraryProps;

export function Ditto(props: DittoProps) {
  const dittoContext = useContext(DittoContext);

  if (isComponentLibrary(props)) {
    return <DittoComponent {...props} />;
  }

  if (isProject(props, dittoContext.projectId)) {
    const projectId = props.projectId || dittoContext.projectId;
    if (!projectId) {
      return fragmentError(
        "No Project ID was provided to the <DittoProvider /> or <Ditto /> components."
      );
    }

    const propsWithProject = { ...props, projectId };

    if (isText(propsWithProject)) {
      return <DittoText {...propsWithProject} />;
    }

    if (isFrameOrBlockComponent(propsWithProject)) {
      return <DittoFrameOrBlock {...propsWithProject} />;
    }
  }

  return fragmentError(
    'Invalid props provided to Ditto component; please provide "componentId", "textId" or "frameId"'
  );
}
