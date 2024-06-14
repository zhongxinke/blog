import fs from "fs-extra";
import sharp from "sharp";
import path from "path";
import { program } from "commander";
const ROOT_PATH = process.cwd();
const CIMG_DATA_NAME = path.resolve(ROOT_PATH, "cimg_data.json");

const options = {
  outputPath: path.join(ROOT_PATH, "images"),
  entryPath: path.join(ROOT_PATH, "images"),
  jqly: 80,
  pqua: 60
};

function outputType(filePath: string) {
  const reg_png = /\.(png)$/i;

  if (filePath.match(reg_png)) {
    return sharp(filePath).png({
      quality: options.pqua
    });
  }
  return sharp(filePath).jpeg({ quality: options.jqly });
}

async function compressImage(filePath: string, fileName: string) {
  try {
    const tempFilePath = filePath.replace(fileName, `temp_${fileName}`);
    const result = await outputType(filePath).toFile(tempFilePath);
    fs.renameSync(tempFilePath, filePath);
    return result;
  } catch (error) {
    console.error(`Error compressing ${filePath}:`, error);
  }
}

function saveCimgData(cache: Record<string, number>) {
  fs.writeFileSync(CIMG_DATA_NAME, JSON.stringify(cache, null, 2), "utf-8");
}

async function processImages() {
  try {
    const files = await fs.readdir(options.entryPath);
    const hasFile = fs.pathExistsSync(CIMG_DATA_NAME);

    const cache = hasFile
      ? JSON.parse(fs.readFileSync(CIMG_DATA_NAME, "utf-8"))
      : {};

    function isCompressed(fileName: string, size: number) {
      return cache[fileName] && +cache[fileName] === size;
    }

    for (const file of files.filter(item => !item.startsWith("."))) {
      const filePath = path.resolve(options.entryPath, file);
      const stat = await fs.stat(filePath);

      if (stat.isFile() && !isCompressed(file, stat.size)) {
        const result = await compressImage(filePath, file);
        cache[file] = result?.size;
      }
    }
    saveCimgData(cache);
  } catch (error) {
    console.error("Error processing images:", error);
  }
}

program
  .version("0.0.1")
  .option("-e, --entry <path>", "输入路径", "images")
  .option("-o, --out <path>", "输出路径", "images")
  .option("-eo, --entryout <path>", "输入输出相同路径")
  .option(
    "--pqua <value>",
    "png压缩质量(0-9)，0表示无压缩，9表示最高压缩比",
    "6"
  )
  .option("--jqly <value>", "jpeg压缩质量(0-100)", "80")
  .action(source => {
    if (source.entryout) {
      options.outputPath = options.entryPath = path.join(
        ROOT_PATH,
        source.entryout
      );
    } else {
      options.entryPath = path.join(ROOT_PATH, source.entry);
      options.outputPath = path.join(ROOT_PATH, source.out);
    }

    options.jqly = +source.jqly;
    options.pqua = +source.pqua;
    processImages();
  })
  .parse();
