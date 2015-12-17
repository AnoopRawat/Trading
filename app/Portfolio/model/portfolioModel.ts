'use strict';
import commonModel = require("app/Common/model/commonModel");

export interface IPortfolioScope {
    stockData: Array<IPortfolioStockData>;
    summaryData: commonModel.ISummaryData;
    gotoDashboard: Function;
    gotoProfitAndLoss: Function;
}

export interface IPortfolioStockData {
    stockName: string,
    totalStockQuantity: number,
    avgTradedStockPrice: number,
    avgTradedStockTotalValue: number,
    currentStockPrice: number,
    currentAssetValue: number,
    avgChangeInPrice: number,
    avgChangePercentage: number,
    ltpStockChange: number,
    ltpStockPercentage: number
}