import { createRoot } from "react-dom/client";
import { App } from "./App";
import './css/bootstrap.css';
import "./css/font.css"

const root = createRoot(document.getElementById("root")!);

root.render(<App />);
