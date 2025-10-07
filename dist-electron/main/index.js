"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const ipcHandlers_1 = require("./ipcHandlers");
const fileWatcher_1 = require("./fileWatcher");
const autoUpdater_1 = require("./autoUpdater");
const menu_1 = require("./menu");
let mainWindow = null;
const isDev = process.env.NODE_ENV === 'development' || !electron_1.app.isPackaged;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1000,
        minHeight: 600,
        show: false,
        backgroundColor: '#0F1419',
        webPreferences: {
            preload: path.join(__dirname, '../preload/index.js'),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false,
        },
    });
    // Load the app
    if (isDev) {
        mainWindow.loadURL('http://localhost:8082');
        // Open DevTools in development
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
    }
    // Show window when ready
    mainWindow.on('ready-to-show', () => {
        mainWindow?.show();
    });
    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    // Setup IPC handlers
    (0, ipcHandlers_1.setupIpcHandlers)(mainWindow);
    // Setup file watcher
    (0, fileWatcher_1.setupFileWatcher)(mainWindow);
    // Setup auto-updater
    (0, autoUpdater_1.setupAutoUpdater)(mainWindow);
    // Create application menu
    (0, menu_1.createApplicationMenu)(mainWindow);
    return mainWindow;
}
// App lifecycle
electron_1.app.whenReady().then(() => {
    createWindow();
    // macOS specific: Re-create window when dock icon is clicked
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
// Quit when all windows are closed (except on macOS)
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// Security: Prevent navigation to external URLs
electron_1.app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl);
        // Allow navigation only to localhost in dev or file protocol in production
        if (isDev) {
            if (parsedUrl.origin !== 'http://localhost:8082') {
                event.preventDefault();
            }
        }
        else {
            if (parsedUrl.protocol !== 'file:') {
                event.preventDefault();
            }
        }
    });
});
