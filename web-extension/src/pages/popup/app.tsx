import React, { useEffect, useState } from 'react'
import { Toggle } from './toggle'
// import axios from 'axios'

// const covalent = axios.create({
//   baseURL: 'https://api.covalenthq.com/v1/1',
//   params: {
//     format: 'JSON',
//     key: 'ckey_a6cac550414b4197863a8ebd7d7',
//   },
// })

function useStoreEnable() {
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

export const App = (): JSX.Element => {
  const { enabled, setEnabled } = useStoreEnable()

  return (
    <div className="w-48 h-48 p-2 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="text-lg font-bold text-white">Minting Protection</h1>
      <div
        className="grid w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        style={{
          gridTemplateColumns: '100%',
          gridTemplateRows: '1fr auto',
        }}
      >
        <div className="flex justify-center w-full mt-6">
          <Toggle enabled={enabled} onClick={() => setEnabled(!enabled)} />
        </div>
        {enabled && (
          <div className="mt-4">
            <p className="text-white">
              We&apos;ll alert you if you&apos;re minting on a risky site or an
              unverified NFT project.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
