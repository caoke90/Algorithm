//堆排序研究
var cc=cc||console
function parent(i){
    return i>>1
}
function left(i){
    return 2*i+1
}
function right(i){
    return 2*i+2
}
function exchange(A,p1,p2){
    var temp=A[p1]
    A[p1]=A[p2]
    A[p2]=temp
}
//维护最大堆的性质
function max_heapfy(A,i){
    var largest
    var l=left(i)
    var r=right(i)
    if(l<A.heap_size&&A[l]>A[i]){
        largest=l
    }else{
        largest=i
    }
    if(r< A.heap_size&&A[r]>A[largest]){
        largest=r
    }
    if(largest!=i){
        exchange(A,i,largest)
        max_heapfy(A,largest)
    }
}
var arr=[15,1,34,3,23,12,45,56]
//建立堆
function buid_max_heap(A){
    A.heap_size= A.length
    for(i= A.length-1>>1;i>=0;i--){
        max_heapfy(A,i)
    }
}
buid_max_heap(arr)
cc.log(arr) //=>[  56, 23, 45, 3, 15, 12, 34, 1, heap_size: 9 ]
//            15
//        1      34
//    3   23    12  45
//   56
//            15
//        1      34
//    56   23    12  45
//    3
//            15
//        56      34
//    1   23    12  45
//    3
//            56
//        23      45
//    3   15    12  34
//   1
//堆排序
function heapsort(A){
    buid_max_heap(A)
    for(var i= A.length-1;i>0;i--){
        exchange(A,0,i)
        A.heap_size=A.heap_size-1
        max_heapfy(A,0)
    }
}
heapsort(arr)
cc.log(arr) //=>[ 1, 3, 12, 15, 23, 34, 45, 56, heap_size: 1 ]
function heap_maximum(A){
    return A[1]
}
function heap_extract_max(A){
    if(A.heap_size<0){
        throw "heap underflow"
    }
    var max=A[1]
    A[1]=A[A.heap_size-1]
    A.heap_size=A.heap_size-1
    max_heapfy(A,1)
    return max
}