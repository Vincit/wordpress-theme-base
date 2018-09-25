function loadScript(src, done) {
  const js = document.createElement('script');

  js.src = src;
  js.onload = () => {
    done();
  };
  js.onerror = () => {
    done(new Error(`Failed to load script ${src}`));
  };

  document.head.appendChild(js);
}

function polyfiller({ condition, src }, main) {
  if (!condition) {
    loadScript(src, main);
  } else {
    main();
  }
}

export default polyfiller;
