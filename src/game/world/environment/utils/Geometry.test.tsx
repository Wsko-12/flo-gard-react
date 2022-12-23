import React from 'react';
import { render, screen } from '@testing-library/react';
import { Point2, Triangle } from './Geometry';

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
});
