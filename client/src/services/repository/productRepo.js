import { toast } from 'react-hot-toast';
import { apiConnector } from '../Connector';
import { productEndPoints } from "../Api"
import { setProducts } from '../../app/ProductsSlice';
const { GET_PENDING_PRODUCTS, GET_PRODUCT_BY_ID, GET_MARKET_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT, CREATE_PRODUCT, APPROVE_PRODUCT, REJECT_PRODUCT } = productEndPoints;

export async function getPendingProducts() {
    const loadingToast = toast.loading("Fetching products...");

    try {
        const response = await apiConnector("GET", GET_PENDING_PRODUCTS);

        if (response.status === 200) {
            toast.success(response.data.message);
            toast.dismiss(loadingToast);
            return response.data.products;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        toast.error("Error while fetching products");
    }

    toast.dismiss(loadingToast);
}

export function getSpecificMarketProducts(marketId) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Fetching market products...");

        try {
            const response = await apiConnector("GET", `${GET_MARKET_PRODUCTS}/${marketId}`);
            // console.log("resp",response);

            if (response.status === 200) {
                toast.success("Products fetched...");
                toast.dismiss(loadingToast);
                dispatch(setProducts(response.data.products));
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching market products:", error);
            toast.error("Error while fetching market products");
        }

        toast.dismiss(loadingToast);
    }

}

export async function createProduct(productData) {
    const loadingToast = toast.loading("Creating product...");
    // console.log("insie create Product");

    try {
        const response = await apiConnector("POST", CREATE_PRODUCT, productData);
        console.log(response);

        if (response.status === 201) {
            toast.success(response.message || "Product created successfully");
            toast.dismiss(loadingToast);
            return response.data;
        } else {
            throw new Error(response.data.message || "Failed to create product");
        }
    } catch (error) {
        toast.error(error.message || "Error while creating product");
    }

    toast.dismiss(loadingToast);
}

export async function approveProduct(productId) {

    const loadingToast = toast.loading("Approving product...");

    try {
        const response = await apiConnector("PATCH", `${APPROVE_PRODUCT}/${productId}`, {});

        if (response.status === 200) {
            toast.success(response.data.message);
            toast.dismiss(loadingToast);
            return true;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        toast.error("Error while approving product");
    }

    toast.dismiss(loadingToast);
}

export async function rejectProduct(productId) {
    const loadingToast = toast.loading("Rejecting product...");

    try {
        const response = await apiConnector("PATCH", `${REJECT_PRODUCT}/${productId}`, {});

        if (response.status === 200) {
            toast.success(response.data.message);
            toast.dismiss(loadingToast);
            return true;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        toast.error("Error while rejecting product");
    }

    toast.dismiss(loadingToast);
}

export function getProductById(productId) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Fetching product details...");

        try {
            const response = await apiConnector("GET", `${GET_PRODUCT_BY_ID}${productId}`);

            if (response.status === 200) {
                toast.success(response.data.message);
                toast.dismiss(loadingToast);
                return response.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            toast.error("Error while fetching product details");
        }

        toast.dismiss(loadingToast);
    };
}

export function deleteProduct(productId) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Deleting product...");

        try {
            const response = await apiConnector("DELETE", `${DELETE_PRODUCT}${productId}`);

            if (response.status === 200) {
                toast.success(response.data.message);
                toast.dismiss(loadingToast);
                return response.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            toast.error("Error while deleting product");
        }

        toast.dismiss(loadingToast);
    };
}

export function editProduct(productId, productData) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Editing product...");

        try {
            const response = await apiConnector("PUT", `${EDIT_PRODUCT}${productId}`, productData);

            if (response.status === 200) {
                toast.success(response.data.message);
                toast.dismiss(loadingToast);
                return response.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            toast.error("Error while editing product");
        }

        toast.dismiss(loadingToast);
    };
}
