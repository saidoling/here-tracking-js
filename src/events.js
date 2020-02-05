/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * View details about events created by devices and rules
 *
 * This class handles device claiming and unclaiming as well as mapping deviceId to trackingID and vice versa.
 *
 */
class Events {

  /**
   * @param {Object} utils - General utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   */
  constructor(utils) {
    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string} Generate the URL for HERE Tracking
     */
    this.url = utils.url;
    /**
     * Check the supplied parameters
     * @type {function(options: Object, required: Array): Promise}
     */
    this.validate = utils.validate;
    /**
     * Wrap the standard Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
     * to provide error handling
     * @type {function(url: string, options: Object): Object}
     */
    this.fetch = utils.fetch;
  }

  /**
   * List all events available to the user.
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {number} [options.count] - Number of rules returned per page (default 100)
   * @param {string} [options.pageToken] - Page token used for retrieving next page
   * @returns {Object} Body of the rules response
   * @throws {Error} When an HTTP error has occurred
   */
  list({ count, pageToken, token }) {
    return this.validate({ token }, ['token'])
      .then(() => {
        const queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }
        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        const url = this.url('events', 'v3', queryParameters);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Get events generated by a specific device
   *
   * @param {string} trackingId - ID of tracker
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {number} [options.count] - Number of rules returned per page (default 100)
   * @param {string} [options.pageToken] - Page token used for retrieving next page
   * @returns {Object} Body of the rules response
   * @throws {Error} When an HTTP error has occurred
   */
  getByDevice(trackingId, { count, pageToken, token }) {
    return this.validate({ trackingId, token }, ['trackingId', 'token'])
      .then(() => {
        const queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }
        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        const url = this.url('events', 'v3', trackingId, queryParameters);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Get all events generated by a specific rule
   *
   * @param {string} trackingId - ID of tracker
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {number} [options.count] - Number of rules returned per page (default 100)
   * @param {string} [options.pageToken] - Page token used for retrieving next page
   * @returns {Object} Body of the rules response
   * @throws {Error} When an HTTP error has occurred
   */
  getByRule(ruleId, { count, pageToken, token }) {
    return this.validate({ ruleId, token }, ['ruleId', 'token'])
      .then(() => {
        const queryParameters = {
          ruleId
        };

        if (count) {
          queryParameters.count = count;
        }
        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        const url = this.url('events', 'v3', queryParameters);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

  /**
   * Get details of a specific event
   *
   * @param {string} trackingId - ID of tracker
   * @param {string} ruleId - ID of rule
   * @param {string} timestamp - Time the event happened
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {number} [options.count] - Number of rules returned per page (default 100)
   * @param {string} [options.pageToken] - Page token used for retrieving next page
   * @returns {Object} Body of the rules response
   * @throws {Error} When an HTTP error has occurred
   */
  getDetails(trackingId, ruleId, timestamp, { count, pageToken, token }) {
    return this.validate({ trackingId, ruleId, timestamp, token }, ['trackingId', 'ruleId', 'timestamp', 'token'])
      .then(() => {
        const queryParameters = {
          trackingId,
          ruleId,
          timestamp
        };

        if (count) {
          queryParameters.count = count;
        }
        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        const url = this.url('events', 'v3', queryParameters);

        return this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          })
        });
      });
  }

}

module.exports = Events;
