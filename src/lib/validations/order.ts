import { z } from 'zod';

// YouTube URL regex pattern
const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/;

export const orderSchema = z.object({
  videoUrl: z
    .string()
    .min(1, 'YouTube URL is required')
    .regex(
      youtubeUrlPattern,
      'Please enter a valid YouTube video URL (e.g., https://youtube.com/watch?v=xxxxx)'
    )
    .refine(
      (url) => {
        try {
          const urlObj = new URL(url);
          return urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be');
        } catch {
          return false;
        }
      },
      'Please enter a valid YouTube URL'
    ),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
