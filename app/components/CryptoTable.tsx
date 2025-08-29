"use client"
import { useState, useEffect } from "react";
import { ArrowUpDown, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

interface CryptoData {
  symbol: string;
  price: number;
  high: number;
  low: number;
  changePercent: number;
  quoteVolume: number;
  trades: number;
  volume: number;
}

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [sortBy, setSortBy] = useState<keyof CryptoData>('symbol');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Mock crypto data with realistic values
  const mockData: CryptoData[] = [
    {
      symbol: 'BTCUSDT',
      price: 43250.50,
      high: 44100.00,
      low: 42800.25,
      changePercent: 2.45,
      quoteVolume: 1285000000,
      trades: 485230,
      volume: 29734.50
    },
    {
      symbol: 'ETHUSDT',
      price: 2654.75,
      high: 2720.40,
      low: 2580.10,
      changePercent: -1.23,
      quoteVolume: 685000000,
      trades: 325670,
      volume: 258520.75
    },
    {
      symbol: 'BNBUSDT',
      price: 318.90,
      high: 325.50,
      low: 312.20,
      changePercent: 4.67,
      quoteVolume: 125000000,
      trades: 185430,
      volume: 392450.25
    },
    {
      symbol: 'ADAUSDT',
      price: 0.4825,
      high: 0.4950,
      low: 0.4720,
      changePercent: -0.85,
      quoteVolume: 89000000,
      trades: 142560,
      volume: 184520000
    },
    {
      symbol: 'SOLUSDT',
      price: 98.45,
      high: 102.30,
      low: 95.80,
      changePercent: 6.23,
      quoteVolume: 245000000,
      trades: 256780,
      volume: 2485670.50
    },
    {
      symbol: 'XRPUSDT',
      price: 0.6234,
      high: 0.6450,
      low: 0.6120,
      changePercent: -2.14,
      quoteVolume: 156000000,
      trades: 198640,
      volume: 250340000
    },
    {
      symbol: 'DOTUSDT',
      price: 7.42,
      high: 7.85,
      low: 7.15,
      changePercent: 3.87,
      quoteVolume: 67000000,
      trades: 125480,
      volume: 9025640.75
    },
    {
      symbol: 'AVAXUSDT',
      price: 36.78,
      high: 38.90,
      low: 35.20,
      changePercent: -3.45,
      quoteVolume: 98000000,
      trades: 165790,
      volume: 2664850.25
    }
  ];

  useEffect(() => {
    setCryptoData(mockData);
    
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setCryptoData(prevData => 
        prevData.map(item => ({
          ...item,
          price: item.price * (1 + (Math.random() - 0.5) * 0.02), // ±1% random change
          changePercent: item.changePercent + (Math.random() - 0.5) * 0.5,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSort = (column: keyof CryptoData) => {
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

  const formatNumber = (num: number, decimals: number = 2) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toFixed(decimals);
  };

  const getPriceChangeClass = (change: number) => {
    if (change > 0) return 'price-positive';
    if (change < 0) return 'price-negative';
    return 'price-neutral';
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Live Market Data
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real-time cryptocurrency prices and trading data
          </p>
        </div> */}

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
                      onClick={() => handleSort('price')}
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
                      onClick={() => handleSort('changePercent')}
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
                  <th className="text-right p-4">
                    <button 
                      onClick={() => handleSort('trades')}
                      className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer ml-auto"
                    >
                      Trades
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((crypto, index) => (
                  <tr 
                    key={crypto.symbol}
                    className="border-b border-border/10 hover:bg-card/50 transition-all duration-200 price-flash"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="p-4">
                      <div className={`${ index % 2 === 0 ? ' text-yellow-400 font-bold' : 'text-white font-bold'}`}>
                        {crypto.symbol}
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono text-lg font-semibold text-foreground">
                      ${crypto.price < 1 ? crypto.price.toFixed(4) : formatNumber(crypto.price)}
                    </td>
                    <td className="p-4 text-right font-mono text-muted-foreground">
                      ${crypto.high < 1 ? crypto.high.toFixed(4) : formatNumber(crypto.high)}
                    </td>
                    <td className="p-4 text-right font-mono text-muted-foreground">
                      ${crypto.low < 1 ? crypto.low.toFixed(4) : formatNumber(crypto.low)}
                    </td>
                    <td className={`p-4 text-right font-mono font-semibold ${getPriceChangeClass(crypto.changePercent)}`}>
                      <div className="flex items-center justify-end gap-1">
                        {crypto.changePercent > 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {crypto.changePercent > 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}%
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono text-muted-foreground">
                      {formatNumber(crypto.volume)}
                    </td>
                    <td className="p-4 text-right font-mono text-muted-foreground">
                      ${formatNumber(crypto.quoteVolume)}
                    </td>
                    <td className="p-4 text-right font-mono text-muted-foreground">
                      {formatNumber(crypto.trades, 0)}
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