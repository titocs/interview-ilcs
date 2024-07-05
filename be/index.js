const Hapi = require('@hapi/hapi');
const { Pool } = require('pg');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'import_simulation',
	password: 'Fasilkomui50@',
	port: 5432,
});

const init = async () => {
	const server = Hapi.server({
		port: 3000,
		host: 'localhost',
	});

	server.route({
		method: 'POST',
		path: '/simulate-import',
		handler: async (request, h) => {
			const { kode_barang, nilai_komoditas } = request.payload;

			try {
				const uraianResponse = await axios.get(`https://api-hub.ilcs.co.id/my/n/barang?hs_code=${kode_barang}`);
				const uraianBarang = uraianResponse.data.data[0].sub_header + ' ' + uraianResponse.data.data[0].uraian_id || 'Tidak ditemukan';

				const tarifResponse = await axios.get(`https://api-hub.ilcs.co.id/my/n/tarif?hs_code=${kode_barang}`);
				const bm = tarifResponse.data.bm || 0;

				const nilaiBm = (nilai_komoditas * bm) / 100;

				const idSimulasi = uuidv4();
				const query = `
					INSERT INTO simulation_results 
					(id_simulasi, kode_barang, uraian_barang, bm, nilai_komoditas, nilai_bm) 
					VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
				`;
				const values = [idSimulasi, kode_barang, uraianBarang, bm, nilai_komoditas, nilaiBm];
				const result = await pool.query(query, values);

				return h.response(result.rows[0]).code(201);
			} catch (error) {
				console.error(error);
				return h.response({ message: 'Terjadi kesalahan' }).code(500);
			}
		}
	});

	await server.start();
	console.log('Server connected %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();
