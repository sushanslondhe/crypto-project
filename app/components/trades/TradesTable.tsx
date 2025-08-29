import { Trade } from "@/app/utils/types";
import { format } from "date-fns";
export const formatTime = (seconds: any) => {
  const years = Math.floor(seconds / (3600 * 24 * 365));
  seconds %= 3600 * 24 * 365;
  const days = Math.floor(seconds / (3600 * 24));
  seconds %= 3600 * 24;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${hours}h ${minutes}m ${secs}s`;
};
export default function TradesTable({
  trades,
  prevPrice,
}: {
  trades: Trade[];
  prevPrice: any;
}) {
  let latestTrades = trades.slice(0, 20);
  // console.log(latestTrades);

  return (
    <div>
      <div className=" overflow-y-scroll no-scrollbar flex flex-col gap-2">
        {latestTrades.map((x) => (
          <div
            key={x.price}
            className=" flex justify-between  items-start text-sm "
          >
            <div
              className={
                x.price > prevPrice ? "text-green-500" : "text-red-600"
              }
            >
              {x.price}
            </div>
            <div className=" text-slate-300">{x.quantity}</div>
            <div className=" text-gray-500">{x.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
