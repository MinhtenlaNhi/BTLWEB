import { GrNext, GrPrevious } from "react-icons/gr";
import useSearchProduct from "../../hooks/useSearchProduct";
import { useSearchParams } from "react-router";
import { useState, useEffect, useRef } from "react";

export default function Pagination({result}) {
  const [pagination, setPagination] = useState({});
  const pageParam = useRef(0);
  
  useEffect(() => {
    setPagination(result.pagination);
    console.log(result.pagination);
    const url = new URL(window.location.href);
    const page = url.searchParams.get("page");
    if (page) {
      pageParam.current = Number(page);
    } else {
      pageParam.current = 1;
    }
  }, [result]);

  const handleChangePage = (page) => {
    if(page >= 1 && page <= pagination.totalPage){
        const url = new URL(window.location.href);
        url.searchParams.set("page", page);
        window.location.href = url;
    }
    
  };

  console.log(pagination?.totalPage)
  return (
    <>
      {pagination?.totalProduct >
        pagination?.limit && (
        <div className="pagination">
          <GrPrevious className="icon" onClick={() => handleChangePage(pageParam.current - 1)}/>
          {Array.from(
            { length: pagination.totalPage },
            (_, index) => {
              return (
                <span
                  className={
                    pageParam.current == index + 1 ? `page active` : `page`
                  }
                  key={index}
                  onClick={() => handleChangePage(index + 1)}
                >
                  {index + 1}
                </span>
              );
            }
          )}
          <GrNext className="icon" onClick={() => handleChangePage(pageParam.current + 1)}/>
        </div>
      )}
    </>
  )
}
