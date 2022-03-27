import { DimensionServiceByJsonRPC } from './DimensionServiceByJsonRPC';
import { Ed25519 } from '../lib/Keys';

describe('DimensionServiceByJsonRPC', () => {
  it('should validate bool value and create bool Argument', async () => {
    const dimensionService = new DimensionServiceByJsonRPC(
      'http://192.168.2.166:7777/rpc'
    );
    // const status = await dimensionService.getLatestBlockInfo();
    const re = await dimensionService.getLatestBlockInfo();
    console.log(re.block!.header.system_transactions);
    const balanceUref = await dimensionService.getAccountBalanceUrefByPublicKey(
      re.block!.hash,
      Ed25519.new().publicKey
    );
    const balance = await dimensionService.getAccountBalance(
      re.block!.hash,
      balanceUref
    );
    console.log(balance);
  });
});
