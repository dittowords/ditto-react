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
            example: "World",
          },
        },
      },
      variables,
      undefined,
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
    );
    expect(result.text).toEqual("Hello World!");
  });
});
