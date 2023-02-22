import { Kind, Static, Type } from '@sinclair/typebox';
import Fastify from 'fastify';
import fetchStockInfo from './feature/fetchStockInfo';
import { StockArray, StockArrayType, User, UserType } from './feature/Types';
import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const runFastify = async () => {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        origin: ['http://localhost:4000', 'http://192.168.1.13:4000'],
    });
    await fastify.register(fastifySwagger);
    await fastify.register(fastifySwaggerUi, {
        routePrefix: '/documentation',
        staticCSP: true,
        transformSpecificationClone: true,
    });

    /**
     * test_post
     */

    fastify.post<{ Body: UserType; Reply: StockArrayType }>(
        '/test_post',
        {
            schema: {
                body: User,
                response: {
                    200: StockArray,
                },
            },
        },
        (req, rep) => {
            const { body: user } = req;
            const stockArray = fetchStockInfo();
            rep.status(200).send(stockArray);
        }
    );

    /**
     * test get, querystring
     */
    const ErrorResponse = Type.Object({
        msg: Type.String(),
    });
    type ErrorResponseType = Static<typeof ErrorResponse>;

    fastify.get<{ Querystring: UserType; Reply: UserType | ErrorResponseType }>(
        '/test_get',
        {
            schema: {
                querystring: User,
                response: {
                    200: User,
                    400: ErrorResponse,
                },
            },
        },
        (req, rep) => {
            const { query: user } = req;
            if (user.name.length < 3) {
                rep.status(400).send({ msg: 'name is too short' });
            } else {
                rep.status(200).send(user);
            }
        }
    );

    /**
     * start fastify
     */
    await fastify.ready();
    fastify.listen({ port: 3000 }, function (err, address) {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    });
};

runFastify();
