//算法-快速排序
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
function partition(A,p,r){
    //保存最后一个值
    var x=A[r]
    //左标
    var i=p-1
    for(var j=p;j<r;j++){
        if(A[j]<=x){
            i=i+1
            //交换插入
            exchange(A,i,j)
        }
    }
    exchange(A,i+1,r)
    return i+1
}
var arr=[15,1,34,3,23,12,45,56]
quicksort(arr,0,arr.length-1)
cc.log(arr)//=>[ 1, 3, 12, 15, 23, 34, 45, 56 ]
