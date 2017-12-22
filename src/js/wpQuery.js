import qs from 'qs';
import req from './lib/req';

async function wpQuery(queryArgs = {}) {
  const args = {
    post_type: 'post',
    paged: 1,
    ...queryArgs,
  };

  const response = await req(`/wp-json/wp_query/args/?${qs.stringify(args)}`);
  const headers = Array.from(response.headers.entries()).reduce((acc, a) => {
    acc[a[0]] = a[1];
    return acc;
  }, {});

  const posts = await response.json();
  const returnObj = { headers, posts };

  if (headers['x-wp-total'] > args.paged) {
    returnObj.next = async function next(cb, ...args2) {
      const result = await wpQuery({
        ...args,
        paged: args.paged + 1,
      });

      if (cb) {
        cb(result, ...args2);
      }

      return result;
    };
  }

  return returnObj;
}

export default wpQuery;
