#!/usr/bin/python

import argparse
from colors import get_color
from colors import get_centroid
import random
import sys
from scipy.spatial import Delaunay

#assert sys.version_info >= (3, 0)

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

def get_blue_color(p1, p2, p3):
    """Each p is a pair (x,y)."""
    #    rgb_left = (146, 158, 198)
    #    rgb_left = (102, 119, 176)
    rgb_left = (211,216,232) # D3D8E8
    #    rgb_left = (168, 177, 209) # A8B1D1
    # the true cataline blue from the logo
    #   rgb_right = (16,42,131)
    # this is softer:
    fraction = get_fraction(p1, p2, p3)
    rgb_right = (59,80,153)
    r = interpolate(fraction, rgb_left[0], rgb_right[0])
    g = interpolate(fraction, rgb_left[1], rgb_right[1])
    b = interpolate(fraction, rgb_left[2], rgb_right[2])
    return 'rgb({:.2f}, {:.2f}, {:.2f})'.format(r, g, b)
   


arguments = argparse.ArgumentParser()
arguments.add_argument('--colors',
                       help='Four colors ul,ll,ur,lr (without #) separated by ","',
                       default='5164A4,BDC4DD,102a83,6677B0')
arguments.add_argument('--num',
                       type=int,
                       default=200)
arguments.add_argument('--min',
                       type=int,
                       default=10)
arguments.add_argument('--regular',
                       type=bool,
                       default=False)
arguments.add_argument('--test',
                       help='A pair alpha,beta of numbers between 0 and 1')
arguments.add_argument('--blur',
                       type=bool,
                       help='Whether to blur the lines.')

args = arguments.parse_args()

min_width = args.min
min_height = args.min

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

if args.test:
    xy = args.test.split(',')
    print(colors)
    if len(xy) != 2:
        print('--test xfrac,yfrac')
        sys.exit(1)
    point = [int(width * float(xy[0])), int(height * float(xy[1]))]
    color = get_color(width, height, colors, point, point, point)
    assert color[0] < 256
    assert color[1] < 256
    assert color[2] < 256

    print('point:{}/{} {}/{}'.format(point[0], width, point[1], height))
    print('color:', color)
    sys.exit(0)

if args.regular:
    # interpret args.num as the number of rows.
    points = []
    hy = int(height/args.num)
    hx = int(width/args.num)
    for x in range(0, width, hx):
        for y in range(0, height, hy):
            points.append([x, y])
else:
    # Add the corner points.
    points = [[0,0],[0,height],[width,height],[width,0]]
    for i in range(args.num):
        x = random.randint(min_width, width - min_width)
        y = random.randint(min_height, height - min_height)
        points.append([x, y])
d = Delaunay(points)

print_header(args.blur)

print colors
for tr in d.simplices:
    p1 = points[tr[0]]
    p2 = points[tr[1]]
    p3 = points[tr[2]]
    centroid = get_centroid(p1, p2, p3)
    color = get_color(width, height, colors, centroid)
    stroke = color
    opacity = 1.0
    rgbval = rgb(color)
    print ('<path d="M {} {} L {} {} L {} {} z" fill="{}" opacity="{:.3f}"/>'.format(p1[0],
                                                                                     p1[1],
                                                                                     p2[0],
                                                                                     p2[1],
                                                                                     p3[0],
                                                                                     p3[1],
                                                                                     rgbval,
                                                                                     opacity))
print_footer()
