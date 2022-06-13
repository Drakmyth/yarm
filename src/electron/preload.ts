import { ipcRenderer, contextBridge } from "electron";
import { PreloadAPI } from "./preloadApi";

const api: PreloadAPI = {
    exit: () => {
        ipcRenderer.send("exit");
    }
};

contextBridge.exposeInMainWorld("api", api);
