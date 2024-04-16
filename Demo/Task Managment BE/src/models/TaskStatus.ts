import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITaskStatus extends Document {
    title: string;
    // taskList: Types.ObjectId[];
}

const taskStatusSchema = new Schema({
    title: { type: String, required: true },
    // taskList: { type: [{ type: Schema.Types.ObjectId, ref: 'Task' }], default: [] }
});

// taskStatusSchema.pre<ITaskStatus>('save', function (next) {
//     if (!Array.isArray(this.taskList) || this.taskList.some(item => !mongoose.Types.ObjectId.isValid(item))) {
//         next(new Error('taskList must be an array of valid ObjectIDs'));
//     } else {
//         next();
//     }
// });

export default mongoose.model<ITaskStatus>('TaskStatus', taskStatusSchema);
