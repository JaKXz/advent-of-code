import { basename, dirname } from "node:path";
import { writeFileSync, readFileSync, existsSync } from "node:fs";

export async function input(fileUrl, year = basename(dirname(fileUrl))) {
  const day = basename(fileUrl).replace(".js", "");
  const filePath = `../${year}/${day}.txt`;
  if (existsSync(filePath)) {
    return readFileSync(filePath).toString();
  }

  const download = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers: {
        cookie: `session=${
          process.env.AOC_SESSION ||
          "53616c7465645f5f99771a9db047fe76c5fd7c2d6ddc0a78b789fe5bcc9c2130f71cf1de67a2431f77d3d096c646f9f8fe46d5999e11597c0a3730ed119272d7"
        }`,
      },
    }
  );

  const result = (await download.text()).trim();
  if (download.ok) {
    writeFileSync(filePath, result);
  }
  return result;
}
