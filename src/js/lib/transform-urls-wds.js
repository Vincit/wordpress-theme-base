export default function transformURLsWebpackDevServer() {
  // Running from webpack-dev-server. Transform all links so they keep working.
  Array.from(document.querySelectorAll('a, form')).forEach((element) => {
    const { siteurl } = window.theme;
    const url = window.location.origin;

    switch (element.tagName.toLowerCase()) {
    case 'a': {
      if (element.href) {
        element.href = element.href.replace(siteurl, url);
      }
      break;
    }

    case 'form': {
      const action = element.getAttribute('action');
      if (action) {
        element.setAttribute('action', action.replace(siteurl, url));
      }
      break;
    }

    default:
    }
  });
}
