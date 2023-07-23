
module.exports = dependencies => {
    const {usersRepository} = dependencies;
    if (!usersRepository) {
        throw new Error('The user repository should be exists in dependencies');
    }

    const execute = ({
        id
    }) => {
        return usersRepository.getById(id);
    }

    return {
        execute
    }
}

