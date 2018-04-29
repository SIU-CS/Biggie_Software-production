function openMenu()
{
  if(document.getElementById('sidebarMenu').className === "sidebar"){
    document.getElementById('sidebarMenu').setAttribute("class", "sidebarOpen");
    document.getElementById('sidebar').setAttribute("class", "sidebarOpen");
    document.getElementById('textcenter').setAttribute("class", "text-center-open");

    var textcenter = document.getElementById("textcenter");
    var sidebar = document.getElementById("sidebar");
    var pos = 0;
    var id = setInterval(frame, 1);
    function frame() {
      if (pos == 160) {
        clearInterval(id);
      } else {
        pos = pos + 5;
        textcenter.style.marginLeft = pos + 'px';
        sidebar.style.width = pos + 'px';
      }
    }
  }
  else {
    var textcenter = document.getElementById("textcenter");
    var sidebar = document.getElementById("sidebar");
    var pos = 160;
    var id = setInterval(frame, 1);
    function frame() {
      if (pos == 0) {
        document.getElementById('sidebarMenu').setAttribute("class", "sidebar");
        document.getElementById('sidebar').setAttribute("class", "sidebar");
        document.getElementById('textcenter').setAttribute("class", "text-center");
        clearInterval(id);
      } else {
        pos = pos - 5;
        textcenter.style.marginLeft = pos + 'px';
        sidebar.style.width = pos + 'px';
      }
    }
  }
}
