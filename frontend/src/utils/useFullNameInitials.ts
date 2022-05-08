export const useFullNameIntials = (fullName: string) => {
  return fullName?.match(/(\b\S)?/g)?.join("").toUpperCase();
}