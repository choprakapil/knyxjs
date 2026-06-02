# Admin Panel Quick Start Guide

## First Time Setup

### 1. Database Initialization
```bash
# Run Prisma migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# (Optional) Seed database with sample data
npx prisma db seed
```

### 2. Create Admin User
```bash
# Use the seed script or create manually
# Navigate to your database and add a user:
# INSERT INTO users (email, password, role) VALUES (
#   'admin@example.com',
#   '$2a$10/hashed_password_here',
#   'admin'
# );

# To generate hashed password:
# Use bcryptjs to hash: bcrypt.hashSync('password', 10)
```

### 3. Set Environment Variables
Create `.env.local`:
```
DATABASE_URL=mysql://user:password@localhost:3306/knyxdb
JWT_SECRET=your-secure-secret-key-min-32-chars
NODE_ENV=development
```

### 4. Start Development Server
```bash
npm run dev
# Admin panel available at http://localhost:3000/admin
```

## Admin User Creation Script

Create a file `scripts/create-admin.js`:

```javascript
import prisma from "@/lib/prisma.js";
import bcrypt from "bcryptjs";

async function createAdmin() {
  const email = process.argv[2] || "admin@example.com";
  const password = process.argv[3] || "admin123456";

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "admin"
      }
    });

    console.log(`✅ Admin user created successfully`);
    console.log(`Email: ${user.email}`);
    console.log(`ID: ${user.id}`);
  } catch (error) {
    if (error.code === "P2002") {
      console.log(`❌ User with email ${email} already exists`);
    } else {
      console.error("Error creating admin user:", error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
```

Run with:
```bash
node scripts/create-admin.js admin@knyxsports.com securepassword123
```

## Accessing Admin Panel

1. Go to `http://localhost:3000/admin/login`
2. Login with admin credentials
3. You'll be redirected to the dashboard

## Quick Actions

### View Dashboard Stats
- Dashboard automatically shows:
  - Total products count
  - Total categories
  - Admin user count
  - Recent product additions

### Add Your First Product
1. Go to **Products** → Click "Add Product"
2. Enter details:
   - Name: "Helmet Pro"
   - Category: (Create one first if needed)
   - Description: "Professional cricket helmet"
   - Image: Paste a public image URL
3. Click "Create Product"

### Create Product Category
1. Go to **Categories** → Click "New Category"
2. Enter category name: "Helmets"
3. Click "Create Category"

### Add a Stockist
1. Go to **Stockists** → Click "Add Stockist"
2. Fill in details:
   - Store Name: "ABC Sports"
   - Country: "India"
   - Address, Phone, Email, Website (optional)
3. Click "Add Stockist"

### Update Site Settings
1. Go to **Settings**
2. Choose tab (General, Contact, Social Media)
3. Update fields
4. Click "Save Settings"

## Verification Checklist

✅ **Database Connected**
- Products table has entries
- Categories exist
- Users table has admin account

✅ **API Routes Working**
- Test `/api/admin/stats` in browser
- Test `/api/admin/products` in browser
- Check API responses in Network tab

✅ **Authentication Working**
- Can login with admin credentials
- Token cookie created
- Can access protected routes
- Logout clears cookie

✅ **Admin Pages Functional**
- All pages load without errors
- Forms can be submitted
- CRUD operations work
- Search/filter features work

## Common Login Issues & Solutions

**"Invalid credentials"**
- Double-check email and password
- Ensure admin user exists in database
- Check if password was properly hashed

**"Cannot access admin page"**
- Clear browser cookies
- Check if token is valid (7-day expiration)
- Try logging in again

**"Database connection error"**
- Verify DATABASE_URL is correct
- Check MySQL server is running
- Ensure database exists

**"API returns 401 Unauthorized"**
- Token might be expired
- Clear cookies and login again
- Check JWT_SECRET matches production

## Database Backup

```bash
# Export database
mysqldump -u user -p database_name > backup.sql

# Restore database
mysql -u user -p database_name < backup.sql
```

## Performance Optimization

### Enable Query Logging (Development Only)
Add to `lib/prisma.js`:
```javascript
const prisma = new PrismaClient({
  log: ["query", "error", "warn"],
});
```

### Optimize Images
- Use compressed images
- Keep image URLs accessible
- Use CDN for better performance

## Deployment Considerations

1. **Environment Variables**
   - Use secure .env.local
   - Never commit secrets
   - Use production database

2. **JWT Secret**
   - Generate strong secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Update JWT_SECRET in production

3. **HTTPS Required**
   - Always use HTTPS in production
   - Secure cookies require HTTPS

4. **Database Backups**
   - Schedule regular backups
   - Test restore procedures
   - Monitor database size

## Support & Troubleshooting

For issues:
1. Check admin-panel.md for detailed documentation
2. Review API response errors
3. Check browser console for JavaScript errors
4. Review server logs for API errors

## Next Steps

1. ✅ Setup admin user
2. ✅ Create product categories
3. ✅ Add products
4. ✅ Configure stockists
5. ✅ Update site settings
6. 🚀 Deploy to production
