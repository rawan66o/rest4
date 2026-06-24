import React, { useEffect, useState } from "react";

import ProductCard from "./ProductCard";

const ProductsSection = () => {
  // =========================
  // States
  // =========================

  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);

  const [activeCategory, setActiveCategory] = useState("");

  // =========================
  // Get Categories
  // =========================

  useEffect(() => {
    fetch("https://menu.teknova-sy.com/api/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("Categories:", data);

        const categoriesData = data.data || data;

        setCategories(categoriesData);

        if (categoriesData.length > 0) {
          setActiveCategory(categoriesData[0].name);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // =========================
  // Get Products
  // =========================

  useEffect(() => {
    fetch("https://menu.teknova-sy.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Products:", data);

        const productsData = data.data || data;

        setProducts(productsData);
      })
      .catch((err) => console.log(err));
  }, []);

  // =========================
  // Filter Products
  // =========================

  const filteredProducts = products.filter((product) => {
    const selectedCategory = categories.find(
      (cat) => cat.name === activeCategory,
    );

    return Number(product.category_id) === Number(selectedCategory?.id);
  });
  // =========================
  // Loading
  // =========================

  if (!categories.length) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <section
      style={{
        padding: "40px 20px",
        background: "#f5f5f5",
      }}
    >
      {/* ========================= */}
      {/* العنوان */}
      {/* ========================= */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        <h2
          style={{
            position: "relative",
            display: "inline-block",
            fontSize: "clamp(26px, 4vw, 35px)",
            fontWeight: "600",
            color: "rgba(47, 42, 37, 1)",
          }}
        >
          الأصناف
          <span
            style={{
              position: "absolute",
              top: "-20px",
              right: "-30px",
              width: "120px",
              height: "80px",
              borderTop: "4px solid #F59E0B",
              borderRight: "6px solid #F59E0B",
              borderRadius: "50%",
              transform: "rotate(17deg)",
              opacity: "0.9",
            }}
          ></span>
        </h2>
      </div>

      {/* ========================= */}
      {/* الأقسام */}
      {/* ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginBottom: "60px",
          alignItems: "flex-end",
          flexWrap: "wrap",
        }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;

          return (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              style={{
                cursor: "pointer",
                textAlign: "center",
                position: "relative",
                transition: "0.3s",
              }}
            >
              {isActive ? (
                // =========================
                // Active Category
                // =========================

                <div
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(254, 148, 42, 0.1), rgba(254, 148, 42, 1))",
                    borderRadius: "20px",
                    padding: "45px 15px 18px",
                    width: "130px",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <img
                    src={
                      cat.image_url?.startsWith("http")
                        ? cat.image_url
                        : `https://menu.teknova-sy.com/${cat.image_url}`
                    }
                    alt={cat.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      position: "absolute",
                      top: "-35px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      objectFit: "cover",
                      border: "4px solid white",
                    }}
                  />

                  <p
                    style={{
                      color: "#fff",
                      marginTop: "30px",
                      fontWeight: "600",
                    }}
                  >
                    {cat.name}
                  </p>

                  <span
                    style={{
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  >
                    {cat.products_count || 24} صنف
                  </span>
                </div>
              ) : (
                // =========================
                // Normal Category
                // =========================

                <div>
                  <img
                    src={
                      cat.image_url?.startsWith("http")
                        ? cat.image_url
                        : `https://menu.teknova-sy.com/${cat.image_url}`
                    }
                    alt={cat.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />

                  <p
                    style={{
                      marginTop: "10px",
                      fontWeight: "500",
                    }}
                  >
                    {cat.name}
                  </p>

                  <span
                    style={{
                      fontSize: "12px",
                      color: "#777",
                    }}
                  >
                    {cat.products_count} صنف
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ========================= */}
      {/* المنتجات */}
      {/* ========================= */}

      <div
        style={{
         display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",            
    padding: "20px 0",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,

              image: product.image_url || "https://via.placeholder.com/300",

              category: activeCategory,

              price: product.price,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
