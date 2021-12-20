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
          <h4>Plurals</h4>
          <div>
            <div>
              <DittoComponent componentId="comp_ee67ecf7-613f-40db-9d4b-7a29f3db0a3e"/>
            </div>
            <div>
              <DittoComponent componentId="comp_ee67ecf7-613f-40db-9d4b-7a29f3db0a3e" count={0}/>
            </div>
            <div>
              <DittoComponent componentId="comp_ee67ecf7-613f-40db-9d4b-7a29f3db0a3e" count={1}/>
            </div>
            <div>
              <DittoComponent componentId="comp_ee67ecf7-613f-40db-9d4b-7a29f3db0a3e" count={2}/>
            </div>
          </div>
          <h4>Project</h4>
          <ul>
            <li>
              <Ditto textId="text_606cb89a2e11c4009984ad74" />
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
          <h3>Frame Example</h3>
          <ul>
            <Ditto frameId="frame_606cb89a2e11c4009984ad72" variables={{ username: "Sam Doe"}}>
              {(frame: Frame) => {
                const markup: React.ReactNode[] = [];

                Object.keys(frame.blocks).forEach((blockId) => {
                  const block: Block = frame.blocks[blockId];

                  Object.keys(block).forEach((textId) => {
                    markup.push(
                      <li key={`${blockId}-${textId}`}>
                        {block[textId]}
                      </li>
                    );
                  });
                });

                return markup;
              }}
            </Ditto>
          </ul>
          <ul>
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
