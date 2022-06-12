import { app, BrowserWindow } from "electron";

// TODO: Disable this only in development builds
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

const openWindow = (): void => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        title: "Yet Another Rom Manager",
        titleBarStyle: "hidden"
    });

    window.loadFile(`${__dirname}/index.html`);
};

app.on("ready", openWindow);
