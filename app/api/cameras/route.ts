import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const cameras = await prisma.camera.findMany({
      include: {
        incidents: {
          orderBy: {
            tsStart: 'desc'
          },
          take: 5 // Get latest 5 incidents per camera
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(cameras)
  } catch (error) {
    console.error('Error fetching cameras:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cameras' },
      { status: 500 }
    )
  }
} 