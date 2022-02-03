import React, { useState } from 'react'
import { Toggle } from './toggle'

export const App = (): JSX.Element => {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="w-48 h-40 p-2 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
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
              We&apos;ll make sure your minting experience is safe.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
