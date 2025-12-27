import { useParams } from "react-router";
import Product from "./Product";

export default function ProductOfCategory(){
    const params = useParams();
    return <>
        <Product slugCategory={params.slugCategory}/>
    </>
}