import { z } from 'astro/zod';

export const personalSchema = z.object({
    name: z.string(),
    title: z.string(),
    bio: z.string(),
    picture: z.string()
});

export const projectSchema = z.object({
    title: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
});

export const portfolioSchema = z.object({
    personal: personalSchema,
    projects: z.array(projectSchema)
});

// Infer sub-category types for components
export type PersonalData = z.infer<typeof personalSchema>;
export type ProjectData = z.infer<typeof projectSchema>;
export type PortfolioData = z.infer<typeof portfolioSchema>;
