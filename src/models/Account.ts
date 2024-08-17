import mongoose, { Document, Schema } from "mongoose";

export interface Account extends Document {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

const AccountSchema = new Schema<Account>({
  userId: {
    type: String,
    required: [true, "UserId is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  provider: {
    type: String,
    required: [true, "Provider is required"],
  },
  providerAccountId: {
    type: String,
    required: [true, "ProviderAccountId is required"],
  },
  refresh_token: {
    type: String,
    required: false,
  },
  access_token: {
    type: String,
    required: false,
  },
  expires_at: {
    type: Number,
    required: false,
  },
  token_type: {
    type: String,
    required: false,
  },
  scope: {
    type: String,
    required: false,
  },
  id_token: {
    type: String,
    required: false,
  },
  session_state: {
    type: String,
    required: false,
  },
});

const AccountModel = mongoose.models.Account || mongoose.model<Account>("Account", AccountSchema);

export default AccountModel;
