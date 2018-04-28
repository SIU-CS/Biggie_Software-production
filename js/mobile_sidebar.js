function openMenu()
{
  if(document.getElementById('sidebarMenu').className === "sidebar"){
    document.getElementById('sidebarMenu').setAttribute("class", "sidebarOpen");
    document.getElementById('sidebar').setAttribute("class", "sidebarOpen");
    document.getElementById('textcenter').setAttribute("class", "text-center-open");
  }
  else {
    document.getElementById('sidebarMenu').setAttribute("class", "sidebar");
    document.getElementById('sidebar').setAttribute("class", "sidebar");
    document.getElementById('textcenter').setAttribute("class", "text-center");
  }
}
