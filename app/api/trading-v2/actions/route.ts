import {
  applyTradingAction,
  type TradingAction,
  type TradingPayload,
} from '@/lib/trading-v2-store';

export const dynamic = 'force-dynamic';

interface TradingActionRequest {
  action: TradingAction;
  id?: string;
  payload?: TradingPayload;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<TradingActionRequest>;

  if (!body.action) {
    return Response.json({ error: 'Missing action.' }, { status: 400 });
  }

  const workspace = await applyTradingAction(body.action, body.id, body.payload);
  return Response.json(workspace);
}
