import React, { useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { Product } from '../types/product';
import { deleteProduct } from '../api/product-api';
import ProductModal from './ProductModal';

export function ProductComponent(props: { product: Product }) {
    const [show, setShow] = useState(false);

    const handleProductDelete = async () => {
        try {
            await deleteProduct(props.product._id.toString());
        } catch (error) {
            console.error(error);
        }
    };

    const handleProductUpdate = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleSave = () => {
        // Refresh product list or perform other actions after updating the product
        setShow(false);
    };

    return (
        <tr>
            <td>{props.product._id}</td>
            <td>{props.product.name}</td>
            <td>{props.product.stock}</td>
            <td>{props.product.price}</td>
            <td><img src={props.product.image} alt={props.product.name} style={{ maxWidth: '100px' }} /></td>
            <td>
                <Row>
                    <Button variant="warning" onClick={handleProductUpdate}>Update</Button>
                </Row>
                <Row>
                    <Button variant="danger" onClick={handleProductDelete}>Delete</Button>
                </Row>
            </td>
            <ProductModal
                show={show}
                handleClose={handleClose}
                initialProduct={{
                    id: props.product._id.toString(),
                    name: props.product.name,
                    stock: props.product.stock,
                    price: props.product.price,
                    image: props.product.image
                }}
                onSave={handleSave}
            />
        </tr>
    );
}
