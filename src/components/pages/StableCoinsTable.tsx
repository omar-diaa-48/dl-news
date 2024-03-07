"use client"

import { IPaginationCriteria, ISortCriteria, IStableCoin } from '@/utilities/interfaces'
import React, { useEffect, useState } from 'react'
import Table from '../data/Table'
import { PegMechanismEnum } from '@/utilities/enums'
import TablePaginator from '../data/TablePaginator'

interface Props {
    data: Array<IStableCoin>
}

const StableCoinsTable: React.FC<Props> = ({ data }) => {
    const [searchText, setSearchText] = useState<string>("");
    const [coinsInView, setCoinsInView] = useState<Array<IStableCoin>>([]);
    const [totalFilteredNumberOfRows, setTotalFilteredNumberOfRows] = useState<number>(0)
    const [searchPegMechanism, setSearchPegMechanism] = useState<PegMechanismEnum>(PegMechanismEnum.ALL)
    const [sortCriteria, setSortCriteria] = useState<ISortCriteria<IStableCoin>>({ key: 'price', direction: 'asc' })
    const [paginationCriteria, setPaginationCriteria] = useState<IPaginationCriteria>({ currentPage: 1, rowsPerPage: 10 })

    const getFilteredCoinsList = (pegMechanism: PegMechanismEnum, q?: string) => {
        let filteredList = [...data]

        if (pegMechanism !== PegMechanismEnum.ALL) {
            filteredList = filteredList.filter((row) => row.pegMechanism === pegMechanism)
        }

        if (!q) {
            return filteredList;
        }

        return filteredList.filter((row) => {
            return (
                [row.name.toLocaleLowerCase(), row.symbol.toLocaleLowerCase()].findIndex((key) => key.includes(q.toLocaleLowerCase())) > -1
            ) || (
                    row.chains.map((chain) => chain.toLocaleLowerCase()).includes(q.toLocaleLowerCase())
                )
        })
    }

    const handleSort = (key: keyof IStableCoin) => {
        if (sortCriteria.key === key) {
            setSortCriteria((prevValue) => prevValue.direction === 'asc' ? { ...prevValue, direction: 'desc' } : { ...prevValue, direction: 'asc' });
        } else {
            setSortCriteria({ key, direction: 'asc' })
        }
    };

    const sortData = (list: Array<IStableCoin>) => {
        if (sortCriteria.key === 'chains') {
            return list.sort((a, b) => {
                const factor = sortCriteria.direction === 'asc' ? -1 : 1;
                if (a.chains.length < b.chains.length) return -1 * factor;
                if (a.chains.length > b.chains.length) return 1 * factor;
                return 0;
            })
        }

        if (sortCriteria.key === 'circulating') {
            return list.sort((a, b) => {
                const factor = sortCriteria.direction === 'asc' ? -1 : 1;
                if (a.circulating.peggedUSD < b.circulatingPrevDay.peggedUSD) return -1 * factor;
                if (a.circulating.peggedUSD > b.circulatingPrevDay.peggedUSD) return 1 * factor;
                return 0;
            })
        }

        return list.sort((a, b) => {
            const factor = sortCriteria.direction === 'asc' ? 1 : -1;
            if (a[sortCriteria.key] < b[sortCriteria.key]) return -1 * factor;
            if (a[sortCriteria.key] > b[sortCriteria.key]) return 1 * factor;
            return 0;
        });
    };

    const paginateData = (list: Array<IStableCoin>) => {
        const startIndex = (paginationCriteria.currentPage - 1) * paginationCriteria.rowsPerPage;
        const endIndex = startIndex + paginationCriteria.rowsPerPage;
        return list.slice(startIndex, endIndex);
    };

    const updateTableData = () => {
        const filteredData = getFilteredCoinsList(searchPegMechanism, searchText);
        setTotalFilteredNumberOfRows(filteredData.length)
        const sortedData = sortData(filteredData);
        const paginatedData = paginateData(sortedData);
        setCoinsInView(paginatedData);
    }

    useEffect(() => {
        const timerId = setTimeout(() => {
            updateTableData()
        }, 500);

        return () => {
            clearTimeout(timerId)
        }
    }, [searchPegMechanism, sortCriteria, paginationCriteria, searchText])

    return (
        <div className='my-6 w-1/2'>
            <div className="w-full flex justify-between">
                <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                    {
                        [
                            { type: PegMechanismEnum.ALL, title: 'View All' },
                            { type: PegMechanismEnum.FIAT_BACKED, title: 'Fiat backed' },
                            { type: PegMechanismEnum.CRYPTO_BACKED, title: 'Crypto backend' },
                            { type: PegMechanismEnum.ALGORITHMIC, title: 'Algorithmic' },
                        ].map((peg) => (
                            <button onClick={() => setSearchPegMechanism(peg.type)} key={peg.type} className={`px-5 py-2 text-xs font-medium ${peg.type === searchPegMechanism ? 'text-gray-900' : 'text-gray-400'} transition-colors duration-200 bg-gray-100 sm:text-sm`}>
                                {peg.title}
                            </button>
                        ))
                    }
                </div>

                <div className="relative flex items-center mt-4 md:mt-0">
                    <span className="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </span>

                    <input onChange={(e) => setSearchText(e.target.value)} value={searchText} type="text" placeholder="Search by Name, Symbol or chain" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-600 pl-11 rtl:pr-11 rtl:pl-5 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
            </div>

            <Table columns={[
                { key: 'name', title: 'Name' },
                { key: 'symbol', title: 'Symbol' },
                {
                    key: 'pegType',
                    title: 'Peg Type',
                    render: (_, row) => {
                        return (
                            <span>{row.pegType.replace('pegged', '')}</span>
                        )
                    }
                },
                { key: 'pegMechanism', title: 'Peg Mechanism' },
                {
                    key: 'chains',
                    title: 'Appears In ',
                    render: (_, row) => {
                        return (
                            <span title={`${row.chains.join(', ')}`} className='cursor-pointer'>{row.chains.length} chains</span>
                        )
                    }
                },
                {
                    key: 'price',
                    title: 'Price',
                    render: (_, row) => {
                        return (
                            <span>{row.price} {row.pegType.replace('pegged', '')}</span>
                        )
                    }
                },
                {
                    key: 'circulating',
                    title: 'Circulating',
                    render: (_, row) => {
                        return (
                            <p className='flex flex-col'>
                                <span>Currently {row.circulating.peggedUSD}</span>
                                <span>Yesterday {row.circulatingPrevDay.peggedUSD}</span>
                            </p>
                        )
                    }
                }
            ]}
                data={coinsInView}
                sort={sortCriteria}
                handleSort={handleSort}
            />

            <TablePaginator
                paginationCriteria={paginationCriteria}
                totalNumberOfRows={totalFilteredNumberOfRows}
                handlePagination={(pc) => setPaginationCriteria(pc)}
            />
        </div >
    )
}

export default StableCoinsTable