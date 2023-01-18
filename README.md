# Ditto React

`ditto-react` makes it easy to integrate a React app with Ditto.

- Exposes Ditto data to your application through an easy-to-wrap provider
- Offers support for localizing using Ditto variants
- Works hand-in-hand with the [Ditto CLI](https://github.com/dittowords/cli)

Ditto also works with many popular 3rd party i18n libraries. Check out [our demo repository](https://github.com/dittowords/ditto-demo) for an example of how Ditto can be integrated into development using [react-i18next](https://react.i18next.com/).

## Installation

You can install `ditto-react` from npm:

```bash
npm install --save ditto-react
```

`ditto-react` is written in TypeScript and works with other TypeScript codebases out of the box.

## Getting Started

### Set up the CLI

First, you'll need to set up the [Ditto CLI](https://github.com/dittowords/cli) in your repository; initialize the CLI in a place that is accessible to your React code.

For example, if you have a project created with [create-react-app](https://github.com/facebook/create-react-app), initialize the CLI in the `src` folder, because directories outside of it can't be imported from your application. See the [Ditto CLI's README](https://github.com/dittowords/cli) for more information on how to set it up and start syncing data from your workspace.

### Set up the provider

At the root of your application, import and wrap your app in `DittoProvider`; pass its `source` prop data imported from the `ditto` folder generated by the CLI's `pull` command:

```jsx
import { DittoProvider } from "ditto-react";
import dittoData from "./ditto";

const App = () => <DittoProvider source={dittoData}>...</DittoProvider>;
```

### Start implementing text components

Anywhere in your application that requires product copy, import and use the `Ditto` component:

```jsx
import { Ditto } from 'ditto-react';

const HomePage = () => (
  <div>
    <h1><Ditto componentId="home.title" /></h1>
    <h2><Ditto componentId="home.subtitle"></h2>
    <p><Ditto componentId="home.body" /></p>
    <footer>
      <ul>
        <li>
          <a href="/home"><Ditto componentId="footer.links.home" /></a>
        </li>
        <li>
          <a href="/contact"><Ditto componentId="footer.links.contact" /></a>
        </li>
        <li>
          <a href="/about"><Ditto componentId="footer.links.about" /></a>
        </li>
      </ul>
    </footer>
  </div>
)
```

### Localize with variants

If the components in your Ditto workspace have variants, you can use them in `ditto-react` by passing a `variant` prop to `DittoProvider`. The value of the prop should be equal to the API ID of the variant:

```jsx
import { DittoProvider } from "ditto-react";
import dittoData from "./ditto";

const options = ["base", "spanish", "korean"];

const App = () => {
  const [variant, setVariant] = useState(options[0]);

  return (
    <DittoProvider source={dittoData} variant={variant}>
      ...
    </DittoProvider>
  );
};
```

## Variable Interpolation

`ditto-react` integrates with Ditto Variables to support dynamic text. Learn how to create and configure Ditto Variables here: https://www.dittowords.com/docs/variables.

Text items containing Ditto Variables default to rendering those variables as the variable name inside of a template tag:

```jsx
<Ditto textId={textId} />;
output = "The cart contains {{itemName}}.";
```

Variable values will be automatically interpolated if a value for a given variable (keyed by the variable's name) is provided via the `variables` prop:

```jsx
<Ditto textId={textId} variables={{ itemName: "apples" }} />
output = "The cart contains apples."

<Ditto textId={textId} variables={{ itemName: "pears" }} />
output = "The cart contains pears."
```

If no value is provided for a variable, but that variable has a fallback value configured in Ditto, the fallback will be used:

```jsx
// if the variable `itemName` had "some fruit" configured as a fallback in Ditto
<Ditto textId={textId} />;
output = "The cart contains some fruit.";
```

It's important to note that interpolation will not occur if variable data corresponding to the the text item or component does not exist in the `source` passed to the `<DittoProvider />`. This guarantees to the user that when interpolation happens, the interpolation is being done using the linked Ditto data. **Since the `flat` format does not contain variable data, variable interpolation with the `flat` format is not currently supported.**

```js
// ✔️ source contains variable information, interpolation will occur
{
  "shopping-cart": {
    "text": "The cart contains {{itemName}}.",
    "variables": {
      "itemName": {
        "example": "pears",
        "fallback": "some stuff",
      }
    }
  }
}

// ✕ source doesn't contain variable information, interpolation won't occur
{
  "shopping-cart": "The cart contains {{itemName}}."
}
```

## Pluralization

`ditto-react` integrates with Ditto Plurals to support pluralized text. Learn how to create and configure Ditto Plurals here: https://www.dittowords.com/docs/pluralization.

When a text item has plural forms, the default plural form will be used when that text item is rendered normally:

```jsx
<Ditto textId={textId} />;
output = "The cart contains some items.";
```

When a `count` prop is provided, the plural form to render (of those that are configured in Ditto) will be inferred based off of that value:

```jsx
<Ditto textId={textId} count={3}/>
output = "The cart contains a few items."

<Ditto textId={textId} count={10}/>
output = "The cart contains many items."

<Ditto textId={textId} count={0}/>
output = "The cart contains nothing."
```

Plurals can also be used in combination with [variables](#variable-interpolation):

```jsx
// If the "many" plural form is "The cart contains many {{adjective}} items."
<Ditto textId={textId} variables={{ adjective: "fun" }} count={10} />;
output = "The cart contains many fun items.";
```

The `count` prop is indexed to the following plural keys:

| Plural Form | count         |
| ----------- | ------------- |
| zero        | 0             |
| one         | 1             |
| two         | 2             |
| few         | 3, 4, 5       |
| many        | 6, 7, ..., 99 |
| other       | 100, 101, ... |

If the provided `count` value does not fall in the range associated with a defined plural, the "other" plural form will be used as a default if it is defined. If "other" is not defined, the base text value will be used as a final fallback.

To read more about pluralization and see other examples of how it is used in i18n at large, please refer to the pluralization page in the i18next docs: https://www.i18next.com/translation-function/plurals

### Example

To see a working React app utilizing the [Ditto CLI](https://github.com/dittowords/cli) and `ditto-react`, please refer to the Ditto Demo project: https://github.com/dittowords/ditto-demo.

---

## Reference

### DittoProvider

The `DittoProvider` component should wrap all parts of your component tree that will display copy from Ditto.

If `variant` is supplied, base text values will be used as a fallback for any pieces of text where corresponding variant values can't be found.

#### Props

| Prop        | Type              | Description                                                                                                                                                              |
| ----------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `source`    | JSON (required)   | Copy data imported from the CLI-generated `ditto` folder — see [Source](#Source) for more info                                                                           |
| `variant`   | String (optional) | The API ID of a variant; if specified, all descendant `Ditto` components will attempt to display the value of that variant (requires usage of the `variants` CLI option) |
| `projectId` | String (optional) | The ID of a project in Ditto; can also be ommitted from the provdier and passed as a direct prop to `Ditto` components                                                   |

#### Example

```jsx
import DittoProvider, { Ditto } from "ditto-react";
import source from "./ditto";

<DittoProvider source={source}>{/* the rest of your app */}</DittoProvider>;
```

### Ditto

The `Ditto` component is used for rendering text. Text can be rendered from **components in your component library** (recommended) or from **projects in your workspace**.

Which method you use depends on how you've configured your CLI options. Please refer to the [Ditto CLI](https://github.com/dittowords/cli) and [Ditto Demo](https://github.com/dittowords/ditto-demo) projects for more information.

#### Component Library (recommended)

| Prop          | Type              | Description                                                                                                                                                                                                                                             |
| ------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `componentId` | string            | The API ID of a component in your component library. If a `variant` prop is passed to an ancestor `DittoProvider`, will attempt to display the specified variant's value for the passed `componentId`; otherwise, will default to displaying base text. |
| `variables`   | object (optional) | A map of variable key-value pairs to interpolate in your text. (not supported for the `flat` source format)                                                                                                                                             |
| `count`       | number (optional) | This value is used to specify which plural case you wish to use                                                                                                                                                                                         |

##### Example

```jsx
<Ditto
  componentId="footer.links.contact-us"
  variables={{ email: "support@dittowords.com" }}
  count={1}
/>
```

#### Project

| Prop        | Type                   | Description                                                                                                     | Example                             |
| ----------- | ---------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `projectId` | string (semi-required) | ID of a project in Ditto; required if a `projectId` isn't found in an ancestor `DittoProvider`                  |
| `textId`    | string (optional)      | ID of a single text item in Ditto                                                                               |                                     |
| `frameId`   | string (optional)      | ID of a frame in Ditto                                                                                          |                                     |
| `blockId`   | string (optional)      | ID of a block in Ditto                                                                                          |                                     |
| `filters`   | object (optional)      | object of filters for text items returned. Currently supports a single parameter: tags, an array of tag strings | { tags: ["SELECTS"]}                |
| `variables` | object (optional)      | A map of variable key-value pairs to interpolate in your text. (not supported for the `flat` source format)     | { email: "support@dittowords.com" } |
| `count`     | number (optional)      | This value is used to specify which plural case you wish to use                                                 | 1                                   |

##### Examples

If you pass `textId`, the specified text string will be rendered:

```jsx
<Ditto
  textId="text_6151fa25151df3024333a8cb"
  projectId="project_613a9b8fd268f614cae17469"
/>
```

If you pass `frameId` and/or `blockId`, the specified frame/block object will be passed to a child function:

```jsx
<Ditto
  frameId="frame_6151fa25151df3024333a8bd"
  blockId="my_block"
  projectId="project_613a9b8fd268f614cae17469"
>
  {(block) =>
    Object.keys(block).map((id) => <div key={block[id]}>{block[id]}</div>)
  }
</Ditto>
```

### Type-specific component exports

In addition to the `<Ditto />` component, individual exports of each specific component type are also available. These behave identically to passing the respective prop configurations to the `<Ditto />` component, but may provide a better experience for TypeScript users due to their improved out-of-the-box type safety and inference:

```js
import {
  DittoFrame,
  DittoBlock,
  DittoText,
  DittoComponent, // rendering components from your Ditto component library
} from "ditto-react";
```

### Hooks (experimental)

Hooks are also available for consuming data from a `<DittoProvider />`. The two hooks currently exposed have unpolished ergonomics due to the manner in which they evolved from legacy constraints.

In future versions of `ditto-react`, a hooks-based API will be the primary way through which data is accessed (instead of components), and the API will likely have some differences from what is currently available.

```js
import { useDittoComponent, useDittoSingleText } from "ditto-react";

// assumes `projectId` was specified for an ancestor <DittoProvider />
const text = useDittoSingleText({ textId: "xxx-xxx" });

const componentText = useDittoComponent({ componentId: "xxx-xxx" });

const { username } = useAppContext();
const textWithVariables = useDittoComponent({
  componentId: "xxx-xxx",
  variables: { username },
});

const { cartItems } = useCartContext();
const textPluralized = useDittoSingleText({
  textId: "xxx-xxx",
  projectId: "xxx-xxx",
  count: cartItems.length,
});
```

## Additional Examples

### Example: Single Text

The `Ditto` component can be used to fetch a specific text item from the Ditto project using its API ID. Note that you can edit IDs for text, blocks, and frames directly the Ditto web app:

```jsx
<Ditto textId="text_601cc35c5bsdfe42cc3f6f8ac59" />
```

### Example: Fetch Block

You can also fetch an entire Block in Ditto at once by specifying the `frameId` and the `blockId`.

It will return as an entire JSON object of the frame. You can pull out specific IDs of text you'd like to pass to its children.

```jsx
<Ditto frameId="frame_601cc35d5be42cc3f6f8ad15" blockId="hero">
  {({ hero_h1, text_601cc35c5be42cc3f6f8ac46, hero_cta }) => (
    <div>
      <h1>{hero_h1}</h1>
      <h2>{text_601cc35c5be42cc3f6f8ac46}</h2>
      <button>{hero_cta}</button>
    </div>
  )}
</Ditto>
```

You can also iterate through the entire block (just as you can with any other object) to display each one.

```jsx
<Ditto frameId="header" blockId="navigation">
  {(block) => {
    return Object.keys(block).map((id) => (
      <div key={block[id]}>{block[id]}</div>
    ));
  }}
</Ditto>
```

### Example: Fetch Frame

You can also fetch an entire Block in Ditto at once by just specifying the `frameId`. With it, you can fetch specific blocks, or iterate through all blocks and containing IDs as needed.

```jsx
<Ditto frameId="frame_601cc35d5be42cc3f6f8ad17">
  {(frame) => {
    return Object.keys(frame.blocks).map((blockId) => (
      <div className={style.footerCol} key={blockId}>
        {Object.keys(frame.blocks[blockId]).map((textId) => (
          <div className={style.link} key={textId}>
            {frame.blocks[blockId][textId]}
          </div>
        ))}
      </div>
    ));
  }}
</Ditto>
```

### Example: Filtering by Tags

If you want to filter the text fetched by properties contained in the project itself, you can specify parameters to the `filter` prop of the `Ditto` component. This currently only supports the Tags field in Ditto, but will be expanded in the future to filter on any other metadata properties.

```jsx
// will only return text with the "TOP_NAV" tag
<Ditto
  frameId="frame_601cc35d5be42cc3f6f8ad15"
  blockId="navigation"
  filters={{ tags: ["TOP_NAV"] }}
>
  {(block) => {
    return Object.keys(block).map((id) => (
      <div className={style.link} key={block[id]}>
        {block[id]}
      </div>
    ));
  }}
</Ditto>
```

---

## Source

The React provider takes structured JSON outputs from Ditto as the source. These can be linked and automatically updated via [our API/CLI](https://github.com/dittowords/cli), or exported manually via the Ditto web app.

If you're using manual exports from the Ditto web app, turn on Developer Mode in the toolbar of project you're working from to generate API IDs. Then, export your file formatted with the IDs into your local directory .

---

## Feedback

Have feedback? We’d love to hear it! Ditto's developer integrations are constantly being improved by feedback from users like you. :)

Message us at [support@dittowords.com](mailto:support@dittowords.com).
