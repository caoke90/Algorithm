//算法-计数排序
var cc=cc||console
function counting_sort(A,B,k){
    var C=[]
    for(var i=0;i<k;i++){
        C[i]=0
    }
    for(var j=0;i< A.length;j++){
        C[A[j]]=C[A[j]]+1
    }
    for(var i=0;i<k;i++){
        C[i]=C[i]+C[i-1]
    }
    for(var j= A.length-1;i>=0;i--){
        B[C[A[j]]]=A[j]
        C[A[j]]=C[A[j]]-1
    }
}