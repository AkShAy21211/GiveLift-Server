import mongoose, { Schema } from "mongoose";
import { ChatMessage } from "../../domain/entities/ChatMessage";

  const chatMessageSchema = new Schema<ChatMessage>(
    {
      conversationId: {
        type: Schema.Types.ObjectId,
        ref: "ChatConversation",
        required: true,
      },
      sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      readBy: [{
        type: Schema.Types.ObjectId,
        ref: "User",
      }],
      messageType: {
        type: String,
        default: "text",
      },
      attachments: [String],
      isReported: {
        type: Boolean,
        default: false,
      },
    }
  );
  
  // 📍 Indexes
  chatMessageSchema.index({ conversationId: 1, timestamp: 1 });
  chatMessageSchema.index({ sender: 1, timestamp: -1 });
  chatMessageSchema.index({ isReported: 1 });
  
  const ChatMessageModel = mongoose.model<ChatMessage>("ChatMessage", chatMessageSchema);
  export default ChatMessageModel;
  