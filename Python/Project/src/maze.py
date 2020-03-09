#!/usr/bin/python3
# -*- coding: utf-8 -*-

"""
:mod:`maze` module 

:author: ` Jouniau,Debachy,Bivolarov 
         

:date: 2018, november

"""

from cell import *
from random import *
from copy import deepcopy
import sys


class Maze():
    """
    class for mazes

    >>> maze=Maze(4,5)
    >>> maze
    +-+-+-+-+
    | | | | |
    +-+-+-+-+
    | | | | |
    +-+-+-+-+
    | | | | |
    +-+-+-+-+
    | | | | |
    +-+-+-+-+
    | | | | |
    +-+-+-+-+
    >>> maze.get_height()
    5
    >>> maze.get_width()
    4
    >>> maze.is_cell(0,0,'N')
    False
    >>> maze.is_cell(0,0,'S')
    True
    >>> maze.dest_wall(0,0,'S')
    >>> maze
    +-+-+-+-+
    | | | | |
    + +-+-+-+
    | | | | |
    +-+-+-+-+
    | | | | |
    +-+-+-+-+
    | | | | |
    +-+-+-+-+
    | | | | |
    +-+-+-+-+
    >>> maze.maze_cell[0][0].test_wall('S')
    False
    >>> maze.ad_wall(0,0,'S')
    >>> maze.maze_cell[0][0].test_wall('S')
    True
    >>> maze.is_finished()
    False
    >>> Maze(4,5).create_perfect_maze().is_finished()
    True
    """
    def __init__(self,width,height):
        """
        create a maze with a width ,a height and a list of Cells objects.

        This method is implicitely called at object creation.

        :param width: 
        :type width: int
        :param height: 
        :type height: int
        :raises: ``AssertionError`` if params are not int
        :Examples:

        >>> maze=Maze(4,5)
        >>> maze.get_height()
        5
        >>> maze.get_width()
        4
        
        """
        assert type(width) in {int}, 'first argument is not an int'
        assert type(height) in {int}, 'second argument is not an int'
        self.__width = width
        self.__height = height
        self.maze_cell = [[ Cell(x*height+y) for x in range(self.__width)] for y in range(self.__height)]


    def get_width(self):
        """
        return the width of the maze

        :return: the width of self
        :rtype: int
        :UC: None
        :Example:
        
        >>> maze=Maze(5,8)
        >>> maze.get_width()
        5
        """
        return self.__width

    def get_height(self):
        """
        return the height of the maze

        :return: the height of self
        :rtype: int
        :UC: None
        :Example:
        >>> maze=Maze(5,8)
        >>> maze.get_height()
        8
        """
        return self.__height

    def __repr__(self) :
        """
        :return: an external representation of a maze
           (for visualizing maze in interactive mode for example)
        :rtype: str
        :UC: None
        :Example:
        
        >>> Maze(5,5)
        +-+-+-+-+-+
        | | | | | |
        +-+-+-+-+-+
        | | | | | |
        +-+-+-+-+-+
        | | | | | |
        +-+-+-+-+-+
        | | | | | |
        +-+-+-+-+-+
        | | | | | |
        +-+-+-+-+-+
        """
        a = ''
        for j in range(self.get_height()):
            a += '+'
            for i in range(self.get_width()) :
                if self.maze_cell[j][i].test_wall('N') == True:
                    a += '-+'
                else:
                    a += ' +'
            a += '\n'
            if self.maze_cell[j][0].test_wall('W') == True:
                a += '|'
            else:
                a += ' '
            for c in range(self.get_width()):
                if self.maze_cell[j][c].test_wall('E')==True:
                     a += ' |'
                else:
                    a += '  '
            a += '\n'
        a += '+'
        for y in range(self.get_width()):
            if self.maze_cell[self.get_height()-1][y].test_wall('S')==True:
                    a += '-+'
            else:
                    a += ' +'
        return a 


    
    
    def is_cell(self,y,x,wall):
        """
        :return: a boolean verifying if there's a Cell or not at this emplacement

        :rtype: boolean
        :UC: None
        :Example:

        >>> maze=Maze(4,5)
        >>> maze
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        >>> maze.is_cell(0,0,'N')
        False
        >>> maze.is_cell(0,0,'S')
        True
        """
        if x==0 and wall=='N':
            return False
        elif x==self.get_height()-1 and wall=='S':
            return False
        elif y==self.get_width()-1 and wall=='E':
            return False
        elif y==0 and wall=='W':
            return False
        else:
            return True

    def dest_wall(self,x,y,wall):
        """
        Destroy the wall in the maze described by x,y and wall
        
        :return: none
        :param x:
        :type x: int
        :param y:
        :type y: int
        :param wall:
        :type wall: str
        :UC: x,y < width,height; wall =='N' or 'S' or 'W' or 'E'
        :Examples:

        >>> maze=Maze(4,5)
        >>> maze
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        >>> maze.dest_wall(0,0,'S')
        >>> maze
        +-+-+-+-+
        | | | | |
        + +-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        
        """
        self.maze_cell[y][x].destroy_wall(wall)
        if self.is_cell(x,y,wall)==True:
            if wall=='N':
                self.maze_cell[y-1][x].destroy_wall('S')
            elif wall=='S':
                self.maze_cell[y+1][x].destroy_wall('N')
            elif wall=='E':
                self.maze_cell[y][x+1].destroy_wall('W')
            elif wall=='W':
                self.maze_cell[y][x-1].destroy_wall('E')
         


    def ad_wall(self,x,y,wall):
        """
        Build the wall in the maze described by x,y and wall
        
        :return: none
        :param x:
        :type x: int
        :param y:
        :type y: int
        :param wall:
        :type wall: str
        :UC: x,y < width,height; wall =='N' or 'S' or 'W' or 'E'
        :Examples:
        
        >>> maze=Maze(4,5)
        >>> maze
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        >>> maze.dest_wall(0,0,'S')
        >>> maze
        +-+-+-+-+
        | | | | |
        + +-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        >>> maze.ad_wall(0,0,'S')
        >>> maze
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        | | | | |
        +-+-+-+-+
        
        """
        self.maze_cell[y][x].add_wall(wall)
        if self.is_cell(x,y,wall)==True:
            if wall=='N':
                self.maze_cell[y-1][x].add_wall('S')
            elif wall=='S':
                self.maze_cell[y+1][x].add_wall('N')
            elif wall=='E':
                self.maze_cell[y][x+1].add_wall('W')
            elif wall=='W':
                self.maze_cell[y][x-1].add_wall('E')

                    
    def draw_by_yourself(self):
        """
        A function that let you to draw your own maze by destroying or adding walls.
        
        :UC: None 
        """
        
        res = False
        while not res :
            print('')
            s = input('You choose x,y,B,W,Y/N (B=(D)estroy,(A)dd) (W=(N)orth,(S)outh,(W)est,(E)ast)(Finished:(Y)es or (N)o) : ')
            x,y,B,W,F = s.split(",")
            x=int(x)
            y=int(y)
            if B == 'D':
                self.dest_wall(x,y,W)
                print(self)
            elif B == 'A':
                self.ad_wall(x,y,W)
                print(self)
            if F == 'Y' :
                res = True
            

    def is_finished(self):
        """
        Tells you whenever the maze is finished or not
        
        :rtype: boolean
        :UC: None
        :Examples:
        
        >>> Maze(5,5).is_finished()
        False
        >>> Maze(5,5).create_perfect_maze().is_finished()
        True
        
        """
        e=self.maze_cell[0][0].get_value()
        for i in range(self.get_height()):
            for j in range(self.get_width()):
                if self.maze_cell[i][j].get_value()!=e:
                    return False
        return True
                
    def create_perfect_maze(self):
        """
        return a perfect maze crated randomly
        
        :rtype: Maze
        :UC: None
        :Examples:

        >>> Maze(5,5).create_perfect_maze().is_finished()
        True
        
        """
        while not self.is_finished():
            b=['N','S','E','W']
            a=randint(0,self.get_height()-1)
            d=randint(0,self.get_width()-1)
            c=b[randint(0,3)]
            if self.is_cell(d,a,c):
                if c=='N' and self.maze_cell[a][d].get_value()!=self.maze_cell[a-1][d].get_value():
                    self.dest_wall(d,a,c)
                    e=self.maze_cell[a][d].get_value()
                    for i in range(self.get_height()):
                        for j in range(self.get_width()):
                            if self.maze_cell[i][j].get_value()==e:
                                self.maze_cell[i][j].change_value(self.maze_cell[a-1][d].get_value())
                elif c=='S' and self.maze_cell[a][d].get_value()!=self.maze_cell[a+1][d].get_value():
                    self.dest_wall(d,a,c)
                    e=self.maze_cell[a][d].get_value()
                    for i in range(self.get_height()):
                        for j in range(self.get_width()):
                            if self.maze_cell[i][j].get_value()==e:
                                self.maze_cell[i][j].change_value(self.maze_cell[a+1][d].get_value())
                elif c=='W' and self.maze_cell[a][d].get_value()!=self.maze_cell[a][d-1].get_value():
                    self.dest_wall(d,a,c)
                    e=self.maze_cell[a][d].get_value()
                    for i in range(self.get_height()):
                        for j in range(self.get_width()):
                            if self.maze_cell[i][j].get_value()==e:
                                self.maze_cell[i][j].change_value(self.maze_cell[a][d-1].get_value())
                elif c=='E' and self.maze_cell[a][d].get_value()!=self.maze_cell[a][d+1].get_value():
                    self.dest_wall(d,a,c)
                    e=self.maze_cell[a][d].get_value()
                    for i in range(self.get_height()):
                        for j in range(self.get_width()):
                            if self.maze_cell[i][j].get_value()==e:
                                self.maze_cell[i][j].change_value(self.maze_cell[a][d+1].get_value())
        return self 



    def find_a_road(self , x1 , y1 , x2 , y2) :
            """
            return a list of coordonates of cells leading from the Cell defined by x1 and y1 to the Cell defined by x2 and y2
            
            :param x1:
            :type x1: int
            :param y1:
            :type y1: int
            :param x2:
            :type x2: int
            :param y2:
            :type y2: int
            :UC: x1,y1,x2,y2 < width,height,width,height
            """
            road=[]
            copy= deepcopy(self)
            while x1!=x2 or y1!=y2:
                road+=[(x1,y1)]
                if (not copy.maze_cell[y1][x1].test_wall('N')) and copy.is_cell(x1,y1,'N') and (x1,y1-1) not in road:
                    y1-=1
                elif (not copy.maze_cell[y1][x1].test_wall('S')) and copy.is_cell(x1,y1,'S') and (x1,y1+1) not in road:
                    y1+=1
                elif (not copy.maze_cell[y1][x1].test_wall('E')) and copy.is_cell(x1,y1,'E') and (x1+1,y1) not in road:
                    x1+=1
                elif (not copy.maze_cell[y1][x1].test_wall('W')) and copy.is_cell(x1,y1,'N') and (x1-1,y1) not in road:
                    x1-=1
                else:
                    x1,y1=road[-2][0],road[-2][1]
                    road=road[0:-2]
                    if (not copy.maze_cell[y1][x1].test_wall('N')) and (x1,y1-1) not in road :
                        copy.ad_wall(x1,y1,'N')
                    elif (not copy.maze_cell[y1][x1].test_wall('S')) and (x1,y1+1) not in road :
                        copy.ad_wall(x1,y1,'S')
                    elif (not copy.maze_cell[y1][x1].test_wall('E')) and (x1+1,y1) not in road :
                        copy.ad_wall(x1,y1,'E')
                    elif (not copy.maze_cell[y1][x1].test_wall('W')) and (x1-1,y1) not in road :
                        copy.ad_wall(x1,y1,'W')
            road+=[(x2,y2)]
            
            return road
                         

    def write2text_file(self , out_filename) :
        """
        create a outfile with a description of the Maze with his height and width

        :param out_filename: the name of the file that'll be created
        :type out_filename: str
        :UC: None
        """
        with open(out_filename , 'w') as file :
            file.write(str(self.get_height()) + '\n' + str(self.get_width()) + '\n' + self.__repr__())
        
def usage() :
    """
    """
    print( "Usage in terminal :pyton3 {} x y -> create a maze with x in width and y in heigth".format(sys.argv[0]))
    print("\t x and y must be positive int")
    print("")
    print( "Usage in terminal :pyton3 {} x y perfect -> create perfect maze with x in width and y in heigth".format(sys.argv[0]))
    print("\t x and y must be positive int")
    print('')
    print('\t if F : Usage : Choose the coordonnates : x1,y1,x2,y2')
    print('\t \t x1,x2 < x and y1,y2 < y')
    print('')
    print('\t if W : Usage : Name of the file you want to create : filename.txt')
    print('\t \t Your filename must finish by .txt')
    print('')
    print('Usage in terminal :python3 {} x y draw -> create a maze with x in width and y in heigth'.format(sys.argv[0]))
    print("\t x and y must be positive int")
    print('You choose x1,y1,B,W,Y/N')
    print("\t x1 and y1 must be positive int and x1 < x , y1 < y")
    print('\t B must be A or D and W must be N , S , W or E')
    print('\t There must be 5 parameter after You choose x1,y1,B,W,Y/N... :')
    print('\n')
    

def usage1():
    """
    """
    print( "Usage in terminal :pyton3 {} x y -> create a maze with x in width and y in heigth".format(sys.argv[0]))
    print("\t x and y must be positive int")
    print("\n")

def usage2() :
    """
    """
    print( "Usage in terminal :pyton3 {} x y perfect -> create perfect maze with x in width and y in heigth".format(sys.argv[0]))
    print("\t x and y must be positive int")
    print("\n")
    print('\t if F : Usage : Choose the coordonnates : x1,y1,x2,y2')
    print('\t \t x1,x2 < x and y1,y2 < y')
    print('')
    print('\t if W : Usage : Name of the file you want to create : filename.txt')
    print('\t \t Your filename must finish by .txt')

def usage3() :
    print('Usage in terminal :python3 {} x y draw -> create a maze with x in width and y in heigth'.format(sys.argv[0]))
    print("\t x and y must be positive int")
    print('')
    print('You choose x1,y1,B,W,Y/N')
    print("\t x1 and y1 must be positive int and x1 < x , y1 < y")
    print('\t B must be A or D and W must be N , S , W or E')
    print('\t There must be 5 parameter after You choose x1,y1,B,W,Y/N... :')
    print('\n')
    
def main() :
    """
    """
    if len(sys.argv) == 3 :
        try:
            maze=Maze(int(sys.argv[1]),int(sys.argv[2]))
            print(maze)
        except:
            usage1()
            
    elif len(sys.argv)==4 and sys.argv[3] == 'perfect':
        a=0
        try:
            maze=Maze(int(sys.argv[1]),int(sys.argv[2])).create_perfect_maze()
            print(maze)
            while(a==0):
                i = input('You can (F)ind a road, (W)rite your maze in a file or (S)top : ')
                if i == 'F' :
                    g = input('Choose the coordonnates : ')
                    x1,y1,x2,y2 = g.split(',')
                    print(maze.find_a_road(int(x1),int(y1),int(x2),int(y2)))
                
                elif i == 'W':
                    p = input('Name of the file you want to create : ')
                    maze.write2text_file(p)
                elif i == 'S':
                    print('Finish')
                    a=1
        except:
            usage2()
            main()
    
    elif len(sys.argv)==4 and sys.argv[3] == 'draw':
        try:
            maze=Maze(int(sys.argv[1]),int(sys.argv[2]))
            print(maze)
            maze.draw_by_yourself()
        except:
            usage3()
            
    else:
        usage()

  
if __name__ == '__main__':
    main()   
                   


