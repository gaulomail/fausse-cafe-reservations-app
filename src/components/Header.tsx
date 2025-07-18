import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 relative z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-all duration-300 transform hover:scale-105">
            Café Fausse
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ${
                isActive('/') 
                  ? 'text-white bg-primary-600' 
                  : 'text-primary-600 hover:text-primary-700 hover:bg-primary-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive('/menu')
                  ? 'text-white bg-primary-600'
                  : 'text-primary-600 hover:text-primary-700 hover:bg-primary-50'
              }`}
            >
              Menu
            </Link>
            <Link 
              to="/about" 
              className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive('/about')
                  ? 'text-white bg-primary-600'
                  : 'text-primary-600 hover:text-primary-700 hover:bg-primary-50'
              }`}
            >
              About
            </Link>
            <Link 
              to="/gallery" 
              className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive('/gallery')
                  ? 'text-white bg-primary-600'
                  : 'text-primary-600 hover:text-primary-700 hover:bg-primary-50'
              }`}
            >
              Gallery
            </Link>
            <Link 
              to="/reservations" 
              className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive('/reservations')
                  ? 'text-white bg-primary-600'
                  : 'text-primary-600 hover:text-primary-700 hover:bg-primary-50'
              }`}
            >
              Reservations
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive('/dashboard')
                      ? 'text-white bg-primary-600'
                      : 'text-primary-600 hover:text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/my-reservations" 
                  className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive('/my-reservations')
                      ? 'text-white bg-primary-600'
                      : 'text-primary-600 hover:text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  My Reservations
                </Link>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100 rounded-full border border-primary-200">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                  <span className="text-primary-700 text-sm font-medium">
                    {user.email?.split('@')[0]}
                  </span>
                </div>
                <Button
                  onClick={signOut}
                  variant="outline"
                  size="sm"
                  className="border-primary-300 text-primary-600 hover:bg-primary-50 hover:border-primary-400 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
                <div className="flex items-center space-x-3">
                  <Button asChild variant="outline" size="sm" className="border-primary-600 text-primary-600 hover:bg-primary-50 hover:border-primary-700 transition-all duration-300 font-medium">
                    <Link to="/auth">
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
                    <Link to="/auth">Sign Up</Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="text-primary-600 hover:bg-primary-50 transition-all duration-300 font-medium">
                    <Link to="/reservations">Make Reservation</Link>
                  </Button>
                </div>
              )}
            </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" className="text-primary-600 hover:bg-primary-50 transition-all duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;