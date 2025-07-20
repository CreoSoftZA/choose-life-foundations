
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";
import { type Lesson } from "@/data/lessons";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  isCompleted?: boolean;
}

const LessonCard = ({ lesson, index, isCompleted = false }: LessonCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative group overflow-hidden rounded-lg bg-white shadow-elegant border border-gray-100 transition-all duration-300",
        isHovered && "shadow-lg scale-[1.02]"
      )}
    >
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-primary/70 bg-primary/5 px-2.5 py-1 rounded-full">
            Lesson {lesson.id}
          </span>
          {isCompleted && (
            <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
              <Check size={14} className="text-green-600" />
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-serif font-medium mb-2 text-gray-900">
          {lesson.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {lesson.description}
        </p>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <Link
          to={`/lessons/${lesson.slug}`}
          className="flex items-center justify-between text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          <span>{isCompleted ? "Review Lesson" : "Begin Lesson"}</span>
          <motion.div
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ChevronRight size={16} />
          </motion.div>
        </Link>
      </div>
      
      <motion.div
        className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none"
        animate={{ borderColor: isHovered ? "rgba(59, 130, 246, 0.3)" : "transparent" }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default LessonCard;
