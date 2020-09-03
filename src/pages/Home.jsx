import React from "react";

import DjiagraphContainer from "../containers/MainDjia/djiagraphContainer";
import SideBarContent from "../contents/SideBarContent";
import './Home.scss'
import { useSelector } from "react-redux";
import DetailStockGraphContainer from "../containers/Detail/DetailStockGraphContainer";
import { selectedCurrencySaga } from "../redux/modules/selectedCurrency";


export default function Home() {
  const selectedStock = useSelector(state => state.selectedStock.selectedStock)
  const selectedCurrency = useSelector(state => state.selectedStock.selectedStock)
  
  return (
    <div className='home'>
      <SideBarContent />
      {selectedStock.length !== 0 ? <DetailStockGraphContainer symbol={selectedStock} /> : selectedCurrency.length !==0 ? <DetailStockGraphContainer symbol={selectedStock} /> : <DjiagraphContainer />}

    </div>
  );
}
