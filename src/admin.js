import './admin.styl';

if (module.hot) {
  if (window.location.origin.includes('localhost')) {
    window.location.href = window.location.href.replace(
      window.location.origin,
      window.theme.siteurl
    );
  }

  // transformURLsWebpackDevServer();
}
