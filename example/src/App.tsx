import DittoProvider, {
  Ditto,
  Frame,
  Block,
  DittoText,
  DittoFrame,
  DittoBlock,
  DittoComponent,
} from "ditto-react";
import source from "./ditto";

const App = () => {
  return (
    <div style={{ padding: 40 }}>
      <div>
        <DittoProvider
          source={source}
          projectId="project_606cb89ac55041013d662f8b"
        >
          <h4>Component Library</h4>
          <ul>
            <li>
              <Ditto componentId="excellent.validation" variables={{ name: "John Doe"}} />
            </li>
            <li>
              <DittoComponent componentId="excellent.validation" variables={{ name: "Sam Doe"}}/>
            </li>
            <li>
              <Ditto componentId="excellent.validation">
                {(text: string) => <>{text}</>}
              </Ditto>
            </li>
            <li>
              <DittoComponent componentId="excellent.validation">
                {(text) => <>{text}</>}
              </DittoComponent>
            </li>
          </ul>
          <h4>Project</h4>
          <ul>
            <li>
              <Ditto textId="text_606cb89a2e11c4009984ad75" />
            </li>
            <li>
              <DittoText textId="text_606cb89a2e11c4009984ad75" />
            </li>
            <li>
              <Ditto textId="text_606cb89a2e11c4009984ad75">
                {(text: string) => <>{text}</>}
              </Ditto>
            </li>
            <li>
              <DittoText textId="text_606cb89a2e11c4009984ad75">
                {(text) => <>{text}</>}
              </DittoText>
            </li>
            <li>
              <Ditto frameId="frame_606cb89a2e11c4009984ad72">
                {(frame: Frame) => {
                  const markup: React.ReactNode[] = [];

                  Object.keys(frame.blocks).forEach((blockId) => {
                    const block: Block = frame.blocks[blockId];

                    Object.keys(block).forEach((textId) => {
                      markup.push(
                        <span key={`${blockId}-${textId}`}>
                          {block[textId]}
                        </span>
                      );
                    });
                  });

                  return markup;
                }}
              </Ditto>
            </li>
            <li>
              <DittoFrame frameId="frame_606cb89a2e11c4009984ad72">
                {(frame) => {
                  const markup: React.ReactNode[] = [];

                  Object.keys(frame.blocks).forEach((blockId) => {
                    const block: Block = frame.blocks[blockId];

                    Object.keys(block).forEach((textId) => {
                      markup.push(
                        <span key={`${blockId}-${textId}`}>
                          {block[textId]}
                        </span>
                      );
                    });
                  });

                  return markup;
                }}
              </DittoFrame>
            </li>
            <li>
              <Ditto frameId="frame_606cb89a2e11c4009984ad72" blockId="heading">
                {(block: Block) => {
                  return Object.keys(block).map((key) => (
                    <span key={key}>{block[key]}</span>
                  ));
                }}
              </Ditto>
            </li>
            <li>
              <DittoBlock
                frameId="frame_606cb89a2e11c4009984ad72"
                blockId="heading"
              >
                {(block) => {
                  return Object.keys(block).map((key) => (
                    <span key={key}>{block[key]}</span>
                  ));
                }}
              </DittoBlock>
            </li>
          </ul>
        </DittoProvider>
      </div>
    </div>
  );
};

export default App;
