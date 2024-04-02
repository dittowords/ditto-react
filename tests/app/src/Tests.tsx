import {
  Ditto,
  DittoComponent,
  DittoText,
  useDittoComponent,
  useDittoSingleText,
} from "ditto-react";

export default function Tests() {
  const componentExample = useDittoComponent({
    componentId: "component-example",
    variables: { stringVariable: "Test String" },
  });

  const textItemExample = useDittoSingleText({
    textId: "text-item-example",
    variables: { numVariable: 5 },
  });

  const otherPluralExample = useDittoComponent({
    componentId: "plural-example",
    count: 0,
  });

  const onePluralExample = useDittoComponent({
    componentId: "plural-example",
    count: 1,
  });

  return (
    <div>
      <div data-testid="component-example">
        <DittoComponent componentId="component-example" />
      </div>
      <div data-testid="text-item-example">
        <DittoText textId="text-item-example" />
      </div>
      <div data-testid="other-plural-example">
        <DittoComponent componentId="plural-example" count={0} />
      </div>
      <div data-testid="one-plural-example">
        <DittoComponent componentId="plural-example" count={1} />
      </div>

      <div data-testid="hook-component-example">{componentExample}</div>
      <div data-testid="hook-text-item-example">{textItemExample}</div>
      <div data-testid="hook-other-plural-example">{otherPluralExample}</div>
      <div data-testid="hook-one-plural-example">{onePluralExample}</div>

      <div data-testid="ditto-component">
        <Ditto componentId="component-example" variables={{ stringVariable: "Test String" }} />
      </div>
      <div data-testid="ditto-text-item">
        <Ditto textId="text-item-example" variables={{ numVariable: 5 }} />
      </div>

      <div data-testid="rich-text-component">
        <Ditto
          componentId="rich-text-component-example"
          variables={{ stringVariable: "Test String" }}
          richText
        />
      </div>
      <div data-testid="rich-text-text-item">
        <Ditto textId="rich-text-text-item" variables={{ numVariable: 5 }} richText />
      </div>
    </div>
  );
}
