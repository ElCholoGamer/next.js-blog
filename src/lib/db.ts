import mongoose from 'mongoose';

async function db() {
	if (mongoose.connection.readyState >= 1) return;

	await mongoose.connect(process.env.ATLAS_URI ?? '', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
}

export default db;
