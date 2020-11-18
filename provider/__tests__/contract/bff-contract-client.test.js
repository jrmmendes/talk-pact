import { Verifier } from '@pact-foundation/pact';
import { provider } from '../../src/provider';

describe('Heroes BFF Contract Verification', () => {
  const SERVER_URL = "http://localhost:3001"
  provider.listen(3001);

  it('Validates the expectations of Heroes BFF', () => {
    const options = {
      provider: "Dota Heroes API",
      logLevel: "DEBUG",
      pactBrokerUrl: 'http://localhost:9292',
      providerBaseUrl: SERVER_URL,
      consumerVersionTags: ["main"],
      providerVersionTags: ["main"],
      publishVerificationResult: true,
      providerVersion: "1.0.1",
    };

    return new Verifier(options)
      .verifyProvider()
      .then((output) => {
        console.log("Pact Verification Complete!")
        console.log(output)
      });
  });
});
