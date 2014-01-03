
$(document).ready(function(){
  var m_$Nav = $("#navigation");
  
  function GetNavClass(sPageKey){
    return "cNav_" + String_RemoveSpaces(sPageKey);
  }
  
  m_$Nav.empty();

  _.each(PageManager.NAV, function (sPageKey) {
    $('<li>').addClass(GetNavClass(sPageKey))
      .append($('<a>').text(sPageKey).attr({ href : '/#!' + sPageKey }))
      .appendTo(m_$Nav);
  });
});