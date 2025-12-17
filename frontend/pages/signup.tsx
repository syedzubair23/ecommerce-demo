import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import { api } from '@/services/api';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import styles from '@/styles/Signup.module.css';

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '', role: 'customer' });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.signup(formData);
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                router.push('/');
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    return (
        <>
            <Navbar />
            <div className={`container ${styles.container}`}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Sign Up</h1>
                    {error && <div className={styles.error}>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <Select
                            label="Role"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            options={[
                                { value: 'customer', label: 'Customer' },
                                { value: 'admin', label: 'Admin' }
                            ]}
                        />
                        <Button type="submit" className={styles.fullWidth}>Sign Up</Button>
                    </form>
                    <div className={styles.footer}>
                        Already have an account? <Link href="/login">Sign In</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
