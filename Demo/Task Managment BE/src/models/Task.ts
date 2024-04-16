import mongoose, {Document, Schema, Types} from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    taskStatus : Types.ObjectId;
    createDate: Date;
}

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String},
    taskStatus: { type: Schema.Types.ObjectId},
    createDate: { type: Date, default: Date.now },
});

export default mongoose.model<ITask>('Task', taskSchema);
