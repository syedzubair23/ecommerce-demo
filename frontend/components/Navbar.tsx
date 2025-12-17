import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/Navbar.module.css';

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
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContent}`}>
                <Link href="/" className={styles.navLogo}>
                    Mindwhiz
                </Link>
                <div className={styles.navActions}>
                    {user ? (
                        <>
                            <span className={styles.userInfo}>Hi, {user.email?.split('@')[0]} ({user.role})</span>
                            {user.role === 'admin' && (
                                <Link href="/add-product" className={`btn btn-primary ${styles.addProductBtn}`}>
                                    Add Product
                                </Link>
                            )}
                            <button onClick={logout} className={`btn btn-outline ${styles.logoutBtn}`}>Logout</button>
                        </>
                    ) : (
                        <Link href="/login" className="btn btn-primary w-full">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
