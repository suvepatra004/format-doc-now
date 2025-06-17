import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-6 px-4 sm:px-6 lg:px-8 border-t border-border/40 bg-background/50 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Developed by <span className="font-semibold text-primary">Suvendu</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}