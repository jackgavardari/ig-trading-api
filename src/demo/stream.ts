import {initClient} from './initClient';
import {ChartResolution} from '../lightstreamer/interfaces';
import {CandleStick, TickPrice, MarketUpdates} from '../market';
import {tradeSubscriptionUpdate} from '../dealing';
import {AccountUpdate} from '../account';

async function main(): Promise<void> {
  const client = await initClient();
  client.stream.subscribeCandles(
    ['IX.D.NASDAQ.IFS.IP', 'IX.D.DOW.IFS.IP', 'CS.D.CFPGOLD.CFP.IP', 'CS.D.USDJPY.CFD.IP'],
    ChartResolution.SECOND,
    (epic: string, candle: CandleStick) => {
      console.info('Streaming API Event  (subscribeCandles) : ', epic, candle);
    }
  );
  client.stream.subscribeTicks(['IX.D.NASDAQ.IFS.IP'], (epic: string, tickPrice: TickPrice) => {
    console.info('Streaming API Event (subscribeTicks) : ', epic, tickPrice);
  });
  client.stream.subscribeTrade((accountId: string, tradeSubscriptionUpdate: tradeSubscriptionUpdate) => {
    console.info('Streaming API Event (subscribeTrade) : ', accountId, tradeSubscriptionUpdate);
  });
  client.stream.subscribeAccount((accountId: string, accountUpdate: AccountUpdate) => {
    console.info('Streaming API Event (subscribeAccount) : ', accountId, accountUpdate);
  });
  client.stream.subscribeMarketUpdates(['IX.D.NIKKEI.IFA.IP'], (epic: string, marketUpdate: MarketUpdates) => {
    console.info('Streaming API Event (MarketUpdated) : ', epic, marketUpdate);
  });
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
