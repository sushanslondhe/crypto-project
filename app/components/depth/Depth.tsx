import { useEffect, useState } from "react";
import AsksTable from "./AsksTable";
import BidsTable from "./BidsTable";
import TradesTable from "../trades/TradesTable";
import { SignalingManager } from "@/utils/SignalingManager";
import { Trade } from "@/utils/types";
import { getDepth, getTicker, getTrades } from "@/utils/httpClients";

export function Depth({ market, isOpen }: { market: string; isOpen: any }) {
  // get Depth function -> askstable, bidstable
  // get trades
  const [asks, setAsks] = useState<[string, string][]>();
  const [bids, setBids] = useState<[string, string][]>();
  const [price, setPrice] = useState<string>();
  const [trades, setTrades] = useState<any>();

  useEffect(() => {
    SignalingManager.getInstance().registerCallback(
      "depth",
      (data: any) => {
        setBids((originalBids) => {
          const bidsAfterUpdate = [...(originalBids || [])];

          for (let i = 0; i < bidsAfterUpdate.length; i++) {
            for (let j = 0; j < data.bids.length; j++) {
              if (bidsAfterUpdate[i][0] === data.bids[j][0]) {
                bidsAfterUpdate[i][1] = data.bids[j][1];
                break;
              }
            }
          }

          return bidsAfterUpdate;
        });

        setAsks((originalAsks) => {
          const asksAfterUpdate = [...(originalAsks || [])];

          for (let i = 0; i < asksAfterUpdate.length; i++) {
            for (let j = 0; j < data.asks.length; j++) {
              if (asksAfterUpdate[i][0] === data.asks[j][0]) {
                asksAfterUpdate[i][1] = data.asks[j][1];
                break;
              }
            }
          }
          return asksAfterUpdate;
        });
      },
      `DEPTH-${market}`
    );
    SignalingManager.getInstance().registerCallback(
      "trade",
      (data: any) =>
        setTrades((originalTrades: any) => {
          const tradesAfterUpdates = [data, ...(originalTrades || [])];
          // Trade
          // console.log(data);
          return tradesAfterUpdates.slice(0, 50);
        }),
      `TRADE-${market}`
    );

    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`depth.200ms.${market}`],
    });

    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`trade.${market}`],
    });

    getDepth(market).then((d) => {
      setBids(d.bids);
      setAsks(d.asks);
    });

    getTicker(market).then((t) => setPrice(t.lastPrice));
    getTrades(market).then((t) => setTrades(t));
    // getKlines(market, "1h", 1640099200, 1640100800).then(t => setPrice(t[0].close));
    return () => {
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth.200ms.${market}`],
      });
      SignalingManager.getInstance().deRegisterCallback(
        "depth",
        `DEPTH-${market}`
      );
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`trade.${market}`],
      });
      SignalingManager.getInstance().deRegisterCallback(
        "trade",
        `TRADE-${market}`
      );
    };
  }, []);
  {
    if (isOpen) {
      return (
        <div className="">
          <div className="  w-[290px] mt-5 flex flex-col gap-3">
            <TableHeader />
            {asks && <AsksTable asks={asks} />}
            {price && <div>{price}</div>}
            {bids && <BidsTable bids={bids} />}
          </div>
        </div>
      );
    }
    return (
      <div className="w-[300px]">
        <div className=" flex  font-light text-sm gap-20 my-2 ">
          <div className="">Price</div>
          <div>Quantity</div>
        </div>
        {trades && <TradesTable trades={trades} prevPrice={price as string} />}
      </div>
    );
  }
}
function TableHeader() {
  return (
    <div className=" flex flex-col  gap-2">
      <div className="  w-full flex justify-between text-sm text-white">
        <div className=" font-bold">Price</div>
        <div className=" font-light">Size</div>
        <div className=" font-light">Total</div>
      </div>
    </div>
  );
}
