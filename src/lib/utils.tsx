import { Fragment, useContext } from "react";
import {
  DittoComponentLibraryProps,
  DittoProjectProps,
  DittoProps,
  DittoFrameOrBlockProps,
  DittoTextProps,
} from "../components/Ditto";
import {
  DittoContext,
  Frame,
  Block,
  VariablesInput,
  Count,
  TextData,
  VariableData,
} from "./context";

export const filterBlock = (
  blockObj: Block,
  variables: VariablesInput,
  count: Count,
  filters
) => {
  return Object.keys(blockObj)
    .filter((textId) => {
      if (!filters?.tags) return true;

      return filters.tags.every(
        (tag) => blockObj[textId].tags && blockObj[textId].tags.includes(tag)
      );
    })
    .reduce((obj, id) => {
      const interpolatedText = interpolateVariableText(
        blockObj[id],
        variables,
        count
      ).text;
      return { ...obj, [id]: interpolatedText };
    }, {} as Block);
};

export const filterFrame = (
  _frameObj: Frame,
  variables: VariablesInput,
  count: Count,
  filters
) => {
  const frameObj = JSON.parse(JSON.stringify(_frameObj));

  if (frameObj.blocks) {
    for (var blockId in frameObj.blocks) {
      frameObj.blocks[blockId] = filterBlock(
        frameObj.blocks[blockId],
        variables,
        count,
        filters
      );
    }
  }

  return {
    ...frameObj,
    otherText: filterBlock(frameObj.otherText, variables, count, filters),
  };
};

export function error(message: string, returnValue: any = message) {
  console.error(message);
  return returnValue;
}

export const nullError = (message: string): null => error(message, null);
export const fragmentError = (message: string): JSX.Element =>
  error(message, <Fragment />);

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

export const useProjectId = (props: { projectId?: string | null }) => {
  const dittoContext = useContext(DittoContext);
  const projectId = dittoContext.projectId || props.projectId;
  if (!projectId) {
    return nullError(
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
 * zero = 0
 * one = 1
 * two = 2
 * few = 3,4,5
 * many = 6,7,...,99
 * other = 100, 101, ...
 * if count is provided but not matching plural key, fallback to base plural value
 * in future we should also user's to define their own middleware for picking plurals
 * based off i8next: https://www.i18next.com/translation-function/plurals
 */
const getPluralText = (data: TextData, count: Count) => {
  if (count === undefined || Object.keys(data?.plurals || {})?.length === 0) {
    return data.text;
  } else if (count === 0 && data.plurals.zero) {
    return data.plurals.zero;
  } else if (count === 1 && data.plurals.one) {
    return data.plurals.one;
  } else if (count === 2 && data.plurals.two) {
    return data.plurals.two;
  } else if (count >= 3 && count <= 5 && data.plurals.few) {
    return data.plurals.few;
  } else if (count >= 6 && count <= 99 && data.plurals.many) {
    return data.plurals.many;
  } else {
    // default to 'other', fallback to base text
    if (data.plurals.other) return data.plurals.other;
    return data.text;
  }
};

export const interpolateVariableText = (
  // data from the Ditto source
  _data: TextData | string,
  // variables passed via prop by the user
  variablesInput: VariablesInput,
  // count passed via prop by the user
  count: Count
) => {
  const data: TextData =
    typeof _data === "string"
      ? { text: _data, plurals: {}, variables: {} }
      : _data;

  const pluralText = getPluralText(data, count);
  const variablesFromDitto = data?.variables || {};
  return {
    ...data,
    text: generateVariableText(pluralText, variablesInput, variablesFromDitto),
  };
};

// let variablesWithFallbacks: Record<string, VariablesInput[string]> = {
//   ...variables,
// };

// Object.keys(data?.variables || {}).forEach((curr) => {
//   if (variablesWithFallbacks[curr]) return;

//   const { fallback, text } = data.variables[curr];
//   if (fallback || text) variablesWithFallbacks[curr] = fallback || text!;
// });

const HANDLEBAR_REGEX = /\{\{([a-z0-9_]+)\}\}/gi;

/**
 * Execute a callback for each valid variable found in
 * `text`. The callback is passed an object that includes:
 * - `name`: the name of the variable
 * - `start`: the index of opening curly brace of the variable in `text`
 * - `end`: the index of the closing curly brace of the variable in `text`
 */
const forEachVariable = (text, callback) => {
  let matches: RegExpExecArray | null = null;

  while ((matches = HANDLEBAR_REGEX.exec(text)) !== null) {
    const [match] = matches;
    if (!match) {
      break;
    }

    const variableName = match.replace(/(\{\{|\}\})/g, "");

    callback({
      name: variableName,
      start: matches.index,
      end: matches.index + match.length - 1,
    });
  }
};

const getVariable = (variableName: string, variables: TextData["variables"]) => {
  const variable = variables[variableName];
  if (variable === undefined || variable === null) {
    return null;
  }

  return variable;
};

const getVariablePlaceholder = <V extends VariableData>(variableData: V | null, input: string | number | null) => {
  if (!variableData) return input;

  if (Array.isArray(variableData)) {
    const s = String(input).toLowerCase();
    const i =  variableData.findIndex(e => e.toLowerCase() === s);
    const valid = i !== -1;
    if (valid) {
      return variableData[i];
    }

    console.error(`${input} does not exist in the specified \`list\` variable: ${variableData.join(', ')}.`)
    return null;
  }

  if (variableData.__type === "number" || variableData.__type === "string") {
    return String(variableData.example || variableData.fallback) || null;
  }

  if (variableData.__type === "hyperlink") {
    return variableData.text || null;
  }

  if (variableData.__type === "map" && input) {
    const value = variableData[input];
    if (!value) {
      console.error(`Key ${input} does not exist in the the specified \`map\` variable: ${Object.keys(variableData).join(', ')}.`)
      return null;
    }

    return value;
  }

  return input;
}

const generateVariableText = (text: string, variablesInput: VariablesInput, variablesFromDitto: TextData['variables']) => {
  let lastIndex = 0;
  let updatedText = "";
  forEachVariable(text, ({ name, start, end }) => {
    const input = variablesInput[name];
    const variableData = getVariable(name, variablesFromDitto);
    const variableValue = getVariablePlaceholder(variableData, input);

    if (variableValue !== undefined && variableValue !== null) {
      updatedText += text.substring(lastIndex, start) + variableValue;
    } else {
      updatedText += text.substr(lastIndex, end + 1);
    }
    lastIndex = end + 1;
  });

  const remainder = text.substr(lastIndex);
  if (remainder) {
    updatedText += remainder;
  }
  return updatedText;
};
