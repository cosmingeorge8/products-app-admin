import React, {useState, useEffect} from 'react';
import {Button, Modal, Form, FormGroup} from 'react-bootstrap';
import {uploadFile} from '../api/file-api';
import {createProduct, updateProduct} from '../api/product-api';
import {ProductDTO} from "../types/product";

interface ProductModalProps {
    show: boolean;
    handleClose: () => void;
    initialProduct?: {
        id?: string;
        name: string;
        stock: number;
        price: number;
        image: string;
    };
    onSave: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({show, handleClose, initialProduct, onSave}) => {
    const [name, setName] = useState(initialProduct?.name || '');
    const [stock, setStock] = useState(initialProduct?.stock || 0);
    const [price, setPrice] = useState(initialProduct?.price || 0);
    const [imageUrl, setImageUrl] = useState(initialProduct?.image || '');

    useEffect(() => {
        if (initialProduct) {
            setName(initialProduct.name);
            setStock(initialProduct.stock);
            setPrice(initialProduct.price);
            setImageUrl(initialProduct.image);
        }
    }, [initialProduct]);

    async function handleFileUpload(event: any) {
        const file = event.target.files[0];
        try {
            const url = await uploadFile(file);
            setImageUrl(url); // Save the uploaded image URL
            alert(`File uploaded successfully`);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        const productData: ProductDTO = {
            name,
            stock,
            price,
            image: imageUrl
        };

        // Validate the product data
        if (!productData.name || !productData.stock || !productData.price || !productData.image) {
            alert('Please fill in all the fields');
            return;
        }

        try {
            if (initialProduct && initialProduct.id) {
                await updateProduct(initialProduct.id, productData);
                alert('Product updated successfully');
            } else {
                await createProduct(productData);
                alert('Product created successfully');
            }
            onSave();
            handleClose(); // Close the modal
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{initialProduct ? 'Update Product' : 'Add a new product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter stock"
                            value={stock}
                            onChange={e => setStock(Number(e.target.value))}
                        />

                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={handleFileUpload}/>
                    </FormGroup>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ProductModal;
