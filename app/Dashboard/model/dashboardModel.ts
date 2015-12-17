'use strict';
import commonModel = require("app/Common/model/commonModel");
import niftyModel = require("app/Common/model/niftyModel");

export interface IDashboardScope extends angular.IScope{
    refreshDate: number,
    openPortfolio: Function,
    seeAllStocks: Function,
    openTransaction: Function,
    getRecentTransactions : Function,
    gotoTransactionHistory:Function,
    summaryData: commonModel.ISummaryData;
    stockData: niftyModel.NiftyResponse,
    players: IDashboardPlayers,
    recentTransactions : Array<string>,
    buySellStock:Function
}


export interface IDashboardPlayers {
    top: Array<string>,
    low: Array<string>
}
 