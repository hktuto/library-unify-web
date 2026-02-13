'use strict';

/**
 * half-an-hour service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::half-an-hour.half-an-hour');
