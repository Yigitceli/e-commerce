const createFakeSizeRelation = (index) => {
  const size = Math.ceil(Math.random() * 5);

  const result = {
    size_id: size,
    product_id: index,
  };

  return result;
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("sizes_products")
    .del()
    .then(function () {
      const fakeRelation = [];

      for (let i = 1; i <= 20; i++) {
        const randomNumber = Math.ceil(Math.random() * 3);
        for (let k = 0; k < randomNumber; k++) {
          const relation = createFakeSizeRelation(i);
          !fakeRelation.some((item) => {
            return (
              item.size_id === relation.size_id &&
              item.product_id === relation.product_id
            );
          }) && fakeRelation.push(relation);
        }
      }
      // Inserts seed entries
      return knex("sizes_products").insert(fakeRelation);
    });
};
