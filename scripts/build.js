import { execa } from 'execa';


async function buildAll() {
 await execa('pnpm', ['build'], { cwd: './packages/components'}).stdout.pipe(process.stdout)
 await execa('pnpm', ['build'], { cwd: './packages/vue-cms-base-plugin'}).stdout.pipe(process.stdout)
}

buildAll();