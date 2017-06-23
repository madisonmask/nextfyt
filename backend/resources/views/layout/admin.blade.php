<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Next Fit  ADMIN</title>

    <!-- Bootstrap -->
    <link href="/css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>





<!-- Fixed navbar -->
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">NextFyt</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li @if($tab=='usermanager') class="active" @endif ><a href="/adminpanel/usermanager">User Manager</a></li>
                <li  @if($tab=='defaults') class="active" @endif><a href="/adminpanel/defaults">Default Exercises</a></li>

                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Catalog <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li  @if($tab=='muscles') class="active" @endif ><a href="/adminpanel/catalog/muscles">Muscles</a></li>
                        <li  @if($tab=='equipment') class="active" @endif ><a href="/adminpanel/catalog/equipment">Equipment</a></li>
                        <li  @if($tab=='difficulties') class="active" @endif ><a href="/adminpanel/catalog/difficulty">Dificulties</a></li>
                        <li  @if($tab=='tags') class="active" @endif ><a href="/adminpanel/catalog/tags">Tags</a></li>

                     <!--   <li role="separator" class="divider"></li>
                        <li class="dropdown-header">Another menu</li>
                        <li><a href="#">Menu1</a></li>
                        <li><a href="#">One more separated link</a></li> -->
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Users content <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li  @if($tab=='exercises') class="active" @endif ><a href="/adminpanel/content/exercises">Exercises</a></li>
                        <li  @if($tab=='workouts') class="active" @endif ><a href="/adminpanel/content/workouts">Workouts</a></li>
                        <!--   <li role="separator" class="divider"></li>
                           <li class="dropdown-header">Another menu</li>
                           <li><a href="#">Menu1</a></li>
                           <li><a href="#">One more separated link</a></li> -->
                    </ul>
                </li>

            </ul>
        <!--    <ul class="nav navbar-nav navbar-right">
                <li><a href="../navbar/">Default</a></li>
                <li><a href="../navbar-static-top/">Static top</a></li>
                <li class="active"><a href="./">Fixed top <span class="sr-only">(current)</span></a></li>
            </ul> -->
        </div><!--/.nav-collapse -->
    </div>
</nav>

<div class="container">
<br>
    <br>
    <br>
    <br>


    @yield('content')

</div> <!-- /container -->





<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->

<script src="/js/bootstrap.min.js"></script>

<script src="/js/user.js"></script>

<link rel="stylesheet" type="text/css" href="/css/datatables.min.css"/>

<script type="text/javascript" src="https://cdn.datatables.net/v/bs/dt-1.10.15/datatables.min.js"></script>


</body>
</html>