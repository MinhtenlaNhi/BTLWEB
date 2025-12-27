import "./Account.css";
import { Link, Outlet } from "react-router";
import useInfoUser from "../../hooks/useInfoUser";

export default function Account() {
  const {infoUser} = useInfoUser();

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Sidebar */}
        <aside className="col-lg-3">
          <div className="card p-3 mb-3">
            <div className="d-flex align-items-center">
              <div className="inner-avartar">
                <img src={infoUser.avartar} />
              </div>
              <div className="ms-3">
                <h6 className="mb-1">{infoUser.name}</h6>
                <p className="mb-0 small text-muted">{infoUser.email}</p>
                <p className="mb-0 small text-muted">{infoUser.phone}</p>
              </div>
            </div>

            <hr />

            <div className="list-group">
              <Link
                to="/account/user"
                className="list-group-item list-group-item-action"
              >
                Hồ sơ cá nhân
              </Link>
              <Link
                to="/account/order"
                className="list-group-item list-group-item-action"
              >
                Đơn hàng
              </Link>
              <Link
                to="/account/address"
                className="list-group-item list-group-item-action"
              >
                Địa chỉ
              </Link>
              <Link
                to="/account/setting"
                className="list-group-item list-group-item-action"
              >
                Cài đặt
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="col-lg-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
