import pactum from 'pactum';
import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';

describe('Postman Echo API - Multiple Requests', () => {
  const p = pactum;
  const baseUrl = 'https://postman-echo.com';

  // POST #1 - send user data and expect it echoed back
  it('POST /post - echo user data', async () => {
    const payload = {
      user: faker.internet.userName(),
      email: faker.internet.email()
    };

    await p
      .spec()
      .post(`${baseUrl}/post`)
      .withJson(payload)
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({
        data: payload
      });
  });

  // POST #2 - send message and verify response
  it('POST /post - echo message data', async () => {
    const payload = {
      message: faker.lorem.sentence(),
      id: faker.string.uuid()
    };

    await p
      .spec()
      .post(`${baseUrl}/post`)
      .withJson(payload)
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({
        data: payload
      });
  });

  // GET #1 - simple get with query params and expect echoed args
  it('GET /get - with query params', async () => {
    const query = {
      search: faker.lorem.word(),
      page: '1'
    };

    await p
      .spec()
      .get(`${baseUrl}/get`)
      .withQueryParams(query)
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({
        args: query
      });
  });

  // GET #2 - get with different query params
  it('GET /get - with different query params', async () => {
    const query = {
      category: 'books',
      limit: '10'
    };

    await p
      .spec()
      .get(`${baseUrl}/get`)
      .withQueryParams(query)
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({
        args: query
      });
  });

  // PUT - update with json body and expect echoed data
  it('PUT /put - update resource', async () => {
    const updateData = {
      title: faker.lorem.words(3),
      completed: faker.datatype.boolean()
    };

    await p
      .spec()
      .put(`${baseUrl}/put`)
      .withJson(updateData)
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({
        data: updateData
      });
  });
});
