"use client"
import { IStableCoin } from '@/utilities/interfaces'
import React from 'react'
import InfiniteMovingCards from './InfiniteMovingCards'
import Table from './Table'

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

            <div className='my-6'>
                <div className="w-full flex justify-between">
                    <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                        <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
                            View all
                        </button>

                        <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                            Monitored
                        </button>

                        <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                            Unmonitored
                        </button>
                    </div>

                    <div className="relative flex items-center mt-4 md:mt-0">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </span>

                        <input type="text" placeholder="Search" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                </div>

                <Table columns={[
                    { key: 'name', title: 'Name' },
                    { key: 'symbol', title: 'Symbol' },
                    { key: 'pegType', title: 'Peg Type' },
                    { key: 'pegMechanism', title: 'Peg Mechanism' },
                    {
                        key: 'chains',
                        title: 'Appears In ',
                        render: (col, row) => {
                            return (
                                <span>{row.chains.length} chains</span>
                            )
                        }
                    },
                    {
                        key: 'price',
                        title: 'Price',
                        render: (col, row) => {
                            return (
                                <span>{row.price} {row.pegType.replace('pegged', '')}</span>
                            )
                        }
                    },
                ]} data={data} />

                <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Page <span className="font-medium text-gray-700 dark:text-gray-100">1 of 10</span>
                    </div>

                    <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                        <a href="#" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>

                            <span>
                                previous
                            </span>
                        </a>

                        <a href="#" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                            <span>
                                Next
                            </span>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default StableCoinsList