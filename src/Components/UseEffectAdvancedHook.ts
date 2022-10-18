/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-03-25T18:03:01+01:00
 * @Copyright: Technology Studio
**/

import type { DependencyList } from 'react'
import {
  useCallback,
  useEffect,
  useRef,
} from 'react'

const DEFAULT_KEY = 'default'

type SuppressableEffect = (attributes: {
  suppressEffect: () => void,
  isSuppressed: boolean,
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
}) => (void | (() => void | undefined))

export const useSuppressableEffect = (
  effect: SuppressableEffect,
  deps: DependencyList,
  clearSuppressDeps: DependencyList,
  key?: string,
): void => {
  const mapKey = key ?? DEFAULT_KEY
  const isSuppressedMapRef = useRef<Record<string, boolean>>({})
  const suppressEffect = useCallback(() => {
    isSuppressedMapRef.current[mapKey] = true
  }, [mapKey])
  useEffect(() => {
    isSuppressedMapRef.current[mapKey] = false
  // eslint-disable-next-line react-hooks/exhaustive-deps -- NOTE: we only want to run this effect when clearSuppressDeps is changed
  }, [clearSuppressDeps])
  useEffect(() => (
    effect({
      suppressEffect,
      isSuppressed: !!isSuppressedMapRef.current[mapKey],
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps -- NOTE: we want to run when custom dependencies change
  ), [...(deps || []), suppressEffect, mapKey])
}
