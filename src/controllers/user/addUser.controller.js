const {
    Response
} = require('../../frameworks/common');

module.exports = dependencies => {
    const {
        useCases: {
            user: {
                addUserUseCase
            }
        }
    } = dependencies;

    const addUser = async (req,res,next)  => {
        try {
            const {
                body = {}
            } = req;

            const {
                id,
                name,
                lastName,
                gender,
                meta
            } = body;

            const addUser = await addUserUseCase(dependencies);
            const response = await addUser.execute({
                id,
                name,
                lastName,
                gender,
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

    return addUser;
}