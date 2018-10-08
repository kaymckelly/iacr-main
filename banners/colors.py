#!/usr/bin/python3

import sys
import unittest
assert sys.version_info >= (3, 0)

def interpolate(fraction, start, finish):
    return start + fraction * (finish-start)

def get_x_fraction(width, p1, p2, p3):
    return (p1[0] + p2[0] + p3[0]) / (3 * width)

def get_y_fraction(height, p1, p2, p3):
    return (p1[1] + p2[1] + p3[1]) / (3 * height)

def get_centroid(p1, p2, p3):
    return [(p1[0] + p2[0] + p3[0])/3, (p1[1] + p2[1] + p3[1])/3]

def get_color(width, height, colors, centroid):
    """Weight the four colors by the distance from the upper left, etc."""
    xf = centroid[0]/width
    yf = centroid[1]/height
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

        
