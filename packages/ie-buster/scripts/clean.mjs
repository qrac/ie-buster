import { rmSync } from "node:fs"

for (const directory of ["dist", "lib", "types"]) {
  rmSync(new URL(`../${directory}`, import.meta.url), { recursive: true, force: true })
}
