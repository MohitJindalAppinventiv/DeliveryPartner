import { Truck, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import photo from "../../../public/placeholder.jpeg";

const DeliveryHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 to-red-50 pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Earn with <span className="text-orange-500">Foodify</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of delivery partners and start earning on your schedule.
              Flexible hours, competitive rates, and weekly payouts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link to="/signup">
                <button className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105 font-medium text-lg shadow-lg">
                  Start Earning Today
                </button>
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-600">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-8 w-8 text-orange-500 mb-2" />
                <p>Own Vehicle</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Clock className="h-8 w-8 text-orange-500 mb-2" />
                <p>Flexible Hours</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <DollarSign className="h-8 w-8 text-orange-500 mb-2" />
                <p>Weekly Payouts</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <img
              src={photo}
              alt="Delivery Partner"
              className="w-full max-w-sm mx-auto rounded-full shadow-2xl object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryHero;
