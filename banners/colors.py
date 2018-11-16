#!/usr/bin/python3

import math
import sys
import unittest
#assert sys.version_info >= (3, 0)

def interpolate(fraction, start, finish):
    return start + fraction * (finish-start)

def get_x_fraction(width, p1, p2, p3):
    return float(p1[0] + p2[0] + p3[0]) / (3 * width)

def get_y_fraction(height, p1, p2, p3):
    return float(p1[1] + p2[1] + p3[1]) / (3 * height)

def get_centroid(p1, p2, p3):
    return [(p1[0] + p2[0] + p3[0])/3, (p1[1] + p2[1] + p3[1])/3]

def get_color(width, height, colors, centroid):
    """Weight the four colors by the distance from the upper left, etc."""
    xf = float(centroid[0])/width
    yf = float(centroid[1])/height
    color = [0, 0, 0]
    for i in range(len(color)):
        color[i] = (1 - xf) * (1 - yf) * colors[0][i]
        color[i] += (1 - xf) * yf * colors[1][i]
        color[i] += xf * (1 - yf) * colors[2][i]
        color[i] += xf * yf * colors[3][i]
        #        color[i] = (1-xf)*(1-yf) * colors[0][i]
        #        color[i] += xf * (1-yf) * colors[1][i]
        #        color[i] += yf * (1-xf) * colors[3][i]
        #        color[i] += xf * yf * colors[2][i]
        #
        #        color[i] = (2 - xf - yf) * colors[0][i] + (xf + yf) * colors[2][i]
        #        color[i] += (1 - xf + yf) * colors[1][i] + (1 - yf + xf) * colors[3][i]
        #        color[i] /= 4
    return color

class RGBPoint:
    """A holder for x,y,r,g,b."""
    def __init__(self, x, y, rgbstr):
        self.x = int(x)
        self.y = int(y)
        self.rgb = tuple(int(rgbstr[j:j+2], 16) for j in (0, 2, 4))

    def __repr__(self):
        return '{},{},#{}{}{}'.format(self.x, self.y, self.rgb[0], self.rgb[1], self.rgb[2])


def distance(xy, x, y, p):
    return math.pow(math.pow(abs(xy[0] - x), p) + math.pow(abs(xy[1] - y), p), 1.0/p)


def hexrgb(color):
    #return 'rgb({},{},{})'.format(color[0], color[1], color[2])
    return '#' + ''.join('%02x'%int(i) for i in color[:3])

_THRESHOLD = 0.001

def mix_color(point, rgb_points, p, opacity=False):
    """Return an rgb value interpolated from rgb_points.
    Args:
      point: an (x,y) pair.
      rgb_points: an arra of RGBPoint values.
    Return:
      (r,g,b) triple.
    """
    d = []
    for i in range(len(rgb_points)):
        d.append(distance(point, rgb_points[i].x, rgb_points[i].y, p))
        if d[i] < _THRESHOLD:
            return rgb_points[i].rgb

    rgb = []
    den = sum([1.0 / d[j] for j in range(len(d))])
    for i in range(3):
        num = sum([rgb_points[j].rgb[i] / d[j] for j in range(len(d))])
        rgb.append(num/den)
    if opacity:
        rgb.append(100.0 / max(100.0, min(d)))
    return rgb

        
