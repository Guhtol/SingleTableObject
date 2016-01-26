(function(root) {
  'use strict';

  function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

  var SingleTableObject = function (headers) {
    this.options = {
      allowHTML: false,
      arrSeparator: ', '
    };

    this._columnsOrder = this._getOrder(headers);
    this.headers = this._createColumns(headers, 'th');

    this._table = document.createElement('table');
    this._thead = document.createElement('thead');
    this._tbody = document.createElement('tbody');
    this._theadRow = document.createElement('tr');

    this._table
      .appendChild(this._thead)
      .appendChild(this._theadRow)
      .appendChild(this._createColumnsFrag(this.headers));

    this._table.appendChild(this._tbody);
  };

  SingleTableObject.prototype._createColumns = function (obj, tag) {
    var columns = {};
    var t = tag || 'td';

    for (var k in obj) {
      if (!obj.hasOwnProperty(k)) continue;

      var th = document.createElement(t);
      var value = '';

      if (isArray(obj[k])) {
        value = obj[k].join(this.options.arrSeparator || ', ');
      } else {
        value = obj[k];
      }

      if (this.options.allowHTML) {
        th.innerHTML = value;
      } else {
        th.textContent = value;
      }

      columns[k] = th;
    }
    return columns;
  };

  SingleTableObject.prototype._createColumnsFrag = function (columns) {
    var length = this._columnsOrder.length;
    var frag = document.createDocumentFragment();

    for (var i = 0; i < length; i++) {
      if (columns[this._columnsOrder[i]]) {
        frag.appendChild(columns[this._columnsOrder[i]]);
      } else {
        frag.appendChild(document.createElement('td'));
      }
    }
    return frag;
  };

  SingleTableObject.prototype._getOrder = function (obj) {
    var order = [];

    for (var k in obj) {
      if (!obj.hasOwnProperty(k)) continue;
      order.push(k);
    }
    return order;
  };

  SingleTableObject.prototype._filterColumns = function (columns) {
    var filtered = {};

    for (var k in columns) {
      if (!columns.hasOwnProperty(k) || !this.headers.hasOwnProperty(k)) continue;
      filtered[k] = columns[k];
    }
    return filtered;
  };

  SingleTableObject.prototype.add = function (obj) {
    if (isArray(obj)) {
        var length = obj.length;

        for (var i = 0; i < length; i++) {
          this.add(obj[i]);
        }
        return this;
    }

    var columns = this._createColumns(this._filterColumns(obj));
    var frag = this._createColumnsFrag(columns);
    var tr = document.createElement('tr');

    this._tbody
      .appendChild(tr)
      .appendChild(frag);

    return this;
  };

  SingleTableObject.prototype.appendTo = function (el) {
    if (typeof el === 'string') {
      return this.appendTo(document.getElementById(el));
    }

    return el.appendChild(this._table);
  };

  root.SingleTableObject = SingleTableObject;
})(this);
