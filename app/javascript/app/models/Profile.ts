export type ProfileModel = {
  avatar: string | null;
  bio: string;
  displayName: string;
  dateOfBirth: string;
  lastSignedIn: string;
  gender: "male" | "female" | "undisclosed";
  setup: boolean;
};
