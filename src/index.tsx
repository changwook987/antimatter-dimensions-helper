import { createRoot } from "react-dom/client";
import { App } from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/font.css";

const root = createRoot(document.getElementById("root")!);

root.render(<App />);
