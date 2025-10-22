// src/pages/UIBlocksLibrary/blocks/PricingCards.jsx
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const PricingCards = ({ refreshCount = 0 }) => {
  const [plans, setPlans] = useState([]);
  const [conversionRate, setConversionRate] = useState(0);

  useEffect(() => {
    const basePlans = [
      {
        name: "Starter",
        basePrice: 19,
        description: "Perfect for small teams and individuals",
        features: ["Up to 5 projects", "Basic analytics", "Email support", "1GB storage"],
        popular: false,
      },
      {
        name: "Professional",
        basePrice: 49,
        description: "Ideal for growing businesses",
        features: ["Up to 50 projects", "Advanced analytics", "Priority support", "10GB storage", "Custom domains"],
        popular: true,
      },
      {
        name: "Enterprise",
        basePrice: 99,
        description: "For large organizations",
        features: ["Unlimited projects", "Advanced analytics", "24/7 support", "100GB storage", "Custom domains", "SSO", "API access"],
        popular: false,
      }
    ];

    // Add random discounts or premium pricing
    const updatedPlans = basePlans.map(plan => {
      const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 5 : 0;
      const finalPrice = discount ? plan.basePrice * (1 - discount/100) : plan.basePrice;
      
      return {
        ...plan,
        price: `$${discount ? finalPrice.toFixed(2) : plan.basePrice}`,
        originalPrice: discount ? `$${plan.basePrice}` : null,
        discount: discount ? `${discount}% OFF` : null,
        period: "per month",
        users: Math.floor(Math.random() * 1000) + 50
      };
    });

    setPlans(updatedPlans);
    setConversionRate((Math.random() * 15 + 5).toFixed(1));
  }, [refreshCount]);

  const handlePlanSelect = (plan) => {
    const savings = plan.discount ? 
      `Save ${plan.discount} - Original price ${plan.originalPrice}` : 
      "No current discounts";
    
    toast.success(`Selected ${plan.name} plan!\n${savings}\n${plan.users}+ active users`);
  };

  const getPopularPlan = () => {
    return plans.find(plan => plan.popular) || plans[1];
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Stats Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <span>🔥</span>
          <span>Popular: {getPopularPlan()?.name} - {getPopularPlan()?.users}+ users</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Average conversion rate: {conversionRate}%
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            onClick={() => handlePlanSelect(plan)}
            className={`relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
              plan.popular 
                ? 'border-blue-500 dark:border-blue-400 shadow-blue-100 dark:shadow-blue-900/20 transform scale-105' 
                : 'border-gray-200 dark:border-slate-700 hover:border-blue-300'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            {plan.discount && (
              <div className="absolute -top-2 -right-2">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {plan.discount}
                </span>
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  {plan.originalPrice && (
                    <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                      {plan.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
              
              {/* User Count */}
              <div className="mb-4 text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {plan.users}+ active users
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors duration-200 transform hover:scale-105 ${
                plan.popular
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-900 dark:text-white'
              }`}>
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCards;