import React from "react";
import { createRoot } from "react-dom/client";

export default function App() {
  return <div>Hello, Electron with React!</div>;
}

createRoot(document.getElementById("root")!).render(<App />);
