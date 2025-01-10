import React from 'react'

const ExpenseRowActionsMenu = ({ handle_expense_delete, handle_expense_edit }) => {
    return (
        <div className='row_menu'>
            <div onClick={() => { handle_expense_edit(false) }} className='expense_row_action_item bottom_dash'>EDIT</div>
            <div onClick={ handle_expense_delete } className='expense_row_action_item bottom_dash'>DELETE</div>
            <div onClick={() => { handle_expense_edit(true) }} className='expense_row_action_item'> TOGGLE FIXED</div>
        </div >
    )
}

export default ExpenseRowActionsMenu
