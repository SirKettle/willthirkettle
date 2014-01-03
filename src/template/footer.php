
        </div>
        <footer>
          <?php include $_SERVER['DOCUMENT_ROOT'] . '/assets/html/contact.html'; ?>
          <p><small>Website (<?php echo $version; ?>) designed and developed by me &copy; <span id="year"></span></small></p>
        </footer>
      </div>
    </div>
    <script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/1.3.1/lodash.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
    <script src="/assets/js/thirdparty/swiper/swiper.js"></script>
    <script src="/assets/js/thirdparty/swiper/swiper.scrollbar.js"></script>
    <script src="/assets/js/base/base.js<?php echo $cacheBusting; ?>"></script>
    <script src="/assets/js/base/clientstorage.js<?php echo $cacheBusting; ?>"></script>
    <script src="/assets/js/base/logging.js<?php echo $cacheBusting; ?>"></script>
    <script src="/assets/js/base/class.js<?php echo $cacheBusting; ?>"></script>
    <script src="/assets/js/base/eventdispatcher.js<?php echo $cacheBusting; ?>"></script>
    <script>
      <?php echo "g_GoogleAnalyticsCode = '$googleAnalyticsCode';"; ?>
    </script>
    <script src="/assets/js/base/googleanalyticshandler.js<?php echo $cacheBusting; ?>"></script>
    <script src="/assets/js/views/viewbase.js<?php echo $cacheBusting; ?>"></script>
    <script src="/assets/js/views/ui/blogposts.js<?php echo $cacheBusting; ?>"></script>
    <script src="/assets/js/views/ui/swiperview.js<?php echo $cacheBusting; ?>"></script>
    <script src="/assets/js/views/ui/weather.js<?php echo $cacheBusting; ?>"></script>
    <script src="/assets/js/pages/pagebase.js<?php echo $cacheBusting; ?>"></script>
    <script src="/assets/js/pages/home.js<?php echo $cacheBusting; ?>"></script>
    <script src="/assets/js/pages/playground.js<?php echo $cacheBusting; ?>"></script>
    <script src="/assets/js/pages/about.js<?php echo $cacheBusting; ?>"></script>
    <script src="/assets/js/pages/contact.js<?php echo $cacheBusting; ?>"></script>
    <script src="/assets/js/pagemanager.js<?php echo $cacheBusting; ?>"></script>
    <script src="/assets/js/devicemanager.js<?php echo $cacheBusting; ?>"></script>
    <script>
      DeviceManager.MobileDimension = <?php echo $mobileDimension; ?>;
      PageManager.NAV = [];
      PageManager.PAGES = {};
      <?php
        echo "g_CacheBusting = '$cacheBusting';";
        echo "PageManager.DocumentTitlePostFix = ' | $siteTitle | $strap';\n";

        foreach ($Pages as $title => $page) {
          if ($page["defaultPage"]) {
            echo "PageManager.DEFAULT_PAGE = '$title';\n";
          }
          if ($page["nav"]) {
            echo "PageManager.NAV.push('$title');\n";
          }
          echo "if (!_.isUndefined(window." .$title . "Page)) { PageManager.PAGES.$title = { view: " .$title . "Page, title: '" . $page["title"] . "'}; }\n";
        }
      ?>
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCuTTpXe02AEEn9ygmZOeVIdwsPy5ndHQM&sensor=true"></script>
    <script src="/assets/js/<?php echo $initJsFile; ?>.js<?php echo $cacheBusting; ?>"></script>

    <?php
      if ($initJsFile == 'static') {
        include $_SERVER['DOCUMENT_ROOT'] . '/src/template/ga_tracking.php';
      }
    ?>
  </body>
</html>