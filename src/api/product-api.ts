import {Product, ProductDTO} from "../types/product";
import {BASE_URL} from "./util";

const API_BASE_URL = `${BASE_URL}/products`;

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return await response.json();
};

function getHeaders() {
    return {
        'Content-Type': 'application/json',
    };
}

export const createProduct = async (product: ProductDTO): Promise<Product> => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Failed to create product');
    }
    return await response.json();
};

export const updateProduct = async (id: string, product: ProductDTO): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Failed to update product');
    }
    return await response.json();
};

export const deleteProduct = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete product');
    }
};
