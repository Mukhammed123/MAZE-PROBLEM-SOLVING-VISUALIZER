
var tableGrid = document.getElementById('table');
var walls = [], weightButtonPressed = false,negativeWeight = false, removeButton = false;

function Node(nodeId,nodeType){
  this.nodeId = nodeId;
  this.nodeType = nodeType;
  this.nodeWeight = 0;
  this.distance = Infinity;
  this.steps = 0;
  this.edges = "";
}

function Board() {
  this.mousePressed = false;
  this.boardArray = [];
  this.start = "";
  this.target = "";
  this.nodes = {};
}

// Functions initialization
Board.prototype.initialise = function() {
  this.createGrid();
};

// Grid creation
Board.prototype.createGrid = function(){
for (var rows = 0; rows < 21; rows++){
  let aRow = document.createElement("tr");
  let boardRow = [], nodeType;

  for (var cols = 0; cols < 50; cols++){
    var tableData = document.createElement("td");
    var dataDiv = document.createElement("div");
    var newNode;

    dataDiv.id = `${rows}-${cols}`;
    dataDiv.className = "mazeCell";

    if(cols === 0 || rows === 0 || cols === 49 || rows === 20){
      dataDiv.style.backgroundColor = "#EBF2F2";
      var img = document.createElement("img");
      var att = document.createAttribute("src");
      att.value = "imgs/gratings.jpg";
      img.setAttributeNode(att);
      img.className = "startGrass";
      dataDiv.appendChild(img);
      nodeType = "wall";
    }

    else if (rows == 1 && cols == 1){
      nodeType = "start";
      this.start = dataDiv.id;

      img = document.createElement("img");
      att = document.createAttribute("src");
      att.value = "imgs/rat.png";
      img.setAttributeNode(att);
      img.className = "startMouse";
      img.style.opacity = "1";
      dataDiv.appendChild(img);

      var img2 = document.createElement("img");
      var att2 = document.createAttribute("src");
      att2.value = "imgs/shit.jpg";
      img2.setAttributeNode(att2);
      img2.className = "shit";
      img2.style.zIndex = "0";
      dataDiv.appendChild(img2);

    } else if (rows === 19 && cols === 48){
      // https://www.google.com.tw/search?q=finish+line+pixel+art+square&tbm=isch&ved=2ahUKEwiL1pzBu93nAhUHc5QKHXM1D7oQ2-cCegQIABAA&oq=finish+line+pixel+art+square&gs_l=img.3...15825.20460..21306...0.0..0.153.669.4j3......0....1..gws-wiz-img.......0i30.VetGFqHkfk4&ei=rxVNXsvCJofm0QTz6rzQCw&authuser=0&bih=657&biw=1366&hl=en#imgrc=Ospk1SMTDLlwtM
        nodeType = "target";
        this.target = dataDiv.id;

        var img = document.createElement("img");
        var att = document.createAttribute("src");
        att.value = "imgs/cheese.png";
        img.setAttributeNode(att);
        img.className = "startGrass";
        img.style.zIndex = "0";
        dataDiv.appendChild(img);
    }
    else{
      var random = Math.random();
      if(random > 0.5){
        dataDiv.style.backgroundColor = "#EBF2F2";
        var img = document.createElement("img");
        var att = document.createAttribute("src");
        att.value = "imgs/gratings.jpg";
        img.setAttributeNode(att);
        img.className = "startGrass";
        dataDiv.appendChild(img);
        nodeType = "wall";
      }
      else
        nodeType = "unvisited";
    }

    newNode = new Node(dataDiv.id,nodeType);

    this.nodes[dataDiv.id] = newNode;
    tableData.appendChild(dataDiv);
    aRow.appendChild(tableData);
    boardRow.push(newNode);

    }

  tableGrid.appendChild(aRow);
  this.boardArray.push(boardRow);

  }
}


let newObject = new Board();
newObject.initialise();

document.getElementsByClassName("button")[0].onclick = () => {
    runDFS(newObject.nodes, newObject.boardArray);
}

document.getElementsByClassName("button")[1].onclick = () => {
    runBFS(newObject.nodes, newObject.boardArray);
}
