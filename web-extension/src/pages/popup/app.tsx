import React from 'react'
import { Toggle } from './toggle'
import { useReceiveHostFromContent } from './use_receive_host_from_content'
import { useStoreEnable } from './use_store_enable'

export const App = (): JSX.Element => {
  const { enabled, setEnabled } = useStoreEnable()
  const { currentHost } = useReceiveHostFromContent()

  return (
    <div className="w-48 h-56 p-2 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="text-lg font-bold text-white">MintGuard</h1>
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
          <>
            <p className="text-white text-lg mt-4 font-bold">{currentHost}</p>
            {enabled && (
              <div className="mt-4">
                <p className="text-white">
                  We&apos;ll alert you if you&apos;re minting on a risky site or
                  an unverified NFT project.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
