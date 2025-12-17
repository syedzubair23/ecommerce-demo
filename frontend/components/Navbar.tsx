import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link href="/" className="nav-logo">
                    Mindwhiz
                </Link>
                <div>
                    <Link href="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}
