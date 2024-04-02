import components__root__base from "./components__root__base.json";
import test_project from "./test-project__base.json";

export default {
  project_test: {
    base: { ...test_project },
  },
  ditto_component_library: {
    base: { ...components__root__base },
  },
};
