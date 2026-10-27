import React from "react";
import { LearningProvider } from "./context/LearningContext.jsx";
import Dashboard from "./components/Dashboard.jsx";

export default function App() {
  return React.createElement(
    LearningProvider,
    null,
    React.createElement(Dashboard),
  );
}
