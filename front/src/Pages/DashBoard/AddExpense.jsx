import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Contexts/AuthContext'

const AddExpense = ({ update_expenses, set_update_expenses, set_add_expense_popup_visibilty }) => {

    const { user } = useAuth()



    const available_icons = [{ name: 'restaurant', label: 'food' }, { name: 'home', label: 'rent' }, { name: 'directions_car', label: 'car' },
    { name: 'gpp_maybe', label: 'insurance' }, { name: 'medical_services', label: 'medical' },
    { name: 'sentiment_very_satisfied', label: 'entertainment' },
    { name: 'help_outline', label: 'other' }
    ]



    const handle_submit = async (e) => {
        e.preventDefault()

        const f_data = new FormData(e.target)
        const response = await axios.post(`${process.env.VITE_SERVER_URL}/expenses`, {
            type: f_data.get('e_type')
            , title: f_data.get('e_title'),
            date: f_data.get('e_date'),
            amount: f_data.get('e_amount'),
            fixed: f_data.get('e_reoccurance_flag') ? true : false,
            user_id: user.id
        })
        if (response.status === 201) {
            set_update_expenses(!update_expenses)
            set_add_expense_popup_visibilty(false)
        }
        else
            alert('something went wrong, plase try again later')
    }

    return (
        <div className='add_expense_popup_container'>
            <form onSubmit={handle_submit}>
                Expense type :
                <div className='flexbox-container-row'>
                    {
                        available_icons.map((x, index) => {
                            return <><input type='radio' name='e_type' value={x.label} />
                                <span key={index} title={x.label} className='expense_type_icon_bg material-icons'>{x.name}</span></>
                        })
                    }
                </div>

                <br></br>
                Expense title : <input required type='text' name='e_title'></input>
                Expense date : <input required type='date' name='e_date'></input>
                <span className='e_amount'>Expense amount :<br /> <input min='0' required type='number' name='e_amount' /></span>
                <div>
                    check if this is a re-occurring expense <input name='e_reoccurance_flag' type='checkbox'></input>
                    <span title='re-occuring expenses is later on will be calculted in the total expense forecast each month' className='material-icons'>{'help_outline'}</span>
                </div>
                <div>
                    <button className='general-btn' type='submit'>add</button>
                    <button className='general-btn' onClick={() => { set_add_expense_popup_visibilty(false) }}>cancel</button>
                </div>
            </form >
        </div >
    )
}

export default AddExpense
