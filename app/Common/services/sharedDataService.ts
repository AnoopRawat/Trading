import appModule = require("OnlineTrading");
import nifteyModel = require("app/Common/model/niftyModel");

export interface ISharedData {
    setUserName(user: string): void;
    getUserName(): string;
    setAuthToken(authToken: string): void;
    getAuthToken(): string;
    setStockData(stock : Object): void;
}

export class SharedDataService implements ISharedData {   
    private userId: string;
    private user: string;
    private authToken: string;
    private stockData: nifteyModel.IStockData;
    private actionPerformed: string;

    setUserName = (user: string) => {
        this.user = user;
    };

    getUserName = () => {
        return this.user;
    };

    setAuthToken = (authToken: string) => {
        this.authToken = authToken;
    };

    getAuthToken = () => {
        return this.authToken;
    };

    setStockData = (stock: nifteyModel.IStockData) => {
        this.stockData = stock;
    };

    getStockData = () => {
       return this.stockData;
    };

    setTransactionAction = (action:string) => {
        this.actionPerformed = action;
    };

    getTransactionAction = () => {
        return this.actionPerformed;
    };

    setUserId = (userId: string) => {
        this.userId = userId;
    };

    getUserId = () => {
        return this.userId;
    };
}

appModule.OnlineTrading.serviceProvider('sharedDataService', () => {
    return new SharedDataService();
});
 