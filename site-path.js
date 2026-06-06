(function (global) {
  function getSiteBase() {
    var path = global.location.pathname || "/";
    var parts = path.split("/");
    var last = parts[parts.length - 1] || "";
    if (last && /\.html?$/i.test(last)) {
      parts.pop();
      var joined = parts.join("/");
      return (joined ? joined : "") + "/";
    }
    return path.endsWith("/") ? path : path + "/";
  }

  global.SITE_BASE = getSiteBase();
  global.REPORTS_JS_URL = global.SITE_BASE + "reports.js?v=20260309";

  global.loadReportsScript = function (callback) {
    if (global.REPORT_DB && global.normalizeReportNo) {
      callback(null);
      return;
    }

    var pending = document.querySelector('script[data-reports-loader="1"]');
    if (pending) {
      pending.addEventListener("load", function () {
        callback(global.REPORT_DB ? null : new Error("reports.js 未正确初始化"));
      });
      pending.addEventListener("error", function () {
        callback(new Error("reports.js 加载失败"));
      });
      return;
    }

    var script = document.createElement("script");
    script.src = global.REPORTS_JS_URL;
    script.setAttribute("data-reports-loader", "1");
    script.onload = function () {
      if (!global.REPORT_DB) {
        callback(new Error("reports.js 内容无效"));
        return;
      }
      callback(null);
    };
    script.onerror = function () {
      callback(new Error("reports.js 加载失败"));
    };
    document.head.appendChild(script);
  };

  global.reportsLoadErrorHtml = function () {
    return (
      '<p class="not-found">无法加载报告数据文件 <strong>reports.js</strong>。' +
      "请确认 GitHub 仓库里已上传该文件，且与 <strong>index.html</strong> 在同一目录，" +
      "然后重新发布 GitHub Pages 并强制刷新页面（Ctrl+F5）。" +
      "</p>"
    );
  };
})(window);
