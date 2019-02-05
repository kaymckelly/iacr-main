import argparse
import random
from xml.dom import minidom

arguments = argparse.ArgumentParser()
arguments.add_argument('--file',
                       help='File to read',
                       default='img/trianglify3.svg')
arguments.add_argument('--colors',
                       help='A list of colors (without #) separated by commas',
                       default='F6F9F9,DDE7E8,EEF3F3,E6EDEE')
arguments.add_argument('--stroke',
                       help='A color to use for the lines (without the #)',
                       default='D5E1E2')
args = arguments.parse_args()

colors = ['#' + c for c in args.colors.split(',')]

doc = minidom.parse(args.file)

for group in doc.getElementsByTagName('g'):
    group.setAttribute('stroke', '#' + args.stroke)
for path in doc.getElementsByTagName('path'):
    path.setAttribute('fill', random.choice(colors))
    if path.hasAttribute('opacity'):
        path.removeAttribute('opacity')
    if path.hasAttribute('stroke-width'):
        path.removeAttribute('stroke-width')
    if path.hasAttribute('stroke'):
        path.removeAttribute('stroke')

print(doc.toxml())
