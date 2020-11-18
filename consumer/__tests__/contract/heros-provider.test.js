import { Matchers } from '@pact-foundation/pact';
import { getHeroesList } from '../../src/api';

const { eachLike, like } = Matchers;

describe('Heroes API Contracts', () => {
  let antiMage = { 
    id: 1,
    name: "Anti-Mage",
    attack_type: "Melee",
    roles: [
      "Carry",
      "Escape",
      "Nuker"
    ]
  };

  afterEach(() => provider.verify());

  describe('GET Heroes', () => {
    beforeEach(async () => {
      const interaction = {
        state: 'i have a list of heroes',
        uponReceiving: 'a request for all heroes',
        withRequest: {
          method: 'GET',
          path: '/heroes',
          headers: {
            Accept: 'application/json, text/plain, */*',
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: {
            data: eachLike({
              id: antiMage.id,
              name: antiMage.name,
              attack_type: antiMage.attack_type,
              roles: eachLike(like(antiMage.roles[0])),
            }),
          },
        },
      }
      return provider.addInteraction(interaction);
    });

    it('When response finished, expect to return correct body, header and status', async () => {
      const response = await getHeroesList();
      expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
      expect(Object.keys(response.data.data[0])).toEqual(['id', 'name', 'attack_type', 'roles']);
      expect(response.status).toEqual(200);
    });
  });
});
