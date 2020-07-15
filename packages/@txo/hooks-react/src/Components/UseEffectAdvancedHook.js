/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2020-03-25T18:03:01+01:00
 * @Copyright: Technology Studio
 * @flow
**/

import React from 'react'

const DEFAULT_KEY = 'default'

export const useSuppressableEffect = (
  create: ({
    suppressEffect: () => void,
    isSuppressed: boolean,
  }) => (() => void) | void,
  deps: mixed[] | void | null,
  clearSuppressDeps: mixed[] | void | null,
  key?: string,
) => {
  const mapKey = key || DEFAULT_KEY
  const isSuppressedMapRef = React.useRef({})
  const suppressEffect = React.useCallback(() => {
    isSuppressedMapRef.current[mapKey] = true
  }, [isSuppressedMapRef])
  React.useEffect(() => {
    isSuppressedMapRef.current[mapKey] = false
  }, [clearSuppressDeps])
  React.useEffect(() => (
    create({
      suppressEffect,
      isSuppressed: !!isSuppressedMapRef.current[mapKey],
    })
  ), [...(deps || []), mapKey])
}
