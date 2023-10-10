import { FunctionComponent, useEffect, useRef } from 'react'
import { useFieldPlugin } from '@storyblok/field-plugin/react'

const FieldPlugin: FunctionComponent = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { data } = useFieldPlugin()

  // data.options.HOST_URL: http://localhost:8081/hi
  // childOrigin: http://localhost:8081
  const childOrigin = new URL(data.options.HOST_URL).origin

  const iframeSrc = data.options.HOST_URL.includes('?')
    ? data.options.HOST_URL + '&' + window.location.search.slice(1)
    : data.options.HOST_URL + window.location.search

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e.origin === childOrigin) {
        // from child
        window.parent.postMessage(e.data, '*')
      } else {
        // from parent
        iframeRef.current?.contentWindow?.postMessage(e.data, '*')
      }
    })
  }, [])

  return (
    <iframe
      ref={iframeRef}
      src={iframeSrc}
    />
  )
}

export default FieldPlugin
