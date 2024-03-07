export interface IStableCoin {
    id: string;
    name: string;
    symbol: string;
    gecko_id: string;
    pegType: string;
    priceSource: string;
    pegMechanism: string;
    circulating: {
        peggedUSD: number;
    };
    circulatingPrevDay: {
        peggedUSD: number;
    };
    circulatingPrevWeek: {
        peggedUSD: number;
    };
    circulatingPrevMonth: {
        peggedUSD: number;
    };
    chainCirculating: {
        [chain: string]: {
            current: {
                peggedUSD: number;
            };
            circulatingPrevDay: {
                peggedUSD: number;
            };
            circulatingPrevWeek: {
                peggedUSD: number;
            };
            circulatingPrevMonth: {
                peggedUSD: number;
            };
        };
    };
    chains: string[];
    price: number;
}

export interface IListStableCoinsResponse {
    peggedAssets: IStableCoin[];
}

export interface ISortCriteria<T> {
    key: keyof T;
    direction: 'asc' | 'desc';
}

export interface IPaginationCriteria {
    currentPage: number;
    rowsPerPage: number;
}