import { toRaw, isProxy, isRef, unref } from 'vue'

export function convertToRaw(value: any): any {
  let rawValue = value
  if (isProxy(rawValue)) {
    rawValue = toRaw(rawValue)
  }
  if (isRef(rawValue)) {
    rawValue = unref(rawValue)
  }

  if (isObject(rawValue)) {
    return Object.keys(rawValue).reduce((result, key) => {
      result[key] = convertToRaw(rawValue[key])
      return result
    }, rawValue)
  } else if (Array.isArray(rawValue)) {
    return rawValue.map(convertToRaw)
  } else {
    return rawValue
  }
}

function isObject(value: unknown) {
  return Object.prototype.toString.call(value) === '[object Object]'
}
