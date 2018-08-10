<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>Music Player - Mobile Interface Carousel</title>
    <link rel="stylesheet" href="../public/lib/reset.min.css">
    <link rel="stylesheet" href="../public/css/style.css">
</head>
<body>
  <div class="container">
			<!-- CAROUSEL -->
			<div class="carousel">
				<!-- SLIDES -->
				<div class="slides">
					<div class="items">
					</div>
				</div>
				<div class="siblings">
					<a href="#" class="sibling prev"></a>
					<a href="#" class="play"></a>
					<a href="#" class="sibling next"></a>
				</div>
				<div class="seek-bar">
	                <div class="progress-bar"></div>
	            </div>
			</div>
			<div class="choice">
				<div class="title">
					<p>SONGS</p>
				</div>
				<div class="tracks">
				</div>
			</div>
			<audio class="music"><source src="http://mp3.9ku.com/m4a/186947.m4a" type="audio/mpeg"> Your browser doesn't support video API</audio>
	</div>
  	<script src='../public/lib/jquery.min.js'></script>
    <script  src="../public/js/index.js"></script>
</body>
</html>