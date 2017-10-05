import qs from 'qs';

const error = (status, message) => (JSON.stringify({ status, message }));

async function wpQuery(queryArgs = false) {
  const args = queryArgs || {
    post_type: 'post',
  };

  // Got an error about no such route? https://github.com/aucor/wp_query-route-to-rest-api
  const response = await fetch(`/wp-json/wp_query/args/?${qs.stringify(args)}`);
  const headers = Array.from(response.headers.entries()).reduce((acc, a) => {
    acc[a[0]] = a[1];
    return acc;
  }, {});
  const posts = await response.json();
  const statusCode = response.status;
  const stringStatusCode = String(statusCode);

  if (stringStatusCode[0] !== '2') {
    if (statusCode === 404) {
      throw new Error(error(
        statusCode,
        'Got 404 trying to query for posts. Is aucor/wp_query-route-to-rest-api installed?'
      ));
    }

    console.warn(`Response status was ${response.status}`);
    if (stringStatusCode[0] === '4' || stringStatusCode[0] === '5') {
      throw new Error(error(statusCode, response.statusText));
    }
  }

  return { headers, posts };
}

export default wpQuery;
