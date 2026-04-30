import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";

interface WalletDropdownProps {
  onClose: () => void;
}

export default function WalletDropdown({ onClose }: WalletDropdownProps) {
  const [activeTab, setActiveTab] = useState<"spot" | "futures">("spot");
  const [transferAmount, setTransferAmount] = useState("");
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchWallet = async () => {
    try {
      const response = await api.get("/wallet");
      if (response.data?.success) {
        setWallet(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const spotAvailable = Number(wallet?.balanceUsd || 0);
  const spotLocked = Number(wallet?.investedUsd || 0);
  const spotTotal = spotAvailable + spotLocked;

  const futuresAvailable = Number(wallet?.futuresBalanceUsd || 0);
  const futuresLocked = Number(wallet?.futuresInvestedUsd || 0);
  const futuresTotal = futuresAvailable + futuresLocked;

  const handleTransfer = async () => {
    if (!transferAmount || isNaN(Number(transferAmount))) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    try {
      await api.post("/wallet/transfer", {
        from: activeTab,
        to: activeTab === "spot" ? "futures" : "spot",
        amount: Number(transferAmount),
      });
      toast.success(`Transferred $${transferAmount} successfully!`);
      setTransferAmount("");
      fetchWallet();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Transfer failed");
    }
  };

  return (
    <div className="absolute right-0 top-[calc(100%+8px)] w-[320px] bg-[var(--surface-1)] border border-[var(--line-soft)] rounded-xl shadow-2xl z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-4 border-b border-[var(--line-soft)] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[var(--text-strong)]">Asset Overview</h3>
          <p className="text-[11px] text-[var(--text-muted)] mt-1">Manage your virtual trading funds</p>
        </div>
        <button 
          onClick={fetchWallet}
          className={`p-1.5 rounded-md hover:bg-[var(--surface-2)] transition-all ${loading ? 'animate-spin' : ''}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-muted)]">
            <path d="M23 4v6h-6" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Balances */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--line-soft)]">
            <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Spot Wallet</p>
            <p className="text-sm font-black text-[var(--text-strong)] mt-1">
              ${spotAvailable.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <p className="mt-1 text-[10px] text-[var(--text-muted)]">
              Locked: ${spotLocked.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <p className="text-[10px] text-[var(--text-soft)] font-semibold">
              Total: ${spotTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--line-soft)]">
            <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Futures Wallet</p>
            <p className="text-sm font-black text-[#3ed87b] mt-1">
              ${futuresAvailable.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <p className="mt-1 text-[10px] text-[var(--text-muted)]">
              Locked: ${futuresLocked.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <p className="text-[10px] text-[var(--text-soft)] font-semibold">
              Total: ${futuresTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Transfer Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-[var(--text-strong)]">Transfer Funds</p>
            <div className="flex bg-[var(--surface-3)] rounded-md p-0.5 border border-[var(--line-soft)]">
              <button 
                onClick={() => setActiveTab("spot")}
                className={`px-2 py-1 text-[10px] font-bold rounded ${activeTab === 'spot' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-muted)]'}`}
              >
                TO FUTURES
              </button>
              <button 
                onClick={() => setActiveTab("futures")}
                className={`px-2 py-1 text-[10px] font-bold rounded ${activeTab === 'futures' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-muted)]'}`}
              >
                TO SPOT
              </button>
            </div>
          </div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="Amount to transfer..."
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              className="w-full h-10 bg-[var(--surface-3)] border border-[var(--line-soft)] rounded-md px-3 text-xs text-[var(--text-strong)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
            <button 
              onClick={() => setTransferAmount((activeTab === 'spot' ? spotAvailable : futuresAvailable).toString() || "0")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[var(--accent)]"
            >
              MAX
            </button>
          </div>

          <button 
            onClick={handleTransfer}
            className="w-full h-10 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold rounded-md transition-all shadow-lg shadow-[var(--accent)]/20"
          >
            CONFIRM TRANSFER
          </button>
        </div>
      </div>
{/* 
      <div className="p-3 bg-[var(--surface-2)] rounded-b-xl border-t border-[var(--line-soft)] flex items-center justify-between">
        <button className="text-[10px] font-bold text-[var(--text-soft)] hover:text-[var(--text-strong)] transition-colors">Transaction History</button>
        <button className="text-[10px] font-bold text-[var(--text-soft)] hover:text-[var(--text-strong)] transition-colors">Wallet Analytics</button>
      </div> */}
    </div>
  );
}
