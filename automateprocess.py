import json
from random import *
from utils import *
import ezdxf
import os
from ezdxf import units
import secrets
from datetime import date

class Line:
	def __init__(self, v1, v2):		
		self.v1 = v1
		self.v2 = v2
		

	def draw(self,modelspace, layerName):
		self.modelspace = modelspace
		self.layerName = layerName
		self.modelspace.add_line((self.v1.getX(),self.v1.getY()),(self.v2.getX(),self.v2.getY()),dxfattribs={'layer': self.layerName})

	def getLength(self):
		v3 = Vector(self.v2.getX()-self.v1.getX(),self.v2.getY()-self.v1.getY())
		return v3.getLength()

	def setV1(self,val):
		self.v1 = val;
	
	def setV2(self,val):
		self.v2 = val;



def itemIncludesId(item, arrayV):
	iD = 0
	for i in range(0,(len(arrayV))):
		if (item.getX()==arrayV[i].getX() and item.getY()==arrayV[i].getY()):
			iD = i;
			break
		
	return iD;


def itemIncludes(item,arrayV):
	result = False
	for i in range(0,(len(arrayV))):
		if (item.getX()==arrayV[i].getX() and item.getY()==arrayV[i].getY()):
			result=True
			break
		else:
			result=False
	return result





def getOffsetLine(lin1, dist, dir):
	ang1 =0
	ang2 =0
	if(dir ==1):
		ang1= math.pi/2;
		ang2 = -math.pi/2;
	elif(dir ==2):
		ang1= -math.pi/2;
		ang2 = math.pi/2;
	

	offsetV1 = drawVectorFromPoint(lin1.v1,lin1.v2,ang1,dist)
	offsetV2 = drawVectorFromPoint(lin1.v2,lin1.v1,ang2,dist)
	l1 = Line(offsetV1,offsetV2)
	return l1





def drawVectorFromPoint(lastv1, lastv2,angle,length):
	newV = Vector(0,0)
	angle1 = math.atan2(lastv2.getY()-lastv1.getY(),lastv2.getX()-lastv1.getX())
	newV.setLength(length)
	newV.setAngle(angle1+(angle))							
	newV.addTo(lastv2)
	return newV



def pointOnLine(line,dist):
	newV = Vector(line.v2.getX()-line.v1.getX(),line.v2.getY()-line.v1.getY())
	newAngle = math.atan2(line.v2.getY()-line.v1.getY(),line.v2.getX()-line.v1.getX())
	newLength = abs(line.v2.getLength()-line.v1.getLength())
	newV.setAngle(newAngle+math.pi)
	newV.setLength(newV.getLength()*(1-dist))
	newV.addTo(line.v2)
	return newV


def pointOnLine2(line,dist):
	newV = Vector(line.v2.getX()-line.v1.getX(),line.v2.getY()-line.v1.getY())
	newAngle = math.atan2(line.v2.getY()-line.v1.getY(),line.v2.getX()-line.v1.getX())
	newLength = abs(line.v2.getLength()-line.v1.getLength())
	newV.setAngle(newAngle+math.pi)
	newV.setLength(newV.getLength()-dist)
	newV.addTo(line.v2)
	return newV


def isequal(v1,v2):

	if (v1.getX()==v2.getX() and v1.getY()==v2.getY()):
		return True	
	elif (v1.getX()!=v2.getX() or v1.getY()!=v2.getY()):
		return False
	



def isLineEqual(l1,l2):
	judge = False
	if (isequal(l1.v1,l2.v1) and isequal(l1.v2,l2.v2)):
		judge = True
	elif(isequal(l1.v1,l2.v2) and isequal(l1.v2,l2.v1)):
		judge = True	
	return judge
			

		
		

def isLineInArray(line,array):
	judge = False
	for i in range(len(array)):
		if(isLineEqual(line, array[i])):			
			judge=True
	
	return judge

	


def get_borders(vectorList, gridsize):
		borderCL = []#cleaned boundries	
		allCells = []#all cells final from input
		borderV = []#final output
		borderLineV1 = []#process1
		borderLineV2 = []
		borderFLineV1 = []#final output
		borderFLineV2 = []

		#create cells on the basis of starting points
		for i in range(len(vectorList)):
			v1 = Vector(vectorList[i].getX(),vectorList[i].getY())
			v2 = Vector(vectorList[i].getX()+gridsize,vectorList[i].getY())
			v3 = Vector(vectorList[i].getX()+gridsize,vectorList[i].getY()+gridsize)
			v4 = Vector(vectorList[i].getX(),vectorList[i].getY()+gridsize)
			v = [v1,v2,v3,v4]
			allCells.append(v)

		#get boundries		
		for i in range(len(allCells)):
			leftV = Vector(allCells[i][0].getX()-gridsize,allCells[i][0].getY())
			rightV = Vector(allCells[i][0].getX()+gridsize,allCells[i][0].getY())
			bottomV = Vector(allCells[i][0].getX(),allCells[i][0].getY()+gridsize)
			topV = Vector(allCells[i][0].getX(),allCells[i][0].getY()-gridsize)
			leftCheck = itemIncludes(leftV,vectorList)
			rightCheck = itemIncludes(rightV,vectorList)
			topCheck = itemIncludes(topV,vectorList)
			bottomCheck = itemIncludes(bottomV,vectorList)	
			if(leftCheck==False):				
				borderLineV1.append(allCells[i][3])
				borderLineV2.append(allCells[i][0])
			if(rightCheck==False):				
				borderLineV1.append(allCells[i][1])
				borderLineV2.append(allCells[i][2])
			if(topCheck==False):				
				borderLineV1.append(allCells[i][0])
				borderLineV2.append(allCells[i][1])
			if(bottomCheck==False):				
				borderLineV1.append(allCells[i][2])
				borderLineV2.append(allCells[i][3])
		

		#get corners		
		for m in range(len(borderLineV1)):			
			for n in range(len(borderLineV2)):
				if(isequal(borderLineV1[m],borderLineV2[n])):
					if(borderLineV1[n].getY()!=borderLineV2[m].getY()):
						if(borderLineV1[n].getX()!=borderLineV2[m].getX()):
							borderCL.append(borderLineV1[m])

		#create lines
		for i in range(len(borderCL)):		
			getminYV = borderCL[i]
			getminXV = borderCL[i]		
		
			for j in range(len(borderCL)):				
				if(borderCL[i].getY()==borderCL[j].getY()): # select all on x axis <--->
					if i!=j: #do not select self
						if(isequal(getminXV,borderCL[i])):# if first item
							getminXV = Vector(borderCL[j].getX(),borderCL[j].getY())
						elif(distance(borderCL[j],borderCL[i])>gridsize): 
							for k in range(len(borderLineV1)):
								if distance(borderCL[j],borderCL[i])<distance(getminXV,borderCL[i]):
									if((isequal(borderLineV1[k],borderCL[i])==False) and (isequal(borderLineV1[k],borderCL[j])==False)):
										if(distance(borderCL[i],borderCL[j])==distance(borderLineV1[k],borderCL[i])+distance(borderLineV1[k],borderCL[j])):
											getminXV = Vector(borderCL[j].getX(),borderCL[j].getY())
											break
																		
							for k in range(len(borderLineV2)):
								if distance(borderCL[j],borderCL[i])<distance(getminXV,borderCL[i]):	
									if(distance(borderCL[i],borderCL[j])==distance(borderLineV2[k],borderCL[i])+distance(borderLineV2[k],borderCL[j])):
										if((isequal(borderLineV2[k],borderCL[i])==False) and (isequal(borderLineV2[k],borderCL[j])==False)):
											getminXV = Vector(borderCL[j].getX(),borderCL[j].getY())
											break


						elif(distance(borderCL[j],borderCL[i])==gridsize):#if single cell cse
							for k in range(len(borderLineV1)):
								if(isequal(borderLineV1[k],borderCL[j])):
									if(isequal(borderLineV2[k],borderCL[i])):
										getminXV = Vector(borderCL[j].getX(),borderCL[j].getY())
										break
							for k in range(len(borderLineV2)):
								if(isequal(borderLineV2[k],borderCL[j])):
									if(isequal(borderLineV1[k],borderCL[i])):
										getminXV = Vector(borderCL[j].getX(),borderCL[j].getY())
										break
						
				elif(borderCL[i].getX()==borderCL[j].getX()): # select all on y axis <--->
					if i!=j: #do not select self
						if(isequal(getminYV,borderCL[i])):# if first item
							getminYV = Vector(borderCL[j].getX(),borderCL[j].getY())
						elif(distance(borderCL[j],borderCL[i])>gridsize): 
							for k in range(len(borderLineV1)):
								if distance(borderCL[j],borderCL[i])<distance(getminYV,borderCL[i]):
									if(distance(borderCL[i],borderCL[j])==distance(borderLineV1[k],borderCL[i])+distance(borderLineV1[k],borderCL[j])):	
										if((isequal(borderLineV1[k],borderCL[i])==False) and (isequal(borderLineV1[k],borderCL[j])==False)):							
											getminYV = Vector(borderCL[j].getX(),borderCL[j].getY())
											break
							
							for k in range(len(borderLineV2)):
								if distance(borderCL[j],borderCL[i])<distance(getminYV,borderCL[i]):			
									if(distance(borderCL[i],borderCL[j])==distance(borderLineV2[k],borderCL[i])+distance(borderLineV2[k],borderCL[j])):	
										if((isequal(borderLineV2[k],borderCL[i])==False) and (isequal(borderLineV2[k],borderCL[j])==False)):
											getminYV = Vector(borderCL[j].getX(),borderCL[j].getY())
											break	
											
						elif(distance(borderCL[j],borderCL[i])==gridsize): #if single cell case
							for k in range(len(borderLineV1)):
								if(isequal(borderLineV1[k],borderCL[j])):
									if(isequal(borderLineV2[k],borderCL[i])):
										getminYV = Vector(borderCL[j].getX(),borderCL[j].getY())
										break

							for k in range(len(borderLineV2)):
								if(isequal(borderLineV2[k],borderCL[j])):
									if(isequal(borderLineV1[k],borderCL[i])):
										getminYV = Vector(borderCL[j].getX(),borderCL[j].getY())
										break

			#avoiding duplicates

			if(itemIncludes(getminXV,borderFLineV1)==False):
				borderFLineV1.append(borderCL[i])		
				borderFLineV2.append(getminXV)

			if(itemIncludes(getminYV,borderFLineV1)==False):
				borderFLineV1.append(borderCL[i])
				borderFLineV2.append(getminYV)
		
		#get singleline plan
		singleLinePlan= []
		for i in range(len(borderFLineV1)):			
			l1 = Line(borderFLineV1[i],borderFLineV2[i])
			singleLinePlan.append(l1)	

		return singleLinePlan
		




def automater(inData):

	doc = ezdxf.new('R2004', setup=False)
	msp = doc.modelspace() 
	doc.units = units.MM
	
	
	
	os.chdir('C:/Users/kartikj/Documents/flaskapp2/data')


	vectorList = []
	colList = []
	space_name_list = []
	space_area_list = []
	space_type_list = []

	gridsize1 = inData[0].get('g')
	scale = inData[0].get('s')

	actual_grid = (math.sqrt(scale))*1000
	
	wallthickness = 150





	for i in inData:
		V1 = Vector(int((i.get('x')/gridsize1)*actual_grid),int(((i.get('y')/gridsize1)*actual_grid)*-1))
		C1 = i.get('c')		
		vectorList.append(V1)
		colList.append(C1)
		space_name = i.get('sp')
		space_Area = i.get('a')
		space_type = i.get('st')

		space_name_list.append(space_name)
		space_area_list.append(space_Area)
		space_type_list.append(space_type)

	separate_spaces = []
	separate_col = []
	
	sep_spaceName = []
	sep_spaceArea = []
	sep_spaceType = []


	#create single number of single color
	for i in colList:
		if i not in separate_col:
			separate_col.append(i)

	#create empty per single color
	for i in range(len(separate_col)):
		emt1 = []
		emt2 = []	
		emt3 = []
		emt4 = []
		separate_spaces.append(emt1)
		sep_spaceName.append(emt2)
		sep_spaceArea.append(emt3)
		sep_spaceType.append(emt4)

		

	# create separate array for sepate room
	for i in range(len(separate_col)):
		for j in range(len(colList)):
			if colList[j]==separate_col[i]:
				separate_spaces[i].append(vectorList[j])
				sep_spaceType[i].append(space_type_list[j])
				sep_spaceArea[i].append(space_area_list[j])
				sep_spaceName[i].append(space_name_list[j])
		

 #############################################################################
	single_spaces = []
	single_spacename = []
	single_spacearea = []
	single_spacetype = []

		
	# 	msp.add_text(separate_nm[i],dxfattribs={'height': 300}).set_pos((getmin.getX()+500, getmin.getY()-200), align='LEFT')



	# get only boudries per room space in borderv
	for i in range(len(separate_spaces)):
		newAr = get_borders(separate_spaces[i],actual_grid)
		single_spaces.append(newAr)	
		single_spacename.append(sep_spaceName[i][0])
		single_spacearea.append(sep_spaceArea[i][0])
		single_spacetype.append(sep_spaceType[i][0])



	#putting all lines in a single array
	allsinglelines = []
	for i in range(len(single_spaces)):
		for line in single_spaces[i]:
			if(single_spacetype[i]!='Empty'):
				if(single_spacetype!='Design'):
					allsinglelines.append(line)





	# horizontals = []
	# verticals = []
	# for i in range(len(allsinglelines)):
	# 	line = allsinglelines[i]
	# 	if(abs(line.v1.getY()-line.v2.getY())<=1):
	# 		horizontals.append(line)
	# 	if(abs(line.v1.getX()-line.v2.getX())<=1):
	# 		verticals.append(line)
		
	# alloverlappinglines = []
	# allcuthorizontals_nonoverlap = []
	# allcuthorizontals = []	
	# for i in range(len(horizontals)): #collecting overlappinglines and non overlappinlg lines
	# 	colinlines = []
	# 	for j in range(len(horizontals)):
	# 		if(i!=j):
	# 			#if on same axis
	# 			if(horizontals[i].v1.getY()==horizontals[j].v1.getY()):
	# 				#if overlapping vj1
	# 				if(distance(horizontals[i].v1,horizontals[i].v2)==(distance(horizontals[i].v1,horizontals[j].v1)+distance(horizontals[j].v1,horizontals[i].v2))):
				
	# 					#if ovrelapping jv2 also means entire line inside 
	# 					if(distance(horizontals[i].v1,horizontals[i].v2)==(distance(horizontals[i].v1,horizontals[j].v2)+distance(horizontals[j].v2,horizontals[i].v2))):	
	# 						l1 = Line(horizontals[j].v1,horizontals[j].v2)
	# 						if(l1.getLength()!=0):							
	# 							if(isLineInArray(l1,allcuthorizontals)==False):
	# 								alloverlappinglines.append(horizontals[i])
	# 								alloverlappinglines.append(horizontals[j])				
	# 								allcuthorizontals.append(l1)#works fine
	# 								# if(distance(horizontals[i].v1,horizontals[j].v1))<(distance(horizontals[i].v1,horizontals[j].v2)):
	# 								# 	lno1 = Line(horizontals[i].v1,horizontals[j].v1)
	# 								# 	lno2 = Line(horizontals[j].v2,horizontals[i].v2)
	# 								# 	allcuthorizontals_nonoverlap.append(lno1)
	# 								# 	allcuthorizontals_nonoverlap.append(lno2)
	# 								# if(distance(horizontals[i].v1,horizontals[j].v1))>(distance(horizontals[i].v1,horizontals[j].v2)):
	# 								# 	lno1 = Line(horizontals[i].v1,horizontals[j].v2)
	# 								# 	lno2 = Line(horizontals[j].v1,horizontals[i].v2)
	# 								# 	allcuthorizontals_nonoverlap.append(lno1)
	# 								# 	allcuthorizontals_nonoverlap.append(lno2)



	# 					# #if ovrelapping jv2 not inside means entire line not inside 
	# 					if(distance(horizontals[i].v1,horizontals[i].v2)!=(distance(horizontals[i].v1,horizontals[j].v2)+distance(horizontals[j].v2,horizontals[i].v2))):							
	# 						#check if line iv1 between jv1 and jv2
	# 						if(distance(horizontals[j].v1,horizontals[j].v2)==(distance(horizontals[j].v1,horizontals[i].v1)+distance(horizontals[i].v1,horizontals[j].v2))):
	# 							l1 = Line(horizontals[i].v1,horizontals[j].v1)
	# 							if(l1.getLength()!=0):
	# 								if(isLineInArray(l1,allcuthorizontals)==False):
	# 									alloverlappinglines.append(horizontals[i])
	# 									alloverlappinglines.append(horizontals[j])
	# 									allcuthorizontals.append(l1)
	# 									# lno1 = Line(horizontals[j].v2,horizontals[i].v1)
	# 									# lno2 = Line(horizontals[i].v1,horizontals[j].v2)
	# 									# allcuthorizontals_nonoverlap.append(lno1)
	# 									# allcuthorizontals_nonoverlap.append(lno2)
									
	# 						#check if line iv2 between jv1 and jv2
	# 						if(distance(horizontals[j].v1,horizontals[j].v2)==(distance(horizontals[j].v1,horizontals[i].v2)+distance(horizontals[i].v2,horizontals[j].v2))):
	# 							l1 = Line(horizontals[j].v1,horizontals[i].v2)
	# 							if(l1.getLength()!=0):
	# 								if(isLineInArray(l1,allcuthorizontals)==False):
	# 									alloverlappinglines.append(horizontals[i])
	# 									alloverlappinglines.append(horizontals[j])
	# 									allcuthorizontals.append(l1)
	# 									# lno1 = Line(horizontals[i].v1,horizontals[j].v1)
	# 									# lno2 = Line(horizontals[i].v2,horizontals[j].v2)
	# 									# allcuthorizontals_nonoverlap.append(lno1)
	# 									# allcuthorizontals_nonoverlap.append(lno2)

	# 				#if overlapping vj2
	# 				if(distance(horizontals[i].v1,horizontals[i].v2)==(distance(horizontals[i].v1,horizontals[j].v2)+distance(horizontals[j].v2,horizontals[i].v2))):
						
	# 					# #if ovrelapping jv1 not inside means entire line not inside 
	# 					if(distance(horizontals[i].v1,horizontals[i].v2)!=(distance(horizontals[i].v1,horizontals[j].v2)+distance(horizontals[j].v2,horizontals[i].v2))):							
	# 						#check if line iv1 between jv1 and jv2
	# 						if(distance(horizontals[j].v1,horizontals[j].v2)==(distance(horizontals[j].v1,horizontals[i].v1)+distance(horizontals[i].v1,horizontals[j].v2))):
	# 							l1 = Line(horizontals[i].v1,horizontals[j].v2)
	# 							if(l1.getLength()!=0):
	# 								if(isLineInArray(l1,allcuthorizontals)==False):
	# 									alloverlappinglines.append(horizontals[i])
	# 									alloverlappinglines.append(horizontals[j])
	# 									allcuthorizontals.append(l1)
	# 									# lno1 = Line(horizontals[j].v1,horizontals[i].v1)
	# 									# lno2 = Line(horizontals[j].v2,horizontals[i].v2)
	# 									# allcuthorizontals_nonoverlap.append(lno1)
	# 									# allcuthorizontals_nonoverlap.append(lno2)

	# 						#check if line iv2 between jv1 and jv2
	# 						if(distance(horizontals[j].v1,horizontals[j].v2)==(distance(horizontals[j].v1,horizontals[i].v2)+distance(horizontals[i].v2,horizontals[j].v2))):
	# 							l1 = Line(horizontals[i].v2,horizontals[j].v2)
	# 							if(l1.getLength()!=0):
	# 								if(isLineInArray(l1,allcuthorizontals)==False):
	# 									alloverlappinglines.append(horizontals[i])
	# 									alloverlappinglines.append(horizontals[j])
	# 									allcuthorizontals.append(l1)
	# 									# lno1 = Line(horizontals[i].v1,horizontals[j].v2)
	# 									# lno2 = Line(horizontals[i].v2,horizontals[j].v1)
	# 									# allcuthorizontals_nonoverlap.append(lno1)
	# 									# allcuthorizontals_nonoverlap.append(lno2)


				
	# allcutverticals = []
	# allcutverticals_nonoverlap = []
	# for i in range(len(verticals)):
	# 	colinlines = []
	# 	for j in range(len(verticals)):
	# 		if(i!=j):
	# 			#if on same axis
	# 			if(verticals[i].v1.getX()==verticals[j].v1.getX()):
	# 				#if overlapping vj1
	# 				if(distance(verticals[i].v1,verticals[i].v2)==(distance(verticals[i].v1,verticals[j].v1)+distance(verticals[j].v1,verticals[i].v2))):
						
	# 					#if ovrelapping jv2 also means entire line inside 
	# 					if(distance(verticals[i].v1,verticals[i].v2)==(distance(verticals[i].v1,verticals[j].v2)+distance(verticals[j].v2,verticals[i].v2))):	
	# 						l1 = Line(verticals[j].v1,verticals[j].v2)
	# 						if(l1.getLength()!=0):							
	# 							if(isLineInArray(l1,allcutverticals)==False):
	# 								alloverlappinglines.append(verticals[i])
	# 								alloverlappinglines.append(verticals[j])
	# 								allcutverticals.append(l1)	

	# 								# if(distance(verticals[i].v1,verticals[j].v1))<(distance(verticals[i].v1,verticals[j].v2)):
	# 								# 	lno1 = Line(verticals[i].v1,verticals[j].v1)
	# 								# 	lno2 = Line(verticals[j].v2,verticals[i].v2)
	# 								# 	allcutverticals_nonoverlap.append(lno1)
	# 								# 	allcutverticals_nonoverlap.append(lno2)
	# 								# if(distance(verticals[i].v1,verticals[j].v1))>(distance(verticals[i].v1,verticals[j].v2)):
	# 								# 	lno1 = Line(verticals[i].v1,verticals[j].v2)
	# 								# 	lno2 = Line(verticals[j].v1,verticals[i].v2)
	# 								# 	allcutverticals_nonoverlap.append(lno1)
	# 								# 	allcutverticals_nonoverlap.append(lno2)				

	# 					# #if ovrelapping jv2 not inside means entire line not inside 
	# 					if(distance(verticals[i].v1,verticals[i].v2)!=(distance(verticals[i].v1,verticals[j].v2)+distance(verticals[j].v2,verticals[i].v2))):														
	# 						#check if line iv1 between jv1 and jv2
	# 						if(distance(verticals[j].v1,verticals[j].v2)==(distance(verticals[j].v1,verticals[i].v1)+distance(verticals[i].v1,verticals[j].v2))):
	# 							l1 = Line(verticals[i].v1,verticals[j].v1)
	# 							if(l1.getLength()!=0):
	# 								if(isLineInArray(l1,allcutverticals)==False):
	# 									alloverlappinglines.append(verticals[i])
	# 									alloverlappinglines.append(verticals[j])
	# 									allcutverticals.append(l1)
	# 									# lno1 = Line(verticals[j].v2,verticals[i].v1)
	# 									# lno2 = Line(verticals[i].v1,verticals[j].v2)
	# 									# allcutverticals_nonoverlap.append(lno1)
	# 									# allcutverticals_nonoverlap.append(lno2)

	# 						#check if line iv2 between jv1 and jv2
	# 						if(distance(verticals[j].v1,verticals[j].v2)==(distance(verticals[j].v1,verticals[i].v2)+distance(verticals[i].v2,verticals[j].v2))):
	# 							l1 = Line(verticals[i].v2,verticals[j].v1)
	# 							if(l1.getLength()!=0):
	# 								if(isLineInArray(l1,allcutverticals)==False):
	# 									alloverlappinglines.append(verticals[i])
	# 									alloverlappinglines.append(verticals[j])
	# 									allcutverticals.append(l1)
	# 									# lno1 = Line(verticals[i].v1,verticals[j].v1)
	# 									# lno2 = Line(verticals[i].v2,verticals[j].v2)
	# 									# allcutverticals_nonoverlap.append(lno1)
	# 									# allcutverticals_nonoverlap.append(lno2)

	# 				#if overlapping vj2
	# 				if(distance(verticals[i].v1,verticals[i].v2)==(distance(verticals[i].v1,verticals[j].v2)+distance(verticals[j].v2,verticals[i].v2))):	
	# 					# #if ovrelapping jv1 not inside means entire line not inside 
	# 					if(distance(verticals[i].v1,verticals[i].v2)!=(distance(verticals[i].v1,verticals[j].v2)+distance(verticals[j].v2,verticals[i].v2))):							
	# 						#check if line iv1 between jv1 and jv2
	# 						if(distance(verticals[j].v1,verticals[j].v2)==(distance(verticals[j].v1,verticals[i].v1)+distance(verticals[i].v1,verticals[j].v2))):
	# 							l1 = Line(verticals[i].v1,verticals[j].v2)
	# 							if(l1.getLength()!=0):
	# 								if(isLineInArray(l1,allcutverticals)==False):
	# 									alloverlappinglines.append(verticals[i])
	# 									alloverlappinglines.append(verticals[j])
	# 									allcutverticals.append(l1)
	# 									# lno1 = Line(verticals[j].v1,verticals[i].v1)
	# 									# lno2 = Line(verticals[j].v2,verticals[i].v2)

	# 									# allcutverticals_nonoverlap.append(lno1)
	# 									# allcutverticals_nonoverlap.append(lno2)


	# 						#check if line iv2 between jv1 and jv2
	# 						if(distance(verticals[j].v1,verticals[j].v2)==(distance(verticals[j].v1,verticals[i].v2)+distance(verticals[i].v2,verticals[j].v2))):
	# 							l1 = Line(verticals[i].v2,verticals[j].v2)
	# 							if(l1.getLength()!=0):
	# 								if(isLineInArray(l1,allcutverticals)==False):
	# 									alloverlappinglines.append(verticals[i])
	# 									alloverlappinglines.append(verticals[j])
	# 									allcutverticals.append(l1)
	# 									# lno1 = Line(verticals[i].v1,verticals[j].v2)
	# 									# lno2 = Line(verticals[i].v2,verticals[j].v1)
	# 									# allcutverticals_nonoverlap.append(lno1)
	# 									# allcutverticals_nonoverlap.append(lno2)

										

	# outerlines = []


	# for i in range(len(single_spaces)):
	# 	if(single_spacetype[i]=='Enclosed'):
	# 		for line in single_spaces[i]:
	# 			if(isLineInArray(line,alloverlappinglines)==False):				
	# 				if(isLineInArray(line, outerlines)==False):
	# 					outerlines.append(line)

	# # outerlines_cut = []
	# # for i in range(len(allcuthorizontals_nonoverlap)):
	# # 	if (isLineInArray(allcuthorizontals_nonoverlap[i],allcuthorizontals)==False):
	# # 		if(allcuthorizontals_nonoverlap[i].getLength()>5):				
	# # 			outerlines_cut.append(allcuthorizontals_nonoverlap[i])


	# # for i in range(len(allcutverticals_nonoverlap)):
	# # 	if (isLineInArray(allcutverticals_nonoverlap[i],allcutverticals)==False):
	# # 		if(allcuthorizontals_nonoverlap[i].getLength()>5):
	# # 			outerlines_cut.append(allcutverticals_nonoverlap[i])



	# text_size = 75
	# if(actual_grid>1000):
	# 	text_size = 100
	# if(actual_grid>3000):
	# 	text_size = 300
	# if(actual_grid>5000):
	# 	text_size = 500
	# if(actual_grid>10000):
	# 	text_size = 1000


	# for i in range(len(single_spaces)):
	# 	getminV1 = Vector(single_spaces[i][0].v1.getX(),single_spaces[i][0].v1.getY())
	# 	getminV2 = Vector(single_spaces[i][0].v1.getX(),single_spaces[i][0].v1.getY())
	
		


	# 	for j in range(len(single_spaces[i])):
	# 		if(single_spaces[i][j].v1.getX()<getminV1.getX()):
	# 			getminV1.setX(single_spaces[i][j].v1.getX())

	# 		if(single_spaces[i][j].v2.getX()<getminV1.getX()):
	# 			getminV1.setX(single_spaces[i][j].v2.getX())

			
	# 	for j in range(len(single_spaces[i])):
	# 		if(single_spaces[i][j].v1.getY()>getminV1.getY()):
	# 			getminV1.setY(single_spaces[i][j].v1.getY())

	# 		if(single_spaces[i][j].v2.getY()>getminV1.getY()):
	# 			getminV1.setY(single_spaces[i][j].v2.getY())



	# 	for j in range(len(single_spaces[i])):
	# 		if(single_spaces[i][j].v1.getX()>getminV2.getX()):
	# 			getminV2.setX(single_spaces[i][j].v1.getX())

	# 		if(single_spaces[i][j].v2.getX()>getminV2.getX()):
	# 			getminV2.setX(single_spaces[i][j].v2.getX())

			
	# 	for j in range(len(single_spaces[i])):
	# 		if(single_spaces[i][j].v1.getY()<getminV2.getY()):
	# 			getminV2.setY(single_spaces[i][j].v1.getY())

	# 		if(single_spaces[i][j].v2.getY()<getminV2.getY()):
	# 			getminV2.setY(single_spaces[i][j].v2.getY())

	# 	templ = Line(getminV1,getminV2)
	# 	p1 = pointOnLine(templ,0.5)
			

	# 	if single_spacetype[i]!='Empty':
	# 		if single_spacetype[i]!= 'Design':
	# 			msp.add_text(single_spacename[i],dxfattribs={'height': text_size}).set_pos((p1.getX()-actual_grid, p1.getY()), align='LEFT')
	# 			msp.add_text(single_spacearea[i],dxfattribs={'height': text_size}).set_pos((p1.getX()-actual_grid, p1.getY()-(actual_grid)/2), align='LEFT')
		






	# doc.layers.new(name='Dim', dxfattribs={'color': 50})

	# def addDim(line):

	# 	p1x = line.v1.getX()
	# 	p1y = line.v1.getY()
	# 	p2x = line.v2.getX()
	# 	p2y = line.v2.getY()
	# 	multi_tick = [1,-1]
	# 	dim = msp.add_aligned_dim( p1=(p1x, p1y), p2=(p2x, p2y),distance=((text_size*2)*choice(multi_tick)), override={			
	# 		'dimtad': 0,
	# 		'dimtxsty': 'Standard',
	# 	    'dimtxt': 0.35,
	# 	    'dimclrt': 1,
	# 		'dimtxt':text_size,
	# 		'dimclre': 1,
	# 		'dimclrd':1,
		
	# 		})

	
	# 	dim.set_tick(size=text_size*0.75)		
	# 	dim.render()



	# def addCol(line):

	# 	ex1 = pointOnLine2(line, -75)
	# 	ex2 = pointOnLine2(line, line.getLength()+75)
	# 	line.v1=ex1
	# 	line.v2=ex2
	# 	v1 = Vector(line.v1.getX()-75,line.v1.getY()-75);
	# 	v2 = Vector(line.v1.getX()+75,line.v1.getY()-75);
	# 	v3 = Vector(line.v1.getX()+75,line.v1.getY()+75);
	# 	v4 = Vector(line.v1.getX()-75,line.v1.getY()+75);				
	# 	cl1 = Line(v1,v2)
	# 	cl2 = Line(v2,v3)
	# 	cl3 = Line(v3,v4)			
	# 	cl4 = Line(v4,v1)
	# 	cl5 = Line(v1,v3)
	# 	cl6 = Line(v2,v4)
	# 	cl1.draw(msp,'Columns')
	# 	cl2.draw(msp,'Columns')
	# 	cl3.draw(msp,'Columns')
	# 	cl4.draw(msp,'Columns')
	# 	cl5.draw(msp,'Columns')
	# 	cl6.draw(msp,'Columns')

	# 	v1 = Vector(line.v2.getX()-75,line.v2.getY()-75);
	# 	v2 = Vector(line.v2.getX()+75,line.v2.getY()-75);
	# 	v3 = Vector(line.v2.getX()+75,line.v2.getY()+75);
	# 	v4 = Vector(line.v2.getX()-75,line.v2.getY()+75);				
	# 	cl1 = Line(v1,v2)
	# 	cl2 = Line(v2,v3)
	# 	cl3 = Line(v3,v4)			
	# 	cl4 = Line(v4,v1)
	# 	cl5 = Line(v1,v3)
	# 	cl6 = Line(v2,v4)
	# 	cl1.draw(msp,'Columns')
	# 	cl2.draw(msp,'Columns')
	# 	cl3.draw(msp,'Columns')
	# 	cl4.draw(msp,'Columns')
	# 	cl5.draw(msp,'Columns')
	# 	cl6.draw(msp,'Columns')
	

	# doc.layers.new(name='Walls', dxfattribs={'color': 50})
	# doc.layers.new(name='Default', dxfattribs={'color':6})
	# doc.layers.new(name='Doors', dxfattribs={'color':34})
	# doc.layers.new(name='Windows', dxfattribs={'color':4})
	# doc.layers.new(name='Railings', dxfattribs={'color':70})
	# doc.layers.new(name='Corridor', dxfattribs={'color':170})
	# doc.layers.new(name='Empty', dxfattribs={'color':7})
	# doc.layers.new(name='Columns', dxfattribs={'color':40})
	# doc.layers.new(name='Design', dxfattribs={'color':72})
	

	

	# designLines = []
	# for i in range(len(single_spaces)):
	# 	if(single_spacetype[i]=='Enclosed'):
	# 		for line in single_spaces[i]:
	# 			ex1 = pointOnLine2(line, 75)
	# 			ex2 = pointOnLine2(line, line.getLength()-75)
	# 			line.v1=ex1
	# 			line.v2=ex2

	# 			of1 = getOffsetLine(line,75,1)
	# 			of2 = getOffsetLine(line,75,2)
	# 			of1.draw(msp,'Walls')
	# 			of2.draw(msp,'Walls')

	# 			# addDim(line)
	# 			#back to normal
	# 			addCol(line)		

	# 	elif(single_spacetype[i]=='Balcony'):
	# 		for line in single_spaces[i]:
	# 			if((isLineInArray(line, alloverlappinglines)==False)):
	# 				ex1 = pointOnLine2(line, 75)
	# 				ex2 = pointOnLine2(line, line.getLength()-75)
	# 				line.v1=ex1
	# 				line.v2=ex2	
	# 				of1 = getOffsetLine(line,25,1)
	# 				of2 = getOffsetLine(line,25,2)
	# 				of1.draw(msp,'Railings')
	# 				of2.draw(msp,'Railings')	
	# 				# addDim(line)
	# 				addCol(line)
	# 			else:
	# 				ex1 = pointOnLine2(line, 75)
	# 				ex2 = pointOnLine2(line, line.getLength()-75)
	# 				line.v1=ex1
	# 				line.v2=ex2
	# 				of1 = getOffsetLine(line,75,1)
	# 				of2 = getOffsetLine(line,75,2)
	# 				of1.draw(msp,'Walls')
	# 				of2.draw(msp,'Walls')
	# 				# addDim(line)
	# 				addCol(line)
	# 	elif(single_spacetype[i]=='Corridor'):	
	# 		for line in single_spaces[i]:
	# 			if((isLineInArray(line, alloverlappinglines)==False)):
	# 				ex1 = pointOnLine2(line, 75)
	# 				ex2 = pointOnLine2(line, line.getLength()-75)
	# 				line.v1=ex1
	# 				line.v2=ex2	
	# 				line.draw(msp,'Corridor')
	# 				# addDim(line)
	# 				addCol(line)
	# 			else:
	# 				ex1 = pointOnLine2(line, 75)
	# 				ex2 = pointOnLine2(line, line.getLength()-75)
	# 				line.v1=ex1
	# 				line.v2=ex2
	# 				of1 = getOffsetLine(line,75,1)
	# 				of2 = getOffsetLine(line,75,2)
	# 				of1.draw(msp,'Walls')
	# 				of2.draw(msp,'Walls')
	# 				# addDim(line)
	# 				addCol(line)
	# 	elif(single_spacetype[i]=='Design'):	
	# 		for line in single_spaces[i]:	
	# 			ex1 = pointOnLine2(line, 0)
	# 			ex2 = pointOnLine2(line, line.getLength()-0)
	# 			line.v1=ex1
	# 			line.v2=ex2	
	# 			line.draw(msp,'Design')
	# 			designLines.append(line)
	# 			# addDim(line)
	# 			# addCol(line)


	# doorsarray = []

	# for line in allcuthorizontals:
	# 	if(isLineInArray(line, designLines)==False):

	# 		of1 = getOffsetLine(line,75,1)
	# 		of2 = getOffsetLine(line,75,2)

	# 		# of1.draw(msp)
	# 		# of2.draw(msp)
	# 		if(of1.getLength()>1500):
	# 			v1 = pointOnLine(of1,0.5)
	# 			v2 = pointOnLine(of2,0.5)
	# 			l1 = Line(v1,v2)
	# 			ofl1 = getOffsetLine(l1,500,1)
	# 			ofl2 = getOffsetLine(l1,500,2)
	# 			ofl3 = Line(ofl1.v1,ofl2.v1)
	# 			ofl4 = Line(ofl1.v2,ofl2.v2)
	# 			ofl5 = Line(ofl1.v1,ofl2.v2)
	# 			ofl6 = Line(ofl1.v1,ofl2.v2)
	# 			ofl1.draw(msp,'Doors')
	# 			ofl2.draw(msp,'Doors')
	# 			ofl3.draw(msp,'Doors')
	# 			ofl4.draw(msp,'Doors')
	# 			ofl5.draw(msp,'Doors')
	# 			ofl6.draw(msp,'Doors')
				
	# 		elif(of1.getLength()>900 and of1.getLength()<=1500):
	# 			v1 = pointOnLine(of1,0.5)
	# 			v2 = pointOnLine(of2,0.5)
	# 			l1 = Line(v1,v2)
	# 			ofl1 = getOffsetLine(l1,400,1)
	# 			ofl2 = getOffsetLine(l1,400,2)
	# 			ofl3 = Line(ofl1.v1,ofl2.v1)
	# 			ofl4 = Line(ofl1.v2,ofl2.v2)

	# 			ofl5 = Line(ofl1.v1,ofl2.v2)
	# 			ofl6 = Line(ofl1.v1,ofl2.v2)

	# 			ofl1.draw(msp,'Doors')
	# 			ofl2.draw(msp,'Doors')
	# 			ofl3.draw(msp,'Doors')
	# 			ofl4.draw(msp,'Doors')
	# 			ofl5.draw(msp,'Doors')
	# 			ofl6.draw(msp,'Doors')
			
	# 	addDim(line)	

	# for line in allcutverticals:
	# 	if(isLineInArray(line, designLines)==False):
	# 		of1 = getOffsetLine(line,75,1)
	# 		of2 = getOffsetLine(line,75,2)
			
	# 		if(of1.getLength()>1500):
	# 			v1 = pointOnLine(of1,0.5)
	# 			v2 = pointOnLine(of2,0.5)
	# 			l1 = Line(v1,v2)
	# 			ofl1 = getOffsetLine(l1,500,1)
	# 			ofl2 = getOffsetLine(l1,500,2)
	# 			ofl3 = Line(ofl1.v1,ofl2.v1)
	# 			ofl4 = Line(ofl1.v2,ofl2.v2)

	# 			ofl5 = Line(ofl1.v1,ofl2.v2)
	# 			ofl6 = Line(ofl1.v1,ofl2.v2)

	# 			ofl1.draw(msp,'Doors')
	# 			ofl2.draw(msp,'Doors')
	# 			ofl3.draw(msp,'Doors')
	# 			ofl4.draw(msp,'Doors')
	# 			ofl5.draw(msp,'Doors')
	# 			ofl6.draw(msp,'Doors')
		
	# 		elif(of1.getLength()>900 and of1.getLength()<=1500):
	# 			v1 = pointOnLine(of1,0.5)
	# 			v2 = pointOnLine(of2,0.5)
	# 			l1 = Line(v1,v2)
	# 			ofl1 = getOffsetLine(l1,400,1)
	# 			ofl2 = getOffsetLine(l1,400,2)
	# 			ofl3 = Line(ofl1.v1,ofl2.v1)
	# 			ofl4 = Line(ofl1.v2,ofl2.v2)
	# 			ofl5 = Line(ofl1.v1,ofl2.v2)
	# 			ofl6 = Line(ofl1.v1,ofl2.v2)
	# 			ofl1.draw(msp,'Doors')
	# 			ofl2.draw(msp,'Doors')
	# 			ofl3.draw(msp,'Doors')
	# 			ofl4.draw(msp,'Doors')
	# 			ofl5.draw(msp,'Doors')
	# 			ofl6.draw(msp,'Doors')
			
	# 	addDim(line)
			

	# for line in outerlines:
	# 	of1 = getOffsetLine(line,75,1)
	# 	of2 = getOffsetLine(line,75,2)		
	# 	if(line.getLength()>2000):						
	# 		avail = line.getLength()
	# 		noofwin = int(avail/2000)
	# 		winlen = noofwin*1000
	# 		nosp = noofwin-1
	# 		betsp = nosp*1000
	# 		cutsp = (avail-(winlen+betsp))/2 + 500
	# 		i=cutsp
	# 		while i<=(line.getLength()):
	# 			v1 = pointOnLine2(of1,i)
	# 			v2 = pointOnLine2(of2,i)
	# 			l1 = Line(v1,v2)
	# 			ofl1 = getOffsetLine(l1,500,1)
	# 			ofl2 = getOffsetLine(l1,500,2)
	# 			ofl3 = Line(ofl1.v1,ofl2.v1)
	# 			ofl4 = Line(ofl1.v2,ofl2.v2)
	# 			ofl1.draw(msp,'Windows')
	# 			ofl2.draw(msp,'Windows')
	# 			ofl3.draw(msp,'Windows')
	# 			ofl4.draw(msp,'Windows')
	# 			vp1 = pointOnLine(ofl1,0.5)
	# 			vp2 = pointOnLine(ofl2,0.5)
	# 			l2 = Line(vp1,vp2)
	# 			l2.draw(msp,'Windows')
	# 			i+=2000
	# 	addDim(line)



	# for line in outerlines_cut:
	# 	of1 = getOffsetLine(line,75,1)
	# 	of2 = getOffsetLine(line,75,2)		
	# 	if(line.getLength()>1500):						
	# 		avail = line.getLength()
	# 		noofwin = int(avail/2000)
	# 		winlen = noofwin*1000
	# 		nosp = noofwin-1
	# 		betsp = nosp*1000
	# 		cutsp = (avail-(winlen+betsp))/2 + 500
	# 		i=cutsp
	# 		while i<=(line.getLength()):
	# 			v1 = pointOnLine2(of1,i)
	# 			v2 = pointOnLine2(of2,i)
	# 			l1 = Line(v1,v2)
	# 			ofl1 = getOffsetLine(l1,500,1)
	# 			ofl2 = getOffsetLine(l1,500,2)
	# 			ofl3 = Line(ofl1.v1,ofl2.v1)
	# 			ofl4 = Line(ofl1.v2,ofl2.v2)
	# 			ofl1.draw(msp,'Windows')
	# 			ofl2.draw(msp,'Windows')
	# 			ofl3.draw(msp,'Windows')
	# 			ofl4.draw(msp,'Windows')
	# 			vp1 = pointOnLine(ofl1,0.5)
	# 			vp2 = pointOnLine(ofl2,0.5)
	# 			l2 = Line(vp1,vp2)
	# 			l2.draw(msp,'Windows')
	# 			i+=2000
	# 	addDim(line)





	

	#elevation

##########################################
#### inverse world below at verticall axis 1=-1 ################
###########################################
	# for line in allsinglelines:			
	# 	ex1 = pointOnLine2(line, -150)
	# 	ex2 = pointOnLine2(line, line.getLength()+150)
	# 	line.v1=ex1
	# 	line.v2=ex2	


	# number_of_floors = 3
	# parking_at_gf = False
	# shops_at_gf = False
	# floor_height = 3000
	# parapet = 900
	# window_height = 1200
	# window_width = 1200
	# window_sill = 900

	# #get baseline offsetted from the drawn building
	# getMinY = Vector(0,0)
	# getMaxY = Vector(0,0)#works fine


	# getMinX = Vector(0,0)
	# getMaxX = Vector(0,0)

	# for i in range(len(allsinglelines)):
		
	# 		if(allsinglelines[i].v1.getY()<getMaxY.getY()):				
	# 			getMaxY = allsinglelines[i].v1
	# 		elif(allsinglelines[i].v2.getY()<getMaxY.getY()):				
	# 			getMaxY = allsinglelines[i].v2
	# for i in range(len(allsinglelines)):
	# 		if(allsinglelines[i].v1.getY()>getMinY.getY()):
	# 			getMinY= allsinglelines[i].v1
	# 		elif(allsinglelines[i].v2.getY()>getMinY.getY()):
	# 			getMinY= allsinglelines[i].v2


	# for i in range(len(allsinglelines)):
	# 	if(allsinglelines[i].v1.getX()>getMaxX.getX()):
	# 		getMaxX=allsinglelines[i].v1
	# 	elif(allsinglelines[i].v2.getX()>getMaxX.getX()):
	# 		getMaxX=allsinglelines[i].v2
	# for i in range(len(allsinglelines)):
	# 	if(allsinglelines[i].v1.getX()<getMinX.getX()):
	# 		getMinX=allsinglelines[i].v1
	# 	elif(allsinglelines[i].v2.getX()<getMinX.getX()):
	# 		getMinX=allsinglelines[i].v2



	# bseLineV1_el = Vector(getMinX.getX(), getMinY.getY()+3000)
	# bseLineV2_el = Vector(getMaxX.getX(), getMinY.getY()+3000)

	# msp.add_circle((getMinX.getX(), getMinX.getY()), radius=300)	
	# msp.add_circle((getMaxX.getX(), getMaxX.getY()), radius=300)
	# msp.add_circle((getMinY.getX(), getMinY.getY()), radius=300)	
	# msp.add_circle((getMaxY.getX(), getMaxY.getY()), radius=300)	

	# bsl_el = Line(bseLineV1_el,bseLineV2_el)
	# bsl_el.draw(msp,'Default')		

	# front_sides = []
	# #find projecttions of closest lines

	# for i in range(len(allsinglelines)):
	# 	if(int(allsinglelines[i].v1.getY())==int(allsinglelines[i].v2.getY())):
	# 		front1 = True
	# 		front2 = True
	# 		#remember inverse world
	# 		for j in range(len(allsinglelines)):
	# 				if(allsinglelines[j].v1.getY()==allsinglelines[j].v2.getY()):#if j horizontal line			
	# 					if(allsinglelines[j].v1.getY()<allsinglelines[i].v1.getY()):#if j below than i line
	# 						x1 = Vector(allsinglelines[i].v1.getX(),allsinglelines[j].v1.getY())#project point on j
	# 						x2 = Vector(allsinglelines[i].v2.getX(),allsinglelines[j].v1.getY())
	# 						if(distance(allsinglelines[j].v1,allsinglelines[j].v2)==(distance(allsinglelines[j].v1,x1)+distance(x1,allsinglelines[j].v2))):#if projected point on j line
	# 							front1 = False
	# 						if(distance(allsinglelines[j].v1,allsinglelines[j].v2)==(distance(allsinglelines[j].v1,x2)+distance(x2,allsinglelines[j].v2))):
	# 							front2 = False
	# 		if(front1 ==True):
	# 			front_sides.append(allsinglelines[i].v1)

	# 		if(front2 ==True):
	# 			front_sides.append(allsinglelines[i].v2)				


	# for i in range(len(front_sides)):
	# 	vcopy = Vector(front_sides[i].getX(),bseLineV1_el.getY())
	# 	l1 = Line(front_sides[i],vcopy)
	# 	l1.draw(msp,'Default')






	file_key = secrets.token_hex(nbytes=16)
	today = date.today()
	doc.saveas("{}-{}.dxf".format(today,file_key))	
	return "{}-{}.dxf".format(today,file_key)


	#known issues
	'''
	1. duplicate lines
	2. non overlapping lines
	3. single cell concave shapes
	4. 

	'''