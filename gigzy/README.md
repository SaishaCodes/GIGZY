# Gigzy - Hyperlocal Micro-Task Ecosystem

A comprehensive, student-powered micro-task marketplace built with Next.js 14, TypeScript, Tailwind CSS, and PostgreSQL. Gigzy enables students to seamlessly switch between Seeker Mode (posting tasks) and Provider Mode (accepting tasks) with a beautiful dark turquoise theme.

![Gigzy Logo](https://via.placeholder.com/150)

## 🚀 Features

### Core Functionality
- **Dual-Role System**: Seamless toggle between Seeker and Provider modes
- **Hybrid Account Logic**: Single user entity with both SeekerProfile and ProviderProfile
- **Trust Score Algorithm**: Comprehensive reputation system based on completion rates, ratings, and verification
- **Escrow Payment System**: Secure payment holding and release protocol
- **Real-time Task Tracking**: Vertical timeline UI for task progress

### Seeker Features
- **"Gigzy It" Form**: Multi-step task posting with location, budget, and urgency
- **Urgent Tasks Feed**: Browse nearby urgent tasks instantly
- **Category Browsing**: 12 community categories (Study, Fitness, Creative, etc.)
- **Top Providers**: Discover highly-rated providers nearby
- **Instant Hire**: Skip bidding and hire immediately

### Provider Features
- **Job Feed**: Real-time task filtering by skills and distance
- **Task Tracker**: Vertical timeline from Posted to Completed
- **Bid Management**: Submit and track bids on tasks
- **Earnings Dashboard**: Track total earnings and completed tasks

### Advanced Features
- **Shared Resource Network**: Lend/rent calculators, cameras, lab equipment
- **Gamification System**: XP, levels, achievements, and leaderboards
- **Smart Nudges**: Intelligent recommendations based on user behavior
- **Dispute Portal**: Structured conflict resolution UI

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

### Backend
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Clerk/Auth0 (configurable)
- **API**: RESTful API with Next.js Route Handlers

### Design System
- **Color Scheme**: Dark background (#0a0f14) with Turquoise accents (#00d4a8)
- **Typography**: Inter (UI) + JetBrains Mono (code)
- **Spacing**: 8pt grid system
- **Border Radius**: 14px (cards), 12px (buttons)
- **Shadows**: Soft, medium, large variants with glow effects

## 📁 Project Structure

```
gigzy/
├── app/                      # Next.js App Router pages
│   ├── api/                  # API route handlers
│   ├── dashboard/            # Main dashboard page
│   ├── create/               # Task creation page
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/               # React components
│   ├── dashboard/            # Dashboard components
│   │   ├── SeekerDashboard.tsx
│   │   └── ProviderDashboard.tsx
│   ├── task/                 # Task-related components
│   │   └── GigzyItForm.tsx
│   ├── gamification/         # Gamification components
│   │   └── RewardsHub.tsx
│   ├── resource/             # Resource marketplace
│   │   └── ResourceMarketplace.tsx
│   ├── ui/                   # Reusable UI components
│   │   └── ModeSwitcher.tsx
│   └── layout/               # Layout components
│       └── Navigation.tsx
├── lib/                      # Utility libraries
│   ├── api.ts                # API client
│   ├── prisma.ts             # Prisma client
│   ├── store.ts              # Zustand store
│   └── trust-score.ts        # Trust score algorithm
├── prisma/                   # Prisma schema and migrations
│   └── schema.prisma         # Database schema
├── styles/                   # Global styles
│   └── globals.css           # Tailwind + custom styles
├── types/                    # TypeScript type definitions
│   └── index.ts              # All application types
├── public/                   # Static assets
├── .env.example              # Environment variables template
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🗄️ Database Schema

### Core Models

#### User
- Hybrid account with SeekerProfile and ProviderProfile
- Trust score and level system
- Verification status tracking

#### Task
- Support for 12 categories
- Urgency levels (Normal, Urgent, ASAP)
- Escrow payment tracking
- Instant hire vs bidding options

#### Bid
- Provider bidding system
- Status tracking (Pending, Accepted, Rejected)

#### EscrowAccount
- Secure payment holding
- Platform fee calculation (10-20%)
- Release/refund logic

#### Wallet & Transaction
- Balance management
- Transaction history
- Deposit/withdrawal tracking

#### Review
- Detailed rating system
- Category-specific ratings (communication, professionalism, etc.)

#### Achievement & UserAchievement
- XP and leveling system
- Badge/unlock tracking

#### ResourceListing & ResourceRental
- Item sharing marketplace
- Availability tracking
- Rental period management

## 🎨 Design System

### Color Palette

```css
/* Backgrounds */
--bg-primary: #0a0f14
--bg-secondary: #0f1419
--bg-tertiary: #151c24

/* Primary Accents */
--turquoise: #00d4a8
--seeker-blue: #0066ff
--provider-green: #00ff75

/* Status Colors */
--success: #10b981
--warning: #f59e0b
--error: #ef4444
```

### Typography Scale

```css
/* Headings */
h1: 2rem (32px)
h2: 1.75rem (28px)
h3: 1.5rem (24px)
h4: 1.25rem (20px)

/* Body */
text-lg: 1.125rem (18px)
text-base: 1rem (16px)
text-sm: 0.875rem (14px)
text-xs: 0.75rem (12px)
```

### Spacing System

Based on 8pt grid:
- 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 56px, 64px

### Components

#### Buttons
- Primary: `btn btn-primary`
- Seeker Mode: `btn btn-seeker`
- Provider Mode: `btn btn-provider`
- Outline: `btn btn-outline`

#### Cards
- Basic: `card`
- Interactive: `card-hover`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gigzy.git
cd gigzy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/gigzy"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_key"
CLERK_SECRET_KEY="your_clerk_secret"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 API Endpoints

### Tasks
- `GET /api/tasks` - List tasks with filters
- `GET /api/tasks/:id` - Get task details
- `POST /api/tasks` - Create task
- `PATCH /api/tasks/:id` - Update task
- `POST /api/tasks/:id/accept-bid` - Accept bid
- `POST /api/tasks/:id/start` - Start task
- `POST /api/tasks/:id/complete` - Complete task
- `POST /api/tasks/:id/mark-completed` - Mark as completed (seeker)

### Bids
- `GET /api/tasks/:taskId/bids` - Get task bids
- `POST /api/bids` - Create bid
- `POST /api/bids/:id/withdraw` - Withdraw bid

### Users
- `GET /api/user/me` - Get current user
- `PATCH /api/user/profile` - Update profile
- `POST /api/user/location` - Update location

### Wallet
- `GET /api/wallet` - Get wallet
- `GET /api/wallet/transactions` - Get transactions
- `POST /api/wallet/deposit` - Deposit funds
- `POST /api/wallet/withdraw` - Withdraw funds

### Resources
- `GET /api/resources` - List resources
- `POST /api/resources` - Create listing
- `POST /api/resources/:id/book` - Book resource

### Gamification
- `GET /api/achievements` - Get achievements
- `GET /api/gamification/leaderboard` - Get leaderboard
- `GET /api/gamification/xp` - Get XP stats

## 🔐 Security Features

- **Identity Verification**: ID upload and verification system
- **Escrow Payments**: Secure payment holding and release
- **Trust Score**: Algorithm-based reputation system
- **Dispute Resolution**: Structured conflict handling
- **Rate Limiting**: API endpoint protection

## 🎯 Trust Score Algorithm

The trust score (0-100) is calculated based on:

1. **Completion Rate (30%)**: Ratio of completed tasks
2. **Average Rating (25%)**: Weighted average of all ratings
3. **Response Time (15%)**: How quickly providers respond
4. **Verification Status (15%)**: Whether ID is verified
5. **Account Age (10%)**: How long account has been active
6. **Dispute History (5%)**: Number of disputes vs resolved favorably

## 🏆 Gamification

### XP System
- Complete tasks: +50-200 XP (based on complexity)
- Receive 5-star rating: +50 XP
- Referral bonus: +100 XP
- Daily login streak: +10 XP

### Levels
- Level 1-4: Rookie
- Level 5-9: Pro
- Level 10-14: Expert
- Level 15-19: Master
- Level 20+: Legend

### Achievements
- First Task: +100 XP
- Rising Star: +500 XP (10 tasks with 4.5+ rating)
- Local Legend: +1000 XP (top 3 in area)
- Gigzy Pro: +2000 XP (50 tasks, $500 earned)
- Trusted Provider: +750 XP (98% completion rate)
- Community Helper: +600 XP (help 25 seekers)
- Power Seeker: +400 XP (complete 20 tasks)

## 🌱 Community Categories

1. **Study & Productivity** - Study partners, tutoring, homework help
2. **Errands** - Quick errands, shopping, deliveries
3. **Fitness** - Gym buddies, workout partners
4. **Creative** - Photo shoots, video creation, design
5. **Fun & Social** - Event companions, activity partners
6. **Entrepreneurship** - Pitch feedback, business help
7. **Tech Support** - Computer help, software assistance
8. **Event Assistance** - Event setup, venue help
9. **Delivery** - Package delivery, food delivery
10. **Labor** - Moving, cleaning, physical tasks
11. **Tutoring** - Academic help, subject tutoring
12. **Other** - Custom tasks and requests

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio
```

## 📱 Responsive Design

- **Mobile**: < 768px - Stacked layout, bottom navigation
- **Tablet**: 768px - 1024px - 2-column grid
- **Desktop**: > 1024px - Full layout, 3-column grid

## 🧪 Testing

```bash
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t gigzy .
docker run -p 3000:3000 gigzy
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Product Design**: Full design system and UI/UX
- **Frontend Development**: React/Next.js components
- **Backend Development**: API routes and database schema
- **Security**: Trust algorithm and escrow system

## 📞 Support

For support, email support@gigzy.app or open an issue in the repository.

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- Tailwind CSS for the utility-first CSS framework
- All contributors and early adopters

---

Built with ❤️ by students, for students.