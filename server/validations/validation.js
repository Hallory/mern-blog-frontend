import { body } from "express-validator";

export const registerValidation = [
    body('email', 'Email is not valid').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('fullName', 'Full name must be at least 3 characters').isLength({ min: 3 }),
    body('avatarUrl', 'Avatar URL is not valid').optional().isURL(),
];


export const loginValidation = [
    body('email', 'Email is not valid').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
]

export const postCreateValidation = [
    body('title', 'Enter title').isLength({ min: 3 }).isString(),
    body('text', 'Enter text').isLength({ min: 3 }).isString(),
    body('tags', 'Enter tags').optional().isString(),
    body('imageUrl', 'Enter image URL').optional().isString(),
]