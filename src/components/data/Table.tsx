import React from 'react'
import ArrowUpShortWide from '../icons/ArrowUpShortWide';
import ArrowUpWideShort from '../icons/ArrowUpWideShort';
import { ISortCriteria } from '@/utilities/interfaces';

interface ColumnProps<T> {
    key: keyof T;
    title: string | React.ReactElement;
    render?: (column: ColumnProps<T>, item: T) => React.ReactElement;
}

type Props<T> = {
    columns: Array<ColumnProps<T>>;
    data: T[];

    sort: ISortCriteria<T>;
    handleSort?: (key: keyof T) => void;
};

const Table = <T,>({ data, columns, sort, handleSort }: Props<T>) => {
    const handleSortChanged = (key: keyof T) => {
        if (handleSort) {
            handleSort(key)
        }
    }

    return (
        <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    {columns
                                        .map((col) => (
                                            <th key={col.key as string} title={`Sort by ${col.title}`} onClick={() => handleSortChanged(col.key)} scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <span className='flex items-center gap-4 hover:cursor-pointer'>
                                                    {col.title}
                                                    {
                                                        col.key === sort.key && (
                                                            sort.direction === 'asc' ? (
                                                                <ArrowUpWideShort />
                                                            ) : (
                                                                <ArrowUpShortWide />
                                                            )
                                                        )
                                                    }
                                                </span>
                                            </th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                {
                                    !data.length ? (
                                        <tr>
                                            <td colSpan={columns.length} className="px-4 py-4 text-sm font-medium whitespace-nowrap text-white text-center">
                                                No data available
                                            </td>
                                        </tr>

                                    ) : (
                                        data.map((row) => (
                                            <tr key={row['id' as keyof typeof row] as string}>
                                                {columns.map((col, idx) => {
                                                    const value = col.render
                                                        ? col.render(col, row as T)
                                                        : (row[col.key as keyof typeof row] as string);

                                                    return (
                                                        <td key={`cell-${idx}`} className='px-4 py-4 text-sm font-medium whitespace-nowrap text-white'>{value}</td>
                                                    );
                                                })}
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Table