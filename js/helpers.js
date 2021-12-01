import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * Makes an AJAX pull or post, depending on whether it has upload data
 * @param {String} url API url
 * @param {Object} uploadData Any object to be uploaded
 * @returns {Object} Object returned by API
 * @author Jonas Schmedtmann
 */
export const AJAX = async function (url, uploadData = undefined) {
  const _init = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'default',
  };
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url, _init);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    console.log(res);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
