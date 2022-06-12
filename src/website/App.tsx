import { Menu, MenuButton, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import React from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { AcceleratedMenuItem } from "./components/AcceleratedMenuItem/AcceleratedMenuItem";

const titlebar = document.getElementById("titlebar");
const app = document.getElementById("app");

const Titlebar = () => (
    <>
        <div className="titlebar-menus">
            <Menu menuButton={<MenuButton>File</MenuButton>}>
                <AcceleratedMenuItem label="New..." ctrl hotkey="N" />
                <AcceleratedMenuItem label="Open..." ctrl hotkey="O" />
                <SubMenu label="Open Recent"></SubMenu>
                <AcceleratedMenuItem label="Close" ctrl hotkey="W" />
                <MenuDivider />
                <AcceleratedMenuItem label="Save" ctrl hotkey="S" />
                <AcceleratedMenuItem label="Save As..." ctrl shift hotkey="S" />
                <MenuDivider />
                <MenuItem>Preferences...</MenuItem>
                <MenuDivider />
                <AcceleratedMenuItem label="Exit" ctrl hotkey="Q" />
            </Menu>
            <Menu menuButton={<MenuButton>View</MenuButton>}>
                <MenuItem>Language</MenuItem>
                <MenuDivider />
                <MenuItem type="checkbox" checked={true}>
                    Show Toolbar
                </MenuItem>
                <MenuDivider />
                <MenuItem>Configure Columns...</MenuItem>
            </Menu>
            <Menu menuButton={<MenuButton>Help</MenuButton>}>
                <MenuItem>Check for Updates...</MenuItem>
                <MenuItem>Release Notes</MenuItem>
                <MenuDivider />
                <MenuItem>Visit GitHub</MenuItem>
                <MenuItem>Report Issue</MenuItem>
                <MenuDivider />
                <AcceleratedMenuItem label="Show Dev Tools" ctrl shift hotkey="I" />
                <MenuDivider />
                <MenuItem>About</MenuItem>
            </Menu>
        </div>
        <div className="titlebar-title">Yarm</div>
        <div className="titlebar-controls">
            <MenuButton className="window-control">
                <i className="fa-solid fa-minus"></i>
            </MenuButton>
            <MenuButton className="window-control">
                <i className="fa-regular fa-square"></i>
            </MenuButton>
            <MenuButton className="window-control close-button">
                <i className="fa-solid fa-xmark"></i>
            </MenuButton>
        </div>
    </>
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
