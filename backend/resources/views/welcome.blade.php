<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content=" ">
    <meta name="keywords" content="NextFyt">
    <title>NextFyt</title>

    <!-- CSS -->
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/style.css">

    <!-- CSS -->
</head>
<body>


<div class="wrapper">
    <div class="header">
        <a href="" class="logo">
            <img src="img/logo.png" alt="">
        </a>
    </div>
    <div class="content">
        <div class="left">
            <div class="h5">Next Fyt App</div>
            <div class="h2">THERE IS NO "I" IN FYT<br></div>

            <p>An app dedicated to making fitness a community effort</p>
            @if($new)
            <form action="subscribe" method="POST">
                <div class="input">
                    <input type="text" placeholder="Type your Email" name="email">
                </div>
                <div class="button">
                    <button type="submit">
                        <span>Try Beta Now</span>
                        <img src="img/arrow.svg" alt="">
                    </button>
                </div>
            </form>
                @else
                <div class="input">
                    <input type="text" placeholder="Type your Email" name="email" value="thank you" disabled>
                </div>
            @endif
        </div>
        <div class="right">
            <img src="img/iphone.png" alt="">
        </div>
    </div>
    <a href="https://www.instagram.com/nextfyt/" class="instagram" target="_blank">
        <img src="img/instagram.svg" alt="">
        <span>Chek our Instagram</span>
    </a>
</div>



<!-- endbuild -->
</body>
</html>