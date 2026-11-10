import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./ui/appsolute/styles.css";
import "./ui/wingpal/styles.css";
import "./App.css";
import { App } from "./App";

// La lingua la decide la pagina: index.html è "it", en/index.html è "en".
const lang = document.documentElement.lang === "en" ? "en" : "it";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App lang={lang} />
  </StrictMode>,
);
