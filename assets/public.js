( function(){

	function _error_log( str ) {
		if ( 'console' in window ) {
			console.log( str );
		}
		return null;
	} // End _error_log

	function _lineal_array( l ) {
		let result = [];

		for ( let i in l ) {
			if ( Array.isArray( l[i] ) ) {
				result = result.concat( _lineal_array( l[i] ) );
			} else {
				result.push( l[i] );
			}
		}

		return result;
	} // End _lineal_array

	function _is_polygon( s ) {
		var p = NSIDESPERIMETER.apply( null, s );
		if ( p ) {
			for ( let i in s ) {
				if ( p - s[i] < s[i]) {
					return false;
				}
			}
			return true;
		}
		return false;
	} // End _is_polygon

	function _round( v, d ) {
		d = d || 2;
		let p = Math.pow( 10, d );
		return Math.round( v * p ) / p;
	} // End _round

	function _degrees_to_radians(degrees) {
		return degrees * (Math.PI / 180);
	} // End _degrees_to_radians

	function _irregular( s ) {
		let f = function( r ) {
				let sum=0;
				for ( let i=0; i < h; i++ ) {
					sum += Math.acos(1-(s[i]*s[i])/(2*r*r));
				}
				return ( sum - 2 * Math.PI ).toFixed(6);    // round to 6 digits
			},

			f2 = function( r ) {
				let sum=0;
				for ( let i=0; i < h; i++ ) {
					sum += ( i != k ? 1 : -1 ) * Math.acos(1-(s[i]*s[i])/(2*r*r));
				}
				return sum;
			},
			d = Math.max.apply( Math, s ),
			k = s.indexOf(d),
			h = s.length,
			n = 2,
			c = Math.MAX_VALUE,
			r = d/2,
			rl = r,
			rr = n * rl,
			t1 = f( rl ),
			t2 = f( rr ),
			A  = 0;

		while ( n < 30 && 0.005 < Math.abs( t1 ) && 0 < t1 * t2 ) {
			n++;
			rr = n * rl;
			t2 = f( rr );
		}

		if ( 0 < t1 * t2 ) {
			n = 2;
			rr = n * rl;
			t1 = f2( rl );
			t2 = f2( rr );

			while ( n < 30 && 0.001 < Math.abs( t1 ) && 0 < t1 * t2 ) {
				n++;
				rr = n * rl;
				t2 = f( rr );
			}

			n = 1;
			while ( n < 10 && 0.01 < Math.abs( f2( r ) ) ) {
				t1 = f2( rl );
				t2 = f2( rr );
				t3 = f2( ( rl + rr) / 2 );
				if ( t1 * t3 <= 0 ) {
					rr = ( rl + rr ) / 2;
				} else if ( t2 * t3 <= 0 ) {
					rl = ( rl + rr ) / 2;
				}
				r = ( rl + rr ) / 2;
				n++;
			}

			for ( let i = 0; i < h; i++ ) {
				A += ( i==k ? -1 : 1) * NSIDESAREA( s[i], r, r );
			}
		} else {
			n = 1;
			while ( n < 20 && 0.001 < Math.abs( f( r ) ) ) {
				t1 = f( rl );
				t2 = f( rr );
				t3 = f( ( rl + rr) / 2 );
				if ( t1 * t3 <= 0 ) {
					rr = ( rl + rr ) / 2;
				} else if ( t2 * t3 <= 0 ) {
					rl = ( rl + rr ) / 2;
				}
				r = ( rl + rr ) / 2;
				n++;
			};

			for ( let i = 0; i < h; i++ ) {
				A += NSIDESAREA( s[i], r, r );
			}
		}

		return A;
	} // End _irregular

	if( ! ( 'NVERTICESAREA' in window ) ) {
		window['NVERTICESAREA'] = window['nverticesarea'] = function () {
			let s = [].slice.call( arguments ),
				coordinates = [],
				area = 0,
				j;
			for ( let i in s ) {
				if ( Array.isArray( s[i] ) && 2 == s[i].length ) {
					coordinates.push( s[i] );
				} else {
					return _error_log( 'NVERTICESAREA - Invalid arguments' );
				}
			}

			j = coordinates.length - 1;
			if ( 2 < j ) {
				for ( let i = 0, n = coordinates.length; i < n; i++ ) {
					area += ( coordinates[j][0] + coordinates[i][0] ) * ( coordinates[j][1] - coordinates[i][1] );
					j = i;
				}
			} else {
				return _error_log( 'NVERTICESAREA - It requires a minimum of three vertices' );
			}

			return _round( Math.abs( area / 2 ) );
		};
	}

	if( ! ( 'NVERTICESPERIMETER' in window ) ) {
		window['NVERTICESPERIMETER'] = window['nverticesperimeter'] = function () {
			let s = [].slice.call( arguments ),
				coordinates = [],
				length = 0,
				j;
			for ( let i in s ) {
				if ( Array.isArray( s[i] ) && 2 == s[i].length ) {
					coordinates.push( s[i] );
				} else {
					return _error_log( 'NVERTICESPERIMETER - Invalid arguments' );
				}
			}

			j = coordinates.length - 1;
			for ( let i = 0, n = coordinates.length; i < n; i++ ) {
				length += Math.sqrt( Math.pow(coordinates[j][0] - coordinates[i][0], 2 ) + Math.pow( coordinates[j][1] - coordinates[i][1], 2 ) );
				j = i;
			}

			return _round( length );
		};
	}

	/*
		Area an perimeters by sides.
		It calculates the maximum area for polygons with more than three sides (Triangles).
	*/
	var _regular = true;

	if( ! ( 'NSIDESAREA' in window ) ) {
		window['NSIDESAREA'] = window['nsidesarea'] = function () {
			let s = _lineal_array( [].slice.call( arguments ) ),
				l = s.length;

			if ( l < 2 ) {
				return _error_log( 'NSIDESAREA - Insufficient number of sides' );
			} else if ( 2 == l ) {
				return TRIANGLEAREA.apply( null, s );
			} else if ( _is_polygon( s ) ) {
				let	p = NSIDESPERIMETER.apply( null, s );
				if ( null != p) {
					let area = 0;
					if ( _regular ) {
						area = p * ( s[0] / ( 2 * Math.tan( _degrees_to_radians( 180/l ) ) ) ) / 2;
					} else if ( l == 3 ) {
						area = p/2;
						for ( let i = 0; i < l; i++ ) {
							area *= p/2 - s[i];
						}
						area = Math.sqrt( area );
					} else if ( l == 4 ) {
						area = 1;
						for ( let i = 0; i < l; i++ ) {
							area *= p/2 - s[i];
						}
						area = Math.sqrt( area );
					} else { // Irregular polygons with 4 < sides
						area = _irregular( s );
					}
					return _round( area );
				} else {
					return _error_log( 'NSIDESAREA - Invalid arguments' );
				}
			} else {
				return _error_log( 'NSIDESAREA - It is not a polygon' );
			}
		};
	}

	if( ! ( 'NSIDESPERIMETER' in window ) ) {
		window['NSIDESPERIMETER'] = window['nsidesperimeter'] = function () {
			let s = _lineal_array( [].slice.call( arguments ) ),
				length = 0,
				side,
				tmp;

			_regular = true;
			for ( let i in s ) {
				side = s[i]*1;
				if ( tmp && tmp != side ) {
					_regular = false;
				}
				if ( isNaN( side ) ) {
					return _error_log( 'NSIDESPERIMETER - Invalid arguments' );
				}
				length += side;
				tmp = side;
			}
			return _round( length );
		};
	}

	if( ! ( 'SQUAREAREA' in window ) ) {
		window['SQUAREAREA'] = window['squarearea'] = function ( side ) {
			side *= 1;
			if ( isNaN( side ) ) {
				return _error_log( 'SQUAREAREA - Invalid arguments' );
			}
			return _round( Math.pow( side, 2 ) );
		};
	}

	if( ! ( 'SQUAREPERIMETER' in window ) ) {
		window['SQUAREPERIMETER'] = window['squareperimeter'] = function ( side ) {
			return NSIDESPERIMETER( side, side, side, side );
		};
	}

	if( ! ( 'TRIANGLEAREA' in window ) ) {
		window['TRIANGLEAREA'] = window['trianglearea'] = function ( b, h ) {
			b *= 1;
			h *= 1;
			if ( isNaN( b ) || isNaN( h ) ) {
				return _error_log( 'TRIANGLEAREA - Invalid arguments' );
			}
			return _round( 0.5 * b * h );
		};
	}

	if( ! ( 'TRIANGLEPERIMETER' in window ) ) {
		window['TRIANGLEPERIMETER'] = window['TRIANGLEPERIMETER'] = function () {
			let s = _lineal_array( [].slice.call( arguments ) ),
				l = s.length;

			if ( l < 2 || 3 < l ) {
				return _error_log( 'TRIANGLEPERIMETER - Invalid arguments' );
			}

			let l1 = s[0]*1,
				l2 = s[1]*1,
				l3;

			if ( isNaN( l1 ) || isNaN( l2 ) ) {
				return _error_log( 'TRIANGLEPERIMETER - Invalid arguments' );
			}

			if ( l == 2 ) {
				l3 = Math.sqrt( Math.pow(l1, 2) + Math.pow(l2, 2) );
			} else {
				l3 = s[2]*1;
			}

			if ( isNaN( l3 ) ) {
				return _error_log( 'TRIANGLEPERIMETER - Invalid arguments' );
			}

			return NSIDESPERIMETER( l1, l2, l3 );
		};
	}

	if( ! ( 'RHOMBUSAREA' in window ) ) {
		window['RHOMBUSAREA'] = window['rhombusarea'] = function ( d1, d2 ) {
			d1 *= 1;
			d2 *= 1;
			if ( isNaN( d1 ) || isNaN( d2 ) ) {
				return _error_log( 'RHOMBUSAREA - Invalid arguments' );
			}
			return _round( d1 * d2 * 0.5 );
		};
	}

	if( ! ( 'RHOMBUSPERIMETER' in window ) ) {
		window['RHOMBUSPERIMETER'] = window['rhombusperimeter'] = function () {
			let s = _lineal_array( [].slice.call( arguments ) );

			if ( 4 <= s.length ) { // Four rhombus sides
				return NSIDESPERIMETER.apply( null, s.slice( 0, 4 ) );
			} else if ( 2 == s.length ) { // Rhombus diagonals
				let d1 = s[0] * 1,
					d2 = s[1] * 1,
					l;

				if ( isNaN( d1 ) || isNaN( d2 ) ) {
					return _error_log( 'RHOMBUSPERIMETER - Invalid arguments' );
				}

				l = Math.sqrt( Math.pow( d1/2, 2 ) + Math.pow( d2/2, 2 ) );
				return SQUAREPERIMETER( l );
			} else if ( 1 == s.length ) { // Only one side
				return SQUAREPERIMETER.apply( null, s );
			}
			else {
				return _error_log( 'RHOMBUSPERIMETER - Invalid arguments' );
			}

		};
	}

	if( ! ( 'ELLIPSEAREA' in window ) ) {
		window['ELLIPSEAREA'] = window['ellipsearea'] = function ( r1, r2 ) {
			r1 *= 1;
			r2 *= 1;
			if ( isNaN( r1 ) || isNaN( r2 ) ) {
				return _error_log( 'ELLIPSEAREA - Invalid arguments' );
			}
			return _round( r1 * r2 * Math.PI );
		};
	}

	if( ! ( 'ELLIPSEPERIMETER' in window ) ) {
		window['ELLIPSEPERIMETER'] = window['ellipseperimeter'] = function ( r1, r2 ) {
			r1 *= 1;
			r2 *= 1;
			if ( isNaN( r1 ) || isNaN( r2 ) ) {
				return _error_log( 'ELLIPSEPERIMETER - Invalid arguments' );
			}

			return _round( 2 * Math.PI * Math.sqrt( ( Math.pow( r1, 2 ) + Math.pow( r2, 2 ) ) / 2 ) );
		};
	}

	if( ! ( 'CIRCLEAREA' in window ) ) {
		window['CIRCLEAREA'] = window['circlearea'] = function ( r ) {
			r *= 1;
			if ( isNaN( r ) ) {
				return _error_log( 'CIRCLEAREA - Invalid arguments' );
			}
			return ELLIPSEAREA( r, r );
		};
	}

	if( ! ( 'CIRCLEPERIMETER' in window ) ) {
		window['CIRCLEPERIMETER'] = window['circleperimeter'] = function ( r ) {
			r *= 1;
			if ( isNaN( r ) ) {
				return _error_log( 'CIRCLEPERIMETER - Invalid arguments' );
			}
			return ELLIPSEPERIMETER( r, r );
		};
	}

} )();