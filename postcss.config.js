'use strict';

module.exports = {
    plugins: [
        require('postcss-simple-vars'),
        require('postcss-import'),
        require('postcss-sassy-mixins'),
        require('postcss-nested'),
        require('postcss-extend'),
        require('postcss-size'),
        require('postcss-media-minmax'),
        require('postcss-clearfix'),
        require('postcss-conditionals'),
        require('postcss-hexrgba'),
        require('autoprefixer')({
            browsers: [
                'last 2 version',
            ],
        }),
    ],
};
