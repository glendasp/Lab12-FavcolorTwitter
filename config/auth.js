/**
 * Created by glendex on 4/13/16.
 */
module.exports = {
    'twitterAuth': {
        'consumerkey': process.env.TWITTER_CONSUMER_KEY,
        'consumerSecret' : process.env.WITTER_CONSUMER_SECRET,
        'callbackURL': 'http://127.0.0.1:3000/auth/twitter/callback'
    }
};