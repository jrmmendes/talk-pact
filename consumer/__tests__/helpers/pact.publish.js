const publisher = require("@pact-foundation/pact-node")
const path = require("path")

const opts = {
    pactFilesOrDirs: [path.resolve(process.cwd(), '__tests__', 'contract', 'pacts')],
    pactBroker: "http://localhost:9292",
    consumerVersion: "1.0.1",
    providerVersion: "1.0.1",
    tags: "main"
}

publisher.publishPacts(opts);
