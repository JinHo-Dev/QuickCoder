let systemShortcut = [
    ["@for_", "for(int _ = 0; _ < |; _++) {\n    \n}"],
    ["break", "break|;"],
    ["continue", "continue|;"],
    ["return", "return|;"],
    ["(", "(|)"],
    ["[", "[|]"],
    ["{", "{|}"],
    ["    }", "}|"],
    ["(\n", "(\n    |\n"],
    ["[\n", "[\n    |\n"],
    ["{\n", "{\n    |\n"],
    ["\n", "\n|"],
];
class Node {
    constructor(value = ''){
        this.value = value;
        this.end = false;
        this.idx = -1;
        this.child = {};
    }
}
class Trie {
    constructor(){
       this.root = new Node();
    }
    insert(string, idx){
        let currentNode = this.root;
        for(let i = string.length-1; i >= 0; i--) {
            const currentChar = string[i];
            if(currentNode.child[currentChar] === undefined){
                currentNode.child[currentChar] = new Node(currentNode.value + currentChar);
            }
            currentNode = currentNode.child[currentChar];
        }
        currentNode.end = true;
        currentNode.idx = idx;
    }
    search(idx) {
        let currentNode = this.root;
        while(idx > -1) {
            const currentChar = paper.value[idx]; 
            if(currentNode.child[currentChar]){
               currentNode = currentNode.child[currentChar];
               idx--;
            }
            else if(currentNode.child["_"]){
               currentNode = currentNode.child["_"];
               idx--;
            }
            else {
                return currentNode.idx;
            }
        }
        return currentNode.idx;
    }
    search_(idx) {
        let currentNode = this.root;
        while(idx > -1) {
            const currentChar = paper.value[idx]; 
            if(currentNode.child["_"]){
               currentNode = currentNode.child["_"];
               idx--;
            }
            else if(currentNode.child[currentChar]){
               currentNode = currentNode.child[currentChar];
               idx--;
            }
            else {
                return currentNode.idx;
            }
        }
        return currentNode.idx;
    }
}
const quickMatch = new Trie();
let shortcutBefore = new Array();
let shortcutAfter = new Array();

function autoReplace(idx) { // legacy code
    let ix = Math.max(quickMatch.search(idx), quickMatch.search_(idx));
    if(ix != -1) {
        let sBefore = shortcutBefore[ix];
        let sAfter = shortcutAfter[ix];
        let selectionMove = 0;
        sAfter = sAfter.replace(/\n/g, "\n" + currentIndent(idx));
        let curidx = 0;
        if(sBefore.indexOf("_") > -1) {
            while(sAfter.indexOf("_", curidx++) > -1){
                sAfter = sAfter.replace("_", paper.value[idx - sBefore.length + sBefore.indexOf("_") + 1]);
            }
        }
        if(sAfter.indexOf("|") > -1) {
            selectionMove = sAfter.indexOf("|") - sBefore.length;
            sAfter = sAfter.replace("|", "");
        }
        else {
            selectionMove = sAfter.length - sBefore.length;
        }
        paper.value = paper.value.substring(0, idx - sBefore.length + 1) + sAfter + paper.value.substring(idx + 1);
        paper.selectionStart = idx + selectionMove + 1;
        paper.selectionEnd = idx + selectionMove + 1;
        justbefore = true;
    }
    else {
        justbefore = false;
    }
}
document.getElementById("paper").addEventListener("input", () => {
    if(lastLength + 1 == paper.value.length) {
        autoReplace(paper.selectionStart - 1);
    }
});
window.addEventListener("load", () => {
    for(let i = 0; i < systemShortcut.length; i++) {
        quickMatch.insert(systemShortcut[i][0], i);
        shortcutBefore.push(systemShortcut[i][0]);
        shortcutAfter.push(systemShortcut[i][1]);
    }
    let shortcut = shortcuts.value.split("\n");
    for(let i = 0; i + i < shortcut.length; i++) {
        quickMatch.insert(shortcut[i+i], systemShortcut.length + i);
        shortcutBefore.push(shortcut[i+i]);
        shortcutAfter.push(shortcut[i+i+1]);
    }
});