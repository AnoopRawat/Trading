'use strict';
import commonModel = require("app/Common/model/commonModel");

export interface ITransactionHistoryScope {
    tradingPlatformUserTransaction: Array<ITransactionHistoryData>;
    summaryData: commonModel.ISummaryData;
    gotoDashboard: Function;
}

export interface ITransactionHistoryData {
    stockName: string,
    quantity: number,
    actionType: string,
    transactionDate: Date,
    tradedPrice: number
} 