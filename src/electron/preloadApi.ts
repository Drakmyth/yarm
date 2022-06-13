export interface PreloadAPI {
    exit: () => void
}

declare global {
    interface Window {
        api: PreloadAPI
    }
}
