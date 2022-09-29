/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-10-17T14:10:17+02:00
 * @Copyright: Technology Studio
**/

import type { MutableRefObject } from 'react'
import { useRef } from 'react'

export const useLatest = <TYPE>(value: TYPE): MutableRefObject<TYPE> => {
  const ref = useRef(value)
  ref.current = value
  return ref
}
