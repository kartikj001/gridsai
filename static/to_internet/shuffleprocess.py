
import json
from random import *
from utils import *


prime_array = []

def checkPrime(num):
	if num > 1:	   
	   for i in range(2,int(num)):
	       if (int(num) % i) == 0:	          
	           return False
	           break
	   else:
	       return True
	else:
	   return False


for i in range(300):
	if(checkPrime(i)):
		prime_array.append(i)


def comboSearch(num1,num2, array):

	if(num1%num2==0):	
		combo1 = num2
		combo2 = num1/num2
		array.append(combo1)		
		return comboSearch(combo2,num2,array)





def itemIncludes(item,arrayV):
	result = False
	for i in range(0,(len(arrayV))):
		if (item.getX()==arrayV[i].getX() and item.getY()==arrayV[i].getY()):
			result=True
			break
		else:
			result=False
	return result





def shufflers(inData):
	allCellX = []
	allCellY = []
	allCol = []
	already_drawn = []
	borderV = []
	# print(inData)
	shuffle(inData)
	# print(inData)
	for i in inData:
		col = i.get('c')
		fig1 = i.get('n')
		
		if fig1>=10:
			if checkPrime(fig1):
				fig1+=(randrange(1,5,2))
			elif fig1==1:
				fig1+=(randrange(6,24,2))
		

		
		############get least multipliers and random size#########

		proportional_judgement = False
		prop_counter = 0
		while proportional_judgement==False:
			prop_counter+=1
			size1 = 1 #l b h value
			size2 = 1 #l b h value
			least_multipliers = []
			for prime in prime_array:
				combo  = comboSearch(fig1,prime,least_multipliers)		
			if(len(least_multipliers)>2):
				grp_1 = randrange(1, len(least_multipliers)-1, 1)
			else:
				grp_1 = 1

			grp_2 = len(least_multipliers)-grp_1
			
			shuffle(least_multipliers)
			
			arr1 = []
			arr2 = []

			if (len(least_multipliers)>1):
				for j  in range(grp_1):
					arr1.append(least_multipliers[j])
				for j in range(grp_1,len(least_multipliers)):
					arr2.append(least_multipliers[j])		
			else:
				if(least_multipliers):
					arr1.append(least_multipliers[0])
					arr2.append(1)
		
			for j in range(len(arr1)):
				size1 *= arr1[j]
			for j in range(len(arr2)):
				size2 *= arr2[j]
			
			

			proportion1 = size1/size2
			if proportion1<1:
				proportion1 = size2/size1		

			

			if proportion1<3 and (size1!=2 or size2!=2) :
				proportional_judgement=True			
			elif prop_counter==10:				
				proportional_judgement=True			
				
			#empty arrays to reduce memory load
	


		#######################################

		gridsize = i.get('g')		
		minX = i.get('minSiteX')
		minY = i.get('minSiteY')
		maxX = i.get('maxSiteX')
		maxY = i.get('maxSiteY')
	


	###################################
		
		if (len(allCol)==0):
			midX = (minX+((maxX-minX)/2))-((minX+((maxX-minX)/2))%gridsize)
			midY = (minY+((maxY-minY)/2))-((minY+((maxY-minY)/2))%gridsize)	

			xpos = randrange(midX-(gridsize*8),midX+(gridsize*4), gridsize) 
			ypos = randrange(midY-(gridsize*8),midY+(gridsize*4), gridsize)
			# xpos = midX
			# ypos = midY
			startV = Vector(xpos,ypos)
			xsize = size1-1 # remember no gridsize multiplication here
			ysize = size2-1
			sizeV = Vector(xsize*gridsize,ysize*gridsize)	
			current_space = []
			#draw first item on default sizes and location
			all_direction_first_cell = [[1,1],[1,-1],[-1,-1],[-1,1]]
			direction_f_cell = choice(all_direction_first_cell)
			l=0
			while (l<=((xsize)*gridsize)):
				k=0
				while (k<=((ysize)*gridsize)):				
					vec = Vector(startV.getX()+(l*direction_f_cell[0]),startV.getY()+(k*direction_f_cell[1]))						
					allCellX.append(vec.getX())
					allCellY.append(vec.getY())
					allCol.append(col)					
					already_drawn.append(vec)
					current_space.append(vec)			
					k+=gridsize
				l+=gridsize

			#get border vectors
			
		
			
			for iV in range(0,len(current_space)):
				corner_counter1 = 0
				
				topV = Vector(current_space[iV].getX(),current_space[iV].getY()-gridsize)
				bottomV = Vector(current_space[iV].getX(),current_space[iV].getY()+gridsize)
				leftV = Vector(current_space[iV].getX()-gridsize,current_space[iV].getY())
				rightV = Vector(current_space[iV].getX()+gridsize,current_space[iV].getY())
				singleSurround = [topV,bottomV,leftV,rightV]				
				for itemV in singleSurround:					
					if (itemIncludes(itemV,current_space)==False):
						corner_counter1 +=1						
						
					if corner_counter1==2:

						borderV.append(itemV)
					
			#for inner border points




			# for itemV in range(0,len(duplicates2)):
			# 	borderV.append(duplicates2[itemV])

			# for itemV in surroundingV:
			# 	# check whether the item is missing on one side
			# 	# topV = Vector(current_space[iV].getX(),current_space[iV].getY()-gridsize)
			# 	# bottomV = Vector(current_space[iV].getX(),current_space[iV].getY()+gridsize)
			# 	# leftV = Vector(current_space[iV].getX()-gridsize,current_space[iV].getY())
			# 	# rightV = Vector(current_space[iV].getX()+gridsize,current_space[iV].getY())
			# 	# if (itemIncludes(rightV,surroundingV)==False):			
			# 	# 	if (itemIncludes(leftV,surroundingV)):
			# 	# 		borderV.append(itemV)
			# 	# if (itemIncludes(rightV,surroundingV)):
			# 	# 	if (itemIncludes(leftV,surroundingV)==False):
			# 	# 		borderV.append(itemV)
			# 	# if (itemIncludes(bottomV,surroundingV)):
			# 	# 	if(itemIncludes(topV,surroundingV)==False):
			# 	# 		borderV.append(itemV)
			# 	# if (itemIncludes(bottomV,surroundingV)==False):
			# 	# 	if(itemIncludes(topV,surroundingV)):
			# 	# 		borderV.append(itemV)
			# 	borderV.append(itemV)
								

			# print(len(borderV))

		elif (len(allCol)!=0):
			counter = 0
			final_judgement = False
			judgement = False
			while final_judgement == False:
				#CHOOSE START POINT AT THE BOUNDRY OF THE DRAWN ELEMENTS
				while judgement==False:				
					selV = choice(borderV)
					
					if itemIncludes(selV,already_drawn)==False:
						startV = Vector(selV.getX(),selV.getY())
						judgement=True
				xsize = size1-1 # remember no gridsize multiplication here
				ysize = size2-1
				sizeV = Vector(xsize*gridsize,ysize*gridsize)		
				current_space = []
				
				# #CHECK WHAT IF WE DRAW A SPACE DOES IT OVERLAPS WITH ALREADY DRAWN, CHECK 4 DIRECTION, IF NOT THEN RESTART START POINT SELECTION PROCESS
				# #we have start v and direction. we have to say that if there is space then alot cells in perticular direction
				# all_direction = []
				# topStartV = Vector(startV.getX(),startV.getY()-gridsize)
				# bottomStartV = Vector(startV.getX(),startV.getY()+gridsize)
				# leftStartV = Vector(startV.getX()-gridsize,startV.getY())
				# rightStartV = Vector(startV.getX()+gridsize,startV.getY())
				# #right and bottom lock
				# if(itemIncludes(topStartV,already_drawn)==False) and (itemIncludes(leftStartV,already_drawn)==False) and (itemIncludes(rightStartV,already_drawn)) and (itemIncludes(bottomStartV,already_drawn)):
				# 	all_direction = [[-1,-1]]	
				# # top and left block
				# elif(itemIncludes(topStartV,already_drawn)) and (itemIncludes(leftStartV,already_drawn)) and (itemIncludes(rightStartV,already_drawn)==False) and (itemIncludes(bottomStartV,already_drawn)==False):
				# 	all_direction = [[1,1]]
				# #left and bottom block
				# elif(itemIncludes(topStartV,already_drawn)==False) and (itemIncludes(leftStartV,already_drawn)) and (itemIncludes(rightStartV,already_drawn)==False) and (itemIncludes(bottomStartV,already_drawn)):
				# 	all_direction = [[1,-1]]
				# #right and top block	
				# elif(itemIncludes(topStartV,already_drawn)) and (itemIncludes(leftStartV,already_drawn)==False) and (itemIncludes(rightStartV,already_drawn)) and (itemIncludes(bottomStartV,already_drawn)==False):
				# 	all_direction = [[-1,1]]
				# #right block
				# elif(itemIncludes(topStartV,already_drawn)==False) and (itemIncludes(leftStartV,already_drawn)==False) and (itemIncludes(rightStartV,already_drawn)) and (itemIncludes(bottomStartV,already_drawn)==False):
				# 	all_direction = [[-1,-1],[-1,1]]
				# #left block
				# elif(itemIncludes(topStartV,already_drawn)==False) and (itemIncludes(leftStartV,already_drawn)) and (itemIncludes(rightStartV,already_drawn)==False) and (itemIncludes(bottomStartV,already_drawn)==False):
				# 	all_direction = [[1,-1],[1,1]]
				# #top block
				# elif(itemIncludes(topStartV,already_drawn)) and (itemIncludes(leftStartV,already_drawn)==False) and (itemIncludes(rightStartV,already_drawn)==False) and (itemIncludes(bottomStartV,already_drawn)==False):
				# 	all_direction = [[1,1],[-1,1]]
				# #bottom block
				# elif(itemIncludes(topStartV,already_drawn)==False) and (itemIncludes(leftStartV,already_drawn)==False) and (itemIncludes(rightStartV,already_drawn)==False) and (itemIncludes(bottomStartV,already_drawn)):
				# 	all_direction = [[1,-1],[-1,-1]]

				all_direction = [[1,1],[1,-1],[-1,-1],[-1,1]]
				space_judgement = False
				selected_direction = []
				while space_judgement==False:	
					counter+=1

					direction = choice(all_direction)
					empty = []						
					l=0
					while (l<=((xsize)*gridsize)):
						k=0
						while (k<=((ysize)*gridsize)):				
							vec = Vector(startV.getX()+(l*direction[0]),startV.getY()+(k*direction[1]))	#DRAW SPACE					
							if(itemIncludes(vec,already_drawn)==False): #PUT CELLS THAT DOES NOT OVERLAP IN EMPTY ARRAY
								empty.append(vec)

							k+=gridsize
						l+=gridsize

					if (len(empty)==fig1): #IF ALL CELLS DOES NOT OVERLAP THEN CHOOSE SPACE
						selected_direction.append(direction)
						space_judgement=True
					elif (counter==10):
						return shufflers(inData)
						# selected_direction.append(direction)
						# space_judgement=True
							
				all_direction=[]
			    #DRAW SPACE ON SELECTED DIRECTION
				l=0	
				while (l<=((xsize)*gridsize)):
					k=0
					while (k<=((ysize)*gridsize)):				
						vec = Vector(startV.getX()+(l*selected_direction[0][0]),startV.getY()+(k*selected_direction[0][1]))						
						allCellX.append(vec.getX())
						allCellY.append(vec.getY())
						allCol.append(col)					
						already_drawn.append(vec)
						current_space.append(vec)			
						k+=gridsize
					l+=gridsize

				# print(len(allCellX),len(allCellX),len(allCol))

				surroundingV=[]
				#create surroudings / get boundry cells
				for iV in range(len(current_space)):
					
					topV = Vector(current_space[iV].getX(),current_space[iV].getY()-gridsize)
					bottomV = Vector(current_space[iV].getX(),current_space[iV].getY()+gridsize)
					leftV = Vector(current_space[iV].getX()-gridsize,current_space[iV].getY())
					rightV = Vector(current_space[iV].getX()+gridsize,current_space[iV].getY())

					corner_counter2 = 0
					inner_counter=0

					singleSurround = [topV,bottomV,leftV,rightV]
					for itemV in singleSurround: #CHECK ALL SIDES OF EACH CELL
						if (itemIncludes(itemV,current_space)==False): #IF CELL DOES NOT FALL MEANS IT IS ON BONDRY
							corner_counter2 +=1
											
						if corner_counter2==2:
							if (itemV.getX()>=minX) and (itemV.getY()>=minY) and (itemV.getX()<=maxX) and (itemV.getY()<=maxY):
								borderV.append(itemV)
					
					




				final_judgement=True

		# print(len(allCellX),len(allCellY), len(allCol), xsize, ysize)




	# mininputX = inData[0].get('minSiteX')
	# maxinputX = inData[0].get('maxSiteX')
	# mininputY = inData[0].get('minSiteY')
	# maxinputY = inData[0].get('maxSiteY')
		

	# minoutputX = min(allCellX)
	# maxoutputX = max(allCellX)
	# minoutputY = min(allCellY)
	# maxoutputY = max(allCellY)
	
	# leftCheck =  minoutputX-mininputX
	# rightCheck = maxoutputX-maxinputX
	# topCheck =  minoutputY-mininputY
	# bottomCheck = maxoutputY-maxinputY
	
	# inputCenterX = mininputX+(maxinputX-mininputX)
	# inputCenterY = mininputY+(maxinputY-mininputY)
	# outputCenterX = minoutputX+(maxoutputX-minoutputX)
	# outputCenterY = minoutputY+(maxoutputY-minoutputY)

	# centerCorrectX = (inputCenterX-outputCenterX)- ((inputCenterX-outputCenterX)%gridsize)
	# centerCorrectY = (inputCenterY-outputCenterY)- ((inputCenterY-outputCenterY)%gridsize)

	# # print(mininputX, minoutputY, maxoutputX, maxoutputY)

	# if centerCorrectX>0:
	# 	for item in range(len(allCol)):
	# 		allCellX[item]+=centerCorrectX
	# elif centerCorrectX<0:
	# 	for item in range(len(allCol)):
	# 		allCellX[item]-=centerCorrectX



	# if centerCorrectY>0:
	# 	for item in range(len(allCol)):
	# 		allCellY[item]+=centerCorrectY
	# elif centerCorrectY<0:
	# 	for item in range(len(allCol)):
	# 		allCellY[item]-=centerCorrectY


	# if leftCheck<0:#building on left
	# 	for item in range(len(allCol)):
	# 		allCellX[item]+=leftCheck
	
	# if rightCheck<0:#building on right
	# 	for item in range(len(allCol)):
	# 		allCellX[item]-=rightCheck

	# # if topCheck<0:#building on up
	# 	for item in range(len(allCol)):
	# 		allCellY[item]+=topCheck
	
	# # if bottomCheck<0:#building on down
	# # 	for item in range(len(allCol)):
	# # 		allCellY[item]-=bottomCheck


	finalExport = []

	for item in range(len(allCol)):
		obj1 = {
			"x":allCellX[item],
			"y":allCellY[item],
			"c":allCol[item]
		}
		finalExport.append(obj1)
		 
	
	outData = json.dumps(finalExport, indent=4)
	
	return outData


