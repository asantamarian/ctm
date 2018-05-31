<?php
    /**
     * Your Twitter App Info
     */
    
    // Consumer Key
    define('CONSUMER_KEY', '01AWX5WysusGb1trrBljLw');
    define('CONSUMER_SECRET', 'iXcZH6y50Dz611rkk8KkucvaSgsTCPlOY6wJpXeVq0');

    // User Access Token
    define('ACCESS_TOKEN', '14449795-OtFBs81FprzERWRoCRi0Zo2NQrkj6bHiD8hU3IK7U');
    define('ACCESS_SECRET', 'FeBWnjC9oCUtOyFcWT1HrTNG352QjYh3V4P7LcuLeMIke');
	
	// Cache Settings
	define('CACHE_ENABLED', true);
	define('CACHE_LIFETIME', 3600); // in seconds
	define('HASH_SALT', md5(dirname(__FILE__)));