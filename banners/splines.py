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

height = 300
width = 1920

def print_header(blur):
    mystr = """<?xml version=\"1.0\" encoding=\"utf-8\"?>
<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"{}\" height=\"{}\"
     xmlns:xlink="http://www.w3.org/1999/xlink\">
  <!-- created with "{}" -->
   """
    print(mystr.format(width, height, ' '.join(sys.argv).replace("--", "-")))


def print_defs(blur, ynum, xstep, ystep, colors):
    print('<defs>')
    if blur:
        print(('<filter id=\"blur\" x=\"0\" y=\"0\">"'
               '"<feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"2\" />'
               '</filter>'))
    for i in range(ynum):
        left_color = rgb(get_color(width, height, colors, (0, i * ystep)))
        right_color = rgb(get_color(width, height, colors, (width, i * ystep)))
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
                       default='5164A4,BDC4DD,102a83,6677B0')
arguments.add_argument('--xnum',
                       type=int,
                       default=10)
arguments.add_argument('-ynum',
                       type=int,
                       default=10)
arguments.add_argument('--dy',
                       type=int,
                       default=40)
arguments.add_argument('--blur',
                       type=bool,
                       help='Whether to blur the lines.')
arguments.add_argument('--drift',
                       type=int,
                       default=0,
                       help='Amount to drift down on each wave.')

args = arguments.parse_args()
assert args.drift < args.dy

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
print_defs(args.blur, args.ynum, xstep, ystep, colors)
if args.blur:
    print('<g filter="url(#blur)">')
else:
    print ('<g>')
    
print('<rect x="0" y="0" width="{}" height="{}" fill="url(#grad0)"/>'.format(width, height))
for i in range(args.ynum):
    y = i * ystep
    point = (0, y)
    points = []
    color = get_color(width, height, colors, point)
    path = '<path d="M 0 {} L 0 {} c {} {} {} {} {} {} '.format(height,
                                                                y,
                                                                xstep/3,
                                                                random.randint(-args.dy,args.dy),
                                                                2*xstep/3,
                                                                random.randint(-args.dy,args.dy),
                                                                xstep,
                                                                random.randint(-args.dy,args.dy))
    for j in range(1, args.xnum + 1):
        point = (j * xstep, y + 2 * random.randint(-8, 8))
        points.append(point)
        path += ' s {} {} {} {}'.format(xstep/3,
                                        random.randint(-args.dy + args.drift/2, args.dy + args.drift/2),
                                        xstep,
                                        random.randint(-args.dy + args.drift, args.dy + args.drift))
    path += ' L {} {} Z" fill="url(#grad{})" stroke="none"/>'.format(width,
                                                                     height,
                                                                     i)
    print(path)
print_footer()
