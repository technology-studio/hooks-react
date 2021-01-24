/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-10-17T14:10:17+02:00
 * @Copyright: Technology Studio
**/

import { RefObject, useRef, useEffect } from 'react'

export const useLatest = <TYPE>(value: TYPE): RefObject<TYPE> => {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref
}
