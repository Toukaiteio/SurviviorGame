PAGENAME = "Before Start Page Render";
AUTHOR = "Daiyosei";
ID = "before_start_page";
require_parameters = 0;
is_forced_full_parameter = false;
para_types = [];
Render = function () {
  if (TGET("freezed_before_start_page")) {
    return TGET("freezed_before_start_page");
  }
  const page = document.createElement("div");
  page.classList.add("BeforeStartWrapper");
  page.id = "BeforeStart";
  page.style.cssText = `
        --bgcolor:transparent;
        --bdcolor:#8FEBA6;
        --selectionColor:#9FAFA1;
        --selectedBgColor:#D6FADC;
        display:flex;
        height:100vh;
        width:100vw;
    `;
  BuildStartMenu(page);
  TSTORE("freezed_before_start_page", page);
  return page;
};
