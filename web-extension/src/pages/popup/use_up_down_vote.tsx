import { useState } from 'react'
import { baseURL } from './base_url'
import { TProject } from './project.type'

export function useUpDownVote(
  host: string,
): {
  data: TProject | null
  loading: boolean
  mutate: (args: { upvoted?: boolean; downvoted?: boolean }) => void
} {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TProject | null>(null)

  async function mutate(args: { upvoted?: boolean; downvoted?: boolean }) {
    if (!host) {
      return
    }

    setLoading(true)

    const res: { data: TProject } = await fetch(baseURL + '/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        website: host,
        upvoted: args.upvoted,
        downvoted: args.downvoted,
      }),
    }).then((r) => r.json())

    setLoading(false)

    setData(res.data)
  }

  return { mutate, loading, data }
}
