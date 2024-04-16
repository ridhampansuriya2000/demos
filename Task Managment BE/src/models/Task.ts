import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    createDate: Date;
}

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    createDate: { type: Date, default: Date.now },
});

export default mongoose.model<ITask>('Task', taskSchema);
