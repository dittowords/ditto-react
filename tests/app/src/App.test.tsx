import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "./App";

test("Renders the app without crashing and correctly renders ditto text", () => {
  const { getByTestId } = render(<App />);
  expect(true).toBeTruthy();
  expect(getByTestId("component-example").textContent).toBe(
    "This is an example component with a Example String Variable",
  );
  expect(getByTestId("text-item-example").textContent).toBe(
    "This is an example text item with a 0",
  );
  expect(getByTestId("other-plural-example").textContent).toBe("Plural text for zero");
  expect(getByTestId("one-plural-example").textContent).toBe("Plural text for other");
  expect(getByTestId("hook-component-example").textContent).toBe(
    "This is an example component with a Test String",
  );
  expect(getByTestId("hook-text-item-example").textContent).toBe(
    "This is an example text item with a 5",
  );
  expect(getByTestId("hook-other-plural-example").textContent).toBe("Plural text for zero");
  expect(getByTestId("hook-one-plural-example").textContent).toBe("Plural text for other");
  expect(getByTestId("ditto-component").textContent).toBe(
    "This is an example component with a Test String",
  );
  expect(getByTestId("ditto-text-item").textContent).toBe("This is an example text item with a 5");
  expect(getByTestId("rich-text-component").innerHTML.toString()).toEqual(
    "<span><p>This is a <strong>rich text</strong> component example</p></span>",
  );
  expect(getByTestId("rich-text-text-item").innerHTML.toString()).toEqual(
    "<span><p>This is a <strong>rich text</strong> text item example</p></span>",
  );
});
