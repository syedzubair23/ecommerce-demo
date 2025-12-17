const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5231';

const getHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return {
        'Content-Type': 'application/json',
        'Authorization': user.token ? `Bearer ${user.token}` : '',
    };
};

export const api = {
    login: async (credentials: any) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return res;
    },
    signup: async (userData: any) => {
        const res = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        return res;
    },
    getProducts: async (page = 1, limit = 9) => {
        const res = await fetch(`${API_URL}/products?page=${page}&limit=${limit}`);
        return res.json();
    },
    getProductById: async (id: string) => {
        const res = await fetch(`${API_URL}/products/${id}`);
        return res.json();
    },
    addProduct: async (productData: any) => {
        const res = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(productData),
        });
        return res;
    },
};
