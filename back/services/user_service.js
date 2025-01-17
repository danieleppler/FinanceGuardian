const user_repo = require("../reposetories/user_repo");

const get_user_by_username = async (username) => {
  return await user_repo.get_user_by_username(username);
};

const update_user = async (user) => {
  await user_repo.update_user(user);
  return;
};

module.exports = { get_user_by_username, update_user };
