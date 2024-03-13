import { Fragment, useContext } from "react";
import DOMPurify from "dompurify";
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
  filters,
) => {
  return Object.keys(blockObj)
    .filter((textId) => {
      if (!filters?.tags) return true;

      return filters.tags.every(
        (tag) => blockObj[textId].tags && blockObj[textId].tags.includes(tag),
      );
    })
    .reduce((obj, id) => {
      const interpolatedText = interpolateVariableText(
        blockObj[id],
        variables,
        count,
        false,
      ).text;
      return { ...obj, [id]: interpolatedText };
    }, {} as Block);
};

export const filterFrame = (
  _frameObj: Frame,
  variables: VariablesInput,
  count: Count,
  filters,
) => {
  const frameObj = JSON.parse(JSON.stringify(_frameObj));

  if (frameObj.blocks) {
    for (var blockId in frameObj.blocks) {
      frameObj.blocks[blockId] = filterBlock(
        frameObj.blocks[blockId],
        variables,
        count,
        filters,
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
  projectIdFromContext?: string,
): props is DittoProjectProps =>
  ("projectId" in props || !!projectIdFromContext) &&
  ("textId" in props || "frameId" in props || "blockId" in props);

export const isComponentLibrary = (
  props: DittoProps,
): props is DittoComponentLibraryProps => "componentId" in props;

export const isText = (props: DittoProps): props is DittoTextProps =>
  "textId" in props;

export const isFrameOrBlockComponent = (
  props: DittoProps,
): props is DittoFrameOrBlockProps => "frameId" in props;

export const useProjectId = (props: { projectId?: string | null }) => {
  const dittoContext = useContext(DittoContext);
  const projectId = dittoContext.projectId || props.projectId;
  if (!projectId) {
    return nullError(
      "No Project ID was provided to the <DittoProvider /> or <Ditto /> components.",
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
const getPluralText = (data: TextData, count: Count, richText: boolean) => {
  if (count === undefined || Object.keys(data?.plurals || {})?.length === 0) {
    return richText && data.rich_text ? data.rich_text : data.text;
  } else if (count === 0 && data.plurals.zero) {
    return richText && data.plurals.zero_rich_text
      ? data.plurals.zero_rich_text
      : data.plurals.zero;
  } else if (count === 1 && data.plurals.one) {
    return richText && data.plurals.one_rich_text
      ? data.plurals.one_rich_text
      : data.plurals.one;
  } else if (count === 2 && data.plurals.two) {
    return richText && data.plurals.two_rich_text
      ? data.plurals.two_rich_text
      : data.plurals.two;
  } else if (count >= 3 && count <= 5 && data.plurals.few) {
    return richText && data.plurals.few_rich_text
      ? data.plurals.few_rich_text
      : data.plurals.few;
  } else if (count >= 6 && count <= 99 && data.plurals.many) {
    return richText && data.plurals.many_rich_text
      ? data.plurals.many_rich_text
      : data.plurals.many;
  } else {
    // default to 'other', fallback to base text
    if (data.plurals.other)
      return richText && data.plurals.other_rich_text
        ? data.plurals.other_rich_text
        : data.plurals.other;
    return richText && data.rich_text ? data.rich_text : data.text;
  }
};

export const interpolateVariableText = (
  // data from the Ditto source
  _data: TextData | string,
  // variables passed via prop by the user
  variablesInput: VariablesInput,
  // count passed via prop by the user
  count: Count,
  richText: boolean,
) => {
  const data: TextData =
    typeof _data === "string"
      ? { text: _data, plurals: {}, variables: {} }
      : _data;

  let pluralText = getPluralText(data, count, richText) || "";

  if (richText) {
    pluralText = DOMPurify.sanitize(pluralText);
  }

  const variablesFromDitto = data?.variables || {};
  return {
    ...data,
    text: generateVariableText(pluralText, variablesInput, variablesFromDitto),
  };
};

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

const getVariable = (
  variableName: string,
  variables: TextData["variables"],
) => {
  const variable = variables[variableName];
  if (variable === undefined || variable === null) {
    return null;
  }

  return variable;
};

const getVariablePlaceholder = <V extends VariableData>(
  variableData: V | null,
  input: string | number | null,
) => {
  if (!variableData) return input;

  if (Array.isArray(variableData)) {
    const s = String(input).toLowerCase();
    const i = variableData.findIndex((e) => e.toLowerCase() === s);
    const valid = i !== -1;
    if (valid) {
      return variableData[i];
    }

    console.error(
      `${input} does not exist in the specified \`list\` variable: ${variableData.join(
        ", ",
      )}.`,
    );
    return input;
  }

  if (variableData.__type === "number" || variableData.__type === "string") {
    return (
      String(input || variableData.example || variableData.fallback) || null
    );
  }

  if (variableData.__type === "hyperlink") {
    return input || variableData.text;
  }

  if (variableData.__type === "map" && input) {
    const value = variableData[input];
    // Ditto map values will always be strings, so it should be okay that we do
    // a falsy check here. If we ever change that, we'll need to update this check.
    if (!value) {
      console.error(
        `Key ${input} does not exist in the the specified \`map\` variable: ${Object.keys(
          variableData,
        ).join(", ")}.`,
      );
      return input;
    }

    return value;
  }

  return input;
};

const generateVariableText = (
  text: string,
  variablesInput: VariablesInput,
  variablesFromDitto: TextData["variables"],
) => {
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
