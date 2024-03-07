import { IPaginationCriteria } from '@/utilities/interfaces'
import React from 'react'

interface Props {
    handlePagination: (paginationCriteria: IPaginationCriteria) => void;
    paginationCriteria: IPaginationCriteria
    totalNumberOfRows: number;
}

const TablePaginator: React.FC<Props> = ({ handlePagination, paginationCriteria, totalNumberOfRows }) => {
    const handlePaginationChange = (paginationCriteria: IPaginationCriteria) => {
        handlePagination(paginationCriteria)
    }

    return (
        <div className="mt-6 sm:flex sm:items-center sm:justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
                Page <span className="font-medium text-gray-700">{paginationCriteria.currentPage} of {Math.ceil(totalNumberOfRows / paginationCriteria.rowsPerPage)}</span>
            </div>

            <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                <button onClick={() => handlePaginationChange({ ...paginationCriteria, currentPage: paginationCriteria.currentPage - 1 })} disabled={paginationCriteria.currentPage === 1} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 disabled:cursor-not-allowed">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>

                    <span>
                        Previous
                    </span>
                </button>

                <button onClick={() => handlePaginationChange({ ...paginationCriteria, currentPage: paginationCriteria.currentPage + 1 })} disabled={paginationCriteria.currentPage * paginationCriteria.rowsPerPage >= totalNumberOfRows} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 disabled:cursor-not-allowed">
                    <span>
                        Next
                    </span>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default TablePaginator