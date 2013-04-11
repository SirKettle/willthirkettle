function HomePage(sTitle)
{
	var parent = ExtendClass(this, new PageBase(sTitle));
	var m_sRegId = null;
	
	this.Show = function(){
		
		parent.Frame.empty();
		
		$.getJSON("/assets/data/gallery_portfolio.json", function(cGalleries){
			if (typeof cGalleries["Portfolio"] != "undefined")
			{
				var cSwiperView = null;
				var fLoadGallery = function(cGallery){

					if (cSwiperView === null)
					{
						//cSwiperView.Hide();
						cSwiperView = new SwiperView({
							ImagePath: cGallery.ImagePath,
							ThumbPath: cGallery.ThumbPath
						});
					}

					cSwiperView = new SwiperView({
						ImagePath: cGallery.ImagePath,
						ThumbPath: cGallery.ThumbPath
					});

					cSwiperView.Show(parent.Frame, cGallery.FileNames, function(){
						parent.Show(function(){
							cSwiperView.SwipeInit();
						});
					});
				};
			
				fLoadGallery(cGalleries["Portfolio"]);
			}
			else
			{
				parent.Frame.append(
					"<p>Ooops - Gallery data was not found...</p>",
					$("<a>").attr("href", "").text("Take me to the homepage").click(function(e){
						e.preventDefault();
						PageManager.ShowPage({PageKey: "Home"});
						return false;
					})
				);
				
				parent.Show();
			}
		});
		
		
	};
	
	this.Hide = function(fOnHide){
//		EventDispatcher.UnbindEvents(m_sRegId);
		parent.Hide(fOnHide);
		parent.Frame.empty();
	};
}


