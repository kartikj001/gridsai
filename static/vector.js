class Vector{
	
	constructor(x,y){
		this._x = x;
		this._y = y;
		var obj = Object.create(this);
		obj.setX(x);
		obj.setY(y);
		return obj;
	}

	setX(value){
		this._x = value;
	}

	setY(value){
		this._y = value;
	}

	getX(){
		return this._x;
	}

	getY(){
		return this._y;
	}


	setAngle(angle){
		var length = this.getLength();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	}


	getAngle(){
		return Math.atan2(this._y, this._x);
	}

	getLength(){
		return Math.sqrt(this._x * this._x + this._y * this._y);
	}


	setLength(length){
		var angle = this.getAngle();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	}


	add(v2){
		return vector.create(this._x+v2.getX(), this._y+v2.getY());
	}

	subtract(v2){
		return vector.create(this._x-v2.getX(), this._y-v2.getY());
	}

	multiply(val){
		return vector.create(this._x*val, this._y*val);
	}

	divide(val){
		return vector.create(this._x/val, this._y/val);
	}


	addTo(v2){
		this._x += v2.getX();
		this._y += v2.getY();
	}

	
	subtractFrom(v2){
		this._x -= v2.getX();
		this._y -= v2.getY();
	}	

	multiplyBy(val){
		this._x *=val;
		this._y *=val;
	}

	divideBy(val){
		this._x /= val;
		this._y /= val;
	}


};