"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { Product } from "@/types/product";

// Hardcoded product data
const products: Product[] = [
  {
    id: "1",
    title: "Stoneware Espresso Set",
    price: 48,
    description:
      "A signature piece from our latest firing. This speckled clay bowl features a raw exterior and a hand-applied translucent white glaze on the interior, allowing the natural character of the minerals to shine through.",
    category: "SHOP / TABLEWARE",
    finish: "Matte white glaze",
    dimensions: '8" W x 6" H',
    mainImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKCI_1NW9gyQvvZ7I7kk940Rgg4jCgsUcwQDzvYfwR6HKBkc_xJ8U76mfN8aZWXbT8KHZ2R4acWtyLUt59K0FwRSBhiTMD12pHKKssLCQCBixHkd0uNv6xx6hz766COUI6muoaviAiYmI0-3FK1N4Hv9HwtTqZ9KKVQWBgz0qiLI49_-jplixy832dySum_B_NYDvNfCA4itb_Bf7T3JB7AZuLEnYZjrmRhIAWb7RPflb44-retl_TfPVY9yJ5p9hJFL7bwDnmXcQ",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKCI_1NW9gyQvvZ7I7kk940Rgg4jCgsUcwQDzvYfwR6HKBkc_xJ8U76mfN8aZWXbT8KHZ2R4acWtyLUt59K0FwRSBhiTMD12pHKKssLCQCBixHkd0uNv6xx6hz766COUI6muoaviAiYmI0-3FK1N4Hv9HwtTqZ9KKVQWBgz0qiLI49_-jplixy832dySum_B_NYDvNfCA4itb_Bf7T3JB7AZuLEnYZjrmRhIAWb7RPflb44-retl_TfPVY9yJ5p9hJFL7bwDnmXcQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAZSrJciI1PXGQxGcd5tIAa-wHk1vT6Z079YF29dRlrwqhI8SXYDe6BhAgtCUF_P6sTv2QqEjvsBUNfb82Voc9XY1l5MnFz3oDAfGEyfHaFyoZ6fcTmF-mlMViaohXnn5D3RkjQEmEUDK8EncVLcwXLsTxeSEMbILhTEqEpqazoAY6K76fPbO0wkeCcU6N2BeKw6VDPm14HUoRGI-F-y5RBU67nsBNVJ4zfa98QWZdILpBM-8XXRpDX6MCDFZJGaNDP8qc_TlGVwQs",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTxRpnfKyAPkHwHJ44rDKKl3-OinSPMmTj9FH3LBx4N443yyWU93aCry5nwR1jqNpizoWo2Z3La_HTiyBRDWR7zCtEV7Ma-tqxBKxcI3g97o7scQu7mrEXVzNSxevobNL-u7FTqRAWJ5GsmZwJS2ltXTWMTzexVFqKBaQFJ2tS0M4Acameok5IyF1iCDZXBItp1QjvIM4gVtUJKLrDtJ-XEsXix3IOhSzLAgMAwYvUj0ybuVI37NElYvJsxWagHDg1nzo6RX62zTc",
    ],
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKCI_1NW9gyQvvZ7I7kk940Rgg4jCgsUcwQDzvYfwR6HKBkc_xJ8U76mfN8aZWXbT8KHZ2R4acWtyLUt59K0FwRSBhiTMD12pHKKssLCQCBixHkd0uNv6xx6hz766COUI6muoaviAiYmI0-3FK1N4Hv9HwtTqZ9KKVQWBgz0qiLI49_-jplixy832dySum_B_NYDvNfCA4itb_Bf7T3JB7AZuLEnYZjrmRhIAWb7RPflb44-retl_TfPVY9yJ5p9hJFL7bwDnmXcQ",
  },
  {
    id: "2",
    title: "Rustic Serving Bowl",
    price: 85,
    description:
      "A signature piece from our latest firing. This speckled clay bowl features a raw exterior and a hand-applied translucent white glaze on the interior, allowing the natural character of the minerals to shine through.",
    category: "SHOP / TABLEWARE",
    finish: "Speckled Matte",
    dimensions: '10" W x 4" H',
    mainImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0Wwmkkl62kGIKXDPRcx78zz0q6hvAqhyaVBleDpZwnWnmEoGDwRN5IzwEX26fIF9CVX8srHlpuFWWyyG5zv31Va6ip-kkrlL54qeBVb_SeubTFYoxRXTqHUaspoMae1djAZRkSbvAXqUUUmGkXK5rhZObNiwU1TDGJH3dfETChpquZLuF1zTiTlaesUgZwjGlj_vkdAFvIfJaXW7RMYm2qvM_imHFlJHtueyK0ikAQPs-qmoK_GWfT0Gs1m9iXmyMx3DHV425E5U",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-3aC_PiOjsZQbqgdBapBjVApCXVKVod0z9C6pGCDnjk2RA-9eIg0fLLJWlKPi1LM5ZtTll63ye8GO7DrywIWzyuiao7GNQgktkPTu5icXKT50mgrCN4G4vthyT2Bmt5zyva9fvFhwEHqrdoxxsgYhLiJXcbxadwVRq9Bx8zC0NA63mxdZ5ZzZSgwPS7XZZGGoZaL6YN74RvoojRe9wYobFiDxsbxFKveXR6WbWqGUM9HtyxevlHIAqaSiSR1Qd0R0H3olbQwa4bo",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAZSrJciI1PXGQxGcd5tIAa-wHk1vT6Z079YF29dRlrwqhI8SXYDe6BhAgtCUF_P6sTv2QqEjvsBUNfb82Voc9XY1l5MnFz3oDAfGEyfHaFyoZ6fcTmF-mlMViaohXnn5D3RkjQEmEUDK8EncVLcwXLsTxeSEMbILhTEqEpqazoAY6K76fPbO0wkeCcU6N2BeKw6VDPm14HUoRGI-F-y5RBU67nsBNVJ4zfa98QWZdILpBM-8XXRpDX6MCDFZJGaNDP8qc_TlGVwQs",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTxRpnfKyAPkHwHJ44rDKKl3-OinSPMmTj9FH3LBx4N443yyWU93aCry5nwR1jqNpizoWo2Z3La_HTiyBRDWR7zCtEV7Ma-tqxBKxcI3g97o7scQu7mrEXVzNSxevobNL-u7FTqRAWJ5GsmZwJS2ltXTWMTzexVFqKBaQFJ2tS0M4Acameok5IyF1iCDZXBItp1QjvIM4gVtUJKLrDtJ-XEsXix3IOhSzLAgMAwYvUj0ybuVI37NElYvJsxWagHDg1nzo6RX62zTc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC373eLEKEBT982oJeO8Y3_8MzyFpXmCDNyAgLQor57kLUDJDf6xieUiJRTZBV72KDrM58D0qaJSv5v9sLzPrrLqxlj7wyZk7HGD-xavTYAjsUkkH6ueXZiSQe_B_6di1Y_-T-tJlOTLo5EuIqTlcVutaZhJ3z0xeawCpcsdZkV6b-wKdc6z8E6OQc5JseH3S8D9NRDOvuopzhU9yibBFlBY2lVGlL98PQSQiQ_vg-KKrOTZekvSCnOmmDfxBpVjreUSD5z_KKosqQ",
    ],
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0Wwmkkl62kGIKXDPRcx78zz0q6hvAqhyaVBleDpZwnWnmEoGDwRN5IzwEX26fIF9CVX8srHlpuFWWyyG5zv31Va6ip-kkrlL54qeBVb_SeubTFYoxRXTqHUaspoMae1djAZRkSbvAXqUUUmGkXK5rhZObNiwU1TDGJH3dfETChpquZLuF1zTiTlaesUgZwjGlj_vkdAFvIfJaXW7RMYm2qvM_imHFlJHtueyK0ikAQPs-qmoK_GWfT0Gs1m9iXmyMx3DHV425E5U",
  },
  {
    id: "3",
    title: "Minimalist Bud Vase",
    price: 32,
    description:
      "A signature piece from our latest firing. This speckled clay bowl features a raw exterior and a hand-applied translucent white glaze on the interior, allowing the natural character of the minerals to shine through.",
    category: "SHOP / VASES",
    finish: "Charcoal finish",
    dimensions: '6" W x 8" H',
    mainImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDjO2yRsHjS-xr1bWwVAKnCr2bHLeQaw3h5jfMX2EV4oPjhDXS8nk2ktXN4L1ouFXXo0_KzUJsliAz2g25oAwBf0EZSYi8C-QOqNcmsjP7cJqijnqyRcFYfDi8k9c-l3qy6V_zXv4O04UZD0z7tlNCIhZ7Ul-Z6dd5LGLNIGwWsmUshLluuO8XIAdlukLLmMYvkYeLK_mqys1IUEWa2vUBhew043FYS9AXhuECEzn3JIBzIRLeYppQL4t6TnKCzBp-FlnsEMPfBW4",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDjO2yRsHjS-xr1bWwVAKnCr2bHLeQaw3h5jfMX2EV4oPjhDXS8nk2ktXN4L1ouFXXo0_KzUJsliAz2g25oAwBf0EZSYi8C-QOqNcmsjP7cJqijnqyRcFYfDi8k9c-l3qy6V_zXv4O04UZD0z7tlNCIhZ7Ul-Z6dd5LGLNIGwWsmUshLluuO8XIAdlukLLmMYvkYeLK_mqys1IUEWa2vUBhew043FYS9AXhuECEzn3JIBzIRLeYppQL4t6TnKCzBp-FlnsEMPfBW4",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAZSrJciI1PXGQxGcd5tIAa-wHk1vT6Z079YF29dRlrwqhI8SXYDe6BhAgtCUF_P6sTv2QqEjvsBUNfb82Voc9XY1l5MnFz3oDAfGEyfHaFyoZ6fcTmF-mlMViaohXnn5D3RkjQEmEUDK8EncVLcwXLsTxeSEMbILhTEqEpqazoAY6K76fPbO0wkeCcU6N2BeKw6VDPm14HUoRGI-F-y5RBU67nsBNVJ4zfa98QWZdILpBM-8XXRpDX6MCDFZJGaNDP8qc_TlGVwQs",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTxRpnfKyAPkHwHJ44rDKKl3-OinSPMmTj9FH3LBx4N443yyWU93aCry5nwR1jqNpizoWo2Z3La_HTiyBRDWR7zCtEV7Ma-tqxBKxcI3g97o7scQu7mrEXVzNSxevobNL-u7FTqRAWJ5GsmZwJS2ltXTWMTzexVFqKBaQFJ2tS0M4Acameok5IyF1iCDZXBItp1QjvIM4gVtUJKLrDtJ-XEsXix3IOhSzLAgMAwYvUj0ybuVI37NElYvJsxWagHDg1nzo6RX62zTc",
    ],
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDjO2yRsHjS-xr1bWwVAKnCr2bHLeQaw3h5jfMX2EV4oPjhDXS8nk2ktXN4L1ouFXXo0_KzUJsliAz2g25oAwBf0EZSYi8C-QOqNcmsjP7cJqijnqyRcFYfDi8k9c-l3qy6V_zXv4O04UZD0z7tlNCIhZ7Ul-Z6dd5LGLNIGwWsmUshLluuO8XIAdlukLLmMYvkYeLK_mqys1IUEWa2vUBhew043FYS9AXhuECEzn3JIBzIRLeYppQL4t6TnKCzBp-FlnsEMPfBW4",
  },
];

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
        />
      )}
    </>
  );
}
