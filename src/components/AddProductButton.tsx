import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form, FormGroup} from "react-bootstrap";
import {uploadFile} from "../api/file-api";
import {createProduct} from "../api/product-api";

function AddProductButton() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

        const productData = {
            name,
            stock,
            price,
            imageUrl
        };

        // Validate the product data
        if (!productData.name || !productData.stock || !productData.price || !productData.imageUrl) {
            alert('Please fill in all the fields');
            return;
        }

        try {
            const response = await createProduct({
                name: productData.name,
                stock: productData.stock,
                price: productData.price,
                image: productData.imageUrl
            })
            alert('Product created successfully');
            handleClose(); // Close the modal
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Product
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new product</Modal.Title>
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
        </>
    );
}

export default AddProductButton;
