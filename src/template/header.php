<?php include $_SERVER['DOCUMENT_ROOT'] . '/src/config/vars.php'; ?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><?php echo "$displayPageTitle | $siteTitle | $strap"; ?></title>
    <!--[if lt IE 9]><script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
    <!-- key meta -->
    <?php
      // meta tags built from vars
      foreach ($meta as $key => $value) {
        foreach ($value as $attribute => $content) {
          echo "<meta $key=\"$attribute\" content=\"$content\">\n";
        }
      }
      if ($metaFragment) {
        // for bots to crawl the home page
        echo "<meta name=\"fragment\" content=\"!\">\n";
      }
      // links
      include $_SERVER['DOCUMENT_ROOT'] . '/src/template/links.php';
    ?>
  </head>

  <?php
    if ($initJsFile == 'static') {
      echo "<body>\n";
    } else {
      echo "<body class=\"cNotReady\">\n";
    }
  ?>

    <div class="cBody">
      <nav>
        <div>
          <button>X</button>
          <ul id="navigation">
            <?php
              foreach ($Pages as $title => $page) {
                if ($page["nav"]) {
                  $className = "";
                  $path = "/static" . $page["path"];

                  if ($title === $displayPageTitle) {
                    $className = "on";
                  }
                  echo "\t<li class=\"$className\"><a href=\"$path\">$title</a></li>\n";
                }
              }
            ?>
          </ul>
        </div>
      </nav>
      <div class="cPage">
        <header>
          <ul class="socialLinks">
            <li class="linkedIn"><a href="https://uk.linkedin.com/in/<?php echo $linkedInId; ?>/"><div></div><span>LinkedIn</span></a></li>
            <li class="googlePlus"><a href="https://plus.google.com/<?php echo $googlePlusId; ?>" rel="publisher"><div></div><span>Google+</span></a></li>
            <li class="facebook"><a href="https://facebook.com/<?php echo $facebookId; ?>"><div></div><span>Facebook</span></a></li>
            <li class="twitter"><a href="https://twitter.com/<?php echo $twitterUser; ?>"><div></div><span>Twitter</span></a></li>
          </ul>
          <h1><?php echo $siteTitle; ?></h1>
          <h2><?php echo $strap; ?></h2>
          <button>Menu</button>
        </header>
        <div id="content" class="cContent cPage_<?php echo $displayPageTitle; ?>">
          <noscript>
            <p>For a better experience, please enable JavaScript in your browser. Click on the links above to navigate my site...</p>
          </noscript>