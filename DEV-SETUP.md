# Studio Sammii Development Setup

## Quick Start

You can run both the backend and frontend together using one of these methods:

### Option 1: Using npm scripts (Recommended)
```bash
# Start both servers
npm run dev

# Or for a clean start (kills existing processes first)
npm run clean-start

# Start individually
npm run dev:backend    # Medusa backend on port 9000
npm run dev:frontend   # Next.js frontend on port 8000
```

### Option 2: Using shell script
```bash
# Start both servers
./start-dev.sh
```

## Access Points

- **Backend Admin**: http://localhost:9000/app
- **Frontend Store**: http://localhost:8000
- **Backend API**: http://localhost:9000 (API endpoints)

## Default Credentials

- **Email**: admin@medusa-test.com
- **Password**: supersecret

## Development Notes

- Both servers will automatically restart when you make changes
- The backend uses PostgreSQL database: `medusa-studio-sammii`
- Redis is used for caching (fallback to in-memory if not available)
- Stripe is configured for development (placeholder keys)

## Stopping Servers

- Press `Ctrl+C` to stop both servers
- Or run: `npm run kill-ports` to forcefully kill processes on ports 8000 and 9000

## Configuration

- Backend config: `studio-sammii-v2/medusa-config.ts`
- Backend environment: `studio-sammii-v2/.env`
- Frontend environment: `studio-sammii-v2-storefront/.env.local`

## Troubleshooting

If you encounter port conflicts:
```bash
npm run kill-ports
npm run dev
```

If the backend fails to start, check:
1. PostgreSQL is running
2. Database `medusa-studio-sammii` exists
3. Environment variables are set correctly 