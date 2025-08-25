import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold">Choose Life Church</h3>
            <p className="text-gray-600 text-sm max-w-xs">Helping people know Jesus by building strong spiritual foundations through biblical teaching.</p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="flex items-center">
                Made with <Heart size={14} className="mx-1 text-red-500" /> for God's glory
              </span>
            </div>
          </div>

          

          
        </div>

        <div className="border-t border-gray-100 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Choose Life Church. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;