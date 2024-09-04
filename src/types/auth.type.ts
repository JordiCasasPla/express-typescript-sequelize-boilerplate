export interface Auth {
  id: number;
  token: string;
  user_id: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
