// export const mergeSort = array => {
//   if (array.length === 1) return array;
//   const middleIdx = Math.floor(array.length / 2);
//   const firstHalf = mergeSort(array.slice(0, middleIdx));
//   const secondHalf = mergeSort(array.slice(middleIdx));

//   const sortedArray = [];
//   let i = 0,
//     j = 0;
//   while (i < firstHalf.length && j < secondHalf.length) {
//     if (firstHalf[i] < secondHalf[j]) {
//       sortedArray.push(firstHalf[i++]);
//     } else {
//       sortedArray.push(secondHalf[j++]);
//     }
//   }

//   while (i < firstHalf.length) sortedArray.push(firstHalf[i++]);
//   while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);
//   return sortedArray;
// };

export function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) {
    return array;
  }
  const auxilaryArray = array.slice();
  //   console.log(
  mergeSortHelper(array, 0, array.length - 1, auxilaryArray, animations);
  //   );
  // console.log(animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxilaryArray,
  animations
) {
  if (startIdx === endIdx) return mainArray;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxilaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxilaryArray, middleIdx + 1, endIdx, mainArray, animations);
  return doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxilaryArray,
    animations
  );
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxilaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {
    const animation = {};
    animation.comparison = [i, j];
    if (auxilaryArray[i] <= auxilaryArray[j]) {
      animation.swap = [k, auxilaryArray[i]];
      mainArray[k++] = auxilaryArray[i++];
    } else {
      animation.swap = [k, auxilaryArray[j]];
      mainArray[k++] = auxilaryArray[j++];
    }
    animations.push(animation);
  }

  while (i <= middleIdx) {
    animations.push({
      comparison: [i, i],
      swap: [k, auxilaryArray[i]]
    });
    mainArray[k++] = auxilaryArray[i++];
    //console.log(animations.swap);
  }

  while (j <= endIdx) {
    animations.push({
      comparison: [j, j],
      swap: [k, auxilaryArray[j]]
    });
    mainArray[k++] = auxilaryArray[j++];
    //console.log(animations.swap);
  }
  return mainArray;
}
