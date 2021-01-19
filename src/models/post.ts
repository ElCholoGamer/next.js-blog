import { Schema, model, Document, models, Model } from 'mongoose';

export interface IPost extends Document {
	_id: string;
	title: string;
	author: string;
	content: string;
	createdAt: number;
}

const PostSchema = new Schema({
	_id: String,
	title: { type: String, required: true, minlength: 1, trim: true },
	author: { type: String, required: true, minlength: 1, trim: true },
	content: { type: String, required: true, minlength: 1, trim: true },
	createdAt: { type: Number, required: true, default: Date.now },
});

PostSchema.pre('save', async function (done) {
	if (this._id) return done();

	do {
		this._id = Math.random().toString(16).substr(3);
	} while (await Post.findById(this._id));
	done();
});

const Post: Model<IPost> = models.Post ?? model<IPost>('Post', PostSchema);

export default Post;
