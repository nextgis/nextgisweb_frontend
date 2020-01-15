const rimraf = require('rimraf');
const path = require('path');
const ts = require('rollup-plugin-typescript2');
const builtins = require('rollup-plugin-node-builtins');
const json = require('@rollup/plugin-json');
const rollup = require('rollup');
const chalk = require('chalk');

const args = require('minimist')(process.argv.slice(2));
const FORMATS = args.formats || args.f;
const MODE = args.mode || args.m || 'production';
const PROD_ONLY = !MODE === 'production' && (args.prodOnly || args.p);
const isRelease = args.release;
const TYPES = args.t || args.types || isRelease;
const LEAN = args.lean || args.l;

// const packagesDir = path.resolve(__dirname, '..', 'packages');
// const packageDir = path.resolve(__dirname);
const packagesDir = process.cwd();

const name = path.basename(packagesDir);
const resolve = p => path.resolve(packagesDir, p);
const pkg = require(resolve(`package.json`));
const packageOptions = pkg.buildOptions || {};

const knownExternals = [];
// fs.readdirSync(packagesDir).filter(p => {
//   return p !== '@vue/shared';
// });

// ensure TS checks only once for each build
let hasTSChecked = false;

const outputConfigs = {
  'esm-bundler': {
    file: resolve(`lib/${name}.esm-bundler.js`),
    format: `es`
  },
  cjs: {
    file: resolve(`lib/${name}.cjs.js`),
    format: `cjs`
  },
  global: {
    file: resolve(`lib/${name}.global.js`),
    format: `iife`
  },
  esm: {
    file: resolve(`lib/${name}.esm.js`),
    format: `es`
  }
};

const defaultFormats = ['esm-bundler', 'cjs'];
const inlineFormats = FORMATS && FORMATS.split(',');
const packageFormats =
  inlineFormats || packageOptions.formats || defaultFormats;
const packageConfigs = PROD_ONLY
  ? []
  : packageFormats.map(format => createConfig(format, outputConfigs[format]));

if (MODE === 'production') {
  packageFormats.forEach(format => {
    if (format === 'cjs' && packageOptions.prod !== false) {
      packageConfigs.push(createProductionConfig(format));
    }
    if (format === 'global' || format === 'esm') {
      packageConfigs.push(createMinifiedConfig(format));
    }
  });
}

async function build() {
  const pkg = require(`${packagesDir}/package.json`);

  // only build published packages for release
  if (isRelease && pkg.private) {
    return;
  }

  // if building a specific format, do not remove lib.
  if (!FORMATS) {
    await rimraf.sync(`${packagesDir}/lib`);
  }

  await run();

  // if (TYPES && pkg.types) {
  //   console.log();
  //   console.log(
  //     chalk.bold(chalk.yellow(`Rolling up type definitions for ${name}...`))
  //   );

  //   // build types
  //   const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor');

  //   const extractorConfigPath = path.resolve(pkgDir, `api-extractor.json`);
  //   const extractorConfig = ExtractorConfig.loadFileAndPrepare(
  //     extractorConfigPath
  //   );
  //   const result = Extractor.invoke(extractorConfig, {
  //     localBuild: true,
  //     showVerboseMessages: true
  //   });

  //   if (result.succeeded) {
  //     // concat additional d.ts to rolled-up dts (mostly for JSX)
  //     if (pkg.buildOptions && pkg.buildOptions.dts) {
  //       const dtsPath = path.resolve(pkgDir, pkg.types);
  //       const existing = await fs.readFile(dtsPath, 'utf-8');
  //       const toAdd = await Promise.all(
  //         pkg.buildOptions.dts.map(file => {
  //           return fs.readFile(path.resolve(pkgDir, file), 'utf-8');
  //         })
  //       );
  //       await fs.writeFile(dtsPath, existing + '\n' + toAdd.join('\n'));
  //     }
  //     console.log(
  //       chalk.bold(chalk.green(`API Extractor completed successfully.`))
  //     );
  //   } else {
  //     console.error(
  //       `API Extractor completed with ${extractorResult.errorCount} errors` +
  //         ` and ${extractorResult.warningCount} warnings`
  //     );
  //     process.exitCode = 1;
  //   }

  //   await fs.remove(`${pkgDir}/lib/packages`);
  // }
}

async function run() {
  for (const config of packageConfigs) {
    const { output, ...inputOptions } = config;
    try {
      // create a bundle
      const bundle = await rollup.rollup(inputOptions);
      console.log(2);
      // write the bundle to disk
      await bundle.write(output);
    } catch (er) {
      console.log(er.message);
      process.exit(1);
    }
  }
}

build();

function createConfig(format, output, plugins = []) {
  if (!output) {
    console.log(chalk.yellow(`invalid format: "${format}"`));
    process.exit(1);
  }

  output.externalLiveBindings = false;
  const isGlobalBuild = format === 'global';
  const isRawESMBuild = format === 'esm';

  if (isGlobalBuild) {
    output.name = packageOptions.name;
  }

  const shouldEmitDeclarations =
    TYPES != null && MODE === 'production' && !hasTSChecked;

  const tsPlugin = ts({
    check: MODE === 'production' && !hasTSChecked,
    tsconfig: path.resolve(packagesDir, 'tsconfig.json'),
    // cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        declaration: shouldEmitDeclarations,
        declarationMap: shouldEmitDeclarations
      },
      exclude: ['**/__tests__', 'test-dts']
    }
  });
  // we only need to check TS and generate declarations once for each build.
  // it also seems to run into weird issues when checking multiple times
  // during a single build.
  hasTSChecked = true;

  const entryFile =
    format === 'esm-bundler-runtime' ? `src/runtime.ts` : `src/index.ts`;

  const external =
    isGlobalBuild || isRawESMBuild
      ? []
      : knownExternals.concat(Object.keys(pkg.dependencies || []));
  console.log(format);
  return {
    input: resolve(entryFile),
    // Global and Browser ESM builds inlines everything so that they can be
    // used alone.
    external,
    plugins: [
      json({
        namedExports: false
      }),
      tsPlugin,
      builtins(),
      ...plugins
    ],
    output,
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg);
      }
    }
  };
}

function createProductionConfig(format) {
  return createConfig(format, {
    file: resolve(`lib/${name}.${format}.prod.js`),
    format: outputConfigs[format].format
  });
}

function createMinifiedConfig(format) {
  const { terser } = require('rollup-plugin-terser');
  return createConfig(
    format,
    {
      file: resolve(`lib/${name}.${format}.prod.js`),
      format: outputConfigs[format].format
    },
    [
      terser({
        module: /^esm/.test(format)
      })
    ]
  );
}
