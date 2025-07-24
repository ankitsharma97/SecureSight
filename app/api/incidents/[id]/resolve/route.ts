import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // First get the current incident to flip the resolved status
    const currentIncident = await prisma.incident.findUnique({
      where: { id },
      include: { camera: true }
    })

    if (!currentIncident) {
      return NextResponse.json(
        { error: 'Incident not found' },
        { status: 404 }
      )
    }

    // Update the incident with the flipped resolved status
    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: {
        resolved: !currentIncident.resolved
      },
      include: {
        camera: true
      }
    })

    return NextResponse.json(updatedIncident)
  } catch (error) {
    console.error('Error updating incident:', error)
    return NextResponse.json(
      { error: 'Failed to update incident' },
      { status: 500 }
    )
  }
} 