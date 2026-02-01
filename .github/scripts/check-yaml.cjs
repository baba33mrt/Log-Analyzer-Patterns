const fs = require("fs");
const yaml = require("js-yaml");
const glob = require("glob");

const SNAKE_CASE_REGEX = /^[a-z][a-z0-9_]*$/;

let hasError = false;
const parsedFiles = [];

function checkKeys(obj, file, path = "") {
  if (typeof obj !== "object" || obj === null) return;

  for (const key of Object.keys(obj)) {
    const fullPath = path ? `${path}.${key}` : key;

    if (!SNAKE_CASE_REGEX.test(key)) {
      console.error(
        `❌ ${file} → clé invalide "${fullPath}" (snake_case requis)`
      );
      hasError = true;
    }

    checkKeys(obj[key], file, fullPath);
  }
}

const files = glob.sync("**/*.{yml,yaml}", {
  ignore: ["node_modules/**"]
});

if (files.length === 0) {
  console.log("ℹ️ Aucun fichier YAML trouvé");
  process.exit(0);
}

for (const file of files) {
  try {
    const content = fs.readFileSync(file, "utf8");
    const data = yaml.load(content);

    checkKeys(data, file);

    parsedFiles.push({
      file,
      data
    });
  } catch (err) {
    console.error(`❌ Erreur YAML dans ${file}`);
    console.error(err.message);
    hasError = true;
  }
}

if (hasError) {
  console.error("\n⛔ Validation YAML échouée");
  process.exit(1);
}

/**
 * OUTPUT FINAL
 * Tu peux le parser dans un autre step GitHub Actions
 */
console.log(JSON.stringify(parsedFiles, null, 2));
