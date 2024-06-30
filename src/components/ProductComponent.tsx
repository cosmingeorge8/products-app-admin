import {Product} from "../types/product";
import {Button, Row} from "react-bootstrap";
import React from "react";
import {deleteProduct, updateProduct} from "../api/product-api";

export function ProductComponent(props: { product: Product }) {
   async function handleProductDelete() {
        try{
            await deleteProduct(props.product._id.toString());
        }catch (error){
            console.error(error);
        }
    }

    function handleProductUpdate() {

    }

    return <tr>
        <td>{props.product._id}</td>
        <td>{props.product.name}</td>
        <td>{props.product.stock}</td>
        <td>{props.product.price}</td>
        <td><img src={props.product.image} alt={props.product.name} style={{maxWidth: "100px"}}/></td>
        <td>
            <Row>
                <Button variant={"warning"} onClick={handleProductUpdate}>Update</Button>
            </Row>
            <Row>
                <Button variant={"danger"} onClick={handleProductDelete}>Delete</Button>
            </Row>
        </td>
    </tr>;
}