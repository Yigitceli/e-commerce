const createFakeColorRelation = (index) => {
  const color = Math.ceil(Math.random() * 3);

  const result = {
    color_id: color,
    product_id: index,
  };

  return result;
};

exports.seed = function (knex) {
  // Deletes ALL existing entries

  const fakeRelation = [];

  for (let i = 1; i <= 20; i++) {
    const randomNumber = Math.ceil(Math.random() * 4);
    for (let k = 0; k < randomNumber; k++) {
      const relation = createFakeColorRelation(i);
      !fakeRelation.some((item) => {
        return (
          item.color_id === relation.color_id &&
          item.product_id === relation.product_id
        );
      }) && fakeRelation.push(relation);
    }
  }

  return knex("colors_products")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("colors_products").insert(fakeRelation);
    });
};
