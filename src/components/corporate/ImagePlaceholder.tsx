import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImagePlaceholderProps {
  className?: string;
  aspectRatio?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ImagePlaceholder({ 
  className, 
  aspectRatio = 'aspect-video',
  alt = 'Image placeholder',
  size = 'md'
}: ImagePlaceholderProps) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div 
      className={cn(
        'bg-muted/50 border border-border/50 rounded-lg flex items-center justify-center',
        aspectRatio,
        className
      )}
      role="img"
      aria-label={alt}
    >
      <ImageIcon className={cn('text-muted-foreground/40', iconSizes[size])} />
    </div>
  );
}

interface IconPlaceholderProps {
  className?: string;
  size?: number;
}

export function IconPlaceholder({ className, size = 80 }: IconPlaceholderProps) {
  return (
    <div 
      className={cn(
        'bg-muted/50 border border-border/50 rounded-xl flex items-center justify-center',
        className
      )}
      style={{ width: size, height: size }}
    >
      <ImageIcon className="w-6 h-6 text-muted-foreground/40" />
    </div>
  );
}
