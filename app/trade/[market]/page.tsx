"use client";
import { Depth } from "@/app/components/depth/Depth";
import MarketBar from "@/app/components/MarketBar";
import { SwapUI } from "@/app/components/SwapUi";
// import { SwapUI } from "@/app/components/SwapUi";
import { TradeView } from "@/app/components/TradeView";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { market } = useParams();
  const [BookOpen, setBookOpen] = useState(true);

  return (
    <div className="flex flex-row flex-1">
      <div className="md:flex md:flex-col md:flex-1">
        <MarketBar market={market as string} />
        <div className=" flex flex-col border-y h-[620px] border-slate-900 text-white md:flex md:flex-row ">
          <div className="ml-3 mt-[6px] h-full  md:w-[75%] w-[600px] ">
            <TradeView market={market as string} timeFrame="30m" />
          </div>
          <div className="border  flex flex-col border-slate-800 ">
            <div className=" flex gap-5">
              <button
                onClick={() => setBookOpen(true)}
                className=" hover:underline underline-offset-4"
              >
                Book
              </button>
              <button
                onClick={() => {
                  setBookOpen(false);
                }}
                className=" hover:underline underline-offset-4"
              >
                Trades
              </button>
            </div>
            <div className="mx-auto  md:w-full overflow-y-scroll no-scrollbar">
              <Depth isOpen={BookOpen} market={market as string} />
            </div>
          </div>
        </div>

        <div />
      </div>
      <div className="border max-md:hidden border-slate-700 min-h-screen w-[18%] flex flex-col text-white">
        <div>
          <SwapUI market={market as string} />
        </div>
      </div>
    </div>
  );
}
