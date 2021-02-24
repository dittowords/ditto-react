# Ditto React SDK

`ditto-react` is a package to pull in product copy from Ditto into React applications. Ditto allows for end-to-end syncing of text from mockups (Figma) all the way to production. For more information, visit [dittowords.com](http://dittowords.com).

## Getting Started

Install Ditto's React SDK with either NPM or Yarn.

```jsx
npm install ditto-react

yarn add ditto-react
```

---

## Usage

### DittoProvider Props

`DittoProvider` is used to wrap anywhere in your app you'd like to use `Ditto` components. Use `DittoProvider` to specify the source of any `Ditto` components inside.


| Prop | Type | Description |
| --- | --- | --- |
| `source` | JSON (required) | product copy to be used by Ditto wherever DittoProvider wraps — see Source (link to bottom) for more info  |


### DittoProvider **Example**

```jsx
import source from "/.ditto/text.json";

<DittoProvider source={source}>
	{/* insert any app components here,
	including Ditto components and regular
	React components */}
</DittoProvider>
```

### Ditto Props

`Ditto` is used to fetch specific text, blocks, and frames from the source. You must specify at least a `textId` or a `frameId`.


| Prop | Type | Description | Example |
| --- | --- | --- | --- |
| `frameId` | string (optional) | ID of a frame in Ditto |  |
| `blockId` | string (optional) | ID of a block in Ditto |  |
| `textId` | string (optional) | ID of a single text item in Ditto |  |
| `filters` | object (optional) | object of filters for text items returned. Currently supports a single parameter: tags, an array of tag strings | { tags: ["SELECTS"]} |


### Example: Single Text

The `Ditto` component can be used to fetch a specific text item from the Ditto project using its unique ID. Note that you can edit IDs for text, blocks, and frames directly in our web-app.

```jsx
<Ditto textId="text_601cc35c5bsdfe42cc3f6f8ac59"/>
```

### Example: Fetch Block

You can also fetch an entire Block in Ditto at once by specifying the `frameId` and the `blockId`.

It will return as an entire JSON object of the frame. You can pull out specific IDs of text you'd like to pass to its children.

```jsx
<Ditto frameId="frame_601cc35d5be42cc3f6f8ad15" blockId="hero">
  {({
    hero_h1, text_601cc35c5be42cc3f6f8ac46, hero_cta
  }) => (
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
<Ditto
    frameId="header"
    blockId="navigation"
  >
    {( block ) => {
      return Object.keys(block).map((id) => (
        <div key={block[id]}>{block[id]}</div>
      ));
    }}
  </Ditto>
```

### Example: Fetch Frame

You can also fetch an entire Block in Ditto at once by just specifying the `frameId`. With it, you can fetch specific blocks, or iterate through all blocks and containing IDs as needed.

```jsx
<Ditto
  frameId="frame_601cc35d5be42cc3f6f8ad17"
>
  {( frame ) => {
    return Object.keys(frame.blocks).map((blockId) => (
      <div className={style.footerCol} key={blockId}>
        {
          Object.keys(frame.blocks[blockId]).map((textId) => (
            <div className={style.link} key={textId}>
              {frame.blocks[blockId][textId]}
            </div>
          ))
        }
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
  filters={{ tags: ["TOP_NAV"]}}
>
  {( block ) => {
    return Object.keys(block).map((id) => (
      <div className={style.link} key={block[id]}>{block[id]}</div>
    ));
  }}
</Ditto>
```

---

## Source

The React provider takes structured JSON outputs from Ditto projects as the source. These can be linked and automatically updated via our API/CLI (insert link here), or exported manually via our web-app.

If you're using manual exports from our web-app, turn on Developer Mode in the toolbar of project you're working from to generate IDs. Then, export your file formatted with the IDs into your local directory .

---

## Feedback

Have feedback? We’d love to hear it! Ditto's developer integrations are constantly being improved by feedback from users like you. :)

Message us at [support@dittowords.com](mailto:support@dittowords.com).
