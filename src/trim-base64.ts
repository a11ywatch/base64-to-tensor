// remove base64 and just get data @return string
export const base64Replacer = (base: string) => {
  if (base && typeof base === "string") {
    const data = base.split(",");

    if (data.length >= 2) {
      return data[1];
    }
  }

  return "";
};
