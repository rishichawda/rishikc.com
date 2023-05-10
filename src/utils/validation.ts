export const validateEmail = (email: string) => {
  if (!email.length) {
    return new Error("Please enter an email address.");
  }
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email,
    )
  ) {
    return null;
  }
  return new Error("Please enter a valid email address")
}

export const validateMessage = (message: string) => {
  if (message.length < 11)
    return new Error("Please write a short message.")
  return null
}