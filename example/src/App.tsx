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
          <h4>Component Libary</h4>
          <div>
            <h5>ShoppingCart</h5>
            <div>
              <div className="dittoItem">
                <pre>{`<Ditto componentId="shoppingcart" />`}</pre>
                <Ditto componentId="shoppingcart" />
              </div>
              <div className="dittoItem">
                <pre>{`<Ditto componentId="shoppingcart" variables={{ count: 2 }}/>`}</pre>
                <Ditto componentId="shoppingcart" variables={{ count: 2 }}/>
              </div>
              <div className="dittoItem">
                <pre>{`<Ditto componentId="shoppingcart" count={2}/>`}</pre>
                <Ditto componentId="shoppingcart" count={2}/>
              </div>
              <div className="dittoItem">
                <pre>{`<Ditto componentId="shoppingcart" count={0} variables={{ count: 0 }}/>`}</pre>
                <Ditto componentId="shoppingcart" count={0} variables={{ count: 0 }}/>
              </div>
              <div className="dittoItem">
                <pre>{`<Ditto componentId="shoppingcart" count={1} variables={{ count: 1 }}/>`}</pre>
                <Ditto componentId="shoppingcart" count={1} variables={{ count: 1 }}/>
              </div>
              <div className="dittoItem">
                <pre>{`<Ditto componentId="shoppingcart" count={5} variables={{ count: 5 }}/>`}</pre>
                <Ditto componentId="shoppingcart" count={5} variables={{ count: 5 }}/>
              </div>
            </div>
          </div>
          <div>
           
          <h5>teamplan</h5>
          <div>
            <div className="dittoItem">
              <pre>{`<DittoComponent componentId="teamplan" />`}</pre>
              <DittoComponent componentId="teamplan" />
            </div> 
          </div>
          </div>
          <h4>Project</h4>
          <div>    
            <div className="dittoItem">
              <pre>{`<Ditto frameId="frame_61df720abc783c37d722f3a0">`}</pre>
              <Ditto frameId="frame_61df720abc783c37d722f3a0">
                {(frame: Frame) => {
                  const markup: React.ReactNode[] = [];

                  Object.keys(frame.blocks).forEach((blockId) => {
                    const block: Block = frame.blocks[blockId];

                    Object.keys(block).forEach((textId) => {
                      markup.push(
                        <div key={`${blockId}-${textId}`} >
                          {block[textId]}
                        </div>
                      );
                    });
                  });

                  return markup;
                }}
              </Ditto>
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto frameId="frame_61df720abc783c37d722f3a0" variables={{ Email: "support@example.com", Minutes: 10 }}>`}</pre>
              <Ditto frameId="frame_61df720abc783c37d722f3a0" variables={{ Email: "support@example.com", Minutes: 10 }}>
                {(frame: Frame) => {
                  const markup: React.ReactNode[] = [];

                  Object.keys(frame.blocks).forEach((blockId) => {
                    const block: Block = frame.blocks[blockId];

                    Object.keys(block).forEach((textId) => {
                      markup.push(
                        <div key={`${blockId}-${textId}`} >
                          {block[textId]}
                        </div>
                      );
                    });
                  });

                  return markup;
                }}
              </Ditto>
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto frameId="frame_61df720abc783c37d722f3a0" variables={{ Email: "support@example.com", Minutes: 1 }} count={1}>`}</pre>
              <Ditto frameId="frame_61df720abc783c37d722f3a0" variables={{ Email: "support@example.com", Minutes: 1 }} count={1}>
                {(frame: Frame) => {
                  const markup: React.ReactNode[] = [];

                  Object.keys(frame.blocks).forEach((blockId) => {
                    const block: Block = frame.blocks[blockId];

                    Object.keys(block).forEach((textId) => {
                      markup.push(
                        <div key={`${blockId}-${textId}`} >
                          {block[textId]}
                        </div>
                      );
                    });
                  });

                  return markup;
                }}
              </Ditto>
            </div>
            <div className="dittoItem">
              <pre>{`<DittoFrame frameId="frame_61df720abc783c37d722f3a2">`}</pre>
              <DittoFrame frameId="frame_61df720abc783c37d722f3a2">
                {(frame) => {
                  const markup: React.ReactNode[] = [];

                  Object.keys(frame.blocks).forEach((blockId) => {
                    const block: Block = frame.blocks[blockId];

                    Object.keys(block).forEach((textId) => {
                      markup.push(
                        <div key={`${blockId}-${textId}`}>
                          {block[textId]}
                        </div>
                      );
                    });
                  });
                  return markup;
                }}
              </DittoFrame>
            </div>
            <div className="dittoItem">
              <pre>{`<DittoFrame frameId="frame_61df720abc783c37d722f3a2" variables={{ PlanName: "Team", stepNumber: 3, totalSteps: 5 }}>`}</pre>
              <DittoFrame frameId="frame_61df720abc783c37d722f3a2" variables={{ PlanName: "Team", stepNumber: 3, totalSteps: 5 }}>
                {(frame) => {
                  const markup: React.ReactNode[] = [];

                  Object.keys(frame.blocks).forEach((blockId) => {
                    const block: Block = frame.blocks[blockId];

                    Object.keys(block).forEach((textId) => {
                      markup.push(
                        <div key={`${blockId}-${textId}`}>
                          {block[textId]}
                        </div>
                      );
                    });
                  });
                  return markup;
                }}
              </DittoFrame>
            </div>
            <div className="dittoItem">
              <pre>{`<DittoBlock frameId="frame_61df720abc783c37d722f3a4" blockId="header"> `}</pre>
              <DittoBlock
                frameId="frame_61df720abc783c37d722f3a4"
                blockId="header"
              >
                {(block) => {
                  return Object.keys(block).map((key) => (
                    <div key={key}>{block[key]}</div>
                  ));
                }}
              </DittoBlock>
            </div>
            <div className="dittoItem">
              <pre>{`<DittoBlock frameId="frame_61df720abc783c37d722f3a4" blockId="header" variables={{ stepNumber: 1, totalSteps: 9 }}> `}</pre>
              <DittoBlock
                frameId="frame_61df720abc783c37d722f3a4"
                blockId="header"
                variables={{ stepNumber: 1, totalSteps: 9 }}
              >
                {(block) => {
                  return Object.keys(block).map((key) => (
                    <div key={key}>{block[key]}</div>
                  ));
                }}
              </DittoBlock>
            </div>
            <div className="dittoItem">
              <pre>{`<DittoBlock frameId="frame_61df720abc783c37d722f3a4" blockId="header" variables={{ stepNumber: 1, totalSteps: 9 }} count={1}>`}</pre>
              <DittoBlock
                frameId="frame_61df720abc783c37d722f3a4"
                blockId="header"
                variables={{ stepNumber: 1, totalSteps: 9 }}
                count={1}
              >
                {(block) => {
                  return Object.keys(block).map((key) => (
                    <div key={key}>{block[key]}</div>
                  ));
                }}
              </DittoBlock>
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto textId="text_61df7721bc783c37d722fbd4" />`}</pre>
              <Ditto textId="text_61df7721bc783c37d722fbd4" />
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto textId="text_61df7721bc783c37d722fbd4" variables={{ count: 3 }}/>`}</pre>
              <Ditto textId="text_61df7721bc783c37d722fbd4" variables={{ count: 3 }}/>
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto textId="text_61df7721bc783c37d722fbd4" variables={{ count: 1 }} count={1}/>`}</pre>
              <Ditto textId="text_61df7721bc783c37d722fbd4" variables={{ count: 1 }} count={1}/>
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto textId="text_61df7721bc783c37d722fbd4" variables={{ count: 0 }} count={0}/>`}</pre>
              <Ditto textId="text_61df7721bc783c37d722fbd4" variables={{ count: 0 }} count={0}/>
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto textId="text_61df7721bc783c37d722fbd4" variables={{ count: 10 }} count={0}/>`}</pre>
              <Ditto textId="text_61df7721bc783c37d722fbd4" variables={{ count: 0 }} count={0}/>
            </div>
            <div className="dittoItem">
              <pre>{`<DittoText textId="text_61df7721bc783c37d722fbd2" />`}</pre>
              <DittoText textId="text_61df7721bc783c37d722fbd2" />
            </div>
            <div className="dittoItem">
              <pre>{`<DittoText textId="text_61df7721bc783c37d722fbd2" variables={{ count: 5 }}/>`}</pre>
              <DittoText textId="text_61df7721bc783c37d722fbd2" variables={{ count: 5 }} />
            </div>
            <div className="dittoItem">
              <pre>{`<DittoText textId="text_61df7721bc783c37d722fbd2" variables={{ count: 5 }} count={5}/>`}</pre>
              <DittoText textId="text_61df7721bc783c37d722fbd2" variables={{ count: 5 }} count={5}/>
            </div>
            <div className="dittoItem">
              <pre>{`<DittoText textId="text_61df7721bc783c37d722fbd2" variables={{ count: 5 }} count={1}/>`}</pre>
              <DittoText textId="text_61df7721bc783c37d722fbd2" variables={{ count: 5 }} count={1}/>
            </div>
          </div>
        </DittoProvider>
      </div>
    </div>
  );
};

export default App;
