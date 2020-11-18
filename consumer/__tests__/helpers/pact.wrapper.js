jasmine.getEnv().defaultTimeoutInterval = 30000;

beforeAll(() => provider.setup());

afterAll(() => provider.finalize());
