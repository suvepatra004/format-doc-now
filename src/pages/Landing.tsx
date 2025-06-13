import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  FileText,
  Download,
  Edit,
  Zap,
  Shield,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/editor');
    } else {
      navigate('/signup');
    }
  };

  const features = [
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

  const steps = [
    {
      step: '01',
      title: 'Paste Your Content',
      description: 'Simply paste your unformatted text into our editor.',
    },
    {
      step: '02',
      title: 'Auto-Format Magic',
      description: 'Our AI automatically cleans and structures your content.',
    },
    {
      step: '03',
      title: 'Customize & Download',
      description: 'Fine-tune the formatting and download in your preferred format.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Graduate Student',
      content: 'PDFox saved me hours of formatting work on my research papers. The automatic structuring is incredible!',
      rating: 5,
    },
    {
      name: 'Mike Rodriguez',
      role: 'Content Writer',
      content: 'As someone who handles multiple documents daily, this tool is a game-changer. Clean, fast, and reliable.',
      rating: 5,
    },
    {
      name: 'Dr. Emily Johnson',
      role: 'University Professor',
      content: 'I recommend PDFox to all my students. It helps them focus on content rather than formatting.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Transform{' '}
              <span className="gradient-text">Messy Text</span>
              <br />
              Into Perfect Documents
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              PDFox automatically cleans, formats, and structures your content. 
              Paste unformatted text and get professional documents in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-xl"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/demo')}
                className="btn-glass text-lg px-8 py-6 rounded-xl"
              >
                Try Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 gradient-text">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create professional documents effortlessly
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass hover:glass-strong transition-all duration-300 border-border/40">
                  <CardContent className="p-6">
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 gradient-text">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to transform your content
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="glass-strong rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 gradient-text">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users who save time every day
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass hover:glass-strong transition-all duration-300 border-border/40">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-strong p-12 rounded-2xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">
              Ready to Transform Your Documents?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who save hours every week with PDFox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-xl"
              >
                Start Free Today
                <CheckCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}