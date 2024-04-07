enum Api {
  COMPONENT_LIST = '/api/component/list',
}

/**
 * @description: Get sample list value
 */

export const componentList = () =>
  fetch(Api.COMPONENT_LIST, {
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json',
    },
    method: 'get', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  }).then((response) => response.json());
