#!/usr/bin/python3

# Create a pattern that looks like waves. Each wave is a continuous
# cubic spline across the rectangle (joined up to bottom points).
# The color used is a lineargradient from left to right, and those
# are defined at the beginning.
import argparse
from colors import get_color
from colors import get_centroid
import random
import sys

assert sys.version_info >= (3, 0)

def print_header(args):
    mystr = """<?xml version=\"1.0\" encoding=\"utf-8\"?>
<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"{}\" height=\"{}\"
     xmlns:xlink="http://www.w3.org/1999/xlink\">
  <!-- created with "{}" -->
   """
    print(mystr.format(args.width, args.height, ' '.join(sys.argv).replace("--", "-")))


def print_defs(args, ynum, ystep, colors):
    print('<defs>')
    for i in range(ynum):
        left_color = rgb(get_color(args.width, args.height, colors, (0, i * ystep)))
        right_color = rgb(get_color(args.width, args.height, colors, (args.width, i * ystep)))
        print((' <linearGradient id="grad{}">'
               '<stop offset="0%" stop-color="{}"/>'
               '<stop offset="100%" stop-color="{}"/>'
               '</linearGradient>').format(i, left_color, right_color))
    print('</defs>')

def print_footer():
    print("</g></svg>")

def rgb(color):
    #return 'rgb({},{},{})'.format(color[0], color[1], color[2])
    return '#' + ''.join('%02x'%int(i) for i in color)

arguments = argparse.ArgumentParser()
arguments.add_argument('--colors',
                       help='Four colors ul,ll,ur,lr (without #) separated by ","',
                       default='A8B1D1,D3D8E8,7C8ABB,D3D8E8')
arguments.add_argument('--ynum',
                       type=int,
                       default=10)
arguments.add_argument('--width',
                       type=int,
                       default=1000)
arguments.add_argument('--height',
                       type=int,
                       default=1000)
arguments.add_argument('--bg',
                       default='fefefe')
arguments.add_argument('--yoffset',
                       type=int,
                       default=30)
                       

args = arguments.parse_args()

colors = args.colors.split(',')
if len(colors) != 4:
    print('Need four hex colors separated by commas.')
    sys.exit(3)

# Turn colors into an array of four (r,g,b) tuples.
for i in range(len(colors)):
    try:
        colors[i] = tuple(int(colors[i][j:j+2], 16) for j in (0, 2, 4))
    except ValueError:
        print (colors[i], ' is not a color.')
        sys.exit(2)

print_header(args)
ystep = args.height / args.ynum
print_defs(args, args.ynum, ystep, colors)
print ('<g>')
    
print('<rect x="0" y="0" width="{}" height="{}" fill="#{}"/>'.format(args.width, args.height, args.bg))
for i in range(0, args.ynum):
    yleft = i * ystep
    yright = yleft + random.randint(int(args.yoffset/2), args.yoffset)
    args.yoffset = int(args.yoffset * 1.05)
    path = ('<path d="M 0 {} C {},{} {},{} {},{} '
            'l 0,{} C {},{} {},{} 0,{}z" '
            'fill="url(#grad{}" stroke="none"/>').format(yleft, #M
                                                         args.width/4, #control1-x
                                                         yleft - random.randint(1, int(args.yoffset/2)), #control1-y
                                                         3 * args.width/4, #control2-x
                                                         yright,       #control2-y
                                                         args.width,   #x at right
                                                         yright,       #y at right
                                                         ystep, #move y
                                                         3 * args.width/4, #control1-x
                                                         yright + ystep,   #control1-y
                                                         args.width/4,     #control2-x
                                                         yleft + ystep - args.yoffset,    #control2-y
                                                         yleft + ystep,
                                                         i)
    print(path)
print_footer()
