import { Menu, MenuButton, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import * as React from "react";
import { createRoot } from "react-dom/client";
import "./App.css";

const titlebar = document.getElementById("titlebar");
const app = document.getElementById("app");

const Titlebar = () => (
    <Menu menuButton={<MenuButton>File</MenuButton>}>
        <MenuItem><span>New...</span><span>Ctrl+N</span></MenuItem>
        <MenuItem>Open...</MenuItem>
        <SubMenu label="Open Recent"></SubMenu>
        <MenuItem>Close</MenuItem>
        <MenuDivider />
        <MenuItem>Save</MenuItem>
        <MenuItem>Save As...</MenuItem>
        <MenuDivider />
        <MenuItem>Preferences...</MenuItem>
        <MenuDivider />
        <MenuItem><span>Exit</span><span>Ctrl+Q</span></MenuItem>
    </Menu>
);

const App = () => (
    <div>
        Hello, <em>world!!!</em>
    </div>
);

const titlebarRoot = createRoot(titlebar!);
const appRoot = createRoot(app!);

titlebarRoot.render(<Titlebar />);
appRoot.render(<App />);
