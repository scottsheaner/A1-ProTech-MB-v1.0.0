// Minimal client-side behavior for the static site.
// - Expand/collapse for tables with class `labor-times-table`
// - Marks breadcrumb anchors that match the current page

document.addEventListener('DOMContentLoaded', function () {
  function expandAll() {
    document.querySelectorAll('.labor-times-table').forEach(function (table) {
      table.querySelectorAll('tbody tr').forEach(function (row, idx) {
        // keep header (first row) visible, show others
        if (idx > 0) row.style.display = 'table-row';
      });
    });
  }

  function collapseAll() {
    document.querySelectorAll('.labor-times-table').forEach(function (table) {
      table.querySelectorAll('tbody tr').forEach(function (row, idx) {
        // keep header (first row) visible, hide others
        if (idx > 0) row.style.display = 'none';
      });
    });
  }

  var expandBtn = document.getElementById('expand-all');
  var collapseBtn = document.getElementById('collapse-all');
  if (expandBtn) expandBtn.addEventListener('click', function (e) { e.preventDefault(); expandAll(); });
  if (collapseBtn) collapseBtn.addEventListener('click', function (e) { e.preventDefault(); collapseAll(); });

  // Initialize collapsed state (hide non-header rows)
  collapseAll();

  // Breadcrumbs: add an "active" class to the breadcrumb that matches the current page
  try {
    var currentPath = window.location.pathname;
    document.querySelectorAll('.breadcrumbs a, .breadcrumbs .breadcrumb-part').forEach(function (el) {
      var href = el.getAttribute('href') || el.href;
      if (!href) return;
      // Normalize simple relative matches (href like '../' or 'index.html')
      if (href === currentPath || currentPath.endsWith(href) || href === window.location.pathname.split('/').pop()) {
        el.classList.add('active');
      }
    });
  } catch (err) {
    // no-op on pages without breadcrumbs
  }
});
