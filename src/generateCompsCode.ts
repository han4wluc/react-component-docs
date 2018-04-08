
import fs = require('fs');



const uniqueCompNames : string[] = [];

const generateCompsCode : Function = (path: string, name: string) => {
  const components : any[] = [];
  let outString = '';

  const fullPath = process.cwd() + '/' + path;
  let files = fs.readdirSync(path);

  // console.warn('path', path);
  // console.warn('files', files);

  files.map((fileName : string) => {
    try {
      // const Comp = require('./sadf')
      console.warn('filepath', process.cwd() + '/' + path + '/' + fileName)
      const Comp = require(process.cwd() + '/' + path + '/' + fileName);
      const rawCompName = fileName.replace('.js', '');
      let compName = rawCompName;

      // prevent collistion fo components with the same name
      while(uniqueCompNames.indexOf(compName) !== -1){
        compName += 'A';
      }
      uniqueCompNames.push(compName);

      const propExamples = Comp.default.propExamples;
      if (propExamples) {
        const out = {
          fileName: fileName,
          component: `___${compName}___`,
          // propExamples: Comp.default.propExamples,
          // deprecated: !!Comp.default.deprecated
        };
        outString += `import ${compName} from '${fullPath}/${rawCompName}';`;
        components.push(out);
      }
    } catch (error) {
      // console.warn(error)
    }
  });
  outString += `const ${name} =`;
  outString += JSON.stringify(components) + ';';
  outString = outString.replace(/\"___/g, '').replace(/___\"/g, '');

  return outString;
}

export default generateCompsCode;
