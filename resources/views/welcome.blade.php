<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Todo App</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])  <!-- Compiles and includes Vue app -->
</head>
<body>
    <div id="app"></div>  <!-- Vue mounts here -->
</body>
</html>