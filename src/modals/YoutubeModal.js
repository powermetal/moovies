import React from 'react';
import Youtube from 'react-youtube';
import Modal from '@material-ui/core/Modal'
import './youtubeModal.css';
import CancelIcon from '@material-ui/icons/Cancel';

const YoutubeModal = (props) => {
    const opts = {
        width: '1280px',
        height: '800px'
    }
    return (
        <Modal disableAutoFocus disableEnforceFocus open={props.open} onClose={props.onClose}>
            <div className="modal-yt">
                <div className="modal-yt__header">
                    <h3>{props.title}</h3>
                    <CancelIcon onClick={props.onClose} />
                </div>
                <Youtube opts={opts} videoId={props.videoId}></Youtube>
            </div>
        </Modal >

    )
}

export default YoutubeModal
