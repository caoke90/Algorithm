//分治算法研究
var cc=console
function find_max_crossing_lenarray(A,low,mid,high){
    var max_left=mid,max_right=mid
    var left_sum=1
    var sum=0
    for(var i=mid;i>low;i--){
        sum=A[i]-A[i-1]
        if(sum==1){
            left_sum++
            max_left=i-1
        }else{
            break
        }
    }
    var right_sum=1
    var sum=0
    for(var i=mid;i<high;i++){
        sum=A[i+1]-A[i]
        if(sum==1){
            right_sum++
            max_right=i+1
        }else{
            break
        }
    }
    return [max_left,max_right,left_sum+right_sum-1]
}
//搜索跨越中点的最长连续递增子集
var arr=[13,-3,-2,-1,20,-3,-16,-23,18,20,-7,12,-5,-22,15,-4,7]
//var re=find_max_crossing_lenarray(arr,0,8,arr.length-1)
//cc.log(re)//=>18,20,-7,12

function find_maximum_lenarray(A,low,high){
    if(high==low){
        return [low,high,0]
    }else{
        var mid=(low+high)>>1
        /*[left_low,left_high,left_sum]*/
        var left=find_maximum_lenarray(A,low,mid)
        /*[right_low,right_high,right_sum]*/
        var right=find_maximum_lenarray(A,mid+1,high)
        /*[cross_low,cross_high,cross_sum]*/
        var cross=find_max_crossing_lenarray(A,low,mid,high)

        if(left[2]>=right[2]&&left[2]>=cross[2]){
            return left
        }else if(right[2]>=left[2]&&right[2]>=cross[2]){
            return right
        }else if(cross[2]>=left[2]&&cross[2]>=right[2]){
            return cross
        }
    }
}
//搜索数组中的最长连续递增子集
var re2=find_maximum_lenarray(arr,0,arr.length-1)
cc.log(re2)//=>-3,-2,-1 [1,3,3]
