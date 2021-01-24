/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-03-25T18:03:01+01:00
 * @Copyright: Technology Studio
**/

import React, { DependencyList } from 'react'

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
  const isSuppressedMapRef = React.useRef<Record<string, boolean>>({})
  const suppressEffect = React.useCallback(() => {
    isSuppressedMapRef.current[mapKey] = true
  }, [isSuppressedMapRef])
  React.useEffect(() => {
    isSuppressedMapRef.current[mapKey] = false
  }, [clearSuppressDeps])
  React.useEffect(() => (
    effect({
      suppressEffect,
      isSuppressed: !!isSuppressedMapRef.current[mapKey],
    })
  ), [...(deps || []), mapKey])
}
