import React, { Component } from 'react';
import classes from './Input.module.css';
import Draggable from 'react-draggable';

import getComponentDeltaPoints from '../../utility';

class Input extends Component {

    state = {
        value: '',
        isValid: false,
        deltaPoints: {
            x: 0,
            y: 0,
            height: 0,
            width: 0,
        },
    }

    // On Input change
    inputChangeHandler = (event) => {
        if (event.target.value.length > 0) {
            this.setState({ isValid: true, value: event.target.value });
        } else {
            this.setState({ isValid: false, value: event.target.value });
        }
    }

    // Delete Input data
    cancelActivityHandler = () => {
        this.props.deSelect(this.state.value);
        this.setState({ isValid: false, value: '' });
    }

    // Store position data in state
    setInputDeltaPoints = () => {
        const currentDeltaPoints = getComponentDeltaPoints(this.inputElRef);
        this.setState({ deltaPoints: currentDeltaPoints });
    };

    // Whether Input component should drag or not
    onDragStart = () => {
        if (this.props.shouldDrag) {
            return true;
        } else {
            return false;
        }
    }

    // Whether to 'add' Input data in the list of selected activities
    onDragStop = () => {
        if (this.props.shouldDrag) {
            return this.props.checkItemInBox(this.state.deltaPoints, this.state.value);
        }
        else {
            return false;
        }
    }

    // Set deltapoints initially and on window resize 
    componentDidMount() {
        window.addEventListener('resize', this.setActivityDeltaPoints);
        const currentDeltaPoints = getComponentDeltaPoints(this.inputElRef);
        this.setState({ deltaPoints: currentDeltaPoints });
    }

    // Cleanup
    componentWillUnmount() {
        window.removeEventListener('resize', this.setActivityDeltaPoints);
    }

    render() {
        return (
            <Draggable
                cancel="strong"
                onStart={this.onDragStart}
                onDrag={this.setInputDeltaPoints}
                onStop={this.onDragStop}
            >
                <div className={classes.Content}>
                    <div className={classes.Input} ref={ref => this.inputElRef = ref} style={{ ...this.props.position }}>
                        <div className={classes.NoDraggableArea}>
                            <strong>
                                <input ref={ref => this.inputRef = ref} onChange={this.inputChangeHandler} value={this.state.value} placeholder="Create your own!" />
                                <button disabled={!this.state.isValid} onClick={this.cancelActivityHandler}><i className={["fas", "fa-times"].join(' ')}></i></button>
                            </strong>
                        </div>
                    </div>
                </div>
            </Draggable>
        );
    }
}
export default Input;