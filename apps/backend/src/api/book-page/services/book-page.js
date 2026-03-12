'use strict';

/**
 * book-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::book-page.book-page');
