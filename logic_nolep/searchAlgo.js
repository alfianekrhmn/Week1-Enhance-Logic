const searchRotatedArray = (nums, target) => {
    let start = 0
    let end = nums.length - 1
    while(start <= end){
        let middle = Math.floor((start+end)/2)
        if(nums[middle] === target){
            return middle
        }
        if(nums[start] <= nums[middle]){
            if(nums[start]<=target&&target<nums[middle]){
                end = middle-1
            }else{
                start = middle+1
            }
        }else{
            if(nums[middle]< target && target<=nums[end]){
                start=middle+1
            }else{
                end = middle-1
            }
        }
    }
    return -1
};

// Test Case
console.log(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 0)); // Output: 4
console.log(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 3)); // Output: -1
console.log(searchRotatedArray([1], 0)); // Output: -1
console.log(searchRotatedArray([6, 7, 0, 1, 2, 4, 5], 7)); // Output: 1
console.log(searchRotatedArray([4, 5, 6, 7, 8, 1, 2, 3], 6)); // Output: 2
console.log(searchRotatedArray([3, 4, 5, 6, 7, 8, 1, 2], 8)); // Output: 5
console.log(searchRotatedArray([5, 6, 7, 8, 1, 2, 3, 4], 1)); // Output: 4
console.log(searchRotatedArray([2, 3, 4, 5, 6, 7, 8, 1], 9)); // Output: -1
console.log(searchRotatedArray([3, 1], 1)); // Output: 1
console.log(searchRotatedArray([5, 1, 3], 5)); // Output: 0