import pactum from 'pactum';
import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';

describe('Postman Echo API - Multiple Requests', () => {
  const p = pactum;
  const baseUrl = 'https://postman-echo.com';

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

  it('GET /headers - validate custom headers', async () => {
    const customHeaders = {
      'x-api-key': faker.string.uuid(),
      'x-trace-id': faker.string.uuid()
    };

    await p
      .spec()
      .get(`${baseUrl}/headers`)
      .withHeaders(customHeaders)
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({
        headers: {
          'x-api-key': customHeaders['x-api-key'],
          'x-trace-id': customHeaders['x-trace-id']
        }
      });
  });
  
  it('DELETE /delete - delete resource and expect echoed data', async () => {
    const deleteData = {
      resourceId: faker.number.int()
    };

    await p
      .spec()
      .delete(`${baseUrl}/delete`)
      .withJson(deleteData)
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({
        data: deleteData
      });
  });

  it('POST /post - send form data', async () => {
    const formData = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    };

    const formBody = new URLSearchParams(formData).toString();
  
    await p
      .spec()
      .post(`${baseUrl}/post`)
      .withHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
      .withBody(formBody)
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({
        form: formData
      });
  });

  it('GET /invalid-endpoint - expect 404 Not Found', async () => {
    await p
      .spec()
      .get(`${baseUrl}/invalid-endpoint`)
      .expectStatus(StatusCodes.NOT_FOUND);
  });

  it('POST /post - send empty JSON body', async () => {
    await p
      .spec()
      .post(`${baseUrl}/post`)
      .withJson({})
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({
        data: {}
      });
  });
});
