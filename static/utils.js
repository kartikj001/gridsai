var utils = {
	norm: function(value, min, max) {
		return (value - min) / (max - min);
	},

	lerp: function(norm, min, max) {
		return (max - min) * norm + min;
	},

	map: function(value, sourceMin, sourceMax, destMin, destMax) {
		return utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax);
	},

	clamp: function(value, min, max) {
		return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
	},

	distance: function(p0, p1) {
		var dx = p1.getX() - p0.getX(),
			dy = p1.getY() - p0.getY();
		return Math.sqrt(dx * dx + dy * dy);
	},

	distanceXY: function(x0, y0, x1, y1) {
		var dx = x1 - x0,
			dy = y1 - y0;
		return Math.sqrt(dx * dx + dy * dy);
	},

	circleCollision: function(c0, c1) {
		return utils.distance(c0, c1) <= c0.radius + c1.radius;
	},

	circlePointCollision: function(x, y, circle) {
		return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
	},

	pointInRect: function(x, y, rect) {
		return utils.inRange(x, rect.x, rect.x + rect.width) &&
		       utils.inRange(y, rect.y, rect.y + rect.height);
	},

	

	inRange: function(value, min, max) {
		return value >= Math.min(min, max) && value <= Math.max(min, max);
	},

	rangeIntersect: function(min0, max0, min1, max1) {
		return Math.max(min0, max0) >= Math.min(min1, max1) && 
			   Math.min(min0, max0) <= Math.max(min1, max1);
	},

	rectIntersect: function(r0, r1) {
		return utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
			   utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
	},

	degreesToRads: function(degrees) {
		return degrees / 180 * Math.PI;
	},

	radsToDegrees: function(radians) {
		return radians * 180 / Math.PI;
	},


	lineIntersect:function(p0,p1,p2,p3){
			var A1 = p1.y - p0.y,
				B1 = p0.x - p1.x,
				C1 = A1*p0.x + B1* p0.y,
				A2 = p3.y - p2.y,
				B2 = p2.x - p3.x,
				C2 = A2 * p2.x + B2 *p2.y,
				denominator = A1 * B2 - A2 * B1;
			if(denominator == 0){
				return null;
			}else{
				return  {
					x : (B2 * C1 - B1 * C2)/denominator,
					y : (A1 * C2 - A2 * C1)/denominator
				} 
			}

	},


	segmentIntersect:function(p0, p1, p2, p3) {
	
		var A1 = p1.getY() - p0.getY(),
			B1 = p0.getX() - p1.getX(),
			C1 = A1 * p0.getX() + B1 * p0.getY(),
			A2 = p3.getY() - p2.getY(),
			B2 = p2.getX() - p3.getX(),
			C2 = A2 * p2.getX() + B2 * p2.getY(),
			denominator = A1 * B2 - A2 * B1;

		if(denominator == 0) {
			return null;
		}

		var intersectX = (B2 * C1 - B1 * C2) / denominator,
			intersectY = (A1 * C2 - A2 * C1) / denominator,
			rx0 = (intersectX - p0.getX()) / (p1.getX() - p0.getX()),
			ry0 = (intersectY - p0.getY()) / (p1.getY() - p0.getY()),
			rx1 = (intersectX - p2.getX()) / (p3.getX() - p2.getX()),
			ry1 = (intersectY - p2.getY()) / (p3.getY() - p2.getY());

		if(((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) && 
		   ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
			let v1 = new Vector(intersectX,intersectY);
			return v1;
		}
		else {
			return null;
		}
	},

	randomColor:function(){
		var r = Math.floor(Math.random()*255);
		var g = Math.floor(Math.random()*255);
		var b = Math.floor(Math.random()*255);
		return "rgb("+r+","+g+","+b+")";
	}




}