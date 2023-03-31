import React, { useState, useEffect } from "react";

function ProductViewModal({ sizes, product, handleClose }) {
  const [selectedImage, setSelectedImage] = useState(
    product.colors[0].images[0]
  );

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState({});

  useEffect(() => {
    setSelectedImage(selectedColor.images[0]);
    setSelectedSize(null);
  }, [selectedColor]);

  useEffect(() => {
    function listener(e) {
      if (e.code === "Escape") {
        handleClose();
      }
    }

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white overflow-y-auto">
      <div className="p-8 w-full min-h-full relative">
        <div
        // className="p-8 w-[500px] bg-white rounded-lg cursor-default shadow-xl"
        // onClick={(e) => e.stopPropagation()}
        >
          <div className="container mx-auto p-8 xl:max-w-screen-xl space-y-8">
            <button
              className="text-blue-500 hover:text-blue-600"
              onClick={handleClose}
            >
              Вернуться
            </button>
            <img src={selectedImage} alt="" className="w-96" />
            <div className="space-x-4">
              {selectedColor.images.map((image, index) => (
                <button
                  key={index}
                  className={[
                    "p-2 border",
                    selectedImage === image
                      ? "border-blue-600"
                      : "border-gray-300",
                  ].join(" ")}
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image} alt="" className="w-16" />
                </button>
              ))}
            </div>
            <div className="flex space-x-4">
              {product.colors.map((color) => (
                <div key={color.id} className="">
                  <div className="">
                    <button
                      className={[
                        "p-2 border",
                        selectedColor === color
                          ? "border-blue-600"
                          : "border-gray-300",
                      ].join(" ")}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-4">
              {sizes.map((size) =>
                selectedColor.sizes.includes(size.id) ? (
                  <button
                    key={size.id}
                    className={[
                      "p-2 border",
                      selectedSize === size
                        ? "border-blue-600"
                        : "border-gray-300",
                    ].join(" ")}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.label} ({size.number})
                  </button>
                ) : (
                  <button
                    key={size.id}
                    className="border border-gray-300 p-2 opacity-25"
                    disabled
                  >
                    {size.label} ({size.number})
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductViewModal;
