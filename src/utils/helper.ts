import { SelectOption } from '@/components/select'

export const truncateDecimal = (num: number | string) => {
  // Convert number to string
  const numStr = num.toString()

  // Find the index of the decimal point
  const decimalIndex = numStr.indexOf('.')

  // If there's no decimal point, return the original number
  if (decimalIndex === -1) {
    return num
  }

  let roundedBeforeDecimal = '0'
  let truncatedAfterDecimal

  // Extract numbers before and after the decimal point
  const beforeDecimal = numStr.slice(0, decimalIndex)
  const afterDecimal = numStr.slice(decimalIndex + 1)

  let count = 0
  for (let i = 0; i < afterDecimal.length; i++) {
    if (afterDecimal[i] !== '0') {
      break // Exit the loop once a non-zero number is encountered
    }
    count++ // Increment count for each "0"
  }

  const newDecimalSplit = Number(`0.${afterDecimal}`)
    .toFixed(count + 2)
    .toString()
    .split('.')

  roundedBeforeDecimal = newDecimalSplit[0]
  truncatedAfterDecimal = newDecimalSplit[1]

  // Construct the truncated number and return it;
  return `${Number(beforeDecimal) + Number(roundedBeforeDecimal)}.${truncatedAfterDecimal}`
}

export const thousandSeparator = (value: string | number) => {
  if (value) {
    // Convert number to string
    let numStr = value.toString()

    // Split the string into parts before and after the decimal point
    const parts = numStr.split('.')

    // Add thousand separators to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    // Join the parts back together with the decimal point
    return parts.join('.')
    // return Number(parts.join('.')).toFixed(2)
  }
  return null
}

export const formatCurrency = (value: string | number) => {
  const formattedValue = String(value).split(',').join('')

  if (value) {
    return thousandSeparator(truncateDecimal(formattedValue))
  }

  return '--'
}

// export const warpString = (value: string, length?: number) => {
//   const maxLength = length || 20
//   if (value.length > maxLength) {
//     const newVal = value.substring(0, maxLength)
//     const truncated = value.substring(maxLength, value.length)
//     return `${newVal} \n ${truncated}`
//   }
//   return value
// }

export const wrapString = (value: string = '', length: number = 15): string => {
  let result = ''
  for (let i = 0; i < value.length; i += length) {
    result += value.substring(i, i + length) + '\n'
  }
  return result.trim()
}

const returnOptionValue = (selectString: SelectOption | string) =>
  typeof selectString === 'string' ? selectString : selectString.value
