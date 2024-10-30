fbuilderjQuery = (typeof fbuilderjQuery != 'undefined' ) ? fbuilderjQuery : jQuery;
fbuilderjQuery[ 'fbuilder' ] = fbuilderjQuery[ 'fbuilder' ] || {};
fbuilderjQuery[ 'fbuilder' ][ 'modules' ] = fbuilderjQuery[ 'fbuilder' ][ 'modules' ] || {};

fbuilderjQuery[ 'fbuilder' ][ 'modules' ][ 'area-perimeter' ] = {
	'tutorial' : 'https://cff-bundles.dwbooster.com/product/area-perimeter-operations',
	'toolbars'		: {
		'area-perimeter' : {
			'label' : 'Areas and Perimeters',
			'buttons' : [
							{
								"value" : "NVERTICESAREA",
								"code"  : "NVERTICESAREA(",
								"tip"   : "<p>Calculates the area of a 2D figure given its vertices. The vertices are pairs of x,y coordinates.</p>"+
								"<p>The operation returns null if the parameters are invalid or insufficient.</p>"+
								"<p>Ex: <strong>NVERTICESAREA([4,10],[9,7],[11,2],[2,2])</strong> Result: <strong>45.5</strong></p>"
							},
							{
								"value" : "NVERTICESPERIMETER",
								"code"  : "NVERTICESPERIMETER(",
								"tip"   : "<p>Calculates the perimeter of a 2D figure given its vertices. The vertices are pairs of x,y coordinates.</p>"+
								"<p>The operation returns null if the parameters are invalid or insufficient.</p>"+
								"<p>Ex: <strong>NVERTICESPERIMETER([4,10],[9,7],[11,2],[2,2])</strong> Result: <strong>28.46</strong></p>"
							},
							{
								"value" : "NSIDESAREA",
								"code"  : "NSIDESAREA(",
								"tip"   : "<p>Calculates the area of a 2D figure given its sides. The sides are numbers only.</p>"+
								"<p>The operation returns null if the parameters are invalid or insufficient, or it is not a polygon. For irregular polygons the operations returns the maximum area.</p>"+
								"<p>Ex: <strong>NSIDESAREA(9,8,9,20)</strong> Result: <strong>93.91</strong></p>"
							},
							{
								"value" : "NSIDESPERIMETER",
								"code"  : "NSIDESPERIMETER(",
								"tip"   : "<p>Calculates the perimeter of a 2D figure given its sides. The sides are numbers only.</p>"+
								"<p>The operation returns null if the parameters are invalid or insufficient, or it is not a polygon.</p>"+
								"<p>Ex: <strong>NSIDESPERIMETER(9,8,9,20)</strong> Result: <strong>46</strong></p>"
							},
							{
								"value" : "SQUAREAREA",
								"code"  : "SQUAREAREA(",
								"tip"   : "<p>Calculates the area of a square. Accepts the side of the square as a parameter.</p>"+
								"<p>The operation returns null if the parameter is not a number.</p>"+
								"<p>Ex: <strong>SQUAREAREA(9)</strong> Result: <strong>81</strong></p>"
							},
							{
								"value" : "SQUAREPERIMETER",
								"code"  : "SQUAREPERIMETER(",
								"tip"   : "<p>Calculates the perimeter of a square. Accepts the side of the square as a parameter.</p>"+
								"<p>The operation returns null if the parameter is not a number.</p>"+
								"<p>Ex: <strong>SQUAREPERIMETER(9)</strong> Result: <strong>36</strong></p>"
							},
							{
								"value" : "TRIANGLEAREA",
								"code"  : "TRIANGLEAREA(",
								"tip"   : "<p>Calculates the area of the triangle given its base and height.</p>"+
								"<p>The operation returns null if the parameters are not numbers.</p>"+
								"<p>Ex: <strong>TRIANGLEAREA(4,5)</strong> Result: <strong>10</strong></p>"
							},
							{
								"value" : "TRIANGLEPERIMETER",
								"code"  : "TRIANGLEPERIMETER(",
								"tip"   : "<p>Calculates the perimeter of the triangle given two or three sides. If you pass only two sides as parameters, the plugin assumes it is a right triangle and calculates its hypotenuse.</p>"+
								"<p>The operation returns null if the parameters are not numbers.</p>"+
								"<p>Ex: <strong>TRIANGLEAREA(3,4)</strong> Result: <strong>12</strong></p>"+
								"<p>Ex: <strong>TRIANGLEAREA(3,4,5)</strong> Result: <strong>12</strong></p>"
							},
							{
								"value" : "RHOMBUSAREA",
								"code"  : "RHOMBUSAREA(",
								"tip"   : "<p>Calculates the area of a rombo given its diagonals.</p>"+
								"<p>The operation returns null if the parameters are not numbers.</p>"+
								"<p>Ex: <strong>RHOMBUSAREA(3,4)</strong> Result: <strong>6</strong></p>"
							},
							{
								"value" : "RHOMBUSPERIMETER",
								"code"  : "RHOMBUSPERIMETER(",
								"tip"   : "<p>Calculates the perimeter of a rombo area given its side or diagonals. If you pass two parameters to the RHOMBUSPERIMETER operation, it assumes they are the rombo diagonals.</p>"+
								"<p>The operation returns null if the parameters are not numbers.</p>"+
								"<p>Ex: <strong>RHOMBUSPERIMETER(6,8)</strong> Result: <strong>20</strong></p>"+
								"<p>Ex: <strong>RHOMBUSPERIMETER(5)</strong> Result: <strong>20</strong></p>"
							},
							{
								"value" : "ELLIPSEAREA",
								"code"  : "ELLIPSEAREA(",
								"tip"   : "<p>Calculates the area of an ellipse given two semi-axis.</p>"+
								"<p>The operation returns null if the parameters are not numbers.</p>"+
								"<p>Ex: <strong>ELLIPSEAREA(7,5)</strong> Result: <strong>109.96</strong></p>"
							},
							{
								"value" : "ELLIPSEPERIMETER",
								"code"  : "ELLIPSEPERIMETER(",
								"tip"   : "<p>Calculates the perimeter of an ellipse given two semi-axis.</p>"+
								"<p>The operation returns null if the parameters are not numbers.</p>"+
								"<p>Ex: <strong>ELLIPSEPERIMETER(2,3)</strong> Result: <strong>16.02</strong></p>"
							},
							{
								"value" : "CIRCLEAREA",
								"code"  : "CIRCLEAREA(",
								"tip"   : "<p>Calculates the area of a circle given its radius.</p>"+
								"<p>The operation returns null if the parameter is not a number.</p>"+
								"<p>Ex: <strong>CIRCLEAREA(3)</strong> Result: <strong>28.27</strong></p>"
							},
							{
								"value" : "CIRCLEPERIMETER",
								"code"  : "CIRCLEPERIMETER(",
								"tip"   : "<p>Calculates the perimeter of a circle given its radius.</p>"+
								"<p>The operation returns null if the parameter is not a number.</p>"+
								"<p>Ex: <strong>CIRCLEPERIMETER(3)</strong> Result: <strong>18.85</strong></p>"
							}
						]
		}
	}
};