import React, { useState } from 'react'
import ExpenseRowActionsMenu from './ExpenseRowActionsMenu'

const ExpenseRow = ({ expense_data, set_update_expenses, update_expenses }) => {
    const [is_row_menu_visibile, set_is_row_menu_visibile] = useState(false)

    const handle_expense_delete = () => {
        //delete the expense using the expense id and trigger expense update
        set_update_expenses(!update_expenses)
    }

    const handle_expense_edit = (is_only_fix) => {
        //trigger edit expense view and enable update option. update with expense id
    }

    return (
        <div className='expense_row'>
            <span style={{ float: 'left' }}>
                <div className='e_row_text'>{expense_data.title}</div>
                <div className='e_row_text e_row_date'>{new Date(expense_data.date).toLocaleDateString()}</div>
            </span>
            <div style={{ float: 'right' }}>
                <span className='e_row_text e_row_amount e_amount' >{expense_data.amount}</span>
                <span onClick={() => { set_is_row_menu_visibile(!is_row_menu_visibile) }} className='three-dots'>
                    {is_row_menu_visibile && <ExpenseRowActionsMenu handle_expense_delete={handle_expense_delete} handle_expense_edit={handle_expense_edit} />}
                </span>
            </div>
        </div>
    )
}

export default ExpenseRow
