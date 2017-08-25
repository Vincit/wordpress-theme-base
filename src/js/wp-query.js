import qs from 'qs';

async function wp_query(query_args = false) {
  const args = query_args || {
    'post_type': 'post',
  };

  const response = await fetch(`/wp-json/wp_query/args/?${qs.stringify(args)}`);
  const headers = Array.from(response.headers.entries()).reduce((acc, a) => {
    acc[a[0]] = a[1];
    return acc;
  }, {});
  const posts = await response.json();

  return { headers, posts };
}

export default wp_query;
