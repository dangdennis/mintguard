import { useEffect, useState } from 'react'

export function useStoreEnable(): {
  enabled: boolean
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>
} {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    chrome.storage.local.get(['enabled'], (store) => {
      setEnabled(store['enabled'])
    })
  }, [])

  useEffect(() => {
    chrome.storage.local.set({ enabled })
  }, [enabled])

  return { enabled, setEnabled }
}
