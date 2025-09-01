import { Trade } from "@/utils/types";
export default function TradesTable({
  trades,
  prevPrice,
}: {
  trades: Trade[];
  prevPrice: any;
}) {
  const latestTrades = trades.slice(0, 20);
  // console.log(latestTrades);

  return (
    <div>
      <div className=" overflow-y-scroll  flex flex-col gap-2 px-6">
        {latestTrades.map((x,i) => (
          <div
            key={i}
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
