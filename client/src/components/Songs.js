import React, { Component } from 'react';
import '../App.css';
const axios = require('axios');

export default class Songs extends Component {
	state = {
		loading : true,
		songs   : []
	};

	async componentDidMount() {
		const token = this.props.access_token;
		for (let i = 0; i <= 49; i += 49) {
			if (this.state.songs.length) {
				this.state.songs.pop();
			}
			const config = {
				headers : {
					Accept         : 'application/json',
					'Content-Type' : 'application/json',
					Authorization  : `Bearer ${token}`
				},
				params  : {
					limit  : 50,
					offset : i
				}
			};

			const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', config);
			this.setState({ loading: false, songs: this.state.songs.concat(response.data.items) });
		}

		// Headers
		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		};

		// Request Body
		const body = JSON.stringify({ songs: this.state.songs });

		// Send songs to database
		const res = await axios.post('/api/users', body, config);
		this.props.updateMongoID(res.data._id);
	}

	render() {
		const songsJsx = this.state.songs.map((song, i) => (
			<div key={song.id} className="song">
				<div>{i + 1}.</div>
				<div>{song.artists[0].name}</div>
				<div>{song.album.name}</div>
				<div>{song.name}</div>
				<img src={song.album.images[0].url} width="100" alt="" />
			</div>
		));

		return <div>{songsJsx}</div>;
	}
}
