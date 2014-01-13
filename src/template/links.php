    <link rel="shortcut icon" href="/assets/img/favicon.png">
    <link rel="apple-touch-icon" href="/assets/img/icons/57.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/assets/img/icons/72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/assets/img/icons/114.png">
    <link rel="stylesheet" type="text/css" href="/assets/css/styles.css<?php echo $cacheBusting; ?>">

    <noscript>
        <link rel="stylesheet" type="text/css" href="/assets/css/noscript.css<?php echo $cacheBusting; ?>">
    </noscript>
    <?php
      if ($googlePlusId) {
        echo "<link rel=\"author\" href=\"https://plus.google.com/$googlePlusId\">";
      }
    ?>
