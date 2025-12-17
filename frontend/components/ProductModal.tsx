import styles from '@/styles/ProductModal.module.css';
import { Button } from '@/components/ui/Button';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    availability: string;
    image: string;
}

interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    // Close on Escape key could be added, or click outside
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Product Details</h2>
                </div>

                <div className={styles.body}>
                    <div className={styles.imageContainer}>
                        <img src={product.image} alt={product.name} className={styles.image} />
                    </div>

                    <h3 className={styles.productName}>{product.name}</h3>

                    <p className={styles.description}>
                        {product.description}
                    </p>

                    <div className={styles.infoRow}>
                        <div className={styles.price}>Price: ${product.price.toFixed(2)}</div>
                        <div className={`${styles.badge} ${product.availability !== 'In Stock' ? styles.outOfStock : ''}`}>
                            {product.availability}
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <Button variant="primary">Add to Cart</Button>
                    <Button variant="outline" onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    );
}
