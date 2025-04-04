/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-09-17T19:09:12+02:00
 * @Copyright: Technology Studio
**/

import {
  useRef,
  useEffect,
} from 'react'
import { debugDiffObjects } from '@txo/functional'

export const usePrevious = <VALUE>(value: VALUE): VALUE | undefined => {
  const ref = useRef<VALUE>(undefined)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- any value can be passed
export const usePreviousDiff = (current: {}): unknown => {
  const previous = usePrevious(current)
  return debugDiffObjects(previous, current)
}
