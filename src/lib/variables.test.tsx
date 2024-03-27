import React from "react";
import { DittoVariableData, DittoVariableTypeGuards } from "..";
import { interpolateVariableText } from "./utils";

describe("interpolateVariableText", () => {
  it("should interpolate provided values when Ditto variable data exists", () => {
    const text = "Hello {{name}}!";
    const variables = { name: "World" };
    const result = interpolateVariableText(
      {
        plurals: {},
        text,
        variables: {
          name: {
            __type: "string",
            example: "World",
          },
        },
      },
      variables,
      undefined,
      false,
    );
    expect(result.text).toEqual("Hello World!");
  });

  it("should interpolate provided values even when Ditto variable data DOESN'T exist", () => {
    const text = "Hello {{name}}!";
    const variables = { name: "World" };
    const result = interpolateVariableText(
      {
        plurals: {},
        text,
        variables: {},
      },
      variables,
      undefined,
      false,
    );
    expect(result.text).toEqual("Hello World!");
  });

  it("should properly interpolate zero as a possible input to a number variable", () => {
    const text = "This is the number zero: {{numberVariable}}";
    const variables = {
      numberVariable: 0,
    };
    const result = interpolateVariableText(
      {
        plurals: {},
        text,
        variables: {
          numberVariable: {
            __type: "number",
            example: 1,
          },
        },
      },
      variables,
      undefined,
      false,
    );
    expect(result.text).toEqual("This is the number zero: 0");
  });

  it("should insert a link when a hyperlink variable is used", () => {
    const variableText = "This is a link: {{link}}";
    const linkUrl = "https://dittowords.com";
    const linkText = "I am a link";

    const result = interpolateVariableText(
      {
        plurals: {},
        text: variableText,
        variables: {
          link: {
            __type: "hyperlink",
            text: linkText,
            url: linkUrl,
          },
        },
      },
      {
        link: (props: DittoVariableData) => {
          if (DittoVariableTypeGuards.isHyperlink(props)) {
            return <a href={props.url}>{props.text}</a>;
          }
          return <></>;
        },
      },
      undefined,
      false,
    );

    expect(result.text).toEqual(`This is a link: <a href="${linkUrl}">${linkText}</a>`);
  });
});
