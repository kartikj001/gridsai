window.onbeforeunload = function(event)
    {
        return confirm("Confirm refresh");
    };
    
window.onload = function(){
	let canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	gridSize = 20,
	w = canvas.width = window.innerWidth-gridSize,
	h =  canvas.height = window.innerHeight-(gridSize*3),
	x,y,lastX,lastY;
	alert('Welcome to Grids-Ai.com. This software is operational only from computer or laptop at the moment.');
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    	getElementById('body').style.display = 'none';
    	
    	
	}	
	let constCol = 'black';

	let infoCol = constCol;
	let draftingLineCol = constCol;
	let gridCirCol = 'black';
	let cellLineCol = 'black';
	let cursorCol = 'black';
	let cursorColLines = 'black';
	let currentColLines = 'black';
	let currentLineThickness = 4;
	let dashLineCol = 'gainsboro';

	
	let spacetobemoved = 'red';
	let spacemoving = 'darkgreen';

	
	let mouse = new Vector(0,0), gMouse = new Vector(0,0);

	let gridVectors = [];	
	

	let allCells = [];

	let dragS, dragE, dragETemp;

	let globAl = 0.2;
	let dragging = false;
	let draftingLine = [];
	let colCode = [];
	
	let selectedCol;
	let minColRange = 100;
	let maxColRange = 150;

	let currentCol = 'rgb('+(Math.floor(Math.random()*minColRange)+minColRange)+','+(Math.floor(Math.random()*maxColRange)+minColRange)+','+(Math.floor(Math.random()*maxColRange)+minColRange)+')';

	let matchProp = false;
	let measure = false;
	let lineWorkToggle = false;
	let lineEraser = false;
	let projectSetup = true;
	let removeCell = false;
	let selSim = false;
	let moveAll = false;
	let colorPicker;
	let scale = 0.5;
	let liveWidth, liveHeight, liveTotal;



	let lineWorkDraftStart = true;
	let templinework = [];
	let fairlineworkV1 = [];
	let fairlineworkV2 = [];
	let fairlineworkcol = [];
	let fairlineworkthk = [];

	let liveLength;

	let texteditor = false;


	let uniqueColCell = [];
	let cellOccurance = [];


	let spaceNames = [];
	let spaceNamesColor = [];
	let areaNames = [];
	let spaceTypeNames = [];

	let setbaseV = [];
	let setbasecol = [];

	let allSameColCell = [];
	let drawTempCell = [];
	let copySpace = false;

	let tempAllCellHolder = [];



	let lastCellStatus = []
	let lastColStatus = []
	///////Experiment////////////
	
	
	
	


	///////////////

	let shuffleBg = document.querySelector('.modalShuffle-bg'); 

////////////////////////////////////////////////////
	let scaler = () =>{
		let scaleVal = document.getElementById("currentCellArea").value;
		
		if(scaleVal == '0.0625'){
			scale = 0.0625;
		}else if (scaleVal == '0.09'){
			scale = 0.09;
		}else if (scaleVal == '0.0225'){
			scale = 0.0225;
		}else if (scaleVal == '0.25'){
			scale = 0.25;
		}else if (scaleVal == '0.36'){
			scale = 0.36;
		}else if (scaleVal == '1'){
			scale = 1;
		}else if (scaleVal == '2.25'){
			scale = 2.25;
		}else if (scaleVal == '4'){
			scale = 4;
		}else if (scaleVal == '6.25'){
			scale = 6.25;
		}else if (scaleVal == '9'){
			scale = 9;
		}else if (scaleVal == '12.25'){
			scale = 12.25;
		}else if (scaleVal == '16'){
			scale = 16;
		}else if (scaleVal == '25'){
			scale = 25;
		}else if (scaleVal == '36'){
			scale = 36;
		}else if (scaleVal == '49'){
			scale = 49;
		}else if (scaleVal == '64'){
			scale = 64;
		}else if (scaleVal == '81'){
			scale = 81;
		}else if (scaleVal == '100'){
			scale = 100;
		}
		else if (scaleVal == '121'){
			scale = 121;
		}
		else if (scaleVal == '144'){
			scale = 144;
		}
		else if (scaleVal == '169'){
			scale = 169;
		}
		else if (scaleVal == '196'){
			scale = 196;
		}
		else if (scaleVal == '225'){
			scale = 225;
		}
		else if (scaleVal == '400'){
			scale = 400;
		}
		else if (scaleVal == '625'){
			scale = 625;
		}
		else if (scaleVal == '2500'){
			scale = 2500;
		}
	}


/////////////////////////////////////////////

const screenShot = () => {
   let image = canvas.toDataURL("static/Img/download/image.png");
   var link = document.createElement('a');
	  link.download = "my-image.png";
	  link.href = image;
	  link.click();
};

const calculateCount = (arr, query) => {
      let count = 0;
      for(let i = 0; i < arr.length; i++){
         if(arr[i] === query){
            count++;
            continue;
      };
      if(Array.isArray(arr[i])){
         count += calculateCount(arr[i], query);
      }
   };
   return count;
};


let getIdbyItemGen = (item, array) =>{
		let id;

		for( i in array){
			if (item==array[i]){
				id=i;
			}
		}
		return id;
	}


let areaTable = document.querySelector(".areaTable");

let getAreaSchedule = ()=>{

	uniqueColCell.splice(0,uniqueColCell.length);
	cellOccurance.splice(0,cellOccurance.length);
	areaTable.innerHTML = "";
	spaceNames.splice(0,spaceNames.length);
	spaceNamesColor.splice(0,spaceNamesColor.length);
	areaNames.splice(0,areaNames.length);
	spaceTypeNames.splice(0,spaceTypeNames.length);


	//create empty table headings
	let titleRow = document.createElement('tr');
	

	let itemTitle = document.createElement('th');
	itemTitle.innerHTML = 'Item';
	titleRow.appendChild(itemTitle);
	
	let nameTitle = document.createElement('th');
	nameTitle.innerHTML = 'Space Name';
	titleRow.appendChild(nameTitle);
	
	let areaTitle = document.createElement('th');
	areaTitle.innerHTML = 'Area';
	titleRow.appendChild(areaTitle);

	let spaceTypeTitle = document.createElement('th');
	spaceTypeTitle.innerHTML = 'Space Type';
	titleRow.appendChild(spaceTypeTitle);

	areaTable.appendChild(titleRow);



	//get number of colors
	for (let i=0; i<colCode.length; i++){
		if(uniqueColCell.includes(colCode[i])==false){
			uniqueColCell.push(colCode[i]);
		}
	}
	//get total items cells in each colors
	for(let i=0; i<uniqueColCell.length; i++){
		let c = calculateCount(colCode,uniqueColCell[i]);
		cellOccurance.push(c);
	}

	
	//create rows
	for(let i=0; i<uniqueColCell.length; i++){
		
			let row = document.createElement('tr');
			let c1 = document.createElement('td');
			let c2 = document.createElement('td');
			let c3 = document.createElement('td');
			let c4 = document.createElement('td');
			let in1 = document.createElement('input');
			let in2 = document.createElement('select');
			let in2option1 = document.createElement('option');
			in2option1.innerHTML = 'Enclosed';
			in2.appendChild(in2option1);

			let in2option2 = document.createElement('option');
			in2option2.innerHTML = 'Balcony';
			in2.appendChild(in2option2);


			let in2option3 = document.createElement('option');
			in2option3.innerHTML = 'Corridor';
			in2.appendChild(in2option3);

			let in2option4 = document.createElement('option');
			in2option4.innerHTML = 'Empty';
			in2.appendChild(in2option4);


			let in2option5 = document.createElement('option');
			in2option5.innerHTML = 'Design';
			in2.appendChild(in2option5);

			let spacetypeClass = 'spacetypename'+i;
			in2.setAttribute('class',spacetypeClass);
			c4.appendChild(in2);



			in1.setAttribute('type','text');

			let className = 'colorName'+i;	
			in1.setAttribute('class',className);			
			in1.setAttribute('value','Room');	
			c2.appendChild(in1);




			c1.style.backgroundColor = uniqueColCell[i];
			let colorNamePair = 'colorPair'+i;
			c1.setAttribute('class',colorNamePair);
			row.appendChild(c1);
			row.appendChild(c2);
			let ucellarea = (cellOccurance[i]*scale).toFixed(2);
			c3.innerHTML = ucellarea+" SQM";
			let areaClass = 'areaClass'+i;
			c3.setAttribute('class',areaClass);
			row.appendChild(c3);
			row.appendChild(c4);
			areaTable.appendChild(row);		

	}

	


}


let insertElement = (index,array, element)=> {
    for (let i = array.length; i > index; i--) {
        array[i] = array[i-1];
    }
    array[index] = element;
   
}


let getCoordinates =()=>{
	rect = canvas.getBoundingClientRect();
	x = event.clientX - rect.left;
	y = event.clientY - rect.top;	
	mouse.setX(x);
	mouse.setY(y);
}


let getGridCoordinates = () =>{
	let xf = mouse.getX()%gridSize;
	let yf = mouse.getY()%gridSize;
	let gMouse = new Vector(mouse.getX()-xf, mouse.getY()-yf);
	return gMouse;
}

let getGridCoordinatesFrLine = () =>{
	let xf = mouse.getX()%gridSize;
	let yf = mouse.getY()%gridSize;
	let gMouse1 = new Vector(mouse.getX()-xf, mouse.getY()-yf);
	let gMouse2 = new Vector((mouse.getX()-xf)+gridSize, (mouse.getY()-yf));
	let gMouse3 = new Vector((mouse.getX()-xf)+gridSize, (mouse.getY()-yf)+gridSize);
	let gMouse4 = new Vector((mouse.getX()-xf), (mouse.getY()-yf)+gridSize);
	
	let dist1 = utils.distance(mouse, gMouse1);
	let dist2 = utils.distance(mouse, gMouse2);
	let dist3 = utils.distance(mouse, gMouse3);
	let dist4 = utils.distance(mouse, gMouse4);

	if(dist4<dist1&&dist4<dist2&&dist4<dist3){
		return gMouse4;
	}else if(dist3<dist1&&dist3<dist2&&dist3<dist4){
		return gMouse3;
	}else if(dist2<dist1&&dist2<dist3&&dist2<dist4){
		return gMouse2;
	}else{
		return gMouse1;
	}

}



class Circle{
	constructor(v1, size){
		this.v1 = v1;
		this.col = 'black';
		this.size = size;
		this.strokeStyle = 'black';
	}
	draw(){
		ctx.beginPath();
		ctx.arc(this.v1.getX(), this.v1.getY(), this.size, 0,Math.PI*2, false);
		ctx.fillStyle = this.col;
		ctx.fill();
		
	}
	changeCol(newC){
		this.col = newC;
	}

	onStroke(){
		ctx.stroke();
	}
}


class Line{
	constructor(v1,v2){
		this.v1 = v1;
		this.v2 = v2;
		this.lW = 1;
		this.col = cellLineCol;
		this.pattern = [];
		this.cap = 'square';
	}
	draw(){
		ctx.beginPath();
		ctx.moveTo(this.v1.getX(),this.v1.getY());
		ctx.lineTo(this.v2.getX(),this.v2.getY());
		ctx.lineCap = this.cap;
		ctx.setLineDash(this.pattern);
		ctx.lineWidth = this.lW;
		ctx.strokeStyle = this.col;
		ctx.stroke();
	}
	changeCol(newC){
		this.col = newC;
	}
	changeWidth(newW){
		this.lW = newW;
	}
	setDashPattern(x,y){
		this.pattern = [x,y];
	}
	getLength(){
		let v3 = new Vector(this.v2.getX()-this.v1.getX(),this.v2.getY()-this.v1.getY())
		return v3.getLength()
	}
	setV1(val){
		this.v1 = val;
	}
	setV2(val){
		this.v2 = val;
	}

}


class Cell{
	constructor(v1, coll){
		this.v1 = v1;
		this.v2 = new Vector(this.v1.getX()+gridSize, this.v1.getY());
		this.v3 = new Vector(this.v1.getX()+gridSize, this.v1.getY()+gridSize);;
		this.v4 = new Vector(this.v1.getX(), this.v1.getY()+gridSize);
		this.lineWidth = 0.5;
		this.col = coll;
		this.l1 = new Line(this.v1, this.v2);
		this.l2 = new Line(this.v2, this.v3);
		this.l3 = new Line(this.v3, this.v4);
		this.l4 = new Line(this.v4, this.v1);
	}

	draw(){
	
		ctx.beginPath();
		ctx.rect(this.v1.getX(),this.v1.getY(),gridSize,gridSize);		
		ctx.fillStyle = this.col;
		ctx.fill();	
		if(true){
			this.l1.changeWidth(0.2);
			this.l2.changeWidth(0.2);
			this.l3.changeWidth(0.2);
			this.l4.changeWidth(0.2);

			this.l1.draw();
			this.l2.draw();
			this.l3.draw();
			this.l4.draw();
		}	
		
	}

	changeCol(newC){
		this.col = newC;
	}

	getSide(line){
		if(line=='l1'||line==1){
			return this.l1;
		}else if(line=='l2'||line==2){
			return this.l2;
		}else if(line=='l3'||line==3){
			return this.l3;
		}else if(line=='l4'||line==4){
			return this.l4;
		}
	}

	changeSideWidth(line, num){
		let temL = this.getSide(line);
		temL.changeWidth(num);	
	}

	changeSideCol(line, col){
		let temL = this.getSide(line);
		temL.changeCol(col);	
	}

}

///////////////////////////////////
	
let createGrid = () =>{
	for(let i=0; i<w; i+=gridSize){
		for(let j=0; j<h; j+=gridSize){
			let newV = new Vector(i,j);		
			let c = new Circle(newV,1);
			c.changeCol(gridCirCol);
			c.draw();
		}		
	}
}


let removeCells = (newV) =>{
	for(let k=0; k<allCells.length; k++){		
		if (allCells[k].getX()==newV.getX()&&allCells[k].getY()==newV.getY()){	
			allCells.splice(k,1);
			colCode.splice(k,1);							
		}
	}
}


let drawCellDraftingLines = () =>{
	
	for (let i=0; i<draftingLine.length; i++){

		draftingLine[i].setDashPattern(3,8);
		draftingLine[i].changeWidth(3);
		draftingLine[i].changeCol(draftingLineCol);
		draftingLine[i].draw();

	}
}


let drawLineWorkTemp = () =>{
	for(let i=0; i<templinework.length; i++){
		templinework[i].setDashPattern(3,3);
		templinework[i].changeWidth(5);
		templinework[i].changeCol(currentColLines);
		templinework[i].draw();

	}
}

let drawLineWorkFinal = () =>{
	for(let i=0; i<fairlineworkV1.length; i++){
		if(fairlineworkV2[i]){
			let l1 = new Line(fairlineworkV1[i], fairlineworkV2[i]);
			l1.changeCol(fairlineworkcol[i]);
			l1.changeWidth(fairlineworkthk[i]);
			l1.draw();
		}
		
	}
}

let itemIncludes = (item, arrayV)=>{
	let result;
	for(let i=0; i<arrayV.length; i++){
		if (item.getX()==arrayV[i].getX()&&item.getY()==arrayV[i].getY()){
			result = true;
			break;
		}else{
			result = false;
		}
	}
	return result;
}


let itemIncludesId = (item, arrayV)=>{
	let iD;
	for(let i=0; i<arrayV.length; i++){
		if (item.getX()==arrayV[i].getX()&&item.getY()==arrayV[i].getY()){
			iD = i;
			break;
		}
	}
	return iD;
}


let getIdByItem=(item, arrayV)=>{
	for(let i=0; i<arrayV.length; i++){
		if (item.getX()==arrayV[i].getX()&&item.getY()==arrayV[i].getY()){
			return i;
		}
	}
}


let checkAndAdd = (newV) =>{
	if(allCells[0]==undefined||itemIncludes(newV,allCells)==false){
		allCells.push(newV);
		colCode.push(currentCol);
	}else{
		let id = getIdByItem(newV, allCells);
		colCode[id] = currentCol;
	}
	
}

let checkAndEraseLine = () =>{
	
	for(let i=0; i<fairlineworkV1.length; i++){
		if ((utils.distance(mouse,fairlineworkV1[i])+utils.distance(mouse,fairlineworkV2[i]))-(utils.distance(fairlineworkV1[i], fairlineworkV2[i]))<5){
			fairlineworkV1.splice(i,1);
			fairlineworkV2.splice(i,1);
			fairlineworkcol.splice(i,1);
			fairlineworkthk.splice(i,1);

			
			
			if(fairlineworkV1.length!=fairlineworkV2.length||fairlineworkthk.length!=fairlineworkV1.length){
				alert("rougue nation");
				deleteallButton();
			}
			break;
			
		}
	}
}




///////////////////////////
let onMouseDown = (event) =>{
	getCoordinates();
	
	gMouse = getGridCoordinates();
	dragS = gMouse;

	if(matchProp){
		dragging = false;
		let id = getIdByItem(dragS,allCells);
		if(colCode[id]!=undefined){
			colorPicker = colCode[id];
		}	
		matchProp = false;
		currentCol = colorPicker;
	}else if(lineWorkToggle&&lineEraser==false&&moveAll==false){
		gMouse = getGridCoordinatesFrLine();
		dragS = gMouse;
		dragging = true;
		lineWorkDraftStart = true;
		
		fairlineworkV1.push(dragS);
	}else if(lineEraser==false&&selSim==false&&moveAll==false){
		
		
		dragging = true;
	}else if(lineEraser==false&&selSim==true&&moveAll==false){
		dragging=true;
		if (itemIncludes(gMouse,allCells)){
			let id  = itemIncludesId(gMouse,allCells);
			selectedCol = colCode[id];			
			for (let i=0; i<allCells.length; i++){
				if (colCode[i]==selectedCol){
					allSameColCell.push(allCells[i]);

				}
			}

		}else{
			selSim=false;
		}
	}else if(lineEraser==false&&selSim==false&&moveAll==true){
		dragging=true;
		for(let i=0; i<allCells.length; i++){
			tempAllCellHolder.push(allCells[i]);
		}
	}
};

let onMouseMove = (event) =>{
	let currentV = new Vector(mouse.getX(), mouse.getY());
	
	if(dragging==true&&lineWorkToggle==false&&selSim==false&&moveAll==false){
		getCoordinates();
		gMouse = getGridCoordinates();
		draftingLine.splice(0,draftingLine.length);

		let dragX = (gMouse.getX()-dragS.getX());
		let dragY = (gMouse.getY()-dragS.getY());

		
		if(dragX>=0&&dragY>=0){	
			dragETemp = new Vector(gMouse.getX()+gridSize,gMouse.getY()+gridSize);
			let l1 = new Line(dragS,dragETemp);				

			let v1 = new Vector(l1.v1.getX(),l1.v1.getY());
			let v2 = new Vector(l1.v1.getX()+(l1.v2.getX()-v1.getX()),v1.getY());
			let v3 = new Vector(l1.v2.getX(),l1.v2.getY());
			let v4 = new Vector(l1.v1.getX(),l1.v1.getY()+(l1.v2.getY()-v1.getY()));
			let l2 = new Line(v1,v2);
			let l3 = new Line(v2,v3);
			let l4 = new Line(v3,v4);
			let l5 = new Line(v4,v1);
			
			liveWidth = (l2.getLength()/gridSize);
			liveHeight = (l3.getLength()/gridSize);
			
			draftingLine.push(l2);
			draftingLine.push(l3);
			draftingLine.push(l4);
			draftingLine.push(l5);
		

			
		}else if(dragX<0&&dragY>=0){	
			dragETemp = new Vector(gMouse.getX(),gMouse.getY()+gridSize);
			let nv = new Vector(dragS.getX()+gridSize, dragS.getY());
			let l1 = new Line(nv,dragETemp);	
			
			let v1 = new Vector(l1.v1.getX(),l1.v1.getY());
			let v2 = new Vector(l1.v1.getX()+(l1.v2.getX()-v1.getX()),v1.getY());
			let v3 = new Vector(l1.v2.getX(),l1.v2.getY());
			let v4 = new Vector(l1.v1.getX(),l1.v1.getY()+(l1.v2.getY()-v1.getY()));
			let l2 = new Line(v1,v2);
			let l3 = new Line(v2,v3);
			let l4 = new Line(v3,v4);
			let l5 = new Line(v4,v1);
		
			liveWidth = (l2.getLength()/gridSize);
			liveHeight = (l3.getLength()/gridSize);
		
			draftingLine.push(l2);
			draftingLine.push(l3);
			draftingLine.push(l4);
			draftingLine.push(l5);
			


		}else if(dragX>=0&&dragY<0){	
			dragETemp = new Vector(gMouse.getX()+gridSize,gMouse.getY());
			let nv = new Vector(dragS.getX(), dragS.getY()+gridSize);
			let l1 = new Line(nv,dragETemp);	

			let v1 = new Vector(l1.v1.getX(),l1.v1.getY());
			let v2 = new Vector(l1.v1.getX()+(l1.v2.getX()-v1.getX()),v1.getY());
			let v3 = new Vector(l1.v2.getX(),l1.v2.getY());
			let v4 = new Vector(l1.v1.getX(),l1.v1.getY()+(l1.v2.getY()-v1.getY()));
			let l2 = new Line(v1,v2);
			let l3 = new Line(v2,v3);
			let l4 = new Line(v3,v4);
			let l5 = new Line(v4,v1);
			
			liveWidth = (l2.getLength()/gridSize);
			liveHeight = (l3.getLength()/gridSize);
	
			draftingLine.push(l2);
			draftingLine.push(l3);
			draftingLine.push(l4);
			draftingLine.push(l5);
			
			

		}else if(dragX<0&&dragY<0){	
			dragETemp = new Vector(gMouse.getX(),gMouse.getY());
			let nv = new Vector(dragS.getX()+gridSize, dragS.getY()+gridSize);
			let l1 = new Line(nv,dragETemp);	
			

			let v1 = new Vector(l1.v1.getX(),l1.v1.getY());
			let v2 = new Vector(l1.v1.getX()+(l1.v2.getX()-v1.getX()),v1.getY());
			let v3 = new Vector(l1.v2.getX(),l1.v2.getY());
			let v4 = new Vector(l1.v1.getX(),l1.v1.getY()+(l1.v2.getY()-v1.getY()));
			let l2 = new Line(v1,v2);
			let l3 = new Line(v2,v3);
			let l4 = new Line(v3,v4);
			let l5 = new Line(v4,v1);
			
			liveWidth = (l2.getLength()/gridSize);
			liveHeight = (l3.getLength()/gridSize);
			
			draftingLine.push(l2);
			draftingLine.push(l3);
			draftingLine.push(l4);
			draftingLine.push(l5);
			
		}

		
		
	}else if(dragging==true&&lineWorkToggle==true&&lineEraser==false&&selSim==false&&moveAll==false){
		
		getCoordinates();
		gMouse = getGridCoordinatesFrLine();
		templinework.splice(0,templinework.length);
		let l1 = new Line(dragS,gMouse);
		templinework.push(l1);
		liveLength = l1.getLength()/gridSize;
	}else if(dragging==true&&lineWorkToggle==false&&selSim==true&&lineEraser==false&&moveAll==false){
		getCoordinates();
		drawTempCell.splice(0,drawTempCell.length);
		draftingLine.splice(0,draftingLine.length);
		gMouse = getGridCoordinatesFrLine();
		dragTE = gMouse;
		let changedTV = new Vector(dragTE.getX()-dragS.getX(), dragTE.getY()-dragS.getY());
		
		if(copySpace==true){
			for(let i=0; i<allSameColCell.length; i++){
 				let id = itemIncludesId(allSameColCell[i], allCells); 				
 				colCode[id] = selectedCol;
 			}

		}else{
			for(let i=0; i<allSameColCell.length; i++){
 				let id = itemIncludesId(allSameColCell[i], allCells); 				
 				if(utils.distance(dragTE,dragS)>gridSize){
 					colCode[id] = spacetobemoved;
 				}else{
 					colCode[id] = selectedCol;
 				}
 			}

		}

		

		for (let i=0; i<allSameColCell.length; i++){
			let changedTCID = itemIncludesId(allSameColCell[i],allCells);
			let newTV = new Vector(allCells[changedTCID].getX()+changedTV.getX(), allCells[changedTCID].getY()+changedTV.getY());

			drawTempCell.push(newTV);
		}
		let tL = new Line(dragS,dragTE);
		draftingLine.push(tL);
	}else if(dragging==true&&lineWorkToggle==false&&selSim==false&&lineEraser==false&&moveAll==true){
		getCoordinates();
		drawTempCell.splice(0,drawTempCell.length);
		draftingLine.splice(0,draftingLine.length);
		gMouse = getGridCoordinatesFrLine();
		dragTE = gMouse;
		let changedTV = new Vector(dragTE.getX()-dragS.getX(), dragTE.getY()-dragS.getY());
		for(let i=0; i<tempAllCellHolder.length; i++){
			let newTV = new Vector(tempAllCellHolder[i].getX()+changedTV.getX(), tempAllCellHolder[i].getY()+changedTV.getY());
			drawTempCell.push(newTV);

		}
		let tL = new Line(dragS,dragTE);
		draftingLine.push(tL);
	}



};


let onMouseUp = (event) =>{
	if(measure==false){
		if(dragging==true&&lineWorkToggle==false&&selSim==false&&moveAll==false){
			getCoordinates();
			gMouse = getGridCoordinates();
			dragE = gMouse;	
			let dragX = (dragE.getX()-dragS.getX());
			let dragY = (dragE.getY()-dragS.getY());
			for(let i=0; i<=Math.abs(dragX); i+=gridSize){
				for(let j=0; j<=Math.abs(dragY); j+=gridSize){
					if(dragX>1&&dragY>1){
						let newV = new Vector(dragS.getX()+i, dragS.getY()+j);
						if(removeCell){
							removeCells(newV);				
						}else{
							checkAndAdd(newV);
						}
					}else if(dragX<1&&dragY>1){
						let newV = new Vector(dragS.getX()-i, dragS.getY()+j);
						if(removeCell){
							removeCells(newV);	
						}else{
							checkAndAdd(newV);
						}
					}else if(dragX>1&&dragY<1){
						let newV = new Vector(dragS.getX()+i, dragS.getY()-j);
						if(removeCell){
							removeCells(newV);	
						}else{
							checkAndAdd(newV);
						}
					}else if(dragX<1&&dragY<1){
						let newV = new Vector(dragS.getX()-i, dragS.getY()-j);
						if(removeCell){
							removeCells(newV);	
						}else{
							checkAndAdd(newV);
						}
					}
				}
			}
		}else if(dragging==true&&lineWorkToggle==true&&lineEraser==false&&selSim==false&&moveAll==false){
			getCoordinates();
			gMouse = getGridCoordinatesFrLine();
			dragE = gMouse;			
			fairlineworkV2.push(dragE);
			fairlineworkcol.push(currentColLines);
			fairlineworkthk.push(currentLineThickness);
		}else if(dragging==true&&lineWorkToggle==false&&lineEraser==false&&selSim==true&&moveAll==false){
			getCoordinates();
			gMouse = getGridCoordinatesFrLine();
			dragE = gMouse;
			if(utils.distance(dragS,dragE)>gridSize){
				let newRandCol = 'rgb('+(Math.floor(Math.random()*maxColRange)+minColRange)+','+(Math.floor(Math.random()*maxColRange)+minColRange)+','+(Math.floor(Math.random()*maxColRange)+minColRange)+')';
				if(copySpace){
					selectedCol = newRandCol;
				}

				let changedV = new Vector(dragE.getX()-dragS.getX(), dragE.getY()-dragS.getY());
				
				for (let i=0; i<allSameColCell.length; i++){				
					let changedCID = itemIncludesId(allSameColCell[i],allCells);
					let newV = new Vector(allCells[changedCID].getX()+changedV.getX(), allCells[changedCID].getY()+changedV.getY());					
					if(itemIncludes(newV, allCells)){
						let ids  = itemIncludesId(newV,allCells);					
						if(selectedCol!=colCode[ids]){
							allCells.splice(ids,1);
							colCode.splice(ids,1);					
							insertElement(ids, allCells, newV);
							insertElement(ids, colCode, selectedCol);
						}else if(selectedCol==colCode[ids]){
							insertElement(changedCID, allCells, newV);						
							insertElement(changedCID, colCode, selectedCol);
						}
						
					}else{
						insertElement(changedCID, allCells, newV);					
						insertElement(changedCID, colCode, selectedCol);						
					}			
							
	 			}
	 			if(copySpace==false){
		 			for(let i=0; i<allSameColCell.length; i++){
		 				let id = itemIncludesId(allSameColCell[i], allCells);
		 				if(colCode[id]!=selectedCol){
		 					allCells.splice(id,1);
		 					colCode.splice(id,1);	
		 				}
		 				
		 			}
		 		}
		 	}
		}else if(dragging==true&&lineWorkToggle==false&&lineEraser==false&&selSim==false&&moveAll==true){

			getCoordinates();
			gMouse = getGridCoordinatesFrLine();
			dragE = gMouse;
			let changedV = new Vector(dragE.getX()-dragS.getX(), dragE.getY()-dragS.getY());
			for (let i=0; i<allCells.length; i++){
				let newV = new Vector(allCells[i].getX()+changedV.getX(), allCells[i].getY()+changedV.getY());
				
				allCells[i] = new Vector(newV.getX(),newV.getY());
			}
			
		}



		
	}
	if(lineEraser){
		checkAndEraseLine();		
	}
		dragging=false;	
		draftingLine.splice(0,draftingLine.length);
		// measure=false;
		templinework.splice(0,templinework.length);
		allSameColCell.splice(0, allSameColCell.length);
		drawTempCell.splice(0,drawTempCell.length);
		tempAllCellHolder.splice(0,tempAllCellHolder.length);




}



canvas.addEventListener('pointerdown',onMouseDown,false);
canvas.addEventListener('pointermove',onMouseMove,false);
canvas.addEventListener('pointerup',onMouseUp,false);


// document.addEventListener('touchstart', onMouseDown);
// document.addEventListener('touchmove', onMouseMove);
// document.addEventListener('touchend', onMouseUp);

////////////////////////

let matchButtonFunction = () =>{
	if(allCells.length!=0){
		matchProp = true;
		measure = false;
		lineWorkToggle = false;
		lineEraser = false;
		removeCell = false;
		selSim=false;
		moveAll=false;
	}
}


let addRemoveFunction = () =>{
	matchProp = false;
	measure = false;
	lineWorkToggle = false;
	lineEraser = false;
	selSim=false;
	removeCell = true;
	moveAll=false;

}



let lineToggleButton = () =>{
	matchProp = false;
	measure = false;
	lineWorkToggle = true;
	lineEraser = false;
	selSim=false;
	removeCell = false;
	moveAll=false;

  	
}

let simSpaceFunction = () =>{

	matchProp = false;
	measure = false;
	lineWorkToggle = false;
	lineEraser = false;
	selSim = true
	removeCell = false;
	copySpace=false;
	moveAll=false;

}


let moveAllFunction = () =>{

	matchProp = false;
	measure = false;
	lineWorkToggle = false;
	lineEraser = false;
	selSim = false
	removeCell = false;
	copySpace=false;
	moveAll=true;


}

let copySpaceFunction = () =>{

	matchProp = false;
	measure = false;
	lineWorkToggle = false;
	lineEraser = false;
	selSim = true
	removeCell = false;
	copySpace=true;
	moveAll=false;

}


let newSpaceFunction = () =>{

	matchProp = false;
	measure = false;
	lineWorkToggle = false;
	lineEraser = false;
	selSim=false;
	removeCell = false;
	moveAll=false;
	currentCol='rgb('+(Math.floor(Math.random()*maxColRange)+minColRange)+','+(Math.floor(Math.random()*maxColRange)+minColRange)+','+(Math.floor(Math.random()*maxColRange)+minColRange)+')';  


}



let deleteallButton = () =>{

	measure = false;
	lineWorkToggle = false;
	lineEraser = false;
	removeCell = false;
	selSim=false;
	moveAll=false;
	if (confirm('Are you sure you want to delete everything?')) {
	  	allCells.splice(0,allCells.length);
	   	colCode.splice(0,colCode.length);
	   	fairlineworkV2.splice(0,fairlineworkV2.length);
	   	fairlineworkV1.splice(0,fairlineworkV1.length);
	   	fairlineworkcol.splice(0,fairlineworkcol.length);
	   	fairlineworkthk.splice(0,fairlineworkthk.length);
	   	spaceNames.splice(0,spaceNames.length);
		spaceNamesColor.splice(0,spaceNamesColor.length);
		areaNames.splice(0,areaNames.length);
		spaceTypeNames.splice(0,spaceTypeNames.length);
	} else {
	  // Do nothing!
	 
	}

	
   	
   	
}


let lineEraserButton = () =>{

	measure = false;
	lineWorkToggle = false;	
	selSim=false;
	removeCell = false;
	lineEraser = true;
  	moveAll=false;
}


let measureButton =()=>{
	measure=true;
	lineWorkToggle = false;
	lineEraser = false;
	selSim=false;
	removeCell = false;
	moveAll=false;
	if(lineWorkToggle){
		alert("Command inactive when Line command active. ");
	}
}



let saveLineFunction =()=>{
	selSim=false;
	measure = false;
	lineWorkToggle = false;
	lineEraser = false;
	removeCell = false;
	moveAll=false;
	currentColLines = document.getElementById("colorpicker").value;
	currentLineThickness = document.getElementById("lineStyle").value;
	lineToggleButton();
}





//////////////////////////

let msg = document.getElementById("active-command");
msg.innerHTML = "Please setup grid before getting started."


document.getElementById("addremove").addEventListener("click", function() {
  	addRemoveFunction();
  	msg.innerHTML = "Remove Cell -> Click and Drag"
}); 



document.getElementById("lineToggle").addEventListener("click", function() {
  	lineToggleButton();
  	msg.innerHTML = "Add Line -> Click and Drag";
}); 



document.getElementById("lineEraser").addEventListener("click", function() {  	
	lineEraserButton();
	msg.innerHTML = "Remove Line -> single click per line";
}); 



document.getElementById("newspace").addEventListener("click", function() {  	
  	newSpaceFunction(); 
  	msg.innerHTML = "Add Cell with Random Color -> Click and Drag";  	
}); 




document.getElementById("selSimilar").addEventListener("click", function() {  	
  	simSpaceFunction(); 
  	msg.innerHTML = "Move Cells with same color together -> Click and Drag";  	
}); 



document.getElementById("copySpace").addEventListener("click", function() {  	
  	copySpaceFunction(); 
  	msg.innerHTML = "Copy Cells with same color together -> Click and Drag";  	
}); 


document.getElementById("deleteall").addEventListener("click", function() {
	deleteallButton();
	msg.innerHTML = "Deleted All !";
}); 



document.getElementById("moveAll").addEventListener("click", function() {
	moveAllFunction();
	msg.innerHTML = "Move Cells -> Click and Drag";
}); 




document.getElementById("measure").addEventListener("click", function() {
	measureButton();
	msg.innerHTML = "Measure Cell Dimensions -> Click and Drag";
}); 



document.getElementById("match").addEventListener("click", function() {
	matchButtonFunction();
	msg.innerHTML = "Match Cell Color. Click on a cell to pick a color, then click and drag to draw.";
}); 



let takesnap = false;
document.getElementById("downloadSn").addEventListener("click", function() {
	takesnap = true;
	msg.innerHTML = "Snapshot Taken!"
	
});


//////////////////keyboard
document.addEventListener('keydown', function(event) {
    if (texteditor==false){

	    if(event.keyCode == 90) {//z
	       	newSpaceFunction(); 
	  		msg.innerHTML = "Add Cell with Random Color -> Click and Drag"; 
	    }
	    else if(event.keyCode == 88) {//x
	        addRemoveFunction();
	  		msg.innerHTML = "Remove Cell -> Click and Drag"
	    }else if(event.keyCode == 65) {//a
	        matchButtonFunction();
			msg.innerHTML = "Match Cell Color. Click on a cell to pick a color, then click and drag to draw.";
	    }else if(event.keyCode == 83) {//s
	        measureButton();
			msg.innerHTML = "Measure Cell Dimensions -> Click and Drag";
	    }else if(event.keyCode == 81) {//q
	        lineToggleButton();
	  		msg.innerHTML = "Add Line -> Click and Drag";
	    }else if(event.keyCode == 87) {//w
	        lineEraserButton();
			msg.innerHTML = "Remove Line -> single click per line";
	    }else if(event.keyCode == 79) {//o
	       shuffleBg.classList.add('bgShuffle-active');
	    }else if(event.keyCode == 70) {//f
	       	simSpaceFunction(); 
	  		msg.innerHTML = "Move Cells with same color together -> Click and Drag"; 
	    }else if(event.keyCode == 68) {//d
	        copySpaceFunction(); 
	  		msg.innerHTML = "Copy Cells with same color together -> Click and Drag";
	    }else if(event.keyCode == 71) {//g
	        moveAllFunction(); 
	  		msg.innerHTML = "Move All Cells -> Click and Drag";
	    }
	}

});


////////////////DD modal/////////

// let ddBg = document.querySelector('.modalDD-bg'); 
// document.getElementById("directdesign").addEventListener("click", function() {		  
// 	ddBg.classList.add('bgDD-active');		
// }); 

// document.getElementById("DDCancel").addEventListener("click", function() {
// 	ddBg.classList.remove('bgDD-active');
// });



////////////project modal
let projBg = document.querySelector('.modalProj-bg'); 
document.getElementById("projSetup").addEventListener("click", function() {
	if (confirm('Once you change the grid size, then all areas will get scaled accordingly.')) {	  
		projBg.classList.add('bgProj-active');
		msg.innerHTML = "Click on any button to initiate command.";
	} else {
	  // Do nothing!
	 
	}


}); 

document.getElementById("save-proj-setup").addEventListener("click", function() {
	scaler();		
	projBg.classList.remove('bgProj-active');
});


/////documentation modal
let docBg = document.querySelector('.modalDoc-bg'); 
document.getElementById("documentation").addEventListener("click", function() {
	msg.innerHTML = "Click on any button to initiate command.";
	if (confirm('This command will write the Space Names and Areas as per latest update. Are you sure you want to continue?')) {
	  	texteditor=true;
	  	getAreaSchedule();
		docBg.classList.add('bgDoc-active');
	} else {
	  // Do nothing!
	 
	}
	

}); 

document.getElementById("save-doc-setup").addEventListener("click", function() {
	for(let i=0; i<uniqueColCell.length; i++){		
		let roomName = document.querySelector('.colorName'+i).value;
		let roomNameCol = document.querySelector('.colorPair'+i).style.backgroundColor;
		let areaClassNumber = document.querySelector('.areaClass'+i).innerHTML;
		let spaceType  = document.querySelector('.spacetypename'+i).selectedOptions[0].value;
		if(spaceNamesColor.includes(roomNameCol)==false){
			spaceNames.push(roomName);
			spaceNamesColor.push(roomNameCol);
			areaNames.push(areaClassNumber);
			spaceTypeNames.push(spaceType);
		}
	}


	texteditor=false;
	docBg.classList.remove('bgDoc-active');
});

/////lines modal
let lineBg = document.querySelector('.modalLine-bg'); 
document.getElementById("lines").addEventListener("click", function() {
	lineBg.classList.add('bgLine-active');
	msg.innerHTML = "Add Line -> Click and Drag";
	
}); 

document.getElementById("save-line-setup").addEventListener("click", function() {
	lineBg.classList.remove('bgLine-active');
	saveLineFunction();
});

///////////////////////////
////////help modal

let helpBg = document.querySelector('.modalHelp-bg'); 
document.getElementById("help").addEventListener("click", function() {
	helpBg.classList.add('bgHelp-active');
	msg.innerHTML = "";
	
}); 

document.getElementById("save-help-setup").addEventListener("click", function() {
	helpBg.classList.remove('bgHelp-active');
	
});
//////////////////////////////////////////////


///////////////////////////
////////caution modal

let cautionBg = document.querySelector('.modalCaution-bg'); 
document.getElementById("caution").addEventListener("click", function() {
	cautionBg.classList.add('bgCaution-active');
	
	
}); 

document.getElementById("cautionCancel").addEventListener("click", function() {
	cautionBg.classList.remove('bgCaution-active');
	
});











////////About modal

let aboutBg = document.querySelector('.modalAbout-bg'); 
document.getElementById("about").addEventListener("click", function() {
	aboutBg.classList.add('bgAbout-active');
	msg.innerHTML = "";
	
}); 

document.getElementById("save-About-setup").addEventListener("click", function() {
	aboutBg.classList.remove('bgAbout-active');
	
});
//////////////////////////////////////////////



/////////automatemodal

let automateBg = document.querySelector('.modalAutomate-bg'); 
document.getElementById("automate").addEventListener("click", function() {
	automateBg.classList.add('bgAutomate-active');
	msg.innerHTML = "";
	
}); 


document.getElementById("automateCancel").addEventListener("click", function() {
	automateBg.classList.remove('bgAutomate-active');
	
});



document.getElementById("automation").addEventListener("click", function() {
	
	if(spaceNamesColor.length>0){
		let goahead = true;
		
		

		if(goahead){

			let toSend = [];

			for (let i=0; i<allCells.length; i++){
				let spcN,spCA, spST;
				
				for (let j=0; j<spaceNamesColor.length; j++){
						
					let colString2 = spaceNamesColor[j].replace(/ /g,'');
					
					if(colCode[i]==colString2){
						spcN = spaceNames[j];
						spCA = areaNames[j];
						spST = spaceTypeNames[j];
						samecheck = true;

					}				
					
				}
				
			

				let obj1 = {
					"x":allCells[i].getX(),
					"y":allCells[i].getY(),		
					"c":colCode[i], 
					"g":gridSize,
					"s":scale,
					"sp":spcN,
					"st":spST,
					"a":spCA
				}
			
				toSend.push(obj1);
			}



			let jsonString = JSON.stringify(toSend);
			let xhttp  = new XMLHttpRequest();



			xhttp.onreadystatechange = function(){
				if (this.readyState == 4 && this.status == 200) {    	
				   
				    let today = new Date();
					let dd = String(today.getDate()).padStart(2, '0');
					let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
					let yyyy = today.getFullYear();
					today = mm + '/' + dd + '/' + yyyy;
				    let dataIn = xhttp.response;

				    let element = document.createElement('a');
					element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataIn));
					element.setAttribute('download', today+".dxf");
					element.style.display = 'none';
					document.body.appendChild(element);
					element.click();
					document.body.removeChild(element);	
				}
			}
			xhttp.open("POST", "/automate", true);
			xhttp.setRequestHeader("Content-type", "application/json");
			xhttp.send(jsonString);
			// console.log(jsonString);		
		}
	}else{
		alert('Kindly first confirm the spaces type and name to continue. To do this kindly click on Annotate/Confirm Space type and names.')
	}

	
		automateBg.classList.remove('bgAutomate-active');

});




//////shufflemodal



document.getElementById("shuffle").addEventListener("click", function() {
	shuffleBg.classList.add('bgShuffle-active');
	msg.innerHTML = "";
	
}); 

document.getElementById("shuffleCancel").addEventListener("click", function() {
	shuffleBg.classList.remove('bgShuffle-active');
	
});


let minX ,minY,maxX, maxY;
document.getElementById("shuffler").addEventListener("click", function() {
	let goahead=true;


	if(goahead){
		if(allCells.length>0){

			let toSend = [];
			if(minX==undefined){
				minX =w,minY=h,maxX=0, maxY=0;
				for(let i=0; i<allCells.length; i++){
					let vT = new Vector(allCells[i].getX(), allCells[i].getY());
					if (vT.getX()>maxX){
						maxX = vT.getX();
					}
					if (vT.getY()>maxY){
						maxY = vT.getY();
					}
					if (vT.getX()<minX){
						minX = vT.getX();
					}
					if (vT.getY()<minY){
						minY = vT.getY();
					}
				}
			}

			// if(uniqueColCell.length==0){
			uniqueColCell.splice(0,uniqueColCell.length);
			cellOccurance.splice(0,cellOccurance.length);
				for (let i=0; i<colCode.length; i++){
					if(uniqueColCell.includes(colCode[i])==false){
						
						uniqueColCell.push(colCode[i]);
					}
				}
				for(let i=0; i<uniqueColCell.length; i++){
					let c = calculateCount(colCode,uniqueColCell[i]);
					if(c==1){
						c=Math.floor(Math.random()*24)+12;
						if (c%2==0){
							cellOccurance.push(c);				
						}else{
							cellOccurance.push(c+1);
						}
					}else{
						cellOccurance.push(c);
					}
				}
			// }




			for (i=0; i<uniqueColCell.length; i++){
			
				let obj1 = {
					"c": uniqueColCell[i],
					"n": cellOccurance[i],		
					"g": gridSize, 
					"minX":minX,
					"minY":minY,
					"maxX":maxX,
					"maxY":maxY			
				}
				toSend.push(obj1);
			}



			let jsonString = JSON.stringify(toSend);
			let xhttp  = new XMLHttpRequest();

			xhttp.onreadystatechange = function(){
				if (this.readyState == 4 && this.status == 200) {    	
				     // console.log(xhttp.response)
				     let importedJSON = JSON.parse(xhttp.response)
				     let totalitems = allCells.length;
				
				    
					     allCells.splice(0,allCells.length);
					     colCode.splice(0,colCode.length);

					     for (let i=0; i<importedJSON.length; i++){		     	
						    let v1 = new Vector(importedJSON[i].x,importedJSON[i].y);		     
					     	let c1 = importedJSON[i].c;		     
					     	if (itemIncludes(v1,allCells)){
					     		let id  = itemIncludesId(v1,allCells);		     		  
					     		allCells.splice(id,1);
					     		colCode.splice(id,1);		     		
					     	}
					     		allCells.push(v1);
					     		colCode.push(c1);	     	
					     	
					     }
					
				
				 }
			}

			xhttp.open("POST", "/shuffle", true);
			xhttp.setRequestHeader("Content-type", "application/json");
			
			xhttp.send(jsonString);
			// console.log(jsonString);
			
		}
	}
		shuffleBg.classList.remove('bgShuffle-active');

});




/////////////////////////

// document.getElementById("brush").style.backgroundColor = currentCol;
// document.getElementById("brush").style.color = currentCol;
// document.getElementById("title2").style.color = currentCol;
// document.getElementById("secondTop-bar").style.backgroundColor = currentCol;


let render =() =>{
	

	ctx.clearRect(0,0,w,h);
	scaler();
	
	// document.getElementById("brush").style.backgroundColor = currentCol;
	// document.getElementById("brush").style.color = currentCol;
	// document.getElementById("title2").style.color = currentCol;
	// document.getElementById("secondTop-bar").style.backgroundColor = currentCol;


	for(let i=0; i<allCells.length; i++){
		let c = new Cell(allCells[i], colCode[i]);		
		c.draw();
	}

	if(selSim==true||moveAll==true){
		for (let i=0; i<drawTempCell.length; i++){
			let tempC = new Cell(drawTempCell[i], spacemoving);
			tempC.draw();
		}
		drawCellDraftingLines();
	}


	drawLineWorkFinal();
	

	if(dragging==true&&lineWorkToggle==false&&selSim==false&&moveAll==false){		
		drawCellDraftingLines();
		ctx.font = "15px Arial";
		ctx.fillStyle=cursorCol;
		ctx.fillText((liveWidth*Math.sqrt(scale)).toFixed(2)+" x "+(liveHeight*Math.sqrt(scale)).toFixed(2)+" m", mouse.getX()+20, mouse.getY()+20); 
		ctx.fillText(((liveWidth*Math.sqrt(scale))*3.28).toFixed(2)+" x "+((liveHeight*Math.sqrt(scale))*3.28).toFixed(2)+" ft", mouse.getX()+20, mouse.getY()+40); 
	}else if(dragging==true&&lineWorkToggle==true&&selSim==false&&moveAll==false){
		drawLineWorkTemp();
		ctx.font = "15px Arial";
		ctx.fillStyle=cursorCol;
		ctx.fillText((liveLength*Math.sqrt(scale)).toFixed(2)+" m", mouse.getX()+20, mouse.getY()+20); 
		ctx.fillText(((liveLength*Math.sqrt(scale))*3.28).toFixed(2)+" ft", mouse.getX()+20, mouse.getY()+40); 
	}



	

	ctx.font = "15px Arial";
	ctx.fillStyle=infoCol;
	
		
		
		if(spaceNamesColor.length>0){
			ctx.fillText("--- Area Statement ---", 5,95);
			for( let i=0; i<spaceNamesColor.length; i++){
				let cV = new Vector(10,110+(i*18));
				let cC = new Circle(cV, 7);
				cC.changeCol(spaceNamesColor[i]);
				cC.draw();
				ctx.font = "15px Arial";
				ctx.fillStyle=infoCol;
				ctx.fillText("=> "+spaceNames[i]+" ("+areaNames[i]+")"+" - "+spaceTypeNames[i], 20,115+(i*18));
			
			}
		}


		if(takesnap){
			screenShot();

			takesnap=false;
		}

		let targetArea = document.querySelector("#target").value;

		let ConsumedA = (colCode.length*scale).toFixed(2);

		let conTarPer = (w)*(ConsumedA/targetArea);

		let statusH = 5;
		let statusS = 5;
		let bgV1 = new Vector(statusS,statusH);
		let bgV2 = new Vector(w,statusH);
		let bgLine = new Line(bgV1,bgV2);
		bgLine.changeWidth(20);
		bgLine.changeCol(dashLineCol);
		bgLine.draw();

		let cnV1 = new Vector(statusS+2.5,statusH+2.5);
		let cnV2 = new Vector(statusS+2.5+(conTarPer),statusH+2.5);
		let cnLine = new Line(cnV1,cnV2);
		cnLine.changeWidth(10);
		cnLine.changeCol(currentCol);
		cnLine.draw();


		ctx.fillText("Target = "+targetArea+" SQM",  5,35);
		ctx.fillText("Consumed = "+ConsumedA+" SQM", 5,55);		
		ctx.fillText("Grid = "+Math.sqrt(scale)+" x "+Math.sqrt(scale)+" M", 5,75);
		//createGrid();



		
	
	requestAnimationFrame(render);
}

render();








};