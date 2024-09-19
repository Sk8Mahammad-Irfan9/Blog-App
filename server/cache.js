// cache.js

// Simple in-memory cache
const cache = {};

// Function to set data in the cache
const setCache = (key, value, ttl) => {
  const expiresAt = Date.now() + ttl * 1000; // TTL in seconds
  cache[key] = { value, expiresAt };
};

// Function to get data from the cache
const getCache = (key) => {
  const cached = cache[key];
  if (cached && Date.now() < cached.expiresAt) {
    return cached.value;
  } else {
    // Cache is expired or not found
    delete cache[key];
    return null;
  }
};

module.exports = { setCache, getCache };
