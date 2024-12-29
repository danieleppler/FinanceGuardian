
//users
const INSERT_USER_QUERY = 'INSERT INTO USERS (id,first_name,last_name,age,user_name,password) VALUES ($1,$2,$3,$4,$5,$6)'
const SELECT_ALL_USERS_QUERY = 'SELECT * FROM USERS'
const SELECT_USER_BY_USERNAME_QUERY = 'SELECT * FROM USERS WHERE user_name = $1 FETCH FIRST 1 ROWS ONLY'

//expenses
const INSERT_EXPENSE_QUERY = 'INSERT INTO "Expenses" (id,type,title,date,amount,fixed,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7)'

module.exports= {INSERT_USER_QUERY,SELECT_USER_BY_USERNAME_QUERY,SELECT_ALL_USERS_QUERY,INSERT_EXPENSE_QUERY}