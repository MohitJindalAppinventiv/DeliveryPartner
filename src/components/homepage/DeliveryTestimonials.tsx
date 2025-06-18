import { Star } from 'lucide-react';
import image1 from "../../assets/placeholder1.jpeg"
import image2 from "../../assets/placeholder2.jpeg"
import image3 from "../../assets/placeholder3.jpeg"

const DeliveryTestimonials = () => {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Mumbai',
      rating: 5,
      text: 'Working with Foodify has been amazing. I earn ₹20,000+ every month and the flexible timing helps me manage my family time too.',
      avatar: image1
    },
    {
      name: 'Priya Singh',
      location: 'Delhi',
      rating: 5,
      text: 'As a woman delivery partner, I feel safe and supported. The insurance coverage gives me peace of mind while working.',
      avatar: image3
    },
    {
      name: 'Mohammed Ali',
      location: 'Bangalore',
      rating: 5,
      text: 'The app is very easy to use and the support team is always helpful. Weekly payments are always on time.',
      avatar: image2
    }
  ];

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stories from Our Partners
          </h2>
          <p className="text-gray-600 text-lg">
            Hear what our delivery partners have to say about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex items-center mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryTestimonials;
