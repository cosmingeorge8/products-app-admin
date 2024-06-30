import React, {useEffect, useState} from 'react';
import './App.css';
import {  Container, Table} from "react-bootstrap";
import {Product} from "./types/product";
import {getProducts} from "./api/product-api";
import AddProductButton from "./components/AddProductButton";
import {ProductComponent} from "./components/ProductComponent";
import { socket } from './socket/socket';

function App() {
    const [products, setProducts] = useState<Array<Product>>([]);

    useEffect(() => {
        fetchProducts();

        socket.on('productChange', () => {
            fetchProducts();
        });
    }, []);

    async function fetchProducts(){
        try {
            const products = await getProducts();
            setProducts(products);
        } catch (error) {
            console.log('Failed to fetch products', error)
        }
    }


    return (
        <div className="App">
            <Container>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <ProductComponent key={product._id} product={product}/>
                    ))}
                    </tbody>
                    <AddProductButton/>
                </Table>
            </Container>
        </div>
    );
}

export default App;
