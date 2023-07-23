const {
    Response
} = require('../../frameworks/common');

module.exports = dependencies => {
    const {
        useCases: {
            product: {
                addProductUseCase
            }
        }
    } = dependencies;

    const addProduct = async (req,res,next)  => {
        try {
            const {
                body = {}
            } = req;

            const {
                id,
                name,
                description,
                images,
                price,
                color,
                meta
            } = body;

            const addProduct = await addProductUseCase(dependencies);
            const response = await addProduct.execute({
                id,
                name,
                description,
                images,
                price,
                color,
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

    return addProduct;
}