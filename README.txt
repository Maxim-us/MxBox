MX-BOX – popup на jQuery для открытия изображений.

ОПИСАНИЕ:
Плагин подключается к блоку с изображениями. Все дочерние изображения будут открываться скриптом.

СВОЙСТВА:
- легкий;
- адаптивный;
- простые настройки.

ПОДКЛЮЧЕНИЕ:
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>MxBox</title>
	<link rel="stylesheet" href="css/MxBox.css">
</head>
<body>

	<div class="mx-content">
		<img src="img/img1.jpg" alt="" title="Lorem ipsum dolor sit amet">
		<img src="img/img2.jpg" alt="">
		<img src="img/img3.jpg" alt="" title="Odit nihil iure error">
		<img src="img/img4.jpg" alt="" title="Repellat dolorum eius corrupti totam iste eum">
		<img src="img/img5.jpg" alt="" style="width: 200px" title="Reiciendis laborum repellendus saepe">
		<img src="img/img6.jpg" alt="" title="Magnam distinctio cum ullam incidunt delectus dicta">
	</div>
	
	<script src="js/jquery-1.11.3.js"></script>
	<script src="js/MxBox.js"></script>
	<script>
		$( document ).ready( function(){
			$( '.mx-content' ).MxBox();
		} );
	</script>
</body>
</html>

НАСТРОЙКА:
<script>
	$( document ).ready( function(){
			$( '.mx-content' ).MxBox( {
				'gallery': false, // отключить возможность проматывать изображения
				'descImg': false // отключить описание изображений
			} );
		} );
</script>