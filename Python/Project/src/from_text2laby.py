#!/usr/bin/python3
# -*- coding: utf-8 -*-

"""

:author: ` Jouniau,Debachy,Bivolarov 
         

:date: 2018, december

"""

from cell import *
from maze import *
import sys

def from_text2laby(file):
    """
    return the maze created from the path of the maze described in the file

    :return: a maze
    :rtype: Maze
    :UC: The name of the file must exist
    :Examples:
    
    >>> from_text2laby("maze_5_5_0.txt")
    +-+-+-+-+-+
    |       | |
    + + +-+-+ +
    | |   |   |
    + +-+ + +-+
    |   | |   |
    +-+ +-+ +-+
    |     | | |
    +-+ + + + +
    |   |     |
    +-+-+-+-+-+
    >>> from_text2laby("maze_6_4_1.txt")
    +-+-+-+-+-+-+
    | |   |   | |
    + +-+ +-+ + +
    | |   | |   |
    + + +-+ +-+ +
    |         | |
    + +-+ + + + +
    | |   | |   |
    +-+-+-+-+-+-+
    """
    file='../mazes/'+file
    r=open(file,'r')
    w=int(r.readline())
    h=int(r.readline())
    maze=Maze(w,h)
    for i in range(h):
        a=r.readline()
        for y in range(w):
            if a[2*y:2*y+2]=='+ ':
                maze.dest_wall(y,i,'N')
        a=r.readline()
        for j in range(w):
            if a[2*j:2*j+2]=='  ':
                maze.dest_wall(j,i,'W')
        if a[2*w+1]==' ':
            maze.dest_wall(w-1,i,'E')
    a=r.readline()
    for k in range(w):
        if a[2*k:2*k+2]=='+ ':
            maze.dest_wall(k,h-1,'S')
    return maze

def usage() :
    print()
    print('Usage for the terminal : This module helps us for the creating a maze from text file .')
    print('Here how to use it : Once execute the program , you will see something like this : "Choose the file name :" .')
    print('You choose the file name and you will see the representation of the maze .')
    print('You can start using it now .')
    print()

def main() :
    if len(sys.argv) == 1 :
        usage()
        g = input('Choose the text file : ')
        print(from_text2laby(g))
    else :
        usage()

if __name__ == '__main__':
    main()
                   
