import math

class Vector:

	def __init__(self, x, y):
		self.x = x
		self.y = y

	def setX(self,value):
		self.x = value

	def getX(self):
		return self.x

	def setY(self,value):
		self.y = value

	def getY(self):
		return self.y

	def setAngle(self,angle):
		length = self.getLength()
		self.x = math.cos(angle) * length
		self.y = math.sin(angle) * length


	def getAngle(self):
		return math.atan2(self.y,self.x)

	def getLength(self):
		return math.sqrt(self.x*self.x + self.y*self.y)


	def setLength(self,length):
		angle = self.getAngle()
		self.x = math.cos(angle) * length
		self.y = math.sin(angle) * length


	def add(self, v2):
		return Vector(self.x+v2.getX(), self.y+v2.getY())


	def subtract(self, v2):
		return Vector(self.x-v2.getX(), self.y-v2.getY())


	def multiply(self,val):
		return Vector(self.x*val, self.y*val)

	def divide(self,val):
		return Vector(self.x/val, self.y/val)

	def addTo(self,v2):
		self.x += v2.getX()
		self.y += v2.getY()


	def subtractFrom(self,v2):
		self.x -= v2.getX()
		self.y -= v2.getY()


	def multiplyBy(self, val):
		self.x *= val
		self.y *= val

	def divideBy(self,val):
		self.x /= val
		self.y /= val



