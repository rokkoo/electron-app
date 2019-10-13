const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;
let infoWindow;

function createWindow() {
   mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      autoHideMenuBar: true, // hide menu
      webPreferences: {
         nodeIntegration: false, // for security require was disbled
         preload: __dirname + '/preload.js' // load requite electron in react
      }
   });

   infoWindow = new BrowserWindow({
      width: 600,
      height: 600,
      parent: mainWindow,
      show: false,
      webPreferences: {
         nodeIntegration: false,
         preload: __dirname + '/preload.js' // load requite electron in react
      }
   });

   mainWindow.loadURL(
      isDev
         ? 'http://localhost:3000'
         : `file://${path.join(__dirname, '../build/index.html')}`
   );

   infoWindow.loadURL(
      isDev
         ? 'http://localhost:3000/info'
         : `file://${path.join(__dirname, '../build/index.html')}`
   );

   // Open the DevTools.
   mainWindow.webContents.openDevTools();
   infoWindow.webContents.openDevTools();

   mainWindow.on('closed', () => (mainWindow = null));
   infoWindow.on('closed', e => {
      e.preventDefault();
      infoWindow.hide();
   });
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

ipcMain.on('info', (even, args) => {
   console.log('On toggle-infor');
   infoWindow.show();
   infoWindow.webContents.send('info', args);
   //infoWindow.isVisible() ? infoWindow.hide() : infoWindow.show();
});
