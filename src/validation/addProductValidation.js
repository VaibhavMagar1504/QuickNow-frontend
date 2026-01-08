export const validateProductForm = (data, imageFile) => {
  const errors = {};

  // NAME
  const nameRegex = /^[A-Za-z0-9 ]{3,}$/;
  if (!data.name.trim()) {
    errors.name = "Product name is required";
  } else if (!nameRegex.test(data.name)) {
    errors.name = "Name must be at least 3 characters (letters & numbers only)";
  }

  // DESCRIPTION
  if (!data.desc.trim()) {
    errors.desc = "Description is required";
  } else if (data.desc.length < 10) {
    errors.desc = "Description must be at least 10 characters";
  }

  // BRAND
  const brandRegex = /^[A-Za-z ]+$/;
  if (data.brand && !brandRegex.test(data.brand)) {
    errors.brand = "Brand must contain only alphabets";
  }

  // PRICE
  if (!data.price) {
    errors.price = "Price is required";
  } else if (data.price <= 0) {
    errors.price = "Price must be greater than 0";
  }

  // CATEGORY
  const categoryRegex = /^[A-Za-z ]+$/;
  if (data.category && !categoryRegex.test(data.category)) {
    errors.category = "Category must contain only alphabets";
  }

  // RELEASE DATE
  if (data.releaseDate) {
    const today = new Date();
    const selected = new Date(data.releaseDate);
    if (selected > today) {
      errors.releaseDate = "Release date cannot be in the future";
    }
  }

  // QUANTITY
  if (!data.quantity) {
    errors.quantity = "Quantity is required";
  } else if (data.quantity <= 0) {
    errors.quantity = "Quantity must be at least 1";
  }

  // IMAGE
  if (!imageFile) {
    errors.image = "Product image is required";
  } else {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(imageFile.type)) {
      errors.image = "Only JPG, PNG, or WEBP images allowed";
    }
    if (imageFile.size > 2 * 1024 * 1024) {
      errors.image = "Image size must be less than 2MB";
    }
  }

  return errors;
};
