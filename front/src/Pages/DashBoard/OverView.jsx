import React, { useState } from 'react'
import AddExpense from './AddExpense'

const OverView = () => {

    const [add_expense_popup_visibilty, set_add_expense_popup_visibilty] = useState(false)
    return (
        <>
            <div onClick={() => { set_add_expense_popup_visibilty(true) }} className='general-btn add-expense-button'>+ Add Expense</div>
            {add_expense_popup_visibilty && <AddExpense set_add_expense_popup_visibilty={set_add_expense_popup_visibilty} />}
        </>
    )
}

export default OverView
