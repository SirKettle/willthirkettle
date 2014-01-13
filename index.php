
<?php

$queryString = $_SERVER['QUERY_STRING'];
$metaFragment = true;

if (strpos($queryString, '_escaped_fragment_') !== false) {
  // this could cause a loop - google has already converted the hashbang at this point
  $metaFragment = false;
  // A bot is crawling the site...
  $crawlerPage = $_GET['_escaped_fragment_'];
  // home page may not have the hashbang
  if (!$crawlerPage) {
    $crawlerPage = "Home";
  }
  $pageTitle = $crawlerPage;
  $initJsFile = 'static';
  // render web page
  include $_SERVER['DOCUMENT_ROOT'] . '/src/template/header.php';
  include $_SERVER['DOCUMENT_ROOT'] . '/assets/html/' . strtolower($pageTitle) . '.html';
  include $_SERVER['DOCUMENT_ROOT'] . '/src/template/footer.php';

} else {
  // A user is viewing the site...
  $pageTitle = 'Welcome'; // hash tag if poss to change this
  $initJsFile = 'init'; // init.js will dynamically generate content
  // render web page
  include $_SERVER['DOCUMENT_ROOT'] . '/src/template/header.php';
  echo '<noscript>';
    include $_SERVER['DOCUMENT_ROOT'] . '/assets/html/home.html';
  echo '</noscript>';
  include $_SERVER['DOCUMENT_ROOT'] . '/src/template/footer.php';
}
