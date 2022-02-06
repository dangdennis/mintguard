import React from 'react'
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { Toggle } from './toggle'
import { useReceiveHostFromContent } from './use_receive_host_from_content'
import { useStoreEnable } from './use_store_enable'
import { useGetProject } from './use_get_project'
import { TProject } from './project.type'

export const App = (): JSX.Element => {
  const { enabled, setEnabled } = useStoreEnable()
  const { currentHost } = useReceiveHostFromContent()
  const {
    data: project,
    refetch: refetchProject,
    vote: mutate,
  } = useGetProject(currentHost)

  return (
    <div className="w-48 h-72 p-2 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
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
            <p className="text-lg mt-4 font-bold">
              {currentHost}{' '}
              <div className="font-thin">
                <RiskScore project={project}></RiskScore>
              </div>
            </p>
            <div className="flex items-center justify-center mt-2 text-center">
              <button
                className="flex flex-col items-center justify-center"
                onClick={async () => {
                  await mutate({
                    upvoted: true,
                  })
                  await refetchProject()
                }}
              >
                <FiThumbsUp className="text-lg"></FiThumbsUp>
                {project?.upvotes && `${project?.upvotes}`}
              </button>
              <button
                className="flex flex-col items-center justify-center ml-4"
                onClick={async () => {
                  await mutate({
                    downvoted: true,
                  })
                  await refetchProject()
                }}
              >
                <FiThumbsDown className="text-lg"></FiThumbsDown>
                {project?.downvotes && `${project?.downvotes}`}
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

function RiskScore(props: {
  project: TProject | null
}): React.ReactElement | null {
  if (!props.project) {
    return null
  }

  const riskScore = props.project.risk_score

  if (riskScore > 75) {
    return (
      <div className="flex items-center justify-center">
        <p>High</p>
        <div className="bg-red-600 rounded-full w-4 h-4 ml-1"></div>
      </div>
    )
  }

  if (riskScore < 30) {
    return (
      <div className="flex items-center justify-center">
        <p>Med</p>
        <div className="bg-orange-400 rounded-full w-4 h-4 ml-1"></div>
      </div>
    )
  }

  if (riskScore > 0) {
    return (
      <div className="flex items-center justify-center">
        <p>Low</p>
        <div className="bg-green-400 rounded-full w-4 h-4 ml-1"></div>
      </div>
    )
  }

  return <p>TBD</p>
}
