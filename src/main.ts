import { app, BrowserWindow, ipcMain, net, shell } from "electron";
import path, { dirname } from "node:path";
import started from "electron-squirrel-startup";
import { fileURLToPath } from "node:url";
import os from "node:os";
import http from "node:http";
import fs from "node:fs";
import { GenerateName } from "../helper/name";

// recreate __filename and __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("isOnline:", net.isOnline());

if (started) {
  app.quit();
}


ipcMain.on(
  "temp",
  (event, url: string, file_extension: string, filename: string) => {
    const tempDir = os.tmpdir();
    console.log("Temp dir: ", tempDir);
    console.log("file url: ", url);
    console.log("file extension: ", file_extension);
    console.log("filename: ", filename);
    const generateName = GenerateName(file_extension);
    console.log("New name: ", generateName)
    if (url && file_extension) {
      const pathWithNewFile = `${tempDir}/${generateName}`
      const stream = fs.createWriteStream(pathWithNewFile);
      http.get(url, (response) => {
        response.pipe(stream);

        stream.on("finish", () => {
          stream.close();
          if (fs.existsSync(pathWithNewFile)) {
            shell.openPath(pathWithNewFile)
          }
        })
      });
      // if (fs.existsSync(pathWithNewFile))
      //   shell.openPath(pathWithNewFile)
    }
  },
);

const createWindow = () => {
  const isOnline = net.isOnline();

  if (isOnline) {
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: false,
        contextIsolation: true,
      },
      icon: path.join(__dirname, "assets", "favicon.png"),
    });

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
      mainWindow.loadFile(
        path.join(
          __dirname,
          "../renderer",
          MAIN_WINDOW_VITE_NAME,
          "index.html",
        ),
      );
    }

    mainWindow.webContents.openDevTools();
  } else {
    const mainWindow = new BrowserWindow();
    mainWindow.loadFile(path.join(__dirname, "failnet.html"));
  }
};

app.on("ready", createWindow);
