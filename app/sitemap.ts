import type { MetadataRoute } from "next";

const baseUrl = "https://www.scriptedge.co.in";

const servicePages = [
  // School
  "school-services/assignments",
  "school-services/holiday-homework",
  "school-services/projects",
  "school-services/charts-and-models",
  "school-services/practical-files",
  "school-services/notebooks",

  // College
  "college-services/assignments",
  "college-services/project-reports",
  "college-services/practical-files",
  "college-services/seminars",
  "college-services/research-work",
  "college-services/lab-records",

  // Digital
  "digital-services/powerpoint-presentations",
  "digital-services/pdf-editing",
  "digital-services/typing-work",
  "digital-services/document-formatting",
  "digital-services/resume",
  "digital-services/cover-pages",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },

    ...servicePages.map((service) => ({
      url: `${baseUrl}/services/${service}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}