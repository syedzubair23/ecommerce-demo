import { Request, Response } from 'express';
import { findUserByEmail } from '../models/userModel';

export const loginUser = (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = findUserByEmail(email);

    if (user && user.password === password) {
        // In a real app, generate JWT token here.
        // For this mock, returning user info (excluding password)
        const { password, ...userWithoutPassword } = user;
        return res.json({
            message: "Login successful",
            user: userWithoutPassword,
            token: "mock-jwt-token-12345"
        });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
};
