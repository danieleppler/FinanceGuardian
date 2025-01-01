import React, { useState } from 'react'

const Filter = ({ data, filter_keys, set_data }) => {

    const [filter_key, set_filter_key] = useState('')

    if (filter_key) {

        set_data(data.filter((x) => {
            return x.key
        }))
    }

    return (
        <div>
            Group by <select onChange={(e) => {
                set_filter_key(e.target.value)
            }}>
                <option value={""}></option>
                {
                    filter_keys.map((x) => {
                        return <option value={x}>{x}</option>
                    })
                }</select>
        </div>
    )
}

export default Filter
