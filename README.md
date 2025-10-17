# Product Manager - BiTechX Assignment

A modern, responsive product management application built with Next.js 15 and Tailwind CSS. This application allows users to browse, create, edit, view details, and delete products with a polished UI/UX and solid validation.

## 🎨 Design

The application uses a carefully selected color palette for optimal user experience:
- **Dark Navy**: `#0d1821` - Primary text and headers
- **Light Gray**: `#eff1f3` - Background and light elements
- **Forest Green**: `#4e6e5d` - Primary actions and accents
- **Warm Beige**: `#ad8a64` - Secondary actions and highlights
- **Deep Red**: `#a44a3f` - Delete actions and warnings

## ✨ Features

### Core Functionality
- **Product Browsing**: Grid layout with responsive design
- **Product Creation**: Comprehensive form with validation
- **Product Editing**: Full CRUD operations
- **Product Details**: Detailed view with all product information
- **Product Deletion**: Safe deletion with confirmation modal

### User Experience
- **Search & Filter**: Real-time search and category filtering
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Loading States**: Smooth loading indicators and transitions
- **Form Validation**: Client-side validation with error messages
- **Image Preview**: Live preview of product images
- **Accessibility**: Focus management and keyboard navigation

### Technical Features
- **Next.js 15**: Latest App Router architecture
- **Tailwind CSS**: Utility-first styling with custom color palette
- **Client Components**: Interactive UI with React hooks
- **Mock Data**: Realistic product data for demonstration
- **TypeScript Ready**: Structured for easy TypeScript migration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bitechx-assignment-khalek
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
app/
├── components/           # Reusable UI components
│   ├── Header.js        # Navigation header
│   ├── ProductCard.js   # Product grid item
│   ├── ProductForm.js   # Create/Edit form
│   ├── SearchBar.js     # Search functionality
│   └── CategoryFilter.js # Category filtering
├── lib/
│   └── data.js          # Mock data and utilities
├── products/
│   ├── [id]/
│   │   ├── page.js      # Product detail view
│   │   └── edit/
│   │       └── page.js  # Edit product form
│   └── new/
│       └── page.js      # Create product form
├── globals.css          # Global styles and theme
├── layout.js            # Root layout
└── page.js              # Home page with product listing
```

## 🎯 Key Components

### ProductCard
- Displays product information in a card format
- Includes image, name, description, price, and stock status
- Action buttons for view, edit, and delete operations

### ProductForm
- Comprehensive form for creating and editing products
- Real-time validation with error messages
- Image preview functionality
- Responsive design for all screen sizes

### SearchBar
- Real-time search with debouncing
- Searches across name, description, and category
- Loading states and clear functionality

### CategoryFilter
- Filter products by category
- Visual feedback for active filters
- Easy reset functionality

## 🔧 Customization

### Color Palette
The color palette is defined in `app/globals.css` using CSS custom properties:

```css
:root {
  --dark: #0d1821;
  --light: #eff1f3;
  --green: #4e6e5d;
  --beige: #ad8a64;
  --red: #a44a3f;
}
```

### Adding New Categories
Update the `categories` array in `app/lib/data.js`:

```javascript
export const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Accessories",
  "Food & Beverage",
  "Home & Office",
  "Your New Category"
];
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎨 UI/UX Features

- **Smooth Animations**: Hover effects and transitions
- **Loading States**: Spinners and skeleton screens
- **Error Handling**: User-friendly error messages
- **Accessibility**: Keyboard navigation and focus management
- **Visual Feedback**: Clear success and error states

## 🔮 Future Enhancements

- Database integration (Prisma + PostgreSQL)
- User authentication and authorization
- Image upload functionality
- Advanced filtering and sorting
- Bulk operations
- Export functionality
- Analytics dashboard

## 📄 License

This project is created as part of the BiTechX assignment and is for demonstration purposes.

---

Built with ❤️ using Next.js and Tailwind CSS