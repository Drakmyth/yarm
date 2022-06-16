import { ipcRenderer, contextBridge } from "electron";
import { IPCApi } from "../api/IPCApi";

const api: IPCApi = {
    exit: () => ipcRenderer.send("exit"),
    openDatFile: () => ipcRenderer.invoke("openDatFile")
};

contextBridge.exposeInMainWorld("api", api);
