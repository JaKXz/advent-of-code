import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";

const __dirname = dirname(new URL(import.meta.url).pathname);

export async function input(fileUrl, year = basename(dirname(fileUrl))) {
  const day = basename(fileUrl).replace(".js", "");
  const filePath = join(__dirname, `../${year}/${day}.txt`);
  if (existsSync(filePath)) {
    return readFileSync(filePath).toString();
  }

  const download = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers: {
        cookie: `session=${process.env.AOC_SESSION}`,
        "User-Agent":
          "github.com/jakxz/advent-of-code by JaKXz@users.noreply.github.com",
      },
    }
  ).catch((err) => {
    console.error(err.stack);
    return Response.error();
  });

  const result = (await download.text()).trim();
  if (download.ok) {
    writeFileSync(filePath, result);
  }
  return result;
}
