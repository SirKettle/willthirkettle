function HomePage (sTitle)
{
	var parent = ExtendClass(this, new PageBase(sTitle)),
	    m_sRegId = null,
	    m_$Frame = parent.GetFrame();
	
	this.Show = function() {
		$.get('/assets/html/home.html', function(sHtml) {
			m_$Frame.html(sHtml);
			
			$.getJSON('/src/json/portfolio.json' + g_CacheBusting, function (aPortfolio) {
				if (_.isObject(aPortfolio)) {
					var $list = $('<ul>');

					_.each(aPortfolio, function (aProject, aKey) {
						if (_.isString(aProject.website)) {

							var $item = $('<li>').addClass('project'),
									$tags = $('<ul>').addClass('tags');

							_.each(aProject.tags, function (aTag) {
								$tags.append($('<li>').text(aTag));
							});

							// if (!DeviceManager.IsMobile()) {
							// 	$item.append(
							// 		$('<div>').addClass('webpage').append(
							// 			$('<iframe>').attr({
							// 				src      : aProject.website,
							// 				seamless : "seamless"
							// 			})
							// 		)
							// 	);
							// }

							$item.append(
								$('<div>').addClass('img').css('backgroundImage', 'url("/assets/img/projects/' + aKey + '.jpg")'),
								$('<h3>').append(
									$('<a>').attr('href', aProject.website).text(aProject.title)
								),
								$('<h4>').text(aProject.summary),
								$('<p>').text(aProject.description)
							);

							if (_.isObject(aProject.testimonial)) {
								$item.append(
									$('<blockquote>').append(
										aProject.testimonial.html,
										aProject.testimonial.author
									)
								);
							}

							$item.append($tags).appendTo($list);
						}
					});

					m_$Frame.append(
						$('<hr>'),
						$('<h2>').text('Recent projects...'),
						$list
					);

					parent.Show();
				}
				else
				{
					parent.Show();
				}

			});
		});
	};
	
	this.Hide = function (fOnHide) {
		parent.Hide(fOnHide);
		m_$Frame.empty();
	};
}

