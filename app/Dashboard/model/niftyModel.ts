
'use strict';

export interface INiftyData {
    ltp: number,
    ch: number,
    per: number,
    open: number,
    high: number,
    low: number;
}

export interface IStockData {
    symbol: string,
    open: number,
    high: number,
    low: number,
    ltP: number,
    ptsC: number,
    per: number,
    trdVol: number,
    trdVolM: number,
    ntP: number,
    mVal: number,
    wkhi: number,
    wklo: number,
    wkhicm_adj: number,
    wklocm_adj: number,
    xDt: Date,
    cAct: string,
    yPC: number,
    mPC: number,
}

export class NiftyResponse {
    statusText: string;
    data: Array<IStockData>;
    latestData: Array<INiftyData>;

    constructor(obj: NiftyResponse) {
        for (var prop in obj) {
            this[prop] = obj[prop];
        }
    }
}
 