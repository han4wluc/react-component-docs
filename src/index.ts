import {Command, flags} from '@oclif/command'

// import fs from 'fs';
const fs = require('fs-extra')
const { exec } = require('child_process');
const { spawn } = require('child_process');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require(__dirname + '/../App/webpack.dev.config.js');

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

const options = {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  // inline: true,
  // contentBase: 'www',
  stats: { colors: true }
};

// require('babel-register')({
//   presets: ['es2015', 'stage-2', 'react'],
//   plugins: ['transform-decorators-legacy'],
// });
// require('babel-polyfill');

const prettier = require('prettier');
const prettierOptions = {
  singleQuote: true,
  trailingComma: 'all',
  parser: 'flow',
};

declare let global:any;

global.document = {
  createElement: () => {}
};

class ReactComponent extends Command {

  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    // add --help flag to show CLI version
    help: flags.help({char: 'h'}),

    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {

    const generateCompsCode =  require('./generateCompsCode').default;

    const {args, flags} = this.parse(ReactComponent)

    console.warn('args', args);
    const { file: customEntry } = args;

    if(!fs.existsSync('componentDocs.json')){
      this.log(`file componentDocs.json does not exists`)
      return;
    }
    let config : any = fs.readFileSync('componentDocs.json', 'utf8');
    try {
      config = JSON.parse(config);
    } catch(error) {
      // console.warn(error);
    }

    this.log(config);

    if(customEntry && config.entry){
      webpackConfig.entry.splice(webpackConfig.entry.length - 1);
      console.warn('process.cwd() + config.entry', process.cwd() + '/' + config.entry)
      webpackConfig.entry.push(process.cwd() + '/' + config.entry)
    }

    let outString = ``;

    config.routes.forEach((route: any)=>{

      let name = route.name;

      outString += generateCompsCode(route.path, name);
      outString += `export const ${name}Comp = ['${name}', ${name}];`;
    })

    outString = prettier.format(outString, prettierOptions);

    if(fs.existsSync(__dirname + '/../.cache')){
      // console.warn('AAAA')
      fs.readdirSync(__dirname + '/../.cache').forEach(function(file :any, index :any){
        fs.unlinkSync(__dirname + '/../.cache/' + file);
      });
      fs.rmdirSync(__dirname + '/../.cache')
    } 
    // console.warn('BBBBB')

    // fs.copySync(__dirname + '/../cache', __dirname + '/../.cache');
    fs.mkdirSync(__dirname + '/../.cache');
    fs.writeFileSync(__dirname + '/../.cache/comps.js', outString);

    const server = new WebpackDevServer(webpack(webpackConfig), options);
    server.listen(8080, 'localhost', function (err:any) {
    if (err) {
    console.log(err);
      }
    console.log('WebpackDevServer listening at localhost:', 8080);
    });

  }
}

export = ReactComponent
