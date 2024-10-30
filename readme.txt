=== CFF Area and Perimeter Operations ===
Contributors: codepeople
Tags:music cff,area,perimeter,2D,figure,operation,equation,calculated,calculated fields form
Donate link: https://cff-bundles.dwbooster.com/product/area-perimeter-operations
Requires at least: 4.4
Requires PHP: 5.4
Tested up to: 6.7
Stable tag: 1.0.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Implements operations for calculating the figure areas and perimeters to use with the Calculated Fields Forms equations.

== Description ==

The plugin implements the "Area and Perimeter" operations module to be used from the equations of the ["Calculated Fields Form"](https://wordpress.org/plugins/calculated-fields-form/) plugin. The "Calculated Fields Form" plugin is a form builder with a lot of potential, and its "Calculated" control is one of its great strengths. It allows you to enter mathematical formulas, determine the distance between addresses, plot graphs, process dates, manage files, and many other operations.

[youtube https://youtu.be/6p41LaN9lQs]

The "CFF Area and Perimeter Operations" plugin enhances, even more, the possibilities of the ["Calculated Fields Form"](https://wordpress.org/plugins/calculated-fields-form/) plugin, including operations to calculate the area and perimeter of figures like squares, triangles, rhombus, circles, ellipse, and even more important, regular and irregular polygons. The Area and Perimeter operations included by the plugin are listed below:

**NVERTICESAREA**: Calculates the area of a 2D figure given its vertices. The vertices are pairs of x,y coordinates. The operation returns null if the parameters are invalid or insufficient.

Ex: **NVERTICESAREA([4,10],[9,7],[11,2],[2,2])** Result: **45.5**

**NVERTICESPERIMETER**: Calculates the perimeter of a 2D figure given its vertices. The vertices are pairs of x,y coordinates. The operation returns null if the parameters are invalid or insufficient.

Ex: **NVERTICESPERIMETER([4,10],[9,7],[11,2],[2,2])** Result: **28.46**

**NSIDESAREA**: Calculates the area of a 2D figure given its sides. The sides are numbers only. The operation returns null if the parameters are invalid or insufficient, or it is not a polygon. For irregular polygons the operations returns the maximum area.

Ex: **NSIDESAREA(9,8,9,20)** Result: **93.91**

**NSIDESPERIMETER**: Calculates the perimeter of a 2D figure given its sides. The sides are numbers only. The operation returns null if the parameters are invalid or insufficient, or it is not a polygon.

Ex: **NSIDESPERIMETER(9,8,9,20)** Result: **46**

**SQUAREAREA**: Calculates the area of a square. Accepts the side of the square as a parameter. The operation returns null if the parameter is not a number.

Ex: **SQUAREAREA(9)** Result: **81**

**SQUAREPERIMETER**: Calculates the perimeter of a square. Accepts the side of the square as a parameter. The operation returns null if the parameter is not a number.

Ex: **SQUAREPERIMETER(9)** Result: **36**

**TRIANGLEAREA**: Calculates the area of the triangle given its base and height. The operation returns null if the parameters are not numbers.

Ex: **TRIANGLEAREA(4,5)** Result: **10**

**TRIANGLEPERIMETER**: Calculates the perimeter of the triangle given two or three sides. If you pass only two sides as parameters, the plugin assumes it is a right triangle and calculates its hypotenuse. The operation returns null if the parameters are not numbers.

Ex: **TRIANGLEAREA(3,4)** Result: **12**
Ex: **TRIANGLEAREA(3,4,5)** Result: **12**

**RHOMBUSAREA**: Calculates the area of a rombo given its diagonals. The operation returns null if the parameters are not numbers.

Ex: **RHOMBUSAREA(3,4)** Result: **6**

**RHOMBUSPERIMETER**: Calculates the perimeter of a rombo area given its side or diagonals. If you pass two parameters to the RHOMBUSPERIMETER operation, it assumes they are the rombo diagonals. The operation returns null if the parameters are not numbers.

Ex: **RHOMBUSPERIMETER(6,8)** Result: **20**
Ex: **RHOMBUSPERIMETER(5)** Result: **20**

**ELLIPSEAREA**: Calculates the area of an ellipse given two semi-axis. The operation returns null if the parameters are not numbers.

Ex: **ELLIPSEAREA(7,5)** Result: **109.96**

**ELLIPSEPERIMETER**: Calculates the perimeter of an ellipse given two semi-axis. The operation returns null if the parameters are not numbers.

Ex: **ELLIPSEPERIMETER(2,3)** Result: **16.02**

**CIRCLEAREA**: Calculates the area of a circle given its radius. The operation returns null if the parameter is not a number.

Ex: **CIRCLEAREA(3)** Result: **28.27**

**CIRCLEPERIMETER**: Calculates the perimeter of a circle given its radius. The operation returns null if the parameter is not a number.

Ex: **CIRCLEPERIMETER(3)** Result: **18.85**

== Installation ==

To install the "CFF Area and Perimeter Operations" plugin:

*	Go to the Plugins section on your WordPress.
*	Press the "Add New" button at the top of the Plugins section (or WordPress submenu).
*	Enter the "CFF Area and Perimeter Operations" into the search box.
*	Press the corresponding "Install" button.
*	And finally, press the "Activate" one.

== Use ==

The "CFF Area and Perimeter Operations" plugin includes the new "Area and Perimeter" entry (see screenshots) in the operations list of the calculated fields (Insert a calculated field in the form and scroll down the operations list in your configuration). Once the "Area and Perimeter" option is selected, the plugin enables the operations set and documentation. By clicking on the operation buttons, they are added to the equation's editor.

== Screenshots ==
01. Area and Perimeter operations list item
02. Area and Perimeter operations buttons
03. Equations editor and operation documentation

== Changelog ==

= 1.0.1 =

* Modifies the operations NSIDESAREA, NSIDESPERIMETER, TRIANGLEPERIMETER, and RHOMBUSPERIMETER for accepting sides array as argument.

= 1.0.0 =

* First version released.