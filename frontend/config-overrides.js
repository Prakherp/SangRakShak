const webpack= require('webpack');
module.exports=
  function override(config){ 
    const fallback= config.resolve.fallback || {};
    Object.assign(fallback,{
      path: require.resolve("path-browserify") ,
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify") ,
      fs: false,
      buffer: require.resolve("buffer/") ,
      url:  require.resolve("url/") ,
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      zlib: require.resolve("browserify-zlib"),
      util: require.resolve("util/"),
      dns: false,
      child_process: false,
      tls: false,
      assert: require.resolve("assert/"),
      vm: require.resolve("vm-browserify"),

    });
    config.resolve.fallback=fallback;
    config.plugins= (config.plugins || []).concat([
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ]
    );
    return config;
  };