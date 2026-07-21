import { Router } from "express";
import { homepage } from "../controllers/groceriesController";
import { addProduct, allProducts } from "../controllers/productsController";
import { allCustomers } from "../controllers/customersController";
import { allStores } from "../controllers/storesController";

const router = Router();

router.get("/", homepage);
router.get("/products", allProducts);
router.post("/products", addProduct);
router.get("/customers", allCustomers);
router.get("/stores", allStores);
export default router;
