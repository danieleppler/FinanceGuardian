const expense_repo = require('../reposetories/expense_repo')

const save_new_expense = async (expense) =>{
    await expense_repo.create(expense)
    return
}

module.exports = {save_new_expense}