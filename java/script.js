
let lastLength;
let systemShortcut = [
    ["@for_", "for(int _ = 0; _ < |; _++) {\n    \n}"],
//    ["@sort_", "sort(_.begin(), _.end());"],
//    ["sort(_.begin(), _.end());@", "sort(_.begin(), _.end(), greater<int>());|"],
//    ["sort(_.begin(), _.end(), greater<int>());@", "sort(_.begin(), _.end());|"],
//    ["@tc", "int Tcase, tcase = 0;\ncin >> Tcase;\nwhile(tcase++ < Tcase) {\n    |\n    cout << \"\\n\";\n}"],
//    ["@ufind", "vector<int> u;\nint ufind(int k){\n    if(k == u[k]){\n        return k;\n    }\n    else{\n        u[k] = ufind(u[k]);\n        return u[k];\n    }\n}|"],
//    ["@ret", "int &ret = |;\nif(ret != -1) return ret;\n\nret = ;\nreturn ret;"],
//    ["@whileq", "while(!q.empty()) {\n    int qt = q.front();\n    q.pop();\n    |\n}"],
//    ["@whilepq", "while(!pq.empty()) {\n    int qt = pq.top();\n    pq.pop();\n    |\n}"],
//    ["@v1", "vector<int> v(N);\nfor(int i = 0; i < N; i++) {\n    cin >> v[i];\n}\n|"],
//    ["@v2", "vector<vector<int>> v(N, vector<int>(M));\nfor(int i = 0; i < N; i++) {\n    for(int j = 0; j < M; j++) {\n        cin >> v[i][j];\n    }\n}\n|"],
//    ["@vi", "vector<int>|"],
//    ["@vvi", "vector<vector<int>>|"],
//    ["@vl", "vector<long long>|"],
//    ["@vvl", "vector<vector<long long>>|"],
//    ["@vs", "vector<string>|"],
//    ["@vvs", "vector<vector<string>>|"],
//    ["@vpii", "vector<pair<int, int>>|"],
//    ["@pii", "pair<int, int>|"],
//    ["@vvpii", "vector<vector<pair<int, int>>>|"],
//    ["@q", "queue<int>|"],
//    ["@pq", "priority_queue<int>|"],
//    ["priority_queue<int>@", "priority_queue<int, vector<int>, greater<int>>|"],
//    ["priority_queue<int, vector<int>, greater<int>>@", "priority_queue<int>|"],
//    ["@mn", "mn = min(mn, |);"],
//    ["@mx", "mx = max(mx, |);"],
//    ["@mp", "make_pair(|, )"],
//    ["@nck", "int mod = 1e9+7;\nvector<long long> nck_, nck_i;\nlong long nck(int n, int k) {\n    int s=nck_.size();\n    if(n>=s) {\n        nck_.resize(n+1), nck_i.resize(n+1,1);\n        for(int i=s; i<=n; i++)\n            nck_[i]=i?i*nck_[i-1]%mod:1;\n        long long x=nck_[n];\n        long long &t=nck_i[n];\n        for(int m = mod-2; m; m>>=1, x=x*x%mod)\n            if(m&1) t=t*x%mod;\n        for(int i=n; i>=s && i; i--)\n            nck_i[i-1]=i*nck_i[i]%mod;\n    }\n    return nck_[n]*nck_i[k]%mod*nck_i[n-k]%mod;\n}\n|"],
//    ["@kmp", "string A;\nstring B;\nint a = A.size(), b = B.size();\nvector<int> pi(a);\nint x;\nx = 0;\nfor(int i = 1; i < a; i++) {\n    while(x && A[x] != A[i]) x = pi[x - 1];\n    if(A[x] == A[i]) pi[i] = ++x;\n}\nx = 0;\nfor(int i = 0; i < b; i++) {\n    while(x && A[x] != B[i]) x = pi[x - 1];\n    if(A[x] == B[i]) {\n        ++x;\n        if(x == a) {\n            cout << i - x + 1;\n            x = pi[x - 1];\n        }\n    }\n}\n"],
//    ["@kruskal", "sort(v.begin(), v.end());\nfor(int i = 0; i < len; i++) {\n    int a = ufind(v[i][1]);\n    int b = ufind(v[i][2]);\n    if(a == b) continue;\n    u[a] = b;\n    ans += v[i][0];\n}\n"],
    ["break", "break|;"],
    ["continue", "continue|;"],
    ["return", "return|;"],
//    ["cin>>", "cin >> |;"],
//    ["cin >>", "cin >> |;"],
//    ["cout<<", "cout << |;"],
//    ["cout <<", "cout << |;"],
//    ["<< endl", "<< \"\\n\"|"],
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
let historyBook = new Array();
let historyBookTogo = new Array();
let historyPoint = new Array();
let historyPointTogo = new Array();

function indent(idx) {
    let ret = "";
    let t = paper.value[--idx];
    while(t != "\n" && idx > -1) {
        if(t == " ") {
            ret += " ";
        }
        else {
            ret = "";
        }
        t = paper.value[--idx];
    }
    return ret;
}

function gvrAdd(type, val, idx){
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

function highlight(idxStart, idxEnd) {
    let s = paper.value.substring(0, idxStart).split("\n").length;
    let e = paper.value.substring(idxStart, idxEnd).split("\n").length;
    s--;
    lineHighlight.style.top = 20 + s * 25 + "px";
    lineHighlight.style.height = e * 25 + "px";
}

function autoReplace(idx) {
    let ix = Math.max(quickMatch.search(idx), quickMatch.search_(idx));
    if(ix != -1) {
        let sBefore = shortcutBefore[ix];
        let sAfter = shortcutAfter[ix];
        let selectionMove = 0;
        sAfter = sAfter.replace(/\n/g, "\n" + indent(idx));
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

window.onload = function() {
    if(localStorage.getItem("paper") == null) {
        paper.value = "import java.io.BufferedReader;\nimport java.io.InputStreamReader;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        \n    }\n}";
    }
    else paper.value = localStorage.getItem("paper");
    stdin.value = localStorage.getItem("stdin");
    stdin.style.height = Math.max(115, 40 + 25*stdin.value.split("\n").length) + "px";
    if(localStorage.getItem("fname")) {
        filename.value = localStorage.getItem("fname");
    }
    historyBook.push(paper.value);
    if(historyBook.length > 1) {
        undoBtn.style.opacity = '';
        undoBtn.style.filter = '';
    }
    if(historyBook.length > 5) historyBook.shift();
    historyPoint.push(0);
    if(historyPoint.length > 5) historyPoint.shift();
    lastLength = paper.value.length;
    colorful();
    
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
}

window.onresize = function() {
    setTimeout(function(){
        paperResize();
    }, 10);
}

visualViewport.addEventListener('resize', () => {
    paperResize();
});

document.documentElement.addEventListener('scroll', () => {
filename.value=document.documentElement.scrollTop;
    document.documentElement.scrollTop = 0;
});

document.getElementById("paper").addEventListener("keyup", function (event) {
    setTimeout(function(){
        highlight(paper.selectionStart, paper.selectionEnd);
    }, 10);
});

document.getElementById("paper").addEventListener("mouseup", function (event) {
    justbefore = false;
    setTimeout(function(){
        highlight(paper.selectionStart, paper.selectionEnd);
    }, 10);
});

document.getElementById("paper").addEventListener("touchend", function (event) {
    justbefore = false;
    setTimeout(function(){
        highlight(paper.selectionStart, paper.selectionEnd);
    }, 10);
});

let justbefore = false;
document.getElementById("paper").addEventListener("keydown", function (event) {
    if(event.key == ";" || event.key == ")" || event.key == "]" || event.key == "}") {
        if(paper.selectionStart == paper.selectionEnd) {
            if(paper.value[paper.selectionStart] == event.key) {
                event.preventDefault();
                paper.selectionEnd++;
                paper.selectionStart++;
            }
        }
    }
    else if(event.keyCode == 8) {
        if(paper.selectionStart == paper.selectionEnd) {
            let idx = paper.selectionStart;
            if(paper.value.substring(idx-4, idx) == "    ") {
                event.preventDefault();
                paper.value = paper.value.substring(0, idx-4) + paper.value.substring(idx+0);
                paper.selectionStart = idx - 4;
                paper.selectionEnd = idx - 4;
                colorful();
            }
            else if(paper.value.length == 0) {
                event.preventDefault();
                paper.value = "import java.io.BufferedReader;\nimport java.io.InputStreamReader;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        \n    }\n}";
                paper.selectionStart = 156;
                paper.selectionEnd = 156;
                filename.value = '';
                localStorage.setItem("fname", filename.value);
                historyBookTogo = new Array();
                historyPointTogo = new Array();
                historyBook.push(paper.value);
                historyPoint.push(paper.selectionStart);
                if(historyBook.length > 1) {
                    undoBtn.style.opacity = '';
                    undoBtn.style.filter = '';
                }
                if(historyBook.length > 5) historyBook.shift();
                colorful();
            }
            if(justbefore) {
                event.preventDefault();
                undo();
                justbefore = false;
            }
        }
    }
    else if(event.keyCode == 13 && paper.selectionStart == paper.selectionEnd) {
        let idx = paper.selectionStart;
        let lineHead = paper.value.lastIndexOf("\n", idx - 1) + indent(idx).length;
        if(paper.value.substring(lineHead+1, lineHead+4) == "cin") {
            event.preventDefault();
            if(paper.value[idx-1] == ";") {
                paper.value = paper.value.substring(0, idx) + "\n" + indent(idx) + paper.value.substring(idx);
            }
            else {
                paper.value = paper.value.substring(0, idx) + ";\n" + indent(idx) + paper.value.substring(idx);
                idx++;
            }
            let eachCin = paper.value.substring(lineHead, idx-1).split(">>");
            if(eachCin.length > 1) {
                let delta = 0;
                for(let i = 1; i < eachCin.length; i++) {
                    while(eachCin[i][0] == " ") eachCin[i] = eachCin[i].substring(1);
                    while(eachCin[i][eachCin[i].length-1] == " ") eachCin[i] = eachCin[i].substring(0, eachCin[i].length-1);
                    if(eachCin[i].lastIndexOf(" ") > -1) {
                        let cinType = eachCin[i].substring(0, eachCin[i].lastIndexOf(" "));
                        eachCin[i] = eachCin[i].substring(eachCin[i].lastIndexOf(" ") + 1);
                        delta += gvrAdd(cinType, eachCin[i], paper.selectionStart);
                    }
                }
                lineHead += delta;
                idx += delta;
                let tmp = paper.value.substring(0, lineHead + 1) + "cin";
                for(let i = 1; i < eachCin.length; i++) {
                    tmp += " >> " + eachCin[i];
                }
                paper.value = tmp + paper.value.substring(idx-1);
                idx = paper.value.indexOf("\n", lineHead);
                paper.selectionStart = idx + 1 + indent(idx).length;
                paper.selectionEnd = idx + 1 + indent(idx).length;
            }
            colorful();
            paper.selectionStart = idx + 1 + indent(idx).length;
            paper.selectionEnd = idx + 1 + indent(idx).length;
        }
        else if(paper.value.substring(lineHead+1, lineHead+5) == "cout") {
            event.preventDefault();
            if(paper.value[idx-1] == ";") {
                paper.value = paper.value.substring(0, idx) + "\n" + indent(idx) + paper.value.substring(idx);
            }
            else {
                paper.value = paper.value.substring(0, idx) + ";\n" + indent(idx) + paper.value.substring(idx);
                idx++;
            }
            paper.selectionStart = idx + 1 + indent(idx).length;
            paper.selectionEnd = paper.selectionStart;
            colorful();
        }
    }
    else if(event.keyCode == 13 && paper.selectionStart < paper.selectionEnd) {
        event.preventDefault();
        let idx = paper.selectionStart;
        paper.value = paper.value.substring(0, idx) + "\n" + indent(idx) + paper.value.substring(paper.selectionEnd);
        paper.selectionStart = idx + 1 + indent(idx).length;
        paper.selectionEnd = paper.selectionStart;
        colorful();
    }
    else if(event.keyCode == 9) {
        event.preventDefault();
        if(!event.shiftKey) {
            if(paper.selectionStart == paper.selectionEnd){
                let idx = paper.selectionStart;
                let lineHead = paper.value.lastIndexOf("\n", idx - 1) + indent(idx).length;
                if(idx == indent(idx).length || paper.value[idx - indent(idx).length - 1] == "\n") {
                    paper.value = paper.value.substring(0, idx) + "    " + paper.value.substring(idx);
                    paper.selectionStart = idx + 4;
                    paper.selectionEnd = paper.selectionStart;
                    colorful();
                }
                else if(paper.value.substring(lineHead+1, lineHead+4) == "cin") {
                    if(paper.value.substring(idx-1, idx) == " ") {
                        paper.value = paper.value.substring(0, idx) + ">> " + paper.value.substring(idx);
                        paper.selectionStart = idx + 3;
                        paper.selectionEnd = paper.selectionStart;
                        colorful();
                    }
                    else {
                        paper.value = paper.value.substring(0, idx) + " >> " + paper.value.substring(idx);
                        paper.selectionStart = idx + 4;
                        paper.selectionEnd = paper.selectionStart;
                        colorful();
                    }
                }
                else if(paper.value.substring(lineHead+1, lineHead+5) == "cout") {
                    if(paper.value.substring(idx-1, idx) == " ") {
                        paper.value = paper.value.substring(0, idx) + "<< " + paper.value.substring(idx);
                        paper.selectionStart = idx + 3;
                        paper.selectionEnd = paper.selectionStart;
                        colorful();
                    }
                    else {
                        paper.value = paper.value.substring(0, idx) + " << " + paper.value.substring(idx);
                        paper.selectionStart = idx + 4;
                        paper.selectionEnd = paper.selectionStart;
                        colorful();
                    }
                }
                else {
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
                let idxStart = paper.selectionStart;
                let idxEnd = paper.selectionEnd;
                let firstLine = paper.value.substring(0, idxStart).lastIndexOf("\n") + 1;
                let eachLine = paper.value.substring(firstLine, idxEnd).split("\n");
                let idx = firstLine;
                for(let i = 0; i < eachLine.length; i++) {
                    paper.value = paper.value.substring(0, idx) + "    " + paper.value.substring(idx);
                    idx += eachLine[i].length + 5;
                }
                colorful();
                paper.selectionStart = idxStart + 4;
                paper.selectionEnd = idxEnd + 4*eachLine.length;
            }
        }
        else {
            if(paper.selectionStart == paper.selectionEnd){
                let idx = paper.selectionStart;
                if(idx == indent(idx).length || paper.value[idx - indent(idx).length - 1] == "\n") {
                    if(paper.value.substring(idx - 4, idx) == "    ") {
                        paper.value = paper.value.substring(0, idx - 4) + paper.value.substring(idx);
                        paper.selectionStart = idx - 4;
                        paper.selectionEnd = paper.selectionStart;
                        colorful();
                    }
                }
            }
            else {
                let idxStart = paper.selectionStart;
                let idxEnd = paper.selectionEnd;
                let firstLine = paper.value.substring(0, idxStart).lastIndexOf("\n") + 1;
                let eachLine = paper.value.substring(firstLine, idxEnd).split("\n");
                let idx = firstLine;
                for(let i = 0; i < eachLine.length; i++) {
                    if(paper.value.substring(idx, idx + 4) == "    ") {
                        paper.value = paper.value.substring(0, idx) + paper.value.substring(idx + 4);
                        idx += eachLine[i].length - 3;
                        idxEnd -= 4;
                        if(i == 0) idxStart -= 4;
                    }
                    else {
                        idx += eachLine[i].length + 1;
                    }
                }
                colorful();
                paper.selectionStart = ( idxStart > -1 ? idxStart : 0 );
                paper.selectionEnd = idxEnd;
            }
        }
    }
    else if(event.keyCode == 191 && paper.selectionStart != paper.selectionEnd) {
        event.preventDefault();
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
            colorful();
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
            colorful();
            paper.selectionStart = ( idxStart > -1 ? idxStart : 0 );
            paper.selectionEnd = idxEnd;
        }
    }
    else if( (event.ctrlKey||event.metaKey) &&event.keyCode==65){
        event.preventDefault();
        paper.selectionStart = 0;
        paper.selectionEnd = paper.value.length;
    }
    else if( (event.ctrlKey||event.metaKey) &&event.keyCode==90){
        event.preventDefault();
        undo();
    }
    else if( (event.ctrlKey||event.metaKey) &&event.keyCode==89){
        event.preventDefault();
        redo();
    }
    justbefore = false;
});

function undo() {
    if(historyBook.length == 1) {
        undoBtn.style.filter = "grayscale(1)";
        undoBtn.style.opacity = "0.5";
        return 0;
    }
    historyBookTogo.push(historyBook[historyBook.length - 1]);
    historyPointTogo.push(historyPoint[historyPoint.length - 1]);
    redoBtn.style.opacity = '';
    redoBtn.style.filter = '';
    paper.value = historyBook[historyBook.length - 2];
    paper.selectionStart = historyPoint[historyBook.length - 2];
    paper.selectionEnd = historyPoint[historyBook.length - 2];
    historyBook.pop();
    historyPoint.pop();
    colorful();
    if(historyBook.length == 1) {
        undoBtn.style.filter = "grayscale(1)";
        undoBtn.style.opacity = "0.5";
    }
}

function redo() {
    if(historyBookTogo.length == 0) {
        redoBtn.style.filter = "grayscale(1)";
        redoBtn.style.opacity = "0.5";
        return 0;
    }
    historyBook.push(historyBookTogo[historyBookTogo.length - 1]);
    historyPoint.push(historyPointTogo[historyPointTogo.length - 1]);
    if(historyBook.length > 1) {
        undoBtn.style.opacity = '';
        undoBtn.style.filter = '';
    }
    paper.value = historyBookTogo[historyBookTogo.length - 1];
    paper.selectionStart = historyPointTogo[historyBookTogo.length - 1];
    paper.selectionEnd = historyPointTogo[historyBookTogo.length - 1];
    historyBookTogo.pop();
    historyPointTogo.pop();
    colorful();
    if(historyBookTogo.length == 0) {
        redoBtn.style.filter = "grayscale(1)";
        redoBtn.style.opacity = "0.5";
    }
}

function openSettings() {
    console.log(11231);
}

function colorful() {
    localStorage.setItem("paper", paper.value);
    document.getElementsByClassName("sh_java")[0].innerText = paper.value;
    sh_highlightDocument();
    paperResize();
    lastLength = paper.value.length;
    let n = paper.value.split("\n").length;
    let nums = "";
    for(let i = 1; i <= n; i++) {
        nums += i + "<br>";
    
    }
    lineNumber.innerHTML = nums;
}

function paperResize() {
    cover.style.height = window.visualViewport.height - 44 +"px";
    runModal.style.height = window.visualViewport.height - 44 +"px";
    paper.style.height = Math.max(cover.clientHeight, document.getElementsByClassName("sh_java")[0].clientHeight) + "px";
    paper.style.width = Math.max(cover.clientWidth, document.getElementsByClassName("sh_java")[0].clientWidth) + "px";
    lineHighlight.style.width = paper.clientWidth + "px";
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

window.ondragover=function(event){
    event.preventDefault();
}

window.ondrop=function(event){
    event.preventDefault();
    let reader = new FileReader();
    reader.onload=function(e){
        paper.value = e.target.result;
        historyBookTogo = new Array();
        historyPointTogo = new Array();
        historyBook.push(paper.value);
        historyBook.push(paper.selectionStart);
        if(historyBook.length > 1) {
            undoBtn.style.opacity = '';
            undoBtn.style.filter = '';
        }
        if(historyBook.length > 5) historyBook.shift();
        if(historyPoint.length > 5) historyPoint.shift();
        colorful();
    }
    reader.readAsText(event.dataTransfer.files[0]);
    justbefore = false;
    if(event.dataTransfer.files[0].name.substring(event.dataTransfer.files[0].name.length - 4) == ".java") {
        filename.value = event.dataTransfer.files[0].name.substring(0, event.dataTransfer.files[0].name.length - 4);
    }
    else {
        filename.value = event.dataTransfer.files[0].name;
    }
    localStorage.setItem("fname", filename.value);
}

function openFile(event){
    let reader = new FileReader();
    if(filePicker.files.length>0){
        reader.onload = function(e){
            paper.value = e.target.result;
            historyBookTogo = new Array();
            historyPointTogo = new Array();
            historyBook.push(paper.value);
            historyPoint.push(paper.selectionStart);
            if(historyBook.length > 1) {
                undoBtn.style.opacity = '';
                undoBtn.style.filter = '';
            }
            if(historyBook.length > 5) historyBook.shift();
            if(historyPoint.length > 5) historyPoint.shift();
            colorful();
        }
        reader.readAsText(filePicker.files[0]);
        justbefore = false;
        if(filePicker.files[0].name.substring(filePicker.files[0].name.length - 4) == ".java") {
            filename.value = filePicker.files[0].name.substring(0, filePicker.files[0].name.length - 4);
        }
        else {
            filename.value = filePicker.files[0].name;
        }
        localStorage.setItem("fname", filename.value);
    }
}

window.addEventListener("keydown", function (event) {
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

function runTrigger() {
    if(runModal.style.display == "block"){
        run();
    }
    runModal.style.display = 'block';
    stdin.focus();
}

document.getElementById("filename").addEventListener("input", function(e) {
    localStorage.setItem("fname", filename.value);
});

document.getElementById("paper").addEventListener("input", function(e) {
    if(lastLength + 1 == paper.value.length) {
        autoReplace(paper.selectionStart - 1);
    }
    historyBookTogo = new Array();
    historyPointTogo = new Array();
    historyBook.push(paper.value);
    historyPoint.push(paper.selectionStart);
    if(historyBook.length > 1) {
        undoBtn.style.opacity = '';
        undoBtn.style.filter = '';
    }
    if(historyBook.length > 5) historyBook.shift();
    if(historyPoint.length > 5) historyPoint.shift();
    colorful();
});

document.getElementById("paper").addEventListener("focus", function(e) {
    runModal.style.display = "none";
});

let compilerId = 1;
function run() {
    if(compilerId == 1) compilerId = 2;
    else compilerId = 1;
    cpuTime.innerHTML = "";
    memory.innerHTML = "";
    output.innerHTML = "<center>...</center>";
    let url = 'run.php';
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            let compiled = xhr.responseText;
            compiled = JSON.parse(compiled);
            output.innerHTML = "";
            if(compiled.cpuTime != null){
                cpuTime.innerHTML = compiled.cpuTime+" s";
            }
            if(compiled.memory != null){
                memory.innerHTML = compiled.memory + " kb";
            }
            if(compiled.output != null){
                output.innerHTML = compiled.output;
            }
            if(runModal.scrollTop < stdin.clientHeight - cover.clientHeight + 100) {
                runModal.scrollTo(0, stdin.clientHeight - 100);
            }
        }
    }
    let obj = { "script":encodeURIComponent(paper.value), "stdin":encodeURIComponent(stdin.value), "cid":compilerId };
    let dbParam = JSON.stringify(obj);
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(dbParam);
}

document.getElementById("stdin").addEventListener("input", function(e) {
    stdin.style.height = Math.max(115, 40 + 25*stdin.value.split("\n").length) + "px";
    localStorage.setItem("stdin", stdin.value);
});
