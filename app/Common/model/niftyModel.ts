
'use strict';

export interface INiftyData {
    change: number,
    high: number,
    id: number,
    indexName: string,
    lastTradePrice: number,
    low: number,
    monthChange: number,
    nseStockDataId: number,
    open: number,
    percentageChange: number,
    yearChange: number,
    yearHigh: number,
    yearLow: number,

}

export interface IStockData {
    change: number,
    dayHigh: number,
    dayLow: number,
    dividend: number,
    expiryDate: Date,
    id: number,
    lastTradedPrice: number,
    monthChange: number,
    nseStockDataId: number,
    openPrice: number,
    percentageChange: number,
    symbol: string,
    tradedVolumeInLakh: number,
    tradedVolumeInMillion: number,
    turnOverInBillion: number,
    turnOverInCrores: number,
    wkhicmAdj: number,
    wklocmAdj: number,
    yearChange: number,
    yearHigh: number,
    yearLow: number,
    isActive:boolean,
}

export interface NiftyResponse {

    nseIndexData: Array<INiftyData>;
    status: string;
    stockData: Array<IStockData>;
    time: Date;
    tradedVolInLakh: number;
    tradedVolInMillion: number;
    turnOverInBillion: number;
    turnOverInCrore: number;

    //statusText: string;
    //data: Array<IStockData>;
    //latestData: Array<INiftyData>;

    //constructor(obj: NiftyResponse) {
    //    for (var prop in obj) {
    //        this[prop] = obj[prop];
    //    }
    //}
}
 