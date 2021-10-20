export const getCategories = (DATA) => {
  let categories = [];
  DATA["data"].forEach((el) => {
    categories.push(el.category);
  });
  return categories;
};
