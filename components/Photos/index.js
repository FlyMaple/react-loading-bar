import React, { Component } from 'react';
import { connect } from 'react-redux'

const photosStyle = {
    textAlign: 'center'
}

const boxStyle = {
    margin: '0 10px'
}

class Photos extends Component {
    render() {
        return (
            <div id="photos" style={ photosStyle }>
                {
                    this.props.photos.map((photo) => {
                        return <img key={ photo.id } className="box" style={ boxStyle } src={ photo.thumbnailUrl } alt="" />
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        photos: state.reducers.photos
    }
}

export default connect(mapStateToProps)(Photos);