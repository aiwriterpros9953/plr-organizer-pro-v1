"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAutoUpdater = setupAutoUpdater;
const electron_1 = require("electron");
const electron_updater_1 = require("electron-updater");
/**
 * Setup auto-updater functionality
 */
function setupAutoUpdater(mainWindow) {
    // Configure auto-updater
    electron_updater_1.autoUpdater.autoDownload = false;
    electron_updater_1.autoUpdater.autoInstallOnAppQuit = true;
    // Check for updates on app launch (after 3 seconds)
    setTimeout(() => {
        electron_updater_1.autoUpdater.checkForUpdates().catch((error) => {
            console.error('Auto-update check failed:', error);
        });
    }, 3000);
    // Event: Checking for update
    electron_updater_1.autoUpdater.on('checking-for-update', () => {
        mainWindow.webContents.send('update:status', {
            type: 'checking',
            message: 'Checking for updates...',
        });
        console.log('Checking for updates...');
    });
    // Event: Update available
    electron_updater_1.autoUpdater.on('update-available', (info) => {
        const updateInfo = {
            version: info.version,
            releaseDate: info.releaseDate,
            releaseNotes: info.releaseNotes,
        };
        mainWindow.webContents.send('update:status', {
            type: 'available',
            message: `Update ${info.version} is available`,
            info: updateInfo,
        });
        console.log('Update available:', info.version);
    });
    // Event: Update not available
    electron_updater_1.autoUpdater.on('update-not-available', (info) => {
        mainWindow.webContents.send('update:status', {
            type: 'not-available',
            message: 'You are running the latest version',
        });
        console.log('No updates available');
    });
    // Event: Download progress
    electron_updater_1.autoUpdater.on('download-progress', (progressObj) => {
        const progress = {
            percent: progressObj.percent,
            transferred: progressObj.transferred,
            total: progressObj.total,
        };
        mainWindow.webContents.send('update:status', {
            type: 'downloading',
            message: `Downloading update: ${Math.round(progressObj.percent)}%`,
            progress,
        });
        console.log(`Download progress: ${Math.round(progressObj.percent)}%`);
    });
    // Event: Update downloaded
    electron_updater_1.autoUpdater.on('update-downloaded', (info) => {
        const updateInfo = {
            version: info.version,
            releaseDate: info.releaseDate,
            releaseNotes: info.releaseNotes,
        };
        mainWindow.webContents.send('update:status', {
            type: 'downloaded',
            message: 'Update downloaded. Restart to install',
            info: updateInfo,
        });
        console.log('Update downloaded');
    });
    // Event: Error
    electron_updater_1.autoUpdater.on('error', (error) => {
        mainWindow.webContents.send('update:status', {
            type: 'error',
            message: 'Update error occurred',
            error: error.message,
        });
        console.error('Auto-updater error:', error);
    });
    // IPC Handlers
    /**
     * Manual check for updates
     */
    electron_1.ipcMain.handle('update:check', async () => {
        try {
            const result = await electron_updater_1.autoUpdater.checkForUpdates();
            return { success: true, updateInfo: result?.updateInfo };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to check for updates',
            };
        }
    });
    /**
     * Download update
     */
    electron_1.ipcMain.handle('update:download', async () => {
        try {
            await electron_updater_1.autoUpdater.downloadUpdate();
            return { success: true };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to download update',
            };
        }
    });
    /**
     * Install update and restart
     */
    electron_1.ipcMain.handle('update:install', async () => {
        try {
            electron_updater_1.autoUpdater.quitAndInstall(false, true);
            return { success: true };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to install update',
            };
        }
    });
}
