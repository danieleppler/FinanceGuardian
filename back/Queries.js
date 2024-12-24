const INSERT_USER_QUERY = 'INSERT INTO USERS (id,first_name,last_name,age,user_name,password) VALUES ($1,$2,$3,$4,$5,$6)'
const SELECT_ALL_USERS_QUERY = ''
const SELECT_USER_BY_USERNAME_QUERY = 'SELECT * FROM USERS WHERE user_name = $1'

module.exports= {INSERT_USER_QUERY,SELECT_USER_BY_USERNAME_QUERY}