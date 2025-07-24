"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronDown,
  Camera,
  AlertTriangle,
  Users,
  Calendar,
  Grid3X3,
  Eye,
  MoreVertical,
  Clock,
  MapPin,
  Shield,
  Activity,
  Maximize2,
  Volume2,
  Settings,
  Bell,
  Search,
  Zap,
  Target,
  Loader2,
  DoorOpen,
  Siren,
} from "lucide-react"
import { useIncidents } from "@/hooks/use-incidents"
import { useCameras } from "@/hooks/use-cameras"
import { formatIncidentTime, getSeverityFromType, getStatusFromResolved } from "@/lib/utils"

export default function SecurityDashboard() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState("03:12:37")
  const [timelinePosition, setTimelinePosition] = useState(20)
  
  // Fetch data from API
  const { incidents, loading: incidentsLoading, error: incidentsError, resolveIncident } = useIncidents(false) // Only unresolved incidents
  const { cameras, loading: camerasLoading, error: camerasError } = useCameras()
  
  const liveIncidentCount = incidents.length

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const timeString = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
      setCurrentTime(timeString)
      
      // Calculate timeline position based on current time (0-24 hours range)
      const hour = now.getHours()
      const minute = now.getMinutes()
      const second = now.getSeconds()
      const totalMinutes = hour * 60 + minute + second / 60
      const position = Math.min((totalMinutes / (24 * 60)) * 100, 100)
      setTimelinePosition(position)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Handle resolve incident with optimistic UI
  const handleResolveIncident = async (id: string) => {
    try {
      await resolveIncident(id)
    } catch (error) {
      console.error('Failed to resolve incident:', error)
    }
  }

  // Loading states
  if (incidentsLoading || camerasLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#1a1a1a] text-white flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#ffcc00]" />
          <span className="text-xl font-semibold">Loading security dashboard...</span>
        </div>
      </div>
    )
  }

  // Error states
  if (incidentsError || camerasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#1a1a1a] text-white flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
          <p className="text-gray-400">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/25"
      case "high":
        return "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/25"
      case "medium":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 shadow-yellow-500/25"
      case "low":
        return "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/25"
      case "info":
        return "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 shadow-cyan-500/25"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 shadow-gray-500/25"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-red-400 bg-red-500/10 border-red-500/20"
      case "reviewing":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      case "resolved":
        return "text-green-400 bg-green-500/10 border-green-500/20"
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#1a1a1a] text-white">
      {/* Enhanced Header */}
      <header className="relative bg-gradient-to-r from-[#111111] via-[#131313] to-[#111111] border-b border-[#2a2a2a] shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffcc00]/5 to-transparent"></div>
        <div className="relative flex items-center justify-between px-8 py-5">
          <div className="flex items-center space-x-10">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xl border border-white/20">
                  <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse shadow-lg"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  MANDLACX
                </span>
                <div className="text-xs text-gray-400 font-medium tracking-wide">Security Operations Center</div>
              </div>
            </div>

            <nav className="flex items-center space-x-2">
              <Button
                variant="ghost"
                className="text-[#ffcc00] bg-gradient-to-r from-[#ffcc00]/10 to-[#ffcc00]/20 hover:from-[#ffcc00]/20 hover:to-[#ffcc00]/30 border border-[#ffcc00]/30 transition-all duration-300 shadow-lg"
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <Camera className="w-4 h-4 mr-2" />
                Cameras
              </Button>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <Eye className="w-4 h-4 mr-2" />
                Scenes
              </Button>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 relative"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Incidents
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-2 py-1 animate-pulse shadow-lg">
                  {liveIncidentCount}
                </Badge>
              </Button>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <Users className="w-4 h-4 mr-2" />
                Users
              </Button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Search className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3 bg-gradient-to-r from-white/5 to-white/10 rounded-xl px-4 py-3 border border-white/10 backdrop-blur-sm">
              <Avatar className="w-10 h-10 ring-2 ring-[#ffcc00]/30">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-gradient-to-br from-[#ffcc00] to-[#d4af37] text-black font-bold">
                  MA
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-semibold text-white">Mohammed Ajhas</div>
                <div className="text-gray-400 text-xs">Security Administrator</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Store Video Feed - Fixed size to prevent distortion */}
          <div className="flex-shrink-0">
            <div className="w-full lg:w-[750px] h-[450px] bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative">
              <img
                src="/image.png"
                alt="Security camera feed showing jewelry store with person near safe"
                className="w-full h-full object-cover"
              />

              {/* Enhanced Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none"></div>

              {/* Top Left - Enhanced Camera Status */}
              <div className="absolute top-6 left-6 flex items-center space-x-4">
                <div className="bg-black/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-red-500/40 flex items-center space-x-3 shadow-2xl">
                  <div className="relative">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="text-white font-bold text-sm tracking-wide">Camera - 01</span>
                  <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 text-xs px-2 py-1 shadow-lg">
                    LIVE
                  </Badge>
                </div>
              </div>

              {/* Top Right - Enhanced Timestamp & Controls */}
              <div className="absolute top-6 right-6 flex items-center space-x-3">
                <div className="bg-black/90 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 shadow-xl">
                  <div className="flex items-center space-x-3 text-sm text-white font-mono">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold">11/7/2025 - {currentTime}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/90 backdrop-blur-md border border-white/20 hover:bg-white/20 shadow-xl w-12 h-12"
                >
                  <Maximize2 className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/90 backdrop-blur-md border border-white/20 hover:bg-white/20 shadow-xl w-12 h-12"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>

              {/* Bottom Right - Enhanced Camera Thumbnails */}
              <div className="absolute bottom-6 right-6 flex space-x-4">
                <div className="relative group cursor-pointer">
                  <div className="w-28 h-20 bg-gray-900 rounded-xl overflow-hidden border-2 border-[#ffcc00] shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-[#ffcc00]/25">
                    <img
                      src="/cam1.svg"
                      alt="Camera 02"
                      className="w-full h-full object-cover object-center rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2 text-center">
                      <div className="text-white text-xs font-bold">Camera - 02</div>
                    </div>
                    <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="w-28 h-20 bg-gray-900 rounded-xl overflow-hidden border border-gray-600 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-[#ffcc00] group-hover:shadow-[#ffcc00]/25">
                    <img
                      src="/cam2.svg"
                      alt="Camera 03"
                      className="w-full h-full object-cover object-center rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2 text-center">
                      <div className="text-white text-xs font-bold">Camera - 03</div>
                    </div>
                    <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced AI Detection Overlay */}
              <div className="absolute bottom-6 left-6 bg-black/90 backdrop-blur-md px-5 py-3 rounded-xl border border-orange-500/40 shadow-2xl">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Activity className="w-5 h-5 text-orange-400 animate-pulse" />
                    <div className="absolute inset-0 w-5 h-5 text-orange-400 animate-ping opacity-50">
                      <Activity className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-orange-400 text-sm font-bold">Threat Detected</span>
                  <Badge className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-400 border border-orange-500/30 text-xs px-2 py-1">
                    94% Confidence
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Incident Sidebar - Fixed height to match video */}
          <div className="flex-1">
            <div className="h-[450px] bg-gradient-to-b from-[#111111] via-[#131313] to-[#111111] rounded-2xl border border-gray-800 shadow-2xl">
                              <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <AlertTriangle className="w-7 h-7 text-red-400" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{liveIncidentCount} Unresolved Incidents</h2>
                        <p className="text-sm text-gray-400 font-medium">Real-time monitoring active</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 text-xs bg-white/5 px-3 rounded-lg border border-white/10">
                        <img src="/resolve.svg" alt="Resolve" className="w-12 h-12" />
                        <span className="text-gray-300 font-medium">4 resolved</span>
                      </div>
                    </div>
                  </div>

                <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
                  {incidents.map((incident, index) => (
                    <Card
                      key={incident.id}
                      className="bg-gradient-to-r from-[#1a1a1a] to-[#232323] border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl group animate-fadeIn"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="relative flex-shrink-0">
                            <img
                              src="/incident2.svg"
                              alt="Incident thumbnail"
                              className="w-16 h-12 rounded-lg object-cover bg-gray-800 border border-gray-600 group-hover:border-gray-500 transition-all duration-200"
                            />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <Badge
                                className={`text-xs font-bold transition-all duration-200 border-0 shadow-lg ${getSeverityColor(getSeverityFromType(incident.type))}`}
                              >
                                {incident.type}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#ffcc00] hover:text-[#ffcc00] hover:bg-[#ffcc00]/10 text-xs h-7 px-3 border border-[#ffcc00]/30 hover:border-[#ffcc00]/50 transition-all duration-200 font-semibold"
                                onClick={() => handleResolveIncident(incident.id)}
                              >
                                Resolve
                              </Button>
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex items-center space-x-2 text-xs text-gray-300">
                                <Camera className="w-3 h-3 text-gray-400" />
                                <span className="font-medium">{incident.camera.name}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-gray-400">
                                <Clock className="w-3 h-3" />
                                <span>{formatIncidentTime(incident.tsStart, incident.tsEnd)}</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-white h-8 w-8 flex-shrink-0"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Camera Timeline */}
        <div className="mt-8">
          <div className="bg-[#2d2d2d] rounded-xl p-6 border border-[#444444] shadow-2xl">
            {/* Header with Playback Controls */}
            <div className="flex items-center justify-between pb-4 border-b border-[#444444] mb-4">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="text-[#8a8a8a] hover:text-[#e0e0e0] w-9 h-9">
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="bg-white/10 text-[#e0e0e0] w-9 h-9 rounded-full"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="text-[#8a8a8a] hover:text-[#e0e0e0] w-9 h-9">
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-3 text-[#8a8a8a] text-sm font-medium">
                <Clock className="w-4 h-4" />
                <span className="text-[#e0e0e0]">{currentTime} (15-Jun-2025)</span>
                <Badge className="bg-white/5 text-[#e0e0e0] px-2 py-1 rounded-md text-xs">
                  1x
                </Badge>
              </div>
            </div>

            {/* Timeline Body */}
            <div className="flex">
              {/* Camera List */}
              <div className="w-48 pr-5 flex flex-col gap-2 mt-14">
                {cameras.map((camera) => (
                  <div key={camera.id} className="h-[60px] flex items-center gap-3 text-[#8a8a8a] font-medium">
                    <Camera className="w-5 h-5" />
                    <span>{camera.name}</span>
                  </div>
                ))}
              </div>

              {/* Timeline Grid */}
              <div className="flex-1 relative">
                {/* Timeline Ruler */}
                <div className="flex justify-between px-3 mb-9">
                  {Array.from({ length: 25 }, (_, i) => (
                    <div key={i} className="relative text-[#8a8a8a] text-xs flex flex-col items-center">
                      <span className="font-medium">{String(i).padStart(2, "0")}:00</span>
                      <div className="absolute top-5 w-full h-4 bg-gradient-to-r from-transparent via-[#444444] to-transparent opacity-30"></div>
                    </div>
                  ))}
                </div>

                {/* Playhead */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-[#f7b731] z-10 pointer-events-none"
                  style={{ left: `${timelinePosition}%` }}
                >
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 bg-[#f7b731] text-black px-2 py-1 rounded text-xs font-bold shadow-lg">
                    {currentTime}
                  </div>
                </div>

                {/* Camera Tracks */}
                <div className="flex flex-col gap-2">
                  {cameras.map((camera) => (
                    <div key={camera.id} className="h-[60px] relative border-t border-[#444444] first:border-t-0">
                                              {/* Events */}
                        {camera.incidents.map((incident) => {
                          const startTime = new Date(incident.tsStart)
                          const endTime = new Date(incident.tsEnd)
                          const startHour = startTime.getHours()
                          const endHour = endTime.getHours()
                          
                          // Skip incidents that go beyond 24:00
                          if (endHour > 23) {
                            return null
                          }
                          
                          const minute = startTime.getMinutes()
                          const timePosition = ((startHour + minute / 60) / 24) * 100
                          
                          const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60)
                          const width = Math.max((duration / 60) * 100, 6)
                          
                          const timeString = startTime.toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: false 
                          })
                          
                          let eventClass = ""
                          let eventIcon = null
                          let eventText = ""
                          
                          switch(incident.type) {
                            case "Unauthorised Access":
                              eventClass = "bg-[#d35400]"
                              eventIcon = <Users className="w-3 h-3" />
                              eventText = "Unauthorised Access"
                              break
                            case "Face Recognised":
                              eventClass = "bg-[#2980b9]"
                              eventIcon = <Users className="w-3 h-3" />
                              eventText = "Face Recognised"
                              break
                            case "Motion Detection":
                              eventClass = "bg-[#27ae60]"
                              eventIcon = <Activity className="w-3 h-3" />
                              eventText = "Traffic congestion"
                              break
                            case "Gun Threat":
                              eventClass = "bg-[#c0392b]"
                              eventIcon = <Siren className="w-3 h-3" />
                              eventText = "Gun Threat"
                              break
                            default:
                              eventClass = "bg-transparent border border-[#7f8c8d] text-[#8a8a8a]"
                              eventIcon = <AlertTriangle className="w-3 h-3 text-[#e0e0e0]" />
                              eventText = "4 Multiple Events"
                          }
                          
                          return (
                            <div
                              key={incident.id}
                              className={`absolute top-1/2 transform -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 rounded-2xl text-xs font-medium whitespace-nowrap cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${eventClass}`}
                              style={{
                                left: `${timePosition}%`,
                                width: `${width}%`,
                                maxWidth: '180px',
                                minWidth: '50px'
                              }}
                            >
                              {eventIcon}
                              <span>{eventText}</span>
                              {incident.type === "Face Recognised" && (
                                <Badge className="bg-white/20 text-white text-xs px-1 py-0.5 border-0 ml-auto">
                                  {timeString}
                                </Badge>
                              )}
                            </div>
                          )
                        })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #404040, #555555);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #555555, #666666);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
