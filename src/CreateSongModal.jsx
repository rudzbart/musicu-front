import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Button } from 'react-bootstrap'
import './App.css';
import SongService from "./SongService";

const CreateSongModal = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);
    const [artist, setArtist] = useState();
    const [title, setTitle] = useState();
    const [spotifyuri, setSpotifyUri] = useState();

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true)
    };

    useImperativeHandle(ref, () => {
        return {
            handleShow: handleShow
        };
    });

    const submit = () => {
        let song = {artist: artist, title: title, spotifyuri: spotifyuri}
        SongService.createSong(song).then(res=> {
            if(res.status === 201){
                handleClose();
                window.location.reload();
            }
            else(alert("Server did not respond with status code 201"))
        })
        handleClose();
    };

    const changeArtistHandler = (event) => {
        setArtist(event.target.value);
    }

    const changeTitleHandler = (event) => {
        setTitle(event.target.value);
    }

    const changeSpotifyUriHandler = (event) => {
        setSpotifyUri(event.target.value);
    }

    return (
        <>
            <Modal centered={true} show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" >
                <Modal.Header closeButton id="modal-header">
                    <Modal.Title id="contained-modal-title-vcenter">Add New Song</Modal.Title>
                </Modal.Header>
                <Modal.Body id="modal-body">
                    <form>
                        <input type="text" name="artist" placeholder="Artist" value={artist} onChange={changeArtistHandler}/>
                        <br/>
                        <input className="modal-input" type="text" name="title" placeholder="Title" value={title} onChange={changeTitleHandler}/>
                        <br/>
                        <input className="modal-input" type="text" name="spotifyuri" placeholder="Spotify URI" value={spotifyuri} onChange={changeSpotifyUriHandler}/>
                    </form>
                </Modal.Body>
                <Modal.Footer id="modal-footer">
                    <Button variant="success" onClick={submit}>
                        Add
          </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Close
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

});

export default CreateSongModal;