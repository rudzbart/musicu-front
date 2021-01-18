import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Button } from 'react-bootstrap'
import './App.css';
import SongService from "./SongService";

const UpdateSongModal = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);
    const [id, setId] = useState();
    const [artist, setArtist] = useState();
    const [title, setTitle] = useState();
    const [spotifyuri, setSpotifyUri] = useState();

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = (row) => {
        setShow(true);
        setId(row.id)
        setArtist(row.artist);
        setTitle(row.title);
        setSpotifyUri(row.spotifyuri)
        console.log(id);
    };

    useImperativeHandle(ref, () => {
        return {
            handleShow: handleShow
        };
    });

    const submit = () => {
        let song = {artist: artist, title: title, spotifyuri: spotifyuri}
        SongService.updateSong(song, id).then(res=> {
            if(res.status === 200){
                handleClose();
                window.location.reload();
            }
            else(alert("Server did not respond with status code 200"))
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
                    <Modal.Title id="contained-modal-title-vcenter">Edit Song</Modal.Title>
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
                        Apply
          </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Cancel
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

});

export default UpdateSongModal;