import { PickerService, TabItem } from '@/core'

export const getTabs = (
  pickerService: PickerService,
  selectOnly: string | undefined,
): TabItem[] =>
  typeof selectOnly === 'undefined' || selectOnly === ''
    ? pickerService.tabs
    : pickerService.tabs.filter((tab) => tab.name === selectOnly)
