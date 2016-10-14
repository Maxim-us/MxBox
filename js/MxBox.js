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
					$( '<div class="MxBoxNext"></div>' ).appendTo( '.MxBox' );
					$( '<div class="MxBoxPrev"></div>' ).appendTo( '.MxBox' );
				},

				/* Initialised */
				init: function(){
					// Create wrap
					this.createBox();
					// Get Class wrapper
					this.getClass();
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
						percentExcess = parseInt( subHeight * 100 / ImgNativHeight ); //

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
							percentExcess = parseInt( subHeight * 100 / ImgNativHeight ); //

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

						if( ImgNativHeight < ScreenHeight ){

							subScreenWidth = parseInt( ScreenWidth * 65 / 100 );

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
						
						} else{

							subScreenWidth = parseInt( ScreenWidth * 65 / 100 );

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
				}

				$( '.MxBoxWindow' ).css( {
					'width': BoxWidth,
					'height': BoxHeight,
					'top':'50%',
					'margin-top': BoxMarginTop,
					'left': '50%',
					'margin-left': BoxMarginLeft
				} );

			}

			/* close */
			function CloseImg(){
				$( '.MxBox' ).css( 'display', 'none' );
				$( '.MxImg' ).attr( 'src', '' );
				$( '.MxBoxWindow' ).attr( 'style', '' );
			}


			/* ---------------------------------------------
			*                  Events
			----------------------------------------------*/
			var keyTarget = false;
			var	BoxEvents = {
				
				openBox: function(){					
					$( '.' + rootClass + ' img' ).on( 'click', function(){
						OpenImg( $( this ) );
						setTimeout( function(){
							keyTarget = true;
						},500 );
						
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

				// 
				contr: function(){
					// Open
					this.openBox();
					// Close
					this.closeBox();
				}
						
			}

			BoxEvents.contr();

	}

} )( jQuery );