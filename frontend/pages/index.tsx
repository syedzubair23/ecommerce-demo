import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { api } from '@/services/api';
import styles from '@/styles/Home.module.css';

interface Product {
  _id: string; // Changed from id to _id for Mongo
  name: string;
  description: string;
  price: number;
  availability: string;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      window.location.href = '/login';
    } else {
      fetchProducts(page);
    }
  }, [page]);

  const fetchProducts = (p: number) => {
    setLoading(true);
    api.getProducts(p)
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.pages);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products', err);
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Product Listing</h1>
        </div>

        {loading ? (
          <p className={styles.loading}>Loading products...</p>
        ) : (
          <>
            <div className={`grid ${styles.grid}`}>
              {products?.map((product) => (
                <ProductCard
                  key={product._id}
                  product={{ ...product, id: product._id }}
                  onViewDetails={(p) => setSelectedProduct(product)}
                />
              ))}
            </div>

            <div className={styles.pagination}>
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="btn btn-outline"
              >
                Previous
              </button>
              <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="btn btn-outline"
              >
                Next
              </button>
            </div>
          </>
        )}

        {selectedProduct && (
          <ProductModal
            product={{ ...selectedProduct, id: selectedProduct._id }}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </main>
    </>
  );
}
