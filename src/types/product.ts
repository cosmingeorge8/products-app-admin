export interface Product {
    _id: number;
    name: string;
    price: number;
    stock: number;
    image: string;
}

export interface ProductDTO {
    name: string;
    price: number;
    stock: number;
    image: string;
}