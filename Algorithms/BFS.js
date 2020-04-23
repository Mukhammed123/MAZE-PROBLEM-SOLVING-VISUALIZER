var queue = [], copyOfNodes = [], copyOfBoardArray = [], foundWay = false, gotCheese=false, toAnimate = [], prev = "", directions = [], queueEvents = [], sevt, queueIndex = 0;
var globalIndex = 0;
var queueElement = document.getElementsByClassName("stack")[0];
var queueElement = queueElement.getElementsByTagName("ul")[0];
queueElement.style.width = "88%";
queueElement.style.padding = "5%";
queueElement.style.position = "absolute";
queueElement.style.left = "0";
queueElement.style.listStyle = "none";
queueElement.style.overflow = "hidden";
queueElement.style.textAlign = "center";

function runBFS(nodes, arrayBoard){
  var stack_or_queue = document.getElementsByTagName("h3")[0];
  stack_or_queue.textContent = "Queue";
  stack_or_queue.style.right = "10%";
  copyOfNodes = nodes;
  copyOfBoardArray = arrayBoard;
  queue.push(copyOfBoardArray[1][1]);

  while(queue.length > 0){
    foundWay = false;
    observeNodesBFS();

    queueEvents.push(`pop ${queue[0].nodeId}`);
    toAnimate.push(`pop ${queue[0].nodeId}`);
    queue.shift();

    if(gotCheese){
      break;
    }
  }
  toAnimateFunctionBFS();
}

// To shorten the code
var row, col;
function appendPushFunction(row,col){
  var currentNode = queue[0];
  if (copyOfBoardArray[row][col].nodeType == "target")
    gotCheese = true;

    copyOfBoardArray[row][col].nodeType = "visited";
    copyOfBoardArray[row][col].edges = `${currentNode.nodeId}_${copyOfBoardArray[row][col].nodeId}`;
    queueEvents.push(`push ${copyOfBoardArray[row][col].nodeId}`);
    queue.push(copyOfBoardArray[row][col]);
    toAnimate.push(`${currentNode.nodeId}_${copyOfBoardArray[row][col].nodeId}`);

    var appendImage = document.getElementById(`${row}-${col}`);
    var image = document.createElement("img");
    var att = document.createAttribute("src");
    att.value = "imgs/rat.png";
    image.setAttributeNode(att);
    image.className = "startMouse";
    appendImage.appendChild(image);
}

function observeNodesBFS(){
  var coordinates = queue[0].nodeId;
  coordinates = coordinates.split("-");
  row = parseInt(coordinates[0]), col = parseInt(coordinates[1]);

  // Goes up
  if (row > 1 && (copyOfBoardArray[row - 1][col].nodeType == "unvisited" || copyOfBoardArray[row-1][col].nodeType == "target")){
    foundWay = true;
    row--;
    directions.push("goUp");
    appendPushFunction(row,col);
    row++;
  }
  // Goes Up right
  if (row > 1 && col < 48 && (copyOfBoardArray[row - 1][col + 1].nodeType == "unvisited" || copyOfBoardArray[row - 1][col + 1].nodeType == "target")){
    foundWay = true;
    row--;
    col++;
    directions.push("goUpRight");
    appendPushFunction(row,col);
    col--;
    row++;
  }
  // Goes right
  if (col < 48 && (copyOfBoardArray[row][col + 1].nodeType == "unvisited" || copyOfBoardArray[row][col + 1].nodeType == "target")){
    foundWay = true;
    col++;
    directions.push("goRight");
    appendPushFunction(row,col);
    col--;
  }
  // Goes down right
  if (row < 19 && col < 48 && (copyOfBoardArray[row + 1][col + 1].nodeType == "unvisited" || copyOfBoardArray[row+1][col + 1].nodeType == "target")){
    foundWay = true;
    row++;
    col++;
    directions.push("goDownRight");
    appendPushFunction(row,col);
    col--;
    row--;
  }
  // Goes down
  if (row < 19 && (copyOfBoardArray[row + 1][col].nodeType == "unvisited" || copyOfBoardArray[row+1][col].nodeType == "target")){
    foundWay = true;
    row++;
    directions.push("goDown");
    appendPushFunction(row,col);
    row--;
  }
  // Goes down left
  if (col > 1 && row < 19 && (copyOfBoardArray[row + 1][col - 1].nodeType == "unvisited" || copyOfBoardArray[row + 1][col - 1].nodeType == "target")){
    foundWay = true;
    col--;
    row++;
    directions.push("goDownLeft");
    appendPushFunction(row,col);
    col++;
    row--;
  }
  // Goes left
  if (col > 1 && (copyOfBoardArray[row][col - 1].nodeType == "unvisited" || copyOfBoardArray[row][col - 1].nodeType == "target")){
    foundWay = true;
    col--;
    directions.push("goLeft");
    appendPushFunction(row,col);
    col++;
  }
  // Goes up left
  if (col > 1 && row > 1 && (copyOfBoardArray[row - 1][col - 1].nodeType == "unvisited" || copyOfBoardArray[row - 1][col - 1].nodeType == "target")){
    foundWay = true;
    col--;
    row--;
    directions.push("goUpLeft");
    appendPushFunction(row,col);
    col++;
    row++;
  }
}

// The animation is performed here
var i=0, counter = 2, dirIndex = 1, animated, dataDiv, index = 1, imgs = [], pop = [], image;
function toAnimateFunctionBFS(){
  // Before loop begins
  // if the first operation is pop, make the image fade
  if(toAnimate[i].split(" ")[0] === "pop"){
    dataDiv = document.getElementById(toAnimate[i].split(" ")[1]);
    image = dataDiv.getElementsByClassName("startMouse")[0];
    image.style.animationDuration = `${1}s`;
    image.style.animationFillMode = "forwards";
    image.style.animationName = "cf3FadeInOut2";
    imgs.push(image);

    pop.push(true);
    // queue pop
    var elmt = queueElement.getElementsByTagName("li")[0];
    queueElement.removeChild(elmt);
  }
  // else append a new image with animation to nodeFROM
  else{
    var appendFrom = toAnimate[i].split("_")[0];
    appendFrom = document.getElementById(appendFrom);
    image = document.createElement("img");
    var att = document.createAttribute("src");
    att.value = "imgs/rat.png";
    image.setAttributeNode(att);
    image.className = "firstMouse";
    appendFrom.appendChild(image);

    image.style.animationDuration = `${1}s`;
    image.style.animationFillMode = "forwards";
    image.style.animationName = directions[0];

    imgs.push(image); // for tracking purpose
    pop.push(false);
    //queue push
    var li = document.createElement("li");
    li.style.backgroundColor = "#DE1A0A";
    li.style.color = "white";
    li.style.padding = "2px";
    li.style.fontSize = "13px";
    var text = document.createTextNode(`${toAnimate[0].split("_")[1]}`);
    li.appendChild(text);
    queueElement.appendChild(li);
  }

  i++;

  while(i < toAnimate.length){
    // if needs to pop then push the image that has to be popped
    if(toAnimate[i].split(" ")[0] === "pop"){
      dataDiv = document.getElementById(toAnimate[i].split(" ")[1]);
      image = dataDiv.getElementsByClassName("startMouse")[0];
      imgs.push(image);
      pop.push(true);
    }
    // else append image to the next node with opacity 0 to replace animated animated image
    else{
      var appendFrom = toAnimate[i].split("_")[0];
      appendFrom = document.getElementById(appendFrom);
      image = document.createElement("img");
      var att = document.createAttribute("src");
      att.value = "imgs/rat.png";
      image.setAttributeNode(att);
      image.className = "secondMouse";
      appendFrom.appendChild(image);
      imgs.push(image);

      pop.push(false);

    }
    // Set image animation properties
    imgs[i].style.animationDuration = `${1}s`;
    imgs[i].style.animationFillMode = "forwards";


    imgs[i-1].onanimationend = () => {
      // if previous animation was pop perform substitution (replace animated/moving image (from nodeFROM) with a new image (of nodeTO))
      if(!pop[index -1]){
        var div = document.getElementById(toAnimate[index-1].split("_")[0]);
        var temp = div.getElementsByClassName("firstMouse")[0];
        div.removeChild(temp);

        div = document.getElementById(toAnimate[index-1].split("_")[1]);
        var picture = div.getElementsByClassName("startMouse")[0];
        picture.style.opacity = "1"; // Opacity of the image of nodeTO
      }
      // toAnimate[index] = "pop something", if pop then append shit image and assign fade animation
      if(pop[index]){
        var appendShit = toAnimate[index].split(" ")[1];
        appendShit = document.getElementById(appendShit);
        var imgShit = document.createElement("img");
        var att = document.createAttribute("src");
        att.value = "imgs/shit.jpg";
        imgShit.setAttributeNode(att);
        imgShit.className = "shit";
        appendShit.appendChild(imgShit);

        imgs[index].style.animationName = "cf3FadeInOut2";
        // queue pop
        var elmt = queueElement.getElementsByTagName("li")[0];
        queueElement.removeChild(elmt);
      }
      // toAnimate[index].split("_")[0] moves, assign move animation
      else{
        imgs[index].className = "firstMouse";
        imgs[index].style.animationName = directions[dirIndex];
        dirIndex++;

        var li = document.createElement("li");
        li.style.backgroundColor = "#DE1A0A";
        li.style.color = "white";
        li.style.padding = "2px";
        li.style.fontSize = "13px";
        var text = document.createTextNode(`${toAnimate[index].split("_")[1]}`);
        li.appendChild(text);
        queueElement.appendChild(li);
      }
      index++; // animation index
    }
    i++; // loop index
  }
}
