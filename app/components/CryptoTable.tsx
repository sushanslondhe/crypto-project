"use client"
import { useState, useEffect } from "react";
import { ArrowUpDown, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { Ticker } from "@/utils/types";
import {  getTickers } from "@/utils/httpClients";
import Link from "next/link";



const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState<Ticker[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<keyof Ticker>('symbol');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');



  useEffect(() => {

    getTickers().then((data) => {
      setCryptoData(data);
      setLoading(false);
    });


  }, []);

  const handleSort = (column: keyof Ticker) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedData = [...cryptoData].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }

    return sortOrder === 'asc' ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
  });


  if (loading) {
    return (
      <div className="flex items-center justify-center my-[55px]">
        <div className="loader" />
      </div>
    );
  }
    return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="crypto-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/20 text-slate-600 ">
                  <th className="text-left p-4">
                    <button
                      onClick={() => handleSort('symbol')}
                      className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Symbol
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="text-right p-4">
                    <button
                      onClick={() => handleSort('lastPrice')}
                      className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer ml-auto"
                    >
                      Price
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="text-right p-4">
                    <button
                      onClick={() => handleSort('high')}
                      className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer ml-auto"
                    >
                      24h High
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="text-right p-4">
                    <button
                      onClick={() => handleSort('low')}
                      className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer ml-auto"
                    >
                      24h Low
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="text-right p-4">
                    <button
                      onClick={() => handleSort('priceChangePercent')}
                      className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer ml-auto"
                    >
                      24h Change
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="text-right p-4">
                    <button
                      onClick={() => handleSort('volume')}
                      className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer ml-auto"
                    >
                      Volume
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="text-right p-4">
                    <button
                      onClick={() => handleSort('quoteVolume')}
                      className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer ml-auto"
                    >
                      Quote Volume
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>

                </tr>
              </thead>
              <tbody>
                {sortedData.map((crypto, index) => (
                  <tr
                    key={crypto.symbol}
                    className="border-b border-border/10 hover:bg-slate-900  "
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="p-4">
                      <Link href={`/trade/${crypto.symbol}`}>
                        <div className={`${index % 2 === 0 ? ' text-yellow-400 font-bold' : 'text-white font-bold'}`}>
                          {crypto.symbol}
                        </div>
                      </Link>
                    </td>
                    <td className="p-4 text-right font-mono text-lg font-semibold text-foreground">
                      ${Number(crypto.lastPrice) < 1 ? Number(crypto.lastPrice).toFixed(4) : crypto.lastPrice}
                    </td>
                    <td className="p-4 text-right font-mono text-muted-foreground">
                      ${Number(crypto.high) < 1 ? Number(crypto.high).toFixed(4) : crypto.high}
                    </td>
                    <td className="p-4 text-right font-mono text-muted-foreground">
                      ${Number(crypto.low) < 1 ? Number(crypto.low).toFixed(4) : crypto.low}
                    </td>
                    <td className={`p-4 text-right font-mono font-semibold `}>
                      <div className="flex items-center justify-end gap-1">
                        {Number(crypto.priceChangePercent) > 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {Number(crypto.priceChangePercent) > 0 ? '+' : ''}{Number(crypto.priceChangePercent).toFixed(2)}%
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono text-muted-foreground">
                      {crypto.volume}
                    </td>
                    <td className="p-4 text-right font-mono text-muted-foreground">
                      {crypto.quoteVolume}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );

};

export default CryptoTable;