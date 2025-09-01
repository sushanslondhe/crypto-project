import { useEffect, useState } from "react";
import { Ticker } from "@/utils/types";
import { getTicker } from "@/utils/httpClients";
import { SignalingManager } from "@/utils/SignalingManager";

export default function MarketBar({ market }: { market: string }) {
  const [ticker, setTicker] = useState<Ticker | null>(null);

  useEffect(() => {
    getTicker(market).then(setTicker);
    SignalingManager.getInstance().registerCallback(
      "ticker",
      (data: Partial<Ticker>) =>
        setTicker((prevTicker) => ({
          firstPrice: data?.firstPrice ?? prevTicker?.firstPrice ?? "",
          high: data?.high ?? prevTicker?.high ?? "",
          lastPrice: data?.lastPrice ?? prevTicker?.lastPrice ?? "",
          low: data?.low ?? prevTicker?.low ?? "",
          priceChange: data?.priceChange ?? prevTicker?.priceChange ?? "",
          priceChangePercent:
            data?.priceChangePercent ?? prevTicker?.priceChangePercent ?? "",
          quoteVolume: data?.quoteVolume ?? prevTicker?.quoteVolume ?? "",
          symbol: data?.symbol ?? prevTicker?.symbol ?? "",
          trades: data?.trades ?? prevTicker?.trades ?? "",
          volume: data?.volume ?? prevTicker?.volume ?? "",
        })),
      `TICKER-${market}`
    );
    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`ticker.${market}`],
    });

    return () => {
      SignalingManager.getInstance().deRegisterCallback(
        "ticker",
        `TICKER-${market}`
      );
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`ticker.${market}`],
      });
    };
  }, [market]);
  return (
    <div className="flex items-center justify-between flex-row  w-full gap-4 overflow-auto pr-4 border border-slate-900">
      <div className=" flex h-[60px] shrink-0 space-x-4 text-white">
        <div className="">
          <TickerC market={market} />
        </div>
        <div className="flex items-center flex-row space-x-8  ">
          <div className="flex flex-col h-full justify-center">
            <div className=" flex flex-col justify-center h-full">
              <p className=" text-green-500 text-lg">
                {Number(ticker?.lastPrice).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex flex-col h-full justify-center text-sm">
            <p className=" font-light">24H Change</p>

            <div
              className={
                Number(ticker?.priceChangePercent) < 0
                  ? `text-red-600`
                  : `text-green-500`
              }
            >
              {Number(ticker?.priceChange) > 0 ? "+" : ""} {ticker?.priceChange}{" "}
              {(Number(ticker?.priceChangePercent) * 100)?.toFixed(2)} %
            </div>
          </div>
          <div className="flex flex-col h-full justify-center font-light text-sm">
            24h High
            <p className=" font-semibold">{ticker?.high}</p>
          </div>
          <div className="flex flex-col h-full justify-center font-light  text-sm">
            24h Low
            <p>{ticker?.lastPrice}</p>
          </div>
          <div className="flex flex-col h-full justify-center font-light text-sm">
            24h Volume
            <p>{Number(ticker?.quoteVolume).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TickerC({ market }: { market: string }) {
  return (
    <div className="flex h-[60px] shrink-0 space-x-4">
  
      <button type="button" className="">
        <div className="flex items-center justify-between flex-row cursor-pointer rounded-lg p-3 hover:opacity-80">
          <div className="flex items-center flex-row gap-2 undefined">
            <div className="flex flex-row relative">
              <p className="font-bold text-sm  font-serif">
                {market.replace("_", " / ")}
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
