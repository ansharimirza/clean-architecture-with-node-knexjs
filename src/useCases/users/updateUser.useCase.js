
module.exports = dependencies => {
    const {
        usersRepository
    } = dependencies;

    if (!usersRepository) {
        throw new Error('The user repository should be exists in dependencies');
    }

    const execute = ({
        user = {}
    }) => {
        return usersRepository.update(user);
    }

    return {
        execute
    }
}

