import { useEffect } from "react";
import { apiService } from "../services/apiService";
import { useCookies } from "react-cookie";

export default function useAddCart(item){
    
    useEffect(() => {
        const fetchApi = async () => {
            const response = await apiService.postAddCart(cartId,item._id,item.quantity)
            console.log(response);
        }
        fetchApi();
    },[cartId,item._id,item.quantity]);
    
    return 0;
}