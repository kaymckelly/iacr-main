# Code to generate geometric banner images.

The main file here is banners.py, which requires colors.py. triangles.py is old.

The output of banners.py consists of a triangular pattern with the
color of each triangle determined by the relative distance from top
and left boundaries. It interpolates between four colors at upper
left, lower left, upper right, and lower right corners. If you run
banners.py alone it generates an output using the shades of logo color
palette. If you run banners.py --random then it uses random colors.
If you run banners.py --colors=459102,102a83,f0f0f0,c0d0f3 then it
uses

* #459102 for the upper left,
* #102a83 for the lower left,
* #f0f0f0 for the upper right,
* #c0d0f3 for the lower right.

There are other parameters to control the number of triangles (--num)
and the minimum distance from the border (--min). The option --blur applies
a filter to blur the edges (this isn't very satisfying).

## Some examples
![examples/banner.svg](examples/banner.svg)
