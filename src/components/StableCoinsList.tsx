"use client"

import { IStableCoin } from '@/utilities/interfaces'
import React from 'react'
import InfiniteMovingCards from './InfiniteMovingCards'
import StableCoinsTable from './StableCoinsTable'

interface Props {
    data: Array<IStableCoin>
}

const StableCoinsList: React.FC<Props> = ({ data }) => {
    return (
        <React.Fragment>
            <InfiniteMovingCards
                items={data}
                renderItem={(item: IStableCoin) => {
                    return (
                        <p
                            className="text-black"
                            key={item.id}
                        >
                            <span>
                                {item.symbol}   {item.price > 0 && <b>{item.price} {item.pegType.replace('pegged', '')}</b>}
                            </span>
                        </p>
                    )
                }}
            />

            <StableCoinsTable data={data} />
        </React.Fragment>
    )
}

export default StableCoinsList