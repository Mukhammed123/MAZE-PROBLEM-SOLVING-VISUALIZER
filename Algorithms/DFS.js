var stack = [], copyOfNodes = [], copyOfBoardArray = [], foundWay = false, gotCheese=false, toAnimate = [], prev = "", directions = [], stackEvents = [], sevt, stackIndex = 0;

var stackElement = document.getElementsByClassName("stack")[0];
var stackElement = stackElement.getElementsByTagName("ul")[0];
stackElement.style.width = "88%";
stackElement.style.padding = "5%";
stackElement.style.position = "absolute";
stackElement.style.left = "0";
stackElement.style.listStyle = "none";
stackElement.style.overflow = "hidden";
stackElement.style.textAlign = "center";

function runDFS(nodes, arrayBoard){
  var stack_or_queue = document.getElementsByTagName("h3")[0];
  stack_or_queue.textContent = "Stack";
  stack_or_queue.style.right = "10%";

  stackElement.style.transform = "rotate(180deg)";
  stackElement.getElementsByTagName("li")[0].style.transform = "rotate(180deg)";
  copyOfNodes = nodes;
  copyOfBoardArray = arrayBoard;
  stack.push(copyOfBoardArray[1][1]);

  while(stack.length > 0){
    foundWay = false;
    prev = stack[stack.length - 1].nodeId;
    observeNodes();
    // Calculate direction to backtrack
    if(!foundWay && stack.length > 1){
      stackEvents.push(`pop ${stack[stack.length - 1].nodeId}`);
      stack.pop();
      toAnimate.push(`${prev}_${stack[stack.length - 1].nodeId}`);
      var coordinates = toAnimate[toAnimate.length-1].split("_");
      var c1 = Number(coordinates[0].split("-")[1]),  r1 = Number(coordinates[0].split("-")[0]);
      var c2 = Number(coordinates[1].split("-")[1]), r2 = Number(coordinates[1].split("-")[0]);
      // Goes left
      if(r1 === r2 && c1 > c2)
        directions.push("goLeft");
      else if(r1 === r2 && c1 < c2)
        directions.push("goRight");
      else if(r1 > r2 && c1 === c2)
        directions.push("goUp");
      else if(r1 < r2 && c1 === c2)
        directions.push("goDown");
      else if(r1 > r2 && c1 > c2)
        directions.push("goUpLeft");
      else if(r1 < r2 && c1 < c2)
        directions.push("goDownRight");
      else if(r1 < r2 && c1 > c2)
        directions.push("goDownLeft");
      else if(r1 > r2 && c1 < c2)
        directions.push("goUpRight");
    }
    else if(stack.length == 1){
      stackEvents.push(`pop ${stack[stack.length - 1].nodeId}`);
      stack.pop();
    }

    else if(prev !== copyOfBoardArray[row][col].nodeId)
      toAnimate.push(`${prev}_${copyOfBoardArray[row][col].nodeId}`);

    if(gotCheese)
      break;
  }
  toAnimateFunction();
}

var row, col;
function observeNodes(){
  var i = stack.length - 1;
  var index = stack[i].nodeId;
  var currentNode = stack[i];
  var coordinates = index.split("-");
  row = parseInt(coordinates[0]), col = parseInt(coordinates[1]);

  // Goes up
  if (row > 1 && (copyOfBoardArray[row - 1][col].nodeType == "unvisited" || copyOfBoardArray[row-1][col].nodeType == "target")){
    foundWay = true;
    row--;
    directions.push("goUp");
    if (copyOfBoardArray[row][col].nodeType == "target")
      gotCheese = true;
  }
  // Goes Up right
  else if (row > 1 && col < 48 && (copyOfBoardArray[row - 1][col + 1].nodeType == "unvisited" || copyOfBoardArray[row - 1][col + 1].nodeType == "target")){
    foundWay = true;
    row--;
    col++;
    directions.push("goUpRight");
    if (copyOfBoardArray[row][col].nodeType == "target")
      gotCheese = true;
  }
  // Goes right
  else if (col < 48 && (copyOfBoardArray[row][col + 1].nodeType == "unvisited" || copyOfBoardArray[row][col + 1].nodeType == "target")){
    foundWay = true;
    col++;
    directions.push("goRight");
    if (copyOfBoardArray[row][col].nodeType == "target")
      gotCheese = true;
  }
  // Goes down right
  else if (row < 19 && col < 48 && (copyOfBoardArray[row + 1][col + 1].nodeType == "unvisited" || copyOfBoardArray[row+1][col + 1].nodeType == "target")){
    foundWay = true;
    row++;
    col++;
    directions.push("goDownRight");
    if (copyOfBoardArray[row][col].nodeType == "target")
      gotCheese = true;
  }
  // Goes down
  else if (row < 19 && (copyOfBoardArray[row + 1][col].nodeType == "unvisited" || copyOfBoardArray[row+1][col].nodeType == "target")){
    foundWay = true;
    row++;
    directions.push("goDown");
    if (copyOfBoardArray[row][col].nodeType == "target")
      gotCheese = true;
  }
  // Goes down left
  else if (col > 1 && row < 19 && (copyOfBoardArray[row + 1][col - 1].nodeType == "unvisited" || copyOfBoardArray[row + 1][col - 1].nodeType == "target")){
    foundWay = true;
    col--;
    row++;
    directions.push("goDownLeft");
    if (copyOfBoardArray[row][col].nodeType == "target")
      gotCheese = true;
  }
  // Goes left
  else if (col > 1 && (copyOfBoardArray[row][col - 1].nodeType == "unvisited" || copyOfBoardArray[row][col - 1].nodeType == "target")){
    foundWay = true;
    col--;
    directions.push("goLeft");
    if (copyOfBoardArray[row][col].nodeType == "target")
      gotCheese = true;
  }
  // Goes up left
  else if (col > 1 && row > 1 && (copyOfBoardArray[row - 1][col - 1].nodeType == "unvisited" || copyOfBoardArray[row - 1][col - 1].nodeType == "target")){
    foundWay = true;
    col--;
    row--;
    directions.push("goUpLeft");
    if (copyOfBoardArray[row][col].nodeType == "target")
      gotCheese = true;
  }

  if(foundWay){
    copyOfBoardArray[row][col].nodeType = "visited";
    copyOfBoardArray[row][col].edges = `${currentNode.nodeId}_${copyOfBoardArray[row][col].nodeId}`;
    stackEvents.push(`push ${copyOfBoardArray[row][col].nodeId}`);
    stack.push(copyOfBoardArray[row][col]);
  }
}


var i=0, coordinates, dataDiv, index, imgs = [], hide = 0;
function toAnimateFunction(){
  index = 0;
  var img = document.getElementsByClassName("startMouse")[i];
  img.className = "firstMouse";
  img.style.animationDuration = `${1}s`;
  img.style.animationFillMode = "forwards";
  img.style.animationName = `${directions[index]}`;
  imgs.push(img);

  // push the position of the rat in to the stack
  sevt = stackEvents[index].split(" ")[0];
  var li = document.createElement("li");
  li.style.transform = "rotate(180deg)";
  li.style.backgroundColor = "#DE1A0A";
  li.style.color = "white";
  li.style.padding = "2px";
  // li.style.listStyle = "none";
  if(sevt === "push"){
    li.style.fontSize = "13px";
    var text = document.createTextNode(`${toAnimate[index].split("_")[1]}`);
    li.appendChild(text);
    stackElement.appendChild(li);
  }
  else if(sevt === "pop"){
    var elmts = stackElement.getElementsByTagName("li");
    elmts = elmts[elmts.length - 1];
    stackElement.removeChild(elmts);
  }
  index++;
  while(i < toAnimate.length){

    var appendTo = toAnimate[i].split("_")[1];
    appendTo = document.getElementById(appendTo);
    var image = document.createElement("img");
    var att = document.createAttribute("src");
    att.value = "imgs/rat.png";
    image.setAttributeNode(att);
    image.className = "secondMouse";
    appendTo.appendChild(image);
    imgs.push(image);

    imgs[i].style.animationDuration = `${1}s`;
    imgs[i].style.animationFillMode = "forwards";

    imgs[i].onanimationend = () => {
      // replacing rats process
      imgs[index].className = "firstMouse";
      imgs[index].style.animationName = `${directions[index]}`;
      imgs[index-1].style.opacity = "0";

      // Setting shit's attributes
      var shit = document.createElement("img");
      var att = document.createAttribute("src");
      att.value = "imgs/shit.jpg";
      shit.setAttributeNode(att);
      shit.className = "shit";

      // push the position of the rat in to the stack
      if(index < stackEvents.length){
        sevt = stackEvents[index].split(" ")[0];
        var li = document.createElement("li");
        li.style.transform = "rotate(180deg)";
        li.style.backgroundColor = "#DE1A0A";
        li.style.color = "white";
        li.style.padding = "2px";

        var styles = window.getComputedStyle(stackElement);
        var height = Number(styles.height.split("px")[0]); // height of the stack
        var data = stackElement.getElementsByTagName("li"); // all stack items
        // li.style.listStyle = "none";
        if(sevt === "push"){

          li.style.fontSize = "13px";
          var text = document.createTextNode(`${toAnimate[index].split("_")[1]}`);
          li.appendChild(text);
          stackElement.appendChild(li);
          // hide li overflow
          if(height > 520){
            data[hide].style.display = "none";
            hide++;
          }
        }
        // show hidden li
        else if(sevt === "pop"){
          var elmts = stackElement.getElementsByTagName("li");
          elmts = elmts[elmts.length - 1];
          stackElement.removeChild(elmts);

          if(height < 520 && hide > 0){
            hide--;
            data[hide].style.display = "list-item";
          }
        }
      }

      // check if index is less tha toAnimate length, append shit image
      if(index < toAnimate.length){
        from = toAnimate[index].split("_")[0]; to = toAnimate[index].split("_")[1];
        dataDiv = document.getElementById(`${from}`);
        dataDiv.appendChild(shit);
      }
      // index for animation end
      index++;
    }
    i++;
  }
}
