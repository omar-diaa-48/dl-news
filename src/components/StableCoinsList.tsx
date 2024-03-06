"use client"
import { IStableCoins } from '@/utilities/interfaces'
import React from 'react'

interface Props {
    data: Array<IStableCoins>
}

const StableCoinsList: React.FC<Props> = ({ data }) => {
    return (
        <div>
            <h1>Stable Coins List</h1>

            {data.map((row) => (
                <div key={row.id}>
                    <p>{row.name}</p>
                </div>
            ))}
        </div>
    )
}

export default StableCoinsList