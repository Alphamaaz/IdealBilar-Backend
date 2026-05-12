import {z} from 'zod';

export const createShowroomLocationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    address: z.string().min(1, 'Address is required'),
    latitude: z.number().refine((val) => val >= -90 && val <= 90, {
        message: 'Latitude must be between -90 and 90',
    }),
    longitude: z.number().refine((val) => val >= -180 && val <= 180, {
        message: 'Longitude must be between -180 and 180',
    }),
});

export const updateShowroomLocationSchema = z.object({
    name: z.string().min(1, 'Name is required').optional(),
    address: z.string().min(1, 'Address is required').optional(),
    latitude: z.number().refine((val) => val >= -90 && val <= 90, {
        message: 'Latitude must be between -90 and 90',
    }).optional(),
    longitude: z.number().refine((val) => val >= -180 && val <= 180, {
        message: 'Longitude must be between -180 and 180',
    }).optional(),
});
