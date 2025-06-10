import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";

const DeliveryHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <h1 className="text-xl font-bold text-gray-900">Foodify</h1>
            <span className="hidden sm:inline text-sm text-gray-500">
              for partners
            </span>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link to="/login">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DeliveryHeader;
