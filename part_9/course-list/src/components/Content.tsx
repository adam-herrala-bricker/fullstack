import Part from './Part'
import { CoursePart } from '../types';

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
    return (
        <div>
            {courseParts.map(i =>
                <div key = {i.name} className='content-group'>
                    <div><b>{i.name} {i.exerciseCount}</b></div>
                    <Part part = {i} />
                </div> 
                )}
        </div>
    );
};

export default Content;