// babel.config.js
module.exports = (api) => {
    api.cache(true);

    const presets = [];

    if (process.env.NODE_ENV === 'test') {
        presets.push('@babel/preset-env', '@babel/preset-react');
    }

    return {
        presets,
        plugins: [],
    };
};
