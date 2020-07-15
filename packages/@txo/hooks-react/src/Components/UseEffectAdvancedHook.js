/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2020-03-25T18:03:01+01:00
 * @Copyright: Technology Studio
 * @flow
**/

import React from 'react'

export const useSuppressableEffect = (
  create: ({
    suppressEffect: () => void,
    isSuppressed: boolean,
  }) => (() => void) | void,
  deps: mixed[] | void | null,
  clearSuppressDeps: mixed[] | void | null,
) => {
  const isSuppressedRef = React.useRef(false)
  const suppressEffect = React.useCallback(() => {
    isSuppressedRef.current = true
  }, [isSuppressedRef])
  React.useEffect(() => {
    isSuppressedRef.current = false
  }, [clearSuppressDeps])
  React.useEffect(() => (
    create({
      suppressEffect,
      isSuppressed: isSuppressedRef.current,
    })
  ), deps)
}
