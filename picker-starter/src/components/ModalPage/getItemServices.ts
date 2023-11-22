import { PickerService, ItemService } from '@/domain'

export const getItemServices = (
  pickerService: PickerService,
  selectOnly: string | undefined,
): ItemService[] =>
  typeof selectOnly === 'undefined' || selectOnly === ''
    ? pickerService.itemServices
    : pickerService.itemServices.filter(
        (itemService) => itemService.name === selectOnly,
      )