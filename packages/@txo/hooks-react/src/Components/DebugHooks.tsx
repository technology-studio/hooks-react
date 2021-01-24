/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-09-17T19:09:12+02:00
 * @Copyright: Technology Studio
**/

import { useRef, useEffect } from 'react'
import { debugDiffObjects } from '@txo/functional'

export const usePrevious = <VALUE,>(value: VALUE): VALUE | undefined => {
  const ref = useRef<VALUE>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
export const usePreviousDiff = <VALUE extends {}>(current: VALUE): Record<string, unknown> | string | any[] | undefined => {
  const previous = usePrevious(current)
  return debugDiffObjects(previous, current)
}
