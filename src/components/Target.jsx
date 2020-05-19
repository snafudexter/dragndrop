import React from 'react'
import { useDrop } from 'react-dnd';
import { useContext } from 'react';
import {CardContext} from '../App'
import RewardCard from './RewardCard';

const Target = (props) => {

    const {addReward} = useContext(CardContext)

    const [{ isOver }, drop] = useDrop({
		accept: `card${props.rIndex}`,
		drop: (item, monitor) => addReward(props.cIndex, props.rIndex),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
    });
    return (<div ref={drop} className={props.item.reward?'':"p-3"}>
        {props.item.reward?<RewardCard index={props.item.reward} dragged cIndex={props.cIndex} />:null}
    </div>)

}

export default Target