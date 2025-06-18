import { motion } from 'framer-motion';
import { ContactSection } from '@/components/ContactSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Github, X } from 'lucide-react';

const Contact = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/suvendu-kumar-patra-723850230',
      icon: Linkedin,
      color: 'hover:text-blue-600'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/suvepatra004',
      icon: Github,
      color: 'hover:text-gray-800 dark:hover:text-gray-200'
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/DevRative',
      icon: X,
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 gradient-text">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Get in touch with us for any questions, feedback, or support. We're here to help you succeed.
            </p>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <Card className="glass hover:glass-strong transition-all duration-300 border-border/40 max-w-md mx-auto">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Connect With Us</h3>
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full glass-strong transition-all duration-300 ${social.color}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="h-6 w-6" />
                      <span className="sr-only">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Follow us for updates and connect with our community
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactSection />
    </div>
  );
};

export default Contact;