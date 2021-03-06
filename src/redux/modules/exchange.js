import {
  put,
  call,
  takeEvery
} from 'redux-saga/effects';
import ExchangeSerivice from '../../services/ExchangeService';

const prefix = 'stockflow/exchange';
const initialState = {
  loading: true,
  exchange: [],
  error: null,
};

const GET_EXCHANGE_START = `${prefix}/GET_EXCHANGE_START`;
const GET_EXCHANGE_SUCCESS = `${prefix}/GET_EXCHANGE_SUCCESS`;
const GET_EXCHANGE_ERROR = `${prefix}/GET_EXCHANGE_ERROR`;

const startGetExchange = () => {
  return {
    type: GET_EXCHANGE_START,
  };
};
const successGetExchange = (exchange) => {
  return {
    type: GET_EXCHANGE_SUCCESS,
    exchange,
  };
};
const failGetExchange = (error) => {
  return {
    type: GET_EXCHANGE_ERROR,
    error,
  };
};

function* getExchangeSaga(action) {
  const {
    exchangeArray
  } = action.payload;
  yield put(startGetExchange());
  try {
    // delay(1000);
    let exchange = yield call(ExchangeSerivice.getExchange, exchangeArray);

    yield put(successGetExchange(exchange));
  } catch (error) {
    console.log(error);
    yield put(failGetExchange());
  }
}

const GET_EXCHANGE_SAGA = 'GET_EXCHANGE_SAGA';

export const getExchangeSagaActionCreator = (exchangeArray) => ({
  type: GET_EXCHANGE_SAGA,
  payload: {
    exchangeArray,
  },
});

export function* exchangeSaga() {
  yield takeEvery(GET_EXCHANGE_SAGA, getExchangeSaga);
}

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case GET_EXCHANGE_START:
      return {
        ...prevState,
        loading: true,
          error: null,
      };

    case GET_EXCHANGE_SUCCESS:
      return {
        loading: false,
          exchange: action.exchange,
          error: null,
      };
    case GET_EXCHANGE_ERROR:
      return {
        ...prevState,
        loading: false,
          error: action.error,
      };
    default:
      return {
        ...prevState,
      };
  }
}