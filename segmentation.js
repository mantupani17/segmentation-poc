require('dotenv').config()
const Analytics = require('analytics-node');
/**
 * @module Segmentation
 * @description POC
 * 
 */
class Segmentation {
    analytics = null;
    constructor(write_key, options = {}){
        this.analytics = new Analytics(write_key || process.env.SEGMENT_WRITE_KEY, options);
    }

    identify(userid, traits){
        this.analytics.identify({
            userId: userid,
            traits
        })
    }

    track(userid, event, properties ) {
        this.analytics.track({
            userId: userid,
            event: event,
            properties: properties
        });
    }
}
module.exports = Segmentation;
