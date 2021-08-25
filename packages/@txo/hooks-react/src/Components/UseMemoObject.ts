/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-08-25T15:08:12+02:00
 * @Copyright: Technology Studio
**/

import { useRef } from 'react'

export const useMemoObject = <OBJECT extends Record<string, unknown> | undefined>(value: OBJECT): OBJECT => {
  const valueRef = useRef(value)
  if (valueRef.current === value) {
    return valueRef.current
  }
  if (!value || !valueRef.current) {
    valueRef.current = value
    return valueRef.current
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const _value = value!
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const previousValue = valueRef.current!
  const valueKeyList = Object.keys(_value)
  if (
    valueKeyList.length !== Object.keys(previousValue).length ||
    valueKeyList.some(key => (
      !(key in previousValue) || previousValue[key] !== value[key]
    ))
  ) {
    valueRef.current = value
  }
  return previousValue
}
