import pump from 'pump';

import ObjectMultiplex from 'obj-multiplex';
import SafeEventEmitter from 'safe-event-emitter';
const EventEmitter = require('events');

const { duplex: isDuplex } = require('is-stream');

class BPInjetProvider extends SafeEventEmitter {
  constructor(connectionStream, { logger = console, maxEventListeners = 100, shouldSendMetadata = true } = {}) {
    log = logger;

    if (!isDuplex(connectionStream)) {
      throw new Error('Must provide a Node.js-style duplex stream.');
    }

    if (typeof maxEventListeners !== 'number' || typeof shouldSendMetadata !== 'boolean') {
      throw new Error(
        `Invalid options. Received: { maxEventListeners: ${maxEventListeners}, shouldSendMetadata: ${shouldSendMetadata} }`
      );
    }

    super();

    this.setMaxListeners(maxEventListeners);

    this._state = {
      isUnlocked: undefined,
    };

    this._handleDisconnect = this._handleDisconnect.bind(this);

    const mux = new ObjectMultiplex();
    pump(connectionStream, mux, connectionStream, this._handleDisconnect.bind(this, 'BPassword'));
  }

  _handleDisconnect(streamName, err) {
    logStreamDisconnectWarning.bind(this)(log, streamName, err);

    const disconnectError = {
      code: 9527,
      reson: 'BPassword: Lost connection to BPassword background process.',
    };
  }
}

function logStreamDisconnectWarning(log, remoteLabel, err) {
  let errMsg = `BPinjetProvider - lost connection to ${remoteLabel}`;

  if (err) {
    errMsg += `\n${err.stack}`;
  }

  log.warn(errMsg);
  if (this instanceof EventEmitter || this instanceof SafeEventEmitter) {
    if (this.listenerCount('error') > 0) {
      this.emit('error', errMsg);
    }
  }
}
