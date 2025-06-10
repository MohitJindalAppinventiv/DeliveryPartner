import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-lg font-medium text-foreground"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}

export default LoadingScreen;