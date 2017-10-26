import qs from 'qs';
import req from './lib/req';

async function wpQuery(queryArgs = false) {
  const args = queryArgs || {
    post_type: 'post',
  };

  // Got an error about no such route? https://github.com/aucor/wp_query-route-to-rest-api
  const response = await req(`/wp-json/wp_query/args/?${qs.stringify(args)}`);
  const headers = Array.from(response.headers.entries()).reduce((acc, a) => {
    acc[a[0]] = a[1];
    return acc;
  }, {});
  const posts = await response.json();

  return { headers, posts };
}

export default wpQuery;
