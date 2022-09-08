const esbuild = require('esbuild');
const port = process.env.PORT || 3000;

esbuild.serve({
    servedir: "public",
    port,
}, {
    entryPoints: ["./src/index.js"],
    outfile: "./public/dist/app.js",
    bundle: true,
    sourcemap: true,
    loader: {
        ".js": "jsx"
    }
}).then(() => {
    console.log(`Server started on http://localhost:${port}`)
}).catch(e => {
    console.log(e);
    process.exit(1);
});