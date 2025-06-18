import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, FileQuestion } from "lucide-react";
import { SEO } from '@/components/SEO';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const notFoundStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Not Found - PDFox",
    "description": "The page you're looking for doesn't exist. Return to PDFox homepage to continue using our AI-powered document formatter.",
    "url": `https://pdfox-generator.lovable.app${location.pathname}`
  };

  const suggestedPages = [
    { name: "Home", path: "/", icon: Home, description: "Return to the main page" },
    { name: "Editor", path: "/editor", icon: FileQuestion, description: "Start formatting documents" },
    { name: "Features", path: "/features", icon: Search, description: "Explore our features" }
  ];

  return (
    <>
      <SEO
        title="Page Not Found (404) | PDFox"
        description="The page you're looking for doesn't exist. Return to PDFox homepage to continue using our AI-powered document formatter."
        canonicalUrl={`https://pdfox-generator.lovable.app${location.pathname}`}
        structuredData={notFoundStructuredData}
      />
      <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Error Code */}
            <div className="mb-8">
              <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
              <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                The page you're looking for doesn't exist or may have been moved.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                size="lg"
                className="glass"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
              <Button
                onClick={() => navigate("/")}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Home className="mr-2 h-5 w-5" />
                Return Home
              </Button>
            </div>

            {/* Suggested Pages */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-6">Or try these pages:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {suggestedPages.map((page) => (
                  <motion.div
                    key={page.path}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card 
                      className="glass hover:glass-strong cursor-pointer transition-all duration-300"
                      onClick={() => navigate(page.path)}
                    >
                      <CardContent className="p-6 text-center">
                        <page.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                        <h4 className="font-semibold mb-1">{page.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {page.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Help Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 text-sm text-muted-foreground"
            >
              Lost? <a href="/contact" className="text-primary hover:underline">Contact us</a> for help
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
