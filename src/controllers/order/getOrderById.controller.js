const {Response} = require('../../frameworks/common');

module.exports = dependencies => {
    const {
        useCases: {
            order: {
                getOrderByIdUseCase
            }
        }
    } = dependencies;

    return async (req,res,next)  => {
        try {
            const {
                params = {}
            } = req;

            const {
                id
            } = params;

            const getOrderById = await getOrderByIdUseCase(dependencies);
            const response = await getOrderById.execute({
                id
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