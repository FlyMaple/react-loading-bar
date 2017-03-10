import React, { Component } from 'react';
import { connect } from 'react-redux'

import '../../../public/css/loadingbar.css'

const initState = {
    percent: 0,
    interValId: null
}

class LoadingBar extends Component {
    constructor(props) {
        super(props)

        this.state = initState
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state) {
            const interValId = setInterval(this.launch, 400)

            this.setState({
                interValId
            })
        } else {
            if (this.state.interValId !== null) {
                this.setState({
                    percent: 100
                })
            }
        }
    }

    launch = () => {
        const { percent } = this.state

        if (percent >= 0 && percent < 100) {
            this.calcLoadingBarPercnet()
        } else if (percent >= 100) {
            clearInterval(this.state.interValId)
            setTimeout(this.clearState, 400)
        }
    }

    calcLoadingBarPercnet = () => {
        const { percent } = this.state
        const newPercent = 10 * Math.cos( percent * (Math.PI / 2 / 100))

        this.setState({
            percent: percent + newPercent
        })
    }

    clearState = () => {
        this.setState(initState)
    }

    getSytle = () => {
        return {
            width: this.state.percent + '%'
        }
    }

    render() {
        const className = (this.state.percent > 0) && (this.state.percent <= 100) ? 'show' : ''
        
        return (
            <div id="loading_bar" className={ className } style={ this.getSytle() }>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.loadingBarReducers
    }
}

export default connect(mapStateToProps)(LoadingBar);