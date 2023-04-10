import { Static, Type } from '@sinclair/typebox';
import Fastify from 'fastify';
import fetchStockInfo from './feature/fetchStockInfo';
import { StockArray, StockArrayType } from './feature/Types';
import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fetchStockInfoFromYahoo, {
    CurrentStockInfo,
    CurrentStockInfoType,
    StockBrand,
    StockBrandType,
} from './feature/fetchStockInfoFromYahoo';
import insertStockInfoAndOrder, {
    StockInfoAndOrder,
    StockInfoAndOrderType,
} from './feature/insertStockInfoAndOrder';

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

    fastify.post<{
        Body: StockBrandType;
        Reply: CurrentStockInfoType | ErrorResponseType;
    }>(
        '/fetchStockInfoFromYahoo',
        {
            schema: {
                body: StockBrand,
                response: {
                    200: CurrentStockInfo,
                    400: ResponseMessage,
                },
            },
        },
        async (req, rep) => {
            try {
                const { body: brandCode } = req;
                const brandInfo = fetchStockInfoFromYahoo(brandCode);
                rep.status(200).send(await brandInfo);
            } catch (error) {
                rep.status(400).send({ msg: 'something is going wrong' });
            }
        }
    );

    fastify.post<{ Body: null; Reply: StockArrayType | ErrorResponseType }>(
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
            try {
                const stockArray = fetchStockInfo();
                rep.status(200).send(await stockArray);
            } catch (error) {
                rep.status(400).send({ msg: 'something is going wrong' });
            }
        }
    );

    fastify.post<{
        Body: StockInfoAndOrderType;
        Reply: ErrorResponseType;
    }>(
        '/insertStockInfoAndOrder',
        {
            schema: {
                body: StockInfoAndOrder,
                response: {
                    200: ResponseMessage,
                    400: ResponseMessage,
                },
            },
        },
        (req, rep) => {
            try {
                const { body: wholeStockInfo } = req;
                insertStockInfoAndOrder(wholeStockInfo);
                rep.status(200).send({ msg: 'inserted successfully' });
            } catch (error) {
                rep.status(400).send({ msg: 'something is going wrong' });
            }
        }
    );

    type ErrorResponseType = Static<typeof ResponseMessage>;

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
