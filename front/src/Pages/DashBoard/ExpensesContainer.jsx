import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Contexts/AuthContext'
import ExpensesList from './ExpensesList'
import axios from 'axios'

const ExpensesContainer = ({ update_expenses, set_update_expenses }) => {

    const { user } = useAuth()
    const [expenses, set_expenses] = useState([])

    let base_expenses = []

    let sub_total = 0

    if (expenses.length > 0) {
        sub_total = expenses.reduce((acc, x) => {
            return acc += Number(x.amount)
        }, 0)
    }

    useEffect(() => {
        const fetchData = async () => {
            const respons = await axios.get(`${process.env.VITE_SERVER_URL}/expenses/${user.id}`)
            if (respons.status === 200) {
                set_expenses(respons.data)
                base_expenses = respons.data
            }
        }
        if (user)
            fetchData()
    }, [user, update_expenses])

    return (
        <>
            <ExpensesList set_update_expenses={set_update_expenses} update_expenses={update_expenses} expenses={expenses} />
            <div className='e_row_text expense_row subtotal_amount '>
                <div style={{ float: 'left' }}>SubTotal for {new Date().toLocaleDateString('default', { month: 'long' })} :</div>
                <div className="e_amount" style={{ float: 'right' }}>{sub_total}</div>
            </div>

        </>
    )
}




export default ExpensesContainer
