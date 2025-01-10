const income_repo = require("../reposetories/income_repo");

const read_by_user_id = async (id) => {
  const data = await income_repo.read_by_user(id);
  return data.filter((x) => x.fixed);
};

const insert_income = async (income) => {
  await income_repo.add_income(income);
  return;
};

module.exports = { read_by_user_id, insert_income };
