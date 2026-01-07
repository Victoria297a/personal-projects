import sys
import time
import os
import random
from turtle import color
def clear_console():
    os.system('cls' if os.name == 'nt' else 'clear')

def print_tree(lights):
    tree = [
        "        *        ",
        "       ***       ",
        "      *****     ",
        "     *******     ",
        "    *********    ",
        "   ***********   ",
        "       |||       "
    ]
    
    colors = {
        'pink': '\033[95m',
        'purple': '\033[35m',
        'white': '\033[97m',
        'brown': '\033[33m',
        'reset': '\033[0m'
    }

    for line in tree:
        for char in line:
            if char == '*':
                color = random.choice(list(colors.values()))
                print(color + char, end="")
            elif char == '|':
                print(colors['brown'] + char, end="")
            else:
                print(" ", end="")
        print(colors['reset'])
def main():
    while True:
        clear_console()
        print_tree(6)
        time.sleep(0.5)
        
        
if __name__ == "__main__":
    main()