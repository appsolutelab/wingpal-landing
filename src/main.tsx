import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./ui/appsolute/styles.css";
import "./ui/wingpal/styles.css";
import "./App.css";
import "./motion.css";
import { App } from "./App";
import { initMotion } from "./motion";

// La lingua la decide la pagina: index.html è "it", en/index.html è "en".
const lang = document.documentElement.lang === "en" ? "en" : "it";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App lang={lang} />
  </StrictMode>,
);

// Dopo il primo render: initMotion cerca gli elementi nel DOM (e riprova da sola se non ci sono ancora).
requestAnimationFrame(initMotion);
