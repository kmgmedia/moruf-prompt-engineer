import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Vite fires this when a lazy-loaded chunk fails (stale cached hash after a
// redeploy, or a dropped connection). Reload once to pick up the current
// build; the sessionStorage guard stops an offline retry from looping.
window.addEventListener("vite:preloadError", () => {
  const key = "chunk-reload-attempted";
  if (!sessionStorage.getItem(key)) {
    sessionStorage.setItem(key, "1");
    window.location.reload();
  }
});
window.addEventListener("load", () => {
  sessionStorage.removeItem("chunk-reload-attempted");
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
