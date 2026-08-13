import { spawn, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { access, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const cacheRoot = path.join(tmpdir(), "aquaterra-uz-card-local");
const dependencyMarker = path.join(cacheRoot, ".dependency-signature");

const sourceDirectories = [
  ".openai",
  "app",
  "build",
  "db",
  "drizzle",
  "public",
  "scripts",
  "worker",
];

const sourceFiles = [
  "drizzle.config.ts",
  "eslint.config.mjs",
  "next.config.ts",
  "package-lock.json",
  "package.json",
  "postcss.config.mjs",
  "tsconfig.json",
  "vite.config.ts",
];

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: cacheRoot,
    env: process.env,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

await mkdir(cacheRoot, { recursive: true });

for (const directory of sourceDirectories) {
  const source = path.join(projectRoot, directory);
  const target = path.join(cacheRoot, directory);

  if (await exists(source)) {
    await rm(target, { force: true, recursive: true });
    await cp(source, target, { force: true, recursive: true });
  }
}

for (const file of sourceFiles) {
  const source = path.join(projectRoot, file);
  if (await exists(source)) {
    await cp(source, path.join(cacheRoot, file), { force: true });
  }
}

const dependencySignature = createHash("sha256")
  .update(await readFile(path.join(projectRoot, "package.json")))
  .update(await readFile(path.join(projectRoot, "package-lock.json")))
  .digest("hex");

const cachedSignature = (await exists(dependencyMarker))
  ? (await readFile(dependencyMarker, "utf8")).trim()
  : "";

if (!(await exists(path.join(cacheRoot, "node_modules"))) || cachedSignature !== dependencySignature) {
  console.log("AQUATERRA: один раз подготавливаю быстрый локальный запуск…");
  run("npm", ["ci"]);
  await writeFile(dependencyMarker, dependencySignature);
}

console.log("AQUATERRA: собираю актуальную версию…");
run("npm", ["run", "build"]);

console.log("AQUATERRA: сайт доступен по адресу http://localhost:3000");
const server = spawn(
  "npm",
  ["run", "start", "--", "--host", "127.0.0.1", "--port", "3000", "--strictPort"],
  {
    cwd: cacheRoot,
    env: process.env,
    stdio: "inherit",
  },
);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.kill(signal));
}

server.on("exit", (code) => process.exit(code ?? 0));
