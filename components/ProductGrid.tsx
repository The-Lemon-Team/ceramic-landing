"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { ProductModal } from "@/ui-lib";
import { Product } from "@/types/product";
import { products } from "@/data/products";

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onImageClick={handleImageClick}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          variant="shop"
        />
      )}
    </>
  );
}
