import * as React from "react";
import { createRoot } from "react-dom/client";

const app = document.getElementById("app");

const Emphasis: React.FC<React.PropsWithChildren> = (props) => <em>{props.children}</em>;

const App = () => (
    <div>
        Hello, <Emphasis>world</Emphasis>
    </div>
);

const root = createRoot(app!);
root.render(<App />);
