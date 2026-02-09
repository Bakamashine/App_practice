// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  sendTemp: (url: string, file_extension: string, filename: string) => 
    {
        console.log("ContextBridge have sent")
        ipcRenderer.send("temp", url, file_extension, filename)
    }
});