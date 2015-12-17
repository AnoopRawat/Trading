'use strict';
import commonModel = require("app/Common/model/commonModel");

export interface IProfitAndLossScope {
    userRealizedTransactions: Array<IProfitAndLossData>;
    summaryData: commonModel.ISummaryData;
    gotoDashboard: Function;
}

export interface IProfitAndLossData {
    transactionDate: Date,
    stockName: string,
    quantity: number,
    buyPrice: number,   
    sellPrice: number,
    gainLoss:number
}  