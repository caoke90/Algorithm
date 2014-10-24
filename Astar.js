//Astar 寻路算法
//Point 类型
var cc=cc||console
var Point=function(x,y){
    if(this instanceof Point){
        this.init(x,y)
    }else{
        return new Point(x,y)
    }

}
Point.prototype={
    init:function(x,y){
        this.x=x;
        this.y=y;
    },
    ParentPoint:null,
    F :0,  //F=G+H
    G:0,
    H:0,
    x:0,
    y:0,
    CalcF:function(){
        this.F = this.G + this.H;
    }
}

//Maze 类型
var Maze=function(maze){
    if(this instanceof Maze){
        this.init(maze);
    }else{
        return new Maze(maze)
    }
}
Maze.prototype={
    init:function(maze){
        this.MazeArray=maze
    },
    OBLIQUE : 14,
    STEP:10,
    CloseList:[],
    OpenList:[],
    FindPath:function(start, end, IsIgnoreCorner){
        this.OpenList.push(start);
        while (this.OpenList.length != 0)
        {
            //找出F值最小的点
            var tempStart = this.MinPoint(this.OpenList);
            this.CloseList.push(tempStart);
            this.Remove(this.OpenList,tempStart);

            //找出它相邻的点
            var surroundPoints = this.SurrroundPoints(tempStart, IsIgnoreCorner);
            for (var i=0;i< surroundPoints.length;i++)
            {
                var point=surroundPoints[i]
                if (this.Exists(this.OpenList,point)){
                    //计算G值, 如果比原来的大, 就什么都不做, 否则设置它的父节点为当前点,并更新G和F
                    this.FoundPoint(tempStart, point);
                }
                else{
                    //如果它们不在开始列表里, 就加入, 并设置父节点,并计算GHF
                    this.NotFoundPoint(tempStart, end, point);
                }
            }
            if (this.Get(this.OpenList,end) != null){
                return this.Get(this.OpenList,end);
            }
        }
        return this.Get(this.OpenList,end);
    },
    //在二维数组对应的位置不为障碍物
    CanReaches:function(x,y){
        return this.MazeArray[this.MazeArray.length-y-1][x] == 0;
    },
    CanReach:function( start, point, IsIgnoreCorner){
        if (!this.CanReaches(point.x, point.y) || this.Exists(this.CloseList,point))
            return false;
        else
        {
            if ((Math.abs(point.x - start.x) + Math.abs(point.y - start.y)) == 1){
                return true;
            }
            return false;
        }
    },
    NotFoundPoint:function(tempStart, end, point){
        point.ParentPoint = tempStart;
        point.G = this.CalcG(tempStart, point);
        point.H = this.CalcH(end, point);
        point.CalcF();
        this.OpenList.push(point);

    },
    FoundPoint:function(tempStart, point){
        var G = this.CalcG(tempStart, point);
        if (G < point.G)
        {
            point.ParentPoint = tempStart;
            point.G = G;
            point.CalcF();
        }
    },
    CalcG:function(start, point)
    {
        var G = (Math.abs(point.X - start.X) + Math.abs(point.Y - start.Y)) == 2 ? this.OBLIQUE:this.STEP ;
        var parentG = point.ParentPoint != null ? point.ParentPoint.G : 0;
        return G + parentG;
    },

    CalcH:function( end,  point)
    {
        var step = Math.abs(point.x - end.x) + Math.abs(point.y - end.y);
        return step * this.STEP;
    },

//获取某个点周围可以到达的点
    SurrroundPoints:function( point,  IsIgnoreCorner)
    {
        var surroundPoints = [];
        if (this.CanReach(point,Point(point.x-1,point.y),IsIgnoreCorner)){
            surroundPoints.push(Point(point.x-1,point.y));
        }
        if (this.CanReach(point,Point(point.x,point.y-1),IsIgnoreCorner)){
            surroundPoints.push(Point(point.x,point.y-1));
        }
        if (this.CanReach(point,Point(point.x+1,point.y),IsIgnoreCorner)){
            surroundPoints.push(Point(point.x+1,point.y));
        }
        if (this.CanReach(point,Point(point.x,point.y+1),IsIgnoreCorner)){
            surroundPoints.push(Point(point.x,point.y+1));
        }
        return surroundPoints;
    },


//对 List<Point> 的一些扩展方法
//判断是否存在点
    Exists:function(points, point)
    {
        for(k in points){
            var p=points[k]
            if ((p.x == point.x) && (p.y == point.y)){
                return true;
            }
        }
        return false;
    },
//获取f最小
    MinPoint:function (points)
    {
        var min=points[0];
        for(var i=0;i<points.length-1;i++){
            if(points[i].F<points[i+1].F){
                min=points[i]
            }
        }
        return min;
    },
//获取点
    Get:function(points, point)
    {
        for (var k in points){
            var p=points[k]
            if ((p.x == point.x) && (p.y == point.y))
                return p;
        }
        return null;
    },
//删除点
    Remove:function(points,point)
    {
        for(var i=0;i<points.length;i++){
            var p=points[i]
            if (point.x === p.x && point.y === p.y){
                return points.splice(i,1);
            }
        }

    }

}

var arr= [
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [ 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [ 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [ 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [ 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [ 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

var map=Maze(arr)
//起始点 结束点 是否斜角
var parent=map.FindPath(Point(2,3),Point(16,2),false)

while (parent != null)
{
    cc.log(parent.x + ", " + parent.y);
    parent = parent.ParentPoint;
}
