'use strict';

const path = require('path');

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);
    this._ensureFindHost();

    let vendorPath = `vendor/${this.name}`;
    let host = this._findHost();

    host.import(path.join(vendorPath, 'document-title.js'));
  },

  _ensureFindHost() {
    if (!this._findHost) {
      this._findHost = function findHostShim() {
        let current = this;
        let app;

        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));

        return app;
      };
    }
  }
};
