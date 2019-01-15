import argparse
import random
from xml.dom import minidom

arguments = argparse.ArgumentParser()
arguments.add_argument('--file',
                       help='File to read',
                       default='base_waves.svg')
arguments.add_argument('--colors',
                       help='A list of colors (without #) separated by commas',
                       default='F6F9F9,DDE7E8,EEF3F3,E6EDEE')
arguments.add_argument('--stroke',
                       help='A color to use for the lines (without the #)',
                       default='D5E1E2')
args = arguments.parse_args()

colors = ['#' + c for c in args.colors.split(',')]

doc = minidom.parse(args.file)

for grad in doc.getElementsByTagName('linearGradient'):
    for j in range(4):
        stop = doc.createElement('stop')
        stop.setAttribute('offset', '{}%'.format(25*j))
        stop.setAttribute('stop-color', random.choice(colors))
        grad.appendChild(stop)

print(doc.toxml())
