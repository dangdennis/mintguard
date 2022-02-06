import React from 'react'
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { Toggle } from './toggle'
import { useUpDownVote } from './use_up_down_vote'
import { useReceiveHostFromContent } from './use_receive_host_from_content'
import { useStoreEnable } from './use_store_enable'
import { useGetProject } from './use_get_project'

export const App = (): JSX.Element => {
  const { enabled, setEnabled } = useStoreEnable()
  const { currentHost } = useReceiveHostFromContent()
  const { data: project, refetch: refetchProject } = useGetProject(currentHost)
  const { mutate } = useUpDownVote(currentHost)

  return (
    <div className="w-48 h-64 p-2 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
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
          <div className="text-white">
            <p className="text-lg mt-4 font-bold">{currentHost}</p>
            <div className="flex items-center justify-center mt-2 text-center">
              <button
                onClick={async () => {
                  await mutate({
                    upvoted: true,
                  })
                  await refetchProject()
                }}
              >
                <FiThumbsUp className="text-lg"></FiThumbsUp>
                {`${project?.upvotes ?? 'TBD'}`}
              </button>
              <button
                onClick={async () => {
                  await mutate({
                    downvoted: true,
                  })
                  await refetchProject()
                }}
              >
                <FiThumbsDown className="text-lg ml-4"></FiThumbsDown>
                {`${project?.downvotes ?? 'TBD'}`}
              </button>
            </div>
            <div className="mt-4">
              <p className="">
                We&apos;ll alert you if you&apos;re minting on a risky site or
                an unverified NFT project.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
