import React, { useState } from 'react'
import ExpenseRowActionsMenu from './ExpenseRowActionsMenu'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import AddExpense from './AddExpense'
import { icons } from '../../icons'

const ExpenseRow = ({ expense_data, set_update_expenses, update_expenses }) => {
    const [is_row_menu_visibile, set_is_row_menu_visibile] = useState(false)
    const [show_expense_edit_menu,set_show_expense_edit_menu] = useState(false)
    
    const navigate = useNavigate()

    const handle_expense_delete = async () => {
        //delete the expense using the expense id and trigger expense update
        const response = await axios.delete(`${process.env.VITE_SERVER_URL}/expenses/${expense_data.id}`)
        if(response.status == 200)
            set_update_expenses(!update_expenses)
        else navigate('/error')
    }

    const handle_expense_edit = async (is_only_fix) => {
        //trigger edit expense view and enable update option. update with expense id
        if(!is_only_fix)
            set_show_expense_edit_menu(true)
        else{
            await axios.put(`${process.env.VITE_SERVER_URL}/expenses/${expense_data.id}`,{...expense_data,fixed:!expense_data.fixed}).catch(() =>{
                navigator('/error')
            })
            set_update_expenses(!update_expenses)
        }
    }

    return (
        <div className='expense_row'>
            <span style={{ float: 'left' }}>
                <div className='e_row_text'>{expense_data.title}</div>
                <div className='e_row_text e_row_date'>{new Date(expense_data.date).toLocaleDateString()}</div>
            </span>
            <span style={{ float: 'right'}}>
            {expense_data.fixed && <span style={{marginRight:'1vw'}} className='expense_type_icon_bg material-icons'>history</span>} 
                <span style={{marginRight:'1vw'}} title={icons.find((x) => x.label === expense_data.type).label} className='expense_type_icon_bg material-icons'>{icons.find((x) => x.label === expense_data.type).name}</span>    
                <span className='e_row_text e_row_amount e_amount' >{expense_data.amount}</span>
                <span onClick={() => { set_is_row_menu_visibile(!is_row_menu_visibile) }} className='three-dots'>
                    {is_row_menu_visibile && <ExpenseRowActionsMenu handle_expense_delete={handle_expense_delete} handle_expense_edit={handle_expense_edit} />}
                </span>
            </span>
            {show_expense_edit_menu && <AddExpense expense_data={expense_data} set_add_expense_popup_visibilty={set_show_expense_edit_menu} update_expenses={update_expenses} set_update_expenses={set_update_expenses} />}
        </div>
    )
}

export default ExpenseRow
