import { Fragment } from "react";
import {
  DittoComponentLibraryProps,
  DittoProjectProps,
  DittoProps,
} from "../components/Ditto";
import { DittoFrameOrBlockProps } from "../components/DittoFrameOrBlock";
import { DittoTextProps } from "../components/DittoText";
import { FormatDefaultProject, Project } from "./context";

export const filterBlock = (blockObj, filters) => {
  return Object.keys(blockObj)
    .filter((textId) => {
      if (!filters?.tags) return true;

      return filters.tags.every(
        (tag) => blockObj[textId].tags && blockObj[textId].tags.includes(tag)
      );
    })
    .reduce((obj, id) => ({ ...obj, [id]: blockObj[id].text }), {});
};

export const filterFrame = (_frameObj, filters) => {
  const frameObj = JSON.parse(JSON.stringify(_frameObj));

  if (frameObj.blocks) {
    for (var blockId in frameObj.blocks) {
      frameObj.blocks[blockId] = filterBlock(frameObj.blocks[blockId], filters);
    }
  }

  return { ...frameObj, otherText: filterBlock(frameObj.otherText, filters) };
};

export const error = (message: string, returnValue: any = message) => {
  console.error(message);
  return returnValue;
};

export const nullError = (message: string) => error(message, null);
export const fragmentError = (message: string) => error(message, <Fragment />);

export const isDefaultFormatProject = (
  project: Project | undefined
): project is FormatDefaultProject => !!project && "frames" in project;

export const isProject = (
  props: DittoProps,
  projectIdFromContext?: string
): props is DittoProjectProps =>
  ("projectId" in props || !!projectIdFromContext) &&
  ("textId" in props || "frameId" in props || "blockId" in props);

export const isComponentLibrary = (
  props: DittoProps
): props is DittoComponentLibraryProps => "componentId" in props;

export const isTextComponent = (props: DittoProps): props is DittoTextProps =>
  "textId" in props;

export const isFrameOrBlockComponent = (
  props: DittoProps
): props is DittoFrameOrBlockProps => "frameId" in props;
