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
exports.setupFileWatcher = setupFileWatcher;
exports.closeAllWatchers = closeAllWatchers;
const electron_1 = require("electron");
const chokidar = __importStar(require("chokidar"));
// Store active watchers
const watchers = new Map();
/**
 * Setup file watcher functionality
 */
function setupFileWatcher(mainWindow) {
    /**
     * Start watching a folder
     */
    electron_1.ipcMain.handle('folder:watch', async (event, folderPath) => {
        try {
            // Check if already watching this path
            if (watchers.has(folderPath)) {
                return { success: true, message: 'Already watching this folder' };
            }
            // Create new watcher
            const watcher = chokidar.watch(folderPath, {
                persistent: true,
                ignoreInitial: true,
                ignored: /(^|[\/\\])\../, // Ignore dotfiles
                awaitWriteFinish: {
                    stabilityThreshold: 2000,
                    pollInterval: 100,
                },
            });
            // Handle file added
            watcher.on('add', (path) => {
                const event = {
                    type: 'add',
                    path,
                    timestamp: new Date(),
                };
                mainWindow.webContents.send('file:event', event);
            });
            // Handle file changed
            watcher.on('change', (path) => {
                const event = {
                    type: 'change',
                    path,
                    timestamp: new Date(),
                };
                mainWindow.webContents.send('file:event', event);
            });
            // Handle file deleted
            watcher.on('unlink', (path) => {
                const event = {
                    type: 'delete',
                    path,
                    timestamp: new Date(),
                };
                mainWindow.webContents.send('file:event', event);
            });
            // Handle errors (fixed type compatibility)
            watcher.on('error', (err) => {
                const error = err instanceof Error ? err : new Error('Unknown error');
                const event = {
                    type: 'error',
                    path: folderPath,
                    timestamp: new Date(),
                };
                mainWindow.webContents.send('file:event', event);
                console.error('File watcher error:', error);
            });
            // Store watcher
            watchers.set(folderPath, watcher);
            return { success: true, message: 'Folder watching started' };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to start watching folder',
            };
        }
    });
    /**
     * Stop watching a folder
     */
    electron_1.ipcMain.handle('folder:unwatch', async (event, folderPath) => {
        try {
            const watcher = watchers.get(folderPath);
            if (!watcher) {
                return { success: false, error: 'No watcher found for this folder' };
            }
            await watcher.close();
            watchers.delete(folderPath);
            return { success: true, message: 'Folder watching stopped' };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to stop watching folder',
            };
        }
    });
}
/**
 * Cleanup all watchers on app quit
 */
async function closeAllWatchers() {
    const closePromises = [];
    for (const [path, watcher] of watchers.entries()) {
        closePromises.push(watcher.close());
    }
    await Promise.all(closePromises);
    watchers.clear();
}
