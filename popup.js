// Extension popup script
import { createRoot } from "react-dom/client";
import ExtensionApp from "./src/ExtensionApp.js";

// Initialize the popup
const root = createRoot(document.getElementById("root"));
root.render(ExtensionApp());