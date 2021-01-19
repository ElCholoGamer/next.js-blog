import { Schema, model, Document, models } from 'mongoose';

export interface IPost extends Document {
	author: string;
	content: string;
	createdAt: Date;
}

const PostSchema = new Schema({
	author: { type: String, required: true, minlength: 1, trim: true },
	content: { type: String, required: true, minlength: 1, trim: true },
	createdAt: { type: Date, required: true, default: Date.now },
});

const Post = models.Post ?? model<IPost>('Post', PostSchema);

export default Post;
