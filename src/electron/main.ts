import { app, BrowserWindow } from "electron";

const openWindow = (): void => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    title: `Yet Another Rom Manager`,
  });

  window.setMenuBarVisibility(false);
  window.loadFile(`${__dirname}/../website/index.html`);
}

app.on(`ready`, openWindow);
