const createFakeCategoryRelation = (index) => {
  const category = Math.ceil(Math.random() * 10);

  const result = {
    category_id: category,
    product_id: index,
  };

  return result;
};

exports.seed = function (knex) {
  // Deletes ALL existing entries

  const fakeRelation = [];

  for (let i = 1; i <= 30; i++) {
    const randomNumber = Math.ceil(Math.random() * 3);
    for (let k = 0; k < randomNumber; k++) {
      fakeRelation.push(createFakeCategoryRelation(i));
    }
  }

  return knex("categories_products")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("categories_products").insert(fakeRelation);
    });
};
