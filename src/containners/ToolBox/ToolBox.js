import React, { Component } from 'react';
import classes from './Toolbox.module.css';

import groundingImage from '../../assests/images/activities/grounding.png';
import brainstormingImage from '../../assests/images/activities/brainstorming.png';
import musicImage from '../../assests/images/activities/music.png';
import meditationImage from '../../assests/images/activities/meditation.png';
import movementImage from '../../assests/images/activities/movement.png';
import rescueImage from '../../assests/images/activities/rescue.png';
import journalImage from '../../assests/images/activities/journal.png';
import affirmationsImage from '../../assests/images/activities/affirmations.png';
import comfortImage from '../../assests/images/activities/comfort.png';
import toolboxImage from '../../assests/images/activities/toolbox.png';

import Activity from '../../components/Activity/Activity';
import Input from '../../components/Input/Input';
import getComponentDeltaPoints from '../../utility';

class ToolBox extends Component {

    state = {
        selectedActivities: [],
        allActivities: [
            { imageSource: groundingImage, title: "Grounding", /*position: { left: '5%', top: '0%' }*/ },
            { imageSource: brainstormingImage, title: "Brainstorming", /*position: { left: '7%', top: '65%' } */ },
            { imageSource: musicImage, title: "Music", /*position: { left: '20%', top: '45%' } */ },
            { imageSource: meditationImage, title: "Meditation", /*position: { left: '32%', top: '15%' } */ },
            { imageSource: movementImage, title: "Movement", /*position: { left: '45%', top: '30%' } */ },
            { imageSource: rescueImage, title: "Rescue", /*position: { right: '32%', top: '15%' } */ },
            { imageSource: journalImage, title: "Journaling", /*position: { right: '20%', top: '45%' } */ },
            { imageSource: affirmationsImage, title: "Affirmations", /*position: { right: '7%', top: '65%' } */ },
            { imageSource: comfortImage, title: "Comfort Objects", /*position: { right: '5%', top: '0%' } */ },
        ],
        toolBoxDeltaPoints: {
            x: 0,
            y: 0,
            height: 0,
            width: 0,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },
        itemsToSelect: 5
    }

    // Store toolbox position in state
    setToolBoxDeltaPoints = () => {
        const currentDeltaPoints = getComponentDeltaPoints(this.toolboxRef);
        this.setState({ toolBoxDeltaPoints: currentDeltaPoints });
    }


    // To check if an item falls nearby to the toolbox
    checkItemInBox = (deltaPointsOfItem, name) => {
        if (name === '') return;
        let diffX = Math.abs(deltaPointsOfItem.x - this.state.toolBoxDeltaPoints.x);
        let diffY = Math.abs(deltaPointsOfItem.y - this.state.toolBoxDeltaPoints.y);
        console.log(diffX, diffY)
        if (diffY <= (this.state.toolBoxDeltaPoints.height * 2 / 3) &&
            diffX <= (this.state.toolBoxDeltaPoints.width * 1.5 / 3)) {
            this.selectActivity(name);
        } else {
            this.deSelectActivity(name);
        }
    }

    // Add item to toolbox
    selectActivity = (name) => {
        if (!this.state.selectedActivities.includes(name)) {
            this.setState(prevState => {
                return {
                    selectedActivities: this.state.selectedActivities.concat(name),
                    itemsToSelect: prevState.itemsToSelect - 1
                }
            });
        }
    }

    // Remove item from toolbox
    deSelectActivity = (name) => {
        if (this.state.selectedActivities.includes(name)) {
            this.setState(prevState => {
                return {
                    selectedActivities: this.state.selectedActivities.filter(act => act !== name),
                    itemsToSelect: prevState.itemsToSelect + 1
                }
            });
        }
    }

    // Listener to update  the position of toolbox on window resize
    componentDidMount() {
        window.addEventListener('resize', this.setToolBoxDeltaPoints);
        this.setToolBoxDeltaPoints(this.toolboxRef);
    }

    // Cleanup
    componentWillUnmount() {
        window.removeEventListener('resize', this.setToolBoxDeltaPoints);
    }

    // Won't br required
    componentDidUpdate() {
        console.log(this.state.selectedActivities)
    }

    render() {
        let activities = this.state.allActivities.map((activity, index) => {
            return <Activity
                key={index}
                imageSource={activity.imageSource}
                title={activity.title}
                position={activity.position}
                checkItemInBox={this.checkItemInBox}
                shouldDrag={this.state.itemsToSelect <= 5 && this.state.itemsToSelect > 0}
                wasSelected={this.state.selectedActivities.includes(activity.title)}
            />
        });

        return (
            <div className={classes.ToolBoxPage}>
                <h1 className={classes.Title}>Select any {this.state.itemsToSelect}</h1>
                <div className={classes.Content}>
                    <div className={classes.ActivityBox}>
                        {activities}
                        <Input
                            checkItemInBox={this.checkItemInBox}
                            shouldDrag={this.state.itemsToSelect <= 5 && this.state.itemsToSelect > 0}
                            deSelect={this.deSelectActivity}
                            // position={{ left: "-20%", top: "30%" }}
                        />
                        <Input checkItemInBox={this.checkItemInBox}
                            shouldDrag={this.state.itemsToSelect <= 5 && this.state.itemsToSelect > 0}
                            deSelect={this.deSelectActivity}
                            // position={{ left: "0%", top: "5%" }}
                        />
                        <Input checkItemInBox={this.checkItemInBox}
                            shouldDrag={this.state.itemsToSelect <= 5 && this.state.itemsToSelect > 0}
                            deSelect={this.deSelectActivity}
                            // position={{ right: "-20%", top: "30%" }}
                        />
                    </div>
                    <div ref={ref => this.toolboxRef = ref} className={classes.ToolBox}>
                        <img src={toolboxImage} alt="Toolbox" />
                    </div>
                </div>
            </div>
        );
    }
}
export default ToolBox;