import * as React from "react";
import { createRoot } from "react-dom/client";
import "./App.css";

const titlebar = document.getElementById("titlebar");
const app = document.getElementById("app");

const Titlebar = () => <div>Titlebar</div>;

const App = () => (
    <div>
        Hello, <em>world!!!</em>
    </div>
);

const titlebarRoot = createRoot(titlebar!);
const appRoot = createRoot(app!);

titlebarRoot.render(<Titlebar />);
appRoot.render(<App />);
