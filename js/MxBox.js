/*
* ###################################################
* #                                                 #
* #    Author: Marko Maksym                         #
* M    WebSite: http://blognauki.in.ua/my-works/    M
* #    Project name: MX-BOX                         #
* #    E-mail: markomaksym@gmail.com                #
* X    Date of creation: 15.10.2016                 X
* #    Last Modified:                               #
* #                                                 #
* ###################################################
*/

;( function( $ ){

	$.defaultSett = {
		'gallery': true,
		'descImg': true
	};

	$.fn.MxBox = function( params ){
		var settings = $.extend( {}, $.defaultSett, params );
		BoxPerform( this, settings );
	};

	function BoxPerform( root, settings ){

		/* ---------------------------------------------
		*             Create wrapper box
		----------------------------------------------*/

		var
			createWrap = {

				getClass: function(){
					rootClass = root.attr( 'class' );
					return rootClass;
				},
				
				createBox: function(){
					$( '<div class="MxBox"></div>' ).appendTo( 'body' );
					$( '<div class="MxBoxWindow"></div>' ).appendTo( '.MxBox' );
					$( '<img src="" class="MxImg">' ).appendTo( '.MxBoxWindow' );
					$( '<div class="MxBoxClose"></div>' ).appendTo( '.MxBox' );

					if( settings.gallery == true ){
						$( '<div class="MxBoxNext"></div>' ).appendTo( '.MxBox' );
						$( '<div class="MxBoxPrev"></div>' ).appendTo( '.MxBox' );
						$( '<div class="MxBoxArrow"></div>' ).appendTo( '.MxBoxNext' );
						$( '<div class="MxBoxArrow"></div>' ).appendTo( '.MxBoxPrev' );
					}

					if( settings.descImg == true ){
						$( '<div class="descImg"></div>' ).appendTo( '.MxBoxWindow' );
					}				
				},

				countImage: function(){
					countImg = $( '.' + rootClass + ' img' ).length;
				},

				cursorPoint: function(){
					$( '.' + rootClass + ' img' ).css( 'cursor', 'pointer' );
				},

				/* Initialised */
				init: function(){
					// Create wrap
					this.createBox();
					// Get Class wrapper
					this.getClass();
					// Cursor pointer for images
					this.cursorPoint();
				}
			};

			createWrap.init();

			/* ---------------------------------------------
			*                  functions
			----------------------------------------------*/

			/* open */
			function OpenImg( _this ){

				$( '.MxBox' ).css( 'display', 'block' );

				srcImg = _this.attr( 'src' );
				$( '.MxImg' ).attr( 'src', srcImg );

				DescriptionImg( _this );

				ScreenWidth = $( window ).width();
				ScreenHeight = $( window ).height();
				ImgWidth = _this.width();
				ImgHeight = _this.height();
				
				var thisImg = new Image();
				thisImg.src = srcImg;

				ImgNativWidth = thisImg.width;
				ImgNativHeight = thisImg.height;

				subtracting = ImgWidth - ImgHeight;

				BoxWidth = '';
				BoxHeight = '';
				BoxMarginTop = '';
				BoxMarginLeft = '';
				
				if( subtracting < 0 ){ //vertical

					if( ImgNativHeight < ScreenHeight ){

						BoxMarginTop = ImgNativHeight / 2;
						BoxMarginTop = '-' + BoxMarginTop + 'px';
						BoxMarginLeft = ImgNativWidth / 2;
						BoxMarginLeft = '-' + BoxMarginLeft + 'px';
						BoxWidth = ImgNativWidth + 'px';
						BoxHeight = ImgNativHeight + 'px';

					} else{

						subScreenHeight = parseInt( ScreenHeight * 90 / 100 );

						subHeight = ImgNativHeight - subScreenHeight;
						percentExcess = parseInt( subHeight * 100 / ImgNativHeight );

						newHeightBox = parseInt( ImgNativHeight * percentExcess / 100 );
						newHeightBox = ImgNativHeight - newHeightBox;

						newWidthBox = parseInt( ImgNativWidth * percentExcess / 100 );
						newWidthBox = ImgNativWidth - newWidthBox;

						BoxWidth = newWidthBox;
						BoxHeight = newHeightBox;
						BoxMarginTop = newHeightBox / 2;
						BoxMarginTop = '-' + BoxMarginTop + 'px';
						BoxMarginLeft = newWidthBox / 2;
						BoxMarginLeft = '-' + BoxMarginLeft + 'px';

					}

					// for small screen
					setTimeout( function(){

						var corectWidthImg = $( '.MxBoxWindow' ).width();

						if( corectWidthImg > ScreenWidth ){

							subScreenWidth = parseInt( ScreenWidth * 80 / 100 );

							subWidth = ImgNativWidth - subScreenWidth;

							percentExcess = parseInt( subWidth * 100 / ImgNativWidth );
							
							newWidthBox = parseInt( ImgNativWidth * percentExcess / 100 );
							newWidthBox = ImgNativWidth - newWidthBox;

							newHeightBox = parseInt( ImgNativHeight * percentExcess / 100 );
							newHeightBox = ImgNativHeight - newHeightBox;

							BoxWidth = newWidthBox;
							BoxHeight = 'auto';
							BoxMarginTop = newHeightBox / 2;
							BoxMarginTop = '-' + BoxMarginTop + 'px';
							BoxMarginLeft = newWidthBox / 2;
							BoxMarginLeft = '-' + BoxMarginLeft + 'px';


							$( '.MxBoxWindow' ).css( {
								'width': BoxWidth,
								'height': BoxHeight,
								'top':'50%',
								'margin-top': BoxMarginTop,
								'left': '50%',
								'margin-left': BoxMarginLeft
							} );

						}

					},200 );

				} else{ //horizontal

					if( ImgNativWidth < ScreenWidth ){

						if( ImgNativHeight < ScreenHeight ){

							BoxWidth = ImgNativWidth + 'px';
							BoxHeight = 'auto';
							BoxMarginTop = ImgNativHeight / 2;
							BoxMarginTop = '-' + BoxMarginTop + 'px';
							BoxMarginLeft = ImgNativWidth / 2;
							BoxMarginLeft = '-' + BoxMarginLeft + 'px';

						} else{

							subScreenHeight = parseInt( ScreenHeight * 90 / 100 );

							subHeight = ImgNativHeight - subScreenHeight;
							percentExcess = parseInt( subHeight * 100 / ImgNativHeight );

							newHeightBox = parseInt( ImgNativHeight * percentExcess / 100 );
							newHeightBox = ImgNativHeight - newHeightBox;

							newWidthBox = parseInt( ImgNativWidth * percentExcess / 100 );
							newWidthBox = ImgNativWidth - newWidthBox;

							BoxWidth = newWidthBox;
							BoxHeight = newHeightBox;
							BoxMarginTop = newHeightBox / 2;
							BoxMarginTop = '-' + BoxMarginTop + 'px';
							BoxMarginLeft = newWidthBox / 2;
							BoxMarginLeft = '-' + BoxMarginLeft + 'px';

						}

					} else{

						subScreenWidth = parseInt( ScreenWidth * 80 / 100 );

						subWidth = ImgNativWidth - subScreenWidth;

						percentExcess = parseInt( subWidth * 100 / ImgNativWidth );
						
						newWidthBox = parseInt( ImgNativWidth * percentExcess / 100 );
						newWidthBox = ImgNativWidth - newWidthBox;

						newHeightBox = parseInt( ImgNativHeight * percentExcess / 100 );
						newHeightBox = ImgNativHeight - newHeightBox;

						BoxWidth = newWidthBox;
						BoxHeight = 'auto';
						BoxMarginTop = newHeightBox / 2;
						BoxMarginTop = '-' + BoxMarginTop + 'px';
						BoxMarginLeft = newWidthBox / 2;
						BoxMarginLeft = '-' + BoxMarginLeft + 'px';

					}
				}

				$( '.MxBoxWindow' ).css( {
					'width': BoxWidth,
					'height': BoxHeight,
					'top':'50%',
					'margin-top': BoxMarginTop,
					'left': '50%',
					'margin-left': BoxMarginLeft
				} );

				// for small screen
				var corectHeightImg = $( '.MxBoxWindow' ).height();
							
				if( corectHeightImg > ScreenHeight ){
					
					subScreenHeight = parseInt( ScreenHeight * 90 / 100 );

					subHeight = ImgNativHeight - subScreenHeight;
					percentExcess = parseInt( subHeight * 100 / ImgNativHeight );

					newHeightBox = parseInt( ImgNativHeight * percentExcess / 100 );
					newHeightBox = ImgNativHeight - newHeightBox;

					newWidthBox = parseInt( ImgNativWidth * percentExcess / 100 );
					newWidthBox = ImgNativWidth - newWidthBox;

					BoxWidth = newWidthBox;
					BoxHeight = newHeightBox;
					BoxMarginTop = newHeightBox / 2;
					BoxMarginTop = '-' + BoxMarginTop + 'px';
					BoxMarginLeft = newWidthBox / 2;
					BoxMarginLeft = '-' + BoxMarginLeft + 'px';

					$( '.MxBoxWindow' ).css( {
						'width': BoxWidth,
						'height': BoxHeight,
						'top':'50%',
						'margin-top': BoxMarginTop,
						'left': '50%',
						'margin-left': BoxMarginLeft
					} );

				}

			}

			/* close */
			function CloseImg(){

				$( '.MxBox' ).css( 'display', 'none' );
				$( '.MxImg' ).attr( 'src', '' );
				$( '.MxBoxWindow' ).attr( 'style', '' );

			}

			/* next */
			function NextImg(){

				_thisImg = $( '.MxImg' ).attr( 'src' );
				$( '.' + rootClass + ' img' ).each( function(){
					if( $( this ).attr( 'src' ) == _thisImg ){

						indexImg = $( this ).index() + 1;

						if( indexImg >= countImg ){
							indexImg = 0
						}
						CloseImg();
						OpenImg( $( '.' + rootClass + ' img' ).eq( indexImg ) );
					}
				} );

			}

			/* prev */
			function PrevImg(){

				_thisImg = $( '.MxImg' ).attr( 'src' );
				$( '.' + rootClass + ' img' ).each( function(){
					if( $( this ).attr( 'src' ) == _thisImg ){

						indexImg = $( this ).index() - 1;

						if( indexImg < 0 ){
							indexImg = countImg - 1;
						}
						CloseImg();
						OpenImg( $( '.' + rootClass + ' img' ).eq( indexImg ) );
					}
				} );

			}

			/* display description */
			function DescriptionImg( _this ){

				var descImage = _this.attr( 'title' );
				if( typeof descImage === 'undefined'){
					$( '.descImg' ).css( 'display', 'none' );
				} else{
					$( '.descImg' ).css( 'display', 'block' );
					$( '.descImg' ).text( descImage );
				}

			}

			/* ---------------------------------------------
			*                  Events
			----------------------------------------------*/
			var
			keyTarget = false,
			countImg = $( '.' + rootClass + ' img' ).length,
			boxEvents = {
				
				openBox: function(){
					$( '.' + rootClass + ' img' ).on( 'click', function(){
						OpenImg( $( this ) );
						DescriptionImg( $( this ) );

						setTimeout( function(){
							keyTarget = true;
						},500 );

						if( countImg <= 1 ){
							$( '.MxBoxPrev' ).css( 'display', 'none' );
							$( '.MxBoxNext' ).css( 'display', 'none' );
						}					
					});					
				},

				closeBox: function(){
					$( document ).on( 'click', function( e ){
						if ( keyTarget == true ){
							if( !$( '.MxImg' ).is( e.target ) &&
							$( '.MxImg' ).has( e.target ).length === 0 &&

							!$( '.MxBoxPrev' ).is( e.target ) &&
							$( '.MxBoxPrev' ).has( e.target ).length === 0 &&

							!$( '.MxBoxNext' ).is( e.target ) &&
							$( '.MxBoxNext' ).has( e.target ).length === 0
							){
								CloseImg();
								keyTarget = false;
							}
						}
					} );
				},

				nextImg: function(){
					var marRight = $( '.MxBoxNext .MxBoxArrow' ).css( 'margin-right' );
					$( '.MxBoxNext' ).hover( function(){
						$( '.MxBoxNext .MxBoxArrow' ).animate( { 'margin-right': '30px' },300 );
					}, function(){
						$( '.MxBoxNext .MxBoxArrow' ).animate( { 'margin-right': marRight },300 );
					} );	
					$( '.MxBoxNext' ).on( 'click', function(){
						NextImg();
					} );
				},

				prevImg: function(){
					var marLeft = $( '.MxBoxNext .MxBoxArrow' ).css( 'margin-right' );
					$( '.MxBoxPrev' ).hover( function(){
						$( '.MxBoxPrev .MxBoxArrow' ).animate( { 'margin-left': '30px' },300 );
					}, function(){
						$( '.MxBoxPrev .MxBoxArrow' ).animate( { 'margin-left': marLeft },300 );
					} );	
					$( '.MxBoxPrev' ).on( 'click', function(){
						PrevImg();
					} );
				},

				// Controller
				contr: function(){
					// Open
					this.openBox();
					// Close
					this.closeBox();
					// Next img
					this.nextImg();
					// Prev img
					this.prevImg();
				}
						
			}

			boxEvents.contr();
	}

} )( jQuery );