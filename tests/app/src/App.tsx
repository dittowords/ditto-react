import { DittoProvider } from "ditto-react";
import text from "./ditto/index.js";
import Tests from "./Tests";

export default function App() {
  return (
    <div>
      <DittoProvider source={text} projectId="project_test">
        <Tests />
      </DittoProvider>
    </div>
  );
}
