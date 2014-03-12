//分治算法研究
var cc=console
function find_max_crossing_subarray(A,low,mid,high){
    var max_left=mid,max_right=mid
    var left_sum=0
    var sum=0
    for(var i=mid;i>=low;i--){
        sum=sum+A[i]
        if(sum>left_sum){
            left_sum=sum
            max_left=i
        }
    }
    var right_sum=0
    var sum=0
    for(var i=mid+1;i<=high;i++){
        sum=sum+A[i]
        if(sum>right_sum){
            right_sum=sum
            max_right=i
        }
    }
    return [max_left,max_right,left_sum+right_sum]
}
//搜索跨越中点的最大连续子集和
var arr=[13,-3,-2,20,-3,-16,-23,18,20,-7,12,-5,-22,15,-4,7]
//var re=find_max_crossing_subarray(arr,0,8,arr.length-1)
//cc.log(re)//=>18,20,-7,12

function find_maximum_subarray(A,low,high){
    if(high==low){
        return [low,high,A[low]]
    }else{
        var mid=(low+high)>>1

        /*[left_low,left_high,left_sum]*/
        var left=find_maximum_subarray(A,low,mid)
        /*[right_low,right_high,right_sum]*/
        var right=find_maximum_subarray(A,mid+1,high)
        /*[cross_low,cross_high,cross_sum]*/
        var cross=find_max_crossing_subarray(A,low,mid,high)

        if(left[2]>=right[2]&&left[2]>=cross[2]){
            return left
        }else if(right[2]>=left[2]&&right[2]>=cross[2]){
            return right
        }else if(cross[2]>=left[2]&&cross[2]>=right[2]){
            return cross
        }
    }
}
//搜索数组中的最大连续子集和
var re2=find_maximum_subarray(arr,0,arr.length-1)
cc.log(re2)//=>18,20,-7,12  [7,10,42]
