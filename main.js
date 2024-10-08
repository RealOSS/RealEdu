const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");

const isDev = process.env.NODE_ENV !== "production";

//const isWin = process.platform === "win32";
//const isGNU = process.platform === "linux";
const isMac = process.platform === "darwin";

function createMainWindow() {
	const mainWindow = new BrowserWindow({
		title: "RealEdu",
		width: 850,
		height: 600
	});
	/*
		if(isDev){
			mainWindow.webContents.openDevTools();
		}
	*/
	mainWindow.loadFile(path.join(__dirname, "./www/index.html"));
	const menu = [
		{
			label: "RealEdu Memo",
			click: createNoteWindow
		},
		{
			label: "Pomodoro",
			click: createTimerWindow
		},
		{
			label: "About",
			click: createAboutWindow
		},
		{
			label: "Quit",
			click: app.quit
		}
		
	]
	//sets the menu
	const mainMenu = Menu.buildFromTemplate(menu);
	Menu.setApplicationMenu(mainMenu);
}

function createAboutWindow() {
	const aboutWindow = new BrowserWindow({
		title: "About RealEdu",
		width: 400,
		height: 350
	});

	aboutWindow.loadFile(path.join(__dirname, "./www/about.html"));
}
function createNoteWindow() {
	const noteWindow = new BrowserWindow({
		title: "Notepad",
		width: 450,
		height: 600
	});

	noteWindow.loadFile(path.join(__dirname, "./www/memo.html"));
	//noteWindow.webContents.openDevTools();
}

function createTimerWindow() {
	const timerWindow = new BrowserWindow({
		title: "Pomodoro",
		width: 750,
		height: 500
	});

	timerWindow.loadFile(path.join(__dirname, "./www/timer.html"));
}

app.whenReady().then(() => {
	createMainWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createMainWindow();
		}
	})
});

app.on("window-all-closed", () => {
	if (!isMac) {
		app.quit()
	}
})

