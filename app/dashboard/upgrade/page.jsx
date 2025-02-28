import React from "react";

const plans = [
  {
    id: 1,
    name: "Free",
    cost: 0,
    offering: [
      { value: "✅ Create 3 Free Mock Interview" },
      { value: "✅ Unlimited Retake Interview" },
      { value: "❌ Practise Question" },
      { value: "❌ Ayaan.com Exclusive App Access" },
      { value: "❌ Email Support" },
    ],
  },
  {
    id: 2,
    name: "Monthly",
    cost: 1000,
    paymentLink: "https://rzp.io/rzp/KkCmSKHX",
    offering: [
      { value: "✅ Create 3 Free Mock Interview" },
      { value: "✅ Unlimited Retake Interview" },
      { value: "✅ Practise Question" },
      { value: "✅ Ayaan.com Exclusive App Access" },
      { value: "✅ Email Support" },
    ],
  },
];

const Upgrade = () => {
  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h2 className="text-4xl font-bold">Pricing Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="border p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
            <p className="text-lg font-bold">Rs.{plan.cost}</p>
            <ul className="mt-4 space-y-2">
              {plan.offering.map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item.value}
                </li>
              ))}
            </ul>
            {plan.paymentLink && (
              <a
                href={plan.paymentLink}
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
              >
                Subscribe
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;