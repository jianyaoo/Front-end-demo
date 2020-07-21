;(function(window, ht) {
    var getPoint = function(node, outPoint) {
        var rect = node.getRect(),
            pos = node.getPosition(),
            p = ht.Default.intersectionLineRect(pos, outPoint, rect);
        if (p) return { x: p[0], y: p[1] };
        return pos;
    };
    /**
     * 计算点到直线的距离，返回结果是个对象结构
     * @param p1 线上点1
     * @param p2 线上点2
     * @param p 点
     * @returns {{x:number, y:number, z: number}} x和y代表最近点坐标，z代表真正的距离
     */
    var pointToInsideLine = function(p1, p2, p) {
        var x1 = p1.x,
            y1 = p1.y,
            x2 = p2.x,
            y2 = p2.y,
            x = p.x,
            y = p.y,
            result = {},
            dx = x2 - x1,
            dy = y2 - y1,
            d = Math.sqrt(dx * dx + dy * dy),
            ca = dx / d, // cosine
            sa = dy / d, // sine
            mX = (-x1 + x) * ca + (-y1 + y) * sa;

        result.x = x1 + mX * ca;
        result.y = y1 + mX * sa;

        if (!isPointInLine(result, p1, p2)) {
            result.x = Math.abs(result.x - p1.x) < Math.abs(result.x - p2.x) ? p1.x : p2.x;
            result.y = Math.abs(result.y - p1.y) < Math.abs(result.y - p2.y) ? p1.y : p2.y;
        }

        dx = x - result.x;
        dy = y - result.y;
        result.z = Math.sqrt(dx * dx + dy * dy);

        return result;
    };
    var isPointInLine = function(p, p1, p2) {
        return p.x >= Math.min(p1.x, p2.x) &&
            p.x <= Math.max(p1.x, p2.x) &&
            p.y >= Math.min(p1.y, p2.y) &&
            p.y <= Math.max(p1.y, p2.y);
    };
    var bezier2 = function(t, p0, p1, p2) {
        var t1 = 1 - t;
        return t1*t1*p0 + 2*t*t1*p1 + t*t*p2;
    };
    var bezier3 = function(t, p0, p1, p2, p3 ) {
        var t1 = 1 - t;
        return t1*t1*t1*p0 + 3*t1*t1*t*p1 + 3*t1*t*t*p2 + t*t*t*p3;
    };
    var distance = function(p1, p2) {
        var dx = p2.x - p1.x,
            dy = p2.y - p1.y;
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    };
    var getPointWithLength = function(length, p1, p2) {
        var dis = distance(p1, p2),
            temp = length / dis,
            dx = p2.x - p1.x,
            dy = p2.y - p1.y;
        return { x: p1.x + dx * temp, y: p1.y + dy * temp };
    };
    var getPointInOval = function(l, r, p1, p2) {
        var a = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        return { x: l * Math.cos(a) + p1.x, y: r * Math.sin(a) + p1.y };
    };
    ht.Default.setEdgeType('bus', function(edge, gap, graphView, sameSourceWithFirstEdge) {
        var source = edge.getSourceAgent(),
            target = edge.getTargetAgent(),
            shapeList = ['circle', 'oval'],
            shape, beginNode, endNode;

        if (shapeList.indexOf(source.s('shape')) >= 0) {
            shape = source.s('shape');
            beginNode = source;
            endNode = target;
        }
        else if (shapeList.indexOf(target.s('shape')) >= 0) {
            shape = target.s('shape');
            beginNode = target;
            endNode = source;
        }

        if (shapeList.indexOf(shape) >= 0) {
            var w = beginNode.getWidth(),
                h = beginNode.getHeight(),
                l = Math.max(w, h) / 2,
                r = Math.min(w, h) / 2;
            if (shape === 'circle') l = r = Math.min(l, r);
            var p = getPointInOval(l, r, beginNode.getPosition(), endNode.getPosition());
            return {
                points: new ht.List([ p, getPoint(endNode, p) ]),
                segments: new ht.List([ 1, 2 ])
            };
        }

        var segments, points, endPoint;
        if (source instanceof ht.Shape) {
            segments = source.getSegments();
            points = source.getPoints();
            beginNode = source;
            endPoint = target.getPosition();
            endNode = target;
        }
        else if (target instanceof ht.Shape) {
            segments = target.getSegments();
            points = target.getPoints();
            beginNode = target;
            endPoint = source.getPosition();
            endNode = source;
        }

        if (!points) {
            return {
                points: new ht.List([
                    getPoint(source, target.getPosition()),
                    getPoint(target, source.getPosition())
                ]),
                segments: new ht.List([ 1, 2 ])
            };
        }

        if (!segments && points) {
            segments = new ht.List();
            points.each(function() { segments.add(2); });
            segments.set(0, 1);
        }

        var segLen = segments.size(),
            segV, segNextV, beginPoint, j,
            p1, p2, p3, p4, p, tP1, tP2, tRes,
            curveResolution = beginNode.a('edge.curve.resolution') || 50,
            pointsIndex = 0;
        for (var i = 0; i < segLen - 1; i++) {
            segNextV = segments.get(i + 1);
            if (segNextV === 1) {
                pointsIndex++;
                continue;
            }

            p1 = points.get(pointsIndex++);

            if (segNextV === 2 || segNextV === 5) {
                p2 = points.get((segNextV === 5) ? 0 : pointsIndex);
                p = pointToInsideLine(p1, p2, endPoint);
                if (!beginPoint || beginPoint.z > p.z)
                    beginPoint = p;
            }
            else if (segNextV === 3) {
                p2 = points.get(pointsIndex++);
                p3 = points.get(pointsIndex);
                tP2 = { x: p1.x, y: p1.y };
                for (j = 1; j <= curveResolution; j++) {
                    tP1 = tP2;
                    tRes = j / curveResolution;
                    tP2 = {
                        x: bezier2(tRes, p1.x, p2.x, p3.x),
                        y: bezier2(tRes, p1.y, p2.y, p3.y),
                    };
                    p = pointToInsideLine(tP1, tP2, endPoint);
                    if (!beginPoint || beginPoint.z > p.z)
                        beginPoint = p;
                }
            }
            else if (segNextV === 4) {
                p2 = points.get(pointsIndex++);
                p3 = points.get(pointsIndex++);
                p4 = points.get(pointsIndex);
                tP2 = { x: p1.x, y: p1.y };
                for (j = 1; j <= curveResolution; j++) {
                    tP1 = tP2;
                    tRes = j / curveResolution;
                    tP2 = {
                        x: bezier3(tRes, p1.x, p2.x, p3.x, p4.x),
                        y: bezier3(tRes, p1.y, p2.y, p3.y, p4.y),
                    };
                    p = pointToInsideLine(tP1, tP2, endPoint);
                    if (!beginPoint || beginPoint.z > p.z)
                        beginPoint = p;
                }
            }
        }
        endPoint = getPoint(endNode, beginPoint);
        return {
            points: new ht.List([
                { x: beginPoint.x, y: beginPoint.y },
                endPoint
            ]),
            segments: new ht.List([ 1, 2 ])
        };
    });
}(window, ht));
