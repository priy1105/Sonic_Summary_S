import { createRoot, type Root } from "react-dom/client";
import App from "./App";
import "./index.css";

type ComponentArgs = {
  data?: {
    status?: "idle" | "loading" | "done" | "error";
    error?: string;
    audioDataUrl?: string;
    topics?: string[];
  };
  parentElement: HTMLElement | ShadowRoot;
  setTriggerValue: (name: string, value: unknown) => void;
};

const roots = new WeakMap<object, Root>();

export default function renderSonicSummary(component: ComponentArgs) {
  const { parentElement, data, setTriggerValue } = component;
  const mountPoint = parentElement.querySelector("#sonic-summary-root");
  if (!(mountPoint instanceof HTMLElement)) {
    throw new Error("SonicSummary mount element was not found.");
  }

  let root = roots.get(parentElement);
  if (!root) {
    root = createRoot(mountPoint);
    roots.set(parentElement, root);
  }

  root.render(
    <App
      data={data ?? { status: "idle" }}
      onGenerate={(request) => setTriggerValue("generate", request)}
    />,
  );

  return () => {
    root?.unmount();
    roots.delete(parentElement);
  };
}
