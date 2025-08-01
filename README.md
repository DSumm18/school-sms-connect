# Schoolgle SMS - Comprehensive Project Documentation

## 🎯 Project Overview

**Schoolgle SMS** is a comprehensive school communication platform designed to send SMS messages to parents and guardians at just 1p per message. The application provides schools with an affordable alternative to traditional school communication systems, ensuring critical messages reach parents' mobile phones reliably.

### Key Value Proposition
- **Ultra-low cost**: 1p per SMS message
- **High deliverability**: Direct to mobile phones vs email systems
- **School-focused**: Purpose-built for educational institutions
- **Simple pricing**: No hidden fees or complex pricing tiers

## 🏗️ Architecture & Technology Stack

### Frontend Technologies
- **React 18.3.1** - Modern functional components with hooks
- **TypeScript** - Type-safe development environment
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **shadcn/ui** - Modern, accessible UI component library
- **React Router DOM** - Client-side routing
- **React Query (TanStack Query)** - Server state management and caching
- **Lucide React** - Modern icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service providing:
  - PostgreSQL database with Row Level Security (RLS)
  - Authentication & user management
  - Real-time subscriptions
  - Edge Functions for serverless backend logic
  - File storage capabilities

### Payment Processing
- **Stripe** - Payment processing for credit purchases
- **Stripe Webhooks** - Automated payment confirmation and credit allocation

### Design System
- **Custom CSS variables** in HSL format for theming
- **Semantic color tokens** for consistent branding
- **Responsive design** with mobile-first approach
- **Orange primary brand** (#f97316 variants) with professional UI

## 📊 Database Schema & Data Architecture

### Core Tables Overview

#### User Management
```sql
-- profiles: Extended user information beyond Supabase auth
profiles {
  id: uuid (references auth.users)
  full_name: text
  -- RLS: Users can manage their own profiles
}

-- user_school_history: School assignment tracking
user_school_history {
  id: uuid
  user_id: uuid
  school_id: uuid
  start_date: date
  end_date: date (nullable)
  is_current: boolean
  role: text (nullable)
  -- RLS: Users can view their own history
}

-- user_emails: Multiple email addresses per user
user_emails {
  id: uuid
  user_id: uuid
  email: text
  is_primary: boolean
  is_verified: boolean
  -- RLS: Users manage their own emails
}
```

#### School & Organization Structure
```sql
-- schools: Educational institutions
schools {
  id: uuid
  name: text
  urn: integer (unique school identifier)
  trust_id: uuid (nullable)
  -- Address, contact, and administrative fields
  -- Comprehensive school data imported from DfE
  -- RLS: Public read, authenticated write with role checks
}

-- trusts: Multi-academy trusts and school groups
trusts {
  id: uuid
  name: text
  dfe_group_id: text
  -- Trust-level information and grouping
  -- RLS: Public read for stats, admin access for management
}
```

#### Credit & Billing System
```sql
-- apps: Available services (SMS, etc.)
apps {
  id: uuid
  name: text
  description: text
  icon_name: text
  is_free: boolean
  status: text
  -- RLS: Public read for active apps
}

-- credit_balances: SMS credit tracking per school/app
credit_balances {
  id: uuid
  school_id: uuid
  app_id: uuid
  credits_available: integer
  credits_used: integer
  last_updated: timestamp
  -- RLS: School members can view their balances
}

-- credit_purchases: Purchase history and Stripe integration
credit_purchases {
  id: uuid
  user_id: uuid
  school_id: uuid
  app_id: uuid
  amount: numeric
  credits_purchased: integer
  status: text ('pending', 'paid', 'failed')
  stripe_payment_intent_id: text
  -- RLS: School members can view their purchases
}

-- usage_logs: SMS sending tracking
usage_logs {
  id: uuid
  school_id: uuid
  app_id: uuid
  user_id: uuid
  credits_used: integer
  action_type: text
  action_details: jsonb
  -- RLS: School members can view their usage
}
```

#### Messaging & Communication (Planned/Developing)
```sql
-- Various messaging-related tables for templates, contacts, scheduling
-- These support the core SMS functionality
```

### Row Level Security (RLS) Strategy

The application implements comprehensive RLS policies:

1. **User Data Isolation**: Users can only access their own profiles, emails, and school history
2. **School-based Access**: Data is scoped to user's current school assignment
3. **Role-based Permissions**: Admin users have elevated access where appropriate
4. **Public Information**: School directory information is publicly readable
5. **Audit Trails**: All significant actions are logged with proper access controls

## 🔐 Authentication System

### Authentication Flow
1. **Email/Password Registration**: Users sign up with school email addresses
2. **Automatic School Assignment**: Email domain determines school association
3. **Profile Creation**: Automatic profile creation via database triggers
4. **Session Management**: Persistent sessions with auto-refresh tokens
5. **Protected Routes**: All main functionality requires authentication

### Implementation Details
```typescript
// useAuth Hook Pattern
const AuthContext = createContext<AuthContextType>()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Auth state listener setup
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Auth methods: signIn, signUp, signOut
}
```

### School Assignment Logic
- Users are automatically assigned to schools based on email domain
- One user can belong to one school at a time (enforced by `is_current` flag)
- School assignment is tracked in `user_school_history` for audit purposes
- Email domain parsing extracts school identifier for assignment

## 💳 Payment & Credit System

### Credit Purchase Flow
1. **Package Selection**: User chooses SMS credit package (1,000 to 25,000 credits)
2. **Payment Method**: Card payment via Stripe or invoice generation
3. **Stripe Integration**: Secure payment processing with webhooks
4. **Credit Allocation**: Automatic credit addition via database functions
5. **Usage Tracking**: Real-time credit deduction and usage logging

### Stripe Integration Architecture
```typescript
// Edge Function: stripe-purchase
export const stripe_purchase = async (req) => {
  // Create payment intent or invoice based on request
  // Integration with Stripe API
  // Database record creation for tracking
}

// Webhook Handler: stripe-webhook
export const stripe_webhook = async (req) => {
  // Verify webhook signature
  // Process payment success/failure
  // Update credit balances via database functions
}
```

### Pricing Structure
- **Fixed Rate**: 1p per SMS (£0.01)
- **Bulk Packages**: 1,000 to 25,000 credits
- **No Expiry**: Credits don't expire
- **School-wide**: Credits shared across school users

## 🎨 Design System & UI Architecture

### Color System (HSL-based)
```css
:root {
  --primary: 24 85% 53%;        /* Orange brand color */
  --primary-foreground: 0 0% 100%;
  --secondary: 210 40% 98%;
  --accent: 210 40% 96%;
  /* Full semantic token system for theming */
}
```

### Component Architecture
- **shadcn/ui base**: Accessible, customizable components
- **Custom variants**: Extended button, card, and form variants
- **Responsive design**: Mobile-first with breakpoint considerations
- **Consistent spacing**: Tailwind utility classes with semantic tokens

### Page Structure
```
Index (Dashboard)
├── Hero Section (Brand messaging)
├── Navigation Tabs
│   ├── Attendance Dashboard
│   ├── Messages
│   ├── Templates  
│   ├── Scheduled Messages
│   └── Credits (Payment system)
└── Emergency Broadcast System
```

## 🚀 Feature Breakdown & Use Cases

### 1. User Authentication & Onboarding
**Use Case**: New school administrator signs up
```
1. User visits /auth page
2. Enters school email (e.g., admin@oakwoodschool.co.uk)
3. System extracts "oakwoodschool" domain
4. Creates user account and assigns to Oakwood School
5. Redirects to dashboard with school-specific data
```

### 2. Credit Management
**Use Case**: School needs to purchase SMS credits
```
1. Navigate to Credits tab
2. View current balance and monthly usage
3. Select credit package (e.g., 5,000 credits for £50)
4. Choose payment method (card or invoice)
5. Complete Stripe payment or generate invoice
6. Credits automatically added to school balance
```

### 3. SMS Messaging (Core Feature - In Development)
**Use Case**: Send attendance reminder to parents
```
1. Navigate to Messages tab
2. Select message template or create custom message
3. Choose recipient groups (year groups, classes, individuals)
4. Preview message and credit cost
5. Send immediately or schedule for later
6. Track delivery status and responses
```

### 4. Emergency Broadcasting
**Use Case**: School closure due to emergency
```
1. Click Emergency Broadcast button (red warning UI)
2. Confirm emergency sending dialog
3. System sends to all active parent contacts
4. Immediate delivery with high priority routing
5. Delivery confirmation and failure reporting
```

### 5. Template Management
**Use Case**: Create reusable message templates
```
1. Navigate to Templates tab
2. Create new template with placeholders
3. Set categories (attendance, events, reminders)
4. Save for team use across school
5. Version control and approval workflows
```

## 🔧 Development Setup & Configuration

### Prerequisites
```bash
# Required software
Node.js >= 18.0.0
npm >= 8.0.0
Git
```

### Environment Setup
```bash
# Clone repository
git clone <YOUR_GIT_URL>
cd schoolgle-sms

# Install dependencies
npm install

# Start development server
npm run dev
```

### Supabase Configuration
```bash
# Supabase project details
Project ID: eoddcijijjrmksnwsodq
URL: https://eoddcijijjrmksnwsodq.supabase.co
Anon Key: [provided in client configuration]
```

### Required Environment Variables
```env
# Stripe (for payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Supabase (configured automatically)
SUPABASE_URL=https://eoddcijijjrmksnwsodq.supabase.co
SUPABASE_SERVICE_ROLE_KEY=[for edge functions]
```

## 📱 API & Edge Functions

### Stripe Purchase Function
```typescript
// supabase/functions/stripe-purchase/index.ts
serve(async (req) => {
  const { action, packageId, schoolId, appId } = await req.json()
  
  if (action === 'create_payment_intent') {
    // Create Stripe payment intent
    // Return client_secret for frontend
  }
  
  if (action === 'create_invoice') {
    // Generate invoice record
    // Return invoice details
  }
})
```

### Webhook Processing
```typescript
// supabase/functions/stripe-webhook/index.ts
serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const event = stripe.webhooks.constructEvent(body, signature, secret)
  
  switch (event.type) {
    case 'payment_intent.succeeded':
      // Update purchase status
      // Add credits to balance
      break
    case 'payment_intent.payment_failed':
      // Mark purchase as failed
      break
  }
})
```

## 🧪 Testing Strategy

### Component Testing
- **React Testing Library**: Component behavior testing
- **Jest**: Unit test framework
- **TypeScript**: Compile-time error catching

### Integration Testing
- **Supabase Test Environment**: Database operation testing
- **Stripe Test Mode**: Payment flow testing
- **Authentication Flows**: User journey testing

### Manual Testing Checklist
```
□ User registration with various email domains
□ School assignment and verification
□ Credit purchase flows (card & invoice)
□ Message sending and delivery tracking
□ Emergency broadcast functionality
□ Mobile responsiveness across devices
```

## 🚀 Deployment & Production

### Lovable Deployment
```bash
# Automatic deployment via Lovable platform
1. Push changes to connected repository
2. Lovable builds and deploys automatically
3. Access via https://yourproject.lovable.app
```

### Custom Domain Setup
```bash
# In Lovable project settings
1. Navigate to Project > Settings > Domains
2. Add custom domain (e.g., sms.schoolgle.co.uk)
3. Configure DNS records as instructed
4. SSL certificates handled automatically
```

### Environment-Specific Configuration
```typescript
// Production considerations
- Stripe live keys vs test keys
- Supabase RLS policy validation
- SMS provider integration (when implemented)
- Rate limiting and abuse prevention
```

## 📈 Monitoring & Analytics

### Application Monitoring
- **Supabase Analytics**: Database performance and usage
- **Stripe Dashboard**: Payment success rates and failures
- **Custom Logging**: User actions and system events

### Key Metrics to Track
```
- User registration and retention rates
- Credit purchase conversion rates
- SMS delivery success rates
- System uptime and performance
- Revenue per school metrics
```

## 🔒 Security Considerations

### Data Protection
- **RLS Policies**: Database-level access control
- **Authentication**: Secure session management
- **Payment Security**: PCI-compliant via Stripe
- **GDPR Compliance**: User data rights and privacy

### Security Measures
```typescript
// Row Level Security examples
CREATE POLICY "Users can view their school's credit balances"
ON credit_balances FOR SELECT
USING (school_id IN (
  SELECT school_id FROM user_school_history 
  WHERE user_id = auth.uid() AND is_current = true
));
```

## 🛠️ Maintenance & Support

### Regular Maintenance Tasks
- **Database Performance**: Index optimization and query analysis
- **Security Updates**: Dependency updates and vulnerability patches
- **Backup Verification**: Data backup and recovery testing
- **Cost Monitoring**: Supabase and Stripe usage tracking

### Support Procedures
```
1. User Issue Reporting
   - In-app feedback system
   - Email support integration
   - Issue tracking and resolution

2. System Monitoring
   - Automated health checks
   - Error logging and alerting
   - Performance threshold monitoring
```

## 📋 Future Roadmap & Planned Features

### Phase 1 (Current)
- ✅ User authentication and school assignment
- ✅ Credit purchase and management system
- ✅ Basic UI and navigation structure

### Phase 2 (In Development)
- 🔄 SMS sending functionality
- 🔄 Contact management system
- 🔄 Message templates and scheduling
- 🔄 Delivery tracking and reporting

### Phase 3 (Planned)
- 📋 Advanced reporting and analytics
- 📋 Integration with school management systems
- 📋 Mobile app development
- 📋 Advanced automation and workflows

## 💡 Technical Decision Rationale

### Why Supabase?
- **Rapid Development**: Built-in auth, database, and real-time features
- **PostgreSQL**: Robust, scalable database with advanced features
- **Edge Functions**: Serverless backend logic without infrastructure management
- **RLS**: Database-level security that scales automatically

### Why Stripe?
- **Developer Experience**: Excellent APIs and documentation
- **Security**: PCI compliance handled automatically
- **Features**: Built-in invoicing, webhooks, and payment methods
- **Reliability**: Industry-standard payment processing

### Why React + TypeScript?
- **Type Safety**: Reduced runtime errors and better developer experience
- **Component Reusability**: Modular, maintainable UI components
- **Ecosystem**: Rich library ecosystem and community support
- **Performance**: Modern React features for optimal user experience

## 🤝 Contributing & Development Guidelines

### Code Style & Standards
```typescript
// Naming conventions
- Components: PascalCase (UserProfile.tsx)
- Files: kebab-case (user-profile.utils.ts)
- Variables: camelCase (currentUser)
- Constants: UPPER_SNAKE_CASE (API_ENDPOINTS)

// Component structure
export const ComponentName = () => {
  // 1. Hooks and state
  // 2. Event handlers
  // 3. Derived values
  // 4. Effects
  // 5. Render return
}
```

### Git Workflow
```bash
# Branch naming
feature/user-authentication
bugfix/credit-balance-display
hotfix/payment-processing

# Commit messages
feat: add user authentication system
fix: resolve credit balance calculation
docs: update API documentation
```

## 📞 Support & Contact Information

### Development Team
- **Project Lead**: Contact via Lovable platform
- **Technical Support**: Available through project issues
- **Documentation**: This README and inline code comments

### External Services
- **Supabase Support**: https://supabase.com/support
- **Stripe Support**: https://support.stripe.com
- **Lovable Platform**: https://docs.lovable.dev

---

## 📄 License & Legal

This project is developed for educational institutions with the goal of improving parent-school communication through affordable, reliable SMS messaging.

**Last Updated**: January 2025
**Version**: 1.0.0
**Documentation Version**: Complete as of current implementation