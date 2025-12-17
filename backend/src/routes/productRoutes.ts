import express from 'express';
import { getProducts, getProduct } from '../controllers/productController';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', require('../controllers/productController').addProduct);

export default router;
