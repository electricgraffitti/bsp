/*
 * File:        jquery.dataTables.min.js
 * Version:     1.9.0
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Info:        www.datatables.net
 * 
 * Copyright 2008-2012 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 * 
 * This source file is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 */
(function (i, oa, t, p) {
  var m = function (h) {
      function n(a, b) {
        var c = m.defaults.columns,
          d = a.aoColumns.length;
        b = i.extend({}, m.models.oColumn, c, {
          sSortingClass: a.oClasses.sSortable,
          sSortingClassJUI: a.oClasses.sSortJUI,
          nTh: b ? b : t.createElement("th"),
          sTitle: c.sTitle ? c.sTitle : b ? b.innerHTML : "",
          aDataSort: c.aDataSort ? c.aDataSort : [d],
          mDataProp: c.mDataProp ? c.oDefaults : d
        });
        a.aoColumns.push(b);
        if (a.aoPreSearchCols[d] === p || a.aoPreSearchCols[d] === null) a.aoPreSearchCols[d] = i.extend({}, m.models.oSearch);
        else {
          b = a.aoPreSearchCols[d];
          if (b.bRegex === p) b.bRegex = true;
          if (b.bSmart === p) b.bSmart = true;
          if (b.bCaseInsensitive === p) b.bCaseInsensitive = true
        }
        r(a, d, null)
      }
      function r(a, b, c) {
        b = a.aoColumns[b];
        if (c !== p && c !== null) {
          if (c.sType !== p) {
            b.sType = c.sType;
            b._bAutoType = false
          }
          i.extend(b, c);
          q(b, c, "sWidth", "sWidthOrig");
          if (c.iDataSort !== p) b.aDataSort = [c.iDataSort];
          q(b, c, "aDataSort")
        }
        b.fnGetData = ha(b.mDataProp);
        b.fnSetData = Ga(b.mDataProp);
        if (!a.oFeatures.bSort) b.bSortable = false;
        if (!b.bSortable || i.inArray("asc", b.asSorting) == -1 && i.inArray("desc", b.asSorting) == -1) {
          b.sSortingClass = a.oClasses.sSortableNone;
          b.sSortingClassJUI = ""
        } else if (b.bSortable || i.inArray("asc", b.asSorting) == -1 && i.inArray("desc", b.asSorting) == -1) {
          b.sSortingClass = a.oClasses.sSortable;
          b.sSortingClassJUI = a.oClasses.sSortJUI
        } else if (i.inArray("asc", b.asSorting) != -1 && i.inArray("desc", b.asSorting) == -1) {
          b.sSortingClass = a.oClasses.sSortableAsc;
          b.sSortingClassJUI = a.oClasses.sSortJUIAscAllowed
        } else if (i.inArray("asc", b.asSorting) == -1 && i.inArray("desc", b.asSorting) != -1) {
          b.sSortingClass = a.oClasses.sSortableDesc;
          b.sSortingClassJUI = a.oClasses.sSortJUIDescAllowed
        }
      }
      function o(a) {
        if (a.oFeatures.bAutoWidth === false) return false;
        pa(a);
        for (var b = 0, c = a.aoColumns.length; b < c; b++) a.aoColumns[b].nTh.style.width = a.aoColumns[b].sWidth
      }
      function w(a, b) {
        for (var c = -1, d = 0; d < a.aoColumns.length; d++) {
          a.aoColumns[d].bVisible === true && c++;
          if (c == b) return d
        }
        return null
      }
      function x(a, b) {
        for (var c = -1, d = 0; d < a.aoColumns.length; d++) {
          a.aoColumns[d].bVisible === true && c++;
          if (d == b) return a.aoColumns[d].bVisible === true ? c : null
        }
        return null
      }
      function B(a) {
        for (var b = 0, c = 0; c < a.aoColumns.length; c++) a.aoColumns[c].bVisible === true && b++;
        return b
      }
      function D(a) {
        for (var b = m.ext.aTypes, c = b.length, d = 0; d < c; d++) {
          var e = b[d](a);
          if (e !== null) return e
        }
        return "string"
      }
      function G(a, b) {
        b = b.split(",");
        for (var c = [], d = 0, e = a.aoColumns.length; d < e; d++) for (var f = 0; f < e; f++) if (a.aoColumns[d].sName == b[f]) {
          c.push(f);
          break
        }
        return c
      }
      function F(a) {
        for (var b = "", c = 0, d = a.aoColumns.length; c < d; c++) b += a.aoColumns[c].sName + ",";
        if (b.length == d) return "";
        return b.slice(0, -1)
      }
      function R(a, b, c, d) {
        var e, f, g, j, l;
        if (b) for (e = b.length - 1; e >= 0; e--) {
          var k = b[e].aTargets;
          i.isArray(k) || N(a, 1, "aTargets must be an array of targets, not a " + typeof k);
          f = 0;
          for (g = k.length; f < g; f++) if (typeof k[f] === "number" && k[f] >= 0) {
            for (; a.aoColumns.length <= k[f];) n(a);
            d(k[f], b[e])
          } else if (typeof k[f] === "number" && k[f] < 0) d(a.aoColumns.length + k[f], b[e]);
          else if (typeof k[f] === "string") {
            j = 0;
            for (l = a.aoColumns.length; j < l; j++) if (k[f] == "_all" || i(a.aoColumns[j].nTh).hasClass(k[f])) d(j, b[e])
          }
        }
        if (c) {
          e = 0;
          for (a = c.length; e < a; e++) d(e, c[e])
        }
      }
      function O(a, b) {
        var c;
        c = i.isArray(b) ? b.slice() : i.extend(true, {}, b);
        b = a.aoData.length;
        c = i.extend(true, {}, m.models.oRow, {
          _aData: c
        });
        a.aoData.push(c);
        for (var d, e = 0, f = a.aoColumns.length; e < f; e++) {
          c = a.aoColumns[e];
          typeof c.fnRender === "function" && c.bUseRendered && c.mDataProp !== null && S(a, b, e, ba(a, b, e));
          if (c._bAutoType && c.sType != "string") {
            d = E(a, b, e, "type");
            if (d !== null && d !== "") {
              d = D(d);
              if (c.sType === null) c.sType = d;
              else if (c.sType != d && c.sType != "html") c.sType = "string"
            }
          }
        }
        a.aiDisplayMaster.push(b);
        a.oFeatures.bDeferRender || qa(a, b);
        return b
      }
      function ia(a) {
        var b, c, d, e, f, g, j, l, k;
        if (a.bDeferLoading || a.sAjaxSource === null) {
          j = a.nTBody.childNodes;
          b = 0;
          for (c = j.length; b < c; b++) if (j[b].nodeName.toUpperCase() == "TR") {
            l = a.aoData.length;
            j[b]._DT_RowIndex = l;
            a.aoData.push(i.extend(true, {}, m.models.oRow, {
              nTr: j[b]
            }));
            a.aiDisplayMaster.push(l);
            g = j[b].childNodes;
            d = f = 0;
            for (e = g.length; d < e; d++) {
              k = g[d].nodeName.toUpperCase();
              if (k == "TD" || k == "TH") {
                S(a, l, f, i.trim(g[d].innerHTML));
                f++
              }
            }
          }
        }
        j = ca(a);
        g = [];
        b = 0;
        for (c = j.length; b < c; b++) {
          d = 0;
          for (e = j[b].childNodes.length; d < e; d++) {
            f = j[b].childNodes[d];
            k = f.nodeName.toUpperCase();
            if (k == "TD" || k == "TH") g.push(f)
          }
        }
        e = 0;
        for (j = a.aoColumns.length; e < j; e++) {
          k = a.aoColumns[e];
          if (k.sTitle === null) k.sTitle = k.nTh.innerHTML;
          f = k._bAutoType;
          l = typeof k.fnRender === "function";
          var y = k.sClass !== null,
            u = k.bVisible,
            v, A;
          if (f || l || y || !u) {
            b = 0;
            for (c = a.aoData.length; b < c; b++) {
              d = a.aoData[b];
              v = g[b * j + e];
              if (f && k.sType != "string") {
                A = E(a, b, e, "type");
                if (A !== "") {
                  A = D(A);
                  if (k.sType === null) k.sType = A;
                  else if (k.sType != A && k.sType != "html") k.sType = "string"
                }
              }
              if (typeof k.mDataProp === "function") v.innerHTML = E(a, b, e, "display");
              if (l) {
                A = ba(a, b, e);
                v.innerHTML = A;
                k.bUseRendered && S(a, b, e, A)
              }
              if (y) v.className += " " + k.sClass;
              if (u) d._anHidden[e] = null;
              else {
                d._anHidden[e] = v;
                v.parentNode.removeChild(v)
              }
              k.fnCreatedCell && k.fnCreatedCell.call(a.oInstance, v, E(a, b, e, "display"), d._aData, b, e)
            }
          }
        }
        if (a.aoRowCreatedCallback.length !== 0) {
          b = 0;
          for (c = a.aoData.length; b < c; b++) {
            d = a.aoData[b];
            L(a, "aoRowCreatedCallback", null, [d.nTr, d._aData, b])
          }
        }
      }
      function M(a, b) {
        return b._DT_RowIndex !== p ? b._DT_RowIndex : null
      }
      function ra(a, b, c) {
        b = T(a, b);
        var d = 0;
        for (a = a.aoColumns.length; d < a; d++) if (b[d] === c) return d;
        return -1
      }
      function ja(a, b, c) {
        for (var d = [], e = 0, f = a.aoColumns.length; e < f; e++) d.push(E(a, b, e, c));
        return d
      }
      function E(a, b, c, d) {
        var e = a.aoColumns[c];
        if ((c = e.fnGetData(a.aoData[b]._aData, d)) === p) {
          if (a.iDrawError != a.iDraw && e.sDefaultContent === null) {
            N(a, 0, "Requested unknown parameter '" + e.mDataProp + "' from the data source for row " + b);
            a.iDrawError = a.iDraw
          }
          return e.sDefaultContent
        }
        if (c === null && e.sDefaultContent !== null) c = e.sDefaultContent;
        else if (typeof c === "function") return c();
        if (d == "display" && c === null) return "";
        return c
      }
      function S(a, b, c, d) {
        a.aoColumns[c].fnSetData(a.aoData[b]._aData, d)
      }
      function ha(a) {
        if (a === null) return function () {
          return null
        };
        else if (typeof a === "function") return function (c, d) {
          return a(c, d)
        };
        else if (typeof a === "string" && a.indexOf(".") != -1) {
          var b = a.split(".");
          return function (c) {
            for (var d = 0, e = b.length; d < e; d++) {
              c = c[b[d]];
              if (c === p) return p
            }
            return c
          }
        } else return function (c) {
          return c[a]
        }
      }
      function Ga(a) {
        if (a === null) return function () {};
        else if (typeof a === "function") return function (c, d) {
          a(c, "set", d)
        };
        else if (typeof a === "string" && a.indexOf(".") != -1) {
          var b = a.split(".");
          return function (c, d) {
            for (var e = 0, f = b.length - 1; e < f; e++) c = c[b[e]];
            c[b[b.length - 1]] = d
          }
        } else return function (c, d) {
          c[a] = d
        }
      }
      function ka(a) {
        for (var b = [], c = a.aoData.length, d = 0; d < c; d++) b.push(a.aoData[d]._aData);
        return b
      }
      function sa(a) {
        a.aoData.splice(0, a.aoData.length);
        a.aiDisplayMaster.splice(0, a.aiDisplayMaster.length);
        a.aiDisplay.splice(0, a.aiDisplay.length);
        J(a)
      }
      function ta(a, b) {
        for (var c = -1, d = 0, e = a.length; d < e; d++) if (a[d] == b) c = d;
        else a[d] > b && a[d]--;
        c != -1 && a.splice(c, 1)
      }
      function ba(a, b, c) {
        var d = a.aoColumns[c];
        return d.fnRender({
          iDataRow: b,
          iDataColumn: c,
          oSettings: a,
          aData: a.aoData[b]._aData,
          mDataProp: d.mDataProp
        }, E(a, b, c, "display"))
      }
      function qa(a, b) {
        var c = a.aoData[b],
          d;
        if (c.nTr === null) {
          c.nTr = t.createElement("tr");
          c.nTr._DT_RowIndex = b;
          if (c._aData.DT_RowId) c.nTr.id = c._aData.DT_RowId;
          c._aData.DT_RowClass && i(c.nTr).addClass(c._aData.DT_RowClass);
          for (var e = 0, f = a.aoColumns.length; e < f; e++) {
            var g = a.aoColumns[e];
            d = t.createElement("td");
            d.innerHTML = typeof g.fnRender === "function" && (!g.bUseRendered || g.mDataProp === null) ? ba(a, b, e) : E(a, b, e, "display");
            if (g.sClass !== null) d.className = g.sClass;
            if (g.bVisible) {
              c.nTr.appendChild(d);
              c._anHidden[e] = null
            } else c._anHidden[e] = d;
            g.fnCreatedCell && g.fnCreatedCell.call(a.oInstance, d, E(a, b, e, "display"), c._aData, b, e)
          }
          L(a, "aoRowCreatedCallback", null, [c.nTr, c._aData, b])
        }
      }
      function Ha(a) {
        var b, c, d;
        if (a.nTHead.getElementsByTagName("th").length !== 0) {
          b = 0;
          for (d = a.aoColumns.length; b < d; b++) {
            c = a.aoColumns[b].nTh;
            c.setAttribute("role", "columnheader");
            if (a.aoColumns[b].bSortable) {
              c.setAttribute("tabindex", a.iTabIndex);
              c.setAttribute("aria-controls", a.sTableId)
            }
            a.aoColumns[b].sClass !== null && i(c).addClass(a.aoColumns[b].sClass);
            if (a.aoColumns[b].sTitle != c.innerHTML) c.innerHTML = a.aoColumns[b].sTitle
          }
        } else {
          var e = t.createElement("tr");
          b = 0;
          for (d = a.aoColumns.length; b < d; b++) {
            c = a.aoColumns[b].nTh;
            c.innerHTML = a.aoColumns[b].sTitle;
            c.setAttribute("tabindex", "0");
            a.aoColumns[b].sClass !== null && i(c).addClass(a.aoColumns[b].sClass);
            e.appendChild(c)
          }
          i(a.nTHead).html("")[0].appendChild(e);
          da(a.aoHeader, a.nTHead)
        }
        i(a.nTHead).children("tr").attr("role", "row");
        if (a.bJUI) {
          b = 0;
          for (d = a.aoColumns.length; b < d; b++) {
            c = a.aoColumns[b].nTh;
            e = t.createElement("div");
            e.className = a.oClasses.sSortJUIWrapper;
            i(c).contents().appendTo(e);
            var f = t.createElement("span");
            f.className = a.oClasses.sSortIcon;
            e.appendChild(f);
            c.appendChild(e)
          }
        }
        if (a.oFeatures.bSort) for (b = 0; b < a.aoColumns.length; b++) a.aoColumns[b].bSortable !== false ? ua(a, a.aoColumns[b].nTh, b) : i(a.aoColumns[b].nTh).addClass(a.oClasses.sSortableNone);
        a.oClasses.sFooterTH !== "" && i(a.nTFoot).children("tr").children("th").addClass(a.oClasses.sFooterTH);
        if (a.nTFoot !== null) {
          c = W(a, null, a.aoFooter);
          b = 0;
          for (d = a.aoColumns.length; b < d; b++) if (c[b]) {
            a.aoColumns[b].nTf = c[b];
            a.aoColumns[b].sClass && i(c[b]).addClass(a.aoColumns[b].sClass)
          }
        }
      }
      function ea(a, b, c) {
        var d, e, f, g = [],
          j = [],
          l = a.aoColumns.length,
          k;
        if (c === p) c = false;
        d = 0;
        for (e = b.length; d < e; d++) {
          g[d] = b[d].slice();
          g[d].nTr = b[d].nTr;
          for (f = l - 1; f >= 0; f--)!a.aoColumns[f].bVisible && !c && g[d].splice(f, 1);
          j.push([])
        }
        d = 0;
        for (e = g.length; d < e; d++) {
          if (a = g[d].nTr) for (; f = a.firstChild;) a.removeChild(f);
          f = 0;
          for (b = g[d].length; f < b; f++) {
            k = l = 1;
            if (j[d][f] === p) {
              a.appendChild(g[d][f].cell);
              for (j[d][f] = 1; g[d + l] !== p && g[d][f].cell == g[d + l][f].cell;) {
                j[d + l][f] = 1;
                l++
              }
              for (; g[d][f + k] !== p && g[d][f].cell == g[d][f + k].cell;) {
                for (c = 0; c < l; c++) j[d + c][f + k] = 1;
                k++
              }
              g[d][f].cell.rowSpan = l;
              g[d][f].cell.colSpan = k
            }
          }
        }
      }
      function H(a) {
        var b, c, d = [],
          e = 0,
          f = a.asStripeClasses.length;
        b = a.aoOpenRows.length;
        c = L(a, "aoPreDrawCallback", "preDraw", [a]);
        if (i.inArray(false, c) === -1) {
          a.bDrawing = true;
          if (a.iInitDisplayStart !== p && a.iInitDisplayStart != -1) {
            a._iDisplayStart = a.oFeatures.bServerSide ? a.iInitDisplayStart : a.iInitDisplayStart >= a.fnRecordsDisplay() ? 0 : a.iInitDisplayStart;
            a.iInitDisplayStart = -1;
            J(a)
          }
          if (a.bDeferLoading) {
            a.bDeferLoading = false;
            a.iDraw++
          } else if (a.oFeatures.bServerSide) {
            if (!a.bDestroying && !Ia(a)) return
          } else a.iDraw++;
          if (a.aiDisplay.length !== 0) {
            var g = a._iDisplayStart;
            c = a._iDisplayEnd;
            if (a.oFeatures.bServerSide) {
              g = 0;
              c = a.aoData.length
            }
            for (g = g; g < c; g++) {
              var j = a.aoData[a.aiDisplay[g]];
              j.nTr === null && qa(a, a.aiDisplay[g]);
              var l = j.nTr;
              if (f !== 0) {
                var k = a.asStripeClasses[e % f];
                if (j._sRowStripe != k) {
                  i(l).removeClass(j._sRowStripe).addClass(k);
                  j._sRowStripe = k
                }
              }
              L(a, "aoRowCallback", null, [l, a.aoData[a.aiDisplay[g]]._aData, e, g]);
              d.push(l);
              e++;
              if (b !== 0) for (j = 0; j < b; j++) if (l == a.aoOpenRows[j].nParent) {
                d.push(a.aoOpenRows[j].nTr);
                break
              }
            }
          } else {
            d[0] = t.createElement("tr");
            if (a.asStripeClasses[0]) d[0].className = a.asStripeClasses[0];
            f = a.oLanguage.sZeroRecords.replace("_MAX_", a.fnFormatNumber(a.fnRecordsTotal()));
            if (a.iDraw == 1 && a.sAjaxSource !== null && !a.oFeatures.bServerSide) f = a.oLanguage.sLoadingRecords;
            else if (a.oLanguage.sEmptyTable && a.fnRecordsTotal() === 0) f = a.oLanguage.sEmptyTable;
            b = t.createElement("td");
            b.setAttribute("valign", "top");
            b.colSpan = B(a);
            b.className = a.oClasses.sRowEmpty;
            b.innerHTML = f;
            d[e].appendChild(b)
          }
          L(a, "aoHeaderCallback", "header", [i(a.nTHead).children("tr")[0], ka(a), a._iDisplayStart, a.fnDisplayEnd(), a.aiDisplay]);
          L(a, "aoFooterCallback", "footer", [i(a.nTFoot).children("tr")[0], ka(a), a._iDisplayStart, a.fnDisplayEnd(), a.aiDisplay]);
          e = t.createDocumentFragment();
          b = t.createDocumentFragment();
          if (a.nTBody) {
            f = a.nTBody.parentNode;
            b.appendChild(a.nTBody);
            if (!a.oScroll.bInfinite || !a._bInitComplete || a.bSorted || a.bFiltered) for (; b = a.nTBody.firstChild;) a.nTBody.removeChild(b);
            b = 0;
            for (c = d.length; b < c; b++) e.appendChild(d[b]);
            a.nTBody.appendChild(e);
            f !== null && f.appendChild(a.nTBody)
          }
          L(a, "aoDrawCallback", "draw", [a]);
          a.bSorted = false;
          a.bFiltered = false;
          a.bDrawing = false;
          if (a.oFeatures.bServerSide) {
            P(a, false);
            a._bInitComplete || la(a)
          }
        }
      }
      function ma(a) {
        if (a.oFeatures.bSort) X(a, a.oPreviousSearch);
        else if (a.oFeatures.bFilter) U(a, a.oPreviousSearch);
        else {
          J(a);
          H(a)
        }
      }
      function Ja(a) {
        var b = i("<div></div>")[0];
        a.nTable.parentNode.insertBefore(b, a.nTable);
        a.nTableWrapper = i('<div id="' + a.sTableId + '_wrapper" class="' + a.oClasses.sWrapper + '" role="grid"></div>')[0];
        a.nTableReinsertBefore = a.nTable.nextSibling;
        for (var c = a.nTableWrapper, d = a.sDom.split(""), e, f, g, j, l, k, y, u = 0; u < d.length; u++) {
          f = 0;
          g = d[u];
          if (g == "<") {
            j = i("<div></div>")[0];
            l = d[u + 1];
            if (l == "'" || l == '"') {
              k = "";
              for (y = 2; d[u + y] != l;) {
                k += d[u + y];
                y++
              }
              if (k == "H") k = "fg-toolbar ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix";
              else if (k == "F") k = "fg-toolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix";
              if (k.indexOf(".") != -1) {
                l = k.split(".");
                j.id = l[0].substr(1, l[0].length - 1);
                j.className = l[1]
              } else if (k.charAt(0) == "#") j.id = k.substr(1, k.length - 1);
              else j.className = k;
              u += y
            }
            c.appendChild(j);
            c = j
          } else if (g == ">") c = c.parentNode;
          else if (g == "l" && a.oFeatures.bPaginate && a.oFeatures.bLengthChange) {
            e = Ka(a);
            f = 1
          } else if (g == "f" && a.oFeatures.bFilter) {
            e = La(a);
            f = 1
          } else if (g == "r" && a.oFeatures.bProcessing) {
            e = Ma(a);
            f = 1
          } else if (g == "t") {
            e = Na(a);
            f = 1
          } else if (g == "i" && a.oFeatures.bInfo) {
            e = Oa(a);
            f = 1
          } else if (g == "p" && a.oFeatures.bPaginate) {
            e = Pa(a);
            f = 1
          } else if (m.ext.aoFeatures.length !== 0) {
            j = m.ext.aoFeatures;
            y = 0;
            for (l = j.length; y < l; y++) if (g == j[y].cFeature) {
              if (e = j[y].fnInit(a)) f = 1;
              break
            }
          }
          if (f == 1 && e !== null) {
            if (typeof a.aanFeatures[g] !== "object") a.aanFeatures[g] = [];
            a.aanFeatures[g].push(e);
            c.appendChild(e)
          }
        }
        b.parentNode.replaceChild(a.nTableWrapper, b)
      }
      function da(a, b) {
        b = i(b).children("tr");
        var c, d, e, f, g, j, l, k, y = function (A, Y, C) {
            for (; A[Y][C];) C++;
            return C
          };
        a.splice(0, a.length);
        d = 0;
        for (j = b.length; d < j; d++) a.push([]);
        d = 0;
        for (j = b.length; d < j; d++) {
          e = 0;
          for (l = b[d].childNodes.length; e < l; e++) {
            c = b[d].childNodes[e];
            if (c.nodeName.toUpperCase() == "TD" || c.nodeName.toUpperCase() == "TH") {
              var u = c.getAttribute("colspan") * 1,
                v = c.getAttribute("rowspan") * 1;
              u = !u || u === 0 || u === 1 ? 1 : u;
              v = !v || v === 0 || v === 1 ? 1 : v;
              k = y(a, d, 0);
              for (g = 0; g < u; g++) for (f = 0; f < v; f++) {
                a[d + f][k + g] = {
                  cell: c,
                  unique: u == 1 ? true : false
                };
                a[d + f].nTr = b[d]
              }
            }
          }
        }
      }
      function W(a, b, c) {
        var d = [];
        if (!c) {
          c = a.aoHeader;
          if (b) {
            c = [];
            da(c, b)
          }
        }
        b = 0;
        for (var e = c.length; b < e; b++) for (var f = 0, g = c[b].length; f < g; f++) if (c[b][f].unique && (!d[f] || !a.bSortCellsTop)) d[f] = c[b][f].cell;
        return d
      }
      function Ia(a) {
        if (a.bAjaxDataGet) {
          a.iDraw++;
          P(a, true);
          var b = Qa(a);
          va(a, b);
          a.fnServerData.call(a.oInstance, a.sAjaxSource, b, function (c) {
            Ra(a, c)
          }, a);
          return false
        } else return true
      }
      function Qa(a) {
        var b = a.aoColumns.length,
          c = [],
          d, e;
        c.push({
          name: "sEcho",
          value: a.iDraw
        });
        c.push({
          name: "iColumns",
          value: b
        });
        c.push({
          name: "sColumns",
          value: F(a)
        });
        c.push({
          name: "iDisplayStart",
          value: a._iDisplayStart
        });
        c.push({
          name: "iDisplayLength",
          value: a.oFeatures.bPaginate !== false ? a._iDisplayLength : -1
        });
        for (e = 0; e < b; e++) {
          d = a.aoColumns[e].mDataProp;
          c.push({
            name: "mDataProp_" + e,
            value: typeof d === "function" ? "function" : d
          })
        }
        if (a.oFeatures.bFilter !== false) {
          c.push({
            name: "sSearch",
            value: a.oPreviousSearch.sSearch
          });
          c.push({
            name: "bRegex",
            value: a.oPreviousSearch.bRegex
          });
          for (e = 0; e < b; e++) {
            c.push({
              name: "sSearch_" + e,
              value: a.aoPreSearchCols[e].sSearch
            });
            c.push({
              name: "bRegex_" + e,
              value: a.aoPreSearchCols[e].bRegex
            });
            c.push({
              name: "bSearchable_" + e,
              value: a.aoColumns[e].bSearchable
            })
          }
        }
        if (a.oFeatures.bSort !== false) {
          d = a.aaSortingFixed !== null ? a.aaSortingFixed.length : 0;
          var f = a.aaSorting.length;
          c.push({
            name: "iSortingCols",
            value: d + f
          });
          for (e = 0; e < d; e++) {
            c.push({
              name: "iSortCol_" + e,
              value: a.aaSortingFixed[e][0]
            });
            c.push({
              name: "sSortDir_" + e,
              value: a.aaSortingFixed[e][1]
            })
          }
          for (e = 0; e < f; e++) {
            c.push({
              name: "iSortCol_" + (e + d),
              value: a.aaSorting[e][0]
            });
            c.push({
              name: "sSortDir_" + (e + d),
              value: a.aaSorting[e][1]
            })
          }
          for (e = 0; e < b; e++) c.push({
            name: "bSortable_" + e,
            value: a.aoColumns[e].bSortable
          })
        }
        return c
      }
      function va(a, b) {
        L(a, "aoServerParams", "serverParams", [b])
      }
      function Ra(a, b) {
        if (b.sEcho !== p) if (b.sEcho * 1 < a.iDraw) return;
        else a.iDraw = b.sEcho * 1;
        if (!a.oScroll.bInfinite || a.oScroll.bInfinite && (a.bSorted || a.bFiltered)) sa(a);
        a._iRecordsTotal = parseInt(b.iTotalRecords, 10);
        a._iRecordsDisplay = parseInt(b.iTotalDisplayRecords, 10);
        var c = F(a);
        c = b.sColumns !== p && c !== "" && b.sColumns != c;
        var d;
        if (c) d = G(a, b.sColumns);
        b = ha(a.sAjaxDataProp)(b);
        for (var e = 0, f = b.length; e < f; e++) if (c) {
          for (var g = [], j = 0, l = a.aoColumns.length; j < l; j++) g.push(b[e][d[j]]);
          O(a, g)
        } else O(a, b[e]);
        a.aiDisplay = a.aiDisplayMaster.slice();
        a.bAjaxDataGet = false;
        H(a);
        a.bAjaxDataGet = true;
        P(a, false)
      }
      function La(a) {
        var b = a.oPreviousSearch,
          c = a.oLanguage.sSearch;
        c = c.indexOf("_INPUT_") !== -1 ? c.replace("_INPUT_", '<input type="text" />') : c === "" ? '<input type="text" />' : c + ' <input type="text" />';
        var d = t.createElement("div");
        d.className = a.oClasses.sFilter;
        d.innerHTML = "<label>" + c + "</label>";
        if (!a.aanFeatures.f) d.id = a.sTableId + "_filter";
        c = i("input", d);
        c.val(b.sSearch.replace('"', "&quot;"));
        c.bind("keyup.DT", function () {
          for (var e = a.aanFeatures.f, f = 0, g = e.length; f < g; f++) e[f] != i(this).parents("div.dataTables_filter")[0] && i("input", e[f]).val(this.value);
          this.value != b.sSearch && U(a, {
            sSearch: this.value,
            bRegex: b.bRegex,
            bSmart: b.bSmart,
            bCaseInsensitive: b.bCaseInsensitive
          })
        });
        c.attr("aria-controls", a.sTableId).bind("keypress.DT", function (e) {
          if (e.keyCode == 13) return false
        });
        return d
      }
      function U(a, b, c) {
        var d = a.oPreviousSearch,
          e = a.aoPreSearchCols,
          f = function (g) {
            d.sSearch = g.sSearch;
            d.bRegex = g.bRegex;
            d.bSmart = g.bSmart;
            d.bCaseInsensitive = g.bCaseInsensitive
          };
        if (a.oFeatures.bServerSide) f(b);
        else {
          Sa(a, b.sSearch, c, b.bRegex, b.bSmart, b.bCaseInsensitive);
          f(b);
          for (b = 0; b < a.aoPreSearchCols.length; b++) Ta(a, e[b].sSearch, b, e[b].bRegex, e[b].bSmart, e[b].bCaseInsensitive);
          Ua(a)
        }
        a.bFiltered = true;
        i(a.oInstance).trigger("filter", a);
        a._iDisplayStart = 0;
        J(a);
        H(a);
        wa(a, 0)
      }
      function Ua(a) {
        for (var b = m.ext.afnFiltering, c = 0, d = b.length; c < d; c++) for (var e = 0, f = 0, g = a.aiDisplay.length; f < g; f++) {
          var j = a.aiDisplay[f - e];
          if (!b[c](a, ja(a, j, "filter"), j)) {
            a.aiDisplay.splice(f - e, 1);
            e++
          }
        }
      }
      function Ta(a, b, c, d, e, f) {
        if (b !== "") {
          var g = 0;
          b = xa(b, d, e, f);
          for (d = a.aiDisplay.length - 1; d >= 0; d--) {
            e = ya(E(a, a.aiDisplay[d], c, "filter"), a.aoColumns[c].sType);
            if (!b.test(e)) {
              a.aiDisplay.splice(d, 1);
              g++
            }
          }
        }
      }
      function Sa(a, b, c, d, e, f) {
        d = xa(b, d, e, f);
        e = a.oPreviousSearch;
        c || (c = 0);
        if (m.ext.afnFiltering.length !== 0) c = 1;
        if (b.length <= 0) {
          a.aiDisplay.splice(0, a.aiDisplay.length);
          a.aiDisplay = a.aiDisplayMaster.slice()
        } else if (a.aiDisplay.length == a.aiDisplayMaster.length || e.sSearch.length > b.length || c == 1 || b.indexOf(e.sSearch) !== 0) {
          a.aiDisplay.splice(0, a.aiDisplay.length);
          wa(a, 1);
          for (b = 0; b < a.aiDisplayMaster.length; b++) d.test(a.asDataSearch[b]) && a.aiDisplay.push(a.aiDisplayMaster[b])
        } else for (b = c = 0; b < a.asDataSearch.length; b++) if (!d.test(a.asDataSearch[b])) {
          a.aiDisplay.splice(b - c, 1);
          c++
        }
      }
      function wa(a, b) {
        if (!a.oFeatures.bServerSide) {
          a.asDataSearch.splice(0, a.asDataSearch.length);
          b = b && b === 1 ? a.aiDisplayMaster : a.aiDisplay;
          for (var c = 0, d = b.length; c < d; c++) a.asDataSearch[c] = za(a, ja(a, b[c], "filter"))
        }
      }
      function za(a, b) {
        var c = "";
        if (a.__nTmpFilter === p) a.__nTmpFilter = t.createElement("div");
        for (var d = a.__nTmpFilter, e = 0, f = a.aoColumns.length; e < f; e++) if (a.aoColumns[e].bSearchable) c += ya(b[e], a.aoColumns[e].sType) + "  ";
        if (c.indexOf("&") !== -1) {
          d.innerHTML = c;
          c = d.textContent ? d.textContent : d.innerText;
          c = c.replace(/\n/g, " ").replace(/\r/g, "")
        }
        return c
      }
      function xa(a, b, c, d) {
        if (c) {
          a = b ? a.split(" ") : Aa(a).split(" ");
          a = "^(?=.*?" + a.join(")(?=.*?") + ").*$";
          return new RegExp(a, d ? "i" : "")
        } else {
          a = b ? a : Aa(a);
          return new RegExp(a, d ? "i" : "")
        }
      }
      function ya(a, b) {
        if (typeof m.ext.ofnSearch[b] === "function") return m.ext.ofnSearch[b](a);
        else if (b == "html") return a.replace(/[\r\n]/g, " ").replace(/<.*?>/g, "");
        else if (typeof a === "string") return a.replace(/[\r\n]/g, " ");
        else if (a === null) return "";
        return a
      }
      function Aa(a) {
        return a.replace(new RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^)", "g"), "\\$1")
      }
      function Oa(a) {
        var b = t.createElement("div");
        b.className = a.oClasses.sInfo;
        if (!a.aanFeatures.i) {
          a.aoDrawCallback.push({
            fn: Va,
            sName: "information"
          });
          b.id = a.sTableId + "_info"
        }
        a.nTable.setAttribute("aria-describedby", a.sTableId + "_info");
        return b
      }
      function Va(a) {
        if (!(!a.oFeatures.bInfo || a.aanFeatures.i.length === 0)) {
          var b = a._iDisplayStart + 1,
            c = a.fnDisplayEnd(),
            d = a.fnRecordsTotal(),
            e = a.fnRecordsDisplay(),
            f = a.fnFormatNumber(b),
            g = a.fnFormatNumber(c),
            j = a.fnFormatNumber(d),
            l = a.fnFormatNumber(e);
          if (a.oScroll.bInfinite) f = a.fnFormatNumber(1);
          f = a.fnRecordsDisplay() === 0 && a.fnRecordsDisplay() == a.fnRecordsTotal() ? a.oLanguage.sInfoEmpty + a.oLanguage.sInfoPostFix : a.fnRecordsDisplay() === 0 ? a.oLanguage.sInfoEmpty + " " + a.oLanguage.sInfoFiltered.replace("_MAX_", j) + a.oLanguage.sInfoPostFix : a.fnRecordsDisplay() == a.fnRecordsTotal() ? a.oLanguage.sInfo.replace("_START_", f).replace("_END_", g).replace("_TOTAL_", l) + a.oLanguage.sInfoPostFix : a.oLanguage.sInfo.replace("_START_", f).replace("_END_", g).replace("_TOTAL_", l) + " " + a.oLanguage.sInfoFiltered.replace("_MAX_", a.fnFormatNumber(a.fnRecordsTotal())) + a.oLanguage.sInfoPostFix;
          if (a.oLanguage.fnInfoCallback !== null) f = a.oLanguage.fnInfoCallback.call(a.oInstance, a, b, c, d, e, f);
          a = a.aanFeatures.i;
          b = 0;
          for (c = a.length; b < c; b++) i(a[b]).html(f)
        }
      }
      function na(a) {
        var b, c, d = a.iInitDisplayStart;
        if (a.bInitialised === false) setTimeout(function () {
          na(a)
        }, 200);
        else {
          Ja(a);
          Ha(a);
          ea(a, a.aoHeader);
          a.nTFoot && ea(a, a.aoFooter);
          P(a, true);
          a.oFeatures.bAutoWidth && pa(a);
          b = 0;
          for (c = a.aoColumns.length; b < c; b++) if (a.aoColumns[b].sWidth !== null) a.aoColumns[b].nTh.style.width = s(a.aoColumns[b].sWidth);
          if (a.oFeatures.bSort) X(a);
          else if (a.oFeatures.bFilter) U(a, a.oPreviousSearch);
          else {
            a.aiDisplay = a.aiDisplayMaster.slice();
            J(a);
            H(a)
          }
          if (a.sAjaxSource !== null && !a.oFeatures.bServerSide) {
            c = [];
            va(a, c);
            a.fnServerData.call(a.oInstance, a.sAjaxSource, c, function (e) {
              var f = a.sAjaxDataProp !== "" ? ha(a.sAjaxDataProp)(e) : e;
              for (b = 0; b < f.length; b++) O(a, f[b]);
              a.iInitDisplayStart = d;
              if (a.oFeatures.bSort) X(a);
              else {
                a.aiDisplay = a.aiDisplayMaster.slice();
                J(a);
                H(a)
              }
              P(a, false);
              la(a, e)
            }, a)
          } else if (!a.oFeatures.bServerSide) {
            P(a, false);
            la(a)
          }
        }
      }
      function la(a, b) {
        a._bInitComplete = true;
        L(a, "aoInitComplete", "init", [a, b])
      }
      function Ba(a) {
        !a.sEmptyTable && a.sZeroRecords && q(a, a, "sZeroRecords", "sEmptyTable");
        !a.sLoadingRecords && a.sZeroRecords && q(a, a, "sZeroRecords", "sLoadingRecords")
      }
      function Ka(a) {
        if (a.oScroll.bInfinite) return null;
        var b = '<select size="1" ' + ('name="' + a.sTableId + '_length"') + ">",
          c, d, e = a.aLengthMenu;
        if (e.length == 2 && typeof e[0] === "object" && typeof e[1] === "object") {
          c = 0;
          for (d = e[0].length; c < d; c++) b += '<option value="' + e[0][c] + '">' + e[1][c] + "</option>"
        } else {
          c = 0;
          for (d = e.length; c < d; c++) b += '<option value="' + e[c] + '">' + e[c] + "</option>"
        }
        b += "</select>";
        e = t.createElement("div");
        if (!a.aanFeatures.l) e.id = a.sTableId + "_length";
        e.className = a.oClasses.sLength;
        e.innerHTML = "<label>" + a.oLanguage.sLengthMenu.replace("_MENU_", b) + "</label>";
        i('select option[value="' + a._iDisplayLength + '"]', e).attr("selected", true);
        i("select", e).bind("change.DT", function () {
          var f = i(this).val(),
            g = a.aanFeatures.l;
          c = 0;
          for (d = g.length; c < d; c++) g[c] != this.parentNode && i("select", g[c]).val(f);
          a._iDisplayLength = parseInt(f, 10);
          J(a);
          if (a.fnDisplayEnd() == a.fnRecordsDisplay()) {
            a._iDisplayStart = a.fnDisplayEnd() - a._iDisplayLength;
            if (a._iDisplayStart < 0) a._iDisplayStart = 0
          }
          if (a._iDisplayLength == -1) a._iDisplayStart = 0;
          H(a)
        });
        i("select", e).attr("aria-controls", a.sTableId);
        return e
      }
      function J(a) {
        a._iDisplayEnd = a.oFeatures.bPaginate === false ? a.aiDisplay.length : a._iDisplayStart + a._iDisplayLength > a.aiDisplay.length || a._iDisplayLength == -1 ? a.aiDisplay.length : a._iDisplayStart + a._iDisplayLength
      }
      function Pa(a) {
        if (a.oScroll.bInfinite) return null;
        var b = t.createElement("div");
        b.className = a.oClasses.sPaging + a.sPaginationType;
        m.ext.oPagination[a.sPaginationType].fnInit(a, b, function (c) {
          J(c);
          H(c)
        });
        a.aanFeatures.p || a.aoDrawCallback.push({
          fn: function (c) {
            m.ext.oPagination[c.sPaginationType].fnUpdate(c, function (d) {
              J(d);
              H(d)
            })
          },
          sName: "pagination"
        });
        return b
      }
      function Ca(a, b) {
        var c = a._iDisplayStart;
        if (typeof b === "number") {
          a._iDisplayStart = b * a._iDisplayLength;
          if (a._iDisplayStart > a.fnRecordsDisplay()) a._iDisplayStart = 0
        } else if (b == "first") a._iDisplayStart = 0;
        else if (b == "previous") {
          a._iDisplayStart = a._iDisplayLength >= 0 ? a._iDisplayStart - a._iDisplayLength : 0;
          if (a._iDisplayStart < 0) a._iDisplayStart = 0
        } else if (b == "next") if (a._iDisplayLength >= 0) {
          if (a._iDisplayStart + a._iDisplayLength < a.fnRecordsDisplay()) a._iDisplayStart += a._iDisplayLength
        } else a._iDisplayStart = 0;
        else if (b == "last") if (a._iDisplayLength >= 0) {
          b = parseInt((a.fnRecordsDisplay() - 1) / a._iDisplayLength, 10) + 1;
          a._iDisplayStart = (b - 1) * a._iDisplayLength
        } else a._iDisplayStart = 0;
        else N(a, 0, "Unknown paging action: " + b);
        i(a.oInstance).trigger("page", a);
        return c != a._iDisplayStart
      }
      function Ma(a) {
        var b = t.createElement("div");
        if (!a.aanFeatures.r) b.id = a.sTableId + "_processing";
        b.innerHTML = a.oLanguage.sProcessing;
        b.className = a.oClasses.sProcessing;
        a.nTable.parentNode.insertBefore(b, a.nTable);
        return b
      }
      function P(a, b) {
        if (a.oFeatures.bProcessing) for (var c = a.aanFeatures.r, d = 0, e = c.length; d < e; d++) c[d].style.visibility = b ? "visible" : "hidden";
        i(a.oInstance).trigger("processing", [a, b])
      }
      function Na(a) {
        if (a.oScroll.sX === "" && a.oScroll.sY === "") return a.nTable;
        var b = t.createElement("div"),
          c = t.createElement("div"),
          d = t.createElement("div"),
          e = t.createElement("div"),
          f = t.createElement("div"),
          g = t.createElement("div"),
          j = a.nTable.cloneNode(false),
          l = a.nTable.cloneNode(false),
          k = a.nTable.getElementsByTagName("thead")[0],
          y = a.nTable.getElementsByTagName("tfoot").length === 0 ? null : a.nTable.getElementsByTagName("tfoot")[0],
          u = a.oClasses;
        c.appendChild(d);
        f.appendChild(g);
        e.appendChild(a.nTable);
        b.appendChild(c);
        b.appendChild(e);
        d.appendChild(j);
        j.appendChild(k);
        if (y !== null) {
          b.appendChild(f);
          g.appendChild(l);
          l.appendChild(y)
        }
        b.className = u.sScrollWrapper;
        c.className = u.sScrollHead;
        d.className = u.sScrollHeadInner;
        e.className = u.sScrollBody;
        f.className = u.sScrollFoot;
        g.className = u.sScrollFootInner;
        if (a.oScroll.bAutoCss) {
          c.style.overflow = "hidden";
          c.style.position = "relative";
          f.style.overflow = "hidden";
          e.style.overflow = "auto"
        }
        c.style.border = "0";
        c.style.width = "100%";
        f.style.border = "0";
        d.style.width = "150%";
        j.removeAttribute("id");
        j.style.marginLeft = "0";
        a.nTable.style.marginLeft = "0";
        if (y !== null) {
          l.removeAttribute("id");
          l.style.marginLeft = "0"
        }
        d = i(a.nTable).children("caption");
        g = 0;
        for (l = d.length; g < l; g++) j.appendChild(d[g]);
        if (a.oScroll.sX !== "") {
          c.style.width = s(a.oScroll.sX);
          e.style.width = s(a.oScroll.sX);
          if (y !== null) f.style.width = s(a.oScroll.sX);
          i(e).scroll(function () {
            c.scrollLeft = this.scrollLeft;
            if (y !== null) f.scrollLeft = this.scrollLeft
          })
        }
        if (a.oScroll.sY !== "") e.style.height = s(a.oScroll.sY);
        a.aoDrawCallback.push({
          fn: Wa,
          sName: "scrolling"
        });
        a.oScroll.bInfinite && i(e).scroll(function () {
          if (!a.bDrawing && i(this).scrollTop() !== 0) if (i(this).scrollTop() + i(this).height() > i(a.nTable).height() - a.oScroll.iLoadGap) if (a.fnDisplayEnd() < a.fnRecordsDisplay()) {
            Ca(a, "next");
            J(a);
            H(a)
          }
        });
        a.nScrollHead = c;
        a.nScrollFoot = f;
        return b
      }
      function Wa(a) {
        var b = a.nScrollHead.getElementsByTagName("div")[0],
          c = b.getElementsByTagName("table")[0],
          d = a.nTable.parentNode,
          e, f, g, j, l, k, y, u, v = [],
          A = a.nTFoot !== null ? a.nScrollFoot.getElementsByTagName("div")[0] : null,
          Y = a.nTFoot !== null ? A.getElementsByTagName("table")[0] : null,
          C = i.browser.msie && i.browser.version <= 7;
        g = a.nTable.getElementsByTagName("thead");
        g.length > 0 && a.nTable.removeChild(g[0]);
        if (a.nTFoot !== null) {
          l = a.nTable.getElementsByTagName("tfoot");
          l.length > 0 && a.nTable.removeChild(l[0])
        }
        g = a.nTHead.cloneNode(true);
        a.nTable.insertBefore(g, a.nTable.childNodes[0]);
        if (a.nTFoot !== null) {
          l = a.nTFoot.cloneNode(true);
          a.nTable.insertBefore(l, a.nTable.childNodes[1])
        }
        if (a.oScroll.sX === "") {
          d.style.width = "100%";
          b.parentNode.style.width = "100%"
        }
        var fa = W(a, g);
        e = 0;
        for (f = fa.length; e < f; e++) {
          y = w(a, e);
          fa[e].style.width = a.aoColumns[y].sWidth
        }
        a.nTFoot !== null && V(function (I) {
          I.style.width = ""
        }, l.getElementsByTagName("tr"));
        e = i(a.nTable).outerWidth();
        if (a.oScroll.sX === "") {
          a.nTable.style.width = "100%";
          if (C && (i("tbody", d).height() > d.offsetHeight || i(d).css("overflow-y") == "scroll")) a.nTable.style.width = s(i(a.nTable).outerWidth() - a.oScroll.iBarWidth)
        } else if (a.oScroll.sXInner !== "") a.nTable.style.width = s(a.oScroll.sXInner);
        else if (e == i(d).width() && i(d).height() < i(a.nTable).height()) {
          a.nTable.style.width = s(e - a.oScroll.iBarWidth);
          if (i(a.nTable).outerWidth() > e - a.oScroll.iBarWidth) a.nTable.style.width = s(e)
        } else a.nTable.style.width = s(e);
        e = i(a.nTable).outerWidth();
        f = a.nTHead.getElementsByTagName("tr");
        g = g.getElementsByTagName("tr");
        V(function (I, Q) {
          k = I.style;
          k.paddingTop = "0";
          k.paddingBottom = "0";
          k.borderTopWidth = "0";
          k.borderBottomWidth = "0";
          k.height = 0;
          u = i(I).width();
          Q.style.width = s(u);
          v.push(u)
        }, g, f);
        i(g).height(0);
        if (a.nTFoot !== null) {
          j = l.getElementsByTagName("tr");
          l = a.nTFoot.getElementsByTagName("tr");
          V(function (I, Q) {
            k = I.style;
            k.paddingTop = "0";
            k.paddingBottom = "0";
            k.borderTopWidth = "0";
            k.borderBottomWidth = "0";
            k.height = 0;
            u = i(I).width();
            Q.style.width = s(u);
            v.push(u)
          }, j, l);
          i(j).height(0)
        }
        V(function (I) {
          I.innerHTML = "";
          I.style.width = s(v.shift())
        }, g);
        a.nTFoot !== null && V(function (I) {
          I.innerHTML = "";
          I.style.width = s(v.shift())
        }, j);
        if (i(a.nTable).outerWidth() < e) {
          j = d.scrollHeight > d.offsetHeight || i(d).css("overflow-y") == "scroll" ? e + a.oScroll.iBarWidth : e;
          if (C && (d.scrollHeight > d.offsetHeight || i(d).css("overflow-y") == "scroll")) a.nTable.style.width = s(j - a.oScroll.iBarWidth);
          d.style.width = s(j);
          b.parentNode.style.width = s(j);
          if (a.nTFoot !== null) A.parentNode.style.width = s(j);
          if (a.oScroll.sX === "") N(a, 1, "The table cannot fit into the current element which will cause column misalignment. The table has been drawn at its minimum possible width.");
          else a.oScroll.sXInner !== "" && N(a, 1, "The table cannot fit into the current element which will cause column misalignment. Increase the sScrollXInner value or remove it to allow automatic calculation")
        } else {
          d.style.width = s("100%");
          b.parentNode.style.width = s("100%");
          if (a.nTFoot !== null) A.parentNode.style.width = s("100%")
        }
        if (a.oScroll.sY === "") if (C) d.style.height = s(a.nTable.offsetHeight + a.oScroll.iBarWidth);
        if (a.oScroll.sY !== "" && a.oScroll.bCollapse) {
          d.style.height = s(a.oScroll.sY);
          C = a.oScroll.sX !== "" && a.nTable.offsetWidth > d.offsetWidth ? a.oScroll.iBarWidth : 0;
          if (a.nTable.offsetHeight < d.offsetHeight) d.style.height = s(i(a.nTable).height() + C)
        }
        C = i(a.nTable).outerWidth();
        c.style.width = s(C);
        b.style.width = s(C);
        if (a.nTFoot !== null) {
          A.style.width = s(a.nTable.offsetWidth);
          Y.style.width = s(a.nTable.offsetWidth)
        }
        if (a.bSorted || a.bFiltered) d.scrollTop = 0
      }
      function V(a, b, c) {
        for (var d = 0, e = b.length; d < e; d++) for (var f = 0, g = b[d].childNodes.length; f < g; f++) if (b[d].childNodes[f].nodeType == 1) c ? a(b[d].childNodes[f], c[d].childNodes[f]) : a(b[d].childNodes[f])
      }
      function Xa(a, b) {
        if (!a || a === null || a === "") return 0;
        b || (b = t.getElementsByTagName("body")[0]);
        var c = t.createElement("div");
        c.style.width = s(a);
        b.appendChild(c);
        a = c.offsetWidth;
        b.removeChild(c);
        return a
      }
      function pa(a) {
        var b = 0,
          c, d = 0,
          e = a.aoColumns.length,
          f, g = i("th", a.nTHead),
          j = a.nTable.getAttribute("width");
        for (f = 0; f < e; f++) if (a.aoColumns[f].bVisible) {
          d++;
          if (a.aoColumns[f].sWidth !== null) {
            c = Xa(a.aoColumns[f].sWidthOrig, a.nTable.parentNode);
            if (c !== null) a.aoColumns[f].sWidth = s(c);
            b++
          }
        }
        if (e == g.length && b === 0 && d == e && a.oScroll.sX === "" && a.oScroll.sY === "") for (f = 0; f < a.aoColumns.length; f++) {
          c = i(g[f]).width();
          if (c !== null) a.aoColumns[f].sWidth = s(c)
        } else {
          b = a.nTable.cloneNode(false);
          f = a.nTHead.cloneNode(true);
          d = t.createElement("tbody");
          c = t.createElement("tr");
          b.removeAttribute("id");
          b.appendChild(f);
          if (a.nTFoot !== null) {
            b.appendChild(a.nTFoot.cloneNode(true));
            V(function (k) {
              k.style.width = ""
            }, b.getElementsByTagName("tr"))
          }
          b.appendChild(d);
          d.appendChild(c);
          d = i("thead th", b);
          if (d.length === 0) d = i("tbody tr:eq(0)>td", b);
          g = W(a, f);
          for (f = d = 0; f < e; f++) {
            var l = a.aoColumns[f];
            if (l.bVisible && l.sWidthOrig !== null && l.sWidthOrig !== "") g[f - d].style.width = s(l.sWidthOrig);
            else if (l.bVisible) g[f - d].style.width = "";
            else d++
          }
          for (f = 0; f < e; f++) if (a.aoColumns[f].bVisible) {
            d = Ya(a, f);
            if (d !== null) {
              d = d.cloneNode(true);
              if (a.aoColumns[f].sContentPadding !== "") d.innerHTML += a.aoColumns[f].sContentPadding;
              c.appendChild(d)
            }
          }
          e = a.nTable.parentNode;
          e.appendChild(b);
          if (a.oScroll.sX !== "" && a.oScroll.sXInner !== "") b.style.width = s(a.oScroll.sXInner);
          else if (a.oScroll.sX !== "") {
            b.style.width = "";
            if (i(b).width() < e.offsetWidth) b.style.width = s(e.offsetWidth)
          } else if (a.oScroll.sY !== "") b.style.width = s(e.offsetWidth);
          else if (j) b.style.width = s(j);
          b.style.visibility = "hidden";
          Za(a, b);
          e = i("tbody tr:eq(0)", b).children();
          if (e.length === 0) e = W(a, i("thead", b)[0]);
          if (a.oScroll.sX !== "") {
            for (f = d = c = 0; f < a.aoColumns.length; f++) if (a.aoColumns[f].bVisible) {
              c += a.aoColumns[f].sWidthOrig === null ? i(e[d]).outerWidth() : parseInt(a.aoColumns[f].sWidth.replace("px", ""), 10) + (i(e[d]).outerWidth() - i(e[d]).width());
              d++
            }
            b.style.width = s(c);
            a.nTable.style.width = s(c)
          }
          for (f = d = 0; f < a.aoColumns.length; f++) if (a.aoColumns[f].bVisible) {
            c = i(e[d]).width();
            if (c !== null && c > 0) a.aoColumns[f].sWidth = s(c);
            d++
          }
          e = i(b).css("width");
          a.nTable.style.width = e.indexOf("%") !== -1 ? e : s(i(b).outerWidth());
          b.parentNode.removeChild(b)
        }
        if (j) a.nTable.style.width = s(j)
      }
      function Za(a, b) {
        if (a.oScroll.sX === "" && a.oScroll.sY !== "") {
          i(b).width();
          b.style.width = s(i(b).outerWidth() - a.oScroll.iBarWidth)
        } else if (a.oScroll.sX !== "") b.style.width = s(i(b).outerWidth())
      }
      function Ya(a, b) {
        var c = $a(a, b);
        if (c < 0) return null;
        if (a.aoData[c].nTr === null) {
          var d = t.createElement("td");
          d.innerHTML = E(a, c, b, "");
          return d
        }
        return T(a, c)[b]
      }
      function $a(a, b) {
        for (var c = -1, d = -1, e = 0; e < a.aoData.length; e++) {
          var f = E(a, e, b, "display") + "";
          f = f.replace(/<.*?>/g, "");
          if (f.length > c) {
            c = f.length;
            d = e
          }
        }
        return d
      }
      function s(a) {
        if (a === null) return "0px";
        if (typeof a == "number") {
          if (a < 0) return "0px";
          return a + "px"
        }
        var b = a.charCodeAt(a.length - 1);
        if (b < 48 || b > 57) return a;
        return a + "px"
      }
      function ab() {
        var a = t.createElement("p"),
          b = a.style;
        b.width = "100%";
        b.height = "200px";
        b.padding = "0px";
        var c = t.createElement("div");
        b = c.style;
        b.position = "absolute";
        b.top = "0px";
        b.left = "0px";
        b.visibility = "hidden";
        b.width = "200px";
        b.height = "150px";
        b.padding = "0px";
        b.overflow = "hidden";
        c.appendChild(a);
        t.body.appendChild(c);
        b = a.offsetWidth;
        c.style.overflow = "scroll";
        a = a.offsetWidth;
        if (b == a) a = c.clientWidth;
        t.body.removeChild(c);
        return b - a
      }
      function X(a, b) {
        var c, d, e, f, g, j, l = [],
          k = [],
          y = m.ext.oSort,
          u = a.aoData,
          v = a.aoColumns,
          A = a.oLanguage.oAria;
        if (!a.oFeatures.bServerSide && (a.aaSorting.length !== 0 || a.aaSortingFixed !== null)) {
          l = a.aaSortingFixed !== null ? a.aaSortingFixed.concat(a.aaSorting) : a.aaSorting.slice();
          for (c = 0; c < l.length; c++) {
            d = l[c][0];
            e = x(a, d);
            f = a.aoColumns[d].sSortDataType;
            if (m.ext.afnSortData[f]) {
              g = m.ext.afnSortData[f](a, d, e);
              e = 0;
              for (f = u.length; e < f; e++) S(a, e, d, g[e])
            }
          }
          c = 0;
          for (d = a.aiDisplayMaster.length; c < d; c++) k[a.aiDisplayMaster[c]] = c;
          var Y = l.length,
            C;
          c = 0;
          for (d = u.length; c < d; c++) for (e = 0; e < Y; e++) {
            C = v[l[e][0]].aDataSort;
            g = 0;
            for (j = C.length; g < j; g++) {
              f = v[C[g]].sType;
              f = y[(f ? f : "string") + "-pre"];
              u[c]._aSortData[C[g]] = f ? f(E(a, c, C[g], "sort")) : E(a, c, C[g], "sort")
            }
          }
          a.aiDisplayMaster.sort(function (fa, I) {
            var Q, Z, bb, $, ga;
            for (Q = 0; Q < Y; Q++) {
              ga = v[l[Q][0]].aDataSort;
              Z = 0;
              for (bb = ga.length; Z < bb; Z++) {
                $ = v[ga[Z]].sType;
                $ = y[($ ? $ : "string") + "-" + l[Q][1]](u[fa]._aSortData[ga[Z]], u[I]._aSortData[ga[Z]]);
                if ($ !== 0) return $
              }
            }
            return y["numeric-asc"](k[fa], k[I])
          })
        }
        if ((b === p || b) && !a.oFeatures.bDeferRender) aa(a);
        c = 0;
        for (d = a.aoColumns.length; c < d; c++) {
          b = v[c].nTh;
          b.removeAttribute("aria-sort");
          b.removeAttribute("aria-label");
          if (v[c].bSortable) if (l.length > 0 && l[0][0] == c) {
            b.setAttribute("aria-sort", l[0][1] == "asc" ? "ascending" : "descending");
            b.setAttribute("aria-label", v[c].sTitle + ((v[c].asSorting[l[0][2] + 1] ? v[c].asSorting[l[0][2] + 1] : v[c].asSorting[0]) == "asc" ? A.sSortAscending : A.sSortDescending))
          } else b.setAttribute("aria-label", v[c].sTitle + (v[c].asSorting[0] == "asc" ? A.sSortAscending : A.sSortDescending));
          else b.setAttribute("aria-label", v[c].sTitle)
        }
        a.bSorted = true;
        i(a.oInstance).trigger("sort", a);
        if (a.oFeatures.bFilter) U(a, a.oPreviousSearch, 1);
        else {
          a.aiDisplay = a.aiDisplayMaster.slice();
          a._iDisplayStart = 0;
          J(a);
          H(a)
        }
      }
      function ua(a, b, c, d) {
        cb(b, {}, function (e) {
          if (a.aoColumns[c].bSortable !== false) {
            var f = function () {
                var g, j;
                if (e.shiftKey) {
                  for (var l = false, k = 0; k < a.aaSorting.length; k++) if (a.aaSorting[k][0] == c) {
                    l = true;
                    g = a.aaSorting[k][0];
                    j = a.aaSorting[k][2] + 1;
                    if (a.aoColumns[g].asSorting[j]) {
                      a.aaSorting[k][1] = a.aoColumns[g].asSorting[j];
                      a.aaSorting[k][2] = j
                    } else a.aaSorting.splice(k, 1);
                    break
                  }
                  l === false && a.aaSorting.push([c, a.aoColumns[c].asSorting[0], 0])
                } else if (a.aaSorting.length == 1 && a.aaSorting[0][0] == c) {
                  g = a.aaSorting[0][0];
                  j = a.aaSorting[0][2] + 1;
                  a.aoColumns[g].asSorting[j] || (j = 0);
                  a.aaSorting[0][1] = a.aoColumns[g].asSorting[j];
                  a.aaSorting[0][2] = j
                } else {
                  a.aaSorting.splice(0, a.aaSorting.length);
                  a.aaSorting.push([c, a.aoColumns[c].asSorting[0], 0])
                }
                X(a)
              };
            if (a.oFeatures.bProcessing) {
              P(a, true);
              setTimeout(function () {
                f();
                a.oFeatures.bServerSide || P(a, false)
              }, 0)
            } else f();
            typeof d == "function" && d(a)
          }
        })
      }
      function aa(a) {
        var b, c, d, e, f, g = a.aoColumns.length,
          j = a.oClasses;
        for (b = 0; b < g; b++) a.aoColumns[b].bSortable && i(a.aoColumns[b].nTh).removeClass(j.sSortAsc + " " + j.sSortDesc + " " + a.aoColumns[b].sSortingClass);
        e = a.aaSortingFixed !== null ? a.aaSortingFixed.concat(a.aaSorting) : a.aaSorting.slice();
        for (b = 0; b < a.aoColumns.length; b++) if (a.aoColumns[b].bSortable) {
          f = a.aoColumns[b].sSortingClass;
          d = -1;
          for (c = 0; c < e.length; c++) if (e[c][0] == b) {
            f = e[c][1] == "asc" ? j.sSortAsc : j.sSortDesc;
            d = c;
            break
          }
          i(a.aoColumns[b].nTh).addClass(f);
          if (a.bJUI) {
            c = i("span." + j.sSortIcon, a.aoColumns[b].nTh);
            c.removeClass(j.sSortJUIAsc + " " + j.sSortJUIDesc + " " + j.sSortJUI + " " + j.sSortJUIAscAllowed + " " + j.sSortJUIDescAllowed);
            c.addClass(d == -1 ? a.aoColumns[b].sSortingClassJUI : e[d][1] == "asc" ? j.sSortJUIAsc : j.sSortJUIDesc)
          }
        } else i(a.aoColumns[b].nTh).addClass(a.aoColumns[b].sSortingClass);
        f = j.sSortColumn;
        if (a.oFeatures.bSort && a.oFeatures.bSortClasses) {
          d = T(a);
          if (a.oFeatures.bDeferRender) i(d).removeClass(f + "1 " + f + "2 " + f + "3");
          else if (d.length >= g) for (b = 0; b < g; b++) if (d[b].className.indexOf(f + "1") != -1) {
            c = 0;
            for (a = d.length / g; c < a; c++) d[g * c + b].className = i.trim(d[g * c + b].className.replace(f + "1", ""))
          } else if (d[b].className.indexOf(f + "2") != -1) {
            c = 0;
            for (a = d.length / g; c < a; c++) d[g * c + b].className = i.trim(d[g * c + b].className.replace(f + "2", ""))
          } else if (d[b].className.indexOf(f + "3") != -1) {
            c = 0;
            for (a = d.length / g; c < a; c++) d[g * c + b].className = i.trim(d[g * c + b].className.replace(" " + f + "3", ""))
          }
          j = 1;
          var l;
          for (b = 0; b < e.length; b++) {
            l = parseInt(e[b][0], 10);
            c = 0;
            for (a = d.length / g; c < a; c++) d[g * c + l].className += " " + f + j;
            j < 3 && j++
          }
        }
      }
      function Da(a) {
        if (!(!a.oFeatures.bStateSave || a.bDestroying)) {
          var b, c;
          b = a.oScroll.bInfinite;
          var d = {
            iCreate: (new Date).getTime(),
            iStart: b ? 0 : a._iDisplayStart,
            iEnd: b ? a._iDisplayLength : a._iDisplayEnd,
            iLength: a._iDisplayLength,
            aaSorting: i.extend(true, [], a.aaSorting),
            oSearch: i.extend(true, {}, a.oPreviousSearch),
            aoSearchCols: i.extend(true, [], a.aoPreSearchCols),
            abVisCols: []
          };
          b = 0;
          for (c = a.aoColumns.length; b < c; b++) d.abVisCols.push(a.aoColumns[b].bVisible);
          L(a, "aoStateSaveParams", "stateSaveParams", [a, d]);
          a.fnStateSave.call(a.oInstance, a, d)
        }
      }
      function db(a, b) {
        if (a.oFeatures.bStateSave) {
          var c = a.fnStateLoad.call(a.oInstance, a);
          if (c) {
            var d = L(a, "aoStateLoadParams", "stateLoadParams", [a, c]);
            if (i.inArray(false, d) === -1) {
              a.oLoadedState = i.extend(true, {}, c);
              a._iDisplayStart = c.iStart;
              a.iInitDisplayStart = c.iStart;
              a._iDisplayEnd = c.iEnd;
              a._iDisplayLength = c.iLength;
              a.aaSorting = c.aaSorting.slice();
              a.saved_aaSorting = c.aaSorting.slice();
              i.extend(a.oPreviousSearch, c.oSearch);
              i.extend(true, a.aoPreSearchCols, c.aoSearchCols);
              b.saved_aoColumns = [];
              for (d = 0; d < c.abVisCols.length; d++) {
                b.saved_aoColumns[d] = {};
                b.saved_aoColumns[d].bVisible = c.abVisCols[d]
              }
              L(a, "aoStateLoaded", "stateLoaded", [a, c])
            }
          }
        }
      }
      function ib(a, b, c, d, e) {
        var f = new Date;
        f.setTime(f.getTime() + c * 1E3);
        c = oa.location.pathname.split("/");
        a = a + "_" + c.pop().replace(/[\/:]/g, "").toLowerCase();
        var g;
        if (e !== null) {
          g = typeof i.parseJSON === "function" ? i.parseJSON(b) : eval("(" + b + ")");
          b = e(a, g, f.toGMTString(), c.join("/") + "/")
        } else b = a + "=" + encodeURIComponent(b) + "; expires=" + f.toGMTString() + "; path=" + c.join("/") + "/";
        e = "";
        f = 9999999999999;
        if ((eb(a) !== null ? t.cookie.length : b.length + t.cookie.length) + 10 > 4096) {
          a = t.cookie.split(";");
          for (var j = 0, l = a.length; j < l; j++) if (a[j].indexOf(d) != -1) {
            var k = a[j].split("=");
            try {
              g = eval("(" + decodeURIComponent(k[1]) + ")")
            } catch (y) {
              continue
            }
            if (g.iCreate && g.iCreate < f) {
              e = k[0];
              f = g.iCreate
            }
          }
          if (e !== "") t.cookie = e + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=" + c.join("/") + "/"
        }
        t.cookie = b
      }
      function eb(a) {
        var b = oa.location.pathname.split("/");
        a = a + "_" + b[b.length - 1].replace(/[\/:]/g, "").toLowerCase() + "=";
        b = t.cookie.split(";");
        for (var c = 0; c < b.length; c++) {
          for (var d = b[c]; d.charAt(0) == " ";) d = d.substring(1, d.length);
          if (d.indexOf(a) === 0) return decodeURIComponent(d.substring(a.length, d.length))
        }
        return null
      }
      function z(a) {
        for (var b = 0; b < m.settings.length; b++) if (m.settings[b].nTable === a) return m.settings[b];
        return null
      }
      function ca(a) {
        var b = [];
        a = a.aoData;
        for (var c = 0, d = a.length; c < d; c++) a[c].nTr !== null && b.push(a[c].nTr);
        return b
      }
      function T(a, b) {
        var c = [],
          d, e, f, g, j;
        e = 0;
        var l = a.aoData.length;
        if (b !== p) {
          e = b;
          l = b + 1
        }
        for (e = e; e < l; e++) {
          j = a.aoData[e];
          if (j.nTr !== null) {
            b = [];
            f = 0;
            for (g = j.nTr.childNodes.length; f < g; f++) {
              d = j.nTr.childNodes[f].nodeName.toLowerCase();
              if (d == "td" || d == "th") b.push(j.nTr.childNodes[f])
            }
            f = d = 0;
            for (g = a.aoColumns.length; f < g; f++) if (a.aoColumns[f].bVisible) c.push(b[f - d]);
            else {
              c.push(j._anHidden[f]);
              d++
            }
          }
        }
        return c
      }

      function N(a, b, c) {
        a = a === null ? "DataTables warning: " + c : "DataTables warning (table id = '" + a.sTableId + "'): " + c;
        if (b === 0) if (m.ext.sErrMode == "alert") alert(a);
        else throw a;
        else console !== p && console.log && console.log(a)
      }
      function q(a, b, c, d) {
        if (d === p) d = c;
        if (b[c] !== p) a[d] = b[c]
      }
      function fb(a, b) {
        for (var c in a) if (a.hasOwnProperty(c) && b[c] !== p) if (typeof h[c] === "object" && i.isArray(b[c]) === false) i.extend(true, a[c], b[c]);
        else a[c] = b[c];
        return a
      }
      function cb(a, b, c) {
        i(a).bind("click.DT", b, function (d) {
          c(d);
          a.blur()
        }).bind("keypress.DT", b, function (d) {
          d.which === 13 && c(d)
        }).bind("selectstart.DT", function () {
          return false
        })
      }
      function K(a, b, c, d) {
        c && a[b].push({
          fn: c,
          sName: d
        })
      }
      function L(a, b, c, d) {
        b = a[b];
        for (var e = [], f = b.length - 1; f >= 0; f--) e.push(b[f].fn.apply(a.oInstance, d));
        c !== null && i(a.oInstance).trigger(c, d);
        return e
      }
      function gb(a) {
        return function () {
          var b = [z(this[m.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
          return m.ext.oApi[a].apply(this, b)
        }
      }
      var hb = oa.JSON ? JSON.stringify : function (a) {
          var b = typeof a;
          if (b !== "object" || a === null) {
            if (b === "string") a = '"' + a + '"';
            return a + ""
          }
          var c, d, e = [],
            f = i.isArray(a);
          for (c in a) {
            d = a[c];
            b = typeof d;
            if (b === "string") d = '"' + d + '"';
            else if (b === "object" && d !== null) d = hb(d);
            e.push((f ? "" : '"' + c + '":') + d)
          }
          return (f ? "[" : "{") + e + (f ? "]" : "}")
        };
      this.$ = function (a, b) {
        var c, d = [],
          e = z(this[m.ext.iApiIndex]);
        b || (b = {});
        b = i.extend({}, {
          filter: "none",
          order: "current",
          page: "all"
        }, b);
        if (b.page == "current") {
          b = e._iDisplayStart;
          for (c = e.fnDisplayEnd(); b < c; b++) d.push(e.aoData[e.aiDisplay[b]].nTr)
        } else if (b.order == "current" && b.filter == "none") {
          b = 0;
          for (c = e.aiDisplayMaster.length; b < c; b++) d.push(e.aoData[e.aiDisplayMaster[b]].nTr)
        } else if (b.order == "current" && b.filter == "applied") {
          b = 0;
          for (c = e.aiDisplay.length; b < c; b++) d.push(e.aoData[e.aiDisplay[b]].nTr)
        } else if (b.order == "original" && b.filter == "none") {
          b = 0;
          for (c = e.aoData.length; b < c; b++) d.push(e.aoData[b].nTr)
        } else if (b.order == "original" && b.filter == "applied") {
          b = 0;
          for (c = e.aoData.length; b < c; b++) i.inArray(b, e.aiDisplay) !== -1 && d.push(e.aoData[b].nTr)
        } else N(e, 1, "Unknown selection options");
        e = i(d);
        d = e.filter(a);
        a = e.find(a);
        return i([].concat(i.makeArray(d), i.makeArray(a)))
      };
      this._ = function (a, b) {
        var c = [],
          d = this.$(a, b);
        a = 0;
        for (b = d.length; a < b; a++) c.push(this.fnGetData(d[a]));
        return c
      };
      this.fnAddData = function (a, b) {
        if (a.length === 0) return [];
        var c = [],
          d, e = z(this[m.ext.iApiIndex]);
        if (typeof a[0] === "object" && a[0] !== null) for (var f = 0; f < a.length; f++) {
          d = O(e, a[f]);
          if (d == -1) return c;
          c.push(d)
        } else {
          d = O(e, a);
          if (d == -1) return c;
          c.push(d)
        }
        e.aiDisplay = e.aiDisplayMaster.slice();
        if (b === p || b) ma(e);
        return c
      };
      this.fnAdjustColumnSizing = function (a) {
        var b = z(this[m.ext.iApiIndex]);
        o(b);
        if (a === p || a) this.fnDraw(false);
        else if (b.oScroll.sX !== "" || b.oScroll.sY !== "") this.oApi._fnScrollDraw(b)
      };
      this.fnClearTable = function (a) {
        var b = z(this[m.ext.iApiIndex]);
        sa(b);
        if (a === p || a) H(b)
      };
      this.fnClose = function (a) {
        for (var b = z(this[m.ext.iApiIndex]), c = 0; c < b.aoOpenRows.length; c++) if (b.aoOpenRows[c].nParent == a) {
          (a = b.aoOpenRows[c].nTr.parentNode) && a.removeChild(b.aoOpenRows[c].nTr);
          b.aoOpenRows.splice(c, 1);
          return 0
        }
        return 1
      };
      this.fnDeleteRow = function (a, b, c) {
        var d = z(this[m.ext.iApiIndex]),
          e, f;
        a = typeof a === "object" ? M(d, a) : a;
        var g = d.aoData.splice(a, 1);
        e = 0;
        for (f = d.aoData.length; e < f; e++) if (d.aoData[e].nTr !== null) d.aoData[e].nTr._DT_RowIndex = e;
        e = i.inArray(a, d.aiDisplay);
        d.asDataSearch.splice(e, 1);
        ta(d.aiDisplayMaster, a);
        ta(d.aiDisplay, a);
        typeof b === "function" && b.call(this, d, g);
        if (d._iDisplayStart >= d.aiDisplay.length) {
          d._iDisplayStart -= d._iDisplayLength;
          if (d._iDisplayStart < 0) d._iDisplayStart = 0
        }
        if (c === p || c) {
          J(d);
          H(d)
        }
        return g
      };
      this.fnDestroy = function (a) {
        var b = z(this[m.ext.iApiIndex]),
          c = b.nTableWrapper.parentNode,
          d = b.nTBody,
          e, f;
        a = a === p ? false : true;
        b.bDestroying = true;
        e = 0;
        for (f = b.aoDestroyCallback.length; e < f; e++) b.aoDestroyCallback[e].fn();
        e = 0;
        for (f = b.aoColumns.length; e < f; e++) b.aoColumns[e].bVisible === false && this.fnSetColumnVis(e, true);
        i(b.nTableWrapper).find("*").andSelf().unbind(".DT");
        i("tbody>tr>td." + b.oClasses.sRowEmpty, b.nTable).parent().remove();
        if (b.nTable != b.nTHead.parentNode) {
          i(b.nTable).children("thead").remove();
          b.nTable.appendChild(b.nTHead)
        }
        if (b.nTFoot && b.nTable != b.nTFoot.parentNode) {
          i(b.nTable).children("tfoot").remove();
          b.nTable.appendChild(b.nTFoot)
        }
        b.nTable.parentNode.removeChild(b.nTable);
        i(b.nTableWrapper).remove();
        b.aaSorting = [];
        b.aaSortingFixed = [];
        aa(b);
        i(ca(b)).removeClass(b.asStripeClasses.join(" "));
        i("th, td", b.nTHead).removeClass([b.oClasses.sSortable, b.oClasses.sSortableAsc, b.oClasses.sSortableDesc, b.oClasses.sSortableNone].join(" "));
        if (b.bJUI) {
          i("th span." + b.oClasses.sSortIcon + ", td span." + b.oClasses.sSortIcon, b.nTHead).remove();
          i("th, td", b.nTHead).each(function () {
            var g = i("div." + b.oClasses.sSortJUIWrapper, this),
              j = g.contents();
            i(this).append(j);
            g.remove()
          })
        }
        if (!a && b.nTableReinsertBefore) c.insertBefore(b.nTable, b.nTableReinsertBefore);
        else a || c.appendChild(b.nTable);
        e = 0;
        for (f = b.aoData.length; e < f; e++) b.aoData[e].nTr !== null && d.appendChild(b.aoData[e].nTr);
        if (b.oFeatures.bAutoWidth === true) b.nTable.style.width = s(b.sDestroyWidth);
        i(d).children("tr:even").addClass(b.asDestroyStripes[0]);
        i(d).children("tr:odd").addClass(b.asDestroyStripes[1]);
        e = 0;
        for (f = m.settings.length; e < f; e++) m.settings[e] == b && m.settings.splice(e, 1);
        b = null
      };
      this.fnDraw = function (a) {
        var b = z(this[m.ext.iApiIndex]);
        if (a) {
          J(b);
          H(b)
        } else ma(b)
      };
      this.fnFilter = function (a, b, c, d, e, f) {
        var g = z(this[m.ext.iApiIndex]);
        if (g.oFeatures.bFilter) {
          if (c === p || c === null) c = false;
          if (d === p || d === null) d = true;
          if (e === p || e === null) e = true;
          if (f === p || f === null) f = true;
          if (b === p || b === null) {
            U(g, {
              sSearch: a + "",
              bRegex: c,
              bSmart: d,
              bCaseInsensitive: f
            }, 1);
            if (e && g.aanFeatures.f) {
              b = g.aanFeatures.f;
              c = 0;
              for (d = b.length; c < d; c++) i("input", b[c]).val(a)
            }
          } else {
            i.extend(g.aoPreSearchCols[b], {
              sSearch: a + "",
              bRegex: c,
              bSmart: d,
              bCaseInsensitive: f
            });
            U(g, g.oPreviousSearch, 1)
          }
        }
      };
      this.fnGetData = function (a, b) {
        var c = z(this[m.ext.iApiIndex]);
        if (a !== p) {
          var d = a;
          if (typeof a === "object") {
            var e = a.nodeName.toLowerCase();
            if (e === "tr") d = M(c, a);
            else if (e === "td") {
              d = M(c, a.parentNode);
              b = ra(c, d, a)
            }
          }
          if (b !== p) return E(c, d, b, "");
          return c.aoData[d] !== p ? c.aoData[d]._aData : null
        }
        return ka(c)
      };
      this.fnGetNodes = function (a) {
        var b = z(this[m.ext.iApiIndex]);
        if (a !== p) return b.aoData[a] !== p ? b.aoData[a].nTr : null;
        return ca(b)
      };
      this.fnGetPosition = function (a) {
        var b = z(this[m.ext.iApiIndex]),
          c = a.nodeName.toUpperCase();
        if (c == "TR") return M(b, a);
        else if (c == "TD" || c == "TH") {
          c = M(b, a.parentNode);
          a = ra(b, c, a);
          return [c, x(b, a), a]
        }
        return null
      };
      this.fnIsOpen = function (a) {
        for (var b = z(this[m.ext.iApiIndex]), c = 0; c < b.aoOpenRows.length; c++) if (b.aoOpenRows[c].nParent == a) return true;
        return false
      };
      this.fnOpen = function (a, b, c) {
        var d = z(this[m.ext.iApiIndex]),
          e = ca(d);
        if (i.inArray(a, e) !== -1) {
          this.fnClose(a);
          e = t.createElement("tr");
          var f = t.createElement("td");
          e.appendChild(f);
          f.className = c;
          f.colSpan = B(d);
          if (typeof b === "string") f.innerHTML = b;
          else i(f).html(b);
          b = i("tr", d.nTBody);
          i.inArray(a, b) != -1 && i(e).insertAfter(a);
          d.aoOpenRows.push({
            nTr: e,
            nParent: a
          });
          return e
        }
      };
      this.fnPageChange = function (a, b) {
        var c = z(this[m.ext.iApiIndex]);
        Ca(c, a);
        J(c);
        if (b === p || b) H(c)
      };
      this.fnSetColumnVis = function (a, b, c) {
        var d = z(this[m.ext.iApiIndex]),
          e, f, g = d.aoColumns,
          j = d.aoData,
          l, k;
        if (g[a].bVisible != b) {
          if (b) {
            for (e = f = 0; e < a; e++) g[e].bVisible && f++;
            k = f >= B(d);
            if (!k) for (e = a; e < g.length; e++) if (g[e].bVisible) {
              l = e;
              break
            }
            e = 0;
            for (f = j.length; e < f; e++) if (j[e].nTr !== null) k ? j[e].nTr.appendChild(j[e]._anHidden[a]) : j[e].nTr.insertBefore(j[e]._anHidden[a], T(d, e)[l])
          } else {
            e = 0;
            for (f = j.length; e < f; e++) if (j[e].nTr !== null) {
              l = T(d, e)[a];
              j[e]._anHidden[a] = l;
              l.parentNode.removeChild(l)
            }
          }
          g[a].bVisible = b;
          ea(d, d.aoHeader);
          d.nTFoot && ea(d, d.aoFooter);
          e = 0;
          for (f = d.aoOpenRows.length; e < f; e++) d.aoOpenRows[e].nTr.colSpan = B(d);
          if (c === p || c) {
            o(d);
            H(d)
          }
          Da(d)
        }
      };
      this.fnSettings = function () {
        return z(this[m.ext.iApiIndex])
      };
      this.fnSort = function (a) {
        var b = z(this[m.ext.iApiIndex]);
        b.aaSorting = a;
        X(b)
      };
      this.fnSortListener = function (a, b, c) {
        ua(z(this[m.ext.iApiIndex]), a, b, c)
      };
      this.fnUpdate = function (a, b, c, d, e) {
        var f = z(this[m.ext.iApiIndex]);
        b = typeof b === "object" ? M(f, b) : b;
        if (f.__fnUpdateDeep === p && i.isArray(a) && typeof a === "object") {
          f.aoData[b]._aData = a.slice();
          f.__fnUpdateDeep = true;
          for (c = 0; c < f.aoColumns.length; c++) this.fnUpdate(E(f, b, c), b, c, false, false);
          f.__fnUpdateDeep = p
        } else if (f.__fnUpdateDeep === p && a !== null && typeof a === "object") {
          f.aoData[b]._aData = i.extend(true, {}, a);
          f.__fnUpdateDeep = true;
          for (c = 0; c < f.aoColumns.length; c++) this.fnUpdate(E(f, b, c), b, c, false, false);
          f.__fnUpdateDeep = p
        } else {
          S(f, b, c, a);
          a = E(f, b, c, "display");
          var g = f.aoColumns[c];
          if (g.fnRender !== null) {
            a = ba(f, b, c);
            g.bUseRendered && S(f, b, c, a)
          }
          if (f.aoData[b].nTr !== null) T(f, b)[c].innerHTML = a
        }
        c = i.inArray(b, f.aiDisplay);
        f.asDataSearch[c] = za(f, ja(f, b, "filter"));
        if (e === p || e) o(f);
        if (d === p || d) ma(f);
        return 0
      };
      this.fnVersionCheck = m.ext.fnVersionCheck;
      this.oApi = {
        _fnExternApiFunc: gb,
        _fnInitialise: na,
        _fnInitComplete: la,
        _fnLanguageCompat: Ba,
        _fnAddColumn: n,
        _fnColumnOptions: r,
        _fnAddData: O,
        _fnCreateTr: qa,
        _fnGatherData: ia,
        _fnBuildHead: Ha,
        _fnDrawHead: ea,
        _fnDraw: H,
        _fnReDraw: ma,
        _fnAjaxUpdate: Ia,
        _fnAjaxParameters: Qa,
        _fnAjaxUpdateDraw: Ra,
        _fnServerParams: va,
        _fnAddOptionsHtml: Ja,
        _fnFeatureHtmlTable: Na,
        _fnScrollDraw: Wa,
        _fnAdjustColumnSizing: o,
        _fnFeatureHtmlFilter: La,
        _fnFilterComplete: U,
        _fnFilterCustom: Ua,
        _fnFilterColumn: Ta,
        _fnFilter: Sa,
        _fnBuildSearchArray: wa,
        _fnBuildSearchRow: za,
        _fnFilterCreateSearch: xa,
        _fnDataToSearch: ya,
        _fnSort: X,
        _fnSortAttachListener: ua,
        _fnSortingClasses: aa,
        _fnFeatureHtmlPaginate: Pa,
        _fnPageChange: Ca,
        _fnFeatureHtmlInfo: Oa,
        _fnUpdateInfo: Va,
        _fnFeatureHtmlLength: Ka,
        _fnFeatureHtmlProcessing: Ma,
        _fnProcessingDisplay: P,
        _fnVisibleToColumnIndex: w,
        _fnColumnIndexToVisible: x,
        _fnNodeToDataIndex: M,
        _fnVisbleColumns: B,
        _fnCalculateEnd: J,
        _fnConvertToWidth: Xa,
        _fnCalculateColumnWidths: pa,
        _fnScrollingWidthAdjust: Za,
        _fnGetWidestNode: Ya,
        _fnGetMaxLenString: $a,
        _fnStringToCss: s,
        _fnDetectType: D,
        _fnSettingsFromNode: z,
        _fnGetDataMaster: ka,
        _fnGetTrNodes: ca,
        _fnGetTdNodes: T,
        _fnEscapeRegex: Aa,
        _fnDeleteIndex: ta,
        _fnReOrderIndex: G,
        _fnColumnOrdering: F,
        _fnLog: N,
        _fnClearTable: sa,
        _fnSaveState: Da,
        _fnLoadState: db,
        _fnCreateCookie: ib,
        _fnReadCookie: eb,
        _fnDetectHeader: da,
        _fnGetUniqueThs: W,
        _fnScrollBarWidth: ab,
        _fnApplyToChildren: V,
        _fnMap: q,
        _fnGetRowData: ja,
        _fnGetCellData: E,
        _fnSetCellData: S,
        _fnGetObjectDataFn: ha,
        _fnSetObjectDataFn: Ga,
        _fnApplyColumnDefs: R,
        _fnBindAction: cb,
        _fnExtend: fb,
        _fnCallbackReg: K,
        _fnCallbackFire: L,
        _fnJsonString: hb,
        _fnRender: ba,
        _fnNodeToColumnIndex: ra
      };
      i.extend(m.ext.oApi, this.oApi);
      for (var Ea in m.ext.oApi) if (Ea) this[Ea] = gb(Ea);
      var Fa = this;
      return this.each(function () {
        var a = 0,
          b, c, d;
        c = this.getAttribute("id");
        var e = false,
          f = false;
        if (this.nodeName.toLowerCase() != "table") N(null, 0, "Attempted to initialise DataTables on a node which is not a table: " + this.nodeName);
        else {
          a = 0;
          for (b = m.settings.length; a < b; a++) {
            if (m.settings[a].nTable == this) if (h === p || h.bRetrieve) return m.settings[a].oInstance;
            else if (h.bDestroy) {
              m.settings[a].oInstance.fnDestroy();
              break
            } else {
              N(m.settings[a], 0, "Cannot reinitialise DataTable.\n\nTo retrieve the DataTables object for this table, pass no arguments or see the docs for bRetrieve and bDestroy");
              return
            }
            if (m.settings[a].sTableId == this.id) {
              m.settings.splice(a, 1);
              break
            }
          }
          if (c === null) this.id = c = "DataTables_Table_" + m.ext._oExternConfig.iNextUnique++;
          var g = i.extend(true, {}, m.models.oSettings, {
            nTable: this,
            oApi: Fa.oApi,
            oInit: h,
            sDestroyWidth: i(this).width(),
            sInstance: c,
            sTableId: c
          });
          m.settings.push(g);
          g.oInstance = Fa.length === 1 ? Fa : i(this).dataTable();
          h || (h = {});
          h.oLanguage && Ba(h.oLanguage);
          h = fb(i.extend(true, {}, m.defaults), h);
          q(g.oFeatures, h, "bPaginate");
          q(g.oFeatures, h, "bLengthChange");
          q(g.oFeatures, h, "bFilter");
          q(g.oFeatures, h, "bSort");
          q(g.oFeatures, h, "bInfo");
          q(g.oFeatures, h, "bProcessing");
          q(g.oFeatures, h, "bAutoWidth");
          q(g.oFeatures, h, "bSortClasses");
          q(g.oFeatures, h, "bServerSide");
          q(g.oFeatures, h, "bDeferRender");
          q(g.oScroll, h, "sScrollX", "sX");
          q(g.oScroll, h, "sScrollXInner", "sXInner");
          q(g.oScroll, h, "sScrollY", "sY");
          q(g.oScroll, h, "bScrollCollapse", "bCollapse");
          q(g.oScroll, h, "bScrollInfinite", "bInfinite");
          q(g.oScroll, h, "iScrollLoadGap", "iLoadGap");
          q(g.oScroll, h, "bScrollAutoCss", "bAutoCss");
          q(g, h, "asStripClasses", "asStripeClasses");
          q(g, h, "asStripeClasses");
          q(g, h, "fnServerData");
          q(g, h, "fnFormatNumber");
          q(g, h, "sServerMethod");
          q(g, h, "aaSorting");
          q(g, h, "aaSortingFixed");
          q(g, h, "aLengthMenu");
          q(g, h, "sPaginationType");
          q(g, h, "sAjaxSource");
          q(g, h, "sAjaxDataProp");
          q(g, h, "iCookieDuration");
          q(g, h, "sCookiePrefix");
          q(g, h, "sDom");
          q(g, h, "bSortCellsTop");
          q(g, h, "iTabIndex");
          q(g, h, "oSearch", "oPreviousSearch");
          q(g, h, "aoSearchCols", "aoPreSearchCols");
          q(g, h, "iDisplayLength", "_iDisplayLength");
          q(g, h, "bJQueryUI", "bJUI");
          q(g, h, "fnCookieCallback");
          q(g, h, "fnStateLoad");
          q(g, h, "fnStateSave");
          q(g.oLanguage, h, "fnInfoCallback");
          K(g, "aoDrawCallback", h.fnDrawCallback, "user");
          K(g, "aoServerParams", h.fnServerParams, "user");
          K(g, "aoStateSaveParams", h.fnStateSaveParams, "user");
          K(g, "aoStateLoadParams", h.fnStateLoadParams, "user");
          K(g, "aoStateLoaded", h.fnStateLoaded, "user");
          K(g, "aoRowCallback", h.fnRowCallback, "user");
          K(g, "aoRowCreatedCallback", h.fnCreatedRow, "user");
          K(g, "aoHeaderCallback", h.fnHeaderCallback, "user");
          K(g, "aoFooterCallback", h.fnFooterCallback, "user");
          K(g, "aoInitComplete", h.fnInitComplete, "user");
          K(g, "aoPreDrawCallback", h.fnPreDrawCallback, "user");
          if (g.oFeatures.bServerSide && g.oFeatures.bSort && g.oFeatures.bSortClasses) K(g, "aoDrawCallback", aa, "server_side_sort_classes");
          else g.oFeatures.bDeferRender && K(g, "aoDrawCallback", aa, "defer_sort_classes");
          if (h.bJQueryUI) {
            i.extend(g.oClasses, m.ext.oJUIClasses);
            if (h.sDom === m.defaults.sDom && m.defaults.sDom === "lfrtip") g.sDom = '<"H"lfr>t<"F"ip>'
          } else i.extend(g.oClasses, m.ext.oStdClasses);
          i(this).addClass(g.oClasses.sTable);
          if (g.oScroll.sX !== "" || g.oScroll.sY !== "") g.oScroll.iBarWidth = ab();
          if (g.iInitDisplayStart === p) {
            g.iInitDisplayStart = h.iDisplayStart;
            g._iDisplayStart = h.iDisplayStart
          }
          if (h.bStateSave) {
            g.oFeatures.bStateSave = true;
            db(g, h);
            K(g, "aoDrawCallback", Da, "state_save")
          }
          if (h.iDeferLoading !== null) {
            g.bDeferLoading = true;
            g._iRecordsTotal = h.iDeferLoading;
            g._iRecordsDisplay = h.iDeferLoading
          }
          if (h.aaData !== null) f = true;
          if (h.oLanguage.sUrl !== "") {
            g.oLanguage.sUrl = h.oLanguage.sUrl;
            i.getJSON(g.oLanguage.sUrl, null, function (l) {
              Ba(l);
              i.extend(true, g.oLanguage, h.oLanguage, l);
              na(g)
            });
            e = true
          } else i.extend(true, g.oLanguage, h.oLanguage);
          c = false;
          d = i(this).children("tbody").children("tr");
          a = 0;
          for (b = g.asStripeClasses.length; a < b; a++) if (d.filter(":lt(2)").hasClass(g.asStripeClasses[a])) {
            c = true;
            break
          }
          if (c) {
            g.asDestroyStripes = ["", ""];
            if (i(d[0]).hasClass(g.oClasses.sStripeOdd)) g.asDestroyStripes[0] += g.oClasses.sStripeOdd + " ";
            if (i(d[0]).hasClass(g.oClasses.sStripeEven)) g.asDestroyStripes[0] += g.oClasses.sStripeEven;
            if (i(d[1]).hasClass(g.oClasses.sStripeOdd)) g.asDestroyStripes[1] += g.oClasses.sStripeOdd + " ";
            if (i(d[1]).hasClass(g.oClasses.sStripeEven)) g.asDestroyStripes[1] += g.oClasses.sStripeEven;
            d.removeClass(g.asStripeClasses.join(" "))
          }
          c = [];
          a = this.getElementsByTagName("thead");
          if (a.length !== 0) {
            da(g.aoHeader, a[0]);
            c = W(g)
          }
          if (h.aoColumns === null) {
            d = [];
            a = 0;
            for (b = c.length; a < b; a++) d.push(null)
          } else d = h.aoColumns;
          a = 0;
          for (b = d.length; a < b; a++) {
            if (h.saved_aoColumns !== p && h.saved_aoColumns.length == b) {
              if (d[a] === null) d[a] = {};
              d[a].bVisible = h.saved_aoColumns[a].bVisible
            }
            n(g, c ? c[a] : null)
          }
          R(g, h.aoColumnDefs, d, function (l, k) {
            r(g, l, k)
          });
          a = 0;
          for (b = g.aaSorting.length; a < b; a++) {
            if (g.aaSorting[a][0] >= g.aoColumns.length) g.aaSorting[a][0] = 0;
            var j = g.aoColumns[g.aaSorting[a][0]];
            if (g.aaSorting[a][2] === p) g.aaSorting[a][2] = 0;
            if (h.aaSorting === p && g.saved_aaSorting === p) g.aaSorting[a][1] = j.asSorting[0];
            c = 0;
            for (d = j.asSorting.length; c < d; c++) if (g.aaSorting[a][1] == j.asSorting[c]) {
              g.aaSorting[a][2] = c;
              break
            }
          }
          aa(g);
          a = i(this).children("thead");
          if (a.length === 0) {
            a = [t.createElement("thead")];
            this.appendChild(a[0])
          }
          g.nTHead = a[0];
          a = i(this).children("tbody");
          if (a.length === 0) {
            a = [t.createElement("tbody")];
            this.appendChild(a[0])
          }
          g.nTBody = a[0];
          g.nTBody.setAttribute("role", "alert");
          g.nTBody.setAttribute("aria-live", "polite");
          g.nTBody.setAttribute("aria-relevant", "all");
          a = i(this).children("tfoot");
          if (a.length > 0) {
            g.nTFoot = a[0];
            da(g.aoFooter, g.nTFoot)
          }
          if (f) for (a = 0; a < h.aaData.length; a++) O(g, h.aaData[a]);
          else ia(g);
          g.aiDisplay = g.aiDisplayMaster.slice();
          g.bInitialised = true;
          e === false && na(g)
        }
      })
    };
  m.version = "1.9.0";
  m.settings = [];
  m.models = {};
  m.models.ext = {
    afnFiltering: [],
    afnSortData: [],
    aoFeatures: [],
    aTypes: [],
    fnVersionCheck: function (h) {
      var n = function (D, G) {
          for (; D.length < G;) D += "0";
          return D
        },
        r = m.ext.sVersion.split(".");
      h = h.split(".");
      for (var o = "", w = "", x = 0, B = h.length; x < B; x++) {
        o += n(r[x], 3);
        w += n(h[x], 3)
      }
      return parseInt(o, 10) >= parseInt(w, 10)
    },
    iApiIndex: 0,
    ofnSearch: {},
    oApi: {},
    oStdClasses: {},
    oJUIClasses: {},
    oPagination: {},
    oSort: {},
    sVersion: m.version,
    sErrMode: "alert",
    _oExternConfig: {
      iNextUnique: 0
    }
  };
  m.models.oSearch = {
    bCaseInsensitive: true,
    sSearch: "",
    bRegex: false,
    bSmart: true
  };
  m.models.oRow = {
    nTr: null,
    _aData: [],
    _aSortData: [],
    _anHidden: [],
    _sRowStripe: ""
  };
  m.models.oColumn = {
    aDataSort: null,
    asSorting: null,
    bSearchable: null,
    bSortable: null,
    bUseRendered: null,
    bVisible: null,
    _bAutoType: true,
    fnCreatedCell: null,
    fnGetData: null,
    fnRender: null,
    fnSetData: null,
    mDataProp: null,
    nTh: null,
    nTf: null,
    sClass: null,
    sContentPadding: null,
    sDefaultContent: null,
    sName: null,
    sSortDataType: "std",
    sSortingClass: null,
    sSortingClassJUI: null,
    sTitle: null,
    sType: null,
    sWidth: null,
    sWidthOrig: null
  };
  m.defaults = {
    aaData: null,
    aaSorting: [
      [0, "asc"]
    ],
    aaSortingFixed: null,
    aLengthMenu: [10, 25, 50, 100],
    aoColumns: null,
    aoColumnDefs: null,
    aoSearchCols: [],
    asStripeClasses: ["odd", "even"],
    bAutoWidth: true,
    bDeferRender: false,
    bDestroy: false,
    bFilter: true,
    bInfo: true,
    bJQueryUI: false,
    bLengthChange: true,
    bPaginate: true,
    bProcessing: false,
    bRetrieve: false,
    bScrollAutoCss: true,
    bScrollCollapse: false,
    bScrollInfinite: false,
    bServerSide: false,
    bSort: true,
    bSortCellsTop: false,
    bSortClasses: true,
    bStateSave: false,
    fnCookieCallback: null,
    fnCreatedRow: null,
    fnDrawCallback: null,
    fnFooterCallback: null,
    fnFormatNumber: function (h) {
      if (h < 1E3) return h;
      var n = h + "";
      h = n.split("");
      var r = "";
      n = n.length;
      for (var o = 0; o < n; o++) {
        if (o % 3 === 0 && o !== 0) r = this.oLanguage.sInfoThousands + r;
        r = h[n - o - 1] + r
      }
      return r
    },
    fnHeaderCallback: null,
    fnInfoCallback: null,
    fnInitComplete: null,
    fnPreDrawCallback: null,
    fnRowCallback: null,
    fnServerData: function (h, n, r, o) {
      o.jqXHR = i.ajax({
        url: h,
        data: n,
        success: function (w) {
          i(o.oInstance).trigger("xhr", o);
          r(w)
        },
        dataType: "json",
        cache: false,
        type: o.sServerMethod,
        error: function (w, x) {
          x == "parsererror" && alert("DataTables warning: JSON data from server could not be parsed. This is caused by a JSON formatting error.")
        }
      })
    },
    fnServerParams: null,
    fnStateLoad: function (h) {
      h = this.oApi._fnReadCookie(h.sCookiePrefix + h.sInstance);
      var n;
      try {
        n = typeof i.parseJSON === "function" ? i.parseJSON(h) : eval("(" + h + ")")
      } catch (r) {
        n = null
      }
      return n
    },
    fnStateLoadParams: null,
    fnStateLoaded: null,
    fnStateSave: function (h, n) {
      this.oApi._fnCreateCookie(h.sCookiePrefix + h.sInstance, this.oApi._fnJsonString(n), h.iCookieDuration, h.sCookiePrefix, h.fnCookieCallback)
    },
    fnStateSaveParams: null,
    iCookieDuration: 7200,
    iDeferLoading: null,
    iDisplayLength: 10,
    iDisplayStart: 0,
    iScrollLoadGap: 100,
    iTabIndex: 0,
    oLanguage: {
      oAria: {
        sSortAscending: ": activate to sort column ascending",
        sSortDescending: ": activate to sort column descending"
      },
      oPaginate: {
        sFirst: "First",
        sLast: "Last",
        sNext: "Next",
        sPrevious: "Previous"
      },
      sEmptyTable: "No data available in table",
      sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
      sInfoEmpty: "Showing 0 to 0 of 0 entries",
      sInfoFiltered: "(filtered from _MAX_ total entries)",
      sInfoPostFix: "",
      sInfoThousands: ",",
      sLengthMenu: "Show _MENU_ entries",
      sLoadingRecords: "Loading...",
      sProcessing: "Processing...",
      sSearch: "Search:",
      sUrl: "",
      sZeroRecords: "No matching records found"
    },
    oSearch: i.extend({}, m.models.oSearch),
    sAjaxDataProp: "aaData",
    sAjaxSource: null,
    sCookiePrefix: "SpryMedia_DataTables_",
    sDom: "lfrtip",
    sPaginationType: "two_button",
    sScrollX: "",
    sScrollXInner: "",
    sScrollY: "",
    sServerMethod: "GET"
  };
  m.defaults.columns = {
    aDataSort: null,
    asSorting: ["asc", "desc"],
    bSearchable: true,
    bSortable: true,
    bUseRendered: true,
    bVisible: true,
    fnCreatedCell: null,
    fnRender: null,
    iDataSort: -1,
    mDataProp: null,
    sClass: "",
    sContentPadding: "",
    sDefaultContent: null,
    sName: "",
    sSortDataType: "std",
    sTitle: null,
    sType: null,
    sWidth: null
  };
  m.models.oSettings = {
    oFeatures: {
      bAutoWidth: null,
      bDeferRender: null,
      bFilter: null,
      bInfo: null,
      bLengthChange: null,
      bPaginate: null,
      bProcessing: null,
      bServerSide: null,
      bSort: null,
      bSortClasses: null,
      bStateSave: null
    },
    oScroll: {
      bAutoCss: null,
      bCollapse: null,
      bInfinite: null,
      iBarWidth: 0,
      iLoadGap: null,
      sX: null,
      sXInner: null,
      sY: null
    },
    oLanguage: {
      fnInfoCallback: null
    },
    aanFeatures: [],
    aoData: [],
    aiDisplay: [],
    aiDisplayMaster: [],
    aoColumns: [],
    aoHeader: [],
    aoFooter: [],
    asDataSearch: [],
    oPreviousSearch: {},
    aoPreSearchCols: [],
    aaSorting: null,
    aaSortingFixed: null,
    asStripeClasses: null,
    asDestroyStripes: [],
    sDestroyWidth: 0,
    aoRowCallback: [],
    aoHeaderCallback: [],
    aoFooterCallback: [],
    aoDrawCallback: [],
    aoRowCreatedCallback: [],
    aoPreDrawCallback: [],
    aoInitComplete: [],
    aoStateSaveParams: [],
    aoStateLoadParams: [],
    aoStateLoaded: [],
    sTableId: "",
    nTable: null,
    nTHead: null,
    nTFoot: null,
    nTBody: null,
    nTableWrapper: null,
    bDeferLoading: false,
    bInitialised: false,
    aoOpenRows: [],
    sDom: null,
    sPaginationType: "two_button",
    iCookieDuration: 0,
    sCookiePrefix: "",
    fnCookieCallback: null,
    aoStateSave: [],
    aoStateLoad: [],
    oLoadedState: null,
    sAjaxSource: null,
    sAjaxDataProp: null,
    bAjaxDataGet: true,
    jqXHR: null,
    fnServerData: null,
    aoServerParams: [],
    sServerMethod: null,
    fnFormatNumber: null,
    aLengthMenu: null,
    iDraw: 0,
    bDrawing: false,
    iDrawError: -1,
    _iDisplayLength: 10,
    _iDisplayStart: 0,
    _iDisplayEnd: 10,
    _iRecordsTotal: 0,
    _iRecordsDisplay: 0,
    bJUI: null,
    oClasses: {},
    bFiltered: false,
    bSorted: false,
    bSortCellsTop: null,
    oInit: null,
    aoDestroyCallback: [],
    fnRecordsTotal: function () {
      return this.oFeatures.bServerSide ? parseInt(this._iRecordsTotal, 10) : this.aiDisplayMaster.length
    },
    fnRecordsDisplay: function () {
      return this.oFeatures.bServerSide ? parseInt(this._iRecordsDisplay, 10) : this.aiDisplay.length
    },
    fnDisplayEnd: function () {
      return this.oFeatures.bServerSide ? this.oFeatures.bPaginate === false || this._iDisplayLength == -1 ? this._iDisplayStart + this.aiDisplay.length : Math.min(this._iDisplayStart + this._iDisplayLength, this._iRecordsDisplay) : this._iDisplayEnd
    },
    oInstance: null,
    sInstance: null,
    iTabIndex: 0
  };
  m.ext = i.extend(true, {}, m.models.ext);
  i.extend(m.ext.oStdClasses, {
    sTable: "dataTable",
    sPagePrevEnabled: "paginate_enabled_previous",
    sPagePrevDisabled: "paginate_disabled_previous",
    sPageNextEnabled: "paginate_enabled_next",
    sPageNextDisabled: "paginate_disabled_next",
    sPageJUINext: "",
    sPageJUIPrev: "",
    sPageButton: "paginate_button",
    sPageButtonActive: "paginate_active",
    sPageButtonStaticDisabled: "paginate_button paginate_button_disabled",
    sPageFirst: "first",
    sPagePrevious: "previous",
    sPageNext: "next",
    sPageLast: "last",
    sStripeOdd: "odd",
    sStripeEven: "even",
    sRowEmpty: "dataTables_empty",
    sWrapper: "dataTables_wrapper",
    sFilter: "dataTables_filter",
    sInfo: "dataTables_info",
    sPaging: "dataTables_paginate paging_",
    sLength: "dataTables_length",
    sProcessing: "dataTables_processing",
    sSortAsc: "sorting_asc",
    sSortDesc: "sorting_desc",
    sSortable: "sorting",
    sSortableAsc: "sorting_asc_disabled",
    sSortableDesc: "sorting_desc_disabled",
    sSortableNone: "sorting_disabled",
    sSortColumn: "sorting_",
    sSortJUIAsc: "",
    sSortJUIDesc: "",
    sSortJUI: "",
    sSortJUIAscAllowed: "",
    sSortJUIDescAllowed: "",
    sSortJUIWrapper: "",
    sSortIcon: "",
    sScrollWrapper: "dataTables_scroll",
    sScrollHead: "dataTables_scrollHead",
    sScrollHeadInner: "dataTables_scrollHeadInner",
    sScrollBody: "dataTables_scrollBody",
    sScrollFoot: "dataTables_scrollFoot",
    sScrollFootInner: "dataTables_scrollFootInner",
    sFooterTH: ""
  });
  i.extend(m.ext.oJUIClasses, m.ext.oStdClasses, {
    sPagePrevEnabled: "fg-button ui-button ui-state-default ui-corner-left",
    sPagePrevDisabled: "fg-button ui-button ui-state-default ui-corner-left ui-state-disabled",
    sPageNextEnabled: "fg-button ui-button ui-state-default ui-corner-right",
    sPageNextDisabled: "fg-button ui-button ui-state-default ui-corner-right ui-state-disabled",
    sPageJUINext: "ui-icon ui-icon-circle-arrow-e",
    sPageJUIPrev: "ui-icon ui-icon-circle-arrow-w",
    sPageButton: "fg-button ui-button ui-state-default",
    sPageButtonActive: "fg-button ui-button ui-state-default ui-state-disabled",
    sPageButtonStaticDisabled: "fg-button ui-button ui-state-default ui-state-disabled",
    sPageFirst: "first ui-corner-tl ui-corner-bl",
    sPageLast: "last ui-corner-tr ui-corner-br",
    sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
    sSortAsc: "ui-state-default",
    sSortDesc: "ui-state-default",
    sSortable: "ui-state-default",
    sSortableAsc: "ui-state-default",
    sSortableDesc: "ui-state-default",
    sSortableNone: "ui-state-default",
    sSortJUIAsc: "css_right ui-icon ui-icon-triangle-1-n",
    sSortJUIDesc: "css_right ui-icon ui-icon-triangle-1-s",
    sSortJUI: "css_right ui-icon ui-icon-carat-2-n-s",
    sSortJUIAscAllowed: "css_right ui-icon ui-icon-carat-1-n",
    sSortJUIDescAllowed: "css_right ui-icon ui-icon-carat-1-s",
    sSortJUIWrapper: "DataTables_sort_wrapper",
    sSortIcon: "DataTables_sort_icon",
    sScrollHead: "dataTables_scrollHead ui-state-default",
    sScrollFoot: "dataTables_scrollFoot ui-state-default",
    sFooterTH: "ui-state-default"
  });
  i.extend(m.ext.oPagination, {
    two_button: {
      fnInit: function (h, n, r) {
        var o = h.oLanguage.oPaginate,
          w = function (B) {
            h.oApi._fnPageChange(h, B.data.action) && r(h)
          };
        o = !h.bJUI ? '<a class="' + h.oClasses.sPagePrevDisabled + '" tabindex="' + h.iTabIndex + '" role="button">' + o.sPrevious + '</a><a class="' + h.oClasses.sPageNextDisabled + '" tabindex="' + h.iTabIndex + '" role="button">' + o.sNext + "</a>" : '<a class="' + h.oClasses.sPagePrevDisabled + '" tabindex="' + h.iTabIndex + '" role="button"><span class="' + h.oClasses.sPageJUIPrev + '"></span></a><a class="' + h.oClasses.sPageNextDisabled + '" tabindex="' + h.iTabIndex + '" role="button"><span class="' + h.oClasses.sPageJUINext + '"></span></a>';
        i(n).append(o);
        var x = i("a", n);
        o = x[0];
        x = x[1];
        h.oApi._fnBindAction(o, {
          action: "previous"
        }, w);
        h.oApi._fnBindAction(x, {
          action: "next"
        }, w);
        if (!h.aanFeatures.p) {
          n.id = h.sTableId + "_paginate";
          o.id = h.sTableId + "_previous";
          x.id = h.sTableId + "_next";
          o.setAttribute("aria-controls", h.sTableId);
          x.setAttribute("aria-controls", h.sTableId)
        }
      },
      fnUpdate: function (h) {
        if (h.aanFeatures.p) for (var n = h.oClasses, r = h.aanFeatures.p, o = 0, w = r.length; o < w; o++) if (r[o].childNodes.length !== 0) {
          r[o].childNodes[0].className = h._iDisplayStart === 0 ? n.sPagePrevDisabled : n.sPagePrevEnabled;
          r[o].childNodes[1].className = h.fnDisplayEnd() == h.fnRecordsDisplay() ? n.sPageNextDisabled : n.sPageNextEnabled
        }
      }
    },
    iFullNumbersShowPages: 5,
    full_numbers: {
      fnInit: function (h, n, r) {
        var o = h.oLanguage.oPaginate,
          w = h.oClasses,
          x = function (G) {
            h.oApi._fnPageChange(h, G.data.action) && r(h)
          };
        i(n).append('<a  tabindex="' + h.iTabIndex + '" class="' + w.sPageButton + " " + w.sPageFirst + '">' + o.sFirst + '</a><a  tabindex="' + h.iTabIndex + '" class="' + w.sPageButton + " " + w.sPagePrevious + '">' + o.sPrevious + '</a><span></span><a tabindex="' + h.iTabIndex + '" class="' + w.sPageButton + " " + w.sPageNext + '">' + o.sNext + '</a><a tabindex="' + h.iTabIndex + '" class="' + w.sPageButton + " " + w.sPageLast + '">' + o.sLast + "</a>");
        var B = i("a", n);
        o = B[0];
        w = B[1];
        var D = B[2];
        B = B[3];
        h.oApi._fnBindAction(o, {
          action: "first"
        }, x);
        h.oApi._fnBindAction(w, {
          action: "previous"
        }, x);
        h.oApi._fnBindAction(D, {
          action: "next"
        }, x);
        h.oApi._fnBindAction(B, {
          action: "last"
        }, x);
        if (!h.aanFeatures.p) {
          n.id = h.sTableId + "_paginate";
          o.id = h.sTableId + "_first";
          w.id = h.sTableId + "_previous";
          D.id = h.sTableId + "_next";
          B.id = h.sTableId + "_last"
        }
      },
      fnUpdate: function (h, n) {
        if (h.aanFeatures.p) {
          var r = m.ext.oPagination.iFullNumbersShowPages,
            o = Math.floor(r / 2),
            w = Math.ceil(h.fnRecordsDisplay() / h._iDisplayLength),
            x = Math.ceil(h._iDisplayStart / h._iDisplayLength) + 1,
            B = "",
            D, G = h.oClasses,
            F, R = h.aanFeatures.p,
            O = function (ia) {
              h.oApi._fnBindAction(this, {
                page: ia + D - 1
              }, function (M) {
                h.oApi._fnPageChange(h, M.data.page);
                n(h);
                M.preventDefault()
              })
            };
          if (w < r) {
            D = 1;
            o = w
          } else if (x <= o) {
            D = 1;
            o = r
          } else if (x >= w - o) {
            D = w - r + 1;
            o = w
          } else {
            D = x - Math.ceil(r / 2) + 1;
            o = D + r - 1
          }
          for (r = D; r <= o; r++) B += x !== r ? '<a tabindex="' + h.iTabIndex + '" class="' + G.sPageButton + '">' + h.fnFormatNumber(r) + "</a>" : '<a tabindex="' + h.iTabIndex + '" class="' + G.sPageButtonActive + '">' + h.fnFormatNumber(r) + "</a>";
          r = 0;
          for (o = R.length; r < o; r++) if (R[r].childNodes.length !== 0) {
            i("span:eq(0)", R[r]).html(B).children("a").each(O);
            F = R[r].getElementsByTagName("a");
            F = [F[0], F[1], F[F.length - 2], F[F.length - 1]];
            i(F).removeClass(G.sPageButton + " " + G.sPageButtonActive + " " + G.sPageButtonStaticDisabled);
            i([F[0], F[1]]).addClass(x == 1 ? G.sPageButtonStaticDisabled : G.sPageButton);
            i([F[2], F[3]]).addClass(w === 0 || x === w || h._iDisplayLength === -1 ? G.sPageButtonStaticDisabled : G.sPageButton)
          }
        }
      }
    }
  });
  i.extend(m.ext.oSort, {
    "string-pre": function (h) {
      if (typeof h != "string") h = "";
      return h.toLowerCase()
    },
    "string-asc": function (h, n) {
      return h < n ? -1 : h > n ? 1 : 0
    },
    "string-desc": function (h, n) {
      return h < n ? 1 : h > n ? -1 : 0
    },
    "html-pre": function (h) {
      return h.replace(/<.*?>/g, "").toLowerCase()
    },
    "html-asc": function (h, n) {
      return h < n ? -1 : h > n ? 1 : 0
    },
    "html-desc": function (h, n) {
      return h < n ? 1 : h > n ? -1 : 0
    },
    "date-pre": function (h) {
      h = Date.parse(h);
      if (isNaN(h) || h === "") h = Date.parse("01/01/1970 00:00:00");
      return h
    },
    "date-asc": function (h, n) {
      return h - n
    },
    "date-desc": function (h, n) {
      return n - h
    },
    "numeric-pre": function (h) {
      return h == "-" || h === "" ? 0 : h * 1
    },
    "numeric-asc": function (h, n) {
      return h - n
    },
    "numeric-desc": function (h, n) {
      return n - h
    }
  });
  i.extend(m.ext.aTypes, [function (h) {
    if (typeof h === "number") return "numeric";
    else if (typeof h !== "string") return null;
    var n, r = false;
    n = h.charAt(0);
    if ("0123456789-".indexOf(n) == -1) return null;
    for (var o = 1; o < h.length; o++) {
      n = h.charAt(o);
      if ("0123456789.".indexOf(n) == -1) return null;
      if (n == ".") {
        if (r) return null;
        r = true
      }
    }
    return "numeric"
  }, function (h) {
    var n = Date.parse(h);
    if (n !== null && !isNaN(n) || typeof h === "string" && h.length === 0) return "date";
    return null
  }, function (h) {
    if (typeof h === "string" && h.indexOf("<") != -1 && h.indexOf(">") != -1) return "html";
    return null
  }]);
  i.fn.DataTable = m;
  i.fn.dataTable = m;
  i.fn.dataTableSettings = m.settings;
  i.fn.dataTableExt = m.ext
})(jQuery, window, document, undefined);