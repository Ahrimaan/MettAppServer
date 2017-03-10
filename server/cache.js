var NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 3600, checkperiod: 150 });


module.exports.getCacheItem = (key) => {
    return myCache.get(key);
}

module.exports.setCacheItem = (key,value) => {
    myCache.set(key,value);
}