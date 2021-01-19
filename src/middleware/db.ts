import mongoose from 'mongoose';

const db = () =>
	new Promise<typeof mongoose>((resolve, reject) => {
		mongoose.connect(
			process.env.ATLAS_URI ?? '',
			{ useNewUrlParser: true, useUnifiedTopology: true },
			err => {
				if (err) {
					reject(err);
				} else {
					resolve(mongoose);
				}
			}
		);
	});

export default db;
