import Mustache from 'mustache'
import { Fragment, useContext } from "react";
import {
  DittoComponentLibraryProps,
  DittoProjectProps,
  DittoProps,
  DittoFrameOrBlockProps,
  DittoTextProps,
} from "../components/Ditto";
import { DittoContext, Frame, Block, Variables, Count } from "./context";

export const filterBlock = (blockObj: Block, variables: Variables, filters) => {
  return Object.keys(blockObj)
    .filter((textId) => {
      if (!filters?.tags) return true;

      return filters.tags.every(
        (tag) => blockObj[textId].tags && blockObj[textId].tags.includes(tag)
      );
    })
    .reduce((obj, id) => {
      const interpolatedText = interpolateVariableText(blockObj[id], variables).text
      return { ...obj, [id]: interpolatedText }
    }, {} as Block);
};

export const filterFrame = (_frameObj: Frame, variables: Variables, filters) => {
  const frameObj = JSON.parse(JSON.stringify(_frameObj));

  if (frameObj.blocks) {
    for (var blockId in frameObj.blocks) {
      frameObj.blocks[blockId] = filterBlock(frameObj.blocks[blockId], variables, filters);
    }
  }

  return { ...frameObj, otherText: filterBlock(frameObj.otherText, variables, filters) };
};

export const error = (message: string, returnValue: any = message) => {
  console.error(message);
  return returnValue;
};

export const nullError = (message: string) => error(message, null);
export const fragmentError = (message: string) => error(message, <Fragment />);

export const isProject = (
  props: DittoProps,
  projectIdFromContext?: string
): props is DittoProjectProps =>
  ("projectId" in props || !!projectIdFromContext) &&
  ("textId" in props || "frameId" in props || "blockId" in props);

export const isComponentLibrary = (
  props: DittoProps
): props is DittoComponentLibraryProps => "componentId" in props;

export const isText = (props: DittoProps): props is DittoTextProps =>
  "textId" in props;

export const isFrameOrBlockComponent = (
  props: DittoProps
): props is DittoFrameOrBlockProps => "frameId" in props;

export const useProjectId = (props: { projectId?: string }) => {
  const dittoContext = useContext(DittoContext);
  const projectId = dittoContext.projectId || props.projectId;
  if (!projectId) {
    return fragmentError(
      "No Project ID was provided to the <DittoProvider /> or <Ditto /> components."
    );
  }

  return projectId;
};

/**
 * 
 * @param data
 * text data
 * @param count 
 * the variable number used to determine which plural case to use
 * Simple plural: 1 === 'one', 0,2,3,4,...n = 'other
 * also support: 0 == 'zero' if provided
 * in future we should also user's to define their own middleware for picking plurals
 */
const getPluralText = (data: any, count: Count) => {

  if (count === null|| Object.keys(data?.plurals || {})?.length === 0) return data.text

  if (count === 0) {
    if (data.plurals.zero) return data.plurals.zero
    else if (data.plurals.other) return data.plurals.other
  }
  else if (count === 1 && data.plurals.one) { 
    return data.plurals.one
  }
  else {
    if (data.plurals.other) return data.plurals.other
  }
  return data.text
}

export const interpolateVariableText = (data: any, variables: Variables, count: number = 0) => {
  const variablesWithFallbacks = Object.keys(data.variables || {}).reduce((acc, curr) => {
    if (variables[curr]) {
      acc[curr] = variables[curr]
    } else {
      const { example, fallback } = data.variables[curr]
      acc[curr] = fallback || example
    }
    return acc;
  }, {})
  const pluralText = getPluralText(data, count)
  return {
    ...data,
    text: Mustache.render(pluralText, variablesWithFallbacks)
  }
}