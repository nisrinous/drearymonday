export type UserData = {
  id: string;
  role: "user" | "admin";
  membership: "premium" | "basic";
  name: string;
  username: string;
  email: string;
  password: string;
  address: string;
  phonenumber: string;
  referral: string;
  liked: number[];
  history: number[];
  expired_subs: string;
};

export type NewsData = {
  id: string;
  isPremium: boolean;
  title: string;
  desc: string;
  image: string;
  created_at: string;
  updated_at: string;
  category: string;
  like: number;
  likers: number[];
  share: number;
};

export type NewsDetail = {
  title: string;
  desc: string;
  image: string;
  isPremium: boolean;
  newsId: string;
  created_at: string;
  updated_at: string;
};

export type TransactionData = {
  id: string;
  user: string;
  type: 1 | 12;
  created_at: string;
  status: "processing" | "completed" | "canceled";
  updated_at: string;
  total_paid: 9 | 99;
};
