import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DeliveryFAQ = () => {
  const faqs = [
    {
      question: 'What are the requirements to become a delivery partner?',
      answer:
        'You need to be 18+ years old, have a valid driving license, own a smartphone, and have a two-wheeler or bicycle. No prior delivery experience required.',
    },
    {
      question: 'How much can I earn as a delivery partner?',
      answer:
        'Earnings typically range from ₹15,000 to ₹25,000 per month, depending on the number of orders you complete, location, and time spent online. You also earn additional incentives and bonuses.',
    },
    {
      question: 'When do I get paid?',
      answer:
        "Payments are processed weekly every Tuesday for the previous week's earnings. You can track your earnings in real-time through the partner app.",
    },
    {
      question: 'Do I need my own vehicle?',
      answer:
        "Yes, you need your own two-wheeler or bicycle. We also provide vehicle rental options in select cities for partners who don't own a vehicle.",
    },
    {
      question: 'What insurance coverage do you provide?',
      answer:
        'We provide free accidental insurance coverage up to ₹5 lakhs and medical insurance for all active delivery partners at no additional cost.',
    },
    {
      question: 'Can I work part-time?',
      answer:
        'Absolutely! You have complete flexibility to choose your working hours. Many of our partners work part-time while managing other commitments.',
    },
    {
      question: 'Is there any registration fee?',
      answer:
        'No, there are no registration fees or charges to become a Foodify delivery partner. The signup process is completely free.',
    },
    {
      question: 'What support is available if I face issues?',
      answer:
        'We have 24/7 partner support available through the app, phone, and WhatsApp. Our support team helps with order issues, payments, and any other concerns.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to know about becoming a delivery partner
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 text-base font-medium hover:bg-gray-50 focus:outline-none transition-colors"
              >
                <span>{faq.question}</span>
                <span className="ml-4">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-orange-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-orange-500" />
                  )}
                </span>
              </button>

              <div
                className={`px-6 text-gray-700 text-sm transition-all duration-300 ${
                  openIndex === index ? 'max-h-[500px] py-4' : 'max-h-0 py-0'
                } overflow-hidden`}
              >
                {openIndex === index && <p>{faq.answer}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryFAQ;
