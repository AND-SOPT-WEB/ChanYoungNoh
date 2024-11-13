export interface loginForm {
  name: string;
  password: string;
}

export interface passwordForm {
  name: string;
  password: string;
  passwordCheck: string;
  hobby: string;
}

export interface updateUserForm {
  password?: string;
  hobby?: string;
}

export interface signupForm {
  formData: passwordForm;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleHobbyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface updateUserForm {
  password?: string;
  hobby?: string;
}
