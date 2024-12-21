'use client';

import React, { useState, useEffect } from 'react';
import { Client,Wallet } from 'xrpl';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  WalletIcon,
  Send,
  RefreshCcw,
  History,
  Activity,
  Lock,
  Key,
  DollarSign,
  ArrowUpRight,
  Clock3,
  Coins,
} from 'lucide-react';

// Transaction Item Component
const TransactionItem = ({ tx }: { tx: any }) => {
  let typeIcon = "💱";
  let statusIcon = tx.status === "tesSUCCESS" ? "✅" : "❌";
  
  switch (tx.type) {
    case "Payment":
      typeIcon = tx.direction === "➡️ Out" ? "📤" : "📥";
      break;
    case "OfferCreate":
      typeIcon = "📈";
      break;
    case "OfferCancel":
      typeIcon = "❌";
      break;
    case "TrustSet":
      typeIcon = "🤝";
      break;
    default:
      typeIcon = "💱";
  }

  return (
    <div className="p-3 border rounded-lg bg-white/50 backdrop-blur hover:shadow-md transition-all">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xl">{typeIcon}</span>
            <span className="font-medium">{tx.type}</span>
            <span className="text-sm bg-gray-100 px-2 py-0.5 rounded">
              {tx.direction}
            </span>
          </div>
          
          {tx.amount !== 'N/A' && (
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">{tx.amount}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Fee</p>
              <p className="font-medium">{tx.fee}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-1 text-sm">
            <Send className="w-3 h-3 rotate-180 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <span className="text-gray-500">From: </span>
              <span className="font-mono text-xs break-all">{tx.from}</span>
            </div>
          </div>
          {tx.to && (
            <div className="flex items-start gap-1 text-sm">
              <Send className="w-3 h-3 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-gray-500">To: </span>
                <span className="font-mono text-xs break-all">{tx.to}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Clock3 className="w-3 h-3 flex-shrink-0" />
            {tx.date}
          </div>
          <div className={`flex items-center gap-1 ${
            tx.status === "tesSUCCESS" ? "text-green-500" : "text-red-500"
          }`}>
            {statusIcon} {tx.status}
          </div>
        </div>

        <a 
          href={tx.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-blue-500 hover:underline flex items-center gap-1"
        >
          <ArrowUpRight className="w-3 h-3" />
          View on XRP Scan
        </a>
      </div>
    </div>
  );
};

const XRPTool = () => {
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [seed, setSeed] = useState('');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [marketData, setMarketData] = useState<any>(null);
  const [networkStats, setNetworkStats] = useState<any>(null);

  useEffect(() => {
    const initClient = async () => {
      try {
        const newClient = new Client('wss://s1.ripple.com/');
        await newClient.connect();
        setClient(newClient);
        fetchNetworkStats();
        fetchMarketData();
      } catch (err) {
        setError('Failed to connect to XRPL');
        console.error(err);
      }
    };

    initClient();
    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  const fetchNetworkStats = async () => {
    if (!client) return;
    try {
      const response = await client.request({
        command: 'server_info'
      });
      setNetworkStats({
        status: response.result.info.server_state,
        ledger: response.result.info.validated_ledger.seq,
        reserveBase: response.result.info.validated_ledger.reserve_base_xrp,
      });
    } catch (err: any) {
      console.error('Failed to fetch network stats:', err);
    }
  };

  const fetchMarketData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd&include_24hr_change=true'
      );
      const data = await response.json();
      setMarketData(data.ripple);
    } catch (err) {
      console.error('Failed to fetch market data:', err);
    }
  };

  const createWallet = async () => {
    setLoading(true);
    setError(null);
    try {
      const newWallet = Wallet.generate();
      setResult({
        action: 'Create Wallet',
        address: newWallet.address,
        seed: newWallet.seed,
        publicKey: newWallet.publicKey,
        note: 'Important: Save your seed (secret key) safely. You will need it to access your wallet.'
      });
    } catch (err: any) {
      setError('Failed to create wallet: ' + err.message);
    }
    setLoading(false);
  };

  const checkBalance = async () => {
    if (!walletAddress) {
      setError('Please enter a wallet address');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await client.request({
        command: 'account_info',
        account: walletAddress,
        ledger_index: 'validated'
      });
      const balance = response.result.account_data.Balance;
      setResult({
        action: 'Check Balance',
        address: walletAddress,
        balance: parseFloat(balance) / 1000000 + ' XRP'
      });
    } catch (err: any) {
      setError('Failed to get balance: ' + err.message);
    }
    setLoading(false);
  };

  const getTransactionHistory = async () => {
    if (!walletAddress) {
      setError('Please enter a wallet address');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await client.request({
        command: "account_tx",
        account: walletAddress,
        ledger_index_min: -1, 
        ledger_index_max: -1,
        binary: false,
        forward: false,
        limit: 25
      });

      console.log("Raw response:", response);

      if (!response?.result?.transactions) {
        throw new Error('No transactions found');
      }

      const formattedTxs = response.result.transactions
        .filter((tx: any) => tx.meta && tx.tx_json)
        .map((tx: any) => {
          const txData = tx.tx_json;
          const meta = tx.meta;
          
          const direction = txData.Account === walletAddress ? '➡️ Out' : '⬅️ In';
          
          let amount = 'N/A';
          if (meta.delivered_amount) {
            if (typeof meta.delivered_amount === 'string') {
              amount = `${Number(meta.delivered_amount) / 1000000} XRP`;
            } else if (typeof meta.delivered_amount === 'object') {
              amount = `${meta.delivered_amount.value} ${
                meta.delivered_amount.currency === '58445A494C4C4100000000000000000000000000' 
                  ? 'XZILLA' 
                  : meta.delivered_amount.currency
              }`;
            }
          } else if (txData.Amount) {
            if (typeof txData.Amount === 'string') {
              amount = `${Number(txData.Amount) / 1000000} XRP`;
            } else if (typeof txData.Amount === 'object') {
              amount = `${txData.Amount.value} ${
                txData.Amount.currency === '58445A494C4C4100000000000000000000000000'
                  ? 'XZILLA'
                  : txData.Amount.currency
              }`;
            }
          }

          // Convert timestamp to UTC
          const utcDate = new Date(tx.close_time_iso);
          const timestamp = utcDate.toUTCString();

          return {
            type: txData.TransactionType,
            hash: tx.hash,
            amount,
            direction,
            from: txData.Account,
            to: txData.Destination,
            fee: `${Number(txData.Fee) / 1000000} XRP`,
            date: timestamp,
            status: meta.TransactionResult,
            link: `https://xrpscan.com/tx/${tx.hash}` 
          };
        });

      setTransactions(formattedTxs);
      console.log("Formatted transactions:", formattedTxs);
      
    } catch (err: any) {
      console.error('Failed to get transaction history:', err);
      setError('Failed to get transaction history: ' + err.message);
      setTransactions([]);
    }
    setLoading(false);
};

  const checkTrustlines = async () => {
    if (!walletAddress) {
      setError('Please enter a wallet address');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await client.request({
        command: 'account_lines',
        account: walletAddress
      });

      setResult({
        action: 'Check Trustlines',
        trustlines: response.result.lines
      });
    } catch (err: any) {
      setError('Failed to get trustlines: ' + err.message);
    }
    setLoading(false);
  };

  const sendXRP = async () => {
    if (!destinationAddress || !amount || !seed) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const wallet = client.fundWallet();
      const prepared = await client.autofill({
        TransactionType: 'Payment',
        Account: wallet.address,
        Amount: (parseFloat(amount) * 1000000).toString(),
        Destination: destinationAddress
      });

      const signed = wallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);

      setResult({
        action: 'Send XRP',
        status: result.result.meta.TransactionResult,
        hash: result.result.hash,
        from: wallet.address,
        to: destinationAddress,
        amount: amount + ' XRP'
      });

      setSeed('');
      setAmount('');
      setDestinationAddress('');
    } catch (err: any) {
      setError('Failed to send XRP: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-2 md:p-4">
      <Card className="p-3 md:p-6">
        <div className="flex flex-col justify-between md:flex-row gap-2">
          <h2 className="text-xl font-bold">XRP Tool</h2>
          {marketData && (
            <div className="text-sm">
              <span className="font-bold">XRP Price: </span>
              <span className={marketData.usd_24h_change >= 0 ? 'text-green-500' : 'text-red-500'}>
                ${marketData.usd} ({marketData.usd_24h_change?.toFixed(2)}%)
              </span>
            </div>
          )}
        </div>
  
        <div className="mt-6">
          <Tabs defaultValue="wallet" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              <TabsTrigger value="wallet" className="flex gap-1 items-center justify-center">
                <WalletIcon className="w-4 h-4" />
                <span>Wallet</span>
              </TabsTrigger>
              <TabsTrigger value="send" className="flex gap-1 items-center justify-center">
                <Send className="w-4 h-4" />
                <span>Send</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex gap-1 items-center justify-center">
                <History className="w-4 h-4" />
                <span>History</span>
              </TabsTrigger>
              <TabsTrigger value="trustlines" className="flex gap-1 items-center justify-center">
                <Lock className="w-4 h-4" />
                <span>Trust</span>
              </TabsTrigger>
            </TabsList>
  
            <TabsContent  value="wallet">
              <div className="flex flex-col gap-4 mt-16">
                <Button onClick={createWallet} disabled={loading || !client} className="w-full">
                  {loading ? 'Creating...' : 'Create New Wallet'}
                </Button>
  
                <div className="flex flex-col gap-2">
                  <Input
                    placeholder="Enter wallet address" 
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="text-sm"
                  />
                  <Button 
                    onClick={checkBalance} 
                    disabled={loading || !client || !walletAddress}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Check Balance
                  </Button>
                </div>
              </div>
            </TabsContent>
  
            <TabsContent value="send">
            <div className="flex flex-col gap-4 mt-16">
                <Input
                  type="password"
                  placeholder="Your Wallet Secret (Never share this!)"
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  className="text-sm"
                />
                <Input
                  placeholder="Destination Address"
                  value={destinationAddress}
                  onChange={(e) => setDestinationAddress(e.target.value)}
                  className="text-sm"
                />
                <Input
                  type="number"
                  placeholder="Amount (XRP)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-sm"
                />
                <Button 
                  onClick={sendXRP}
                  disabled={loading || !client || !amount || !destinationAddress || !seed}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Sending...' : 'Send XRP'}
                </Button>
              </div>
            </TabsContent>
  
            <TabsContent value="history">
            <div className="flex flex-col gap-4 mt-16">
                <div className="flex flex-col gap-2">
                  <Input
                    placeholder="Enter wallet address"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="text-sm"
                  />
                  <Button 
                    onClick={getTransactionHistory}
                    disabled={loading || !client || !walletAddress}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Activity className="w-4 h-4" />
                    Get History
                  </Button>
                </div>
  
                {transactions.length > 0 && (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {transactions.map((tx, index) => (
                      <TransactionItem key={index} tx={tx} />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
  
            <TabsContent value="trustlines">
            <div className="flex flex-col gap-4 mt-16">
                <div className="flex flex-col gap-2">
                  <Input
                    placeholder="Enter wallet address"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="text-sm"
                  />
                  <Button 
                    onClick={checkTrustlines}
                    disabled={loading || !client || !walletAddress}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Key className="w-4 h-4" />
                    Check Trustlines
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
  
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription className="text-sm break-words">{error}</AlertDescription>
          </Alert>
        )}
  
        {result && (
          <Alert className="mt-4">
            <AlertDescription>
              {result.action === 'Create Wallet' && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                      <WalletIcon className="w-4 h-4" />
                      Address:
                    </span>
                    <div className="text-sm break-all font-mono pl-6">{result.address}</div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      Secret Key:
                    </span>
                    <div className="text-sm break-all font-mono pl-6">{result.seed}</div>
                  </div>
  
                  <div className="text-sm text-yellow-600 mt-2">
                    {result.note}
                  </div>
                </div>
              )}
  
              {result.action === 'Check Balance' && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                      <WalletIcon className="w-4 h-4" />
                      Address:
                    </span>
                    <div className="text-sm break-all font-mono pl-6">{result.address}</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Balance: {result.balance}</span>
                  </div>
                </div>
              )}
  
              {result.action === 'Send XRP' && (
                <div className="flex flex-col gap-4">
                  <div className="text-green-500 flex items-center gap-2 text-sm">
                    ✅ Transaction Successful
                  </div>
  
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      From:
                    </span>
                    <div className="text-sm break-all font-mono pl-6">{result.from}</div>
                  </div>
  
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      To:
                    </span>
                    <div className="text-sm break-all font-mono pl-6">{result.to}</div>
                  </div>
  
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Amount: {result.amount}</span>
                  </div>
  
                  <a 
                    href={`https://xrpscan.com/tx/${result.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline flex items-center gap-1 text-sm"
                  >
                    <ArrowUpRight className="w-3 h-3" />
                    View on XRP Scan
                  </a>
                </div>
              )}
  
              {result.action === 'Check Trustlines' && (
                <div className="space-y-4">
                  {result.trustlines.length > 0 ? (
                    result.trustlines.map((line: any, index: number) => (
                      <div key={index} className="p-3 border rounded">
                        <div className="text-sm">Currency: {line.currency}</div>
                        <div className="text-sm break-all">Issuer: {line.account}</div>
                        <div className="text-sm">Balance: {line.balance}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm">No trustlines found</div>
                  )}
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
  
        <div className="mt-4 text-xs text-gray-500">
          {client ? (
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>Connected to XRPL Mainnet</span>
              {networkStats && (
                <span className="hidden md:inline ml-2">
                  (Ledger: {networkStats.ledger}, Reserve: {networkStats.reserveBase} XRP)
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
              <span>Connecting to XRPL Mainnet...</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default XRPTool;