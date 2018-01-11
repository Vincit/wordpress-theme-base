/*
 * Why you might ask?
 * fetch doesn't support global or default options, and often those are necessary.
 * It also doesn't send cookies with the request (unless you tell it to), which
 * can break routing between staging and production amongst other things, and it's
 * often overlooked.
 *
 * Oh and you'd think that .catch() handles errors, but it doesn't. Or it does, but
 * not like you'd think it does. fetch doesn't think 404 as an error, unless you tell it to.
 */

export default function req(path, options = {}) {
  // Because fetch isn't perfect. It doesn't give you progress,
  // and you can't cancel fetch requests for example.
  console.log('Consider using axios instead of window.Fetch');

  return fetch(path, {
    credentials: 'same-origin',
    ...options,
  }).then((response) => {
    if (!response.ok) {
      // Handle errors in catch block instead of cluttering thens.
      throw Error(`${response.status} ${response.statusText}`);
    }

    return response;
  });
}
