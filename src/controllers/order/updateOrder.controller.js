const {
    Response
} = require('../../frameworks/common');

module.exports = dependencies => {
    const {
        useCases: {
            order: {
                updateOrderUseCase
            }
        }
    } = dependencies;

    return async (req,res,next)  => {
        try {
            const {
                body = {}
            } = req;

            const {
                id,
                userId,
                productsIds,
                date,
                isPayed,
                meta
            } = body;

            const updateOrder = await updateOrderUseCase(dependencies);
            const response = await updateOrder.execute({
                order : {
                    id,
                    userId,
                    productsIds,
                    date,
                    isPayed,
                    meta
                }
            });

            res.json(new Response({
                status:true,
                content:response
            }));

            next();

        } catch (error) {
            next(error);
        }
    }
}