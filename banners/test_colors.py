import unittest
from colors import interpolate
from colors import get_x_fraction
from colors import get_y_fraction
from colors import get_color
from colors import get_centroid

class TestColors(unittest.TestCase):

    def test_interpolate(self):
        self.assertEqual(interpolate(0, 0, 100), 0)
        self.assertEqual(interpolate(1, 0, 100), 100)
        self.assertEqual(interpolate(.3, 0, 100), 30)
        self.assertEqual(interpolate(.2, 0, 25), 5)
        self.assertEqual(interpolate(.6, 0, 25), 15)

    def test_x_fraction(self):
        self.assertEqual(get_x_fraction(100, [0,0],[0,10],[0,40]), 0)
        self.assertEqual(get_x_fraction(100, [10,0],[30,17],[80,33]), .4)
        self.assertEqual(get_y_fraction(100, [10,0],[30,17],[80,31]), .16)

    def test_centroid(self):
        p1 = [0,0]
        p2 = [50,0]
        p3 = [100,0]
        c = get_centroid(p1, p2, p3)
        self.assertEqual(c,[50, 0])
        q1 = [25,20]
        q2 = [50, 99]
        q3 = [15, 10]
        c = get_centroid(q1, q2, q3)
        self.assertEqual(c,[30, 43])
        
    def test_get_colors(self):
        colors = [[255,0,0],[0,255,0],[0,0,255],[0,0,0]]
        p1 = [0,0]
        p2 = [0,0]
        p3 = [0,0]
        centroid = get_centroid(p1, p2, p3)
        self.assertEqual(centroid, [0,0])
        color = get_color(100, 100, colors, centroid)
        self.assertEqual(color, [255,0,0])
        p1 = [0,0]
        p2 = [50,0]
        p3 = [100,0]
        centroid = get_centroid(p1, p2, p3)
        color = get_color(100, 100, colors, centroid)
        self.assertEqual(color, [127.5,0,127.5])
        p1 = [0,50]
        p2 = [50,0]
        p3 = [100,100]
        centroid = get_centroid(p1, p2, p3)
        color = get_color(100, 100, colors, centroid)
        self.assertEqual(color, [63.75,63.75,63.75])

    def test_mix_colors(self):
        points = [(0, 0), (50, 50), (100, 0)]
        colors = {}
        for p in points:
            colors[p] = (255 * p[0] / 100, 255 * p[0] / 100, 255 * p[1] / 100)
        point = [0,0]
                         
if __name__ == '__main__':
    unittest.main()
