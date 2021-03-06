import {
  connectRouter
} from 'connected-react-router';
import {
  combineReducers
} from 'redux';
import djia from './djia';
import sideBarStock from './sidebarstock';
import sidebarCurrency from './sidebarCurrency';
import detailStock from './detailStock';
import detailCurrency from './detailCurrency';
import exchange from './exchange';
import selectedStock from './selectedStock';
import selectedSymbol from './selectedSymbol';
import compare from './compare';
import selectedExchange from './selectedExchange';
import compareCurrency from './compareCurrency'

const reducer = (history) =>
  combineReducers({
    djia,
    sideBarStock,
    sidebarCurrency,
    detailStock,
    detailCurrency,
    selectedStock,
    compare,
    compareCurrency,
    exchange,

    selectedSymbol,
    selectedExchange,
    // favoriteList,
    router: connectRouter(history),
  });

export default reducer;