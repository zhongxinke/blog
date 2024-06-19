import fg from "fast-glob";
import fs from "fs-extra";
import { resolve, join, relative } from "node:path";
import { packages } from "../../../meta/packages";
import type { CoreFunction, PackageIndexes } from "../type";

export const DIR_PACKAGE = resolve(__dirname, "..");
export const DIR_ROOT = resolve(__dirname, "../../..");
export const DIR_SRC = resolve(DIR_ROOT, "packages");

export async function listFunctions(dir: string, ignore: string[] = []) {
  const files = await fg("*", {
    onlyDirectories: true,
    cwd: dir,
    ignore: ["_*", "dist", "node_modules", ...ignore]
  });

  // files.sort();
  return files.sort((a, b) => {
    const isAChinese = /[\u4e00-\u9fa5]/.test(a);
    const isBChinese = /[\u4e00-\u9fa5]/.test(b);

    if (isAChinese && !isBChinese) {
      return 1; // 'a' 是中文且 'b' 不是中文，'a' 应该在 'b' 后面
    } else if (!isAChinese && isBChinese) {
      return -1; // 'b' 是中文且 'a' 不是中文，'a' 应该在 'b' 前面
    } else {
      return a.localeCompare(b, "zh-CN"); // 都是中文或者都是英文，按照默认排序规则
    }
  });
}

export async function readMetadata(info: (typeof packages)[number]) {
  const indexes: PackageIndexes = {
    packages: {},
    functions: []
  };

  const dir = join(DIR_SRC, info.name);
  const files = await listFunctions(dir);

  const pkg = {
    ...info,
    dir: relative(DIR_ROOT, dir).replace(/\\/g, "/")
  };
  indexes.packages = pkg;

  for (const fnName of files) {
    const fn: CoreFunction = {
      name: fnName,
      package: pkg.name
    };

    const childFiles = await listFunctions(join(DIR_SRC, info.name, fnName));
    if (childFiles.length) {
      fn.children = [];
      for (const childName of childFiles) {
        fn.children.push({
          name: childName,
          package: pkg.name + "/" + fnName
        });
      }
    }
    indexes.functions.push(fn);
  }
  // await Promise.all(

  // );

  return indexes;
}

async function run() {
  // 分packages，生成多个json文件
  for (const info of packages) {
    const indexes = await readMetadata(info);
    await fs.writeJSON(
      join(DIR_PACKAGE + "/json", `/${info.name}.json`),
      indexes,
      {
        spaces: 2
      }
    );
  }
}

run();
