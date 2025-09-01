export default function AsksTable({ asks }: { asks: [string, string][] }) {
  let currTotal = 0;
  const relAsks = asks.slice(0, 20);

  // console.log(relAsks);
  relAsks.reverse();

  const asksWithTotal: [string, string, number][] = [];
  for (let i = relAsks.length - 1; i >= 0; i--) {
    const [price, quantity] = relAsks[i];
    asksWithTotal.push([price, quantity, (currTotal += Number(quantity))]);
  }
  asksWithTotal.reverse();
  const maxTotal = relAsks.reduce(
    (acc, [_, quantity]) => acc + Number(quantity),
    0
  );
  return (
    <div className=" flex flex-col gap-2">
      {asksWithTotal.map(([price, quantity, total]) => (
        <Ask
          maxTotal={maxTotal}
          price={price}
          total={total}
          quantity={quantity}
          key={price}
        />
      ))}
    </div>
  );
}

function Ask({
  price,
  quantity,
  total,
  maxTotal,
}: {
  price: string;
  quantity: string;
  total: number;
  maxTotal: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: `${(100 * total) / maxTotal}%`,
          height: "100%",
          background: "rgba(228, 75, 68, 0.325)",
          transition: "width 0.3s ease-in-out",
        }}
      ></div>
      <div className="flex justify-between text-xs w-full">
        <div className=" text-red-600">{price}</div>
        <div className=" text-slate-400">{quantity}</div>
        <div className=" text-slate-400">{total?.toFixed(2)}</div>
      </div>
    </div>
  );
}
