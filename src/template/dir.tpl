<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>{{title}}</title>
	<style>
		a {
			display: block;
			font-size: 30px;
			margin: 10px ;
		}
	</style>
</head>
<body>
	{{#each files}}
		<a href="{{../dir}}/{{this.file}}">
			{{this.file}}
		</a>
	{{/each}}

</body>
</html>
