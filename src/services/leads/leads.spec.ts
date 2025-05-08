import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../app.module';
import * as request from 'supertest';

describe('Lead GraphQL API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
  });

  it('should register a new lead', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        mutation {
          register(input: {
            name: "Jan Pogi",
            email: "jan@example.com",
            mobile: "09561234567",
            postcode: "2000",
            services: ["delivery", "payment"]
          }) {
            id
            name
            email
            services {
              type
            }
          }
        }
      `,
      });

    expect(res.status).toBe(200);
    const data = res.body.data.register;
    expect(data.name).toBe('Jan Pogi');
    expect(data.email).toBe('jan@example.com');
    expect(data.services.length).toBe(2);
    expect(data.services[0].type).toBeDefined();
  });

  it('should fetch all leads', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        query {
          leads {
            id
            name
            email
            services {
              type
            }
          }
        }
      `,
      });

    expect(res.status).toBe(200);
    const leads = res.body.data.leads;
    expect(Array.isArray(leads)).toBe(true);
    expect(leads.length).toBeGreaterThan(0);
  });

  it('should fetch a lead by id', async () => {
    const res1 = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        query {
          leads {
            id
          }
        }
      `,
      });

    const leadId = res1.body.data.leads[0].id;

    const res2 = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        query {
          lead(id: ${leadId}) {
            id
            name
            services {
              type
            }
          }
        }
      `,
      });

    expect(res2.status).toBe(200);
    const lead = res2.body.data.lead;
    expect(lead.id).toBe(leadId);
    expect(lead.services.length).toBeGreaterThan(0);
  });

  it('should return validation errors for invalid input', async () => {
    const res3 = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            register(input: {
              name: "",
              email: "not-an-email",
              mobile: "invalid-number",
              postcode: "XYZ",
              services: ["invalid-service"]
            }) {
              id
            }
          }
        `,
      });

    expect(res3.status).toBe(200); // GraphQL always returns 200 even on validation errors
    const errors = res3.body.errors[0];
    expect(errors).toBeDefined();
    const messages = errors.extensions.originalError.message;
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.stringContaining('Invalid email address'),
        expect.stringContaining('Name is required'),
        expect.stringContaining('Invalid mobile number'),
        expect.stringContaining('Invalid postcode'),
        expect.stringContaining('Service must be one of'),
      ]),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
