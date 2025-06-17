import { motion } from "framer-motion";
import { 
  Star, 
  Copy, 
  Search, 
  Pencil, 
  Timer, 
  Tag,
  Zap,
  Shield,
  Palette,
  History,
  BookOpen,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Features = () => {
  const features = [
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">Available</Badge>;
      case "coming-soon":
        return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Coming Soon</Badge>;
      case "planned":
        return <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">Planned</Badge>;
      case "future":
        return <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/30">Future Vision</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 gradient-text">
              Powerful Features
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover the comprehensive suite of tools designed to enhance your content creation workflow with AI-powered intelligence.
            </p>
            
            {/* Validation Notice */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary mb-12"
            >
              <AlertCircle className="h-4 w-4" />
              Live MVP Version - Features are actively being developed
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass hover:glass-strong transition-all duration-300 border-border/40 h-full">
                  {/* Feature Image */}
                  <div className="relative h-32 overflow-hidden rounded-t-lg">
                    <img
                      src={`https://images.unsplash.com/${feature.image}?w=400&h=200&fit=crop`}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute top-2 right-2">
                      {getStatusBadge(feature.status)}
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-xs text-foreground">Key Features:</h4>
                      <ul className="space-y-1">
                        {feature.points.slice(0, 3).map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <div className="h-1 w-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl border-border/40"
          >
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              Ready to Experience These Features?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Start using PDFox today and discover how AI-powered content formatting can transform your workflow.
            </p>
            <motion.a
              href="/editor"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="h-5 w-5" />
              Try PDFox Now
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features;