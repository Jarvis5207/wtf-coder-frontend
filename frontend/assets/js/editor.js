let fileTree = document.getElementById("fileTree");
let fileCounter = 1;
let folderCounter = 1;

function createFile() {
  const li = document.createElement("li");
  li.textContent = "NewFile" + fileCounter + ".html";
  li.onclick = () => alert("File selected: " + li.textContent);
  fileTree.appendChild(li);
  fileCounter++;
}

function createFolder() {
  const li = document.createElement("li");
  li.textContent = "NewFolder" + folderCounter;
  fileTree.appendChild(li);
  folderCounter++;
}
