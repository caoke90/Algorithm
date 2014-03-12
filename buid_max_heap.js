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
    if(l<=A.heap_size&&A[l]>A[i]){
        largest=l
    }else{
        largest=i
    }
    if(r<=A.heap_size&&A[r]>A[largest]){
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
    A.heap_size= A.length-1
    for(i= A.length-1>>1;i>=0;i--){
        max_heapfy(A,i)
    }
}
buid_max_heap(arr)
cc.log(arr) //=>[  56, 23, 45, 3, 15, 12, 34, 1, heap_size: 7 ]
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
cc.log(arr) //=>[ 1, 3, 12, 15, 23, 34, 45, 56, heap_size: 0 ]
//放回最大
function heap_maximum(A){
    return A[1]
}
//最大优先队列
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
//插入最大堆排序
function heap_increase_key(A,i,key){
    if(key<A[i]){
        throw "new key is smaller than current key"
    }
    A[i]=key
    while(i>0&&A[parent(i)]<A[i]){
        exchange(A,i,parent(i))
        i=parent(i)
    }
}
//插入最大堆
function max_heap_insert(A,key){
    A.heap_size= A.heap_size+1
    A[A.heap_size]=0
    heap_increase_key(A, A.heap_size,key)

}