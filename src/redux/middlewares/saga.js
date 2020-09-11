import {
  all
} from 'redux-saga/effects';
import {
  stockSaga
} from '../modules/stock';
import {
  DJIASaga
} from '../modules/djia';
import {
  sideBarStockSaga
} from '../modules/sidebarstock';
import {
  sideBarCurrencySaga
} from '../modules/sidebarCurrency';
import {
  detailStockSaga
} from '../modules/detailStock';
import {
  detailCurrencySaga
} from '../modules/detailCurrency';
import {
  exchangeSaga
} from '../modules/exchange';
import {
  selectedStockSaga
} from '../modules/selectedStock';

import {
  selectedSymbolSaga
} from '../modules/selectedSymbol';
import {
  compareSaga
} from '../modules/compare';

export default function* rootSaga() {
  yield all([
    stockSaga(),
    DJIASaga(),
    sideBarCurrencySaga(),
    sideBarStockSaga(),
    detailStockSaga(),
    detailCurrencySaga(),
    exchangeSaga(),
    selectedStockSaga(),
    compareSaga(),
    selectedSymbolSaga(),
  ]);
}