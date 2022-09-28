from vector import *


class Line:
	def __init__(self,v1,v2):
		self.v1 = v1
		self.v2 = v2

def drawVectorFromPoint(lastv1, lastv2,angle,length):
	newV = Vector(0,0)
	angle1 = math.atan2(lastv2.getY()-lastv1.getY(),lastv2.getX()-lastv1.getX())
	newV.setLength(length);
	newV.setAngle(angle1+(angle));							
	newV.addTo(lastv2);
	return newV

def getOffsetVectors(v1,v2, dist, dir):
	offsetV1 = drawVectorFromPoint(v1,v2,Math.PI/2,dist)
	v4 = Vector(v2.getX(),v2.getY())
	v5 = Vector(v1.getX(),v1.getY())
	offsetV2 = drawVectorFromPoint(v4,v5,-Math.PI/2,dist)
	return {offsetV1:offsetV1,offsetV2:offsetV2}




def pointOnLine(line,dist):
	newV = Vector(line.v2.getX()-line.v1.getX(),line.v2.getY()-line.v1.getY())
	newAngle = math.atan2(line.v2.getY()-line.v1.getY(),line.v2.getX()-line.v1.getX())
	newLength = abs(line.v2.getLength()-line.v1.getLength())
	newV.setAngle(newAngle+math.pi)
	newV.setLength(newV.getLength()*(1-dist))
	newV.addTo(line.v2)
	return newV



##################################################################

def norm(value, min, max):
	return (value - min)/(max-min)

def lerp(norm, min, max):
	return (max - min) * norm + min;


def map(value, sourceMin, sourceMax, destMin, destMax):
	return utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax)
	

def clamp(value, min, max):
	return math.min(math.max(value, math.min(min, max)), math.max(min, max));


def distance(p0, p1):
	dx = p1.getX() - p0.getX()
	dy = p1.getY() - p0.getY()
	return math.sqrt(dx * dx + dy * dy)

def distanceXY(x0, y0, x1, y1):
	dx = x1 - x0
	dy = y1 - y0
	return math.sqrt(dx * dx + dy * dy)

def circleCollision(c0, c1):
	return utils.distance(c0, c1) <= c0.radius + c1.radius

def circlePointCollision(x, y, circle):
	return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius


def pointInRect(x, y, rect):
	if(utils.inRange(x, rect.x, rect.x + rect.width) and utils.inRange(y, rect.y, rect.y + rect.height)):
		return True
	else:
		return False
	

def inRange(value, min, max):
	if (value >= Math.min(min, max) and value <= Math.max(min, max)):
		return True
	else:
		return False

def rangeIntersect(min0, max0, min1, max1):
	if(math.max(min0, max0) >= Math.min(min1, max1) and math.min(min0, max0) <= Math.max(min1, max1)):
		return True
	else:
		return False 

def rectIntersect(r0, r1):
	if (utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) and utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height)):
		return True
	else:
		return False 

def degreesToRads(degrees):
	return degrees / 180 * math.PI

def radsToDegrees(radians):
	return radians * 180 / math.PI


def lineIntersect(p0,p1,p2,p3):
		A1 = p1.getY() - p0.getY()
		B1 = p0.getX() - p1.getX()
		C1 = A1*p0.getX() + B1* p0.getY()
		A2 = p3.getY() - p2.getY()
		B2 = p2.getX() - p3.getX()
		C2 = A2 * p2.getX() + B2 *p2.getY()
		denominator = A1 * B2 - A2 * B1
		if(denominator == 0):
			return None
		else:
			v1 = Vector((B2 * C1 - B1 * C2)/denominator,(A1 * C2 - A2 * C1)/denominator)
			return v1

	


def segmentIntersect(l1,l2):
	p0 = l1.v1
	p1 = l1.v2
	p2 = l2.v1
	p3 = l2.v2

	A1 = p1.getY() - p0.getY()
	B1 = p0.getX() - p1.getX()
	C1 = A1 * p0.getX() + B1 * p0.getY()
	A2 = p3.getY() - p2.getY()
	B2 = p2.getX() - p3.getX()
	C2 = A2 * p2.getX() + B2 * p2.getY()
	denominator = A1 * B2 - A2 * B1
	if(denominator == 0):
		return False
	
	intersectX = (B2 * C1 - B1 * C2) / denominator
	intersectY = (A1 * C2 - A2 * C1) / denominator
	rx0 = (intersectX - p0.getX()) / (p1.getX() - p0.getX())
	ry0 = (intersectY - p0.getY()) / (p1.getY() - p0.getY())
	rx1 = (intersectX - p2.getX()) / (p3.getX() - p2.getX())
	ry1 = (intersectY - p2.getY()) / (p3.getY() - p2.getY())

	if(((rx0 >= 0 and rx0 <= 1) or (ry0 >= 0 and ry0 <= 1)) and ((rx1 >= 0 and rx1 <= 1) or (ry1 >= 0 and ry1 <= 1))):
		v1 = Vector(intersectX,intersectY)
		return v1
	else:
		return False


