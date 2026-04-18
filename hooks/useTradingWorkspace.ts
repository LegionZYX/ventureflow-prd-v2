'use client';

import { useEffect, useState, useTransition } from 'react';
import type { TradingWorkspace } from '@/lib/trading-v2';

type TradingAction =
  | 'advanceRecommendation'
  | 'advanceAgreement'
  | 'advanceReward'
  | 'advanceDeal'
  | 'advanceFAOnboarding'
  | 'advanceTransferApproval'
  | 'advanceEscrow'
  | 'withdrawBid'
  | 'reconfirmBid'
  | 'withdrawAsk'
  | 'reconfirmAsk'
  | 'advanceDocumentReview'
  | 'advanceSellerDisclosure'
  | 'advanceSettlement'
  | 'advanceSellerPayout';

interface UseTradingWorkspaceResult {
  error: string | null;
  isPending: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
  runAction: (action: TradingAction, id: string) => Promise<void>;
  workspace: TradingWorkspace | null;
}

export function useTradingWorkspace(): UseTradingWorkspaceResult {
  const [workspace, setWorkspace] = useState<TradingWorkspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const refresh = async () => {
    try {
      setError(null);
      const response = await fetch('/api/trading-v2', { cache: 'no-store' });

      if (!response.ok) {
        throw new Error('Failed to load trading workspace.');
      }

      const nextWorkspace = (await response.json()) as TradingWorkspace;
      setWorkspace(nextWorkspace);
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : 'Unknown error.');
    } finally {
      setLoading(false);
    }
  };

  const runAction = async (action: TradingAction, id: string) => {
    setError(null);

    startTransition(() => {
      void (async () => {
        try {
          const response = await fetch('/api/trading-v2/actions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action, id }),
          });

          if (!response.ok) {
            throw new Error('Failed to update trading workspace.');
          }

          const nextWorkspace = (await response.json()) as TradingWorkspace;
          setWorkspace(nextWorkspace);
        } catch (actionError) {
          setError(actionError instanceof Error ? actionError.message : 'Unknown error.');
        }
      })();
    });
  };

  useEffect(() => {
    void refresh();
  }, []);

  return {
    error,
    isPending,
    loading,
    refresh,
    runAction,
    workspace,
  };
}
