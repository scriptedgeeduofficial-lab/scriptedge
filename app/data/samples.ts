
export type SampleCategory = {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
};

export type PortfolioSample = {
  id: string;
  title: string;
  description: string;
  fileType: "pdf" | "image";
  filePath: string;
  thumbnail?: string;
};

export const sampleCategories: SampleCategory[] = [
  {
    slug: "assignments",
    title: "Assignments",
    description:
      "Explore academic assignment samples with organized content, clear formatting and professional presentation.",
    shortDescription: "Academic assignments and written work",
  },
  {
    slug: "project-reports",
    title: "Project Reports",
    description:
      "Explore project report samples featuring structured documentation, research and presentation.",
    shortDescription: "Structured academic project reports",
  },
  {
    slug: "practical-files",
    title: "Practical Files",
    description:
      "Explore practical file samples with experiment-wise organization and neat academic presentation.",
    shortDescription: "Practical records and lab files",
  },
  {
    slug: "digital-works",
    title: "Digital Works",
    description:
      "Explore digital academic work, including presentations, PDF documents, formatting and other creative work.",
    shortDescription: "Presentations, PDFs and digital documents",
  },
];

// Add actual portfolio samples here when they are ready.
export const portfolioSamples: Record<string, PortfolioSample[]> = {
  assignments: [],
  "project-reports": [],
  "practical-files": [],
  "digital-works": [],
};
