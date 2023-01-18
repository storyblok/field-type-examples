import { roundToNearest } from '@/utils/roundToNearest/roundToNearest'

const epsilon = 1e-5

describe('roundToNearest', () => {
  describe('multiple = 1', () => {
    it('should return the same value when step = 1', () => {
      expect(roundToNearest(-2, 1)).toEqual(-2)
      expect(roundToNearest(-1, 1)).toEqual(-1)
      expect(roundToNearest(0, 1)).toBeCloseTo(0, epsilon)
      expect(roundToNearest(1, 1)).toEqual(1)
      expect(roundToNearest(2, 1)).toEqual(2)
    })
    it('should round value when step < 1', () => {
      expect(roundToNearest(-0.75, 1)).toEqual(-1)
      expect(roundToNearest(-0.5, 1)).toBeCloseTo(0, epsilon)
      expect(roundToNearest(-0.25, 1)).toBeCloseTo(0, epsilon)
      expect(roundToNearest(0, 1)).toBeCloseTo(0, epsilon)
      expect(roundToNearest(0.25, 1)).toBeCloseTo(0, epsilon)
      expect(roundToNearest(0.5, 1)).toEqual(1)
      expect(roundToNearest(0.75, 1)).toEqual(1)
      expect(roundToNearest(1, 1)).toEqual(1)
    })
    it('should round value when step > 1', () => {
      expect(roundToNearest(-2, 2)).toEqual(-2)
      expect(roundToNearest(-1, 2)).toBeCloseTo(0, epsilon)
      expect(roundToNearest(0, 2)).toBeCloseTo(0, epsilon)
      expect(roundToNearest(1, 2)).toEqual(2)
      expect(roundToNearest(2, 2)).toEqual(2)
      expect(roundToNearest(3, 2)).toEqual(4)
    })
  })
  describe('multiple < 1', () => {
    it('should return same value when step = multiple', () => {
      expect(roundToNearest(-0.5, 0.25)).toEqual(-0.5)
      expect(roundToNearest(-0.25, 0.25)).toEqual(-0.25)
      expect(roundToNearest(0, 0.25)).toBeCloseTo(0, epsilon)
      expect(roundToNearest(0.25, 0.25)).toEqual(0.25)
      expect(roundToNearest(0.5, 0.25)).toEqual(0.5)
      expect(roundToNearest(0.75, 0.25)).toEqual(0.75)
      expect(roundToNearest(1, 0.25)).toEqual(1)
    })
    it('should round value when step < multiple', () => {
      expect(roundToNearest(-0.2, 0.25)).toEqual(-0.25)
      expect(roundToNearest(-0.1, 0.25)).toBeCloseTo(0)
      expect(roundToNearest(0, 0.25)).toBeCloseTo(0, epsilon)
      expect(roundToNearest(0.1, 0.25)).toBeCloseTo(0, epsilon)
      expect(roundToNearest(0.2, 0.25)).toEqual(0.25)
      expect(roundToNearest(0.3, 0.25)).toEqual(0.25)
      expect(roundToNearest(0.4, 0.25)).toEqual(0.5)
    })
    it('should round value when step > multiple', () => {
      expect(roundToNearest(-0.5, 0.25)).toEqual(-0.5)
      expect(roundToNearest(0, 0.25)).toBeCloseTo(0, epsilon)
      expect(roundToNearest(0.5, 0.25)).toEqual(0.5)
      expect(roundToNearest(0.6, 0.25)).toEqual(0.5)
      expect(roundToNearest(0.7, 0.25)).toEqual(0.75)
      expect(roundToNearest(0.8, 0.25)).toEqual(0.75)
    })
  })
  describe('multiple > 1', () => {
    it('should return same value when step = multiple', () => {
      expect(roundToNearest(-2, 2)).toEqual(-2)
      expect(roundToNearest(0, 2)).toBeCloseTo(0, epsilon)
      expect(roundToNearest(2, 2)).toEqual(2)
      expect(roundToNearest(4, 2)).toEqual(4)
      expect(roundToNearest(6, 2)).toEqual(6)
      expect(roundToNearest(8, 2)).toEqual(8)
    })
    it('should round value when step < multiple', () => {
      expect(roundToNearest(-2, 2)).toEqual(-2)
      expect(roundToNearest(-1, 2)).toBeCloseTo(0, epsilon)
      expect(roundToNearest(0, 2)).toBeCloseTo(0, epsilon)
      expect(roundToNearest(0.5, 2)).toBeCloseTo(0, epsilon)
      expect(roundToNearest(1, 2)).toEqual(2)
      expect(roundToNearest(2, 2)).toEqual(2)
      expect(roundToNearest(3, 2)).toEqual(4)
      expect(roundToNearest(4, 2)).toEqual(4)
    })
    it('should round value when step > multiple', () => {
      expect(roundToNearest(-4, 2)).toEqual(-4)
      expect(roundToNearest(0, 2)).toBeCloseTo(0, epsilon)
      expect(roundToNearest(4, 2)).toEqual(4)
      expect(roundToNearest(9.5, 2)).toEqual(10)
      expect(roundToNearest(12, 2)).toEqual(12)
      expect(roundToNearest(100.1, 2)).toEqual(100)
    })
  })
})
