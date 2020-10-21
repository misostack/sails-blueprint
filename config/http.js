/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {
  /****************************************************************************
   *                                                                           *
   * Sails/Express middleware to run for every HTTP request.                   *
   * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
   *                                                                           *
   * https://sailsjs.com/documentation/concepts/middleware                     *
   *                                                                           *
   ****************************************************************************/

  middleware: {
    /***************************************************************************
     *                                                                          *
     * The order in which middleware should be run for HTTP requests.           *
     * (This Sails app's routes are handled by the "router" middleware below.)  *
     *                                                                          *
     ***************************************************************************/

    order: [
      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      'i18nNext',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],

    /***************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests.       *
     *                                                                          *
     * https://sailsjs.com/config/http#?customizing-the-body-parser             *
     *                                                                          *
     ***************************************************************************/
    i18nNext: (function () {
      const i18next = require('i18next');
      const i18nextMiddleware = require('i18next-http-middleware');
      const Backend = require('i18next-fs-backend');
      const options = {
        // order and from where user language should be detected
        order: [/*'path', 'session', */ 'querystring', 'header'],

        // keys or params to lookup language from
        lookupQuerystring: 'lng',
        lookupCookie: 'i18next',
        lookupHeader: 'x-lang',
        lookupHeaderRegex: /(([a-z]{2})-?([A-Z]{2})?)\s*;?\s*(q=([0-9.]+))?/gi,
        lookupSession: 'lng',
        lookupPath: 'lng',
        lookupFromPathIndex: 0,

        // cache user language
        caches: false, // ['cookie']

        ignoreCase: true, // ignore case of detected language
      };
      i18next
        .use(Backend)
        .use(i18nextMiddleware.LanguageDetector)
        .init({
          backend: {
            // eslint-disable-next-line no-path-concat
            loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
            // eslint-disable-next-line no-path-concat
            addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json',
          },
          fallbackLng: 'en',
          preload: ['en', 'vn'],
          saveMissing: true,
          detection: options,
        });
      var reqNextFn = i18nextMiddleware.handle(i18next);
      return reqNextFn;
    })(),
    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),
  },
};
