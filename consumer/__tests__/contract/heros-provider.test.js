import { getHeroesList } from '../../src/api';

describe('Heroes API Contracts', () => {
  let GET_EXPECTED_LIST_BODY = { 
    data: [
      {
        id: 1,
        name: "Anti-Mage",
        attack_type: "Melee",
        roles: [
          "Carry",
          "Escape",
          "Nuker"
        ]
      },
      {
        id: 2,
        name: "Axe",
        attack_type: "Melee",
        roles: [
          "Initiator",
          "Durable",
          "Disabler",
          "Jungler"
        ]
      },
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
          body: GET_EXPECTED_LIST_BODY,
        },
      }
      return provider.addInteraction(interaction);
    });

    it('When response finished, expect to return correct body, header and status', async () => {
      const response = await getHeroesList();
      // expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
      expect(response.data).toEqual(GET_EXPECTED_LIST_BODY);
      expect(response.status).toEqual(200);
    });
  });
});
