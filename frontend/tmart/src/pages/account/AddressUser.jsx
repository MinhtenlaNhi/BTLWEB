import { useState } from "react";

export default function AddressUser() {
    const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: "Nhà riêng",
      recipient: "Nguyễn Văn A",
      line1: "123 Đường Lớn",
      city: "Hà Nội",
      phone: "+84 912 345 678",
      default: true,
    },
    {
      id: 2,
      title: "Nhà thứ 2",
      recipient: "Nguyễn Văn A",
      line1: "123 Đường Lớn",
      city: "Hà Nội",
      phone: "+84 912 345 678",
      default: false,
    },
  ]);

  return (
    <>
      <div className="card p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Địa chỉ giao hàng</h5>
          <button className="btn btn-primary btn-sm">Thêm địa chỉ</button>
        </div>

        <div className="row g-3">
          {addresses.map((a) => (
            <div className="col-md-6" key={a.id}>
              <div className="border rounded p-3 h-100">
                <h6 className="mb-1">
                  {a.title}{" "}
                  {a.default && (
                    <span className="badge bg-success">Mặc định</span>
                  )}
                </h6>
                <p className="mb-1 small text-muted">
                  {a.recipient} — {a.phone}
                </p>
                <p className="mb-1 small">{a.line1}</p>
                <p className="mb-2 small">{a.city}</p>

                <div className="d-flex gap-2">
                  {!a.default && (
                    <button className="btn btn-outline-secondary btn-sm">
                      Đặt mặc định
                    </button>
                  )}
                  <button className="btn btn-outline-danger btn-sm">Xóa</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
