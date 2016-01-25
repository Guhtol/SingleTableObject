(function(root) {
  'use strict';

  var SingleTableObject = function (headers) {
    this.headers = this._createHeaders(headers);

    this.table = document.createElement('table');
    this.thead = document.createElement('thead');
    this.tbody = document.createElement('tbody');
    this.theadRow = document.createElement('tr');

    this.table
      .appendChild(this.thead)
      .appendChild(this.theadRow)
      .appendChild(this._createHeadersFrag());

    this.table.appendChild(this.tbody);
  };

  SingleTableObject.prototype._createHeaders = function (obj) {
    var headers = [];

    for (var k in obj) {
      if (!obj.hasOwnProperty(k)) continue;

      var th = document.createElement('th');
      th.textContent = obj[k];

      headers.push({ id: k, el: th });
    }

    return headers;
  };

  SingleTableObject.prototype._createHeadersFrag = function () {
    var length = this.headers.length;
    var frag = document.createDocumentFragment();

    for (var i = 0; i < length; i++) {
      frag.appendChild(this.headers[i].el);
    }

    return frag;
  };

  root.SingleTableObject = SingleTableObject;
})(this);
