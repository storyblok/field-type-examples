import { unsafeHash } from './unsafeHash'

describe('unsafeHash', () => {
  describe('purity', () => {
    it('should always returns the same output for the same input', () => {
      expect(unsafeHash('Hello')).toEqual(unsafeHash('Hello'))
      expect(unsafeHash('ABC')).toEqual(unsafeHash('ABC'))
      expect(unsafeHash('123')).toEqual(unsafeHash('123'))
      expect(unsafeHash('Hello Johannes')).toEqual(unsafeHash('Hello Johannes'))
      const longString =
        '9083274509238(*&(*#&%$(*&$#)(%IOKJDkjshfdkjsdahfkj320948u0329uoiksdajfds09U09 U)(*U*)(ODFJQ ()*J#@'
      expect(unsafeHash(longString)).toEqual(unsafeHash(longString))
    })
  })
})
