import { CoursePart } from '../types'

const Part = ({part}: {part: CoursePart}) => {
    //helper function for exhaustive type checking
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    //helper function for formatting array to string
    const arrayToString = (arr: string[]): string => {
        return(
            arr.reduce((accumulator: string, element: string) => {
                return accumulator + ', ' +  element;
            })
        );
    };

    switch (part.kind) {
        case "basic":
            return(
                <div>
                    <i>{part.description}</i>
                </div>
            )
        case "group":
            return(
                <div>
                    project exercises: {part.groupProjectCount}
                </div>
            )
        case "background":
            return(
                <div>
                    <i>{part.description}</i>
                    <div>background material: {part.backgroundMaterial}</div>
                </div>
            )
        case "special":
            return(
                <div>
                    <i>{part.description}</i>
                    <div>required skills: {arrayToString(part.requirements)}</div>
                </div>
            )
        default:
            return assertNever(part)
    }
};

export default Part