#!/usr/bin/python3
# -*- coding: utf-8 -*-

from tkinter import *
from maze import Maze
import sys

CAN_WIDTH = 500
CAN_HEIGHT = 500
BG_COLOR = 'purple'
GRID_COLOR = 'pink'


    
def draw_a_road(canvas,maze,width,height) :
    
    """
    Find the road and draw it .
    """
    x,y,x2,y2=input('Enter the start position and the final (Xstart,Ystart,Xfinal,Yfinal) :').split(',')
    x=int(x)
    y=int(y)
    x2=int(x2)
    y2=int(y2)
    DX = CAN_WIDTH // width
    DY = CAN_HEIGHT // height
    road=maze.find_a_road(x,y,x2,y2)
    for i in road:
        canvas.create_oval(i[0]*DX-(DX//4)+DX//2,i[1]*DY-(DY//4)+DY//2,i[0]*DX+(DX//4)+DX//2,i[1]*DY + DY//2 + DY//4, fill='palevioletred1')

def draw_maze(canvas,maze):
    """
    draw the maze on the canvas
    :param canvas:
    :type canvas: canvas
    :param maze:
    :type maze: Maze
    """
    canvas.delete("all")
    width=maze.get_width()
    height=maze.get_height()
    DX = CAN_WIDTH // width
    DY = CAN_HEIGHT // height
    for y in range(height):
        for x in range(width):
            if maze.maze_cell[y][x].test_wall('N'):
                canvas.create_line(x * DX, y * DY,
                                   (x + 1) * DX, y * DY,
                                   fill=GRID_COLOR, width=1)
        for x in range(width):
            if maze.maze_cell[y][x].test_wall('W'):
                canvas.create_line(x * DX, y * DY,
                                   x * DX, (y + 1) * DY,
                                   fill=GRID_COLOR, width=1)
        if maze.maze_cell[y][width-1].test_wall('E'):
            canvas.create_line( (width) * DX, y * DY,
                                       (width) * DX, (y + 1) * DY,
                                       fill=GRID_COLOR, width=1)
    for x in range(width):
            if maze.maze_cell[height-1][x].test_wall('S'):
                canvas.create_line(x * DX, (height) * DY,
                                   (x + 1) * DX, (height) * DY,
                                   fill=GRID_COLOR, width=1)
    canvas.update()


def reset(w):
    w.destroy()
    main()
    

def main():
    """
    The function to draw a maze with all of its walls
    """
    width,height=input('Enter Width,Height :').split(',')
    width=int(width)
    height=int(height)
    maze = Maze(width,height)
    win = Tk()
    win.title('Maze')
    can = Canvas(win, bg=BG_COLOR, width=CAN_WIDTH, height=CAN_HEIGHT)
    draw_maze(can , maze)
    can.pack()
    b_1 = Button(win , text = 'Create perfect maze',cursor = 'heart' , command =lambda : draw_maze(can, maze.create_perfect_maze()))
    b_1.pack()
    b_2 = Button(win , text = 'Draw the road',cursor = 'heart' , command =lambda : draw_a_road(can , maze , maze.get_width(), maze.get_height() ))
    b_2.pack()
    b_3 = Button(win , text = 'RESET',cursor = 'heart' , command =lambda : reset(win))
    b_3.pack()
    b_4 = Button(win , text = 'STOP',cursor = 'heart' , command =win.destroy)
    b_4.pack()
    
    
    win.mainloop()

def test():
    width,height=input('Enter Width,Height :').split(',')
    width=int(width)
    height=int(height)
    return width+height


def usage() :
    print()
    print('Usage for the terminal : This is our graphical representation of the maze .')
    print('When you start the program , you will see something like that : "Enter width and Height :" ')
    print('Once entered the values of the width and height you will see the graphical interface .')
    print('You can start using it now.')
    print()

def main2() :
    if len(sys.argv) == 1 :
        usage()
        main()


if __name__ == '__main__':
    main2()
    
