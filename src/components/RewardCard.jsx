import React from 'react';
import { useDrag } from 'react-dnd';
import { CardContext } from '../App'
import { useContext } from 'react';

const RewardCard = ({ index, dragged, cIndex }) => {

    const { removeReward } = useContext(CardContext)

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: `card${index}`,
            id: index,
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });
    return (<div ref={drag} className="card p-3">
        {dragged?<div onClick={()=>{
            removeReward(cIndex, index)
        }} >x</div>:null}
        R{index}</div>)
}

export default RewardCard;