import create from './create/create';
import { program } from 'commander'
import serve from './bundle/serve';
import build from './bundle/build';

export async function cli(args) {
    program.version("v0.1.0")

    program
        .command("create", {
            isDefault: true,
        })
        .description("create a new project")
        .action(create)

    program
        .command("serve [file]")
        .description("starts a development server")
        .action(serve)
    
    program
        .command("build [file]")
        .description("bundles for production")
        .action(build)

    program.parse(args)
}