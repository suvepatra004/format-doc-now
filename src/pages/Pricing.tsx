import { motion } from "framer-motion";
import { Check, Zap, Star, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started with basic formatting",
      features: [
        "Basic content formatting",
        "Download as TXT/PDF",
        "Up to 5 documents per day",
        "Standard templates",
        "Community support"
      ],
      cta: "Get Started Free",
      popular: false,
      icon: Zap
    },
    {
      name: "Standard",
      price: "₹299",
      period: "per month",
      description: "Ideal for professionals and small businesses",
      features: [
        "Advanced AI formatting",
        "Custom templates",
        "Unlimited documents",
        "Priority support",
        "Export to multiple formats",
        "Custom filename options",
        "Version history"
      ],
      cta: "Start 7-Day Trial",
      popular: true,
      icon: Star
    },
    {
      name: "Premium",
      price: "₹599",
      period: "per month",
      description: "For teams and enterprises with advanced needs",
      features: [
        "Everything in Standard",
        "Custom API integration",
        "Team collaboration",
        "White-label solution",
        "Advanced analytics",
        "Priority phone support",
        "Custom integrations",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      popular: false,
      icon: Crown
    }
  ];

  const handlePlanSelect = (planName: string) => {
    if (planName === "Free") {
      // Redirect to sign up
      window.location.href = "/signup";
    } else if (planName === "Standard") {
      // Handle standard plan subscription
      console.log("Redirecting to Standard plan checkout...");
    } else {
      // Handle premium plan - contact sales
      console.log("Opening contact sales form...");
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
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Choose the perfect plan for your content formatting needs. Start free and upgrade as you grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`glass hover:glass-strong transition-all duration-300 border-border/40 h-full relative ${
                  plan.popular ? 'border-primary/50 scale-105' : ''
                }`}>
                  <CardHeader className="text-center pb-8">
                    <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <plan.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">/{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-2">
                      {plan.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handlePlanSelect(plan.name)}
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-primary hover:bg-primary/90' 
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 gradient-text">
              Questions? We're here to help
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get in touch with our team for any questions about plans, features, or pricing.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Contact Support
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;