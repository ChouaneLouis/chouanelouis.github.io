import { z } from 'astro/zod';

export const personalSchema = z.object({
    name: z.string(),
    title: z.string(),
    bio: z.string(),
    picture: z.string(),
});

export const projectSchema = z.object({
    title: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
});

export const experienceSchema = z.object({
    title: z.string(),
    company: z.string(),
    date: z.date(),
    description: z.string(),
    techStack: z.array(z.string()),
});

export const portfolioSchema = z.object({
    personal: personalSchema,
    projects: z.array(projectSchema),
    experiences: z.array(experienceSchema),
});

export type PersonalData = z.infer<typeof personalSchema>;
export type ProjectData = z.infer<typeof projectSchema>;
export type ExperienceData = z.infer<typeof experienceSchema>;
export type PortfolioData = z.infer<typeof portfolioSchema>;
