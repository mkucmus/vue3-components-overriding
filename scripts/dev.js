import { execa } from 'execa';


async function buildAll() {
 await execa('pnpm', ['dev'], { cwd: './templates/vue3'}).stdout.pipe(process.stdout)
}

buildAll();