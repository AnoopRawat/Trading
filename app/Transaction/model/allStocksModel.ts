'use strict';

import commonModel = require("app/Common/model/commonModel");  
export interface IAllStockData {
    qty: number,
    totalAmt: number,
    stockData: any,
    openDashboard: Function,
    buySellStock:Function,
} 
