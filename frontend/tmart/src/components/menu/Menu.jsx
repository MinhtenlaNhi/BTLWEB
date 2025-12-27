import { GrDown, GrUp } from "react-icons/gr";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import "../../../public/style/style.css";
import CategoryItem from "../category/CategoryItem";
import { Link } from "react-router";

export default function Menu({ childCategory }) {
  console.log(childCategory);
  const [categories, setCategories] = useState(
    childCategory ? childCategory : []
  );
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await apiService.getAllProductCategories();
        console.log("Danh mục sách:", res.data);
        if (res.data.code === 200 && !childCategory) {
          setCategories(res.data.treeCategory);
        }
      } catch (error) {
        console.log("Lỗi khi tải danh mục", error);
      }
    };
    fetchApi();
  }, [childCategory]);
  const handleToggle = (id) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <>
      {categories && categories.length > 0 && (
        <ul className="list-menu">
          {categories.map((item, index) => {
            return (
              <li key={index}>
                <div className="menu d-flex align-items-center justify-content-between">
                  <Link to={`${item.title}`} className="text-success">{item.title}</Link>
                  {openCategories[item._id] ? (
                    <GrUp
                      className="icon-up cursor-pointer"
                      onClick={() => handleToggle(item._id)}
                    />
                  ) : (
                    <GrDown
                      className="icon-down cursor-pointer"
                      onClick={() => handleToggle(item._id)}
                    />
                  )}
                </div>
                    
                      
                <div
                  className={`list-sub-category ${
                    openCategories[item._id] ? "" : "d-none"
                  }`}
                >
                  <ul>
                    <li>
                      <Menu childCategory={item.children} />
                    </li>
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
