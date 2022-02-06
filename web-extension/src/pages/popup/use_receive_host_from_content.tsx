import { useEffect, useState } from 'react'

export function useReceiveHostFromContent(): { currentHost: string } {
  const [currentHost, setCurrentHost] = useState('')

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0].url) {
        const url = new URL(tabs[0].url)
        setCurrentHost(url.host)
      }
    })
  }, [setCurrentHost])

  return { currentHost }
}
