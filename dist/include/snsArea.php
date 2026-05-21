<div class="sns-share">
    <ul>
        <li>
            <div id="fb-root"></div>
            <script async defer crossorigin="anonymous" src="https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&autoLogAppEvents=1&version=v3.2&appId=113530675411715"></script>
            <div class="fb-share-button" data-href="<?php echo $REQUEST_URL ?>" data-layout="box_count" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.deushi.info%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">シェア</a></div>
        </li>
        <li>
            <a href="https://twitter.com/share" class="twitter-share-button" data-url="<?php echo $REQUEST_URL ?>" data-via="HYPER_USHI" data-text="<?php echo $description; ?>" data-related="test1,test2" data-count="vertical" data-lang="ja" data-hashtags="<?php echo $SITE_TITLE; ?>" data-size="large">ツイート</a>
            <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </li>
        <li>
            <div class="line-it-button" data-lang="ja" data-type="share-e" data-ver="2" data-url="<?php echo $REQUEST_URL ?>" style="display: none;"></div>
            <script src="https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js" async="async" defer="defer"></script>
        </li>
    </ul>
</div>
