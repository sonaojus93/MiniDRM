import jwt from 'jsonwebtoken';

export function generateToken(id: number, role: string): string {
    return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });
}