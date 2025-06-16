# 🦊 PDFox – Advanced Content Formatting Tool

**PDFox** is a powerful, AI-enhanced content formatting tool that transforms messy, unstructured text into clean, professional documents. Built with modern web technologies, PDFox offers intelligent formatting, user authentication, and multiple export options.

> 🌐 **Live App**: [http://pdfox-generator.lovable.app](http://pdfox-generator.lovable.app)

## ✨ Key Features

### 🧠 Smart Content Formatting
- **Advanced Text Processing**: Automatically fixes casing, punctuation, spacing, and paragraph structure
- **Intelligent Parsing**: Detects headings, lists, code snippets, and improper line breaks
- **Content Preservation**: Maintains original tone and intent while improving readability
- **Real-time Preview**: See formatted content before downloading

### 📄 Multiple Export Formats
- **PDF Export**: Professional PDF documents with custom styling
- **TXT Export**: Clean plain text files
- **Custom Filenames**: User-defined file naming with fallback to document title

### 🔐 User Authentication
- **Secure Registration**: Email verification with seamless login flow
- **Supabase Integration**: Robust backend authentication system
- **Protected Routes**: Access control for premium features

### 💎 Pricing Tiers
- **Free Plan**: Basic formatting and export (₹0)
- **Standard Plan**: Enhanced features and priority support
- **Premium Plan**: Advanced formatting algorithms and unlimited exports

### 🎨 Modern UI/UX
- **Glass Morphism Design**: Elegant transparent navigation and components
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Grid-based Features**: 3x3 feature showcase layout
- **Smooth Animations**: Framer Motion powered transitions


## 🚀 Tech Stack

### Frontend
- ⚛️ **React 18** – Declarative UI framework with hooks
- 💡 **TypeScript** – Strongly-typed JavaScript for better development
- ⚡ **Vite** – Lightning-fast bundler and dev server
- 💨 **Tailwind CSS** – Utility-first CSS framework with custom design system
- 🎨 **shadcn/ui** – Reusable and accessible UI components
- 🎭 **Framer Motion** – Smooth animations and transitions
- 🔀 **React Router** – Client-side routing

### Backend & Services
- 🗄️ **Supabase** – Backend-as-a-Service with PostgreSQL
- 🔐 **Supabase Auth** – User authentication and authorization
- 📊 **Supabase Database** – PostgreSQL with Row Level Security

### Content Processing
- 📝 **Advanced Regex** – Pattern matching for content analysis
- 🧠 **Custom Formatting Engine** – Multi-layered text processing
- 📄 **html2pdf.js** – Client-side PDF generation
- 💾 **FileSaver.js** – File download functionality

### Design System
- 🎨 **Custom CSS Variables** – Consistent theming
- 🌙 **Dark/Light Mode Support** – Theme switching capability
- 📱 **Responsive Design** – Mobile-first approach
- ✨ **Glass Morphism** – Modern UI effects

## 🧠 How the Formatting Engine Works

PDFox uses a sophisticated multi-layered approach to transform messy content:

### Layer 1: Content Understanding & Parsing
- **Smart Casing**: Automatically capitalizes sentences and fixes "i" to "I"
- **Punctuation Cleanup**: Removes repeated punctuation marks (!!!, ???, ...)
- **Spacing Normalization**: Eliminates extra whitespace and fixes spacing around punctuation
- **Code Detection**: Identifies and preserves code snippets with backticks

### Layer 2: Structural Analysis
- **Heading Detection**: Recognizes ALL CAPS text, short lines, and chapter/section patterns
- **List Recognition**: Identifies bullet points, numbered lists, and converts them to proper HTML
- **Paragraph Reconstruction**: Merges broken lines and creates proper paragraph breaks
- **Sentence Completion**: Adds missing periods and proper sentence endings

### Layer 3: Output Generation
- **HTML Formatting**: Generates clean HTML with proper styling
- **PDF Rendering**: Creates professional documents with Quicksand font
- **Text Export**: Provides clean plain text versions

### Example Transformations

**Input (Messy):**
```
this is a heading
- point one
- point two
this is a paragraph that continues on next line
but should be joined together
```

**Output (Formatted):**
```html
<h2>This Is A Heading</h2>
<ul>
  <li>Point one.</li>
  <li>Point two.</li>
</ul>
<p>This is a paragraph that continues on next line but should be joined together.</p>
```

## 🛠 Local Development Setup

To run PDFox locally on your machine, follow the steps below.

### ✅ Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or later)  
- **npm** (v9 or later) or **yarn**

> We recommend installing Node via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)


### ⚙️ Setup Instructions

```bash
# 1. Clone the repository
git clone gh repo clone suvepatra004/format-doc-now

# 2. Navigate into the project folder
cd pdfox

# 3. Install all dependencies
npm install
# or
yarn install

# 4. Start the development server
npm run dev
# or
yarn dev
```

## 📦 Build for Production
To generate a production-ready build:

```bash
npm run build
# or
yarn build
```
The output will be located in the dist/ folder.

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## 👤 Author

Developed by Suvendu
>For collaboration or freelance inquiries:
>📧 Email: your-rative.project.suve@gmail.com
