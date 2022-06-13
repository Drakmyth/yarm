import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

// Only disable security warning in development
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = `${process.env.NODE_ENV !== "production"}`;

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

    ipcMain.on("exit", () => {
        window.close();
    })

    window.webContents.openDevTools();
};

app.on("ready", openWindow);
