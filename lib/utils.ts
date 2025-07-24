import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatIncidentTime(tsStart: string, tsEnd: string): string {
  const start = new Date(tsStart)
  const end = new Date(tsEnd)
  
  const startTime = start.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })
  const endTime = end.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })
  
  const date = start.toLocaleDateString('en-US', { 
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
  
  return `${startTime} - ${endTime} on ${date}`
}

export function getSeverityFromType(type: string): string {
  switch (type.toLowerCase()) {
    case 'gun threat':
      return 'critical'
    case 'unauthorised access':
    case 'unauthorized access':
      return 'high'
    case 'motion detection':
      return 'medium'
    case 'face recognised':
    case 'face recognized':
      return 'info'
    default:
      return 'low'
  }
}

export function getStatusFromResolved(resolved: boolean): string {
  return resolved ? 'resolved' : 'active'
}
