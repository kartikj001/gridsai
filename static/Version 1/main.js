$(function(){
	let canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	w = canvas.width = window.innerWidth,
	h =  canvas.height = 800,
	x,y,lastX,lastY;


	
	let mouse = new Vector(0,0);

	// let lx1 = [],
	// 	ly1 = [],
	// 	lx2 = [],
	// 	ly2 = [];

	// let ln = [lx1,ly1,lx2, ly2],
	// 	ln2 = [lx2,ly2];

	let constV = [];
	let constL = [];

	let lastConstV = new Vector(0,0);
	let gridSize = 20;

	let fgridDist,fGridN, fgridD;



	let drawconstLinesBool = true,
	drawgridConstBool = false,
	gridConstoff = false;
	let orientationToggle = 1;
	let originPoint,lastPt,calDist,getnearest,newVtemp;



	let tempGridVA = [];
	let intersectVA = [];
	let tempGridVA2 = [];

	let debugPt = [];

	let outerCorner = [];

	let extraPts = [];

	let wingCoordinates = [];
	let highlighter = false;

////////////////////////////////////////////////////
let getCoordinates =()=>{
	rect = canvas.getBoundingClientRect();
	x = event.clientX - rect.left;
	y = event.clientY - rect.top;	
	mouse.setX(x);
	mouse.setY(y);
}

let fillPolygon = (vectorList, color)=>{
	ctx.beginPath();
	ctx.moveTo(vectorList[0].getX(),vectorList[0].getY());
	for(let i=1; i<vectorList.length; i++){
		ctx.lineTo(vectorList[i].getX(),vectorList[i].getY());

	}		
	ctx.fillStyle = color;
	ctx.fill();	
	ctx.closePath();


}


let getOffsetLine = (lin1, dist, dir) =>{
	let ang1, ang2;
	if(dir ==1){
		ang1= Math.PI/2;
		ang2 = -Math.PI/2;
	}else if(dir ==2){
		ang1= -Math.PI/2;
		ang2 = Math.PI/2;
	}

	let offsetV1 = drawVectorFromPoint(lin1.v1,lin1.v2,ang1,dist);
	let offsetV2 = drawVectorFromPoint(lin1.v2,lin1.v1,ang2,dist);
	let l1 = new Line(offsetV1,offsetV2);
	return l1;

}



let drawVectorFromPoint=(lastv1, lastv2,angle,length)=>{
	let newV = new Vector(0,0);	
	let angle1 = Math.atan2(lastv2.getY()-lastv1.getY(),lastv2.getX()-lastv1.getX());
	newV.setLength(length);
	newV.setAngle(angle1+(angle));							
	newV.addTo(lastv2);
	return newV;
}


let pointOnLine=(line,dist)=>{
	let newV = new Vector(line.v2.getX()-line.v1.getX(),line.v2.getY()-line.v1.getY());
	let newAngle = Math.atan2(line.v2.getY()-line.v1.getY(),line.v2.getX()-line.v1.getX());
	let newLength = Math.abs(line.v2.getLength()-line.v1.getLength());
	newV.setAngle(newAngle+Math.PI);
	newV.setLength(newV.getLength()*(1-dist));
	newV.addTo(line.v2);
	return newV;
}

let pointOnLine2=(line,dist)=>{
	let newV = new Vector(line.v2.getX()-line.v1.getX(),line.v2.getY()-line.v1.getY());
	let newAngle = Math.atan2(line.v2.getY()-line.v1.getY(),line.v2.getX()-line.v1.getX());
	let newLength = Math.abs(line.v2.getLength()-line.v1.getLength());
	newV.setAngle(newAngle+Math.PI);
	newV.setLength(newV.getLength()-dist);
	newV.addTo(line.v2);
	return newV;
}


class Circle{
	constructor(v1, size){
		this.v1 = v1;
		this.col = 'black';
		this.size = size;
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
}


class Line{
	constructor(v1,v2){
		this.v1 = v1;
		this.v2 = v2;
		this.lW = 1;
		this.col = 'black';
		this.pattern = [];
	}
	draw(){
		ctx.beginPath();
		ctx.moveTo(this.v1.getX(),this.v1.getY());
		ctx.lineTo(this.v2.getX(),this.v2.getY());
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
class Corners{
	constructor(v1){
		this.v1 = v1;
		this.radius = 10;
		this.col = 'white';
	}
	draw(){
		ctx.beginPath();
		ctx.arc(this.v1.getX(), this.v1.getY(), this.radius,0,Math.PI*2,false);
		ctx.fillStyle = this.col;
		ctx.setLineDash([]);
		ctx.fill();
		ctx.stroke();
	}
}


	let pushConstCoordinates = () =>{ //done!
		//requires getcoordinates for mouse initialization
		let lastitemno;


		if(drawconstLinesBool){
			
			if(constV.length==0){ /////////snapping to grid size
				let v1 = new Vector();
				v1.setX(mouse.getX());
				v1.setY(mouse.getY());
				constV.push(v1);
			
			}else{
				let v1 = new Vector();
				v1.setX(mouse.getX());
				v1.setY(mouse.getY());
				constV.push(v1);
				lastitemno = constV.length-2;
				let dist = utils.distance(mouse,constV[lastitemno]);

				let clearDist = dist - (dist%gridSize);

				let v2 = new Vector(0,0);
				v2.addTo(constV[lastitemno]);				
				v2.setAngle(Math.atan2(mouse.getY()-constV[lastitemno].getY(), mouse.getX()-constV[lastitemno].getX()));
				v2.setLength(clearDist);
				v2.addTo(constV[lastitemno]);
				constV.pop();
				constV.push(v2);
				

			}

			
			// let v1 = new Vector();
			// v1.setX(mouse.getX());
			// v1.setY(mouse.getY());
			// constV.push(v1);
			// lastitemno = constV.length-2;
			
			
			if(constV[lastitemno]!=undefined){
				let dist = utils.distance(mouse,constV[lastitemno]);
				
				if(dist<20){
					constV.pop();
					for(let i=0; i<constV.length; i++){
						if(constV[i+1]){
							let l1 = new Line(constV[i], constV[i+1]);
							constL.push(l1);							
						}
					}
					
					lastConstV.setX(constV[lastitemno].getX());
					lastConstV.setY(constV[lastitemno].getY());

					drawconstLinesBool=false;
					drawgridConstBool = true;

				}			
			}
		}
	}

	let angleSide;

	let drawGridCoordinatesDraft = () =>{ //done!
		if(drawgridConstBool ==true){

			let gridInt = Math.ceil(utils.distance(lastConstV,mouse)/gridSize);
			let numOfGrid = gridSize*gridInt;

			for(let i=0; i<constL.length; i++){
				for(let j=0; j<gridInt; j++){

					if(lastConstV.getAngle()+(Math.PI/2)>=mouse.getAngle()+(Math.PI/2)){
						let l1 = getOffsetLine(constL[i],j*gridSize,2);
						angleSide = 2;						
						l1.setDashPattern(3,4);
						l1.changeWidth(0.5);				
						l1.draw();

						fGridN = gridInt;
						fgridD = 2;
					}else{
						let l1 = getOffsetLine(constL[i],j*gridSize,1);
						angleSide = 1;
						l1.setDashPattern(3,4);
						l1.changeWidth(0.5);				
						l1.draw();

						fGridN = gridInt;
						fgridD = 1;
						
					}
					
				}
			}



			
		}
	}

	
	let pushGridCoordinates = () =>{
		//push into array final grid on screen on click
		for (let i=0; i<constL.length; i++){
			for(let j=0; j<fGridN; j++){
				let l1 = getOffsetLine(constL[i],j*gridSize,fgridD);
				tempGridVA.push(l1);	

			}
		}

		//first line of array
		for(let i=0; i<tempGridVA.length; i++){	
			if(i<fGridN){
				intersectVA.push(tempGridVA[i].v2);
			}
		}

		// /mid intersections 
		for(let i=0; i<tempGridVA.length; i++){		
			if(tempGridVA[i+fGridN]){
				let p1 = tempGridVA[i].v2;
				let p2 = pointOnLine(tempGridVA[i],(-5));		

				let p3 = tempGridVA[i+fGridN].v1;
				let p4 = pointOnLine(tempGridVA[i+fGridN],(5));

				let intP = utils.segmentIntersect(p1,p2,p3,p4);
				
				intersectVA.push(intP);
			}

		}


		//end items
		for(let i=0; i<tempGridVA.length; i++){		
			if(i>(tempGridVA.length-1)-fGridN){
				intersectVA.push(tempGridVA[i].v1);
			}
		}
		

		//division
		for(let i=0; i<intersectVA.length; i++){
			if (intersectVA[i+fGridN]){			
				if(i%fGridN==0){
					let l1 = new Line(intersectVA[i],intersectVA[i+fGridN]);
					for(let j=1; j<=l1.getLength()-1; j+=gridSize){//j=1 imp for removing first error line

						let vp = pointOnLine2(l1, j);						
						let vp2;							
						if (angleSide==1){
							vp2 = drawVectorFromPoint(l1.v2,vp,-Math.PI/2,gridSize*(fGridN-1));
						}else{
							vp2 = drawVectorFromPoint(l1.v2,vp,Math.PI/2,gridSize*(fGridN-1));
						}						
						tempGridVA2.push(vp);
						tempGridVA2.push(vp2);							
					}


				}				
			}
		}
		
		//inner corner handle
		for(let i=0; i<intersectVA.length; i+=fGridN){
			let interWingIntersection;	
			for(let j=0; j<tempGridVA2.length; j++){	
				if(j%2==0){				
					interWingIntersection = utils.segmentIntersect(intersectVA[i],intersectVA[i+fGridN-1],tempGridVA2[j],tempGridVA2[j+1]);
					if(interWingIntersection!=null){
						if((utils.distance(interWingIntersection,tempGridVA2[j])>gridSize)||utils.distance(interWingIntersection,tempGridVA2[j+1])>gridSize){												
							tempGridVA2[j+1] = interWingIntersection;
												
						}
					}
				}
			}
		}



		//outer corner handle
		for(let i=0; i<intersectVA.length; i+=fGridN){			
			outerCorner.push(intersectVA[i+fGridN-1]);			
		}

		
		for(let i=1;i<outerCorner.length-1; i++){	
			let minDist1 = w;	
			let closestPt1, closestPt2;
			for(let j=0; j<tempGridVA2.length; j++){	
				if(j%2==0){
					if(Math.abs(utils.distance(tempGridVA2[j],tempGridVA2[j+1])-(gridSize*(fGridN-1)))<1){							
						let dist = utils.distance(outerCorner[i],tempGridVA2[j+1]);
						if (minDist1>dist){
							minDist1=dist;
							closestPt1 = tempGridVA2[j+1];
							closestPt2 = tempGridVA2[j-1];
						}
					}
				}
			}
			if(utils.distance(closestPt1, outerCorner[i])>gridSize){
			
				let vp,vp2, vp3, vp4;
				let l1  = new Line(closestPt1, outerCorner[i]);
				for(let j=1; j<=l1.getLength(); j+=gridSize){//j=1 imp for removing first error line
					vp = pointOnLine2(l1, j);						
					vp2;							
					if (angleSide==1){
						vp2 = drawVectorFromPoint(l1.v2,vp,-Math.PI/2,gridSize*(fGridN));
					}else{
						vp2 = drawVectorFromPoint(l1.v2,vp,Math.PI/2,gridSize*(fGridN));
					}
					extraPts.push(vp);
					extraPts.push(vp2);												
				}

				let l2  = new Line(closestPt2, outerCorner[i]);
				
				for(let j=1; j<=l2.getLength(); j+=gridSize){//j=1 imp for removing first error line
					vp3 = pointOnLine2(l2, j);						
					vp4;							
					if (angleSide==1){
						vp4 = drawVectorFromPoint(l2.v2,vp3,Math.PI/2,gridSize*(fGridN));
					}else{
						vp4 = drawVectorFromPoint(l2.v2,vp3,-Math.PI/2,gridSize*(fGridN));
					}
					extraPts.push(vp3);
					extraPts.push(vp4);												
				}
			}
		}


		for(let i=0; i<intersectVA.length; i+=fGridN){				
			let interWingIntersection1;
			if(intersectVA[i+fGridN]){
				for(let j=0; j<extraPts.length; j++){
					if(j%2==0){
						interWingIntersection1 = utils.segmentIntersect(intersectVA[i],intersectVA[i+fGridN-1],extraPts[j],extraPts[j+1]);
						if(interWingIntersection1!=null){						
							extraPts[j+1] = interWingIntersection1;				
							
						}
					}
				}
			}

		}

		//final points
		for (var i = 0; i < extraPts.length; i++) {			
			if(i%2==0){
				let d1 = utils.distance(extraPts[i],extraPts[i+1]);			
				if(d1<(gridSize*(fGridN-1))&&d1>5){
					if(Math.abs(d1-(gridSize*(fGridN-1))<5)){
						let d2 = Math.abs(d1-(gridSize*(fGridN-1)));
						if(d2>=1){
							tempGridVA2.push(extraPts[i]);
							tempGridVA2.push(extraPts[i+1]);
							
						}
					}					
				}
			}

		}

	

		// create intersection points central points

		for(let i=0; i<intersectVA.length; i+=1){
			if(i%fGridN!=0&&i%fGridN!=fGridN-1){
				if(intersectVA[i+fGridN]){
					let l1 = new Line(intersectVA[i],intersectVA[i+fGridN]);
					for (let j=0; j<tempGridVA2.length; j++){
						if(j%2==0){
							let l2 = new Line(tempGridVA2[j],tempGridVA2[j+1]);
							let int = utils.segmentIntersect(l1.v1,l1.v2,l2.v1,l2.v2);
							if(int!=null){
								//debugPt.push(int);
							}
						}
					}
				}
			}

			if(intersectVA[i+fGridN]){
				// let l1 = new Line(intersectVA[i],intersectVA[i+fGridN]);
				// debugPt.push(l1.v1);
				// debugPt.push(l1.v2);
			}
		} 
		
		for(let i=0; i<tempGridVA2.length; i++){
			//debugPt.push(tempGridVA2[i]);
		}

		for(let i=0; i<intersectVA.length; i++){
			if(intersectVA[i+fGridN]){
				if(i%fGridN==0||i%fGridN==fGridN-1){
					let l1 = new Line(intersectVA[i],intersectVA[i+fGridN]);					
					
					wingCoordinates.push(l1.v1);
					wingCoordinates.push(l1.v2);
				}
			}
		}

		
		console.log(wingCoordinates);

		highlighter = true;

	}	


	let highlightWing = () =>{
		

		// let activeWing = [];

		// for(let i=0; i<wingCoordinates.length; i++){			
		// 	let int = utils.segmentIntersect(mouse.getX(), mouse.getY(),wingCoordinates[i].getX(), wingCoordinates[i].getY());
		// 	if(int==null){
		// 		activeWing.push(wingCoordinates[i]);
		// 	}
		// 	// console.log(wingCoordinates[i]);
		// }

		// 	ctx.beginPath();
		// 	ctx.moveTo(activeWing[0].getX(),activeWing[0].getY());
		// 	for(let i=1; i<activeWing.lengthl;i++){
		// 		ctx.lineTo(activeWing[i].getX(), activeWing[i].getY());
		// 	}
		// 	ctx.closePath();
		// 	ctx.fill();


	}


	let drawFinalBaseGrid = () =>{
		

		//horizontals
		for(let i=0; i<intersectVA.length; i++){
			if(intersectVA[i+fGridN]){

				let l1 = new Line(intersectVA[i],intersectVA[i+fGridN]);
				l1.changeCol('orange');
				l1.draw();
			}
		}
		
		//division
		for(let i=0; i<tempGridVA2.length; i++){	
			if(i%2==0){
				let l1 = new Line(tempGridVA2[i],tempGridVA2[i+1]);
				l1.changeCol('red');
				l1.draw();
			}
		}

		//verticals
		for(let i=0; i<intersectVA.length; i+=fGridN){
			let l1 =  new Line(intersectVA[i],intersectVA[i+fGridN-1]);
			l1.changeCol('green');
			l1.draw();
		}

		if(wingCoordinates){
			for(let i=0; i<wingCoordinates.length; i++){
				let c1 = new Circle(wingCoordinates[i],3);
				c1.changeCol('steelblue');
				c1.draw();
			}
		}

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//debug
		if(debugPt){
			for(let i=0; i<debugPt.length; i++){
				let c1 = new Circle(debugPt[i],3);
				c1.changeCol('red');
				c1.draw();
			}
		}
		

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



	}

////////////////////////////////////////////////
let drawconstLines = () =>{
	if(true){
		for(let i=0; i<constV.length; i++){

			if(constV[i+1]){
				let l1 = new Line(constV[i],constV[i+1]);
				l1.draw();
			}

		}
	}
}

let onClick = (event) =>{
	getCoordinates();
	pushConstCoordinates();
	if(drawgridConstBool == true && utils.distance(lastConstV,mouse)>50){
		drawgridConstBool = false;			
		pushGridCoordinates();
	}


};

let onMouseMove = (event) =>{
	if(drawgridConstBool==true){
		getCoordinates();
	}
	if (drawgridConstBool==false&&highlighter==true){
		getCoordinates();
		highlightWing();
	}		

};


canvas.addEventListener('click',onClick,false);
canvas.addEventListener('mousemove',onMouseMove,false);



let render =() =>{
	ctx.clearRect(0,0,w,h);

	drawconstLines();
	drawFinalBaseGrid();
	drawGridCoordinatesDraft();
	requestAnimationFrame(render);
}

render();








});