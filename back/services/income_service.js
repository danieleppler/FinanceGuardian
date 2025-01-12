const income_repo = require("../reposetories/income_repo");

const read_by_user_id = async (id) => {
  const data = await income_repo.read_by_user(id);
  return data.filter((x) => x.fixed);
};

const insert_income = async (income) => {
  await income_repo.add_income(income);
  return;
};

const delete_income = async (id) => {
  await income_repo.delete_income(id);
  return;
};

module.exports = { delete_income, read_by_user_id, insert_income };
