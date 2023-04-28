/* 
  Shuffle array using Durstenfeld's version of Fisher-Yates shuffle.
  http://en.wikipedia.org/wiki/Fisher-Yates_shuffle#The_modern_algorithm
*/

const shuffle = (data: any[]) => {
  if (typeof window !== "undefined") {
    const arr = [...data]
    for (let i = 0; i < arr.length - 1; i += 1) {
      const j = Math.round(Math.random() * ((arr.length - 1) - i)) + i;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
  }
  return data
}

export default shuffle
