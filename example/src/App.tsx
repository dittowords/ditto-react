import DittoProvider, { Ditto } from "ditto-react";
import { useState } from "react";
import source from "./ditto";

const options = Object.keys(source);

const App = () => {
  const [variant, setVariant] = useState("base");

  return (
    <div style={{ padding: 40 }}>
      <div>
        <DittoProvider source={source}>
          <h4>Component Library</h4>
          <ul>
            <li>
              <Ditto componentId="basic-plan-team-disclaimer" />
            </li>
            <li>
              <Ditto componentId="best-practices.error.incorrect-date" />
            </li>
            <li>
              <Ditto componentId="excellent.validation" />
            </li>
          </ul>
          <h4>Project</h4>
          <ul>
            <li>
              <Ditto
                textId="text_606cb89a2e11c4009984ad74"
                projectId="project_606cb89ac55041013d662f8b"
              />
            </li>
            <li>
              <Ditto
                textId="text_606cb89a2e11c4009984ad75"
                projectId="project_606cb89ac55041013d662f8b"
              />
            </li>
            <li>
              <Ditto
                textId="text_606cb89a2e11c4009984ad76"
                projectId="project_606cb89ac55041013d662f8b"
              />
            </li>
          </ul>
        </DittoProvider>
      </div>
      <br />
      <hr />
      <div>
        <div style={{ padding: "20px 0" }}>
          <label htmlFor="">Variant</label> <br />
          <select
            onChange={(e) => {
              setVariant(e.target.value);
            }}
            value={variant}
          >
            {options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <DittoProvider
          source={source}
          variant={variant}
          projectId="project_606cb89ac55041013d662f8b"
        >
          <h4>Component Library w/ Variants</h4>
          <ul>
            <li>
              <Ditto componentId="basic-plan-team-disclaimer" />
            </li>
            <li>
              <Ditto componentId="best-practices.error.incorrect-date" />
            </li>
            <li>
              <Ditto componentId="excellent.validation" />
            </li>
          </ul>
          <h4>Project w/ Variants</h4>
          <ul>
            <li>
              <Ditto textId="text_606cb89a2e11c4009984ad74" />
            </li>
            <li>
              <Ditto textId="text_606cb89a2e11c4009984ad75" />
            </li>
            <li>
              <Ditto textId="text_606cb89a2e11c4009984ad76" />
            </li>
          </ul>
        </DittoProvider>
      </div>
    </div>
  );
};

export default App;
