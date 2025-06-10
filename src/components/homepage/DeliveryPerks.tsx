import { Clock, DollarSign, Shield, Smartphone, Award, Users } from 'lucide-react';

const DeliveryPerks = () => {
  const perks = [
    {
      icon: DollarSign,
      title: 'Competitive Earnings',
      description: 'Earn ₹15,000–₹25,000 per month with incentives and bonuses',
      color: 'text-green-600',
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Work when you want, as much as you want. Complete control over your time',
      color: 'text-blue-600',
    },
    {
      icon: Shield,
      title: 'Insurance Coverage',
      description: 'Free insurance coverage for accidents and medical emergencies',
      color: 'text-red-600',
    },
    {
      icon: Smartphone,
      title: 'Easy-to-Use App',
      description: 'Simple partner app with navigation, earnings tracker, and instant support',
      color: 'text-purple-600',
    },
    {
      icon: Award,
      title: 'Performance Rewards',
      description: 'Get rewarded for excellent ratings and completing more orders',
      color: 'text-yellow-600',
    },
    {
      icon: Users,
      title: '24/7 Support',
      description: 'Round-the-clock support team to help with any issues or questions',
      color: 'text-indigo-600',
    },
  ];

  return (
    <section id="perks" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Foodify?
          </h2>
          <p className="text-gray-600 text-lg">
            We provide everything you need to succeed as a delivery partner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {perks.map((perk, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <perk.icon className={`h-12 w-12 ${perk.color} mb-4`} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {perk.title}
              </h3>
              <p className="text-gray-600">{perk.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryPerks;
