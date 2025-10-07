"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
/**
 * Preload script - Secure bridge between main and renderer processes
 * Uses contextBridge to expose a limited, secure API to the renderer
 */
// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    // ============================================
    // File System Operations
    // ============================================
    /**
     * Open native folder picker dialog
     */
    selectFolder: () => {
        return electron_1.ipcRenderer.invoke('dialog:openFolder');
    },
    /**
     * Read file contents
     */
    readFile: (path) => {
        return electron_1.ipcRenderer.invoke('file:read', path);
    },
    /**
     * Get file statistics
     */
    getFileStat: (path) => {
        return electron_1.ipcRenderer.invoke('file:stat', path);
    },
    // ============================================
    // Folder Watching
    // ============================================
    /**
     * Start watching a folder for changes
     */
    watchFolder: (path) => {
        return electron_1.ipcRenderer.invoke('folder:watch', path);
    },
    /**
     * Stop watching a folder
     */
    unwatchFolder: (path) => {
        return electron_1.ipcRenderer.invoke('folder:unwatch', path);
    },
    /**
     * Listen for file added events
     */
    onFileAdded: (callback) => {
        electron_1.ipcRenderer.on('file:event', (_, event) => {
            if (event.type === 'add') {
                callback(event);
            }
        });
    },
    /**
     * Listen for file changed events
     */
    onFileChanged: (callback) => {
        electron_1.ipcRenderer.on('file:event', (_, event) => {
            if (event.type === 'change') {
                callback(event);
            }
        });
    },
    /**
     * Listen for file deleted events
     */
    onFileDeleted: (callback) => {
        electron_1.ipcRenderer.on('file:event', (_, event) => {
            if (event.type === 'delete') {
                callback(event);
            }
        });
    },
    /**
     * Listen for file watcher errors
     */
    onFileError: (callback) => {
        electron_1.ipcRenderer.on('file:event', (_, event) => {
            if (event.type === 'error') {
                callback(event);
            }
        });
    },
    // ============================================
    // Desktop Features
    // ============================================
    /**
     * Show native OS notification
     */
    showNotification: (title, body) => {
        return electron_1.ipcRenderer.invoke('notification:show', title, body);
    },
    // ============================================
    // App Management
    // ============================================
    /**
     * Get application version
     */
    getVersion: () => {
        return electron_1.ipcRenderer.invoke('app:getVersion');
    },
    /**
     * Restart the application
     */
    restartApp: () => {
        return electron_1.ipcRenderer.invoke('app:restart');
    },
    /**
     * Get app data path
     */
    getAppPath: (name) => {
        return electron_1.ipcRenderer.invoke('app:getPath', name);
    },
    // ============================================
    // Local Database (SQLite)
    // ============================================
    /**
     * Sync PLR files to local database
     */
    syncToLocal: (files) => {
        return electron_1.ipcRenderer.invoke('db:syncLocal', files);
    },
    /**
     * Get local PLR files for a user
     */
    getLocalData: (userId) => {
        return electron_1.ipcRenderer.invoke('db:getLocal', userId);
    },
    /**
     * Delete local PLR file record
     */
    deleteLocalFile: (id) => {
        return electron_1.ipcRenderer.invoke('db:deleteLocal', id);
    },
    // ============================================
    // Auto-Updates
    // ============================================
    /**
     * Check for application updates
     */
    checkForUpdates: () => {
        return electron_1.ipcRenderer.invoke('update:check');
    },
    /**
     * Download available update
     */
    downloadUpdate: () => {
        return electron_1.ipcRenderer.invoke('update:download');
    },
    /**
     * Install downloaded update and restart
     */
    installUpdate: () => {
        return electron_1.ipcRenderer.invoke('update:install');
    },
    /**
     * Listen for update checking event
     */
    onUpdateChecking: (callback) => {
        electron_1.ipcRenderer.on('update:status', (_, data) => {
            if (data.type === 'checking') {
                callback();
            }
        });
    },
    /**
     * Listen for update available event
     */
    onUpdateAvailable: (callback) => {
        electron_1.ipcRenderer.on('update:status', (_, data) => {
            if (data.type === 'available' && data.info) {
                callback(data.info);
            }
        });
    },
    /**
     * Listen for update not available event
     */
    onUpdateNotAvailable: (callback) => {
        electron_1.ipcRenderer.on('update:status', (_, data) => {
            if (data.type === 'not-available') {
                callback();
            }
        });
    },
    /**
     * Listen for update download progress
     */
    onUpdateProgress: (callback) => {
        electron_1.ipcRenderer.on('update:status', (_, data) => {
            if (data.type === 'downloading' && data.progress) {
                callback(data.progress);
            }
        });
    },
    /**
     * Listen for update downloaded event
     */
    onUpdateDownloaded: (callback) => {
        electron_1.ipcRenderer.on('update:status', (_, data) => {
            if (data.type === 'downloaded' && data.info) {
                callback(data.info);
            }
        });
    },
    /**
     * Listen for update error event
     */
    onUpdateError: (callback) => {
        electron_1.ipcRenderer.on('update:status', (_, data) => {
            if (data.type === 'error' && data.error) {
                callback(data.error);
            }
        });
    },
    // ============================================
    // Menu Events
    // ============================================
    /**
     * Listen for Open Folder menu event
     */
    onMenuOpenFolder: (callback) => {
        electron_1.ipcRenderer.on('menu:openFolder', callback);
    },
    /**
     * Listen for Settings menu event
     */
    onMenuSettings: (callback) => {
        electron_1.ipcRenderer.on('menu:settings', callback);
    },
    /**
     * Listen for About menu event
     */
    onMenuAbout: (callback) => {
        electron_1.ipcRenderer.on('menu:about', callback);
    },
});
