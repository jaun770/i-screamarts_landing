import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

interface AnimatedTitleProps {
  children: string;
  className?: string;
  underline?: boolean;
}

// Section fade-in animation
const sectionVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Stagger children animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Animated section wrapper
export function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: "easeOut",
            delay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated title with underline effect
export function AnimatedTitle({ children, className = '', underline = true }: AnimatedTitleProps) {
  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut"
          }
        }
      }}
      className={`relative inline-block ${className}`}
    >
      {children}
      {underline && (
        <motion.span
          className="absolute -bottom-2 left-0 h-1 bg-accent rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: "40%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
      )}
    </motion.h2>
  );
}

// Animated card with stagger effect
export function AnimatedCard({ children, className = '', index = 0 }: AnimatedSectionProps & { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Export variants for custom use
export { sectionVariants, containerVariants, itemVariants };
