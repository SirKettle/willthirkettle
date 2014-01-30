<?php

// get pages data
include $_SERVER['DOCUMENT_ROOT'] . '/src/config/pages.php';

$googleAnalyticsCode = "UA-40085503-1";

// Site wide vars
$urlLive = "http://willthirkettle.co.uk";
$siteTitle = "Will Thirkettle";
$strap = "Front end developer";
$location = "London";
$defaultDesc = "I am a Front End Developer (aka UI Developer and JavaScript Developer) based in North London. Expert in client-side development - JavaScript, CSS and HTML";
$description = $defaultDesc;
$keywords = "Front End Developer, UI Developer, JavaScript Developer, HTML5, CSS3, AngularJS, backbone, requirejs, London";
$author = "Will Thirkettle - a Front End Developer (aka UI Developer and JavaScript Developer) based in North London.";

// cache busting
$version = "2.3.5";
$cacheBusting = "?v=$version";

// Social vars
$twitterUser = "thirkettle";                            // twitter account id
$facebookId = "willthirkettle";                         // facebook id
$googlePlusId = "+WillThirkettle";                      // google plus id
$linkedInId = "thirkettle";                             // linkedIn profile

$displayPageTitle = $pageTitle;

// lets get info from the page vars
if (array_key_exists($pageTitle, $Pages)) {

  if (array_key_exists("decription", $Pages[$pageTitle])) {
    $description = $Pages[$pageTitle]["decription"];
  }

  if (array_key_exists("keywords", $Pages[$pageTitle])) {
    $keywords = $Pages[$pageTitle]["keywords"];
  }

  $displayPageTitle = $Pages[$pageTitle]["title"];
}

// this builds the meta tags
$meta = array(
  "name" => array(
    // standard meta
    "title"                    => "$pageTitle | $siteTitle | $strap | $location",
    "keywords"                 => $keywords,
    "description"              => $description,
    // google can use this as a description on searches
    "author"                   => $author,
    // for webmaster tools
    "Copyright"                => $siteTitle,
    // only if mobile version of site
    "viewport"                 => "width=device-width, initial-scale=1, maximum-scale=1",
    // windows 8
    "application-name"         => "$siteTitle | $strap | $location",
    "msapplication-TileColor"  => "#1DD2FF",
    "msapplication-TileImage"  => "assets/img/icons/144.png",
    // twitter
    "twitter:card"             => "summary",
    "twitter:site"             => $twitterUser,
    "twitter:title"            => "$siteTitle | $strap",
    "twitter:description"      => $defaultDesc,
    "twitter:url"              => $urlLive
  ),
  "property" => array(
    // Facebook
    "og:title"                 => "$pageTitle | $siteTitle | $strap | $location",
    "og:description"           => $description,
    "og:type"                  => "website",
    "og:url"                   => $urlLive,
    "og:site_name"             => $siteTitle,
  )
);

// other configurations
$mobileDimension = 600; // this needs to match the sass cutoff variable
