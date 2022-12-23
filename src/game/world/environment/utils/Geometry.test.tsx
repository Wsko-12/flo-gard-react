import { Line, Point2, Quad, Triangle } from './Geometry';

describe('Geometry', () => {
  describe('Triangle', () => {
    test('getHalfPerimeter', () => {
      const A = new Point2(0, 0);
      const B = new Point2(5, 4);
      const C = new Point2(7, 2);
      const triangle = new Triangle([A, B, C]);
      const half = triangle.getHalfPerimeter();
      expect(half).toBeCloseTo(8.255831);
    });

    test('getSquare', () => {
      {
        const A = new Point2(0, 0);
        const B = new Point2(5, 4);
        const C = new Point2(7, 2);
        const triangle = new Triangle([A, B, C]);
        const square = triangle.getSquare();
        expect(square).toBeCloseTo(9);
      }

      {
        const A = new Point2(2, 1);
        const B = new Point2(1, 4);
        const C = new Point2(8, -4);
        const triangle = new Triangle([A, B, C]);
        const square = triangle.getSquare();
        expect(square).toBeCloseTo(6.5);
      }

      {
        const A = new Point2(-6.72, 1.64);
        const B = new Point2(1, 4);
        const C = new Point2(-4.58, -5.06);
        const triangle = new Triangle([A, B, C]);
        const square = triangle.getSquare();
        expect(square).toBeCloseTo(28.3872);
      }
    });

    test('isPointIn', () => {
      {
        const A = new Point2(-4.98, 5.62);
        const B = new Point2(-4.6, -1.24);
        const C = new Point2(2.4, -3);
        const triangle = new Triangle([A, B, C]);
        {
          const point = new Point2(-6, 3);
          expect(triangle.isPointIn(point)).toBe(false);
        }

        {
          const point = new Point2(-4, 3);
          expect(triangle.isPointIn(point)).toBe(true);
        }
        {
          const point = new Point2(-2.0710243902, 2.6168780488);
          expect(triangle.isPointIn(point)).toBe(false);
        }
        {
          const point = new Point2(-2.0946341463, -1.7037073171);
          expect(triangle.isPointIn(point)).toBe(true);
        }
      }
      {
        const A = new Point2(1.7301463415, 3.632097561);
        const B = new Point2(-4.5028292683, -1.8453658537);
        const C = new Point2(-5.7069268293, 4.2223414634);
        const triangle = new Triangle([A, B, C]);
        {
          const point = new Point2(-1.3391219512, 4.4584390244);
          expect(triangle.isPointIn(point)).toBe(false);
        }
        {
          const point = new Point2(1.5884878049, 3.5848780488);
          expect(triangle.isPointIn(point)).toBe(true);
        }
      }
    });
  });

  describe('Quad', () => {
    test('getSquare', () => {
      {
        const A = new Point2(-4.14, 3.36);
        const B = new Point2(1.3, 4.78);
        const C = new Point2(2, 1.7);
        const D = new Point2(-8, 1);
        const quad = new Quad([A, B, C, D]);
        expect(quad.getSquare()).toBeCloseTo(19.32);
      }
      {
        const A = new Point2(-3.16, 2.26);
        const B = new Point2(-1.58, 3.22);
        const C = new Point2(-4.82, 0.6);
        const D = new Point2(-7.72, 1.72);
        const quad = new Quad([A, B, C, D]);
        expect(quad.getSquare()).toBeCloseTo(3.85);
      }
      {
        const A = new Point2(-5, 5);
        const B = new Point2(-4, 5);
        const C = new Point2(-4, 4);
        const D = new Point2(-5, 4);
        const quad = new Quad([A, B, C, D]);
        expect(quad.getSquare()).toBeCloseTo(1);
      }
    });

    test('isPointIn', () => {
      {
        const A = new Point2(-5, 5);
        const B = new Point2(-4, 5);
        const C = new Point2(-4, 4);
        const D = new Point2(-5, 4);
        const quad = new Quad([A, B, C, D]);
        const point = new Point2(-4.54598, 3.21355);
        expect(quad.isPointIn(point)).toBe(false);
      }
      {
        const A = new Point2(-5, 5);
        const B = new Point2(-4, 5);
        const C = new Point2(-4, 4);
        const D = new Point2(-5, 4);
        const quad = new Quad([A, B, C, D]);
        const point = new Point2(-4.20982, 4.09979);
        expect(quad.isPointIn(point)).toBe(true);
      }
      {
        const A = new Point2(-6.44071, 3.67195);
        const B = new Point2(-4.20982, 4.11507);
        const C = new Point2(-7.87703, 2.75514);
        const D = new Point2(-6.15039, 4.34427);
        const quad = new Quad([A, B, C, D]);
        const point = new Point2(-3.85838, 5.12355);
        expect(quad.isPointIn(point)).toBe(false);
      }
      {
        const A = new Point2(-6.44071, 3.67195);
        const B = new Point2(-4.20982, 4.11507);
        const C = new Point2(-7.87703, 2.75514);
        const D = new Point2(-6.15039, 4.34427);
        const quad = new Quad([A, B, C, D]);
        const point = new Point2(-5.2947, 3.80947);
        expect(quad.isPointIn(point)).toBe(true);
      }
    });

    test('isQuadIn', () => {
      {
        const A = new Point2(-6.84, 6.1);
        const B = new Point2(-7.16, 2.82);
        const C = new Point2(-3.34, 2.9);
        const D = new Point2(-3.46, 6.5);

        const E = new Point2(-1.18, 6.36);
        const F = new Point2(-1.42, 3.78);
        const G = new Point2(1.96, 3.84);
        const H = new Point2(1.26, 6.56);

        const quad_1 = new Quad([A, B, C, D]);
        const quad_2 = new Quad([E, F, G, H]);
        expect(quad_1.isQuadIn(quad_2)).toBe(false);
      }
      {
        const A = new Point2(-6.84, 6.1);
        const B = new Point2(-7.16, 2.82);
        const C = new Point2(-3.34, 2.9);
        const D = new Point2(-3.46, 6.5);

        const E = new Point2(-6.42, 5.58);
        const F = new Point2(-5.5, 3.76);
        const G = new Point2(-4.2, 4.1);
        const H = new Point2(-4.54, 5.72);

        const quad_1 = new Quad([A, B, C, D]);
        const quad_2 = new Quad([E, F, G, H]);
        expect(quad_1.isQuadIn(quad_2)).toBe(true);
        expect(quad_2.isQuadIn(quad_1)).toBe(true);
      }
      {
        const A = new Point2(-6.84, 6.1);
        const B = new Point2(-7.16, 2.82);
        const C = new Point2(-3.34, 2.9);
        const D = new Point2(-6.3, 3.4);

        const E = new Point2(-6.08, 5.84);
        const F = new Point2(-5.1, 1.2);
        const G = new Point2(-4.2, 4.1);
        const H = new Point2(-4.54, 5.72);

        const quad_1 = new Quad([A, B, C, D]);
        const quad_2 = new Quad([E, F, G, H]);
        expect(quad_1.isQuadIn(quad_2)).toBe(true);
        expect(quad_2.isQuadIn(quad_1)).toBe(true);
      }
    });
  });

  describe('Line', () => {
    test('isIntersectLine', () => {
      {
        const A = new Point2(-4.2, 2.82);
        const B = new Point2(-1, 6);
        const C = new Point2(-1.04, 2.74);
        const D = new Point2(-4.78, 6.38);

        const line_1 = new Line(A, B);
        const line_2 = new Line(C, D);

        expect(line_1.isIntersectLine(line_2)).toBe(true);
      }
      {
        const A = new Point2(-4.2, 2.82);
        const B = new Point2(-1, 6);
        const C = new Point2(-1.04, 2.74);
        const D = new Point2(-2, 4);

        const line_1 = new Line(A, B);
        const line_2 = new Line(C, D);

        expect(line_1.isIntersectLine(line_2)).toBe(false);
      }
      {
        const A = new Point2(-1.46, 2.52);
        const B = new Point2(-1, 6);
        const C = new Point2(-1.04, 2.74);
        const D = new Point2(-4.44, 3.16);

        const line_1 = new Line(A, B);
        const line_2 = new Line(C, D);

        expect(line_1.isIntersectLine(line_2)).toBe(true);
      }
    });
  });
});
