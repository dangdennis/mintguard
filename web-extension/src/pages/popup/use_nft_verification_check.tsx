import React, { useState } from 'react'
import useSWR from 'swr'
import { baseURL } from "./base_url"
import { TProject } from "./project.type"

/**
 * @param args.website the domain, i.e. azuki.com, boredapeyachtclub.com
 */
function useNFTVerificationCheck(args: {
  address: string | null
  website: string | null
}) {
  return useSWR(
    args.address
      ? [args.address, args.website, `/projects/${args.address}`]
      : null,
    async (address: string, website: string) => {
      const res: { data: TProject[] } = await fetch(
        `${baseURL}/projects?address=${address ?? ''}&website=${website ?? ''}`,
      ).then((r) => r.json())
      return res
    },
  )
}

export function NFTAddressCheck(): React.ReactElement {
  const [addr, setAddr] = useState<string | null>(null)
  useNFTVerificationCheck({
    address: addr,
    website: null,
  })

  return (
    <form>
      <input
        type="text"
        name="to_address"
        id="to_address"
        aria-label="To Address"
        className="px-2 h-6 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder="Assess address NFT validity"
        onChange={(e) => {
          if (e.target.value.startsWith('0x')) {
            setAddr(e.target.value)
          }
        }}
      />
    </form>
  )
}
