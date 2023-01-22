window.onload = function(){
    var inputs = document.getElementsByTagName("input");
    var table = document.getElementById("numbers");
    var nums = table.getElementsByTagName("td");
    var board = document.getElementById("board");
    var cells = board.getElementsByTagName("td");
    for(var i =0; i<inputs.length;i++){
        inputs[i].setAttribute("id", i);

        inputs[i].setAttribute("onclick", "clickCell(this)");
        inputs[i].setAttribute("onkeypress", "return onlyNum(event)");
        inputs[i].setAttribute("onkeydown", "numAdded(event, this)");
        inputs[i].setAttribute("onkeyup", "tabActive(event, this)");
        inputs[i].setAttribute("maxlength", "1");
        inputs[i].setAttribute("inputmode", "numeric");
        cells[i].className = "row" + parseInt(i/9) + " col" + i%9;
        if( (i+1)%3==0 && (i+1)%9!=0 ){
            cells[i].className = cells[i].className + " thickCol";
        }
        if( parseInt((i)/9)==2 || parseInt((i)/9)==5 ){
            cells[i].className = cells[i].className + " thickRow";
        }

    }
    for(var j = 0; j<nums.length;j++){
        nums[j].setAttribute("id", (j+1)*100);
        nums[j].setAttribute("onclick", "clickNum(this)");
    }
};
var board = setUpBoard();
var empties = setUpEmpties();

function setUpBoard(){

    var board = [];
    var temp = []
    for(var i = 0; i<9; i++){
        for(var j = 0; j<9; j++){
            temp.push(0);
        }
        board.push(temp);
        temp=[];
    }
    return board
}

function copyBoard(board){

    var solution = [];
    var temp = [];
    for(var i = 0; i<9; i++){
        for(var j = 0; j<9; j++){
            temp.push(board[i][j]);
        }
        solution.push(temp);
        temp=[];
    }
    return solution;
}

function setUpEmpties(){

    var board = [];
    for(var i = 0; i<81; i++){
            board.push(0);
    }
    return board
}

function setUpSolved(){

    var board = [];
    for(var i = 0; i<81; i++){
            board.push(1);
    }
    return board
}


function clickCell(cell){
    var prevActive = document.getElementsByClassName("active");
    if(prevActive.length != 0) {
        var num = prevActive[0].id;
        var row = parseInt(num/9);
        var col = num%9;
        var tdRows = document.getElementsByClassName("row"+row);
        var tdCols = document.getElementsByClassName("col"+col);
        for(var i=0; i<9; i++){
            var cellRows = tdRows[i].firstChild;
            if(cellRows.value == "") cellRows.className = "inactive";
            else cellRows.className = "filled";
            var cellCols = tdCols[i].firstChild;
            if(cellCols.value == "") cellCols.className = "inactive";
            else cellCols.className = "filled";
        }

    }

    var newNum = cell.id;
    var newRow = parseInt(newNum/9);
    var newCol = newNum%9;
    var newTdRows = document.getElementsByClassName("row"+newRow);
    var newTdCols = document.getElementsByClassName("col"+newCol);
    for(var i=0; i<9; i++){
        var newCellRows = newTdRows[i].firstChild;
        if(newCellRows.value == "") newCellRows.className = "included";
        else newCellRows.className = "filled included";
        var newCellCols = newTdCols[i].firstChild;
        if(newCellCols.value == "") newCellCols.className = "included";
        else newCellCols.className = "filled included";
    }
    if(cell.value == "") cell.className = "active";
    else cell.className = "active filled";


}


function onlyNum(e){
    var x = e.which || e.keycode;
            if (x==8||x==9||((x >= 49 && x <= 57)))
                 return true;
             else
                 return false;
}

function numAdded(e, cell){
    var x = e.which || e.keycode;
    var row = parseInt(cell.id/9);
    var col = cell.id%9;
            if ((x >= 49 && x <= 57)){
                var numS = String.fromCharCode(x)
                cell.value = numS;
                cell.className = "active filled"
                board[row][col]= parseInt(numS);
                empties[cell.id] = 1;
  
            }

            else if (x==8){
                cell.value = "";
                board[row][col] = 0;
                empties[cell.id]=0;

            }


}

function tabActive(e, cell){
    var x = e.which || e.keycode;
    if (x==9){
        clickCell(cell);
    }
}

function clickNum(num){
    var number = num.id/100;
    var prevActive = document.getElementsByClassName("active");
    if(prevActive.length != 0) {
        var cell = prevActive[0];
        cell.value = number;
        cell.className = "active filled";
        var row = parseInt(cell.id/9);
        var col = cell.id%9;
        board[row][col]=number;
        empties[cell.id] = 1;
    }
}

function clearCell(){
    var prevActive = document.getElementsByClassName("active");
    if(prevActive.length != 0) {
        var cell = prevActive[0];
        cell.value = "";
        cell.className = "active";
        var row = parseInt(cell.id/9);
        var col = cell.id%9;
        board[row][col]=0;
        empties[cell.id] = 0;
    }
}

function clearBoard(){
    clearCell();
    var prevFilled = document.querySelectorAll(".filled");
    var counter = prevFilled.length;
    for(var i = 0; i < counter; i++){
        prevFilled[i].value = "";
        prevFilled[i].className="inactive";
    }
    board = setUpBoard();
    empties = setUpEmpties();
}

function check(board, row, col, num){
    for(var i=0;i<9;i++){
        if(board[row][i]==num) return false;
        if(board[i][col]==num) return false;
    }

    var rows = parseInt(row/3) ;
    var cols = parseInt(col/3);
    for(var x=0;x<3;x++){
        for(var y=0;y<3;y++){
            if(board[(3*rows)+x][(3*cols)+y] == num) return false;
        }
    }
    return true;
}

function checker(board){
    for(var i=0; i<9; i++){
        for(var j=0; j<9;j++){
            if(board[i][j]!=0){
                var toCheck = board[i][j];
                board[i][j] = 0;
                if(check(board, i, j, toCheck) == false) return false;
                board[i][j] = toCheck;
            }
        }
    }
    return true;
}

function solver(boar){
    for(var i=0; i<9; i++){
        for(var j=0; j<9;j++){
            if(boar[i][j]==0){
                var isTrue = false;
                for(var k=1;k<10;k++){
                    if(check(boar, i, j, k)){
                        boar[i][j]=k;
                        isTrue = solver(boar);
                        if(isTrue) return true;
                    }
                }
                boar[i][j]=0;
                return false;
            }
        }
    }
    return true;
}


function answer(){
    solution = copyBoard(board);
    if(checker(solution) && solver(solution)){
        var active = document.getElementsByClassName("active");
        if(active.length!=0){
            var num = active[0].id;
            var row = parseInt(num/9);
            var col = num%9;
            var tdRows = document.getElementsByClassName("row"+row);
            var tdCols = document.getElementsByClassName("col"+col);
            for(var i=0; i<9; i++){
                var cellRows = tdRows[i].firstChild;
                if(cellRows.value == "") cellRows.className = "inactive";
                else cellRows.className = "filled";
                var cellCols = tdCols[i].firstChild;
                if(cellCols.value == "") cellCols.className = "inactive";
                else cellCols.className = "filled";
            }
        }
        board = solution;
        var cellId = -1;
        var row = -1;
        var col = -1;
        var cell;
        for(var i = 0; i < empties.length; i++){
            if(empties[i] == 0){
                cellId = i;
                cell = document.getElementById(cellId)
                row = parseInt(cellId/9);
                col = cellId % 9;
                cell.value = solution[row][col];
                cell.className = "filled solved";
            }

        }
        empties = setUpSolved();

    }
    else{
        alert("No Solution Found");
    }

}
