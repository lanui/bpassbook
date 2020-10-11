const { EventEmitter } = require('events');
const log = require('loglevel');
const ObservableStore = require('obs-store');

/**
 * WebsiteController
 * store:BlockNumber,Hash,Cypher64
 * memState:{Plain}
 */
class WebsiteController extends EventEmitter {
  /**
   *
   * @param {Object} opts
   * @property {Object} initState
   * @property {string} Cypher64
   * @property {string} mainAddress
   */
  constructor(opts) {
    super();
    const initState = opts.initState || {};
  }
}
