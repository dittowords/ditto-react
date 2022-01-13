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
          projectId="project_61df719ebc783c37d722f2c1"
        >
          <h4>Component Library</h4>
          <ul>
            <li>
              <Ditto componentId="shoppingcart" />
            </li>
            <li>
              <DittoComponent componentId="teamplan" />
            </li> 
          </ul>
          <h4>Project</h4>
          <ul>    
            <li>
              <Ditto frameId="frame_61df720abc783c37d722f3a0">
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
              <DittoFrame frameId="frame_61df720abc783c37d722f3a2">
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
              <DittoBlock
                frameId="frame_61df720abc783c37d722f3a4"
                blockId="header"
              >
                {(block) => {
                  return Object.keys(block).map((key) => (
                    <span key={key}>{block[key]}</span>
                  ));
                }}
              </DittoBlock>
            </li>
            <li>
              <Ditto frameId="frame_61df7203bc783c37d722f348" blockId="heading">
                {(block: Block) => {
                  return Object.keys(block).map((key) => (
                    <span key={key}>{block[key]}</span>
                  ));
                }}
              </Ditto>
            </li>
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
          </ul>
        </DittoProvider>
      </div>
    </div>
  );
};

export default App;
