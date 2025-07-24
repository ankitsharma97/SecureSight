# SecureSight CCTV Monitoring Dashboard

A comprehensive security monitoring dashboard for CCTV surveillance systems with real-time incident tracking, camera timeline visualization, and incident management capabilities.

## 🚀 Features

- **Real-time Incident Monitoring**: Live tracking of security incidents across multiple cameras
- **Interactive Timeline**: 24-hour camera timeline with overlapping incident handling
- **Incident Management**: Resolve incidents with optimistic UI updates
- **Camera Feed Integration**: Support for multiple CCTV camera feeds
- **Responsive Design**: Modern UI that works across all devices
- **Real-time Updates**: Live time synchronization and incident status updates

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern component library
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Database abstraction layer
- **SQLite** - Local database for development
- **TypeScript** - Full-stack type safety

### Database
- **SQLite** - Lightweight, file-based database
- **Prisma Schema** - Type-safe database schema
- **Migrations** - Version-controlled database changes

## 📋 Prerequisites

- Node.js 18+ 
- npm or pnpm
- Git

## 🚀 Deployment Instructions

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd security-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database configuration
   ```

4. **Initialize database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   
   # Seed the database with sample data
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Deployment

#### Vercel (Recommended)

1. **Connect your repository**
   - Push code to GitHub/GitLab
   - Connect repository to Vercel

2. **Configure environment variables**
   ```env
   DATABASE_URL="your-production-database-url"
   NODE_ENV="production"
   ```

3. **Deploy**
   - Vercel will automatically detect Next.js
   - Build and deploy on every push

#### Docker Deployment

1. **Build the image**
   ```bash
   docker build -t security-dashboard .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URL="your-database-url" \
     -e NODE_ENV="production" \
     security-dashboard
   ```

#### Database Setup for Production

**Option 1: PostgreSQL (Recommended)**
```bash
# Update DATABASE_URL in .env
DATABASE_URL="postgresql://user:password@host:port/database"

# Run migrations
npx prisma migrate deploy
```

**Option 2: MySQL**
```bash
# Update DATABASE_URL in .env
DATABASE_URL="mysql://user:password@host:port/database"

# Run migrations
npx prisma migrate deploy
```

## 🏗️ Tech Decisions

### Architecture Choices

1. **Next.js App Router**
   - **Why**: Latest Next.js features, improved performance, better SEO
   - **Benefits**: Server components, streaming, improved caching

2. **Prisma ORM**
   - **Why**: Type-safe database operations, excellent developer experience
   - **Benefits**: Auto-generated types, migrations, query optimization

3. **SQLite for Development**
   - **Why**: Zero-configuration, file-based, perfect for development
   - **Benefits**: No server setup, easy backups, portable

4. **Tailwind CSS + Shadcn/ui**
   - **Why**: Rapid UI development, consistent design system
   - **Benefits**: Utility classes, component library, responsive design

5. **TypeScript**
   - **Why**: Type safety across full-stack, better developer experience
   - **Benefits**: Catch errors early, better IDE support, self-documenting code

### Database Schema Design

```prisma
model Camera {
  id        String     @id @default(cuid())
  name      String
  location  String
  incidents Incident[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model Incident {
  id           String   @id @default(cuid())
  cameraId     String
  camera       Camera   @relation(fields: [cameraId], references: [id])
  type         String
  tsStart      DateTime
  tsEnd        DateTime
  thumbnailUrl String?
  resolved     Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

**Design Rationale:**
- **CUID IDs**: URL-safe, collision-resistant identifiers
- **Timestamps**: Full audit trail with created/updated times
- **Relationships**: Proper foreign key constraints
- **Nullable thumbnails**: Optional for different incident types

### API Design

**RESTful Endpoints:**
- `GET /api/incidents?resolved=false` - Fetch unresolved incidents
- `PATCH /api/incidents/:id/resolve` - Toggle incident resolution
- `GET /api/cameras` - Fetch cameras with latest incidents

**Design Principles:**
- **Query parameters** for filtering
- **HTTP status codes** for proper error handling
- **Consistent response format** across all endpoints

### Frontend Architecture

**Component Structure:**
```
app/
├── page.tsx              # Main dashboard
├── api/                  # API routes
│   ├── incidents/
│   └── cameras/
├── layout.tsx            # Root layout
└── globals.css           # Global styles

components/
├── ui/                   # Shadcn/ui components
└── theme-provider.tsx    # Theme configuration

hooks/
├── use-incidents.ts      # Incident data fetching
└── use-cameras.ts        # Camera data fetching

lib/
├── prisma.ts            # Database client
└── utils.ts             # Utility functions
```

## 🔮 If I Had More Time...

### Immediate Improvements (1-2 weeks)

- **🔐 Authentication & Authorization**
  - JWT-based user authentication
  - Role-based access control (Admin, Operator, Viewer)
  - Session management with refresh tokens

- **📊 Enhanced Analytics**
  - Incident trend analysis and charts
  - Camera performance metrics
  - Real-time statistics dashboard

- **🎥 Live Video Integration**
  - WebRTC for real-time video streaming
  - Video recording and playback
  - Frame capture and analysis

- **🔔 Real-time Notifications**
  - WebSocket integration for live updates
  - Push notifications for critical incidents
  - Email/SMS alerts for security personnel

### Medium-term Features (1-2 months)

- **🤖 AI-Powered Detection**
  - Computer vision integration for automatic threat detection
  - Machine learning models for incident classification
  - Predictive analytics for security risks

- **📱 Mobile Application**
  - React Native app for mobile monitoring
  - Offline incident reporting
  - GPS-based location tracking

- **🌐 Multi-tenant Architecture**
  - Support for multiple organizations
  - Isolated data and user management
  - Custom branding per tenant

- **📈 Advanced Reporting**
  - Custom report generation
  - Export to PDF/Excel
  - Scheduled report delivery

### Long-term Vision (3-6 months)

- **🔗 IoT Integration**
  - Smart sensor integration (motion, temperature, etc.)
  - Automated door lock control
  - Environmental monitoring

- **☁️ Cloud Infrastructure**
  - Microservices architecture
  - Kubernetes deployment
  - Auto-scaling capabilities

- **🔍 Advanced Search & Filtering**
  - Full-text search across incidents
  - Advanced filtering by time, location, type
  - Saved search queries

- **🎨 Customization & Theming**
  - Custom dashboard layouts
  - Brand-specific theming
  - Widget-based dashboard builder

### Performance Optimizations

- **⚡ Caching Strategy**
  - Redis for session and data caching
  - CDN for static assets
  - Database query optimization

- **📊 Monitoring & Logging**
  - Application performance monitoring
  - Error tracking and alerting
  - Comprehensive logging system

- **🔒 Security Enhancements**
  - Rate limiting and DDoS protection
  - Data encryption at rest and in transit
  - Regular security audits

## 📝 API Documentation

### Endpoints

#### GET /api/incidents
Fetch incidents with optional filtering.

**Query Parameters:**
- `resolved` (boolean): Filter by resolution status

**Response:**
```json
[
  {
    "id": "string",
    "cameraId": "string",
    "type": "string",
    "tsStart": "2025-01-15T10:30:00Z",
    "tsEnd": "2025-01-15T10:32:00Z",
    "thumbnailUrl": "string",
    "resolved": false,
    "camera": {
      "id": "string",
      "name": "string",
      "location": "string"
    }
  }
]
```

#### PATCH /api/incidents/:id/resolve
Toggle incident resolution status.

**Response:**
```json
{
  "id": "string",
  "resolved": true,
  "camera": {
    "id": "string",
    "name": "string",
    "location": "string"
  }
}
```

#### GET /api/cameras
Fetch all cameras with their latest incidents.

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "location": "string",
    "incidents": [
      {
        "id": "string",
        "type": "string",
        "tsStart": "2025-01-15T10:30:00Z",
        "tsEnd": "2025-01-15T10:32:00Z",
        "resolved": false
      }
    ]
  }
]
```
