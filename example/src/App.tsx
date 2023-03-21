import { useState } from "react";
import DittoProvider, {
  Ditto,
  DittoText,
  DittoComponent,
  useDittoComponent,
  useDittoSingleText,
} from "ditto-react";
import source from "./ditto/index.js";

const variantOptions = ["base", "french"] as const;
type Variant = typeof variantOptions[number];

interface AppProps {
  onVariantChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PROJECT_ID = "project_61e72388365c930170607378";

const AppWrapper = () => {
  const [variant, setVariant] = useState<Variant>("base");
  const onVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Variant;
    setVariant(value);
  };

  return (
    <DittoProvider source={source} projectId={PROJECT_ID} variant={variant}>
      <App onVariantChange={onVariantChange} />
    </DittoProvider>
  );
};

const App = (props: AppProps) => {
  const { onVariantChange } = props;

  const componentHookTextWithMapVariable = useDittoComponent({
    componentId: "shopping-cart-2",
    variables: { item: "apples" },
  });

  const componentHookTextWithListVariable = useDittoComponent({
    componentId: "role",
    variables: { role: "admin" },
  });

  const componentHookTextNoVariables = useDittoComponent({
    componentId: "shopping-cart",
  });

  const componentHookTextWithVariables = useDittoComponent({
    componentId: "shopping-cart",
    variables: { itemCount: 1 },
    count: 1,
  });

  const singleTextHookNoVariables = useDittoSingleText({
    textId: "text_61e7238bbae5dc00fb66de0b",
  });

  const singleTextHookWithVariables = useDittoSingleText({
    textId: "text_61e7238bbae5dc00fb66de0b",
    variables: { itemCount: 3 },
    count: 3,
  });

  return (
    <div style={{ padding: 40 }}>
      <select onChange={onVariantChange}>
        {variantOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div>
        <h4>Component Libary</h4>
        <div>
          <h5>ShoppingCart</h5>
          <div>
            <div className="dittoItem">
              <pre>{`useDittoComponent({ componentId: "shopping-cart-2", variables: { item: "apples" } });`}</pre>
              {componentHookTextWithMapVariable}
            </div>
            <div className="dittoItem">
              <pre>{`useDittoComponent({ componentId: "permission-select", variables: { permission: "editor" } });`}</pre>
              {componentHookTextWithListVariable}
            </div>
            <div className="dittoItem">
              <pre>{`useDittoComponent({ componentId: "shopping-cart" });`}</pre>
              <div>{componentHookTextNoVariables}</div>
            </div>
            <div className="dittoItem">
              <pre>{`useDittoComponent({ componentId: "shopping-cart", variables: { itemCount: 1 }, count: 1 });`}</pre>
              <div>{componentHookTextWithVariables}</div>
            </div>
            <div className="dittoItem">
              <pre>{`useDittoSingleText({ textId: "text_61e7238bbae5dc00fb66de0b" });`}</pre>
              <div>{singleTextHookNoVariables}</div>
            </div>
            <div className="dittoItem">
              <pre>{`useDittoSingleText({ textId: "text_61e7238bbae5dc00fb66de0b", variables: { itemCount: 3 }, count: 3 });`}</pre>
              <div>{singleTextHookWithVariables}</div>
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto componentId="shopping-cart" />`}</pre>
              <Ditto componentId="shopping-cart" />
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto componentId="shopping-cart" variables={{ itemCount: 2 }}/>`}</pre>
              <Ditto componentId="shopping-cart" variables={{ itemCount: 2 }} />
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto componentId="shopping-cart" count={2}/>`}</pre>
              <Ditto componentId="shopping-cart" count={2} />
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto componentId="shopping-cart" count={0} variables={{ itemCount: 0 }}/>`}</pre>
              <Ditto
                componentId="shopping-cart"
                count={0}
                variables={{ itemCount: 0 }}
              />
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto componentId="shopping-cart" count={1} variables={{ itemCount: 1 }}/>`}</pre>
              <Ditto
                componentId="shopping-cart"
                count={1}
                variables={{ itemCount: 1 }}
              />
            </div>
            <div className="dittoItem">
              <pre>{`<Ditto componentId="shopping-cart" count={5} variables={{ itemCount: 5 }}/>`}</pre>
              <Ditto
                componentId="shopping-cart"
                count={5}
                variables={{ itemCount: 5 }}
              />
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
            <pre>{`<Ditto textId="text_61e7238bbae5dc00fb66de0b" />`}</pre>
            <Ditto textId="text_61e7238bbae5dc00fb66de0b" />
          </div>
          <div className="dittoItem">
            <pre>{`<Ditto textId="text_61e7238bbae5dc00fb66de0b" variables={{ itemCount: 3 }}/>`}</pre>
            <Ditto
              textId="text_61e7238bbae5dc00fb66de0b"
              variables={{ itemCount: 3 }}
            />
          </div>
          <div className="dittoItem">
            <pre>{`<Ditto textId="text_61e7238bbae5dc00fb66de0b" variables={{ itemCount: 1 }} count={1}/>`}</pre>
            <Ditto
              textId="text_61e7238bbae5dc00fb66de0b"
              variables={{ itemCount: 1 }}
              count={1}
            />
          </div>
          <div className="dittoItem">
            <pre>{`<Ditto textId="text_61e7238bbae5dc00fb66de0b" variables={{ itemCount: 0 }} count={0}/>`}</pre>
            <Ditto
              textId="text_61e7238bbae5dc00fb66de0b"
              variables={{ itemCount: 0 }}
              count={0}
            />
          </div>

          <div className="dittoItem">
            <pre>{`<DittoText textId="text_61e7238bbae5dc00fb66de15" />`}</pre>
            <DittoText textId="text_61e7238bbae5dc00fb66de15" />
          </div>
          <div className="dittoItem">
            <pre>{`<Ditto textId="text_61e7238bbae5dc00fb66de15" variables={{ itemCount: 10 }} count={0}/>`}</pre>
            <Ditto
              textId="text_61e7238bbae5dc00fb66de15"
              variables={{ itemCount: 10 }}
              count={0}
            />
          </div>
          <div className="dittoItem">
            <pre>{`<DittoText textId="text_61e7238bbae5dc00fb66de15" variables={{ itemCount: 5 }}/>`}</pre>
            <DittoText
              textId="text_61e7238bbae5dc00fb66de15"
              variables={{ itemCount: 5 }}
            />
          </div>
          <div className="dittoItem">
            <pre>{`<DittoText textId="text_61e7238bbae5dc00fb66ddff"/>`}</pre>
            <DittoText textId="text_61e7238bbae5dc00fb66ddff" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppWrapper;
