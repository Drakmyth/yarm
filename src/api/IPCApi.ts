import { DataFile } from "./DataFile";

export interface IPCApi {
    exit: () => void;
    openDatFile: () => Promise<DataFile>;
}

declare global {
    interface Window {
        api: IPCApi;
    }
}
