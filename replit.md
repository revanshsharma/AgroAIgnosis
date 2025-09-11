# KrishiMitra - Agricultural AI Assistant

## Overview

This is a mobile-first agricultural AI assistant application designed specifically for Indian farmers. The app provides image-based crop disease detection, soil analysis, and an AI-powered chat interface for farming guidance. Users can upload photos of their crops or soil samples to receive instant AI-powered analysis and recommendations. The application is built with a full-stack architecture using React on the frontend and Express.js on the backend, with OpenAI integration for intelligent analysis.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom agricultural-themed color scheme (greens and earth tones)
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Mobile-First Design**: Bottom navigation pattern optimized for mobile devices

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for image analysis and chat functionality
- **File Handling**: Multer middleware for image upload processing
- **Development**: Hot reload with Vite integration in development mode

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Three main entities - users, analysis results, and chat messages
- **Fallback Storage**: In-memory storage implementation for development/testing
- **Connection**: Neon Database serverless PostgreSQL for cloud deployment

### Authentication and Authorization
- **Current State**: Mock user system for development (user ID: "user-1")
- **Planned**: Session-based authentication using express-session with PostgreSQL store
- **Security**: Prepared for username/password authentication with user regions

### External Service Integrations
- **AI Analysis**: OpenAI GPT-5 for crop disease detection and soil analysis
- **Image Processing**: Base64 encoding for image transmission to OpenAI
- **Voice Features**: Web Speech API for voice-to-text transcription
- **File Uploads**: Support for images up to 10MB via multipart form data

### Key Features
- **Crop Disease Detection**: AI-powered analysis of crop photos with treatment recommendations
- **Soil Analysis**: Evaluation of soil samples with improvement suggestions
- **Agricultural Chat**: Context-aware farming advice and guidance
- **Voice Interaction**: Speech-to-text for hands-free operation
- **Analysis History**: Persistent storage of all analysis results
- **Regional Customization**: Support for region-specific farming practices (default: Maharashtra)

### Development Tooling
- **Build System**: Vite for fast development and optimized production builds
- **Database Migrations**: Drizzle Kit for schema management
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Deployment**: Production build with esbuild for server bundling

## External Dependencies

- **Neon Database**: Serverless PostgreSQL for production data storage
- **OpenAI API**: GPT-5 model for intelligent crop and soil analysis
- **Drizzle ORM**: Type-safe database operations and migrations
- **Shadcn/ui**: Pre-built accessible UI components
- **TanStack Query**: Server state management and caching
- **Multer**: File upload handling for image analysis
- **Web Speech API**: Browser-native speech recognition for voice features