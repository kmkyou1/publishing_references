/*!
 * Gaesigner From Plugin - MatrixCalc
 * version: 1.0-2016.09.10
 * Copyright (c) 2016 Team Gaesigner.com
 * QnA-email: admin@gaesigner.com
 * QnA-email: jjackkun@gmail.com
 * QnA-email: jjackkun81@naver.com
 * QnA-email: inreverse8020@gmail.com
 * Examples and documentation at: http://www.gaesigner.com/matrix_example.html
*/

/* Only square matrix */
var MatrixCalc = {
    type : function(type){
        switch(type){
            case 1 :
                this.multiply = this.multiply1;
                break;
            case 2 :
                this.multiply = this.multiply2;
                break;
            default :
                this.multiply = function(origin, compare){
                    if(origin[0].length && origin[0].length == origin.length ){
                        return multiply2(origin, compare);
                    }else{
                        return multiply1(origin, compare);
                    }
                }
                break;
        }
    },
    multiply : function(origin, compare){
        if(origin[0].length && origin[0].length == origin.length ){
            return this.multiply2(origin, compare);
        }else{
            return this.multiply1(origin, compare);
        }
    },
    multiply1 : function(origin, compare){
        var step = Math.sqrt(origin.length)
        ,   nest = 0
        ,   i = 0
        ,   row = 0
        ,   col = 0
        ,   result = []
        ;

        for(var i=0; i<step; i++){
            row = 0;
            col = 0;
            for(var k=0; k<origin.length; k++){
                nest += origin[(i * step) + col] * compare[row + (col * step)];
                col += 1;
                if(col == step){
                    result.push(nest);
                    col = 0;
                    nest = 0;
                    row += 1;
                }
            }
        }
        return result;
    },
    multiply2 : function(origin, compare){
        var step = origin.length
        ,   nest = 0
        ,   i = 0
        ,   k = 0
        ,   row = 0
        ,   col = 0
        ,   result = []
        ;

        for(i=0; i<step; i++){
            row = 0;
            result[i] = [];
            for(k=0; k<(step*step); k++){
                col = k%step;
                nest += origin[i][col] * compare[col][row];
                if(col == (step-1)){
                    result[i].push(nest);
                    nest = 0;
                    row += 1;
                }
            }
        }
        return result;
    },
    inverse : function(M){
        var dim = 0;

        if(M[0].length){
            dim = M[0].length;
        }else{
            dim = Math.sqrt(M.length);
        }

        return this['inverse'+dim](M);
    },
    inverse3 : function(M){
        var type = false
        ,   C = []
        ,   d = 0
        ,   dim = 0
        ;

        if(M[0].length == M.length){
            dim = M.length;
            for(i=0; i<dim; i++){
                C = C.concat(M[i]);
            }
            type = true;
            M = C;
            C = [];
        }else{
            dim = Math.sqrt(M.length);
        }

        function loc(col, row){
            return (col*dim) + row;
        }

        function det(m){
            return (m[loc(0,0)]*m[loc(1,1)]*m[loc(2,2)] + m[loc(0,1)]*m[loc(1,2)]*m[loc(2,0)] + m[loc(0,2)]*m[loc(1,0)]*m[loc(2,1)] - m[loc(0,0)]*m[loc(1,2)]*m[loc(2,1)] - m[loc(0,1)]*m[loc(1,0)]*m[loc(2,2)] - m[loc(0,2)]*m[loc(1,1)]*m[loc(2,0)]);
        }

        d = det(M);

         if(d == 0 ){
            if(type == true){
                M = [];
                for(i=0; i<dim; i+=1){
                /* Create the row */
                    M[M.length] = [];
                    for(j=0; j<dim; j+=1){
                        M[i][j] = C[(i*dim)+j];
                    }
                }

                return M;
            }
            return C;
        }

        C[loc(0,0)] = (M[loc(1,1)]*M[loc(2,2)] - M[loc(1,2)]*M[loc(2,1)])/d;
        C[loc(0,1)] = (M[loc(0,2)]*M[loc(2,1)] - M[loc(0,1)]*M[loc(2,2)])/d;
        C[loc(0,2)] = (M[loc(0,1)]*M[loc(1,2)] - M[loc(0,2)]*M[loc(1,1)])/d;
        C[loc(1,0)] = (M[loc(1,2)]*M[loc(2,0)] - M[loc(1,0)]*M[loc(2,2)])/d;
        C[loc(1,1)] = (M[loc(0,0)]*M[loc(2,2)] - M[loc(0,2)]*M[loc(2,0)])/d;
        C[loc(1,2)] = (M[loc(0,2)]*M[loc(1,0)] - M[loc(0,0)]*M[loc(1,2)])/d;
        C[loc(2,0)] = (M[loc(1,0)]*M[loc(2,1)] - M[loc(1,1)]*M[loc(2,0)])/d;
        C[loc(2,1)] = (M[loc(0,1)]*M[loc(2,0)] - M[loc(0,0)]*M[loc(2,1)])/d;
        C[loc(2,2)] = (M[loc(0,0)]*M[loc(1,1)] - M[loc(0,1)]*M[loc(1,0)])/d;

        if(type == true){
            M = [];
            for(i=0; i<dim; i+=1){
            /* Create the row */
                M[M.length] = [];
                for(j=0; j<dim; j+=1){
                    M[i][j] = C[(i*dim)+j];
                }
            }

            return M;
        }
        return C;
    },
    inverse4 : function(M){
        var type = false
        ,   C = []
        ,   d = 0
        ,   dim = 0
        ;

        if(M[0].length == M.length){
            dim = M.length;
            for(i=0; i<dim; i++){
                C = C.concat(M[i]);
            }
            type = true;
            M = C;
            C = [];
        }else{
            dim = Math.sqrt(M.length);
        }

        function loc(col, row){
            return (col*dim) + row;
        }

        function det(m){
            var reult = 0
            return  m[loc(0,3)]*m[loc(1,2)]*m[loc(2,1)]*m[loc(3,0)] - m[loc(0,2)]*m[loc(1,3)]*m[loc(2,1)]*m[loc(3,0)] - m[loc(0,3)]*m[loc(1,1)]*m[loc(2,2)]*m[loc(3,0)] + m[loc(0,1)]*m[loc(1,3)]*m[loc(2,2)]*m[loc(3,0)] +
                    m[loc(0,2)]*m[loc(1,1)]*m[loc(2,3)]*m[loc(3,0)] - m[loc(0,1)]*m[loc(1,2)]*m[loc(2,3)]*m[loc(3,0)] - m[loc(0,3)]*m[loc(1,2)]*m[loc(2,0)]*m[loc(3,1)] + m[loc(0,2)]*m[loc(1,3)]*m[loc(2,0)]*m[loc(3,1)]+
                    m[loc(0,3)]*m[loc(1,0)]*m[loc(2,2)]*m[loc(3,1)] - m[loc(0,0)]*m[loc(1,3)]*m[loc(2,2)]*m[loc(3,1)] - m[loc(0,2)]*m[loc(1,0)]*m[loc(2,3)]*m[loc(3,1)] + m[loc(0,0)]*m[loc(1,2)]*m[loc(2,3)]*m[loc(3,1)]+
                    m[loc(0,3)]*m[loc(1,1)]*m[loc(2,0)]*m[loc(3,2)] - m[loc(0,1)]*m[loc(1,3)]*m[loc(2,0)]*m[loc(3,2)] - m[loc(0,3)]*m[loc(1,0)]*m[loc(2,1)]*m[loc(3,2)] + m[loc(0,0)]*m[loc(1,3)]*m[loc(2,1)]*m[loc(3,2)]+
                    m[loc(0,1)]*m[loc(1,0)]*m[loc(2,3)]*m[loc(3,2)] - m[loc(0,0)]*m[loc(1,1)]*m[loc(2,3)]*m[loc(3,2)] - m[loc(0,2)]*m[loc(1,1)]*m[loc(2,0)]*m[loc(3,3)] + m[loc(0,1)]*m[loc(1,2)]*m[loc(2,0)]*m[loc(3,3)]+
                    m[loc(0,2)]*m[loc(1,0)]*m[loc(2,1)]*m[loc(3,3)] - m[loc(0,0)]*m[loc(1,2)]*m[loc(2,1)]*m[loc(3,3)] - m[loc(0,1)]*m[loc(1,0)]*m[loc(2,2)]*m[loc(3,3)] + m[loc(0,0)]*m[loc(1,1)]*m[loc(2,2)]*m[loc(3,3)];
        }

        d = det(M);

        if(d == 0 ){
            if(type == true){
                M = [];
                for(i=0; i<dim; i+=1){
                /* Create the row */
                    M[M.length] = [];
                    for(j=0; j<dim; j+=1){
                        M[i][j] = C[(i*dim)+j];
                    }
                }

                return M;
            }
            return C;
        }

        C[loc(0,0)] = (M[loc(1,2)]*M[loc(2,3)]*M[loc(3,1)] - M[loc(1,3)]*M[loc(2,2)]*M[loc(3,1)] + M[loc(1,3)]*M[loc(2,1)]*M[loc(3,2)] - M[loc(1,1)]*M[loc(2,3)]*M[loc(3,2)] - M[loc(1,2)]*M[loc(2,1)]*M[loc(3,3)] + M[loc(1,1)]*M[loc(2,2)]*M[loc(3,3)])/d;
        C[loc(0,1)] = (M[loc(0,3)]*M[loc(2,2)]*M[loc(3,1)] - M[loc(0,2)]*M[loc(2,3)]*M[loc(3,1)] - M[loc(0,3)]*M[loc(2,1)]*M[loc(3,2)] + M[loc(0,1)]*M[loc(2,3)]*M[loc(3,2)] + M[loc(0,2)]*M[loc(2,1)]*M[loc(3,3)] - M[loc(0,1)]*M[loc(2,2)]*M[loc(3,3)])/d;
        C[loc(0,2)] = (M[loc(0,2)]*M[loc(1,3)]*M[loc(3,1)] - M[loc(0,3)]*M[loc(1,2)]*M[loc(3,1)] + M[loc(0,3)]*M[loc(1,1)]*M[loc(3,2)] - M[loc(0,1)]*M[loc(1,3)]*M[loc(3,2)] - M[loc(0,2)]*M[loc(1,1)]*M[loc(3,3)] + M[loc(0,1)]*M[loc(1,2)]*M[loc(3,3)])/d;
        C[loc(0,3)] = (M[loc(0,3)]*M[loc(1,2)]*M[loc(2,1)] - M[loc(0,2)]*M[loc(1,3)]*M[loc(2,1)] - M[loc(0,3)]*M[loc(1,1)]*M[loc(2,2)] + M[loc(0,1)]*M[loc(1,3)]*M[loc(2,2)] + M[loc(0,2)]*M[loc(1,1)]*M[loc(2,3)] - M[loc(0,1)]*M[loc(1,2)]*M[loc(2,3)])/d;
        C[loc(1,0)] = (M[loc(1,3)]*M[loc(2,2)]*M[loc(3,0)] - M[loc(1,2)]*M[loc(2,3)]*M[loc(3,0)] - M[loc(1,3)]*M[loc(2,0)]*M[loc(3,2)] + M[loc(1,0)]*M[loc(2,3)]*M[loc(3,2)] + M[loc(1,2)]*M[loc(2,0)]*M[loc(3,3)] - M[loc(1,0)]*M[loc(2,2)]*M[loc(3,3)])/d;
        C[loc(1,1)] = (M[loc(0,2)]*M[loc(2,3)]*M[loc(3,0)] - M[loc(0,3)]*M[loc(2,2)]*M[loc(3,0)] + M[loc(0,3)]*M[loc(2,0)]*M[loc(3,2)] - M[loc(0,0)]*M[loc(2,3)]*M[loc(3,2)] - M[loc(0,2)]*M[loc(2,0)]*M[loc(3,3)] + M[loc(0,0)]*M[loc(2,2)]*M[loc(3,3)])/d;
        C[loc(1,2)] = (M[loc(0,3)]*M[loc(1,2)]*M[loc(3,0)] - M[loc(0,2)]*M[loc(1,3)]*M[loc(3,0)] - M[loc(0,3)]*M[loc(1,0)]*M[loc(3,2)] + M[loc(0,0)]*M[loc(1,3)]*M[loc(3,2)] + M[loc(0,2)]*M[loc(1,0)]*M[loc(3,3)] - M[loc(0,0)]*M[loc(1,2)]*M[loc(3,3)])/d;
        C[loc(1,3)] = (M[loc(0,2)]*M[loc(1,3)]*M[loc(2,0)] - M[loc(0,3)]*M[loc(1,2)]*M[loc(2,0)] + M[loc(0,3)]*M[loc(1,0)]*M[loc(2,2)] - M[loc(0,0)]*M[loc(1,3)]*M[loc(2,2)] - M[loc(0,2)]*M[loc(1,0)]*M[loc(2,3)] + M[loc(0,0)]*M[loc(1,2)]*M[loc(2,3)])/d;
        C[loc(2,0)] = (M[loc(1,1)]*M[loc(2,3)]*M[loc(3,0)] - M[loc(1,3)]*M[loc(2,1)]*M[loc(3,0)] + M[loc(1,3)]*M[loc(2,0)]*M[loc(3,1)] - M[loc(1,0)]*M[loc(2,3)]*M[loc(3,1)] - M[loc(1,1)]*M[loc(2,0)]*M[loc(3,3)] + M[loc(1,0)]*M[loc(2,1)]*M[loc(3,3)])/d;
        C[loc(2,1)] = (M[loc(0,3)]*M[loc(2,1)]*M[loc(3,0)] - M[loc(0,1)]*M[loc(2,3)]*M[loc(3,0)] - M[loc(0,3)]*M[loc(2,0)]*M[loc(3,1)] + M[loc(0,0)]*M[loc(2,3)]*M[loc(3,1)] + M[loc(0,1)]*M[loc(2,0)]*M[loc(3,3)] - M[loc(0,0)]*M[loc(2,1)]*M[loc(3,3)])/d;
        C[loc(2,2)] = (M[loc(0,1)]*M[loc(1,3)]*M[loc(3,0)] - M[loc(0,3)]*M[loc(1,1)]*M[loc(3,0)] + M[loc(0,3)]*M[loc(1,0)]*M[loc(3,1)] - M[loc(0,0)]*M[loc(1,3)]*M[loc(3,1)] - M[loc(0,1)]*M[loc(1,0)]*M[loc(3,3)] + M[loc(0,0)]*M[loc(1,1)]*M[loc(3,3)])/d;
        C[loc(2,3)] = (M[loc(0,3)]*M[loc(1,1)]*M[loc(2,0)] - M[loc(0,1)]*M[loc(1,3)]*M[loc(2,0)] - M[loc(0,3)]*M[loc(1,0)]*M[loc(2,1)] + M[loc(0,0)]*M[loc(1,3)]*M[loc(2,1)] + M[loc(0,1)]*M[loc(1,0)]*M[loc(2,3)] - M[loc(0,0)]*M[loc(1,1)]*M[loc(2,3)])/d;
        C[loc(3,0)] = (M[loc(1,2)]*M[loc(2,1)]*M[loc(3,0)] - M[loc(1,1)]*M[loc(2,2)]*M[loc(3,0)] - M[loc(1,2)]*M[loc(2,0)]*M[loc(3,1)] + M[loc(1,0)]*M[loc(2,2)]*M[loc(3,1)] + M[loc(1,1)]*M[loc(2,0)]*M[loc(3,2)] - M[loc(1,0)]*M[loc(2,1)]*M[loc(3,2)])/d;
        C[loc(3,1)] = (M[loc(0,1)]*M[loc(2,2)]*M[loc(3,0)] - M[loc(0,2)]*M[loc(2,1)]*M[loc(3,0)] + M[loc(0,2)]*M[loc(2,0)]*M[loc(3,1)] - M[loc(0,0)]*M[loc(2,2)]*M[loc(3,1)] - M[loc(0,1)]*M[loc(2,0)]*M[loc(3,2)] + M[loc(0,0)]*M[loc(2,1)]*M[loc(3,2)])/d;
        C[loc(3,2)] = (M[loc(0,2)]*M[loc(1,1)]*M[loc(3,0)] - M[loc(0,1)]*M[loc(1,2)]*M[loc(3,0)] - M[loc(0,2)]*M[loc(1,0)]*M[loc(3,1)] + M[loc(0,0)]*M[loc(1,2)]*M[loc(3,1)] + M[loc(0,1)]*M[loc(1,0)]*M[loc(3,2)] - M[loc(0,0)]*M[loc(1,1)]*M[loc(3,2)])/d;
        C[loc(3,3)] = (M[loc(0,1)]*M[loc(1,2)]*M[loc(2,0)] - M[loc(0,2)]*M[loc(1,1)]*M[loc(2,0)] + M[loc(0,2)]*M[loc(1,0)]*M[loc(2,1)] - M[loc(0,0)]*M[loc(1,2)]*M[loc(2,1)] - M[loc(0,1)]*M[loc(1,0)]*M[loc(2,2)] + M[loc(0,0)]*M[loc(1,1)]*M[loc(2,2)])/d;

        if(type == true){
            M = [];
            for(i=0; i<dim; i+=1){
            /* Create the row */
                M[M.length] = [];
                for(j=0; j<dim; j+=1){
                    M[i][j] = C[(i*dim)+j];
                }
            }

            return M;
        }
        return C;
    }
};


var MatrixTransform = {
    type : MatrixCalc.type,
    multiply : MatrixCalc.multiply,
    multiply1 : MatrixCalc.multiply1,
    multiply2 : MatrixCalc.multiply2,
    matrix2dI : [1,0,0,0,1,0,0,0,1],
    matrix3dI : [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
    translate : function(value, matrix){
        var type = "2";

        type = arguments[0].length;

        return this["translate"+type+"D"](value, matrix);
    },
    translate2D : function(value, matrix){
        var translate = [
            1, 0, 0,
            0, 1, 0,
            value[0], value[1], 1
        ];
        matrix = matrix ? matrix : this.matrix2dI;

        return this.multiply(matrix, translate);
    },
    translate3D : function(value, matrix){
        var translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            value[0], value[1], value[2], 1
        ];

        matrix = matrix ? matrix : this.matrix3dI;

        return this.multiply(matrix, translate);
    },
    rotate : function(angle, matrix){
        var type = "2";
        type = angle.length ? angle.length : 2;

        return this["rotate"+type+"D"](angle, matrix);
    },
    rotate2D : function(angle, matrix){
        /* Angle is degree  */
        var c = 0
        ,   s = 0
        ,   rotate = []
        ;
        angle = angle * Math.PI/180; /* degree -> radian */

        c = Math.cos(angle);
        s = Math.sin(angle);

        matrix = matrix ? matrix : this.matrix2dI;

        rotate = [
            c, -s, 0,
            s, c, 0,
            0, 0, 1
        ];

        return this.multiply(matrix, rotate);
    },
    rotateX : function(angle, matrix){
        /* Angle is degree  */
        var c = 0
        ,   s = 0
        ,   rotate = []
        ;

        angle = angle * Math.PI/180; /* degree -> radian */

        c = Math.cos(angle);
        s = Math.sin(angle);

        matrix = matrix ? matrix : this.matrix3dI;

        rotate = [
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1
        ];

        return this.multiply(matrix, rotate);
    },
    rotateY : function(angle, matrix){
        /* Angle is degree  */
        var c = 0
        ,   s = 0
        ,   rotate = []
        ;

        angle = angle * Math.PI/180; /* degree -> radian */

        c = Math.cos(angle);
        s = Math.sin(angle);

        matrix = matrix ? matrix : this.matrix3dI;

        rotate = [
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1
        ];
        return this.multiply(matrix, rotate);
    },
    rotateZ : function(angle, matrix){
        /* Angle is degree  */
        var c = 0
        ,   s = 0
        ,   rotate = []
        ;

        angle = angle * Math.PI/180; /* degree -> radian */

        c = Math.cos(angle);
        s = Math.sin(angle);

        matrix = matrix ? matrix : this.matrix3dI;

        rotate = [
            c, s, 0, 0,
            -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        return this.multiply(matrix, rotate);
    },
    rotate3D : function(angle, matrix){

        matrix = this.rotateX(angle[0], matrix);
        matrix = this.rotateY(angle[1], matrix);
        matrix = this.rotateZ(angle[2], matrix);

        return matrix;
    },
    scale : function(value, matrix){
        if(value.length){
            return this["scale3D"](value, matrix);
        }else{
            return this["scale2D"]([value, value], matrix);
        }
    },
    scale2D : function(value, matrix){
        var scale
        ;

        matrix = matrix ? matrix : this.matrix2dI;

        scale = [
            value[0], 0, 0,
            0, value[1], 0,
            0, 0, 1
        ];

        return this.multiply(scale, matrix);
    },
    scale3D : function(value, matrix){
        var scale = []
        ;

        matrix = matrix ? matrix : this.matrix3dI;

        scale = [
            value[0], 0, 0, 0,
            0, value[1], 0, 0,
            0, 0, value[2] || 1, 0,
            0, 0, 0, 1
        ];

        return this.multiply(scale, matrix);
    },
    perspective : function(fieldOfViewInRadians, aspect, near, far){
        var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians)
        , rangeInv = 1.0 / (near - far)
        ;

        return [
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (near + far) * rangeInv, -1,
            0, 0, near * far * rangeInv * 2, 0
        ];
    },
    lookAt : function(camera, target, up){
        up = up ? up : [0,1,0];
        var z = Vector.normalize(Vector.subtract(cameraPosition, target))
        ,   x = Vector.cross(up, z)
        ,   y = Vector.cross(z, x)
        ;

        return [
            x[0], x[1], x[2], 0,
            y[0], y[1], y[2], 0,
            z[0], z[1], z[2], 0,
            cameraPosition[0], cameraPosition[1], cameraPosition[2], 1
        ];
    },
    cameraForElement: function(cameraLoc, targetLoc, targets){
        var cameraMatrix
        ,   camreraMatrixInverse
        ,   targetMatrix
        ,   viewMatrix
        ;

        cameraMatrix = this.lookAt(cameraLoc, target, [0,1,0]);
        camreraMatrixInverse = this.inverse(cameraMatrix);

        for(var i=0; i<target.lenght; i++){
            var thisTarget = target[i];
            targetMatrix = this.matrix3dI;

            for(var key in thisTarget){
                targetMatrix = this[key](targetMatrix, thisTarget[key]);
                viewMatrix[i] = MatrixCalc.multiply(targetMatrix, camreraMatrixInverse);
                if(thisTarget.hasOwnProperty('element')){
                    element.style.transform = 'matrix3d('+ viewMatrix[i] +')';
                }
            }
        }
    }
};

var Vector = {
    cross : function(a, b){
        return [
            a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]
        ];
    },
    normalize : function(v){
        var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        /* make sure we don't divide by 0. */
        if (length > 0.00001) {
            return [v[0] / length, v[1] / length, v[2] / length];
        } else {
            return [0, 0, 0];
        }
    },
    dot : function(a, b){
        return a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
    },
    subtract: function(a, b) {
        return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    }
};
