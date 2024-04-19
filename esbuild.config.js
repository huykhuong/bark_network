const glob = require("glob");
const esbuild = require("esbuild");
const path = require("path");
const ImportGlobPlugin = require("esbuild-plugin-import-glob").default;

const watch = process.argv.includes("--watch");

const config = {
  entryPoints: glob.sync("app/javascript/packs/*.js"),
  assetNames: "[name]-[hash].digested",
  publicPath: "/assets",
  bundle: true,
  sourcemap: true,
  outdir: path.join(process.cwd(), "app/assets/builds"),
  minify: true,
  loader: {
    ".js": "jsx",
    ".locale.json": "file",
    ".json": "json",
    ".png": "file",
    ".jpeg": "file",
    ".jpg": "file",
    ".svg": "file",
  },
  plugins: [ImportGlobPlugin()],
};

esbuild.context(config).then((ctx) => {
  if (watch) {
    ctx.watch();
  } else {
    ctx.rebuild().then((result) => {
      if (result.errors.length > 0) {
        console.log(result);
      } else {
        console.log("Build succeeded");
      }

      ctx.dispose();
    });
  }
});
