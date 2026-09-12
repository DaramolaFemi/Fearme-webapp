import React from "react";
import ReactDOM from "react-dom/client";
import { MotionConfig } from "motion/react";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "lenis/dist/lenis.css";
import "./style.css";
import App from "./App";
import PoemPage from "./components/PoemPage";
import { poems } from "./data/poetry";

const pathname = window.location.pathname.replace(/\/+$/, "");
const isPoetry = pathname === "/poetry" || pathname.startsWith("/poetry/");
const poem = poems.find((entry) => pathname === `/poetry/${entry.slug}`);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      {isPoetry ? <PoemPage poem={poem} /> : <App />}
    </MotionConfig>
  </React.StrictMode>,
);
