export { Ditto } from "./components/Ditto";
export { DittoComponent } from "./components/DittoComponent";
export { DittoBlock, DittoFrame } from "./components/DittoFrameOrBlock";
export { DittoText } from "./components/DittoText";
export { useDittoComponent } from "./hooks/useDittoComponent";
export { useDittoSingleText } from "./hooks/useDittoSingleText";
export {
  Block,
  Frame,
  VariableData as DittoVariableData,
  VariableTypeGuards as DittoVariableTypeGuards,
} from "./lib/context";
export { DittoProvider };
import { DittoProvider } from "./components/DittoProvider";

export default DittoProvider;
