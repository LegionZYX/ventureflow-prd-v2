import { readTradingWorkspace } from '@/lib/trading-v2-store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const workspace = await readTradingWorkspace();
  return Response.json(workspace);
}
