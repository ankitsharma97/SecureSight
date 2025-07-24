import { useState, useEffect } from 'react'

export interface Incident {
  id: string
  cameraId: string
  type: string
  tsStart: string
  tsEnd: string
  thumbnailUrl: string | null
  resolved: boolean
  camera: {
    id: string
    name: string
    location: string
  }
}

export function useIncidents(resolved?: boolean) {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (resolved !== undefined) {
          params.append('resolved', resolved.toString())
        }
        
        const response = await fetch(`/api/incidents?${params.toString()}`)
        if (!response.ok) {
          throw new Error('Failed to fetch incidents')
        }
        
        const data = await response.json()
        setIncidents(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchIncidents()
  }, [resolved])

  const resolveIncident = async (id: string) => {
    try {
      const response = await fetch(`/api/incidents/${id}/resolve`, {
        method: 'PATCH',
      })
      
      if (!response.ok) {
        throw new Error('Failed to resolve incident')
      }
      
      const updatedIncident = await response.json()
      
      // Update the incidents list with the resolved incident
      setIncidents(prev => 
        prev.map(incident => 
          incident.id === id ? updatedIncident : incident
        )
      )
      
      return updatedIncident
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resolve incident')
      throw err
    }
  }

  return { incidents, loading, error, resolveIncident }
} 