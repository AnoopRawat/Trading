'use strict';
import commonModel = require("app/Common/model/commonModel");
import niftyDataModel = require("app/Common/model/niftyModel");
export interface ITransactionData {
    qty: number,
    totalAmt?: number,
    stockData: niftyDataModel.IStockData,
    action: string,
    buySellStock: Function,
    gotoDashboard: Function,
    gotoTransactionHistory:Function,
    calculateTotalAmt: Function,
    summaryData: commonModel.ISummaryData,
    refreshDate: number,
    onlyNumbers: string,
    headerMessage: commonModel.IHeaderMessage,
    confirmTransaction: Function;
}

export interface ITransactionDataRequest {
    quantity: number,
    stockName: string,
    tradedPrice:number,
    actionType: string;
}
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
    tradedPrice:number,

}

export interface ITransactionConfirmationModalScope {
    hideSubmit: boolean;
    headerMessage: commonModel.IHeaderMessage;
    submit: Function;
    close: Function;
}
