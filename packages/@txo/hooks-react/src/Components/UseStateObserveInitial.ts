/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-09-01T18:09:96+02:00
 * @Copyright: Technology Studio
**/

import {
  Dispatch,
  useState,
  useCallback,
  useLayoutEffect,
} from 'react'

import { useLatest } from './UseLatest'

export const useStateObserveInitial = <S,>(initialState: S): [S, Dispatch<S>] => {
  const recentState = useLatest<S>(
    typeof initialState === 'function'
      ? (() => initialState) as unknown as S
      : initialState,
  )
  const [state, _setState] = useState<S>(initialState)
  const setState: Dispatch<S> = useCallback((value: S) => {
    _setState(value)
    recentState.current = value
  }, [recentState])
  useLayoutEffect(() => {
    setState(recentState.current)
  }, [initialState, recentState, setState])
  return [state, setState]
}
