const { Model } = require("objection");
const knexfile = require("../knexfile");
const Knex = require("knex")(knexfile.development);
const softDelete = require("objection-soft-delete");

Model.knex(Knex);

module.exports = Model;
