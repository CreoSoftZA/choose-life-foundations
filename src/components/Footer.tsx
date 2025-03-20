
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold">Choose Life Church</h3>
            <p className="text-gray-600 text-sm max-w-xs">
              Helping believers build strong spiritual foundations through biblical teaching.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="flex items-center">
                Made with <Heart size={14} className="mx-1 text-red-500" /> for God's glory
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/lessons" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  All Lessons
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Foundation Course</h3>
            <p className="text-gray-600 text-sm">
              Eleven lessons designed to help you develop a strong spiritual foundation in Christ.
            </p>
            <Link
              to="/lessons"
              className="inline-block mt-4 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium transition-all duration-300 hover:bg-primary/90"
            >
              Start Learning
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Choose Life Church. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
