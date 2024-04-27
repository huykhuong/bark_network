export type ProfileModel = {
  bio: string;
  displayName: string;
  dateOfBirth: string;
  lastSignedIn: string;
  gender: "male" | "female" | "undisclosed";
  setup: boolean;
};
