import { pseudoRandom } from './pseudoRandom'

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam suscipit id dui ut ultricies. Praesent faucibus eget massa eu volutpat. Morbi sed nisi in orci eleifend ornare. Sed varius hendrerit mi, quis finibus diam pellentesque ut. Cras justo sem, euismod ut nisl vulputate, semper blandit neque. Morbi vehicula nunc et ipsum pretium blandit. Nulla et eros quis diam pretium egestas. Duis libero nibh, maximus a tortor a, scelerisque maximus massa. Ut et sapien varius, eleifend tellus ut, commodo dolor.

Cras elementum porta libero at sagittis. Nullam faucibus dui id leo dictum, ut consequat nulla bibendum. Sed mollis sapien ut eros tincidunt iaculis. Etiam vitae sem nec urna mollis hendrerit. Cras euismod metus vel libero luctus, quis fringilla diam posuere. Proin sagittis lectus a risus lacinia auctor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut congue tellus elit, id vehicula felis vulputate quis.

Curabitur non porttitor lacus. Curabitur lobortis est dolor, vel sodales orci tempus sit amet. Suspendisse nisi eros, egestas sed viverra sed, lacinia eu felis. Fusce vitae purus pellentesque, convallis mauris eu, lacinia tortor. Fusce fringilla hendrerit sollicitudin. Donec at vulputate massa. Donec nulla enim, imperdiet quis libero iaculis, condimentum mollis diam. Integer commodo dapibus venenatis. Vestibulum at ultricies est. Praesent libero metus, condimentum in mauris facilisis, hendrerit pharetra turpis. Donec condimentum viverra nulla et consectetur. Sed interdum enim sem, id mattis augue tristique eget. Mauris ultrices augue sed placerat commodo. Suspendisse dignissim, urna at facilisis porta, dolor elit varius dui, vitae blandit ex justo et sem. Quisque dictum metus in magna cursus, nec maximus turpis mattis. Curabitur luctus, lorem eu tristique tempor, nulla orci feugiat mauris, ut suscipit ante leo eget lacus.

Vestibulum at orci elit. Phasellus eget euismod ante, iaculis varius nisl. Donec vehicula mauris a sapien scelerisque, vitae blandit eros faucibus. Integer semper nulla vel tortor rutrum eleifend. Donec a sem vel mauris feugiat porttitor eget vel nulla. Donec sed enim eu enim sollicitudin fermentum id sit amet quam. Aliquam vitae tincidunt est, eu suscipit massa.

Nunc eget velit efficitur, laoreet arcu ac, vestibulum lorem. Sed mattis neque eget ligula laoreet malesuada. Nunc sed dui scelerisque, mollis lacus at, dignissim sapien. Fusce pulvinar mattis eros, eu commodo risus pellentesque non. Duis volutpat metus ut sodales euismod. Morbi massa quam, bibendum at lorem at, hendrerit maximus lectus. Suspendisse ullamcorper semper varius. Mauris auctor nisl nulla, sed auctor lectus laoreet eget. Quisque et lorem pharetra, posuere odio a, aliquet lorem. In suscipit leo lorem, ut porttitor neque dictum in. Ut lorem risus, tempus sit amet sagittis et, facilisis ut metus. Vestibulum aliquam leo vitae lobortis porta. Nam mollis sollicitudin purus et tempus. Nulla eget aliquam sem, id mollis urna.`

const words = loremIpsum.split('').slice(0, 100)

describe('pseudoRandom', () => {
  describe('purity', () => {
    it('should always returns the same output for the same input', () => {
      expect(pseudoRandom('Hello', 10)).toEqual(pseudoRandom('Hello', 10))
      expect(pseudoRandom('ABC', 10)).toEqual(pseudoRandom('ABC', 10))
      expect(pseudoRandom('123', 10)).toEqual(pseudoRandom('123', 10))
      expect(pseudoRandom('Hello Johannes', 10)).toEqual(
        pseudoRandom('Hello Johannes', 10),
      )
      const longString =
        '9083274509238(*&(*#&%$(*&$#)(%IOKJDkjshfdkjsdahfkj320948u0329uoiksdajfds09U09 U)(*U*)(ODFJQ ()*J#@'
      expect(pseudoRandom(longString, 10)).toEqual(pseudoRandom(longString, 10))
    })
  })
  it('should be greater than zero', () => {
    words.forEach((word) => {
      expect(pseudoRandom(word.toString(), 2)).toBeGreaterThanOrEqual(0)
    })
  })
  it('should not exceed max limit ', () => {
    words.forEach((word) => {
      expect(pseudoRandom(word.toString(), 2)).toBeLessThanOrEqual(2)
    })
  })
})
