
import { BookOpenText } from "lucide-react";

interface LogoProps {
  withText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ withText = true, size = 'md' }: LogoProps) => {
  const sizeMap = {
    sm: { icon: 18, text: 'text-lg' },
    md: { icon: 24, text: 'text-xl' },
    lg: { icon: 32, text: 'text-2xl' },
  };
  
  return (
    <div className="flex items-center gap-2">
      <BookOpenText 
        size={sizeMap[size].icon} 
        className="text-bondwise-600 dark:text-bondwise-400" 
      />
      {withText && (
        <span className={`font-bold ${sizeMap[size].text} text-bondwise-800 dark:text-bondwise-200`}>
          BondWise
        </span>
      )}
    </div>
  );
};

export default Logo;
