
const DeliveryStats = () => {
    const stats = [
      { number: '2.5M+', label: 'Deliveries Completed', color: 'text-Foodify-red' },
      { number: '50K+', label: 'Active Partners', color: 'text-blue-600' },
      { number: '15K+', label: 'Restaurant Partners', color: 'text-green-600' },
      { number: '12K+', label: 'Women Partners', color: 'text-purple-600' },
    ];
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Making a Difference Together
            </h2>
            <p className="text-gray-600 text-lg">
              Join a community that's transforming food delivery across the country
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default DeliveryStats;