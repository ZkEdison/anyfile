<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>{{title}}</title>
	<style>
		svg {
			width: 20px !important;
			height:20px !important;
		}
		a {
			display: inline-block;
			margin: 10px 30px;
			width: 150px;
			white-space: nowrap;
		}
	</style>
</head>
<body>
	{{#each files}}
		<a href="{{this.filePath}}">
			<image src="{{this.iconPath}}" style="display:inline-block;width:30px;height:30px;  vertical-align: top;" />
			{{this.file}}
		</a>
	{{/each}}

</body>
</html>
