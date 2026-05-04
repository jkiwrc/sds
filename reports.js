(function (global) {
  var REPORT_DB = {
    "2026-0810038118": {
      company: "四川南方开创实业有限公司",
      product: "对开多叶调节阀",
      date: "2026年3月28日",
      model: "500×400（mm）",
    },
    "2026-0810038146": {
      company: "四川南方开创实业有限公司",
      product: "止回阀",
      date: "2026年3月28日",
      model: "500×400（mm）",
    },
    "2026-0810038201": {
      company: "重庆某机电设备有限公司",
      product: "防火阀",
      date: "2026年3月15日",
      model: "800×600（mm）",
    },
    "2026-0810038255": {
      company: "成都锦城通风制造有限公司",
      product: "排烟防火阀",
      date: "2026年3月20日",
      model: "φ400（mm）",
    },
    "2026-0810064149": {
      company: "四川南方开创实业有限公司",
      product: "消声器",
      date: "2026年3月28日",
      model: "500mmx300mmL=1000mm",
    },
  };

  function normalizeReportNo(s) {
    s = String(s || "")
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .trim();
    if (typeof s.normalize === "function") {
      try {
        s = s.normalize("NFKC");
      } catch (e) {
        /* ignore */
      }
    }
    return s.replace(/\s+/g, "").trim();
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderReportTable(no, row) {
    function rowHtml(label, value) {
      return (
        "<tr><th scope=\"row\">" +
        escapeHtml(label) +
        "</th><td>" +
        escapeHtml(value) +
        "</td></tr>"
      );
    }
    return (
      '<div class="report-table-outer"><table class="report-table"><tbody>' +
      rowHtml("报告编号", no) +
      rowHtml("公司名称", row.company) +
      rowHtml("产品名称", row.product) +
      rowHtml("签发日期", row.date) +
      rowHtml("产品型号", row.model) +
      "</tbody></table></div>"
    );
  }

  global.REPORT_DB = REPORT_DB;
  global.normalizeReportNo = normalizeReportNo;
  global.renderReportTable = renderReportTable;
  global.escapeHtmlReport = escapeHtml;
})(window);
