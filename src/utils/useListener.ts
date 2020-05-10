import React from 'react'

const useListener = (event, handler, options = {}, element = window) => {
  const listenerElement = React.useRef()

  React.useEffect(() => {
    listenerElement.current = element
  }, [element])

  React.useEffect(() => {
    if (!listenerElement.current) {
      return
    }
    listenerElement.current.addEventListener(event, handler, options)
    return () => {
      listenerElement.current.removeEventListener(event, handler, options)
    }
  })
}

export default useListener
