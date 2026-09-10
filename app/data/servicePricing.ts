export const servicePricing = {
  Assignment: {
    Basic: 99,
    Standard: 119,
    Premium: 139,
  },

  Project: {
    Basic: 99,
    Standard: 129,
    Premium: 169,
  },

  "Practical File": {
    Basic: 249,
    Standard: 279,
    Premium: 299,
  },

  PPT: {
    Basic: 99,
    Standard: 199,
    Premium: 299,
  },

  "Combo Pack": {
    Basic: 1499,
    Standard: 1649,
    Premium: 1799,
  },
} as const;

export type PricingPlan = "Basic" | "Standard" | "Premium";