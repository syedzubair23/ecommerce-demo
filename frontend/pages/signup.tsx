import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import { api } from '@/services/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

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
            <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Sign Up</h1>
                    {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
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
                        <Button type="submit" style={{ width: '100%' }}>Sign Up</Button>
                    </form>
                </div>
            </div>
        </>
    );
}
