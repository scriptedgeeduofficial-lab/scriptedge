export const pricingPlans = [
  {
    name: "Basic",
    color: "border-gray-200",
    services: [
      { service: "Assignment", price: "₹99 each", complete: "₹249" },
      { service: "Project", price: "₹99 each", complete: "₹249" },
      { service: "Practical File", price: "₹249 each", complete: "₹999" },
      { service: "PPT", price: "₹49 / Slide", complete: "-" },
      {
        service: "Combo Pack",
        price: "₹1499",
        complete: "Assignment + Project + Practical",
      },
    ],
  },

  {
    name: "Standard",
    color: "border-emerald-500",
    services: [
      { service: "Assignment", price: "₹79–119", complete: "₹249" },
      { service: "Project", price: "₹89–129", complete: "₹249" },
      { service: "Practical File", price: "₹269–289", complete: "₹999" },
      { service: "PPT", price: "₹199", complete: "-" },
      {
        service: "Combo Pack",
        price: "₹1649",
        complete: "Assignment + Project + Practical",
      },
    ],
  },

  {
    name: "Premium",
    color: "border-yellow-500",
    services: [
      { service: "Assignment", price: "₹99–119", complete: "₹249" },
      { service: "Project", price: "₹99–169", complete: "₹249" },
      { service: "Practical File", price: "₹299–329", complete: "₹999" },
      { service: "PPT", price: "₹299", complete: "-" },
      {
        service: "Combo Pack",
        price: "₹1799",
        complete: "Including Delivery",
      },
    ],
  },
];
