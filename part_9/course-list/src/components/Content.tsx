const Content = ({courseParts}: {courseParts: {name: string, exerciseCount: number}[]}) => {
    return (
        <div>
            {courseParts.map(i => 
                <p key = {i.name}>{i.name} {i.exerciseCount}</p>)}
        </div>
    );
};

export default Content;