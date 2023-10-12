const Total = ({courseParts}: {courseParts: {name: string, exerciseCount: number}[]}) => {
    return (
        <b>
            Number of exercises:{" "}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </b>
    );
};

export default Total;