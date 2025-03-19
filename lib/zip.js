import JSZip from 'jszip'

export const unzip = async (u8) => {
  let files = {}

  const zip = await JSZip.loadAsync(u8)

  await Promise.all(
    Object.entries(zip.files).map(async ([filepath, file]) => {
      files[filepath] = await file.async('uint8array')
    }),
  )

  return files
}

export const zip = async (files) => {
  let zip = new JSZip()

  await Promise.all(
    Object.entries(files).map(async ([filepath, file]) => {
      zip.file(filepath, file)
    }),
  )

  const u8 = await zip.generateAsync({
    type: 'uint8array',
    compression: 'DEFLATE',
  })

  return u8
}
