import { app, BrowserWindow } from "electron";

let mainWindow: BrowserWindow;

let createWindows = (): void => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    show: false
  });

  mainWindow.loadFile(`./index.html`);
  mainWindow.on(`ready-to-show`, () => mainWindow.show());
};

app.on(`ready`, createWindows);
