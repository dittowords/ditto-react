import { useState } from 'react'
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
  const options = ['base', 'french']
  const [variant, setVariant] = useState<string>('base')
  const onVariantChange = (e: any) => {
    setVariant(e.target.value)
  }
  return (
    <div style={{ padding: 40 }}>
      <select onChange={onVariantChange}>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <div>
        <DittoProvider
          source={source}
          projectId="project_61e72388365c930170607378"
          variant={variant}
        >
          <h4>Component Libary</h4>
          <div>
            <h5>ShoppingCart</h5>
            <div>
              <div className="dittoItem">
                <pre>{`<Ditto componentId="shopping-cart" />`}</pre>
                <Ditto componentId="shopping-cart" />
              </div>
              <div className="dittoItem">
                <pre>{`<Ditto componentId="shopping-cart" variables={{ itemCount: 2 }}/>`}</pre>
                <Ditto componentId="shopping-cart" variables={{ itemCount: 2 }}/>
              </div>
              <div className="dittoItem">
                <pre>{`<Ditto componentId="shopping-cart" count={2}/>`}</pre>
                <Ditto componentId="shopping-cart" count={2}/>
              </div>
              <div className="dittoItem">
                <pre>{`<Ditto componentId="shopping-cart" count={0} variables={{ itemCount: 0 }}/>`}</pre>
                <Ditto componentId="shopping-cart" count={0} variables={{ itemCount: 0 }}/>
              </div>
              <div className="dittoItem">
                <pre>{`<Ditto componentId="shopping-cart" count={1} variables={{ itemCount: 1 }}/>`}</pre>
                <Ditto componentId="shopping-cart" count={1} variables={{ itemCount: 1 }}/>
              </div>
              <div className="dittoItem">
                <pre>{`<Ditto componentId="shopping-cart" count={5} variables={{ itemCount: 5 }}/>`}</pre>
                <Ditto componentId="shopping-cart" count={5} variables={{ itemCount: 5 }}/>
              </div>
            </div>
          </div>
          <div>
           
          <h5>teamplan</h5>
          <div>
            <div className="dittoItem">
              <pre>{`<DittoComponent componentId="team-plan" />`}</pre>
              <DittoComponent componentId="team-plan" />
            </div> 
          </div>
          </div>
          <h4>Project</h4>
          <div>    
            <div className="dittoItem">
              <pre>{`<Ditto frameId="frame_61e7238bbae5dc00fb66ddf5">`}</pre>
              <Ditto frameId="frame_61e7238bbae5dc00fb66ddf5">
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
              <pre>{`<Ditto frameId="frame_61e7238bbae5dc00fb66ddf1" variables={{ email: "support@example.com", minutes: 10 }}>`}</pre>
              <Ditto frameId="frame_61e7238bbae5dc00fb66ddf1" variables={{ email: "support@example.com", minutes: 10 }}>
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
              <pre>{`<Ditto frameId="frame_61e7238bbae5dc00fb66ddf1" variables={{ email: "support@example.com", minutes: 1 }} count={1}>`}</pre>
              <Ditto frameId="frame_61e7238bbae5dc00fb66ddf1" variables={{ email: "support@example.com", minutes: 1 }} count={1}>
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
              <pre>{`<DittoFrame frameId="frame_61e7238bbae5dc00fb66ddf2">`}</pre>
              <DittoFrame frameId="frame_61e7238bbae5dc00fb66ddf2">
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
              <pre>{`<DittoFrame frameId="frame_61e7238bbae5dc00fb66ddf2" variables={{ planName: "Team", stepNumber: 3, totalSteps: 5 }}>`}</pre>
              <DittoFrame frameId="frame_61e7238bbae5dc00fb66ddf2" variables={{ planName: "Team", stepNumber: 3, totalSteps: 5 }}>
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
              <pre>{`<DittoBlock frameId="frame_61e7238bbae5dc00fb66ddf2" blockId="header"> `}</pre>
              <DittoBlock
                frameId="frame_61e7238bbae5dc00fb66ddf2"
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
              <pre>{`<DittoBlock frameId="frame_61e7238bbae5dc00fb66ddf2" blockId="header" variables={{ stepNumber: 1, totalSteps: 9 }}> `}</pre>
              <DittoBlock
                frameId="frame_61e7238bbae5dc00fb66ddf2"
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
              <pre>{`<DittoBlock frameId="frame_61e7238bbae5dc00fb66ddf2" blockId="header" variables={{ stepNumber: 1, totalSteps: 9 }} count={1}>`}</pre>
              <DittoBlock
                frameId="frame_61e7238bbae5dc00fb66ddf2"
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
              <pre>{`<Ditto textId="text_61e7238bbae5dc00fb66de0b" />`}</pre>
              <Ditto textId="text_61e7238bbae5dc00fb66de0b" />
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto textId="text_61e7238bbae5dc00fb66de0b" variables={{ itemCount: 3 }}/>`}</pre>
              <Ditto textId="text_61e7238bbae5dc00fb66de0b" variables={{ itemCount: 3 }}/>
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto textId="text_61e7238bbae5dc00fb66de0b" variables={{ itemCount: 1 }} count={1}/>`}</pre>
              <Ditto textId="text_61e7238bbae5dc00fb66de0b" variables={{ itemCount: 1 }} count={1}/>
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto textId="text_61e7238bbae5dc00fb66de0b" variables={{ itemCount: 0 }} count={0}/>`}</pre>
              <Ditto textId="text_61e7238bbae5dc00fb66de0b" variables={{ itemCount: 0 }} count={0}/>
            </div>

            <div className="dittoItem">
              <pre>{`<DittoText textId="text_61e7238bbae5dc00fb66de15" />`}</pre>
              <DittoText textId="text_61e7238bbae5dc00fb66de15" />
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto textId="text_61e7238bbae5dc00fb66de15" variables={{ itemCount: 10 }} count={0}/>`}</pre>
              <Ditto textId="text_61e7238bbae5dc00fb66de15" variables={{ itemCount: 10 }} count={0}/>
            </div>
            <div className="dittoItem">
              <pre>{`<DittoText textId="text_61e7238bbae5dc00fb66de15" variables={{ itemCount: 5 }}/>`}</pre>
              <DittoText textId="text_61e7238bbae5dc00fb66de15" variables={{ itemCount: 5 }} />
            </div>
            <div className="dittoItem">
              <pre>{`<DittoText textId="text_61e7238bbae5dc00fb66ddff"/>`}</pre>
              <DittoText textId="text_61e7238bbae5dc00fb66ddff" />
            </div>
          </div>
        </DittoProvider>
      </div>
    </div>
  );
};

export default App;
