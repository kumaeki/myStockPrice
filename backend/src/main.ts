import { Static, Type } from '@sinclair/typebox';
import Fastify from 'fastify';
import fetchStockInfo from './feature/fetchStockInfo';
import {
    CurrentStockPriceArray,
    CurrentStockPriceArrayType,
    StockArray,
    StockArrayType,
    StockBrand,
    StockBrandArray,
    StockBrandArrayType,
    StockBrandType,
    StockInfo,
    StockInfoArray,
    StockInfoArrayType,
    StockInfoType,
    StockOrder,
    StockOrderType,
    User,
    UserType,
} from './feature/Types';
import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import {
    insertOneStockInfo,
    insertOneStockOrder,
} from './feature/DBAccess/DBAccess';
import fetchStockInfoFromYahoo, {
    fetchCurrentStockPriceFromYahoo,
} from './feature/fetchStockInfoFromYahoo';

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

    const ResponseMessage = Type.Object({
        msg: Type.String(),
    });

    fastify.post<{ Body: StockBrandArrayType; Reply: StockInfoArrayType }>(
        '/fetchStockInfoFromYahoo',
        {
            schema: {
                body: StockBrandArray,
                response: {
                    200: StockInfoArray,
                    400: ResponseMessage,
                },
            },
        },
        async (req, rep) => {
            const { body: ctockBrandArray } = req;
            const stockInfoArray = fetchStockInfoFromYahoo(ctockBrandArray);
            rep.status(200).send(await stockInfoArray);
        }
    );

    fastify.post<{
        Body: StockBrandArrayType;
        Reply: CurrentStockPriceArrayType;
    }>(
        '/fetchCurrentStockPriceFromYahoo',
        {
            schema: {
                body: StockBrandArray,
                response: {
                    200: CurrentStockPriceArray,
                    400: ResponseMessage,
                },
            },
        },
        async (req, rep) => {
            const { body: ctockBrandArray } = req;
            const currentStockPriceArray =
                fetchCurrentStockPriceFromYahoo(ctockBrandArray);
            rep.status(200).send(await currentStockPriceArray);
        }
    );

    fastify.post<{ Body: null; Reply: StockArrayType }>(
        '/fetchAllStockInfo',
        {
            schema: {
                response: {
                    200: StockArray,
                    400: ResponseMessage,
                },
            },
        },
        async (req, rep) => {
            const stockArray = fetchStockInfo();
            rep.status(200).send(await stockArray);
        }
    );

    fastify.post<{
        Body: StockOrderType;
        Reply: ErrorResponseType;
    }>(
        '/insertStockOrder',
        {
            schema: {
                body: StockOrder,
                response: {
                    200: ResponseMessage,
                    400: ResponseMessage,
                },
            },
        },
        (req, rep) => {
            try {
                const { body: stockOrder } = req;
                insertOneStockOrder(stockOrder);
                rep.status(200).send({ msg: 'inserted successfully' });
            } catch (error) {
                rep.status(400).send({ msg: 'something is going wrong' });
            }
        }
    );

    fastify.post<{
        Body: StockInfoType;
        Reply: ErrorResponseType;
    }>(
        '/insertStockInfo',
        {
            schema: {
                body: StockInfo,
                response: {
                    200: ResponseMessage,
                    400: ResponseMessage,
                },
            },
        },
        (req, rep) => {
            try {
                const { body: stockInfo } = req;
                insertOneStockInfo(stockInfo);
                rep.status(200).send({ msg: 'inserted successfully' });
            } catch (error) {
                rep.status(400).send({ msg: 'something is going wrong' });
            }
        }
    );

    /**
     * test get, querystring
     */

    type ErrorResponseType = Static<typeof ResponseMessage>;

    fastify.get<{ Querystring: UserType; Reply: UserType | ErrorResponseType }>(
        '/test_get',
        {
            schema: {
                querystring: User,
                response: {
                    200: User,
                    400: ResponseMessage,
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
    fastify.listen({ port: 3000 }, function (err) {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    });
};

runFastify();
