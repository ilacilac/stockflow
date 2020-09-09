import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import Modal from 'react-modal';
import GraphService from '../../services/GraphService';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100,
  },
  overlay: {
    zIndex: 100,
  },
};

Modal.setAppElement(document.getElementById('option_modal'));

// loading
export default function DetailStockGraph({
  getDetailStock,
  loading,
  symbol,
  movingAverage,
  rsiSignal,
  indicators,
  stock,
  volume,
  getMACDData
}) {
  //chart ref
  const chart = useRef();
  const assistChart = useRef();
  const indicatorChart = useRef();
  const disparityChart = useRef();
  const MACDChart = useRef();
  //chart position ref
  const chartposition = useRef();
  const indicatorPosition = useRef();
  const disparityPosition = useRef();
  const MACDPosition = useRef();
  //graph ref
  const candleSeries = useRef();
  const smaFive = useRef();
  const smaHundredTwenty = useRef();
  const smaTwenty = useRef();
  const smaSixty = useRef();
  const rsiChart = useRef();
  const rsiSignalChart = useRef();
  const disparityGraph = useRef();
  const MACDGraph = useRef();
  const MACDSignalGraph = useRef();
  const volumeChart = useRef();
  const lowBBANDS = useRef();
  const middleBBANDS = useRef();
  const highBBANDS = useRef();

  //data
  const MACDData = useRef();
  //check
  const [smaFiveCk, fiveCk] = useState(false);
  const [fiveColor, setFiveColor] = useState('#0000ff');

  const [smaTwentyCk, twentyCk] = useState(false);
  const [twentyColor, setTwentyColor] = useState('#964b00');

  const [smaSixtyCk, sixtyCk] = useState(false);
  const [sixtyColor, setSixtyColor] = useState('#ff0000');

  const [smaHundredTwentyCk, hundredTwentyCk] = useState(false);
  const [hundredTwentyColor, setHundredTwentyColor] = useState('#ffc0cb');

  const [BBANDSCk, setBBANDSCk] = useState(false);
  const [BBANDSColor, setBBANDSColor] = useState('#00ff00');

  const [rsiColor, setRsiColor] = useState('#ffff00');
  const [rsiSignalColor, setRsiSignalColor] = useState('#ff00ff');

  const [disparityColor, setDisparityColor] = useState('#00ffff');



  const fiveMovingAverageData = movingAverage(stock, 5);
  const twentyMovingAverageData = movingAverage(stock, 20);
  const sixtyMovingAverageData = movingAverage(stock, 60);
  const hundredTwentyMovingAverageData = movingAverage(stock, 120);
  const twentyDisparity = twentyMovingAverageData
    .map((_, i) => ({
      time: stock[stock.length - i - 1].time,
      value:
        (stock[stock.length - i - 1].open /
          twentyMovingAverageData[twentyMovingAverageData.length - i - 1]
            .value) *
        100,
    }))
    .reverse();
  const sixtyDisparity = sixtyMovingAverageData.map((_, i) => ({
    time: stock[stock.length - i - 1].time,
    value:
      (stock[stock.length - i - 1].open /
        sixtyMovingAverageData[sixtyMovingAverageData.length - i - 1].value) *
      100,
  }));

  const [modalIsOpen, setIsOpen] = useState(false);


  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() { }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    getDetailStock(symbol);
  }, [symbol, getDetailStock]);

  useEffect(() => {
    chart.current = createChart(chartposition.current, {
      width: 800,
      height: 400,
    });
    chart.current.applyOptions({
      priceScale: {
        position: 'right',
        autoScale: true,
      },
      timeScale: {
        rightOffset: 0,
        fixLeftEdge: true,
        barSpacing: 10,
      },
    });
    assistChart.current = createChart(chartposition.current, {
      width: 800,
      height: 200,
    });
    assistChart.current.applyOptions({
      priceScale: {
        position: 'right',
      },
      timeScale: {
        fixLeftEdge: true,
      },
    });
    indicatorChart.current = createChart(indicatorPosition.current, {
      width: 0,
      height: 0,
    });
    indicatorChart.current.applyOptions({
      priceScale: {
        position: 'right',
        borderVisible: false,
      },
      timeScale: {
        fixLeftEdge: true,
        borderVisible: false,
      },

    })
    disparityChart.current = createChart(disparityPosition.current, { width: 0, height: 0 })
    disparityChart.current.applyOptions({
      priceScale: {
        position: 'right',
        borderVisible: false,
      },
      timeScale: {
        fixLeftEdge: true,
        borderVisible: false,
      },
    })
    MACDChart.current = createChart(MACDPosition.current, { width: 0, height: 0 })
    MACDChart.current.applyOptions({
      priceScale: {
        position: 'right',
        borderVisible: false,
      },
      timeScale: {
        fixLeftEdge: true,
        borderVisible: false,
      },
    })
  }, [])


  useEffect(() => {
    if (candleSeries.current) {
      chart.current.removeSeries(candleSeries.current);
      if (lowBBANDS.current) chart.current.removeSeries(lowBBANDS.current);

      if (middleBBANDS.current)
        chart.current.removeSeries(middleBBANDS.current);
      if (highBBANDS.current) chart.current.removeSeries(highBBANDS.current);
      if (smaFive.current) chart.current.removeSeries(smaFive.current);
      if (smaTwenty.current) chart.current.removeSeries(smaTwenty.current);
      if (smaSixty.current) chart.current.removeSeries(smaSixty.current);
      if (smaHundredTwenty.current)
        chart.current.removeSeries(smaHundredTwenty.current);

      assistChart.current.removeSeries(volumeChart.current);
    }
  }, [symbol]);

  useEffect(() => {
    candleSeries.current = chart.current.addCandlestickSeries({
      title: symbol,
    });
    candleSeries.current.setData(stock);
    chart.current.timeScale().setVisibleLogicalRange({
      from: stock.length - 60,
      to: stock.length,
    });

    volumeChart.current = assistChart.current.addHistogramSeries({
      title: 'volume',
    });
    volumeChart.current.setData(volume);
    assistChart.current.timeScale().setVisibleLogicalRange({
      from: volume.length - 60,
      to: volume.length,
    });

    MACDData.current = getMACDData(stock);
  }, [stock]);

  // stock
  // 0: {time: "2020-04-13", open: 121.63, high: 121.8, low: 118.04, close: 121.1
  return (
    <div className="detail-stock">
      <button onClick={openModal}>open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <form>
          <label>
            5 Moving Average
            <input
              type="checkbox"
              checked={smaFiveCk}
              onChange={() => {
                if (smaFive.current) {
                  fiveCk(false);
                  chart.current.removeSeries(smaFive.current);
                  smaFive.current = null;
                } else {
                  fiveCk(true);
                  smaFive.current = chart.current.addLineSeries({
                    color: fiveColor,
                  });
                  smaFive.current.setData(fiveMovingAverageData);
                }
              }}
            />
          </label>
          <label>
            Five Moving Average Color
            <input
              type="color"
              value={fiveColor}
              onChange={(e) => {
                setFiveColor(e.target.value);
                if (smaFive.current) {
                  smaFive.current.applyOptions({ color: fiveColor });
                }
              }}
            />
          </label>
          <label>
            20 Moving Average
            <input
              type="checkbox"
              checked={smaTwentyCk}
              onChange={() => {
                if (smaTwenty.current) {
                  twentyCk(false);
                  chart.current.removeSeries(smaTwenty.current);
                  smaTwenty.current = null;
                } else {
                  twentyCk(true);
                  smaTwenty.current = chart.current.addLineSeries({
                    color: twentyColor,
                  });
                  smaTwenty.current.setData(twentyMovingAverageData);
                }
              }}
            />
          </label>
          <label>
            Twenty Moving Average Color
            <input
              type="color"
              value={twentyColor}
              onChange={(e) => {
                setTwentyColor(e.target.value);
                if (smaTwenty.current) {
                  smaTwenty.current.applyOptions({ color: twentyColor });
                }
              }}
            />
          </label>
          <label>
            60 Moving Average
            <input
              type="checkbox"
              checked={smaSixtyCk}
              onChange={() => {
                if (smaSixty.current) {
                  sixtyCk(false);
                  chart.current.removeSeries(smaSixty.current);
                  smaSixty.current = null;
                } else {
                  sixtyCk(true);
                  smaSixty.current = chart.current.addLineSeries({
                    color: sixtyColor,
                  });
                  smaSixty.current.setData(sixtyMovingAverageData);
                }
              }}
            />
          </label>
          <label>
            Sixty Moving Average Color
            <input
              type="color"
              value={sixtyColor}
              onChange={(e) => {
                setSixtyColor(e.target.value);
                if (smaSixty.current) {
                  smaSixty.current.applyOptions({ color: sixtyColor });
                }
              }}
            />
          </label>
          <label>
            120 Moving Average
            <input
              type="checkbox"
              checked={smaHundredTwentyCk}
              onChange={() => {
                if (smaHundredTwenty.current) {
                  hundredTwentyCk(false);
                  chart.current.removeSeries(smaHundredTwenty.current);
                  smaHundredTwenty.current = null;
                } else {
                  hundredTwentyCk(true);
                  smaHundredTwenty.current = chart.current.addLineSeries({
                    color: hundredTwentyColor,
                  });
                  smaHundredTwenty.current.setData(
                    hundredTwentyMovingAverageData,
                  );
                }
              }}
            />
          </label>
          <label>
            HundredTwenty Moving Average Color
            <input
              type="color"
              value={hundredTwentyColor}
              onChange={(e) => {
                setHundredTwentyColor(e.target.value);
                if (smaHundredTwenty.current) {
                  smaHundredTwenty.current.applyOptions({
                    color: hundredTwentyColor,
                  });
                }
              }}
            />
          </label>
          <label>
            BBANDS
            <input
              type="checkbox"
              checked={BBANDSCk}
              onChange={() => {
                if (lowBBANDS.current) {
                  setBBANDSCk(false);
                  chart.current.removeSeries(lowBBANDS.current);
                  chart.current.removeSeries(middleBBANDS.current);
                  chart.current.removeSeries(highBBANDS.current);
                  lowBBANDS.current = null;
                  middleBBANDS.current = null;
                  highBBANDS.current = null;
                } else {
                  setBBANDSCk(true);
                  lowBBANDS.current = chart.current.addLineSeries({
                    title: 'BBANDS LOW',
                    color: BBANDSColor,
                  });
                  lowBBANDS.current.setData(indicators[1][0]);
                  middleBBANDS.current = chart.current.addLineSeries({
                    title: 'BBANDS MIDDLE',
                    color: BBANDSColor,
                  });
                  middleBBANDS.current.setData(indicators[1][1]);
                  highBBANDS.current = chart.current.addLineSeries({
                    title: 'BBANDS HIGH',
                    color: BBANDSColor,
                  });
                  highBBANDS.current.setData(indicators[1][2]);
                }
              }}
            />
          </label>
          <label>
            BBANDS Color
            <input type="color" value={BBANDSColor} onChange={e => {
              setBBANDSColor(e.target.value)
              if (lowBBANDS.current) {
                lowBBANDS.current.applyOptions({ color: BBANDSColor })
                middleBBANDS.current.applyOptions({ color: BBANDSColor })
                highBBANDS.current.applyOptions({ color: BBANDSColor })
              }
            }} />
          </label>
          <label>
            RSI
          <input type="checkbox" onChange={() => {
              if (rsiChart.current) {
                indicatorChart.current.removeSeries(rsiChart.current);
                indicatorChart.current.removeSeries(rsiSignalChart.current);
                indicatorChart.current.resize(0, 0);
                rsiChart.current = null;
              } else {
                GraphService.graphColor(indicatorChart.current, rsiColor, rsiChart, indicators[0])
                GraphService.graphColor(indicatorChart.current, rsiSignalColor, rsiSignalChart, rsiSignal)
              }
            }} />
          </label>
          <label>
            RSI Color
          <input type="color" onChange={e => {
              setRsiColor(e.target.value)
              if (rsiChart.current) {
                rsiChart.current.applyOptions({ color: rsiColor })
              }
            }} value={rsiColor} />
          </label>
          <label>
            RSI Signal Color
          <input type="color" onChange={e => {
              setRsiSignalColor(e.target.value)
              if (rsiSignalChart.current) {
                rsiSignalChart.current.applyOptions({ color: rsiSignalColor })
              }
            }} value={rsiSignalColor} />
          </label>
          <label>
            Disparity
          <input type="checkbox" onChange={() => {
              if (disparityGraph.current) {
                disparityChart.current.removeSeries(disparityGraph.current);
                disparityChart.current.resize(0, 0);
                disparityGraph.current = null;
              } else {
                GraphService.graphColor(disparityChart.current, disparityColor, disparityGraph, twentyDisparity)
              }
            }}
            />
          </label>
          <label>
            <input type="color" onChange={e => {
              setDisparityColor(e.target.value)
              if (disparityGraph.current) {
                disparityGraph.current.applyOptions({ color: disparityColor })
              }
            }} value={rsiSignalColor} />
          </label>
          <label>
            MACD
          <input type="checkbox" onChange={() => {
              if (MACDGraph.current) {
                MACDChart.current.removeSeries(MACDGraph.current);
                MACDChart.current.removeSeries(MACDSignalGraph.current);
                MACDChart.current.resize(0, 0);
                MACDGraph.current = null;
                MACDSignalGraph.current = null;
              } else {
                console.log(MACDData.current);
                GraphService.graphColor(MACDChart.current, disparityColor, MACDGraph, MACDData.current[0])
                GraphService.graphColor(MACDChart.current, disparityColor, MACDSignalGraph, MACDData.current[1])
              }
            }}
            />
          </label>
          <label>
            <input type="color" onChange={e => {
              setDisparityColor(e.target.value)
              if (disparityGraph.current) {
                disparityGraph.current.applyOptions({ color: disparityColor })
              }
            }} value={rsiSignalColor} />
          </label>
          <button onClick={closeModal}>Submit</button>
        </form>
      </Modal>
      <h1>Detail Stock</h1>
      {
        !loading && (
          <>
            <h2>{symbol}</h2>

            {/* <button onClick={() => dailyBtnClick()}>1일</button>
          <button onClick={() => weeklyBtnClick()}>1주</button>
          <button onClick={() => monthlyBtnClick()}>1달</button> */}
          </>
        )
      }
      <div ref={chartposition}></div>
      <div ref={indicatorPosition}></div>
      <div ref={disparityPosition}></div>
      <div ref={MACDPosition}></div>
    </div >
  );

  // return <h1>Detail Stock</h1>;
}
