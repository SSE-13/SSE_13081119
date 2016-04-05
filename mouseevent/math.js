var math;
(function (math) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.prototype.IsRange = function (x, y, width, height) {
            if (this.x >= x && this.x <= x + width && this.y >= y && this.y <= y + height) {
                return true;
            }
            else {
                return false;
            }
        };
        return Point;
    }());
    math.Point = Point;
    function pointAppendMatrix(point, m) {
        var x = m.a * point.x + m.c * point.y + m.tx;
        var y = m.b * point.x + m.d * point.y + m.ty;
        return new Point(x, y);
    }
    math.pointAppendMatrix = pointAppendMatrix;
    /**
     * 使用伴随矩阵法求逆矩阵
     * http://wenku.baidu.com/view/b0a9fed8ce2f0066f53322a9
     */
    function invertMatrix(m) {
        var a = m.a;
        var b = m.b;
        var c = m.c;
        var d = m.d;
        var tx = m.tx;
        var ty = m.ty;
        var determinant = a * d - b * c;
        var result = new Matrix(1, 0, 0, 1, 0, 0);
        if (determinant == 0) {
            throw new Error("no invert");
        }
        determinant = 1 / determinant;
        var k = result.a = d * determinant;
        b = result.b = -b * determinant;
        c = result.c = -c * determinant;
        d = result.d = a * determinant;
        result.tx = -(k * tx + c * ty);
        result.ty = -(b * tx + d * ty);
        return result;
    }
    math.invertMatrix = invertMatrix;
    function matrixAppendMatrix(m1, m2) {
        var result = new Matrix();
        result.a = m1.a * m2.a + m1.b * m2.c;
        result.b = m1.a * m2.b + m1.b * m2.d;
        result.c = m2.a * m1.c + m2.c * m1.d;
        result.d = m2.b * m1.c + m1.d * m2.d;
        result.tx = m2.a * m1.tx + m2.c * m1.ty + m2.tx;
        result.ty = m2.b * m1.tx + m2.d * m1.ty + m2.ty;
        return result;
    }
    math.matrixAppendMatrix = matrixAppendMatrix;
    var PI = Math.PI;
    var HalfPI = PI / 2;
    var PacPI = PI + HalfPI;
    var TwoPI = PI * 2;
    var DEG_TO_RAD = Math.PI / 180;
    /**
     * @private
     */
    function cos(angle) {
        switch (angle) {
            case HalfPI:
            case -PacPI:
                return 0;
            case PI:
            case -PI:
                return -1;
            case PacPI:
            case -HalfPI:
                return 0;
            default:
                return Math.cos(angle);
        }
    }
    /**
     * @private
     */
    function sin(angle) {
        switch (angle) {
            case HalfPI:
            case -PacPI:
                return 1;
            case PI:
            case -PI:
                return 0;
            case PacPI:
            case -HalfPI:
                return -1;
            default:
                return Math.sin(angle);
        }
    }
    /**
     * @private
     */
    math.$cos = cos;
    /**
     * @private
     */
    math.$sin = sin;
    var matrixPool = [];
    /**
     * @language en_US
     * The Matrix class represents a transformation matrix that determines how to map points from one coordinate space to
     * another. You can perform various graphical transformations on a display object by setting the properties of a Matrix
     * object, applying that Matrix object to the matrix property of a display object, These transformation functions include
     * translation (x and y repositioning), rotation, scaling, and skewing.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Matrix.ts
     */
    /**
     * @language zh_CN
     * Matrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
     * 您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix
     * 对象应用于显示对象的 matrix 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Matrix.ts
     */
    var Matrix = (function () {
        /**
         * @language en_US
         * Creates a new Matrix object with the specified parameters.
         * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
         * @param tx The distance by which to translate each point along the x axis.
         * @param ty The distance by which to translate each point along the y axis.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用指定参数创建一个 Matrix 对象
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         * @version Egret 2.4
         * @platform Web,Native
         */
        function Matrix(a, b, c, d, tx, ty) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 1; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }
        /**
         * @language zh_CN
         * 返回将 Matrix 对象表示的几何转换应用于指定点所产生的结果。
         * @returns 一个字符串，它包含 Matrix 对象的属性值：a、b、c、d、tx 和 ty。
         * @version Egret 2.4
         * @platform Web,Native
         */
        Matrix.prototype.toString = function () {
            return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
        };
        /**
         * 根据显示对象的属性确定当前矩阵
         */
        Matrix.prototype.updateFromDisplayObject = function (x, y, scaleX, scaleY, rotation) {
            this.tx = x;
            this.ty = y;
            var skewX, skewY;
            skewX = skewY = rotation / 180 * Math.PI;
            ;
            if ((skewX == 0 || skewX == TwoPI) && (skewY == 0 || skewY == TwoPI)) {
                this.a = scaleX;
                this.b = this.c = 0;
                this.d = scaleY;
                return;
            }
            var u = cos(skewX);
            var v = sin(skewX);
            if (skewX == skewY) {
                this.a = u * scaleX;
                this.b = v * scaleX;
            }
            else {
                this.a = cos(skewY) * scaleX;
                this.b = sin(skewY) * scaleX;
            }
            this.c = -v * scaleY;
            this.d = u * scaleY;
        };
        return Matrix;
    }());
    math.Matrix = Matrix;
})(math || (math = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsSUFBTyxJQUFJLENBeVRWO0FBelRELFdBQU8sSUFBSSxFQUFDLENBQUM7SUFHVDtRQUdJLGVBQVksQ0FBUyxFQUFFLENBQVM7WUFDNUIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLENBQUM7UUFDRCx1QkFBTyxHQUFQLFVBQVEsQ0FBUSxFQUFDLENBQVEsRUFBQyxLQUFZLEVBQUMsTUFBYTtZQUNoRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztnQkFDcEUsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDO1lBQ0QsSUFBSSxDQUFBLENBQUM7Z0JBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUFBLENBQUM7UUFDbEIsQ0FBQztRQUNMLFlBQUM7SUFBRCxDQUFDLEFBZEQsSUFjQztJQWRZLFVBQUssUUFjakIsQ0FBQTtJQUVELDJCQUFrQyxLQUFZLEVBQUUsQ0FBUztRQUNyRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFM0IsQ0FBQztJQUxlLHNCQUFpQixvQkFLaEMsQ0FBQTtJQUVEOzs7T0FHRztJQUNILHNCQUE2QixDQUFTO1FBR2xDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVkLElBQUksV0FBVyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVELFdBQVcsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQztRQUNuQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7UUFDaEMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUM7UUFDL0IsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUVsQixDQUFDO0lBekJlLGlCQUFZLGVBeUIzQixDQUFBO0lBRUQsNEJBQW1DLEVBQVUsRUFBRSxFQUFVO1FBRXJELElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7UUFDMUIsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFB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