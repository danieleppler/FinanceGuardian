
//users
const INSERT_USER_QUERY = 'INSERT INTO "Users" (id,first_name,last_name,age,user_name,password) VALUES ($1,$2,$3,$4,$5,$6)'
const SELECT_ALL_USERS_QUERY = 'SELECT * FROM "Users"'
const SELECT_USER_BY_USERNAME_QUERY = 'SELECT * FROM "Users" WHERE user_name = $1 FETCH FIRST 1 ROWS ONLY'

//expenses
const INSERT_EXPENSE_QUERY = 'INSERT INTO "Expenses" (id,type,title,date,amount,fixed,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7)'
const SELECT_EXPENSES_BY_USER_ID_QUERY = 'SELECT * FROM "Expenses" WHERE user_id = $1'
const DELETE_EXPENSE_QUERY  = 'DELETE FROM "Expenses" WHERE id = $1'
const UPDATE_EXPENSE_QUERY = 'UPDATE "Expenses" SET type = $2 , title =$3 , date = $4 , amount = $5 , fixed = $6 , user_id = $7 WHERE id = $1'

module.exports= {INSERT_USER_QUERY,SELECT_USER_BY_USERNAME_QUERY,SELECT_ALL_USERS_QUERY,INSERT_EXPENSE_QUERY,SELECT_EXPENSES_BY_USER_ID_QUERY,DELETE_EXPENSE_QUERY,UPDATE_EXPENSE_QUERY}