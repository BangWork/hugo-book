module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: ['chrome>=5', 'safari>=5.5'],
            cascade: false
        })
    ]
};