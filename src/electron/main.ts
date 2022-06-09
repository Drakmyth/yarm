import { app, BrowserWindow } from "electron";

const openWindow = (): void => {
  const window = new BrowserWindow({
    width: 800,
    height: 600
  });

  window.setMenuBarVisibility(false);
  window.loadURL(`http://example.com`);
}

app.on(`ready`, openWindow);
