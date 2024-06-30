import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ProductModal from './ProductModal';

function AddProductButton() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = () => {
        // Refresh product list or perform other actions after saving the product
        setShow(false);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Product
            </Button>
            <ProductModal show={show} handleClose={handleClose} onSave={handleSave} />
        </>
    );
}

export default AddProductButton;
