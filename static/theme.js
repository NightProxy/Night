function setTheme(theme) {
  localStorage.setItem("theme", theme);
  document.body.setAttribute("theme", theme);
};

if (localStorage.getItem("theme")) {
    document.body.setAttribute("theme", localStorage.getItem("theme"));
  } else {
    document.body.setAttribute("theme", "main");
  };
