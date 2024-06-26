# Ditto React

`ditto-react` makes it easy to integrate a React app with Ditto.

- Exposes Ditto data to your application through an easy-to-wrap provider
- Offers support for localizing using Ditto variants
- Works hand-in-hand with the [Ditto CLI](https://github.com/dittowords/cli)

Ditto also works with many popular 3rd party i18n libraries. Check out [our demo repository](https://github.com/dittowords/ditto-react-demo/tree/react-i18next) for an example of how Ditto can be integrated into development using [react-i18next](https://react.i18next.com/).

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
<Ditto componentId="shopping-cart" />;
output === "The cart contains {{itemName}}.";
```

Template tags are automatically interpolated if a value for a given variable (keyed by the variable's name) is provided via the `variables` prop:

```jsx
<Ditto componentId="shopping-cart" variables={{ itemName: "apples" }} />
output === "The cart contains apples."

<Ditto componentId="shopping-cart" variables={{ itemName: "pears" }} />
output === "The cart contains pears."
```

If no value is provided for a variable, but that variable has a fallback value configured in the source data synced from Ditto (`structured` json format only), the fallback will be used:

```jsx
const source = {
  "shopping-cart": {
    "text": "The cart contains {{itemName}}.",
    "variables": {
      "itemName": {
        "example": "pears",
        // ✔️ variable source data has a fallback value
        "fallback": "some fruit",
        "__type": "string"
      }
    }
  }
}

...

// ✔️ fallback value is used when variable value is not specified
<Ditto componentId="shopping-cart" />;
output === "The cart contains some fruit.";
```

When passing data for a `list` variable, an error is logged to the console if the passed data doesn't correspond to a value in the list.

```js
const source = {
  "shopping-cart": {
    "text": "The cart contains {{itemName}}.",
    "variables": {
      "itemName": [
        "apples",
        "pears",
        "oranges"
      ]
    }
  }
}

...

// ✔ value in list, no error logged
<Ditto componentId="shopping-cart" variables={{ itemName: "pears" }} />
output === "The cart contains pears."

// ❌ value NOT in list, error logged (but output retained)
<Ditto componentId="shopping-cart" variables={{ itemName: "grapes" }} />
output === "The cart contains pears."
```

When passing data for a `map` variable:

- if the data corresponds to a map key, the corresponding value in the map is interpolated
- if the data doesn't correspond to a map key, an error is logged to the console and the data is interpolated directly

```js
const source = {
  "user-role": {
    "text": "You are {{role}} in this workspace.",
    "variables": {
      "role": {
        "admin": "an administrator",
        "editor": "an editor",
        "commenter": "a commenter",
        "__type": "map"
      }
    }
  }
}

...

// ✔ in list, corresponding value interpolated
<Ditto componentId="user-role" variables={{ role: "admin" }} />
output === "You are an administrator in this workspace."

// ❌ NOT in list, error logged, passed data directly interpolated
<Ditto componentId="user-role" variables={{ role: "owner" }} />
output === "You are owner in this workspace."
```

## Pluralization

`ditto-react` integrates with Ditto Plurals to support pluralized text. Learn how to create and configure Ditto Plurals here: https://www.dittowords.com/docs/pluralization.

_Note: Pluralization will only work if the source file is in the `structured` format._

When a text item has plural forms, the default plural form will be used when that text item is rendered normally:

```jsx
<Ditto textId={textId} />;
output === "The cart contains some items.";
```

When a `count` prop is provided, the plural form to render (of those that are configured in Ditto) will be inferred based off of that value:

```jsx
<Ditto textId={textId} count={3}/>
output === "The cart contains a few items."

<Ditto textId={textId} count={10}/>
output === "The cart contains many items."

<Ditto textId={textId} count={0}/>
output === "The cart contains nothing."
```

Plurals can also be used in combination with [variables](#variable-interpolation):

```jsx
// If the "many" plural form is "The cart contains many {{adjective}} items."
<Ditto textId={textId} variables={{ adjective: "fun" }} count={10} />;
output === "The cart contains many fun items.";
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
To see a working React app utilizing the [Ditto CLI](https://github.com/dittowords/cli) and `ditto-react`, please refer to the Ditto Demo project: https://github.com/dittowords/ditto-react-demo.

## Rich Text

Ditto's [rich text](https://www.dittowords.com/docs/rich-text) functionality can be enabled on `<Ditto />`, `<DittoText />` or `<DittoComponent />` via the `richText` property. Once enabled, `ditto-react` will automatically render the rich text versions of the text item/component.

### Examples

```
<Ditto componentId="shopping-cart" richText />
```

```
<DittoText textId="text_61e7238bbae5dc00fb66de15" variables={{ itemCount: 5 }} richText/>
```

```
<DittoComponent componentId="shopping-cart" count={5} variables={{ itemCount: 5 }} richText />
```

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

| Prop          | Type               | Description                                                                                                                                                                                                                                             |
| ------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `componentId` | string             | The API ID of a component in your component library. If a `variant` prop is passed to an ancestor `DittoProvider`, will attempt to display the specified variant's value for the passed `componentId`; otherwise, will default to displaying base text. |
| `variables`   | object (optional)  | A map of variable key-value pairs to interpolate in your text.                                                                                                                                                                                          |
| `count`       | number (optional)  | This value is used to specify which plural case you wish to use                                                                                                                                                                                         |
| `richText`    | boolean (optional) | This value is used to enable rich text rendering                                                                                                                                                                                                        |

##### Example

```jsx
<Ditto
  componentId="footer.links.contact-us"
  variables={{ email: "support@dittowords.com" }}
  count={1}
/>
```

#### Project

| Prop        | Type                              | Description                                                                                                     | Example                             |
| ----------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `projectId` | string (semi-required)            | ID of a project in Ditto; required if a `projectId` isn't found in an ancestor `DittoProvider`                  |
| `textId`    | string (optional)                 | ID of a single text item in Ditto                                                                               |                                     |
| `frameId`   | string (optional, **deprecated**) | ID of a frame in Ditto                                                                                          |                                     |
| `blockId`   | string (optional, **deprecated**) | ID of a block in Ditto                                                                                          |                                     |
| `filters`   | object (optional)                 | object of filters for text items returned. Currently supports a single parameter: tags, an array of tag strings | { tags: ["SELECTS"]}                |
| `variables` | object (optional)                 | A map of variable key-value pairs to interpolate in your text.                                                  | { email: "support@dittowords.com" } |
| `count`     | number (optional)                 | This value is used to specify which plural case you wish to use                                                 | 1                                   |
| `richText`  | boolean (optional)                | This value is used to enable rich text rendering                                                                |

##### Examples

If you pass `textId`, the specified text string will be rendered:

```jsx
<Ditto textId="text_6151fa25151df3024333a8cb" projectId="project_613a9b8fd268f614cae17469" />
```

**(deprecated)** If you pass `frameId` and/or `blockId`, **the specified** frame/block object will be passed to a child function:

```jsx
<Ditto
  frameId="frame_6151fa25151df3024333a8bd"
  blockId="my_block"
  projectId="project_613a9b8fd268f614cae17469"
>
  {(block) => Object.keys(block).map((id) => <div key={block[id]}>{block[id]}</div>)}
</Ditto>
```

### Type-specific component exports

In addition to the `<Ditto />` component, individual exports of each specific component type are also available. These behave identically to passing the respective prop configurations to the `<Ditto />` component, but may provide a better experience for TypeScript users due to their improved out-of-the-box type safety and inference:

```js
import {
  DittoFrame, // deprecated
  DittoBlock, // deprecated
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

## Source

The React provider takes structured JSON outputs from Ditto as the source. These can be linked and automatically updated via [our API/CLI](https://github.com/dittowords/cli), or exported manually via the Ditto web app.

If you're using manual exports from the Ditto web app, turn on Developer Mode in the toolbar of project you're working from to generate API IDs. Then, export your file formatted with the IDs into your local directory .

---

## Feedback

Have feedback? We’d love to hear it! Ditto's developer integrations are constantly being improved by feedback from users like you. :)

Message us at [support@dittowords.com](mailto:support@dittowords.com).
