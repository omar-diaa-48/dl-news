"use client"
import { IStableCoin } from '@/utilities/interfaces'
import React from 'react'
import InfiniteMovingCards from './InfiniteMovingCards'

interface Props {
    data: Array<IStableCoin>
}

const StableCoinsList: React.FC<Props> = ({ data }) => {
    return (
        <React.Fragment>
            <h1>Stable Coins List</h1>

            <InfiniteMovingCards
                items={data}
                renderItem={(item: IStableCoin) => {
                    return (
                        <p
                            className="text-black"
                            key={item.symbol}
                        >
                            <span>
                                {item.symbol}   {item.price > 0 && <b>{item.price} {item.pegType.replace('pegged', '')}</b>}
                            </span>
                        </p>
                    )
                }}
            />
        </React.Fragment>
    )
}

export default StableCoinsList