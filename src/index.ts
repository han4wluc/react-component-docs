import {Command, flags} from '@oclif/command'

// import fs from 'fs';
import fs = require('fs')
import generateCompsCode from './generateCompsCode';
const { exec } = require('child_process');
const { spawn } = require('child_process');

require('babel-register')({
  presets: ['es2015', 'stage-2', 'react'],
  plugins: ['transform-decorators-legacy'],
});
require('babel-polyfill');

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

    const {args, flags} = this.parse(ReactComponent)

    if(!fs.existsSync('componentDocs.json')){
      this.log(`file componentDocs.json does not exists`)
      return;
    }
    let config : any = fs.readFileSync('componentDocs.json', 'utf8');
    try {
      config = JSON.parse(config);
    } catch(error) {
      console.warn(error);
    }

    this.log(config);

    let outString = `import componentFunction from './componentFunction';\n`;

    config.routes.forEach((route: any)=>{

      let name = route.name;

      outString += generateCompsCode(route.path, name);
      outString += `export const ${name}Comp = componentFunction(${name}, '${name}');`;
    })

    outString = prettier.format(outString, prettierOptions);

    fs.writeFileSync(__dirname + '/../' + 'cache/comps.js', outString);

    const child = spawn('webpack-dev-server', ['--config', __dirname + '/../src/webpack.dev.config.js', '--host', '0.0.0.0', '--hot']);

    // use child.stdout.setEncoding('utf8'); if you want text chunks
    child.stdout.on('data', (chunk:any) => {
      console.log( `stderr: ${chunk}` );
      // data from standard output is here as buffers
    });

    child.stderr.on( 'data', (data :any) => {
        console.log( `stderr: ${data}` );
    } );
    // since these are streams, you can pipe them elsewhere
    // child.stderr.pipe(dest);

    child.on('close', (code:any) => {
      console.log(`child process exited with code ${code}`);
    });
    // this.log(outString)


    // const name = flags.name || 'world'
    // this.log(`hello ${name} from ./src/commands/react-component.ts!`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
  }
}

export = ReactComponent
