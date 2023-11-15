import { ECommerceService, ItemService } from '../ecommerce'

export const getItemServices = (
  eCommerceService: ECommerceService,
  selectOnly: string | undefined,
): ItemService[] =>
  typeof selectOnly === 'undefined' || selectOnly === ''
    ? eCommerceService.itemServices
    : eCommerceService.itemServices.filter(
        (itemService) => itemService.name === selectOnly,
      )
