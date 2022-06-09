import { app, BrowserWindow } from "electron";

const openWindow = (): void => {
  const window = new BrowserWindow({
    width: 800,
    height: 600
  });

  window.setMenuBarVisibility(false);
  window.loadFile(`${__dirname}/../window/index.html`);
}

app.on(`ready`, openWindow);
