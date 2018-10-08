#!/usr/bin/python3

import argparse
import random
import sys
from scipy.spatial import Delaunay

assert sys.version_info >= (3, 0)

height = 300
width = 1920

def print_header():
    mystr = """<?xml version=\"1.0\" encoding=\"utf-8\"?>
<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"{}\" height=\"{}\"
     xmlns:xlink="http://www.w3.org/1999/xlink\">
  <defs>
    <linearGradient id=\"bluegradient\" x1=\"0\" x2=\"0\" y1=\"0\" y2=\"1\">
      <stop stop-color=\"#0E38FF\" offset=\"0%\"/>
      <stop stop-color=\"#729BFF\" offset=\"10%\"/>
      <stop stop-color=\"#f0f0ff\" offset=\"100%\"/>
    </linearGradient>
    <radialGradient id=\"circuitcolor\">
<!--      <stop stop-color=\"#2040a0\" offset=\"0%\"/> -->
      <stop stop-color=\"#80d0ff\" offset=\"20%\"/>
      <stop stop-color=\"#40a0ff\" offset=\"100%\"/>
    </radialGradient>
    <radialGradient id=\"wires\" cx=\"25%\" cy=\"50%\" r=\"100%\" fx=\"100%\" fy=\"100%\">
      <stop stop-color=\"#404080\" offset=\"0%\"/>
      <stop stop-color=\"#6080a0\" offset=\"40%\"/>
      <stop stop-color=\"#80a0c0\" offset=\"100%\"/>
    </radialGradient>
    <radialGradient id="blues">
       <stop offset=\"0%\" stop-color=\"rgba(128,192,192,0.8)\"/>
       <stop offset=\"30%\" stop-color=\"rgba(65,192,225,0.5)\"/>
       <stop offset=\"100%\" stop-color=\"rgba(192,192,225,0.8)\"/>
    </radialGradient>
    <radialGradient id="blues2">
       <stop offset=\"0%\" stop-color=\"rgba(64,64,225,0.5)\"/>
       <stop offset=\"50%\" stop-color=\"rgba(92,92,225,0.8)\"/>
       <stop offset=\"100%\" stop-color=\"rgba(128,128,225,0.8)\"/>
    </radialGradient>
  </defs>
  <!-- created with "{}" -->
   """

    print(mystr.format(width, height, ' '.join(sys.argv).replace("--", "-")))
    return


def print_footer():
    print("</svg>")

def interpolate(fraction, start, finish):
    return start + fraction * (finish-start)

def get_fraction(p1, p2, p3):
    return (p1[0] + p2[0] + p3[0]) / (3 * width)


def get_color(p1, p2, p3):
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
    

colormap = {'transparent': [],
            'gradient': [],
            'random': [],
            'blues3': [],
            'blues': ['#375080', '#436ca1', '#45AFFF', '#4B5895', '#5899E2'],
            'greens': ['#3AB795', '#A0E8AF', '#86BAA1', '#EDEAD0', '#FFC556'],
            'logo': ['#150061', '#000033', '#12005B', '#68B0AB', '#696D7D'],
            'adjacents': ['#BEBCE3', '#C7BCE0', '#BDC4DD', '#BCCFE3', '#BCD7E0'],
            'others': ['#79B0C2', '#79A0C7', '#7C8ABB', '#7D79C7', '#9079C7'],
            'blues2': ['#89dbf3', '#23c0f7', '#21c3f2', '#66ddf5', '#56d7f6',
                       '#8adcf2', '#5acff2', '#3fc2ee', '#68d5f4', '#40c8ee',
                       '#49cef1', '#44b8e9', '#3fc7ef', '#30c3ee', '#3cc5ef',
                       '#2f94e2', '#037edc', '#218cde', '#0ea1e6', '#1c74d8',
                       '#1a73d7', '#20a8e6', '#1977db', '#0062d4', '#097bdb',
                       '#0067d4', '#0167d6', '#1bd1d3', '#0051ce', '#7677d5',
                       '#0052d0', '#004acd', '#1b59d0', '#0046cc', '#1b59d0',
                       '#1935c4', '#011fbf', '#1c6edc', '#1b55d0', '#001ebe',
                       '#146ad9', '#124dcf', '#1b55d2', '#1b59d0', '#0245ca']}

arguments = argparse.ArgumentParser()
arguments.add_argument('--colors',
                       choices=colormap.keys(),
                       default='random')
arguments.add_argument('--num',
                       type=int,
                       default=200)
arguments.add_argument('--min',
                       type=int,
                       default=10)
arguments.add_argument('--regular',
                       type=bool,
                       default=False)
args = arguments.parse_args()

min_width = 10
min_height = 10
if args.colors not in colormap:
    print('Missing color scheme')
    system.exit(3)

if args.colors == 'random':
    colors = ['url(#bluegradient)', 'url(#circuitcolor)', 'url(#blues)', 'url(#blues2)']
    for i in range(10):
        r = random.randint(32,64)
        g = random.randint(64,128)
        b = random.randint(192, 255)
        a = random.uniform(.6,.9)
        color = 'rgba({},{},{},{})'.format(r, g, b, a)
        colors.append(color)
elif args.colors == 'blues3':
    colors = []
    for i in range(100):
        r = random.randint(0, 20)
        g = random.randint(64, 96)
        b = random.randint(192, 255)
        a = random.uniform(.6, .9)
        color = 'rgba({},{},{},{})'.format(r,g,b,a)
        colors.append(color)
elif args.colors == 'gradient':
    colors = []
else:
    colors = colormap.get(args.colors)
    
print_header()
# Add the corner points.
if args.regular:
    # interpret args.num as the number of rows.
    points = []
    h = height/args.num
    for x in range(0, width, step):
        for y in range(0, height, step):
            points.append([x, y])
else:
    points = [[0,0],[0,height],[width,height],[width,0]]
    for i in range(args.num):
        x = random.randint(min_width, width - min_width)
        y = random.randint(min_height, height - min_height)
        points.append([x, y])
d = Delaunay(points)
for tr in d.simplices:
    p1 = points[tr[0]]
    p2 = points[tr[1]]
    p3 = points[tr[2]]
    if args.colors == 'gradient':
        color = get_color(p1, p2, p3)
        opacity = 1
        stroke = color
    elif args.colors == 'transparent':
        color = 'green'
        opacity = get_fraction(p1, p2, p3)
        opacity = (1 + opacity * 6) / 8
        stroke = 'none'
    else:
        color = colors[random.randint(0, len(colors) - 1)]
        opacity = random.uniform(.5, .8)
        stroke = '#f0f0f0'
    print ('<path d="M {} {} L {} {} L {} {} z" fill="{}" opacity="{:.3f}" stroke="{}"/>'.format(p1[0],
                                                                                                 p1[1],
                                                                                                 p2[0],
                                                                                                 p2[1],
                                                                                                 p3[0],
                                                                                                 p3[1],
                                                                                                 color,
                                                                                                 opacity,
                                                                                                 stroke))
    
print_footer()
