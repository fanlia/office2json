export const u82str = (u8) => {
  return new TextDecoder().decode(u8)
}

export const str2u8 = (str) => {
  return new TextEncoder().encode(str)
}
