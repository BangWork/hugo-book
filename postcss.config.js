module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: ['chrome >= 43', 'safari >= 7'],
            cascade: false
        })
    ]
}