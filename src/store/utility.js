export const updatedObject = (oldState, updatedProperty) => {
    return {
        ...oldState,
        ...updatedProperty
    };
};