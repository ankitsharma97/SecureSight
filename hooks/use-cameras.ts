import { useState, useEffect } from 'react'

export interface Camera {
  id: string
  name: string
  location: string
  incidents: Array<{
    id: string
    type: string
    tsStart: string
    tsEnd: string
    resolved: boolean
  }>
}

export function useCameras() {
  const [cameras, setCameras] = useState<Camera[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/cameras')
        if (!response.ok) {
          throw new Error('Failed to fetch cameras')
        }
        
        const data = await response.json()
        setCameras(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCameras()
  }, [])

  return { cameras, loading, error }
} 