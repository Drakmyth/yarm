import { Menu } from "electron";

const template: Array<Electron.MenuItemConstructorOptions> = [
    {
        role: "fileMenu",
        submenu: [
            { label: "New...", accelerator: "CmdOrCtrl+N" },
            { label: "Open...", accelerator: "CmdOrCtrl+O" },
            { role: "recentDocuments" },
            { role: "close" },
            { type: "separator" },
            { label: "Save", accelerator: "CmdOrCtrl+S" },
            { label: "Save As...", accelerator: "CmdOrCtrl+Shift+S" },
            { type: "separator" },
            { label: "Preferences...", accelerator: "CmdOrCtrl+I" },
            { type: "separator" },
            { role: "quit" }
        ]
    },
    {
        role: "viewMenu",
        submenu: [
            { label: "Language" },
            { type: "separator" },
            { label: "Show Toolbar", type: "checkbox" },
            { type: "separator" },
            { label: "Configure Columns..." }
        ]
    },
    {
        label: "&Help",
        submenu: [
            { label: "Check for Updates..." },
            { label: "Release Notes" },
            { type: "separator" },
            { label: "Visit GitHub" },
            { label: "Report Issue" },
            { type: "separator" },
            { role: "toggleDevTools" },
            { type: "separator" },
            { role: "about" }
        ]
    }
];

export default Menu.buildFromTemplate(template);
