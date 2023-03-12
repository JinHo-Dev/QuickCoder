// vector-like func
Object.defineProperty(Array.prototype, 'back', {
    value: function() { return this[this.length-1]; }
});
let justbefore = false;
let baseText = "import java.io.BufferedReader;\nimport java.io.InputStreamReader;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        \n    }\n}";
let saveInterval = 3000;
let indentSize = 4;
let indent = "";
for(let i = 0; i < indentSize; i++) indent += " ";
let compilerId = 1;
let lastLength;
let history = new Array();
let future = new Array();
function save(s) {
    let d = document.getElementById(s);
    if(localStorage.getItem(s) == d.value) return;
    let t = new Date() - 0;
    if(t - d.dataset.saveTime < saveInterval) {
        setTimeout(() => { save(s); }, saveInterval);
        return;
    }
    localStorage.setItem(s, d.value);
    d.dataset.saveTime = t;
}
function load(s) {
    let g = localStorage.getItem(s);
    document.getElementById(s).value = (g ? g : "");
}
function doo() {
    lastLength = paper.value.length;
    history.push([paper.value, 0, 0]);
    if(history.length > 5) history.shift();
    selection();
    paint();
    btnAvail();
}
function undo() {
    if(history.length == 1) return;
    future.push(history.back());
    history.pop();
    let h = history.back();
    paper.value = h[0];
    lastLength = paper.value.length;
    paper.selectionStart = h[1];
    paper.selectionEnd = h[2];
    paint();
    btnAvail();
    save("paper");
}
function redo() {
    if(future.length == 0) return;
    let f = future.back();
    future.pop();
    history.push(f);
    paper.value = f[0];
    lastLength = paper.value.length;
    paper.selectionStart = f[1];
    paper.selectionEnd = f[2];
    paint();
    btnAvail();
    save("paper");
}
function btnAvail() {
    if(history.length == 1) {
        undoBtn.style.filter = "grayscale(1)";
        undoBtn.style.opacity = "0.5";
    }
    else {
        undoBtn.style.filter = "";
        undoBtn.style.opacity = "";
    }
    if(future.length == 0) {
        redoBtn.style.filter = "grayscale(1)";
        redoBtn.style.opacity = "0.5";
    }
    else {
        redoBtn.style.filter = "";
        redoBtn.style.opacity = "";
    }
}
function paint() {
    document.querySelector(".sh_java").innerText = paper.value;
    sh_highlightDocument();
    resize();
    let n = paper.value.split("\n").length;
    let t = "";
    for(let i = 1; i <= n; i++) t += i + "<br>";
    lineNumber.innerHTML = t;
    save("paper");
}
function resize() {
    let d = document.querySelector(".sh_java");
    let h = window.visualViewport.height;
    cover.style.height = `${h - 44}px`;
    runModal.style.height = `${h - 44}px`;
    if(Math.abs(window.innerHeight - h) > 100) {
        touchbar.style.top = `${h - 60}px`;
        touchbar.style.height = `${Math.abs(window.innerHeight - h) + 60}px`;
    }
    else {
        touchbar.style.top = "-60px";
        touchbar.style.height = "1px";
    }
    paper.style.height = `${Math.max(cover.clientHeight, d.clientHeight)}px`;
    paper.style.width = `${Math.max(cover.clientWidth, d.clientWidth)}px`;
    lineHighlight.style.width = `${paper.clientWidth}px`;
}
function selection() {
    let st = paper.selectionStart;
    let ed = paper.selectionEnd;
    let v = paper.value;
    history[history.length - 1][1] = st;
    history[history.length - 1][2] = ed;
    s = v.substring(0, st).split("\n").length - 1;
    e = v.substring(st, ed).split("\n").length;
    lineHighlight.style.top = `${20 + s * 25}px`;
    lineHighlight.style.height = `${e * 25}px`;
}
function currentIndent(i) {
    let r = "";
    let t = paper.value[--i];
    while(t != "\n" && i > -1) {
        if(t == " ") r += " ";
        else r = "";
        t = paper.value[--i];
    }
    return r;
}
function runTrigger() {
    if(runModal.style.display == "block") {
        run();
        return;
    }
    runModal.style.display = "block";
    stdin.focus();
}
function run() {
    if(compilerId == 1) compilerId = 2;
    else compilerId = 1;
    cpuTime.innerHTML = "";
    memory.innerHTML = "";
    output.innerHTML = "<center>...</center>";
    let url = "run.php";
    let x = new XMLHttpRequest();
    x.onreadystatechange = function() {
        if(x.readyState === 4) {
            let compiled = x.responseText;
            compiled = JSON.parse(compiled);
            output.innerHTML = "";
            if(compiled.cpuTime != null) cpuTime.innerHTML = `${compiled.cpuTime}s`;
            if(compiled.memory != null) memory.innerHTML = `${compiled.memory}kb`;
            if(compiled.output != null) output.innerHTML = compiled.output;
            if(runModal.scrollTop < stdin.clientHeight - cover.clientHeight + 100) {
                runModal.scrollTo(0, stdin.clientHeight - 100);
            }
        }
    }
    let obj = { "script": encodeURIComponent(paper.value), 
                "stdin": encodeURIComponent(stdin.value), 
                "cid": compilerId };
    let dbParam = JSON.stringify(obj);
    x.open("POST", url, true);
    x.setRequestHeader("Content-type", "application/json");
    x.send(dbParam);
}
window.addEventListener("click", () => { justbefore = false; });
window.addEventListener("resize", () => { resize(); });
visualViewport.addEventListener("resize", () => { resize(); });
document.getElementById("paper").addEventListener("focus", () => { runModal.style.display = "none"; });
document.getElementById("paper").addEventListener("keyup", () => { setTimeout(() => { selection(); }, 1); });
document.getElementById("paper").addEventListener("mouseup", () => { setTimeout(() => { selection(); }, 1); });
document.getElementById("paper").addEventListener("touchend", () => { setTimeout(() => { selection(); }, 1); });
document.getElementById("filename").addEventListener("input", () => { save("filename"); });
document.getElementById("paper").addEventListener("input", () => { doo(); });
document.getElementById("stdin").addEventListener("input", () => {
    stdin.style.height = `${Math.max(115, 40 + 25 * stdin.value.split("\n").length)} px`;
    save("stdin");
});
window.addEventListener("load", () => {
    if(localStorage.getItem("paper") == null) paper.value = baseText;
    else load("paper");
    load("filename");
    load("stdin");
    let e = new CustomEvent("input");
    stdin.dispatchEvent(e);
    doo();
});
document.getElementById("paper").addEventListener("keydown", (e) => {
    if(e.key == ";" || e.key == ")" || e.key == "]" || e.key == "}") {
        if(isPoint()) {
            if(paper.value[paper.selectionStart] == e.key) {
                e.preventDefault();
                paper.selectionEnd++;
                paper.selectionStart++;
            }
        }
    }
    else if(e.keyCode == 9) tab(e);
    else if(e.keyCode == 13) enter(e);
    else if(e.keyCode == 8) backspace(e);
    else if(event.keyCode == 191) slash(e);
    justbefore = false;
});
function slash(e){
    if(!isPoint()) {
        e.preventDefault();
        if(!event.shiftKey) {
            let idxStart = paper.selectionStart;
            let idxEnd = paper.selectionEnd;
            let firstLine = paper.value.substring(0, idxStart).lastIndexOf("\n") + 1;
            let eachLine = paper.value.substring(firstLine, idxEnd).split("\n");
            let idx = firstLine;
            for(let i = 0; i < eachLine.length; i++) {
                paper.value = paper.value.substring(0, idx) + "//" + paper.value.substring(idx);
                idx += eachLine[i].length + 3;
            }
            doo();
            paper.selectionStart = idxStart + 2;
            paper.selectionEnd = idxEnd + 2*eachLine.length;
        }
        else {
            let idxStart = paper.selectionStart;
            let idxEnd = paper.selectionEnd;
            let firstLine = paper.value.substring(0, idxStart).lastIndexOf("\n") + 1;
            let eachLine = paper.value.substring(firstLine, idxEnd).split("\n");
            let idx = firstLine;
            for(let i = 0; i < eachLine.length; i++) {
                if(paper.value.substring(idx, idx + 2) == "//") {
                    paper.value = paper.value.substring(0, idx) + paper.value.substring(idx + 2);
                    idx += eachLine[i].length - 1;
                    idxEnd -= 2;
                    if(i == 0) idxStart -= 2;
                }
                else {
                    idx += eachLine[i].length + 1;
                }
            }
            doo();
            paper.selectionStart = ( idxStart > -1 ? idxStart : 0 );
            paper.selectionEnd = idxEnd;
        }
    }
}
function tab(e) { // some legacy code here
    e.preventDefault();
    if(isPoint()) {
        if(isFirst()) {
            insert(indent);
        }
        else {
            let idx = paper.selectionStart;
            let lineHead = paper.value.lastIndexOf("\n", idx - 1) + currentIndent(idx).length;
                if("]})".indexOf(paper.value[paper.selectionStart]) > -1) {
                    paper.selectionStart++;
                    paper.selectionEnd = paper.selectionStart;
                }
                else {
                    if(paper.value[paper.selectionStart] != "\n") {
                        paper.selectionStart = paper.value.indexOf("\n", paper.selectionStart + 1);
                    }
                    paper.selectionStart = paper.value.indexOf("\n", paper.selectionStart + 1);
                    paper.selectionEnd = paper.selectionStart;
                }
        }
    }
    else {
        if(!e.shiftKey) {
            let idxStart = paper.selectionStart;
            let idxEnd = paper.selectionEnd;
            let firstLine = paper.value.substring(0, idxStart).lastIndexOf("\n") + 1;
            let eachLine = paper.value.substring(firstLine, idxEnd).split("\n");
            let idx = firstLine;
            for(let i = 0; i < eachLine.length; i++) {
                paper.value = paper.value.substring(0, idx) + indent + paper.value.substring(idx);
                idx += eachLine[i].length + indentSize + 1;
            }
            paint();
            paper.selectionStart = idxStart + indentSize;
            paper.selectionEnd = idxEnd + indentSize*eachLine.length;
        }
        else {
            let idxStart = paper.selectionStart;
            let idxEnd = paper.selectionEnd;
            let firstLine = paper.value.substring(0, idxStart).lastIndexOf("\n") + 1;
            let eachLine = paper.value.substring(firstLine, idxEnd).split("\n");
            let idx = firstLine;
            for(let i = 0; i < eachLine.length; i++) {
                if(paper.value.substring(idx, idx + indentSize) == indent) {
                    paper.value = paper.value.substring(0, idx) + paper.value.substring(idx + indentSize);
                    idx += eachLine[i].length - indentSize + 1;
                    idxEnd -= indentSize;
                    if(i == 0) idxStart -= indentSize;
                }
                else {
                    idx += eachLine[i].length + 1;
                }
            }
            paint();
            paper.selectionStart = ( idxStart > -1 ? idxStart : 0 );
            paper.selectionEnd = idxEnd;
        }
    }
}
function enter(e) { // some legacy code here
    e.preventDefault();
    let idx = paper.selectionStart;
    let lineHead = paper.value.lastIndexOf("\n", idx - 1) + currentIndent(idx).length;
    let isGvr = paper.value.split("//gvr\n").length > 2;
    insert("\n" + currentIndent(paper.selectionStart));
}
function backspace(e) {
    if(paper.value.length == 0 && isPoint()) {
        e.preventDefault();
        paper.value = baseText;
        paper.selectionStart = 156;
        paper.selectionEnd = 156;
        filename.value = "";
        save("paper");
        save("filename");
        doo();
    }
    else if(isFirst() && isPoint()) {
        let p = paper.selectionStart;
        let i = currentIndent(p).length;
        if(i != 0) {
            e.preventDefault();
            let j = Math.floor((i - 1) / indentSize) * indentSize;
            paper.value = paper.value.substr(0, p - i + j) + paper.value.substr(p);
            paper.selectionStart = p - i + j;
            paper.selectionEnd = p - i + j;
            doo();
        }
    }
    else if(justbefore && isPoint()) {
        e.preventDefault();
        undo();
    }
}
function isPoint() {
    return (paper.selectionStart == paper.selectionEnd ? true : false);
}
function isFirst() {
    let v = paper.value;
    let i = paper.selectionStart - 1;
    for(; i >= 0; i--) {
        if(v[i] == '\n') return true;
        if(v[i] == ' ') continue;
        break;
    }
    if(i == -1) return true;
    else return false;
}
function insert(s) {
    let v = paper.value;
    let i = paper.selectionStart;
    paper.value = v.substr(0, i) + s + v.substr(i);
    paper.selectionStart = i + s.length;
    paper.selectionEnd = i + s.length;
    doo();
}
function gvrAdd(type, val, idx) { // legacy code
    let s = paper.value.indexOf("\n//gvr\n");
    if(s > -1){
        s += 6;
        let e = paper.value.indexOf("\n//gvr\n", s);
        if(e >= s){
            let gvr = paper.value.substring(s, e);
            let ss = gvr.indexOf("\n"+type+" ");
            let delta = 0;
            if(ss > -1) {
                let ee = gvr.indexOf(";", ss + 1);
                if(ee > -1) {
                    gvr = gvr.substring(0, ee) + ", " + val + gvr.substring(ee);
                }
                else {
                    gvr = gvr.substring(0, ss + 2 + type.length) + val + ", " + gvr.substring(ss + 2 + type.length);
                }
                delta += 2 + val.length;
            }
            else {
                gvr += "\n" + type + " " + val + ";";
                delta += 3 + type.length + val.length;
            }
            paper.value = paper.value.substring(0, s) + gvr + paper.value.substring(e);
            return delta;
        }
    }
}


// ---------- ** legacy code below ** ---------- //


window.ondragover=function(event){
    event.preventDefault();
}

function filePaper() {
    let fileLink = document.createElement("a");
    fileLink.href = 'data:text/plain;charset=UTF-8,' + encodeURIComponent(paper.value);
    if(filename.value == "") {
        fileLink.download = "source.java";
    }
    else {
        fileLink.download = filename.value + ".java";
    }
    document.body.appendChild(fileLink);
    fileLink.click();
}

function fileOutput() {
    let fileLink = document.createElement("a");
    fileLink.href = 'data:text/plain;charset=UTF-8,' + encodeURIComponent(output.innerHTML);
    fileLink.download = "output.txt";
    document.body.appendChild(fileLink);
    fileLink.click();
}
window.ondrop=function(event){
    event.preventDefault();
    let reader = new FileReader();
    reader.onload=function(e){
        paper.value = e.target.result;
        doo();
    }
    reader.readAsText(event.dataTransfer.files[0]);
    justbefore = false;
    if(event.dataTransfer.files[0].name.substring(event.dataTransfer.files[0].name.length - 5) == ".java") {
        filename.value = event.dataTransfer.files[0].name.substring(0, event.dataTransfer.files[0].name.length - 5);
    }
    else {
        filename.value = event.dataTransfer.files[0].name;
    }
    save("filename");
}
function openFile(event){
    let reader = new FileReader();
    if(filePicker.files.length>0){
        reader.onload = function(e){
            paper.value = e.target.result;
            doo();
        }
        reader.readAsText(filePicker.files[0]);
        justbefore = false;
        if(filePicker.files[0].name.substring(filePicker.files[0].name.length - 5) == ".java") {
            filename.value = filePicker.files[0].name.substring(0, filePicker.files[0].name.length - 5);
        }
        else {
            filename.value = filePicker.files[0].name;
        }
        save("filename");
    }
}
window.addEventListener("keydown", (event) => {
    if( (event.ctrlKey||event.metaKey) && event.shiftKey &&event.keyCode==83){
        event.preventDefault();
        fileOutput();
    }
    else if( (event.ctrlKey||event.metaKey) &&event.keyCode==83){
        event.preventDefault();
        filePaper();
    }
    else if( (event.ctrlKey||event.metaKey) &&event.keyCode==68){
        event.preventDefault();
        paper.focus();
    }
    else if( (event.ctrlKey||event.metaKey) &&event.keyCode==79){
        event.preventDefault();
        document.getElementById("filePicker").click();
    }
    else if( ((event.ctrlKey||event.metaKey) &&event.keyCode==69) || event.keyCode==116){
        event.preventDefault();
        runTrigger();
    }
});