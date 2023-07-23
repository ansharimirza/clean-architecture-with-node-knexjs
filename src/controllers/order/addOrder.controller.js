const {
    Response
} = require('../../frameworks/common');

module.exports = dependencies => {
    const {
        useCases: {
            order: {
                addOrderUseCase
            }
        }
    } = dependencies;

    const addOrder = async (req,res,next)  => {
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

            const addOrder = await addOrderUseCase(dependencies);
            const response = await addOrder.execute({
                id,
                userId,
                productsIds,
                date,
                isPayed,
                meta
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

    return addOrder;
}