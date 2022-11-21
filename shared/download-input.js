import { basename, dirname } from "path";

export async function input(fileUrl, year = basename(dirname(fileUrl))) {
  return await fetch(
    `https://adventofcode.com/${year}/day/${basename(fileUrl).replace(
      ".js",
      ""
    )}/input`,
    {
      headers: {
        cookie: `session=${
          process.env.AOC_SESSION ||
          "53616c7465645f5f99771a9db047fe76c5fd7c2d6ddc0a78b789fe5bcc9c2130f71cf1de67a2431f77d3d096c646f9f8fe46d5999e11597c0a3730ed119272d7"
        }`,
      },
    }
  )
    .then((res) => res.text())
    .then((text) => text.trim());
}
