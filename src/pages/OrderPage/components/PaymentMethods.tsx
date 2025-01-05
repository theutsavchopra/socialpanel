import { CreditCard } from 'lucide-react';

const methods = [
  { 
    icon: CreditCard, 
    label: "Payment Methods", 
    providers: [
      { 
        id: "visa", 
        name: "Visa",
        url: "https://www.svgrepo.com/show/354518/visa.svg"
      },
      { 
        id: "mastercard", 
        name: "Mastercard",
        url: "https://www.svgrepo.com/show/303248/mastercard-2-logo.svg"
      },
      { 
        id: "paypal", 
        name: "PayPal",
        url: "https://www.svgrepo.com/show/475665/paypal-color.svg"
      },
      { 
        id: "crypto", 
        name: "Cryptocurrency",
        url: "https://www.svgrepo.com/show/367256/usdt.svg"
      },
      { 
        id: "applepay", 
        name: "Apple Pay",
        url: "https://www.svgrepo.com/show/303191/apple-pay-logo.svg"
      }
    ]
  }
];

export default function PaymentMethods() {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
      {methods.map(({ icon: Icon, label, providers }) => (
        <div 
          key={label} 
          className="flex items-center gap-4 p-4 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-100"
        >
          <Icon className="h-5 w-5 text-gray-500" />
          <div className="flex gap-4 items-center flex-wrap">
            {providers.map(provider => (
              <img 
                key={provider.id}
                src={provider.url}
                alt={provider.name}
                className="h-8 w-auto" // Increased from h-6 to h-8
                title={provider.name}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
