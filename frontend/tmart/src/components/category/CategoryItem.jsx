import { GrNext } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function CategoryItem({ category }) {
  return (
    <li>
      <div className="sub-menu">
        <Link
          to="/product-list"
          className="text-start text-decoration-none"
        >
          {category.title}
        </Link>
      </div>
    </li>
  );
}
