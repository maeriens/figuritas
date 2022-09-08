const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ["./src/index.js"],
    outfile: "./public/dist/app.js",
    minify: true,
    bundle: true,
    loader: {
        ".js": "jsx"
    },
}).catch(e => {
    console.log(e);
    process.exit(1);
});