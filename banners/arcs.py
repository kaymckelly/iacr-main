#!/usr/bin/python3

import argparse
from colors import get_color
from colors import get_centroid
import random
import sys

assert sys.version_info >= (3, 0)

height = 300
width = 1920

def print_header(blur):
    mystr = """<?xml version=\"1.0\" encoding=\"utf-8\"?>
<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"{}\" height=\"{}\"
     xmlns:xlink="http://www.w3.org/1999/xlink\">
  <!-- created with "{}" -->
   """

    print(mystr.format(width, height, ' '.join(sys.argv).replace("--", "-")))
    if blur:
        print(('<defs><filter id=\"blur\" x=\"0\" y=\"0\">"'
               '"<feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"2\" />'
               '</filter></defs><g filter="url(#blur)">'))
    else:
        print ('<g>')
    return


def print_footer():
    print("</g></svg>")

def rgb(color):
    #return 'rgb({},{},{})'.format(color[0], color[1], color[2])
    return '#' + ''.join('%02x'%int(i) for i in color)

arguments = argparse.ArgumentParser()
arguments.add_argument('--colors',
                       help='Four colors ul,ll,ur,lr (without #) separated by ","',
                       default='5164A4,BDC4DD,102a83,6677B0')
arguments.add_argument('--xnum',
                       type=int,
                       default=10)
arguments.add_argument('-ynum',
                       type=int,
                       default=10)
arguments.add_argument('--blur',
                       type=bool,
                       help='Whether to blur the lines.')
arguments.add_argument('--min',
                       type=int,
                       default=10)

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

print_header(args.blur)
xstep = width / args.xnum
ystep = height / args.ynum
print('<rect x="0" y="0" width="{}" height="{}" stroke="none" fill="#f0f0f0"/>').format(width,
                                                                                        height)

for i in range(args.xnum, 0, -1):
    cx = i * xstep
    cy = random.randint(args.min, height-args.min)
    print('<ellipse cx="{}" cy="{}" rx="{}" ry="{}" stroke="none" fill="{}"/>'.format(0, cy, cx, cy ,rgb(get_color(width, height, colors, (cx,cy)))))
print_footer()
