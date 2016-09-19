// jshint unused:false
// jshint undef:false
;(function () {

	'use strict';

	var config = {
		debug: false,
		istouch:false,
		touchOrClick: ''
	};
	// this is a safe way to console.log that wont break IE
	var  log= {
		debug: function(content){
			if ((window.console && window.console.log) && config.debug){
				console.log(content);
			}
		}
	};

	var app = {	init: function() {
			var _this = this;
			var $htmlElem=$('html');
		/*must be using modernizr*/
			config.istouch = $htmlElem.hasClass('touch')? true : false;
			config.touchOrClick = config.istouch? 'touchend' :'click';
			this.eventListeners();
		},

		eventListeners: function () {
			var _that = this;

			$('body').on(config.touchOrClick,'.modal .btn',function() {
				_that.modal(this);
			});
			$('body').on(config.touchOrClick,'[data-id]',function() {
				//show the Loading screen
				var id = this;
				$('.loading').show();
				$('.modal-page').delay(200).fadeIn('fast', function() {
					_that.parseJson($(id).data('id'));
				});

			});
		},
		modal: function(modalBtn){
			$(modalBtn).parent().parent().addClass('hidden').fadeToggle(500);
		},
		parseJson: function(key){
			var _that = this;
			//get data and cache
			//Show Loading screen
				//Check that the key is not null undefined or empty

				if(key.length > 0){
					//clear the related images
					$('.modal-images').html('');

					$.each(json[key], function(key,value) {

						if(key==='related'){
							//loop thru the obj
						$.each(value, function(key,value) {

							_that.addRelated(value.image,value.id);
						});
						}else{

							switch(key){
								case 'title':
									_that.addTitle(value);
								break;
								case 'mainText':
									_that.addMainText(value);
								break;
								case 'subText':
									_that.addsubText(value);
								break;
								case 'name':
									_that.addName(value);
								break;
								case 'position':
									_that.addPosition(value);
								break;
								case 'company':
									_that.addCompany(value);
								break;
								case 'modalimage':
									_that.addModalImage(value);
								break;
							}

						}
					});
					//remove the spinner
					$('.loading').delay(200).fadeOut(600);
			}
		},
		addTitle: function(title){
			$('.title').html(title);
		},
		addMainText: function(mainText){
				$('.text').html(mainText);
		},
		addsubText: function(subText){
			$('.sub-text').html(subText);
		},
		addName: function(name){
			$('.name').html(name);
		},
		addPosition: function(position){
			$('.position').html(position);
		},
		addCompany: function(company){
			$('.company').html(company);
		},
		addRelated: function(image,id){
			//clear the images

			$('.modal-images').prepend($('<img>',{'data-id':id , src:image}));

		},
		addModalImage: function(modalimage){
			$('.modal-Image').attr("src", modalimage);
		},

	};

	app.init();
	//app.parseJson('modalInfo2');
})();


