import { Picker } from 'meteor/meteorhacks:picker';
import { Posts, Comments } from 'meteor/example-forum';
import Users from 'meteor/vulcan:users';

//Route for redirecting LessWrong legacy posts
// addRoute({ name: 'lessWrongLegacy', path: 'lw/:id/:slug/:commentId', componentName: 'LegacyPostRedirect'});


// Route for old post links
Picker.route('/:section?/:subreddit?/lw/:id/:slug', (params, req, res, next) => {
  if(params.id){

    try {
      const post = Posts.findOne({"legacyData.url": {$regex: "\/lw\/"+params.id+"\/.*"}});

      if (post) {
        res.writeHead(301, {'Location': Posts.getPageUrl(post)});
        res.end();
      } else {
        // don't redirect if we can't find a post for that link
        res.status(404).end(`No legacy post found with: id=${params.id} slug=${params.slug}`);
      }
    } catch (error) {
      //eslint-disable-next-line no-console
      console.error('// Legacy Post error', error, params)
      res.status(404).end(`No legacy post found with: id=${params.id} slug=${params.slug}`);
    }
  } else {
    res.status(404).end("Please provide a URL");
  }
});

// Route for old comment links
Picker.route('/:section?/:subreddit?/lw/:id/:slug/:commentId', (params, req, res, next) => {
  if(params.id){

    try {
      const post = Posts.findOne({"legacyData.url": {$regex: "\/lw\/"+params.id+"\/.*"}});
      const comment = Comments.findOne({"legacyId": parseInt(params.commentId, 36).toString()});
      if (post && comment) {
        res.writeHead(301, {'Location': Posts.getPageUrl(post)+"#"+comment._id});
        res.end();
      } else if (post) {
        res.writeHead(301, {'Location': Posts.getPageUrl(post)});
        res.end();
      } else {
        // don't redirect if we can't find a post for that link
        res.status(404).end(`No legacy post found with: id=${params.id} slug=${params.slug}`);
      }
    } catch (error) {
      //eslint-disable-next-line no-console
      console.log('// Legacy comment error', error, params)
      res.status(404).end(`No legacy post found with: id=${params.id} slug=${params.slug}`);
    }
  } else {
    res.status(404).end("Please provide a URL");
  }
});

// Route for old user links
Picker.route('/user/:slug/:category?/:filter?', (params, req, res, next) => {
  if(params.slug){
    try {
      const user = Users.findOne({$or: [{slug: params.slug}, {username: params.slug}]});
      if (user) {
        res.writeHead(301, {'Location': Users.getProfileUrl(user)});
        res.end();
      } else {
        // don't redirect if we can't find a post for that link
        res.status(404).end(`No legacy user found with: ${params.slug}`);
      }
    } catch (error) {
      //eslint-disable-next-line no-console
      console.log('// Legacy User error', error, params);
      res.status(404).end(`No legacy user found with: ${params.slug}`);
    }
  } else {
    res.status(404).end("Please provide a URL");
  }
});

// Route for old comment links

Picker.route('/posts/:_id/:slug/:commentId', (params, req, res, next) => {
  if(params.commentId){
    try {
      const comment = Comments.findOne({_id: params.commentId});
      if (comment) {
        res.writeHead(301, {'Location': Comments.getPageUrl(comment, true)});
        res.end();
      } else {
        // don't redirect if we can't find a post for that link
        res.status(404).end(`No comment found with: ${params.commentId}`);
      }
    } catch (error) {
      //eslint-disable-next-line no-console
      console.error('// Legacy Comment error', error, params)
    }
  } else {
    res.status(404).end("Please provide a URL");
  }
});

// Route for old images

Picker.route('/static/imported/:year/:month/:day/:imageName', (params, req, res, next) => {
  if(params.imageName){
    try {
      res.writeHead(
        301,
        {'Location':
          `https://raw.githubusercontent.com/tricycle/lesswrong/master/r2/r2/public/static/imported/${params.year}/${params.month}/${params.day}/${params.imageName}`
        }
      )
      res.end()
    } catch (error) {
      //eslint-disable-next-line no-console
      console.error('// Legacy Comment error', error, params)
      res.status(404).end("Invalid image url")
    }
  } else {
    res.status(404).end("Please provide a URL");
  }
});
