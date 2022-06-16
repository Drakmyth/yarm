import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";
import { parseDat } from "./DatParser";

// Only disable security warning in development
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = `${process.env.NODE_ENV !== "production"}`;

interface HotKeyDefinition {
    ctrl: boolean;
    shift: boolean;
    alt: boolean;
    handler: (win: BrowserWindow) => void
}

const hotkeys: Record<string, HotKeyDefinition[]> = {
    "N": [
        {
            ctrl: true,
            shift: false,
            alt: false,
            handler: (win: BrowserWindow) => console.log("New...")
        }
    ],
    "O": [
        {
            ctrl: true,
            shift: false,
            alt: false,
            handler: (win: BrowserWindow) => console.log("Open...")
        }
    ],
    "W": [
        {
            ctrl: true,
            shift: false,
            alt: false,
            handler: (win: BrowserWindow) => console.log("Close")
        }
    ],
    "S": [
        {
            ctrl: true,
            shift: false,
            alt: false,
            handler: (win: BrowserWindow) => console.log("Save")
        },
        {
            ctrl: true,
            shift: true,
            alt: false,
            handler: (win: BrowserWindow) => console.log("Save As...")
        }
    ],
    "Q": [
        {
            ctrl: true,
            shift: false,
            alt: false,
            handler: (win: BrowserWindow) => win.close()
        }
    ]
};

const openWindow = (): void => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        title: "Yet Another Rom Manager",
        titleBarStyle: "hidden",
        webPreferences: {
            sandbox: true,
            preload: path.resolve(__dirname, "preload.bundle.js")
        }
    });

    window.loadFile(path.join(__dirname, "index.html"));

    window.webContents.on("before-input-event", (event, input) => {
        const hkDefs = hotkeys[input.key.toUpperCase()] || [];
        for (let hk of hkDefs) {
            if (
                hk.ctrl === input.control &&
                hk.shift === input.shift &&
                hk.alt === input.alt
            ) {
                hk.handler(window);
                event.preventDefault();
            }
        }
    });

    ipcMain.on("exit", () => {
        window.close();
    });

    ipcMain.handle("openDatFile", async () => {
        const dialogReturn = await dialog.showOpenDialog(window)
        const datData = await parseDat(dialogReturn.filePaths[0]);
        return datData;
    })

    window.webContents.openDevTools();
};

app.on("ready", openWindow);
