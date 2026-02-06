const { app, BrowserWindow, ipcMain, net } = require("electron");
const path = require("node:path");
const started = require("electron-squirrel-startup");
const os = require("os");

console.log("isOnline:", net.isOnline());

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  const isOnline = net.isOnline();

  if (isOnline) {
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: true,
        contextIsolation: false,
      },
      icon: path.join(__dirname, "assets", "favicon.png"),
    });

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
      mainWindow.loadFile(
        path.join(__dirname, "../renderer", MAIN_WINDOW_VITE_NAME, "index.html")
      );
    }

    mainWindow.webContents.openDevTools();
  } else {
    const mainWindow = new BrowserWindow();
    mainWindow.loadFile(path.join(__dirname, "failnet.html"));
  }
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("temp", () => {
  const temp = os.tmpdir();
  console.log("Temp:", temp);
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
