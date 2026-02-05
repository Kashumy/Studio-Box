if(typeof updateSampledWaves == "function"){ } else { var updateSampledWaves = function() {} }
if (window.filesMap==undefined) {
	window.filesMap = []
}
const loadingScreen = document.createElement("div");
loadingScreen.style.position = "fixed";
loadingScreen.style.inset = "0";
loadingScreen.style.background = "#222";
loadingScreen.style.color = "white"; 
loadingScreen.style.display = "flex";
loadingScreen.style.flexDirection = "column";
loadingScreen.style.justifyContent = "center";
loadingScreen.style.alignItems = "center";
loadingScreen.style.zIndex = "9999";
loadingScreen.style.transition = "opacity 0.6s ease-in-out";

const loadingText = document.createElement("div");
loadingText.style.fontSize = "13px";
loadingText.style.marginBottom = "6px";
loadingText.style.width = "200px";
loadingText.style.textAlign = "left";
loadingText.style.whiteSpace = "nowrap";
loadingText.style.overflow = "hidden";
loadingText.style.textOverflow = "ellipsis";
loadingText.innerText = "Loading Editor...";


const progressBar = document.createElement("div");
progressBar.style.width = "200px";
progressBar.style.height = "5px";
progressBar.style.background = "#444";
progressBar.style.borderRadius = "1px";
progressBar.style.overflow = "hidden";

const progressFill = document.createElement("div");
progressFill.style.height = "100%";
progressFill.style.width = "0%";
progressFill.style.background = "limegreen";
progressFill.style.transition = "width 0.3s ease";

progressBar.appendChild(progressFill);
loadingScreen.appendChild(loadingText);
loadingScreen.appendChild(progressBar);
document.body.appendChild(loadingScreen);
	    
	    
let topZ = 1000;

function POPUP(x, y, title, content, framecolor = "#000080") {
	const win = document.createElement("div");
	Object.assign(win.style, {
		position: "absolute",
		left: x + "px",
		top: y + "px",
		width: "300px",
		height: "150px",
		border: `2px solid ${framecolor}`,
		background: "#e0e0e0",
		resize: "both",
		overflow: "hidden",
		boxShadow: "5px 5px 10px rgba(0,0,0,0.5)",
		minWidth: "200px",
		minHeight: "100px",
		zIndex: ++topZ,
		fontWeight: "200",
		fontFamily: "sans-serif"
	});

	const titlebar = document.createElement("div");
	Object.assign(titlebar.style, {
		background: framecolor,
		color: "#fff",
		padding: "2px 5px",
		cursor: "grab",
		display: "flex",
		fontWeight: "200",
		fontFamily: "sans-serif",
		justifyContent: "space-between",
		alignItems: "center",
		userSelect: "none"
	});

	const titleText = document.createElement("span");
	titleText.textContent = title;

	const buttons = document.createElement("div");
	const closeBtn = document.createElement("button");
	closeBtn.type = "button";
	closeBtn.className = "no-drag";
	closeBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="white"><line x1="4" y1="4" x2="20" y2="20" stroke="white" stroke-width="2"/><line x1="20" y1="4" x2="4" y2="20" stroke="white" stroke-width="2"/></svg>`;
	Object.assign(closeBtn.style, {
		background: "red",
		border: "none",
		cursor: "pointer",
		width: "24px",
		height: "24px",
		padding: "0",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	});
	closeBtn.addEventListener("mousedown", e => e.stopPropagation());
	closeBtn.addEventListener("touchstart", e => { e.stopPropagation(); }, { passive: false });
	closeBtn.addEventListener("click", () => win.remove());

	buttons.appendChild(closeBtn);
	titlebar.appendChild(titleText);
	titlebar.appendChild(buttons);

	const contentDiv = document.createElement("div");
	Object.assign(contentDiv.style, {
		padding: "10px",
		height: "calc(100% - 26px)",
		overflow: "auto"
	});
	contentDiv.innerHTML = content;

	win.appendChild(titlebar);
	win.appendChild(contentDiv);
	document.body.appendChild(win);

	let isDragging = false, offsetX = 0, offsetY = 0;

	function startDrag(e) {
		const target = e.target;
		if (target && target.closest && target.closest('.no-drag')) return;
		isDragging = true;
		const evt = e.touches ? e.touches[0] : e;
		offsetX = evt.clientX - win.offsetLeft;
		offsetY = evt.clientY - win.offsetTop;
		titlebar.style.cursor = "grabbing";
		document.body.style.overflow = "hidden";
		e.preventDefault();
	}

	function drag(e) {
		if (!isDragging) return;
		const evt = e.touches ? e.touches[0] : e;
		let newX = evt.clientX - offsetX;
		let newY = evt.clientY - offsetY;
		newX = Math.max(0, Math.min(window.innerWidth - win.offsetWidth, newX));
		newY = Math.max(0, Math.min(document.body.scrollHeight - win.offsetHeight, newY));
		win.style.left = newX + "px";
		win.style.top = newY + "px";
	}

	function endDrag() {
		isDragging = false;
		titlebar.style.cursor = "grab";
		document.body.style.overflow = "";
	}

	titlebar.addEventListener("mousedown", startDrag);
	document.addEventListener("mousemove", drag);
	document.addEventListener("mouseup", endDrag);
	titlebar.addEventListener("touchstart", startDrag, { passive: false });
	document.addEventListener("touchmove", drag, { passive: false });
	document.addEventListener("touchend", endDrag);
	win.addEventListener("mousedown", () => win.style.zIndex = ++topZ);
	win.addEventListener("touchstart", () => win.style.zIndex = ++topZ);
}

let runned=0
let OFFLINE=1 
let pressPianoKey=function (){}
let reloadsite=function (){}
function readSaved(inp) {
  return inp;
}

let allfilesloaded = 0;
function saveBuffer(id,name,buffer,extradetune1,expression1,rootnote){
 const transaction=db.transaction(["files"],"readwrite");
 const store=transaction.objectStore("files");
 const obj = { id, name, buffer, expression: expression1 };
if(extradetune1 != null) obj.extradetune = extradetune1;
if(rootnote != null) obj.rootNote = rootnote;
store.put(obj);
 return new Promise(res=>transaction.oncomplete=()=>res());
}
function deleteFile(id) {
 const transaction = db.transaction(["files"], "readwrite");
 const store = transaction.objectStore("files");
 store.delete(id);
}
function formatSize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024;
        i++;
    }
    return bytes.toFixed(2) + ' ' + units[i];
}

let Config2 = {};
Config2.keys = [ 
  { name: "C", isWhiteKey: true, basePitch: 0 },
  { name: "C♯", isWhiteKey: false, basePitch: 1 },
  { name: "D", isWhiteKey: true, basePitch: 2 },
  { name: "D♯", isWhiteKey: false, basePitch: 3 },
  { name: "E", isWhiteKey: true, basePitch: 4 },
  { name: "F", isWhiteKey: true, basePitch: 5 },
  { name: "F♯", isWhiteKey: false, basePitch: 6 },
  { name: "G", isWhiteKey: true, basePitch: 7 },
  { name: "G♯", isWhiteKey: false, basePitch: 8 },
  { name: "A", isWhiteKey: true, basePitch: 9 },
  { name: "A♯", isWhiteKey: false, basePitch: 10 },
  { name: "B", isWhiteKey: true, basePitch: 11 },
];
Config2.pitchesPerOctave = 12;
function _noteNameFromPitchNumber(n) {
  n = Math.floor(n);
  const octave = Math.floor(n / Config2.pitchesPerOctave) - 1;
  const index = ((n % Config2.pitchesPerOctave) + Config2.pitchesPerOctave) % Config2.pitchesPerOctave;
  const key = Config2.keys[index];
  if (!key) return "?";

  return key.name + octave;
}
async function audioFileToBuffer(file) {
  const arrayBuffer = await file.arrayBuffer();
  const audioCtx = new AudioContext({ sampleRate: 44100 });
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  const channelData = audioBuffer.getChannelData(0);
  return Array.from(channelData);
}
function blobToBase6422(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64data = reader.result.split(',')[1];
      resolve(base64data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const scripts = [
    "./StudioSamplesVol1.js",
    "./StudioSamplesVol2.js",
    "./StudioSamplesVol3.js",
    "./StudioSamplesVol4.js",
    "./MoreWaves.js",
    "./samples.js",
    "./samples2.js",
    "./samples3.js",
    "./drumsamples.js",
    "./wario_samples.js",
    "./kirby_samples.js",
    "./nintaribox_samples.js",
    "./mario_paintbox_samples.js"
];

function loadScriptsSequentially() {
    let promise = Promise.resolve();
    scripts.forEach(src => {
        promise = promise.then(() => new Promise(resolve => {
            const script = document.createElement('script');
            script.src = src;
            script.async = false; 
            script.onload = () => resolve();
            script.onerror = () => resolve();
            document.head.appendChild(script);
        }));
    });
    return promise;
}
let skipsamplesLoading=0
loadingScreen.addEventListener("click",()=>{
	loadingText.innerText = "Skipped Loading Samples" 
	skipsamplesLoading=true
	RUNBEEPBOX()
	setTimeout(() => {
		setTimeout(() => { loadingText.innerText = "Some Samples Is Still Not Loaded" }, 10);
		
	loadingScreen.style.opacity = "0";
	setTimeout(() => {
		loadingScreen.style.display = "none";
	}, 600);
}, 500);
})
function loadFiles() {
	if(skipsamplesLoading)return
	const transaction = db.transaction(["files"], "readonly");
	const store = transaction.objectStore("files"); 
	const countRequest = store.count();
	countRequest.onsuccess = function() {
		if(skipsamplesLoading)return
		const total = countRequest.result;
		let loaded = 0;
		const request = store.openCursor();
		document.querySelector("body").style.display="flex"
		request.onsuccess = async function(event) {
			if(skipsamplesLoading)return
			const cursor = event.target.result;
			if (cursor) {
				const file = cursor.value;
				window.filesMap[cursor.key] = {
					name: file.name,
			 	buffer: file.buffer, 
		  			...(file.rootNote
          ? {rootNote: file.rootNote}
          : {extradetune: file.extradetune ?? -12}),
					expression: file.expression || 2.0,
				};
				loaded++;
				loadingText.innerText = `${file.name} `;
				const percent = Math.round((loaded / total) * 100);
				progressFill.style.width = percent + "%";
				cursor.continue();
			} else {
				allfilesloaded = 1;
				if(window.location.hash){
				await loadScriptsSequentially();
				}
if (document.readyState !== "loading") {
	setTimeout(() => {
		loadingScreen.style.opacity = "0";
		setTimeout(() => {
			loadingScreen.style.display = "none";
		}, 600);
	}, 500);
}
				if(loadedBB==0){
					if (document.readyState === "loading") {
						setTimeout(() => { loadingText.innerText = "Loading Page" }, 50);
     document.addEventListener('DOMContentLoaded', () => {
      	setTimeout(() => { loadingText.innerText = "All samples loaded successfully" }, 50);
      	setTimeout(() => {
					loadingScreen.style.opacity = "0";
					setTimeout(() => {
						loadingScreen.style.display = "none";
					}, 600);
				}, 500);
    	  RUNBEEPBOX()
      });
    }else{
    setTimeout(() => { loadingText.innerText = "All samples loaded successfully" }, 50);
				 RUNBEEPBOX()
    }
				} else if(loadedBB==1){
 				updateSampledWaves()
				}
			}
		};
	};
}
var updateThemes = function() {}
function POPUP(x, y, title, content, framecolor = "#000080") {
	const win = document.createElement("div");
	Object.assign(win.style, {
		position: "absolute",
		left: x + "px",
		top: y + "px",
		width: "300px",
		height: "150px",
		border: `2px solid ${framecolor}`,
		background: "#e0e0e0",
		resize: "both",
		overflow: "hidden",
		boxShadow: "5px 5px 10px rgba(0,0,0,0.5)",
		minWidth: "200px",
		minHeight: "100px",
		zIndex: ++topZ,
		fontWeight: "200",
		fontFamily: "sans-serif"
	});

	const titlebar = document.createElement("div");
	Object.assign(titlebar.style, {
		background: framecolor,
		color: "#fff",
		padding: "2px 5px",
		cursor: "grab",
		display: "flex",
		fontWeight: "200",
		fontFamily: "sans-serif",
		justifyContent: "space-between",
		position:"relative",
		zIndex:2,
		alignItems: "center",
		userSelect: "none"
	});

	const titleText = document.createElement("span");
	titleText.textContent = title;

	const buttons = document.createElement("div");
	const closeBtn = document.createElement("button");
	closeBtn.type = "button";
	closeBtn.className = "no-drag";
	closeBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="white"><line x1="4" y1="4" x2="20" y2="20" stroke="white" stroke-width="2"/><line x1="20" y1="4" x2="4" y2="20" stroke="white" stroke-width="2"/></svg>`;
	Object.assign(closeBtn.style, {
		background: "red",
		border: "none",
		cursor: "pointer",
		width: "24px",
		height: "24px",
		padding: "0",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	});
	closeBtn.addEventListener("mousedown", e => e.stopPropagation());
	closeBtn.addEventListener("touchstart", e => { e.stopPropagation(); }, { passive: false });
	closeBtn.addEventListener("click", () => win.remove());

	buttons.appendChild(closeBtn);
	titlebar.appendChild(titleText);
	titlebar.appendChild(buttons);

	const contentDiv = document.createElement("div");
	Object.assign(contentDiv.style, {
		padding: "10px",
		height: "calc(100% - 26px)",
		overflow: "auto"
	});
	contentDiv.innerHTML = content;

	win.appendChild(titlebar);
	win.appendChild(contentDiv);
	document.body.appendChild(win);

	let isDragging = false, offsetX = 0, offsetY = 0;

	function startDrag(e) {
		const target = e.target;
		if (target && target.closest && target.closest('.no-drag')) return;
		isDragging = true;
		const evt = e.touches ? e.touches[0] : e;
		offsetX = evt.clientX - win.offsetLeft;
		offsetY = evt.clientY - win.offsetTop;
		titlebar.style.cursor = "grabbing";
		document.body.style.overflow = "hidden";
		e.preventDefault();
	}

	function drag(e) {
		if (!isDragging) return;
		const evt = e.touches ? e.touches[0] : e;
		let newX = evt.clientX - offsetX;
		let newY = evt.clientY - offsetY;
		newX = Math.max(0, Math.min(window.innerWidth - win.offsetWidth, newX));
		newY = Math.max(0, Math.min(document.body.scrollHeight - win.offsetHeight, newY));
		win.style.left = newX + "px";
		win.style.top = newY + "px";
	}
	function endDrag() {
		isDragging = false;
		titlebar.style.cursor = "grab";
		document.body.style.overflow = "";
	}
	titlebar.addEventListener("mousedown", startDrag);
	document.addEventListener("mousemove", drag);
	document.addEventListener("mouseup", endDrag);
	titlebar.addEventListener("touchstart", startDrag, { passive: false });
	titlebar.addEventListener("touchmove", drag, { passive: false });
	document.addEventListener("touchend", endDrag);
	win.addEventListener("mousedown", () => win.style.zIndex = ++topZ);
	win.addEventListener("touchstart", () => win.style.zIndex = ++topZ);
}
function showConfirmPopup(x, y, message, onConfirm) {
  const content = `
    <div style="background:black; position:absolute; z-index:1; top:0; left:0; width:100%; color:white; display:flex;flex-direction:column;height:100%;justify-content:space-between">
      <p style="margin:0 0 10px 0;font-size:14px;">${message}</p>
<pre style="white-space: pre-wrap; color:darkred; word-break: break-all; width: 100%;">
This will remove all your songs you made in the recovery tab "Are You Sure?"
</pre>
        <button id="popupConfirmBtn" style="padding:6px 12px;background:darkred;color:red;  border:none;border-radius:4px;cursor:pointer;" onclick="alert("'");" > 
         YES REMOVE ALL
        </button>
    </div>
  `;
  POPUP(x, y, "Confirm", content, "#444");
  setTimeout(() => {
    const confirmBtn = document.getElementById("popupConfirmBtn");
    const cancelBtn = document.getElementById("popupCancelBtn");

    if (confirmBtn) confirmBtn.addEventListener("click", () => {
      if (typeof onConfirm === "function") onConfirm();
      confirmBtn.closest("div").parentElement.parentElement.remove(); 
    });

    if (cancelBtn) cancelBtn.addEventListener("click", () => {
      cancelBtn.closest("div").parentElement.parentElement.remove(); 
    });
  }, 10);
}
function showToast(message, duration = 3000) {
    const toast = document.createElement("div");
    let expanded = false;
    let hideTimeout;

    toast.textContent = message;

    Object.assign(toast.style, {
        position: "fixed",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: "90vw",
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "8px",
        fontFamily: "sans-serif",
        fontSize: "14px",
        zIndex: "9999",
        opacity: "0",
        transition: "all 0.3s ease",
        cursor: "pointer",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    });

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
    });

    function startTimer() {
        hideTimeout = setTimeout(hideToast, duration);
    }

    function hideToast() {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }

    startTimer();

    toast.addEventListener("click", () => {
        clearTimeout(hideTimeout);

        if (!expanded) {
            expanded = true;
            Object.assign(toast.style, {
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                transform: "none",
                maxWidth: "100vw",
                borderRadius: "0",
                whiteSpace: "normal",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "20px",
                padding: "40px"
            });
        } else {
            expanded = false;
            Object.assign(toast.style, {
                top: "",
                right: "",
                bottom: "30px",
                left: "50%",
                transform: "translateX(-50%)",
                maxWidth: "90vw",
                borderRadius: "8px",
                whiteSpace: "nowrap",
                fontSize: "14px",
                padding: "10px 20px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            });
            startTimer();
        }
    });
}
 let loadedBB = 0
let pageloaded = 0
const request = indexedDB.open("HyperBoxData", 1);
request.onupgradeneeded = function(event) {
	db = event.target.result;
	db.createObjectStore("files", { keyPath: "id" });
};
request.onsuccess = function(event) {
	db = event.target.result;
	loadFiles();
};