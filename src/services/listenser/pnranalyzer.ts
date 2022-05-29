import mitt, { Handler } from 'mitt';
import { PnrOrder } from '../airmodles';

const key = Symbol('PNR_ANALYZED');

const emitter = mitt();

export const setPnrAnalyzerEmitter = (pnr: any) => {
  const pnrOrdre: PnrOrder = {} as PnrOrder;
  pnrOrdre.journey = pnr.journey;
  pnrOrdre.pax = pnr.person;
  pnrOrdre.price = pnr.price;
  pnrOrdre.code = pnr.code;
  emitter.emit(key, pnrOrdre);
};

export const listenerPnrAnalyzer = (handle: Handler) => {
  emitter.on(key, handle);
};
