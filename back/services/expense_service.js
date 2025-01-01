const expense_repo = require('../reposetories/expense_repo')

const save_new_expense = async (expense) =>{
    await expense_repo.create(expense)
    return
}

const get_expenses_by_user = async (id) =>{
    return await expense_repo.read_by_user_id(id)
}

module.exports = {save_new_expense,get_expenses_by_user}