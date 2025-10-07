"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicationMenu = createApplicationMenu;
const electron_1 = require("electron");
/**
 * Create native application menu
 */
function createApplicationMenu(mainWindow) {
    const isMac = process.platform === 'darwin';
    const template = [
        // macOS app menu
        ...(isMac
            ? [
                {
                    label: electron_1.app.name,
                    submenu: [
                        {
                            label: 'About PLR Organizer Pro',
                            click: () => {
                                mainWindow.webContents.send('menu:about');
                            },
                        },
                        { type: 'separator' },
                        { role: 'services' },
                        { type: 'separator' },
                        { role: 'hide' },
                        { role: 'hideOthers' },
                        { role: 'unhide' },
                        { type: 'separator' },
                        { role: 'quit' },
                    ],
                },
            ]
            : []),
        // File menu
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open Folder',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        mainWindow.webContents.send('menu:openFolder');
                    },
                },
                { type: 'separator' },
                {
                    label: 'Settings',
                    accelerator: 'CmdOrCtrl+,',
                    click: () => {
                        mainWindow.webContents.send('menu:settings');
                    },
                },
                { type: 'separator' },
                isMac ? { role: 'close' } : { role: 'quit' },
            ],
        },
        // Edit menu
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                ...(isMac
                    ? [
                        { role: 'pasteAndMatchStyle' },
                        { role: 'delete' },
                        { role: 'selectAll' },
                        { type: 'separator' },
                        {
                            label: 'Speech',
                            submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }],
                        },
                    ]
                    : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
            ],
        },
        // View menu
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' },
            ],
        },
        // Window menu
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'zoom' },
                ...(isMac
                    ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }]
                    : [{ role: 'close' }]),
            ],
        },
        // Help menu
        {
            role: 'help',
            submenu: [
                {
                    label: 'Documentation',
                    click: async () => {
                        await electron_1.shell.openExternal('https://plrorganizer.com/docs');
                    },
                },
                {
                    label: 'Report Issue',
                    click: async () => {
                        await electron_1.shell.openExternal('https://github.com/smarthome9953/plr-organizer-pro-v1/issues');
                    },
                },
                { type: 'separator' },
                {
                    label: 'About PLR Organizer Pro',
                    click: () => {
                        mainWindow.webContents.send('menu:about');
                    },
                },
            ],
        },
    ];
    const menu = electron_1.Menu.buildFromTemplate(template);
    electron_1.Menu.setApplicationMenu(menu);
}
