/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-08-25T15:08:12+02:00
 * @Copyright: Technology Studio
**/

import { useRef } from 'react'

export const useMemoObject = <OBJECT extends Record<string, unknown> | undefined>(value: OBJECT): OBJECT => {
  const previousValueRef = useRef(value)
  const previousValue = previousValueRef.current
  if (previousValueRef.current === value) {
    return previousValueRef.current
  }

  if (!value || !previousValue) {
    previousValueRef.current = value
    return previousValueRef.current
  }
  const valueKeyList = Object.keys(value)
  if (
    valueKeyList.length !== Object.keys(previousValue).length ||
    valueKeyList.some(key => (
      !(key in previousValue) || previousValue[key] !== value[key]
    ))
  ) {
    previousValueRef.current = value
  }
  return previousValueRef.current
}
