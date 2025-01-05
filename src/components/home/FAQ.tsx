import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'Is it safe to buy YouTube views?',
    answer: 'Yes, our service is completely safe. We use organic promotion methods that comply with YouTube\'s terms of service. Our Smart Delivery Technology ensures natural view distribution and engagement patterns.'
  },
  {
    question: 'How fast will I see results?',
    answer: 'Views start appearing within 24-48 hours after purchase. We use a gradual delivery system to ensure natural growth and maintain the safety of your channel. The delivery speed is optimized based on your video\'s content and length.'
  },
  {
    question: 'Do you need my password?',
    answer: 'No, we never ask for your password or any sensitive account information. We only need your public video URL to deliver views. This ensures maximum security and protection of your YouTube account.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and various cryptocurrencies. All payments are processed through secure payment gateways with industry-standard encryption.'
  },
  {
    question: 'Do you offer a refund?',
    answer: 'Yes, we offer a 30-day money-back guarantee if we fail to deliver the promised views. Our support team will assist you throughout the process to ensure your complete satisfaction.'
  },
  {
    question: 'Are the views from real people?',
    answer: 'Yes, all views come from real users across our extensive network. We never use bots or automated systems that could harm your channel\'s reputation or violate YouTube\'s policies.'
  },
  {
    question: 'Will buying views affect my monetization?',
    answer: 'No, our service is designed to support, not hinder, your monetization goals. The views are delivered naturally and comply with YouTube\'s monetization requirements.'
  },
  {
    question: 'Do you offer targeted views?',
    answer: 'Yes, we offer both worldwide views and geo-targeted views. You can choose specific countries or regions to focus your viewership growth based on your target audience.'
  },
  {
    question: 'What happens if views drop?',
    answer: 'We monitor view retention for 30 days and automatically replenish any significant drops. Our guarantee ensures that you maintain the view count you purchased.'
  },
  {
    question: 'Can I buy views for private videos?',
    answer: 'No, videos must be public and accessible worldwide. This ensures proper delivery and maintains the authenticity of the views.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-outfit text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-inter text-xl text-gray-600">
            Everything you need to know about our services
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group relative rounded-xl transition-all duration-300
                         backdrop-blur-[12px] border border-white
                         shadow-[0_0_1px_1px_rgba(0,0,0,0.05)]
                         hover:shadow-[0_0_40px_-15px_rgba(239,68,68,0.2)]
                         ${openIndex === index 
                           ? 'bg-white/80' 
                           : 'bg-white/40 hover:bg-white/60'}`}
            >
              {/* Card inner glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/50 via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <button
                className="relative w-full px-6 py-5 flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-outfit text-lg font-medium text-left text-gray-900 group-hover:text-gray-800">
                  {faq.question}
                </span>
                <div className={`ml-4 flex-shrink-0 transition-colors duration-200
                                ${openIndex === index 
                                  ? 'text-red-500' 
                                  : 'text-gray-400 group-hover:text-red-400'}`}>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="relative px-6 pb-5">
                  <p className="font-inter text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
