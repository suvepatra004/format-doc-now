import { motion } from 'framer-motion';
import { ContactSection } from '@/components/ContactSection';
import { Button } from '@/components/ui/button';
import { Linkedin, Github, X } from 'lucide-react';
import { SEO } from '@/components/SEO';

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

  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact PDFox - Get in Touch",
    "description": "Contact PDFox for questions, feedback, or support. We're here to help you succeed with professional document formatting.",
    "url": "https://pdfox-generator.lovable.app/contact"
  };

  return (
    <>
      <SEO
        title="Contact Us - Get Support & Feedback | PDFox"
        description="Contact PDFox for questions, feedback, or support. We're here to help you succeed with professional document formatting and AI-powered content tools."
        keywords="contact PDFox, document formatter support, AI formatting help, customer service, feedback"
        canonicalUrl="https://pdfox-generator.lovable.app/contact"
        structuredData={contactStructuredData}
      />
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
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactSection />

      {/* Social Media Links */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Connect With Us</h3>
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
            <p className="text-sm text-muted-foreground mt-4">
              Follow us for updates and connect with our community
            </p>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Contact;