"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { Wallet, ConnectWallet } from "@coinbase/onchainkit/wallet";
import { Name } from "@coinbase/onchainkit/identity";
import { useEffect } from "react";
import Diary from "../components/Diary";

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] bg-[var(--app-background)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        {/* Header */}
        <header className="flex justify-between items-center mb-3 h-11">
          <Wallet>
            <ConnectWallet>
              <Name className="text-inherit" />
            </ConnectWallet>
          </Wallet>
        </header>

        {/* Diary App */}
        <main className="flex-1">
          <Diary />
        </main>

        {/* Footer */}
        <footer className="mt-2 pt-4 flex justify-center">
          <p className="text-xs text-gray-500">Built with MiniKit ✨</p>
        </footer>
      </div>
    </div>
  );
}
