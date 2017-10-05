# Vincit WordPress theme base
Bleeding edge starter theme.

## Features
- [x] Pagebuilder, powered by [ACF](https://www.advancedcustomfields.com/resources/flexible-content/)
- [x] Cleaner menus that are accessible
- [x] Saner the_content() to make certain layouts easier to build
- [x] Automatic editor stylesheet
- [x] (Multilingual) options page support
- [x] Ground-breaking but controversial cachebusting for assets
- [x] Works with React (out-of-the-box, has demos)
- [x] Modern JavaScript support
  - [x] Built with Webpack 3
  - [x] **CSS Hot Module Replacement** (HMR)
  - [x] **JS Hot Module Replacement** (HMR)
  - [x] ES6+ (stage-2)
  - [x] ESLint
  - [x] Sourcemaps
  - [x] Nyancat progress bar
  - [x] Enforces case sensitive paths so build works on all platforms
- [x] CSS Preprocessor support
  - [×] Preconfigured with Stylus
- [x] Automatic image optimization using imagemin
- [x] PHPCS, based on PSR2.

## Screenshots
### Desktop
[Frontpage](https://i.imgur.com/ADIG8V7.jpg)
[Pagebuilder](https://i.imgur.com/JeRNEvk.jpg)
### Mobile
[Frontpage](https://i.imgur.com/8ONEags.jpg)
[Pagebuilder](https://i.imgur.com/0Xns0Db.png)

## Requirements
- PHP 7
- Composer
- Node 6 (preferably latest)
- npm 5

The theme will fail with anything less than PHP 7, but making it PHP 5 compatible shouldn't be too hard, just fix the errors as they appear.

## Usage
Clone the theme or install it with the installer that ships with [Vincit/wordpress](https://github.com/Vincit/wordpress). Composer is also an option.
```sh
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

### If you installed manually (and not with the installer)
Webpack requires some information from your setup. Mainly the URL of the site, and path to your theme. Open `package.json` and change `publicPath` and `proxyURL` to correct values.

Start watching for changes:
```
npm run watch # or npm run start, but webpack-dashboard is buggy at the moment
```

Find & replace at least these strings:
`wordpress-theme-base` => ???

`WordPress theme base` => ???

```
find . -not -path "./node_modules/*" -type f -name "*.*" -exec sed -i'' -e 's/wordpress-theme-base/your-desired-slug/g' {} +
find . -not -path "./node_modules/*" -type f -name "*.*" -exec sed -i'' -e 's/WordPress theme base/Your theme name/g' {} +
```

## FAQ
### What's with the folder structure?
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

### I installed all the dependencies and ran npm run watch, but when I try to access http://localhost:8080 I get the following error: Error occured while trying to proxy to: localhost:8080/
You don't have WordPress installed at https://wordpress.local, which is the default address. Change the proxyURL value in package.json and try again.

### You promised us HMR, but it doesn't work?!!
See above. HMR requires publicPath value to work. This theme defaults to http://localhost:8080/wp-content/themes/wordpress-theme-base/dist/, if you installed the theme in a directory with another name you obviously need to change it.
Change the value in package.json.

### I did the above but HMR still doesn't work?
Git gud. HMR requires you to write your code accordingly, example:
- [Module](https://github.com/Vincit/wordpress-theme-base/blob/master/src/js/components/clock.js)
- [sample.js](https://github.com/Vincit/wordpress-theme-base/blob/master/src/sample.js)

If using React, hot-loading becomes a bit harder. Support might just land straight to this theme as time passes. In the meantime, [this might help.](https://github.com/wkwiatek/react-hot-loader-minimal-boilerplate/blob/master/src/index.js)

Consult Webpack documentation if necessary.

### I get a white screen or Fatal error: Uncaught Exception: Enqueued file must be a css or js file
Build the theme after installing it. Run `npm install`.

### How to use webfonts?
Place the font files in src/fonts. The loaders working directory is src, even if you use @font-face in styl/typography.styl.

```css
@font-face {
  font-family: 'FontName'
  src: url('./fonts/Font.eot')
  src: local('.'), local('.'),
    url('./fonts/Font.eot?#iefix') format('embedded-opentype'),
    url('./fonts/Font.woff') format('woff'),
    url('./fonts/Font.ttf') format('truetype')
  font-weight: normal
  font-style: normal
}
```

### I tried to use an svg background image but it doesn't quite work
[svg-inline-loader](https://github.com/webpack-contrib/svg-inline-loader) purifies SVGs and inlines them, so `background: url('./img/svg/background.svg')` results in `background: url(<svg>..</svg>)`.

The solution is to put the SVG in src/img/no-inline/svg directory: `background: url('./img/no-inline/svg/close.svg')` => `background: url(data:image/svg+xml;base64...)`

### Asset paths (JavaScript, CSS...) are totally wrong
Due to the ground-breakingness and controversiality of the way we enqueue assets, it's necessary to define a constant `ENQUEUE_STRIP_PATH` that contains the filesystem path until WordPress root directory. It's defined in `inc/Assets.php`, and the default is `/data/wordpress/htdocs`. It works out of the box with [Seravo/wordpress](https://github.com/Seravo/wordpress) and inside Seravo production instances.

If you develop using MAMP (or similar), or host the theme elsewhere, it's necessary to change the value. If you require two separate values (production and dev are different), that's easy too.
```php
if (defined("WP_DEBUG") && WP_DEBUG) { // or use the domain from $_SERVER
  define("ENQUEUE_STRIP_PATH", "/path/to/strip/in/dev/");
} else {
  define("ENQUEUE_STRIP_PATH", "/path/to/strip/in/prod/");
}
```

And if you figure out a way to remove this hack entirely (as in convert fs path to webserver path), please do tell.

## I got "TypeError: Cannot read property 'split' of null" when starting the watcher
Most likely the proxyURL in package.json is wrong. Make sure to include protocol: `https://wordpress.local`
