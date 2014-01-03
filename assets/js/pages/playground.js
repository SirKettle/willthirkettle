function PlaygroundPage(sTitle)
{
  var parent = ExtendClass(this, new PageBase(sTitle)),
      m_sRegId = null,
      m_$Frame = parent.GetFrame(),
      m_WeatherModule = new WeatherModule();
  
  this.Show = function(){

    $.get('/assets/html/playground.html', function(sHtml) {
      m_$Frame.html(sHtml);
      parent.Show();
      m_WeatherModule.Show(m_$Frame);
    });
  };
  
  this.Hide = function(fOnHide){
    parent.Hide(fOnHide);
    m_$Frame.empty();
  };
}