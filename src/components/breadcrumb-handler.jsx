import { useEffect, useRef } from "react";
import { usePage } from "../providers/pageProvider";

const BreadcrumbHandler = ({ children }) => {
  const ref = useRef();
  const { currentPage, setCurrentPage } = usePage();

  useEffect(() => {
    const handleClick = (event) => {
      event.preventDefault();

      const anchor = event.target.closest("a");

      if (anchor) {
        const href = anchor.getAttribute("href");
        setCurrentPage(href);
      }
    };

    const breadcrumbContainer = ref.current;

    setTimeout(() => {
      if (breadcrumbContainer) {
        const breadcrumbItems = document.querySelectorAll("a");

        // Add event listener to each anchor

        breadcrumbItems.forEach((item) => {
          item.removeEventListener("click", handleClick);
          item.addEventListener("click", handleClick);
        });

        // Cleanup event listeners on unmount
        return () => {
          breadcrumbItems.forEach((item) => {
            item.removeEventListener("click", handleClick);
          });
        };
      }
    }, 10);
  }, [currentPage]);

  return <div ref={ref}>{children}</div>;
};

export default BreadcrumbHandler;
