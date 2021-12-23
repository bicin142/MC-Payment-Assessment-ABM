function twoSums(nums, target) {
  let output = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        output = [i, j];
      }
    }
  }
  return output;
}

console.log(twoSums([2, 7, 11, 15], 13));
console.log(twoSums([3, 2, 4], 6));
console.log(twoSums([3, 3], 6));
console.log(twoSums([9, 7, 8, 5, 4, 2, 16, 3], 18));
