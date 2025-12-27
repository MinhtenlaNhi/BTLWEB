import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import { useCookies } from "react-cookie";

export default function OrderUser() {
  const [cookies,_] = useCookies();
  const [orders,setOrders] = useState([]);
  useEffect(() => {
    try{

      const fetchApi = async() => {
        const response = await apiService.getOrder(cookies.tokenUser);
        console.log(response.data);
        if(response.data.code === 200){
          const result = response.data.orders.map(item => {
            return {
              id: item._id,
              date: `${new Date(item.createdAt).getFullYear()}-${(new Date(item.createdAt).getMonth()+1).toString().padStart(0,"2")}-${(new Date(item.createdAt).getDate()+1).toString().padStart(0,"2")}`,
              total: item.products.reduce((total,item) => {
                return ((item.price * item.quantity) + total)
              },0).toFixed(2)

            }
          })
          setOrders(result)
        }
      }
      fetchApi();
    }

    catch(error){
      console.log(error);
    }
  },[cookies.tokenUser])
  console.log(orders);
  return (
    <>
      <div className="card p-4 mb-4">
        <h5 className="mb-3">Đơn hàng gần đây</h5>
        <table className="table table-bordered ">
          <thead>
            <tr className="text-center">
              <th>Mã đơn</th>
              <th>Ngày</th>
              <th>Tổng tiền</th>
              {/* <th>Trạng thái</th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="px-3 py-3">{order.id}</td>
                <td>{order.date}</td>
                <td>{order.total}$</td>
                {/* <td>
                  <span
                    className={`badge ${
                      o.status === "Đã giao"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {o.status}
                  </span>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
