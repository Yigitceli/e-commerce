const createFakeColorRelation = (index) => {
  const color = Math.ceil(Math.random() * 10);

  const result = {
    color_id: color,
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
      fakeRelation.push(createFakeColorRelation(i));
    }
  }

  return knex("colors_products")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("colors_products").insert(fakeRelation);
    });
};
