import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Table, Alert } from "react-bootstrap";
import { Product } from "./types/product";
import { getProducts } from "./api/product-api";
import AddProductButton from "./components/AddProductButton";
import { ProductComponent } from "./components/ProductComponent";
import { socket } from './socket/socket';

function App() {
    const [products, setProducts] = useState<Array<Product>>([]);
    const [isConnected, setIsConnected] = useState<boolean>(true);

    useEffect(() => {
        fetchProducts();

        socket.on('productChange', handleProductChange);
        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);

        return () => {
            socket.off('productChange', handleProductChange);
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
        }
    }, []);

    function handleProductChange(){
        fetchProducts();
    }

    function handleConnect() {
        setIsConnected(true);
    }

    function handleDisconnect() {
        setIsConnected(false);
    }

    async function fetchProducts(){
        try {
            const products = await getProducts();
            setProducts(products);
        } catch (error) {
            setProducts([]);
            console.log('Failed to fetch products', error)
        }
    }

    return (
        <div className="App">
            <Container>
                {!isConnected && (
                    <Alert variant="danger">
                        Disconnected from the server. Trying to reconnect...
                    </Alert>
                )}
                <Table striped bordered hover>
                    <thead>
                    <tr>
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
                </Table>
                <AddProductButton/>
            </Container>
        </div>
    );
}

export default App;
