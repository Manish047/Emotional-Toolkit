const getComponentDeltaPoints = (objectRef) => {
    const { x, y, height, width } = objectRef.getBoundingClientRect();
    return {
        x: (x + (width / 2)).toFixed(0),
        y: (y + (height / 2)).toFixed(0),
        height: height.toFixed(0),
        width: width.toFixed(0),
    };
}

export default getComponentDeltaPoints;