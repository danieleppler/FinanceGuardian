const db_client = require("../db_client");
const utils = require("../utils");

const {
  SELECT_INCOME_BY_USER_ID_QUERY,
  INSERT_INCOME_QUERY,
  DELETE_INCOME_QUERY,
} = require("../Queries");

const read_by_user = async (id) => {
  return await db_client.query(SELECT_INCOME_BY_USER_ID_QUERY, [id]);
};

const add_income = async (income) => {
  const id = utils.CreateUID();
  const { type, title, date, amount, fixed, user_id } = income;
  return await db_client.query(INSERT_INCOME_QUERY, [
    id,
    type,
    title,
    date,
    amount,
    fixed,
    user_id,
  ]);
};

const delete_income = async (id) => {
  return await db_client.query(DELETE_INCOME_QUERY, [id]);
};

module.exports = { delete_income, read_by_user, add_income, add_income };
