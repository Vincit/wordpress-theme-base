# Vincit WordPress theme base

This theme is as barebones as starter themes get. It ~~has everything~~ will have everything preconfigured, but boilerplate is kept to a minimum.

## Features
- [ ] ???
- [x] Built with Webpack 3
  - [x] ES6+
  - [x] ESLint
  - [x] Stylus
  - [x] Sourcemaps
  - [x] *CSS Hot Module Replacement* (HMR)
  - [x] *JS Hot Module Replacement* (HMR)
  - [x] Automatic image optimization using imagemin
  - [x] Nyancat progress bar
  - [x] Enforces case sensitive paths
- [ ] PHPCS

## Usage
Clone the theme or install it with the installer that ships with [Vincit/wordpress](https://github.com/Vincit/wordpress). Composer is also an option.
```
git clone git@github.com:Vincit/wordpress-theme-base.git themename

# OR (with first vagrant up if using Vincit/wordpress)
# Runs automatically. Answer yes to the question when prompted.

# OR (Vincit/wordpress installer)
./install # Follow the instructions

# OR (composer)
composer require vincit/wordpress-theme-base # append dev-master to get the latest version (potentially unstable)
```

Install dependencies:
```
npm install
```

Start watching for changes:
```
npm run watch # or npm run start, but webpack-dashboard is buggy at the moment
```

Find & replace at least these strings:
`wordpress-theme-base` => ???
`WordPress theme base` => ???

## FAQ
### What's with the folder structure?*
- build/ contains build related things, such as Webpack config.
- dist/ contains the build itself. Never committed to version control.
- inc/ contains server side includes. Basically if you would put it in functions.php, put it here.
- src/ contains client side source files, including JavaScript, Stylus and images.
  - js/ contains JavaScript files.
  - styl/ contains Stylus files.
  - img/ contains images, including SVGs.
  - Files inside src/ directly will be used to build files: `client.styl` => `client.css` and so on.

### WTF, why are you importing a `.styl` file inside JavaScript?
Ask Webpack. Get over it. Basically Webpack doesn't know about them otherwise.
