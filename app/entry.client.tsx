import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});

// Additional client-side security measures
if (typeof window !== "undefined") {
  // Disable right-click context menu in production
  if (process.env.NODE_ENV === "production") {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }
  
  // Disable F12 and other developer tools shortcuts in production
  if (process.env.NODE_ENV === "production") {
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "C") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    });
  }
  
  // Clear console in production
  if (process.env.NODE_ENV === "production") {
    console.clear();
    console.log("%cStop!", "color: red; font-size: 50px; font-weight: bold;");
    console.log("%cThis is a browser feature intended for developers. Do not enter or paste code here.", "color: red; font-size: 16px;");
  }
}