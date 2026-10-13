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
    dateStart: z.date(),
    dateEnd: z.date(),
    description: z.string(),
    techStack: z.array(z.string()),
});

export const courseSchema = z.object({
    title: z.string(),
    description: z.string(),
})

export const activitySchema = z.object({
    title: z.string(),
    description: z.string(),
    duration: z.int(),
})

export const portfolioSchema = z.object({
    personal: personalSchema,
    projects: z.array(projectSchema),
    experiences: z.array(experienceSchema),
    courses: z.array(courseSchema),
    activities: z.array(activitySchema),
});

export type PersonalData = z.infer<typeof personalSchema>;
export type ProjectData = z.infer<typeof projectSchema>;
export type ExperienceData = z.infer<typeof experienceSchema>;
export type CourseData = z.infer<typeof courseSchema>;
export type ActivityData = z.infer<typeof activitySchema>;
export type PortfolioData = z.infer<typeof portfolioSchema>;
