
const referencePricing = {
  Assignment: { Basic: 198, Standard: 238, Premium: 278 },
  Project: { Basic: 198, Standard: 258, Premium: 338 },
  "Practical File": { Basic: 498, Standard: 558, Premium: 598 },
  PPT: { Basic: 198, Standard: 398, Premium: 598 },
  "Combo Pack": { Basic: 2998, Standard: 3298, Premium: 3598 },

  "Holiday Homework": { Basic: 38, Standard: 58, Premium: 198 },
  "Project Reports": { Basic: 258, Standard: 338, Premium: 384 },
  "Charts & Models": { Basic: 38, Standard: 52, Premium: 98 },
  Notebooks: { Basic: 140, Standard: 172, Premium: 218 },
  "PowerPoint Presentations": { Basic: 158, Standard: 192, Premium: 218 },
  "PDF Editing": { Basic: 38, Standard: 58, Premium: 98 },
  "Typing Work": { Basic: 38, Standard: 52, Premium: 98 },
  "Document Formatting": { Basic: 98, Standard: 134, Premium: 198 },
  Resume: { Basic: 32, Standard: 46, Premium: 78 },
  "Cover Pages": { Basic: 38, Standard: 46, Premium: 88 },
} as const;

export type PricingPlan = "Basic" | "Standard" | "Premium";
export type PricedService = keyof typeof referencePricing;

export const servicePricing = Object.fromEntries(
  Object.entries(referencePricing).map(([service, plans]) => [
    service,
    Object.fromEntries(
      Object.entries(plans).map(([plan, referencePrice]) => [
        plan,
        Math.ceil(referencePrice * 0.45),
      ]),
    ),
  ]),
) as {
  [S in keyof typeof referencePricing]: {
    [P in keyof (typeof referencePricing)[S]]: number;
  };
};

export function getRegularPrice(
  service: PricedService,
  plan: PricingPlan,
): number {
  return referencePricing[service][plan];
}

export function getOfferPrice(
  service: PricedService,
  plan: PricingPlan,
): number {
  return servicePricing[service][plan];
}
