let cache = {};
const stringify = JSON.stringify;
const timestampExpires = 120; // in minutes
const timestamp = cacheTimestamp();

const cacheProvider = async (fnName, fn, ...args) => {
  const newArgs = stringify(args);
  const cacheByFnName = cache[fnName];

  // Create new cache by function name
  if (!cacheByFnName) {
    return await cacheCreateRoot(fnName, fn, newArgs, ...args);
  }

  // Return value from cache
  const cacheByArgs = cacheByFnName[newArgs];

  if (cacheByArgs && timestamp.check(+cacheByArgs.timestamp)) {
    console.info('Result taken from cache \n');
    return cacheByArgs.result;
  }

  // Create new cache in fn name by args
  return await cacheCreateSubRoot(fnName, fn, newArgs, ...args);
};

function cacheTimestamp() {
  return {
    create() {
      const now = new Date();
      now.setMinutes(now.getMinutes() + timestampExpires);

      return now.getTime();
    },
    check(timestamp) {
      const now = Date.now();

      return now <= timestamp;
    },
  };
}

function cacheResetAll(fnName, newArgs, res) {
  cache = {
    [fnName]: {
      [newArgs]: {
        result: res,
        timestamp: timestamp.create(),
      },
    },
  };
}

async function cacheCreateRoot(fnName, fn, newArgs, ...args) {
  const res = await fn(...args);
  const newFnName = cache[fnName] || {};
  cache[fnName] = { ...newFnName };
  cache[fnName][newArgs] = {
    result: res,
    timestamp: timestamp.create(),
  };
  return res;
}

async function cacheCreateSubRoot(fnName, fn, newArgs, ...args) {
  const res = await fn(...args);
  cache[fnName][newArgs] = {
    result: res,
    timestamp: timestamp.create(),
  };

  return res;
}

export { cacheProvider }
