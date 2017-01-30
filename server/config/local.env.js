'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9090',
  SESSION_SECRET: 'crudsql-secret',

  FACEBOOK_ID: 'app-id',
  FACEBOOK_SECRET: 'secret',

  TWITTER_ID: 'app-id',
  TWITTER_SECRET: 'secret',

  GOOGLE_ID: 'app-id',
  GOOGLE_SECRET: 'secret',

  SENDGRID_APIKEY: 'YOUR_GENERATED_SENDGRID_API_KEY', // Used for sending emails
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
