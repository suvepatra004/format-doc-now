import { 
  Edit, 
  Download, 
  Zap, 
  Shield, 
  Clock, 
  FileText,
  Star, 
  Copy, 
  Palette,
  History,
  BookOpen
} from "lucide-react";

export const landingFeatures = [
  {
    icon: Edit,
    title: 'Smart Formatting',
    description: 'Automatically clean and format your text with proper headings, spacing, and structure.',
  },
  {
    icon: Download,
    title: 'Multiple Formats',
    description: 'Download your documents as PDF, TXT, or other popular formats instantly.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process and format your documents in seconds, not minutes.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your documents are processed securely and never stored without permission.',
  },
  {
    icon: Clock,
    title: 'Time Saving',
    description: 'Save hours of manual formatting work with our intelligent automation.',
  },
  {
    icon: FileText,
    title: 'Rich Text Editor',
    description: 'Advanced editing capabilities with drag-and-drop, tables, and more.',
  },
];

export const detailedFeatures = [
  {
    id: 1,
    icon: Star,
    title: "Smart Prompt Generation",
    description: "Automatically generates high-quality prompts tailored to user intent using AI. Save time and boost productivity with context-aware suggestions.",
    points: [
      "GPT-based prompt refinement",
      "Use-case driven categories (e.g., SEO, storytelling, developer help)",
      "Rephrasing / Expanding / Translating support"
    ],
    status: "available",
    image: "photo-1488590528505-98d2b5aba04b"
  },
  {
    id: 2,
    icon: Copy,
    title: "Live Preview + Copy-to-Clipboard",
    description: "Instantly view and copy generated content with a single click.",
    points: [
      "Real-time rendering of prompts",
      "One-click copy functionality",
      "Tooltip confirmation for actions"
    ],
    status: "available",
    image: "photo-1461749280684-dccba630e2f6"
  },
  {
    id: 3,
    icon: Shield,
    title: "Custom API Integration",
    description: "Connect your own API key (e.g., OpenAI) for personalized and secure generation.",
    points: [
      "API key storage in local/session storage",
      "Google AI Studio support (mentioning how to get a free key)",
      "Toggle to switch between test and production environments"
    ],
    status: "coming-soon",
    image: "photo-1487058792275-0ad4aaf24ca7"
  },
  {
    id: 4,
    icon: Palette,
    title: "Simple & Clean UX",
    description: "No clutter, no login wall. Straight to the tool.",
    points: [
      "Minimalist UI built for focus",
      "Mobile-responsive design",
      "Light/dark mode support"
    ],
    status: "available",
    image: "photo-1581091226825-a6a2a5aee158"
  },
  {
    id: 5,
    icon: History,
    title: "Prompt Editing and History",
    description: "Stay productive with editable prompt history and export options.",
    points: [
      "View previously generated prompts",
      "Edit and regenerate prompts",
      "Save/export to markdown or PDF"
    ],
    status: "planned",
    image: "photo-1488590528505-98d2b5aba04b"
  },
  {
    id: 6,
    icon: BookOpen,
    title: "Prompt Templates Library",
    description: "Explore pre-made prompt templates by category.",
    points: [
      "Copy-ready prompt snippets",
      "Filter by niche (Marketing, Code, Design, etc.)",
      "Community-submitted prompts"
    ],
    status: "future",
    image: "photo-1461749280684-dccba630e2f6"
  }
];