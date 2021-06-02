const src = "src/";
const build = "build/"
const files = [
  "flashlight.js",
];
const formats = [
  "es",
  "cjs",
  "iife"
];

function configBuild(formats, file_names) {
  const result = [];
  for (const file of file_names)
    result.push({
      input: `${src}${file}`,
      output: (function(){
        const output_result = [];
        for (const format of formats)
          output_result.push({
            file: `${build}${format}/${file}`,
            format,
            name: "flashlight"
          });
        return output_result;
      })()
    });
  return result;
}

export default configBuild(formats, files);
