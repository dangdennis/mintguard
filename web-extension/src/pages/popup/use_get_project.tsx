import { useEffect, useState } from 'react'
import { baseURL } from './base_url'
import { TProject } from './project.type'

export function useGetProject(
  host: string,
): {
  data: TProject | null
  loading: boolean
  refetch(): void
} {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TProject | null>(null)

  async function get() {
    if (!host) {
      return
    }

    setLoading(true)

    const res: { data: TProject[] } = await fetch(
      baseURL + `/projects?website=${host ?? ''}`,
    ).then((r) => r.json())

    setLoading(false)

    setData(res.data[0])
  }

  useEffect(() => {
    get()
  }, [host])

  return { refetch: get, loading, data }
}
