export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmed: boolean;
  blocked: boolean;
  role_id: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
