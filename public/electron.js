const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

const { up, addUser } = require('./sqlite');

let mainWindow;

async function createWindow() {
   await up();

   mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      autoHideMenuBar: true, // hide menu
      webPreferences: {
         nodeIntegration: false, // for security require was disbled
         preload: __dirname + '/preload.js' // load requite electron in react
      }
   });

   const startUrl = isDev
      ? 'http://localhost:3000'
      : url.format({
           pathname: path.join(__dirname, './index.html'),
           protocol: 'file:',
           slashes: true
        });

   mainWindow.loadURL(startUrl);

   // Open the DevTools.
   mainWindow.webContents.openDevTools();

   mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
});

app.on('activate', () => {
   if (mainWindow === null) {
      createWindow();
   }
});

ipcMain.on('info', async (even, args) => {
   console.log('On info');
   const data = addUser('dryad');
   mainWindow.webContents.send('loadData', args);
});
