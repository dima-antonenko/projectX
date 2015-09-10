/*!
 * jQuery JavaScript Library v1.11.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-17T15:27Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.2",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement("a");
      originAnchor.href = location.href;
      var urlAnchor = document.createElement("a");

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // Make sure that the browser parses the URL and that the protocols and hosts match.
        return !urlAnchor.protocol || !urlAnchor.host ||
          (originAnchor.protocol + "//" + originAnchor.host !==
            urlAnchor.protocol + "//" + urlAnchor.host);
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on("pageshow.rails", function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
/*
*  Altair Admin
*  author: tzd
*
*  TOC:
*  1. Init functions
*  2. Helpers / Variables
*  3. Common functions & variables
*
* */

// 1. Init functions

    $(function() {
        "use strict";

        // fastClick (touch devices)
        if(Modernizr.touch) {
            FastClick.attach(document.body);
        }

        // page onload functions
        altair_page_onload.init();

        // main header
        altair_main_header.init();

        // main sidebar
        altair_main_sidebar.init();
        // secondary sidebar
        altair_secondary_sidebar.init();

        // top bar
        altair_top_bar.init();

        // material design
        altair_md.init();

        // forms
        altair_forms.init();

        // uikit custom code
        altair_uikit.init();

        // truncate text helper
        altair_helpers.truncate_text($('.truncate-text'));

    });


// 2. Helpers

    /* Detect hi-res devices */
    function isHighDensity() {
        return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
    }

	/*
	* debouncedresize: special jQuery event that happens once after a window resize
	* throttledresize: special jQuery event that happens at a reduced rate compared to "resize"
	*
	* latest version and complete README available on Github:
	* https://github.com/louisremi/jquery-smartresize
	*
	* Copyright 2012 @louis_remi
	* Licensed under the MIT license.
    *
	*/
	(function(a){var d=a.event,b,c;b=d.special.debouncedresize={setup:function(){a(this).on("resize",b.handler)},teardown:function(){a(this).off("resize",b.handler)},handler:function(a,f){var g=this,h=arguments,e=function(){a.type="debouncedresize";d.dispatch.apply(g,h)};c&&clearTimeout(c);f?e():c=setTimeout(e,b.threshold)},threshold:150}})(jQuery);
    (function(b){var f=b.event,c,g={_:0},a=0,d,e;c=f.special.throttledresize={setup:function(){b(this).on("resize",c.handler)},teardown:function(){b(this).off("resize",c.handler)},handler:function(h,k){var l=this,m=arguments;d=!0;e||(setInterval(function(){a++;if(a>c.threshold&&d||k)h.type="throttledresize",f.dispatch.apply(l,m),d=!1,a=0;9<a&&(b(g).stop(),e=!1,a=0)},30),e=!0)},threshold:0}})(jQuery);

    /* Calculate Scrollbar Width (http://chris-spittles.co.uk/jquery-calculate-scrollbar-width/) */
    function scrollbarWidth(){var a=jQuery('<div style="width: 100%; height:200px;">test</div>'),b=jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append(a),c=a[0],a=b[0];jQuery("body").append(a);c=c.offsetWidth;b.css("overflow","scroll");a=a.clientWidth;b.remove();return c-a};


    /* random id generator */
        function randID_generator() {
            var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            return randLetter + Date.now();
        }

    /* reverse array */
    jQuery.fn.reverse = [].reverse;

    /* serialize form */
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    /* hex 2 rgba conversion */
    function hex2rgba(hex,opacity){
        hex = hex.replace('#','');
        r = parseInt(hex.substring(0,2), 16);
        g = parseInt(hex.substring(2,4), 16);
        b = parseInt(hex.substring(4,6), 16);

        result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return result;
    }

    /* modernizer test for localStorage */
    function lsTest(){
        var test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch(e) {
            return false;
        }
    }

    // selectize plugin
    if(typeof $.fn.selectize != 'undefined') {

        Selectize.define('dropdown_append_page', function(options) {
            this.positionDropdown = (function () {
                var $control = this.$control,
                    offset = $control.offset(),
                    offset_left = offset.left - parseInt($page_content.css('margin-left')),
                    offset_top = offset.top + $page_content.scrollTop() - $page_content.position().top + $control.outerHeight(true);

                this.$dropdown.css({
                    width : $control.outerWidth(),
                    top   : offset_top,
                    left  : offset_left
                });

            });
        });

        Selectize.define('dropdown_after', function(options) {
            this.positionDropdown = (function () {
                var $control = this.$control,
                    position = $control.position(),
                    position_left = position.left,
                    position_top = position.top + $control.outerHeight(true) + 32;

                this.$dropdown.css({
                    width : $control.outerWidth(),
                    top   : position_top,
                    left  : position_left
                });

            });
        });

    }


// 3. Common functions & variables

    // 3.1 material design easing
    // 3.2 page onload init functions
    // 3.3 page content
    // 3.4 forms
    // 3.5 main sidebar / main menu (left)
    // 3.6 secondary sidebar (right)
    // 3.7 top bar
    // 3.8 main header
    // 3.9 material design
    // 3.10 common helpers
    // 3.11 uikit custom


    // 3.1 material design easing
    easing_swiftOut = [ 0.4,0,0.2,1 ];

    var $body = $('body'),
        $document = $(document),
        $window = $(window),
        $page_content = $('#page_content'),
        $page_content_inner = $('#page_content_inner'),
        $sidebar_main = $('#sidebar_main'),
        $sidebar_main_toggle = $('#sidebar_main_toggle'),
        $sidebar_secondary = $('#sidebar_secondary'),
        $sidebar_secondary_toggle = $('#sidebar_secondary_toggle'),
        $topBar = $('#top_bar'),
        $header_main = $('#header_main'),
        header__main_height = 48;


    // 3.2 page init functions
    altair_page_onload = {
        init: function() {
            $window.load(function(){
                // fire functions on window load
                altair_helpers.hierarchical_show();
                altair_helpers.hierarchical_slide();
            });
        }
    };

    // 3.3 page content
    altair_page_content = {
        hide_content_sidebar: function() {
            if(!$body.hasClass('header_double_height')) {
                $page_content.css({
                    'paddingRight': scrollbarWidth(),
                    'overflow': 'hidden'
                });
            }
        },
        show_content_sidebar: function() {
            if(!$body.hasClass('header_double_height')) {
                $page_content.css({
                    'paddingRight': '',
                    'overflow': ''
                });
            }
        }
    };

    // 3.4 forms
    altair_forms = {
        init: function() {
            altair_forms.textarea_autosize();
            altair_forms.select_elements();
            altair_forms.switches();
        },
        textarea_autosize: function() {
            autosize($('textarea.textarea_autosize,textarea.md-input'));
        },
        select_elements: function() {

            var $selectize = $("[data-md-selectize],.data-md-selectize");

            $selectize.each(function(){
                var $this = $(this);
                if(!$this.hasClass('selectized')) {
                    var thisPosBottom = $this.attr('data-md-selectize-bottom');
                    $this
                        .after('<div class="selectize_fix"></div>')
                        .selectize({
                            plugins: [
                                'dropdown_append_page'
                            ],
                            dropdownParent: $page_content,
                            hideSelected: true,
                            onDropdownOpen: function($dropdown) {
                                $dropdown
                                    .hide()
                                    .velocity('slideDown', {
                                        begin: function() {
                                            if (typeof thisPosBottom !== 'undefined') {
                                                $dropdown.css({'margin-top':'0'})
                                            }
                                        },
                                        duration: 200,
                                        easing: easing_swiftOut
                                    })
                            },
                            onDropdownClose: function($dropdown) {
                                $dropdown
                                    .show()
                                    .velocity('slideUp', {
                                        complete: function() {
                                            if (typeof thisPosBottom !== 'undefined') {
                                                $dropdown.css({'margin-top': ''})
                                            }
                                        },
                                        duration: 200,
                                        easing: easing_swiftOut
                                    });
                            }
                        });
                }
            });

            // dropdowns
            var $selectize_inline = $("[data-md-selectize-inline]");

            $selectize_inline.each(function(){
                var $this = $(this);
                if(!$this.hasClass('selectized')) {
                    var thisPosBottom = $this.attr('data-md-selectize-bottom');
                    $this
                        .after('<div class="selectize_fix"></div>')
                        .closest('div').addClass('uk-position-relative')
                        .end()
                        .selectize({
                            plugins: [
                                'dropdown_after'
                            ],
                            dropdownParent: $this.closest('div'),
                            hideSelected: true,
                            onDropdownOpen: function($dropdown) {
                                $dropdown
                                    .hide()
                                    .velocity('slideDown', {
                                        begin: function() {
                                            if (typeof thisPosBottom !== 'undefined') {
                                                $dropdown.css({'margin-top':'0'})
                                            }
                                        },
                                        duration: 200,
                                        easing: easing_swiftOut
                                    })
                            },
                            onDropdownClose: function($dropdown) {
                                $dropdown
                                    .show()
                                    .velocity('slideUp', {
                                        complete: function() {
                                            if (typeof thisPosBottom !== 'undefined') {
                                                $dropdown.css({'margin-top': ''})
                                            }
                                        },
                                        duration: 200,
                                        easing: easing_swiftOut
                                    });
                            }
                        });
                }
            })

        },
        switches: function() {
            var $elem = $('[data-switchery]');
            if($elem.length) {
                $elem.each(function() {
                    var $this = this,
                        this_size = $($this).attr('data-switchery-size'),
                        this_color = $($this).attr('data-switchery-color'),
                        this_secondary_color = $($this).attr('data-switchery-secondary-color');

                    new Switchery($this, {
                        color: (typeof this_color !== 'undefined') ? hex2rgba(this_color,50) : hex2rgba('#009688',50),
                        jackColor: (typeof this_color !== 'undefined') ? hex2rgba(this_color,100) : hex2rgba('#009688',100),
                        secondaryColor: (typeof this_secondary_color !== 'undefined') ? hex2rgba(this_secondary_color,50) : 'rgba(0, 0, 0,0.26)',
                        jackSecondaryColor: (typeof this_secondary_color !== 'undefined') ? hex2rgba(this_secondary_color,50) : '#fafafa',
                        className: 'switchery' + ( (typeof this_size !== 'undefined') ? ' switchery-'+ this_size : '' )
                    });
                })
            }
        },
        parsley_validation_config: function() {
            window.ParsleyConfig = {
                excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden], input.exclude_validation',
                trigger: 'change',
                errorsWrapper: '<div class="parsley-errors-list"></div>',
                errorTemplate: '<span></span>',
                errorsContainer: function (ParsleyField) {
                    var element = ParsleyField.$element;
                    return element.closest('.uk-form-row');
                },
                classHandler: function (ParsleyField) {
                    var element = ParsleyField.$element;
                    if( element.is(':checkbox') || element.is(':radio') || element.parent().is('label') || $(element).is('[data-md-selectize]') ) {
                        return element.closest('.uk-form-row');
                    }
                }
            };
        }
    };

    // 3.5 main sidebar (left)
    altair_main_sidebar = {
        init: function() {

            $sidebar_main_toggle.on('click', function(e) {
                e.preventDefault();
                ( $body.hasClass('sidebar_main_active') || ($body.hasClass('sidebar_main_open') && $window.width() >= 1220) ) ? altair_main_sidebar.hide_sidebar() : altair_main_sidebar.show_sidebar();
            });

            // hide sidebar (outside click/esc key pressed)
            $document.on('click keyup', function(e) {
                if( $body.hasClass('sidebar_main_active') && $window.width() < 1220 ) {
                    if (
                        ( !$(e.target).closest($sidebar_main).length && !$(e.target).closest($sidebar_main_toggle).length )
                        || ( e.keyCode == 27 )
                    ) {
                        altair_main_sidebar.hide_sidebar();
                    }
                }
            });

            // hide sidebar (close btn)
            $('.sidebar_main_close_button').on('click', function(e) {
                e.preventDefault();
                altair_main_sidebar.hide_sidebar();
            });

            // custom scroller
            altair_helpers.custom_scrollbar($sidebar_main);

            if( $body.hasClass('sidebar_main_active') && $window.width() < 1220 ) {
                altair_page_content.hide_content_sidebar();
            } else {
                altair_page_content.show_content_sidebar();
            }

            // main menu
            altair_main_sidebar.main_menu();
            // language switcher
            altair_main_sidebar.lang_switcher();
        },
        hide_sidebar: function() {

            $body.addClass('sidebar_main_hiding').removeClass('sidebar_main_active sidebar_main_open');
            if( $window.width() < 1220 ) {
                altair_page_content.show_content_sidebar();
            }
            setTimeout(function() {
                $body.removeClass('sidebar_main_hiding');
                $window.resize();
            },280);

        },
        show_sidebar: function() {

            $body.addClass('sidebar_main_active');
            if( $window.width() < 1220 ) {
                altair_page_content.hide_content_sidebar();
            }
            setTimeout(function() {
                $window.resize();
            },280);

        },
        main_menu: function() {
            // check for submenu
            $sidebar_main.find('.menu_section > ul').children('li').each(function() {
                var hasChildren = $(this).children('ul').length;
                if(hasChildren) {
                    $(this).addClass('submenu_trigger')
                }
            });
            // toggle sections
            $('.submenu_trigger > a').on('click',function(e) {
                e.preventDefault();
                var $this = $(this);
                var slideToogle = $this.next('ul').is(':visible') ? 'slideUp' : 'slideDown';
                $this.next('ul')
                    .velocity(slideToogle, {
                        duration: 400,
                        easing: easing_swiftOut,
                        begin: function() {
                            if(slideToogle == 'slideUp') {
                                $(this).closest('.submenu_trigger').removeClass('act_section')
                            } else {
                                $(this).closest('.submenu_trigger').addClass('act_section')
                            }
                        },
                        complete: function() {
                            if(slideToogle !== 'slideUp') {
                                $this.closest('.act_section').velocity("scroll", {
                                    duration: 500,
                                    easing: easing_swiftOut,
                                    container: $("#sidebar_main").find(".scroll-content")
                                });
                            }
                        }
                    });
            });

            // open section/add classes if children has class .act_item
            $sidebar_main
                .find('.act_item')
                .closest('.submenu_trigger')
                .addClass('act_section')
                .children('a')
                .trigger('click');
        },
        lang_switcher: function() {
            var $lang_switcher = $('#lang_switcher');

            if($lang_switcher.length) {
                $lang_switcher.selectize({
                    options: [
                        {id: 1, title: 'English', value: 'gb'},
                        {id: 2, title: 'French', value: 'fr'},
                        {id: 3, title: 'Chinese', value: 'cn'},
                        {id: 4, title: 'Dutch', value: 'nl'},
                        {id: 5, title: 'Italian', value: 'it'},
                        {id: 6, title: 'Spanish', value: 'es'},
                        {id: 7, title: 'German', value: 'de'},
                        {id: 8, title: 'Polish', value: 'pl'}
                    ],
                    render: {
                        option: function(data, escape) {
                            return  '<div class="option">' +
                                '<i class="item-icon flag-' + escape(data.value).toUpperCase() + '"></i>' +
                                '<span>' + escape(data.title) + '</span>' +
                                '</div>';
                        },
                        item: function(data, escape) {
                            return '<div class="item"><i class="item-icon flag-' + escape(data.value).toUpperCase() + '"></i></div>';
                        }
                    },
                    valueField: 'value',
                    labelField: 'title',
                    searchField: 'title',
                    create: false,
                    onDropdownOpen: function($dropdown) {
                        $dropdown
                            .hide()
                            .velocity('slideDown', {
                                begin: function() {
                                    $dropdown.css({'margin-top':'-33px'})
                                },
                                duration: 200,
                                easing: easing_swiftOut
                            })
                    },
                    onDropdownClose: function($dropdown) {
                        $dropdown
                            .show()
                            .velocity('slideUp', {
                                complete: function() {
                                    $dropdown.css({'margin-top':''})
                                },
                                duration: 200,
                                easing: easing_swiftOut
                            })
                    }
                });

                $lang_switcher.next().children('.selectize-input').find('input').attr('readonly',true);

            }

        }
    };

    // secondary sidebar (right)
    altair_secondary_sidebar = {
        init: function() {
            if($sidebar_secondary.length) {
                $sidebar_secondary_toggle.removeClass('sidebar_secondary_check');

                $sidebar_secondary_toggle.on('click', function (e) {
                    e.preventDefault();
                    $body.hasClass('sidebar_secondary_active') ? altair_secondary_sidebar.hide_sidebar() : altair_secondary_sidebar.show_sidebar();
                });

                // hide sidebar (outside/esc click)
                $document.on('click keydown', function(e) {
                     if(
                         $body.hasClass('sidebar_secondary_active')
                         && (
                            ( !$(e.target).closest($sidebar_secondary).length && !$(e.target).closest($sidebar_secondary_toggle).length )
                            || (e.which == 27)
                         )
                     ) {
                         altair_secondary_sidebar.hide_sidebar();
                     }
                });

                // hide page sidebar on page load
                if ( $body.hasClass('sidebar_secondary_active') ) {
                    altair_secondary_sidebar.hide_sidebar();
                }

                // custom scroller
                altair_helpers.custom_scrollbar($sidebar_secondary);

            }
        },
        hide_sidebar: function() {
            $sidebar_secondary.velocity({
                right: -$sidebar_secondary.width() - 4
            },{
                duration: 280,
                easing: easing_swiftOut,
                begin: function() {
                    $body.removeClass('sidebar_secondary_active');
                    if( $window.width() < 1220 ) {
                        $page_content.css({
                            'paddingRight': '',
                            'overflow': ''
                        });
                    }
                }
            });
        },
        show_sidebar: function() {
            $sidebar_secondary.velocity({
                right: 0
            },{
                duration: 400,
                easing: easing_swiftOut,
                begin: function() {
                    $body.addClass('sidebar_secondary_active');
                    if( $window.width() < 1220 ) {
                        $page_content.css({
                            'paddingRight': '',
                            'overflow': ''
                        });
                    }
                }
            });
        }
    };

    // top bar
    altair_top_bar = {
        init: function () {
            if($topBar.length) {
                var topBar_right_padding = parseInt( $topBar.css('paddingRight') );

                $topBar.css({
                    'paddingRight': topBar_right_padding + scrollbarWidth()
                });

                $body.addClass('top_bar_active');
            }
        }
    };

    // main header
    altair_main_header = {
        init: function() {
            altair_main_header.search_activate();
        },
        search_activate: function() {
            $('#main_search_btn').on('click',function(e) {
                e.preventDefault();
                altair_main_header.search_show();
            });
            // hide main search
            $(document).on('click keydown', function(e) {
                if( $body.hasClass('main_search_active') ) {
                    if (
                        ( !$(e.target).closest('.header_main_search_form').length && !$(e.target).closest('#main_search_btn').length )
                        || ( e.which == 27 )
                    ) {
                        altair_main_header.search_hide();
                    }
                }
            });
            $('.header_main_search_close').on('click', function() {
                altair_main_header.search_hide();
            })
        },
        search_show: function() {
            $header_main
                .children('.header_main_content')
                .velocity("transition.slideUpBigOut", {
                    duration: 280,
                    easing: easing_swiftOut,
                    begin: function() {
                        $body.addClass('main_search_active');
                    },
                    complete: function() {
                        $header_main
                            .children('.header_main_search_form')
                            .velocity("transition.slideDownBigIn", {
                                duration: 280,
                                easing: easing_swiftOut,
                                complete: function() {
                                    $('.header_main_search_input').focus();
                                }
                            })
                    }
                });
        },
        search_hide: function() {
            $header_main
                .children('.header_main_search_form')
                .velocity("transition.slideUpBigOut", {
                    duration: 280,
                    easing: easing_swiftOut,
                    begin: function() {
                        $header_main.velocity("reverse");
                        $body.removeClass('main_search_active');
                    },
                    complete: function() {
                        $header_main
                            .children('.header_main_content')
                            .velocity("transition.slideDownBigIn", {
                                duration: 280,
                                easing: easing_swiftOut,
                                complete: function() {
                                    $('.header_main_search_input').blur().val('');
                                }
                            })
                    }
                });
        }
    };

    // material design
    altair_md = {
        init: function() {
            altair_md.inputs();
            altair_md.checkbox_radio();
            altair_md.card_fullscreen();
            altair_md.card_expand();
            altair_md.card_overlay();
            altair_md.card_single();
            altair_md.list_outside();
            altair_md.fab_actions();
        },
        // card toggle fullscreen
        card_fullscreen: function() {
            $('.md-card-fullscreen-activate').on('click',function() {
                // get card width/height
                var $thisCard = $(this).closest('.md-card'),
                    mdCard_h = $thisCard.height(),
                    mdCard_w = $thisCard.width();

                // create placeholder for card
                $thisCard.after('<div class="md-card-placeholder" style="width:'+ mdCard_w+'px;height:'+ mdCard_h+'px;"/>');
                // add overflow hidden to #page_content (fix for ios)
                //$body.addClass('md-card-fullscreen-active');
                // add width/height to card (preserve original size)
                $thisCard.addClass('md-card-fullscreen').css({
                    'width': mdCard_w,
                    'height': mdCard_h
                })
                    // animate card to top/left position
                    .velocity(
                        {
                            left: 0,
                            top: 0
                        },
                        {
                            duration: 600,
                            easing: easing_swiftOut,
                            begin: function(elements) {
                                // add back button
                                $thisCard.find('.md-card-toolbar').prepend('<span class="md-icon md-card-fullscreen-deactivate material-icons uk-float-left">&#xE5C4;</span>');
                                altair_page_content.hide_content_sidebar();
                            }
                        }
                    // resize card to full width/height
                    ).velocity(
                        {
                            height: '100%',
                            width: '100%'
                        },
                        {
                            duration: 600,
                            easing: easing_swiftOut,
                            complete: function(elements) {
                                // activate onResize callback for some js plugins
                                $(window).resize();
                                // show fullscreen content
                                $thisCard.find('.md-card-fullscreen-content').velocity("transition.slideUpBigIn", {
                                    duration: 600,
                                    easing: easing_swiftOut,
                                    complete: function(elements) {
                                        // activate onResize callback for some js plugins
                                        $(window).resize();
                                    }
                                });

                            }
                        }
                    );
            });

            $page_content.on('click', '.md-card-fullscreen-deactivate', function() {
                // get card placeholder width/height and offset
                var $thisPlaceholderCard = $('.md-card-placeholder'),
                    mdPlaceholderCard_h = $thisPlaceholderCard.height(),
                    mdPlaceholderCard_w = $thisPlaceholderCard.width(),
                    mdPlaceholderCard_offset_top = $thisPlaceholderCard.offset().top,
                    mdPlaceholderCard_offset_left = $thisPlaceholderCard.offset().left,
                    $thisCard = $('.md-card-fullscreen');

                    $thisCard
                        // resize card to original size
                        .velocity(
                            {
                                height: mdPlaceholderCard_h,
                                width: mdPlaceholderCard_w
                            },
                            {
                                duration: 600,
                                easing: easing_swiftOut,
                                begin: function(elements) {
                                    // hide fullscreen content
                                    $thisCard.find('.md-card-fullscreen-content').velocity("transition.slideDownOut",{ duration: 275, easing: easing_swiftOut });
                                },
                                complete: function(elements) {
                                    // activate onResize callback for js plugins
                                    $window.resize();
                                    // remove back button
                                    $thisCard.find('.md-card-fullscreen-deactivate').remove();
                                    altair_page_content.show_content_sidebar();
                                }
                            }
                        )
                        // move card to original position
                        .velocity(
                            {
                                left: mdPlaceholderCard_offset_left,
                                top: mdPlaceholderCard_offset_top
                            },
                            {
                                duration: 600,
                                easing: easing_swiftOut,
                                complete: function(elements) {
                                    // remove some styles added by velocity.js
                                    $thisCard.removeClass('md-card-fullscreen').css({
                                        width: '',
                                        height: '',
                                        left: '',
                                        top: ''
                                    });
                                    // remove card placeholder
                                    $thisPlaceholderCard.remove();
                                    // remove overflow:hidden from #page_content (ios fix)
                                    $body.removeClass('md-card-fullscreen-active');
                                }
                            }
                        );
            });
        },
        card_expand: function() {
            // expand elements
            $(".md-expand").velocity("transition.expandIn", { stagger: 175, drag: true });
            $(".md-expand-group").children().velocity("transition.expandIn", { stagger: 175, drag: true });
        },
        card_overlay: function() {
            $('.md-card').on('click','.md-card-overlay-toggler', function(e) {
                e.preventDefault();
                if(!$(this).closest('.md-card').hasClass('md-card-overlay-active')) {
                    $(this)
                        .html('&#xE5CD;')
                        .closest('.md-card').addClass('md-card-overlay-active');

                } else {
                    $(this)
                        .html('&#xE5D4;')
                        .closest('.md-card').removeClass('md-card-overlay-active');
                }
            })
        },
        card_single: function() {
            var $md_card_single = $('.md-card-single');
            if($md_card_single && $body.hasClass('header_double_height')) {
                function md_card_content_height() {
                    var content_height = $window.height() - ((header__main_height * 2) + 10);
                    $md_card_single.find('.md-card-content').innerHeight(content_height);
                }
                md_card_content_height();
                $window.on('debouncedresize',function() {
                    md_card_content_height();
                });
            }
        },
        card_show_hide: function(card,begin_callback,complete_callback,callback_element) {
            $(card)
                .velocity({
                    scale: 0,
                    opacity: 0.2
                }, {
                    duration: 400,
                    easing: easing_swiftOut,
                    // on begin callback
                    begin: function () {
                        if (typeof begin_callback !== 'undefined') {
                            begin_callback(callback_element);
                        }
                    },
                    // on complete callback
                    complete: function () {
                        if (typeof complete_callback !== 'undefined') {
                            complete_callback(callback_element);
                        }
                    }
                })
                .velocity('reverse');
        },
        list_outside: function() {
            var $md_list_outside_wrapper = $('.md-list-outside-wrapper');
            if($md_list_outside_wrapper && $body.hasClass('header_double_height')) {
                function md_list_outside_height() {
                    // check header height
                    var content_height = $window.height() - ((header__main_height * 2) + 10);
                    $md_list_outside_wrapper.height(content_height);
                }
                md_list_outside_height();
                $window.on('debouncedresize',function() {
                    md_list_outside_height();
                });
                altair_helpers.custom_scrollbar($md_list_outside_wrapper);
            }
        },
        inputs: function(parent) {
            var $mdInput = (typeof parent === 'undefined') ? $('.md-input') : $(parent).find('.md-input');
            $mdInput.each(function() {
                if(!$(this).closest('.md-input-wrapper').length) {
                    var $this = $(this);

                    if( $this.prev('label').length ) {
                        $this.prev('label').andSelf().wrapAll('<div class="md-input-wrapper"/>');
                    } else if($this.siblings('[data-uk-form-password]').length) {
                        $this.siblings('[data-uk-form-password]').andSelf().wrapAll('<div class="md-input-wrapper"/>');
                    } else {
                        $this.wrap('<div class="md-input-wrapper"/>');
                    }
                    $this.closest('.md-input-wrapper').append('<span class="md-input-bar"/>');


                    altair_md.update_input($this);
                }
                $body
                    .on('focus', '.md-input', function() {
                        $(this).closest('.md-input-wrapper').addClass('md-input-focus')
                    })
                    .on('blur', '.md-input', function() {
                        $(this).closest('.md-input-wrapper').removeClass('md-input-focus');
                        if($(this).val() != '') {
                            $(this).closest('.md-input-wrapper').addClass('md-input-filled')
                        } else {
                            $(this).closest('.md-input-wrapper').removeClass('md-input-filled')
                        }
                    })
                    .on('change', '.md-input', function() {
                        altair_md.update_input($(this));
                    });
            })
        },
        checkbox_radio: function() {
            var mdInput = $("[data-md-icheck],.data-md-icheck");
            mdInput.each(function() {
                if( !$(this).next('.iCheck-helper').length ) {
                    $(this)
                        .iCheck({
                            checkboxClass: 'icheckbox_md',
                            radioClass: 'iradio_md',
                            increaseArea: '20%'
                        })
                        // validate inputs on change (parsley)
                        .on('ifToggled', function(event){
                            if ( !!$(event.currentTarget).attr('data-parsley-id') ) {
                                $(this).parsley().validate(true);
                            }
                        });
                }
            });
        },
        update_input: function(object) {
            // clear wrapper classes
            object.closest('.md-input-wrapper').removeClass('md-input-wrapper-danger md-input-wrapper-success md-input-wrapper-disabled');

            if(object.hasClass('md-input-danger')) {
                object.closest('.md-input-wrapper').addClass('md-input-wrapper-danger')
            }
            if(object.hasClass('md-input-success')) {
                object.closest('.md-input-wrapper').addClass('md-input-wrapper-success')
            }
            if(object.prop('disabled')) {
                object.closest('.md-input-wrapper').addClass('md-input-wrapper-disabled')
            }
            if(object.val() != '') {
                object.closest('.md-input-wrapper').addClass('md-input-filled')
            }
        },
        fab_actions: function() {
            $('.md-fab-actions')
                .append('<i class="material-icons md-fab-action-close">&#xE5CD;</i>')
                .on('click',function() {
                    if(!$(this).closest('.md-fab-wrapper').hasClass('md-fab-active')) {
                        $(this)
                            .closest('.md-fab-wrapper')
                            .addClass('md-fab-active');
                    } else {
                        $(this)
                            .closest('.md-fab-wrapper')
                            .removeClass('md-fab-active');
                    }
                })
        }
    };

    // common helpers
    altair_helpers = {
        truncate_text: function($object) {
            $object.each(function() {
                $object.dotdotdot({
                    watch: "window"
                });
            })
        },
        custom_scrollbar: function($object) {
            $object.wrapInner("<div class='scrollbar-inner'></div>");
            if(Modernizr.touch) {
                $object.addClass('touchscroll');
            }
            $object.children('.scrollbar-inner').scrollbar({
                disableBodyScroll: true,
                scrollx: false,
                duration: 100
            });
        },
        hierarchical_show: function() {
            $hierarchical_show = $('.hierarchical_show');

            if($hierarchical_show.length) {
                $hierarchical_show.each(function() {
                    var $this = $(this),
                        thisChildrenLength = $this.children().length,
                        baseDelay = 60;


                    $this
                        .children()
                        .each(function(index) {
                            $(this).css({
                                '-webkit-animation-delay': (index * baseDelay) + "ms",
                                'animation-delay': (index * baseDelay) + "ms"
                            })
                        })
                        .end()
                        .waypoint({
                            handler: function() {
                                $this.addClass('hierarchical_show_inView');
                                setTimeout(function() {
                                    $this
                                        .removeClass('hierarchical_show hierarchical_show_inView fast_animation')
                                        .children()
                                        .css({
                                            '-webkit-animation-delay': '',
                                            'animation-delay': ''
                                        });
                                }, (thisChildrenLength*baseDelay)+1200 );
                                this.destroy();
                            },
                            context: '#page_content',
                            offset: '90%'
                        });
                })
            }
        },
        hierarchical_slide: function() {
            $hierarchical_slide = $('.hierarchical_slide');
            if($hierarchical_slide.length) {

                $hierarchical_slide.each(function() {
                    var $this = $(this),
                        $thisChildren = $this.attr('data-slide-children') ? $this.children($this.attr('data-slide-children')) : $this.children(),
                        thisChildrenLength = $thisChildren.length,
                        thisContext = $this.attr('data-slide-context') ? $this.closest($this.attr('data-slide-context')) : '#page_content',
                        baseDelay = 100;

                    if(thisChildrenLength > 1) {

                        $thisChildren.each(function(index) {
                            $(this).css({
                                '-webkit-animation-delay': (index * baseDelay) + "ms",
                                'animation-delay': (index * baseDelay) + "ms"
                            })
                        });

                        $this.waypoint({
                            handler: function() {
                                $this.addClass('hierarchical_slide_inView');
                                setTimeout(function() {
                                    $this.removeClass('hierarchical_slide hierarchical_slide_inView');
                                    $thisChildren.css({
                                        '-webkit-animation-delay': '',
                                        'animation-delay': ''
                                    });
                                }, (thisChildrenLength*baseDelay)+1200 );
                                this.destroy();
                            },
                            context: thisContext,
                            offset: '90%'
                        });

                    }

                })

            }
        },
        content_preloader_show: function(style) {

            if(!$body.find('.content-preloader').length) {
                var image_density = isHighDensity() ? '@2x' : '' ;

                var preloader_content = (style == 'regular')
                    ? '<img src="assets/img/spinners/spinner' + image_density + '.gif" alt="" width="32" height="32">'
                    : '<div class="md-preloader"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="32" width="32" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg></div>';

                $body.append('<div class="content-preloader">' + preloader_content + '</div>');
                setTimeout(function() {
                    $('.content-preloader').addClass('preloader-active');
                }, 0);
            }
        },
        content_preloader_hide: function() {
            if($body.find('.content-preloader').length) {
                // hide preloader
                $('.content-preloader').removeClass('preloader-active');
                // remove preloader
                preloader_timeout = window.setTimeout(function() {
                    $('.content-preloader').remove();
                }, 500);
            }
        },
        color_picker: function(object,pallete) {
            if(object) {
                var cp_id = randID_generator(),
                    cp_pallete = pallete ? pallete : ['#e53935','#d81b60','#8e24aa','#5e35b1','#3949ab','#1e88e5','#039be5','#0097a7','#00897b','#43a047','#689f38','#ef6c00','#f4511e','#6d4c41','#757575','#546e7a'],
                    cp_pallete_length = cp_pallete.length,
                    cp_wrapper = $('<div class="cp_altair" id="'+cp_id+'"/>');

                for(var $i=0;$i<cp_pallete_length;$i++) {
                    cp_wrapper.append('<span data-color=' + cp_pallete[$i] + ' style="background:' + cp_pallete[$i] + '"></span>');
                }

                cp_wrapper.append('<input type="hidden">');

                $body.on('click', '#'+cp_id+' span',function() {
                    $(this)
                        .addClass('active_color')
                        .siblings().removeClass('active_color')
                        .end()
                        .closest('.cp_altair').find('input').val($(this).attr('data-color'));
                });

                return object.append(cp_wrapper);

            }
        },
        retina_images: function() {
            if (typeof $.fn.dense !== "undefined") {
                $('img').dense({
                    glue: "@"
                });
            }
        }
    };

    // uikit custom
    altair_uikit = {
        init: function() {
            altair_uikit.override_defaults();
        },
        override_defaults: function() {
            if (typeof UIkit !== 'undefined') {
                // http://getuikit.com/docs/documentation_javascript.html#js-override
                UIkit.on('beforeready.uk.dom', function () {

                    if (typeof UIkit.components.accordion !== "undefined") { // check if accordion component is defined
                        $.extend(UIkit.components.accordion.prototype.defaults, {
                            easing: $.bez(easing_swiftOut),
                            duration: 200
                        });
                    }

                    if (typeof UIkit.components.dropdown.prototype !== "undefined") { // check if tooltip component is defined

                        $.extend(UIkit.components.dropdown.prototype.defaults, {
                            remaintime: 150,
                            delay: 50
                        });

                        (function() {
                            var old_show_function = UIkit.components.dropdown.prototype.show;

                            UIkit.components.dropdown.prototype.show = function() {

                                this.dropdown
                                    .css({
                                        'min-width': this.dropdown.outerWidth()
                                    })
                                    .addClass('uk-dropdown-active uk-dropdown-shown');

                                var show_function = old_show_function.apply(this, arguments);

                                return show_function;
                            }
                        })();

                        (function() {
                            var old_hide_function = UIkit.components.dropdown.prototype.hide;

                            UIkit.components.dropdown.prototype.hide = function() {

                                var this_dropdown = this.dropdown;

                                this_dropdown
                                    .removeClass('uk-dropdown-shown');

                                var dropdown_timeout = setTimeout(function() {
                                    this_dropdown
                                        .removeClass('uk-dropdown-active')
                                },280);

                                var hide_function = old_hide_function.apply(this, arguments);

                                return hide_function;
                            }
                        })();

                    }

                    if (typeof UIkit.components.modal !== "undefined") { // check if modal component is defined
                        $.extend(UIkit.components.modal.prototype.defaults, {
                            center: true
                        });

                        UIkit.modal.dialog.template = '<div class="uk-modal uk-modal-dialog-replace"><div class="uk-modal-dialog" style="min-height:0;"></div></div>';
                        $body
                            .on('show.uk.modal', '.uk-modal-dialog-replace', function () {
                                // customize uikit dialog
                                setTimeout(function () {
                                    var dialogReplace = $('.uk-modal-dialog-replace');
                                    if (dialogReplace.find('.uk-button-primary').length) {
                                        var actionBtn = dialogReplace.find('.uk-button-primary').toggleClass('uk-button-primary md-btn-flat-primary');
                                        if (actionBtn.next('button')) {
                                            actionBtn.next('button').after(actionBtn);
                                        }
                                    }
                                    if (dialogReplace.find('.uk-button').length) {
                                        dialogReplace.find('.uk-button').toggleClass('uk-button md-btn md-btn-flat');
                                    }
                                    if (dialogReplace.find('.uk-margin-small-top').length) {
                                        dialogReplace.find('.uk-margin-small-top').toggleClass('uk-margin-small-top uk-margin-top');
                                    }
                                    if (dialogReplace.find('input.uk-width-1-1').length) {
                                        dialogReplace.find('input.uk-width-1-1').toggleClass('uk-width-1-1 md-input');
                                        // reinitialize md inputs
                                        altair_md.inputs();
                                    }
                                    if (dialogReplace.find('.uk-form').length) {
                                        dialogReplace.find('.uk-form').removeClass('uk-form');
                                    }
                                }, 50)
                            });
                    }

                    if (typeof UIkit.components.tooltip !== "undefined") { // check if tooltip component is defined
                        $.extend(UIkit.components.tooltip.prototype.defaults, {
                            animation: true,
                            offset: 8
                        });
                    }

                });
            }
        },
        reinitialize_grid_margin: function() {
            $("[data-uk-grid-margin]").each(function() {
                var element = $(this);
                if (!element.data("gridMargin")) {
                    $.UIkit.gridMargin(element, $.UIkit.Utils.options(element.attr("data-uk-grid-margin")));
                }
            });
            $window.resize();
        }
    };
!function(e,t){"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){function n(e){var t="length"in e&&e.length,n=J.type(e);return"function"===n||J.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e}function r(e,t,n){if(J.isFunction(t))return J.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return J.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(ae.test(t))return J.filter(t,e,n);t=J.filter(t,e)}return J.grep(e,function(e){return Y.call(t,e)>=0!==n})}function i(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}function o(e){var t=he[e]={};return J.each(e.match(fe)||[],function(e,n){t[n]=!0}),t}function s(){G.removeEventListener("DOMContentLoaded",s,!1),e.removeEventListener("load",s,!1),J.ready()}function a(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=J.expando+a.uid++}function l(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(we,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:be.test(n)?J.parseJSON(n):n}catch(i){}ye.set(e,t,n)}else n=void 0;return n}function c(){return!0}function u(){return!1}function d(){try{return G.activeElement}catch(e){}}function p(e,t){return J.nodeName(e,"table")&&J.nodeName(11!==t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function f(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function h(e){var t=Fe.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function g(e,t){for(var n=0,r=e.length;r>n;n++)ve.set(e[n],"globalEval",!t||ve.get(t[n],"globalEval"))}function m(e,t){var n,r,i,o,s,a,l,c;if(1===t.nodeType){if(ve.hasData(e)&&(o=ve.access(e),s=ve.set(t,o),c=o.events)){delete s.handle,s.events={};for(i in c)for(n=0,r=c[i].length;r>n;n++)J.event.add(t,i,c[i][n])}ye.hasData(e)&&(a=ye.access(e),l=J.extend({},a),ye.set(t,l))}}function v(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return void 0===t||t&&J.nodeName(e,t)?J.merge([e],n):n}function y(e,t){var n=t.nodeName.toLowerCase();"input"===n&&Se.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}function b(t,n){var r,i=J(n.createElement(t)).appendTo(n.body),o=e.getDefaultComputedStyle&&(r=e.getDefaultComputedStyle(i[0]))?r.display:J.css(i[0],"display");return i.detach(),o}function w(e){var t=G,n=qe[e];return n||(n=b(e,t),"none"!==n&&n||(ze=(ze||J("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),t=ze[0].contentDocument,t.write(),t.close(),n=b(e,t),ze.detach()),qe[e]=n),n}function x(e,t,n){var r,i,o,s,a=e.style;return n=n||Re(e),n&&(s=n.getPropertyValue(t)||n[t]),n&&(""!==s||J.contains(e.ownerDocument,e)||(s=J.style(e,t)),Me.test(s)&&Ve.test(t)&&(r=a.width,i=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=s,s=n.width,a.width=r,a.minWidth=i,a.maxWidth=o)),void 0!==s?s+"":s}function C(e,t){return{get:function(){return e()?void delete this.get:(this.get=t).apply(this,arguments)}}}function k(e,t){if(t in e)return t;for(var n=t[0].toUpperCase()+t.slice(1),r=t,i=Ue.length;i--;)if(t=Ue[i]+n,t in e)return t;return r}function S(e,t,n){var r=We.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function T(e,t,n,r,i){for(var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;4>o;o+=2)"margin"===n&&(s+=J.css(e,n+Ce[o],!0,i)),r?("content"===n&&(s-=J.css(e,"padding"+Ce[o],!0,i)),"margin"!==n&&(s-=J.css(e,"border"+Ce[o]+"Width",!0,i))):(s+=J.css(e,"padding"+Ce[o],!0,i),"padding"!==n&&(s+=J.css(e,"border"+Ce[o]+"Width",!0,i)));return s}function E(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Re(e),s="border-box"===J.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=x(e,t,o),(0>i||null==i)&&(i=e.style[t]),Me.test(i))return i;r=s&&(Z.boxSizingReliable()||i===e.style[t]),i=parseFloat(i)||0}return i+T(e,t,n||(s?"border":"content"),r,o)+"px"}function O(e,t){for(var n,r,i,o=[],s=0,a=e.length;a>s;s++)r=e[s],r.style&&(o[s]=ve.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&ke(r)&&(o[s]=ve.access(r,"olddisplay",w(r.nodeName)))):(i=ke(r),"none"===n&&i||ve.set(r,"olddisplay",i?n:J.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}function P(e,t,n,r,i){return new P.prototype.init(e,t,n,r,i)}function A(){return setTimeout(function(){Ze=void 0}),Ze=J.now()}function D(e,t){var n,r=0,i={height:e};for(t=t?1:0;4>r;r+=2-t)n=Ce[r],i["margin"+n]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function N(e,t,n){for(var r,i=(nt[t]||[]).concat(nt["*"]),o=0,s=i.length;s>o;o++)if(r=i[o].call(n,t,e))return r}function j(e,t,n){var r,i,o,s,a,l,c,u,d=this,p={},f=e.style,h=e.nodeType&&ke(e),g=ve.get(e,"fxshow");n.queue||(a=J._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,l=a.empty.fire,a.empty.fire=function(){a.unqueued||l()}),a.unqueued++,d.always(function(){d.always(function(){a.unqueued--,J.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[f.overflow,f.overflowX,f.overflowY],c=J.css(e,"display"),u="none"===c?ve.get(e,"olddisplay")||w(e.nodeName):c,"inline"===u&&"none"===J.css(e,"float")&&(f.display="inline-block")),n.overflow&&(f.overflow="hidden",d.always(function(){f.overflow=n.overflow[0],f.overflowX=n.overflow[1],f.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],Ke.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(h?"hide":"show")){if("show"!==i||!g||void 0===g[r])continue;h=!0}p[r]=g&&g[r]||J.style(e,r)}else c=void 0;if(J.isEmptyObject(p))"inline"===("none"===c?w(e.nodeName):c)&&(f.display=c);else{g?"hidden"in g&&(h=g.hidden):g=ve.access(e,"fxshow",{}),o&&(g.hidden=!h),h?J(e).show():d.done(function(){J(e).hide()}),d.done(function(){var t;ve.remove(e,"fxshow");for(t in p)J.style(e,t,p[t])});for(r in p)s=N(h?g[r]:0,r,d),r in g||(g[r]=s.start,h&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function I(e,t){var n,r,i,o,s;for(n in e)if(r=J.camelCase(n),i=t[r],o=e[n],J.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=J.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function L(e,t,n){var r,i,o=0,s=tt.length,a=J.Deferred().always(function(){delete l.elem}),l=function(){if(i)return!1;for(var t=Ze||A(),n=Math.max(0,c.startTime+c.duration-t),r=n/c.duration||0,o=1-r,s=0,l=c.tweens.length;l>s;s++)c.tweens[s].run(o);return a.notifyWith(e,[c,o,n]),1>o&&l?n:(a.resolveWith(e,[c]),!1)},c=a.promise({elem:e,props:J.extend({},t),opts:J.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Ze||A(),duration:n.duration,tweens:[],createTween:function(t,n){var r=J.Tween(e,c.opts,t,n,c.opts.specialEasing[t]||c.opts.easing);return c.tweens.push(r),r},stop:function(t){var n=0,r=t?c.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)c.tweens[n].run(1);return t?a.resolveWith(e,[c,t]):a.rejectWith(e,[c,t]),this}}),u=c.props;for(I(u,c.opts.specialEasing);s>o;o++)if(r=tt[o].call(c,e,u,c.opts))return r;return J.map(u,N,c),J.isFunction(c.opts.start)&&c.opts.start.call(e,c),J.fx.timer(J.extend(l,{elem:e,anim:c,queue:c.opts.queue})),c.progress(c.opts.progress).done(c.opts.done,c.opts.complete).fail(c.opts.fail).always(c.opts.always)}function $(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(fe)||[];if(J.isFunction(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function F(e,t,n,r){function i(a){var l;return o[a]=!0,J.each(e[a]||[],function(e,a){var c=a(t,n,r);return"string"!=typeof c||s||o[c]?s?!(l=c):void 0:(t.dataTypes.unshift(c),i(c),!1)}),l}var o={},s=e===bt;return i(t.dataTypes[0])||!o["*"]&&i("*")}function _(e,t){var n,r,i=J.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&J.extend(!0,e,r),e}function H(e,t,n){for(var r,i,o,s,a=e.contents,l=e.dataTypes;"*"===l[0];)l.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){l.unshift(i);break}if(l[0]in n)o=l[0];else{for(i in n){if(!l[0]||e.converters[i+" "+l[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==l[0]&&l.unshift(o),n[o]):void 0}function z(e,t,n,r){var i,o,s,a,l,c={},u=e.dataTypes.slice();if(u[1])for(s in e.converters)c[s.toLowerCase()]=e.converters[s];for(o=u.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=u.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(s=c[l+" "+o]||c["* "+o],!s)for(i in c)if(a=i.split(" "),a[1]===o&&(s=c[l+" "+a[0]]||c["* "+a[0]])){s===!0?s=c[i]:c[i]!==!0&&(o=a[0],u.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(d){return{state:"parsererror",error:s?d:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}function q(e,t,n,r){var i;if(J.isArray(t))J.each(t,function(t,i){n||St.test(e)?r(e,i):q(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==J.type(t))r(e,t);else for(i in t)q(e+"["+i+"]",t[i],n,r)}function V(e){return J.isWindow(e)?e:9===e.nodeType&&e.defaultView}var M=[],R=M.slice,X=M.concat,W=M.push,Y=M.indexOf,B={},Q=B.toString,U=B.hasOwnProperty,Z={},G=e.document,K="2.1.4",J=function(e,t){return new J.fn.init(e,t)},ee=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,te=/^-ms-/,ne=/-([\da-z])/gi,re=function(e,t){return t.toUpperCase()};J.fn=J.prototype={jquery:K,constructor:J,selector:"",length:0,toArray:function(){return R.call(this)},get:function(e){return null!=e?0>e?this[e+this.length]:this[e]:R.call(this)},pushStack:function(e){var t=J.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return J.each(this,e,t)},map:function(e){return this.pushStack(J.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(R.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:W,sort:M.sort,splice:M.splice},J.extend=J.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[a]||{},a++),"object"==typeof s||J.isFunction(s)||(s={}),a===l&&(s=this,a--);l>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(c&&r&&(J.isPlainObject(r)||(i=J.isArray(r)))?(i?(i=!1,o=n&&J.isArray(n)?n:[]):o=n&&J.isPlainObject(n)?n:{},s[t]=J.extend(c,o,r)):void 0!==r&&(s[t]=r));return s},J.extend({expando:"jQuery"+(K+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===J.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!J.isArray(e)&&e-parseFloat(e)+1>=0},isPlainObject:function(e){return"object"!==J.type(e)||e.nodeType||J.isWindow(e)?!1:e.constructor&&!U.call(e.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?B[Q.call(e)]||"object":typeof e},globalEval:function(e){var t,n=eval;e=J.trim(e),e&&(1===e.indexOf("use strict")?(t=G.createElement("script"),t.text=e,G.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(te,"ms-").replace(ne,re)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,r){var i,o=0,s=e.length,a=n(e);if(r){if(a)for(;s>o&&(i=t.apply(e[o],r),i!==!1);o++);else for(o in e)if(i=t.apply(e[o],r),i===!1)break}else if(a)for(;s>o&&(i=t.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=t.call(e[o],o,e[o]),i===!1)break;return e},trim:function(e){return null==e?"":(e+"").replace(ee,"")},makeArray:function(e,t){var r=t||[];return null!=e&&(n(Object(e))?J.merge(r,"string"==typeof e?[e]:e):W.call(r,e)),r},inArray:function(e,t,n){return null==t?-1:Y.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;n>r;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,s=e.length,a=!n;s>o;o++)r=!t(e[o],o),r!==a&&i.push(e[o]);return i},map:function(e,t,r){var i,o=0,s=e.length,a=n(e),l=[];if(a)for(;s>o;o++)i=t(e[o],o,r),null!=i&&l.push(i);else for(o in e)i=t(e[o],o,r),null!=i&&l.push(i);return X.apply([],l)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),J.isFunction(e)?(r=R.call(arguments,2),i=function(){return e.apply(t||this,r.concat(R.call(arguments)))},i.guid=e.guid=e.guid||J.guid++,i):void 0},now:Date.now,support:Z}),J.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){B["[object "+t+"]"]=t.toLowerCase()});var ie=function(e){function t(e,t,n,r){var i,o,s,a,l,c,d,f,h,g;if((t?t.ownerDocument||t:q)!==j&&N(t),t=t||j,n=n||[],a=t.nodeType,"string"!=typeof e||!e||1!==a&&9!==a&&11!==a)return n;if(!r&&L){if(11!==a&&(i=ye.exec(e)))if(s=i[1]){if(9===a){if(o=t.getElementById(s),!o||!o.parentNode)return n;if(o.id===s)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(s))&&H(t,o)&&o.id===s)return n.push(o),n}else{if(i[2])return K.apply(n,t.getElementsByTagName(e)),n;if((s=i[3])&&x.getElementsByClassName)return K.apply(n,t.getElementsByClassName(s)),n}if(x.qsa&&(!$||!$.test(e))){if(f=d=z,h=t,g=1!==a&&e,1===a&&"object"!==t.nodeName.toLowerCase()){for(c=T(e),(d=t.getAttribute("id"))?f=d.replace(we,"\\$&"):t.setAttribute("id",f),f="[id='"+f+"'] ",l=c.length;l--;)c[l]=f+p(c[l]);h=be.test(e)&&u(t.parentNode)||t,g=c.join(",")}if(g)try{return K.apply(n,h.querySelectorAll(g)),n}catch(m){}finally{d||t.removeAttribute("id")}}}return O(e.replace(le,"$1"),t,n,r)}function n(){function e(n,r){return t.push(n+" ")>C.cacheLength&&delete e[t.shift()],e[n+" "]=r}var t=[];return e}function r(e){return e[z]=!0,e}function i(e){var t=j.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function o(e,t){for(var n=e.split("|"),r=e.length;r--;)C.attrHandle[n[r]]=t}function s(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||B)-(~e.sourceIndex||B);if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function a(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function l(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function c(e){return r(function(t){return t=+t,r(function(n,r){for(var i,o=e([],n.length,t),s=o.length;s--;)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}function u(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}function d(){}function p(e){for(var t=0,n=e.length,r="";n>t;t++)r+=e[t].value;return r}function f(e,t,n){var r=t.dir,i=n&&"parentNode"===r,o=M++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,s){var a,l,c=[V,o];if(s){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,s))return!0}else for(;t=t[r];)if(1===t.nodeType||i){if(l=t[z]||(t[z]={}),(a=l[r])&&a[0]===V&&a[1]===o)return c[2]=a[2];if(l[r]=c,c[2]=e(t,n,s))return!0}}}function h(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function g(e,n,r){for(var i=0,o=n.length;o>i;i++)t(e,n[i],r);return r}function m(e,t,n,r,i){for(var o,s=[],a=0,l=e.length,c=null!=t;l>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),c&&t.push(a));return s}function v(e,t,n,i,o,s){return i&&!i[z]&&(i=v(i)),o&&!o[z]&&(o=v(o,s)),r(function(r,s,a,l){var c,u,d,p=[],f=[],h=s.length,v=r||g(t||"*",a.nodeType?[a]:a,[]),y=!e||!r&&t?v:m(v,p,e,a,l),b=n?o||(r?e:h||i)?[]:s:y;if(n&&n(y,b,a,l),i)for(c=m(b,f),i(c,[],a,l),u=c.length;u--;)(d=c[u])&&(b[f[u]]=!(y[f[u]]=d));if(r){if(o||e){if(o){for(c=[],u=b.length;u--;)(d=b[u])&&c.push(y[u]=d);o(null,b=[],c,l)}for(u=b.length;u--;)(d=b[u])&&(c=o?ee(r,d):p[u])>-1&&(r[c]=!(s[c]=d))}}else b=m(b===s?b.splice(h,b.length):b),o?o(null,s,b,l):K.apply(s,b)})}function y(e){for(var t,n,r,i=e.length,o=C.relative[e[0].type],s=o||C.relative[" "],a=o?1:0,l=f(function(e){return e===t},s,!0),c=f(function(e){return ee(t,e)>-1},s,!0),u=[function(e,n,r){var i=!o&&(r||n!==P)||((t=n).nodeType?l(e,n,r):c(e,n,r));return t=null,i}];i>a;a++)if(n=C.relative[e[a].type])u=[f(h(u),n)];else{if(n=C.filter[e[a].type].apply(null,e[a].matches),n[z]){for(r=++a;i>r&&!C.relative[e[r].type];r++);return v(a>1&&h(u),a>1&&p(e.slice(0,a-1).concat({value:" "===e[a-2].type?"*":""})).replace(le,"$1"),n,r>a&&y(e.slice(a,r)),i>r&&y(e=e.slice(r)),i>r&&p(e))}u.push(n)}return h(u)}function b(e,n){var i=n.length>0,o=e.length>0,s=function(r,s,a,l,c){var u,d,p,f=0,h="0",g=r&&[],v=[],y=P,b=r||o&&C.find.TAG("*",c),w=V+=null==y?1:Math.random()||.1,x=b.length;for(c&&(P=s!==j&&s);h!==x&&null!=(u=b[h]);h++){if(o&&u){for(d=0;p=e[d++];)if(p(u,s,a)){l.push(u);break}c&&(V=w)}i&&((u=!p&&u)&&f--,r&&g.push(u))}if(f+=h,i&&h!==f){for(d=0;p=n[d++];)p(g,v,s,a);if(r){if(f>0)for(;h--;)g[h]||v[h]||(v[h]=Z.call(l));v=m(v)}K.apply(l,v),c&&!r&&v.length>0&&f+n.length>1&&t.uniqueSort(l)}return c&&(V=w,P=y),g};return i?r(s):s}var w,x,C,k,S,T,E,O,P,A,D,N,j,I,L,$,F,_,H,z="sizzle"+1*new Date,q=e.document,V=0,M=0,R=n(),X=n(),W=n(),Y=function(e,t){return e===t&&(D=!0),0},B=1<<31,Q={}.hasOwnProperty,U=[],Z=U.pop,G=U.push,K=U.push,J=U.slice,ee=function(e,t){for(var n=0,r=e.length;r>n;n++)if(e[n]===t)return n;return-1},te="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ne="[\\x20\\t\\r\\n\\f]",re="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",ie=re.replace("w","w#"),oe="\\["+ne+"*("+re+")(?:"+ne+"*([*^$|!~]?=)"+ne+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+ie+"))|)"+ne+"*\\]",se=":("+re+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+oe+")*)|.*)\\)|)",ae=new RegExp(ne+"+","g"),le=new RegExp("^"+ne+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ne+"+$","g"),ce=new RegExp("^"+ne+"*,"+ne+"*"),ue=new RegExp("^"+ne+"*([>+~]|"+ne+")"+ne+"*"),de=new RegExp("="+ne+"*([^\\]'\"]*?)"+ne+"*\\]","g"),pe=new RegExp(se),fe=new RegExp("^"+ie+"$"),he={ID:new RegExp("^#("+re+")"),CLASS:new RegExp("^\\.("+re+")"),TAG:new RegExp("^("+re.replace("w","w*")+")"),ATTR:new RegExp("^"+oe),PSEUDO:new RegExp("^"+se),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ne+"*(even|odd|(([+-]|)(\\d*)n|)"+ne+"*(?:([+-]|)"+ne+"*(\\d+)|))"+ne+"*\\)|)","i"),bool:new RegExp("^(?:"+te+")$","i"),needsContext:new RegExp("^"+ne+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ne+"*((?:-\\d)?\\d*)"+ne+"*\\)|)(?=[^-]|$)","i")},ge=/^(?:input|select|textarea|button)$/i,me=/^h\d$/i,ve=/^[^{]+\{\s*\[native \w/,ye=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,be=/[+~]/,we=/'|\\/g,xe=new RegExp("\\\\([\\da-f]{1,6}"+ne+"?|("+ne+")|.)","ig"),Ce=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},ke=function(){N()};try{K.apply(U=J.call(q.childNodes),q.childNodes),U[q.childNodes.length].nodeType}catch(Se){K={apply:U.length?function(e,t){G.apply(e,J.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}x=t.support={},S=t.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},N=t.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:q;return r!==j&&9===r.nodeType&&r.documentElement?(j=r,I=r.documentElement,n=r.defaultView,n&&n!==n.top&&(n.addEventListener?n.addEventListener("unload",ke,!1):n.attachEvent&&n.attachEvent("onunload",ke)),L=!S(r),x.attributes=i(function(e){return e.className="i",!e.getAttribute("className")}),x.getElementsByTagName=i(function(e){return e.appendChild(r.createComment("")),!e.getElementsByTagName("*").length}),x.getElementsByClassName=ve.test(r.getElementsByClassName),x.getById=i(function(e){return I.appendChild(e).id=z,!r.getElementsByName||!r.getElementsByName(z).length}),x.getById?(C.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&L){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},C.filter.ID=function(e){var t=e.replace(xe,Ce);return function(e){return e.getAttribute("id")===t}}):(delete C.find.ID,C.filter.ID=function(e){var t=e.replace(xe,Ce);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}}),C.find.TAG=x.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):x.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},C.find.CLASS=x.getElementsByClassName&&function(e,t){return L?t.getElementsByClassName(e):void 0},F=[],$=[],(x.qsa=ve.test(r.querySelectorAll))&&(i(function(e){I.appendChild(e).innerHTML="<a id='"+z+"'></a><select id='"+z+"-\f]' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&$.push("[*^$]="+ne+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||$.push("\\["+ne+"*(?:value|"+te+")"),e.querySelectorAll("[id~="+z+"-]").length||$.push("~="),e.querySelectorAll(":checked").length||$.push(":checked"),e.querySelectorAll("a#"+z+"+*").length||$.push(".#.+[+~]")}),i(function(e){var t=r.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&$.push("name"+ne+"*[*^$|!~]?="),e.querySelectorAll(":enabled").length||$.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),$.push(",.*:")})),(x.matchesSelector=ve.test(_=I.matches||I.webkitMatchesSelector||I.mozMatchesSelector||I.oMatchesSelector||I.msMatchesSelector))&&i(function(e){x.disconnectedMatch=_.call(e,"div"),_.call(e,"[s!='']:x"),F.push("!=",se)}),$=$.length&&new RegExp($.join("|")),F=F.length&&new RegExp(F.join("|")),t=ve.test(I.compareDocumentPosition),H=t||ve.test(I.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},Y=t?function(e,t){if(e===t)return D=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n?n:(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&n||!x.sortDetached&&t.compareDocumentPosition(e)===n?e===r||e.ownerDocument===q&&H(q,e)?-1:t===r||t.ownerDocument===q&&H(q,t)?1:A?ee(A,e)-ee(A,t):0:4&n?-1:1)}:function(e,t){if(e===t)return D=!0,0;var n,i=0,o=e.parentNode,a=t.parentNode,l=[e],c=[t];if(!o||!a)return e===r?-1:t===r?1:o?-1:a?1:A?ee(A,e)-ee(A,t):0;if(o===a)return s(e,t);for(n=e;n=n.parentNode;)l.unshift(n);for(n=t;n=n.parentNode;)c.unshift(n);for(;l[i]===c[i];)i++;return i?s(l[i],c[i]):l[i]===q?-1:c[i]===q?1:0},r):j},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if((e.ownerDocument||e)!==j&&N(e),n=n.replace(de,"='$1']"),!(!x.matchesSelector||!L||F&&F.test(n)||$&&$.test(n)))try{var r=_.call(e,n);if(r||x.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return t(n,j,null,[e]).length>0},t.contains=function(e,t){return(e.ownerDocument||e)!==j&&N(e),H(e,t)},t.attr=function(e,t){(e.ownerDocument||e)!==j&&N(e);var n=C.attrHandle[t.toLowerCase()],r=n&&Q.call(C.attrHandle,t.toLowerCase())?n(e,t,!L):void 0;return void 0!==r?r:x.attributes||!L?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},t.uniqueSort=function(e){var t,n=[],r=0,i=0;if(D=!x.detectDuplicates,A=!x.sortStable&&e.slice(0),e.sort(Y),D){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)e.splice(n[r],1)}return A=null,e},k=t.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=k(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r++];)n+=k(t);return n},C=t.selectors={cacheLength:50,createPseudo:r,match:he,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(xe,Ce),e[3]=(e[3]||e[4]||e[5]||"").replace(xe,Ce),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return he.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&pe.test(n)&&(t=T(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(xe,Ce).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=R[e+" "];return t||(t=new RegExp("(^|"+ne+")"+e+"("+ne+"|$)"))&&R(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,n,r){return function(i){var o=t.attr(i,e);return null==o?"!="===n:n?(o+="","="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o.replace(ae," ")+" ").indexOf(r)>-1:"|="===n?o===r||o.slice(0,r.length+1)===r+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,l){var c,u,d,p,f,h,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,v=a&&t.nodeName.toLowerCase(),y=!l&&!a;if(m){if(o){for(;g;){for(d=t;d=d[g];)if(a?d.nodeName.toLowerCase()===v:1===d.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[s?m.firstChild:m.lastChild],s&&y){for(u=m[z]||(m[z]={}),c=u[e]||[],f=c[0]===V&&c[1],p=c[0]===V&&c[2],d=f&&m.childNodes[f];d=++f&&d&&d[g]||(p=f=0)||h.pop();)if(1===d.nodeType&&++p&&d===t){u[e]=[V,f,p];break}}else if(y&&(c=(t[z]||(t[z]={}))[e])&&c[0]===V)p=c[1];else for(;(d=++f&&d&&d[g]||(p=f=0)||h.pop())&&((a?d.nodeName.toLowerCase()!==v:1!==d.nodeType)||!++p||(y&&((d[z]||(d[z]={}))[e]=[V,p]),d!==t)););return p-=i,p===r||p%r===0&&p/r>=0}}},PSEUDO:function(e,n){var i,o=C.pseudos[e]||C.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e);return o[z]?o(n):o.length>1?(i=[e,e,"",n],C.setFilters.hasOwnProperty(e.toLowerCase())?r(function(e,t){for(var r,i=o(e,n),s=i.length;s--;)r=ee(e,i[s]),e[r]=!(t[r]=i[s])}):function(e){return o(e,0,i)}):o}},pseudos:{not:r(function(e){var t=[],n=[],i=E(e.replace(le,"$1"));return i[z]?r(function(e,t,n,r){for(var o,s=i(e,null,r,[]),a=e.length;a--;)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,r,o){return t[0]=e,i(t,null,o,n),t[0]=null,!n.pop()}}),has:r(function(e){return function(n){return t(e,n).length>0}}),contains:r(function(e){return e=e.replace(xe,Ce),function(t){return(t.textContent||t.innerText||k(t)).indexOf(e)>-1}}),lang:r(function(e){return fe.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(xe,Ce).toLowerCase(),function(t){var n;do if(n=L?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===I},focus:function(e){return e===j.activeElement&&(!j.hasFocus||j.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!C.pseudos.empty(e)},header:function(e){return me.test(e.nodeName)},input:function(e){return ge.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:c(function(){return[0]}),last:c(function(e,t){return[t-1]}),eq:c(function(e,t,n){return[0>n?n+t:n]}),even:c(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:c(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:c(function(e,t,n){for(var r=0>n?n+t:n;--r>=0;)e.push(r);return e}),gt:c(function(e,t,n){for(var r=0>n?n+t:n;++r<t;)e.push(r);return e})}},C.pseudos.nth=C.pseudos.eq;for(w in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})C.pseudos[w]=a(w);for(w in{submit:!0,reset:!0})C.pseudos[w]=l(w);return d.prototype=C.filters=C.pseudos,C.setFilters=new d,T=t.tokenize=function(e,n){var r,i,o,s,a,l,c,u=X[e+" "];if(u)return n?0:u.slice(0);for(a=e,l=[],c=C.preFilter;a;){(!r||(i=ce.exec(a)))&&(i&&(a=a.slice(i[0].length)||a),l.push(o=[])),r=!1,(i=ue.exec(a))&&(r=i.shift(),o.push({value:r,type:i[0].replace(le," ")}),a=a.slice(r.length));for(s in C.filter)!(i=he[s].exec(a))||c[s]&&!(i=c[s](i))||(r=i.shift(),o.push({value:r,type:s,matches:i}),a=a.slice(r.length));if(!r)break}return n?a.length:a?t.error(e):X(e,l).slice(0)},E=t.compile=function(e,t){var n,r=[],i=[],o=W[e+" "];if(!o){for(t||(t=T(e)),n=t.length;n--;)o=y(t[n]),o[z]?r.push(o):i.push(o);o=W(e,b(i,r)),o.selector=e}return o},O=t.select=function(e,t,n,r){var i,o,s,a,l,c="function"==typeof e&&e,d=!r&&T(e=c.selector||e);if(n=n||[],1===d.length){if(o=d[0]=d[0].slice(0),o.length>2&&"ID"===(s=o[0]).type&&x.getById&&9===t.nodeType&&L&&C.relative[o[1].type]){if(t=(C.find.ID(s.matches[0].replace(xe,Ce),t)||[])[0],!t)return n;c&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(i=he.needsContext.test(e)?0:o.length;i--&&(s=o[i],!C.relative[a=s.type]);)if((l=C.find[a])&&(r=l(s.matches[0].replace(xe,Ce),be.test(o[0].type)&&u(t.parentNode)||t))){if(o.splice(i,1),e=r.length&&p(o),!e)return K.apply(n,r),n;break}}return(c||E(e,d))(r,t,!L,n,be.test(e)&&u(t.parentNode)||t),n},x.sortStable=z.split("").sort(Y).join("")===z,x.detectDuplicates=!!D,N(),x.sortDetached=i(function(e){return 1&e.compareDocumentPosition(j.createElement("div"))}),i(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||o("type|href|height|width",function(e,t,n){return n?void 0:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),x.attributes&&i(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||o("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?void 0:e.defaultValue}),i(function(e){return null==e.getAttribute("disabled")})||o(te,function(e,t,n){var r;return n?void 0:e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),t}(e);J.find=ie,J.expr=ie.selectors,J.expr[":"]=J.expr.pseudos,J.unique=ie.uniqueSort,J.text=ie.getText,J.isXMLDoc=ie.isXML,J.contains=ie.contains;var oe=J.expr.match.needsContext,se=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,ae=/^.[^:#\[\.,]*$/;J.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?J.find.matchesSelector(r,e)?[r]:[]:J.find.matches(e,J.grep(t,function(e){return 1===e.nodeType}))},J.fn.extend({find:function(e){var t,n=this.length,r=[],i=this;

if("string"!=typeof e)return this.pushStack(J(e).filter(function(){for(t=0;n>t;t++)if(J.contains(i[t],this))return!0}));for(t=0;n>t;t++)J.find(e,i[t],r);return r=this.pushStack(n>1?J.unique(r):r),r.selector=this.selector?this.selector+" "+e:e,r},filter:function(e){return this.pushStack(r(this,e||[],!1))},not:function(e){return this.pushStack(r(this,e||[],!0))},is:function(e){return!!r(this,"string"==typeof e&&oe.test(e)?J(e):e||[],!1).length}});var le,ce=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,ue=J.fn.init=function(e,t){var n,r;if(!e)return this;if("string"==typeof e){if(n="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:ce.exec(e),!n||!n[1]&&t)return!t||t.jquery?(t||le).find(e):this.constructor(t).find(e);if(n[1]){if(t=t instanceof J?t[0]:t,J.merge(this,J.parseHTML(n[1],t&&t.nodeType?t.ownerDocument||t:G,!0)),se.test(n[1])&&J.isPlainObject(t))for(n in t)J.isFunction(this[n])?this[n](t[n]):this.attr(n,t[n]);return this}return r=G.getElementById(n[2]),r&&r.parentNode&&(this.length=1,this[0]=r),this.context=G,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):J.isFunction(e)?"undefined"!=typeof le.ready?le.ready(e):e(J):(void 0!==e.selector&&(this.selector=e.selector,this.context=e.context),J.makeArray(e,this))};ue.prototype=J.fn,le=J(G);var de=/^(?:parents|prev(?:Until|All))/,pe={children:!0,contents:!0,next:!0,prev:!0};J.extend({dir:function(e,t,n){for(var r=[],i=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(i&&J(e).is(n))break;r.push(e)}return r},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}}),J.fn.extend({has:function(e){var t=J(e,this),n=t.length;return this.filter(function(){for(var e=0;n>e;e++)if(J.contains(this,t[e]))return!0})},closest:function(e,t){for(var n,r=0,i=this.length,o=[],s=oe.test(e)||"string"!=typeof e?J(e,t||this.context):0;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&J.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?J.unique(o):o)},index:function(e){return e?"string"==typeof e?Y.call(J(e),this[0]):Y.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(J.unique(J.merge(this.get(),J(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),J.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return J.dir(e,"parentNode")},parentsUntil:function(e,t,n){return J.dir(e,"parentNode",n)},next:function(e){return i(e,"nextSibling")},prev:function(e){return i(e,"previousSibling")},nextAll:function(e){return J.dir(e,"nextSibling")},prevAll:function(e){return J.dir(e,"previousSibling")},nextUntil:function(e,t,n){return J.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return J.dir(e,"previousSibling",n)},siblings:function(e){return J.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return J.sibling(e.firstChild)},contents:function(e){return e.contentDocument||J.merge([],e.childNodes)}},function(e,t){J.fn[e]=function(n,r){var i=J.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=J.filter(r,i)),this.length>1&&(pe[e]||J.unique(i),de.test(e)&&i.reverse()),this.pushStack(i)}});var fe=/\S+/g,he={};J.Callbacks=function(e){e="string"==typeof e?he[e]||o(e):J.extend({},e);var t,n,r,i,s,a,l=[],c=!e.once&&[],u=function(o){for(t=e.memory&&o,n=!0,a=i||0,i=0,s=l.length,r=!0;l&&s>a;a++)if(l[a].apply(o[0],o[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,l&&(c?c.length&&u(c.shift()):t?l=[]:d.disable())},d={add:function(){if(l){var n=l.length;!function o(t){J.each(t,function(t,n){var r=J.type(n);"function"===r?e.unique&&d.has(n)||l.push(n):n&&n.length&&"string"!==r&&o(n)})}(arguments),r?s=l.length:t&&(i=n,u(t))}return this},remove:function(){return l&&J.each(arguments,function(e,t){for(var n;(n=J.inArray(t,l,n))>-1;)l.splice(n,1),r&&(s>=n&&s--,a>=n&&a--)}),this},has:function(e){return e?J.inArray(e,l)>-1:!(!l||!l.length)},empty:function(){return l=[],s=0,this},disable:function(){return l=c=t=void 0,this},disabled:function(){return!l},lock:function(){return c=void 0,t||d.disable(),this},locked:function(){return!c},fireWith:function(e,t){return!l||n&&!c||(t=t||[],t=[e,t.slice?t.slice():t],r?c.push(t):u(t)),this},fire:function(){return d.fireWith(this,arguments),this},fired:function(){return!!n}};return d},J.extend({Deferred:function(e){var t=[["resolve","done",J.Callbacks("once memory"),"resolved"],["reject","fail",J.Callbacks("once memory"),"rejected"],["notify","progress",J.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return J.Deferred(function(n){J.each(t,function(t,o){var s=J.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&J.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[o[0]+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?J.extend(e,r):r}},i={};return r.pipe=r.then,J.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t,n,r,i=0,o=R.call(arguments),s=o.length,a=1!==s||e&&J.isFunction(e.promise)?s:0,l=1===a?e:J.Deferred(),c=function(e,n,r){return function(i){n[e]=this,r[e]=arguments.length>1?R.call(arguments):i,r===t?l.notifyWith(n,r):--a||l.resolveWith(n,r)}};if(s>1)for(t=new Array(s),n=new Array(s),r=new Array(s);s>i;i++)o[i]&&J.isFunction(o[i].promise)?o[i].promise().done(c(i,r,o)).fail(l.reject).progress(c(i,n,t)):--a;return a||l.resolveWith(r,o),l.promise()}});var ge;J.fn.ready=function(e){return J.ready.promise().done(e),this},J.extend({isReady:!1,readyWait:1,holdReady:function(e){e?J.readyWait++:J.ready(!0)},ready:function(e){(e===!0?--J.readyWait:J.isReady)||(J.isReady=!0,e!==!0&&--J.readyWait>0||(ge.resolveWith(G,[J]),J.fn.triggerHandler&&(J(G).triggerHandler("ready"),J(G).off("ready"))))}}),J.ready.promise=function(t){return ge||(ge=J.Deferred(),"complete"===G.readyState?setTimeout(J.ready):(G.addEventListener("DOMContentLoaded",s,!1),e.addEventListener("load",s,!1))),ge.promise(t)},J.ready.promise();var me=J.access=function(e,t,n,r,i,o,s){var a=0,l=e.length,c=null==n;if("object"===J.type(n)){i=!0;for(a in n)J.access(e,t,a,n[a],!0,o,s)}else if(void 0!==r&&(i=!0,J.isFunction(r)||(s=!0),c&&(s?(t.call(e,r),t=null):(c=t,t=function(e,t,n){return c.call(J(e),n)})),t))for(;l>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:c?t.call(e):l?t(e[0],n):o};J.acceptData=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType},a.uid=1,a.accepts=J.acceptData,a.prototype={key:function(e){if(!a.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=a.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,J.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(J.isEmptyObject(o))J.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return void 0===t?n:n[t]},access:function(e,t,n){var r;return void 0===t||t&&"string"==typeof t&&void 0===n?(r=this.get(e,t),void 0!==r?r:this.get(e,J.camelCase(t))):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(void 0===t)this.cache[o]={};else{J.isArray(t)?r=t.concat(t.map(J.camelCase)):(i=J.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(fe)||[])),n=r.length;for(;n--;)delete s[r[n]]}},hasData:function(e){return!J.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}};var ve=new a,ye=new a,be=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,we=/([A-Z])/g;J.extend({hasData:function(e){return ye.hasData(e)||ve.hasData(e)},data:function(e,t,n){return ye.access(e,t,n)},removeData:function(e,t){ye.remove(e,t)},_data:function(e,t,n){return ve.access(e,t,n)},_removeData:function(e,t){ve.remove(e,t)}}),J.fn.extend({data:function(e,t){var n,r,i,o=this[0],s=o&&o.attributes;if(void 0===e){if(this.length&&(i=ye.get(o),1===o.nodeType&&!ve.get(o,"hasDataAttrs"))){for(n=s.length;n--;)s[n]&&(r=s[n].name,0===r.indexOf("data-")&&(r=J.camelCase(r.slice(5)),l(o,r,i[r])));ve.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof e?this.each(function(){ye.set(this,e)}):me(this,function(t){var n,r=J.camelCase(e);if(o&&void 0===t){if(n=ye.get(o,e),void 0!==n)return n;if(n=ye.get(o,r),void 0!==n)return n;if(n=l(o,r,void 0),void 0!==n)return n}else this.each(function(){var n=ye.get(this,r);ye.set(this,r,t),-1!==e.indexOf("-")&&void 0!==n&&ye.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){ye.remove(this,e)})}}),J.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=ve.get(e,t),n&&(!r||J.isArray(n)?r=ve.access(e,t,J.makeArray(n)):r.push(n)),r||[]):void 0},dequeue:function(e,t){t=t||"fx";var n=J.queue(e,t),r=n.length,i=n.shift(),o=J._queueHooks(e,t),s=function(){J.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return ve.get(e,n)||ve.access(e,n,{empty:J.Callbacks("once memory").add(function(){ve.remove(e,[t+"queue",n])})})}}),J.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?J.queue(this[0],e):void 0===t?this:this.each(function(){var n=J.queue(this,e,t);J._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&J.dequeue(this,e)})},dequeue:function(e){return this.each(function(){J.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=J.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";s--;)n=ve.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var xe=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Ce=["Top","Right","Bottom","Left"],ke=function(e,t){return e=t||e,"none"===J.css(e,"display")||!J.contains(e.ownerDocument,e)},Se=/^(?:checkbox|radio)$/i;!function(){var e=G.createDocumentFragment(),t=e.appendChild(G.createElement("div")),n=G.createElement("input");n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),t.appendChild(n),Z.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,t.innerHTML="<textarea>x</textarea>",Z.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue}();var Te="undefined";Z.focusinBubbles="onfocusin"in e;var Ee=/^key/,Oe=/^(?:mouse|pointer|contextmenu)|click/,Pe=/^(?:focusinfocus|focusoutblur)$/,Ae=/^([^.]*)(?:\.(.+)|)$/;J.event={global:{},add:function(e,t,n,r,i){var o,s,a,l,c,u,d,p,f,h,g,m=ve.get(e);if(m)for(n.handler&&(o=n,n=o.handler,i=o.selector),n.guid||(n.guid=J.guid++),(l=m.events)||(l=m.events={}),(s=m.handle)||(s=m.handle=function(t){return typeof J!==Te&&J.event.triggered!==t.type?J.event.dispatch.apply(e,arguments):void 0}),t=(t||"").match(fe)||[""],c=t.length;c--;)a=Ae.exec(t[c])||[],f=g=a[1],h=(a[2]||"").split(".").sort(),f&&(d=J.event.special[f]||{},f=(i?d.delegateType:d.bindType)||f,d=J.event.special[f]||{},u=J.extend({type:f,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&J.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=l[f])||(p=l[f]=[],p.delegateCount=0,d.setup&&d.setup.call(e,r,h,s)!==!1||e.addEventListener&&e.addEventListener(f,s,!1)),d.add&&(d.add.call(e,u),u.handler.guid||(u.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,u):p.push(u),J.event.global[f]=!0)},remove:function(e,t,n,r,i){var o,s,a,l,c,u,d,p,f,h,g,m=ve.hasData(e)&&ve.get(e);if(m&&(l=m.events)){for(t=(t||"").match(fe)||[""],c=t.length;c--;)if(a=Ae.exec(t[c])||[],f=g=a[1],h=(a[2]||"").split(".").sort(),f){for(d=J.event.special[f]||{},f=(r?d.delegateType:d.bindType)||f,p=l[f]||[],a=a[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=p.length;o--;)u=p[o],!i&&g!==u.origType||n&&n.guid!==u.guid||a&&!a.test(u.namespace)||r&&r!==u.selector&&("**"!==r||!u.selector)||(p.splice(o,1),u.selector&&p.delegateCount--,d.remove&&d.remove.call(e,u));s&&!p.length&&(d.teardown&&d.teardown.call(e,h,m.handle)!==!1||J.removeEvent(e,f,m.handle),delete l[f])}else for(f in l)J.event.remove(e,f+t[c],n,r,!0);J.isEmptyObject(l)&&(delete m.handle,ve.remove(e,"events"))}},trigger:function(t,n,r,i){var o,s,a,l,c,u,d,p=[r||G],f=U.call(t,"type")?t.type:t,h=U.call(t,"namespace")?t.namespace.split("."):[];if(s=a=r=r||G,3!==r.nodeType&&8!==r.nodeType&&!Pe.test(f+J.event.triggered)&&(f.indexOf(".")>=0&&(h=f.split("."),f=h.shift(),h.sort()),c=f.indexOf(":")<0&&"on"+f,t=t[J.expando]?t:new J.Event(f,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=h.join("."),t.namespace_re=t.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=r),n=null==n?[t]:J.makeArray(n,[t]),d=J.event.special[f]||{},i||!d.trigger||d.trigger.apply(r,n)!==!1)){if(!i&&!d.noBubble&&!J.isWindow(r)){for(l=d.delegateType||f,Pe.test(l+f)||(s=s.parentNode);s;s=s.parentNode)p.push(s),a=s;a===(r.ownerDocument||G)&&p.push(a.defaultView||a.parentWindow||e)}for(o=0;(s=p[o++])&&!t.isPropagationStopped();)t.type=o>1?l:d.bindType||f,u=(ve.get(s,"events")||{})[t.type]&&ve.get(s,"handle"),u&&u.apply(s,n),u=c&&s[c],u&&u.apply&&J.acceptData(s)&&(t.result=u.apply(s,n),t.result===!1&&t.preventDefault());return t.type=f,i||t.isDefaultPrevented()||d._default&&d._default.apply(p.pop(),n)!==!1||!J.acceptData(r)||c&&J.isFunction(r[f])&&!J.isWindow(r)&&(a=r[c],a&&(r[c]=null),J.event.triggered=f,r[f](),J.event.triggered=void 0,a&&(r[c]=a)),t.result}},dispatch:function(e){e=J.event.fix(e);var t,n,r,i,o,s=[],a=R.call(arguments),l=(ve.get(this,"events")||{})[e.type]||[],c=J.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){for(s=J.event.handlers.call(this,e,l),t=0;(i=s[t++])&&!e.isPropagationStopped();)for(e.currentTarget=i.elem,n=0;(o=i.handlers[n++])&&!e.isImmediatePropagationStopped();)(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((J.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),void 0!==r&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()));return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,l=e.target;if(a&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!==this;l=l.parentNode||this)if(l.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",void 0===r[i]&&(r[i]=o.needsContext?J(i,this).index(l)>=0:J.find(i,this,null,[l]).length),r[i]&&r.push(o);r.length&&s.push({elem:l,handlers:r})}return a<t.length&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,o=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||G,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||void 0===o||(e.which=1&o?1:2&o?3:4&o?2:0),e}},fix:function(e){if(e[J.expando])return e;var t,n,r,i=e.type,o=e,s=this.fixHooks[i];for(s||(this.fixHooks[i]=s=Oe.test(i)?this.mouseHooks:Ee.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new J.Event(o),t=r.length;t--;)n=r[t],e[n]=o[n];return e.target||(e.target=G),3===e.target.nodeType&&(e.target=e.target.parentNode),s.filter?s.filter(e,o):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==d()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===d()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&J.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(e){return J.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=J.extend(new J.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?J.event.trigger(i,null,t):J.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},J.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},J.Event=function(e,t){return this instanceof J.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?c:u):this.type=e,t&&J.extend(this,t),this.timeStamp=e&&e.timeStamp||J.now(),void(this[J.expando]=!0)):new J.Event(e,t)},J.Event.prototype={isDefaultPrevented:u,isPropagationStopped:u,isImmediatePropagationStopped:u,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=c,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=c,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=c,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),this.stopPropagation()}},J.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){J.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!J.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),Z.focusinBubbles||J.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){J.event.simulate(t,e.target,J.event.fix(e),!0)};J.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=ve.access(r,t);i||r.addEventListener(e,n,!0),ve.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=ve.access(r,t)-1;i?ve.access(r,t,i):(r.removeEventListener(e,n,!0),ve.remove(r,t))}}}),J.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=void 0);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=void 0):null==r&&("string"==typeof t?(r=n,n=void 0):(r=n,n=t,t=void 0)),r===!1)r=u;else if(!r)return this;return 1===i&&(o=r,r=function(e){return J().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=J.guid++)),this.each(function(){J.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,J(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=void 0),n===!1&&(n=u),this.each(function(){J.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){J.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?J.event.trigger(e,t,n,!0):void 0}});var De=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Ne=/<([\w:]+)/,je=/<|&#?\w+;/,Ie=/<(?:script|style|link)/i,Le=/checked\s*(?:[^=]|=\s*.checked.)/i,$e=/^$|\/(?:java|ecma)script/i,Fe=/^true\/(.*)/,_e=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,He={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};He.optgroup=He.option,He.tbody=He.tfoot=He.colgroup=He.caption=He.thead,He.th=He.td,J.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),l=J.contains(e.ownerDocument,e);if(!(Z.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||J.isXMLDoc(e)))for(s=v(a),o=v(e),r=0,i=o.length;i>r;r++)y(o[r],s[r]);if(t)if(n)for(o=o||v(e),s=s||v(a),r=0,i=o.length;i>r;r++)m(o[r],s[r]);else m(e,a);return s=v(a,"script"),s.length>0&&g(s,!l&&v(e,"script")),a},buildFragment:function(e,t,n,r){for(var i,o,s,a,l,c,u=t.createDocumentFragment(),d=[],p=0,f=e.length;f>p;p++)if(i=e[p],i||0===i)if("object"===J.type(i))J.merge(d,i.nodeType?[i]:i);else if(je.test(i)){for(o=o||u.appendChild(t.createElement("div")),s=(Ne.exec(i)||["",""])[1].toLowerCase(),a=He[s]||He._default,o.innerHTML=a[1]+i.replace(De,"<$1></$2>")+a[2],c=a[0];c--;)o=o.lastChild;J.merge(d,o.childNodes),o=u.firstChild,o.textContent=""}else d.push(t.createTextNode(i));for(u.textContent="",p=0;i=d[p++];)if((!r||-1===J.inArray(i,r))&&(l=J.contains(i.ownerDocument,i),o=v(u.appendChild(i),"script"),l&&g(o),n))for(c=0;i=o[c++];)$e.test(i.type||"")&&n.push(i);return u},cleanData:function(e){for(var t,n,r,i,o=J.event.special,s=0;void 0!==(n=e[s]);s++){if(J.acceptData(n)&&(i=n[ve.expando],i&&(t=ve.cache[i]))){if(t.events)for(r in t.events)o[r]?J.event.remove(n,r):J.removeEvent(n,r,t.handle);ve.cache[i]&&delete ve.cache[i]}delete ye.cache[n[ye.expando]]}}}),J.fn.extend({text:function(e){return me(this,function(e){return void 0===e?J.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=e)})},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=p(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=p(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){for(var n,r=e?J.filter(e,this):this,i=0;null!=(n=r[i]);i++)t||1!==n.nodeType||J.cleanData(v(n)),n.parentNode&&(t&&J.contains(n.ownerDocument,n)&&g(v(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(J.cleanData(v(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return J.clone(this,e,t)})},html:function(e){return me(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ie.test(e)&&!He[(Ne.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(De,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(J.cleanData(v(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=arguments[0];return this.domManip(arguments,function(t){e=this.parentNode,J.cleanData(v(this)),e&&e.replaceChild(t,this)}),e&&(e.length||e.nodeType)?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t){e=X.apply([],e);var n,r,i,o,s,a,l=0,c=this.length,u=this,d=c-1,p=e[0],g=J.isFunction(p);if(g||c>1&&"string"==typeof p&&!Z.checkClone&&Le.test(p))return this.each(function(n){var r=u.eq(n);g&&(e[0]=p.call(this,n,r.html())),r.domManip(e,t)});if(c&&(n=J.buildFragment(e,this[0].ownerDocument,!1,this),r=n.firstChild,1===n.childNodes.length&&(n=r),r)){for(i=J.map(v(n,"script"),f),o=i.length;c>l;l++)s=n,l!==d&&(s=J.clone(s,!0,!0),o&&J.merge(i,v(s,"script"))),t.call(this[l],s,l);if(o)for(a=i[i.length-1].ownerDocument,J.map(i,h),l=0;o>l;l++)s=i[l],$e.test(s.type||"")&&!ve.access(s,"globalEval")&&J.contains(a,s)&&(s.src?J._evalUrl&&J._evalUrl(s.src):J.globalEval(s.textContent.replace(_e,"")))}return this}}),J.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){J.fn[e]=function(e){for(var n,r=[],i=J(e),o=i.length-1,s=0;o>=s;s++)n=s===o?this:this.clone(!0),J(i[s])[t](n),W.apply(r,n.get());return this.pushStack(r)}});var ze,qe={},Ve=/^margin/,Me=new RegExp("^("+xe+")(?!px)[a-z%]+$","i"),Re=function(t){return t.ownerDocument.defaultView.opener?t.ownerDocument.defaultView.getComputedStyle(t,null):e.getComputedStyle(t,null)};!function(){function t(){s.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",s.innerHTML="",i.appendChild(o);var t=e.getComputedStyle(s,null);n="1%"!==t.top,r="4px"===t.width,i.removeChild(o)}var n,r,i=G.documentElement,o=G.createElement("div"),s=G.createElement("div");s.style&&(s.style.backgroundClip="content-box",s.cloneNode(!0).style.backgroundClip="",Z.clearCloneStyle="content-box"===s.style.backgroundClip,o.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",o.appendChild(s),e.getComputedStyle&&J.extend(Z,{pixelPosition:function(){return t(),n},boxSizingReliable:function(){return null==r&&t(),r},reliableMarginRight:function(){var t,n=s.appendChild(G.createElement("div"));return n.style.cssText=s.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",n.style.marginRight=n.style.width="0",s.style.width="1px",i.appendChild(o),t=!parseFloat(e.getComputedStyle(n,null).marginRight),i.removeChild(o),s.removeChild(n),t}}))}(),J.swap=function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i};var Xe=/^(none|table(?!-c[ea]).+)/,We=new RegExp("^("+xe+")(.*)$","i"),Ye=new RegExp("^([+-])=("+xe+")","i"),Be={position:"absolute",visibility:"hidden",display:"block"},Qe={letterSpacing:"0",fontWeight:"400"},Ue=["Webkit","O","Moz","ms"];J.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=x(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=J.camelCase(t),l=e.style;return t=J.cssProps[a]||(J.cssProps[a]=k(l,a)),s=J.cssHooks[t]||J.cssHooks[a],void 0===n?s&&"get"in s&&void 0!==(i=s.get(e,!1,r))?i:l[t]:(o=typeof n,"string"===o&&(i=Ye.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(J.css(e,t)),o="number"),null!=n&&n===n&&("number"!==o||J.cssNumber[a]||(n+="px"),Z.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),s&&"set"in s&&void 0===(n=s.set(e,n,r))||(l[t]=n)),void 0)}},css:function(e,t,n,r){var i,o,s,a=J.camelCase(t);return t=J.cssProps[a]||(J.cssProps[a]=k(e.style,a)),s=J.cssHooks[t]||J.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),void 0===i&&(i=x(e,t,r)),"normal"===i&&t in Qe&&(i=Qe[t]),""===n||n?(o=parseFloat(i),n===!0||J.isNumeric(o)?o||0:i):i}}),J.each(["height","width"],function(e,t){J.cssHooks[t]={get:function(e,n,r){return n?Xe.test(J.css(e,"display"))&&0===e.offsetWidth?J.swap(e,Be,function(){return E(e,t,r)}):E(e,t,r):void 0},set:function(e,n,r){var i=r&&Re(e);return S(e,n,r?T(e,t,r,"border-box"===J.css(e,"boxSizing",!1,i),i):0)}}}),J.cssHooks.marginRight=C(Z.reliableMarginRight,function(e,t){return t?J.swap(e,{display:"inline-block"},x,[e,"marginRight"]):void 0}),J.each({margin:"",padding:"",border:"Width"},function(e,t){J.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];4>r;r++)i[e+Ce[r]+t]=o[r]||o[r-2]||o[0];return i}},Ve.test(e)||(J.cssHooks[e+t].set=S)}),J.fn.extend({css:function(e,t){return me(this,function(e,t,n){var r,i,o={},s=0;if(J.isArray(t)){for(r=Re(e),i=t.length;i>s;s++)o[t[s]]=J.css(e,t[s],!1,r);return o}return void 0!==n?J.style(e,t,n):J.css(e,t)},e,t,arguments.length>1)},show:function(){return O(this,!0)},hide:function(){return O(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ke(this)?J(this).show():J(this).hide()})}}),J.Tween=P,P.prototype={constructor:P,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(J.cssNumber[n]?"":"px")},cur:function(){var e=P.propHooks[this.prop];return e&&e.get?e.get(this):P.propHooks._default.get(this)},run:function(e){var t,n=P.propHooks[this.prop];return this.pos=t=this.options.duration?J.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):P.propHooks._default.set(this),this}},P.prototype.init.prototype=P.prototype,P.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=J.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){J.fx.step[e.prop]?J.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[J.cssProps[e.prop]]||J.cssHooks[e.prop])?J.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},P.propHooks.scrollTop=P.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},J.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},J.fx=P.prototype.init,J.fx.step={};var Ze,Ge,Ke=/^(?:toggle|show|hide)$/,Je=new RegExp("^(?:([+-])=|)("+xe+")([a-z%]*)$","i"),et=/queueHooks$/,tt=[j],nt={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Je.exec(t),o=i&&i[3]||(J.cssNumber[e]?"":"px"),s=(J.cssNumber[e]||"px"!==o&&+r)&&Je.exec(J.css(n.elem,e)),a=1,l=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,J.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--l)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};J.Animation=J.extend(L,{tweener:function(e,t){J.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");for(var n,r=0,i=e.length;i>r;r++)n=e[r],nt[n]=nt[n]||[],nt[n].unshift(t)},prefilter:function(e,t){t?tt.unshift(e):tt.push(e)}}),J.speed=function(e,t,n){var r=e&&"object"==typeof e?J.extend({},e):{complete:n||!n&&t||J.isFunction(e)&&e,duration:e,easing:n&&t||t&&!J.isFunction(t)&&t};return r.duration=J.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in J.fx.speeds?J.fx.speeds[r.duration]:J.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){J.isFunction(r.old)&&r.old.call(this),r.queue&&J.dequeue(this,r.queue)},r},J.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ke).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=J.isEmptyObject(e),o=J.speed(t,n,r),s=function(){var t=L(this,J.extend({},e),o);(i||ve.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=J.timers,s=ve.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&et.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&J.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=ve.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=J.timers,s=r?r.length:0;for(n.finish=!0,J.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),
t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),J.each(["toggle","show","hide"],function(e,t){var n=J.fn[t];J.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(D(t,!0),e,r,i)}}),J.each({slideDown:D("show"),slideUp:D("hide"),slideToggle:D("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){J.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),J.timers=[],J.fx.tick=function(){var e,t=0,n=J.timers;for(Ze=J.now();t<n.length;t++)e=n[t],e()||n[t]!==e||n.splice(t--,1);n.length||J.fx.stop(),Ze=void 0},J.fx.timer=function(e){J.timers.push(e),e()?J.fx.start():J.timers.pop()},J.fx.interval=13,J.fx.start=function(){Ge||(Ge=setInterval(J.fx.tick,J.fx.interval))},J.fx.stop=function(){clearInterval(Ge),Ge=null},J.fx.speeds={slow:600,fast:200,_default:400},J.fn.delay=function(e,t){return e=J.fx?J.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},function(){var e=G.createElement("input"),t=G.createElement("select"),n=t.appendChild(G.createElement("option"));e.type="checkbox",Z.checkOn=""!==e.value,Z.optSelected=n.selected,t.disabled=!0,Z.optDisabled=!n.disabled,e=G.createElement("input"),e.value="t",e.type="radio",Z.radioValue="t"===e.value}();var rt,it,ot=J.expr.attrHandle;J.fn.extend({attr:function(e,t){return me(this,J.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){J.removeAttr(this,e)})}}),J.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(e&&3!==o&&8!==o&&2!==o)return typeof e.getAttribute===Te?J.prop(e,t,n):(1===o&&J.isXMLDoc(e)||(t=t.toLowerCase(),r=J.attrHooks[t]||(J.expr.match.bool.test(t)?it:rt)),void 0===n?r&&"get"in r&&null!==(i=r.get(e,t))?i:(i=J.find.attr(e,t),null==i?void 0:i):null!==n?r&&"set"in r&&void 0!==(i=r.set(e,n,t))?i:(e.setAttribute(t,n+""),n):void J.removeAttr(e,t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(fe);if(o&&1===e.nodeType)for(;n=o[i++];)r=J.propFix[n]||n,J.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!Z.radioValue&&"radio"===t&&J.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}}}),it={set:function(e,t,n){return t===!1?J.removeAttr(e,n):e.setAttribute(n,n),n}},J.each(J.expr.match.bool.source.match(/\w+/g),function(e,t){var n=ot[t]||J.find.attr;ot[t]=function(e,t,r){var i,o;return r||(o=ot[t],ot[t]=i,i=null!=n(e,t,r)?t.toLowerCase():null,ot[t]=o),i}});var st=/^(?:input|select|textarea|button)$/i;J.fn.extend({prop:function(e,t){return me(this,J.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[J.propFix[e]||e]})}}),J.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!J.isXMLDoc(e),o&&(t=J.propFix[t]||t,i=J.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||st.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),Z.optSelected||(J.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),J.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){J.propFix[this.toLowerCase()]=this});var at=/[\t\r\n\f]/g;J.fn.extend({addClass:function(e){var t,n,r,i,o,s,a="string"==typeof e&&e,l=0,c=this.length;if(J.isFunction(e))return this.each(function(t){J(this).addClass(e.call(this,t,this.className))});if(a)for(t=(e||"").match(fe)||[];c>l;l++)if(n=this[l],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(at," "):" ")){for(o=0;i=t[o++];)r.indexOf(" "+i+" ")<0&&(r+=i+" ");s=J.trim(r),n.className!==s&&(n.className=s)}return this},removeClass:function(e){var t,n,r,i,o,s,a=0===arguments.length||"string"==typeof e&&e,l=0,c=this.length;if(J.isFunction(e))return this.each(function(t){J(this).removeClass(e.call(this,t,this.className))});if(a)for(t=(e||"").match(fe)||[];c>l;l++)if(n=this[l],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(at," "):"")){for(o=0;i=t[o++];)for(;r.indexOf(" "+i+" ")>=0;)r=r.replace(" "+i+" "," ");s=e?J.trim(r):"",n.className!==s&&(n.className=s)}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):this.each(J.isFunction(e)?function(n){J(this).toggleClass(e.call(this,n,this.className,t),t)}:function(){if("string"===n)for(var t,r=0,i=J(this),o=e.match(fe)||[];t=o[r++];)i.hasClass(t)?i.removeClass(t):i.addClass(t);else(n===Te||"boolean"===n)&&(this.className&&ve.set(this,"__className__",this.className),this.className=this.className||e===!1?"":ve.get(this,"__className__")||"")})},hasClass:function(e){for(var t=" "+e+" ",n=0,r=this.length;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(at," ").indexOf(t)>=0)return!0;return!1}});var lt=/\r/g;J.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=J.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,J(this).val()):e,null==i?i="":"number"==typeof i?i+="":J.isArray(i)&&(i=J.map(i,function(e){return null==e?"":e+""})),t=J.valHooks[this.type]||J.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)return t=J.valHooks[i.type]||J.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:(n=i.value,"string"==typeof n?n.replace(lt,""):null==n?"":n)}}}),J.extend({valHooks:{option:{get:function(e){var t=J.find.attr(e,"value");return null!=t?t:J.trim(J.text(e))}},select:{get:function(e){for(var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,l=0>i?a:o?i:0;a>l;l++)if(n=r[l],!(!n.selected&&l!==i||(Z.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&J.nodeName(n.parentNode,"optgroup"))){if(t=J(n).val(),o)return t;s.push(t)}return s},set:function(e,t){for(var n,r,i=e.options,o=J.makeArray(t),s=i.length;s--;)r=i[s],(r.selected=J.inArray(r.value,o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),J.each(["radio","checkbox"],function(){J.valHooks[this]={set:function(e,t){return J.isArray(t)?e.checked=J.inArray(J(e).val(),t)>=0:void 0}},Z.checkOn||(J.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),J.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){J.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),J.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var ct=J.now(),ut=/\?/;J.parseJSON=function(e){return JSON.parse(e+"")},J.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=void 0}return(!t||t.getElementsByTagName("parsererror").length)&&J.error("Invalid XML: "+e),t};var dt=/#.*$/,pt=/([?&])_=[^&]*/,ft=/^(.*?):[ \t]*([^\r\n]*)$/gm,ht=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,gt=/^(?:GET|HEAD)$/,mt=/^\/\//,vt=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,yt={},bt={},wt="*/".concat("*"),xt=e.location.href,Ct=vt.exec(xt.toLowerCase())||[];J.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:xt,type:"GET",isLocal:ht.test(Ct[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":wt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":J.parseJSON,"text xml":J.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?_(_(e,J.ajaxSettings),t):_(J.ajaxSettings,e)},ajaxPrefilter:$(yt),ajaxTransport:$(bt),ajax:function(e,t){function n(e,t,n,s){var l,u,v,y,w,C=t;2!==b&&(b=2,a&&clearTimeout(a),r=void 0,o=s||"",x.readyState=e>0?4:0,l=e>=200&&300>e||304===e,n&&(y=H(d,x,n)),y=z(d,y,x,l),l?(d.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(J.lastModified[i]=w),w=x.getResponseHeader("etag"),w&&(J.etag[i]=w)),204===e||"HEAD"===d.type?C="nocontent":304===e?C="notmodified":(C=y.state,u=y.data,v=y.error,l=!v)):(v=C,(e||!C)&&(C="error",0>e&&(e=0))),x.status=e,x.statusText=(t||C)+"",l?h.resolveWith(p,[u,C,x]):h.rejectWith(p,[x,C,v]),x.statusCode(m),m=void 0,c&&f.trigger(l?"ajaxSuccess":"ajaxError",[x,d,l?u:v]),g.fireWith(p,[x,C]),c&&(f.trigger("ajaxComplete",[x,d]),--J.active||J.event.trigger("ajaxStop")))}"object"==typeof e&&(t=e,e=void 0),t=t||{};var r,i,o,s,a,l,c,u,d=J.ajaxSetup({},t),p=d.context||d,f=d.context&&(p.nodeType||p.jquery)?J(p):J.event,h=J.Deferred(),g=J.Callbacks("once memory"),m=d.statusCode||{},v={},y={},b=0,w="canceled",x={readyState:0,getResponseHeader:function(e){var t;if(2===b){if(!s)for(s={};t=ft.exec(o);)s[t[1].toLowerCase()]=t[2];t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===b?o:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return b||(e=y[n]=y[n]||e,v[e]=t),this},overrideMimeType:function(e){return b||(d.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>b)for(t in e)m[t]=[m[t],e[t]];else x.always(e[x.status]);return this},abort:function(e){var t=e||w;return r&&r.abort(t),n(0,t),this}};if(h.promise(x).complete=g.add,x.success=x.done,x.error=x.fail,d.url=((e||d.url||xt)+"").replace(dt,"").replace(mt,Ct[1]+"//"),d.type=t.method||t.type||d.method||d.type,d.dataTypes=J.trim(d.dataType||"*").toLowerCase().match(fe)||[""],null==d.crossDomain&&(l=vt.exec(d.url.toLowerCase()),d.crossDomain=!(!l||l[1]===Ct[1]&&l[2]===Ct[2]&&(l[3]||("http:"===l[1]?"80":"443"))===(Ct[3]||("http:"===Ct[1]?"80":"443")))),d.data&&d.processData&&"string"!=typeof d.data&&(d.data=J.param(d.data,d.traditional)),F(yt,d,t,x),2===b)return x;c=J.event&&d.global,c&&0===J.active++&&J.event.trigger("ajaxStart"),d.type=d.type.toUpperCase(),d.hasContent=!gt.test(d.type),i=d.url,d.hasContent||(d.data&&(i=d.url+=(ut.test(i)?"&":"?")+d.data,delete d.data),d.cache===!1&&(d.url=pt.test(i)?i.replace(pt,"$1_="+ct++):i+(ut.test(i)?"&":"?")+"_="+ct++)),d.ifModified&&(J.lastModified[i]&&x.setRequestHeader("If-Modified-Since",J.lastModified[i]),J.etag[i]&&x.setRequestHeader("If-None-Match",J.etag[i])),(d.data&&d.hasContent&&d.contentType!==!1||t.contentType)&&x.setRequestHeader("Content-Type",d.contentType),x.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+("*"!==d.dataTypes[0]?", "+wt+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)x.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(p,x,d)===!1||2===b))return x.abort();w="abort";for(u in{success:1,error:1,complete:1})x[u](d[u]);if(r=F(bt,d,t,x)){x.readyState=1,c&&f.trigger("ajaxSend",[x,d]),d.async&&d.timeout>0&&(a=setTimeout(function(){x.abort("timeout")},d.timeout));try{b=1,r.send(v,n)}catch(C){if(!(2>b))throw C;n(-1,C)}}else n(-1,"No Transport");return x},getJSON:function(e,t,n){return J.get(e,t,n,"json")},getScript:function(e,t){return J.get(e,void 0,t,"script")}}),J.each(["get","post"],function(e,t){J[t]=function(e,n,r,i){return J.isFunction(n)&&(i=i||r,r=n,n=void 0),J.ajax({url:e,type:t,dataType:i,data:n,success:r})}}),J._evalUrl=function(e){return J.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},J.fn.extend({wrapAll:function(e){var t;return J.isFunction(e)?this.each(function(t){J(this).wrapAll(e.call(this,t))}):(this[0]&&(t=J(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return this.each(J.isFunction(e)?function(t){J(this).wrapInner(e.call(this,t))}:function(){var t=J(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=J.isFunction(e);return this.each(function(n){J(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){J.nodeName(this,"body")||J(this).replaceWith(this.childNodes)}).end()}}),J.expr.filters.hidden=function(e){return e.offsetWidth<=0&&e.offsetHeight<=0},J.expr.filters.visible=function(e){return!J.expr.filters.hidden(e)};var kt=/%20/g,St=/\[\]$/,Tt=/\r?\n/g,Et=/^(?:submit|button|image|reset|file)$/i,Ot=/^(?:input|select|textarea|keygen)/i;J.param=function(e,t){var n,r=[],i=function(e,t){t=J.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(void 0===t&&(t=J.ajaxSettings&&J.ajaxSettings.traditional),J.isArray(e)||e.jquery&&!J.isPlainObject(e))J.each(e,function(){i(this.name,this.value)});else for(n in e)q(n,e[n],t,i);return r.join("&").replace(kt,"+")},J.fn.extend({serialize:function(){return J.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=J.prop(this,"elements");return e?J.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!J(this).is(":disabled")&&Ot.test(this.nodeName)&&!Et.test(e)&&(this.checked||!Se.test(e))}).map(function(e,t){var n=J(this).val();return null==n?null:J.isArray(n)?J.map(n,function(e){return{name:t.name,value:e.replace(Tt,"\r\n")}}):{name:t.name,value:n.replace(Tt,"\r\n")}}).get()}}),J.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var Pt=0,At={},Dt={0:200,1223:204},Nt=J.ajaxSettings.xhr();e.attachEvent&&e.attachEvent("onunload",function(){for(var e in At)At[e]()}),Z.cors=!!Nt&&"withCredentials"in Nt,Z.ajax=Nt=!!Nt,J.ajaxTransport(function(e){var t;return Z.cors||Nt&&!e.crossDomain?{send:function(n,r){var i,o=e.xhr(),s=++Pt;if(o.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)o[i]=e.xhrFields[i];e.mimeType&&o.overrideMimeType&&o.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)o.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete At[s],t=o.onload=o.onerror=null,"abort"===e?o.abort():"error"===e?r(o.status,o.statusText):r(Dt[o.status]||o.status,o.statusText,"string"==typeof o.responseText?{text:o.responseText}:void 0,o.getAllResponseHeaders()))}},o.onload=t(),o.onerror=t("error"),t=At[s]=t("abort");try{o.send(e.hasContent&&e.data||null)}catch(a){if(t)throw a}},abort:function(){t&&t()}}:void 0}),J.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return J.globalEval(e),e}}}),J.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),J.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=J("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),G.head.appendChild(t[0])},abort:function(){n&&n()}}}});var jt=[],It=/(=)\?(?=&|$)|\?\?/;J.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=jt.pop()||J.expando+"_"+ct++;return this[e]=!0,e}}),J.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(It.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&It.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=J.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(It,"$1"+i):t.jsonp!==!1&&(t.url+=(ut.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||J.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,jt.push(i)),s&&J.isFunction(o)&&o(s[0]),s=o=void 0}),"script"):void 0}),J.parseHTML=function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||G;var r=se.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=J.buildFragment([e],t,i),i&&i.length&&J(i).remove(),J.merge([],r.childNodes))};var Lt=J.fn.load;J.fn.load=function(e,t,n){if("string"!=typeof e&&Lt)return Lt.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=J.trim(e.slice(a)),e=e.slice(0,a)),J.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),s.length>0&&J.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?J("<div>").append(J.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},J.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){J.fn[t]=function(e){return this.on(t,e)}}),J.expr.filters.animated=function(e){return J.grep(J.timers,function(t){return e===t.elem}).length};var $t=e.document.documentElement;J.offset={setOffset:function(e,t,n){var r,i,o,s,a,l,c,u=J.css(e,"position"),d=J(e),p={};"static"===u&&(e.style.position="relative"),a=d.offset(),o=J.css(e,"top"),l=J.css(e,"left"),c=("absolute"===u||"fixed"===u)&&(o+l).indexOf("auto")>-1,c?(r=d.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(l)||0),J.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(p.top=t.top-a.top+s),null!=t.left&&(p.left=t.left-a.left+i),"using"in t?t.using.call(e,p):d.css(p)}},J.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){J.offset.setOffset(this,e,t)});var t,n,r=this[0],i={top:0,left:0},o=r&&r.ownerDocument;if(o)return t=o.documentElement,J.contains(t,r)?(typeof r.getBoundingClientRect!==Te&&(i=r.getBoundingClientRect()),n=V(o),{top:i.top+n.pageYOffset-t.clientTop,left:i.left+n.pageXOffset-t.clientLeft}):i},position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===J.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),J.nodeName(e[0],"html")||(r=e.offset()),r.top+=J.css(e[0],"borderTopWidth",!0),r.left+=J.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-J.css(n,"marginTop",!0),left:t.left-r.left-J.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent||$t;e&&!J.nodeName(e,"html")&&"static"===J.css(e,"position");)e=e.offsetParent;return e||$t})}}),J.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;J.fn[t]=function(i){return me(this,function(t,i,o){var s=V(t);return void 0===o?s?s[n]:t[i]:void(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o)},t,i,arguments.length,null)}}),J.each(["top","left"],function(e,t){J.cssHooks[t]=C(Z.pixelPosition,function(e,n){return n?(n=x(e,t),Me.test(n)?J(e).position()[t]+"px":n):void 0})}),J.each({Height:"height",Width:"width"},function(e,t){J.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){J.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return me(this,function(t,n,r){var i;return J.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):void 0===r?J.css(t,n,s):J.style(t,n,r,s)},t,o?r:void 0,o,null)}})}),J.fn.size=function(){return this.length},J.fn.andSelf=J.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return J});var Ft=e.jQuery,_t=e.$;return J.noConflict=function(t){return e.$===J&&(e.$=_t),t&&e.jQuery===J&&(e.jQuery=Ft),J},typeof t===Te&&(e.jQuery=e.$=J),J}),window.Modernizr=function(e,t,n){function r(e){b.cssText=e}function i(e,t){return r(k.join(e+";")+(t||""))}function o(e,t){return typeof e===t}function s(e,t){return!!~(""+e).indexOf(t)}function a(e,t){for(var r in e){var i=e[r];if(!s(i,"-")&&b[i]!==n)return"pfx"==t?i:!0}return!1}function l(e,t,r){for(var i in e){var s=t[e[i]];if(s!==n)return r===!1?e[i]:o(s,"function")?s.bind(r||t):s}return!1}function c(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+T.join(r+" ")+r).split(" ");return o(t,"string")||o(t,"undefined")?a(i,t):(i=(e+" "+E.join(r+" ")+r).split(" "),l(i,t,n))}function u(){h.input=function(n){for(var r=0,i=n.length;i>r;r++)D[n[r]]=!!(n[r]in w);return D.list&&(D.list=!(!t.createElement("datalist")||!e.HTMLDataListElement)),D}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),h.inputtypes=function(e){for(var r,i,o,s=0,a=e.length;a>s;s++)w.setAttribute("type",i=e[s]),r="text"!==w.type,r&&(w.value=x,w.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(i)&&w.style.WebkitAppearance!==n?(m.appendChild(w),o=t.defaultView,r=o.getComputedStyle&&"textfield"!==o.getComputedStyle(w,null).WebkitAppearance&&0!==w.offsetHeight,m.removeChild(w)):/^(search|tel)$/.test(i)||(r=/^(url|email)$/.test(i)?w.checkValidity&&w.checkValidity()===!1:w.value!=x)),A[e[s]]=!!r;return A}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d,p,f="2.8.3",h={},g=!0,m=t.documentElement,v="modernizr",y=t.createElement(v),b=y.style,w=t.createElement("input"),x=":)",C={}.toString,k=" -webkit- -moz- -o- -ms- ".split(" "),S="Webkit Moz O ms",T=S.split(" "),E=S.toLowerCase().split(" "),O={svg:"http://www.w3.org/2000/svg"},P={},A={},D={},N=[],j=N.slice,I=function(e,n,r,i){var o,s,a,l,c=t.createElement("div"),u=t.body,d=u||t.createElement("body");if(parseInt(r,10))for(;r--;)a=t.createElement("div"),a.id=i?i[r]:v+(r+1),c.appendChild(a);return o=["&#173;",'<style id="s',v,'">',e,"</style>"].join(""),c.id=v,(u?c:d).innerHTML+=o,d.appendChild(c),u||(d.style.background="",d.style.overflow="hidden",l=m.style.overflow,m.style.overflow="hidden",m.appendChild(d)),s=n(c,e),u?c.parentNode.removeChild(c):(d.parentNode.removeChild(d),m.style.overflow=l),!!s},L=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t)&&n(t).matches||!1;var r;return I("@media "+t+" { #"+v+" { position: absolute; } }",function(t){r="absolute"==(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).position}),r},$=function(){function e(e,i){i=i||t.createElement(r[e]||"div"),e="on"+e;var s=e in i;return s||(i.setAttribute||(i=t.createElement("div")),i.setAttribute&&i.removeAttribute&&(i.setAttribute(e,""),s=o(i[e],"function"),o(i[e],"undefined")||(i[e]=n),i.removeAttribute(e))),i=null,s}var r={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return e}(),F={}.hasOwnProperty;p=o(F,"undefined")||o(F.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(e,t){return F.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=j.call(arguments,1),r=function(){if(this instanceof r){var i=function(){};i.prototype=t.prototype;var o=new i,s=t.apply(o,n.concat(j.call(arguments)));return Object(s)===s?s:o}return t.apply(e,n.concat(j.call(arguments)))};return r}),P.flexbox=function(){return c("flexWrap")},P.flexboxlegacy=function(){return c("boxDirection")},P.canvas=function(){var e=t.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))},P.canvastext=function(){return!(!h.canvas||!o(t.createElement("canvas").getContext("2d").fillText,"function"))},P.webgl=function(){return!!e.WebGLRenderingContext},P.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:I(["@media (",k.join("touch-enabled),("),v,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},P.geolocation=function(){return"geolocation"in navigator},P.postmessage=function(){return!!e.postMessage},P.websqldatabase=function(){return!!e.openDatabase},P.indexedDB=function(){return!!c("indexedDB",e)},P.hashchange=function(){return $("hashchange",e)&&(t.documentMode===n||t.documentMode>7)},P.history=function(){return!(!e.history||!history.pushState)},P.draganddrop=function(){var e=t.createElement("div");return"draggable"in e||"ondragstart"in e&&"ondrop"in e},P.websockets=function(){return"WebSocket"in e||"MozWebSocket"in e},P.rgba=function(){return r("background-color:rgba(150,255,150,.5)"),s(b.backgroundColor,"rgba")},P.hsla=function(){return r("background-color:hsla(120,40%,100%,.5)"),s(b.backgroundColor,"rgba")||s(b.backgroundColor,"hsla")},P.multiplebgs=function(){return r("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(b.background)},P.backgroundsize=function(){return c("backgroundSize")},P.borderimage=function(){return c("borderImage")},P.borderradius=function(){return c("borderRadius")},P.boxshadow=function(){return c("boxShadow")},P.textshadow=function(){return""===t.createElement("div").style.textShadow},P.opacity=function(){return i("opacity:.55"),/^0.55$/.test(b.opacity)},P.cssanimations=function(){return c("animationName")},P.csscolumns=function(){return c("columnCount")},P.cssgradients=function(){var e="background-image:",t="gradient(linear,left top,right bottom,from(#9f9),to(white));",n="linear-gradient(left top,#9f9, white);";return r((e+"-webkit- ".split(" ").join(t+e)+k.join(n+e)).slice(0,-e.length)),s(b.backgroundImage,"gradient")},P.cssreflections=function(){return c("boxReflect")},P.csstransforms=function(){return!!c("transform")},P.csstransforms3d=function(){var e=!!c("perspective");return e&&"webkitPerspective"in m.style&&I("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=9===t.offsetLeft&&3===t.offsetHeight}),e},P.csstransitions=function(){return c("transition")},P.fontface=function(){var e;return I('@font-face {font-family:"font";src:url("https://")}',function(n,r){var i=t.getElementById("smodernizr"),o=i.sheet||i.styleSheet,s=o?o.cssRules&&o.cssRules[0]?o.cssRules[0].cssText:o.cssText||"":"";e=/src/i.test(s)&&0===s.indexOf(r.split(" ")[0])}),e},P.generatedcontent=function(){var e;return I(["#",v,"{font:0/0 a}#",v,':after{content:"',x,'";visibility:hidden;font:3px/1 a}'].join(""),function(t){e=t.offsetHeight>=3}),e},P.video=function(){var e=t.createElement("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(r){}return n},P.audio=function(){var e=t.createElement("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(r){}return n},P.localstorage=function(){try{return localStorage.setItem(v,v),localStorage.removeItem(v),!0}catch(e){return!1}},P.sessionstorage=function(){try{return sessionStorage.setItem(v,v),sessionStorage.removeItem(v),!0}catch(e){return!1}},P.webworkers=function(){return!!e.Worker},P.applicationcache=function(){return!!e.applicationCache},P.svg=function(){return!!t.createElementNS&&!!t.createElementNS(O.svg,"svg").createSVGRect},P.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==O.svg},P.smil=function(){return!!t.createElementNS&&/SVGAnimate/.test(C.call(t.createElementNS(O.svg,"animate")))},P.svgclippaths=function(){return!!t.createElementNS&&/SVGClipPath/.test(C.call(t.createElementNS(O.svg,"clipPath")))};for(var _ in P)p(P,_)&&(d=_.toLowerCase(),h[d]=P[_](),N.push((h[d]?"":"no-")+d));return h.input||u(),h.addTest=function(e,t){if("object"==typeof e)for(var r in e)p(e,r)&&h.addTest(r,e[r]);else{if(e=e.toLowerCase(),h[e]!==n)return h;t="function"==typeof t?t():t,"undefined"!=typeof g&&g&&(m.className+=" "+(t?"":"no-")+e),h[e]=t}return h},r(""),y=w=null,function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=y.elements;return"string"==typeof e?e.split(" "):e}function i(e){var t=v[e[g]];return t||(t={},m++,e[g]=m,v[m]=t),t}function o(e,n,r){if(n||(n=t),u)return n.createElement(e);r||(r=i(n));var o;return o=r.cache[e]?r.cache[e].cloneNode():h.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!o.canHaveChildren||f.test(e)||o.tagUrn?o:r.frag.appendChild(o)}function s(e,n){if(e||(e=t),u)return e.createDocumentFragment();n=n||i(e);for(var o=n.frag.cloneNode(),s=0,a=r(),l=a.length;l>s;s++)o.createElement(a[s]);return o}function a(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return y.shivMethods?o(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}function l(e){e||(e=t);var r=i(e);return!y.shivCSS||c||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),u||a(e,r),e}var c,u,d="3.7.0",p=e.html5||{},f=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",m=0,v={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",c="hidden"in e,u=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){c=!0,u=!0}}();var y={elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:d,shivCSS:p.shivCSS!==!1,supportsUnknownElements:u,shivMethods:p.shivMethods!==!1,type:"default",shivDocument:l,createElement:o,createDocumentFragment:s};e.html5=y,l(t)}(this,t),h._version=f,h._prefixes=k,h._domPrefixes=E,h._cssomPrefixes=T,h.mq=L,h.hasEvent=$,h.testProp=function(e){return a([e])},h.testAllProps=c,h.testStyles=I,h.prefixed=function(e,t,n){return t?c(e,t,n):c(e,"pfx")},m.className=m.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(g?" js "+N.join(" "):""),h}(this,this.document),function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e(window.jQuery||window.Zepto)}(function(e){"use strict";var t,n=[],r={},i=/^([a-z]:)?\/\//i,o=/\.\w+$/;r.init=function(s){return s=e.extend({ping:null,dimensions:"preserve",glue:"_",skipExtensions:["svg"]},s),this.each(function(){var a=e(this);if(a.is("img")&&!a.hasClass("dense-image")){a.addClass("dense-image dense-loading");var l,c=r.getImageAttribute.call(this),u=a.attr("src"),d=!1;if(!c){if(!u||1===t||-1!==e.inArray(u.split(".").pop().split(/[\?\#]/).shift(),s.skipExtensions))return void a.removeClass("dense-image dense-loading");c=u.replace(o,function(e){return s.glue+t+"x"+e}),d=s.ping!==!1&&-1===e.inArray(c,n)&&(s.ping===!0||!i.test(c)||0===c.indexOf("//"+document.domain)||0===c.indexOf(document.location.protocol+"//"+document.domain));

}l=function(){var e=function(){a.removeClass("dense-loading").addClass("dense-ready").trigger("denseRetinaReady.dense")};a.attr("src",c),"update"===s.dimensions?a.dense("updateDimensions").one("denseDimensionChanged",e):("remove"===s.dimensions&&a.removeAttr("width height"),e())},d?e.ajax({url:c,type:"HEAD"}).done(function(e,t,r){var i=r.getResponseHeader("Content-type");i&&0!==i.indexOf("image/")||(n.push(c),l())}):l()}}),this},r.updateDimensions=function(){return this.each(function(){var t,n=e(this),r=n.attr("src");r&&(t=new Image,t.src=r,e(t).on("load.dense",function(){n.attr({width:t.width,height:t.height}).trigger("denseDimensionChanged.dense")}))})},r.devicePixelRatio=function(){var t=1;return"undefined"!==e.type(window.devicePixelRatio)?t=window.devicePixelRatio:"undefined"!==e.type(window.matchMedia)&&e.each([1.3,2,3,4,5,6],function(e,n){var r=["(-webkit-min-device-pixel-ratio: "+n+")","(min-resolution: "+Math.floor(96*n)+"dpi)","(min-resolution: "+n+"dppx)"].join(",");return window.matchMedia(r).matches?void(t=n):!1}),Math.ceil(t)},r.getImageAttribute=function(){for(var n,r=e(this).eq(0),i=!1,o=1;t>=o;o++)n=r.attr("data-"+o+"x"),n&&(i=n);return i},t=r.devicePixelRatio(),e.fn.dense=function(t,n){return("string"!==e.type(t)||"function"!==e.type(r[t]))&&(n=t,t="init"),r[t].call(this,n)},e(function(){e("body.dense-retina img").dense()})}),function(){"use strict";function e(t,r){function i(e,t){return function(){return e.apply(t,arguments)}}var o;if(r=r||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=r.touchBoundary||10,this.layer=t,this.tapDelay=r.tapDelay||200,this.tapTimeout=r.tapTimeout||700,!e.notNeeded(t)){for(var s=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],a=this,l=0,c=s.length;c>l;l++)a[s[l]]=i(a[s[l]],a);n&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,r){var i=Node.prototype.removeEventListener;"click"===e?i.call(t,e,n.hijacked||n,r):i.call(t,e,n,r)},t.addEventListener=function(e,n,r){var i=Node.prototype.addEventListener;"click"===e?i.call(t,e,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),r):i.call(t,e,n,r)}),"function"==typeof t.onclick&&(o=t.onclick,t.addEventListener("click",function(e){o(e)},!1),t.onclick=null)}}var t=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!t,r=/iP(ad|hone|od)/.test(navigator.userAgent)&&!t,i=r&&/OS 4_\d(_\d)?/.test(navigator.userAgent),o=r&&/OS [6-7]_\d/.test(navigator.userAgent),s=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(r&&"file"===e.type||e.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(e.className)},e.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},e.prototype.sendClick=function(e,t){var n,r;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),r=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,r.screenX,r.screenY,r.clientX,r.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},e.prototype.determineEventType=function(e){return n&&"select"===e.tagName.toLowerCase()?"mousedown":"click"},e.prototype.focus=function(e){var t;r&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type&&"month"!==e.type?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},e.prototype.updateScrollParent=function(e){var t,n;if(t=e.fastClickScrollParent,!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)},e.prototype.getTargetElementFromEventTarget=function(e){return e.nodeType===Node.TEXT_NODE?e.parentNode:e},e.prototype.onTouchStart=function(e){var t,n,o;if(e.targetTouches.length>1)return!0;if(t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0],r){if(o=window.getSelection(),o.rangeCount&&!o.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<this.tapDelay&&e.preventDefault(),!0},e.prototype.touchHasMoved=function(e){var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n?!0:!1},e.prototype.onTouchMove=function(e){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},e.prototype.findControl=function(e){return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(e){var t,s,a,l,c,u=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(e.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,s=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,o&&(c=e.changedTouches[0],u=document.elementFromPoint(c.pageX-window.pageXOffset,c.pageY-window.pageYOffset)||u,u.fastClickScrollParent=this.targetElement.fastClickScrollParent),a=u.tagName.toLowerCase(),"label"===a){if(t=this.findControl(u)){if(this.focus(u),n)return!1;u=t}}else if(this.needsFocus(u))return e.timeStamp-s>100||r&&window.top!==window&&"input"===a?(this.targetElement=null,!1):(this.focus(u),this.sendClick(u,e),r&&"select"===a||(this.targetElement=null,e.preventDefault()),!1);return r&&!i&&(l=u.fastClickScrollParent,l&&l.fastClickLastScrollTop!==l.scrollTop)?!0:(this.needsClick(u)||(e.preventDefault(),this.sendClick(u,e)),!1)},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(e){return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0},e.prototype.onClick=function(e){var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===e.target.type&&0===e.detail?!0:(t=this.onMouse(e),t||(this.targetElement=null),t)},e.prototype.destroy=function(){var e=this.layer;n&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(e){var t,r,i,o;if("undefined"==typeof window.ontouchstart)return!0;if(r=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(r>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(s&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(t=document.querySelector("meta[name=viewport]")))){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===e.style.msTouchAction||"manipulation"===e.style.touchAction?!0:(o=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],o>=27&&(t=document.querySelector("meta[name=viewport]"),t&&(-1!==t.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===e.style.touchAction||"manipulation"===e.style.touchAction?!0:!1)},e.attach=function(t,n){return new e(t,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.FastClick=e):window.FastClick=e}(),function(e,t,n){"use strict";function r(t){if(u.webkit&&!t)return{height:0,width:0};if(!u.data.outer){var n={border:"none","box-sizing":"content-box",height:"200px",margin:"0",padding:"0",width:"200px"};u.data.inner=e("<div>").css(e.extend({},n)),u.data.outer=e("<div>").css(e.extend({left:"-1000px",overflow:"scroll",position:"absolute",top:"-1000px"},n)).append(u.data.inner).appendTo("body")}return u.data.outer.scrollLeft(1e3).scrollTop(1e3),{height:Math.ceil(u.data.outer.offset().top-u.data.inner.offset().top||0),width:Math.ceil(u.data.outer.offset().left-u.data.inner.offset().left||0)}}function i(n,r){return e(t).on({"blur.scrollbar":function(){e(t).add("body").off(".scrollbar"),n&&n()},"dragstart.scrollbar":function(e){return e.preventDefault(),!1},"mouseup.scrollbar":function(){e(t).add("body").off(".scrollbar"),n&&n()}}),e("body").on({"selectstart.scrollbar":function(e){return e.preventDefault(),!1}}),r&&r.preventDefault(),!1}function o(){var e=r(!0);return!(e.height||e.width)}function s(e){var t=e.originalEvent;return t.axis&&t.axis===t.HORIZONTAL_AXIS?!1:t.wheelDeltaX?!1:!0}var a=!1,l=1,c="px",u={data:{},macosx:-1!==n.navigator.platform.toLowerCase().indexOf("mac"),mobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(n.navigator.userAgent),overlay:null,scroll:null,scrolls:[],webkit:/WebKit/.test(n.navigator.userAgent),log:a?function(t,r){var i=t;r&&"string"!=typeof t&&(i=[],e.each(t,function(e,t){i.push('"'+e+'": '+t)}),i=i.join(", ")),n.console&&n.console.log?n.console.log(i):alert(i)}:function(){}},d={autoScrollSize:!0,autoUpdate:!0,debug:!1,disableBodyScroll:!1,duration:200,ignoreMobile:!0,ignoreOverlay:!0,scrollStep:30,showArrows:!1,stepScrolling:!0,type:"simple",scrollx:null,scrolly:null,onDestroy:null,onInit:null,onScroll:null,onUpdate:null},p=function(t,i){u.scroll||(u.log("Init jQuery Scrollbar v0.2.6"),u.overlay=o(),u.scroll=r(),g(),e(n).resize(function(){var e=!1;if(u.scroll&&(u.scroll.height||u.scroll.width)){var t=r();(t.height!=u.scroll.height||t.width!=u.scroll.width)&&(u.scroll=t,e=!0)}g(e)})),this.container=t,this.options=e.extend({},d,n.jQueryScrollbarOptions||{}),this.scrollTo=null,this.scrollx={},this.scrolly={},this.init(i)};p.prototype={destroy:function(){if(this.wrapper){var n=this.container.scrollLeft(),r=this.container.scrollTop();this.container.insertBefore(this.wrapper).css({height:"",margin:""}).removeClass("scroll-content").removeClass("scroll-scrollx_visible").removeClass("scroll-scrolly_visible").off(".scrollbar").scrollLeft(n).scrollTop(r),this.scrollx.scrollbar.removeClass("scroll-scrollx_visible").find("div").andSelf().off(".scrollbar"),this.scrolly.scrollbar.removeClass("scroll-scrolly_visible").find("div").andSelf().off(".scrollbar"),this.wrapper.remove(),e(t).add("body").off(".scrollbar"),e.isFunction(this.options.onDestroy)&&this.options.onDestroy.apply(this,[this.container])}},getScrollbar:function(t){var n=this.options["scroll"+t],r={advanced:'<div class="scroll-element_corner"></div><div class="scroll-arrow scroll-arrow_less"></div><div class="scroll-arrow scroll-arrow_more"></div><div class="scroll-element_outer">    <div class="scroll-element_size"></div>    <div class="scroll-element_inner-wrapper">        <div class="scroll-element_inner scroll-element_track">            <div class="scroll-element_inner-bottom"></div>        </div>    </div>    <div class="scroll-bar">        <div class="scroll-bar_body">            <div class="scroll-bar_body-inner"></div>        </div>        <div class="scroll-bar_bottom"></div>        <div class="scroll-bar_center"></div>    </div></div>',simple:'<div class="scroll-element_outer">    <div class="scroll-element_size"></div>    <div class="scroll-element_track"></div>    <div class="scroll-bar"></div></div>'},i=r[this.options.type]?this.options.type:"advanced";return n=n?"string"==typeof n?e(n).appendTo(this.wrapper):e(n):e("<div>").addClass("scroll-element").html(r[i]).appendTo(this.wrapper),this.options.showArrows&&n.addClass("scroll-element_arrows_visible"),n.addClass("scroll-"+t)},init:function(n){var r=this,o=this.container,a=this.containerWrapper||o,d=e.extend(this.options,n||{}),p={x:this.scrollx,y:this.scrolly},f=this.wrapper,h={scrollLeft:o.scrollLeft(),scrollTop:o.scrollTop()};if(u.mobile&&d.ignoreMobile||u.overlay&&d.ignoreOverlay||u.macosx&&!u.webkit)return!1;if(f)a.css({height:"","margin-bottom":-1*u.scroll.height+c,"margin-right":-1*u.scroll.width+c});else{if(this.wrapper=f=e("<div>").addClass("scroll-wrapper").addClass(o.attr("class")).css("position","absolute"==o.css("position")?"absolute":"relative").insertBefore(o).append(o),o.is("textarea")&&(this.containerWrapper=a=e("<div>").insertBefore(o).append(o),f.addClass("scroll-textarea")),a.addClass("scroll-content").css({height:"","margin-bottom":-1*u.scroll.height+c,"margin-right":-1*u.scroll.width+c}),o.on("scroll.scrollbar",function(t){e.isFunction(d.onScroll)&&d.onScroll.call(r,{maxScroll:p.y.maxScrollOffset,scroll:o.scrollTop(),size:p.y.size,visible:p.y.visible},{maxScroll:p.x.maxScrollOffset,scroll:o.scrollLeft(),size:p.x.size,visible:p.x.visible}),p.x.isVisible&&p.x.scroller.css("left",o.scrollLeft()*p.x.kx+c),p.y.isVisible&&p.y.scroller.css("top",o.scrollTop()*p.y.kx+c)}),f.on("scroll",function(){f.scrollTop(0).scrollLeft(0)}),d.disableBodyScroll){var g=function(e){s(e)?p.y.isVisible&&p.y.mousewheel(e):p.x.isVisible&&p.x.mousewheel(e)};f.on({"MozMousePixelScroll.scrollbar":g,"mousewheel.scrollbar":g}),u.mobile&&f.on("touchstart.scrollbar",function(n){var r=n.originalEvent.touches&&n.originalEvent.touches[0]||n,i={pageX:r.pageX,pageY:r.pageY},s={left:o.scrollLeft(),top:o.scrollTop()};e(t).on({"touchmove.scrollbar":function(e){var t=e.originalEvent.targetTouches&&e.originalEvent.targetTouches[0]||e;o.scrollLeft(s.left+i.pageX-t.pageX),o.scrollTop(s.top+i.pageY-t.pageY),e.preventDefault()},"touchend.scrollbar":function(){e(t).off(".scrollbar")}})})}e.isFunction(d.onInit)&&d.onInit.apply(this,[o])}e.each(p,function(n,a){var c=null,u=1,f="x"==n?"scrollLeft":"scrollTop",h=d.scrollStep,g=function(){var e=o[f]();o[f](e+h),1==u&&e+h>=m&&(e=o[f]()),-1==u&&m>=e+h&&(e=o[f]()),o[f]()==e&&c&&c()},m=0;a.scrollbar||(a.scrollbar=r.getScrollbar(n),a.scroller=a.scrollbar.find(".scroll-bar"),a.mousewheel=function(e){if(!a.isVisible||"x"==n&&s(e))return!0;if("y"==n&&!s(e))return p.x.mousewheel(e),!0;var t=-1*e.originalEvent.wheelDelta||e.originalEvent.detail,i=a.size-a.visible-a.offset;return 0>=m&&0>t||m>=i&&t>0||(m+=t,0>m&&(m=0),m>i&&(m=i),r.scrollTo=r.scrollTo||{},r.scrollTo[f]=m,setTimeout(function(){r.scrollTo&&(o.stop().animate(r.scrollTo,240,"linear",function(){m=o[f]()}),r.scrollTo=null)},1)),e.preventDefault(),!1},a.scrollbar.on({"MozMousePixelScroll.scrollbar":a.mousewheel,"mousewheel.scrollbar":a.mousewheel,"mouseenter.scrollbar":function(){m=o[f]()}}),a.scrollbar.find(".scroll-arrow, .scroll-element_track").on("mousedown.scrollbar",function(t){if(t.which!=l)return!0;u=1;var s={eventOffset:t["x"==n?"pageX":"pageY"],maxScrollValue:a.size-a.visible-a.offset,scrollbarOffset:a.scroller.offset()["x"==n?"left":"top"],scrollbarSize:a.scroller["x"==n?"outerWidth":"outerHeight"]()},p=0,v=0;return e(this).hasClass("scroll-arrow")?(u=e(this).hasClass("scroll-arrow_more")?1:-1,h=d.scrollStep*u,m=u>0?s.maxScrollValue:0):(u=s.eventOffset>s.scrollbarOffset+s.scrollbarSize?1:s.eventOffset<s.scrollbarOffset?-1:0,h=Math.round(.75*a.visible)*u,m=s.eventOffset-s.scrollbarOffset-(d.stepScrolling?1==u?s.scrollbarSize:0:Math.round(s.scrollbarSize/2)),m=o[f]()+m/a.kx),r.scrollTo=r.scrollTo||{},r.scrollTo[f]=d.stepScrolling?o[f]()+h:m,d.stepScrolling&&(c=function(){m=o[f](),clearInterval(v),clearTimeout(p),p=0,v=0},p=setTimeout(function(){v=setInterval(g,40)},d.duration+100)),setTimeout(function(){r.scrollTo&&(o.animate(r.scrollTo,d.duration),r.scrollTo=null)},1),i(c,t)}),a.scroller.on("mousedown.scrollbar",function(r){if(r.which!=l)return!0;var s=r["x"==n?"pageX":"pageY"],c=o[f]();return a.scrollbar.addClass("scroll-draggable"),e(t).on("mousemove.scrollbar",function(e){var t=parseInt((e["x"==n?"pageX":"pageY"]-s)/a.kx,10);o[f](c+t)}),i(function(){a.scrollbar.removeClass("scroll-draggable"),m=o[f]()},r)}))}),e.each(p,function(e,t){var n="scroll-scroll"+e+"_visible",r="x"==e?p.y:p.x;t.scrollbar.removeClass(n),r.scrollbar.removeClass(n),a.removeClass(n)}),e.each(p,function(t,n){e.extend(n,"x"==t?{offset:parseInt(o.css("left"),10)||0,size:o.prop("scrollWidth"),visible:f.width()}:{offset:parseInt(o.css("top"),10)||0,size:o.prop("scrollHeight"),visible:f.height()})});var m=function(t,n){var r="scroll-scroll"+t+"_visible",i="x"==t?p.y:p.x,s=parseInt(o.css("x"==t?"left":"top"),10)||0,l=n.size,d=n.visible+s;n.isVisible=l-d>1,n.isVisible?(n.scrollbar.addClass(r),i.scrollbar.addClass(r),a.addClass(r)):(n.scrollbar.removeClass(r),i.scrollbar.removeClass(r),a.removeClass(r)),"y"==t&&(n.isVisible||n.size<n.visible)&&a.css("height",d+u.scroll.height+c),(p.x.size!=o.prop("scrollWidth")||p.y.size!=o.prop("scrollHeight")||p.x.visible!=f.width()||p.y.visible!=f.height()||p.x.offset!=(parseInt(o.css("left"),10)||0)||p.y.offset!=(parseInt(o.css("top"),10)||0))&&(e.each(p,function(t,n){e.extend(n,"x"==t?{offset:parseInt(o.css("left"),10)||0,size:o.prop("scrollWidth"),visible:f.width()}:{offset:parseInt(o.css("top"),10)||0,size:o.prop("scrollHeight"),visible:f.height()})}),m("x"==t?"y":"x",i))};e.each(p,m),e.isFunction(d.onUpdate)&&d.onUpdate.apply(this,[o]),e.each(p,function(e,t){var n="x"==e?"left":"top",r="x"==e?"outerWidth":"outerHeight",i="x"==e?"width":"height",s=parseInt(o.css(n),10)||0,a=t.size,l=t.visible+s,u=t.scrollbar.find(".scroll-element_size");u=u[r]()+(parseInt(u.css(n),10)||0),d.autoScrollSize&&(t.scrollbarSize=parseInt(u*l/a,10),t.scroller.css(i,t.scrollbarSize+c)),t.scrollbarSize=t.scroller[r](),t.kx=(u-t.scrollbarSize)/(a-l)||1,t.maxScrollOffset=a-l}),o.scrollLeft(h.scrollLeft).scrollTop(h.scrollTop).trigger("scroll")}},e.fn.scrollbar=function(t,n){var r=this;return"get"===t&&(r=null),this.each(function(){var i=e(this);if(i.hasClass("scroll-wrapper")||"body"==i.get(0).nodeName)return!0;var o=i.data("scrollbar");if(o){if("get"===t)return r=o,!1;var s="string"==typeof t&&o[t]?t:"init";if(o[s].apply(o,e.isArray(n)?n:[]),"destroy"===t)for(i.removeData("scrollbar");e.inArray(o,u.scrolls)>=0;)u.scrolls.splice(e.inArray(o,u.scrolls),1)}else"string"!=typeof t&&(o=new p(i,t),i.data("scrollbar",o),u.scrolls.push(o));return!0}),r},e.fn.scrollbar.options=d,n.angular&&!function(e){var t=e.module("jQueryScrollbar",[]);t.directive("jqueryScrollbar",function(){return{link:function(e,t){t.scrollbar(e.options).on("$destroy",function(){t.scrollbar("destroy")})},restring:"AC",scope:{options:"=jqueryScrollbar"}}})}(n.angular);var f=0,h=0,g=function(e){var t,n,r,i,o,s,l;for(t=0;t<u.scrolls.length;t++)i=u.scrolls[t],n=i.container,r=i.options,o=i.wrapper,s=i.scrollx,l=i.scrolly,(e||r.autoUpdate&&o&&o.is(":visible")&&(n.prop("scrollWidth")!=s.size||n.prop("scrollHeight")!=l.size||o.width()!=s.visible||o.height()!=l.visible))&&(i.init(),a&&(u.log({scrollHeight:n.prop("scrollHeight")+":"+i.scrolly.size,scrollWidth:n.prop("scrollWidth")+":"+i.scrollx.size,visibleHeight:o.height()+":"+i.scrolly.visible,visibleWidth:o.width()+":"+i.scrollx.visible},!0),h++));a&&h>10?(u.log("Scroll updates exceed 10"),g=function(){}):(clearTimeout(f),f=setTimeout(g,300))}}(jQuery,document,window),jQuery.extend({bez:function(e){var t="bez_"+jQuery.makeArray(arguments).join("_").replace(".","p");if("function"!=typeof jQuery.easing[t]){var n=function(e,t){var n=[null,null],r=[null,null],i=[null,null],o=function(o,s){return i[s]=3*e[s],r[s]=3*(t[s]-e[s])-i[s],n[s]=1-i[s]-r[s],o*(i[s]+o*(r[s]+o*n[s]))},s=function(e){return i[0]+e*(2*r[0]+3*n[0]*e)},a=function(e){for(var t,n=e,r=0;++r<14&&(t=o(n,0)-e,!(Math.abs(t)<.001));)n-=t/s(n);return n};return function(e){return o(a(e),1)}};jQuery.easing[t]=function(t,r,i,o,s){return o*n([e[0],e[1]],[e[2],e[3]])(r/s)+i}}return t}}),function(e){e.fn.addBack=e.fn.addBack||e.fn.andSelf,e.fn.extend({actual:function(t,n){if(!this[t])throw'$.actual => The jQuery method "'+t+'" you called does not exist';var r,i,o={absolute:!1,clone:!1,includeMargin:!1},s=e.extend(o,n),a=this.eq(0);if(s.clone===!0)r=function(){var e="position: absolute !important; top: -1000 !important; ";a=a.clone().attr("style",e).appendTo("body")},i=function(){a.remove()};else{var l,c=[],u="";r=function(){l=a.parents().addBack().filter(":hidden"),u+="visibility: hidden !important; display: block !important; ",s.absolute===!0&&(u+="position: absolute !important; "),l.each(function(){var t=e(this),n=t.attr("style");c.push(n),t.attr("style",n?n+";"+u:u)})},i=function(){l.each(function(t){var n=e(this),r=c[t];void 0===r?n.removeAttr("style"):n.attr("style",r)})}}r();var d=/(outer)/.test(t)?a[t](s.includeMargin):a[t]();return i(),d}})}(jQuery),function(){"use strict";function e(r){if(!r)throw new Error("No options passed to Waypoint constructor");if(!r.element)throw new Error("No element option passed to Waypoint constructor");if(!r.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+t,this.options=e.Adapter.extend({},e.defaults,r),this.element=this.options.element,this.adapter=new e.Adapter(this.element),this.callback=r.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=e.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=e.Context.findOrCreateByElement(this.options.context),e.offsetAliases[this.options.offset]&&(this.options.offset=e.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),n[this.key]=this,t+=1}var t=0,n={};e.prototype.queueTrigger=function(e){this.group.queueTrigger(this,e)},e.prototype.trigger=function(e){this.enabled&&this.callback&&this.callback.apply(this,e)},e.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete n[this.key]},e.prototype.disable=function(){return this.enabled=!1,this},e.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},e.prototype.next=function(){return this.group.next(this)},e.prototype.previous=function(){return this.group.previous(this)},e.invokeAll=function(e){var t=[];for(var r in n)t.push(n[r]);for(var i=0,o=t.length;o>i;i++)t[i][e]()},e.destroyAll=function(){e.invokeAll("destroy")},e.disableAll=function(){e.invokeAll("disable")},e.enableAll=function(){e.invokeAll("enable")},e.refreshAll=function(){e.Context.refreshAll()},e.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},e.viewportWidth=function(){return document.documentElement.clientWidth},e.adapters=[],e.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},e.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=e}(),function(){"use strict";function e(e){window.setTimeout(e,1e3/60)}function t(e){this.element=e,this.Adapter=i.Adapter,this.adapter=new this.Adapter(e),this.key="waypoint-context-"+n,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},e.waypointContextKey=this.key,r[e.waypointContextKey]=this,n+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var n=0,r={},i=window.Waypoint,o=window.onload;t.prototype.add=function(e){var t=e.options.horizontal?"horizontal":"vertical";this.waypoints[t][e.key]=e,this.refresh()},t.prototype.checkEmpty=function(){var e=this.Adapter.isEmptyObject(this.waypoints.horizontal),t=this.Adapter.isEmptyObject(this.waypoints.vertical);e&&t&&(this.adapter.off(".waypoints"),delete r[this.key])},t.prototype.createThrottledResizeHandler=function(){function e(){t.handleResize(),t.didResize=!1}var t=this;this.adapter.on("resize.waypoints",function(){t.didResize||(t.didResize=!0,i.requestAnimationFrame(e))})},t.prototype.createThrottledScrollHandler=function(){function e(){t.handleScroll(),t.didScroll=!1}var t=this;this.adapter.on("scroll.waypoints",function(){(!t.didScroll||i.isTouch)&&(t.didScroll=!0,i.requestAnimationFrame(e))})},t.prototype.handleResize=function(){i.Context.refreshAll()},t.prototype.handleScroll=function(){var e={},t={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var n in t){var r=t[n],i=r.newScroll>r.oldScroll,o=i?r.forward:r.backward;for(var s in this.waypoints[n]){var a=this.waypoints[n][s],l=r.oldScroll<a.triggerPoint,c=r.newScroll>=a.triggerPoint,u=l&&c,d=!l&&!c;(u||d)&&(a.queueTrigger(o),e[a.group.id]=a.group)}}for(var p in e)e[p].flushTriggers();this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}},t.prototype.innerHeight=function(){return this.element==this.element.window?i.viewportHeight():this.adapter.innerHeight()},t.prototype.remove=function(e){delete this.waypoints[e.axis][e.key],this.checkEmpty()},t.prototype.innerWidth=function(){return this.element==this.element.window?i.viewportWidth():this.adapter.innerWidth()},t.prototype.destroy=function(){var e=[];for(var t in this.waypoints)for(var n in this.waypoints[t])e.push(this.waypoints[t][n]);for(var r=0,i=e.length;i>r;r++)e[r].destroy()},t.prototype.refresh=function(){var e,t=this.element==this.element.window,n=this.adapter.offset(),r={};this.handleScroll(),e={horizontal:{contextOffset:t?0:n.left,contextScroll:t?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:t?0:n.top,contextScroll:t?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var i in e){var o=e[i];for(var s in this.waypoints[i]){var a,l,c,u,d,p=this.waypoints[i][s],f=p.options.offset,h=p.triggerPoint,g=0,m=null==h;p.element!==p.element.window&&(g=p.adapter.offset()[o.offsetProp]),"function"==typeof f?f=f.apply(p):"string"==typeof f&&(f=parseFloat(f),p.options.offset.indexOf("%")>-1&&(f=Math.ceil(o.contextDimension*f/100))),a=o.contextScroll-o.contextOffset,p.triggerPoint=g+a-f,l=h<o.oldScroll,c=p.triggerPoint>=o.oldScroll,u=l&&c,d=!l&&!c,!m&&u?(p.queueTrigger(o.backward),r[p.group.id]=p.group):!m&&d?(p.queueTrigger(o.forward),r[p.group.id]=p.group):m&&o.oldScroll>=p.triggerPoint&&(p.queueTrigger(o.forward),r[p.group.id]=p.group)}}for(var v in r)r[v].flushTriggers();return this},t.findOrCreateByElement=function(e){return t.findByElement(e)||new t(e)},t.refreshAll=function(){for(var e in r)r[e].refresh()},t.findByElement=function(e){return r[e.waypointContextKey]},window.onload=function(){o&&o(),t.refreshAll()},i.requestAnimationFrame=function(t){var n=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||e;n.call(window,t)},i.Context=t}(),function(){"use strict";function e(e,t){return e.triggerPoint-t.triggerPoint}function t(e,t){return t.triggerPoint-e.triggerPoint}function n(e){this.name=e.name,this.axis=e.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),r[this.axis][this.name]=this}var r={vertical:{},horizontal:{}},i=window.Waypoint;n.prototype.add=function(e){this.waypoints.push(e)},n.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},n.prototype.flushTriggers=function(){for(var n in this.triggerQueues){var r=this.triggerQueues[n],i="up"===n||"left"===n;r.sort(i?t:e);for(var o=0,s=r.length;s>o;o+=1){var a=r[o];(a.options.continuous||o===r.length-1)&&a.trigger([n])}}this.clearTriggerQueues()},n.prototype.next=function(t){this.waypoints.sort(e);var n=i.Adapter.inArray(t,this.waypoints),r=n===this.waypoints.length-1;return r?null:this.waypoints[n+1]},n.prototype.previous=function(t){this.waypoints.sort(e);var n=i.Adapter.inArray(t,this.waypoints);return n?this.waypoints[n-1]:null},n.prototype.queueTrigger=function(e,t){this.triggerQueues[t].push(e)},n.prototype.remove=function(e){var t=i.Adapter.inArray(e,this.waypoints);t>-1&&this.waypoints.splice(t,1)},n.prototype.first=function(){return this.waypoints[0]},n.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},n.findOrCreate=function(e){return r[e.axis][e.name]||new n(e)},i.Group=n}(),function(){"use strict";function e(e){this.$element=t(e)}var t=window.jQuery,n=window.Waypoint;t.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(t,n){e.prototype[n]=function(){var e=Array.prototype.slice.call(arguments);return this.$element[n].apply(this.$element,e)}}),t.each(["extend","inArray","isEmptyObject"],function(n,r){e[r]=t[r]}),n.adapters.push({name:"jquery",Adapter:e}),n.Adapter=e}(),function(){"use strict";function e(e){return function(){var n=[],r=arguments[0];return e.isFunction(arguments[0])&&(r=e.extend({},arguments[1]),r.handler=arguments[0]),this.each(function(){var i=e.extend({},r,{element:this});"string"==typeof i.context&&(i.context=e(this).closest(i.context)[0]),n.push(new t(i))}),n}}var t=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=e(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=e(window.Zepto))}(),function(e){function t(e){var t=e.length,r=n.type(e);return"function"===r||n.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===r||0===t||"number"==typeof t&&t>0&&t-1 in e}if(!e.jQuery){var n=function(e,t){return new n.fn.init(e,t)};n.isWindow=function(e){return null!=e&&e==e.window},n.type=function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?i[s.call(e)]||"object":typeof e},n.isArray=Array.isArray||function(e){return"array"===n.type(e)},n.isPlainObject=function(e){var t;if(!e||"object"!==n.type(e)||e.nodeType||n.isWindow(e))return!1;try{if(e.constructor&&!o.call(e,"constructor")&&!o.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}for(t in e);return void 0===t||o.call(e,t)},n.each=function(e,n,r){var i,o=0,s=e.length,a=t(e);if(r){if(a)for(;s>o&&(i=n.apply(e[o],r),i!==!1);o++);else for(o in e)if(i=n.apply(e[o],r),i===!1)break}else if(a)for(;s>o&&(i=n.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=n.call(e[o],o,e[o]),i===!1)break;return e},n.data=function(e,t,i){if(void 0===i){var o=e[n.expando],s=o&&r[o];if(void 0===t)return s;if(s&&t in s)return s[t]}else if(void 0!==t){var o=e[n.expando]||(e[n.expando]=++n.uuid);return r[o]=r[o]||{},r[o][t]=i,i}},n.removeData=function(e,t){var i=e[n.expando],o=i&&r[i];o&&n.each(t,function(e,t){delete o[t]})},n.extend=function(){var e,t,r,i,o,s,a=arguments[0]||{},l=1,c=arguments.length,u=!1;

for("boolean"==typeof a&&(u=a,a=arguments[l]||{},l++),"object"!=typeof a&&"function"!==n.type(a)&&(a={}),l===c&&(a=this,l--);c>l;l++)if(null!=(o=arguments[l]))for(i in o)e=a[i],r=o[i],a!==r&&(u&&r&&(n.isPlainObject(r)||(t=n.isArray(r)))?(t?(t=!1,s=e&&n.isArray(e)?e:[]):s=e&&n.isPlainObject(e)?e:{},a[i]=n.extend(u,s,r)):void 0!==r&&(a[i]=r));return a},n.queue=function(e,r,i){function o(e,n){var r=n||[];return null!=e&&(t(Object(e))?!function(e,t){for(var n=+t.length,r=0,i=e.length;n>r;)e[i++]=t[r++];if(n!==n)for(;void 0!==t[r];)e[i++]=t[r++];return e.length=i,e}(r,"string"==typeof e?[e]:e):[].push.call(r,e)),r}if(e){r=(r||"fx")+"queue";var s=n.data(e,r);return i?(!s||n.isArray(i)?s=n.data(e,r,o(i)):s.push(i),s):s||[]}},n.dequeue=function(e,t){n.each(e.nodeType?[e]:e,function(e,r){t=t||"fx";var i=n.queue(r,t),o=i.shift();"inprogress"===o&&(o=i.shift()),o&&("fx"===t&&i.unshift("inprogress"),o.call(r,function(){n.dequeue(r,t)}))})},n.fn=n.prototype={init:function(e){if(e.nodeType)return this[0]=e,this;throw new Error("Not a DOM node.")},offset:function(){var t=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:t.top+(e.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:t.left+(e.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function e(){for(var e=this.offsetParent||document;e&&"html"===!e.nodeType.toLowerCase&&"static"===e.style.position;)e=e.offsetParent;return e||document}var t=this[0],e=e.apply(t),r=this.offset(),i=/^(?:body|html)$/i.test(e.nodeName)?{top:0,left:0}:n(e).offset();return r.top-=parseFloat(t.style.marginTop)||0,r.left-=parseFloat(t.style.marginLeft)||0,e.style&&(i.top+=parseFloat(e.style.borderTopWidth)||0,i.left+=parseFloat(e.style.borderLeftWidth)||0),{top:r.top-i.top,left:r.left-i.left}}};var r={};n.expando="velocity"+(new Date).getTime(),n.uuid=0;for(var i={},o=i.hasOwnProperty,s=i.toString,a="Boolean Number String Function Array Date RegExp Object Error".split(" "),l=0;l<a.length;l++)i["[object "+a[l]+"]"]=a[l].toLowerCase();n.fn.init.prototype=n.fn,e.Velocity={Utilities:n}}}(window),function(e){"object"==typeof module&&"object"==typeof module.exports?module.exports=e():"function"==typeof define&&define.amd?define(e):e()}(function(){return function(e,t,n,r){function i(e){for(var t=-1,n=e?e.length:0,r=[];++t<n;){var i=e[t];i&&r.push(i)}return r}function o(e){return g.isWrapped(e)?e=[].slice.call(e):g.isNode(e)&&(e=[e]),e}function s(e){var t=p.data(e,"velocity");return null===t?r:t}function a(e){return function(t){return Math.round(t*e)*(1/e)}}function l(e,n,r,i){function o(e,t){return 1-3*t+3*e}function s(e,t){return 3*t-6*e}function a(e){return 3*e}function l(e,t,n){return((o(t,n)*e+s(t,n))*e+a(t))*e}function c(e,t,n){return 3*o(t,n)*e*e+2*s(t,n)*e+a(t)}function u(t,n){for(var i=0;g>i;++i){var o=c(n,e,r);if(0===o)return n;var s=l(n,e,r)-t;n-=s/o}return n}function d(){for(var t=0;b>t;++t)k[t]=l(t*w,e,r)}function p(t,n,i){var o,s,a=0;do s=n+(i-n)/2,o=l(s,e,r)-t,o>0?i=s:n=s;while(Math.abs(o)>v&&++a<y);return s}function f(t){for(var n=0,i=1,o=b-1;i!=o&&k[i]<=t;++i)n+=w;--i;var s=(t-k[i])/(k[i+1]-k[i]),a=n+s*w,l=c(a,e,r);return l>=m?u(t,a):0==l?a:p(t,n,n+w)}function h(){S=!0,(e!=n||r!=i)&&d()}var g=4,m=.001,v=1e-7,y=10,b=11,w=1/(b-1),x="Float32Array"in t;if(4!==arguments.length)return!1;for(var C=0;4>C;++C)if("number"!=typeof arguments[C]||isNaN(arguments[C])||!isFinite(arguments[C]))return!1;e=Math.min(e,1),r=Math.min(r,1),e=Math.max(e,0),r=Math.max(r,0);var k=x?new Float32Array(b):new Array(b),S=!1,T=function(t){return S||h(),e===n&&r===i?t:0===t?0:1===t?1:l(f(t),n,i)};T.getControlPoints=function(){return[{x:e,y:n},{x:r,y:i}]};var E="generateBezier("+[e,n,r,i]+")";return T.toString=function(){return E},T}function c(e,t){var n=e;return g.isString(e)?b.Easings[e]||(n=!1):n=g.isArray(e)&&1===e.length?a.apply(null,e):g.isArray(e)&&2===e.length?w.apply(null,e.concat([t])):g.isArray(e)&&4===e.length?l.apply(null,e):!1,n===!1&&(n=b.Easings[b.defaults.easing]?b.defaults.easing:y),n}function u(e){if(e){var t=(new Date).getTime(),n=b.State.calls.length;n>1e4&&(b.State.calls=i(b.State.calls));for(var o=0;n>o;o++)if(b.State.calls[o]){var a=b.State.calls[o],l=a[0],c=a[2],f=a[3],h=!!f,m=null;f||(f=b.State.calls[o][3]=t-16);for(var v=Math.min((t-f)/c.duration,1),y=0,w=l.length;w>y;y++){var C=l[y],S=C.element;if(s(S)){var T=!1;if(c.display!==r&&null!==c.display&&"none"!==c.display){if("flex"===c.display){var E=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];p.each(E,function(e,t){x.setPropertyValue(S,"display",t)})}x.setPropertyValue(S,"display",c.display)}c.visibility!==r&&"hidden"!==c.visibility&&x.setPropertyValue(S,"visibility",c.visibility);for(var O in C)if("element"!==O){var P,A=C[O],D=g.isString(A.easing)?b.Easings[A.easing]:A.easing;if(1===v)P=A.endValue;else{var N=A.endValue-A.startValue;if(P=A.startValue+N*D(v,c,N),!h&&P===A.currentValue)continue}if(A.currentValue=P,"tween"===O)m=P;else{if(x.Hooks.registered[O]){var j=x.Hooks.getRoot(O),I=s(S).rootPropertyValueCache[j];I&&(A.rootPropertyValue=I)}var L=x.setPropertyValue(S,O,A.currentValue+(0===parseFloat(P)?"":A.unitType),A.rootPropertyValue,A.scrollData);x.Hooks.registered[O]&&(s(S).rootPropertyValueCache[j]=x.Normalizations.registered[j]?x.Normalizations.registered[j]("extract",null,L[1]):L[1]),"transform"===L[0]&&(T=!0)}}c.mobileHA&&s(S).transformCache.translate3d===r&&(s(S).transformCache.translate3d="(0px, 0px, 0px)",T=!0),T&&x.flushTransformCache(S)}}c.display!==r&&"none"!==c.display&&(b.State.calls[o][2].display=!1),c.visibility!==r&&"hidden"!==c.visibility&&(b.State.calls[o][2].visibility=!1),c.progress&&c.progress.call(a[1],a[1],v,Math.max(0,f+c.duration-t),f,m),1===v&&d(o)}}b.State.isTicking&&k(u)}function d(e,t){if(!b.State.calls[e])return!1;for(var n=b.State.calls[e][0],i=b.State.calls[e][1],o=b.State.calls[e][2],a=b.State.calls[e][4],l=!1,c=0,u=n.length;u>c;c++){var d=n[c].element;if(t||o.loop||("none"===o.display&&x.setPropertyValue(d,"display",o.display),"hidden"===o.visibility&&x.setPropertyValue(d,"visibility",o.visibility)),o.loop!==!0&&(p.queue(d)[1]===r||!/\.velocityQueueEntryFlag/i.test(p.queue(d)[1]))&&s(d)){s(d).isAnimating=!1,s(d).rootPropertyValueCache={};var f=!1;p.each(x.Lists.transforms3D,function(e,t){var n=/^scale/.test(t)?1:0,i=s(d).transformCache[t];s(d).transformCache[t]!==r&&new RegExp("^\\("+n+"[^.]").test(i)&&(f=!0,delete s(d).transformCache[t])}),o.mobileHA&&(f=!0,delete s(d).transformCache.translate3d),f&&x.flushTransformCache(d),x.Values.removeClass(d,"velocity-animating")}if(!t&&o.complete&&!o.loop&&c===u-1)try{o.complete.call(i,i)}catch(h){setTimeout(function(){throw h},1)}a&&o.loop!==!0&&a(i),s(d)&&o.loop===!0&&!t&&(p.each(s(d).tweensContainer,function(e,t){/^rotate/.test(e)&&360===parseFloat(t.endValue)&&(t.endValue=0,t.startValue=360),/^backgroundPosition/.test(e)&&100===parseFloat(t.endValue)&&"%"===t.unitType&&(t.endValue=0,t.startValue=100)}),b(d,"reverse",{loop:!0,delay:o.delay})),o.queue!==!1&&p.dequeue(d,o.queue)}b.State.calls[e]=!1;for(var g=0,m=b.State.calls.length;m>g;g++)if(b.State.calls[g]!==!1){l=!0;break}l===!1&&(b.State.isTicking=!1,delete b.State.calls,b.State.calls=[])}var p,f=function(){if(n.documentMode)return n.documentMode;for(var e=7;e>4;e--){var t=n.createElement("div");if(t.innerHTML="<!--[if IE "+e+"]><span></span><![endif]-->",t.getElementsByTagName("span").length)return t=null,e}return r}(),h=function(){var e=0;return t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(t){var n,r=(new Date).getTime();return n=Math.max(0,16-(r-e)),e=r+n,setTimeout(function(){t(r+n)},n)}}(),g={isString:function(e){return"string"==typeof e},isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)},isNode:function(e){return e&&e.nodeType},isNodeList:function(e){return"object"==typeof e&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e))&&e.length!==r&&(0===e.length||"object"==typeof e[0]&&e[0].nodeType>0)},isWrapped:function(e){return e&&(e.jquery||t.Zepto&&t.Zepto.zepto.isZ(e))},isSVG:function(e){return t.SVGElement&&e instanceof t.SVGElement},isEmptyObject:function(e){for(var t in e)return!1;return!0}},m=!1;if(e.fn&&e.fn.jquery?(p=e,m=!0):p=t.Velocity.Utilities,8>=f&&!m)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=f)return void(jQuery.fn.velocity=jQuery.fn.animate);var v=400,y="swing",b={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:t.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:n.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:p,Redirects:{},Easings:{},Promise:t.Promise,defaults:{queue:"",duration:v,easing:y,begin:r,complete:r,progress:r,display:r,visibility:r,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(e){p.data(e,"velocity",{isSVG:g.isSVG(e),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};t.pageYOffset!==r?(b.State.scrollAnchor=t,b.State.scrollPropertyLeft="pageXOffset",b.State.scrollPropertyTop="pageYOffset"):(b.State.scrollAnchor=n.documentElement||n.body.parentNode||n.body,b.State.scrollPropertyLeft="scrollLeft",b.State.scrollPropertyTop="scrollTop");var w=function(){function e(e){return-e.tension*e.x-e.friction*e.v}function t(t,n,r){var i={x:t.x+r.dx*n,v:t.v+r.dv*n,tension:t.tension,friction:t.friction};return{dx:i.v,dv:e(i)}}function n(n,r){var i={dx:n.v,dv:e(n)},o=t(n,.5*r,i),s=t(n,.5*r,o),a=t(n,r,s),l=1/6*(i.dx+2*(o.dx+s.dx)+a.dx),c=1/6*(i.dv+2*(o.dv+s.dv)+a.dv);return n.x=n.x+l*r,n.v=n.v+c*r,n}return function r(e,t,i){var o,s,a,l={x:-1,v:0,tension:null,friction:null},c=[0],u=0,d=1e-4,p=.016;for(e=parseFloat(e)||500,t=parseFloat(t)||20,i=i||null,l.tension=e,l.friction=t,o=null!==i,o?(u=r(e,t),s=u/i*p):s=p;;)if(a=n(a||l,s),c.push(1+a.x),u+=16,!(Math.abs(a.x)>d&&Math.abs(a.v)>d))break;return o?function(e){return c[e*(c.length-1)|0]}:u}}();b.Easings={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},spring:function(e){return 1-Math.cos(4.5*e*Math.PI)*Math.exp(6*-e)}},p.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(e,t){b.Easings[t[0]]=l.apply(null,t[1])});var x=b.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var e=0;e<x.Lists.colors.length;e++){var t="color"===x.Lists.colors[e]?"0 0 0 1":"255 255 255 1";x.Hooks.templates[x.Lists.colors[e]]=["Red Green Blue Alpha",t]}var n,r,i;if(f)for(n in x.Hooks.templates){r=x.Hooks.templates[n],i=r[0].split(" ");var o=r[1].match(x.RegEx.valueSplit);"Color"===i[0]&&(i.push(i.shift()),o.push(o.shift()),x.Hooks.templates[n]=[i.join(" "),o.join(" ")])}for(n in x.Hooks.templates){r=x.Hooks.templates[n],i=r[0].split(" ");for(var e in i){var s=n+i[e],a=e;x.Hooks.registered[s]=[n,a]}}},getRoot:function(e){var t=x.Hooks.registered[e];return t?t[0]:e},cleanRootPropertyValue:function(e,t){return x.RegEx.valueUnwrap.test(t)&&(t=t.match(x.RegEx.valueUnwrap)[1]),x.Values.isCSSNullValue(t)&&(t=x.Hooks.templates[e][1]),t},extractValue:function(e,t){var n=x.Hooks.registered[e];if(n){var r=n[0],i=n[1];return t=x.Hooks.cleanRootPropertyValue(r,t),t.toString().match(x.RegEx.valueSplit)[i]}return t},injectValue:function(e,t,n){var r=x.Hooks.registered[e];if(r){var i,o,s=r[0],a=r[1];return n=x.Hooks.cleanRootPropertyValue(s,n),i=n.toString().match(x.RegEx.valueSplit),i[a]=t,o=i.join(" ")}return n}},Normalizations:{registered:{clip:function(e,t,n){switch(e){case"name":return"clip";case"extract":var r;return x.RegEx.wrappedValueAlreadyExtracted.test(n)?r=n:(r=n.toString().match(x.RegEx.valueUnwrap),r=r?r[1].replace(/,(\s+)?/g," "):n),r;case"inject":return"rect("+n+")"}},blur:function(e,t,n){switch(e){case"name":return b.State.isFirefox?"filter":"-webkit-filter";case"extract":var r=parseFloat(n);if(!r&&0!==r){var i=n.toString().match(/blur\(([0-9]+[A-z]+)\)/i);r=i?i[1]:0}return r;case"inject":return parseFloat(n)?"blur("+n+")":"none"}},opacity:function(e,t,n){if(8>=f)switch(e){case"name":return"filter";case"extract":var r=n.toString().match(/alpha\(opacity=(.*)\)/i);return n=r?r[1]/100:1;case"inject":return t.style.zoom=1,parseFloat(n)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(n),10)+")"}else switch(e){case"name":return"opacity";case"extract":return n;case"inject":return n}}},register:function(){9>=f||b.State.isGingerbread||(x.Lists.transformsBase=x.Lists.transformsBase.concat(x.Lists.transforms3D));for(var e=0;e<x.Lists.transformsBase.length;e++)!function(){var t=x.Lists.transformsBase[e];x.Normalizations.registered[t]=function(e,n,i){switch(e){case"name":return"transform";case"extract":return s(n)===r||s(n).transformCache[t]===r?/^scale/i.test(t)?1:0:s(n).transformCache[t].replace(/[()]/g,"");case"inject":var o=!1;switch(t.substr(0,t.length-1)){case"translate":o=!/(%|px|em|rem|vw|vh|\d)$/i.test(i);break;case"scal":case"scale":b.State.isAndroid&&s(n).transformCache[t]===r&&1>i&&(i=1),o=!/(\d)$/i.test(i);break;case"skew":o=!/(deg|\d)$/i.test(i);break;case"rotate":o=!/(deg|\d)$/i.test(i)}return o||(s(n).transformCache[t]="("+i+")"),s(n).transformCache[t]}}}();for(var e=0;e<x.Lists.colors.length;e++)!function(){var t=x.Lists.colors[e];x.Normalizations.registered[t]=function(e,n,i){switch(e){case"name":return t;case"extract":var o;if(x.RegEx.wrappedValueAlreadyExtracted.test(i))o=i;else{var s,a={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(i)?s=a[i]!==r?a[i]:a.black:x.RegEx.isHex.test(i)?s="rgb("+x.Values.hexToRgb(i).join(" ")+")":/^rgba?\(/i.test(i)||(s=a.black),o=(s||i).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=f||3!==o.split(" ").length||(o+=" 1"),o;case"inject":return 8>=f?4===i.split(" ").length&&(i=i.split(/\s+/).slice(0,3).join(" ")):3===i.split(" ").length&&(i+=" 1"),(8>=f?"rgb":"rgba")+"("+i.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})},SVGAttribute:function(e){var t="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(f||b.State.isAndroid&&!b.State.isChrome)&&(t+="|transform"),new RegExp("^("+t+")$","i").test(e)},prefixCheck:function(e){if(b.State.prefixMatches[e])return[b.State.prefixMatches[e],!0];for(var t=["","Webkit","Moz","ms","O"],n=0,r=t.length;r>n;n++){var i;if(i=0===n?e:t[n]+e.replace(/^\w/,function(e){return e.toUpperCase()}),g.isString(b.State.prefixElement.style[i]))return b.State.prefixMatches[e]=i,[i,!0]}return[e,!1]}},Values:{hexToRgb:function(e){var t,n=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return e=e.replace(n,function(e,t,n,r){return t+t+n+n+r+r}),t=r.exec(e),t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:[0,0,0]},isCSSNullValue:function(e){return 0==e||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)},getUnitType:function(e){return/^(rotate|skew)/i.test(e)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e)?"":"px"},getDisplayType:function(e){var t=e&&e.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t)?"inline":/^(li)$/i.test(t)?"list-item":/^(tr)$/i.test(t)?"table-row":/^(table)$/i.test(t)?"table":/^(tbody)$/i.test(t)?"table-row-group":"block"},addClass:function(e,t){e.classList?e.classList.add(t):e.className+=(e.className.length?" ":"")+t},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.toString().replace(new RegExp("(^|\\s)"+t.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(e,n,i,o){function a(e,n){function i(){c&&x.setPropertyValue(e,"display","none")}var l=0;if(8>=f)l=p.css(e,n);else{var c=!1;if(/^(width|height)$/.test(n)&&0===x.getPropertyValue(e,"display")&&(c=!0,x.setPropertyValue(e,"display",x.Values.getDisplayType(e))),!o){if("height"===n&&"border-box"!==x.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var u=e.offsetHeight-(parseFloat(x.getPropertyValue(e,"borderTopWidth"))||0)-(parseFloat(x.getPropertyValue(e,"borderBottomWidth"))||0)-(parseFloat(x.getPropertyValue(e,"paddingTop"))||0)-(parseFloat(x.getPropertyValue(e,"paddingBottom"))||0);return i(),u}if("width"===n&&"border-box"!==x.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var d=e.offsetWidth-(parseFloat(x.getPropertyValue(e,"borderLeftWidth"))||0)-(parseFloat(x.getPropertyValue(e,"borderRightWidth"))||0)-(parseFloat(x.getPropertyValue(e,"paddingLeft"))||0)-(parseFloat(x.getPropertyValue(e,"paddingRight"))||0);return i(),d}}var h;h=s(e)===r?t.getComputedStyle(e,null):s(e).computedStyle?s(e).computedStyle:s(e).computedStyle=t.getComputedStyle(e,null),"borderColor"===n&&(n="borderTopColor"),l=9===f&&"filter"===n?h.getPropertyValue(n):h[n],(""===l||null===l)&&(l=e.style[n]),i()}if("auto"===l&&/^(top|right|bottom|left)$/i.test(n)){var g=a(e,"position");("fixed"===g||"absolute"===g&&/top|left/i.test(n))&&(l=p(e).position()[n]+"px")}return l}var l;if(x.Hooks.registered[n]){var c=n,u=x.Hooks.getRoot(c);i===r&&(i=x.getPropertyValue(e,x.Names.prefixCheck(u)[0])),x.Normalizations.registered[u]&&(i=x.Normalizations.registered[u]("extract",e,i)),l=x.Hooks.extractValue(c,i)}else if(x.Normalizations.registered[n]){var d,h;d=x.Normalizations.registered[n]("name",e),"transform"!==d&&(h=a(e,x.Names.prefixCheck(d)[0]),x.Values.isCSSNullValue(h)&&x.Hooks.templates[n]&&(h=x.Hooks.templates[n][1])),l=x.Normalizations.registered[n]("extract",e,h)}if(!/^[\d-]/.test(l))if(s(e)&&s(e).isSVG&&x.Names.SVGAttribute(n))if(/^(height|width)$/i.test(n))try{l=e.getBBox()[n]}catch(g){l=0}else l=e.getAttribute(n);else l=a(e,x.Names.prefixCheck(n)[0]);return x.Values.isCSSNullValue(l)&&(l=0),b.debug>=2&&console.log("Get "+n+": "+l),l},setPropertyValue:function(e,n,r,i,o){var a=n;if("scroll"===n)o.container?o.container["scroll"+o.direction]=r:"Left"===o.direction?t.scrollTo(r,o.alternateValue):t.scrollTo(o.alternateValue,r);else if(x.Normalizations.registered[n]&&"transform"===x.Normalizations.registered[n]("name",e))x.Normalizations.registered[n]("inject",e,r),a="transform",r=s(e).transformCache[n];else{if(x.Hooks.registered[n]){var l=n,c=x.Hooks.getRoot(n);i=i||x.getPropertyValue(e,c),r=x.Hooks.injectValue(l,r,i),n=c}if(x.Normalizations.registered[n]&&(r=x.Normalizations.registered[n]("inject",e,r),n=x.Normalizations.registered[n]("name",e)),a=x.Names.prefixCheck(n)[0],8>=f)try{e.style[a]=r}catch(u){b.debug&&console.log("Browser does not support ["+r+"] for ["+a+"]")}else s(e)&&s(e).isSVG&&x.Names.SVGAttribute(n)?e.setAttribute(n,r):e.style[a]=r;b.debug>=2&&console.log("Set "+n+" ("+a+"): "+r)}return[a,r]},flushTransformCache:function(e){function t(t){return parseFloat(x.getPropertyValue(e,t))}var n="";if((f||b.State.isAndroid&&!b.State.isChrome)&&s(e).isSVG){var r={translate:[t("translateX"),t("translateY")],skewX:[t("skewX")],skewY:[t("skewY")],scale:1!==t("scale")?[t("scale"),t("scale")]:[t("scaleX"),t("scaleY")],rotate:[t("rotateZ"),0,0]};p.each(s(e).transformCache,function(e){/^translate/i.test(e)?e="translate":/^scale/i.test(e)?e="scale":/^rotate/i.test(e)&&(e="rotate"),r[e]&&(n+=e+"("+r[e].join(" ")+") ",delete r[e])})}else{var i,o;p.each(s(e).transformCache,function(t){return i=s(e).transformCache[t],"transformPerspective"===t?(o=i,!0):(9===f&&"rotateZ"===t&&(t="rotate"),void(n+=t+i+" "))}),o&&(n="perspective"+o+" "+n)}x.setPropertyValue(e,"transform",n)}};x.Hooks.register(),x.Normalizations.register(),b.hook=function(e,t,n){var i=r;return e=o(e),p.each(e,function(e,o){if(s(o)===r&&b.init(o),n===r)i===r&&(i=b.CSS.getPropertyValue(o,t));else{var a=b.CSS.setPropertyValue(o,t,n);"transform"===a[0]&&b.CSS.flushTransformCache(o),i=a}}),i};var C=function(){function e(){return a?O.promise||null:l}function i(){function e(e){function d(e,t){var n=r,i=r,s=r;return g.isArray(e)?(n=e[0],!g.isArray(e[1])&&/^[\d-]/.test(e[1])||g.isFunction(e[1])||x.RegEx.isHex.test(e[1])?s=e[1]:(g.isString(e[1])&&!x.RegEx.isHex.test(e[1])||g.isArray(e[1]))&&(i=t?e[1]:c(e[1],a.duration),e[2]!==r&&(s=e[2]))):n=e,t||(i=i||a.easing),g.isFunction(n)&&(n=n.call(o,S,k)),g.isFunction(s)&&(s=s.call(o,S,k)),[n||0,i,s]}function f(e,t){var n,r;return r=(t||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(e){return n=e,""}),n||(n=x.Values.getUnitType(e)),[r,n]}function v(){var e={myParent:o.parentNode||n.body,position:x.getPropertyValue(o,"position"),fontSize:x.getPropertyValue(o,"fontSize")},r=e.position===L.lastPosition&&e.myParent===L.lastParent,i=e.fontSize===L.lastFontSize;L.lastParent=e.myParent,L.lastPosition=e.position,L.lastFontSize=e.fontSize;var a=100,l={};if(i&&r)l.emToPx=L.lastEmToPx,l.percentToPxWidth=L.lastPercentToPxWidth,l.percentToPxHeight=L.lastPercentToPxHeight;else{var c=s(o).isSVG?n.createElementNS("http://www.w3.org/2000/svg","rect"):n.createElement("div");b.init(c),e.myParent.appendChild(c),p.each(["overflow","overflowX","overflowY"],function(e,t){b.CSS.setPropertyValue(c,t,"hidden")}),b.CSS.setPropertyValue(c,"position",e.position),b.CSS.setPropertyValue(c,"fontSize",e.fontSize),b.CSS.setPropertyValue(c,"boxSizing","content-box"),p.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(e,t){b.CSS.setPropertyValue(c,t,a+"%")}),b.CSS.setPropertyValue(c,"paddingLeft",a+"em"),l.percentToPxWidth=L.lastPercentToPxWidth=(parseFloat(x.getPropertyValue(c,"width",null,!0))||1)/a,l.percentToPxHeight=L.lastPercentToPxHeight=(parseFloat(x.getPropertyValue(c,"height",null,!0))||1)/a,l.emToPx=L.lastEmToPx=(parseFloat(x.getPropertyValue(c,"paddingLeft"))||1)/a,e.myParent.removeChild(c)}return null===L.remToPx&&(L.remToPx=parseFloat(x.getPropertyValue(n.body,"fontSize"))||16),null===L.vwToPx&&(L.vwToPx=parseFloat(t.innerWidth)/100,L.vhToPx=parseFloat(t.innerHeight)/100),l.remToPx=L.remToPx,l.vwToPx=L.vwToPx,l.vhToPx=L.vhToPx,b.debug>=1&&console.log("Unit ratios: "+JSON.stringify(l),o),l}if(a.begin&&0===S)try{a.begin.call(h,h)}catch(w){setTimeout(function(){throw w},1)}if("scroll"===P){var C,T,E,A=/^x$/i.test(a.axis)?"Left":"Top",D=parseFloat(a.offset)||0;a.container?g.isWrapped(a.container)||g.isNode(a.container)?(a.container=a.container[0]||a.container,C=a.container["scroll"+A],E=C+p(o).position()[A.toLowerCase()]+D):a.container=null:(C=b.State.scrollAnchor[b.State["scrollProperty"+A]],T=b.State.scrollAnchor[b.State["scrollProperty"+("Left"===A?"Top":"Left")]],E=p(o).offset()[A.toLowerCase()]+D),l={scroll:{rootPropertyValue:!1,startValue:C,currentValue:C,endValue:E,unitType:"",easing:a.easing,scrollData:{container:a.container,direction:A,alternateValue:T}},element:o},b.debug&&console.log("tweensContainer (scroll): ",l.scroll,o)}else if("reverse"===P){if(!s(o).tweensContainer)return void p.dequeue(o,a.queue);"none"===s(o).opts.display&&(s(o).opts.display="auto"),"hidden"===s(o).opts.visibility&&(s(o).opts.visibility="visible"),s(o).opts.loop=!1,s(o).opts.begin=null,s(o).opts.complete=null,y.easing||delete a.easing,y.duration||delete a.duration,a=p.extend({},s(o).opts,a);var N=p.extend(!0,{},s(o).tweensContainer);for(var j in N)if("element"!==j){var I=N[j].startValue;N[j].startValue=N[j].currentValue=N[j].endValue,N[j].endValue=I,g.isEmptyObject(y)||(N[j].easing=a.easing),b.debug&&console.log("reverse tweensContainer ("+j+"): "+JSON.stringify(N[j]),o)}l=N}else if("start"===P){var N;s(o).tweensContainer&&s(o).isAnimating===!0&&(N=s(o).tweensContainer),p.each(m,function(e,t){if(RegExp("^"+x.Lists.colors.join("$|^")+"$").test(e)){var n=d(t,!0),i=n[0],o=n[1],s=n[2];if(x.RegEx.isHex.test(i)){for(var a=["Red","Green","Blue"],l=x.Values.hexToRgb(i),c=s?x.Values.hexToRgb(s):r,u=0;u<a.length;u++){var p=[l[u]];o&&p.push(o),c!==r&&p.push(c[u]),m[e+a[u]]=p}delete m[e]}}});for(var F in m){var _=d(m[F]),H=_[0],z=_[1],q=_[2];F=x.Names.camelCase(F);var V=x.Hooks.getRoot(F),M=!1;if(s(o).isSVG||"tween"===V||x.Names.prefixCheck(V)[1]!==!1||x.Normalizations.registered[V]!==r){(a.display!==r&&null!==a.display&&"none"!==a.display||a.visibility!==r&&"hidden"!==a.visibility)&&/opacity|filter/.test(F)&&!q&&0!==H&&(q=0),a._cacheValues&&N&&N[F]?(q===r&&(q=N[F].endValue+N[F].unitType),M=s(o).rootPropertyValueCache[V]):x.Hooks.registered[F]?q===r?(M=x.getPropertyValue(o,V),q=x.getPropertyValue(o,F,M)):M=x.Hooks.templates[V][1]:q===r&&(q=x.getPropertyValue(o,F));var R,X,W,Y=!1;if(R=f(F,q),q=R[0],W=R[1],R=f(F,H),H=R[0].replace(/^([+-\/*])=/,function(e,t){return Y=t,""}),X=R[1],q=parseFloat(q)||0,H=parseFloat(H)||0,"%"===X&&(/^(fontSize|lineHeight)$/.test(F)?(H/=100,X="em"):/^scale/.test(F)?(H/=100,X=""):/(Red|Green|Blue)$/i.test(F)&&(H=H/100*255,X="")),/[\/*]/.test(Y))X=W;else if(W!==X&&0!==q)if(0===H)X=W;else{i=i||v();var B=/margin|padding|left|right|width|text|word|letter/i.test(F)||/X$/.test(F)||"x"===F?"x":"y";switch(W){case"%":q*="x"===B?i.percentToPxWidth:i.percentToPxHeight;break;case"px":break;default:q*=i[W+"ToPx"]}switch(X){case"%":q*=1/("x"===B?i.percentToPxWidth:i.percentToPxHeight);break;case"px":break;default:q*=1/i[X+"ToPx"]}}switch(Y){case"+":H=q+H;break;case"-":H=q-H;break;case"*":H=q*H;break;case"/":H=q/H}l[F]={rootPropertyValue:M,startValue:q,currentValue:q,endValue:H,unitType:X,easing:z},b.debug&&console.log("tweensContainer ("+F+"): "+JSON.stringify(l[F]),o)}else b.debug&&console.log("Skipping ["+V+"] due to a lack of browser support.")}l.element=o}l.element&&(x.Values.addClass(o,"velocity-animating"),$.push(l),""===a.queue&&(s(o).tweensContainer=l,s(o).opts=a),s(o).isAnimating=!0,S===k-1?(b.State.calls.push([$,h,a,null,O.resolver]),b.State.isTicking===!1&&(b.State.isTicking=!0,u())):S++)}var i,o=this,a=p.extend({},b.defaults,y),l={};switch(s(o)===r&&b.init(o),parseFloat(a.delay)&&a.queue!==!1&&p.queue(o,a.queue,function(e){b.velocityQueueEntryFlag=!0,s(o).delayTimer={setTimeout:setTimeout(e,parseFloat(a.delay)),next:e}}),a.duration.toString().toLowerCase()){case"fast":a.duration=200;break;case"normal":a.duration=v;break;case"slow":a.duration=600;break;default:a.duration=parseFloat(a.duration)||1}b.mock!==!1&&(b.mock===!0?a.duration=a.delay=1:(a.duration*=parseFloat(b.mock)||1,a.delay*=parseFloat(b.mock)||1)),a.easing=c(a.easing,a.duration),a.begin&&!g.isFunction(a.begin)&&(a.begin=null),a.progress&&!g.isFunction(a.progress)&&(a.progress=null),a.complete&&!g.isFunction(a.complete)&&(a.complete=null),a.display!==r&&null!==a.display&&(a.display=a.display.toString().toLowerCase(),"auto"===a.display&&(a.display=b.CSS.Values.getDisplayType(o))),a.visibility!==r&&null!==a.visibility&&(a.visibility=a.visibility.toString().toLowerCase()),a.mobileHA=a.mobileHA&&b.State.isMobile&&!b.State.isGingerbread,a.queue===!1?a.delay?setTimeout(e,a.delay):e():p.queue(o,a.queue,function(t,n){return n===!0?(O.promise&&O.resolver(h),!0):(b.velocityQueueEntryFlag=!0,void e(t))}),""!==a.queue&&"fx"!==a.queue||"inprogress"===p.queue(o)[0]||p.dequeue(o)}var a,l,f,h,m,y,w=arguments[0]&&(arguments[0].p||p.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||g.isString(arguments[0].properties));if(g.isWrapped(this)?(a=!1,f=0,h=this,l=this):(a=!0,f=1,h=w?arguments[0].elements||arguments[0].e:arguments[0]),h=o(h)){w?(m=arguments[0].properties||arguments[0].p,y=arguments[0].options||arguments[0].o):(m=arguments[f],y=arguments[f+1]);var k=h.length,S=0;if(!/^(stop|finish)$/i.test(m)&&!p.isPlainObject(y)){var T=f+1;y={};for(var E=T;E<arguments.length;E++)g.isArray(arguments[E])||!/^(fast|normal|slow)$/i.test(arguments[E])&&!/^\d/.test(arguments[E])?g.isString(arguments[E])||g.isArray(arguments[E])?y.easing=arguments[E]:g.isFunction(arguments[E])&&(y.complete=arguments[E]):y.duration=arguments[E]}var O={promise:null,resolver:null,rejecter:null};a&&b.Promise&&(O.promise=new b.Promise(function(e,t){O.resolver=e,O.rejecter=t}));var P;switch(m){case"scroll":P="scroll";break;case"reverse":P="reverse";break;case"finish":case"stop":p.each(h,function(e,t){s(t)&&s(t).delayTimer&&(clearTimeout(s(t).delayTimer.setTimeout),s(t).delayTimer.next&&s(t).delayTimer.next(),delete s(t).delayTimer)});var A=[];return p.each(b.State.calls,function(e,t){t&&p.each(t[1],function(n,i){var o=y===r?"":y;return o===!0||t[2].queue===o||y===r&&t[2].queue===!1?void p.each(h,function(n,r){r===i&&((y===!0||g.isString(y))&&(p.each(p.queue(r,g.isString(y)?y:""),function(e,t){g.isFunction(t)&&t(null,!0)}),p.queue(r,g.isString(y)?y:"",[])),"stop"===m?(s(r)&&s(r).tweensContainer&&o!==!1&&p.each(s(r).tweensContainer,function(e,t){t.endValue=t.currentValue}),A.push(e)):"finish"===m&&(t[2].duration=1))}):!0})}),"stop"===m&&(p.each(A,function(e,t){d(t,!0)}),O.promise&&O.resolver(h)),e();default:if(!p.isPlainObject(m)||g.isEmptyObject(m)){if(g.isString(m)&&b.Redirects[m]){var D=p.extend({},y),N=D.duration,j=D.delay||0;return D.backwards===!0&&(h=p.extend(!0,[],h).reverse()),p.each(h,function(e,t){parseFloat(D.stagger)?D.delay=j+parseFloat(D.stagger)*e:g.isFunction(D.stagger)&&(D.delay=j+D.stagger.call(t,e,k)),D.drag&&(D.duration=parseFloat(N)||(/^(callout|transition)/.test(m)?1e3:v),D.duration=Math.max(D.duration*(D.backwards?1-e/k:(e+1)/k),.75*D.duration,200)),b.Redirects[m].call(t,t,D||{},e,k,h,O.promise?O:r)}),e()}var I="Velocity: First argument ("+m+") was not a property map, a known action, or a registered redirect. Aborting.";return O.promise?O.rejecter(new Error(I)):console.log(I),e()}P="start"}var L={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},$=[];p.each(h,function(e,t){g.isNode(t)&&i.call(t)});var F,D=p.extend({},b.defaults,y);if(D.loop=parseInt(D.loop),F=2*D.loop-1,D.loop)for(var _=0;F>_;_++){var H={delay:D.delay,progress:D.progress};_===F-1&&(H.display=D.display,H.visibility=D.visibility,H.complete=D.complete),C(h,"reverse",H)}return e()}};b=p.extend(C,b),b.animate=C;

var k=t.requestAnimationFrame||h;return b.State.isMobile||n.hidden===r||n.addEventListener("visibilitychange",function(){n.hidden?(k=function(e){return setTimeout(function(){e(!0)},16)},u()):k=t.requestAnimationFrame||h}),e.Velocity=b,e!==t&&(e.fn.velocity=C,e.fn.velocity.defaults=b.defaults),p.each(["Down","Up"],function(e,t){b.Redirects["slide"+t]=function(e,n,i,o,s,a){var l=p.extend({},n),c=l.begin,u=l.complete,d={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},f={};l.display===r&&(l.display="Down"===t?"inline"===b.CSS.Values.getDisplayType(e)?"inline-block":"block":"none"),l.begin=function(){c&&c.call(s,s);for(var n in d){f[n]=e.style[n];var r=b.CSS.getPropertyValue(e,n);d[n]="Down"===t?[r,0]:[0,r]}f.overflow=e.style.overflow,e.style.overflow="hidden"},l.complete=function(){for(var t in f)e.style[t]=f[t];u&&u.call(s,s),a&&a.resolver(s)},b(e,d,l)}}),p.each(["In","Out"],function(e,t){b.Redirects["fade"+t]=function(e,n,i,o,s,a){var l=p.extend({},n),c={opacity:"In"===t?1:0},u=l.complete;l.complete=i!==o-1?l.begin=null:function(){u&&u.call(s,s),a&&a.resolver(s)},l.display===r&&(l.display="In"===t?"auto":"none"),b(this,c,l)}}),b}(window.jQuery||window.Zepto||window,window,document)}),function(e){"function"==typeof require&&"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(["velocity"],e):e()}(function(){return function(e,t,n,r){function i(e,t){var n=[];return e&&t?(s.each([e,t],function(e,t){var r=[];s.each(t,function(e,t){for(;t.toString().length<5;)t="0"+t;r.push(t)}),n.push(r.join(""))}),parseFloat(n[0])>parseFloat(n[1])):!1}if(!e.Velocity||!e.Velocity.Utilities)return void(t.console&&console.log("Velocity UI Pack: Velocity must be loaded first. Aborting."));var o=e.Velocity,s=o.Utilities,a=o.version,l={major:1,minor:1,patch:0};if(i(l,a)){var c="Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";throw alert(c),new Error(c)}o.RegisterEffect=o.RegisterUI=function(e,t){function n(e,t,n,r){var i,a=0;s.each(e.nodeType?[e]:e,function(e,t){r&&(n+=e*r),i=t.parentNode,s.each(["height","paddingTop","paddingBottom","marginTop","marginBottom"],function(e,n){a+=parseFloat(o.CSS.getPropertyValue(t,n))})}),o.animate(i,{height:("In"===t?"+":"-")+"="+a},{queue:!1,easing:"ease-in-out",duration:n*("In"===t?.6:1)})}return o.Redirects[e]=function(i,a,l,c,u,d){function p(){a.display!==r&&"none"!==a.display||!/Out$/.test(e)||s.each(u.nodeType?[u]:u,function(e,t){o.CSS.setPropertyValue(t,"display","none")}),a.complete&&a.complete.call(u,u),d&&d.resolver(u||i)}var f=l===c-1;t.defaultDuration="function"==typeof t.defaultDuration?t.defaultDuration.call(u,u):parseFloat(t.defaultDuration);for(var h=0;h<t.calls.length;h++){var g=t.calls[h],m=g[0],v=a.duration||t.defaultDuration||1e3,y=g[1],b=g[2]||{},w={};if(w.duration=v*(y||1),w.queue=a.queue||"",w.easing=b.easing||"ease",w.delay=parseFloat(b.delay)||0,w._cacheValues=b._cacheValues||!0,0===h){if(w.delay+=parseFloat(a.delay)||0,0===l&&(w.begin=function(){a.begin&&a.begin.call(u,u);var t=e.match(/(In|Out)$/);t&&"In"===t[0]&&m.opacity!==r&&s.each(u.nodeType?[u]:u,function(e,t){o.CSS.setPropertyValue(t,"opacity",0)}),a.animateParentHeight&&t&&n(u,t[0],v+w.delay,a.stagger)}),null!==a.display)if(a.display!==r&&"none"!==a.display)w.display=a.display;else if(/In$/.test(e)){var x=o.CSS.Values.getDisplayType(i);w.display="inline"===x?"inline-block":x}a.visibility&&"hidden"!==a.visibility&&(w.visibility=a.visibility)}h===t.calls.length-1&&(w.complete=function(){if(t.reset){for(var e in t.reset){var n=t.reset[e];o.CSS.Hooks.registered[e]!==r||"string"!=typeof n&&"number"!=typeof n||(t.reset[e]=[t.reset[e],t.reset[e]])}var s={duration:0,queue:!1};f&&(s.complete=p),o.animate(i,t.reset,s)}else f&&p()},"hidden"===a.visibility&&(w.visibility=a.visibility)),o.animate(i,m,w)}},o},o.RegisterEffect.packagedEffects={"callout.bounce":{defaultDuration:550,calls:[[{translateY:-30},.25],[{translateY:0},.125],[{translateY:-15},.125],[{translateY:0},.25]]},"callout.shake":{defaultDuration:800,calls:[[{translateX:-11},.125],[{translateX:11},.125],[{translateX:-11},.125],[{translateX:11},.125],[{translateX:-11},.125],[{translateX:11},.125],[{translateX:-11},.125],[{translateX:0},.125]]},"callout.flash":{defaultDuration:1100,calls:[[{opacity:[0,"easeInOutQuad",1]},.25],[{opacity:[1,"easeInOutQuad"]},.25],[{opacity:[0,"easeInOutQuad"]},.25],[{opacity:[1,"easeInOutQuad"]},.25]]},"callout.pulse":{defaultDuration:825,calls:[[{scaleX:1.1,scaleY:1.1},.5,{easing:"easeInExpo"}],[{scaleX:1,scaleY:1},.5]]},"callout.swing":{defaultDuration:950,calls:[[{rotateZ:15},.2],[{rotateZ:-10},.2],[{rotateZ:5},.2],[{rotateZ:-5},.2],[{rotateZ:0},.2]]},"callout.tada":{defaultDuration:1e3,calls:[[{scaleX:.9,scaleY:.9,rotateZ:-3},.1],[{scaleX:1.1,scaleY:1.1,rotateZ:3},.1],[{scaleX:1.1,scaleY:1.1,rotateZ:-3},.1],["reverse",.125],["reverse",.125],["reverse",.125],["reverse",.125],["reverse",.125],[{scaleX:1,scaleY:1,rotateZ:0},.2]]},"transition.fadeIn":{defaultDuration:500,calls:[[{opacity:[1,0]}]]},"transition.fadeOut":{defaultDuration:500,calls:[[{opacity:[0,1]}]]},"transition.flipXIn":{defaultDuration:700,calls:[[{opacity:[1,0],transformPerspective:[800,800],rotateY:[0,-55]}]],reset:{transformPerspective:0}},"transition.flipXOut":{defaultDuration:700,calls:[[{opacity:[0,1],transformPerspective:[800,800],rotateY:55}]],reset:{transformPerspective:0,rotateY:0}},"transition.flipYIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],rotateX:[0,-45]}]],reset:{transformPerspective:0}},"transition.flipYOut":{defaultDuration:800,calls:[[{opacity:[0,1],transformPerspective:[800,800],rotateX:25}]],reset:{transformPerspective:0,rotateX:0}},"transition.flipBounceXIn":{defaultDuration:900,calls:[[{opacity:[.725,0],transformPerspective:[400,400],rotateY:[-10,90]},.5],[{opacity:.8,rotateY:10},.25],[{opacity:1,rotateY:0},.25]],reset:{transformPerspective:0}},"transition.flipBounceXOut":{defaultDuration:800,calls:[[{opacity:[.9,1],transformPerspective:[400,400],rotateY:-10},.5],[{opacity:0,rotateY:90},.5]],reset:{transformPerspective:0,rotateY:0}},"transition.flipBounceYIn":{defaultDuration:850,calls:[[{opacity:[.725,0],transformPerspective:[400,400],rotateX:[-10,90]},.5],[{opacity:.8,rotateX:10},.25],[{opacity:1,rotateX:0},.25]],reset:{transformPerspective:0}},"transition.flipBounceYOut":{defaultDuration:800,calls:[[{opacity:[.9,1],transformPerspective:[400,400],rotateX:-15},.5],[{opacity:0,rotateX:90},.5]],reset:{transformPerspective:0,rotateX:0}},"transition.swoopIn":{defaultDuration:850,calls:[[{opacity:[1,0],transformOriginX:["100%","50%"],transformOriginY:["100%","100%"],scaleX:[1,0],scaleY:[1,0],translateX:[0,-700],translateZ:0}]],reset:{transformOriginX:"50%",transformOriginY:"50%"}},"transition.swoopOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformOriginX:["50%","100%"],transformOriginY:["100%","100%"],scaleX:0,scaleY:0,translateX:-700,translateZ:0}]],reset:{transformOriginX:"50%",transformOriginY:"50%",scaleX:1,scaleY:1,translateX:0}},"transition.whirlIn":{defaultDuration:850,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,0],scaleY:[1,0],rotateY:[0,160]},1,{easing:"easeInOutSine"}]]},"transition.whirlOut":{defaultDuration:750,calls:[[{opacity:[0,"easeInOutQuint",1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:0,scaleY:0,rotateY:160},1,{easing:"swing"}]],reset:{scaleX:1,scaleY:1,rotateY:0}},"transition.shrinkIn":{defaultDuration:750,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,1.5],scaleY:[1,1.5],translateZ:0}]]},"transition.shrinkOut":{defaultDuration:600,calls:[[{opacity:[0,1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:1.3,scaleY:1.3,translateZ:0}]],reset:{scaleX:1,scaleY:1}},"transition.expandIn":{defaultDuration:700,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,.625],scaleY:[1,.625],translateZ:0}]]},"transition.expandOut":{defaultDuration:700,calls:[[{opacity:[0,1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:.5,scaleY:.5,translateZ:0}]],reset:{scaleX:1,scaleY:1}},"transition.bounceIn":{defaultDuration:800,calls:[[{opacity:[1,0],scaleX:[1.05,.3],scaleY:[1.05,.3]},.4],[{scaleX:.9,scaleY:.9,translateZ:0},.2],[{scaleX:1,scaleY:1},.5]]},"transition.bounceOut":{defaultDuration:800,calls:[[{scaleX:.95,scaleY:.95},.35],[{scaleX:1.1,scaleY:1.1,translateZ:0},.35],[{opacity:[0,1],scaleX:.3,scaleY:.3},.3]],reset:{scaleX:1,scaleY:1}},"transition.bounceUpIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateY:[-30,1e3]},.6,{easing:"easeOutCirc"}],[{translateY:10},.2],[{translateY:0},.2]]},"transition.bounceUpOut":{defaultDuration:1e3,calls:[[{translateY:20},.2],[{opacity:[0,"easeInCirc",1],translateY:-1e3},.8]],reset:{translateY:0}},"transition.bounceDownIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateY:[30,-1e3]},.6,{easing:"easeOutCirc"}],[{translateY:-10},.2],[{translateY:0},.2]]},"transition.bounceDownOut":{defaultDuration:1e3,calls:[[{translateY:-20},.2],[{opacity:[0,"easeInCirc",1],translateY:1e3},.8]],reset:{translateY:0}},"transition.bounceLeftIn":{defaultDuration:750,calls:[[{opacity:[1,0],translateX:[30,-1250]},.6,{easing:"easeOutCirc"}],[{translateX:-10},.2],[{translateX:0},.2]]},"transition.bounceLeftOut":{defaultDuration:750,calls:[[{translateX:30},.2],[{opacity:[0,"easeInCirc",1],translateX:-1250},.8]],reset:{translateX:0}},"transition.bounceRightIn":{defaultDuration:750,calls:[[{opacity:[1,0],translateX:[-30,1250]},.6,{easing:"easeOutCirc"}],[{translateX:10},.2],[{translateX:0},.2]]},"transition.bounceRightOut":{defaultDuration:750,calls:[[{translateX:-30},.2],[{opacity:[0,"easeInCirc",1],translateX:1250},.8]],reset:{translateX:0}},"transition.slideUpIn":{defaultDuration:900,calls:[[{opacity:[1,0],translateY:[0,20],translateZ:0}]]},"transition.slideUpOut":{defaultDuration:900,calls:[[{opacity:[0,1],translateY:-20,translateZ:0}]],reset:{translateY:0}},"transition.slideDownIn":{defaultDuration:900,calls:[[{opacity:[1,0],translateY:[0,-20],translateZ:0}]]},"transition.slideDownOut":{defaultDuration:900,calls:[[{opacity:[0,1],translateY:20,translateZ:0}]],reset:{translateY:0}},"transition.slideLeftIn":{defaultDuration:1e3,calls:[[{opacity:[1,0],translateX:[0,-20],translateZ:0}]]},"transition.slideLeftOut":{defaultDuration:1050,calls:[[{opacity:[0,1],translateX:-20,translateZ:0}]],reset:{translateX:0}},"transition.slideRightIn":{defaultDuration:1e3,calls:[[{opacity:[1,0],translateX:[0,20],translateZ:0}]]},"transition.slideRightOut":{defaultDuration:1050,calls:[[{opacity:[0,1],translateX:20,translateZ:0}]],reset:{translateX:0}},"transition.slideUpBigIn":{defaultDuration:850,calls:[[{opacity:[1,0],translateY:[0,75],translateZ:0}]]},"transition.slideUpBigOut":{defaultDuration:800,calls:[[{opacity:[0,1],translateY:-75,translateZ:0}]],reset:{translateY:0}},"transition.slideDownBigIn":{defaultDuration:850,calls:[[{opacity:[1,0],translateY:[0,-75],translateZ:0}]]},"transition.slideDownBigOut":{defaultDuration:800,calls:[[{opacity:[0,1],translateY:75,translateZ:0}]],reset:{translateY:0}},"transition.slideLeftBigIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateX:[0,-75],translateZ:0}]]},"transition.slideLeftBigOut":{defaultDuration:750,calls:[[{opacity:[0,1],translateX:-75,translateZ:0}]],reset:{translateX:0}},"transition.slideRightBigIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateX:[0,75],translateZ:0}]]},"transition.slideRightBigOut":{defaultDuration:750,calls:[[{opacity:[0,1],translateX:75,translateZ:0}]],reset:{translateX:0}},"transition.perspectiveUpIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:["100%","100%"],rotateX:[0,-180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveUpOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:["100%","100%"],rotateX:-180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateX:0}},"transition.perspectiveDownIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:[0,0],rotateX:[0,180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveDownOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:[0,0],rotateX:180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateX:0}},"transition.perspectiveLeftIn":{defaultDuration:950,calls:[[{opacity:[1,0],transformPerspective:[2e3,2e3],transformOriginX:[0,0],transformOriginY:[0,0],rotateY:[0,-180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveLeftOut":{defaultDuration:950,calls:[[{opacity:[0,1],transformPerspective:[2e3,2e3],transformOriginX:[0,0],transformOriginY:[0,0],rotateY:-180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateY:0}},"transition.perspectiveRightIn":{defaultDuration:950,calls:[[{opacity:[1,0],transformPerspective:[2e3,2e3],transformOriginX:["100%","100%"],transformOriginY:[0,0],rotateY:[0,180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveRightOut":{defaultDuration:950,calls:[[{opacity:[0,1],transformPerspective:[2e3,2e3],transformOriginX:["100%","100%"],transformOriginY:[0,0],rotateY:180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateY:0}}};for(var u in o.RegisterEffect.packagedEffects)o.RegisterEffect(u,o.RegisterEffect.packagedEffects[u]);o.RunSequence=function(e){var t=s.extend(!0,[],e);t.length>1&&(s.each(t.reverse(),function(e,n){var r=t[e+1];if(r){var i=n.o||n.options,a=r.o||r.options,l=i&&i.sequenceQueue===!1?"begin":"complete",c=a&&a[l],u={};u[l]=function(){var e=r.e||r.elements,t=e.nodeType?[e]:e;c&&c.call(t,t),o(n)},r.o?r.o=s.extend({},a,u):r.options=s.extend({},a,u)}}),t.reverse()),o(t[0])}}(window.jQuery||window.Zepto||window,window,document)}),function(e,t){function n(e,t,n){var r=e.children(),i=!1;e.empty();for(var s=0,a=r.length;a>s;s++){var l=r.eq(s);if(e.append(l),n&&e.append(n),o(e,t)){l.remove(),i=!0;break}n&&n.detach()}return i}function r(t,n,s,a,l){var c=!1,u="a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style",d="script, .dotdotdot-keep";return t.contents().detach().each(function(){var p=this,f=e(p);if("undefined"==typeof p)return!0;if(f.is(d))t.append(f);else{if(c)return!0;t.append(f),!l||f.is(a.after)||f.find(a.after).length||t[t.is(u)?"after":"append"](l),o(s,a)&&(c=3==p.nodeType?i(f,n,s,a,l):r(f,n,s,a,l),c||(f.detach(),c=!0)),c||l&&l.detach()}}),n.addClass("is-truncated"),c}function i(t,n,r,i,a){var u=t[0];if(!u)return!1;var p=c(u),f=-1!==p.indexOf(" ")?" ":"　",h="letter"==i.wrap?"":f,g=p.split(h),m=-1,v=-1,y=0,b=g.length-1;for(i.fallbackToLetter&&0==y&&0==b&&(h="",g=p.split(h),b=g.length-1);b>=y&&(0!=y||0!=b);){var w=Math.floor((y+b)/2);if(w==v)break;v=w,l(u,g.slice(0,v+1).join(h)+i.ellipsis),o(r,i)?(b=v,i.fallbackToLetter&&0==y&&0==b&&(h="",g=g[0].split(h),m=-1,v=-1,y=0,b=g.length-1)):(m=v,y=v)}if(-1==m||1==g.length&&0==g[0].length){var x=t.parent();t.detach();var C=a&&a.closest(x).length?a.length:0;x.contents().length>C?u=d(x.contents().eq(-1-C),n):(u=d(x,n,!0),C||x.detach()),u&&(p=s(c(u),i),l(u,p),C&&a&&e(u).parent().append(a))}else p=s(g.slice(0,m+1).join(h),i),l(u,p);return!0}function o(e,t){return e.innerHeight()>t.maxHeight}function s(t,n){for(;e.inArray(t.slice(-1),n.lastCharacter.remove)>-1;)t=t.slice(0,-1);return e.inArray(t.slice(-1),n.lastCharacter.noEllipsis)<0&&(t+=n.ellipsis),t}function a(e){return{width:e.innerWidth(),height:e.innerHeight()}}function l(e,t){e.innerText?e.innerText=t:e.nodeValue?e.nodeValue=t:e.textContent&&(e.textContent=t)}function c(e){return e.innerText?e.innerText:e.nodeValue?e.nodeValue:e.textContent?e.textContent:""}function u(e){do e=e.previousSibling;while(e&&1!==e.nodeType&&3!==e.nodeType);return e}function d(t,n,r){var i,o=t&&t[0];if(o){if(!r){if(3===o.nodeType)return o;if(e.trim(t.text()))return d(t.contents().last(),n)}for(i=u(o);!i;){if(t=t.parent(),t.is(n)||!t.length)return!1;i=u(t[0])}if(i)return d(e(i),n)}return!1}function p(t,n){return t?"string"==typeof t?(t=e(t,n),t.length?t:!1):t.jquery?t:!1:!1}function f(e){for(var t=e.innerHeight(),n=["paddingTop","paddingBottom"],r=0,i=n.length;i>r;r++){var o=parseInt(e.css(n[r]),10);isNaN(o)&&(o=0),t-=o}return t}if(!e.fn.dotdotdot){e.fn.dotdotdot=function(t){if(0==this.length)return e.fn.dotdotdot.debug('No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){e(this).dotdotdot(t)});var i=this;i.data("dotdotdot")&&i.trigger("destroy.dot"),i.data("dotdotdot-style",i.attr("style")||""),i.css("word-wrap","break-word"),"nowrap"===i.css("white-space")&&i.css("white-space","normal"),i.bind_events=function(){return i.bind("update.dot",function(t,a){i.removeClass("is-truncated"),t.preventDefault(),t.stopPropagation(),l.maxHeight="number"==typeof l.height?l.height:f(i),l.maxHeight+=l.tolerance,"undefined"!=typeof a&&(("string"==typeof a||"nodeType"in a&&1===a.nodeType)&&(a=e("<div />").append(a).contents()),a instanceof e&&(s=a)),g=i.wrapInner('<div class="dotdotdot" />').children(),g.contents().detach().end().append(s.clone(!0)).find("br").replaceWith("  <br />  ").end().css({height:"auto",width:"auto",border:"none",padding:0,margin:0});var u=!1,d=!1;return c.afterElement&&(u=c.afterElement.clone(!0),u.show(),c.afterElement.detach()),o(g,l)&&(d="children"==l.wrap?n(g,l,u):r(g,i,g,l,u)),g.replaceWith(g.contents()),g=null,e.isFunction(l.callback)&&l.callback.call(i[0],d,s),c.isTruncated=d,d}).bind("isTruncated.dot",function(e,t){return e.preventDefault(),e.stopPropagation(),"function"==typeof t&&t.call(i[0],c.isTruncated),c.isTruncated}).bind("originalContent.dot",function(e,t){return e.preventDefault(),e.stopPropagation(),"function"==typeof t&&t.call(i[0],s),s}).bind("destroy.dot",function(e){e.preventDefault(),e.stopPropagation(),i.unwatch().unbind_events().contents().detach().end().append(s).attr("style",i.data("dotdotdot-style")||"").data("dotdotdot",!1)}),i},i.unbind_events=function(){return i.unbind(".dot"),i},i.watch=function(){if(i.unwatch(),"window"==l.watch){var t=e(window),n=t.width(),r=t.height();t.bind("resize.dot"+c.dotId,function(){n==t.width()&&r==t.height()&&l.windowResizeFix||(n=t.width(),r=t.height(),d&&clearInterval(d),d=setTimeout(function(){i.trigger("update.dot")},100))})}else u=a(i),d=setInterval(function(){if(i.is(":visible")){var e=a(i);(u.width!=e.width||u.height!=e.height)&&(i.trigger("update.dot"),u=e)}},500);return i},i.unwatch=function(){return e(window).unbind("resize.dot"+c.dotId),d&&clearInterval(d),i};var s=i.contents(),l=e.extend(!0,{},e.fn.dotdotdot.defaults,t),c={},u={},d=null,g=null;return l.lastCharacter.remove instanceof Array||(l.lastCharacter.remove=e.fn.dotdotdot.defaultArrays.lastCharacter.remove),l.lastCharacter.noEllipsis instanceof Array||(l.lastCharacter.noEllipsis=e.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis),c.afterElement=p(l.after,i),c.isTruncated=!1,c.dotId=h++,i.data("dotdotdot",!0).bind_events().trigger("update.dot"),l.watch&&i.watch(),i},e.fn.dotdotdot.defaults={ellipsis:"... ",wrap:"word",fallbackToLetter:!0,lastCharacter:{},tolerance:0,callback:null,after:null,height:null,watch:!1,windowResizeFix:!0},e.fn.dotdotdot.defaultArrays={lastCharacter:{remove:[" ","　",",",";",".","!","?"],noEllipsis:[]}},e.fn.dotdotdot.debug=function(e){};var h=1,g=e.fn.html;e.fn.html=function(n){return n!=t&&!e.isFunction(n)&&this.data("dotdotdot")?this.trigger("update",[n]):g.apply(this,arguments)};var m=e.fn.text;e.fn.text=function(n){return n!=t&&!e.isFunction(n)&&this.data("dotdotdot")?(n=e("<div />").text(n).html(),this.trigger("update",[n])):m.apply(this,arguments)}}}(jQuery),function(e){function t(e,t,i){var o=e[0],s=/er/.test(i)?_indeterminate:/bl/.test(i)?h:p,a=i==_update?{checked:o[p],disabled:o[h],indeterminate:"true"==e.attr(_indeterminate)||"false"==e.attr(_determinate)}:o[s];if(/^(ch|di|in)/.test(i)&&!a)n(e,s);else if(/^(un|en|de)/.test(i)&&a)r(e,s);else if(i==_update)for(var l in a)a[l]?n(e,l,!0):r(e,l,!0);else t&&"toggle"!=i||(t||e[_callback]("ifClicked"),a?o[_type]!==d&&r(e,s):n(e,s))}function n(t,n,i){var u=t[0],g=t.parent(),m=n==p,v=n==_indeterminate,y=n==h,b=v?_determinate:m?f:"enabled",w=o(t,b+s(u[_type])),x=o(t,n+s(u[_type]));if(u[n]!==!0){if(!i&&n==p&&u[_type]==d&&u.name){var C=t.closest("form"),k='input[name="'+u.name+'"]';k=C.length?C.find(k):e(k),k.each(function(){this!==u&&e(this).data(l)&&r(e(this),n)})}v?(u[n]=!0,u[p]&&r(t,p,"force")):(i||(u[n]=!0),m&&u[_indeterminate]&&r(t,_indeterminate,!1)),a(t,m,n,i)}u[h]&&o(t,_cursor,!0)&&g.find("."+c).css(_cursor,"default"),g[_add](x||o(t,n)||""),g.attr("role")&&!v&&g.attr("aria-"+(y?h:p),"true"),g[_remove](w||o(t,b)||"")}function r(e,t,n){var r=e[0],i=e.parent(),l=t==p,u=t==_indeterminate,d=t==h,g=u?_determinate:l?f:"enabled",m=o(e,g+s(r[_type])),v=o(e,t+s(r[_type]));r[t]!==!1&&((u||!n||"force"==n)&&(r[t]=!1),a(e,l,g,n)),!r[h]&&o(e,_cursor,!0)&&i.find("."+c).css(_cursor,"pointer"),i[_remove](v||o(e,t)||""),i.attr("role")&&!u&&i.attr("aria-"+(d?h:p),"false"),i[_add](m||o(e,g)||"")}function i(t,n){t.data(l)&&(t.parent().html(t.attr("style",t.data(l).s||"")),n&&t[_callback](n),t.off(".i").unwrap(),e(_label+'[for="'+t[0].id+'"]').add(t.closest(_label)).off(".i"))}function o(e,t,n){return e.data(l)?e.data(l).o[t+(n?"":"Class")]:void 0}function s(e){return e.charAt(0).toUpperCase()+e.slice(1)}function a(e,t,n,r){r||(t&&e[_callback]("ifToggled"),e[_callback]("ifChanged")[_callback]("if"+s(n)))}var l="iCheck",c=l+"-helper",u="checkbox",d="radio",p="checked",f="un"+p,h="disabled";_determinate="determinate",_indeterminate="in"+_determinate,_update="update",_type="type",_click="click",_touch="touchbegin.i touchend.i",_add="addClass",_remove="removeClass",_callback="trigger",_label="label",_cursor="cursor",_mobile=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent),e.fn[l]=function(o,s){var a='input[type="'+u+'"], input[type="'+d+'"]',f=e(),g=function(t){t.each(function(){var t=e(this);f=f.add(t.is(a)?t:t.find(a))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(o))return o=o.toLowerCase(),g(this),f.each(function(){var n=e(this);"destroy"==o?i(n,"ifDestroyed"):t(n,!0,o),e.isFunction(s)&&s()});if("object"!=typeof o&&o)return this;var m=e.extend({checkedClass:p,disabledClass:h,indeterminateClass:_indeterminate,labelHover:!0},o),v=m.handle,y=m.hoverClass||"hover",b=m.focusClass||"focus",w=m.activeClass||"active",x=!!m.labelHover,C=m.labelHoverClass||"hover",k=0|(""+m.increaseArea).replace("%","");return(v==u||v==d)&&(a='input[type="'+v+'"]'),-50>k&&(k=-50),g(this),f.each(function(){var o=e(this);i(o);var s,a=this,f=a.id,g=-k+"%",v=100+2*k+"%",S={position:"absolute",top:g,left:g,display:"block",width:v,height:v,margin:0,padding:0,background:"#fff",border:0,opacity:0},T=_mobile?{position:"absolute",visibility:"hidden"}:k?S:{position:"absolute",opacity:0},E=a[_type]==u?m.checkboxClass||"i"+u:m.radioClass||"i"+d,O=e(_label+'[for="'+f+'"]').add(o.closest(_label)),P=!!m.aria,A=l+"-"+Math.random().toString(36).substr(2,6),D='<div class="'+E+'" '+(P?'role="'+a[_type]+'" ':"");P&&O.each(function(){D+='aria-labelledby="',this.id?D+=this.id:(this.id=A,D+=A),D+='"'}),D=o.wrap(D+"/>")[_callback]("ifCreated").parent().append(m.insert),s=e('<ins class="'+c+'"/>').css(S).appendTo(D),o.data(l,{o:m,s:o.attr("style")}).css(T),!!m.inheritClass&&D[_add](a.className||""),!!m.inheritID&&f&&D.attr("id",l+"-"+f),"static"==D.css("position")&&D.css("position","relative"),t(o,!0,_update),O.length&&O.on(_click+".i mouseover.i mouseout.i "+_touch,function(n){var r=n[_type],i=e(this);if(!a[h]){if(r==_click){if(e(n.target).is("a"))return;t(o,!1,!0)}else x&&(/ut|nd/.test(r)?(D[_remove](y),i[_remove](C)):(D[_add](y),i[_add](C)));if(!_mobile)return!1;n.stopPropagation()}}),o.on(_click+".i focus.i blur.i keyup.i keydown.i keypress.i",function(e){var t=e[_type],i=e.keyCode;return t==_click?!1:"keydown"==t&&32==i?(a[_type]==d&&a[p]||(a[p]?r(o,p):n(o,p)),!1):void("keyup"==t&&a[_type]==d?!a[p]&&n(o,p):/us|ur/.test(t)&&D["blur"==t?_remove:_add](b))}),s.on(_click+" mousedown mouseup mouseover mouseout "+_touch,function(e){var n=e[_type],r=/wn|up/.test(n)?w:y;if(!a[h]){if(n==_click?t(o,!1,!0):(/wn|er|in/.test(n)?D[_add](r):D[_remove](r+" "+w),O.length&&x&&r==y&&O[/ut|nd/.test(n)?_remove:_add](C)),!_mobile)return!1;e.stopPropagation()}})})}}(window.jQuery||window.Zepto),function(e,t){"function"==typeof define&&define.amd?define("sifter",t):"object"==typeof exports?module.exports=t():e.Sifter=t()}(this,function(){var e=function(e,t){this.items=e,this.settings=t||{diacritics:!0}};e.prototype.tokenize=function(e){if(e=r(String(e||"").toLowerCase()),!e||!e.length)return[];var t,n,o,a,l=[],c=e.split(/ +/);for(t=0,n=c.length;n>t;t++){if(o=i(c[t]),this.settings.diacritics)for(a in s)s.hasOwnProperty(a)&&(o=o.replace(new RegExp(a,"g"),s[a]));l.push({string:c[t],regex:new RegExp(o,"i")})}return l},e.prototype.iterator=function(e,t){var n;n=o(e)?Array.prototype.forEach||function(e){for(var t=0,n=this.length;n>t;t++)e(this[t],t,this)}:function(e){for(var t in this)this.hasOwnProperty(t)&&e(this[t],t,this)},n.apply(e,[t])},e.prototype.getScoreFunction=function(e,t){var n,r,i,o;n=this,e=n.prepareSearch(e,t),i=e.tokens,r=e.options.fields,o=i.length;var s=function(e,t){var n,r;return e?(e=String(e||""),r=e.search(t.regex),-1===r?0:(n=t.string.length/e.length,0===r&&(n+=.5),n)):0},a=function(){var e=r.length;return e?1===e?function(e,t){return s(t[r[0]],e)}:function(t,n){for(var i=0,o=0;e>i;i++)o+=s(n[r[i]],t);return o/e}:function(){return 0}}();return o?1===o?function(e){return a(i[0],e)}:"and"===e.options.conjunction?function(e){for(var t,n=0,r=0;o>n;n++){if(t=a(i[n],e),0>=t)return 0;r+=t}return r/o}:function(e){for(var t=0,n=0;o>t;t++)n+=a(i[t],e);return n/o}:function(){return 0}},e.prototype.getSortFunction=function(e,n){var r,i,o,s,a,l,c,u,d,p,f;if(o=this,e=o.prepareSearch(e,n),f=!e.query&&n.sort_empty||n.sort,d=function(e,t){return"$score"===e?t.score:o.items[t.id][e]},a=[],f)for(r=0,i=f.length;i>r;r++)(e.query||"$score"!==f[r].field)&&a.push(f[r]);if(e.query){for(p=!0,r=0,i=a.length;i>r;r++)if("$score"===a[r].field){p=!1;break}p&&a.unshift({field:"$score",direction:"desc"})}else for(r=0,i=a.length;i>r;r++)if("$score"===a[r].field){a.splice(r,1);break}for(u=[],r=0,i=a.length;i>r;r++)u.push("desc"===a[r].direction?-1:1);return l=a.length,l?1===l?(s=a[0].field,c=u[0],function(e,n){return c*t(d(s,e),d(s,n))}):function(e,n){var r,i,o;for(r=0;l>r;r++)if(o=a[r].field,i=u[r]*t(d(o,e),d(o,n)))return i;return 0}:null},e.prototype.prepareSearch=function(e,t){if("object"==typeof e)return e;t=n({},t);var r=t.fields,i=t.sort,s=t.sort_empty;return r&&!o(r)&&(t.fields=[r]),i&&!o(i)&&(t.sort=[i]),s&&!o(s)&&(t.sort_empty=[s]),{options:t,query:String(e||"").toLowerCase(),tokens:this.tokenize(e),total:0,items:[]}},e.prototype.search=function(e,t){var n,r,i,o,s=this;return r=this.prepareSearch(e,t),t=r.options,e=r.query,o=t.score||s.getScoreFunction(r),e.length?s.iterator(s.items,function(e,i){n=o(e),(t.filter===!1||n>0)&&r.items.push({score:n,id:i})}):s.iterator(s.items,function(e,t){r.items.push({score:1,id:t})}),i=s.getSortFunction(r,t),i&&r.items.sort(i),r.total=r.items.length,"number"==typeof t.limit&&(r.items=r.items.slice(0,t.limit)),r};var t=function(e,t){return"number"==typeof e&&"number"==typeof t?e>t?1:t>e?-1:0:(e=a(String(e||"")),t=a(String(t||"")),e>t?1:t>e?-1:0)},n=function(e,t){var n,r,i,o;for(n=1,r=arguments.length;r>n;n++)if(o=arguments[n])for(i in o)o.hasOwnProperty(i)&&(e[i]=o[i]);return e},r=function(e){return(e+"").replace(/^\s+|\s+$|/g,"")},i=function(e){return(e+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")},o=Array.isArray||$&&$.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},s={a:"[aÀÁÂÃÄÅàáâãäåĀāąĄ]",c:"[cÇçćĆčČ]",d:"[dđĐďĎ]",e:"[eÈÉÊËèéêëěĚĒēęĘ]",i:"[iÌÍÎÏìíîïĪī]",l:"[lłŁ]",n:"[nÑñňŇńŃ]",o:"[oÒÓÔÕÕÖØòóôõöøŌō]",r:"[rřŘ]",s:"[sŠšśŚ]",t:"[tťŤ]",u:"[uÙÚÛÜùúûüůŮŪū]",y:"[yŸÿýÝ]",z:"[zŽžżŻźŹ]"},a=function(){var e,t,n,r,i="",o={};for(n in s)if(s.hasOwnProperty(n))for(r=s[n].substring(2,s[n].length-1),i+=r,e=0,t=r.length;t>e;e++)o[r.charAt(e)]=n;var a=new RegExp("["+i+"]","g");return function(e){return e.replace(a,function(e){return o[e]}).toLowerCase()}}();return e}),function(e,t){"function"==typeof define&&define.amd?define("microplugin",t):"object"==typeof exports?module.exports=t():e.MicroPlugin=t()}(this,function(){var e={};e.mixin=function(e){e.plugins={},e.prototype.initializePlugins=function(e){var n,r,i,o=this,s=[];if(o.plugins={names:[],settings:{},requested:{},loaded:{}},t.isArray(e))for(n=0,r=e.length;r>n;n++)"string"==typeof e[n]?s.push(e[n]):(o.plugins.settings[e[n].name]=e[n].options,s.push(e[n].name));else if(e)for(i in e)e.hasOwnProperty(i)&&(o.plugins.settings[i]=e[i],s.push(i));for(;s.length;)o.require(s.shift())},e.prototype.loadPlugin=function(t){var n=this,r=n.plugins,i=e.plugins[t];if(!e.plugins.hasOwnProperty(t))throw new Error('Unable to find "'+t+'" plugin');r.requested[t]=!0,r.loaded[t]=i.fn.apply(n,[n.plugins.settings[t]||{}]),r.names.push(t)},e.prototype.require=function(e){var t=this,n=t.plugins;if(!t.plugins.loaded.hasOwnProperty(e)){if(n.requested[e])throw new Error('Plugin has circular dependency ("'+e+'")');t.loadPlugin(e)}return n.loaded[e]},e.define=function(t,n){e.plugins[t]={name:t,fn:n}}};var t={isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}};return e}),function(e,t){"function"==typeof define&&define.amd?define("selectize",["jquery","sifter","microplugin"],t):"object"==typeof exports?module.exports=t(require("jquery"),require("sifter"),require("microplugin")):e.Selectize=t(e.jQuery,e.Sifter,e.MicroPlugin)}(this,function(e,t,n){"use strict";var r=function(e,t){if("string"!=typeof t||t.length){var n="string"==typeof t?new RegExp(t,"i"):t,r=function(e){var t=0;if(3===e.nodeType){var i=e.data.search(n);if(i>=0&&e.data.length>0){var o=e.data.match(n),s=document.createElement("span");s.className="highlight";var a=e.splitText(i),l=(a.splitText(o[0].length),a.cloneNode(!0));s.appendChild(l),a.parentNode.replaceChild(s,a),t=1}}else if(1===e.nodeType&&e.childNodes&&!/(script|style)/i.test(e.tagName))for(var c=0;c<e.childNodes.length;++c)c+=r(e.childNodes[c]);return t};return e.each(function(){r(this)})}},i=function(){};i.prototype={on:function(e,t){this._events=this._events||{},this._events[e]=this._events[e]||[],this._events[e].push(t)},off:function(e,t){var n=arguments.length;return 0===n?delete this._events:1===n?delete this._events[e]:(this._events=this._events||{},void(e in this._events!=!1&&this._events[e].splice(this._events[e].indexOf(t),1)))},trigger:function(e){if(this._events=this._events||{},e in this._events!=!1)for(var t=0;t<this._events[e].length;t++)this._events[e][t].apply(this,Array.prototype.slice.call(arguments,1))}},i.mixin=function(e){for(var t=["on","off","trigger"],n=0;n<t.length;n++)e.prototype[t[n]]=i.prototype[t[n]]};var o=/Mac/.test(navigator.userAgent),s=65,a=13,l=27,c=37,u=38,d=80,p=39,f=40,h=78,g=8,m=46,v=16,y=o?91:17,b=o?18:17,w=9,x=1,C=2,k=!/android/i.test(window.navigator.userAgent)&&!!document.createElement("form").validity,S=function(e){return"undefined"!=typeof e},T=function(e){return"undefined"==typeof e||null===e?null:"boolean"==typeof e?e?"1":"0":e+""},E=function(e){return(e+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

},O=function(e){return(e+"").replace(/\$/g,"$$$$")},P={};P.before=function(e,t,n){var r=e[t];e[t]=function(){return n.apply(e,arguments),r.apply(e,arguments)}},P.after=function(e,t,n){var r=e[t];e[t]=function(){var t=r.apply(e,arguments);return n.apply(e,arguments),t}};var A=function(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}},D=function(e,t){var n;return function(){var r=this,i=arguments;window.clearTimeout(n),n=window.setTimeout(function(){e.apply(r,i)},t)}},N=function(e,t,n){var r,i=e.trigger,o={};e.trigger=function(){var n=arguments[0];return-1===t.indexOf(n)?i.apply(e,arguments):void(o[n]=arguments)},n.apply(e,[]),e.trigger=i;for(r in o)o.hasOwnProperty(r)&&i.apply(e,o[r])},j=function(e,t,n,r){e.on(t,n,function(t){for(var n=t.target;n&&n.parentNode!==e[0];)n=n.parentNode;return t.currentTarget=n,r.apply(this,[t])})},I=function(e){var t={};if("selectionStart"in e)t.start=e.selectionStart,t.length=e.selectionEnd-t.start;else if(document.selection){e.focus();var n=document.selection.createRange(),r=document.selection.createRange().text.length;n.moveStart("character",-e.value.length),t.start=n.text.length-r,t.length=r}return t},L=function(e,t,n){var r,i,o={};if(n)for(r=0,i=n.length;i>r;r++)o[n[r]]=e.css(n[r]);else o=e.css();t.css(o)},$=function(t,n){if(!t)return 0;var r=e("<test>").css({position:"absolute",top:-99999,left:-99999,width:"auto",padding:0,whiteSpace:"pre"}).text(t).appendTo("body");L(n,r,["letterSpacing","fontSize","fontFamily","fontWeight","textTransform"]);var i=r.width();return r.remove(),i},F=function(e){var t=null,n=function(n,r){var i,o,s,a,l,c,u,d;n=n||window.event||{},r=r||{},n.metaKey||n.altKey||(r.force||e.data("grow")!==!1)&&(i=e.val(),n.type&&"keydown"===n.type.toLowerCase()&&(o=n.keyCode,s=o>=97&&122>=o||o>=65&&90>=o||o>=48&&57>=o||32===o,o===m||o===g?(d=I(e[0]),d.length?i=i.substring(0,d.start)+i.substring(d.start+d.length):o===g&&d.start?i=i.substring(0,d.start-1)+i.substring(d.start+1):o===m&&"undefined"!=typeof d.start&&(i=i.substring(0,d.start)+i.substring(d.start+1))):s&&(c=n.shiftKey,u=String.fromCharCode(n.keyCode),u=c?u.toUpperCase():u.toLowerCase(),i+=u)),a=e.attr("placeholder"),!i&&a&&(i=a),l=$(i,e)+4,l!==t&&(t=l,e.width(l),e.triggerHandler("resize")))};e.on("keydown keyup update blur",n),n()},_=function(n,r){var i,o,s,a,l=this;a=n[0],a.selectize=l;var c=window.getComputedStyle&&window.getComputedStyle(a,null);if(s=c?c.getPropertyValue("direction"):a.currentStyle&&a.currentStyle.direction,s=s||n.parents("[dir]:first").attr("dir")||"",e.extend(l,{order:0,settings:r,$input:n,tabIndex:n.attr("tabindex")||"",tagType:"select"===a.tagName.toLowerCase()?x:C,rtl:/rtl/i.test(s),eventNS:".selectize"+ ++_.count,highlightedValue:null,isOpen:!1,isDisabled:!1,isRequired:n.is("[required]"),isInvalid:!1,isLocked:!1,isFocused:!1,isInputHidden:!1,isSetup:!1,isShiftDown:!1,isCmdDown:!1,isCtrlDown:!1,ignoreFocus:!1,ignoreBlur:!1,ignoreHover:!1,hasOptions:!1,currentResults:null,lastValue:"",caretPos:0,loading:0,loadedSearches:{},$activeOption:null,$activeItems:[],optgroups:{},options:{},userOptions:{},items:[],renderCache:{},onSearchChange:null===r.loadThrottle?l.onSearchChange:D(l.onSearchChange,r.loadThrottle)}),l.sifter=new t(this.options,{diacritics:r.diacritics}),l.settings.options){for(i=0,o=l.settings.options.length;o>i;i++)l.registerOption(l.settings.options[i]);delete l.settings.options}if(l.settings.optgroups){for(i=0,o=l.settings.optgroups.length;o>i;i++)l.registerOptionGroup(l.settings.optgroups[i]);delete l.settings.optgroups}l.settings.mode=l.settings.mode||(1===l.settings.maxItems?"single":"multi"),"boolean"!=typeof l.settings.hideSelected&&(l.settings.hideSelected="multi"===l.settings.mode),l.initializePlugins(l.settings.plugins),l.setupCallbacks(),l.setupTemplates(),l.setup()};return i.mixin(_),n.mixin(_),e.extend(_.prototype,{setup:function(){var t,n,r,i,s,a,l,c,u,d=this,p=d.settings,f=d.eventNS,h=e(window),g=e(document),m=d.$input;if(l=d.settings.mode,c=m.attr("class")||"",t=e("<div>").addClass(p.wrapperClass).addClass(c).addClass(l),n=e("<div>").addClass(p.inputClass).addClass("items").appendTo(t),r=e('<input type="text" autocomplete="off" />').appendTo(n).attr("tabindex",m.is(":disabled")?"-1":d.tabIndex),a=e(p.dropdownParent||t),i=e("<div>").addClass(p.dropdownClass).addClass(l).hide().appendTo(a),s=e("<div>").addClass(p.dropdownContentClass).appendTo(i),d.settings.copyClassesToDropdown&&i.addClass(c),t.css({width:m[0].style.width}),d.plugins.names.length&&(u="plugin-"+d.plugins.names.join(" plugin-"),t.addClass(u),i.addClass(u)),(null===p.maxItems||p.maxItems>1)&&d.tagType===x&&m.attr("multiple","multiple"),d.settings.placeholder&&r.attr("placeholder",p.placeholder),!d.settings.splitOn&&d.settings.delimiter){var w=d.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&");d.settings.splitOn=new RegExp("\\s*"+w+"+\\s*")}m.attr("autocorrect")&&r.attr("autocorrect",m.attr("autocorrect")),m.attr("autocapitalize")&&r.attr("autocapitalize",m.attr("autocapitalize")),d.$wrapper=t,d.$control=n,d.$control_input=r,d.$dropdown=i,d.$dropdown_content=s,i.on("mouseenter","[data-selectable]",function(){return d.onOptionHover.apply(d,arguments)}),i.on("mousedown click","[data-selectable]",function(){return d.onOptionSelect.apply(d,arguments)}),j(n,"mousedown","*:not(input)",function(){return d.onItemSelect.apply(d,arguments)}),F(r),n.on({mousedown:function(){return d.onMouseDown.apply(d,arguments)},click:function(){return d.onClick.apply(d,arguments)}}),r.on({mousedown:function(e){e.stopPropagation()},keydown:function(){return d.onKeyDown.apply(d,arguments)},keyup:function(){return d.onKeyUp.apply(d,arguments)},keypress:function(){return d.onKeyPress.apply(d,arguments)},resize:function(){d.positionDropdown.apply(d,[])},blur:function(){return d.onBlur.apply(d,arguments)},focus:function(){return d.ignoreBlur=!1,d.onFocus.apply(d,arguments)},paste:function(){return d.onPaste.apply(d,arguments)}}),g.on("keydown"+f,function(e){d.isCmdDown=e[o?"metaKey":"ctrlKey"],d.isCtrlDown=e[o?"altKey":"ctrlKey"],d.isShiftDown=e.shiftKey}),g.on("keyup"+f,function(e){e.keyCode===b&&(d.isCtrlDown=!1),e.keyCode===v&&(d.isShiftDown=!1),e.keyCode===y&&(d.isCmdDown=!1)}),g.on("mousedown"+f,function(e){if(d.isFocused){if(e.target===d.$dropdown[0]||e.target.parentNode===d.$dropdown[0])return!1;d.$control.has(e.target).length||e.target===d.$control[0]||d.blur(e.target)}}),h.on(["scroll"+f,"resize"+f].join(" "),function(){d.isOpen&&d.positionDropdown.apply(d,arguments)}),h.on("mousemove"+f,function(){d.ignoreHover=!1}),this.revertSettings={$children:m.children().detach(),tabindex:m.attr("tabindex")},m.attr("tabindex",-1).hide().after(d.$wrapper),e.isArray(p.items)&&(d.setValue(p.items),delete p.items),k&&m.on("invalid"+f,function(e){e.preventDefault(),d.isInvalid=!0,d.refreshState()}),d.updateOriginalInput(),d.refreshItems(),d.refreshState(),d.updatePlaceholder(),d.isSetup=!0,m.is(":disabled")&&d.disable(),d.on("change",this.onChange),m.data("selectize",d),m.addClass("selectized"),d.trigger("initialize"),p.preload===!0&&d.onSearchChange("")},setupTemplates:function(){var t=this,n=t.settings.labelField,r=t.settings.optgroupLabelField,i={optgroup:function(e){return'<div class="optgroup">'+e.html+"</div>"},optgroup_header:function(e,t){return'<div class="optgroup-header">'+t(e[r])+"</div>"},option:function(e,t){return'<div class="option">'+t(e[n])+"</div>"},item:function(e,t){return'<div class="item">'+t(e[n])+"</div>"},option_create:function(e,t){return'<div class="create">Add <strong>'+t(e.input)+"</strong>&hellip;</div>"}};t.settings.render=e.extend({},i,t.settings.render)},setupCallbacks:function(){var e,t,n={initialize:"onInitialize",change:"onChange",item_add:"onItemAdd",item_remove:"onItemRemove",clear:"onClear",option_add:"onOptionAdd",option_remove:"onOptionRemove",option_clear:"onOptionClear",optgroup_add:"onOptionGroupAdd",optgroup_remove:"onOptionGroupRemove",optgroup_clear:"onOptionGroupClear",dropdown_open:"onDropdownOpen",dropdown_close:"onDropdownClose",type:"onType",load:"onLoad",focus:"onFocus",blur:"onBlur"};for(e in n)n.hasOwnProperty(e)&&(t=this.settings[n[e]],t&&this.on(e,t))},onClick:function(e){var t=this;t.isFocused||(t.focus(),e.preventDefault())},onMouseDown:function(t){{var n=this,r=t.isDefaultPrevented();e(t.target)}if(n.isFocused){if(t.target!==n.$control_input[0])return"single"===n.settings.mode?n.isOpen?n.close():n.open():r||n.setActiveItem(null),!1}else r||window.setTimeout(function(){n.focus()},0)},onChange:function(){this.$input.trigger("change")},onPaste:function(t){var n=this;n.isFull()||n.isInputHidden||n.isLocked?t.preventDefault():n.settings.splitOn&&setTimeout(function(){for(var t=e.trim(n.$control_input.val()||"").split(n.settings.splitOn),r=0,i=t.length;i>r;r++)n.createItem(t[r])},0)},onKeyPress:function(e){if(this.isLocked)return e&&e.preventDefault();var t=String.fromCharCode(e.keyCode||e.which);return this.settings.create&&"multi"===this.settings.mode&&t===this.settings.delimiter?(this.createItem(),e.preventDefault(),!1):void 0},onKeyDown:function(e){var t=(e.target===this.$control_input[0],this);if(t.isLocked)return void(e.keyCode!==w&&e.preventDefault());switch(e.keyCode){case s:if(t.isCmdDown)return void t.selectAll();break;case l:return void(t.isOpen&&(e.preventDefault(),e.stopPropagation(),t.close()));case h:if(!e.ctrlKey||e.altKey)break;case f:if(!t.isOpen&&t.hasOptions)t.open();else if(t.$activeOption){t.ignoreHover=!0;var n=t.getAdjacentOption(t.$activeOption,1);n.length&&t.setActiveOption(n,!0,!0)}return void e.preventDefault();case d:if(!e.ctrlKey||e.altKey)break;case u:if(t.$activeOption){t.ignoreHover=!0;var r=t.getAdjacentOption(t.$activeOption,-1);r.length&&t.setActiveOption(r,!0,!0)}return void e.preventDefault();case a:return void(t.isOpen&&t.$activeOption&&(t.onOptionSelect({currentTarget:t.$activeOption}),e.preventDefault()));case c:return void t.advanceSelection(-1,e);case p:return void t.advanceSelection(1,e);case w:return t.settings.selectOnTab&&t.isOpen&&t.$activeOption&&(t.onOptionSelect({currentTarget:t.$activeOption}),t.isFull()||e.preventDefault()),void(t.settings.create&&t.createItem()&&e.preventDefault());case g:case m:return void t.deleteSelection(e)}return!t.isFull()&&!t.isInputHidden||(o?e.metaKey:e.ctrlKey)?void 0:void e.preventDefault()},onKeyUp:function(e){var t=this;if(t.isLocked)return e&&e.preventDefault();var n=t.$control_input.val()||"";t.lastValue!==n&&(t.lastValue=n,t.onSearchChange(n),t.refreshOptions(),t.trigger("type",n))},onSearchChange:function(e){var t=this,n=t.settings.load;n&&(t.loadedSearches.hasOwnProperty(e)||(t.loadedSearches[e]=!0,t.load(function(r){n.apply(t,[e,r])})))},onFocus:function(e){var t=this,n=t.isFocused;return t.isDisabled?(t.blur(),e&&e.preventDefault(),!1):void(t.ignoreFocus||(t.isFocused=!0,"focus"===t.settings.preload&&t.onSearchChange(""),n||t.trigger("focus"),t.$activeItems.length||(t.showInput(),t.setActiveItem(null),t.refreshOptions(!!t.settings.openOnFocus)),t.refreshState()))},onBlur:function(e,t){var n=this;if(n.isFocused&&(n.isFocused=!1,!n.ignoreFocus)){if(!n.ignoreBlur&&document.activeElement===n.$dropdown_content[0])return n.ignoreBlur=!0,void n.onFocus(e);var r=function(){n.close(),n.setTextboxValue(""),n.setActiveItem(null),n.setActiveOption(null),n.setCaret(n.items.length),n.refreshState(),(t||document.body).focus(),n.ignoreFocus=!1,n.trigger("blur")};n.ignoreFocus=!0,n.settings.create&&n.settings.createOnBlur?n.createItem(null,!1,r):r()}},onOptionHover:function(e){this.ignoreHover||this.setActiveOption(e.currentTarget,!1)},onOptionSelect:function(t){var n,r,i=this;t.preventDefault&&(t.preventDefault(),t.stopPropagation()),r=e(t.currentTarget),r.hasClass("create")?i.createItem(null,function(){i.settings.closeAfterSelect&&i.close()}):(n=r.attr("data-value"),"undefined"!=typeof n&&(i.lastQuery=null,i.setTextboxValue(""),i.addItem(n),i.settings.closeAfterSelect?i.close():!i.settings.hideSelected&&t.type&&/mouse/.test(t.type)&&i.setActiveOption(i.getOption(n))))},onItemSelect:function(e){var t=this;t.isLocked||"multi"===t.settings.mode&&(e.preventDefault(),t.setActiveItem(e.currentTarget,e))},load:function(e){var t=this,n=t.$wrapper.addClass(t.settings.loadingClass);t.loading++,e.apply(t,[function(e){t.loading=Math.max(t.loading-1,0),e&&e.length&&(t.addOption(e),t.refreshOptions(t.isFocused&&!t.isInputHidden)),t.loading||n.removeClass(t.settings.loadingClass),t.trigger("load",e)}])},setTextboxValue:function(e){var t=this.$control_input,n=t.val()!==e;n&&(t.val(e).triggerHandler("update"),this.lastValue=e)},getValue:function(){return this.tagType===x&&this.$input.attr("multiple")?this.items:this.items.join(this.settings.delimiter)},setValue:function(e,t){var n=t?[]:["change"];N(this,n,function(){this.clear(t),this.addItems(e,t)})},setActiveItem:function(t,n){var r,i,o,s,a,l,c,u,d=this;if("single"!==d.settings.mode){if(t=e(t),!t.length)return e(d.$activeItems).removeClass("active"),d.$activeItems=[],void(d.isFocused&&d.showInput());if(r=n&&n.type.toLowerCase(),"mousedown"===r&&d.isShiftDown&&d.$activeItems.length){for(u=d.$control.children(".active:last"),s=Array.prototype.indexOf.apply(d.$control[0].childNodes,[u[0]]),a=Array.prototype.indexOf.apply(d.$control[0].childNodes,[t[0]]),s>a&&(c=s,s=a,a=c),i=s;a>=i;i++)l=d.$control[0].childNodes[i],-1===d.$activeItems.indexOf(l)&&(e(l).addClass("active"),d.$activeItems.push(l));n.preventDefault()}else"mousedown"===r&&d.isCtrlDown||"keydown"===r&&this.isShiftDown?t.hasClass("active")?(o=d.$activeItems.indexOf(t[0]),d.$activeItems.splice(o,1),t.removeClass("active")):d.$activeItems.push(t.addClass("active")[0]):(e(d.$activeItems).removeClass("active"),d.$activeItems=[t.addClass("active")[0]]);d.hideInput(),this.isFocused||d.focus()}},setActiveOption:function(t,n,r){var i,o,s,a,l,c=this;c.$activeOption&&c.$activeOption.removeClass("active"),c.$activeOption=null,t=e(t),t.length&&(c.$activeOption=t.addClass("active"),(n||!S(n))&&(i=c.$dropdown_content.height(),o=c.$activeOption.outerHeight(!0),n=c.$dropdown_content.scrollTop()||0,s=c.$activeOption.offset().top-c.$dropdown_content.offset().top+n,a=s,l=s-i+o,s+o>i+n?c.$dropdown_content.stop().animate({scrollTop:l},r?c.settings.scrollDuration:0):n>s&&c.$dropdown_content.stop().animate({scrollTop:a},r?c.settings.scrollDuration:0)))},selectAll:function(){var e=this;"single"!==e.settings.mode&&(e.$activeItems=Array.prototype.slice.apply(e.$control.children(":not(input)").addClass("active")),e.$activeItems.length&&(e.hideInput(),e.close()),e.focus())},hideInput:function(){var e=this;e.setTextboxValue(""),e.$control_input.css({opacity:0,position:"absolute",left:e.rtl?1e4:-1e4}),e.isInputHidden=!0},showInput:function(){this.$control_input.css({opacity:1,position:"relative",left:0}),this.isInputHidden=!1},focus:function(){var e=this;e.isDisabled||(e.ignoreFocus=!0,e.$control_input[0].focus(),window.setTimeout(function(){e.ignoreFocus=!1,e.onFocus()},0))},blur:function(e){this.$control_input[0].blur(),this.onBlur(null,e)},getScoreFunction:function(e){return this.sifter.getScoreFunction(e,this.getSearchOptions())},getSearchOptions:function(){var e=this.settings,t=e.sortField;return"string"==typeof t&&(t=[{field:t}]),{fields:e.searchField,conjunction:e.searchConjunction,sort:t}},search:function(t){var n,r,i,o=this,s=o.settings,a=this.getSearchOptions();if(s.score&&(i=o.settings.score.apply(this,[t]),"function"!=typeof i))throw new Error('Selectize "score" setting must be a function that returns a function');if(t!==o.lastQuery?(o.lastQuery=t,r=o.sifter.search(t,e.extend(a,{score:i})),o.currentResults=r):r=e.extend(!0,{},o.currentResults),s.hideSelected)for(n=r.items.length-1;n>=0;n--)-1!==o.items.indexOf(T(r.items[n].id))&&r.items.splice(n,1);return r},refreshOptions:function(t){var n,i,o,s,a,l,c,u,d,p,f,h,g,m,v,y;"undefined"==typeof t&&(t=!0);var b=this,w=e.trim(b.$control_input.val()),x=b.search(w),C=b.$dropdown_content,k=b.$activeOption&&T(b.$activeOption.attr("data-value"));for(s=x.items.length,"number"==typeof b.settings.maxOptions&&(s=Math.min(s,b.settings.maxOptions)),a={},l=[],n=0;s>n;n++)for(c=b.options[x.items[n].id],u=b.render("option",c),d=c[b.settings.optgroupField]||"",p=e.isArray(d)?d:[d],i=0,o=p&&p.length;o>i;i++)d=p[i],b.optgroups.hasOwnProperty(d)||(d=""),a.hasOwnProperty(d)||(a[d]=[],l.push(d)),a[d].push(u);for(this.settings.lockOptgroupOrder&&l.sort(function(e,t){var n=b.optgroups[e].$order||0,r=b.optgroups[t].$order||0;return n-r}),f=[],n=0,s=l.length;s>n;n++)d=l[n],b.optgroups.hasOwnProperty(d)&&a[d].length?(h=b.render("optgroup_header",b.optgroups[d])||"",h+=a[d].join(""),f.push(b.render("optgroup",e.extend({},b.optgroups[d],{html:h})))):f.push(a[d].join(""));if(C.html(f.join("")),b.settings.highlight&&x.query.length&&x.tokens.length)for(n=0,s=x.tokens.length;s>n;n++)r(C,x.tokens[n].regex);if(!b.settings.hideSelected)for(n=0,s=b.items.length;s>n;n++)b.getOption(b.items[n]).addClass("selected");g=b.canCreate(w),g&&(C.prepend(b.render("option_create",{input:w})),y=e(C[0].childNodes[0])),b.hasOptions=x.items.length>0||g,b.hasOptions?(x.items.length>0?(v=k&&b.getOption(k),v&&v.length?m=v:"single"===b.settings.mode&&b.items.length&&(m=b.getOption(b.items[0])),m&&m.length||(m=y&&!b.settings.addPrecedence?b.getAdjacentOption(y,1):C.find("[data-selectable]:first"))):m=y,b.setActiveOption(m),t&&!b.isOpen&&b.open()):(b.setActiveOption(null),t&&b.isOpen&&b.close())},addOption:function(t){var n,r,i,o=this;if(e.isArray(t))for(n=0,r=t.length;r>n;n++)o.addOption(t[n]);else(i=o.registerOption(t))&&(o.userOptions[i]=!0,o.lastQuery=null,o.trigger("option_add",i,t))},registerOption:function(e){var t=T(e[this.settings.valueField]);return!t||this.options.hasOwnProperty(t)?!1:(e.$order=e.$order||++this.order,this.options[t]=e,t)},registerOptionGroup:function(e){var t=T(e[this.settings.optgroupValueField]);return t?(e.$order=e.$order||++this.order,this.optgroups[t]=e,t):!1},addOptionGroup:function(e,t){t[this.settings.optgroupValueField]=e,(e=this.registerOptionGroup(t))&&this.trigger("optgroup_add",e,t)},removeOptionGroup:function(e){this.optgroups.hasOwnProperty(e)&&(delete this.optgroups[e],this.renderCache={},this.trigger("optgroup_remove",e))},clearOptionGroups:function(){this.optgroups={},this.renderCache={},this.trigger("optgroup_clear")},updateOption:function(t,n){var r,i,o,s,a,l,c,u=this;if(t=T(t),o=T(n[u.settings.valueField]),null!==t&&u.options.hasOwnProperty(t)){if("string"!=typeof o)throw new Error("Value must be set in option data");c=u.options[t].$order,o!==t&&(delete u.options[t],s=u.items.indexOf(t),-1!==s&&u.items.splice(s,1,o)),n.$order=n.$order||c,u.options[o]=n,a=u.renderCache.item,l=u.renderCache.option,a&&(delete a[t],delete a[o]),l&&(delete l[t],delete l[o]),-1!==u.items.indexOf(o)&&(r=u.getItem(t),i=e(u.render("item",n)),r.hasClass("active")&&i.addClass("active"),r.replaceWith(i)),u.lastQuery=null,u.isOpen&&u.refreshOptions(!1)}},removeOption:function(e,t){var n=this;e=T(e);var r=n.renderCache.item,i=n.renderCache.option;r&&delete r[e],i&&delete i[e],delete n.userOptions[e],delete n.options[e],n.lastQuery=null,n.trigger("option_remove",e),n.removeItem(e,t)},clearOptions:function(){var e=this;e.loadedSearches={},e.userOptions={},e.renderCache={},e.options=e.sifter.items={},e.lastQuery=null,e.trigger("option_clear"),e.clear()},getOption:function(e){return this.getElementWithValue(e,this.$dropdown_content.find("[data-selectable]"))},getAdjacentOption:function(t,n){var r=this.$dropdown.find("[data-selectable]"),i=r.index(t)+n;return i>=0&&i<r.length?r.eq(i):e()},getElementWithValue:function(t,n){if(t=T(t),"undefined"!=typeof t&&null!==t)for(var r=0,i=n.length;i>r;r++)if(n[r].getAttribute("data-value")===t)return e(n[r]);return e()},getItem:function(e){return this.getElementWithValue(e,this.$control.children())},addItems:function(t,n){for(var r=e.isArray(t)?t:[t],i=0,o=r.length;o>i;i++)this.isPending=o-1>i,this.addItem(r[i],n)},addItem:function(t,n){var r=n?[]:["change"];N(this,r,function(){var r,i,o,s,a,l=this,c=l.settings.mode;return t=T(t),-1!==l.items.indexOf(t)?void("single"===c&&l.close()):void(l.options.hasOwnProperty(t)&&("single"===c&&l.clear(n),"multi"===c&&l.isFull()||(r=e(l.render("item",l.options[t])),a=l.isFull(),l.items.splice(l.caretPos,0,t),l.insertAtCaret(r),(!l.isPending||!a&&l.isFull())&&l.refreshState(),l.isSetup&&(o=l.$dropdown_content.find("[data-selectable]"),l.isPending||(i=l.getOption(t),s=l.getAdjacentOption(i,1).attr("data-value"),l.refreshOptions(l.isFocused&&"single"!==c),s&&l.setActiveOption(l.getOption(s))),!o.length||l.isFull()?l.close():l.positionDropdown(),l.updatePlaceholder(),l.trigger("item_add",t,r),l.updateOriginalInput({silent:n})))))})},removeItem:function(e,t){var n,r,i,o=this;n="object"==typeof e?e:o.getItem(e),e=T(n.attr("data-value")),r=o.items.indexOf(e),-1!==r&&(n.remove(),n.hasClass("active")&&(i=o.$activeItems.indexOf(n[0]),o.$activeItems.splice(i,1)),o.items.splice(r,1),o.lastQuery=null,!o.settings.persist&&o.userOptions.hasOwnProperty(e)&&o.removeOption(e,t),r<o.caretPos&&o.setCaret(o.caretPos-1),o.refreshState(),o.updatePlaceholder(),o.updateOriginalInput({silent:t}),o.positionDropdown(),o.trigger("item_remove",e,n))},createItem:function(t,n){var r=this,i=r.caretPos;t=t||e.trim(r.$control_input.val()||"");var o=arguments[arguments.length-1];if("function"!=typeof o&&(o=function(){}),"boolean"!=typeof n&&(n=!0),!r.canCreate(t))return o(),!1;r.lock();var s="function"==typeof r.settings.create?this.settings.create:function(e){var t={};return t[r.settings.labelField]=e,t[r.settings.valueField]=e,t},a=A(function(e){if(r.unlock(),!e||"object"!=typeof e)return o();var t=T(e[r.settings.valueField]);return"string"!=typeof t?o():(r.setTextboxValue(""),r.addOption(e),r.setCaret(i),r.addItem(t),r.refreshOptions(n&&"single"!==r.settings.mode),void o(e))}),l=s.apply(this,[t,a]);return"undefined"!=typeof l&&a(l),!0},refreshItems:function(){this.lastQuery=null,this.isSetup&&this.addItem(this.items),this.refreshState(),this.updateOriginalInput()},refreshState:function(){var e,t=this;t.isRequired&&(t.items.length&&(t.isInvalid=!1),t.$control_input.prop("required",e)),t.refreshClasses()},refreshClasses:function(){var t=this,n=t.isFull(),r=t.isLocked;t.$wrapper.toggleClass("rtl",t.rtl),t.$control.toggleClass("focus",t.isFocused).toggleClass("disabled",t.isDisabled).toggleClass("required",t.isRequired).toggleClass("invalid",t.isInvalid).toggleClass("locked",r).toggleClass("full",n).toggleClass("not-full",!n).toggleClass("input-active",t.isFocused&&!t.isInputHidden).toggleClass("dropdown-active",t.isOpen).toggleClass("has-options",!e.isEmptyObject(t.options)).toggleClass("has-items",t.items.length>0),t.$control_input.data("grow",!n&&!r)},isFull:function(){return null!==this.settings.maxItems&&this.items.length>=this.settings.maxItems},updateOriginalInput:function(e){var t,n,r,i,o=this;if(e=e||{},o.tagType===x){for(r=[],t=0,n=o.items.length;n>t;t++)i=o.options[o.items[t]][o.settings.labelField]||"",r.push('<option value="'+E(o.items[t])+'" selected="selected">'+E(i)+"</option>");r.length||this.$input.attr("multiple")||r.push('<option value="" selected="selected"></option>'),o.$input.html(r.join(""))}else o.$input.val(o.getValue()),o.$input.attr("value",o.$input.val());o.isSetup&&(e.silent||o.trigger("change",o.$input.val()))},updatePlaceholder:function(){if(this.settings.placeholder){var e=this.$control_input;this.items.length?e.removeAttr("placeholder"):e.attr("placeholder",this.settings.placeholder),e.triggerHandler("update",{force:!0})}},open:function(){var e=this;e.isLocked||e.isOpen||"multi"===e.settings.mode&&e.isFull()||(e.focus(),e.isOpen=!0,e.refreshState(),e.$dropdown.css({visibility:"hidden",display:"block"}),e.positionDropdown(),e.$dropdown.css({visibility:"visible"}),e.trigger("dropdown_open",e.$dropdown))},close:function(){var e=this,t=e.isOpen;"single"===e.settings.mode&&e.items.length&&e.hideInput(),e.isOpen=!1,e.$dropdown.hide(),e.setActiveOption(null),e.refreshState(),t&&e.trigger("dropdown_close",e.$dropdown)},positionDropdown:function(){var e=this.$control,t="body"===this.settings.dropdownParent?e.offset():e.position();t.top+=e.outerHeight(!0),this.$dropdown.css({width:e.outerWidth(),top:t.top,left:t.left})},clear:function(e){var t=this;t.items.length&&(t.$control.children(":not(input)").remove(),t.items=[],t.lastQuery=null,t.setCaret(0),t.setActiveItem(null),t.updatePlaceholder(),t.updateOriginalInput({silent:e}),t.refreshState(),t.showInput(),t.trigger("clear"))},insertAtCaret:function(t){var n=Math.min(this.caretPos,this.items.length);0===n?this.$control.prepend(t):e(this.$control[0].childNodes[n]).before(t),this.setCaret(n+1)},deleteSelection:function(t){var n,r,i,o,s,a,l,c,u,d=this;if(i=t&&t.keyCode===g?-1:1,o=I(d.$control_input[0]),d.$activeOption&&!d.settings.hideSelected&&(l=d.getAdjacentOption(d.$activeOption,-1).attr("data-value")),s=[],d.$activeItems.length){for(u=d.$control.children(".active:"+(i>0?"last":"first")),a=d.$control.children(":not(input)").index(u),i>0&&a++,n=0,r=d.$activeItems.length;r>n;n++)s.push(e(d.$activeItems[n]).attr("data-value"));t&&(t.preventDefault(),t.stopPropagation())}else(d.isFocused||"single"===d.settings.mode)&&d.items.length&&(0>i&&0===o.start&&0===o.length?s.push(d.items[d.caretPos-1]):i>0&&o.start===d.$control_input.val().length&&s.push(d.items[d.caretPos]));if(!s.length||"function"==typeof d.settings.onDelete&&d.settings.onDelete.apply(d,[s])===!1)return!1;for("undefined"!=typeof a&&d.setCaret(a);s.length;)d.removeItem(s.pop());return d.showInput(),d.positionDropdown(),d.refreshOptions(!0),l&&(c=d.getOption(l),c.length&&d.setActiveOption(c)),!0},advanceSelection:function(e,t){var n,r,i,o,s,a,l=this;0!==e&&(l.rtl&&(e*=-1),n=e>0?"last":"first",r=I(l.$control_input[0]),l.isFocused&&!l.isInputHidden?(o=l.$control_input.val().length,s=0>e?0===r.start&&0===r.length:r.start===o,s&&!o&&l.advanceCaret(e,t)):(a=l.$control.children(".active:"+n),a.length&&(i=l.$control.children(":not(input)").index(a),l.setActiveItem(null),l.setCaret(e>0?i+1:i))))},advanceCaret:function(e,t){var n,r,i=this;0!==e&&(n=e>0?"next":"prev",i.isShiftDown?(r=i.$control_input[n](),r.length&&(i.hideInput(),i.setActiveItem(r),t&&t.preventDefault())):i.setCaret(i.caretPos+e))},setCaret:function(t){var n=this;if(t="single"===n.settings.mode?n.items.length:Math.max(0,Math.min(n.items.length,t)),!n.isPending){var r,i,o,s;for(o=n.$control.children(":not(input)"),r=0,i=o.length;i>r;r++)s=e(o[r]).detach(),t>r?n.$control_input.before(s):n.$control.append(s)}n.caretPos=t},lock:function(){this.close(),this.isLocked=!0,this.refreshState()},unlock:function(){this.isLocked=!1,this.refreshState()},disable:function(){var e=this;e.$input.prop("disabled",!0),e.$control_input.prop("disabled",!0).prop("tabindex",-1),e.isDisabled=!0,e.lock()},enable:function(){var e=this;e.$input.prop("disabled",!1),e.$control_input.prop("disabled",!1).prop("tabindex",e.tabIndex),e.isDisabled=!1,e.unlock()},destroy:function(){var t=this,n=t.eventNS,r=t.revertSettings;t.trigger("destroy"),t.off(),t.$wrapper.remove(),t.$dropdown.remove(),t.$input.html("").append(r.$children).removeAttr("tabindex").removeClass("selectized").attr({tabindex:r.tabindex}).show(),t.$control_input.removeData("grow"),t.$input.removeData("selectize"),e(window).off(n),e(document).off(n),e(document.body).off(n),delete t.$input[0].selectize},render:function(e,t){var n,r,i="",o=!1,s=this,a=/^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;return("option"===e||"item"===e)&&(n=T(t[s.settings.valueField]),o=!!n),o&&(S(s.renderCache[e])||(s.renderCache[e]={}),s.renderCache[e].hasOwnProperty(n))?s.renderCache[e][n]:(i=s.settings.render[e].apply(this,[t,E]),("option"===e||"option_create"===e)&&(i=i.replace(a,"<$1 data-selectable")),"optgroup"===e&&(r=t[s.settings.optgroupValueField]||"",i=i.replace(a,'<$1 data-group="'+O(E(r))+'"')),("option"===e||"item"===e)&&(i=i.replace(a,'<$1 data-value="'+O(E(n||""))+'"')),o&&(s.renderCache[e][n]=i),i)},clearCache:function(e){var t=this;"undefined"==typeof e?t.renderCache={}:delete t.renderCache[e]},canCreate:function(e){var t=this;if(!t.settings.create)return!1;var n=t.settings.createFilter;return!(!e.length||"function"==typeof n&&!n.apply(t,[e])||"string"==typeof n&&!new RegExp(n).test(e)||n instanceof RegExp&&!n.test(e))}}),_.count=0,_.defaults={options:[],optgroups:[],plugins:[],delimiter:",",splitOn:null,persist:!0,diacritics:!0,create:!1,createOnBlur:!1,createFilter:null,highlight:!0,openOnFocus:!0,maxOptions:1e3,maxItems:null,hideSelected:null,addPrecedence:!1,selectOnTab:!1,preload:!1,allowEmptyOption:!1,closeAfterSelect:!1,scrollDuration:60,loadThrottle:300,loadingClass:"loading",dataAttr:"data-data",optgroupField:"optgroup",valueField:"value",labelField:"text",optgroupLabelField:"label",optgroupValueField:"value",lockOptgroupOrder:!1,sortField:"$order",searchField:["text"],searchConjunction:"and",mode:null,wrapperClass:"selectize-control",inputClass:"selectize-input",dropdownClass:"selectize-dropdown",dropdownContentClass:"selectize-dropdown-content",dropdownParent:null,copyClassesToDropdown:!0,render:{}},e.fn.selectize=function(t){var n=e.fn.selectize.defaults,r=e.extend({},n,t),i=r.dataAttr,o=r.labelField,s=r.valueField,a=r.optgroupField,l=r.optgroupLabelField,c=r.optgroupValueField,u=function(t,n){var a,l,c,u,d=t.attr(i);if(d)for(n.options=JSON.parse(d),a=0,l=n.options.length;l>a;a++)n.items.push(n.options[a][s]);else{var p=e.trim(t.val()||"");if(!r.allowEmptyOption&&!p.length)return;for(c=p.split(r.delimiter),a=0,l=c.length;l>a;a++)u={},u[o]=c[a],u[s]=c[a],n.options.push(u);n.items=c}},d=function(t,n){var u,d,p,f,h=n.options,g={},m=function(e){var t=i&&e.attr(i);return"string"==typeof t&&t.length?JSON.parse(t):null},v=function(t,i){t=e(t);var l=T(t.attr("value"));if(l||r.allowEmptyOption)if(g.hasOwnProperty(l)){if(i){var c=g[l][a];c?e.isArray(c)?c.push(i):g[l][a]=[c,i]:g[l][a]=i}}else{var u=m(t)||{};u[o]=u[o]||t.text(),u[s]=u[s]||l,u[a]=u[a]||i,g[l]=u,h.push(u),t.is(":selected")&&n.items.push(l)}},y=function(t){var r,i,o,s,a;for(t=e(t),o=t.attr("label"),o&&(s=m(t)||{},s[l]=o,s[c]=o,n.optgroups.push(s)),a=e("option",t),r=0,i=a.length;i>r;r++)v(a[r],o)};for(n.maxItems=t.attr("multiple")?null:1,f=t.children(),u=0,d=f.length;d>u;u++)p=f[u].tagName.toLowerCase(),"optgroup"===p?y(f[u]):"option"===p&&v(f[u])};return this.each(function(){if(!this.selectize){var i,o=e(this),s=this.tagName.toLowerCase(),a=o.attr("placeholder")||o.attr("data-placeholder");a||r.allowEmptyOption||(a=o.children('option[value=""]').text());var l={placeholder:a,options:[],optgroups:[],items:[]};"select"===s?d(o,l):u(o,l),i=new _(o,e.extend(!0,{},n,l,t))}})},e.fn.selectize.defaults=_.defaults,e.fn.selectize.support={validity:k},_.define("drag_drop",function(t){if(!e.fn.sortable)throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');if("multi"===this.settings.mode){var n=this;n.lock=function(){var e=n.lock;return function(){var t=n.$control.data("sortable");return t&&t.disable(),e.apply(n,arguments)}}(),n.unlock=function(){var e=n.unlock;return function(){var t=n.$control.data("sortable");return t&&t.enable(),e.apply(n,arguments)}}(),n.setup=function(){var t=n.setup;return function(){t.apply(this,arguments);var r=n.$control.sortable({items:"[data-value]",forcePlaceholderSize:!0,disabled:n.isLocked,start:function(e,t){t.placeholder.css("width",t.helper.css("width")),r.css({overflow:"visible"})},stop:function(){r.css({overflow:"hidden"});var t=n.$activeItems?n.$activeItems.slice():null,i=[];r.children("[data-value]").each(function(){i.push(e(this).attr("data-value"))}),n.setValue(i),n.setActiveItem(t)}})}}()}}),_.define("dropdown_header",function(t){var n=this;t=e.extend({title:"Untitled",headerClass:"selectize-dropdown-header",titleRowClass:"selectize-dropdown-header-title",labelClass:"selectize-dropdown-header-label",closeClass:"selectize-dropdown-header-close",html:function(e){return'<div class="'+e.headerClass+'"><div class="'+e.titleRowClass+'"><span class="'+e.labelClass+'">'+e.title+'</span><a href="javascript:void(0)" class="'+e.closeClass+'">&times;</a></div></div>';

}},t),n.setup=function(){var r=n.setup;return function(){r.apply(n,arguments),n.$dropdown_header=e(t.html(t)),n.$dropdown.prepend(n.$dropdown_header)}}()}),_.define("optgroup_columns",function(t){var n=this;t=e.extend({equalizeWidth:!0,equalizeHeight:!0},t),this.getAdjacentOption=function(t,n){var r=t.closest("[data-group]").find("[data-selectable]"),i=r.index(t)+n;return i>=0&&i<r.length?r.eq(i):e()},this.onKeyDown=function(){var e=n.onKeyDown;return function(t){var r,i,o,s;return!this.isOpen||t.keyCode!==c&&t.keyCode!==p?e.apply(this,arguments):(n.ignoreHover=!0,s=this.$activeOption.closest("[data-group]"),r=s.find("[data-selectable]").index(this.$activeOption),s=t.keyCode===c?s.prev("[data-group]"):s.next("[data-group]"),o=s.find("[data-selectable]"),i=o.eq(Math.min(o.length-1,r)),void(i.length&&this.setActiveOption(i)))}}();var r=function(){var e,t=r.width,n=document;return"undefined"==typeof t&&(e=n.createElement("div"),e.innerHTML='<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>',e=e.firstChild,n.body.appendChild(e),t=r.width=e.offsetWidth-e.clientWidth,n.body.removeChild(e)),t},i=function(){var i,o,s,a,l,c,u;if(u=e("[data-group]",n.$dropdown_content),o=u.length,o&&n.$dropdown_content.width()){if(t.equalizeHeight){for(s=0,i=0;o>i;i++)s=Math.max(s,u.eq(i).height());u.css({height:s})}t.equalizeWidth&&(c=n.$dropdown_content.innerWidth()-r(),a=Math.round(c/o),u.css({width:a}),o>1&&(l=c-a*(o-1),u.eq(o-1).css({width:l})))}};(t.equalizeHeight||t.equalizeWidth)&&(P.after(this,"positionDropdown",i),P.after(this,"refreshOptions",i))}),_.define("remove_button",function(t){if("single"!==this.settings.mode){t=e.extend({label:"&times;",title:"Remove",className:"remove",append:!0},t);var n=this,r='<a href="javascript:void(0)" class="'+t.className+'" tabindex="-1" title="'+E(t.title)+'">'+t.label+"</a>",i=function(e,t){var n=e.search(/(<\/[^>]+>\s*)$/);return e.substring(0,n)+t+e.substring(n)};this.setup=function(){var o=n.setup;return function(){if(t.append){var s=n.settings.render.item;n.settings.render.item=function(e){return i(s.apply(this,arguments),r)}}o.apply(this,arguments),this.$control.on("click","."+t.className,function(t){if(t.preventDefault(),!n.isLocked){var r=e(t.currentTarget).parent();n.setActiveItem(r),n.deleteSelection()&&n.setCaret(n.items.length)}})}}()}}),_.define("restore_on_backspace",function(e){var t=this;e.text=e.text||function(e){return e[this.settings.labelField]},this.onKeyDown=function(){var n=t.onKeyDown;return function(t){var r,i;return t.keyCode===g&&""===this.$control_input.val()&&!this.$activeItems.length&&(r=this.caretPos-1,r>=0&&r<this.items.length)?(i=this.options[this.items[r]],this.deleteSelection(t)&&(this.setTextboxValue(e.text.apply(this,[i])),this.refreshOptions(!0)),void t.preventDefault()):n.apply(this,arguments)}}()}),_}),function(){function e(t){var n=e.modules[t];if(!n)throw new Error('failed to require "'+t+'"');return"exports"in n||"function"!=typeof n.definition||(n.client=n.component=!0,n.definition.call(this,n.exports={},n),delete n.definition),n.exports}e.loader="component",e.helper={},e.helper.semVerSort=function(e,t){for(var n=e.version.split("."),r=t.version.split("."),i=0;i<n.length;++i){var o=parseInt(n[i],10),s=parseInt(r[i],10);if(o!==s)return o>s?1:-1;var a=n[i].substr((""+o).length),l=r[i].substr((""+s).length);if(""===a&&""!==l)return 1;if(""!==a&&""===l)return-1;if(""!==a&&""!==l)return a>l?1:-1}return 0},e.latest=function(t,n){function r(e){throw new Error('failed to find latest module of "'+e+'"')}var i=/(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/,o=/(.*)~(.*)/;o.test(t)||r(t);for(var s=Object.keys(e.modules),a=[],l=[],c=0;c<s.length;c++){var u=s[c];if(new RegExp(t+"@").test(u)){var d=u.substr(t.length+1),p=i.exec(u);null!=p?a.push({version:d,name:u}):l.push({version:d,name:u})}}if(0===a.concat(l).length&&r(t),a.length>0){var f=a.sort(e.helper.semVerSort).pop().name;return n===!0?f:e(f)}var f=l.sort(function(e,t){return e.name>t.name})[0].name;return n===!0?f:e(f)},e.modules={},e.register=function(t,n){e.modules[t]={definition:n}},e.define=function(t,n){e.modules[t]={exports:n}},e.register("abpetkov~transitionize@0.0.3",function(e,t){function n(e,t){return this instanceof n?(this.element=e,this.props=t||{},void this.init()):new n(e,t)}t.exports=n,n.prototype.isSafari=function(){return/Safari/.test(navigator.userAgent)&&/Apple Computer/.test(navigator.vendor)},n.prototype.init=function(){var e=[];for(var t in this.props)e.push(t+" "+this.props[t]);this.element.style.transition=e.join(", "),this.isSafari()&&(this.element.style.webkitTransition=e.join(", "))}}),e.register("ftlabs~fastclick@v0.6.11",function(e,t){function n(e){"use strict";var t,r=this;if(this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=10,this.layer=e,!e||!e.nodeType)throw new TypeError("Layer must be a document node");this.onClick=function(){return n.prototype.onClick.apply(r,arguments)},this.onMouse=function(){return n.prototype.onMouse.apply(r,arguments)},this.onTouchStart=function(){return n.prototype.onTouchStart.apply(r,arguments)},this.onTouchMove=function(){return n.prototype.onTouchMove.apply(r,arguments)},this.onTouchEnd=function(){return n.prototype.onTouchEnd.apply(r,arguments)},this.onTouchCancel=function(){return n.prototype.onTouchCancel.apply(r,arguments)},n.notNeeded(e)||(this.deviceIsAndroid&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,r){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,r):i.call(e,t,n,r)},e.addEventListener=function(t,n,r){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),r):i.call(e,t,n,r)}),"function"==typeof e.onclick&&(t=e.onclick,e.addEventListener("click",function(e){t(e)},!1),e.onclick=null))}n.prototype.deviceIsAndroid=navigator.userAgent.indexOf("Android")>0,n.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent),n.prototype.deviceIsIOS4=n.prototype.deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),n.prototype.deviceIsIOSWithBadTarget=n.prototype.deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),n.prototype.needsClick=function(e){"use strict";switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(this.deviceIsIOS&&"file"===e.type||e.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(e.className)},n.prototype.needsFocus=function(e){"use strict";switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!this.deviceIsAndroid;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},n.prototype.sendClick=function(e,t){"use strict";var n,r;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),r=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,r.screenX,r.screenY,r.clientX,r.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},n.prototype.determineEventType=function(e){"use strict";return this.deviceIsAndroid&&"select"===e.tagName.toLowerCase()?"mousedown":"click"},n.prototype.focus=function(e){"use strict";var t;this.deviceIsIOS&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},n.prototype.updateScrollParent=function(e){"use strict";var t,n;if(t=e.fastClickScrollParent,!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)},n.prototype.getTargetElementFromEventTarget=function(e){"use strict";return e.nodeType===Node.TEXT_NODE?e.parentNode:e},n.prototype.onTouchStart=function(e){"use strict";var t,n,r;if(e.targetTouches.length>1)return!0;if(t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0],this.deviceIsIOS){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!this.deviceIsIOS4){if(n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<200&&e.preventDefault(),!0},n.prototype.touchHasMoved=function(e){"use strict";var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n?!0:!1},n.prototype.onTouchMove=function(e){"use strict";return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},n.prototype.findControl=function(e){"use strict";return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},n.prototype.onTouchEnd=function(e){"use strict";var t,n,r,i,o,s=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<200)return this.cancelNextClick=!0,!0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,n=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,this.deviceIsIOSWithBadTarget&&(o=e.changedTouches[0],s=document.elementFromPoint(o.pageX-window.pageXOffset,o.pageY-window.pageYOffset)||s,s.fastClickScrollParent=this.targetElement.fastClickScrollParent),r=s.tagName.toLowerCase(),"label"===r){if(t=this.findControl(s)){if(this.focus(s),this.deviceIsAndroid)return!1;s=t}}else if(this.needsFocus(s))return e.timeStamp-n>100||this.deviceIsIOS&&window.top!==window&&"input"===r?(this.targetElement=null,!1):(this.focus(s),this.deviceIsIOS4&&"select"===r||(this.targetElement=null,e.preventDefault()),!1);return this.deviceIsIOS&&!this.deviceIsIOS4&&(i=s.fastClickScrollParent,i&&i.fastClickLastScrollTop!==i.scrollTop)?!0:(this.needsClick(s)||(e.preventDefault(),this.sendClick(s,e)),!1)},n.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},n.prototype.onMouse=function(e){"use strict";return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0},n.prototype.onClick=function(e){"use strict";var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===e.target.type&&0===e.detail?!0:(t=this.onMouse(e),t||(this.targetElement=null),t)},n.prototype.destroy=function(){"use strict";var e=this.layer;this.deviceIsAndroid&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},n.notNeeded=function(e){"use strict";var t,r;if("undefined"==typeof window.ontouchstart)return!0;if(r=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n.prototype.deviceIsAndroid)return!0;if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(r>31&&window.innerWidth<=window.screen.width)return!0}}return"none"===e.style.msTouchAction?!0:!1},n.attach=function(e){"use strict";return new n(e)},"undefined"!=typeof define&&define.amd?define(function(){"use strict";return n}):"undefined"!=typeof t&&t.exports?(t.exports=n.attach,t.exports.FastClick=n):window.FastClick=n}),e.register("component~indexof@0.0.3",function(e,t){t.exports=function(e,t){if(e.indexOf)return e.indexOf(t);for(var n=0;n<e.length;++n)if(e[n]===t)return n;return-1}}),e.register("component~classes@1.2.1",function(t,n){function r(e){if(!e)throw new Error("A DOM element reference is required");this.el=e,this.list=e.classList}var i=e("component~indexof@0.0.3"),o=/\s+/,s=Object.prototype.toString;n.exports=function(e){return new r(e)},r.prototype.add=function(e){if(this.list)return this.list.add(e),this;var t=this.array(),n=i(t,e);return~n||t.push(e),this.el.className=t.join(" "),this},r.prototype.remove=function(e){if("[object RegExp]"==s.call(e))return this.removeMatching(e);if(this.list)return this.list.remove(e),this;var t=this.array(),n=i(t,e);return~n&&t.splice(n,1),this.el.className=t.join(" "),this},r.prototype.removeMatching=function(e){for(var t=this.array(),n=0;n<t.length;n++)e.test(t[n])&&this.remove(t[n]);return this},r.prototype.toggle=function(e,t){return this.list?("undefined"!=typeof t?t!==this.list.toggle(e,t)&&this.list.toggle(e):this.list.toggle(e),this):("undefined"!=typeof t?t?this.add(e):this.remove(e):this.has(e)?this.remove(e):this.add(e),this)},r.prototype.array=function(){var e=this.el.className.replace(/^\s+|\s+$/g,""),t=e.split(o);return""===t[0]&&t.shift(),t},r.prototype.has=r.prototype.contains=function(e){return this.list?this.list.contains(e):!!~i(this.array(),e)}}),e.register("component~event@0.1.4",function(e,t){var n=window.addEventListener?"addEventListener":"attachEvent",r=window.removeEventListener?"removeEventListener":"detachEvent",i="addEventListener"!==n?"on":"";e.bind=function(e,t,r,o){return e[n](i+t,r,o||!1),r},e.unbind=function(e,t,n,o){return e[r](i+t,n,o||!1),n}}),e.register("component~query@0.0.3",function(e,t){function n(e,t){return t.querySelector(e)}e=t.exports=function(e,t){return t=t||document,n(e,t)},e.all=function(e,t){return t=t||document,t.querySelectorAll(e)},e.engine=function(t){if(!t.one)throw new Error(".one callback required");if(!t.all)throw new Error(".all callback required");return n=t.one,e.all=t.all,e}}),e.register("component~matches-selector@0.1.5",function(t,n){function r(e,t){if(!e||1!==e.nodeType)return!1;if(s)return s.call(e,t);for(var n=i.all(t,e.parentNode),r=0;r<n.length;++r)if(n[r]==e)return!0;return!1}var i=e("component~query@0.0.3"),o=Element.prototype,s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.msMatchesSelector||o.oMatchesSelector;n.exports=r}),e.register("component~closest@0.1.4",function(t,n){var r=e("component~matches-selector@0.1.5");n.exports=function(e,t,n,i){for(e=n?{parentNode:e}:e,i=i||document;(e=e.parentNode)&&e!==document;){if(r(e,t))return e;if(e===i)return}}}),e.register("component~delegate@0.2.3",function(t,n){var r=e("component~closest@0.1.4"),i=e("component~event@0.1.4");t.bind=function(e,t,n,o,s){return i.bind(e,n,function(n){var i=n.target||n.srcElement;n.delegateTarget=r(i,t,!0,e),n.delegateTarget&&o.call(e,n)},s)},t.unbind=function(e,t,n,r){i.unbind(e,t,n,r)}}),e.register("component~events@1.0.9",function(t,n){function r(e,t){if(!(this instanceof r))return new r(e,t);if(!e)throw new Error("element required");if(!t)throw new Error("object required");this.el=e,this.obj=t,this._events={}}function i(e){var t=e.split(/ +/);return{name:t.shift(),selector:t.join(" ")}}var o=e("component~event@0.1.4"),s=e("component~delegate@0.2.3");n.exports=r,r.prototype.sub=function(e,t,n){this._events[e]=this._events[e]||{},this._events[e][t]=n},r.prototype.bind=function(e,t){function n(){var e=[].slice.call(arguments).concat(u);l[t].apply(l,e)}var r=i(e),a=this.el,l=this.obj,c=r.name,t=t||"on"+c,u=[].slice.call(arguments,2);return r.selector?n=s.bind(a,r.selector,c,n):o.bind(a,c,n),this.sub(c,t,n),n},r.prototype.unbind=function(e,t){if(0==arguments.length)return this.unbindAll();if(1==arguments.length)return this.unbindAllOf(e);var n=this._events[e];if(n){var r=n[t];r&&o.unbind(this.el,e,r)}},r.prototype.unbindAll=function(){for(var e in this._events)this.unbindAllOf(e)},r.prototype.unbindAllOf=function(e){var t=this._events[e];if(t)for(var n in t)this.unbind(e,n)}}),e.register("switchery",function(t,n){function r(e,t){if(!(this instanceof r))return new r(e,t);this.element=e,this.options=t||{};for(var n in l)null==this.options[n]&&(this.options[n]=l[n]);null!=this.element&&"checkbox"==this.element.type&&this.init(),this.isDisabled()===!0&&this.disable()}var i=e("abpetkov~transitionize@0.0.3"),o=e("ftlabs~fastclick@v0.6.11"),s=e("component~classes@1.2.1"),a=e("component~events@1.0.9");n.exports=r;var l={color:"#64bd63",secondaryColor:"#dfdfdf",jackColor:"#fff",jackSecondaryColor:null,className:"switchery",disabled:!1,disabledOpacity:.5,speed:"0.4s",size:"default"};r.prototype.hide=function(){this.element.style.display="none"},r.prototype.show=function(){var e=this.create();this.insertAfter(this.element,e)},r.prototype.create=function(){return this.switcher=document.createElement("span"),this.jack=document.createElement("small"),this.switcher.appendChild(this.jack),this.switcher.className=this.options.className,this.events=a(this.switcher,this),this.switcher},r.prototype.insertAfter=function(e,t){e.parentNode.insertBefore(t,e.nextSibling)},r.prototype.setPosition=function(e){var t=this.isChecked(),n=this.switcher,r=this.jack;e&&t?t=!1:e&&!t&&(t=!0),t===!0?(this.element.checked=!0,r.style.left=window.getComputedStyle?parseInt(window.getComputedStyle(n).width)-parseInt(window.getComputedStyle(r).width)+"px":parseInt(n.currentStyle.width)-parseInt(r.currentStyle.width)+"px",this.options.color&&this.colorize(),this.setSpeed()):(r.style.left=0,this.element.checked=!1,this.switcher.style.boxShadow="inset 0 0 0 0 "+this.options.secondaryColor,this.switcher.style.borderColor=this.options.secondaryColor,this.switcher.style.backgroundColor=this.options.secondaryColor!==l.secondaryColor?this.options.secondaryColor:"#fff",this.jack.style.backgroundColor=this.options.jackSecondaryColor!==this.options.jackColor?this.options.jackSecondaryColor:this.options.jackColor,this.setSpeed())},r.prototype.setSpeed=function(){var e={},t={"background-color":this.options.speed,left:this.options.speed.replace(/[a-z]/,"")/2+"s"};e=this.isChecked()?{border:this.options.speed,"box-shadow":this.options.speed,"background-color":3*this.options.speed.replace(/[a-z]/,"")+"s"}:{border:this.options.speed,"box-shadow":this.options.speed},i(this.switcher,e),i(this.jack,t)},r.prototype.setSize=function(){var e="switchery-small",t="switchery-default",n="switchery-large";switch(this.options.size){case"small":s(this.switcher).add(e);break;case"large":s(this.switcher).add(n);break;default:s(this.switcher).add(t)}},r.prototype.colorize=function(){var e=this.switcher.offsetHeight/2;this.switcher.style.backgroundColor=this.options.color,this.switcher.style.borderColor=this.options.color,this.switcher.style.boxShadow="inset 0 0 0 "+e+"px "+this.options.color,this.jack.style.backgroundColor=this.options.jackColor},r.prototype.handleOnchange=function(e){if(document.dispatchEvent){var t=document.createEvent("HTMLEvents");t.initEvent("change",!0,!0),this.element.dispatchEvent(t)}else this.element.fireEvent("onchange")},r.prototype.handleChange=function(){var e=this,t=this.element;t.addEventListener?t.addEventListener("change",function(){e.setPosition()}):t.attachEvent("onchange",function(){e.setPosition()})},r.prototype.handleClick=function(){var e=this.switcher;o(e),this.events.bind("click","bindClick")},r.prototype.bindClick=function(){var e=this.element.parentNode.tagName.toLowerCase(),t="label"===e?!1:!0;this.setPosition(t),this.handleOnchange(this.element.checked)},r.prototype.markAsSwitched=function(){this.element.setAttribute("data-switchery",!0)},r.prototype.markedAsSwitched=function(){return this.element.getAttribute("data-switchery")},r.prototype.init=function(){this.hide(),this.show(),this.setSize(),this.setPosition(),this.markAsSwitched(),this.handleChange(),this.handleClick()},r.prototype.isChecked=function(){return this.element.checked},r.prototype.isDisabled=function(){return this.options.disabled||this.element.disabled||this.element.readOnly},r.prototype.destroy=function(){this.events.unbind()},r.prototype.enable=function(){this.options.disabled&&(this.options.disabled=!1),this.element.disabled&&(this.element.disabled=!1),this.element.readOnly&&(this.element.readOnly=!1),this.switcher.style.opacity=1,this.events.bind("click","bindClick")},r.prototype.disable=function(){this.options.disabled||(this.options.disabled=!0),this.element.disabled||(this.element.disabled=!0),this.element.readOnly||(this.element.readOnly=!0),this.switcher.style.opacity=this.options.disabledOpacity,this.destroy()}}),"object"==typeof exports?module.exports=e("switchery"):"function"==typeof define&&define.amd?define("Switchery",[],function(){return e("switchery")}):(this||window).Switchery=e("switchery")}(),self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{};var Prism=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{encode:function(e){return e instanceof n?new n(e.type,t.util.encode(e.content),e.alias):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var r={};for(var i in e)e.hasOwnProperty(i)&&(r[i]=t.util.clone(e[i]));return r;case"Array":return e.map(function(e){return t.util.clone(e)})}return e}},languages:{extend:function(e,n){var r=t.util.clone(t.languages[e]);for(var i in n)r[i]=n[i];return r},insertBefore:function(e,n,r,i){i=i||t.languages;var o=i[e];if(2==arguments.length){r=arguments[1];for(var s in r)r.hasOwnProperty(s)&&(o[s]=r[s]);return o}var a={};for(var l in o)if(o.hasOwnProperty(l)){if(l==n)for(var s in r)r.hasOwnProperty(s)&&(a[s]=r[s]);a[l]=o[l]}return t.languages.DFS(t.languages,function(t,n){n===i[e]&&t!=e&&(this[t]=a)}),i[e]=a},DFS:function(e,n,r){for(var i in e)e.hasOwnProperty(i)&&(n.call(e,i,e[i],r||i),"Object"===t.util.type(e[i])?t.languages.DFS(e[i],n):"Array"===t.util.type(e[i])&&t.languages.DFS(e[i],n,i))}},highlightAll:function(e,n){for(var r,i=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),o=0;r=i[o++];)t.highlightElement(r,e===!0,n)},highlightElement:function(r,i,o){for(var s,a,l=r;l&&!e.test(l.className);)l=l.parentNode;if(l&&(s=(l.className.match(e)||[,""])[1],a=t.languages[s]),r.className=r.className.replace(e,"").replace(/\s+/g," ")+" language-"+s,l=r.parentNode,/pre/i.test(l.nodeName)&&(l.className=l.className.replace(e,"").replace(/\s+/g," ")+" language-"+s),a){var c=r.textContent;if(c){c=c.replace(/^(?:\r?\n|\r)/,"");var u={element:r,language:s,grammar:a,code:c};if(t.hooks.run("before-highlight",u),i&&self.Worker){var d=new Worker(t.filename);d.onmessage=function(e){u.highlightedCode=n.stringify(JSON.parse(e.data),s),t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,o&&o.call(u.element),t.hooks.run("after-highlight",u)},d.postMessage(JSON.stringify({language:u.language,code:u.code}))}else u.highlightedCode=t.highlight(u.code,u.grammar,u.language),t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,o&&o.call(r),t.hooks.run("after-highlight",u)}}},highlight:function(e,r,i){var o=t.tokenize(e,r);return n.stringify(t.util.encode(o),i)},tokenize:function(e,n,r){var i=t.Token,o=[e],s=n.rest;if(s){for(var a in s)n[a]=s[a];delete n.rest}e:for(var a in n)if(n.hasOwnProperty(a)&&n[a]){var l=n[a];l="Array"===t.util.type(l)?l:[l];for(var c=0;c<l.length;++c){var u=l[c],d=u.inside,p=!!u.lookbehind,f=0,h=u.alias;u=u.pattern||u;for(var g=0;g<o.length;g++){var m=o[g];if(o.length>e.length)break e;if(!(m instanceof i)){u.lastIndex=0;var v=u.exec(m);if(v){p&&(f=v[1].length);var y=v.index-1+f,v=v[0].slice(f),b=v.length,w=y+b,x=m.slice(0,y+1),C=m.slice(w+1),k=[g,1];x&&k.push(x);var S=new i(a,d?t.tokenize(v,d):v,h);k.push(S),C&&k.push(C),Array.prototype.splice.apply(o,k)}}}}}return o},hooks:{all:{},add:function(e,n){var r=t.hooks.all;r[e]=r[e]||[],r[e].push(n)},run:function(e,n){var r=t.hooks.all[e];if(r&&r.length)for(var i,o=0;i=r[o++];)i(n)}}},n=t.Token=function(e,t,n){this.type=e,this.content=t,this.alias=n};if(n.stringify=function(e,r,i){if("string"==typeof e)return e;if("Array"===t.util.type(e))return e.map(function(t){return n.stringify(t,r,e)}).join("");var o={type:e.type,content:n.stringify(e.content,r,i),tag:"span",classes:["token",e.type],attributes:{},language:r,parent:i};if("comment"==o.type&&(o.attributes.spellcheck="true"),e.alias){var s="Array"===t.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(o.classes,s)}t.hooks.run("wrap",o);var a="";for(var l in o.attributes)a+=l+'="'+(o.attributes[l]||"")+'"';return"<"+o.tag+' class="'+o.classes.join(" ")+'" '+a+">"+o.content+"</"+o.tag+">"},!self.document)return self.addEventListener?(self.addEventListener("message",function(e){var n=JSON.parse(e.data),r=n.language,i=n.code;self.postMessage(JSON.stringify(t.util.encode(t.tokenize(i,t.languages[r])))),self.close()},!1),self.Prism):self.Prism;var r=document.getElementsByTagName("script");return r=r[r.length-1],r&&(t.filename=r.src,document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),Prism.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?.+?\?>/,doctype:/<!DOCTYPE.+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/=|>|"/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),Prism.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{punctuation:/[;:]/}},url:/url\((?:(["'])(\\\n|\\?.)*?\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/,string:/("|')(\\\n|\\?.)*?\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,punctuation:/[\{\};:]/,"function":/[-a-z0-9]+(?=\()/i},Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/i,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/i,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css},alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag)),Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:/("|')(\\[\s\S]|(?!\1)[^\\\r\n])*\1/,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":{pattern:/[a-z0-9_]+\(/i,inside:{punctuation:/\(/}},number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,ignore:/&(lt|gt|amp);/i,punctuation:/[{}[\];(),.:]/},Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/(?!\d)[a-z0-9_$]+(?=\()/i}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0}}),Prism.languages.insertBefore("javascript","class-name",{"template-string":{pattern:/`(?:\\`|\\?[^`])*`/,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/i,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/i,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript},alias:"language-javascript"}}),function(){self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",html:"markup",svg:"markup",xml:"markup",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell"};Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){for(var n,r=t.getAttribute("data-src"),i=t,o=/\blang(?:uage)?-(?!\*)(\w+)\b/i;i&&!o.test(i.className);)i=i.parentNode;if(i&&(n=(t.className.match(o)||[,""])[1]),!n){var s=(r.match(/\.(\w+)$/)||[,""])[1];n=e[s]||s}var a=document.createElement("code");a.className="language-"+n,t.textContent="",a.textContent="Loading…",t.appendChild(a);var l=new XMLHttpRequest;l.open("GET",r,!0),l.onreadystatechange=function(){4==l.readyState&&(l.status<400&&l.responseText?(a.textContent=l.responseText,Prism.highlightElement(a)):a.textContent=l.status>=400?"✖ Error "+l.status+" while fetching file: "+l.statusText:"✖ Error: File does not exist or is empty")},l.send(null)})},self.Prism.fileHighlight())}(),Prism.languages.php=Prism.languages.extend("clike",{keyword:/\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,constant:/\b[A-Z0-9_]{2,}\b/,comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/).*?(\r?\n|$))/,lookbehind:!0}}),Prism.languages.insertBefore("php","class-name",{"shell-comment":{pattern:/(^|[^\\])#.*?(\r?\n|$)/,lookbehind:!0,alias:"comment"}}),Prism.languages.insertBefore("php","keyword",{delimiter:/(\?>|<\?php|<\?)/i,variable:/(\$\w+)\b/i,"package":{pattern:/(\\|namespace\s+|use\s+)[\w\\]+/,lookbehind:!0,inside:{punctuation:/\\/}}}),Prism.languages.insertBefore("php","operator",{property:{pattern:/(->)[\w]+/,lookbehind:!0}}),Prism.languages.markup&&(Prism.hooks.add("before-highlight",function(e){"php"===e.language&&(e.tokenStack=[],e.backupCode=e.code,e.code=e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi,function(t){return e.tokenStack.push(t),"{{{PHP"+e.tokenStack.length+"}}}"}))}),Prism.hooks.add("before-insert",function(e){"php"===e.language&&(e.code=e.backupCode,
delete e.backupCode)}),Prism.hooks.add("after-highlight",function(e){if("php"===e.language){for(var t,n=0;t=e.tokenStack[n];n++)e.highlightedCode=e.highlightedCode.replace("{{{PHP"+(n+1)+"}}}",Prism.highlight(t,e.grammar,"php"));e.element.innerHTML=e.highlightedCode}}),Prism.hooks.add("wrap",function(e){"php"===e.language&&"markup"===e.type&&(e.content=e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g,'<span class="token php">$1</span>'))}),Prism.languages.insertBefore("php","comment",{markup:{pattern:/<[^?]\/?(.*?)>/,inside:Prism.languages.markup},php:/\{\{\{PHP[0-9]+\}\}\}/})),Prism.hooks.add("after-highlight",function(e){var t=e.element.parentNode,n=/\s*\bline-numbers\b\s*/;if(t&&/pre/i.test(t.nodeName)&&(n.test(t.className)||n.test(e.element.className))){n.test(e.element.className)&&(e.element.className=e.element.className.replace(n,"")),n.test(t.className)||(t.className+=" line-numbers");var r,i=1+e.code.split("\n").length,o=new Array(i);o=o.join("<span></span>"),r=document.createElement("span"),r.className="line-numbers-rows",r.innerHTML=o,t.hasAttribute("data-start")&&(t.style.counterReset="linenumber "+(parseInt(t.getAttribute("data-start"),10)-1)),e.element.appendChild(r)}}),function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var n={exports:{}};t(n.exports,n),e.autosize=n.exports}}(this,function(e,t){"use strict";function n(e){function t(){var t=window.getComputedStyle(e,null);"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),u="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),i()}function n(t){var n=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=n,d=t,c&&(e.style.overflowY=t),r()}function r(){var t=window.pageYOffset,n=document.body.scrollTop,r=e.style.height;e.style.height="auto";var i=e.scrollHeight+u;return 0===e.scrollHeight?void(e.style.height=r):(e.style.height=i+"px",document.documentElement.scrollTop=t,void(document.body.scrollTop=n))}function i(){var t=e.style.height;r();var i=window.getComputedStyle(e,null);if(i.height!==e.style.height?"visible"!==d&&n("visible"):"hidden"!==d&&n("hidden"),t!==e.style.height){var o=document.createEvent("Event");o.initEvent("autosize:resized",!0,!1),e.dispatchEvent(o)}}var o=void 0===arguments[1]?{}:arguments[1],s=o.setOverflowX,a=void 0===s?!0:s,l=o.setOverflowY,c=void 0===l?!0:l;if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!e.hasAttribute("data-autosize-on")){var u=null,d="hidden",p=function(t){window.removeEventListener("resize",i),e.removeEventListener("input",i),e.removeEventListener("keyup",i),e.removeAttribute("data-autosize-on"),e.removeEventListener("autosize:destroy",p),Object.keys(t).forEach(function(n){e.style[n]=t[n]})}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",p),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",i),window.addEventListener("resize",i),e.addEventListener("input",i),e.addEventListener("autosize:update",i),e.setAttribute("data-autosize-on",!0),c&&(e.style.overflowY="hidden"),a&&(e.style.overflowX="hidden",e.style.wordWrap="break-word"),t()}}function r(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:destroy",!0,!1),e.dispatchEvent(t)}}function i(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:update",!0,!1),e.dispatchEvent(t)}}var o=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(o=function(e){return e},o.destroy=function(e){return e},o.update=function(e){return e}):(o=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return n(e,t)}),e},o.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],r),e},o.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],i),e}),t.exports=o});
//! moment.js
//! version : 2.10.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

import { hooks as moment, setHookCallback } from './lib/utils/hooks';

moment.version = '2.10.3';

import {
    min,
    max,
    isMoment,
    momentPrototype as fn,
    createUTC       as utc,
    createUnix      as unix,
    createLocal     as local,
    createInvalid   as invalid,
    createInZone    as parseZone
} from './lib/moment/moment';

import {
    defineLocale,
    getSetGlobalLocale as locale,
    getLocale          as localeData,
    listMonths         as months,
    listMonthsShort    as monthsShort,
    listWeekdays       as weekdays,
    listWeekdaysMin    as weekdaysMin,
    listWeekdaysShort  as weekdaysShort
} from './lib/locale/locale';

import {
    isDuration,
    createDuration as duration,
    getSetRelativeTimeThreshold as relativeTimeThreshold
} from './lib/duration/duration';

import { normalizeUnits } from './lib/units/units';

import isDate from './lib/utils/is-date';

setHookCallback(local);

moment.fn                    = fn;
moment.min                   = min;
moment.max                   = max;
moment.utc                   = utc;
moment.unix                  = unix;
moment.months                = months;
moment.isDate                = isDate;
moment.locale                = locale;
moment.invalid               = invalid;
moment.duration              = duration;
moment.isMoment              = isMoment;
moment.weekdays              = weekdays;
moment.parseZone             = parseZone;
moment.localeData            = localeData;
moment.isDuration            = isDuration;
moment.monthsShort           = monthsShort;
moment.weekdaysMin           = weekdaysMin;
moment.defineLocale          = defineLocale;
moment.weekdaysShort         = weekdaysShort;
moment.normalizeUnits        = normalizeUnits;
moment.relativeTimeThreshold = relativeTimeThreshold;

export default moment;
/*! UIkit 2.21.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */

(function(core) {

    if (typeof define == "function" && define.amd) { // AMD

        define("uikit", function(){

            var uikit = window.UIkit || core(window, window.jQuery, window.document);

            uikit.load = function(res, req, onload, config) {

                var resources = res.split(','), load = [], i, base = (config.config && config.config.uikit && config.config.uikit.base ? config.config.uikit.base : "").replace(/\/+$/g, "");

                if (!base) {
                    throw new Error( "Please define base path to UIkit in the requirejs config." );
                }

                for (i = 0; i < resources.length; i += 1) {
                    var resource = resources[i].replace(/\./g, '/');
                    load.push(base+'/components/'+resource);
                }

                req(load, function() {
                    onload(uikit);
                });
            };

            return uikit;
        });
    }

    if (!window.jQuery) {
        throw new Error( "UIkit requires jQuery" );
    }

    if (window && window.jQuery) {
        core(window, window.jQuery, window.document);
    }


})(function(global, $, doc) {

    "use strict";

    var UI = {}, _UI = global.UIkit ? Object.create(global.UIkit) : undefined;

    UI.version = '2.21.0';

    UI.noConflict = function() {
        // restore UIkit version
        if (_UI) {
            global.UIkit = _UI;
            $.UIkit      = _UI;
            $.fn.uk      = _UI.fn;
        }

        return UI;
    };

    UI.prefix = function(str) {
        return str;
    };

    // cache jQuery
    UI.$ = $;

    UI.$doc  = UI.$(document);
    UI.$win  = UI.$(window);
    UI.$html = UI.$('html');

    UI.support = {};
    UI.support.transition = (function() {

        var transitionEnd = (function() {

            var element = doc.body || doc.documentElement,
                transEndEventNames = {
                    WebkitTransition : 'webkitTransitionEnd',
                    MozTransition    : 'transitionend',
                    OTransition      : 'oTransitionEnd otransitionend',
                    transition       : 'transitionend'
                }, name;

            for (name in transEndEventNames) {
                if (element.style[name] !== undefined) return transEndEventNames[name];
            }
        }());

        return transitionEnd && { end: transitionEnd };
    })();

    UI.support.animation = (function() {

        var animationEnd = (function() {

            var element = doc.body || doc.documentElement,
                animEndEventNames = {
                    WebkitAnimation : 'webkitAnimationEnd',
                    MozAnimation    : 'animationend',
                    OAnimation      : 'oAnimationEnd oanimationend',
                    animation       : 'animationend'
                }, name;

            for (name in animEndEventNames) {
                if (element.style[name] !== undefined) return animEndEventNames[name];
            }
        }());

        return animationEnd && { end: animationEnd };
    })();

    // requestAnimationFrame polyfill
    // https://gist.github.com/paulirish/1579671
    (function(){

        var lastTime = 0;

        global.requestAnimationFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = global.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

        if (!global.cancelAnimationFrame) {

            global.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }

    })();

    UI.support.touch = (
        ('ontouchstart' in document) ||
        (global.DocumentTouch && document instanceof global.DocumentTouch)  ||
        (global.navigator.msPointerEnabled && global.navigator.msMaxTouchPoints > 0) || //IE 10
        (global.navigator.pointerEnabled && global.navigator.maxTouchPoints > 0) || //IE >=11
        false
    );

    UI.support.mutationobserver = (global.MutationObserver || global.WebKitMutationObserver || null);

    UI.Utils = {};

    UI.Utils.isFullscreen = function() {
        return document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.fullscreenElement || false;
    };

    UI.Utils.str2json = function(str, notevil) {
        try {
            if (notevil) {
                return JSON.parse(str
                    // wrap keys without quote with valid double quote
                    .replace(/([\$\w]+)\s*:/g, function(_, $1){return '"'+$1+'":';})
                    // replacing single quote wrapped ones to double quote
                    .replace(/'([^']+)'/g, function(_, $1){return '"'+$1+'"';})
                );
            } else {
                return (new Function("", "var json = " + str + "; return JSON.parse(JSON.stringify(json));"))();
            }
        } catch(e) { return false; }
    };

    UI.Utils.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    UI.Utils.removeCssRules = function(selectorRegEx) {
        var idx, idxs, stylesheet, _i, _j, _k, _len, _len1, _len2, _ref;

        if(!selectorRegEx) return;

        setTimeout(function(){
            try {
              _ref = document.styleSheets;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                stylesheet = _ref[_i];
                idxs = [];
                stylesheet.cssRules = stylesheet.cssRules;
                for (idx = _j = 0, _len1 = stylesheet.cssRules.length; _j < _len1; idx = ++_j) {
                  if (stylesheet.cssRules[idx].type === CSSRule.STYLE_RULE && selectorRegEx.test(stylesheet.cssRules[idx].selectorText)) {
                    idxs.unshift(idx);
                  }
                }
                for (_k = 0, _len2 = idxs.length; _k < _len2; _k++) {
                  stylesheet.deleteRule(idxs[_k]);
                }
              }
            } catch (_error) {}
        }, 0);
    };

    UI.Utils.isInView = function(element, options) {

        var $element = $(element);

        if (!$element.is(':visible')) {
            return false;
        }

        var window_left = UI.$win.scrollLeft(), window_top = UI.$win.scrollTop(), offset = $element.offset(), left = offset.left, top = offset.top;

        options = $.extend({topoffset:0, leftoffset:0}, options);

        if (top + $element.height() >= window_top && top - options.topoffset <= window_top + UI.$win.height() &&
            left + $element.width() >= window_left && left - options.leftoffset <= window_left + UI.$win.width()) {
          return true;
        } else {
          return false;
        }
    };

    UI.Utils.checkDisplay = function(context, initanimation) {

        var elements = UI.$('[data-uk-margin], [data-uk-grid-match], [data-uk-grid-margin], [data-uk-check-display]', context || document), animated;

        if (context && !elements.length) {
            elements = $(context);
        }

        elements.trigger('display.uk.check');

        // fix firefox / IE animations
        if (initanimation) {

            if (typeof(initanimation)!='string') {
                initanimation = '[class*="uk-animation-"]';
            }

            elements.find(initanimation).each(function(){

                var ele  = UI.$(this),
                    cls  = ele.attr('class'),
                    anim = cls.match(/uk\-animation\-(.+)/);

                ele.removeClass(anim[0]).width();

                ele.addClass(anim[0]);
            });
        }

        return elements;
    };

    UI.Utils.options = function(string) {

        if ($.isPlainObject(string)) return string;

        var start = (string ? string.indexOf("{") : -1), options = {};

        if (start != -1) {
            try {
                options = UI.Utils.str2json(string.substr(start));
            } catch (e) {}
        }

        return options;
    };

    UI.Utils.animate = function(element, cls) {

        var d = $.Deferred();

        element = UI.$(element);
        cls     = cls;

        element.css('display', 'none').addClass(cls).one(UI.support.animation.end, function() {
            element.removeClass(cls);
            d.resolve();
        }).width();

        element.css('display', '');

        return d.promise();
    };

    UI.Utils.uid = function(prefix) {
        return (prefix || 'id') + (new Date().getTime())+"RAND"+(Math.ceil(Math.random() * 100000));
    };

    UI.Utils.template = function(str, data) {

        var tokens = str.replace(/\n/g, '\\n').replace(/\{\{\{\s*(.+?)\s*\}\}\}/g, "{{!$1}}").split(/(\{\{\s*(.+?)\s*\}\})/g),
            i=0, toc, cmd, prop, val, fn, output = [], openblocks = 0;

        while(i < tokens.length) {

            toc = tokens[i];

            if(toc.match(/\{\{\s*(.+?)\s*\}\}/)) {
                i = i + 1;
                toc  = tokens[i];
                cmd  = toc[0];
                prop = toc.substring(toc.match(/^(\^|\#|\!|\~|\:)/) ? 1:0);

                switch(cmd) {
                    case '~':
                        output.push("for(var $i=0;$i<"+prop+".length;$i++) { var $item = "+prop+"[$i];");
                        openblocks++;
                        break;
                    case ':':
                        output.push("for(var $key in "+prop+") { var $val = "+prop+"[$key];");
                        openblocks++;
                        break;
                    case '#':
                        output.push("if("+prop+") {");
                        openblocks++;
                        break;
                    case '^':
                        output.push("if(!"+prop+") {");
                        openblocks++;
                        break;
                    case '/':
                        output.push("}");
                        openblocks--;
                        break;
                    case '!':
                        output.push("__ret.push("+prop+");");
                        break;
                    default:
                        output.push("__ret.push(escape("+prop+"));");
                        break;
                }
            } else {
                output.push("__ret.push('"+toc.replace(/\'/g, "\\'")+"');");
            }
            i = i + 1;
        }

        fn  = new Function('$data', [
            'var __ret = [];',
            'try {',
            'with($data){', (!openblocks ? output.join('') : '__ret = ["Not all blocks are closed correctly."]'), '};',
            '}catch(e){__ret = [e.message];}',
            'return __ret.join("").replace(/\\n\\n/g, "\\n");',
            "function escape(html) { return String(html).replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');}"
        ].join("\n"));

        return data ? fn(data) : fn;
    };

    UI.Utils.events       = {};
    UI.Utils.events.click = UI.support.touch ? 'tap' : 'click';

    global.UIkit = UI;

    // deprecated

    UI.fn = function(command, options) {

        var args = arguments, cmd = command.match(/^([a-z\-]+)(?:\.([a-z]+))?/i), component = cmd[1], method = cmd[2];

        if (!UI[component]) {
            $.error("UIkit component [" + component + "] does not exist.");
            return this;
        }

        return this.each(function() {
            var $this = $(this), data = $this.data(component);
            if (!data) $this.data(component, (data = UI[component](this, method ? undefined : options)));
            if (method) data[method].apply(data, Array.prototype.slice.call(args, 1));
        });
    };

    $.UIkit          = UI;
    $.fn.uk          = UI.fn;

    UI.langdirection = UI.$html.attr("dir") == "rtl" ? "right" : "left";

    UI.components    = {};

    UI.component = function(name, def) {

        var fn = function(element, options) {

            var $this = this;

            this.UIkit   = UI;
            this.element = element ? UI.$(element) : null;
            this.options = $.extend(true, {}, this.defaults, options);
            this.plugins = {};

            if (this.element) {
                this.element.data(name, this);
            }

            this.init();

            (this.options.plugins.length ? this.options.plugins : Object.keys(fn.plugins)).forEach(function(plugin) {

                if (fn.plugins[plugin].init) {
                    fn.plugins[plugin].init($this);
                    $this.plugins[plugin] = true;
                }

            });

            this.trigger('init.uk.component', [name, this]);

            return this;
        };

        fn.plugins = {};

        $.extend(true, fn.prototype, {

            defaults : {plugins: []},

            boot: function(){},
            init: function(){},

            on: function(a1,a2,a3){
                return UI.$(this.element || this).on(a1,a2,a3);
            },

            one: function(a1,a2,a3){
                return UI.$(this.element || this).one(a1,a2,a3);
            },

            off: function(evt){
                return UI.$(this.element || this).off(evt);
            },

            trigger: function(evt, params) {
                return UI.$(this.element || this).trigger(evt, params);
            },

            find: function(selector) {
                return UI.$(this.element ? this.element: []).find(selector);
            },

            proxy: function(obj, methods) {

                var $this = this;

                methods.split(' ').forEach(function(method) {
                    if (!$this[method]) $this[method] = function() { return obj[method].apply(obj, arguments); };
                });
            },

            mixin: function(obj, methods) {

                var $this = this;

                methods.split(' ').forEach(function(method) {
                    if (!$this[method]) $this[method] = obj[method].bind($this);
                });
            },

            option: function() {

                if (arguments.length == 1) {
                    return this.options[arguments[0]] || undefined;
                } else if (arguments.length == 2) {
                    this.options[arguments[0]] = arguments[1];
                }
            }

        }, def);

        this.components[name] = fn;

        this[name] = function() {

            var element, options;

            if (arguments.length) {

                switch(arguments.length) {
                    case 1:

                        if (typeof arguments[0] === "string" || arguments[0].nodeType || arguments[0] instanceof jQuery) {
                            element = $(arguments[0]);
                        } else {
                            options = arguments[0];
                        }

                        break;
                    case 2:

                        element = $(arguments[0]);
                        options = arguments[1];
                        break;
                }
            }

            if (element && element.data(name)) {
                return element.data(name);
            }

            return (new UI.components[name](element, options));
        };

        if (UI.domready) {
            UI.component.boot(name);
        }

        return fn;
    };

    UI.plugin = function(component, name, def) {
        this.components[component].plugins[name] = def;
    };

    UI.component.boot = function(name) {

        if (UI.components[name].prototype && UI.components[name].prototype.boot && !UI.components[name].booted) {
            UI.components[name].prototype.boot.apply(UI, []);
            UI.components[name].booted = true;
        }
    };

    UI.component.bootComponents = function() {

        for (var component in UI.components) {
            UI.component.boot(component);
        }
    };


    // DOM mutation save ready helper function

    UI.domObservers = [];
    UI.domready     = false;

    UI.ready = function(fn) {

        UI.domObservers.push(fn);

        if (UI.domready) {
            fn(document);
        }
    };

    UI.on = function(a1,a2,a3){

        if (a1 && a1.indexOf('ready.uk.dom') > -1 && UI.domready) {
            a2.apply(UI.$doc);
        }

        return UI.$doc.on(a1,a2,a3);
    };

    UI.one = function(a1,a2,a3){

        if (a1 && a1.indexOf('ready.uk.dom') > -1 && UI.domready) {
            a2.apply(UI.$doc);
            return UI.$doc;
        }

        return UI.$doc.one(a1,a2,a3);
    };

    UI.trigger = function(evt, params) {
        return UI.$doc.trigger(evt, params);
    };

    UI.domObserve = function(selector, fn) {

        if(!UI.support.mutationobserver) return;

        fn = fn || function() {};

        UI.$(selector).each(function() {

            var element  = this,
                $element = UI.$(element);

            if ($element.data('observer')) {
                return;
            }

            try {

                var observer = new UI.support.mutationobserver(UI.Utils.debounce(function(mutations) {
                    fn.apply(element, []);
                    $element.trigger('changed.uk.dom');
                }, 50));

                // pass in the target node, as well as the observer options
                observer.observe(element, { childList: true, subtree: true });

                $element.data('observer', observer);

            } catch(e) {}
        });
    };

    UI.init = function(root) {

        root = root || document;

        UI.domObservers.forEach(function(fn){
            fn(root);
        });
    };

    UI.on('domready.uk.dom', function(){

        UI.init();

        if (UI.domready) UI.Utils.checkDisplay();
    });

    $(function(){

        UI.$body = UI.$('body');

        UI.ready(function(context){
            UI.domObserve('[data-uk-observe]');
        });

        UI.on('changed.uk.dom', function(e) {
            UI.init(e.target);
            UI.Utils.checkDisplay(e.target);
        });

        UI.trigger('beforeready.uk.dom');

        UI.component.bootComponents();

        // custom scroll observer
        setInterval((function(){

            var memory = {x: window.pageXOffset, y:window.pageYOffset}, dir;

            var fn = function(){

                if (memory.x != window.pageXOffset || memory.y != window.pageYOffset) {

                    dir = {x: 0 , y: 0};

                    if (window.pageXOffset != memory.x) dir.x = window.pageXOffset > memory.x ? 1:-1;
                    if (window.pageYOffset != memory.y) dir.y = window.pageYOffset > memory.y ? 1:-1;

                    memory = {
                        "dir": dir, "x": window.pageXOffset, "y": window.pageYOffset
                    };

                    UI.$doc.trigger('scrolling.uk.document', [memory]);
                }
            };

            if (UI.support.touch) {
                UI.$html.on('touchmove touchend MSPointerMove MSPointerUp pointermove pointerup', fn);
            }

            if (memory.x || memory.y) fn();

            return fn;

        })(), 15);

        // run component init functions on dom
        UI.trigger('domready.uk.dom');

        if (UI.support.touch) {

            // remove css hover rules for touch devices
            // UI.Utils.removeCssRules(/\.uk-(?!navbar).*:hover/);

            // viewport unit fix for uk-height-viewport - should be fixed in iOS 8
            if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {

                UI.$win.on('load orientationchange resize', UI.Utils.debounce((function(){

                    var fn = function() {
                        $('.uk-height-viewport').css('height', window.innerHeight);
                        return fn;
                    };

                    return fn();

                })(), 100));
            }
        }

        UI.trigger('afterready.uk.dom');

        // mark that domready is left behind
        UI.domready = true;
    });

    // add touch identifier class
    UI.$html.addClass(UI.support.touch ? "uk-touch" : "uk-notouch");

    // add uk-hover class on tap to support overlays on touch devices
    if (UI.support.touch) {

        var hoverset = false, exclude, hovercls = 'uk-hover', selector = '.uk-overlay, .uk-overlay-hover, .uk-overlay-toggle, .uk-animation-hover, .uk-has-hover';

        UI.$html.on('touchstart MSPointerDown pointerdown', selector, function() {

            if (hoverset) $('.'+hovercls).removeClass(hovercls);

            hoverset = $(this).addClass(hovercls);

        }).on('touchend MSPointerUp pointerup', function(e) {

            exclude = $(e.target).parents(selector);

            if (hoverset) {
                hoverset.not(exclude).removeClass(hovercls);
            }
        });
    }

    return UI;
});

//  Based on Zeptos touch.js
//  https://raw.github.com/madrobby/zepto/master/src/touch.js
//  Zepto.js may be freely distributed under the MIT license.

;(function($){

  if ($.fn.swipeLeft) {
    return;
  }


  var touch = {}, touchTimeout, tapTimeout, swipeTimeout, longTapTimeout, longTapDelay = 750, gesture;

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
  }

  function longTap() {
    longTapTimeout = null;
    if (touch.last) {
      touch.el.trigger('longTap');
      touch = {};
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout);
    longTapTimeout = null;
  }

  function cancelAll() {
    if (touchTimeout)   clearTimeout(touchTimeout);
    if (tapTimeout)     clearTimeout(tapTimeout);
    if (swipeTimeout)   clearTimeout(swipeTimeout);
    if (longTapTimeout) clearTimeout(longTapTimeout);
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
    touch = {};
  }

  function isPrimaryTouch(event){
    return event.pointerType == event.MSPOINTER_TYPE_TOUCH && event.isPrimary;
  }

  $(function(){
    var now, delta, deltaX = 0, deltaY = 0, firstTouch;

    if ('MSGesture' in window) {
      gesture = new MSGesture();
      gesture.target = document.body;
    }

    $(document)
      .on('MSGestureEnd gestureend', function(e){

        var swipeDirectionFromVelocity = e.originalEvent.velocityX > 1 ? 'Right' : e.originalEvent.velocityX < -1 ? 'Left' : e.originalEvent.velocityY > 1 ? 'Down' : e.originalEvent.velocityY < -1 ? 'Up' : null;

        if (swipeDirectionFromVelocity) {
          touch.el.trigger('swipe');
          touch.el.trigger('swipe'+ swipeDirectionFromVelocity);
        }
      })
      // MSPointerDown: for IE10
      // pointerdown: for IE11
      .on('touchstart MSPointerDown pointerdown', function(e){

        if(e.type == 'MSPointerDown' && !isPrimaryTouch(e.originalEvent)) return;

        firstTouch = (e.type == 'MSPointerDown' || e.type == 'pointerdown') ? e : e.originalEvent.touches[0];

        now      = Date.now();
        delta    = now - (touch.last || now);
        touch.el = $('tagName' in firstTouch.target ? firstTouch.target : firstTouch.target.parentNode);

        if(touchTimeout) clearTimeout(touchTimeout);

        touch.x1 = firstTouch.pageX;
        touch.y1 = firstTouch.pageY;

        if (delta > 0 && delta <= 250) touch.isDoubleTap = true;

        touch.last = now;
        longTapTimeout = setTimeout(longTap, longTapDelay);

        // adds the current touch contact for IE gesture recognition
        if (gesture && ( e.type == 'MSPointerDown' || e.type == 'pointerdown' || e.type == 'touchstart' ) ) {
          gesture.addPointer(e.originalEvent.pointerId);
        }

      })
      // MSPointerMove: for IE10
      // pointermove: for IE11
      .on('touchmove MSPointerMove pointermove', function(e){

        if (e.type == 'MSPointerMove' && !isPrimaryTouch(e.originalEvent)) return;

        firstTouch = (e.type == 'MSPointerMove' || e.type == 'pointermove') ? e : e.originalEvent.touches[0];

        cancelLongTap();
        touch.x2 = firstTouch.pageX;
        touch.y2 = firstTouch.pageY;

        deltaX += Math.abs(touch.x1 - touch.x2);
        deltaY += Math.abs(touch.y1 - touch.y2);
      })
      // MSPointerUp: for IE10
      // pointerup: for IE11
      .on('touchend MSPointerUp pointerup', function(e){

        if (e.type == 'MSPointerUp' && !isPrimaryTouch(e.originalEvent)) return;

        cancelLongTap();

        // swipe
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) || (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)){

          swipeTimeout = setTimeout(function() {
            touch.el.trigger('swipe');
            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
            touch = {};
          }, 0);

        // normal tap
        } else if ('last' in touch) {

          // don't fire tap when delta position changed by more than 30 pixels,
          // for instance when moving to a point and back to origin
          if (isNaN(deltaX) || (deltaX < 30 && deltaY < 30)) {
            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
            // ('tap' fires before 'scroll')
            tapTimeout = setTimeout(function() {

              // trigger universal 'tap' with the option to cancelTouch()
              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
              var event = $.Event('tap');
              event.cancelTouch = cancelAll;
              touch.el.trigger(event);

              // trigger double tap immediately
              if (touch.isDoubleTap) {
                touch.el.trigger('doubleTap');
                touch = {};
              }

              // trigger single tap after 250ms of inactivity
              else {
                touchTimeout = setTimeout(function(){
                  touchTimeout = null;
                  touch.el.trigger('singleTap');
                  touch = {};
                }, 250);
              }
            }, 0);
          } else {
            touch = {};
          }
          deltaX = deltaY = 0;
        }
      })
      // when the browser window loses focus,
      // for example when a modal dialog is shown,
      // cancel all ongoing events
      .on('touchcancel MSPointerCancel', cancelAll);

    // scrolling the window indicates intention of the user
    // to scroll, not tap or swipe, so cancel all ongoing events
    $(window).on('scroll', cancelAll);
  });

  ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
    $.fn[eventName] = function(callback){ return $(this).on(eventName, callback); };
  });
})(jQuery);

(function(UI) {

    "use strict";

    var stacks = [];

    UI.component('stackMargin', {

        defaults: {
            'cls': 'uk-margin-small-top'
        },

        boot: function() {

            // init code
            UI.ready(function(context) {

                UI.$("[data-uk-margin]", context).each(function() {

                    var ele = UI.$(this), obj;

                    if (!ele.data("stackMargin")) {
                        obj = UI.stackMargin(ele, UI.Utils.options(ele.attr("data-uk-margin")));
                    }
                });
            });
        },

        init: function() {

            var $this = this;

            this.columns = this.element.children();

            if (!this.columns.length) return;

            UI.$win.on('resize orientationchange', (function() {

                var fn = function() {
                    $this.process();
                };

                UI.$(function() {
                    fn();
                    UI.$win.on("load", fn);
                });

                return UI.Utils.debounce(fn, 20);
            })());

            UI.$html.on("changed.uk.dom", function(e) {
                $this.columns  = $this.element.children();
                $this.process();
            });

            this.on("display.uk.check", function(e) {
                $this.columns = $this.element.children();
                if (this.element.is(":visible")) this.process();
            }.bind(this));

            stacks.push(this);
        },

        process: function() {

            var $this = this;

            UI.Utils.stackMargin(this.columns, this.options);

            return this;
        },

        revert: function() {
            this.columns.removeClass(this.options.cls);
            return this;
        }
    });


    // responsive element e.g. iframes

    (function(){

        var elements = [], check = function(ele) {

            if (!ele.is(':visible')) return;

            var width  = ele.parent().width(),
                iwidth = ele.data('width'),
                ratio  = (width / iwidth),
                height = Math.floor(ratio * ele.data('height'));

            ele.css({'height': (width < iwidth) ? height : ele.data('height')});
        };

        UI.component('responsiveElement', {

            defaults: {},

            boot: function() {

                // init code
                UI.ready(function(context) {

                    UI.$("iframe.uk-responsive-width, [data-uk-responsive]", context).each(function() {

                        var ele = UI.$(this), obj;

                        if (!ele.data("responsiveIframe")) {
                            obj = UI.responsiveElement(ele, {});
                        }
                    });
                });
            },

            init: function() {

                var ele = this.element;

                if (ele.attr('width') && ele.attr('height')) {

                    ele.data({

                        'width' : ele.attr('width'),
                        'height': ele.attr('height')

                    }).on('display.uk.check', function(){
                        check(ele);
                    });

                    check(ele);

                    elements.push(ele);
                }
            }
        });

        UI.$win.on('resize load', UI.Utils.debounce(function(){

            elements.forEach(function(ele){
                check(ele);
            });

        }, 15));

    })();



    // helper

    UI.Utils.stackMargin = function(elements, options) {

        options = UI.$.extend({
            'cls': 'uk-margin-small-top'
        }, options);

        options.cls = options.cls;

        elements = UI.$(elements).removeClass(options.cls);

        var skip         = false,
            firstvisible = elements.filter(":visible:first"),
            offset       = firstvisible.length ? (firstvisible.position().top + firstvisible.outerHeight()) - 1 : false; // (-1): weird firefox bug when parent container is display:flex

        if (offset === false) return;

        elements.each(function() {

            var column = UI.$(this);

            if (column.is(":visible")) {

                if (skip) {
                    column.addClass(options.cls);
                } else {

                    if (column.position().top >= offset) {
                        skip = column.addClass(options.cls);
                    }
                }
            }
        });
    };

    UI.Utils.matchHeights = function(elements, options) {

        elements = UI.$(elements).css('min-height', '');
        options  = UI.$.extend({ row : true }, options);

        var matchHeights = function(group){

            if (group.length < 2) return;

            var max = 0;

            group.each(function() {
                max = Math.max(max, UI.$(this).outerHeight());
            }).each(function() {

                var element = UI.$(this),
                    height  = max - (element.css('box-sizing') == 'border-box' ? 0 : (element.outerHeight() - element.height()));

                element.css('min-height', height + 'px');
            });
        };

        if (options.row) {

            elements.first().width(); // force redraw

            setTimeout(function(){

                var lastoffset = false, group = [];

                elements.each(function() {

                    var ele = UI.$(this), offset = ele.offset().top;

                    if (offset != lastoffset && group.length) {

                        matchHeights(UI.$(group));
                        group  = [];
                        offset = ele.offset().top;
                    }

                    group.push(ele);
                    lastoffset = offset;
                });

                if (group.length) {
                    matchHeights(UI.$(group));
                }

            }, 0);

        } else {
            matchHeights(elements);
        }
    };

})(UIkit);

(function(UI) {

    "use strict";

    UI.component('smoothScroll', {

        boot: function() {

            // init code
            UI.$html.on("click.smooth-scroll.uikit", "[data-uk-smooth-scroll]", function(e) {
                var ele = UI.$(this);

                if (!ele.data("smoothScroll")) {
                    var obj = UI.smoothScroll(ele, UI.Utils.options(ele.attr("data-uk-smooth-scroll")));
                    ele.trigger("click");
                }

                return false;
            });
        },

        init: function() {

            var $this = this;

            this.on("click", function(e) {
                e.preventDefault();
                scrollToElement(UI.$(this.hash).length ? UI.$(this.hash) : UI.$("body"), $this.options);
            });
        }
    });

    function scrollToElement(ele, options) {

        options = UI.$.extend({
            duration: 1000,
            transition: 'easeOutExpo',
            offset: 0,
            complete: function(){}
        }, options);

        // get / set parameters
        var target    = ele.offset().top - options.offset,
            docheight = UI.$doc.height(),
            winheight = window.innerHeight;

        if ((target + winheight) > docheight) {
            target = docheight - winheight;
        }

        // animate to target, fire callback when done
        UI.$("html,body").stop().animate({scrollTop: target}, options.duration, options.transition).promise().done(options.complete);
    }

    UI.Utils.scrollToElement = scrollToElement;

    if (!UI.$.easing.easeOutExpo) {
        UI.$.easing.easeOutExpo = function(x, t, b, c, d) { return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b; };
    }

})(UIkit);

(function(UI) {

    "use strict";

    var $win           = UI.$win,
        $doc           = UI.$doc,
        scrollspies    = [],
        checkScrollSpy = function() {
            for(var i=0; i < scrollspies.length; i++) {
                window.requestAnimationFrame.apply(window, [scrollspies[i].check]);
            }
        };

    UI.component('scrollspy', {

        defaults: {
            "target"     : false,
            "cls"        : "uk-scrollspy-inview",
            "initcls"    : "uk-scrollspy-init-inview",
            "topoffset"  : 0,
            "leftoffset" : 0,
            "repeat"     : false,
            "delay"      : 0
        },

        boot: function() {

            // listen to scroll and resize
            $doc.on("scrolling.uk.document", checkScrollSpy);
            $win.on("load resize orientationchange", UI.Utils.debounce(checkScrollSpy, 50));

            // init code
            UI.ready(function(context) {

                UI.$("[data-uk-scrollspy]", context).each(function() {

                    var element = UI.$(this);

                    if (!element.data("scrollspy")) {
                        var obj = UI.scrollspy(element, UI.Utils.options(element.attr("data-uk-scrollspy")));
                    }
                });
            });
        },

        init: function() {

            var $this = this, inviewstate, initinview, togglecls = this.options.cls.split(/,/), fn = function(){

                var elements     = $this.options.target ? $this.element.find($this.options.target) : $this.element,
                    delayIdx     = elements.length === 1 ? 1 : 0,
                    toggleclsIdx = 0;

                elements.each(function(idx){

                    var element     = UI.$(this),
                        inviewstate = element.data('inviewstate'),
                        inview      = UI.Utils.isInView(element, $this.options),
                        toggle      = element.data('ukScrollspyCls') || togglecls[toggleclsIdx].trim();

                    if (inview && !inviewstate && !element.data('scrollspy-idle')) {

                        if (!initinview) {
                            element.addClass($this.options.initcls);
                            $this.offset = element.offset();
                            initinview = true;

                            element.trigger("init.uk.scrollspy");
                        }

                        element.data('scrollspy-idle', setTimeout(function(){

                            element.addClass("uk-scrollspy-inview").toggleClass(toggle).width();
                            element.trigger("inview.uk.scrollspy");

                            element.data('scrollspy-idle', false);
                            element.data('inviewstate', true);

                        }, $this.options.delay * delayIdx));

                        delayIdx++;
                    }

                    if (!inview && inviewstate && $this.options.repeat) {

                        if (element.data('scrollspy-idle')) {
                            clearTimeout(element.data('scrollspy-idle'));
                        }

                        element.removeClass("uk-scrollspy-inview").toggleClass(toggle);
                        element.data('inviewstate', false);

                        element.trigger("outview.uk.scrollspy");
                    }

                    toggleclsIdx = togglecls[toggleclsIdx + 1] ? (toggleclsIdx + 1) : 0;

                });
            };

            fn();

            this.check = fn;

            scrollspies.push(this);
        }
    });


    var scrollspynavs = [],
        checkScrollSpyNavs = function() {
            for(var i=0; i < scrollspynavs.length; i++) {
                window.requestAnimationFrame.apply(window, [scrollspynavs[i].check]);
            }
        };

    UI.component('scrollspynav', {

        defaults: {
            "cls"          : 'uk-active',
            "closest"      : false,
            "topoffset"    : 0,
            "leftoffset"   : 0,
            "smoothscroll" : false
        },

        boot: function() {

            // listen to scroll and resize
            $doc.on("scrolling.uk.document", checkScrollSpyNavs);
            $win.on("resize orientationchange", UI.Utils.debounce(checkScrollSpyNavs, 50));

            // init code
            UI.ready(function(context) {

                UI.$("[data-uk-scrollspy-nav]", context).each(function() {

                    var element = UI.$(this);

                    if (!element.data("scrollspynav")) {
                        var obj = UI.scrollspynav(element, UI.Utils.options(element.attr("data-uk-scrollspy-nav")));
                    }
                });
            });
        },

        init: function() {

            var ids     = [],
                links   = this.find("a[href^='#']").each(function(){ ids.push(UI.$(this).attr("href")); }),
                targets = UI.$(ids.join(",")),

                clsActive  = this.options.cls,
                clsClosest = this.options.closest || this.options.closest;

            var $this = this, inviews, fn = function(){

                inviews = [];

                for (var i=0 ; i < targets.length ; i++) {
                    if (UI.Utils.isInView(targets.eq(i), $this.options)) {
                        inviews.push(targets.eq(i));
                    }
                }

                if (inviews.length) {

                    var navitems,
                        scrollTop = $win.scrollTop(),
                        target = (function(){
                            for(var i=0; i< inviews.length;i++){
                                if(inviews[i].offset().top >= scrollTop){
                                    return inviews[i];
                                }
                            }
                        })();

                    if (!target) return;

                    if ($this.options.closest) {
                        links.closest(clsClosest).removeClass(clsActive);
                        navitems = links.filter("a[href='#"+target.attr("id")+"']").closest(clsClosest).addClass(clsActive);
                    } else {
                        navitems = links.removeClass(clsActive).filter("a[href='#"+target.attr("id")+"']").addClass(clsActive);
                    }

                    $this.element.trigger("inview.uk.scrollspynav", [target, navitems]);
                }
            };

            if (this.options.smoothscroll && UI.smoothScroll) {
                links.each(function(){
                    UI.smoothScroll(this, $this.options.smoothscroll);
                });
            }

            fn();

            this.element.data("scrollspynav", this);

            this.check = fn;
            scrollspynavs.push(this);

        }
    });

})(UIkit);

(function(UI){

    "use strict";

    var toggles = [];

    UI.component('toggle', {

        defaults: {
            target    : false,
            cls       : 'uk-hidden',
            animation : false,
            duration  : 200
        },

        boot: function(){

            // init code
            UI.ready(function(context) {

                UI.$("[data-uk-toggle]", context).each(function() {
                    var ele = UI.$(this);

                    if (!ele.data("toggle")) {
                        var obj = UI.toggle(ele, UI.Utils.options(ele.attr("data-uk-toggle")));
                    }
                });

                setTimeout(function(){

                    toggles.forEach(function(toggle){
                        toggle.getToggles();
                    });

                }, 0);
            });
        },

        init: function() {

            var $this = this;

            this.aria = (this.options.cls.indexOf('uk-hidden') !== -1);

            this.getToggles();

            this.on("click", function(e) {
                if ($this.element.is('a[href="#"]')) e.preventDefault();
                $this.toggle();
            });

            toggles.push(this);
        },

        toggle: function() {

            if(!this.totoggle.length) return;

            if (this.options.animation && UI.support.animation) {

                var $this = this, animations = this.options.animation.split(',');

                if (animations.length == 1) {
                    animations[1] = animations[0];
                }

                animations[0] = animations[0].trim();
                animations[1] = animations[1].trim();

                this.totoggle.css('animation-duration', this.options.duration+'ms');

                if (this.totoggle.hasClass(this.options.cls)) {

                    this.totoggle.toggleClass(this.options.cls);

                    this.totoggle.each(function(){
                        UI.Utils.animate(this, animations[0]).then(function(){
                            UI.$(this).css('animation-duration', '');
                            UI.Utils.checkDisplay(this);
                        });
                    });

                } else {

                    this.totoggle.each(function(){
                        UI.Utils.animate(this, animations[1]+' uk-animation-reverse').then(function(){
                            UI.$(this).toggleClass($this.options.cls).css('animation-duration', '');
                            UI.Utils.checkDisplay(this);
                        }.bind(this));
                    });
                }

            } else {
                this.totoggle.toggleClass(this.options.cls);
                UI.Utils.checkDisplay(this.totoggle);
            }

            this.updateAria();

        },

        getToggles: function() {
            this.totoggle = this.options.target ? UI.$(this.options.target):[];
            this.updateAria();
        },

        updateAria: function() {
            if (this.aria && this.totoggle.length) {
                this.totoggle.each(function(){
                    UI.$(this).attr('aria-hidden', UI.$(this).hasClass('uk-hidden'));
                });
            }
        }
    });

})(UIkit);

(function(UI) {

    "use strict";

    UI.component('alert', {

        defaults: {
            "fade": true,
            "duration": 200,
            "trigger": ".uk-alert-close"
        },

        boot: function() {

            // init code
            UI.$html.on("click.alert.uikit", "[data-uk-alert]", function(e) {

                var ele = UI.$(this);

                if (!ele.data("alert")) {

                    var alert = UI.alert(ele, UI.Utils.options(ele.attr("data-uk-alert")));

                    if (UI.$(e.target).is(alert.options.trigger)) {
                        e.preventDefault();
                        alert.close();
                    }
                }
            });
        },

        init: function() {

            var $this = this;

            this.on("click", this.options.trigger, function(e) {
                e.preventDefault();
                $this.close();
            });
        },

        close: function() {

            var element       = this.trigger("close.uk.alert"),
                removeElement = function () {
                    this.trigger("closed.uk.alert").remove();
                }.bind(this);

            if (this.options.fade) {
                element.css("overflow", "hidden").css("max-height", element.height()).animate({
                    "height"         : 0,
                    "opacity"        : 0,
                    "padding-top"    : 0,
                    "padding-bottom" : 0,
                    "margin-top"     : 0,
                    "margin-bottom"  : 0
                }, this.options.duration, removeElement);
            } else {
                removeElement();
            }
        }

    });

})(UIkit);

(function(UI) {

    "use strict";

    UI.component('buttonRadio', {

        defaults: {
            "target": ".uk-button"
        },

        boot: function() {

            // init code
            UI.$html.on("click.buttonradio.uikit", "[data-uk-button-radio]", function(e) {

                var ele = UI.$(this);

                if (!ele.data("buttonRadio")) {

                    var obj    = UI.buttonRadio(ele, UI.Utils.options(ele.attr("data-uk-button-radio"))),
                        target = UI.$(e.target);

                    if (target.is(obj.options.target)) {
                        target.trigger("click");
                    }
                }
            });
        },

        init: function() {

            var $this = this;

            // Init ARIA
            this.find($this.options.target).attr('aria-checked', 'false').filter(".uk-active").attr('aria-checked', 'true');

            this.on("click", this.options.target, function(e) {

                var ele = UI.$(this);

                if (ele.is('a[href="#"]')) e.preventDefault();

                $this.find($this.options.target).not(ele).removeClass("uk-active").blur();
                ele.addClass("uk-active");

                // Update ARIA
                $this.find($this.options.target).not(ele).attr('aria-checked', 'false');
                ele.attr('aria-checked', 'true');

                $this.trigger("change.uk.button", [ele]);
            });

        },

        getSelected: function() {
            return this.find(".uk-active");
        }
    });

    UI.component('buttonCheckbox', {

        defaults: {
            "target": ".uk-button"
        },

        boot: function() {

            UI.$html.on("click.buttoncheckbox.uikit", "[data-uk-button-checkbox]", function(e) {
                var ele = UI.$(this);

                if (!ele.data("buttonCheckbox")) {

                    var obj    = UI.buttonCheckbox(ele, UI.Utils.options(ele.attr("data-uk-button-checkbox"))),
                        target = UI.$(e.target);

                    if (target.is(obj.options.target)) {
                        target.trigger("click");
                    }
                }
            });
        },

        init: function() {

            var $this = this;

            // Init ARIA
            this.find($this.options.target).attr('aria-checked', 'false').filter(".uk-active").attr('aria-checked', 'true');

            this.on("click", this.options.target, function(e) {
                var ele = UI.$(this);

                if (ele.is('a[href="#"]')) e.preventDefault();

                ele.toggleClass("uk-active").blur();

                // Update ARIA
                ele.attr('aria-checked', ele.hasClass("uk-active"));

                $this.trigger("change.uk.button", [ele]);
            });

        },

        getSelected: function() {
            return this.find(".uk-active");
        }
    });


    UI.component('button', {

        defaults: {},

        boot: function() {

            UI.$html.on("click.button.uikit", "[data-uk-button]", function(e) {
                var ele = UI.$(this);

                if (!ele.data("button")) {

                    var obj = UI.button(ele, UI.Utils.options(ele.attr("data-uk-button")));
                    ele.trigger("click");
                }
            });
        },

        init: function() {

            var $this = this;

            // Init ARIA
            this.element.attr('aria-pressed', this.element.hasClass("uk-active"));

            this.on("click", function(e) {

                if ($this.element.is('a[href="#"]')) e.preventDefault();

                $this.toggle();
                $this.trigger("change.uk.button", [$this.element.blur().hasClass("uk-active")]);
            });

        },

        toggle: function() {
            this.element.toggleClass("uk-active");

            // Update ARIA
            this.element.attr('aria-pressed', this.element.hasClass("uk-active"));
        }
    });

})(UIkit);

(function(UI) {

    "use strict";

    var active = false, hoverIdle;

    UI.component('dropdown', {

        defaults: {
           'mode'       : 'hover',
           'remaintime' : 800,
           'justify'    : false,
           'boundary'   : UI.$win,
           'delay'      : 0,
           'hoverDelayIdle'  : 250
        },

        remainIdle: false,

        boot: function() {

            var triggerevent = UI.support.touch ? "click" : "mouseenter";

            // init code
            UI.$html.on(triggerevent+".dropdown.uikit", "[data-uk-dropdown]", function(e) {

                var ele = UI.$(this);

                if (!ele.data("dropdown")) {

                    var dropdown = UI.dropdown(ele, UI.Utils.options(ele.attr("data-uk-dropdown")));

                    if (triggerevent=="click" || (triggerevent=="mouseenter" && dropdown.options.mode=="hover")) {
                        dropdown.element.trigger(triggerevent);
                    }

                    if (dropdown.element.find('.uk-dropdown').length) {
                        e.preventDefault();
                    }
                }
            });
        },

        init: function() {

            var $this = this;

            this.dropdown  = this.find('.uk-dropdown');

            this.centered  = this.dropdown.hasClass('uk-dropdown-center');
            this.justified = this.options.justify ? UI.$(this.options.justify) : false;

            this.boundary  = UI.$(this.options.boundary);
            this.flipped   = this.dropdown.hasClass('uk-dropdown-flip');

            if (!this.boundary.length) {
                this.boundary = UI.$win;
            }

            // Init ARIA
            this.element.attr('aria-haspopup', 'true');
            this.element.attr('aria-expanded', this.element.hasClass("uk-open"));

            if (this.options.mode == "click" || UI.support.touch) {

                this.on("click.uikit.dropdown", function(e) {

                    var $target = UI.$(e.target);

                    if (!$target.parents(".uk-dropdown").length) {

                        if ($target.is("a[href='#']") || $target.parent().is("a[href='#']") || ($this.dropdown.length && !$this.dropdown.is(":visible")) ){
                            e.preventDefault();
                        }

                        $target.blur();
                    }

                    if (!$this.element.hasClass('uk-open')) {

                        $this.show();

                    } else {

                        if ($target.is("a:not(.js-uk-prevent)") || $target.is(".uk-dropdown-close") || !$this.dropdown.find(e.target).length) {
                            $this.hide();
                        }
                    }
                });

            } else {

                this.on("mouseenter", function(e) {

                    if ($this.remainIdle) {
                        clearTimeout($this.remainIdle);
                    }

                    if (hoverIdle) {
                        clearTimeout(hoverIdle);
                    }

                    if (active && active == $this) {
                        return;
                    }

                    // pseudo manuAim
                    if (active && active != $this) {

                        hoverIdle = setTimeout(function() {
                            hoverIdle = setTimeout($this.show.bind($this), $this.options.delay);
                        }, $this.options.hoverDelayIdle);

                    } else {

                        hoverIdle = setTimeout($this.show.bind($this), $this.options.delay);
                    }

                }).on("mouseleave", function() {

                    if (hoverIdle) {
                        clearTimeout(hoverIdle);
                    }

                    $this.remainIdle = setTimeout(function() {
                        if (active && active == $this) $this.hide();
                    }, $this.options.remaintime);

                }).on("click", function(e){

                    var $target = UI.$(e.target);

                    if ($this.remainIdle) {
                        clearTimeout($this.remainIdle);
                    }

                    if ($target.is("a[href='#']") || $target.parent().is("a[href='#']")){
                        e.preventDefault();
                    }

                    $this.show();
                });
            }
        },

        show: function(){

            UI.$html.off("click.outer.dropdown");

            if (active && active != this) {
                active.hide();
            }

            if (hoverIdle) {
                clearTimeout(hoverIdle);
            }

            this.checkDimensions();
            this.element.addClass('uk-open');

            // Update ARIA
            this.element.attr('aria-expanded', 'true');

            this.trigger('show.uk.dropdown', [this]);

            UI.Utils.checkDisplay(this.dropdown, true);
            active = this;

            this.registerOuterClick();
        },

        hide: function() {
            this.element.removeClass('uk-open');

            if (this.remainIdle) {
                clearTimeout(this.remainIdle);
            }

            this.remainIdle = false;

            // Update ARIA
            this.element.attr('aria-expanded', 'false');

            this.trigger('hide.uk.dropdown', [this]);

            if (active == this) active = false;
        },

        registerOuterClick: function(){

            var $this = this;

            UI.$html.off("click.outer.dropdown");

            setTimeout(function() {

                UI.$html.on("click.outer.dropdown", function(e) {

                    if (hoverIdle) {
                        clearTimeout(hoverIdle);
                    }

                    var $target = UI.$(e.target);

                    if (active == $this && ($target.is("a:not(.js-uk-prevent)") || $target.is(".uk-dropdown-close") || !$this.dropdown.find(e.target).length)) {
                        $this.hide();
                        UI.$html.off("click.outer.dropdown");
                    }
                });
            }, 10);
        },

        checkDimensions: function() {

            if (!this.dropdown.length) return;

            if (this.justified && this.justified.length) {
                this.dropdown.css("min-width", "");
            }

            var $this     = this,
                dropdown  = this.dropdown.css("margin-" + UI.langdirection, ""),
                offset    = dropdown.show().offset(),
                width     = dropdown.outerWidth(),
                boundarywidth  = this.boundary.width(),
                boundaryoffset = this.boundary.offset() ? this.boundary.offset().left:0;

            // centered dropdown
            if (this.centered) {
                dropdown.css("margin-" + UI.langdirection, (parseFloat(width) / 2 - dropdown.parent().width() / 2) * -1);
                offset = dropdown.offset();

                // reset dropdown
                if ((width + offset.left) > boundarywidth || offset.left < 0) {
                    dropdown.css("margin-" + UI.langdirection, "");
                    offset = dropdown.offset();
                }
            }

            // justify dropdown
            if (this.justified && this.justified.length) {

                var jwidth = this.justified.outerWidth();

                dropdown.css("min-width", jwidth);

                if (UI.langdirection == 'right') {

                    var right1   = boundarywidth - (this.justified.offset().left + jwidth),
                        right2   = boundarywidth - (dropdown.offset().left + dropdown.outerWidth());

                    dropdown.css("margin-right", right1 - right2);

                } else {
                    dropdown.css("margin-left", this.justified.offset().left - offset.left);
                }

                offset = dropdown.offset();

            }

            if ((width + (offset.left-boundaryoffset)) > boundarywidth) {
                dropdown.addClass('uk-dropdown-flip');
                offset = dropdown.offset();
            }

            if ((offset.left-boundaryoffset) < 0) {

                dropdown.addClass("uk-dropdown-stack");

                if (dropdown.hasClass('uk-dropdown-flip')) {

                    if (!this.flipped) {
                        dropdown.removeClass('uk-dropdown-flip');
                        offset = dropdown.offset();
                        dropdown.addClass('uk-dropdown-flip');
                    }

                    setTimeout(function(){

                        if ((dropdown.offset().left-boundaryoffset) < 0 || !$this.flipped && (dropdown.outerWidth() + (offset.left-boundaryoffset)) < boundarywidth) {
                            dropdown.removeClass('uk-dropdown-flip');
                        }
                    }, 0);
                }

                this.trigger('stack.uk.dropdown', [this]);
            }

            dropdown.css("display", "");
        }

    });

})(UIkit);

(function(UI) {

    "use strict";

    var grids = [];

    UI.component('gridMatchHeight', {

        defaults: {
            "target"        : false,
            "row"           : true,
            "ignorestacked" : false
        },

        boot: function() {

            // init code
            UI.ready(function(context) {

                UI.$("[data-uk-grid-match]", context).each(function() {
                    var grid = UI.$(this), obj;

                    if (!grid.data("gridMatchHeight")) {
                        obj = UI.gridMatchHeight(grid, UI.Utils.options(grid.attr("data-uk-grid-match")));
                    }
                });
            });
        },

        init: function() {

            var $this = this;

            this.columns  = this.element.children();
            this.elements = this.options.target ? this.find(this.options.target) : this.columns;

            if (!this.columns.length) return;

            UI.$win.on('load resize orientationchange', (function() {

                var fn = function() {
                    $this.match();
                };

                UI.$(function() { fn(); });

                return UI.Utils.debounce(fn, 50);
            })());

            UI.$html.on("changed.uk.dom", function(e) {
                $this.columns  = $this.element.children();
                $this.elements = $this.options.target ? $this.find($this.options.target) : $this.columns;
                $this.match();
            });

            this.on("display.uk.check", function(e) {
                if(this.element.is(":visible")) this.match();
            }.bind(this));

            grids.push(this);
        },

        match: function() {

            var firstvisible = this.columns.filter(":visible:first");

            if (!firstvisible.length) return;

            var stacked = Math.ceil(100 * parseFloat(firstvisible.css('width')) / parseFloat(firstvisible.parent().css('width'))) >= 100;

            if (stacked && !this.options.ignorestacked) {
                this.revert();
            } else {
                UI.Utils.matchHeights(this.elements, this.options);
            }

            return this;
        },

        revert: function() {
            this.elements.css('min-height', '');
            return this;
        }
    });

    UI.component('gridMargin', {

        defaults: {
            "cls": "uk-grid-margin"
        },

        boot: function() {

            // init code
            UI.ready(function(context) {

                UI.$("[data-uk-grid-margin]", context).each(function() {
                    var grid = UI.$(this), obj;

                    if (!grid.data("gridMargin")) {
                        obj = UI.gridMargin(grid, UI.Utils.options(grid.attr("data-uk-grid-margin")));
                    }
                });
            });
        },

        init: function() {

            var stackMargin = UI.stackMargin(this.element, this.options);
        }
    });

})(UIkit);

(function(UI) {

    "use strict";

    var active = false, activeCount = 0, $html = UI.$html, body;

    UI.component('modal', {

        defaults: {
            keyboard: true,
            bgclose: true,
            minScrollHeight: 150,
            center: false,
            modal: true
        },

        scrollable: false,
        transition: false,

        init: function() {

            if (!body) body = UI.$('body');

            if (!this.element.length) return;

            var $this = this;

            this.paddingdir = "padding-" + (UI.langdirection == 'left' ? "right":"left");
            this.dialog     = this.find(".uk-modal-dialog");

            this.active     = false;

            // Update ARIA
            this.element.attr('aria-hidden', this.element.hasClass("uk-open"));

            this.on("click", ".uk-modal-close", function(e) {
                e.preventDefault();
                $this.hide();
            }).on("click", function(e) {

                var target = UI.$(e.target);

                if (target[0] == $this.element[0] && $this.options.bgclose) {
                    $this.hide();
                }
            });
        },

        toggle: function() {
            return this[this.isActive() ? "hide" : "show"]();
        },

        show: function() {

            if (!this.element.length) return;

            var $this = this;

            if (this.isActive()) return;

            if (this.options.modal && active) {
                active.hide(true);
            }

            this.element.removeClass("uk-open").show();
            this.resize();

            if (this.options.modal) {
                active = this;
            }

            this.active = true;

            activeCount++;

            this.element.addClass("uk-open");

            $html.addClass("uk-modal-page").height(); // force browser engine redraw

            // Update ARIA
            this.element.attr('aria-hidden', 'false');

            this.element.trigger("show.uk.modal");

            UI.Utils.checkDisplay(this.dialog, true);

            return this;
        },

        hide: function(force) {

            if (!force && UI.support.transition) {

                var $this = this;

                this.one(UI.support.transition.end, function() {
                    $this._hide();
                }).removeClass("uk-open");

            } else {

                this._hide();
            }

            return this;
        },

        resize: function() {

            var bodywidth  = body.width();

            this.scrollbarwidth = window.innerWidth - bodywidth;

            body.css(this.paddingdir, this.scrollbarwidth);

            this.element.css('overflow-y', this.scrollbarwidth ? 'scroll' : 'auto');

            if (!this.updateScrollable() && this.options.center) {

                var dh  = this.dialog.outerHeight(),
                pad = parseInt(this.dialog.css('margin-top'), 10) + parseInt(this.dialog.css('margin-bottom'), 10);

                if ((dh + pad) < window.innerHeight) {
                    this.dialog.css({'top': (window.innerHeight/2 - dh/2) - pad });
                } else {
                    this.dialog.css({'top': ''});
                }
            }
        },

        updateScrollable: function() {

            // has scrollable?
            var scrollable = this.dialog.find('.uk-overflow-container:visible:first');

            if (scrollable.length) {

                scrollable.css("height", 0);

                var offset = Math.abs(parseInt(this.dialog.css("margin-top"), 10)),
                dh     = this.dialog.outerHeight(),
                wh     = window.innerHeight,
                h      = wh - 2*(offset < 20 ? 20:offset) - dh;

                scrollable.css("height", h < this.options.minScrollHeight ? "":h);

                return true;
            }

            return false;
        },

        _hide: function() {

            this.active = false;
            activeCount--;

            this.element.hide().removeClass("uk-open");

            // Update ARIA
            this.element.attr('aria-hidden', 'true');

            if (!activeCount) {
                $html.removeClass("uk-modal-page");
                body.css(this.paddingdir, "");
            }

            if(active===this) active = false;

            this.trigger("hide.uk.modal");
        },

        isActive: function() {
            return this.active;
        }

    });

    UI.component('modalTrigger', {

        boot: function() {

            // init code
            UI.$html.on("click.modal.uikit", "[data-uk-modal]", function(e) {

                var ele = UI.$(this);

                if (ele.is("a")) {
                    e.preventDefault();
                }

                if (!ele.data("modalTrigger")) {
                    var modal = UI.modalTrigger(ele, UI.Utils.options(ele.attr("data-uk-modal")));
                    modal.show();
                }

            });

            // close modal on esc button
            UI.$html.on('keydown.modal.uikit', function (e) {

                if (active && e.keyCode === 27 && active.options.keyboard) { // ESC
                    e.preventDefault();
                    active.hide();
                }
            });

            UI.$win.on("resize orientationchange", UI.Utils.debounce(function(){
                if (active) active.resize();
            }, 150));
        },

        init: function() {

            var $this = this;

            this.options = UI.$.extend({
                "target": $this.element.is("a") ? $this.element.attr("href") : false
            }, this.options);

            this.modal = UI.modal(this.options.target, this.options);

            this.on("click", function(e) {
                e.preventDefault();
                $this.show();
            });

            //methods
            this.proxy(this.modal, "show hide isActive");
        }
    });

    UI.modal.dialog = function(content, options) {

        var modal = UI.modal(UI.$(UI.modal.dialog.template).appendTo("body"), options);

        modal.on("hide.uk.modal", function(){
            if (modal.persist) {
                modal.persist.appendTo(modal.persist.data("modalPersistParent"));
                modal.persist = false;
            }
            modal.element.remove();
        });

        setContent(content, modal);

        return modal;
    };

    UI.modal.dialog.template = '<div class="uk-modal"><div class="uk-modal-dialog" style="min-height:0;"></div></div>';

    UI.modal.alert = function(content, options) {

        options = UI.$.extend(true, {bgclose:false, keyboard:false, modal:false, labels:UI.modal.labels}, options);

        var modal = UI.modal.dialog(([
            '<div class="uk-margin uk-modal-content">'+String(content)+'</div>',
            '<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-button-primary uk-modal-close">'+options.labels.Ok+'</button></div>'
        ]).join(""), options);

        modal.on('show.uk.modal', function(){
            setTimeout(function(){
                modal.element.find('button:first').focus();
            }, 50);
        });

        modal.show();
    };

    UI.modal.confirm = function(content, onconfirm, options) {

        onconfirm = UI.$.isFunction(onconfirm) ? onconfirm : function(){};
        options   = UI.$.extend(true, {bgclose:false, keyboard:false, modal:false, labels:UI.modal.labels}, options);

        var modal = UI.modal.dialog(([
            '<div class="uk-margin uk-modal-content">'+String(content)+'</div>',
            '<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-button-primary js-modal-confirm">'+options.labels.Ok+'</button> <button class="uk-button uk-modal-close">'+options.labels.Cancel+'</button></div>'
        ]).join(""), options);

        modal.element.find(".js-modal-confirm").on("click", function(){
            onconfirm();
            modal.hide();
        });

        modal.on('show.uk.modal', function(){
            setTimeout(function(){
                modal.element.find('button:first').focus();
            }, 50);
        });

        modal.show();
    };

    UI.modal.prompt = function(text, value, onsubmit, options) {

        onsubmit = UI.$.isFunction(onsubmit) ? onsubmit : function(value){};
        options  = UI.$.extend(true, {bgclose:false, keyboard:false, modal:false, labels:UI.modal.labels}, options);

        var modal = UI.modal.dialog(([
            text ? '<div class="uk-modal-content uk-form">'+String(text)+'</div>':'',
            '<div class="uk-margin-small-top uk-modal-content uk-form"><p><input type="text" class="uk-width-1-1"></p></div>',
            '<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-button-primary js-modal-ok">'+options.labels.Ok+'</button> <button class="uk-button uk-modal-close">'+options.labels.Cancel+'</button></div>'
        ]).join(""), options),

        input = modal.element.find("input[type='text']").val(value || '').on('keyup', function(e){
            if (e.keyCode == 13) {
                modal.element.find(".js-modal-ok").trigger('click');
            }
        });

        modal.element.find(".js-modal-ok").on("click", function(){
            if (onsubmit(input.val())!==false){
                modal.hide();
            }
        });

        modal.on('show.uk.modal', function(){
            setTimeout(function(){
                input.focus();
            }, 50);
        });

        modal.show();
    };

    UI.modal.blockUI = function(content, options) {

        var modal = UI.modal.dialog(([
            '<div class="uk-margin uk-modal-content">'+String(content || '<div class="uk-text-center">...</div>')+'</div>'
        ]).join(""), UI.$.extend({bgclose:false, keyboard:false, modal:false}, options));

        modal.content = modal.element.find('.uk-modal-content:first');
        modal.show();

        return modal;
    };


    UI.modal.labels = {
        'Ok': 'Ok',
        'Cancel': 'Cancel'
    };


    // helper functions
    function setContent(content, modal){

        if(!modal) return;

        if (typeof content === 'object') {

            // convert DOM object to a jQuery object
            content = content instanceof jQuery ? content : UI.$(content);

            if(content.parent().length) {
                modal.persist = content;
                modal.persist.data("modalPersistParent", content.parent());
            }
        }else if (typeof content === 'string' || typeof content === 'number') {
                // just insert the data as innerHTML
                content = UI.$('<div></div>').html(content);
        }else {
                // unsupported data type!
                content = UI.$('<div></div>').html('UIkit.modal Error: Unsupported data type: ' + typeof content);
        }

        content.appendTo(modal.element.find('.uk-modal-dialog'));

        return modal;
    }

})(UIkit);

(function(UI) {

    "use strict";

    UI.component('nav', {

        defaults: {
            "toggle": ">li.uk-parent > a[href='#']",
            "lists": ">li.uk-parent > ul",
            "multiple": false
        },

        boot: function() {

            // init code
            UI.ready(function(context) {

                UI.$("[data-uk-nav]", context).each(function() {
                    var nav = UI.$(this);

                    if (!nav.data("nav")) {
                        var obj = UI.nav(nav, UI.Utils.options(nav.attr("data-uk-nav")));
                    }
                });
            });
        },

        init: function() {

            var $this = this;

            this.on("click.uikit.nav", this.options.toggle, function(e) {
                e.preventDefault();
                var ele = UI.$(this);
                $this.open(ele.parent()[0] == $this.element[0] ? ele : ele.parent("li"));
            });

            this.find(this.options.lists).each(function() {
                var $ele   = UI.$(this),
                    parent = $ele.parent(),
                    active = parent.hasClass("uk-active");

                $ele.wrap('<div style="overflow:hidden;height:0;position:relative;"></div>');
                parent.data("list-container", $ele.parent()[active ? 'removeClass':'addClass']('uk-hidden'));

                // Init ARIA
                parent.attr('aria-expanded', parent.hasClass("uk-open"));

                if (active) $this.open(parent, true);
            });

        },

        open: function(li, noanimation) {

            var $this = this, element = this.element, $li = UI.$(li), $container = $li.data('list-container');

            if (!this.options.multiple) {

                element.children('.uk-open').not(li).each(function() {

                    var ele = UI.$(this);

                    if (ele.data('list-container')) {
                        ele.data('list-container').stop().animate({height: 0}, function() {
                            UI.$(this).parent().removeClass('uk-open').end().addClass('uk-hidden');
                        });
                    }
                });
            }

            $li.toggleClass('uk-open');

            // Update ARIA
            $li.attr('aria-expanded', $li.hasClass('uk-open'));

            if ($container) {

                if ($li.hasClass('uk-open')) {
                    $container.removeClass('uk-hidden');
                }

                if (noanimation) {

                    $container.stop().height($li.hasClass('uk-open') ? 'auto' : 0);

                    if (!$li.hasClass('uk-open')) {
                        $container.addClass('uk-hidden');
                    }

                    this.trigger('display.uk.check');

                } else {

                    $container.stop().animate({
                        height: ($li.hasClass('uk-open') ? getHeight($container.find('ul:first')) : 0)
                    }, function() {

                        if (!$li.hasClass('uk-open')) {
                            $container.addClass('uk-hidden');
                        } else {
                            $container.css('height', '');
                        }

                        $this.trigger('display.uk.check');
                    });
                }
            }
        }
    });


    // helper

    function getHeight(ele) {
        var $ele = UI.$(ele), height = "auto";

        if ($ele.is(":visible")) {
            height = $ele.outerHeight();
        } else {
            var tmp = {
                position: $ele.css("position"),
                visibility: $ele.css("visibility"),
                display: $ele.css("display")
            };

            height = $ele.css({position: 'absolute', visibility: 'hidden', display: 'block'}).outerHeight();

            $ele.css(tmp); // reset element
        }

        return height;
    }

})(UIkit);

(function(UI) {

    "use strict";

    var scrollpos = {x: window.scrollX, y: window.scrollY},
        $win      = UI.$win,
        $doc      = UI.$doc,
        $html     = UI.$html,
        Offcanvas = {

        show: function(element) {

            element = UI.$(element);

            if (!element.length) return;

            var $body     = UI.$('body'),
                bar       = element.find(".uk-offcanvas-bar:first"),
                rtl       = (UI.langdirection == "right"),
                flip      = bar.hasClass("uk-offcanvas-bar-flip") ? -1:1,
                dir       = flip * (rtl ? -1 : 1);

            scrollpos = {x: window.pageXOffset, y: window.pageYOffset};

            element.addClass("uk-active");

            $body.css({"width": window.innerWidth, "height": window.innerHeight}).addClass("uk-offcanvas-page");
            $body.css((rtl ? "margin-right" : "margin-left"), (rtl ? -1 : 1) * (bar.outerWidth() * dir)).width(); // .width() - force redraw

            $html.css('margin-top', scrollpos.y * -1);

            bar.addClass("uk-offcanvas-bar-show");

            this._initElement(element);

            bar.trigger('show.uk.offcanvas', [element, bar]);

            // Update ARIA
            element.attr('aria-hidden', 'false');
        },

        hide: function(force) {

            var $body = UI.$('body'),
                panel = UI.$(".uk-offcanvas.uk-active"),
                rtl   = (UI.langdirection == "right"),
                bar   = panel.find(".uk-offcanvas-bar:first"),
                finalize = function() {
                    $body.removeClass("uk-offcanvas-page").css({"width": "", "height": "", "margin-left": "", "margin-right": ""});
                    panel.removeClass("uk-active");

                    bar.removeClass("uk-offcanvas-bar-show");
                    $html.css('margin-top', '');
                    window.scrollTo(scrollpos.x, scrollpos.y);
                    bar.trigger('hide.uk.offcanvas', [panel, bar]);

                    // Update ARIA
                    panel.attr('aria-hidden', 'true');
                };

            if (!panel.length) return;

            if (UI.support.transition && !force) {

                $body.one(UI.support.transition.end, function() {
                    finalize();
                }).css((rtl ? "margin-right" : "margin-left"), "");

                setTimeout(function(){
                    bar.removeClass("uk-offcanvas-bar-show");
                }, 0);

            } else {
                finalize();
            }
        },

        _initElement: function(element) {

            if (element.data("OffcanvasInit")) return;

            element.on("click.uk.offcanvas swipeRight.uk.offcanvas swipeLeft.uk.offcanvas", function(e) {

                var target = UI.$(e.target);

                if (!e.type.match(/swipe/)) {

                    if (!target.hasClass("uk-offcanvas-close")) {
                        if (target.hasClass("uk-offcanvas-bar")) return;
                        if (target.parents(".uk-offcanvas-bar:first").length) return;
                    }
                }

                e.stopImmediatePropagation();
                Offcanvas.hide();
            });

            element.on("click", "a[href^='#']", function(e){

                var link = UI.$(this),
                    href = link.attr("href");

                if (href == "#") {
                    return;
                }

                UI.$doc.one('hide.uk.offcanvas', function() {

                    var target;

                    try {
                        target = UI.$(href);
                    } catch (e){
                        target = ""
                    }

                    if (!target.length) {
                        target = UI.$('[name="'+href.replace('#','')+'"]');
                    }

                    if (target.length && link.attr('data-uk-smooth-scroll') && UI.Utils.scrollToElement) {
                        UI.Utils.scrollToElement(target, UI.Utils.options(link.attr('data-uk-smooth-scroll') || '{}'));
                    } else {
                        window.location.href = href;
                    }
                });

                Offcanvas.hide();
            });

            element.data("OffcanvasInit", true);
        }
    };

    UI.component('offcanvasTrigger', {

        boot: function() {

            // init code
            $html.on("click.offcanvas.uikit", "[data-uk-offcanvas]", function(e) {

                e.preventDefault();

                var ele = UI.$(this);

                if (!ele.data("offcanvasTrigger")) {
                    var obj = UI.offcanvasTrigger(ele, UI.Utils.options(ele.attr("data-uk-offcanvas")));
                    ele.trigger("click");
                }
            });

            $html.on('keydown.uk.offcanvas', function(e) {

                if (e.keyCode === 27) { // ESC
                    Offcanvas.hide();
                }
            });
        },

        init: function() {

            var $this = this;

            this.options = UI.$.extend({
                "target": $this.element.is("a") ? $this.element.attr("href") : false
            }, this.options);

            this.on("click", function(e) {
                e.preventDefault();
                Offcanvas.show($this.options.target);
            });
        }
    });

    UI.offcanvas = Offcanvas;

})(UIkit);

(function(UI) {

    "use strict";

    var Animations;

    UI.component('switcher', {

        defaults: {
            connect   : false,
            toggle    : ">*",
            active    : 0,
            animation : false,
            duration  : 200
        },

        animating: false,

        boot: function() {

            // init code
            UI.ready(function(context) {

                UI.$("[data-uk-switcher]", context).each(function() {
                    var switcher = UI.$(this);

                    if (!switcher.data("switcher")) {
                        var obj = UI.switcher(switcher, UI.Utils.options(switcher.attr("data-uk-switcher")));
                    }
                });
            });
        },

        init: function() {

            var $this = this;

            this.on("click.uikit.switcher", this.options.toggle, function(e) {
                e.preventDefault();
                $this.show(this);
            });

            if (this.options.connect) {

                this.connect = UI.$(this.options.connect);

                this.connect.find(".uk-active").removeClass(".uk-active");

                // delegate switch commands within container content
                if (this.connect.length) {

                    // Init ARIA for connect
                    this.connect.children().attr('aria-hidden', 'true');

                    this.connect.on("click", '[data-uk-switcher-item]', function(e) {

                        e.preventDefault();

                        var item = UI.$(this).attr('data-uk-switcher-item');

                        if ($this.index == item) return;

                        switch(item) {
                            case 'next':
                            case 'previous':
                                $this.show($this.index + (item=='next' ? 1:-1));
                                break;
                            default:
                                $this.show(parseInt(item, 10));
                        }
                    }).on('swipeRight swipeLeft', function(e) {
                        e.preventDefault();
                        if(!window.getSelection().toString()) {
                            $this.show($this.index + (e.type == 'swipeLeft' ? 1 : -1));
                        }
                    });
                }

                var toggles = this.find(this.options.toggle),
                    active  = toggles.filter(".uk-active");

                if (active.length) {
                    this.show(active, false);
                } else {

                    if (this.options.active===false) return;

                    active = toggles.eq(this.options.active);
                    this.show(active.length ? active : toggles.eq(0), false);
                }

                // Init ARIA for toggles
                toggles.not(active).attr('aria-expanded', 'false');
                active.attr('aria-expanded', 'true');

                this.on('changed.uk.dom', function() {
                    $this.connect = UI.$($this.options.connect);
                });
            }

        },

        show: function(tab, animate) {

            if (this.animating) {
                return;
            }

            if (isNaN(tab)) {
                tab = UI.$(tab);
            } else {

                var toggles = this.find(this.options.toggle);

                tab = tab < 0 ? toggles.length-1 : tab;
                tab = toggles.eq(toggles[tab] ? tab : 0);
            }

            var $this     = this,
                toggles   = this.find(this.options.toggle),
                active    = UI.$(tab),
                animation = Animations[this.options.animation] || function(current, next) {

                    if (!$this.options.animation) {
                        return Animations.none.apply($this);
                    }

                    var anim = $this.options.animation.split(',');

                    if (anim.length == 1) {
                        anim[1] = anim[0];
                    }

                    anim[0] = anim[0].trim();
                    anim[1] = anim[1].trim();

                    return coreAnimation.apply($this, [anim, current, next]);
                };

            if (animate===false || !UI.support.animation) {
                animation = Animations.none;
            }

            if (active.hasClass("uk-disabled")) return;

            // Update ARIA for Toggles
            toggles.attr('aria-expanded', 'false');
            active.attr('aria-expanded', 'true');

            toggles.filter(".uk-active").removeClass("uk-active");
            active.addClass("uk-active");

            if (this.options.connect && this.connect.length) {

                this.index = this.find(this.options.toggle).index(active);

                if (this.index == -1 ) {
                    this.index = 0;
                }

                this.connect.each(function() {

                    var container = UI.$(this),
                        children  = UI.$(container.children()),
                        current   = UI.$(children.filter('.uk-active')),
                        next      = UI.$(children.eq($this.index));

                        $this.animating = true;

                        animation.apply($this, [current, next]).then(function(){

                            current.removeClass("uk-active");
                            next.addClass("uk-active");

                            // Update ARIA for connect
                            current.attr('aria-hidden', 'true');
                            next.attr('aria-hidden', 'false');

                            UI.Utils.checkDisplay(next, true);

                            $this.animating = false;
                        });
                });
            }

            this.trigger("show.uk.switcher", [active]);
        }
    });

    Animations = {

        'none': function() {
            var d = UI.$.Deferred();
            d.resolve();
            return d.promise();
        },

        'fade': function(current, next) {
            return coreAnimation.apply(this, ['uk-animation-fade', current, next]);
        },

        'slide-bottom': function(current, next) {
            return coreAnimation.apply(this, ['uk-animation-slide-bottom', current, next]);
        },

        'slide-top': function(current, next) {
            return coreAnimation.apply(this, ['uk-animation-slide-top', current, next]);
        },

        'slide-vertical': function(current, next, dir) {

            var anim = ['uk-animation-slide-top', 'uk-animation-slide-bottom'];

            if (current && current.index() > next.index()) {
                anim.reverse();
            }

            return coreAnimation.apply(this, [anim, current, next]);
        },

        'slide-left': function(current, next) {
            return coreAnimation.apply(this, ['uk-animation-slide-left', current, next]);
        },

        'slide-right': function(current, next) {
            return coreAnimation.apply(this, ['uk-animation-slide-right', current, next]);
        },

        'slide-horizontal': function(current, next, dir) {

            var anim = ['uk-animation-slide-right', 'uk-animation-slide-left'];

            if (current && current.index() > next.index()) {
                anim.reverse();
            }

            return coreAnimation.apply(this, [anim, current, next]);
        },

        'scale': function(current, next) {
            return coreAnimation.apply(this, ['uk-animation-scale-up', current, next]);
        }
    };

    UI.switcher.animations = Animations;


    // helpers

    function coreAnimation(cls, current, next) {

        var d = UI.$.Deferred(), clsIn = cls, clsOut = cls, release;

        if (next[0]===current[0]) {
            d.resolve();
            return d.promise();
        }

        if (typeof(cls) == 'object') {
            clsIn  = cls[0];
            clsOut = cls[1] || cls[0];
        }

        release = function() {

            if (current) current.hide().removeClass('uk-active '+clsOut+' uk-animation-reverse');

            next.addClass(clsIn).one(UI.support.animation.end, function() {

                next.removeClass(''+clsIn+'').css({opacity:'', display:''});

                d.resolve();

                if (current) current.css({opacity:'', display:''});

            }.bind(this)).show();
        };

        next.css('animation-duration', this.options.duration+'ms');

        if (current && current.length) {

            current.css('animation-duration', this.options.duration+'ms');

            current.css('display', 'none').addClass(clsOut+' uk-animation-reverse').one(UI.support.animation.end, function() {
                release();
            }.bind(this)).css('display', '');

        } else {
            next.addClass('uk-active');
            release();
        }

        return d.promise();
    }

})(UIkit);

(function(UI) {

    "use strict";

    UI.component('tab', {

        defaults: {
            'target'    : '>li:not(.uk-tab-responsive, .uk-disabled)',
            'connect'   : false,
            'active'    : 0,
            'animation' : false,
            'duration'  : 200
        },

        boot: function() {

            // init code
            UI.ready(function(context) {

                UI.$("[data-uk-tab]", context).each(function() {

                    var tab = UI.$(this);

                    if (!tab.data("tab")) {
                        var obj = UI.tab(tab, UI.Utils.options(tab.attr("data-uk-tab")));
                    }
                });
            });
        },

        init: function() {

            var $this = this;

            this.current = false;

            this.on("click.uikit.tab", this.options.target, function(e) {

                e.preventDefault();

                if ($this.switcher && $this.switcher.animating) {
                    return;
                }

                var current = $this.find($this.options.target).not(this);

                current.removeClass("uk-active").blur();

                $this.trigger("change.uk.tab", [UI.$(this).addClass("uk-active"), $this.current]);

                $this.current = UI.$(this);

                // Update ARIA
                if (!$this.options.connect) {
                    current.attr('aria-expanded', 'false');
                    UI.$(this).attr('aria-expanded', 'true');
                }
            });

            if (this.options.connect) {
                this.connect = UI.$(this.options.connect);
            }

            // init responsive tab
            this.responsivetab = UI.$('<li class="uk-tab-responsive uk-active"><a></a></li>').append('<div class="uk-dropdown uk-dropdown-small"><ul class="uk-nav uk-nav-dropdown"></ul><div>');

            this.responsivetab.dropdown = this.responsivetab.find('.uk-dropdown');
            this.responsivetab.lst      = this.responsivetab.dropdown.find('ul');
            this.responsivetab.caption  = this.responsivetab.find('a:first');

            if (this.element.hasClass("uk-tab-bottom")) this.responsivetab.dropdown.addClass("uk-dropdown-up");

            // handle click
            this.responsivetab.lst.on('click.uikit.tab', 'a', function(e) {

                e.preventDefault();
                e.stopPropagation();

                var link = UI.$(this);

                $this.element.children('li:not(.uk-tab-responsive)').eq(link.data('index')).trigger('click');
            });

            this.on('show.uk.switcher change.uk.tab', function(e, tab) {
                $this.responsivetab.caption.html(tab.text());
            });

            this.element.append(this.responsivetab);

            // init UIkit components
            if (this.options.connect) {
                this.switcher = UI.switcher(this.element, {
                    "toggle"    : ">li:not(.uk-tab-responsive)",
                    "connect"   : this.options.connect,
                    "active"    : this.options.active,
                    "animation" : this.options.animation,
                    "duration"  : this.options.duration
                });
            }

            UI.dropdown(this.responsivetab, {"mode": "click"});

            // init
            $this.trigger("change.uk.tab", [this.element.find(this.options.target).not('.uk-tab-responsive').filter('.uk-active')]);

            this.check();

            UI.$win.on('resize orientationchange', UI.Utils.debounce(function(){
                if ($this.element.is(":visible"))  $this.check();
            }, 100));

            this.on('display.uk.check', function(){
                if ($this.element.is(":visible"))  $this.check();
            });
        },

        check: function() {

            var children = this.element.children('li:not(.uk-tab-responsive)').removeClass('uk-hidden');

            if (!children.length) {
                this.responsivetab.addClass('uk-hidden');
                return;
            }

            var top          = (children.eq(0).offset().top + Math.ceil(children.eq(0).height()/2)),
                doresponsive = false,
                item, link, clone;

            this.responsivetab.lst.empty();

            children.each(function(){

                if (UI.$(this).offset().top > top) {
                    doresponsive = true;
                }
            });

            if (doresponsive) {

                for (var i = 0; i < children.length; i++) {

                    item  = UI.$(children.eq(i));
                    link  = item.find('a');

                    if (item.css('float') != 'none' && !item.attr('uk-dropdown')) {

                        if (!item.hasClass('uk-disabled')) {

                            clone = item[0].outerHTML.replace('<a ', '<a data-index="'+i+'" ');

                            this.responsivetab.lst.append(clone);
                        }

                        item.addClass('uk-hidden');
                    }
                }
            }

            this.responsivetab[this.responsivetab.lst.children('li').length ? 'removeClass':'addClass']('uk-hidden');
        }
    });

})(UIkit);

(function(UI){

    "use strict";

    UI.component('cover', {

        defaults: {
            automute : true
        },

        boot: function() {

            // auto init
            UI.ready(function(context) {

                UI.$("[data-uk-cover]", context).each(function(){

                    var ele = UI.$(this);

                    if(!ele.data("cover")) {
                        var plugin = UI.cover(ele, UI.Utils.options(ele.attr("data-uk-cover")));
                    }
                });
            });
        },

        init: function() {

            this.parent = this.element.parent();

            UI.$win.on('load resize orientationchange', UI.Utils.debounce(function(){
                this.check();
            }.bind(this), 100));

            this.on("display.uk.check", function(e) {
                if(this.element.is(":visible")) this.check();
            }.bind(this));

            this.check();

            if (this.element.is('iframe') && this.options.automute) {

                var src = this.element.attr('src');

                this.element.attr('src', '').on('load', function(){

                    this.contentWindow.postMessage('{ "event": "command", "func": "mute", "method":"setVolume", "value":0}', '*');

                }).attr('src', [src, (src.indexOf('?') > -1 ? '&':'?'), 'enablejsapi=1&api=1'].join(''));
            }
        },

        check: function() {

            this.element.css({
                'width'  : '',
                'height' : ''
            });

            this.dimension = {w: this.element.width(), h: this.element.height()};

            if (this.element.attr('width') && !isNaN(this.element.attr('width'))) {
                this.dimension.w = this.element.attr('width');
            }

            if (this.element.attr('height') && !isNaN(this.element.attr('height'))) {
                this.dimension.h = this.element.attr('height');
            }

            this.ratio     = this.dimension.w / this.dimension.h;

            var w = this.parent.width(), h = this.parent.height(), width, height;

            // if element height < parent height (gap underneath)
            if ((w / this.ratio) < h) {

                width  = Math.ceil(h * this.ratio);
                height = h;

            // element width < parent width (gap to right)
            } else {

                width  = w;
                height = Math.ceil(w / this.ratio);
            }

            this.element.css({
                'width'  : width,
                'height' : height
            });
        }
    });

})(UIkit);

/*! UIkit 2.21.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
(function(addon) {
    var component;

    if (window.UIkit) {
        component = addon(UIkit);
    }

    if (typeof define == "function" && define.amd) {
        define("uikit-accordion", ["uikit"], function(){
            return component || addon(UIkit);
        });
    }
})(function(UI){

    "use strict";

    UI.component('accordion', {

        defaults: {
            showfirst  : true,
            collapse   : true,
            animate    : true,
            easing     : 'swing',
            duration   : 300,
            toggle     : '.uk-accordion-title',
            containers : '.uk-accordion-content',
            clsactive  : 'uk-active'
        },

        boot:  function() {

            // init code
            UI.ready(function(context) {

                setTimeout(function(){

                    UI.$("[data-uk-accordion]", context).each(function(){

                        var ele = UI.$(this);

                        if(!ele.data("accordion")) {
                            UI.accordion(ele, UI.Utils.options(ele.attr('data-uk-accordion')));
                        }
                    });

                }, 0);
            });
        },

        init: function() {

            var $this = this;

            this.element.on('click.uikit.accordion', this.options.toggle, function(e) {

                e.preventDefault();

                $this.toggleItem(UI.$(this).data('wrapper'), $this.options.animate, $this.options.collapse);
            });

            this.update();

            if (this.options.showfirst) {
                this.toggleItem(this.toggle.eq(0).data('wrapper'), false, false);
            }
        },

        toggleItem: function(wrapper, animated, collapse) {

            var $this = this;

            wrapper.data('toggle').toggleClass(this.options.clsactive);

            var active = wrapper.data('toggle').hasClass(this.options.clsactive);

            if (collapse) {
                this.toggle.not(wrapper.data('toggle')).removeClass(this.options.clsactive);
                this.content.not(wrapper.data('content')).parent().stop().css('overflow', 'hidden').animate({ height: 0 }, {easing: this.options.easing, duration: animated ? this.options.duration : 0}).attr('aria-expanded', 'false');
            }

            wrapper.stop().css('overflow', 'hidden');

            if (animated) {

                wrapper.animate({ height: active ? getHeight(wrapper.data('content')) : 0 }, {easing: this.options.easing, duration: this.options.duration, complete: function() {

                    if (active) {
                        wrapper.css({'overflow': '', 'height': 'auto'});
                        UI.Utils.checkDisplay(wrapper.data('content'));
                    }

                    $this.trigger('display.uk.check');
                }});

            } else {

                wrapper.height(active ? 'auto' : 0);

                if (active) {
                    wrapper.css({'overflow': ''});
                    UI.Utils.checkDisplay(wrapper.data('content'));
                }

                this.trigger('display.uk.check');
            }

            // Update ARIA
            wrapper.attr('aria-expanded', active);

            this.element.trigger('toggle.uk.accordion', [active, wrapper.data('toggle'), wrapper.data('content')]);
        },

        update: function() {

            var $this = this, $content, $wrapper, $toggle;

            this.toggle = this.find(this.options.toggle);
            this.content = this.find(this.options.containers);

            this.content.each(function(index) {

                $content = UI.$(this);

                if ($content.parent().data('wrapper')) {
                    $wrapper = $content.parent();
                } else {
                    $wrapper = UI.$(this).wrap('<div data-wrapper="true" style="overflow:hidden;height:0;position:relative;"></div>').parent();

                    // Init ARIA
                    $wrapper.attr('aria-expanded', 'false');
                }

                $toggle = $this.toggle.eq(index);

                $wrapper.data('toggle', $toggle);
                $wrapper.data('content', $content);
                $toggle.data('wrapper', $wrapper);
                $content.data('wrapper', $wrapper);
            });

            this.element.trigger('update.uk.accordion', [this]);
        }

    });

    // helper

    function getHeight(ele) {

        var $ele = UI.$(ele), height = "auto";

        if ($ele.is(":visible")) {
            height = $ele.outerHeight();
        } else {

            var tmp = {
                position   : $ele.css("position"),
                visibility : $ele.css("visibility"),
                display    : $ele.css("display")
            };

            height = $ele.css({position: 'absolute', visibility: 'hidden', display: 'block'}).outerHeight();

            $ele.css(tmp); // reset element
        }

        return height;
    }

    return UI.accordion;
});

/*! UIkit 2.21.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
(function(addon) {

    var component;

    if (window.UIkit) {
        component = addon(UIkit);
    }

    if (typeof define == "function" && define.amd) {
        define("uikit-autocomplete", ["uikit"], function(){
            return component || addon(UIkit);
        });
    }

})(function(UI){

    "use strict";

    var active;

    UI.component('autocomplete', {

        defaults: {
            minLength: 3,
            param: 'search',
            method: 'post',
            delay: 300,
            loadingClass: 'uk-loading',
            flipDropdown: false,
            skipClass: 'uk-skip',
            hoverClass: 'uk-active',
            source: null,
            renderer: null,

            // template

            template: '<ul class="uk-nav uk-nav-autocomplete uk-autocomplete-results">{{~items}}<li data-value="{{$item.value}}"><a>{{$item.value}}</a></li>{{/items}}</ul>'
        },

        visible  : false,
        value    : null,
        selected : null,

        boot: function() {

            // init code
            UI.$html.on("focus.autocomplete.uikit", "[data-uk-autocomplete]", function(e) {

                var ele = UI.$(this);

                if (!ele.data("autocomplete")) {
                    var obj = UI.autocomplete(ele, UI.Utils.options(ele.attr("data-uk-autocomplete")));
                }
            });

            // register outer click for autocompletes
            UI.$html.on("click.autocomplete.uikit", function(e) {
                if (active && e.target!=active.input[0]) active.hide();
            });
        },

        init: function() {

            var $this   = this,
                select  = false,
                trigger = UI.Utils.debounce(function(e) {
                    if(select) {
                        return (select = false);
                    }
                    $this.handle();
                }, this.options.delay);


            this.dropdown = this.find('.uk-dropdown');
            this.template = this.find('script[type="text/autocomplete"]').html();
            this.template = UI.Utils.template(this.template || this.options.template);
            this.input    = this.find("input:first").attr("autocomplete", "off");

            if (!this.dropdown.length) {
               this.dropdown = UI.$('<div class="uk-dropdown"></div>').appendTo(this.element);
            }

            if (this.options.flipDropdown) {
                this.dropdown.addClass('uk-dropdown-flip');
            }

            this.dropdown.attr('aria-expanded', 'false');

            this.input.on({
                "keydown": function(e) {

                    if (e && e.which && !e.shiftKey) {

                        switch (e.which) {
                            case 13: // enter
                                select = true;

                                if ($this.selected) {
                                    e.preventDefault();
                                    $this.select();
                                }
                                break;
                            case 38: // up
                                e.preventDefault();
                                $this.pick('prev', true);
                                break;
                            case 40: // down
                                e.preventDefault();
                                $this.pick('next', true);
                                break;
                            case 27:
                            case 9: // esc, tab
                                $this.hide();
                                break;
                            default:
                                break;
                        }
                    }

                },
                "keyup": trigger
            });

            this.dropdown.on("click", ".uk-autocomplete-results > *", function(){
                $this.select();
            });

            this.dropdown.on("mouseover", ".uk-autocomplete-results > *", function(){
                $this.pick(UI.$(this));
            });

            this.triggercomplete = trigger;
        },

        handle: function() {

            var $this = this, old = this.value;

            this.value = this.input.val();

            if (this.value.length < this.options.minLength) return this.hide();

            if (this.value != old) {
                $this.request();
            }

            return this;
        },

        pick: function(item, scrollinview) {

            var $this    = this,
                items    = UI.$(this.dropdown.find('.uk-autocomplete-results').children(':not(.'+this.options.skipClass+')')),
                selected = false;

            if (typeof item !== "string" && !item.hasClass(this.options.skipClass)) {
                selected = item;
            } else if (item == 'next' || item == 'prev') {

                if (this.selected) {
                    var index = items.index(this.selected);

                    if (item == 'next') {
                        selected = items.eq(index + 1 < items.length ? index + 1 : 0);
                    } else {
                        selected = items.eq(index - 1 < 0 ? items.length - 1 : index - 1);
                    }

                } else {
                    selected = items[(item == 'next') ? 'first' : 'last']();
                }

                selected = UI.$(selected);
            }

            if (selected && selected.length) {
                this.selected = selected;
                items.removeClass(this.options.hoverClass);
                this.selected.addClass(this.options.hoverClass);

                // jump to selected if not in view
                if (scrollinview) {

                    var top       = selected.position().top,
                        scrollTop = $this.dropdown.scrollTop(),
                        dpheight  = $this.dropdown.height();

                    if (top > dpheight ||  top < 0) {
                        $this.dropdown.scrollTop(scrollTop + top);
                    }
                }
            }
        },

        select: function() {

            if(!this.selected) return;

            var data = this.selected.data();

            this.trigger("selectitem.uk.autocomplete", [data, this]);

            if (data.value) {
                this.input.val(data.value).trigger('change');
            }

            this.hide();
        },

        show: function() {
            if (this.visible) return;
            this.visible = true;
            this.element.addClass("uk-open");

            if (active && active!==this) {
                active.hide();
            }

            active = this;

            // Update aria
            this.dropdown.attr('aria-expanded', 'true');

            return this;
        },

        hide: function() {
            if (!this.visible) return;
            this.visible = false;
            this.element.removeClass("uk-open");

            if (active === this) {
                active = false;
            }

            // Update aria
            this.dropdown.attr('aria-expanded', 'false');

            return this;
        },

        request: function() {

            var $this   = this,
                release = function(data) {

                    if(data) {
                        $this.render(data);
                    }

                    $this.element.removeClass($this.options.loadingClass);
                };

            this.element.addClass(this.options.loadingClass);

            if (this.options.source) {

                var source = this.options.source;

                switch(typeof(this.options.source)) {
                    case 'function':

                        this.options.source.apply(this, [release]);

                        break;

                    case 'object':

                        if(source.length) {

                            var items = [];

                            source.forEach(function(item){
                                if(item.value && item.value.toLowerCase().indexOf($this.value.toLowerCase())!=-1) {
                                    items.push(item);
                                }
                            });

                            release(items);
                        }

                        break;

                    case 'string':

                        var params ={};

                        params[this.options.param] = this.value;

                        UI.$.ajax({
                            url: this.options.source,
                            data: params,
                            type: this.options.method,
                            dataType: 'json'
                        }).done(function(json) {
                            release(json || []);
                        });

                        break;

                    default:
                        release(null);
                }

            } else {
                this.element.removeClass($this.options.loadingClass);
            }
        },

        render: function(data) {

            var $this = this;

            this.dropdown.empty();

            this.selected = false;

            if (this.options.renderer) {

                this.options.renderer.apply(this, [data]);

            } else if(data && data.length) {

                this.dropdown.append(this.template({"items":data}));
                this.show();

                this.trigger('show.uk.autocomplete');
            }

            return this;
        }
    });

    return UI.autocomplete;
});

/*! UIkit 2.21 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
// removed moment_js from core
// customized by tzd

(function(addon) {

    var component;

    if (window.UIkit) {
        component = addon(UIkit);
    }

    if (typeof define == "function" && define.amd) {
        define("uikit-datepicker", ["uikit"], function(){
            return component || addon(UIkit);
        });
    }

})(function(UI){

    "use strict";

    // Datepicker

    var active = false, dropdown;

    UI.component('datepicker', {

        defaults: {
            mobile: false,
            weekstart: 1,
            i18n: {
                months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
                weekdays      : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
            },
            format: "DD.MM.YYYY",
            offsettop: 5,
            maxDate: false,
            minDate: false,
            pos: 'auto',
            addClass: false,
            template: function(data, opts) {

                var content = '', maxDate, minDate, i;

                if (opts.maxDate!==false){
                    maxDate = isNaN(opts.maxDate) ? moment(opts.maxDate, opts.format) : moment().add(opts.maxDate, 'days');
                }

                if (opts.minDate!==false){
                    minDate = isNaN(opts.minDate) ? moment(opts.minDate, opts.format) : moment().add(opts.minDate-1, 'days');
                }

                content += '<div class="uk-datepicker-nav uk-clearfix">';
                content += '<a href="" class="uk-datepicker-previous"></a>';
                content += '<a href="" class="uk-datepicker-next"></a>';

                if (UI.formSelect) {

                    var currentyear = (new Date()).getFullYear(), options = [], months, years, minYear, maxYear;

                    for (i=0;i<opts.i18n.months.length;i++) {
                        if(i==data.month) {
                            options.push('<option value="'+i+'" selected>'+opts.i18n.months[i]+'</option>');
                        } else {
                            options.push('<option value="'+i+'">'+opts.i18n.months[i]+'</option>');
                        }
                    }

                    months = '<span class="uk-form-select">'+ opts.i18n.months[data.month] + '<select class="update-picker-month">'+options.join('')+'</select></span>';

                    // --

                    options = [];

                    minYear = minDate ? minDate.year() : currentyear - 50;
                    maxYear = maxDate ? maxDate.year() : currentyear + 20;

                    for (i=minYear;i<=maxYear;i++) {
                        if (i == data.year) {
                            options.push('<option value="'+i+'" selected>'+i+'</option>');
                        } else {
                            options.push('<option value="'+i+'">'+i+'</option>');
                        }
                    }

                    years  = '<span class="uk-form-select">'+ data.year + '<select class="update-picker-year">'+options.join('')+'</select></span>';

                    content += '<div class="uk-datepicker-heading">'+ months + ' ' + years +'</div>';

                } else {
                    content += '<div class="uk-datepicker-heading">'+ opts.i18n.months[data.month] +' '+ data.year+'</div>';
                }

                content += '</div>';

                content += '<table class="uk-datepicker-table">';
                content += '<thead>';
                for(i = 0; i < data.weekdays.length; i++) {
                    if (data.weekdays[i]) {
                        content += '<th>'+data.weekdays[i]+'</th>';
                    }
                }
                content += '</thead>';

                content += '<tbody>';
                for(i = 0; i < data.days.length; i++) {
                    if (data.days[i] && data.days[i].length){
                        content += '<tr>';
                        for(var d = 0; d < data.days[i].length; d++) {
                            if (data.days[i][d]) {
                                var day = data.days[i][d],
                                    cls = [];

                                if(!day.inmonth) cls.push("uk-datepicker-table-muted");
                                if(day.selected) cls.push("uk-active");

                                if (maxDate && day.day > maxDate) cls.push('uk-datepicker-date-disabled uk-datepicker-table-muted');
                                if (minDate && minDate > day.day) cls.push('uk-datepicker-date-disabled uk-datepicker-table-muted');

                                content += '<td><a href="" class="'+cls.join(" ")+'" data-date="'+day.day.format()+'">'+day.day.format("D")+'</a></td>';
                            }
                        }
                        content += '</tr>';
                    }
                }
                content += '</tbody>';

                content += '</table>';

                return content;
            }
        },

        boot: function() {

            UI.$win.on("resize orientationchange", function() {

                if (active) {
                    active.hide();
                }
            });

            // init code
            UI.$html.on("focus.datepicker.uikit", "[data-uk-datepicker]", function(e) {

                var ele = UI.$(this);

                if (!ele.data("datepicker")) {
                    e.preventDefault();
                    var obj = UI.datepicker(ele, UI.Utils.options(ele.attr("data-uk-datepicker")));
                    ele.trigger("focus");
                }
            });

            UI.$html.on("click.datepicker.uikit", function(e) {

                var target = UI.$(e.target);

                if (active && target[0] != dropdown[0] && !target.data("datepicker") && !target.parents(".uk-datepicker:first").length) {
                    active.hide();
                }
            });
        },

        init: function() {

            // use native datepicker on touch devices
            if (UI.support.touch && !this.options.mobile) {
                this.element.attr('type','date');
            }
            if (UI.support.touch && this.element.attr('type')=='date' && !this.options.mobile) {
                return;
            }

            var $this = this;

            this.current  = this.element.val() ? moment(this.element.val(), this.options.format) : moment();

            this.on("click focus", function(){
                if (active!==$this) $this.pick(this.value ? this.value:($this.options.minDate ? $this.options.minDate :''));
            }).on("change", function(){
                if ($this.element.val() && !moment($this.element.val(), $this.options.format).isValid()) {
                    $this.element.val(moment().format($this.options.format));
                }
            });

            // init dropdown
            if (!dropdown) {

                dropdown = UI.$('<div class="uk-dropdown uk-datepicker"></div>');

                if(this.options.addClass) {
                    dropdown.addClass(this.options.addClass)
                }

                dropdown.on("click", ".uk-datepicker-next, .uk-datepicker-previous, [data-date]", function(e){

                    e.stopPropagation();
                    e.preventDefault();

                    var ele = UI.$(this);

                    if (ele.hasClass('uk-datepicker-date-disabled')) return false;

                    if (ele.is('[data-date]')) {
                        active.element.val(moment(ele.data("date")).format(active.options.format)).trigger("change");
                        dropdown
                            .removeClass('uk-dropdown-shown');
                        setTimeout(function() {
                            dropdown
                                .removeClass('uk-dropdown-active')
                        },280);
                        active = false;
                    } else {
                        active.add(1 * (ele.hasClass("uk-datepicker-next") ? 1:-1), "months");
                    }
                });

                dropdown.on('change', '.update-picker-month, .update-picker-year', function(){

                    var select = UI.$(this);
                    active[select.is('.update-picker-year') ? 'setYear':'setMonth'](Number(select.val()));
                });

                $page_content.append(dropdown);

            }
        },

        pick: function(initdate) {

            var offset = this.element.offset(),
                offset_left = offset.left - parseInt($page_content.css('margin-left')),
                offset_top = offset.top + $page_content.scrollTop() - $page_content.position().top,
                css = {
                    'left': offset_left,
                    'right': ""
                };

            this.current  = initdate ? moment(initdate, this.options.format):moment();
            this.initdate = this.current.format("YYYY-MM-DD");

            this.update();

            if (UI.langdirection == 'right') {
                css.right = window.innerWidth - (css.left + this.element.outerWidth());
                css.left  = "";
            }

            var posTop    = (offset_top - this.element.outerHeight() + this.element.height()) - this.options.offsettop - dropdown.outerHeight(),
                posBottom = offset_top + this.element.outerHeight() + this.options.offsettop;

            css.top = posBottom;

            if (this.options.pos == 'top') {
                css.top = posTop;
                dropdown.addClass('uk-dropdown-up');
            } else if(this.options.pos == 'auto' && (($page_content.innerHeight() + $page_content.scrollTop()) - posBottom - dropdown.outerHeight() < 0 && posTop >= 0) ) {
                css.top = posTop;
                dropdown.addClass('uk-dropdown-up');
            }

            css.minWidth = dropdown.actual('outerWidth');

            dropdown.css(css).addClass('uk-dropdown-active uk-dropdown-shown');

            this.trigger('show.uk.datepicker');

            active = this;
        },

        add: function(unit, value) {
            this.current.add(unit, value);
            this.update();
        },

        setMonth: function(month) {
            this.current.month(month);
            this.update();
        },

        setYear: function(year) {
            this.current.year(year);
            this.update();
        },

        update: function() {

            var data = this.getRows(this.current.year(), this.current.month()),
                tpl  = this.options.template(data, this.options);

            dropdown.html(tpl);

            this.trigger('update.uk.datepicker');
        },

        getRows: function(year, month) {

            var opts   = this.options,
                now    = moment().format('YYYY-MM-DD'),
                days   = [31, (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month],
                before = new Date(year, month, 1).getDay(),
                data   = {"month":month, "year":year,"weekdays":[],"days":[]},
                row    = [];

            data.weekdays = (function(){

                for (var i=0, arr=[]; i < 7; i++) {

                    var day = i + (opts.weekstart || 0);

                    while (day >= 7) {
                        day -= 7;
                    }

                    arr.push(opts.i18n.weekdays[day]);
                }

                return arr;
            })();

            if (opts.weekstart && opts.weekstart > 0) {
                before -= opts.weekstart;
                if (before < 0) {
                    before += 7;
                }
            }

            var cells = days + before, after = cells;

            while(after > 7) { after -= 7; }

            cells += 7 - after;

            var day, isDisabled, isSelected, isToday, isInMonth;

            for (var i = 0, r = 0; i < cells; i++) {

                day        = new Date(year, month, 1 + (i - before));
                isDisabled = (opts.mindate && day < opts.mindate) || (opts.maxdate && day > opts.maxdate);
                isInMonth  = !(i < before || i >= (days + before));

                day = moment(day);

                isSelected = this.initdate == day.format("YYYY-MM-DD");
                isToday    = now == day.format("YYYY-MM-DD");

                row.push({"selected": isSelected, "today": isToday, "disabled": isDisabled, "day":day, "inmonth":isInMonth});

                if (++r === 7) {
                    data.days.push(row);
                    row = [];
                    r = 0;
                }
            }

            return data;
        },

        hide: function() {

            if (active && active === this) {
                dropdown.removeClass('uk-dropdown-shown');
                setTimeout(function() {
                    dropdown.removeClass('uk-dropdown-active uk-dropdown-up')
                },280);

                active = false;

                this.trigger('hide.uk.datepicker');
            }
        }
    });

    UI.Utils.moment = moment();

    return UI.datepicker;
});
/*! UIkit 2.21.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
(function(addon) {

    var component;

    if (window.UIkit) {
        component = addon(UIkit);
    }

    if (typeof define == "function" && define.amd) {
        define("uikit-form-password", ["uikit"], function(){
            return component || addon(UIkit);
        });
    }

})(function(UI){

    "use strict";

    UI.component('formPassword', {

        defaults: {
            "lblShow": "Show",
            "lblHide": "Hide"
        },

        boot: function() {
            // init code
            UI.$html.on("click.formpassword.uikit", "[data-uk-form-password]", function(e) {

                var ele = UI.$(this);

                if (!ele.data("formPassword")) {

                    e.preventDefault();

                    var obj = UI.formPassword(ele, UI.Utils.options(ele.attr("data-uk-form-password")));
                    ele.trigger("click");
                }
            });
        },

        init: function() {

            var $this = this;

            this.on("click", function(e) {

                e.preventDefault();

                if($this.input.length) {
                    var type = $this.input.attr("type");
                    $this.input.attr("type", type=="text" ? "password":"text");
                    $this.element.text($this.options[type=="text" ? "lblShow":"lblHide"]);
                }
            });

            this.input = this.element.next("input").length ? this.element.next("input") : this.element.prev("input");
            this.element.text(this.options[this.input.is("[type='password']") ? "lblShow":"lblHide"]);

            this.element.data("formPassword", this);
        }
    });

    return UI.formPassword;
});

/*! UIkit 2.21.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
(function(addon) {

    var component;

    if (window.UIkit) {
        component = addon(UIkit);
    }

    if (typeof define == "function" && define.amd) {
        define("uikit-form-select", ["uikit"], function(){
            return component || addon(UIkit);
        });
    }

})(function(UI){

    "use strict";

    UI.component('formSelect', {

        defaults: {
            'target': '>span:first',
            'activeClass': 'uk-active'
        },

        boot: function() {
            // init code
            UI.ready(function(context) {

                UI.$("[data-uk-form-select]", context).each(function(){

                    var ele = UI.$(this);

                    if (!ele.data("formSelect")) {
                        var obj = UI.formSelect(ele, UI.Utils.options(ele.attr("data-uk-form-select")));
                    }
                });
            });
        },

        init: function() {
            var $this = this;

            this.target  = this.find(this.options.target);
            this.select  = this.find('select');

            // init + on change event
            this.select.on("change", (function(){

                var select = $this.select[0], fn = function(){

                    try {
                        $this.target.text(select.options[select.selectedIndex].text);
                    } catch(e) {}

                    $this.element[$this.select.val() ? 'addClass':'removeClass']($this.options.activeClass);

                    return fn;
                };

                return fn();
            })());

            this.element.data("formSelect", this);
        }
    });

    return UI.formSelect;
});

/*! UIkit 2.21.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
(function(addon) {

    var component;

    if (window.UIkit) {
        component = addon(UIkit);
    }

    if (typeof define == "function" && define.amd) {
        define("uikit-grid", ["uikit"], function(){
            return component || addon(UIkit);
        });
    }

})(function(UI){

    "use strict";

    UI.component('grid', {

        defaults: {
            colwidth  : 'auto',
            animation : true,
            duration  : 300,
            gutter    : 0,
            controls  : false,
            filter    : false
        },

        boot:  function() {

            // init code
            UI.ready(function(context) {

                UI.$('[data-uk-grid]', context).each(function(){

                    var ele = UI.$(this);

                    if(!ele.data("grid")) {
                        var plugin = UI.grid(ele, UI.Utils.options(ele.attr('data-uk-grid')));
                    }
                });
            });
        },

        init: function() {

            var $this = this, gutter = String(this.options.gutter).trim().split(' ');

            this.gutterv  = parseInt(gutter[0], 10);
            this.gutterh  = parseInt((gutter[1] || gutter[0]), 10);

            // make sure parent element has the right position property
            this.element.css({'position': 'relative'});

            this.controls = null;

            if (this.options.controls) {

                this.controls = UI.$(this.options.controls);

                // filter
                this.controls.on('click', '[data-uk-filter]', function(e){
                    e.preventDefault();
                    $this.filter(UI.$(this).data('ukFilter'));
                });

                // sort
                this.controls.on('click', '[data-uk-sort]', function(e){
                    e.preventDefault();
                    var cmd = UI.$(this).attr('data-uk-sort').split(':');
                    $this.sort(cmd[0], cmd[1]);
                });
            }

            UI.$win.on('load resize orientationchange', UI.Utils.debounce(function(){

                if ($this.currentfilter) {
                    $this.filter($this.currentfilter);
                } else {
                    this.updateLayout();
                }

            }.bind(this), 100));

            this.on('display.uk.check', function(){
                if ($this.element.is(":visible"))  $this.updateLayout();
            });

            UI.$html.on("changed.uk.dom", function(e) {
                $this.updateLayout();
            });

            if (this.options.filter !== false) {
                this.filter(this.options.filter);
            } else {
                this.updateLayout();
            }
        },

        _prepareElements: function() {

            var children = this.element.children(':not([data-grid-prepared])'), css;

            // exit if no already prepared elements found
            if (!children.length) {
                return;
            }

            css = {
                'position'   : 'absolute',
                'box-sizing' : 'border-box',
                'width'      : this.options.colwidth == 'auto' ? '' : this.options.colwidth
            };

            if (this.options.gutter) {

                css['padding-left']   = this.gutterh;
                css['padding-bottom'] = this.gutterv;

                this.element.css('margin-left', this.gutterh * -1);
            }

            children.attr('data-grid-prepared', 'true').css(css);
        },

        updateLayout: function(elements) {

            this._prepareElements();

            elements = elements || this.element.children(':visible');

            var $this     = this,
                children  = elements,
                maxwidth  = this.element.width() + (2*this.gutterh) + 2,
                left      = 0,
                top       = 0,
                positions = [],

                item, width, height, pos, aX, aY, i, z, max, size;

            this.trigger('beforeupdate.uk.grid', [children]);

            children.each(function(index){

                size   = getElementSize(this);

                item   = UI.$(this);
                width  = size.outerWidth;
                height = size.outerHeight;
                left   = 0;
                top    = 0;

                for (i=0,max=positions.length;i<max;i++) {

                    pos = positions[i];

                    if (left <= pos.aX) { left = pos.aX; }
                    if (maxwidth < (left + width)) { left = 0; }
                    if (top <= pos.aY) { top = pos.aY; }
                }

                positions.push({
                    "ele"    : item,
                    "top"    : top,
                    "left"   : left,
                    "width"  : width,
                    "height" : height,
                    "aY"     : (top  + height),
                    "aX"     : (left + width)
                });
            });

            var posPrev, maxHeight = 0;

            // fix top
            for (i=0,max=positions.length;i<max;i++) {

                pos = positions[i];
                top = 0;

                for (z=0;z<i;z++) {

                    posPrev = positions[z];

                    // (posPrev.left + 1) fixex 1px bug when using % based widths
                    if (pos.left < posPrev.aX && (posPrev.left +1) < pos.aX) {
                        top = posPrev.aY;
                    }
                }

                pos.top = top;
                pos.aY  = top + pos.height;

                maxHeight = Math.max(maxHeight, pos.aY);
            }

            maxHeight = maxHeight - this.gutterv;

            if (this.options.animation) {

                this.element.stop().animate({'height': maxHeight}, 100);

                positions.forEach(function(pos){
                    pos.ele.stop().animate({"top": pos.top, "left": pos.left, opacity: 1}, this.options.duration);
                }.bind(this));

            } else {

                this.element.css('height', maxHeight);

                positions.forEach(function(pos){
                    pos.ele.css({"top": pos.top, "left": pos.left, opacity: 1});
                }.bind(this));
            }

            // make sure to trigger possible scrollpies etc.
            setTimeout(function() {
                UI.$doc.trigger('scrolling.uk.document');
            }, 2 * this.options.duration * (this.options.animation ? 1:0));

            this.trigger('afterupdate.uk.grid', [children]);
        },

        filter: function(filter) {

            this.currentfilter = filter;

            filter = filter || [];

            if (typeof(filter) === 'string') {
                filter = filter.split(/,/).map(function(item){ return item.trim(); });
            }

            var $this = this, children = this.element.children(), elements = {"visible": [], "hidden": []}, visible, hidden;

            children.each(function(index){

                var ele = UI.$(this), f = ele.attr('data-uk-filter'), infilter = filter.length ? false : true;

                if (f) {

                    f = f.split(/,/).map(function(item){ return item.trim(); });

                    filter.forEach(function(item){
                        if (f.indexOf(item) > -1) infilter = true;
                    });
                }

                elements[infilter ? "visible":"hidden"].push(ele);
            });

            // convert to jQuery collections
            elements.hidden  = UI.$(elements.hidden).map(function () {return this[0];});
            elements.visible = UI.$(elements.visible).map(function () {return this[0];});

            elements.hidden.attr('aria-hidden', 'true').filter(':visible').fadeOut(this.options.duration);
            elements.visible.attr('aria-hidden', 'false').filter(':hidden').css('opacity', 0).show();

            $this.updateLayout(elements.visible);

            if (this.controls && this.controls.length) {
                this.controls.find('[data-uk-filter]').removeClass('uk-active').filter('[data-uk-filter="'+filter+'"]').addClass('uk-active');
            }
        },

        sort: function(by, order){

            order = order || 1;

            // covert from string (asc|desc) to number
            if (typeof(order) === 'string') {
                order = order.toLowerCase() == 'desc' ? -1 : 1;
            }

            var elements = this.element.children();

            elements.sort(function(a, b){

                a = UI.$(a);
                b = UI.$(b);

                return (b.data(by) || '') < (a.data(by) || '') ? order : (order*-1);

            }).appendTo(this.element);

            this.updateLayout(elements.filter(':visible'));

            if (this.controls && this.controls.length) {
                this.controls.find('[data-uk-sort]').removeClass('uk-active').filter('[data-uk-sort="'+by+':'+(order == -1 ? 'desc':'asc')+'"]').addClass('uk-active');
            }
        }
    });


    /*!
    * getSize v1.2.2
    * measure size of elements
    * MIT license
    * https://github.com/desandro/get-size
    */
    var _getSize = (function(){

        var prefixes = 'Webkit Moz ms Ms O'.split(' ');
        var docElemStyle = document.documentElement.style;

        function getStyleProperty( propName ) {
            if ( !propName ) {
                return;
            }

            // test standard property first
            if ( typeof docElemStyle[ propName ] === 'string' ) {
                return propName;
            }

            // capitalize
            propName = propName.charAt(0).toUpperCase() + propName.slice(1);

            // test vendor specific properties
            var prefixed;
            for ( var i=0, len = prefixes.length; i < len; i++ ) {
                prefixed = prefixes[i] + propName;
                if ( typeof docElemStyle[ prefixed ] === 'string' ) {
                    return prefixed;
                }
            }
        }

        // -------------------------- helpers -------------------------- //

        // get a number from a string, not a percentage
        function getStyleSize( value ) {
            var num = parseFloat( value );
            // not a percent like '100%', and a number
            var isValid = value.indexOf('%') === -1 && !isNaN( num );
            return isValid && num;
        }

        function noop() {}

        var logError = typeof console === 'undefined' ? noop : function( message ) {
            console.error( message );
        };

        // -------------------------- measurements -------------------------- //

        var measurements = [
            'paddingLeft',
            'paddingRight',
            'paddingTop',
            'paddingBottom',
            'marginLeft',
            'marginRight',
            'marginTop',
            'marginBottom',
            'borderLeftWidth',
            'borderRightWidth',
            'borderTopWidth',
            'borderBottomWidth'
        ];

        function getZeroSize() {
            var size = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            };
            for ( var i=0, len = measurements.length; i < len; i++ ) {
                var measurement = measurements[i];
                size[ measurement ] = 0;
            }
            return size;
        }


        // -------------------------- setup -------------------------- //

        var isSetup = false;
        var getStyle, boxSizingProp, isBoxSizeOuter;

        /**
        * setup vars and functions
        * do it on initial getSize(), rather than on script load
        * For Firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=548397
        */
        function setup() {
            // setup once
            if ( isSetup ) {
                return;
            }
            isSetup = true;

            var getComputedStyle = window.getComputedStyle;
            getStyle = ( function() {
                var getStyleFn = getComputedStyle ?
                function( elem ) {
                    return getComputedStyle( elem, null );
                } :
                function( elem ) {
                    return elem.currentStyle;
                };

                return function getStyle( elem ) {
                    var style = getStyleFn( elem );
                    if ( !style ) {
                        logError( 'Style returned ' + style +
                        '. Are you running this code in a hidden iframe on Firefox? ' +
                        'See http://bit.ly/getsizebug1' );
                    }
                    return style;
                };
            })();

            // -------------------------- box sizing -------------------------- //

            boxSizingProp = getStyleProperty('boxSizing');

            /**
            * WebKit measures the outer-width on style.width on border-box elems
            * IE & Firefox measures the inner-width
            */
            if ( boxSizingProp ) {
                var div = document.createElement('div');
                div.style.width = '200px';
                div.style.padding = '1px 2px 3px 4px';
                div.style.borderStyle = 'solid';
                div.style.borderWidth = '1px 2px 3px 4px';
                div.style[ boxSizingProp ] = 'border-box';

                var body = document.body || document.documentElement;
                body.appendChild( div );
                var style = getStyle( div );

                isBoxSizeOuter = getStyleSize( style.width ) === 200;
                body.removeChild( div );
            }

        }

        // -------------------------- getSize -------------------------- //

        function getSize( elem ) {
            setup();

            // use querySeletor if elem is string
            if ( typeof elem === 'string' ) {
                elem = document.querySelector( elem );
            }

            // do not proceed on non-objects
            if ( !elem || typeof elem !== 'object' || !elem.nodeType ) {
                return;
            }

            var style = getStyle( elem );

            // if hidden, everything is 0
            if ( style.display === 'none' ) {
                return getZeroSize();
            }

            var size = {};
            size.width = elem.offsetWidth;
            size.height = elem.offsetHeight;

            var isBorderBox = size.isBorderBox = !!( boxSizingProp &&
                style[ boxSizingProp ] && style[ boxSizingProp ] === 'border-box' );

            // get all measurements
            for ( var i=0, len = measurements.length; i < len; i++ ) {
                var measurement = measurements[i];
                var value = style[ measurement ];

                var num = parseFloat( value );
                // any 'auto', 'medium' value will be 0
                size[ measurement ] = !isNaN( num ) ? num : 0;
            }

            var paddingWidth = size.paddingLeft + size.paddingRight;
            var paddingHeight = size.paddingTop + size.paddingBottom;
            var marginWidth = size.marginLeft + size.marginRight;
            var marginHeight = size.marginTop + size.marginBottom;
            var borderWidth = size.borderLeftWidth + size.borderRightWidth;
            var borderHeight = size.borderTopWidth + size.borderBottomWidth;

            var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

            // overwrite width and height if we can get it from style
            var styleWidth = getStyleSize( style.width );
            if ( styleWidth !== false ) {
                size.width = styleWidth +
                // add padding and border unless it's already including it
                ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
            }

            var styleHeight = getStyleSize( style.height );
            if ( styleHeight !== false ) {
                size.height = styleHeight +
                // add padding and border unless it's already including it
                ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
            }

            size.innerWidth = size.width - ( paddingWidth + borderWidth );
            size.innerHeight = size.height - ( paddingHeight + borderHeight );

            size.outerWidth = size.width + marginWidth;
            size.outerHeight = size.height + marginHeight;

            return size;
        }

        return getSize;

    })();

    function getElementSize(ele) {
        return _getSize(ele);
    }
});

/*! UIkit 2.21.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
/*
 * Based on Nestable jQuery Plugin - Copyright (c) 2012 David Bushell - http://dbushell.com/
 */
(function(addon) {

    var component;

    if (window.UIkit) {
        component = addon(UIkit);
    }

    if (typeof define == "function" && define.amd) {
        define("uikit-nestable", ["uikit"], function(){
            return component || addon(UIkit);
        });
    }

})(function(UI) {

    "use strict";

    var hasTouch     = 'ontouchstart' in window,
        html         = UI.$html,
        touchedlists = [],
        $win         = UI.$win,
        draggingElement, dragSource;

    var eStart  = hasTouch ? 'touchstart'  : 'mousedown',
        eMove   = hasTouch ? 'touchmove'   : 'mousemove',
        eEnd    = hasTouch ? 'touchend'    : 'mouseup',
        eCancel = hasTouch ? 'touchcancel' : 'mouseup';


    UI.component('nestable', {

        defaults: {
            listBaseClass   : 'uk-nestable',
            listClass       : 'uk-nestable-list',
            listItemClass   : 'uk-nestable-item',
            dragClass       : 'uk-nestable-dragged',
            movingClass     : 'uk-nestable-moving',
            handleClass     : '',
            collapsedClass  : 'uk-collapsed',
            placeholderClass: 'uk-nestable-placeholder',
            noDragClass     : 'uk-nestable-nodrag',
            group           : false,
            maxDepth        : 10,
            threshold       : 20,
            idlethreshold   : 10
        },

        boot: function() {

            // adjust document scrolling
            UI.$html.on('mousemove touchmove', function(e) {

                if (draggingElement) {

                    var top = draggingElement.offset().top;

                    if (top < UI.$win.scrollTop()) {
                        UI.$win.scrollTop(UI.$win.scrollTop() - Math.ceil(draggingElement.height()/2));
                    } else if ( (top + draggingElement.height()) > (window.innerHeight + UI.$win.scrollTop()) ) {
                        UI.$win.scrollTop(UI.$win.scrollTop() + Math.ceil(draggingElement.height()/2));
                    }
                }
            });

            // init code
            UI.ready(function(context) {

                UI.$("[data-uk-nestable]", context).each(function(){

                    var ele = UI.$(this);

                    if (!ele.data("nestable")) {
                        UI.nestable(ele, UI.Utils.options(ele.attr("data-uk-nestable")));
                    }
                });
            });
        },

        init: function() {

            var $this = this;

            Object.keys(this.options).forEach(function(key){

                if(String(key).indexOf('Class')!=-1) {
                    $this.options['_'+key] = '.' + $this.options[key];
                }
            });

            this.find(this.options._listItemClass).find(">ul").addClass(this.options.listClass);

            this.checkEmptyList();

            this.reset();
            this.element.data('nestable-group', this.options.group || UI.Utils.uid('nestable-group'));

            this.find(this.options._listItemClass).each(function() {
                $this.setParent(UI.$(this));
            });

            this.on('click', '[data-nestable-action]', function(e) {

                if ($this.dragEl || (!hasTouch && e.button !== 0)) {
                    return;
                }

                e.preventDefault();

                var target = UI.$(e.currentTarget),
                    action = target.data('nestableAction'),
                    item   = target.closest($this.options._listItemClass);

                if (action === 'collapse') {
                    $this.collapseItem(item);
                }
                if (action === 'expand') {
                    $this.expandItem(item);
                }
                if (action === 'toggle') {
                    $this.toggleItem(item);
                }
            });

            var onStartEvent = function(e) {

                var handle = UI.$(e.target);

                if (e.target === $this.element[0]) {
                    return;
                }

                if (handle.is($this.options._noDragClass) || handle.closest($this.options._noDragClass).length) {
                    return;
                }

                if (handle.is('[data-nestable-action]') || handle.closest('[data-nestable-action]').length) {
                    return;
                }

                if ($this.options.handleClass && !handle.hasClass($this.options.handleClass)) {

                    if ($this.options.handleClass) {
                        handle = handle.closest($this.options._handleClass);
                    }
                }

                if (!handle.length || $this.dragEl || (!hasTouch && e.button !== 0) || (hasTouch && e.touches.length !== 1)) {
                    return;
                }

                if (e.originalEvent && e.originalEvent.touches) {
                    e = evt.originalEvent.touches[0];
                }

                $this.delayMove = function(evt) {

                    evt.preventDefault();
                    $this.dragStart(e);
                    $this.trigger('start.uk.nestable', [$this]);

                    $this.delayMove = false;
                };

                $this.delayMove.x         = parseInt(e.pageX, 10);
                $this.delayMove.y         = parseInt(e.pageY, 10);
                $this.delayMove.threshold = $this.options.idlethreshold;

                e.preventDefault();
            };

            var onMoveEvent = function(e) {

                if (e.originalEvent && e.originalEvent.touches) {
                    e = e.originalEvent.touches[0];
                }

                if ($this.delayMove && (Math.abs(e.pageX - $this.delayMove.x) > $this.delayMove.threshold || Math.abs(e.pageY - $this.delayMove.y) > $this.delayMove.threshold)) {

                    if (!window.getSelection().toString()) {
                        $this.delayMove(e);
                    } else {
                        $this.delayMove = false;
                    }
                }

                if ($this.dragEl) {
                    e.preventDefault();
                    $this.dragMove(e);
                    $this.trigger('move.uk.nestable', [$this]);
                }
            };

            var onEndEvent = function(e) {

                if ($this.dragEl) {
                    e.preventDefault();
                    $this.dragStop(hasTouch ? e.touches[0] : e);
                }

                draggingElement = false;
                $this.delayMove = false;
            };

            if (hasTouch) {
                this.element[0].addEventListener(eStart, onStartEvent, false);
                window.addEventListener(eMove, onMoveEvent, false);
                window.addEventListener(eEnd, onEndEvent, false);
                window.addEventListener(eCancel, onEndEvent, false);
            } else {
                this.on(eStart, onStartEvent);
                $win.on(eMove, onMoveEvent);
                $win.on(eEnd, onEndEvent);
            }

        },

        serialize: function() {

            var data,
                depth = 0,
                list  = this,
                step  = function(level, depth) {

                    var array = [ ], items = level.children(list.options._listItemClass);

                    items.each(function() {

                        var li    = UI.$(this),
                            item  = {}, attribute,
                            sub   = li.children(list.options._listClass);

                        for (var i = 0; i < li[0].attributes.length; i++) {
                            attribute = li[0].attributes[i];
                            if (attribute.name.indexOf('data-') === 0) {
                                item[attribute.name.substr(5)] = UI.Utils.str2json(attribute.value);
                            }
                        }

                        if (sub.length) {
                            item.children = step(sub, depth + 1);
                        }

                        array.push(item);

                    });
                    return array;
                };

            data = step(list.element, depth);

            return data;
        },

        list: function(options) {

            var data  = [],
                list  = this,
                depth = 0,
                step  = function(level, depth, parent) {

                    var items = level.children(options._listItemClass);

                    items.each(function(index) {
                        var li   = UI.$(this),
                            item = UI.$.extend({parent_id: (parent ? parent : null), depth: depth, order: index}, li.data()),
                            sub  = li.children(options._listClass);

                        data.push(item);

                        if (sub.length) {
                            step(sub, depth + 1, li.data(options.idProperty || 'id'));
                        }
                    });
                };

            options = UI.$.extend({}, list.options, options);

            step(list.element, depth);

            return data;
        },

        reset: function() {

            this.mouse = {
                offsetX   : 0,
                offsetY   : 0,
                startX    : 0,
                startY    : 0,
                lastX     : 0,
                lastY     : 0,
                nowX      : 0,
                nowY      : 0,
                distX     : 0,
                distY     : 0,
                dirAx     : 0,
                dirX      : 0,
                dirY      : 0,
                lastDirX  : 0,
                lastDirY  : 0,
                distAxX   : 0,
                distAxY   : 0
            };
            this.moving     = false;
            this.dragEl     = null;
            this.dragRootEl = null;
            this.dragDepth  = 0;
            this.hasNewRoot = false;
            this.pointEl    = null;

            for (var i=0; i<touchedlists.length; i++) {
                this.checkEmptyList(touchedlists[i]);
            }

            touchedlists = [];
        },

        toggleItem: function(li) {
            this[li.hasClass(this.options.collapsedClass) ? "expandItem":"collapseItem"](li);
        },

        expandItem: function(li) {
            li.removeClass(this.options.collapsedClass);
        },

        collapseItem: function(li) {
            var lists = li.children(this.options._listClass);
            if (lists.length) {
                li.addClass(this.options.collapsedClass);
            }
        },

        expandAll: function() {
            var list = this;
            this.find(list.options._listItemClass).each(function() {
                list.expandItem(UI.$(this));
            });
        },

        collapseAll: function() {
            var list = this;
            this.find(list.options._listItemClass).each(function() {
                list.collapseItem(UI.$(this));
            });
        },

        setParent: function(li) {

            if (li.children(this.options._listClass).length) {
                li.addClass("uk-parent");
            }
        },

        unsetParent: function(li) {
            li.removeClass('uk-parent '+this.options.collapsedClass);
            li.children(this.options._listClass).remove();
        },

        dragStart: function(e) {

            var mouse    = this.mouse,
                target   = UI.$(e.target),
                dragItem = target.closest(this.options._listItemClass),
                offset   = dragItem.offset();

            this.placeEl = dragItem;

            mouse.offsetX = e.pageX - offset.left;
            mouse.offsetY = e.pageY - offset.top;

            mouse.startX = mouse.lastX = offset.left;
            mouse.startY = mouse.lastY = offset.top;

            this.dragRootEl = this.element;

            this.dragEl = UI.$('<ul></ul>').addClass(this.options.listClass + ' ' + this.options.dragClass).append(dragItem.clone());
            this.dragEl.css('width', dragItem.width());
            this.placeEl.addClass(this.options.placeholderClass);

            draggingElement = this.dragEl;

            this.tmpDragOnSiblings = [dragItem[0].previousSibling, dragItem[0].nextSibling];

            UI.$body.append(this.dragEl);

            this.dragEl.css({
                left : offset.left,
                top  : offset.top
            });

            // total depth of dragging item
            var i, depth, items = this.dragEl.find(this.options._listItemClass);

            for (i = 0; i < items.length; i++) {
                depth = UI.$(items[i]).parents(this.options._listClass+','+this.options._listBaseClass).length;
                if (depth > this.dragDepth) {
                    this.dragDepth = depth;
                }
            }

            html.addClass(this.options.movingClass);
        },

        dragStop: function(e) {

            var el       = this.placeEl,
                root     = this.placeEl.parents(this.options._listBaseClass+':first');

            this.placeEl.removeClass(this.options.placeholderClass);
            this.dragEl.remove();

            if (this.element[0] !== root[0]) {

                root.trigger('change.uk.nestable',[el, "added", root, root.data('nestable')]);
                this.element.trigger('change.uk.nestable', [el, "removed", this.element, this]);

            } else {
                this.element.trigger('change.uk.nestable',[el, "moved", this.element, this]);
            }

            this.trigger('stop.uk.nestable', [this, el]);

            this.reset();

            html.removeClass(this.options.movingClass);
        },

        dragMove: function(e) {
            var list, parent, prev, next, depth,
                opt      = this.options,
                mouse    = this.mouse,
                maxDepth = this.dragRootEl ? this.dragRootEl.data('nestable').options.maxDepth : opt.maxDepth;

            this.dragEl.css({
                left : e.pageX - mouse.offsetX,
                top  : e.pageY - mouse.offsetY
            });

            // mouse position last events
            mouse.lastX = mouse.nowX;
            mouse.lastY = mouse.nowY;
            // mouse position this events
            mouse.nowX  = e.pageX;
            mouse.nowY  = e.pageY;
            // distance mouse moved between events
            mouse.distX = mouse.nowX - mouse.lastX;
            mouse.distY = mouse.nowY - mouse.lastY;
            // direction mouse was moving
            mouse.lastDirX = mouse.dirX;
            mouse.lastDirY = mouse.dirY;
            // direction mouse is now moving (on both axis)
            mouse.dirX = mouse.distX === 0 ? 0 : mouse.distX > 0 ? 1 : -1;
            mouse.dirY = mouse.distY === 0 ? 0 : mouse.distY > 0 ? 1 : -1;
            // axis mouse is now moving on
            var newAx   = Math.abs(mouse.distX) > Math.abs(mouse.distY) ? 1 : 0;

            // do nothing on first move
            if (!mouse.moving) {
                mouse.dirAx  = newAx;
                mouse.moving = true;
                return;
            }

            // calc distance moved on this axis (and direction)
            if (mouse.dirAx !== newAx) {
                mouse.distAxX = 0;
                mouse.distAxY = 0;
            } else {
                mouse.distAxX += Math.abs(mouse.distX);
                if (mouse.dirX !== 0 && mouse.dirX !== mouse.lastDirX) {
                    mouse.distAxX = 0;
                }
                mouse.distAxY += Math.abs(mouse.distY);
                if (mouse.dirY !== 0 && mouse.dirY !== mouse.lastDirY) {
                    mouse.distAxY = 0;
                }
            }
            mouse.dirAx = newAx;

            /**
             * move horizontal
             */
            if (mouse.dirAx && mouse.distAxX >= opt.threshold) {
                // reset move distance on x-axis for new phase
                mouse.distAxX = 0;
                prev = this.placeEl.prev('li');

                // increase horizontal level if previous sibling exists and is not collapsed
                if (mouse.distX > 0 && prev.length && !prev.hasClass(opt.collapsedClass)) {

                    // cannot increase level when item above is collapsed
                    list = prev.find(opt._listClass).last();

                    // check if depth limit has reached
                    depth = this.placeEl.parents(opt._listClass+','+opt._listBaseClass).length;

                    if (depth + this.dragDepth <= maxDepth) {

                        // create new sub-level if one doesn't exist
                        if (!list.length) {
                            list = UI.$('<ul/>').addClass(opt.listClass);
                            list.append(this.placeEl);
                            prev.append(list);
                            this.setParent(prev);
                        } else {
                            // else append to next level up
                            list = prev.children(opt._listClass).last();
                            list.append(this.placeEl);
                        }
                    }
                }
                // decrease horizontal level
                if (mouse.distX < 0) {
                    // we can't decrease a level if an item preceeds the current one
                    next = this.placeEl.next('li');
                    if (!next.length) {
                        parent = this.placeEl.parent();
                        this.placeEl.closest(opt._listItemClass).after(this.placeEl);
                        if (!parent.children().length) {
                            this.unsetParent(parent.parent());
                        }
                    }
                }
            }

            var isEmpty = false;

            // find list item under cursor
            var pointX = this.dragEl.offset().left - (window.pageXOffset || document.scrollLeft || 0),
                pointY = e.pageY - (window.pageYOffset || document.documentElement.scrollTop);
            this.pointEl = UI.$(document.elementFromPoint(pointX, pointY));

            if (opt.handleClass && this.pointEl.hasClass(opt.handleClass)) {

                this.pointEl = this.pointEl.closest(opt._listItemClass);

            } else {

                var nestableitem = this.pointEl.closest(opt._listItemClass);

                if (nestableitem.length) {
                    this.pointEl = nestableitem;
                }
            }

            if (this.placeEl.find(this.pointEl).length) {
                return;
            }

            if (this.pointEl.data('nestable') && !this.pointEl.children().length) {
                isEmpty = true;
                this.checkEmptyList(this.pointEl);
            } else if (!this.pointEl.length || !this.pointEl.hasClass(opt.listItemClass)) {
                return;
            }

            // find parent list of item under cursor
            var pointElRoot = this.element,
                tmpRoot     = this.pointEl.closest(this.options._listBaseClass),
                isNewRoot   = pointElRoot[0] !== this.pointEl.closest(this.options._listBaseClass)[0];

            /**
             * move vertical
             */
            if (!mouse.dirAx || isNewRoot || isEmpty) {

                // check if groups match if dragging over new root
                if (isNewRoot && opt.group !== tmpRoot.data('nestable-group')) {
                    return;
                } else {
                    touchedlists.push(pointElRoot);
                }

                // check depth limit
                depth = this.dragDepth - 1 + this.pointEl.parents(opt._listClass+','+opt._listBaseClass).length;

                if (depth > maxDepth) {
                    return;
                }

                var before = e.pageY < (this.pointEl.offset().top + this.pointEl.height() / 2);

                parent = this.placeEl.parent();

                if (isEmpty) {
                    this.pointEl.append(this.placeEl);
                } else if (before) {
                    this.pointEl.before(this.placeEl);
                } else {
                    this.pointEl.after(this.placeEl);
                }

                if (!parent.children().length) {
                    if (!parent.data("nestable")) this.unsetParent(parent.parent());
                }

                this.checkEmptyList(this.dragRootEl);
                this.checkEmptyList(pointElRoot);

                // parent root list has changed
                if (isNewRoot) {
                    this.dragRootEl = tmpRoot;
                    this.hasNewRoot = this.element[0] !== this.dragRootEl[0];
                }
            }
        },

        checkEmptyList: function(list) {

            list  = list ? UI.$(list) : this.element;

            if (!list.children().length) {
                list.html('');
            }
        }

    });

    return UI.nestable;
});

/*! UIkit 2.21.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
(function(addon) {

    var component;

    if (window.UIkit) {
        component = addon(UIkit);
    }

    if (typeof define == "function" && define.amd) {
        define("uikit-notify", ["uikit"], function(){
            return component || addon(UIkit);
        });
    }

})(function(UI){

    "use strict";

    var containers = {},
        messages   = {},

        notify     =  function(options){

            if (UI.$.type(options) == 'string') {
                options = { message: options };
            }

            if (arguments[1]) {
                options = UI.$.extend(options, UI.$.type(arguments[1]) == 'string' ? {status:arguments[1]} : arguments[1]);
            }

            return (new Message(options)).show();
        },
        closeAll  = function(group, instantly){

            var id;

            if (group) {
                for(id in messages) { if(group===messages[id].group) messages[id].close(instantly); }
            } else {
                for(id in messages) { messages[id].close(instantly); }
            }
        };

    var Message = function(options){

        var $this = this;

        this.options = UI.$.extend({}, Message.defaults, options);

        this.uuid    = UI.Utils.uid("notifymsg");
        this.element = UI.$([

            '<div class="uk-notify-message">',
                '<a class="uk-close"></a>',
                '<div></div>',
            '</div>'

        ].join('')).data("notifyMessage", this);

        this.content(this.options.message);

        // status
        if (this.options.status) {
            this.element.addClass('uk-notify-message-'+this.options.status);
            this.currentstatus = this.options.status;
        }

        this.group = this.options.group;

        messages[this.uuid] = this;

        if(!containers[this.options.pos]) {
            containers[this.options.pos] = UI.$('<div class="uk-notify uk-notify-'+this.options.pos+'"></div>').appendTo('body').on("click", ".uk-notify-message", function(){

                var message = UI.$(this).data("notifyMessage");

                message.element.trigger('manualclose.uk.notify', [message]);
                message.close();
            });
        }
    };


    UI.$.extend(Message.prototype, {

        uuid: false,
        element: false,
        timout: false,
        currentstatus: "",
        group: false,

        show: function() {

            if (this.element.is(":visible")) return;

            var $this = this;

            containers[this.options.pos].show().prepend(this.element);

            var marginbottom = parseInt(this.element.css("margin-bottom"), 10);

            this.element.css({"opacity":0, "margin-top": -1*this.element.outerHeight(), "margin-bottom":0}).animate({"opacity":1, "margin-top": 0, "margin-bottom":marginbottom}, function(){

                if ($this.options.timeout) {

                    var closefn = function(){ $this.close(); };

                    $this.timeout = setTimeout(closefn, $this.options.timeout);

                    $this.element.hover(
                        function() { clearTimeout($this.timeout); },
                        function() { $this.timeout = setTimeout(closefn, $this.options.timeout);  }
                    );
                }

            });

            return this;
        },

        close: function(instantly) {

            var $this    = this,
                finalize = function(){
                    $this.element.remove();

                    if (!containers[$this.options.pos].children().length) {
                        containers[$this.options.pos].hide();
                    }

                    $this.options.onClose.apply($this, []);
                    $this.element.trigger('close.uk.notify', [$this]);

                    delete messages[$this.uuid];
                };

            if (this.timeout) clearTimeout(this.timeout);

            if (instantly) {
                finalize();
            } else {
                this.element.animate({"opacity":0, "margin-top": -1* this.element.outerHeight(), "margin-bottom":0}, function(){
                    finalize();
                });
            }
        },

        content: function(html){

            var container = this.element.find(">div");

            if(!html) {
                return container.html();
            }

            container.html(html);

            return this;
        },

        status: function(status) {

            if (!status) {
                return this.currentstatus;
            }

            this.element.removeClass('uk-notify-message-'+this.currentstatus).addClass('uk-notify-message-'+status);

            this.currentstatus = status;

            return this;
        }
    });

    Message.defaults = {
        message: "",
        status: "",
        timeout: 5000,
        group: null,
        pos: 'top-center',
        onClose: function() {}
    };

    UI.notify          = notify;
    UI.notify.message  = Message;
    UI.notify.closeAll = closeAll;

    return notify;
});

/*! UIkit 2.21.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
/*
  * Based on nativesortable - Copyright (c) Brian Grinstead - https://github.com/bgrins/nativesortable
  */
(function(addon) {

    var component;

    if (window.UIkit) {
        component = addon(UIkit);
    }

    if (typeof define == "function" && define.amd) {
        define("uikit-sortable", ["uikit"], function(){
            return component || addon(UIkit);
        });
    }

})(function(UI){

    "use strict";

    var supportsTouch       = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch),
        draggingPlaceholder, currentlyDraggingElement, currentlyDraggingTarget, dragging, moving, clickedlink, delayIdle, touchedlists, moved;

    function closestSortable(ele) {

        ele = UI.$(ele);

        do {
            if (ele.data('sortable')) {
                return ele;
            }
            ele = UI.$(ele).parent();
        } while(ele.length);

        return ele;
    }

    UI.component('sortable', {

        defaults: {

            animation        : 150,
            threshold        : 10,

            childClass       : 'uk-sortable-item',
            placeholderClass : 'uk-sortable-placeholder',
            overClass        : 'uk-sortable-over',
            draggingClass    : 'uk-sortable-dragged',
            dragMovingClass  : 'uk-sortable-moving',
            baseClass        : 'uk-sortable',
            noDragClass      : 'uk-sortable-nodrag',
            dragCustomClass  : '',
            handleClass      : false,
            group            : false,

            stop             : function() {},
            start            : function() {},
            change           : function() {}
        },

        boot: function() {

            // auto init
            UI.ready(function(context) {

                UI.$("[data-uk-sortable]", context).each(function(){

                    var ele = UI.$(this);

                    if(!ele.data("sortable")) {
                        var plugin = UI.sortable(ele, UI.Utils.options(ele.attr("data-uk-sortable")));
                    }
                });
            });

            UI.$html.on('mousemove touchmove', function(e) {

                if (delayIdle) {

                    var src = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0] : e;

                    if (Math.abs(src.pageX - delayIdle.pos.x) > delayIdle.threshold || Math.abs(src.pageY - delayIdle.pos.y) > delayIdle.threshold) {
                        delayIdle.apply(src);
                    }
                }

                if (draggingPlaceholder) {

                    if (!moving) {
                        moving = true;
                        draggingPlaceholder.show();

                        draggingPlaceholder.$current.addClass(draggingPlaceholder.$sortable.options.placeholderClass);
                        draggingPlaceholder.$sortable.element.children().addClass(draggingPlaceholder.$sortable.options.childClass);

                        UI.$html.addClass(draggingPlaceholder.$sortable.options.dragMovingClass);
                    }

                    var offset = draggingPlaceholder.data('mouse-offset'),
                        left   = parseInt(e.originalEvent.pageX, 10) + offset.left,
                        top    = parseInt(e.originalEvent.pageY, 10) + offset.top;

                    draggingPlaceholder.css({'left': left, 'top': top });

                    // adjust document scrolling
                    if (top < UI.$win.scrollTop()) {
                        UI.$win.scrollTop(UI.$win.scrollTop() - Math.ceil(draggingPlaceholder.height()/2));
                    } else if ( (top + draggingPlaceholder.height()) > (window.innerHeight + UI.$win.scrollTop()) ) {
                        UI.$win.scrollTop(UI.$win.scrollTop() + Math.ceil(draggingPlaceholder.height()/2));
                    }
                }
            });

            UI.$html.on('mouseup touchend', function(e) {

                delayIdle = clickedlink = false;

                // dragging?
                if (!currentlyDraggingElement || !draggingPlaceholder) {
                    // completely reset dragging attempt. will cause weird delay behavior elsewise
                    currentlyDraggingElement = draggingPlaceholder = null;
                    return;
                }

                // inside or outside of sortable?
                var sortable  = closestSortable(e.target),
                    component = draggingPlaceholder.$sortable,
                    ev        = { type: e.type };

                if (sortable[0]) {
                    component.dragDrop(ev, component.element);
                }
                component.dragEnd(ev, component.element);
            });
        },

        init: function() {

            var $this   = this,
                element = this.element[0],
                children;

            touchedlists = [];

            // make sure :empty selector works on empty lists
            if (this.element.children().length === 0) {
                this.element.html('');
            }

            this.element.data('sortable-group', this.options.group ? this.options.group : UI.Utils.uid('sortable-group'));

            var handleDragStart = delegate(function(e) {

                var $target = UI.$(e.target),
                    $link   = $target.is('a[href]') ? $target:$target.parents('a[href]');
                
                if ($target.is(':input')) {
                    return;
                }
                
                e.preventDefault();

                if (!supportsTouch && $link.length) {

                    $link.one('click', function(e){
                        e.preventDefault();
                    }).one('mouseup', function(){
                        if(!moved) $link.trigger('click');
                    });
                }

                return $this.dragStart(e, this);
            });

            var handleDragOver = delegate(function(e) {

                if (!currentlyDraggingElement) {
                    return true;
                }

                if (e.preventDefault) {
                    e.preventDefault();
                }

                return false;
            });

            var handleDragEnter = delegate(UI.Utils.debounce(function(e) {
                return $this.dragEnter(e, this);
            }), 40);

            var handleDragLeave = delegate(function(e) {

                // Prevent dragenter on a child from allowing a dragleave on the container
                var previousCounter = $this.dragenterData(this);
                $this.dragenterData(this, previousCounter - 1);

                // This is a fix for child elements firing dragenter before the parent fires dragleave
                if (!$this.dragenterData(this)) {
                    UI.$(this).removeClass($this.options.overClass);
                    $this.dragenterData(this, false);
                }
            });

            var handleTouchMove = delegate(function(e) {

                if (!currentlyDraggingElement ||
                    currentlyDraggingElement === this ||
                    currentlyDraggingTarget === this) {
                    return true;
                }

                $this.element.children().removeClass($this.options.overClass);
                currentlyDraggingTarget = this;

                $this.moveElementNextTo(currentlyDraggingElement, this);

                return prevent(e);
            });

            // Bind/unbind standard mouse/touch events as a polyfill.
            function addDragHandlers() {
                if (supportsTouch) {
                    element.addEventListener("touchmove", handleTouchMove, false);
                } else {
                    element.addEventListener('mouseover', handleDragEnter, false);
                    element.addEventListener('mouseout', handleDragLeave, false);
                }

                // document.addEventListener("selectstart", prevent, false);
            }

            function removeDragHandlers() {
                if (supportsTouch) {
                    element.removeEventListener("touchmove", handleTouchMove, false);
                } else {
                    element.removeEventListener('mouseover', handleDragEnter, false);
                    element.removeEventListener('mouseout', handleDragLeave, false);
                }

                // document.removeEventListener("selectstart", prevent, false);
            }

            this.addDragHandlers    = addDragHandlers;
            this.removeDragHandlers = removeDragHandlers;

            function handleDragMove(e) {

                if (!currentlyDraggingElement) {
                    return;
                }

                $this.dragMove(e, $this);
            }

            function delegate(fn) {

                return function(e) {

                    var touch, target, context;

                    if (e) {
                        touch  = (supportsTouch && e.touches && e.touches[0]) || { };
                        target = touch.target || e.target;

                        // Fix event.target for a touch event
                        if (supportsTouch && document.elementFromPoint) {
                            target = document.elementFromPoint(e.pageX - document.body.scrollLeft, e.pageY - document.body.scrollTop);
                        }
                    }

                    if (UI.$(target).hasClass($this.options.childClass)) {
                        fn.apply(target, [e]);
                    } else if (target !== element) {

                        // If a child is initiating the event or ending it, then use the container as context for the callback.
                        context = moveUpToChildNode(element, target);

                        if (context) {
                            fn.apply(context, [e]);
                        }
                    }
                };
            }

            window.addEventListener(supportsTouch ? 'touchmove' : 'mousemove', handleDragMove, false);
            element.addEventListener(supportsTouch ? 'touchstart': 'mousedown', handleDragStart, false);
        },

        dragStart: function(e, elem) {

            moved    = false;
            moving   = false;
            dragging = false;

            var $this    = this,
                target   = UI.$(e.target),
                children = $this.element.children();

            if (!supportsTouch && e.button==2) {
                return;
            }

            if ($this.options.handleClass) {

                var handle = target.hasClass($this.options.handleClass) ? target : target.closest('.'+$this.options.handleClass, $this.element);

                if (!handle.length) {
                    //e.preventDefault();
                    return;
                }
            }

            if (target.is('.'+$this.options.noDragClass) || target.closest('.'+$this.options._noDragClass).length) {
                return;
            }

            // prevent dragging if taget is a form field
            if (target.is(':input')) {
                return;
            }

            currentlyDraggingElement = elem;

            // init drag placeholder
            if (draggingPlaceholder) {
                draggingPlaceholder.remove();
            }

            var $current = UI.$(currentlyDraggingElement), offset = $current.offset();

            delayIdle = {

                pos       : { x:e.pageX, y:e.pageY },
                threshold : $this.options.threshold,
                apply     : function(evt) {

                    draggingPlaceholder = UI.$('<div class="'+([$this.options.draggingClass, $this.options.dragCustomClass].join(' '))+'"></div>').css({
                        display : 'none',
                        top     : offset.top,
                        left    : offset.left,
                        width   : $current.width(),
                        height  : $current.height(),
                        padding : $current.css('padding')
                    }).data({
                        'mouse-offset': {
                            'left'   : offset.left - parseInt(evt.pageX, 10),
                            'top'    : offset.top  - parseInt(evt.pageY, 10)
                        },
                        'origin' : $this.element,
                        'index'  : $current.index()
                    }).append($current.html()).appendTo('body');

                    draggingPlaceholder.$current  = $current;
                    draggingPlaceholder.$sortable = $this;
                    $current.data('sortable-group', $this.options.group);

                    $this.addDragHandlers();

                    $this.options.start(this, currentlyDraggingElement);
                    $this.trigger('start.uk.sortable', [$this, currentlyDraggingElement]);

                    moved     = true;
                    delayIdle = false;
                }
            };
        },

        dragMove: function(e, elem) {
            var overEl       = UI.$(document.elementFromPoint(e.pageX - document.body.scrollLeft, e.pageY - (window.pageYOffset || document.documentElement.scrollTop))),
                overRoot     = overEl.closest('.'+this.options.baseClass),
                groupOver    = overRoot.data("sortable-group"),
                $current     = UI.$(currentlyDraggingElement),
                currentRoot  = $current.parent(),
                groupCurrent = $current.data("sortable-group"),
                overChild;

            if (overRoot[0] !== currentRoot[0] && groupCurrent !== undefined && groupOver === groupCurrent) {
                overRoot.data('sortable').addDragHandlers();

                touchedlists.push(overRoot);
                overRoot.children().addClass(this.options.childClass);

                // swap root
                if (overRoot.children().length > 0) {
                    overChild = overEl.closest('.'+this.options.childClass);
                    overChild.before($current);
                } else { // empty list
                    overEl.append($current);
                }

                // list empty? remove inner whitespace to make sure :empty selector works
                if (currentRoot.children().length === 0) {
                    currentRoot.html('');
                }

                UIkit.$doc.trigger('mouseover');
            }
        },

        dragEnter: function(e, elem) {

            if (!currentlyDraggingElement || currentlyDraggingElement === elem) {
                return true;
            }

            // Prevent dragenter on a child from allowing a dragleave on the container
            var previousCounter = this.dragenterData(elem);

            this.dragenterData(elem, previousCounter + 1);

            if (previousCounter === 0) {

                UI.$(elem).addClass(this.options.overClass);

                this.moveElementNextTo(currentlyDraggingElement, elem);
            }

            return false;
        },

        dragEnd: function(e, elem) {

            var $this = this;

            // avoid triggering event twice
            if (currentlyDraggingElement) {
                // TODO: trigger on right element?
                this.options.stop(elem);
                this.trigger('stop.uk.sortable', [this]);
            }

            currentlyDraggingElement = null;
            currentlyDraggingTarget  = null;

            touchedlists.push(this.element);
            touchedlists.forEach(function(el, i) {
                UI.$(el).children().each(function() {
                    if (this.nodeType === 1) {
                        UI.$(this).removeClass($this.options.overClass)
                            .removeClass($this.options.placeholderClass)
                            .removeClass($this.options.childClass);
                        $this.dragenterData(this, false);
                    }
                });
            });

            touchedlists = [];

            UI.$html.removeClass(this.options.dragMovingClass);

            this.removeDragHandlers();

            if (draggingPlaceholder) {
                draggingPlaceholder.remove();
                draggingPlaceholder = null;
            }
        },

        dragDrop: function(e, elem) {

            if (e.type === 'drop') {

                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                if (e.preventDefault) {
                    e.preventDefault();
                }
            }

            this.triggerChangeEvents();
        },

        triggerChangeEvents: function() {

            // trigger events once
            if (!currentlyDraggingElement) return;

            var $current = UI.$(currentlyDraggingElement),
                oldRoot  = draggingPlaceholder.data("origin"),
                newRoot  = $current.closest('.'+this.options.baseClass),
                triggers = [];

            // events depending on move inside lists or across lists
            if (oldRoot[0] === newRoot[0] && draggingPlaceholder.data('index') != $current.index() ) {
                triggers.push({el: this, mode: 'moved'});
            } else if (oldRoot[0] != newRoot[0]) {
                triggers.push({el: newRoot, mode: 'added'}, {el: oldRoot, mode: 'removed'});
            }

            triggers.forEach(function (trigger, i) {
                trigger.el.trigger('change.uk.sortable', [trigger.el, currentlyDraggingElement, trigger.mode]);
            });
        },

        dragenterData: function(element, val) {

            element = UI.$(element);

            if (arguments.length == 1) {
                return parseInt(element.data('child-dragenter'), 10) || 0;
            } else if (!val) {
                element.removeData('child-dragenter');
            } else {
                element.data('child-dragenter', Math.max(0, val));
            }
        },

        moveElementNextTo: function(element, elementToMoveNextTo) {

            dragging = true;

            var $this    = this,
                list     = UI.$(element).parent().css('min-height', ''),
                next     = isBelow(element, elementToMoveNextTo) ? elementToMoveNextTo : elementToMoveNextTo.nextSibling,
                children = list.children(),
                count    = children.length;

            if (!$this.options.animation) {
                elementToMoveNextTo.parentNode.insertBefore(element, next);
                UI.Utils.checkDisplay($this.element.parent());
                return;
            }

            list.css('min-height', list.height());

            children.stop().each(function(){
                var ele = UI.$(this),
                    offset = ele.position();

                    offset.width = ele.width();

                ele.data('offset-before', offset);
            });

            elementToMoveNextTo.parentNode.insertBefore(element, next);

            UI.Utils.checkDisplay($this.element.parent());

            children = list.children().each(function() {
                var ele    = UI.$(this);
                ele.data('offset-after', ele.position());
            }).each(function() {
                var ele    = UI.$(this),
                    before = ele.data('offset-before');
                ele.css({'position':'absolute', 'top':before.top, 'left':before.left, 'min-width':before.width });
            });

            children.each(function(){

                var ele    = UI.$(this),
                    before = ele.data('offset-before'),
                    offset = ele.data('offset-after');

                    ele.css('pointer-events', 'none').width();

                    setTimeout(function(){
                        ele.animate({'top':offset.top, 'left':offset.left}, $this.options.animation, function() {
                            ele.css({'position':'','top':'', 'left':'', 'min-width': '', 'pointer-events':''}).removeClass($this.options.overClass).removeData('child-dragenter');
                            count--;
                            if (!count) {
                                list.css('min-height', '');
                                UI.Utils.checkDisplay($this.element.parent());
                            }
                        });
                    }, 0);
            });
        },

        serialize: function() {

            var data = [], item, attribute;

            this.element.children().each(function(j, child) {
                item = {};
                for (var i = 0; i < child.attributes.length; i++) {
                    attribute = child.attributes[i];
                    if (attribute.name.indexOf('data-') === 0) {
                        item[attribute.name.substr(5)] = UI.Utils.str2json(attribute.value);
                    }
                }
                data.push(item);
            });

            return data;
        }
    });

    // helpers

    function isBelow(el1, el2) {

        var parent = el1.parentNode;

        if (el2.parentNode != parent) {
            return false;
        }

        var cur = el1.previousSibling;

        while (cur && cur.nodeType !== 9) {
            if (cur === el2) {
                return true;
            }
            cur = cur.previousSibling;
        }

        return false;
    }

    function moveUpToChildNode(parent, child) {
        var cur = child;
        if (cur == parent) { return null; }

        while (cur) {
            if (cur.parentNode === parent) {
                return cur;
            }

            cur = cur.parentNode;
            if ( !cur || !cur.ownerDocument || cur.nodeType === 11 ) {
                break;
            }
        }
        return null;
    }

    function prevent(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.returnValue = false;
    }

    return UI.sortable;
});

/*! UIkit 2.21.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
(function(addon) {

    var component;

    if (window.UIkit) {
        component = addon(UIkit);
    }

    if (typeof define == "function" && define.amd) {
        define("uikit-sticky", ["uikit"], function(){
            return component || addon(UIkit);
        });
    }

})(function(UI){

    "use strict";

    var $win         = UI.$win,
        $doc         = UI.$doc,
        sticked      = [];

    UI.component('sticky', {

        defaults: {
            top          : 0,
            bottom       : 0,
            animation    : '',
            clsinit      : 'uk-sticky-init',
            clsactive    : 'uk-active',
            getWidthFrom : '',
            boundary     : false,
            media        : false,
            target       : false,
            disabled     : false
        },

        boot: function() {

            // should be more efficient than using $win.scroll(checkscrollposition):
            $('#page_content').on('scroll', function() {
                checkscrollposition();
            });
            UI.$win.on('resize orientationchange', UI.Utils.debounce(function() {

                if (!sticked.length) return;

                for (var i = 0; i < sticked.length; i++) {
                    sticked[i].reset(true);
                    sticked[i].self.computeWrapper();
                }

                checkscrollposition();
            }, 100));

            // init code
            UI.ready(function(context) {

                setTimeout(function(){

                    UI.$("[data-uk-sticky]", context).each(function(){

                        var $ele = UI.$(this);

                        if(!$ele.data("sticky")) {
                            UI.sticky($ele, UI.Utils.options($ele.attr('data-uk-sticky')));
                        }
                    });

                    checkscrollposition();
                }, 0);
            });
        },

        init: function() {

            var wrapper  = UI.$('<div class="uk-sticky-placeholder"></div>'), boundary = this.options.boundary, boundtoparent;

            this.wrapper = this.element.css('margin', 0).wrap(wrapper).parent();

            this.computeWrapper();

            if (boundary) {

                if (boundary === true) {

                    boundary      = this.wrapper.parent();
                    boundtoparent = true;

                } else if (typeof boundary === "string") {
                    boundary = UI.$(boundary);
                }
            }

            this.sticky = {
                self          : this,
                options       : this.options,
                element       : this.element,
                currentTop    : null,
                wrapper       : this.wrapper,
                init          : false,
                getWidthFrom  : this.options.getWidthFrom || this.wrapper,
                boundary      : boundary,
                boundtoparent : boundtoparent,
                reset         : function(force) {

                    var finalize = function() {
                        this.element.css({"position":"", "top":"", "width":"", "left":"", "margin":"0"});
                        this.element.removeClass([this.options.animation, 'uk-animation-reverse', this.options.clsactive].join(' '));

                        this.currentTop = null;
                        this.animate    = false;
                    }.bind(this);


                    if (!force && this.options.animation && UI.support.animation) {

                        this.animate = true;

                        this.element.removeClass(this.options.animation).one(UI.support.animation.end, function(){
                            finalize();
                        }).width(); // force redraw

                        this.element.addClass(this.options.animation+' '+'uk-animation-reverse');
                    } else {
                        finalize();
                    }
                },

                check: function() {

                    if (this.options.disabled) {
                        return false;
                    }

                    if (this.options.media) {

                        switch(typeof(this.options.media)) {
                            case 'number':
                                if (window.innerWidth < this.options.media) {
                                    return false;
                                }
                                break;
                            case 'string':
                                if (window.matchMedia && !window.matchMedia(this.options.media).matches) {
                                    return false;
                                }
                                break;
                        }
                    }

                    var scrollTop      = $win.scrollTop(),
                        documentHeight = $doc.height(),
                        dwh            = documentHeight - window.innerHeight,
                        extra          = (scrollTop > dwh) ? dwh - scrollTop : 0,
                        elementTop     = this.wrapper.offset().top,
                        etse           = elementTop - this.options.top - extra;

                    return (scrollTop  >= etse);
                }
            };

            sticked.push(this.sticky);
        },

        update: function() {
            checkscrollposition(this.sticky);
        },

        enable: function() {
            this.options.disabled = false;
            this.update();
        },

        disable: function(force) {
            this.options.disabled = true;
            this.sticky.reset(force);
        },

        computeWrapper: function() {

            this.wrapper.css({
                'height' : this.element.css('position') != 'absolute' ? this.element.outerHeight() : '',
                'float'  : this.element.css("float") != "none" ? this.element.css("float") : '',
                'margin' : this.element.css("margin")
            });
        }
    });

    function checkscrollposition() {

        var stickies = arguments.length ? arguments : sticked;

        if (!stickies.length || $win.scrollTop() < 0) return;

        var scrollTop       = $win.scrollTop(),
            documentHeight  = $doc.height(),
            windowHeight    = $win.height(),
            dwh             = documentHeight - windowHeight,
            extra           = (scrollTop > dwh) ? dwh - scrollTop : 0,
            newTop, containerBottom, stickyHeight, sticky;

        for (var i = 0; i < stickies.length; i++) {

            sticky = stickies[i];

            if (!sticky.element.is(":visible") || sticky.animate) {
                continue;
            }

            if (!sticky.check()) {

                if (sticky.currentTop !== null) {
                    sticky.reset();
                }

            } else {

                if (sticky.options.top < 0) {
                    newTop = 0;
                } else {
                    stickyHeight = sticky.element.outerHeight();
                    newTop = documentHeight - stickyHeight - sticky.options.top - sticky.options.bottom - scrollTop - extra;
                    newTop = newTop < 0 ? newTop + sticky.options.top : sticky.options.top;
                }

                if (sticky.boundary && sticky.boundary.length) {

                    var bTop = sticky.boundary.offset().top;

                    if (sticky.boundtoparent) {
                        containerBottom = documentHeight - (bTop + sticky.boundary.outerHeight()) + parseInt(sticky.boundary.css('padding-bottom'));
                    } else {
                        containerBottom = documentHeight - bTop - parseInt(sticky.boundary.css('margin-top'));
                    }

                    newTop = (scrollTop + stickyHeight) > (documentHeight - containerBottom - (sticky.options.top < 0 ? 0 : sticky.options.top)) ? (documentHeight - containerBottom) - (scrollTop + stickyHeight) : newTop;
                }


                if (sticky.currentTop != newTop) {

                    sticky.element.css({
                        "position" : "fixed",
                        "top"      : newTop,
                        "width"    : (typeof sticky.getWidthFrom !== 'undefined') ? UI.$(sticky.getWidthFrom).width() : sticky.element.width(),
                        "left"     : sticky.wrapper.offset().left
                    });

                    if (!sticky.init) {

                        sticky.element.addClass(sticky.options.clsinit);

                        if (location.hash && scrollTop > 0 && sticky.options.target) {

                            var $target = UI.$(location.hash);

                            if ($target.length) {

                                setTimeout((function($target, sticky){

                                    return function() {

                                        sticky.element.width(); // force redraw

                                        var offset       = $target.offset(),
                                            maxoffset    = offset.top + $target.outerHeight(),
                                            stickyOffset = sticky.element.offset(),
                                            stickyHeight = sticky.element.outerHeight(),
                                            stickyMaxOffset = stickyOffset.top + stickyHeight;

                                        if (stickyOffset.top < maxoffset && offset.top < stickyMaxOffset) {
                                            scrollTop = offset.top - stickyHeight - sticky.options.target;
                                            window.scrollTo(0, scrollTop);
                                        }
                                    };

                                })($target, sticky), 0);
                            }
                        }
                    }

                    sticky.element.addClass(sticky.options.clsactive);
                    sticky.element.css('margin', '');

                    if (sticky.options.animation && sticky.init) {
                        sticky.element.addClass(sticky.options.animation);
                    }

                    sticky.currentTop = newTop;
                }
            }

            sticky.init = true;
        }
    }

    return UI.sticky;
});

/*! UIkit 2.21.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
(function(addon) {
    var component;

    if (window.UIkit) {
        component = addon(UIkit);
    }

    if (typeof define == "function" && define.amd) {
        define("uikit-tooltip", ["uikit"], function(){
            return component || addon(UIkit);
        });
    }

})(function(UI){

    "use strict";

    var $tooltip,   // tooltip container
        tooltipdelay, checkdelay;

    UI.component('tooltip', {

        defaults: {
            "offset": 5,
            "pos": "top",
            "animation": false,
            "delay": 0, // in miliseconds
            "cls": "",
            "activeClass": "uk-active",
            "src": function(ele, title) {

                title = ele.attr('title');

                if (title) {
                    ele.data('cached-title', title).removeAttr('title');
                }

                return ele.data("cached-title");
            }
        },

        tip: "",

        boot: function() {

            // init code
            UI.$html.on("mouseenter.tooltip.uikit focus.tooltip.uikit", "[data-uk-tooltip]", function(e) {
                var ele = UI.$(this);

                if (!ele.data("tooltip")) {
                    var obj = UI.tooltip(ele, UI.Utils.options(ele.attr("data-uk-tooltip")));
                    ele.trigger("mouseenter");
                }
            });
        },

        init: function() {

            var $this = this;

            if (!$tooltip) {
                $tooltip = UI.$('<div class="uk-tooltip"></div>').appendTo("body");
            }

            this.on({
                focus      : function(e) { $this.show(); },
                blur       : function(e) { $this.hide(); },
                mouseenter : function(e) { $this.show(); },
                mouseleave : function(e) { $this.hide(); }
            });
        },

        show: function() {

            this.tip = typeof(this.options.src) === "function" ? this.options.src(this.element) : this.options.src;

            if (tooltipdelay)     clearTimeout(tooltipdelay);
            if (checkdelay)       clearTimeout(checkdelay);
            if (!this.tip.length) return;

            $tooltip.stop().css({"top": -2000, "visibility": "hidden"}).removeClass(this.options.activeClass).show();
            $tooltip.html('<div class="uk-tooltip-inner">' + this.tip + '</div>');

            var $this      = this,
                pos        = UI.$.extend({}, this.element.offset(), {width: this.element[0].offsetWidth, height: this.element[0].offsetHeight}),
                width      = $tooltip[0].offsetWidth,
                height     = $tooltip[0].offsetHeight,
                offset     = typeof(this.options.offset) === "function" ? this.options.offset.call(this.element) : this.options.offset,
                position   = typeof(this.options.pos) === "function" ? this.options.pos.call(this.element) : this.options.pos,
                tmppos     = position.split("-"),
                tcss       = {
                    "display"    : "none",
                    "visibility" : "visible",
                    "top"        : (pos.top + pos.height + height),
                    "left"       : pos.left
                };


            // prevent strange position
            // when tooltip is in offcanvas etc.
            if (UI.$html.css('position')=='fixed' || UI.$body.css('position')=='fixed'){
                var bodyoffset = UI.$('body').offset(),
                    htmloffset = UI.$('html').offset(),
                    docoffset  = {'top': (htmloffset.top + bodyoffset.top), 'left': (htmloffset.left + bodyoffset.left)};

                pos.left -= docoffset.left;
                pos.top  -= docoffset.top;
            }


            if ((tmppos[0] == "left" || tmppos[0] == "right") && UI.langdirection == 'right') {
                tmppos[0] = tmppos[0] == "left" ? "right" : "left";
            }

            var variants =  {
                "bottom"  : {top: pos.top + pos.height + offset, left: pos.left + pos.width / 2 - width / 2},
                "top"     : {top: pos.top - height - offset, left: pos.left + pos.width / 2 - width / 2},
                "left"    : {top: pos.top + pos.height / 2 - height / 2, left: pos.left - width - offset},
                "right"   : {top: pos.top + pos.height / 2 - height / 2, left: pos.left + pos.width + offset}
            };

            UI.$.extend(tcss, variants[tmppos[0]]);

            if (tmppos.length == 2) tcss.left = (tmppos[1] == 'left') ? (pos.left) : ((pos.left + pos.width) - width);

            var boundary = this.checkBoundary(tcss.left, tcss.top, width, height);

            if(boundary) {

                switch(boundary) {
                    case "x":

                        if (tmppos.length == 2) {
                            position = tmppos[0]+"-"+(tcss.left < 0 ? "left": "right");
                        } else {
                            position = tcss.left < 0 ? "right": "left";
                        }

                        break;

                    case "y":
                        if (tmppos.length == 2) {
                            position = (tcss.top < 0 ? "bottom": "top")+"-"+tmppos[1];
                        } else {
                            position = (tcss.top < 0 ? "bottom": "top");
                        }

                        break;

                    case "xy":
                        if (tmppos.length == 2) {
                            position = (tcss.top < 0 ? "bottom": "top")+"-"+(tcss.left < 0 ? "left": "right");
                        } else {
                            position = tcss.left < 0 ? "right": "left";
                        }

                        break;

                }

                tmppos = position.split("-");

                UI.$.extend(tcss, variants[tmppos[0]]);

                if (tmppos.length == 2) tcss.left = (tmppos[1] == 'left') ? (pos.left) : ((pos.left + pos.width) - width);
            }


            tcss.left -= UI.$body.position().left;

            tooltipdelay = setTimeout(function(){

                $tooltip.css(tcss).attr("class", ["uk-tooltip", "uk-tooltip-"+position, $this.options.cls].join(' '));

                if ($this.options.animation) {
                    $tooltip.css({opacity: 0, display: 'block'}).addClass($this.options.activeClass).animate({opacity: 1}, parseInt($this.options.animation, 10) || 400);
                } else {
                    $tooltip.show().addClass($this.options.activeClass);
                }

                tooltipdelay = false;

                // close tooltip if element was removed or hidden
                checkdelay = setInterval(function(){
                    if(!$this.element.is(':visible')) $this.hide();
                }, 150);

            }, parseInt(this.options.delay, 10) || 0);
        },

        hide: function() {
            if(this.element.is("input") && this.element[0]===document.activeElement) return;

            if(tooltipdelay) clearTimeout(tooltipdelay);
            if (checkdelay)  clearTimeout(checkdelay);

            $tooltip.stop();

            if (this.options.animation) {

                var $this = this;

                $tooltip.fadeOut(parseInt(this.options.animation, 10) || 400, function(){
                    $tooltip.removeClass($this.options.activeClass)
                });

            } else {
                $tooltip.hide().removeClass(this.options.activeClass);
            }
        },

        content: function() {
            return this.tip;
        },

        checkBoundary: function(left, top, width, height) {

            var axis = "";

            if(left < 0 || ((left - UI.$win.scrollLeft())+width) > window.innerWidth) {
               axis += "x";
            }

            if(top < 0 || ((top - UI.$win.scrollTop())+height) > window.innerHeight) {
               axis += "y";
            }

            return axis;
        }
    });

    return UI.tooltip;
});

/*! UIkit 2.21.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
(function(addon) {

    var component;

    if (window.UIkit) {
        component = addon(UIkit);
    }

    if (typeof define == "function" && define.amd) {
        define("uikit-search", ["uikit"], function(){
            return component || addon(UIkit);
        });
    }

})(function(UI){

    "use strict";


    UI.component('timepicker', {

        defaults: {
            format : '24h',
            delay  : 0,
            start  : 0,
            end    : 24
        },

        boot: function() {

            // init code
            UI.$html.on("focus.timepicker.uikit", "[data-uk-timepicker]", function(e) {

                var ele = UI.$(this);

                if (!ele.data("timepicker")) {
                    var obj = UI.timepicker(ele, UI.Utils.options(ele.attr("data-uk-timepicker")));

                    setTimeout(function(){
                        obj.autocomplete.input.focus();
                    }, 40);
                }
            });
        },

        init: function() {

            var $this  = this, times = getTimeRange(this.options.start, this.options.end), container;

            this.options.minLength = 0;
            this.options.template  = '<ul class="uk-nav uk-nav-autocomplete uk-autocomplete-results">{{~items}}<li data-value="{{$item.value}}"><a>{{$item.value}}</a></li>{{/items}}</ul>';

            this.options.source = function(release) {
                release(times[$this.options.format] || times['12h']);
            };

            if (this.element.is('input')) {
                this.element.wrap('<div class="uk-autocomplete"></div>');
                container = this.element.parent();
            } else {
                container = this.element.addClass('uk-autocomplete');
            }

            this.autocomplete = UI.autocomplete(container, this.options);
            this.autocomplete.dropdown.addClass('uk-dropdown-small uk-dropdown-scrollable');

            this.autocomplete.on('show.uk.autocomplete', function() {

                var selected = $this.autocomplete.dropdown.find('[data-value="'+$this.autocomplete.input.val()+'"]');

                setTimeout(function(){
                    $this.autocomplete.pick(selected, true);
                }, 10);
            });

            this.autocomplete.input.on('focus', function(){

                $this.autocomplete.value = Math.random();
                $this.autocomplete.triggercomplete();

            }).on('blur', function() {
                $this.checkTime();
            });

            this.element.data("timepicker", this);
        },

        checkTime: function() {

            var arr, timeArray, meridian = 'AM', hour, minute, time = this.autocomplete.input.val();

            if (this.options.format == '12h') {
                arr = time.split(' ');
                timeArray = arr[0].split(':');
                meridian = arr[1];
            } else {
                timeArray = time.split(':');
            }

            hour   = parseInt(timeArray[0], 10);
            minute = parseInt(timeArray[1], 10);

            if (isNaN(hour))   hour = 0;
            if (isNaN(minute)) minute = 0;

            if (this.options.format == '12h') {
                if (hour > 12) {
                    hour = 12;
                } else if (hour < 0) {
                    hour = 12;
                }

                if (meridian === 'am' || meridian === 'a') {
                    meridian = 'AM';
                } else if (meridian === 'pm' || meridian === 'p') {
                    meridian = 'PM';
                }

                if (meridian !== 'AM' && meridian !== 'PM') {
                    meridian = 'AM';
                }

            } else {

                if (hour >= 24) {
                    hour = 23;
                } else if (hour < 0) {
                    hour = 0;
                }
            }

            if (minute < 0) {
                minute = 0;
            } else if (minute >= 60) {
                minute = 0;
            }

            this.autocomplete.input.val(this.formatTime(hour, minute, meridian)).trigger('change');
        },

        formatTime: function(hour, minute, meridian) {
            hour = hour < 10 ? '0' + hour : hour;
            minute = minute < 10 ? '0' + minute : minute;
            return hour + ':' + minute + (this.options.format == '12h' ? ' ' + meridian : '');
        }
    });

    // helper

    function getTimeRange(start, end) {

        start = start || 0;
        end   = end || 24;

        var times = {'12h':[], '24h':[]}, i, h;

        for (i = start, h=''; i<end; i++) {

            h = ''+i;

            if (i<10)  h = '0'+h;

            times['24h'].push({value: (h+':00')});
            times['24h'].push({value: (h+':30')});

            if (i === 0) {
                h = 12;
                times['12h'].push({value: (h+':00 AM')});
                times['12h'].push({value: (h+':30 AM')});
            }

            if (i > 0 && i<13 && i!==12) {
                times['12h'].push({value: (h+':00 AM')});
                times['12h'].push({value: (h+':30 AM')});
            }

            if (i >= 12) {

                h = h-12;
                if (h === 0) h = 12;
                if (h < 10) h = '0'+String(h);

                times['12h'].push({value: (h+':00 PM')});
                times['12h'].push({value: (h+':30 PM')});
            }
        }

        return times;
    }

});

/*! UIkit 2.21.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
(function(addon) {

    var component;

    if (window.UIkit) {
        component = addon(UIkit);
    }

    if (typeof define == "function" && define.amd) {
        define("uikit-upload", ["uikit"], function(){
            return component || addon(UIkit);
        });
    }

})(function(UI){

    "use strict";

    UI.component('uploadSelect', {

        init: function() {

            var $this = this;

            this.on("change", function() {
                xhrupload($this.element[0].files, $this.options);
                var twin = $this.element.clone(true).data('uploadSelect', $this);
                $this.element.replaceWith(twin);
                $this.element = twin;
            });
        }
    });

    UI.component('uploadDrop', {

        defaults: {
            'dragoverClass': 'uk-dragover'
        },

        init: function() {

            var $this = this, hasdragCls = false;

            this.on("drop", function(e){

                if (e.dataTransfer && e.dataTransfer.files) {

                    e.stopPropagation();
                    e.preventDefault();

                    $this.element.removeClass($this.options.dragoverClass);
                    $this.element.trigger('dropped.uk.upload', [e.dataTransfer.files]);

                    xhrupload(e.dataTransfer.files, $this.options);
                }

            }).on("dragenter", function(e){
                e.stopPropagation();
                e.preventDefault();
            }).on("dragover", function(e){
                e.stopPropagation();
                e.preventDefault();

                if (!hasdragCls) {
                    $this.element.addClass($this.options.dragoverClass);
                    hasdragCls = true;
                }
            }).on("dragleave", function(e){
                e.stopPropagation();
                e.preventDefault();
                $this.element.removeClass($this.options.dragoverClass);
                hasdragCls = false;
            });
        }
    });


    UI.support.ajaxupload = (function() {

        function supportFileAPI() {
            var fi = document.createElement('INPUT'); fi.type = 'file'; return 'files' in fi;
        }

        function supportAjaxUploadProgressEvents() {
            var xhr = new XMLHttpRequest(); return !! (xhr && ('upload' in xhr) && ('onprogress' in xhr.upload));
        }

        function supportFormData() {
            return !! window.FormData;
        }

        return supportFileAPI() && supportAjaxUploadProgressEvents() && supportFormData();
    })();

    if (UI.support.ajaxupload){
        UI.$.event.props.push("dataTransfer");
    }

    function xhrupload(files, settings) {

        if (!UI.support.ajaxupload){
            return this;
        }

        settings = UI.$.extend({}, xhrupload.defaults, settings);

        if (!files.length){
            return;
        }

        if (settings.allow !== '*.*') {

            for(var i=0,file;file=files[i];i++) {

                if(!matchName(settings.allow, file.name)) {

                    if(typeof(settings.notallowed) == 'string') {
                       alert(settings.notallowed);
                    } else {
                       settings.notallowed(file, settings);
                    }
                    return;
                }
            }
        }

        var complete = settings.complete;

        if (settings.single){

            var count    = files.length,
                uploaded = 0,
                allow    = true;

                settings.beforeAll(files);

                settings.complete = function(response, xhr){

                    uploaded = uploaded + 1;

                    complete(response, xhr);

                    if (settings.filelimit && uploaded >= settings.filelimit){
                        allow = false;
                    }

                    if (allow && uploaded<count){
                        upload([files[uploaded]], settings);
                    } else {
                        settings.allcomplete(response, xhr);
                    }
                };

                upload([files[0]], settings);

        } else {

            settings.complete = function(response, xhr){
                complete(response, xhr);
                settings.allcomplete(response, xhr);
            };

            upload(files, settings);
        }

        function upload(files, settings){

            // upload all at once
            var formData = new FormData(), xhr = new XMLHttpRequest();

            if (settings.before(settings, files)===false) return;

            for (var i = 0, f; f = files[i]; i++) { formData.append(settings.param, f); }
            for (var p in settings.params) { formData.append(p, settings.params[p]); }

            // Add any event handlers here...
            xhr.upload.addEventListener("progress", function(e){
                var percent = (e.loaded / e.total)*100;
                settings.progress(percent, e);
            }, false);

            xhr.addEventListener("loadstart", function(e){ settings.loadstart(e); }, false);
            xhr.addEventListener("load",      function(e){ settings.load(e);      }, false);
            xhr.addEventListener("loadend",   function(e){ settings.loadend(e);   }, false);
            xhr.addEventListener("error",     function(e){ settings.error(e);     }, false);
            xhr.addEventListener("abort",     function(e){ settings.abort(e);     }, false);

            xhr.open(settings.method, settings.action, true);

            xhr.onreadystatechange = function() {

                settings.readystatechange(xhr);

                if (xhr.readyState==4){

                    var response = xhr.responseText;

                    if (settings.type=="json") {
                        try {
                            response = UI.$.parseJSON(response);
                        } catch(e) {
                            response = false;
                        }
                    }

                    settings.complete(response, xhr);
                }
            };
            settings.beforeSend(xhr);
            xhr.send(formData);
        }
    }

    xhrupload.defaults = {
        'action': '',
        'single': true,
        'method': 'POST',
        'param' : 'files[]',
        'params': {},
        'allow' : '*.*',
        'type'  : 'text',
        'filelimit': false,

        // events
        'before'          : function(o){},
        'beforeSend'      : function(xhr){},
        'beforeAll'       : function(){},
        'loadstart'       : function(){},
        'load'            : function(){},
        'loadend'         : function(){},
        'error'           : function(){},
        'abort'           : function(){},
        'progress'        : function(){},
        'complete'        : function(){},
        'allcomplete'     : function(){},
        'readystatechange': function(){},
        'notallowed'      : function(file, settings){ alert('Only the following file types are allowed: '+settings.allow); }
    };

    function matchName(pattern, path) {

        var parsedPattern = '^' + pattern.replace(/\//g, '\\/').
            replace(/\*\*/g, '(\\/[^\\/]+)*').
            replace(/\*/g, '[^\\/]+').
            replace(/((?!\\))\?/g, '$1.') + '$';

        parsedPattern = '^' + parsedPattern + '$';

        return (path.match(new RegExp(parsedPattern, 'i')) !== null);
    }

    UI.Utils.xhrupload = xhrupload;

    return xhrupload;
});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//





  WebFontConfig = {
            google: {
                families: [
                    'Source+Code+Pro:400,700:latin',
                    'Roboto:400,300,500,700,400italic:latin'
                ]
            }
        };
        (function() {
            var wf = document.createElement('script');
            wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
            '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        })();

        $(function() {
            altair_helpers.retina_images();
        });
