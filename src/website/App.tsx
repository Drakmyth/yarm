import { Menu, MenuButton, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import React from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/js/all.js"
import { AcceleratedMenuItem } from "./components/AcceleratedMenuItem/AcceleratedMenuItem";

const titlebar = document.getElementById("titlebar");
const app = document.getElementById("app");

const Titlebar = () => (
    <Menu menuButton={<MenuButton>File</MenuButton>}>
        <AcceleratedMenuItem ctrl hotkey="N">New...</AcceleratedMenuItem>
        <AcceleratedMenuItem ctrl hotkey="O">Open...</AcceleratedMenuItem>
        <SubMenu label="Open Recent"></SubMenu>
        <AcceleratedMenuItem ctrl hotkey="W">Close</AcceleratedMenuItem>
        <MenuDivider />
        <AcceleratedMenuItem ctrl hotkey="S">Save</AcceleratedMenuItem>
        <AcceleratedMenuItem ctrl shift hotkey="S">Save As...</AcceleratedMenuItem>
        <MenuDivider />
        <MenuItem>Preferences...</MenuItem>
        <MenuDivider />
        <AcceleratedMenuItem ctrl hotkey="Q">Exit</AcceleratedMenuItem>
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
