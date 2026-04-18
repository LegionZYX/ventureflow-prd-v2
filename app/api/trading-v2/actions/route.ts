import { applyTradingAction, type TradingAction } from '@/lib/trading-v2-store';

export const dynamic = 'force-dynamic';

interface TradingActionRequest {
  action: TradingAction;
  id: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<TradingActionRequest>;

  if (!body.action || !body.id) {
    return Response.json({ error: 'Missing action or id.' }, { status: 400 });
  }

  const workspace = await applyTradingAction(body.action, body.id);
  return Response.json(workspace);
}
