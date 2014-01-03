
function BlogPosts()
{
  var parent = ExtendClass(this, new ViewBase("blogposts")),
      m_$View = parent.GetView(),
      m_Accounts = {
        tumblr : {
          name  : 'sirkettle',
          key   : 'vmNUaWxCt9rGA83Jk5x0S4Mh7kqpDkBKM6t8HESW1CT7AVP5xr',
          limit : 5
        }
      },
      m_aPosts = [],

  addTumblrPost = function (oPost) {

    var splitDate = oPost.date.split(" "),
        dateParts = splitDate[0].split("-"),
        timeParts = splitDate[1].split(":");
        createdDate = new Date(dateParts[0],(dateParts[1]-1),dateParts[2],timeParts[0],timeParts[1],timeParts[2]),
        $post = $('<div>').addClass('blogpost')
                  .html('<hr><small>Posted on ' + getDateHtml(createdDate) + '</span>');

    switch (oPost.type) {
      case 'text':
        $post.append($('<h3>').text(oPost.title), oPost.body);
        break;
      case 'photo':
        $post.append('<img class="image" src="' + oPost.photos[0].alt_sizes[0].url + '">', oPost.caption);
        break;
      case 'link':
        break;
      case 'video':
        break;
    };

    addPost(createdDate.getTime(), $post);
  },

  addTweetPost = function (oTweet) {
    var createdDate = new Date(oTweet.created_at * 1000),
        $post = $('<div>').addClass('blogpost')
                  .html('<hr><small>Tweeted on ' + getDateHtml(createdDate) + '</span>'),
        tweetHtml = oTweet.text;

    // replace urls
    _.each(oTweet.entities.urls, function (oUrl) {
      tweetHtml = tweetHtml.replace(new RegExp(oUrl.url), '<a href="' + oUrl.url +'">' + oUrl.url +'</a>');
    });

    // replace tags
    _.each(oTweet.entities.hashtags, function (oTag) {
      tweetHtml = tweetHtml.replace(new RegExp('#' + oTag.text), '<a href="https://twitter.com/search?q=%23' + oTag.text +'&src=hash">#' + oTag.text + '</a>');
    });

    // replace usersTags
    _.each(oTweet.entities.user_mentions, function (oTag) {
      tweetHtml = tweetHtml.replace(new RegExp('@' + oTag.screen_name), '<a title="' + oTag.name + '" href="https://twitter.com/' + oTag.screen_name + '">@' + oTag.screen_name + '</a>');
    });

    $post.append($('<p>').html(tweetHtml));

    addPost(createdDate.getTime(), $post);
  },

  addPost = function (nTime, $post) {
    m_aPosts.push({
      timestamp: nTime,
      post : $post
    });
  };
  
  // Public Methods
  this.Show = function($Target, fOnReady) {
    var tblrJqHrx, twitJqHrx;
    
    // clear any old posts
    m_aPosts = [];
    m_$View.empty();

    // get tumblr data...
    tblrJqHrx = $.getJSON('http://api.tumblr.com/v2/blog/' + m_Accounts.tumblr.name + '.tumblr.com/posts?callback=?', {
      api_key: m_Accounts.tumblr.key,
      limit : m_Accounts.tumblr.limit
    }, function (aData) {
      // filter post types
      aData.response.posts = _.filter(aData.response.posts, function (oPost) {
        return _.contains(['text',/*'link','video',*/'photo'], oPost.type);
      });
      // create our tumblr posts
      if (_.isObject(aData.response) && aData.response.posts.length > 0) {
        _.each(aData.response.posts, addTumblrPost);
      }
    });

    // get twitter data
    twitJqHrx = $.getJSON('src/social/getTweets.php', function (aTweets) {
      // create our tweet posts
      _.each(aTweets, addTweetPost);
    });

    // when we have the data back from the social apis
    $.when(tblrJqHrx, twitJqHrx).done(function () {
      // sort posts by data/time
      m_aPosts = _.sortBy(m_aPosts, function (oPost) {
        return -oPost.timestamp;
      });
      // render the posts
      _.each(m_aPosts, function (oPost) {
        oPost.post.appendTo(m_$View);
      });
      // render the view
      m_$View.prepend('<hr><h2>My social feed</h2><h3>A mixture of blog posts and tweets.</h3>').appendTo($Target);
      fOnReady();
    });

    parent.Show($Target);
  };
  
  this.Hide = function(){
    m_$View.empty();
    parent.Hide();
  };
}
