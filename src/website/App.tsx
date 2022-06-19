import { ControlledMenu, MenuButton, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import React, { MutableRefObject, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { AcceleratedMenuItem } from "./components/AcceleratedMenuItem/AcceleratedMenuItem";
import "../api/IPCApi";
import { TreeItem, TreeView } from "./components/TreeView/TreeView";
import { TreeViewItem } from "./components/TreeViewItem/TreeViewItem";

const titlebar = document.getElementById("titlebar");
const app = document.getElementById("app");

const Titlebar = () => {
    const [openMenu, setOpenMenu] = useState<MutableRefObject<null>>();

    const fileRef = useRef(null);
    const viewRef = useRef(null);
    const helpRef = useRef(null);
    const skipOpen = useRef(false);

    const onMenuClick = (ref: MutableRefObject<null>) => {
        if (!skipOpen.current) setOpenMenu(ref);
    };

    const onMenuHover = (ref: MutableRefObject<null>) => {
        if (openMenu === undefined) return;
        setOpenMenu(ref);
    };

    const onClick_Exit = () => {
        console.log("Exit");
        window.api.exit();
    };

    return (
        <>
            <div className="titlebar-menus">
                <MenuButton
                    ref={fileRef}
                    onMouseEnter={() => onMenuHover(fileRef)}
                    onClick={() => onMenuClick(fileRef)}
                >
                    File
                </MenuButton>
                <ControlledMenu
                    state={openMenu === fileRef ? "open" : "closed"}
                    skipOpen={skipOpen}
                    anchorRef={fileRef}
                    onClose={() => setOpenMenu(undefined)}
                >
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
                    <AcceleratedMenuItem label="Exit" ctrl hotkey="Q" onClick={onClick_Exit} />
                </ControlledMenu>
                <MenuButton
                    ref={viewRef}
                    onMouseEnter={() => onMenuHover(viewRef)}
                    onClick={() => onMenuClick(viewRef)}
                >
                    View
                </MenuButton>
                <ControlledMenu
                    state={openMenu === viewRef ? "open" : "closed"}
                    skipOpen={skipOpen}
                    anchorRef={viewRef}
                    onClose={() => setOpenMenu(undefined)}
                >
                    <MenuItem>Language</MenuItem>
                    <MenuDivider />
                    <MenuItem type="checkbox" checked={true}>
                        Show Toolbar
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem>Configure Columns...</MenuItem>
                </ControlledMenu>
                <MenuButton
                    ref={helpRef}
                    onMouseEnter={() => onMenuHover(helpRef)}
                    onClick={() => onMenuClick(helpRef)}
                >
                    Help
                </MenuButton>
                <ControlledMenu
                    state={openMenu === helpRef ? "open" : "closed"}
                    skipOpen={skipOpen}
                    anchorRef={helpRef}
                    onClose={() => setOpenMenu(undefined)}
                >
                    <MenuItem>Check for Updates...</MenuItem>
                    <MenuItem>Release Notes</MenuItem>
                    <MenuDivider />
                    <MenuItem>Visit GitHub</MenuItem>
                    <MenuItem>Report Issue</MenuItem>
                    <MenuDivider />
                    <AcceleratedMenuItem label="Show Dev Tools" ctrl shift hotkey="I" />
                    <MenuDivider />
                    <MenuItem>About</MenuItem>
                </ControlledMenu>
            </div>
            <div className="titlebar-title">Yarm</div>
            <div className="titlebar-controls">
                <MenuButton className="window-control">
                    <i className="fa-solid fa-minus"></i>
                </MenuButton>
                <MenuButton className="window-control">
                    <i className="fa-regular fa-square"></i>
                </MenuButton>
                <MenuButton className="window-control close-button" onClick={onClick_Exit}>
                    <i className="fa-solid fa-xmark"></i>
                </MenuButton>
            </div>
        </>
    );
};

const App = () => {
    const [treeData, setTreeData] = useState<TreeItem[]>([]);

    const onOpenDatClick = async () => {
            const datData = await window.api.openDatFile();
            const root: TreeItem = {
                label: datData.header ? datData.header.name : "NoHeader",
                children: datData.game.map((g, i) => {
                    return {
                        label: g.name
                    };
                })
            };
            setTreeData([root]);
    };

    // const treeData: TreeItem[] = [
    //     { label: "Testing0" },
    //     {
    //         label: "Testing1",
    //         children: [
    //             { label: "Testing1-0" },
    //             {
    //                 label: "Testing1-1",
    //                 children: [{ label: "Testing1-1-0" }, { label: "Testing1-1-1" }]
    //             },
    //             { label: "Testing1-2" },
    //             { label: "Testing1-3" }
    //         ]
    //     },
    //     { label: "Testing2" },
    //     { label: "Testing3" }
    // ];

    return (
        <>
            <button onClick={onOpenDatClick}>Open DAT</button>
            <TreeView>
                <TreeViewItem label="Testing0"></TreeViewItem>
                <TreeViewItem label="Testing1">
                    <TreeViewItem label="Testing1-0"></TreeViewItem>
                    <TreeViewItem label="Testing1-1">
                        <TreeViewItem label="Testing1-1-0"></TreeViewItem>
                        <TreeViewItem label="Testing1-1-1"></TreeViewItem>
                    </TreeViewItem>
                    <TreeViewItem label="Testing1-2"></TreeViewItem>
                    <TreeViewItem label="Testing1-3"></TreeViewItem>
                </TreeViewItem>
                <TreeViewItem label="Testing2"></TreeViewItem>
                <TreeViewItem label="Testing3"></TreeViewItem>
            </TreeView>
            <br />
            <br />
            <br />
            {/* <TreeView treeData={treeData} /> */}
        </>
    );
};

const titlebarRoot = createRoot(titlebar!);
const appRoot = createRoot(app!);

titlebarRoot.render(<Titlebar />);
appRoot.render(<App />);
