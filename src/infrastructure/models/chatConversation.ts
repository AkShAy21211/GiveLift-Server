import mongoose, { Schema } from "mongoose";
import { ChatConversation } from "../../domain/entities/ChatConversation";

  const chatConversationSchema = new Schema<ChatConversation>(
    {
      participants: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }],
      type: {
        type: String,
        required: true,
      },
      lastMessageAt: {
        type: Date,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      title: {
        type: String,
      },
      status: {
        type: String,
        default: "active",
      },
    }
  );
  

  chatConversationSchema.index({ participants: 1 });
  chatConversationSchema.index({ lastMessageAt: -1 });
  chatConversationSchema.index({ type: 1, status: 1 });
  
  const ChatConversationModel = mongoose.model<ChatConversation>("ChatConversation", chatConversationSchema);
  export default ChatConversationModel;
  