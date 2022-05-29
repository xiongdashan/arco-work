import mitt, { Handler } from 'mitt';

const key = Symbol('PAX_CHANGE');

const emitter = mitt();

export function setPaxEmitter(pax: string[]) {
  emitter.emit(key, pax);
}

export function listenerPaxChange(handler: Handler) {
  emitter.on(key, handler);
}
