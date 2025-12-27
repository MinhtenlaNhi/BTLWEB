import { useEffect } from "react"
import { apiService } from "../../services/apiService";

export default function MainProduct() {
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await apiService.getProducts();
                console.log("Sách:", res.data.products);
            }
            catch (error) {
                console.log("Lỗi khi tải sách", error);
            }
        }
        fetchApi();
    },[]);
    return <>MainProduct</>
}