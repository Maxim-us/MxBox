;( function( $ ){

	$.default = {

	};

	$.fn.MxBox = function( params ){
		var settings = $.extend( {}, $.default, params );
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
				},

				/* Initialised */
				init: function(){
					// Create wrap
					this.createBox();

					this.getClass();
				}
			};

			createWrap.init();




			/* functions */
			var	BoxEvents = {

				/* Events */
				eventsBox: function(){
					// Open
					$( '.' + rootClass + ' img' ).on( 'click', function(){	

						$( '.MxBox' ).css( 'display', 'block' );

						srcImg = $( this ).attr( 'src' );
						$( '.MxImg' ).attr( 'src', srcImg );

						ScreenWidth = $( window ).width();
						ScreenHeight = $( window ).height();
						ImgWidth = $( this ).width();
						ImgHeight = $( this ).height();
						
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
								percentExcess = parseInt( subHeight * 100 / ImgNativHeight ); //

								newHeightBox = parseInt( ImgNativHeight * percentExcess / 100 );
								newHeightBox = ImgNativHeight - newHeightBox;

								newWidthBox = parseInt( ImgNativWidth * percentExcess / 100 );
								newWidthBox = ImgNativWidth - newWidthBox;

								console.log( newWidthBox );

								



							}
							

						} else{ //horizontal
							if( ImgNativWidth < ScreenWidth ){
								BoxWidth = ImgNativWidth + 'px';
								BoxHeight = 'auto';
								BoxMarginTop = ImgNativHeight / 2;
								BoxMarginTop = '-' + BoxMarginTop + 'px';
								BoxMarginLeft = ImgNativWidth / 2;
								BoxMarginLeft = '-' + BoxMarginLeft + 'px';								
							} else{								
								
								subScreenWidth = parseInt( ScreenWidth * 70 / 100 );

								subWidth = ImgNativWidth - subScreenWidth; //sub px

								percentExcess = parseInt( subWidth * 100 / ImgNativWidth ); // This percent take with side img
								
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

					} );

					// Close
					$( '.MxBoxClose' ).on( 'click', function(){
						$( '.MxBox' ).css( 'display', 'none' );
						$( '.MxImg' ).attr( 'src', '' );
					} );
				},



				//
				contr: function(){
					this.eventsBox();
				}
						
			}

			BoxEvents.contr();

	}

} )( jQuery );