import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import SongService from './SongService';
import './MusicListComponent.css';
import CreateSongModal from "./CreateSongModal";
import UpdateSongModal from "./UpdateSongModal";
import SpotifyPlayer from 'react-spotify-player';




function MusicListComponent(props) {

    const ref = useRef(null);
    const updateRef = useRef(null);

    const size = {
        width: '100%',
        height: 200,
    };
    const view = 'list'; // or 'coverart'
    const theme = 'black'; // or 'white'

    const [uri, setUri] = useState();

    const [songs, setSongs] = useState([]);
    const { SearchBar } = Search;

    const buttons = (row) => (
        <>
            <button onClick={() => { updateRef.current.handleShow(row)}} className="btn btn-primary" id="editButton">Edit</button>
            <button onClick={() => { deleteSong(row.id) }} className="btn btn-danger" id="deleteButton">Delete</button>
            <button onClick={() => { setSong(row.spotifyuri) }} className="btn btn-success" id="deleteButton">Play</button>
        </>
    )

    const setSong = (spotifyuri) => {
        setUri(spotifyuri);
        console.log(uri);
        
    }

    const deleteSong = (id) => {
        SongService.deleteSong(id);
        window.location.reload();
    }

    const columns = [{
        dataField: 'id',
        text: 'ID',
        headerStyle: (colum, colIndex) => {
            return { color: "#282c34", textAlign: 'center' };
        }
    }, {
        dataField: 'artist',
        text: 'Artist',
        headerStyle: (colum, colIndex) => {
            return { color: "#282c34", textAlign: 'center' };
        }
    }, {
        dataField: 'title',
        text: 'Song Title',
        headerStyle: (colum, colIndex) => {
            return { color: "#282c34", textAlign: 'center' };
        }
    }, {
        text: 'DELETE/EDIT',
        isDummyField: true,
        formatter: (cell, row, rowIndex) => {
            return buttons(row);
        },
        headerStyle: (colum, colIndex) => {
            return { color: "#282c34", width: "32%", textAlign: 'center' };
        }
    }];

    useEffect(() => {
        SongService.getSongs().then((res) => {
            setSongs(res.data);
            console.log(res.data);
        });
    }, [setSongs])

    return (
        <div id="containerSongList">

            <div id="modalContent">
                <CreateSongModal ref={ref} />
                <UpdateSongModal ref={updateRef} />
            </div>
            <h1 className="text-center">MusicU</h1>
            <div id="wrapper">
                <div className="row">

                    <ToolkitProvider
                        keyField="id"
                        data={songs}
                        columns={columns}
                        search
                    >
                        {
                            props => (
                                <div id="table">
                                    <SearchBar {...props.searchProps}
                                        placeholder="Search..." />
                                    <hr />
                                    <BootstrapTable id="table-bootstrap"
                                        {...props.baseProps}
                                        pagination={paginationFactory()}
                                        hover
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                    <div id="spotify-player">
                    <SpotifyPlayer                        
                        uri={uri}
                        size={size}
                        view={view}
                        theme={theme}
                    />
                </div>
                </div>
                
            </div>
            <button id="addSongButton" className="btn btn-primary" onClick={() => ref.current.handleShow()}>Add Song</button>
        </div>
    );
}

export default MusicListComponent;