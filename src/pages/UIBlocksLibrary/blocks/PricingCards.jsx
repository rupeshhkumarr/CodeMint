// src/pages/UIBlocksLibrary/blocks/PricingCards.jsx
const PricingCards = () => {
  const plans = [
    {
      name: "Starter",
      price: "$19",
      description: "Perfect for small projects",
      features: ["5 Projects", "10GB Storage", "Basic Support", "Free Updates"],
    },
    {
      name: "Professional",
      price: "$49",
      description: "Great for growing teams",
      features: [
        "20 Projects",
        "50GB Storage",
        "Priority Support",
        "Free Updates",
        "Advanced Analytics",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "For large organizations",
      features: [
        "Unlimited Projects",
        "500GB Storage",
        "24/7 Support",
        "Free Updates",
        "Advanced Analytics",
        "Custom Integrations",
      ],
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 ${
                plan.popular
                  ? "border-blue-500 transform scale-105"
                  : "border-gray-200 dark:border-gray-700"
              } transition-transform duration-200`}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-center py-2 font-semibold">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    /month
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingCards;
