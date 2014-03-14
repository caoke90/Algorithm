var cc=cc||console
function exchange(A,p1,p2){
    if(p1!=p2){
        var temp=A[p1]
        A[p1]=A[p2]
        A[p2]=temp
    }
}
function quicksort(A,p,r){
    if(p<r){
        var q=partition(A,p,r)
        quicksort(A,p,q-1)
        quicksort(A,q+1,r)
    }
}
function partition(A,l,r){
    //保存最后一个值
    var x=A[r]
    //左标
    var p=l-1
    for(var i=l;i<r;i++){
        if(A[i]<=x){
            p=p+1
            //交换插入
            exchange(A,p,i)
        }
    }
    exchange(A,p+1,r)
    return p+1
}
var arr=[15,1,34,3,23,12,45,56]
//quicksort(arr,0,arr.length-1)
//cc.log(arr)//=>[ 1, 3, 12, 15, 23, 34, 45, 56 ]
function randomized_partition(A,l,r){
    var p=0|Math.random()*(r-l)+l
    exchange(A,r,p)
    return partition(A,l,r)
}
//快速排序 随机化版本
function randomized_quicksort(A,l,r){
    if(l<r){
        var q=randomized_partition(A,l,r)
        randomized_quicksort(A,l,q-1)
        randomized_partition(A,q+1,r)
    }
}
randomized_quicksort(arr,0,arr.length-1)
cc.log(arr)