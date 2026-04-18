'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useTradingWorkspace } from '@/hooks/useTradingWorkspace';
import { getAskRegistry, getBidRegistry, getTradeModeLabel } from '@/lib/trading-v2';

export default function IntentRegistryPage() {
  const { error, loading, workspace } = useTradingWorkspace();

  if (loading || !workspace) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading bid and ask registry...
        </div>
      </DashboardLayout>
    );
  }

  const bidRegistry = getBidRegistry(workspace);
  const askRegistry = getAskRegistry(workspace);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Bid / Ask Registry</h1>
          <p className="mt-2 text-slate-500">
            The registry now tracks company-level bids, asks, listings, and matches from a shared persisted data source.
          </p>
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard label="Bid Orders" value={String(bidRegistry.length)} tone="blue" />
          <StatCard label="Ask Orders" value={String(askRegistry.length)} tone="emerald" />
          <StatCard label="Active Listings" value={String(workspace.listingRecords.length)} tone="slate" />
          <StatCard label="Match Queue" value={String(workspace.orderMatches.length)} tone="purple" />
        </div>

        <RegistrySection
          title="Buyer Bid Orders"
          description="KYC and accredited-investor checks remain the hard gate before a bid becomes active."
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <HeaderCell>Buyer</HeaderCell>
                  <HeaderCell>Mode</HeaderCell>
                  <HeaderCell>Target</HeaderCell>
                  <HeaderCell>Price</HeaderCell>
                  <HeaderCell>Quantity</HeaderCell>
                  <HeaderCell>KYC</HeaderCell>
                  <HeaderCell>Qualified</HeaderCell>
                  <HeaderCell>Valid Until</HeaderCell>
                  <HeaderCell>Status</HeaderCell>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {bidRegistry.map((bid) => (
                  <tr key={bid.id}>
                    <BodyCell>{bid.buyer?.displayName ?? bid.buyerId}</BodyCell>
                    <BodyCell>{getTradeModeLabel(bid.tradeMode)}</BodyCell>
                    <BodyCell>{bid.companyName}</BodyCell>
                    <BodyCell>{bid.bidPriceLabel}</BodyCell>
                    <BodyCell>{bid.quantityLabel}</BodyCell>
                    <BodyCell>{bid.buyer?.kycStatus ?? '-'}</BodyCell>
                    <BodyCell>{bid.accreditedInvestor ? 'Yes' : 'No'}</BodyCell>
                    <BodyCell>{bid.validUntil}</BodyCell>
                    <BodyCell>
                      <StatusPill>{bid.status}</StatusPill>
                    </BodyCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RegistrySection>

        <RegistrySection
          title="Seller Ask Orders"
          description="Ownership review and transferability review still determine whether an ask can enter the listing board."
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <HeaderCell>Seller Alias</HeaderCell>
                  <HeaderCell>Mode</HeaderCell>
                  <HeaderCell>Company</HeaderCell>
                  <HeaderCell>Share Class</HeaderCell>
                  <HeaderCell>Price</HeaderCell>
                  <HeaderCell>Quantity</HeaderCell>
                  <HeaderCell>Ownership</HeaderCell>
                  <HeaderCell>Restriction</HeaderCell>
                  <HeaderCell>Status</HeaderCell>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {askRegistry.map((ask) => (
                  <tr key={ask.id}>
                    <BodyCell>{ask.sellerAlias}</BodyCell>
                    <BodyCell>{getTradeModeLabel(ask.tradeMode)}</BodyCell>
                    <BodyCell>{ask.companyName}</BodyCell>
                    <BodyCell>{ask.shareClass}</BodyCell>
                    <BodyCell>{ask.askPriceLabel}</BodyCell>
                    <BodyCell>{ask.quantityLabel}</BodyCell>
                    <BodyCell>{ask.ownershipStatus}</BodyCell>
                    <BodyCell>{ask.transferRestrictions}</BodyCell>
                    <BodyCell>
                      <StatusPill>{ask.status}</StatusPill>
                    </BodyCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RegistrySection>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <RegistrySection
            title="Listing Board"
            description="Approved asks flow into a company-facing board with seller privacy guard and disclosure level."
          >
            <div className="space-y-3">
              {workspace.listingRecords.map((listing) => (
                <div key={listing.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusPill>{getTradeModeLabel(listing.tradeMode)}</StatusPill>
                    <StatusPill>{listing.sellerVerification}</StatusPill>
                  </div>
                  <p className="mt-3 font-semibold text-slate-900">
                    {listing.companyName} / {listing.shareClass}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {listing.priceRangeLabel} / {listing.quantityRangeLabel}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Seller alias {listing.sellerAlias} / bids {listing.activeBidCount} / matches {listing.activeMatchCount}
                  </p>
                </div>
              ))}
            </div>
          </RegistrySection>

          <RegistrySection
            title="Match Queue"
            description="Platform and FA can process bid/ask matches before moving the opportunity into NDA, negotiation, and deal creation."
          >
            <div className="space-y-3">
              {workspace.orderMatches.map((match) => (
                <div key={match.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {match.companyName} / {getTradeModeLabel(match.tradeMode)}
                      </p>
                      <p className="text-sm text-slate-500">
                        {match.bidOrderId} to {match.askOrderId}
                      </p>
                    </div>
                    <StatusPill>{match.status}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">
                    Match score {match.matchScore} / Lead FA {match.leadFaId}
                  </p>
                </div>
              ))}
            </div>
          </RegistrySection>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'blue' | 'emerald' | 'slate' | 'purple';
}) {
  const colorMap = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    slate: 'text-slate-900',
    purple: 'text-purple-600',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${colorMap[tone]}`}>{value}</p>
    </div>
  );
}

function RegistrySection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function HeaderCell({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
      {children}
    </th>
  );
}

function BodyCell({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-4 text-sm text-slate-700">{children}</td>;
}

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
      {children}
    </span>
  );
}
