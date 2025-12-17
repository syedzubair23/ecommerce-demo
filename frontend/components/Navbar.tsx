import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link href="/" className="nav-logo" style={{ textDecoration: 'none' }}>
                    Mindwhiz
                </Link>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {user ? (
                        <>
                            <span>Hi, {user.email?.split('@')[0]} ({user.role})</span>
                            {user.role === 'admin' && (
                                <Link href="/add-product" className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                    Add Product
                                </Link>
                            )}
                            <button onClick={logout} className="btn btn-outline" style={{ fontSize: '0.9rem' }}>Logout</button>
                        </>
                    ) : (
                        <Link href="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
