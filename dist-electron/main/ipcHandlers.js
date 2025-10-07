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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupIpcHandlers = setupIpcHandlers;
const electron_1 = require("electron");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
let db = null;
/**
 * Initialize SQLite database for local PLR file storage
 */
function initializeDatabase() {
    const userDataPath = electron_1.app.getPath('userData');
    const dbPath = path.join(userDataPath, 'plr-organizer.db');
    db = new better_sqlite3_1.default(dbPath);
    // Create plr_files table matching Supabase schema
    db.exec(`
    CREATE TABLE IF NOT EXISTS plr_files (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_path TEXT NOT NULL,
      file_type TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      license_type TEXT,
      confidence_score REAL,
      tags TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    
    CREATE INDEX IF NOT EXISTS idx_user_id ON plr_files(user_id);
    CREATE INDEX IF NOT EXISTS idx_file_path ON plr_files(file_path);
  `);
    console.log('Database initialized at:', dbPath);
    return db;
}
/**
 * Setup all IPC handlers
 */
function setupIpcHandlers(mainWindow) {
    // Initialize database
    initializeDatabase();
    // File System Operations
    /**
     * Open folder picker dialog
     */
    electron_1.ipcMain.handle('dialog:openFolder', async () => {
        const result = await electron_1.dialog.showOpenDialog(mainWindow, {
            properties: ['openDirectory', 'createDirectory'],
            title: 'Select Folder to Scan for PLR Content',
        });
        if (result.canceled || result.filePaths.length === 0) {
            return null;
        }
        return result.filePaths[0];
    });
    /**
     * Read file contents
     */
    electron_1.ipcMain.handle('file:read', async (event, filePath) => {
        try {
            const content = await fs.promises.readFile(filePath, 'utf-8');
            return { success: true, content };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to read file'
            };
        }
    });
    /**
     * Get file statistics
     */
    electron_1.ipcMain.handle('file:stat', async (event, filePath) => {
        try {
            const stats = await fs.promises.stat(filePath);
            return {
                success: true,
                stats: {
                    size: stats.size,
                    isFile: stats.isFile(),
                    isDirectory: stats.isDirectory(),
                    modified: stats.mtime,
                },
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to get file stats',
            };
        }
    });
    // Local Database Operations
    /**
     * Sync PLR files to local SQLite database
     */
    electron_1.ipcMain.handle('db:syncLocal', async (event, files) => {
        if (!db) {
            return { success: false, error: 'Database not initialized' };
        }
        try {
            const insert = db.prepare(`
        INSERT OR REPLACE INTO plr_files 
        (id, user_id, file_name, file_path, file_type, file_size, license_type, confidence_score, tags, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
            const insertMany = db.transaction((files) => {
                for (const file of files) {
                    insert.run(file.id, file.user_id, file.file_name, file.file_path, file.file_type, file.file_size, file.license_type || null, file.confidence_score || null, file.tags ? JSON.stringify(file.tags) : null, new Date(file.created_at).toISOString(), new Date(file.updated_at).toISOString());
                }
            });
            insertMany(files);
            return { success: true, count: files.length };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to sync to local database',
            };
        }
    });
    /**
     * Retrieve local PLR files for a user
     */
    electron_1.ipcMain.handle('db:getLocal', async (event, userId) => {
        if (!db) {
            return { success: false, error: 'Database not initialized' };
        }
        try {
            const stmt = db.prepare('SELECT * FROM plr_files WHERE user_id = ?');
            const rows = stmt.all(userId);
            const files = rows.map(row => ({
                id: row.id,
                user_id: row.user_id,
                file_name: row.file_name,
                file_path: row.file_path,
                file_type: row.file_type,
                file_size: row.file_size,
                license_type: row.license_type,
                confidence_score: row.confidence_score,
                tags: row.tags ? JSON.parse(row.tags) : undefined,
                created_at: new Date(row.created_at),
                updated_at: new Date(row.updated_at),
            }));
            return { success: true, files };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to retrieve local files',
            };
        }
    });
    /**
     * Delete local PLR file record
     */
    electron_1.ipcMain.handle('db:deleteLocal', async (event, fileId) => {
        if (!db) {
            return { success: false, error: 'Database not initialized' };
        }
        try {
            const stmt = db.prepare('DELETE FROM plr_files WHERE id = ?');
            const result = stmt.run(fileId);
            return { success: true, deleted: result.changes > 0 };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to delete file record',
            };
        }
    });
    // Desktop Features
    /**
     * Show native OS notification
     */
    electron_1.ipcMain.handle('notification:show', async (event, title, body) => {
        try {
            const notification = new electron_1.Notification({
                title,
                body,
                icon: path.join(__dirname, '../../build/icon.png'),
            });
            notification.show();
            return { success: true };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to show notification',
            };
        }
    });
    // App Management
    /**
     * Get app version
     */
    electron_1.ipcMain.handle('app:getVersion', async () => {
        return electron_1.app.getVersion();
    });
    /**
     * Restart the application
     */
    electron_1.ipcMain.handle('app:restart', async () => {
        electron_1.app.relaunch();
        electron_1.app.quit();
    });
    /**
     * Get app path
     */
    electron_1.ipcMain.handle('app:getPath', async (event, name) => {
        return electron_1.app.getPath(name);
    });
}
// Cleanup on app quit
electron_1.app.on('will-quit', () => {
    if (db) {
        db.close();
    }
});
