import React from 'react'
import ExpenseRow from './ExpenseRow'

const ExpensesList = ({ expenses, set_update_expenses, update_expenses }) => {
    return (
        <div className='flex-container-col expense_list'>
            {expenses?.map((x, index) => {
                return <ExpenseRow set_update_expenses={set_update_expenses} update_expenses={update_expenses} expense_data={x} />
            })}
        </div>
    )
}

export default ExpensesList
