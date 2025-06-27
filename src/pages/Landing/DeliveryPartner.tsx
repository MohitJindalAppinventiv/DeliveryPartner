import DeliveryHeader from "../../components/homepage/DeliveryHeader";
import DeliveryHero from "../../components/homepage/DeliveryHero";
import DeliveryStats from "../../components/homepage/DeliveryStats";
import DeliveryPerks from "../../components/homepage/DeliveryPerks";
import DeliveryTestimonials from "../../components/homepage/DeliveryTestimonials";
import DeliveryFAQ from "../../components/homepage/DeliveryFAQ";
import { motion } from "framer-motion";
const DeliveryPartner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <DeliveryHeader />
      <DeliveryHero />
      <DeliveryStats />
      <DeliveryPerks />
      <DeliveryTestimonials />
      <DeliveryFAQ />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-Foodify-red mb-4">
                Foodify
              </h3>
              <p className="text-gray-300">
                Join thousands of delivery partners and earn with flexibility
              </p>
            </div>
            {/* <div>
              <h4 className="font-semibold mb-4">For Partners</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">How it Works</a></li>
                <li><a href="#" className="hover:text-white">Earnings</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Safety</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Partner Support</a></li>
                <li><a href="#" className="hover:text-white">Emergency Help</a></li>
              </ul>
            </div> */}
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Foodify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default DeliveryPartner;
