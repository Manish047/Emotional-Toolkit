import React, { Component } from 'react';
import classes from './Activity.module.css';

import Draggable from 'react-draggable'
import getComponentDeltaPoints from '../../utility';

class Activity extends Component {

    state = {
        showLabel: true,
        deltaPoints: {
            x: 0,
            y: 0,
            height: 0,
            width: 0,
        },
    }

    // Store position data in state
    setActivityDeltaPoints = () => {
        const currentDeltaPoints = getComponentDeltaPoints(this.activityRef);
        this.setState({ deltaPoints: currentDeltaPoints });
    };

    // Whether to drag the activity or not
    onDragStart = () => {
        if ((this.props.shouldDrag && !this.props.wasSelected) || this.props.wasSelected) {
            return true;
        } else {
            return false;
        }
    }

    // Whether to 'add' the activity in list of selected activities or not
    onDragStop = () => {
        if ((this.props.shouldDrag && !this.props.wasSelected) || this.props.wasSelected) {
            return this.props.checkItemInBox(this.state.deltaPoints, this.props.title);
        }
        else {
            return false;
        }
    }

    // Set initial delta points and on window resize
    componentDidMount() {
        window.addEventListener('resize', this.setActivityDeltaPoints);
        const currentDeltaPoints = getComponentDeltaPoints(this.activityRef);
        this.setState({ deltaPoints: currentDeltaPoints });
    }

    // Cleanup
    componentWillUnmount() {
        window.removeEventListener('resize', this.setActivityDeltaPoints);
    }

    render() {
        return (
            <Draggable
                onStart={this.onDragStart}
                onDrag={this.setActivityDeltaPoints}
                onStop={this.onDragStop}
                bounds="parent"
            >
                <div ref={ref => this.activityRef = ref} className={classes.Activity} style={{ ...this.props.position }}>
                    <div className={classes.Content}>
                        <div className={classes.ActivityImage}>
                            <img src={this.props.imageSource} alt={this.props.title} />
                        </div>
                        <p className={classes.ActivityTitle}>{this.props.title}</p>
                    </div>
                </div>
            </Draggable >
        );
    }
}

export default Activity;