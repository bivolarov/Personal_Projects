#!/usr/bin/python3
# -*- coding: utf-8 -*-

"""
:mod:`maze` module 

:author: ` Jouniau,Debachy,Bivolarov 
         

:date: 2018, november


"""

class Cell():
    """
    class for cells of a maze
    a class which support the class Maze

    >>> cell=Cell()
    >>> cell.get_value()
    0
    >>> cell.change_value(5)
    >>> cell.get_value()
    5
    >>> cell.test_wall('N')
    True
    >>> cell.destroy_wall('N')
    >>> cell.test_wall('N')
    False
    >>> cell.add_wall('N')
    >>> cell.test_wall('N')
    True
    
    """
    
    def __init__(self,value=0) :
        """
        create a cell with a dictionnary of all its wall and a value 
        This method is implicitely called at object creation
        
        :param value: the value
        :type value: int
        :Example:
        
        >>> cell=Cell()
        >>> cell.get_value()
        0
        
        """
        self.side_dic = {'N' : True , 'S' : True , 'E' : True , 'W' : True}
        self.value = value


    def get_value(self) :
        """
        return the value of the cell
        
        :return: value of the cell
        :rtype: int
        :UC: None
        :Examples:
        >>> cell=Cell()
        >>> cell.get_value()
        0
        >>> cell.change_value(5)
        >>> cell.get_value()
        5
        """
            
        return self.value

    def change_value(self,v):
        """
        change the value of the cell

        :param v:
        :type v: int
        :UC: none
        :Examples:
        >>> cell=Cell()
        >>> cell.get_value()
        0
        >>> cell.change_value(5)
        >>> cell.get_value()
        5
        """
        self.value=v
        
        
    def test_wall(self, wall) :
        """
        test if there is a wall or not in the defined direction

        :UC: None
        :Examples:
        >>> cell=Cell()
        >>> cell.test_wall('N')
        True
        >>> cell.destroy_wall('N')
        >>> cell.test_wall('N')
        False
        """

        
        if wall=='N':
            return self.side_dic['N']
        elif wall=='S':
            return self.side_dic['S']
        elif wall=='E':
            return self.side_dic['E']
        elif wall=='W':
            return self.side_dic['W']

    def destroy_wall(self,mur):
        """
        destroy the wall of the defined direction

        :UC: None
        :Example:
        >>> cell=Cell()
        >>> cell.test_wall('N')
        True
        >>> cell.destroy_wall('N')
        >>> cell.test_wall('N')
        False
        """

        
        if self.side_dic[mur] == True:
            self.side_dic[mur] = False

    def add_wall(self , mur) :
        """
        add the wall of the defined direction
        
        :UC: None
        :Example:
        >>> cell=Cell()
        >>> cell.test_wall('N')
        True
        >>> cell.destroy_wall('N')
        >>> cell.test_wall('N')
        False
        >>> cell.add_wall('N')
        >>> cell.test_wall('N')
        True
        
        """
        if self.side_dic[mur] == False :
            self.side_dic[mur] = True

if __name__ == '__main__':
    import doctest
    doctest.testmod(optionflags=doctest.NORMALIZE_WHITESPACE | doctest.ELLIPSIS, verbose=True)   
