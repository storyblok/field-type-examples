import { BasketItem } from '@/core'
import { compareName, capitalizeWord } from '@/utils'

export type TempItem = {
  id: number
  filename: string | undefined
  description?: string
  category: string | undefined
}

// Temporary object, just so that we can save some lines of code
export const tmpAssets: TempItem[] = [
  {
    id: 4997256,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x2880/07e39737d9/storyblook.jpg',
    description:
      'A fascinating tell about friendship, love, and betrayal. The book of Storybook has won the hearts and minds of over 20 million readers all across the globe.',
    category: 'Literature',
  },
  {
    id: 4997255,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1279/237768ba91/desktop-monitor.jpg',
    category: 'Electronics',
  },
  {
    id: 4997254,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1344/984e94dfe8/smart-storyphone.jpg',
    description: 'Minimalistic copy of a well-known brand',
    category: 'Electronics',
  },
  {
    id: 4997253,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1279/66a9d9499f/storyblokbook.jpg',
    description:
      'Kind of the same as the other book, but the image background is cooler!',
    category: 'Literature',
  },
  {
    id: 4997252,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1275/afc107832e/monitor-with-keyboard.jpg',
    category: 'Electronics',
  },
  {
    id: 4997251,
    filename: undefined,
    description:
      'This phone is exactly the same as the one above, but we sell it for way more because it has a plastic gold-plated back cover.',
    category: 'Electronics',
  },
  {
    id: 4997250,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1279/236e6c714f/tv.jpg',
    description: 'Huge-ass TV. Need I say more?',
    category: 'Electronics',
  },
  {
    id: 4997249,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1152/df0c2f193e/monitor-set.jpg',
    description: 'You get a DVD (but no DVD player)',
    category: 'Electronics',
  },
  {
    id: 4997248,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1440/be874115d9/computer-set-with-2-tb-sdd.jpg',
    category: 'Electronics',
  },
  {
    id: 4997247,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1344/3dabe5e358/flatphone-by-storyblok.jpg',
    category: 'Electronics',
  },
  {
    id: 4997246,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1152/b14a975604/computer-set.jpg',
    category: 'Electronics',
  },
  {
    id: 4997245,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1344/1e70e23f72/storyphone.jpg',
    description:
      "You think we're just showing the back side of a luxurious phone, but you'll actually get two dirt-cheap phones.",
    category: 'Electronics',
  },
  {
    id: 4997244,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1279/0163249b5e/storylapblok.jpg',
    category: 'Electronics',
  },
  {
    id: 4997243,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1279/48b1fbfdb6/chips.jpg',
    description: "Dried potato flakes dripping in oil... what's not to like?",
    category: 'Food',
  },
  {
    id: 4997241,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1279/b599d3f293/big-cup.jpg',
    description: 'Big cup for big boys',
    category: 'Kitchen',
  },
  {
    id: 4997240,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1279/17e5827509/tea-cup.jpg',
    description:
      "It's a tea cup that works for most drinkable or non-drinkable liquids.",
    category: 'Kitchen',
  },
  {
    id: 4997239,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x2885/5f9e2a8d24/orangebook.jpg',
    category: 'Electronics',
  },
  {
    id: 4997238,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1279/184435752b/wheat-candle.jpg',
    description: 'Smells nice',
    category: 'Home Decor',
  },
  {
    id: 4997237,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1343/1f79bca1b0/smart-watch-1.jpg',
    description: 'Keeps the time as long as you wind it up',
    category: 'Electronics',
  },
  {
    id: 4997236,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1280/a55e0d9a38/ereader-1.jpg',
    category: 'Electronics',
  },
  {
    id: 4997235,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1280/9da29a7777/citrus-candle.jpg',
    description:
      'Smells of yellow/organge fruits, but the smell is actually 100% artificial',
    category: 'Home Decor',
  },
  {
    id: 4997234,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x2880/78e2208b4d/tablet.jpg',
    category: 'Electronics',
  },
  {
    id: 4997233,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1344/5c8adfbe96/storyreader.jpg',
    category: 'Electronics',
  },
  {
    id: 4997232,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1279/f7d0ec7ce2/smart-watch-2.jpg',
    category: 'Electronics',
  },
  {
    id: 4997231,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1279/96710eb2de/flattab.jpg',
    category: 'Electronics',
  },
  {
    id: 4997230,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1281/43c7355b3c/envelope-set.jpg',
    description: 'Deliver your secrets in these.',
    category: undefined,
  },
  {
    id: 4997229,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1344/20a10399e5/pillows-2-pcs.jpg',
    category: 'Home Decor',
  },
  {
    id: 4997227,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x2879/375b7c8c37/cozy-candle.jpg',
    category: 'Home Decor',
  },
  {
    id: 4997226,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1279/c6d4c9edd5/espresso-cup.jpg',
    description: 'A tiny cup that is only usable for espresso.',
    category: 'Kitchen',
  },
  {
    id: 4997225,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1282/bdf32c4511/fairly-tales-from-the-block.jpg',
    description: "It's not H.C. Andersen, but it's good enough for your kids.",
    category: 'Literature',
  },
  {
    id: 4997224,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1280/95c1cdd9ae/stack.jpg',
    category: undefined,
  },
  {
    id: 4997223,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1279/aa8c52c3bc/cap.jpg',
    category: 'Clothing',
  },
  {
    id: 4997222,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1440/fb495ff966/led-tv.jpg',
    category: 'Electronics',
  },
  {
    id: 4997221,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1279/fc3547cda8/sofa-pillow.jpg',
    category: 'Home Decor',
  },
  {
    id: 4997220,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1344/b8a4f71c8e/bed-pillow.jpg',
    description: "Reminds you of work even as you're trying to fall asleep.",
    category: 'Home Decor',
  },
  {
    id: 4997219,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x2400/d83b8cbcd3/to-storyblok-with-love.jpg',
    description: 'We love you. We just wanted to say that.',
    category: undefined,
  },
  {
    id: 4997218,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1279/7e2270e5b7/caffe-latte-cup.jpg',
    category: 'Kitchen',
  },
  {
    id: 4997217,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1920x1279/41b714bc06/storycup-coffee-cup.jpg',
    category: 'Kitchen',
  },
  {
    id: 4997216,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x1919/a08dba2a4e/cotton-sweater.jpeg',
    description:
      'You may get this for Christmas; unless you have been a naughty child.',
    category: 'Clothing',
  },
  {
    id: 4997215,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x961/17e7b2d8fb/cups-different-sizes.jpeg',
    category: 'Kitchen',
  },
  {
    id: 4997214,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x961/db17335989/eye-drops.jpeg',
    description: "We can't disclose what these are.",
    category: undefined,
  },
  {
    id: 4997212,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x1600/5d30e46417/hair-spray.jpeg',
    description: 'CAUTION: Do not use as a flame-thrower.',
    category: 'Hygiene',
  },
  {
    id: 4997211,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/160c87b281/tank-top-for-males.jpeg',
    category: 'Clothing',
  },
  {
    id: 4997210,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x853/3e734ee822/glogg.jpeg',
    description: 'Warm, Sweet, Delicious, Swedish.',
    category: 'Beverages',
  },
  {
    id: 4997209,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x853/0a6e834f7c/hot-chocolate.jpeg',
    category: 'Beverages',
  },
  {
    id: 4997208,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/be9c34fa6e/tank-top-for-women.jpeg',
    category: 'Clothing',
  },
  {
    id: 4997207,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/fd6bd59ad8/vitamin-c.jpeg',
    description: "It's just some vitamins, we promise.",
    category: 'Food',
  },
  {
    id: 4997206,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x1920/f88b7799a9/liquid-soap.jpeg',
    category: 'Hygiene',
  },
  {
    id: 4997205,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/9448e51346/energy-drink.jpeg',
    category: 'Beverages',
  },
  {
    id: 4997204,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/15c069d25f/ale.jpeg',
    category: 'Beverages',
  },
  {
    id: 4997203,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x1828/58c98f3d37/oil-for-hands.jpeg',
    description: "It's for your hands.",
    category: 'Hygiene',
  },
  {
    id: 4997202,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/9d5d3f8556/lager-50-cl.jpeg',
    category: 'Hygiene',
  },
  {
    id: 4997201,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x853/dbe0780590/party-with-the-storyblok-staff.jpeg',
    category: undefined,
  },
  {
    id: 4997200,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x1919/6b34275fbc/woolen-sweater.jpeg',
    category: 'Clothing',
  },
  {
    id: 4997199,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x853/9afb777374/sunscreen.jpeg',
    description: 'Protects you from the evil sun.',
    category: 'Hygiene',
  },
  {
    id: 4997198,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x1828/61db0b65a8/deodorant.jpeg',
    category: 'Hygiene',
  },
  {
    id: 4997197,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x1920/d05aa548a4/face-moisturizer.jpeg',
    category: 'Hygiene',
  },
  {
    id: 4997196,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x1920/6b90e759f0/skin-oil.jpeg',
    category: 'Hygiene',
  },
  {
    id: 4997195,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1800x1198/fca0f50eb5/billboard.jpeg',
    category: undefined,
  },
  {
    id: 4997194,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/32a8b63705/roller-blind.jpeg',
    category: 'Home Decor',
  },
  {
    id: 4997193,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/f787096bf7/christmas-sweater.jpeg',
    category: 'Clothing',
  },
  {
    id: 4997192,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x853/647161f05c/storypaste-toothpaste.jpeg',
    category: 'Hygiene',
  },
  {
    id: 4997191,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/3b3f3085b2/eau-de-cologne-storyblok-edition.jpeg',
    category: 'Hygiene',
  },
  {
    id: 4997190,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/afcbac8b16/bus-stop-advertisement.jpeg',
    category: undefined,
  },
  {
    id: 4997189,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/bb03ff2feb/long-sleeved-christmas-t-shirt.jpeg',
    category: 'Clothing',
  },
  {
    id: 4997188,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x853/53d574e514/storyblok-suprise-gift-subscription.jpeg',
    category: undefined,
  },
  {
    id: 4997187,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x853/b82965c12b/boutique-sign.jpeg',
    category: undefined,
  },
  {
    id: 4997186,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/3fa5a3cd75/dark-lager-50cl.jpeg',
    category: 'Beverages',
  },
  {
    id: 4997185,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x853/6b81dd8e77/storybeans-coffee-medium-roast-arabica.jpeg',
    category: 'Beverages',
  },
  {
    id: 4997184,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x853/5b84722243/storybeans-coffee-light-roast-mexico.jpeg',
    category: 'Beverages',
  },
  {
    id: 4997183,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/68270b92fd/storychips.jpeg',
    category: 'Food',
  },
  {
    id: 4997182,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/60b621bbbb/chateau-storyblok-bordeaux-margaux-les-grands-crus-classes-en-1855.jpeg',
    category: 'Beverages',
  },
  {
    id: 4997181,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x853/c3eeb6aef0/storybox.jpeg',
    category: undefined,
  },
  {
    id: 4997180,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x1828/3e3a1e0892/deodorant-banana.jpeg',
    category: 'Hygiene',
  },
  {
    id: 4997179,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/9b13f01b97/storybeer-6x33cl.jpeg',
    category: 'Beverages',
  },
  {
    id: 4997178,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x1706/cf9618b9f8/storybusstop.jpeg',
    category: undefined,
  },
  {
    id: 4997177,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/b1e40c3db4/cup-with-lid-50-cl.jpeg',
    category: 'Kitchen',
  },
  {
    id: 4997176,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/d4270e4ed3/cider-50-cl.jpeg',
    category: 'Beverages',
  },
  {
    id: 4997175,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/a103f60bad/christmas-sweaters.jpeg',
    category: 'Clothing',
  },
  {
    id: 4997174,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/51f67e9825/storybaby-clothes.jpeg',
    category: 'Clothing',
  },
  {
    id: 4997173,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/44ce7ae66d/magnesium-100-pcs.jpeg',
    category: 'Food',
  },
  {
    id: 4997172,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x854/4a72c50160/anti-mosquito-spray.jpeg',
    category: 'Hygiene',
  },
  {
    id: 4997171,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/6f8d9f4257/hand-cleam-solid-soap.jpeg',
    category: 'Hygiene',
  },
  {
    id: 4997170,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/cd5594ecd7/500ml-cans-with-metallic-matte-and-plastic-finish.jpeg',
    category: 'Beverages',
  },
  {
    id: 4997169,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/76d966eaad/cup-with-lid-small.jpeg',
    category: 'Kitchen',
  },
  {
    id: 4997168,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x1920/837b2947d2/hand-cream.jpeg',
    category: 'Hygiene',
  },
  {
    id: 4997167,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/0be1667553/shower-towel.jpeg',
    category: 'Hygiene',
  },
  {
    id: 4997166,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/4da92eedd7/omega-3-oil-capsules.jpeg',
    category: 'Food',
  },
  {
    id: 4997165,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/b09879b9ea/storybeer-33cl.jpeg',
    category: 'Beverages',
  },
  {
    id: 4997164,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/0810d93216/storybeer-50cl.jpeg',
    category: 'Beverages',
  },
  {
    id: 4997163,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/8f32edf711/apple-cider-50cl.jpeg',
    category: 'Beverages',
  },
  {
    id: 4997162,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/15b4afdfbf/tank-top.jpeg',
    category: 'Clothing',
  },
  {
    id: 4997161,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/4dec0555bc/storyblok-belgian-beer.jpeg',
    category: 'Beverages',
  },
  {
    id: 4997160,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x896/04d2928721/small-sign-board.jpeg',
    category: undefined,
  },
  {
    id: 4997159,
    filename:
      'https://s3.amazonaws.com/a.storyblok.com/f/160270/1280x853/2077aad3d4/gray-sweater.jpeg',
    category: 'Clothing',
  },
]

const getImage = (filename: string) =>
  `${filename.replace('s3.amazonaws.com/', '')}/m/500x0`

const getNameFromImage = (filename: string): string | undefined => {
  const imageName = filename.split('/').splice(-1)[0]
  return imageName?.split('.')?.[0]?.split('-')?.map(capitalizeWord)?.join(' ')
}

export type Item = BasketItem<'item'> & {
  sku: string | undefined
}

export type MockItem = Item & {
  category: string | undefined
}

export const items: MockItem[] = tmpAssets
  .map((mockItems) => {
    const { filename, id, description } = mockItems
    const name = filename && getNameFromImage(filename)

    return {
      type: 'item',
      id: `${id}`,
      name: name ?? 'Without image',
      image: filename && getImage(filename),
      sku: `sku-${id}`,
      description,
      category: mockItems.category,
    } as MockItem
  })
  .sort(compareName)
