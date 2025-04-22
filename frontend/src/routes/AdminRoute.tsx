import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    children: ReactNode;
}

export default function AdminRoute({ children }: Props) {
    const token = localStorage.getItem('token');
    const user = parseJwt(token || '');

    if (!token) return <Navigate to="/login" />;
    if (user?.role !== 'admin') return <Navigate to="/dashboard" />;

    return <>{children}</>;
}

// helper: decode JWT without verifying signature
function parseJwt(token: string): any {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}