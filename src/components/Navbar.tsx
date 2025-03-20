
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-primary transition-all duration-300 hover:opacity-80"
          >
            <span className="text-xl md:text-2xl font-serif font-bold">Choose Life Church</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <NavLink to="/" active={location.pathname === "/"}>
              Home
            </NavLink>
            <NavLink to="/lessons" active={location.pathname.includes("/lessons")}>
              Lessons
            </NavLink>
            <div className="w-px h-6 bg-gray-200"></div>
            <Link
              to="/lessons"
              className="px-4 py-2 rounded-md bg-primary text-white font-medium transition-all duration-300 hover:bg-primary/90 hover:scale-105"
            >
              Start Learning
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-primary rounded-md hover:bg-primary/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-white pt-20 transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-4 p-6">
          <MobileNavLink to="/" active={location.pathname === "/"}>
            Home
          </MobileNavLink>
          <MobileNavLink to="/lessons" active={location.pathname.includes("/lessons")}>
            Lessons
          </MobileNavLink>
          <div className="w-full h-px bg-gray-200 my-2"></div>
          <Link
            to="/lessons"
            className="flex items-center justify-between px-4 py-3 rounded-md bg-primary text-white font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Start Learning</span>
            <ChevronRight size={18} />
          </Link>
        </nav>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  active: boolean;
}

const NavLink = ({ to, children, active }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "relative font-medium transition-all duration-300",
        active
          ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
          : "text-foreground/80 hover:text-primary"
      )}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, children, active }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center justify-between px-4 py-3 rounded-md transition-all duration-300",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-foreground hover:bg-primary/5"
      )}
    >
      <span>{children}</span>
      <ChevronRight
        size={18}
        className={active ? "text-primary" : "text-gray-400"}
      />
    </Link>
  );
};

export default Navbar;
