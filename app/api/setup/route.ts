import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // This endpoint should only be called once after deployment
    // In production, you might want to add authentication
    
    console.log('Setting up database...')
    
    // Check if data already exists
    const existingCameras = await prisma.camera.count()
    if (existingCameras > 0) {
      return NextResponse.json({ 
        message: 'Database already initialized',
        cameras: existingCameras 
      })
    }

    // Create cameras
    const cameras = await Promise.all([
      prisma.camera.create({
        data: {
          name: "Shop Floor Camera A",
          location: "Main Production Area"
        }
      }),
      prisma.camera.create({
        data: {
          name: "Vault Camera",
          location: "Secure Storage Vault"
        }
      }),
      prisma.camera.create({
        data: {
          name: "Entrance Camera",
          location: "Main Building Entrance"
        }
      }),
      prisma.camera.create({
        data: {
          name: "Back Office Camera",
          location: "Administrative Area"
        }
      })
    ])

    // Get current date for timestamp calculations
    const now = new Date()
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    // Create incidents with realistic timestamps over 24 hours
    const incidents = [
      // Yesterday incidents
      {
        cameraId: cameras[0].id,
        type: "Unauthorised Access",
        tsStart: new Date(yesterday.getTime() + 8 * 60 * 60 * 1000),
        tsEnd: new Date(yesterday.getTime() + 8 * 60 * 60 * 1000 + 2 * 60 * 1000),
        thumbnailUrl: "/placeholder.svg?height=60&width=80&text=Unauthorized+Access",
        resolved: false
      },
      {
        cameraId: cameras[1].id,
        type: "Gun Threat",
        tsStart: new Date(yesterday.getTime() + 10 * 60 * 60 * 1000),
        tsEnd: new Date(yesterday.getTime() + 10 * 60 * 60 * 1000 + 3 * 60 * 1000),
        thumbnailUrl: "/placeholder.svg?height=60&width=80&text=Gun+Threat",
        resolved: false
      },
      {
        cameraId: cameras[2].id,
        type: "Face Recognised",
        tsStart: new Date(yesterday.getTime() + 12 * 60 * 60 * 1000),
        tsEnd: new Date(yesterday.getTime() + 12 * 60 * 60 * 1000 + 1 * 60 * 1000),
        thumbnailUrl: "/placeholder.svg?height=60&width=80&text=Face+Recognized",
        resolved: true
      },
      {
        cameraId: cameras[0].id,
        type: "Motion Detection",
        tsStart: new Date(yesterday.getTime() + 14 * 60 * 60 * 1000),
        tsEnd: new Date(yesterday.getTime() + 14 * 60 * 60 * 1000 + 2 * 60 * 1000),
        thumbnailUrl: "/placeholder.svg?height=60&width=80&text=Motion+Detected",
        resolved: true
      },
      {
        cameraId: cameras[3].id,
        type: "Unauthorised Access",
        tsStart: new Date(yesterday.getTime() + 16 * 60 * 60 * 1000),
        tsEnd: new Date(yesterday.getTime() + 16 * 60 * 60 * 1000 + 4 * 60 * 1000),
        thumbnailUrl: "/placeholder.svg?height=60&width=80&text=Back+Office+Access",
        resolved: false
      },
      {
        cameraId: cameras[1].id,
        type: "Gun Threat",
        tsStart: new Date(yesterday.getTime() + 18 * 60 * 60 * 1000),
        tsEnd: new Date(yesterday.getTime() + 18 * 60 * 60 * 1000 + 2 * 60 * 1000),
        thumbnailUrl: "/placeholder.svg?height=60&width=80&text=Vault+Threat",
        resolved: false
      },
      {
        cameraId: cameras[2].id,
        type: "Face Recognised",
        tsStart: new Date(yesterday.getTime() + 20 * 60 * 60 * 1000),
        tsEnd: new Date(yesterday.getTime() + 20 * 60 * 60 * 1000 + 1 * 60 * 1000),
        thumbnailUrl: "/placeholder.svg?height=60&width=80&text=Night+Entry",
        resolved: true
      },
      {
        cameraId: cameras[0].id,
        type: "Motion Detection",
        tsStart: new Date(yesterday.getTime() + 22 * 60 * 60 * 1000),
        tsEnd: new Date(yesterday.getTime() + 22 * 60 * 60 * 1000 + 3 * 60 * 1000),
        thumbnailUrl: "/placeholder.svg?height=60&width=80&text=Night+Activity",
        resolved: false
      },
      // Today incidents
      {
        cameraId: cameras[1].id,
        type: "Unauthorised Access",
        tsStart: new Date(now.getTime() - 6 * 60 * 60 * 1000),
        tsEnd: new Date(now.getTime() - 6 * 60 * 60 * 1000 + 2 * 60 * 1000),
        thumbnailUrl: "/placeholder.svg?height=60&width=80&text=Early+Access",
        resolved: false
      },
      {
        cameraId: cameras[2].id,
        type: "Face Recognised",
        tsStart: new Date(now.getTime() - 4 * 60 * 60 * 1000),
        tsEnd: new Date(now.getTime() - 4 * 60 * 60 * 1000 + 1 * 60 * 1000),
        thumbnailUrl: "/placeholder.svg?height=60&width=80&text=Staff+Entry",
        resolved: true
      },
      {
        cameraId: cameras[0].id,
        type: "Gun Threat",
        tsStart: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        tsEnd: new Date(now.getTime() - 2 * 60 * 60 * 1000 + 3 * 60 * 1000),
        thumbnailUrl: "/placeholder.svg?height=60&width=80&text=Recent+Threat",
        resolved: false
      },
      {
        cameraId: cameras[3].id,
        type: "Motion Detection",
        tsStart: new Date(now.getTime() - 30 * 60 * 1000),
        tsEnd: new Date(now.getTime() - 30 * 60 * 1000 + 2 * 60 * 1000),
        thumbnailUrl: "/placeholder.svg?height=60&width=80&text=Recent+Motion",
        resolved: false
      },
      {
        cameraId: cameras[0].id,
        type: "Unauthorised Access",
        tsStart: new Date(now.getTime() - 15 * 60 * 1000),
        tsEnd: new Date(now.getTime() - 15 * 60 * 1000 + 1 * 60 * 1000),
        thumbnailUrl: "/placeholder.svg?height=60&width=80&text=Recent+Unauthorized",
        resolved: false
      },
      {
        cameraId: cameras[1].id,
        type: "Face Recognised",
        tsStart: new Date(now.getTime() - 10 * 60 * 1000),
        tsEnd: new Date(now.getTime() - 10 * 60 * 1000 + 1 * 60 * 1000),
        thumbnailUrl: "/placeholder.svg?height=60&width=80&text=Recent+Face",
        resolved: false
      },
      {
        cameraId: cameras[2].id,
        type: "Gun Threat",
        tsStart: new Date(now.getTime() - 5 * 60 * 1000),
        tsEnd: new Date(now.getTime() - 5 * 60 * 1000 + 2 * 60 * 1000),
        thumbnailUrl: "/placeholder.svg?height=60&width=80&text=Recent+Gun",
        resolved: false
      }
    ]

    for (const incident of incidents) {
      await prisma.incident.create({
        data: incident
      })
    }

    console.log('Database setup completed successfully!')
    
    return NextResponse.json({ 
      message: 'Database initialized successfully',
      cameras: cameras.length,
      incidents: incidents.length
    })

  } catch (error) {
    console.error('Database setup failed:', error)
    return NextResponse.json({ 
      error: 'Failed to initialize database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
} 