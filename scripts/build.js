import { execa } from 'execa';


async function buildAll() {
  await execa('pnpm', ['build'], { cwd: './packages/components'}).then(() => {
    execa('pnpm', ['build'], { cwd: './packages/vue-cms-base-plugin'}).catch((error) => console.error('an error occured during the build.', error))
 })

}

buildAll();