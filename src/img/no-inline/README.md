# What is the purpose of this folder?
svg-inline-loader has no way of detecting what file requested the asset, and so it breaks things like background images in CSS.
Instead of linking to the asset, this happens: `background-image: url('<svg>...</svg>');`

https://github.com/webpack-contrib/svg-inline-loader/issues/22#issuecomment-244348663
