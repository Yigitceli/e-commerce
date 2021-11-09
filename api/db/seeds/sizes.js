
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sizes').del()
    .then(function () {
      const sizes = ['XS', 'S', 'M', 'L', 'XL']
      const final = []
      // Inserts seed entries
      sizes.forEach(element => {
        final.push({size:element});
        
      });
      return knex('sizes').insert(final);
    });
};
