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
function isHighDensity(){return window.matchMedia&&(window.matchMedia("only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)").matches||window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)").matches)||window.devicePixelRatio&&window.devicePixelRatio>1.3}function scrollbarWidth(){var e=jQuery('<div style="width: 100%; height:200px;">test</div>'),i=jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append(e),t=e[0],e=i[0];return jQuery("body").append(e),t=t.offsetWidth,i.css("overflow","scroll"),e=e.clientWidth,i.remove(),t-e}function randID_generator(){var e=String.fromCharCode(65+Math.floor(26*Math.random()));return e+Date.now()}function hex2rgba(e,i){return e=e.replace("#",""),r=parseInt(e.substring(0,2),16),g=parseInt(e.substring(2,4),16),b=parseInt(e.substring(4,6),16),result="rgba("+r+","+g+","+b+","+i/100+")",result}function lsTest(){var e="test";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(i){return!1}}$(function(){"use strict";Modernizr.touch&&FastClick.attach(document.body),altair_page_onload.init(),altair_main_header.init(),altair_main_sidebar.init(),altair_secondary_sidebar.init(),altair_top_bar.init(),altair_md.init(),altair_forms.init(),altair_uikit.init(),altair_helpers.truncate_text($(".truncate-text"))}),function(e){var i,t,a=e.event;i=a.special.debouncedresize={setup:function(){e(this).on("resize",i.handler)},teardown:function(){e(this).off("resize",i.handler)},handler:function(e,n){var o=this,s=arguments,r=function(){e.type="debouncedresize",a.dispatch.apply(o,s)};t&&clearTimeout(t),n?r():t=setTimeout(r,i.threshold)},threshold:150}}(jQuery),function(e){var i,t,a,n=e.event,o={_:0},s=0;i=n.special.throttledresize={setup:function(){e(this).on("resize",i.handler)},teardown:function(){e(this).off("resize",i.handler)},handler:function(r,d){var c=this,l=arguments;t=!0,a||(setInterval(function(){s++,(s>i.threshold&&t||d)&&(r.type="throttledresize",n.dispatch.apply(c,l),t=!1,s=0),s>9&&(e(o).stop(),a=!1,s=0)},30),a=!0)},threshold:0}}(jQuery),jQuery.fn.reverse=[].reverse,$.fn.serializeObject=function(){var e={},i=this.serializeArray();return $.each(i,function(){void 0!==e[this.name]?(e[this.name].push||(e[this.name]=[e[this.name]]),e[this.name].push(this.value||"")):e[this.name]=this.value||""}),e},"undefined"!=typeof $.fn.selectize&&(Selectize.define("dropdown_append_page",function(e){this.positionDropdown=function(){var e=this.$control,i=e.offset(),t=i.left-parseInt($page_content.css("margin-left")),a=i.top+$page_content.scrollTop()-$page_content.position().top+e.outerHeight(!0);this.$dropdown.css({width:e.outerWidth(),top:a,left:t})}}),Selectize.define("dropdown_after",function(e){this.positionDropdown=function(){var e=this.$control,i=e.position(),t=i.left,a=i.top+e.outerHeight(!0)+32;this.$dropdown.css({width:e.outerWidth(),top:a,left:t})}})),easing_swiftOut=[.4,0,.2,1];var $body=$("body"),$document=$(document),$window=$(window),$page_content=$("#page_content"),$page_content_inner=$("#page_content_inner"),$sidebar_main=$("#sidebar_main"),$sidebar_main_toggle=$("#sidebar_main_toggle"),$sidebar_secondary=$("#sidebar_secondary"),$sidebar_secondary_toggle=$("#sidebar_secondary_toggle"),$topBar=$("#top_bar"),$header_main=$("#header_main"),header__main_height=48;altair_page_onload={init:function(){$window.load(function(){altair_helpers.hierarchical_show(),altair_helpers.hierarchical_slide()})}},altair_page_content={hide_content_sidebar:function(){$body.hasClass("header_double_height")||$page_content.css({paddingRight:scrollbarWidth(),overflow:"hidden"})},show_content_sidebar:function(){$body.hasClass("header_double_height")||$page_content.css({paddingRight:"",overflow:""})}},altair_forms={init:function(){altair_forms.textarea_autosize(),altair_forms.select_elements(),altair_forms.switches()},textarea_autosize:function(){autosize($("textarea.textarea_autosize,textarea.md-input"))},select_elements:function(){var e=$("[data-md-selectize],.data-md-selectize");e.each(function(){var e=$(this);if(!e.hasClass("selectized")){var i=e.attr("data-md-selectize-bottom");e.after('<div class="selectize_fix"></div>').selectize({plugins:["dropdown_append_page"],dropdownParent:$page_content,hideSelected:!0,onDropdownOpen:function(e){e.hide().velocity("slideDown",{begin:function(){"undefined"!=typeof i&&e.css({"margin-top":"0"})},duration:200,easing:easing_swiftOut})},onDropdownClose:function(e){e.show().velocity("slideUp",{complete:function(){"undefined"!=typeof i&&e.css({"margin-top":""})},duration:200,easing:easing_swiftOut})}})}});var i=$("[data-md-selectize-inline]");i.each(function(){var e=$(this);if(!e.hasClass("selectized")){var i=e.attr("data-md-selectize-bottom");e.after('<div class="selectize_fix"></div>').closest("div").addClass("uk-position-relative").end().selectize({plugins:["dropdown_after"],dropdownParent:e.closest("div"),hideSelected:!0,onDropdownOpen:function(e){e.hide().velocity("slideDown",{begin:function(){"undefined"!=typeof i&&e.css({"margin-top":"0"})},duration:200,easing:easing_swiftOut})},onDropdownClose:function(e){e.show().velocity("slideUp",{complete:function(){"undefined"!=typeof i&&e.css({"margin-top":""})},duration:200,easing:easing_swiftOut})}})}})},switches:function(){var e=$("[data-switchery]");e.length&&e.each(function(){var e=this,i=$(e).attr("data-switchery-size"),t=$(e).attr("data-switchery-color"),a=$(e).attr("data-switchery-secondary-color");new Switchery(e,{color:"undefined"!=typeof t?hex2rgba(t,50):hex2rgba("#009688",50),jackColor:"undefined"!=typeof t?hex2rgba(t,100):hex2rgba("#009688",100),secondaryColor:"undefined"!=typeof a?hex2rgba(a,50):"rgba(0, 0, 0,0.26)",jackSecondaryColor:"undefined"!=typeof a?hex2rgba(a,50):"#fafafa",className:"switchery"+("undefined"!=typeof i?" switchery-"+i:"")})})},parsley_validation_config:function(){window.ParsleyConfig={excluded:"input[type=button], input[type=submit], input[type=reset], input[type=hidden], input.exclude_validation",trigger:"change",errorsWrapper:'<div class="parsley-errors-list"></div>',errorTemplate:"<span></span>",errorsContainer:function(e){var i=e.$element;return i.closest(".uk-form-row")},classHandler:function(e){var i=e.$element;return i.is(":checkbox")||i.is(":radio")||i.parent().is("label")||$(i).is("[data-md-selectize]")?i.closest(".uk-form-row"):void 0}}}},altair_main_sidebar={init:function(){$sidebar_main_toggle.on("click",function(e){e.preventDefault(),$body.hasClass("sidebar_main_active")||$body.hasClass("sidebar_main_open")&&$window.width()>=1220?altair_main_sidebar.hide_sidebar():altair_main_sidebar.show_sidebar()}),$document.on("click keyup",function(e){$body.hasClass("sidebar_main_active")&&$window.width()<1220&&(!$(e.target).closest($sidebar_main).length&&!$(e.target).closest($sidebar_main_toggle).length||27==e.keyCode)&&altair_main_sidebar.hide_sidebar()}),$(".sidebar_main_close_button").on("click",function(e){e.preventDefault(),altair_main_sidebar.hide_sidebar()}),altair_helpers.custom_scrollbar($sidebar_main),$body.hasClass("sidebar_main_active")&&$window.width()<1220?altair_page_content.hide_content_sidebar():altair_page_content.show_content_sidebar(),altair_main_sidebar.main_menu(),altair_main_sidebar.lang_switcher()},hide_sidebar:function(){$body.addClass("sidebar_main_hiding").removeClass("sidebar_main_active sidebar_main_open"),$window.width()<1220&&altair_page_content.show_content_sidebar(),setTimeout(function(){$body.removeClass("sidebar_main_hiding"),$window.resize()},280)},show_sidebar:function(){$body.addClass("sidebar_main_active"),$window.width()<1220&&altair_page_content.hide_content_sidebar(),setTimeout(function(){$window.resize()},280)},main_menu:function(){$sidebar_main.find(".menu_section > ul").children("li").each(function(){var e=$(this).children("ul").length;e&&$(this).addClass("submenu_trigger")}),$(".submenu_trigger > a").on("click",function(e){e.preventDefault();var i=$(this),t=i.next("ul").is(":visible")?"slideUp":"slideDown";i.next("ul").velocity(t,{duration:400,easing:easing_swiftOut,begin:function(){"slideUp"==t?$(this).closest(".submenu_trigger").removeClass("act_section"):$(this).closest(".submenu_trigger").addClass("act_section")},complete:function(){"slideUp"!==t&&i.closest(".act_section").velocity("scroll",{duration:500,easing:easing_swiftOut,container:$("#sidebar_main").find(".scroll-content")})}})}),$sidebar_main.find(".act_item").closest(".submenu_trigger").addClass("act_section").children("a").trigger("click")},lang_switcher:function(){var e=$("#lang_switcher");e.length&&(e.selectize({options:[{id:1,title:"English",value:"gb"},{id:2,title:"French",value:"fr"},{id:3,title:"Chinese",value:"cn"},{id:4,title:"Dutch",value:"nl"},{id:5,title:"Italian",value:"it"},{id:6,title:"Spanish",value:"es"},{id:7,title:"German",value:"de"},{id:8,title:"Polish",value:"pl"}],render:{option:function(e,i){return'<div class="option"><i class="item-icon flag-'+i(e.value).toUpperCase()+'"></i><span>'+i(e.title)+"</span></div>"},item:function(e,i){return'<div class="item"><i class="item-icon flag-'+i(e.value).toUpperCase()+'"></i></div>'}},valueField:"value",labelField:"title",searchField:"title",create:!1,onDropdownOpen:function(e){e.hide().velocity("slideDown",{begin:function(){e.css({"margin-top":"-33px"})},duration:200,easing:easing_swiftOut})},onDropdownClose:function(e){e.show().velocity("slideUp",{complete:function(){e.css({"margin-top":""})},duration:200,easing:easing_swiftOut})}}),e.next().children(".selectize-input").find("input").attr("readonly",!0))}},altair_secondary_sidebar={init:function(){$sidebar_secondary.length&&($sidebar_secondary_toggle.removeClass("sidebar_secondary_check"),$sidebar_secondary_toggle.on("click",function(e){e.preventDefault(),$body.hasClass("sidebar_secondary_active")?altair_secondary_sidebar.hide_sidebar():altair_secondary_sidebar.show_sidebar()}),$document.on("click keydown",function(e){!$body.hasClass("sidebar_secondary_active")||($(e.target).closest($sidebar_secondary).length||$(e.target).closest($sidebar_secondary_toggle).length)&&27!=e.which||altair_secondary_sidebar.hide_sidebar()}),$body.hasClass("sidebar_secondary_active")&&altair_secondary_sidebar.hide_sidebar(),altair_helpers.custom_scrollbar($sidebar_secondary))},hide_sidebar:function(){$sidebar_secondary.velocity({right:-$sidebar_secondary.width()-4},{duration:280,easing:easing_swiftOut,begin:function(){$body.removeClass("sidebar_secondary_active"),$window.width()<1220&&$page_content.css({paddingRight:"",overflow:""})}})},show_sidebar:function(){$sidebar_secondary.velocity({right:0},{duration:400,easing:easing_swiftOut,begin:function(){$body.addClass("sidebar_secondary_active"),$window.width()<1220&&$page_content.css({paddingRight:"",overflow:""})}})}},altair_top_bar={init:function(){if($topBar.length){var e=parseInt($topBar.css("paddingRight"));$topBar.css({paddingRight:e+scrollbarWidth()}),$body.addClass("top_bar_active")}}},altair_main_header={init:function(){altair_main_header.search_activate()},search_activate:function(){$("#main_search_btn").on("click",function(e){e.preventDefault(),altair_main_header.search_show()}),$(document).on("click keydown",function(e){$body.hasClass("main_search_active")&&(!$(e.target).closest(".header_main_search_form").length&&!$(e.target).closest("#main_search_btn").length||27==e.which)&&altair_main_header.search_hide()}),$(".header_main_search_close").on("click",function(){altair_main_header.search_hide()})},search_show:function(){$header_main.children(".header_main_content").velocity("transition.slideUpBigOut",{duration:280,easing:easing_swiftOut,begin:function(){$body.addClass("main_search_active")},complete:function(){$header_main.children(".header_main_search_form").velocity("transition.slideDownBigIn",{duration:280,easing:easing_swiftOut,complete:function(){$(".header_main_search_input").focus()}})}})},search_hide:function(){$header_main.children(".header_main_search_form").velocity("transition.slideUpBigOut",{duration:280,easing:easing_swiftOut,begin:function(){$header_main.velocity("reverse"),$body.removeClass("main_search_active")},complete:function(){$header_main.children(".header_main_content").velocity("transition.slideDownBigIn",{duration:280,easing:easing_swiftOut,complete:function(){$(".header_main_search_input").blur().val("")}})}})}},altair_md={init:function(){altair_md.inputs(),altair_md.checkbox_radio(),altair_md.card_fullscreen(),altair_md.card_expand(),altair_md.card_overlay(),altair_md.card_single(),altair_md.list_outside(),altair_md.fab_actions()},card_fullscreen:function(){$(".md-card-fullscreen-activate").on("click",function(){var e=$(this).closest(".md-card"),i=e.height(),t=e.width();e.after('<div class="md-card-placeholder" style="width:'+t+"px;height:"+i+'px;"/>'),e.addClass("md-card-fullscreen").css({width:t,height:i}).velocity({left:0,top:0},{duration:600,easing:easing_swiftOut,begin:function(i){e.find(".md-card-toolbar").prepend('<span class="md-icon md-card-fullscreen-deactivate material-icons uk-float-left">&#xE5C4;</span>'),altair_page_content.hide_content_sidebar()}}).velocity({height:"100%",width:"100%"},{duration:600,easing:easing_swiftOut,complete:function(i){$(window).resize(),e.find(".md-card-fullscreen-content").velocity("transition.slideUpBigIn",{duration:600,easing:easing_swiftOut,complete:function(e){$(window).resize()}})}})}),$page_content.on("click",".md-card-fullscreen-deactivate",function(){var e=$(".md-card-placeholder"),i=e.height(),t=e.width(),a=e.offset().top,n=e.offset().left,o=$(".md-card-fullscreen");o.velocity({height:i,width:t},{duration:600,easing:easing_swiftOut,begin:function(e){o.find(".md-card-fullscreen-content").velocity("transition.slideDownOut",{duration:275,easing:easing_swiftOut})},complete:function(e){$window.resize(),o.find(".md-card-fullscreen-deactivate").remove(),altair_page_content.show_content_sidebar()}}).velocity({left:n,top:a},{duration:600,easing:easing_swiftOut,complete:function(i){o.removeClass("md-card-fullscreen").css({width:"",height:"",left:"",top:""}),e.remove(),$body.removeClass("md-card-fullscreen-active")}})})},card_expand:function(){$(".md-expand").velocity("transition.expandIn",{stagger:175,drag:!0}),$(".md-expand-group").children().velocity("transition.expandIn",{stagger:175,drag:!0})},card_overlay:function(){$(".md-card").on("click",".md-card-overlay-toggler",function(e){e.preventDefault(),$(this).closest(".md-card").hasClass("md-card-overlay-active")?$(this).html("&#xE5D4;").closest(".md-card").removeClass("md-card-overlay-active"):$(this).html("&#xE5CD;").closest(".md-card").addClass("md-card-overlay-active")})},card_single:function(){function e(){var e=$window.height()-(2*header__main_height+10);i.find(".md-card-content").innerHeight(e)}var i=$(".md-card-single");i&&$body.hasClass("header_double_height")&&(e(),$window.on("debouncedresize",function(){e()}))},card_show_hide:function(e,i,t,a){$(e).velocity({scale:0,opacity:.2},{duration:400,easing:easing_swiftOut,begin:function(){"undefined"!=typeof i&&i(a)},complete:function(){"undefined"!=typeof t&&t(a)}}).velocity("reverse")},list_outside:function(){function e(){var e=$window.height()-(2*header__main_height+10);i.height(e)}var i=$(".md-list-outside-wrapper");i&&$body.hasClass("header_double_height")&&(e(),$window.on("debouncedresize",function(){e()}),altair_helpers.custom_scrollbar(i))},inputs:function(e){var i="undefined"==typeof e?$(".md-input"):$(e).find(".md-input");i.each(function(){if(!$(this).closest(".md-input-wrapper").length){var e=$(this);e.prev("label").length?e.prev("label").andSelf().wrapAll('<div class="md-input-wrapper"/>'):e.siblings("[data-uk-form-password]").length?e.siblings("[data-uk-form-password]").andSelf().wrapAll('<div class="md-input-wrapper"/>'):e.wrap('<div class="md-input-wrapper"/>'),e.closest(".md-input-wrapper").append('<span class="md-input-bar"/>'),altair_md.update_input(e)}$body.on("focus",".md-input",function(){$(this).closest(".md-input-wrapper").addClass("md-input-focus")}).on("blur",".md-input",function(){$(this).closest(".md-input-wrapper").removeClass("md-input-focus"),""!=$(this).val()?$(this).closest(".md-input-wrapper").addClass("md-input-filled"):$(this).closest(".md-input-wrapper").removeClass("md-input-filled")}).on("change",".md-input",function(){altair_md.update_input($(this))})})},checkbox_radio:function(){var e=$("[data-md-icheck],.data-md-icheck");e.each(function(){$(this).next(".iCheck-helper").length||$(this).iCheck({checkboxClass:"icheckbox_md",radioClass:"iradio_md",increaseArea:"20%"}).on("ifToggled",function(e){$(e.currentTarget).attr("data-parsley-id")&&$(this).parsley().validate(!0)})})},update_input:function(e){e.closest(".md-input-wrapper").removeClass("md-input-wrapper-danger md-input-wrapper-success md-input-wrapper-disabled"),e.hasClass("md-input-danger")&&e.closest(".md-input-wrapper").addClass("md-input-wrapper-danger"),e.hasClass("md-input-success")&&e.closest(".md-input-wrapper").addClass("md-input-wrapper-success"),e.prop("disabled")&&e.closest(".md-input-wrapper").addClass("md-input-wrapper-disabled"),""!=e.val()&&e.closest(".md-input-wrapper").addClass("md-input-filled")},fab_actions:function(){$(".md-fab-actions").append('<i class="material-icons md-fab-action-close">&#xE5CD;</i>').on("click",function(){$(this).closest(".md-fab-wrapper").hasClass("md-fab-active")?$(this).closest(".md-fab-wrapper").removeClass("md-fab-active"):$(this).closest(".md-fab-wrapper").addClass("md-fab-active")})}},altair_helpers={truncate_text:function(e){e.each(function(){e.dotdotdot({watch:"window"})})},custom_scrollbar:function(e){e.wrapInner("<div class='scrollbar-inner'></div>"),Modernizr.touch&&e.addClass("touchscroll"),e.children(".scrollbar-inner").scrollbar({disableBodyScroll:!0,scrollx:!1,duration:100})},hierarchical_show:function(){$hierarchical_show=$(".hierarchical_show"),$hierarchical_show.length&&$hierarchical_show.each(function(){var e=$(this),i=e.children().length,t=60;e.children().each(function(e){$(this).css({"-webkit-animation-delay":e*t+"ms","animation-delay":e*t+"ms"})}).end().waypoint({handler:function(){e.addClass("hierarchical_show_inView"),setTimeout(function(){e.removeClass("hierarchical_show hierarchical_show_inView fast_animation").children().css({"-webkit-animation-delay":"","animation-delay":""})},i*t+1200),this.destroy()},context:"#page_content",offset:"90%"})})},hierarchical_slide:function(){$hierarchical_slide=$(".hierarchical_slide"),$hierarchical_slide.length&&$hierarchical_slide.each(function(){var e=$(this),i=e.attr("data-slide-children")?e.children(e.attr("data-slide-children")):e.children(),t=i.length,a=e.attr("data-slide-context")?e.closest(e.attr("data-slide-context")):"#page_content",n=100;t>1&&(i.each(function(e){$(this).css({"-webkit-animation-delay":e*n+"ms","animation-delay":e*n+"ms"})}),e.waypoint({handler:function(){e.addClass("hierarchical_slide_inView"),setTimeout(function(){e.removeClass("hierarchical_slide hierarchical_slide_inView"),i.css({"-webkit-animation-delay":"","animation-delay":""})},t*n+1200),this.destroy()},context:a,offset:"90%"}))})},content_preloader_show:function(e){if(!$body.find(".content-preloader").length){var i=isHighDensity()?"@2x":"",t="regular"==e?'<img src="assets/img/spinners/spinner'+i+'.gif" alt="" width="32" height="32">':'<div class="md-preloader"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="32" width="32" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg></div>';$body.append('<div class="content-preloader">'+t+"</div>"),setTimeout(function(){$(".content-preloader").addClass("preloader-active")},0)}},content_preloader_hide:function(){$body.find(".content-preloader").length&&($(".content-preloader").removeClass("preloader-active"),preloader_timeout=window.setTimeout(function(){$(".content-preloader").remove()},500))},color_picker:function(e,i){if(e){for(var t=randID_generator(),a=i?i:["#e53935","#d81b60","#8e24aa","#5e35b1","#3949ab","#1e88e5","#039be5","#0097a7","#00897b","#43a047","#689f38","#ef6c00","#f4511e","#6d4c41","#757575","#546e7a"],n=a.length,o=$('<div class="cp_altair" id="'+t+'"/>'),s=0;n>s;s++)o.append("<span data-color="+a[s]+' style="background:'+a[s]+'"></span>');return o.append('<input type="hidden">'),$body.on("click","#"+t+" span",function(){$(this).addClass("active_color").siblings().removeClass("active_color").end().closest(".cp_altair").find("input").val($(this).attr("data-color"))}),e.append(o)}},retina_images:function(){"undefined"!=typeof $.fn.dense&&$("img").dense({glue:"@"})}},altair_uikit={init:function(){altair_uikit.override_defaults()},override_defaults:function(){"undefined"!=typeof UIkit&&UIkit.on("beforeready.uk.dom",function(){"undefined"!=typeof UIkit.components.accordion&&$.extend(UIkit.components.accordion.prototype.defaults,{easing:$.bez(easing_swiftOut),duration:200}),"undefined"!=typeof UIkit.components.dropdown.prototype&&($.extend(UIkit.components.dropdown.prototype.defaults,{remaintime:150,delay:50}),function(){var e=UIkit.components.dropdown.prototype.show;UIkit.components.dropdown.prototype.show=function(){this.dropdown.css({"min-width":this.dropdown.outerWidth()}).addClass("uk-dropdown-active uk-dropdown-shown");var i=e.apply(this,arguments);return i}}(),function(){var e=UIkit.components.dropdown.prototype.hide;UIkit.components.dropdown.prototype.hide=function(){var i=this.dropdown;i.removeClass("uk-dropdown-shown");var t=(setTimeout(function(){i.removeClass("uk-dropdown-active")},280),e.apply(this,arguments));return t}}()),"undefined"!=typeof UIkit.components.modal&&($.extend(UIkit.components.modal.prototype.defaults,{center:!0}),UIkit.modal.dialog.template='<div class="uk-modal uk-modal-dialog-replace"><div class="uk-modal-dialog" style="min-height:0;"></div></div>',$body.on("show.uk.modal",".uk-modal-dialog-replace",function(){setTimeout(function(){var e=$(".uk-modal-dialog-replace");if(e.find(".uk-button-primary").length){var i=e.find(".uk-button-primary").toggleClass("uk-button-primary md-btn-flat-primary");i.next("button")&&i.next("button").after(i)}e.find(".uk-button").length&&e.find(".uk-button").toggleClass("uk-button md-btn md-btn-flat"),e.find(".uk-margin-small-top").length&&e.find(".uk-margin-small-top").toggleClass("uk-margin-small-top uk-margin-top"),e.find("input.uk-width-1-1").length&&(e.find("input.uk-width-1-1").toggleClass("uk-width-1-1 md-input"),altair_md.inputs()),e.find(".uk-form").length&&e.find(".uk-form").removeClass("uk-form")},50)})),"undefined"!=typeof UIkit.components.tooltip&&$.extend(UIkit.components.tooltip.prototype.defaults,{animation:!0,offset:8})})},reinitialize_grid_margin:function(){$("[data-uk-grid-margin]").each(function(){var e=$(this);e.data("gridMargin")||$.UIkit.gridMargin(e,$.UIkit.Utils.options(e.attr("data-uk-grid-margin")))}),$window.resize()}};
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





$(document).ready(function() {

 $("a.fancyBoxLink").fancybox({
        'href'   : '#myDivID',
        'titleShow'  : false,
        'transitionIn'  : 'elastic',
        'transitionOut' : 'elastic'
    });

 });
!function(e,t){"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){function n(e){var t="length"in e&&e.length,n=J.type(e);return"function"===n||J.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e}function r(e,t,n){if(J.isFunction(t))return J.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return J.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(ae.test(t))return J.filter(t,e,n);t=J.filter(t,e)}return J.grep(e,function(e){return Y.call(t,e)>=0!==n})}function i(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}function o(e){var t=he[e]={};return J.each(e.match(fe)||[],function(e,n){t[n]=!0}),t}function s(){G.removeEventListener("DOMContentLoaded",s,!1),e.removeEventListener("load",s,!1),J.ready()}function a(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=J.expando+a.uid++}function l(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(we,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:be.test(n)?J.parseJSON(n):n}catch(i){}ye.set(e,t,n)}else n=void 0;return n}function c(){return!0}function u(){return!1}function d(){try{return G.activeElement}catch(e){}}function p(e,t){return J.nodeName(e,"table")&&J.nodeName(11!==t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function f(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function h(e){var t=Fe.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function g(e,t){for(var n=0,r=e.length;r>n;n++)ve.set(e[n],"globalEval",!t||ve.get(t[n],"globalEval"))}function m(e,t){var n,r,i,o,s,a,l,c;if(1===t.nodeType){if(ve.hasData(e)&&(o=ve.access(e),s=ve.set(t,o),c=o.events)){delete s.handle,s.events={};for(i in c)for(n=0,r=c[i].length;r>n;n++)J.event.add(t,i,c[i][n])}ye.hasData(e)&&(a=ye.access(e),l=J.extend({},a),ye.set(t,l))}}function v(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return void 0===t||t&&J.nodeName(e,t)?J.merge([e],n):n}function y(e,t){var n=t.nodeName.toLowerCase();"input"===n&&Se.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}function b(t,n){var r,i=J(n.createElement(t)).appendTo(n.body),o=e.getDefaultComputedStyle&&(r=e.getDefaultComputedStyle(i[0]))?r.display:J.css(i[0],"display");return i.detach(),o}function w(e){var t=G,n=qe[e];return n||(n=b(e,t),"none"!==n&&n||(ze=(ze||J("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),t=ze[0].contentDocument,t.write(),t.close(),n=b(e,t),ze.detach()),qe[e]=n),n}function x(e,t,n){var r,i,o,s,a=e.style;return n=n||Re(e),n&&(s=n.getPropertyValue(t)||n[t]),n&&(""!==s||J.contains(e.ownerDocument,e)||(s=J.style(e,t)),Me.test(s)&&Ve.test(t)&&(r=a.width,i=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=s,s=n.width,a.width=r,a.minWidth=i,a.maxWidth=o)),void 0!==s?s+"":s}function C(e,t){return{get:function(){return e()?void delete this.get:(this.get=t).apply(this,arguments)}}}function k(e,t){if(t in e)return t;for(var n=t[0].toUpperCase()+t.slice(1),r=t,i=Ue.length;i--;)if(t=Ue[i]+n,t in e)return t;return r}function S(e,t,n){var r=We.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function T(e,t,n,r,i){for(var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;4>o;o+=2)"margin"===n&&(s+=J.css(e,n+Ce[o],!0,i)),r?("content"===n&&(s-=J.css(e,"padding"+Ce[o],!0,i)),"margin"!==n&&(s-=J.css(e,"border"+Ce[o]+"Width",!0,i))):(s+=J.css(e,"padding"+Ce[o],!0,i),"padding"!==n&&(s+=J.css(e,"border"+Ce[o]+"Width",!0,i)));return s}function E(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Re(e),s="border-box"===J.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=x(e,t,o),(0>i||null==i)&&(i=e.style[t]),Me.test(i))return i;r=s&&(Z.boxSizingReliable()||i===e.style[t]),i=parseFloat(i)||0}return i+T(e,t,n||(s?"border":"content"),r,o)+"px"}function O(e,t){for(var n,r,i,o=[],s=0,a=e.length;a>s;s++)r=e[s],r.style&&(o[s]=ve.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&ke(r)&&(o[s]=ve.access(r,"olddisplay",w(r.nodeName)))):(i=ke(r),"none"===n&&i||ve.set(r,"olddisplay",i?n:J.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}function P(e,t,n,r,i){return new P.prototype.init(e,t,n,r,i)}function A(){return setTimeout(function(){Ze=void 0}),Ze=J.now()}function D(e,t){var n,r=0,i={height:e};for(t=t?1:0;4>r;r+=2-t)n=Ce[r],i["margin"+n]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function N(e,t,n){for(var r,i=(nt[t]||[]).concat(nt["*"]),o=0,s=i.length;s>o;o++)if(r=i[o].call(n,t,e))return r}function j(e,t,n){var r,i,o,s,a,l,c,u,d=this,p={},f=e.style,h=e.nodeType&&ke(e),g=ve.get(e,"fxshow");n.queue||(a=J._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,l=a.empty.fire,a.empty.fire=function(){a.unqueued||l()}),a.unqueued++,d.always(function(){d.always(function(){a.unqueued--,J.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[f.overflow,f.overflowX,f.overflowY],c=J.css(e,"display"),u="none"===c?ve.get(e,"olddisplay")||w(e.nodeName):c,"inline"===u&&"none"===J.css(e,"float")&&(f.display="inline-block")),n.overflow&&(f.overflow="hidden",d.always(function(){f.overflow=n.overflow[0],f.overflowX=n.overflow[1],f.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],Ke.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(h?"hide":"show")){if("show"!==i||!g||void 0===g[r])continue;h=!0}p[r]=g&&g[r]||J.style(e,r)}else c=void 0;if(J.isEmptyObject(p))"inline"===("none"===c?w(e.nodeName):c)&&(f.display=c);else{g?"hidden"in g&&(h=g.hidden):g=ve.access(e,"fxshow",{}),o&&(g.hidden=!h),h?J(e).show():d.done(function(){J(e).hide()}),d.done(function(){var t;ve.remove(e,"fxshow");for(t in p)J.style(e,t,p[t])});for(r in p)s=N(h?g[r]:0,r,d),r in g||(g[r]=s.start,h&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function I(e,t){var n,r,i,o,s;for(n in e)if(r=J.camelCase(n),i=t[r],o=e[n],J.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=J.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function L(e,t,n){var r,i,o=0,s=tt.length,a=J.Deferred().always(function(){delete l.elem}),l=function(){if(i)return!1;for(var t=Ze||A(),n=Math.max(0,c.startTime+c.duration-t),r=n/c.duration||0,o=1-r,s=0,l=c.tweens.length;l>s;s++)c.tweens[s].run(o);return a.notifyWith(e,[c,o,n]),1>o&&l?n:(a.resolveWith(e,[c]),!1)},c=a.promise({elem:e,props:J.extend({},t),opts:J.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Ze||A(),duration:n.duration,tweens:[],createTween:function(t,n){var r=J.Tween(e,c.opts,t,n,c.opts.specialEasing[t]||c.opts.easing);return c.tweens.push(r),r},stop:function(t){var n=0,r=t?c.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)c.tweens[n].run(1);return t?a.resolveWith(e,[c,t]):a.rejectWith(e,[c,t]),this}}),u=c.props;for(I(u,c.opts.specialEasing);s>o;o++)if(r=tt[o].call(c,e,u,c.opts))return r;return J.map(u,N,c),J.isFunction(c.opts.start)&&c.opts.start.call(e,c),J.fx.timer(J.extend(l,{elem:e,anim:c,queue:c.opts.queue})),c.progress(c.opts.progress).done(c.opts.done,c.opts.complete).fail(c.opts.fail).always(c.opts.always)}function $(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(fe)||[];if(J.isFunction(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function F(e,t,n,r){function i(a){var l;return o[a]=!0,J.each(e[a]||[],function(e,a){var c=a(t,n,r);return"string"!=typeof c||s||o[c]?s?!(l=c):void 0:(t.dataTypes.unshift(c),i(c),!1)}),l}var o={},s=e===bt;return i(t.dataTypes[0])||!o["*"]&&i("*")}function _(e,t){var n,r,i=J.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&J.extend(!0,e,r),e}function H(e,t,n){for(var r,i,o,s,a=e.contents,l=e.dataTypes;"*"===l[0];)l.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){l.unshift(i);break}if(l[0]in n)o=l[0];else{for(i in n){if(!l[0]||e.converters[i+" "+l[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==l[0]&&l.unshift(o),n[o]):void 0}function z(e,t,n,r){var i,o,s,a,l,c={},u=e.dataTypes.slice();if(u[1])for(s in e.converters)c[s.toLowerCase()]=e.converters[s];for(o=u.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=u.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(s=c[l+" "+o]||c["* "+o],!s)for(i in c)if(a=i.split(" "),a[1]===o&&(s=c[l+" "+a[0]]||c["* "+a[0]])){s===!0?s=c[i]:c[i]!==!0&&(o=a[0],u.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(d){return{state:"parsererror",error:s?d:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}function q(e,t,n,r){var i;if(J.isArray(t))J.each(t,function(t,i){n||St.test(e)?r(e,i):q(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==J.type(t))r(e,t);else for(i in t)q(e+"["+i+"]",t[i],n,r)}function V(e){return J.isWindow(e)?e:9===e.nodeType&&e.defaultView}var M=[],R=M.slice,X=M.concat,W=M.push,Y=M.indexOf,B={},Q=B.toString,U=B.hasOwnProperty,Z={},G=e.document,K="2.1.4",J=function(e,t){return new J.fn.init(e,t)},ee=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,te=/^-ms-/,ne=/-([\da-z])/gi,re=function(e,t){return t.toUpperCase()};J.fn=J.prototype={jquery:K,constructor:J,selector:"",length:0,toArray:function(){return R.call(this)},get:function(e){return null!=e?0>e?this[e+this.length]:this[e]:R.call(this)},pushStack:function(e){var t=J.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return J.each(this,e,t)},map:function(e){return this.pushStack(J.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(R.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:W,sort:M.sort,splice:M.splice},J.extend=J.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[a]||{},a++),"object"==typeof s||J.isFunction(s)||(s={}),a===l&&(s=this,a--);l>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(c&&r&&(J.isPlainObject(r)||(i=J.isArray(r)))?(i?(i=!1,o=n&&J.isArray(n)?n:[]):o=n&&J.isPlainObject(n)?n:{},s[t]=J.extend(c,o,r)):void 0!==r&&(s[t]=r));return s},J.extend({expando:"jQuery"+(K+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===J.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!J.isArray(e)&&e-parseFloat(e)+1>=0},isPlainObject:function(e){return"object"!==J.type(e)||e.nodeType||J.isWindow(e)?!1:e.constructor&&!U.call(e.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?B[Q.call(e)]||"object":typeof e},globalEval:function(e){var t,n=eval;e=J.trim(e),e&&(1===e.indexOf("use strict")?(t=G.createElement("script"),t.text=e,G.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(te,"ms-").replace(ne,re)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,r){var i,o=0,s=e.length,a=n(e);if(r){if(a)for(;s>o&&(i=t.apply(e[o],r),i!==!1);o++);else for(o in e)if(i=t.apply(e[o],r),i===!1)break}else if(a)for(;s>o&&(i=t.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=t.call(e[o],o,e[o]),i===!1)break;return e},trim:function(e){return null==e?"":(e+"").replace(ee,"")},makeArray:function(e,t){var r=t||[];return null!=e&&(n(Object(e))?J.merge(r,"string"==typeof e?[e]:e):W.call(r,e)),r},inArray:function(e,t,n){return null==t?-1:Y.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;n>r;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,s=e.length,a=!n;s>o;o++)r=!t(e[o],o),r!==a&&i.push(e[o]);return i},map:function(e,t,r){var i,o=0,s=e.length,a=n(e),l=[];if(a)for(;s>o;o++)i=t(e[o],o,r),null!=i&&l.push(i);else for(o in e)i=t(e[o],o,r),null!=i&&l.push(i);return X.apply([],l)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),J.isFunction(e)?(r=R.call(arguments,2),i=function(){return e.apply(t||this,r.concat(R.call(arguments)))},i.guid=e.guid=e.guid||J.guid++,i):void 0},now:Date.now,support:Z}),J.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){B["[object "+t+"]"]=t.toLowerCase()});var ie=function(e){function t(e,t,n,r){var i,o,s,a,l,c,d,f,h,g;if((t?t.ownerDocument||t:q)!==j&&N(t),t=t||j,n=n||[],a=t.nodeType,"string"!=typeof e||!e||1!==a&&9!==a&&11!==a)return n;if(!r&&L){if(11!==a&&(i=ye.exec(e)))if(s=i[1]){if(9===a){if(o=t.getElementById(s),!o||!o.parentNode)return n;if(o.id===s)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(s))&&H(t,o)&&o.id===s)return n.push(o),n}else{if(i[2])return K.apply(n,t.getElementsByTagName(e)),n;if((s=i[3])&&x.getElementsByClassName)return K.apply(n,t.getElementsByClassName(s)),n}if(x.qsa&&(!$||!$.test(e))){if(f=d=z,h=t,g=1!==a&&e,1===a&&"object"!==t.nodeName.toLowerCase()){for(c=T(e),(d=t.getAttribute("id"))?f=d.replace(we,"\\$&"):t.setAttribute("id",f),f="[id='"+f+"'] ",l=c.length;l--;)c[l]=f+p(c[l]);h=be.test(e)&&u(t.parentNode)||t,g=c.join(",")}if(g)try{return K.apply(n,h.querySelectorAll(g)),n}catch(m){}finally{d||t.removeAttribute("id")}}}return O(e.replace(le,"$1"),t,n,r)}function n(){function e(n,r){return t.push(n+" ")>C.cacheLength&&delete e[t.shift()],e[n+" "]=r}var t=[];return e}function r(e){return e[z]=!0,e}function i(e){var t=j.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function o(e,t){for(var n=e.split("|"),r=e.length;r--;)C.attrHandle[n[r]]=t}function s(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||B)-(~e.sourceIndex||B);if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function a(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function l(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function c(e){return r(function(t){return t=+t,r(function(n,r){for(var i,o=e([],n.length,t),s=o.length;s--;)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}function u(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}function d(){}function p(e){for(var t=0,n=e.length,r="";n>t;t++)r+=e[t].value;return r}function f(e,t,n){var r=t.dir,i=n&&"parentNode"===r,o=M++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,s){var a,l,c=[V,o];if(s){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,s))return!0}else for(;t=t[r];)if(1===t.nodeType||i){if(l=t[z]||(t[z]={}),(a=l[r])&&a[0]===V&&a[1]===o)return c[2]=a[2];if(l[r]=c,c[2]=e(t,n,s))return!0}}}function h(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function g(e,n,r){for(var i=0,o=n.length;o>i;i++)t(e,n[i],r);return r}function m(e,t,n,r,i){for(var o,s=[],a=0,l=e.length,c=null!=t;l>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),c&&t.push(a));return s}function v(e,t,n,i,o,s){return i&&!i[z]&&(i=v(i)),o&&!o[z]&&(o=v(o,s)),r(function(r,s,a,l){var c,u,d,p=[],f=[],h=s.length,v=r||g(t||"*",a.nodeType?[a]:a,[]),y=!e||!r&&t?v:m(v,p,e,a,l),b=n?o||(r?e:h||i)?[]:s:y;if(n&&n(y,b,a,l),i)for(c=m(b,f),i(c,[],a,l),u=c.length;u--;)(d=c[u])&&(b[f[u]]=!(y[f[u]]=d));if(r){if(o||e){if(o){for(c=[],u=b.length;u--;)(d=b[u])&&c.push(y[u]=d);o(null,b=[],c,l)}for(u=b.length;u--;)(d=b[u])&&(c=o?ee(r,d):p[u])>-1&&(r[c]=!(s[c]=d))}}else b=m(b===s?b.splice(h,b.length):b),o?o(null,s,b,l):K.apply(s,b)})}function y(e){for(var t,n,r,i=e.length,o=C.relative[e[0].type],s=o||C.relative[" "],a=o?1:0,l=f(function(e){return e===t},s,!0),c=f(function(e){return ee(t,e)>-1},s,!0),u=[function(e,n,r){var i=!o&&(r||n!==P)||((t=n).nodeType?l(e,n,r):c(e,n,r));return t=null,i}];i>a;a++)if(n=C.relative[e[a].type])u=[f(h(u),n)];else{if(n=C.filter[e[a].type].apply(null,e[a].matches),n[z]){for(r=++a;i>r&&!C.relative[e[r].type];r++);return v(a>1&&h(u),a>1&&p(e.slice(0,a-1).concat({value:" "===e[a-2].type?"*":""})).replace(le,"$1"),n,r>a&&y(e.slice(a,r)),i>r&&y(e=e.slice(r)),i>r&&p(e))}u.push(n)}return h(u)}function b(e,n){var i=n.length>0,o=e.length>0,s=function(r,s,a,l,c){var u,d,p,f=0,h="0",g=r&&[],v=[],y=P,b=r||o&&C.find.TAG("*",c),w=V+=null==y?1:Math.random()||.1,x=b.length;for(c&&(P=s!==j&&s);h!==x&&null!=(u=b[h]);h++){if(o&&u){for(d=0;p=e[d++];)if(p(u,s,a)){l.push(u);break}c&&(V=w)}i&&((u=!p&&u)&&f--,r&&g.push(u))}if(f+=h,i&&h!==f){for(d=0;p=n[d++];)p(g,v,s,a);if(r){if(f>0)for(;h--;)g[h]||v[h]||(v[h]=Z.call(l));v=m(v)}K.apply(l,v),c&&!r&&v.length>0&&f+n.length>1&&t.uniqueSort(l)}return c&&(V=w,P=y),g};return i?r(s):s}var w,x,C,k,S,T,E,O,P,A,D,N,j,I,L,$,F,_,H,z="sizzle"+1*new Date,q=e.document,V=0,M=0,R=n(),X=n(),W=n(),Y=function(e,t){return e===t&&(D=!0),0},B=1<<31,Q={}.hasOwnProperty,U=[],Z=U.pop,G=U.push,K=U.push,J=U.slice,ee=function(e,t){for(var n=0,r=e.length;r>n;n++)if(e[n]===t)return n;return-1},te="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ne="[\\x20\\t\\r\\n\\f]",re="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",ie=re.replace("w","w#"),oe="\\["+ne+"*("+re+")(?:"+ne+"*([*^$|!~]?=)"+ne+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+ie+"))|)"+ne+"*\\]",se=":("+re+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+oe+")*)|.*)\\)|)",ae=new RegExp(ne+"+","g"),le=new RegExp("^"+ne+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ne+"+$","g"),ce=new RegExp("^"+ne+"*,"+ne+"*"),ue=new RegExp("^"+ne+"*([>+~]|"+ne+")"+ne+"*"),de=new RegExp("="+ne+"*([^\\]'\"]*?)"+ne+"*\\]","g"),pe=new RegExp(se),fe=new RegExp("^"+ie+"$"),he={ID:new RegExp("^#("+re+")"),CLASS:new RegExp("^\\.("+re+")"),TAG:new RegExp("^("+re.replace("w","w*")+")"),ATTR:new RegExp("^"+oe),PSEUDO:new RegExp("^"+se),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ne+"*(even|odd|(([+-]|)(\\d*)n|)"+ne+"*(?:([+-]|)"+ne+"*(\\d+)|))"+ne+"*\\)|)","i"),bool:new RegExp("^(?:"+te+")$","i"),needsContext:new RegExp("^"+ne+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ne+"*((?:-\\d)?\\d*)"+ne+"*\\)|)(?=[^-]|$)","i")},ge=/^(?:input|select|textarea|button)$/i,me=/^h\d$/i,ve=/^[^{]+\{\s*\[native \w/,ye=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,be=/[+~]/,we=/'|\\/g,xe=new RegExp("\\\\([\\da-f]{1,6}"+ne+"?|("+ne+")|.)","ig"),Ce=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},ke=function(){N()};try{K.apply(U=J.call(q.childNodes),q.childNodes),U[q.childNodes.length].nodeType}catch(Se){K={apply:U.length?function(e,t){G.apply(e,J.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}x=t.support={},S=t.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},N=t.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:q;return r!==j&&9===r.nodeType&&r.documentElement?(j=r,I=r.documentElement,n=r.defaultView,n&&n!==n.top&&(n.addEventListener?n.addEventListener("unload",ke,!1):n.attachEvent&&n.attachEvent("onunload",ke)),L=!S(r),x.attributes=i(function(e){return e.className="i",!e.getAttribute("className")}),x.getElementsByTagName=i(function(e){return e.appendChild(r.createComment("")),!e.getElementsByTagName("*").length}),x.getElementsByClassName=ve.test(r.getElementsByClassName),x.getById=i(function(e){return I.appendChild(e).id=z,!r.getElementsByName||!r.getElementsByName(z).length}),x.getById?(C.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&L){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},C.filter.ID=function(e){var t=e.replace(xe,Ce);return function(e){return e.getAttribute("id")===t}}):(delete C.find.ID,C.filter.ID=function(e){var t=e.replace(xe,Ce);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}}),C.find.TAG=x.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):x.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},C.find.CLASS=x.getElementsByClassName&&function(e,t){return L?t.getElementsByClassName(e):void 0},F=[],$=[],(x.qsa=ve.test(r.querySelectorAll))&&(i(function(e){I.appendChild(e).innerHTML="<a id='"+z+"'></a><select id='"+z+"-\f]' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&$.push("[*^$]="+ne+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||$.push("\\["+ne+"*(?:value|"+te+")"),e.querySelectorAll("[id~="+z+"-]").length||$.push("~="),e.querySelectorAll(":checked").length||$.push(":checked"),e.querySelectorAll("a#"+z+"+*").length||$.push(".#.+[+~]")}),i(function(e){var t=r.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&$.push("name"+ne+"*[*^$|!~]?="),e.querySelectorAll(":enabled").length||$.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),$.push(",.*:")})),(x.matchesSelector=ve.test(_=I.matches||I.webkitMatchesSelector||I.mozMatchesSelector||I.oMatchesSelector||I.msMatchesSelector))&&i(function(e){x.disconnectedMatch=_.call(e,"div"),_.call(e,"[s!='']:x"),F.push("!=",se)}),$=$.length&&new RegExp($.join("|")),F=F.length&&new RegExp(F.join("|")),t=ve.test(I.compareDocumentPosition),H=t||ve.test(I.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},Y=t?function(e,t){if(e===t)return D=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n?n:(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&n||!x.sortDetached&&t.compareDocumentPosition(e)===n?e===r||e.ownerDocument===q&&H(q,e)?-1:t===r||t.ownerDocument===q&&H(q,t)?1:A?ee(A,e)-ee(A,t):0:4&n?-1:1)}:function(e,t){if(e===t)return D=!0,0;var n,i=0,o=e.parentNode,a=t.parentNode,l=[e],c=[t];if(!o||!a)return e===r?-1:t===r?1:o?-1:a?1:A?ee(A,e)-ee(A,t):0;if(o===a)return s(e,t);for(n=e;n=n.parentNode;)l.unshift(n);for(n=t;n=n.parentNode;)c.unshift(n);for(;l[i]===c[i];)i++;return i?s(l[i],c[i]):l[i]===q?-1:c[i]===q?1:0},r):j},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if((e.ownerDocument||e)!==j&&N(e),n=n.replace(de,"='$1']"),!(!x.matchesSelector||!L||F&&F.test(n)||$&&$.test(n)))try{var r=_.call(e,n);if(r||x.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return t(n,j,null,[e]).length>0},t.contains=function(e,t){return(e.ownerDocument||e)!==j&&N(e),H(e,t)},t.attr=function(e,t){(e.ownerDocument||e)!==j&&N(e);var n=C.attrHandle[t.toLowerCase()],r=n&&Q.call(C.attrHandle,t.toLowerCase())?n(e,t,!L):void 0;return void 0!==r?r:x.attributes||!L?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},t.uniqueSort=function(e){var t,n=[],r=0,i=0;if(D=!x.detectDuplicates,A=!x.sortStable&&e.slice(0),e.sort(Y),D){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)e.splice(n[r],1)}return A=null,e},k=t.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=k(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r++];)n+=k(t);return n},C=t.selectors={cacheLength:50,createPseudo:r,match:he,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(xe,Ce),e[3]=(e[3]||e[4]||e[5]||"").replace(xe,Ce),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return he.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&pe.test(n)&&(t=T(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(xe,Ce).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=R[e+" "];return t||(t=new RegExp("(^|"+ne+")"+e+"("+ne+"|$)"))&&R(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,n,r){return function(i){var o=t.attr(i,e);return null==o?"!="===n:n?(o+="","="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o.replace(ae," ")+" ").indexOf(r)>-1:"|="===n?o===r||o.slice(0,r.length+1)===r+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,l){var c,u,d,p,f,h,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,v=a&&t.nodeName.toLowerCase(),y=!l&&!a;if(m){if(o){for(;g;){for(d=t;d=d[g];)if(a?d.nodeName.toLowerCase()===v:1===d.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[s?m.firstChild:m.lastChild],s&&y){for(u=m[z]||(m[z]={}),c=u[e]||[],f=c[0]===V&&c[1],p=c[0]===V&&c[2],d=f&&m.childNodes[f];d=++f&&d&&d[g]||(p=f=0)||h.pop();)if(1===d.nodeType&&++p&&d===t){u[e]=[V,f,p];break}}else if(y&&(c=(t[z]||(t[z]={}))[e])&&c[0]===V)p=c[1];else for(;(d=++f&&d&&d[g]||(p=f=0)||h.pop())&&((a?d.nodeName.toLowerCase()!==v:1!==d.nodeType)||!++p||(y&&((d[z]||(d[z]={}))[e]=[V,p]),d!==t)););return p-=i,p===r||p%r===0&&p/r>=0}}},PSEUDO:function(e,n){var i,o=C.pseudos[e]||C.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e);return o[z]?o(n):o.length>1?(i=[e,e,"",n],C.setFilters.hasOwnProperty(e.toLowerCase())?r(function(e,t){for(var r,i=o(e,n),s=i.length;s--;)r=ee(e,i[s]),e[r]=!(t[r]=i[s])}):function(e){return o(e,0,i)}):o}},pseudos:{not:r(function(e){var t=[],n=[],i=E(e.replace(le,"$1"));return i[z]?r(function(e,t,n,r){for(var o,s=i(e,null,r,[]),a=e.length;a--;)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,r,o){return t[0]=e,i(t,null,o,n),t[0]=null,!n.pop()}}),has:r(function(e){return function(n){return t(e,n).length>0}}),contains:r(function(e){return e=e.replace(xe,Ce),function(t){return(t.textContent||t.innerText||k(t)).indexOf(e)>-1}}),lang:r(function(e){return fe.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(xe,Ce).toLowerCase(),function(t){var n;do if(n=L?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===I},focus:function(e){return e===j.activeElement&&(!j.hasFocus||j.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!C.pseudos.empty(e)},header:function(e){return me.test(e.nodeName)},input:function(e){return ge.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:c(function(){return[0]}),last:c(function(e,t){return[t-1]}),eq:c(function(e,t,n){return[0>n?n+t:n]}),even:c(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:c(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:c(function(e,t,n){for(var r=0>n?n+t:n;--r>=0;)e.push(r);return e}),gt:c(function(e,t,n){for(var r=0>n?n+t:n;++r<t;)e.push(r);return e})}},C.pseudos.nth=C.pseudos.eq;for(w in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})C.pseudos[w]=a(w);for(w in{submit:!0,reset:!0})C.pseudos[w]=l(w);return d.prototype=C.filters=C.pseudos,C.setFilters=new d,T=t.tokenize=function(e,n){var r,i,o,s,a,l,c,u=X[e+" "];if(u)return n?0:u.slice(0);for(a=e,l=[],c=C.preFilter;a;){(!r||(i=ce.exec(a)))&&(i&&(a=a.slice(i[0].length)||a),l.push(o=[])),r=!1,(i=ue.exec(a))&&(r=i.shift(),o.push({value:r,type:i[0].replace(le," ")}),a=a.slice(r.length));for(s in C.filter)!(i=he[s].exec(a))||c[s]&&!(i=c[s](i))||(r=i.shift(),o.push({value:r,type:s,matches:i}),a=a.slice(r.length));if(!r)break}return n?a.length:a?t.error(e):X(e,l).slice(0)},E=t.compile=function(e,t){var n,r=[],i=[],o=W[e+" "];if(!o){for(t||(t=T(e)),n=t.length;n--;)o=y(t[n]),o[z]?r.push(o):i.push(o);o=W(e,b(i,r)),o.selector=e}return o},O=t.select=function(e,t,n,r){var i,o,s,a,l,c="function"==typeof e&&e,d=!r&&T(e=c.selector||e);if(n=n||[],1===d.length){if(o=d[0]=d[0].slice(0),o.length>2&&"ID"===(s=o[0]).type&&x.getById&&9===t.nodeType&&L&&C.relative[o[1].type]){if(t=(C.find.ID(s.matches[0].replace(xe,Ce),t)||[])[0],!t)return n;c&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(i=he.needsContext.test(e)?0:o.length;i--&&(s=o[i],!C.relative[a=s.type]);)if((l=C.find[a])&&(r=l(s.matches[0].replace(xe,Ce),be.test(o[0].type)&&u(t.parentNode)||t))){if(o.splice(i,1),e=r.length&&p(o),!e)return K.apply(n,r),n;break}}return(c||E(e,d))(r,t,!L,n,be.test(e)&&u(t.parentNode)||t),n},x.sortStable=z.split("").sort(Y).join("")===z,x.detectDuplicates=!!D,N(),x.sortDetached=i(function(e){return 1&e.compareDocumentPosition(j.createElement("div"))}),i(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||o("type|href|height|width",function(e,t,n){return n?void 0:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),x.attributes&&i(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||o("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?void 0:e.defaultValue}),i(function(e){return null==e.getAttribute("disabled")})||o(te,function(e,t,n){var r;return n?void 0:e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),t}(e);J.find=ie,J.expr=ie.selectors,J.expr[":"]=J.expr.pseudos,J.unique=ie.uniqueSort,J.text=ie.getText,J.isXMLDoc=ie.isXML,J.contains=ie.contains;var oe=J.expr.match.needsContext,se=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,ae=/^.[^:#\[\.,]*$/;J.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?J.find.matchesSelector(r,e)?[r]:[]:J.find.matches(e,J.grep(t,function(e){return 1===e.nodeType}))},J.fn.extend({find:function(e){var t,n=this.length,r=[],i=this;

if("string"!=typeof e)return this.pushStack(J(e).filter(function(){for(t=0;n>t;t++)if(J.contains(i[t],this))return!0}));for(t=0;n>t;t++)J.find(e,i[t],r);return r=this.pushStack(n>1?J.unique(r):r),r.selector=this.selector?this.selector+" "+e:e,r},filter:function(e){return this.pushStack(r(this,e||[],!1))},not:function(e){return this.pushStack(r(this,e||[],!0))},is:function(e){return!!r(this,"string"==typeof e&&oe.test(e)?J(e):e||[],!1).length}});var le,ce=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,ue=J.fn.init=function(e,t){var n,r;if(!e)return this;if("string"==typeof e){if(n="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:ce.exec(e),!n||!n[1]&&t)return!t||t.jquery?(t||le).find(e):this.constructor(t).find(e);if(n[1]){if(t=t instanceof J?t[0]:t,J.merge(this,J.parseHTML(n[1],t&&t.nodeType?t.ownerDocument||t:G,!0)),se.test(n[1])&&J.isPlainObject(t))for(n in t)J.isFunction(this[n])?this[n](t[n]):this.attr(n,t[n]);return this}return r=G.getElementById(n[2]),r&&r.parentNode&&(this.length=1,this[0]=r),this.context=G,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):J.isFunction(e)?"undefined"!=typeof le.ready?le.ready(e):e(J):(void 0!==e.selector&&(this.selector=e.selector,this.context=e.context),J.makeArray(e,this))};ue.prototype=J.fn,le=J(G);var de=/^(?:parents|prev(?:Until|All))/,pe={children:!0,contents:!0,next:!0,prev:!0};J.extend({dir:function(e,t,n){for(var r=[],i=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(i&&J(e).is(n))break;r.push(e)}return r},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}}),J.fn.extend({has:function(e){var t=J(e,this),n=t.length;return this.filter(function(){for(var e=0;n>e;e++)if(J.contains(this,t[e]))return!0})},closest:function(e,t){for(var n,r=0,i=this.length,o=[],s=oe.test(e)||"string"!=typeof e?J(e,t||this.context):0;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&J.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?J.unique(o):o)},index:function(e){return e?"string"==typeof e?Y.call(J(e),this[0]):Y.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(J.unique(J.merge(this.get(),J(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),J.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return J.dir(e,"parentNode")},parentsUntil:function(e,t,n){return J.dir(e,"parentNode",n)},next:function(e){return i(e,"nextSibling")},prev:function(e){return i(e,"previousSibling")},nextAll:function(e){return J.dir(e,"nextSibling")},prevAll:function(e){return J.dir(e,"previousSibling")},nextUntil:function(e,t,n){return J.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return J.dir(e,"previousSibling",n)},siblings:function(e){return J.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return J.sibling(e.firstChild)},contents:function(e){return e.contentDocument||J.merge([],e.childNodes)}},function(e,t){J.fn[e]=function(n,r){var i=J.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=J.filter(r,i)),this.length>1&&(pe[e]||J.unique(i),de.test(e)&&i.reverse()),this.pushStack(i)}});var fe=/\S+/g,he={};J.Callbacks=function(e){e="string"==typeof e?he[e]||o(e):J.extend({},e);var t,n,r,i,s,a,l=[],c=!e.once&&[],u=function(o){for(t=e.memory&&o,n=!0,a=i||0,i=0,s=l.length,r=!0;l&&s>a;a++)if(l[a].apply(o[0],o[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,l&&(c?c.length&&u(c.shift()):t?l=[]:d.disable())},d={add:function(){if(l){var n=l.length;!function o(t){J.each(t,function(t,n){var r=J.type(n);"function"===r?e.unique&&d.has(n)||l.push(n):n&&n.length&&"string"!==r&&o(n)})}(arguments),r?s=l.length:t&&(i=n,u(t))}return this},remove:function(){return l&&J.each(arguments,function(e,t){for(var n;(n=J.inArray(t,l,n))>-1;)l.splice(n,1),r&&(s>=n&&s--,a>=n&&a--)}),this},has:function(e){return e?J.inArray(e,l)>-1:!(!l||!l.length)},empty:function(){return l=[],s=0,this},disable:function(){return l=c=t=void 0,this},disabled:function(){return!l},lock:function(){return c=void 0,t||d.disable(),this},locked:function(){return!c},fireWith:function(e,t){return!l||n&&!c||(t=t||[],t=[e,t.slice?t.slice():t],r?c.push(t):u(t)),this},fire:function(){return d.fireWith(this,arguments),this},fired:function(){return!!n}};return d},J.extend({Deferred:function(e){var t=[["resolve","done",J.Callbacks("once memory"),"resolved"],["reject","fail",J.Callbacks("once memory"),"rejected"],["notify","progress",J.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return J.Deferred(function(n){J.each(t,function(t,o){var s=J.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&J.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[o[0]+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?J.extend(e,r):r}},i={};return r.pipe=r.then,J.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t,n,r,i=0,o=R.call(arguments),s=o.length,a=1!==s||e&&J.isFunction(e.promise)?s:0,l=1===a?e:J.Deferred(),c=function(e,n,r){return function(i){n[e]=this,r[e]=arguments.length>1?R.call(arguments):i,r===t?l.notifyWith(n,r):--a||l.resolveWith(n,r)}};if(s>1)for(t=new Array(s),n=new Array(s),r=new Array(s);s>i;i++)o[i]&&J.isFunction(o[i].promise)?o[i].promise().done(c(i,r,o)).fail(l.reject).progress(c(i,n,t)):--a;return a||l.resolveWith(r,o),l.promise()}});var ge;J.fn.ready=function(e){return J.ready.promise().done(e),this},J.extend({isReady:!1,readyWait:1,holdReady:function(e){e?J.readyWait++:J.ready(!0)},ready:function(e){(e===!0?--J.readyWait:J.isReady)||(J.isReady=!0,e!==!0&&--J.readyWait>0||(ge.resolveWith(G,[J]),J.fn.triggerHandler&&(J(G).triggerHandler("ready"),J(G).off("ready"))))}}),J.ready.promise=function(t){return ge||(ge=J.Deferred(),"complete"===G.readyState?setTimeout(J.ready):(G.addEventListener("DOMContentLoaded",s,!1),e.addEventListener("load",s,!1))),ge.promise(t)},J.ready.promise();var me=J.access=function(e,t,n,r,i,o,s){var a=0,l=e.length,c=null==n;if("object"===J.type(n)){i=!0;for(a in n)J.access(e,t,a,n[a],!0,o,s)}else if(void 0!==r&&(i=!0,J.isFunction(r)||(s=!0),c&&(s?(t.call(e,r),t=null):(c=t,t=function(e,t,n){return c.call(J(e),n)})),t))for(;l>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:c?t.call(e):l?t(e[0],n):o};J.acceptData=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType},a.uid=1,a.accepts=J.acceptData,a.prototype={key:function(e){if(!a.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=a.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,J.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(J.isEmptyObject(o))J.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return void 0===t?n:n[t]},access:function(e,t,n){var r;return void 0===t||t&&"string"==typeof t&&void 0===n?(r=this.get(e,t),void 0!==r?r:this.get(e,J.camelCase(t))):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(void 0===t)this.cache[o]={};else{J.isArray(t)?r=t.concat(t.map(J.camelCase)):(i=J.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(fe)||[])),n=r.length;for(;n--;)delete s[r[n]]}},hasData:function(e){return!J.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}};var ve=new a,ye=new a,be=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,we=/([A-Z])/g;J.extend({hasData:function(e){return ye.hasData(e)||ve.hasData(e)},data:function(e,t,n){return ye.access(e,t,n)},removeData:function(e,t){ye.remove(e,t)},_data:function(e,t,n){return ve.access(e,t,n)},_removeData:function(e,t){ve.remove(e,t)}}),J.fn.extend({data:function(e,t){var n,r,i,o=this[0],s=o&&o.attributes;if(void 0===e){if(this.length&&(i=ye.get(o),1===o.nodeType&&!ve.get(o,"hasDataAttrs"))){for(n=s.length;n--;)s[n]&&(r=s[n].name,0===r.indexOf("data-")&&(r=J.camelCase(r.slice(5)),l(o,r,i[r])));ve.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof e?this.each(function(){ye.set(this,e)}):me(this,function(t){var n,r=J.camelCase(e);if(o&&void 0===t){if(n=ye.get(o,e),void 0!==n)return n;if(n=ye.get(o,r),void 0!==n)return n;if(n=l(o,r,void 0),void 0!==n)return n}else this.each(function(){var n=ye.get(this,r);ye.set(this,r,t),-1!==e.indexOf("-")&&void 0!==n&&ye.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){ye.remove(this,e)})}}),J.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=ve.get(e,t),n&&(!r||J.isArray(n)?r=ve.access(e,t,J.makeArray(n)):r.push(n)),r||[]):void 0},dequeue:function(e,t){t=t||"fx";var n=J.queue(e,t),r=n.length,i=n.shift(),o=J._queueHooks(e,t),s=function(){J.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return ve.get(e,n)||ve.access(e,n,{empty:J.Callbacks("once memory").add(function(){ve.remove(e,[t+"queue",n])})})}}),J.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?J.queue(this[0],e):void 0===t?this:this.each(function(){var n=J.queue(this,e,t);J._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&J.dequeue(this,e)})},dequeue:function(e){return this.each(function(){J.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=J.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";s--;)n=ve.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var xe=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Ce=["Top","Right","Bottom","Left"],ke=function(e,t){return e=t||e,"none"===J.css(e,"display")||!J.contains(e.ownerDocument,e)},Se=/^(?:checkbox|radio)$/i;!function(){var e=G.createDocumentFragment(),t=e.appendChild(G.createElement("div")),n=G.createElement("input");n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),t.appendChild(n),Z.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,t.innerHTML="<textarea>x</textarea>",Z.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue}();var Te="undefined";Z.focusinBubbles="onfocusin"in e;var Ee=/^key/,Oe=/^(?:mouse|pointer|contextmenu)|click/,Pe=/^(?:focusinfocus|focusoutblur)$/,Ae=/^([^.]*)(?:\.(.+)|)$/;J.event={global:{},add:function(e,t,n,r,i){var o,s,a,l,c,u,d,p,f,h,g,m=ve.get(e);if(m)for(n.handler&&(o=n,n=o.handler,i=o.selector),n.guid||(n.guid=J.guid++),(l=m.events)||(l=m.events={}),(s=m.handle)||(s=m.handle=function(t){return typeof J!==Te&&J.event.triggered!==t.type?J.event.dispatch.apply(e,arguments):void 0}),t=(t||"").match(fe)||[""],c=t.length;c--;)a=Ae.exec(t[c])||[],f=g=a[1],h=(a[2]||"").split(".").sort(),f&&(d=J.event.special[f]||{},f=(i?d.delegateType:d.bindType)||f,d=J.event.special[f]||{},u=J.extend({type:f,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&J.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=l[f])||(p=l[f]=[],p.delegateCount=0,d.setup&&d.setup.call(e,r,h,s)!==!1||e.addEventListener&&e.addEventListener(f,s,!1)),d.add&&(d.add.call(e,u),u.handler.guid||(u.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,u):p.push(u),J.event.global[f]=!0)},remove:function(e,t,n,r,i){var o,s,a,l,c,u,d,p,f,h,g,m=ve.hasData(e)&&ve.get(e);if(m&&(l=m.events)){for(t=(t||"").match(fe)||[""],c=t.length;c--;)if(a=Ae.exec(t[c])||[],f=g=a[1],h=(a[2]||"").split(".").sort(),f){for(d=J.event.special[f]||{},f=(r?d.delegateType:d.bindType)||f,p=l[f]||[],a=a[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=p.length;o--;)u=p[o],!i&&g!==u.origType||n&&n.guid!==u.guid||a&&!a.test(u.namespace)||r&&r!==u.selector&&("**"!==r||!u.selector)||(p.splice(o,1),u.selector&&p.delegateCount--,d.remove&&d.remove.call(e,u));s&&!p.length&&(d.teardown&&d.teardown.call(e,h,m.handle)!==!1||J.removeEvent(e,f,m.handle),delete l[f])}else for(f in l)J.event.remove(e,f+t[c],n,r,!0);J.isEmptyObject(l)&&(delete m.handle,ve.remove(e,"events"))}},trigger:function(t,n,r,i){var o,s,a,l,c,u,d,p=[r||G],f=U.call(t,"type")?t.type:t,h=U.call(t,"namespace")?t.namespace.split("."):[];if(s=a=r=r||G,3!==r.nodeType&&8!==r.nodeType&&!Pe.test(f+J.event.triggered)&&(f.indexOf(".")>=0&&(h=f.split("."),f=h.shift(),h.sort()),c=f.indexOf(":")<0&&"on"+f,t=t[J.expando]?t:new J.Event(f,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=h.join("."),t.namespace_re=t.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=r),n=null==n?[t]:J.makeArray(n,[t]),d=J.event.special[f]||{},i||!d.trigger||d.trigger.apply(r,n)!==!1)){if(!i&&!d.noBubble&&!J.isWindow(r)){for(l=d.delegateType||f,Pe.test(l+f)||(s=s.parentNode);s;s=s.parentNode)p.push(s),a=s;a===(r.ownerDocument||G)&&p.push(a.defaultView||a.parentWindow||e)}for(o=0;(s=p[o++])&&!t.isPropagationStopped();)t.type=o>1?l:d.bindType||f,u=(ve.get(s,"events")||{})[t.type]&&ve.get(s,"handle"),u&&u.apply(s,n),u=c&&s[c],u&&u.apply&&J.acceptData(s)&&(t.result=u.apply(s,n),t.result===!1&&t.preventDefault());return t.type=f,i||t.isDefaultPrevented()||d._default&&d._default.apply(p.pop(),n)!==!1||!J.acceptData(r)||c&&J.isFunction(r[f])&&!J.isWindow(r)&&(a=r[c],a&&(r[c]=null),J.event.triggered=f,r[f](),J.event.triggered=void 0,a&&(r[c]=a)),t.result}},dispatch:function(e){e=J.event.fix(e);var t,n,r,i,o,s=[],a=R.call(arguments),l=(ve.get(this,"events")||{})[e.type]||[],c=J.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){for(s=J.event.handlers.call(this,e,l),t=0;(i=s[t++])&&!e.isPropagationStopped();)for(e.currentTarget=i.elem,n=0;(o=i.handlers[n++])&&!e.isImmediatePropagationStopped();)(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((J.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),void 0!==r&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()));return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,l=e.target;if(a&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!==this;l=l.parentNode||this)if(l.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",void 0===r[i]&&(r[i]=o.needsContext?J(i,this).index(l)>=0:J.find(i,this,null,[l]).length),r[i]&&r.push(o);r.length&&s.push({elem:l,handlers:r})}return a<t.length&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,o=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||G,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||void 0===o||(e.which=1&o?1:2&o?3:4&o?2:0),e}},fix:function(e){if(e[J.expando])return e;var t,n,r,i=e.type,o=e,s=this.fixHooks[i];for(s||(this.fixHooks[i]=s=Oe.test(i)?this.mouseHooks:Ee.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new J.Event(o),t=r.length;t--;)n=r[t],e[n]=o[n];return e.target||(e.target=G),3===e.target.nodeType&&(e.target=e.target.parentNode),s.filter?s.filter(e,o):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==d()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===d()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&J.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(e){return J.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=J.extend(new J.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?J.event.trigger(i,null,t):J.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},J.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},J.Event=function(e,t){return this instanceof J.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?c:u):this.type=e,t&&J.extend(this,t),this.timeStamp=e&&e.timeStamp||J.now(),void(this[J.expando]=!0)):new J.Event(e,t)},J.Event.prototype={isDefaultPrevented:u,isPropagationStopped:u,isImmediatePropagationStopped:u,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=c,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=c,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=c,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),this.stopPropagation()}},J.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){J.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!J.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),Z.focusinBubbles||J.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){J.event.simulate(t,e.target,J.event.fix(e),!0)};J.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=ve.access(r,t);i||r.addEventListener(e,n,!0),ve.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=ve.access(r,t)-1;i?ve.access(r,t,i):(r.removeEventListener(e,n,!0),ve.remove(r,t))}}}),J.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=void 0);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=void 0):null==r&&("string"==typeof t?(r=n,n=void 0):(r=n,n=t,t=void 0)),r===!1)r=u;else if(!r)return this;return 1===i&&(o=r,r=function(e){return J().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=J.guid++)),this.each(function(){J.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,J(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=void 0),n===!1&&(n=u),this.each(function(){J.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){J.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?J.event.trigger(e,t,n,!0):void 0}});var De=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Ne=/<([\w:]+)/,je=/<|&#?\w+;/,Ie=/<(?:script|style|link)/i,Le=/checked\s*(?:[^=]|=\s*.checked.)/i,$e=/^$|\/(?:java|ecma)script/i,Fe=/^true\/(.*)/,_e=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,He={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};He.optgroup=He.option,He.tbody=He.tfoot=He.colgroup=He.caption=He.thead,He.th=He.td,J.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),l=J.contains(e.ownerDocument,e);if(!(Z.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||J.isXMLDoc(e)))for(s=v(a),o=v(e),r=0,i=o.length;i>r;r++)y(o[r],s[r]);if(t)if(n)for(o=o||v(e),s=s||v(a),r=0,i=o.length;i>r;r++)m(o[r],s[r]);else m(e,a);return s=v(a,"script"),s.length>0&&g(s,!l&&v(e,"script")),a},buildFragment:function(e,t,n,r){for(var i,o,s,a,l,c,u=t.createDocumentFragment(),d=[],p=0,f=e.length;f>p;p++)if(i=e[p],i||0===i)if("object"===J.type(i))J.merge(d,i.nodeType?[i]:i);else if(je.test(i)){for(o=o||u.appendChild(t.createElement("div")),s=(Ne.exec(i)||["",""])[1].toLowerCase(),a=He[s]||He._default,o.innerHTML=a[1]+i.replace(De,"<$1></$2>")+a[2],c=a[0];c--;)o=o.lastChild;J.merge(d,o.childNodes),o=u.firstChild,o.textContent=""}else d.push(t.createTextNode(i));for(u.textContent="",p=0;i=d[p++];)if((!r||-1===J.inArray(i,r))&&(l=J.contains(i.ownerDocument,i),o=v(u.appendChild(i),"script"),l&&g(o),n))for(c=0;i=o[c++];)$e.test(i.type||"")&&n.push(i);return u},cleanData:function(e){for(var t,n,r,i,o=J.event.special,s=0;void 0!==(n=e[s]);s++){if(J.acceptData(n)&&(i=n[ve.expando],i&&(t=ve.cache[i]))){if(t.events)for(r in t.events)o[r]?J.event.remove(n,r):J.removeEvent(n,r,t.handle);ve.cache[i]&&delete ve.cache[i]}delete ye.cache[n[ye.expando]]}}}),J.fn.extend({text:function(e){return me(this,function(e){return void 0===e?J.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=e)})},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=p(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=p(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){for(var n,r=e?J.filter(e,this):this,i=0;null!=(n=r[i]);i++)t||1!==n.nodeType||J.cleanData(v(n)),n.parentNode&&(t&&J.contains(n.ownerDocument,n)&&g(v(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(J.cleanData(v(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return J.clone(this,e,t)})},html:function(e){return me(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ie.test(e)&&!He[(Ne.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(De,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(J.cleanData(v(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=arguments[0];return this.domManip(arguments,function(t){e=this.parentNode,J.cleanData(v(this)),e&&e.replaceChild(t,this)}),e&&(e.length||e.nodeType)?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t){e=X.apply([],e);var n,r,i,o,s,a,l=0,c=this.length,u=this,d=c-1,p=e[0],g=J.isFunction(p);if(g||c>1&&"string"==typeof p&&!Z.checkClone&&Le.test(p))return this.each(function(n){var r=u.eq(n);g&&(e[0]=p.call(this,n,r.html())),r.domManip(e,t)});if(c&&(n=J.buildFragment(e,this[0].ownerDocument,!1,this),r=n.firstChild,1===n.childNodes.length&&(n=r),r)){for(i=J.map(v(n,"script"),f),o=i.length;c>l;l++)s=n,l!==d&&(s=J.clone(s,!0,!0),o&&J.merge(i,v(s,"script"))),t.call(this[l],s,l);if(o)for(a=i[i.length-1].ownerDocument,J.map(i,h),l=0;o>l;l++)s=i[l],$e.test(s.type||"")&&!ve.access(s,"globalEval")&&J.contains(a,s)&&(s.src?J._evalUrl&&J._evalUrl(s.src):J.globalEval(s.textContent.replace(_e,"")))}return this}}),J.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){J.fn[e]=function(e){for(var n,r=[],i=J(e),o=i.length-1,s=0;o>=s;s++)n=s===o?this:this.clone(!0),J(i[s])[t](n),W.apply(r,n.get());return this.pushStack(r)}});var ze,qe={},Ve=/^margin/,Me=new RegExp("^("+xe+")(?!px)[a-z%]+$","i"),Re=function(t){return t.ownerDocument.defaultView.opener?t.ownerDocument.defaultView.getComputedStyle(t,null):e.getComputedStyle(t,null)};!function(){function t(){s.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",s.innerHTML="",i.appendChild(o);var t=e.getComputedStyle(s,null);n="1%"!==t.top,r="4px"===t.width,i.removeChild(o)}var n,r,i=G.documentElement,o=G.createElement("div"),s=G.createElement("div");s.style&&(s.style.backgroundClip="content-box",s.cloneNode(!0).style.backgroundClip="",Z.clearCloneStyle="content-box"===s.style.backgroundClip,o.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",o.appendChild(s),e.getComputedStyle&&J.extend(Z,{pixelPosition:function(){return t(),n},boxSizingReliable:function(){return null==r&&t(),r},reliableMarginRight:function(){var t,n=s.appendChild(G.createElement("div"));return n.style.cssText=s.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",n.style.marginRight=n.style.width="0",s.style.width="1px",i.appendChild(o),t=!parseFloat(e.getComputedStyle(n,null).marginRight),i.removeChild(o),s.removeChild(n),t}}))}(),J.swap=function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i};var Xe=/^(none|table(?!-c[ea]).+)/,We=new RegExp("^("+xe+")(.*)$","i"),Ye=new RegExp("^([+-])=("+xe+")","i"),Be={position:"absolute",visibility:"hidden",display:"block"},Qe={letterSpacing:"0",fontWeight:"400"},Ue=["Webkit","O","Moz","ms"];J.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=x(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=J.camelCase(t),l=e.style;return t=J.cssProps[a]||(J.cssProps[a]=k(l,a)),s=J.cssHooks[t]||J.cssHooks[a],void 0===n?s&&"get"in s&&void 0!==(i=s.get(e,!1,r))?i:l[t]:(o=typeof n,"string"===o&&(i=Ye.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(J.css(e,t)),o="number"),null!=n&&n===n&&("number"!==o||J.cssNumber[a]||(n+="px"),Z.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),s&&"set"in s&&void 0===(n=s.set(e,n,r))||(l[t]=n)),void 0)}},css:function(e,t,n,r){var i,o,s,a=J.camelCase(t);return t=J.cssProps[a]||(J.cssProps[a]=k(e.style,a)),s=J.cssHooks[t]||J.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),void 0===i&&(i=x(e,t,r)),"normal"===i&&t in Qe&&(i=Qe[t]),""===n||n?(o=parseFloat(i),n===!0||J.isNumeric(o)?o||0:i):i}}),J.each(["height","width"],function(e,t){J.cssHooks[t]={get:function(e,n,r){return n?Xe.test(J.css(e,"display"))&&0===e.offsetWidth?J.swap(e,Be,function(){return E(e,t,r)}):E(e,t,r):void 0},set:function(e,n,r){var i=r&&Re(e);return S(e,n,r?T(e,t,r,"border-box"===J.css(e,"boxSizing",!1,i),i):0)}}}),J.cssHooks.marginRight=C(Z.reliableMarginRight,function(e,t){return t?J.swap(e,{display:"inline-block"},x,[e,"marginRight"]):void 0}),J.each({margin:"",padding:"",border:"Width"},function(e,t){J.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];4>r;r++)i[e+Ce[r]+t]=o[r]||o[r-2]||o[0];return i}},Ve.test(e)||(J.cssHooks[e+t].set=S)}),J.fn.extend({css:function(e,t){return me(this,function(e,t,n){var r,i,o={},s=0;if(J.isArray(t)){for(r=Re(e),i=t.length;i>s;s++)o[t[s]]=J.css(e,t[s],!1,r);return o}return void 0!==n?J.style(e,t,n):J.css(e,t)},e,t,arguments.length>1)},show:function(){return O(this,!0)},hide:function(){return O(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ke(this)?J(this).show():J(this).hide()})}}),J.Tween=P,P.prototype={constructor:P,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(J.cssNumber[n]?"":"px")},cur:function(){var e=P.propHooks[this.prop];return e&&e.get?e.get(this):P.propHooks._default.get(this)},run:function(e){var t,n=P.propHooks[this.prop];return this.pos=t=this.options.duration?J.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):P.propHooks._default.set(this),this}},P.prototype.init.prototype=P.prototype,P.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=J.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){J.fx.step[e.prop]?J.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[J.cssProps[e.prop]]||J.cssHooks[e.prop])?J.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},P.propHooks.scrollTop=P.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},J.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},J.fx=P.prototype.init,J.fx.step={};var Ze,Ge,Ke=/^(?:toggle|show|hide)$/,Je=new RegExp("^(?:([+-])=|)("+xe+")([a-z%]*)$","i"),et=/queueHooks$/,tt=[j],nt={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Je.exec(t),o=i&&i[3]||(J.cssNumber[e]?"":"px"),s=(J.cssNumber[e]||"px"!==o&&+r)&&Je.exec(J.css(n.elem,e)),a=1,l=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,J.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--l)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};J.Animation=J.extend(L,{tweener:function(e,t){J.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");for(var n,r=0,i=e.length;i>r;r++)n=e[r],nt[n]=nt[n]||[],nt[n].unshift(t)},prefilter:function(e,t){t?tt.unshift(e):tt.push(e)}}),J.speed=function(e,t,n){var r=e&&"object"==typeof e?J.extend({},e):{complete:n||!n&&t||J.isFunction(e)&&e,duration:e,easing:n&&t||t&&!J.isFunction(t)&&t};return r.duration=J.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in J.fx.speeds?J.fx.speeds[r.duration]:J.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){J.isFunction(r.old)&&r.old.call(this),r.queue&&J.dequeue(this,r.queue)},r},J.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ke).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=J.isEmptyObject(e),o=J.speed(t,n,r),s=function(){var t=L(this,J.extend({},e),o);(i||ve.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=J.timers,s=ve.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&et.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&J.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=ve.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=J.timers,s=r?r.length:0;for(n.finish=!0,J.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),
t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),J.each(["toggle","show","hide"],function(e,t){var n=J.fn[t];J.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(D(t,!0),e,r,i)}}),J.each({slideDown:D("show"),slideUp:D("hide"),slideToggle:D("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){J.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),J.timers=[],J.fx.tick=function(){var e,t=0,n=J.timers;for(Ze=J.now();t<n.length;t++)e=n[t],e()||n[t]!==e||n.splice(t--,1);n.length||J.fx.stop(),Ze=void 0},J.fx.timer=function(e){J.timers.push(e),e()?J.fx.start():J.timers.pop()},J.fx.interval=13,J.fx.start=function(){Ge||(Ge=setInterval(J.fx.tick,J.fx.interval))},J.fx.stop=function(){clearInterval(Ge),Ge=null},J.fx.speeds={slow:600,fast:200,_default:400},J.fn.delay=function(e,t){return e=J.fx?J.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},function(){var e=G.createElement("input"),t=G.createElement("select"),n=t.appendChild(G.createElement("option"));e.type="checkbox",Z.checkOn=""!==e.value,Z.optSelected=n.selected,t.disabled=!0,Z.optDisabled=!n.disabled,e=G.createElement("input"),e.value="t",e.type="radio",Z.radioValue="t"===e.value}();var rt,it,ot=J.expr.attrHandle;J.fn.extend({attr:function(e,t){return me(this,J.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){J.removeAttr(this,e)})}}),J.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(e&&3!==o&&8!==o&&2!==o)return typeof e.getAttribute===Te?J.prop(e,t,n):(1===o&&J.isXMLDoc(e)||(t=t.toLowerCase(),r=J.attrHooks[t]||(J.expr.match.bool.test(t)?it:rt)),void 0===n?r&&"get"in r&&null!==(i=r.get(e,t))?i:(i=J.find.attr(e,t),null==i?void 0:i):null!==n?r&&"set"in r&&void 0!==(i=r.set(e,n,t))?i:(e.setAttribute(t,n+""),n):void J.removeAttr(e,t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(fe);if(o&&1===e.nodeType)for(;n=o[i++];)r=J.propFix[n]||n,J.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!Z.radioValue&&"radio"===t&&J.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}}}),it={set:function(e,t,n){return t===!1?J.removeAttr(e,n):e.setAttribute(n,n),n}},J.each(J.expr.match.bool.source.match(/\w+/g),function(e,t){var n=ot[t]||J.find.attr;ot[t]=function(e,t,r){var i,o;return r||(o=ot[t],ot[t]=i,i=null!=n(e,t,r)?t.toLowerCase():null,ot[t]=o),i}});var st=/^(?:input|select|textarea|button)$/i;J.fn.extend({prop:function(e,t){return me(this,J.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[J.propFix[e]||e]})}}),J.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!J.isXMLDoc(e),o&&(t=J.propFix[t]||t,i=J.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||st.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),Z.optSelected||(J.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),J.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){J.propFix[this.toLowerCase()]=this});var at=/[\t\r\n\f]/g;J.fn.extend({addClass:function(e){var t,n,r,i,o,s,a="string"==typeof e&&e,l=0,c=this.length;if(J.isFunction(e))return this.each(function(t){J(this).addClass(e.call(this,t,this.className))});if(a)for(t=(e||"").match(fe)||[];c>l;l++)if(n=this[l],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(at," "):" ")){for(o=0;i=t[o++];)r.indexOf(" "+i+" ")<0&&(r+=i+" ");s=J.trim(r),n.className!==s&&(n.className=s)}return this},removeClass:function(e){var t,n,r,i,o,s,a=0===arguments.length||"string"==typeof e&&e,l=0,c=this.length;if(J.isFunction(e))return this.each(function(t){J(this).removeClass(e.call(this,t,this.className))});if(a)for(t=(e||"").match(fe)||[];c>l;l++)if(n=this[l],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(at," "):"")){for(o=0;i=t[o++];)for(;r.indexOf(" "+i+" ")>=0;)r=r.replace(" "+i+" "," ");s=e?J.trim(r):"",n.className!==s&&(n.className=s)}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):this.each(J.isFunction(e)?function(n){J(this).toggleClass(e.call(this,n,this.className,t),t)}:function(){if("string"===n)for(var t,r=0,i=J(this),o=e.match(fe)||[];t=o[r++];)i.hasClass(t)?i.removeClass(t):i.addClass(t);else(n===Te||"boolean"===n)&&(this.className&&ve.set(this,"__className__",this.className),this.className=this.className||e===!1?"":ve.get(this,"__className__")||"")})},hasClass:function(e){for(var t=" "+e+" ",n=0,r=this.length;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(at," ").indexOf(t)>=0)return!0;return!1}});var lt=/\r/g;J.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=J.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,J(this).val()):e,null==i?i="":"number"==typeof i?i+="":J.isArray(i)&&(i=J.map(i,function(e){return null==e?"":e+""})),t=J.valHooks[this.type]||J.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)return t=J.valHooks[i.type]||J.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:(n=i.value,"string"==typeof n?n.replace(lt,""):null==n?"":n)}}}),J.extend({valHooks:{option:{get:function(e){var t=J.find.attr(e,"value");return null!=t?t:J.trim(J.text(e))}},select:{get:function(e){for(var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,l=0>i?a:o?i:0;a>l;l++)if(n=r[l],!(!n.selected&&l!==i||(Z.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&J.nodeName(n.parentNode,"optgroup"))){if(t=J(n).val(),o)return t;s.push(t)}return s},set:function(e,t){for(var n,r,i=e.options,o=J.makeArray(t),s=i.length;s--;)r=i[s],(r.selected=J.inArray(r.value,o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),J.each(["radio","checkbox"],function(){J.valHooks[this]={set:function(e,t){return J.isArray(t)?e.checked=J.inArray(J(e).val(),t)>=0:void 0}},Z.checkOn||(J.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),J.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){J.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),J.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var ct=J.now(),ut=/\?/;J.parseJSON=function(e){return JSON.parse(e+"")},J.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=void 0}return(!t||t.getElementsByTagName("parsererror").length)&&J.error("Invalid XML: "+e),t};var dt=/#.*$/,pt=/([?&])_=[^&]*/,ft=/^(.*?):[ \t]*([^\r\n]*)$/gm,ht=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,gt=/^(?:GET|HEAD)$/,mt=/^\/\//,vt=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,yt={},bt={},wt="*/".concat("*"),xt=e.location.href,Ct=vt.exec(xt.toLowerCase())||[];J.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:xt,type:"GET",isLocal:ht.test(Ct[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":wt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":J.parseJSON,"text xml":J.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?_(_(e,J.ajaxSettings),t):_(J.ajaxSettings,e)},ajaxPrefilter:$(yt),ajaxTransport:$(bt),ajax:function(e,t){function n(e,t,n,s){var l,u,v,y,w,C=t;2!==b&&(b=2,a&&clearTimeout(a),r=void 0,o=s||"",x.readyState=e>0?4:0,l=e>=200&&300>e||304===e,n&&(y=H(d,x,n)),y=z(d,y,x,l),l?(d.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(J.lastModified[i]=w),w=x.getResponseHeader("etag"),w&&(J.etag[i]=w)),204===e||"HEAD"===d.type?C="nocontent":304===e?C="notmodified":(C=y.state,u=y.data,v=y.error,l=!v)):(v=C,(e||!C)&&(C="error",0>e&&(e=0))),x.status=e,x.statusText=(t||C)+"",l?h.resolveWith(p,[u,C,x]):h.rejectWith(p,[x,C,v]),x.statusCode(m),m=void 0,c&&f.trigger(l?"ajaxSuccess":"ajaxError",[x,d,l?u:v]),g.fireWith(p,[x,C]),c&&(f.trigger("ajaxComplete",[x,d]),--J.active||J.event.trigger("ajaxStop")))}"object"==typeof e&&(t=e,e=void 0),t=t||{};var r,i,o,s,a,l,c,u,d=J.ajaxSetup({},t),p=d.context||d,f=d.context&&(p.nodeType||p.jquery)?J(p):J.event,h=J.Deferred(),g=J.Callbacks("once memory"),m=d.statusCode||{},v={},y={},b=0,w="canceled",x={readyState:0,getResponseHeader:function(e){var t;if(2===b){if(!s)for(s={};t=ft.exec(o);)s[t[1].toLowerCase()]=t[2];t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===b?o:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return b||(e=y[n]=y[n]||e,v[e]=t),this},overrideMimeType:function(e){return b||(d.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>b)for(t in e)m[t]=[m[t],e[t]];else x.always(e[x.status]);return this},abort:function(e){var t=e||w;return r&&r.abort(t),n(0,t),this}};if(h.promise(x).complete=g.add,x.success=x.done,x.error=x.fail,d.url=((e||d.url||xt)+"").replace(dt,"").replace(mt,Ct[1]+"//"),d.type=t.method||t.type||d.method||d.type,d.dataTypes=J.trim(d.dataType||"*").toLowerCase().match(fe)||[""],null==d.crossDomain&&(l=vt.exec(d.url.toLowerCase()),d.crossDomain=!(!l||l[1]===Ct[1]&&l[2]===Ct[2]&&(l[3]||("http:"===l[1]?"80":"443"))===(Ct[3]||("http:"===Ct[1]?"80":"443")))),d.data&&d.processData&&"string"!=typeof d.data&&(d.data=J.param(d.data,d.traditional)),F(yt,d,t,x),2===b)return x;c=J.event&&d.global,c&&0===J.active++&&J.event.trigger("ajaxStart"),d.type=d.type.toUpperCase(),d.hasContent=!gt.test(d.type),i=d.url,d.hasContent||(d.data&&(i=d.url+=(ut.test(i)?"&":"?")+d.data,delete d.data),d.cache===!1&&(d.url=pt.test(i)?i.replace(pt,"$1_="+ct++):i+(ut.test(i)?"&":"?")+"_="+ct++)),d.ifModified&&(J.lastModified[i]&&x.setRequestHeader("If-Modified-Since",J.lastModified[i]),J.etag[i]&&x.setRequestHeader("If-None-Match",J.etag[i])),(d.data&&d.hasContent&&d.contentType!==!1||t.contentType)&&x.setRequestHeader("Content-Type",d.contentType),x.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+("*"!==d.dataTypes[0]?", "+wt+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)x.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(p,x,d)===!1||2===b))return x.abort();w="abort";for(u in{success:1,error:1,complete:1})x[u](d[u]);if(r=F(bt,d,t,x)){x.readyState=1,c&&f.trigger("ajaxSend",[x,d]),d.async&&d.timeout>0&&(a=setTimeout(function(){x.abort("timeout")},d.timeout));try{b=1,r.send(v,n)}catch(C){if(!(2>b))throw C;n(-1,C)}}else n(-1,"No Transport");return x},getJSON:function(e,t,n){return J.get(e,t,n,"json")},getScript:function(e,t){return J.get(e,void 0,t,"script")}}),J.each(["get","post"],function(e,t){J[t]=function(e,n,r,i){return J.isFunction(n)&&(i=i||r,r=n,n=void 0),J.ajax({url:e,type:t,dataType:i,data:n,success:r})}}),J._evalUrl=function(e){return J.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},J.fn.extend({wrapAll:function(e){var t;return J.isFunction(e)?this.each(function(t){J(this).wrapAll(e.call(this,t))}):(this[0]&&(t=J(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return this.each(J.isFunction(e)?function(t){J(this).wrapInner(e.call(this,t))}:function(){var t=J(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=J.isFunction(e);return this.each(function(n){J(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){J.nodeName(this,"body")||J(this).replaceWith(this.childNodes)}).end()}}),J.expr.filters.hidden=function(e){return e.offsetWidth<=0&&e.offsetHeight<=0},J.expr.filters.visible=function(e){return!J.expr.filters.hidden(e)};var kt=/%20/g,St=/\[\]$/,Tt=/\r?\n/g,Et=/^(?:submit|button|image|reset|file)$/i,Ot=/^(?:input|select|textarea|keygen)/i;J.param=function(e,t){var n,r=[],i=function(e,t){t=J.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(void 0===t&&(t=J.ajaxSettings&&J.ajaxSettings.traditional),J.isArray(e)||e.jquery&&!J.isPlainObject(e))J.each(e,function(){i(this.name,this.value)});else for(n in e)q(n,e[n],t,i);return r.join("&").replace(kt,"+")},J.fn.extend({serialize:function(){return J.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=J.prop(this,"elements");return e?J.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!J(this).is(":disabled")&&Ot.test(this.nodeName)&&!Et.test(e)&&(this.checked||!Se.test(e))}).map(function(e,t){var n=J(this).val();return null==n?null:J.isArray(n)?J.map(n,function(e){return{name:t.name,value:e.replace(Tt,"\r\n")}}):{name:t.name,value:n.replace(Tt,"\r\n")}}).get()}}),J.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var Pt=0,At={},Dt={0:200,1223:204},Nt=J.ajaxSettings.xhr();e.attachEvent&&e.attachEvent("onunload",function(){for(var e in At)At[e]()}),Z.cors=!!Nt&&"withCredentials"in Nt,Z.ajax=Nt=!!Nt,J.ajaxTransport(function(e){var t;return Z.cors||Nt&&!e.crossDomain?{send:function(n,r){var i,o=e.xhr(),s=++Pt;if(o.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)o[i]=e.xhrFields[i];e.mimeType&&o.overrideMimeType&&o.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)o.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete At[s],t=o.onload=o.onerror=null,"abort"===e?o.abort():"error"===e?r(o.status,o.statusText):r(Dt[o.status]||o.status,o.statusText,"string"==typeof o.responseText?{text:o.responseText}:void 0,o.getAllResponseHeaders()))}},o.onload=t(),o.onerror=t("error"),t=At[s]=t("abort");try{o.send(e.hasContent&&e.data||null)}catch(a){if(t)throw a}},abort:function(){t&&t()}}:void 0}),J.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return J.globalEval(e),e}}}),J.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),J.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=J("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),G.head.appendChild(t[0])},abort:function(){n&&n()}}}});var jt=[],It=/(=)\?(?=&|$)|\?\?/;J.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=jt.pop()||J.expando+"_"+ct++;return this[e]=!0,e}}),J.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(It.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&It.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=J.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(It,"$1"+i):t.jsonp!==!1&&(t.url+=(ut.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||J.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,jt.push(i)),s&&J.isFunction(o)&&o(s[0]),s=o=void 0}),"script"):void 0}),J.parseHTML=function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||G;var r=se.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=J.buildFragment([e],t,i),i&&i.length&&J(i).remove(),J.merge([],r.childNodes))};var Lt=J.fn.load;J.fn.load=function(e,t,n){if("string"!=typeof e&&Lt)return Lt.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=J.trim(e.slice(a)),e=e.slice(0,a)),J.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),s.length>0&&J.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?J("<div>").append(J.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},J.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){J.fn[t]=function(e){return this.on(t,e)}}),J.expr.filters.animated=function(e){return J.grep(J.timers,function(t){return e===t.elem}).length};var $t=e.document.documentElement;J.offset={setOffset:function(e,t,n){var r,i,o,s,a,l,c,u=J.css(e,"position"),d=J(e),p={};"static"===u&&(e.style.position="relative"),a=d.offset(),o=J.css(e,"top"),l=J.css(e,"left"),c=("absolute"===u||"fixed"===u)&&(o+l).indexOf("auto")>-1,c?(r=d.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(l)||0),J.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(p.top=t.top-a.top+s),null!=t.left&&(p.left=t.left-a.left+i),"using"in t?t.using.call(e,p):d.css(p)}},J.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){J.offset.setOffset(this,e,t)});var t,n,r=this[0],i={top:0,left:0},o=r&&r.ownerDocument;if(o)return t=o.documentElement,J.contains(t,r)?(typeof r.getBoundingClientRect!==Te&&(i=r.getBoundingClientRect()),n=V(o),{top:i.top+n.pageYOffset-t.clientTop,left:i.left+n.pageXOffset-t.clientLeft}):i},position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===J.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),J.nodeName(e[0],"html")||(r=e.offset()),r.top+=J.css(e[0],"borderTopWidth",!0),r.left+=J.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-J.css(n,"marginTop",!0),left:t.left-r.left-J.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent||$t;e&&!J.nodeName(e,"html")&&"static"===J.css(e,"position");)e=e.offsetParent;return e||$t})}}),J.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;J.fn[t]=function(i){return me(this,function(t,i,o){var s=V(t);return void 0===o?s?s[n]:t[i]:void(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o)},t,i,arguments.length,null)}}),J.each(["top","left"],function(e,t){J.cssHooks[t]=C(Z.pixelPosition,function(e,n){return n?(n=x(e,t),Me.test(n)?J(e).position()[t]+"px":n):void 0})}),J.each({Height:"height",Width:"width"},function(e,t){J.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){J.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return me(this,function(t,n,r){var i;return J.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):void 0===r?J.css(t,n,s):J.style(t,n,r,s)},t,o?r:void 0,o,null)}})}),J.fn.size=function(){return this.length},J.fn.andSelf=J.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return J});var Ft=e.jQuery,_t=e.$;return J.noConflict=function(t){return e.$===J&&(e.$=_t),t&&e.jQuery===J&&(e.jQuery=Ft),J},typeof t===Te&&(e.jQuery=e.$=J),J}),window.Modernizr=function(e,t,n){function r(e){b.cssText=e}function i(e,t){return r(k.join(e+";")+(t||""))}function o(e,t){return typeof e===t}function s(e,t){return!!~(""+e).indexOf(t)}function a(e,t){for(var r in e){var i=e[r];if(!s(i,"-")&&b[i]!==n)return"pfx"==t?i:!0}return!1}function l(e,t,r){for(var i in e){var s=t[e[i]];if(s!==n)return r===!1?e[i]:o(s,"function")?s.bind(r||t):s}return!1}function c(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+T.join(r+" ")+r).split(" ");return o(t,"string")||o(t,"undefined")?a(i,t):(i=(e+" "+E.join(r+" ")+r).split(" "),l(i,t,n))}function u(){h.input=function(n){for(var r=0,i=n.length;i>r;r++)D[n[r]]=!!(n[r]in w);return D.list&&(D.list=!(!t.createElement("datalist")||!e.HTMLDataListElement)),D}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),h.inputtypes=function(e){for(var r,i,o,s=0,a=e.length;a>s;s++)w.setAttribute("type",i=e[s]),r="text"!==w.type,r&&(w.value=x,w.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(i)&&w.style.WebkitAppearance!==n?(m.appendChild(w),o=t.defaultView,r=o.getComputedStyle&&"textfield"!==o.getComputedStyle(w,null).WebkitAppearance&&0!==w.offsetHeight,m.removeChild(w)):/^(search|tel)$/.test(i)||(r=/^(url|email)$/.test(i)?w.checkValidity&&w.checkValidity()===!1:w.value!=x)),A[e[s]]=!!r;return A}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d,p,f="2.8.3",h={},g=!0,m=t.documentElement,v="modernizr",y=t.createElement(v),b=y.style,w=t.createElement("input"),x=":)",C={}.toString,k=" -webkit- -moz- -o- -ms- ".split(" "),S="Webkit Moz O ms",T=S.split(" "),E=S.toLowerCase().split(" "),O={svg:"http://www.w3.org/2000/svg"},P={},A={},D={},N=[],j=N.slice,I=function(e,n,r,i){var o,s,a,l,c=t.createElement("div"),u=t.body,d=u||t.createElement("body");if(parseInt(r,10))for(;r--;)a=t.createElement("div"),a.id=i?i[r]:v+(r+1),c.appendChild(a);return o=["&#173;",'<style id="s',v,'">',e,"</style>"].join(""),c.id=v,(u?c:d).innerHTML+=o,d.appendChild(c),u||(d.style.background="",d.style.overflow="hidden",l=m.style.overflow,m.style.overflow="hidden",m.appendChild(d)),s=n(c,e),u?c.parentNode.removeChild(c):(d.parentNode.removeChild(d),m.style.overflow=l),!!s},L=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t)&&n(t).matches||!1;var r;return I("@media "+t+" { #"+v+" { position: absolute; } }",function(t){r="absolute"==(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).position}),r},$=function(){function e(e,i){i=i||t.createElement(r[e]||"div"),e="on"+e;var s=e in i;return s||(i.setAttribute||(i=t.createElement("div")),i.setAttribute&&i.removeAttribute&&(i.setAttribute(e,""),s=o(i[e],"function"),o(i[e],"undefined")||(i[e]=n),i.removeAttribute(e))),i=null,s}var r={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return e}(),F={}.hasOwnProperty;p=o(F,"undefined")||o(F.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(e,t){return F.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=j.call(arguments,1),r=function(){if(this instanceof r){var i=function(){};i.prototype=t.prototype;var o=new i,s=t.apply(o,n.concat(j.call(arguments)));return Object(s)===s?s:o}return t.apply(e,n.concat(j.call(arguments)))};return r}),P.flexbox=function(){return c("flexWrap")},P.flexboxlegacy=function(){return c("boxDirection")},P.canvas=function(){var e=t.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))},P.canvastext=function(){return!(!h.canvas||!o(t.createElement("canvas").getContext("2d").fillText,"function"))},P.webgl=function(){return!!e.WebGLRenderingContext},P.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:I(["@media (",k.join("touch-enabled),("),v,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},P.geolocation=function(){return"geolocation"in navigator},P.postmessage=function(){return!!e.postMessage},P.websqldatabase=function(){return!!e.openDatabase},P.indexedDB=function(){return!!c("indexedDB",e)},P.hashchange=function(){return $("hashchange",e)&&(t.documentMode===n||t.documentMode>7)},P.history=function(){return!(!e.history||!history.pushState)},P.draganddrop=function(){var e=t.createElement("div");return"draggable"in e||"ondragstart"in e&&"ondrop"in e},P.websockets=function(){return"WebSocket"in e||"MozWebSocket"in e},P.rgba=function(){return r("background-color:rgba(150,255,150,.5)"),s(b.backgroundColor,"rgba")},P.hsla=function(){return r("background-color:hsla(120,40%,100%,.5)"),s(b.backgroundColor,"rgba")||s(b.backgroundColor,"hsla")},P.multiplebgs=function(){return r("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(b.background)},P.backgroundsize=function(){return c("backgroundSize")},P.borderimage=function(){return c("borderImage")},P.borderradius=function(){return c("borderRadius")},P.boxshadow=function(){return c("boxShadow")},P.textshadow=function(){return""===t.createElement("div").style.textShadow},P.opacity=function(){return i("opacity:.55"),/^0.55$/.test(b.opacity)},P.cssanimations=function(){return c("animationName")},P.csscolumns=function(){return c("columnCount")},P.cssgradients=function(){var e="background-image:",t="gradient(linear,left top,right bottom,from(#9f9),to(white));",n="linear-gradient(left top,#9f9, white);";return r((e+"-webkit- ".split(" ").join(t+e)+k.join(n+e)).slice(0,-e.length)),s(b.backgroundImage,"gradient")},P.cssreflections=function(){return c("boxReflect")},P.csstransforms=function(){return!!c("transform")},P.csstransforms3d=function(){var e=!!c("perspective");return e&&"webkitPerspective"in m.style&&I("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=9===t.offsetLeft&&3===t.offsetHeight}),e},P.csstransitions=function(){return c("transition")},P.fontface=function(){var e;return I('@font-face {font-family:"font";src:url("https://")}',function(n,r){var i=t.getElementById("smodernizr"),o=i.sheet||i.styleSheet,s=o?o.cssRules&&o.cssRules[0]?o.cssRules[0].cssText:o.cssText||"":"";e=/src/i.test(s)&&0===s.indexOf(r.split(" ")[0])}),e},P.generatedcontent=function(){var e;return I(["#",v,"{font:0/0 a}#",v,':after{content:"',x,'";visibility:hidden;font:3px/1 a}'].join(""),function(t){e=t.offsetHeight>=3}),e},P.video=function(){var e=t.createElement("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(r){}return n},P.audio=function(){var e=t.createElement("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(r){}return n},P.localstorage=function(){try{return localStorage.setItem(v,v),localStorage.removeItem(v),!0}catch(e){return!1}},P.sessionstorage=function(){try{return sessionStorage.setItem(v,v),sessionStorage.removeItem(v),!0}catch(e){return!1}},P.webworkers=function(){return!!e.Worker},P.applicationcache=function(){return!!e.applicationCache},P.svg=function(){return!!t.createElementNS&&!!t.createElementNS(O.svg,"svg").createSVGRect},P.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==O.svg},P.smil=function(){return!!t.createElementNS&&/SVGAnimate/.test(C.call(t.createElementNS(O.svg,"animate")))},P.svgclippaths=function(){return!!t.createElementNS&&/SVGClipPath/.test(C.call(t.createElementNS(O.svg,"clipPath")))};for(var _ in P)p(P,_)&&(d=_.toLowerCase(),h[d]=P[_](),N.push((h[d]?"":"no-")+d));return h.input||u(),h.addTest=function(e,t){if("object"==typeof e)for(var r in e)p(e,r)&&h.addTest(r,e[r]);else{if(e=e.toLowerCase(),h[e]!==n)return h;t="function"==typeof t?t():t,"undefined"!=typeof g&&g&&(m.className+=" "+(t?"":"no-")+e),h[e]=t}return h},r(""),y=w=null,function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=y.elements;return"string"==typeof e?e.split(" "):e}function i(e){var t=v[e[g]];return t||(t={},m++,e[g]=m,v[m]=t),t}function o(e,n,r){if(n||(n=t),u)return n.createElement(e);r||(r=i(n));var o;return o=r.cache[e]?r.cache[e].cloneNode():h.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!o.canHaveChildren||f.test(e)||o.tagUrn?o:r.frag.appendChild(o)}function s(e,n){if(e||(e=t),u)return e.createDocumentFragment();n=n||i(e);for(var o=n.frag.cloneNode(),s=0,a=r(),l=a.length;l>s;s++)o.createElement(a[s]);return o}function a(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return y.shivMethods?o(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}function l(e){e||(e=t);var r=i(e);return!y.shivCSS||c||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),u||a(e,r),e}var c,u,d="3.7.0",p=e.html5||{},f=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",m=0,v={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",c="hidden"in e,u=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){c=!0,u=!0}}();var y={elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:d,shivCSS:p.shivCSS!==!1,supportsUnknownElements:u,shivMethods:p.shivMethods!==!1,type:"default",shivDocument:l,createElement:o,createDocumentFragment:s};e.html5=y,l(t)}(this,t),h._version=f,h._prefixes=k,h._domPrefixes=E,h._cssomPrefixes=T,h.mq=L,h.hasEvent=$,h.testProp=function(e){return a([e])},h.testAllProps=c,h.testStyles=I,h.prefixed=function(e,t,n){return t?c(e,t,n):c(e,"pfx")},m.className=m.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(g?" js "+N.join(" "):""),h}(this,this.document),function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e(window.jQuery||window.Zepto)}(function(e){"use strict";var t,n=[],r={},i=/^([a-z]:)?\/\//i,o=/\.\w+$/;r.init=function(s){return s=e.extend({ping:null,dimensions:"preserve",glue:"_",skipExtensions:["svg"]},s),this.each(function(){var a=e(this);if(a.is("img")&&!a.hasClass("dense-image")){a.addClass("dense-image dense-loading");var l,c=r.getImageAttribute.call(this),u=a.attr("src"),d=!1;if(!c){if(!u||1===t||-1!==e.inArray(u.split(".").pop().split(/[\?\#]/).shift(),s.skipExtensions))return void a.removeClass("dense-image dense-loading");c=u.replace(o,function(e){return s.glue+t+"x"+e}),d=s.ping!==!1&&-1===e.inArray(c,n)&&(s.ping===!0||!i.test(c)||0===c.indexOf("//"+document.domain)||0===c.indexOf(document.location.protocol+"//"+document.domain));

}l=function(){var e=function(){a.removeClass("dense-loading").addClass("dense-ready").trigger("denseRetinaReady.dense")};a.attr("src",c),"update"===s.dimensions?a.dense("updateDimensions").one("denseDimensionChanged",e):("remove"===s.dimensions&&a.removeAttr("width height"),e())},d?e.ajax({url:c,type:"HEAD"}).done(function(e,t,r){var i=r.getResponseHeader("Content-type");i&&0!==i.indexOf("image/")||(n.push(c),l())}):l()}}),this},r.updateDimensions=function(){return this.each(function(){var t,n=e(this),r=n.attr("src");r&&(t=new Image,t.src=r,e(t).on("load.dense",function(){n.attr({width:t.width,height:t.height}).trigger("denseDimensionChanged.dense")}))})},r.devicePixelRatio=function(){var t=1;return"undefined"!==e.type(window.devicePixelRatio)?t=window.devicePixelRatio:"undefined"!==e.type(window.matchMedia)&&e.each([1.3,2,3,4,5,6],function(e,n){var r=["(-webkit-min-device-pixel-ratio: "+n+")","(min-resolution: "+Math.floor(96*n)+"dpi)","(min-resolution: "+n+"dppx)"].join(",");return window.matchMedia(r).matches?void(t=n):!1}),Math.ceil(t)},r.getImageAttribute=function(){for(var n,r=e(this).eq(0),i=!1,o=1;t>=o;o++)n=r.attr("data-"+o+"x"),n&&(i=n);return i},t=r.devicePixelRatio(),e.fn.dense=function(t,n){return("string"!==e.type(t)||"function"!==e.type(r[t]))&&(n=t,t="init"),r[t].call(this,n)},e(function(){e("body.dense-retina img").dense()})}),function(){"use strict";function e(t,r){function i(e,t){return function(){return e.apply(t,arguments)}}var o;if(r=r||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=r.touchBoundary||10,this.layer=t,this.tapDelay=r.tapDelay||200,this.tapTimeout=r.tapTimeout||700,!e.notNeeded(t)){for(var s=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],a=this,l=0,c=s.length;c>l;l++)a[s[l]]=i(a[s[l]],a);n&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,r){var i=Node.prototype.removeEventListener;"click"===e?i.call(t,e,n.hijacked||n,r):i.call(t,e,n,r)},t.addEventListener=function(e,n,r){var i=Node.prototype.addEventListener;"click"===e?i.call(t,e,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),r):i.call(t,e,n,r)}),"function"==typeof t.onclick&&(o=t.onclick,t.addEventListener("click",function(e){o(e)},!1),t.onclick=null)}}var t=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!t,r=/iP(ad|hone|od)/.test(navigator.userAgent)&&!t,i=r&&/OS 4_\d(_\d)?/.test(navigator.userAgent),o=r&&/OS [6-7]_\d/.test(navigator.userAgent),s=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(r&&"file"===e.type||e.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(e.className)},e.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},e.prototype.sendClick=function(e,t){var n,r;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),r=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,r.screenX,r.screenY,r.clientX,r.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},e.prototype.determineEventType=function(e){return n&&"select"===e.tagName.toLowerCase()?"mousedown":"click"},e.prototype.focus=function(e){var t;r&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type&&"month"!==e.type?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},e.prototype.updateScrollParent=function(e){var t,n;if(t=e.fastClickScrollParent,!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)},e.prototype.getTargetElementFromEventTarget=function(e){return e.nodeType===Node.TEXT_NODE?e.parentNode:e},e.prototype.onTouchStart=function(e){var t,n,o;if(e.targetTouches.length>1)return!0;if(t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0],r){if(o=window.getSelection(),o.rangeCount&&!o.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<this.tapDelay&&e.preventDefault(),!0},e.prototype.touchHasMoved=function(e){var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n?!0:!1},e.prototype.onTouchMove=function(e){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},e.prototype.findControl=function(e){return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(e){var t,s,a,l,c,u=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(e.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,s=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,o&&(c=e.changedTouches[0],u=document.elementFromPoint(c.pageX-window.pageXOffset,c.pageY-window.pageYOffset)||u,u.fastClickScrollParent=this.targetElement.fastClickScrollParent),a=u.tagName.toLowerCase(),"label"===a){if(t=this.findControl(u)){if(this.focus(u),n)return!1;u=t}}else if(this.needsFocus(u))return e.timeStamp-s>100||r&&window.top!==window&&"input"===a?(this.targetElement=null,!1):(this.focus(u),this.sendClick(u,e),r&&"select"===a||(this.targetElement=null,e.preventDefault()),!1);return r&&!i&&(l=u.fastClickScrollParent,l&&l.fastClickLastScrollTop!==l.scrollTop)?!0:(this.needsClick(u)||(e.preventDefault(),this.sendClick(u,e)),!1)},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(e){return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0},e.prototype.onClick=function(e){var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===e.target.type&&0===e.detail?!0:(t=this.onMouse(e),t||(this.targetElement=null),t)},e.prototype.destroy=function(){var e=this.layer;n&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(e){var t,r,i,o;if("undefined"==typeof window.ontouchstart)return!0;if(r=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(r>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(s&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(t=document.querySelector("meta[name=viewport]")))){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===e.style.msTouchAction||"manipulation"===e.style.touchAction?!0:(o=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],o>=27&&(t=document.querySelector("meta[name=viewport]"),t&&(-1!==t.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===e.style.touchAction||"manipulation"===e.style.touchAction?!0:!1)},e.attach=function(t,n){return new e(t,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.FastClick=e):window.FastClick=e}(),function(e,t,n){"use strict";function r(t){if(u.webkit&&!t)return{height:0,width:0};if(!u.data.outer){var n={border:"none","box-sizing":"content-box",height:"200px",margin:"0",padding:"0",width:"200px"};u.data.inner=e("<div>").css(e.extend({},n)),u.data.outer=e("<div>").css(e.extend({left:"-1000px",overflow:"scroll",position:"absolute",top:"-1000px"},n)).append(u.data.inner).appendTo("body")}return u.data.outer.scrollLeft(1e3).scrollTop(1e3),{height:Math.ceil(u.data.outer.offset().top-u.data.inner.offset().top||0),width:Math.ceil(u.data.outer.offset().left-u.data.inner.offset().left||0)}}function i(n,r){return e(t).on({"blur.scrollbar":function(){e(t).add("body").off(".scrollbar"),n&&n()},"dragstart.scrollbar":function(e){return e.preventDefault(),!1},"mouseup.scrollbar":function(){e(t).add("body").off(".scrollbar"),n&&n()}}),e("body").on({"selectstart.scrollbar":function(e){return e.preventDefault(),!1}}),r&&r.preventDefault(),!1}function o(){var e=r(!0);return!(e.height||e.width)}function s(e){var t=e.originalEvent;return t.axis&&t.axis===t.HORIZONTAL_AXIS?!1:t.wheelDeltaX?!1:!0}var a=!1,l=1,c="px",u={data:{},macosx:-1!==n.navigator.platform.toLowerCase().indexOf("mac"),mobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(n.navigator.userAgent),overlay:null,scroll:null,scrolls:[],webkit:/WebKit/.test(n.navigator.userAgent),log:a?function(t,r){var i=t;r&&"string"!=typeof t&&(i=[],e.each(t,function(e,t){i.push('"'+e+'": '+t)}),i=i.join(", ")),n.console&&n.console.log?n.console.log(i):alert(i)}:function(){}},d={autoScrollSize:!0,autoUpdate:!0,debug:!1,disableBodyScroll:!1,duration:200,ignoreMobile:!0,ignoreOverlay:!0,scrollStep:30,showArrows:!1,stepScrolling:!0,type:"simple",scrollx:null,scrolly:null,onDestroy:null,onInit:null,onScroll:null,onUpdate:null},p=function(t,i){u.scroll||(u.log("Init jQuery Scrollbar v0.2.6"),u.overlay=o(),u.scroll=r(),g(),e(n).resize(function(){var e=!1;if(u.scroll&&(u.scroll.height||u.scroll.width)){var t=r();(t.height!=u.scroll.height||t.width!=u.scroll.width)&&(u.scroll=t,e=!0)}g(e)})),this.container=t,this.options=e.extend({},d,n.jQueryScrollbarOptions||{}),this.scrollTo=null,this.scrollx={},this.scrolly={},this.init(i)};p.prototype={destroy:function(){if(this.wrapper){var n=this.container.scrollLeft(),r=this.container.scrollTop();this.container.insertBefore(this.wrapper).css({height:"",margin:""}).removeClass("scroll-content").removeClass("scroll-scrollx_visible").removeClass("scroll-scrolly_visible").off(".scrollbar").scrollLeft(n).scrollTop(r),this.scrollx.scrollbar.removeClass("scroll-scrollx_visible").find("div").andSelf().off(".scrollbar"),this.scrolly.scrollbar.removeClass("scroll-scrolly_visible").find("div").andSelf().off(".scrollbar"),this.wrapper.remove(),e(t).add("body").off(".scrollbar"),e.isFunction(this.options.onDestroy)&&this.options.onDestroy.apply(this,[this.container])}},getScrollbar:function(t){var n=this.options["scroll"+t],r={advanced:'<div class="scroll-element_corner"></div><div class="scroll-arrow scroll-arrow_less"></div><div class="scroll-arrow scroll-arrow_more"></div><div class="scroll-element_outer">    <div class="scroll-element_size"></div>    <div class="scroll-element_inner-wrapper">        <div class="scroll-element_inner scroll-element_track">            <div class="scroll-element_inner-bottom"></div>        </div>    </div>    <div class="scroll-bar">        <div class="scroll-bar_body">            <div class="scroll-bar_body-inner"></div>        </div>        <div class="scroll-bar_bottom"></div>        <div class="scroll-bar_center"></div>    </div></div>',simple:'<div class="scroll-element_outer">    <div class="scroll-element_size"></div>    <div class="scroll-element_track"></div>    <div class="scroll-bar"></div></div>'},i=r[this.options.type]?this.options.type:"advanced";return n=n?"string"==typeof n?e(n).appendTo(this.wrapper):e(n):e("<div>").addClass("scroll-element").html(r[i]).appendTo(this.wrapper),this.options.showArrows&&n.addClass("scroll-element_arrows_visible"),n.addClass("scroll-"+t)},init:function(n){var r=this,o=this.container,a=this.containerWrapper||o,d=e.extend(this.options,n||{}),p={x:this.scrollx,y:this.scrolly},f=this.wrapper,h={scrollLeft:o.scrollLeft(),scrollTop:o.scrollTop()};if(u.mobile&&d.ignoreMobile||u.overlay&&d.ignoreOverlay||u.macosx&&!u.webkit)return!1;if(f)a.css({height:"","margin-bottom":-1*u.scroll.height+c,"margin-right":-1*u.scroll.width+c});else{if(this.wrapper=f=e("<div>").addClass("scroll-wrapper").addClass(o.attr("class")).css("position","absolute"==o.css("position")?"absolute":"relative").insertBefore(o).append(o),o.is("textarea")&&(this.containerWrapper=a=e("<div>").insertBefore(o).append(o),f.addClass("scroll-textarea")),a.addClass("scroll-content").css({height:"","margin-bottom":-1*u.scroll.height+c,"margin-right":-1*u.scroll.width+c}),o.on("scroll.scrollbar",function(t){e.isFunction(d.onScroll)&&d.onScroll.call(r,{maxScroll:p.y.maxScrollOffset,scroll:o.scrollTop(),size:p.y.size,visible:p.y.visible},{maxScroll:p.x.maxScrollOffset,scroll:o.scrollLeft(),size:p.x.size,visible:p.x.visible}),p.x.isVisible&&p.x.scroller.css("left",o.scrollLeft()*p.x.kx+c),p.y.isVisible&&p.y.scroller.css("top",o.scrollTop()*p.y.kx+c)}),f.on("scroll",function(){f.scrollTop(0).scrollLeft(0)}),d.disableBodyScroll){var g=function(e){s(e)?p.y.isVisible&&p.y.mousewheel(e):p.x.isVisible&&p.x.mousewheel(e)};f.on({"MozMousePixelScroll.scrollbar":g,"mousewheel.scrollbar":g}),u.mobile&&f.on("touchstart.scrollbar",function(n){var r=n.originalEvent.touches&&n.originalEvent.touches[0]||n,i={pageX:r.pageX,pageY:r.pageY},s={left:o.scrollLeft(),top:o.scrollTop()};e(t).on({"touchmove.scrollbar":function(e){var t=e.originalEvent.targetTouches&&e.originalEvent.targetTouches[0]||e;o.scrollLeft(s.left+i.pageX-t.pageX),o.scrollTop(s.top+i.pageY-t.pageY),e.preventDefault()},"touchend.scrollbar":function(){e(t).off(".scrollbar")}})})}e.isFunction(d.onInit)&&d.onInit.apply(this,[o])}e.each(p,function(n,a){var c=null,u=1,f="x"==n?"scrollLeft":"scrollTop",h=d.scrollStep,g=function(){var e=o[f]();o[f](e+h),1==u&&e+h>=m&&(e=o[f]()),-1==u&&m>=e+h&&(e=o[f]()),o[f]()==e&&c&&c()},m=0;a.scrollbar||(a.scrollbar=r.getScrollbar(n),a.scroller=a.scrollbar.find(".scroll-bar"),a.mousewheel=function(e){if(!a.isVisible||"x"==n&&s(e))return!0;if("y"==n&&!s(e))return p.x.mousewheel(e),!0;var t=-1*e.originalEvent.wheelDelta||e.originalEvent.detail,i=a.size-a.visible-a.offset;return 0>=m&&0>t||m>=i&&t>0||(m+=t,0>m&&(m=0),m>i&&(m=i),r.scrollTo=r.scrollTo||{},r.scrollTo[f]=m,setTimeout(function(){r.scrollTo&&(o.stop().animate(r.scrollTo,240,"linear",function(){m=o[f]()}),r.scrollTo=null)},1)),e.preventDefault(),!1},a.scrollbar.on({"MozMousePixelScroll.scrollbar":a.mousewheel,"mousewheel.scrollbar":a.mousewheel,"mouseenter.scrollbar":function(){m=o[f]()}}),a.scrollbar.find(".scroll-arrow, .scroll-element_track").on("mousedown.scrollbar",function(t){if(t.which!=l)return!0;u=1;var s={eventOffset:t["x"==n?"pageX":"pageY"],maxScrollValue:a.size-a.visible-a.offset,scrollbarOffset:a.scroller.offset()["x"==n?"left":"top"],scrollbarSize:a.scroller["x"==n?"outerWidth":"outerHeight"]()},p=0,v=0;return e(this).hasClass("scroll-arrow")?(u=e(this).hasClass("scroll-arrow_more")?1:-1,h=d.scrollStep*u,m=u>0?s.maxScrollValue:0):(u=s.eventOffset>s.scrollbarOffset+s.scrollbarSize?1:s.eventOffset<s.scrollbarOffset?-1:0,h=Math.round(.75*a.visible)*u,m=s.eventOffset-s.scrollbarOffset-(d.stepScrolling?1==u?s.scrollbarSize:0:Math.round(s.scrollbarSize/2)),m=o[f]()+m/a.kx),r.scrollTo=r.scrollTo||{},r.scrollTo[f]=d.stepScrolling?o[f]()+h:m,d.stepScrolling&&(c=function(){m=o[f](),clearInterval(v),clearTimeout(p),p=0,v=0},p=setTimeout(function(){v=setInterval(g,40)},d.duration+100)),setTimeout(function(){r.scrollTo&&(o.animate(r.scrollTo,d.duration),r.scrollTo=null)},1),i(c,t)}),a.scroller.on("mousedown.scrollbar",function(r){if(r.which!=l)return!0;var s=r["x"==n?"pageX":"pageY"],c=o[f]();return a.scrollbar.addClass("scroll-draggable"),e(t).on("mousemove.scrollbar",function(e){var t=parseInt((e["x"==n?"pageX":"pageY"]-s)/a.kx,10);o[f](c+t)}),i(function(){a.scrollbar.removeClass("scroll-draggable"),m=o[f]()},r)}))}),e.each(p,function(e,t){var n="scroll-scroll"+e+"_visible",r="x"==e?p.y:p.x;t.scrollbar.removeClass(n),r.scrollbar.removeClass(n),a.removeClass(n)}),e.each(p,function(t,n){e.extend(n,"x"==t?{offset:parseInt(o.css("left"),10)||0,size:o.prop("scrollWidth"),visible:f.width()}:{offset:parseInt(o.css("top"),10)||0,size:o.prop("scrollHeight"),visible:f.height()})});var m=function(t,n){var r="scroll-scroll"+t+"_visible",i="x"==t?p.y:p.x,s=parseInt(o.css("x"==t?"left":"top"),10)||0,l=n.size,d=n.visible+s;n.isVisible=l-d>1,n.isVisible?(n.scrollbar.addClass(r),i.scrollbar.addClass(r),a.addClass(r)):(n.scrollbar.removeClass(r),i.scrollbar.removeClass(r),a.removeClass(r)),"y"==t&&(n.isVisible||n.size<n.visible)&&a.css("height",d+u.scroll.height+c),(p.x.size!=o.prop("scrollWidth")||p.y.size!=o.prop("scrollHeight")||p.x.visible!=f.width()||p.y.visible!=f.height()||p.x.offset!=(parseInt(o.css("left"),10)||0)||p.y.offset!=(parseInt(o.css("top"),10)||0))&&(e.each(p,function(t,n){e.extend(n,"x"==t?{offset:parseInt(o.css("left"),10)||0,size:o.prop("scrollWidth"),visible:f.width()}:{offset:parseInt(o.css("top"),10)||0,size:o.prop("scrollHeight"),visible:f.height()})}),m("x"==t?"y":"x",i))};e.each(p,m),e.isFunction(d.onUpdate)&&d.onUpdate.apply(this,[o]),e.each(p,function(e,t){var n="x"==e?"left":"top",r="x"==e?"outerWidth":"outerHeight",i="x"==e?"width":"height",s=parseInt(o.css(n),10)||0,a=t.size,l=t.visible+s,u=t.scrollbar.find(".scroll-element_size");u=u[r]()+(parseInt(u.css(n),10)||0),d.autoScrollSize&&(t.scrollbarSize=parseInt(u*l/a,10),t.scroller.css(i,t.scrollbarSize+c)),t.scrollbarSize=t.scroller[r](),t.kx=(u-t.scrollbarSize)/(a-l)||1,t.maxScrollOffset=a-l}),o.scrollLeft(h.scrollLeft).scrollTop(h.scrollTop).trigger("scroll")}},e.fn.scrollbar=function(t,n){var r=this;return"get"===t&&(r=null),this.each(function(){var i=e(this);if(i.hasClass("scroll-wrapper")||"body"==i.get(0).nodeName)return!0;var o=i.data("scrollbar");if(o){if("get"===t)return r=o,!1;var s="string"==typeof t&&o[t]?t:"init";if(o[s].apply(o,e.isArray(n)?n:[]),"destroy"===t)for(i.removeData("scrollbar");e.inArray(o,u.scrolls)>=0;)u.scrolls.splice(e.inArray(o,u.scrolls),1)}else"string"!=typeof t&&(o=new p(i,t),i.data("scrollbar",o),u.scrolls.push(o));return!0}),r},e.fn.scrollbar.options=d,n.angular&&!function(e){var t=e.module("jQueryScrollbar",[]);t.directive("jqueryScrollbar",function(){return{link:function(e,t){t.scrollbar(e.options).on("$destroy",function(){t.scrollbar("destroy")})},restring:"AC",scope:{options:"=jqueryScrollbar"}}})}(n.angular);var f=0,h=0,g=function(e){var t,n,r,i,o,s,l;for(t=0;t<u.scrolls.length;t++)i=u.scrolls[t],n=i.container,r=i.options,o=i.wrapper,s=i.scrollx,l=i.scrolly,(e||r.autoUpdate&&o&&o.is(":visible")&&(n.prop("scrollWidth")!=s.size||n.prop("scrollHeight")!=l.size||o.width()!=s.visible||o.height()!=l.visible))&&(i.init(),a&&(u.log({scrollHeight:n.prop("scrollHeight")+":"+i.scrolly.size,scrollWidth:n.prop("scrollWidth")+":"+i.scrollx.size,visibleHeight:o.height()+":"+i.scrolly.visible,visibleWidth:o.width()+":"+i.scrollx.visible},!0),h++));a&&h>10?(u.log("Scroll updates exceed 10"),g=function(){}):(clearTimeout(f),f=setTimeout(g,300))}}(jQuery,document,window),jQuery.extend({bez:function(e){var t="bez_"+jQuery.makeArray(arguments).join("_").replace(".","p");if("function"!=typeof jQuery.easing[t]){var n=function(e,t){var n=[null,null],r=[null,null],i=[null,null],o=function(o,s){return i[s]=3*e[s],r[s]=3*(t[s]-e[s])-i[s],n[s]=1-i[s]-r[s],o*(i[s]+o*(r[s]+o*n[s]))},s=function(e){return i[0]+e*(2*r[0]+3*n[0]*e)},a=function(e){for(var t,n=e,r=0;++r<14&&(t=o(n,0)-e,!(Math.abs(t)<.001));)n-=t/s(n);return n};return function(e){return o(a(e),1)}};jQuery.easing[t]=function(t,r,i,o,s){return o*n([e[0],e[1]],[e[2],e[3]])(r/s)+i}}return t}}),function(e){e.fn.addBack=e.fn.addBack||e.fn.andSelf,e.fn.extend({actual:function(t,n){if(!this[t])throw'$.actual => The jQuery method "'+t+'" you called does not exist';var r,i,o={absolute:!1,clone:!1,includeMargin:!1},s=e.extend(o,n),a=this.eq(0);if(s.clone===!0)r=function(){var e="position: absolute !important; top: -1000 !important; ";a=a.clone().attr("style",e).appendTo("body")},i=function(){a.remove()};else{var l,c=[],u="";r=function(){l=a.parents().addBack().filter(":hidden"),u+="visibility: hidden !important; display: block !important; ",s.absolute===!0&&(u+="position: absolute !important; "),l.each(function(){var t=e(this),n=t.attr("style");c.push(n),t.attr("style",n?n+";"+u:u)})},i=function(){l.each(function(t){var n=e(this),r=c[t];void 0===r?n.removeAttr("style"):n.attr("style",r)})}}r();var d=/(outer)/.test(t)?a[t](s.includeMargin):a[t]();return i(),d}})}(jQuery),function(){"use strict";function e(r){if(!r)throw new Error("No options passed to Waypoint constructor");if(!r.element)throw new Error("No element option passed to Waypoint constructor");if(!r.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+t,this.options=e.Adapter.extend({},e.defaults,r),this.element=this.options.element,this.adapter=new e.Adapter(this.element),this.callback=r.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=e.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=e.Context.findOrCreateByElement(this.options.context),e.offsetAliases[this.options.offset]&&(this.options.offset=e.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),n[this.key]=this,t+=1}var t=0,n={};e.prototype.queueTrigger=function(e){this.group.queueTrigger(this,e)},e.prototype.trigger=function(e){this.enabled&&this.callback&&this.callback.apply(this,e)},e.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete n[this.key]},e.prototype.disable=function(){return this.enabled=!1,this},e.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},e.prototype.next=function(){return this.group.next(this)},e.prototype.previous=function(){return this.group.previous(this)},e.invokeAll=function(e){var t=[];for(var r in n)t.push(n[r]);for(var i=0,o=t.length;o>i;i++)t[i][e]()},e.destroyAll=function(){e.invokeAll("destroy")},e.disableAll=function(){e.invokeAll("disable")},e.enableAll=function(){e.invokeAll("enable")},e.refreshAll=function(){e.Context.refreshAll()},e.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},e.viewportWidth=function(){return document.documentElement.clientWidth},e.adapters=[],e.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},e.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=e}(),function(){"use strict";function e(e){window.setTimeout(e,1e3/60)}function t(e){this.element=e,this.Adapter=i.Adapter,this.adapter=new this.Adapter(e),this.key="waypoint-context-"+n,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},e.waypointContextKey=this.key,r[e.waypointContextKey]=this,n+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var n=0,r={},i=window.Waypoint,o=window.onload;t.prototype.add=function(e){var t=e.options.horizontal?"horizontal":"vertical";this.waypoints[t][e.key]=e,this.refresh()},t.prototype.checkEmpty=function(){var e=this.Adapter.isEmptyObject(this.waypoints.horizontal),t=this.Adapter.isEmptyObject(this.waypoints.vertical);e&&t&&(this.adapter.off(".waypoints"),delete r[this.key])},t.prototype.createThrottledResizeHandler=function(){function e(){t.handleResize(),t.didResize=!1}var t=this;this.adapter.on("resize.waypoints",function(){t.didResize||(t.didResize=!0,i.requestAnimationFrame(e))})},t.prototype.createThrottledScrollHandler=function(){function e(){t.handleScroll(),t.didScroll=!1}var t=this;this.adapter.on("scroll.waypoints",function(){(!t.didScroll||i.isTouch)&&(t.didScroll=!0,i.requestAnimationFrame(e))})},t.prototype.handleResize=function(){i.Context.refreshAll()},t.prototype.handleScroll=function(){var e={},t={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var n in t){var r=t[n],i=r.newScroll>r.oldScroll,o=i?r.forward:r.backward;for(var s in this.waypoints[n]){var a=this.waypoints[n][s],l=r.oldScroll<a.triggerPoint,c=r.newScroll>=a.triggerPoint,u=l&&c,d=!l&&!c;(u||d)&&(a.queueTrigger(o),e[a.group.id]=a.group)}}for(var p in e)e[p].flushTriggers();this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}},t.prototype.innerHeight=function(){return this.element==this.element.window?i.viewportHeight():this.adapter.innerHeight()},t.prototype.remove=function(e){delete this.waypoints[e.axis][e.key],this.checkEmpty()},t.prototype.innerWidth=function(){return this.element==this.element.window?i.viewportWidth():this.adapter.innerWidth()},t.prototype.destroy=function(){var e=[];for(var t in this.waypoints)for(var n in this.waypoints[t])e.push(this.waypoints[t][n]);for(var r=0,i=e.length;i>r;r++)e[r].destroy()},t.prototype.refresh=function(){var e,t=this.element==this.element.window,n=this.adapter.offset(),r={};this.handleScroll(),e={horizontal:{contextOffset:t?0:n.left,contextScroll:t?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:t?0:n.top,contextScroll:t?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var i in e){var o=e[i];for(var s in this.waypoints[i]){var a,l,c,u,d,p=this.waypoints[i][s],f=p.options.offset,h=p.triggerPoint,g=0,m=null==h;p.element!==p.element.window&&(g=p.adapter.offset()[o.offsetProp]),"function"==typeof f?f=f.apply(p):"string"==typeof f&&(f=parseFloat(f),p.options.offset.indexOf("%")>-1&&(f=Math.ceil(o.contextDimension*f/100))),a=o.contextScroll-o.contextOffset,p.triggerPoint=g+a-f,l=h<o.oldScroll,c=p.triggerPoint>=o.oldScroll,u=l&&c,d=!l&&!c,!m&&u?(p.queueTrigger(o.backward),r[p.group.id]=p.group):!m&&d?(p.queueTrigger(o.forward),r[p.group.id]=p.group):m&&o.oldScroll>=p.triggerPoint&&(p.queueTrigger(o.forward),r[p.group.id]=p.group)}}for(var v in r)r[v].flushTriggers();return this},t.findOrCreateByElement=function(e){return t.findByElement(e)||new t(e)},t.refreshAll=function(){for(var e in r)r[e].refresh()},t.findByElement=function(e){return r[e.waypointContextKey]},window.onload=function(){o&&o(),t.refreshAll()},i.requestAnimationFrame=function(t){var n=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||e;n.call(window,t)},i.Context=t}(),function(){"use strict";function e(e,t){return e.triggerPoint-t.triggerPoint}function t(e,t){return t.triggerPoint-e.triggerPoint}function n(e){this.name=e.name,this.axis=e.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),r[this.axis][this.name]=this}var r={vertical:{},horizontal:{}},i=window.Waypoint;n.prototype.add=function(e){this.waypoints.push(e)},n.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},n.prototype.flushTriggers=function(){for(var n in this.triggerQueues){var r=this.triggerQueues[n],i="up"===n||"left"===n;r.sort(i?t:e);for(var o=0,s=r.length;s>o;o+=1){var a=r[o];(a.options.continuous||o===r.length-1)&&a.trigger([n])}}this.clearTriggerQueues()},n.prototype.next=function(t){this.waypoints.sort(e);var n=i.Adapter.inArray(t,this.waypoints),r=n===this.waypoints.length-1;return r?null:this.waypoints[n+1]},n.prototype.previous=function(t){this.waypoints.sort(e);var n=i.Adapter.inArray(t,this.waypoints);return n?this.waypoints[n-1]:null},n.prototype.queueTrigger=function(e,t){this.triggerQueues[t].push(e)},n.prototype.remove=function(e){var t=i.Adapter.inArray(e,this.waypoints);t>-1&&this.waypoints.splice(t,1)},n.prototype.first=function(){return this.waypoints[0]},n.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},n.findOrCreate=function(e){return r[e.axis][e.name]||new n(e)},i.Group=n}(),function(){"use strict";function e(e){this.$element=t(e)}var t=window.jQuery,n=window.Waypoint;t.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(t,n){e.prototype[n]=function(){var e=Array.prototype.slice.call(arguments);return this.$element[n].apply(this.$element,e)}}),t.each(["extend","inArray","isEmptyObject"],function(n,r){e[r]=t[r]}),n.adapters.push({name:"jquery",Adapter:e}),n.Adapter=e}(),function(){"use strict";function e(e){return function(){var n=[],r=arguments[0];return e.isFunction(arguments[0])&&(r=e.extend({},arguments[1]),r.handler=arguments[0]),this.each(function(){var i=e.extend({},r,{element:this});"string"==typeof i.context&&(i.context=e(this).closest(i.context)[0]),n.push(new t(i))}),n}}var t=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=e(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=e(window.Zepto))}(),function(e){function t(e){var t=e.length,r=n.type(e);return"function"===r||n.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===r||0===t||"number"==typeof t&&t>0&&t-1 in e}if(!e.jQuery){var n=function(e,t){return new n.fn.init(e,t)};n.isWindow=function(e){return null!=e&&e==e.window},n.type=function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?i[s.call(e)]||"object":typeof e},n.isArray=Array.isArray||function(e){return"array"===n.type(e)},n.isPlainObject=function(e){var t;if(!e||"object"!==n.type(e)||e.nodeType||n.isWindow(e))return!1;try{if(e.constructor&&!o.call(e,"constructor")&&!o.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}for(t in e);return void 0===t||o.call(e,t)},n.each=function(e,n,r){var i,o=0,s=e.length,a=t(e);if(r){if(a)for(;s>o&&(i=n.apply(e[o],r),i!==!1);o++);else for(o in e)if(i=n.apply(e[o],r),i===!1)break}else if(a)for(;s>o&&(i=n.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=n.call(e[o],o,e[o]),i===!1)break;return e},n.data=function(e,t,i){if(void 0===i){var o=e[n.expando],s=o&&r[o];if(void 0===t)return s;if(s&&t in s)return s[t]}else if(void 0!==t){var o=e[n.expando]||(e[n.expando]=++n.uuid);return r[o]=r[o]||{},r[o][t]=i,i}},n.removeData=function(e,t){var i=e[n.expando],o=i&&r[i];o&&n.each(t,function(e,t){delete o[t]})},n.extend=function(){var e,t,r,i,o,s,a=arguments[0]||{},l=1,c=arguments.length,u=!1;

for("boolean"==typeof a&&(u=a,a=arguments[l]||{},l++),"object"!=typeof a&&"function"!==n.type(a)&&(a={}),l===c&&(a=this,l--);c>l;l++)if(null!=(o=arguments[l]))for(i in o)e=a[i],r=o[i],a!==r&&(u&&r&&(n.isPlainObject(r)||(t=n.isArray(r)))?(t?(t=!1,s=e&&n.isArray(e)?e:[]):s=e&&n.isPlainObject(e)?e:{},a[i]=n.extend(u,s,r)):void 0!==r&&(a[i]=r));return a},n.queue=function(e,r,i){function o(e,n){var r=n||[];return null!=e&&(t(Object(e))?!function(e,t){for(var n=+t.length,r=0,i=e.length;n>r;)e[i++]=t[r++];if(n!==n)for(;void 0!==t[r];)e[i++]=t[r++];return e.length=i,e}(r,"string"==typeof e?[e]:e):[].push.call(r,e)),r}if(e){r=(r||"fx")+"queue";var s=n.data(e,r);return i?(!s||n.isArray(i)?s=n.data(e,r,o(i)):s.push(i),s):s||[]}},n.dequeue=function(e,t){n.each(e.nodeType?[e]:e,function(e,r){t=t||"fx";var i=n.queue(r,t),o=i.shift();"inprogress"===o&&(o=i.shift()),o&&("fx"===t&&i.unshift("inprogress"),o.call(r,function(){n.dequeue(r,t)}))})},n.fn=n.prototype={init:function(e){if(e.nodeType)return this[0]=e,this;throw new Error("Not a DOM node.")},offset:function(){var t=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:t.top+(e.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:t.left+(e.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function e(){for(var e=this.offsetParent||document;e&&"html"===!e.nodeType.toLowerCase&&"static"===e.style.position;)e=e.offsetParent;return e||document}var t=this[0],e=e.apply(t),r=this.offset(),i=/^(?:body|html)$/i.test(e.nodeName)?{top:0,left:0}:n(e).offset();return r.top-=parseFloat(t.style.marginTop)||0,r.left-=parseFloat(t.style.marginLeft)||0,e.style&&(i.top+=parseFloat(e.style.borderTopWidth)||0,i.left+=parseFloat(e.style.borderLeftWidth)||0),{top:r.top-i.top,left:r.left-i.left}}};var r={};n.expando="velocity"+(new Date).getTime(),n.uuid=0;for(var i={},o=i.hasOwnProperty,s=i.toString,a="Boolean Number String Function Array Date RegExp Object Error".split(" "),l=0;l<a.length;l++)i["[object "+a[l]+"]"]=a[l].toLowerCase();n.fn.init.prototype=n.fn,e.Velocity={Utilities:n}}}(window),function(e){"object"==typeof module&&"object"==typeof module.exports?module.exports=e():"function"==typeof define&&define.amd?define(e):e()}(function(){return function(e,t,n,r){function i(e){for(var t=-1,n=e?e.length:0,r=[];++t<n;){var i=e[t];i&&r.push(i)}return r}function o(e){return g.isWrapped(e)?e=[].slice.call(e):g.isNode(e)&&(e=[e]),e}function s(e){var t=p.data(e,"velocity");return null===t?r:t}function a(e){return function(t){return Math.round(t*e)*(1/e)}}function l(e,n,r,i){function o(e,t){return 1-3*t+3*e}function s(e,t){return 3*t-6*e}function a(e){return 3*e}function l(e,t,n){return((o(t,n)*e+s(t,n))*e+a(t))*e}function c(e,t,n){return 3*o(t,n)*e*e+2*s(t,n)*e+a(t)}function u(t,n){for(var i=0;g>i;++i){var o=c(n,e,r);if(0===o)return n;var s=l(n,e,r)-t;n-=s/o}return n}function d(){for(var t=0;b>t;++t)k[t]=l(t*w,e,r)}function p(t,n,i){var o,s,a=0;do s=n+(i-n)/2,o=l(s,e,r)-t,o>0?i=s:n=s;while(Math.abs(o)>v&&++a<y);return s}function f(t){for(var n=0,i=1,o=b-1;i!=o&&k[i]<=t;++i)n+=w;--i;var s=(t-k[i])/(k[i+1]-k[i]),a=n+s*w,l=c(a,e,r);return l>=m?u(t,a):0==l?a:p(t,n,n+w)}function h(){S=!0,(e!=n||r!=i)&&d()}var g=4,m=.001,v=1e-7,y=10,b=11,w=1/(b-1),x="Float32Array"in t;if(4!==arguments.length)return!1;for(var C=0;4>C;++C)if("number"!=typeof arguments[C]||isNaN(arguments[C])||!isFinite(arguments[C]))return!1;e=Math.min(e,1),r=Math.min(r,1),e=Math.max(e,0),r=Math.max(r,0);var k=x?new Float32Array(b):new Array(b),S=!1,T=function(t){return S||h(),e===n&&r===i?t:0===t?0:1===t?1:l(f(t),n,i)};T.getControlPoints=function(){return[{x:e,y:n},{x:r,y:i}]};var E="generateBezier("+[e,n,r,i]+")";return T.toString=function(){return E},T}function c(e,t){var n=e;return g.isString(e)?b.Easings[e]||(n=!1):n=g.isArray(e)&&1===e.length?a.apply(null,e):g.isArray(e)&&2===e.length?w.apply(null,e.concat([t])):g.isArray(e)&&4===e.length?l.apply(null,e):!1,n===!1&&(n=b.Easings[b.defaults.easing]?b.defaults.easing:y),n}function u(e){if(e){var t=(new Date).getTime(),n=b.State.calls.length;n>1e4&&(b.State.calls=i(b.State.calls));for(var o=0;n>o;o++)if(b.State.calls[o]){var a=b.State.calls[o],l=a[0],c=a[2],f=a[3],h=!!f,m=null;f||(f=b.State.calls[o][3]=t-16);for(var v=Math.min((t-f)/c.duration,1),y=0,w=l.length;w>y;y++){var C=l[y],S=C.element;if(s(S)){var T=!1;if(c.display!==r&&null!==c.display&&"none"!==c.display){if("flex"===c.display){var E=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];p.each(E,function(e,t){x.setPropertyValue(S,"display",t)})}x.setPropertyValue(S,"display",c.display)}c.visibility!==r&&"hidden"!==c.visibility&&x.setPropertyValue(S,"visibility",c.visibility);for(var O in C)if("element"!==O){var P,A=C[O],D=g.isString(A.easing)?b.Easings[A.easing]:A.easing;if(1===v)P=A.endValue;else{var N=A.endValue-A.startValue;if(P=A.startValue+N*D(v,c,N),!h&&P===A.currentValue)continue}if(A.currentValue=P,"tween"===O)m=P;else{if(x.Hooks.registered[O]){var j=x.Hooks.getRoot(O),I=s(S).rootPropertyValueCache[j];I&&(A.rootPropertyValue=I)}var L=x.setPropertyValue(S,O,A.currentValue+(0===parseFloat(P)?"":A.unitType),A.rootPropertyValue,A.scrollData);x.Hooks.registered[O]&&(s(S).rootPropertyValueCache[j]=x.Normalizations.registered[j]?x.Normalizations.registered[j]("extract",null,L[1]):L[1]),"transform"===L[0]&&(T=!0)}}c.mobileHA&&s(S).transformCache.translate3d===r&&(s(S).transformCache.translate3d="(0px, 0px, 0px)",T=!0),T&&x.flushTransformCache(S)}}c.display!==r&&"none"!==c.display&&(b.State.calls[o][2].display=!1),c.visibility!==r&&"hidden"!==c.visibility&&(b.State.calls[o][2].visibility=!1),c.progress&&c.progress.call(a[1],a[1],v,Math.max(0,f+c.duration-t),f,m),1===v&&d(o)}}b.State.isTicking&&k(u)}function d(e,t){if(!b.State.calls[e])return!1;for(var n=b.State.calls[e][0],i=b.State.calls[e][1],o=b.State.calls[e][2],a=b.State.calls[e][4],l=!1,c=0,u=n.length;u>c;c++){var d=n[c].element;if(t||o.loop||("none"===o.display&&x.setPropertyValue(d,"display",o.display),"hidden"===o.visibility&&x.setPropertyValue(d,"visibility",o.visibility)),o.loop!==!0&&(p.queue(d)[1]===r||!/\.velocityQueueEntryFlag/i.test(p.queue(d)[1]))&&s(d)){s(d).isAnimating=!1,s(d).rootPropertyValueCache={};var f=!1;p.each(x.Lists.transforms3D,function(e,t){var n=/^scale/.test(t)?1:0,i=s(d).transformCache[t];s(d).transformCache[t]!==r&&new RegExp("^\\("+n+"[^.]").test(i)&&(f=!0,delete s(d).transformCache[t])}),o.mobileHA&&(f=!0,delete s(d).transformCache.translate3d),f&&x.flushTransformCache(d),x.Values.removeClass(d,"velocity-animating")}if(!t&&o.complete&&!o.loop&&c===u-1)try{o.complete.call(i,i)}catch(h){setTimeout(function(){throw h},1)}a&&o.loop!==!0&&a(i),s(d)&&o.loop===!0&&!t&&(p.each(s(d).tweensContainer,function(e,t){/^rotate/.test(e)&&360===parseFloat(t.endValue)&&(t.endValue=0,t.startValue=360),/^backgroundPosition/.test(e)&&100===parseFloat(t.endValue)&&"%"===t.unitType&&(t.endValue=0,t.startValue=100)}),b(d,"reverse",{loop:!0,delay:o.delay})),o.queue!==!1&&p.dequeue(d,o.queue)}b.State.calls[e]=!1;for(var g=0,m=b.State.calls.length;m>g;g++)if(b.State.calls[g]!==!1){l=!0;break}l===!1&&(b.State.isTicking=!1,delete b.State.calls,b.State.calls=[])}var p,f=function(){if(n.documentMode)return n.documentMode;for(var e=7;e>4;e--){var t=n.createElement("div");if(t.innerHTML="<!--[if IE "+e+"]><span></span><![endif]-->",t.getElementsByTagName("span").length)return t=null,e}return r}(),h=function(){var e=0;return t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(t){var n,r=(new Date).getTime();return n=Math.max(0,16-(r-e)),e=r+n,setTimeout(function(){t(r+n)},n)}}(),g={isString:function(e){return"string"==typeof e},isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)},isNode:function(e){return e&&e.nodeType},isNodeList:function(e){return"object"==typeof e&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e))&&e.length!==r&&(0===e.length||"object"==typeof e[0]&&e[0].nodeType>0)},isWrapped:function(e){return e&&(e.jquery||t.Zepto&&t.Zepto.zepto.isZ(e))},isSVG:function(e){return t.SVGElement&&e instanceof t.SVGElement},isEmptyObject:function(e){for(var t in e)return!1;return!0}},m=!1;if(e.fn&&e.fn.jquery?(p=e,m=!0):p=t.Velocity.Utilities,8>=f&&!m)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=f)return void(jQuery.fn.velocity=jQuery.fn.animate);var v=400,y="swing",b={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:t.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:n.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:p,Redirects:{},Easings:{},Promise:t.Promise,defaults:{queue:"",duration:v,easing:y,begin:r,complete:r,progress:r,display:r,visibility:r,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(e){p.data(e,"velocity",{isSVG:g.isSVG(e),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};t.pageYOffset!==r?(b.State.scrollAnchor=t,b.State.scrollPropertyLeft="pageXOffset",b.State.scrollPropertyTop="pageYOffset"):(b.State.scrollAnchor=n.documentElement||n.body.parentNode||n.body,b.State.scrollPropertyLeft="scrollLeft",b.State.scrollPropertyTop="scrollTop");var w=function(){function e(e){return-e.tension*e.x-e.friction*e.v}function t(t,n,r){var i={x:t.x+r.dx*n,v:t.v+r.dv*n,tension:t.tension,friction:t.friction};return{dx:i.v,dv:e(i)}}function n(n,r){var i={dx:n.v,dv:e(n)},o=t(n,.5*r,i),s=t(n,.5*r,o),a=t(n,r,s),l=1/6*(i.dx+2*(o.dx+s.dx)+a.dx),c=1/6*(i.dv+2*(o.dv+s.dv)+a.dv);return n.x=n.x+l*r,n.v=n.v+c*r,n}return function r(e,t,i){var o,s,a,l={x:-1,v:0,tension:null,friction:null},c=[0],u=0,d=1e-4,p=.016;for(e=parseFloat(e)||500,t=parseFloat(t)||20,i=i||null,l.tension=e,l.friction=t,o=null!==i,o?(u=r(e,t),s=u/i*p):s=p;;)if(a=n(a||l,s),c.push(1+a.x),u+=16,!(Math.abs(a.x)>d&&Math.abs(a.v)>d))break;return o?function(e){return c[e*(c.length-1)|0]}:u}}();b.Easings={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},spring:function(e){return 1-Math.cos(4.5*e*Math.PI)*Math.exp(6*-e)}},p.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(e,t){b.Easings[t[0]]=l.apply(null,t[1])});var x=b.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var e=0;e<x.Lists.colors.length;e++){var t="color"===x.Lists.colors[e]?"0 0 0 1":"255 255 255 1";x.Hooks.templates[x.Lists.colors[e]]=["Red Green Blue Alpha",t]}var n,r,i;if(f)for(n in x.Hooks.templates){r=x.Hooks.templates[n],i=r[0].split(" ");var o=r[1].match(x.RegEx.valueSplit);"Color"===i[0]&&(i.push(i.shift()),o.push(o.shift()),x.Hooks.templates[n]=[i.join(" "),o.join(" ")])}for(n in x.Hooks.templates){r=x.Hooks.templates[n],i=r[0].split(" ");for(var e in i){var s=n+i[e],a=e;x.Hooks.registered[s]=[n,a]}}},getRoot:function(e){var t=x.Hooks.registered[e];return t?t[0]:e},cleanRootPropertyValue:function(e,t){return x.RegEx.valueUnwrap.test(t)&&(t=t.match(x.RegEx.valueUnwrap)[1]),x.Values.isCSSNullValue(t)&&(t=x.Hooks.templates[e][1]),t},extractValue:function(e,t){var n=x.Hooks.registered[e];if(n){var r=n[0],i=n[1];return t=x.Hooks.cleanRootPropertyValue(r,t),t.toString().match(x.RegEx.valueSplit)[i]}return t},injectValue:function(e,t,n){var r=x.Hooks.registered[e];if(r){var i,o,s=r[0],a=r[1];return n=x.Hooks.cleanRootPropertyValue(s,n),i=n.toString().match(x.RegEx.valueSplit),i[a]=t,o=i.join(" ")}return n}},Normalizations:{registered:{clip:function(e,t,n){switch(e){case"name":return"clip";case"extract":var r;return x.RegEx.wrappedValueAlreadyExtracted.test(n)?r=n:(r=n.toString().match(x.RegEx.valueUnwrap),r=r?r[1].replace(/,(\s+)?/g," "):n),r;case"inject":return"rect("+n+")"}},blur:function(e,t,n){switch(e){case"name":return b.State.isFirefox?"filter":"-webkit-filter";case"extract":var r=parseFloat(n);if(!r&&0!==r){var i=n.toString().match(/blur\(([0-9]+[A-z]+)\)/i);r=i?i[1]:0}return r;case"inject":return parseFloat(n)?"blur("+n+")":"none"}},opacity:function(e,t,n){if(8>=f)switch(e){case"name":return"filter";case"extract":var r=n.toString().match(/alpha\(opacity=(.*)\)/i);return n=r?r[1]/100:1;case"inject":return t.style.zoom=1,parseFloat(n)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(n),10)+")"}else switch(e){case"name":return"opacity";case"extract":return n;case"inject":return n}}},register:function(){9>=f||b.State.isGingerbread||(x.Lists.transformsBase=x.Lists.transformsBase.concat(x.Lists.transforms3D));for(var e=0;e<x.Lists.transformsBase.length;e++)!function(){var t=x.Lists.transformsBase[e];x.Normalizations.registered[t]=function(e,n,i){switch(e){case"name":return"transform";case"extract":return s(n)===r||s(n).transformCache[t]===r?/^scale/i.test(t)?1:0:s(n).transformCache[t].replace(/[()]/g,"");case"inject":var o=!1;switch(t.substr(0,t.length-1)){case"translate":o=!/(%|px|em|rem|vw|vh|\d)$/i.test(i);break;case"scal":case"scale":b.State.isAndroid&&s(n).transformCache[t]===r&&1>i&&(i=1),o=!/(\d)$/i.test(i);break;case"skew":o=!/(deg|\d)$/i.test(i);break;case"rotate":o=!/(deg|\d)$/i.test(i)}return o||(s(n).transformCache[t]="("+i+")"),s(n).transformCache[t]}}}();for(var e=0;e<x.Lists.colors.length;e++)!function(){var t=x.Lists.colors[e];x.Normalizations.registered[t]=function(e,n,i){switch(e){case"name":return t;case"extract":var o;if(x.RegEx.wrappedValueAlreadyExtracted.test(i))o=i;else{var s,a={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(i)?s=a[i]!==r?a[i]:a.black:x.RegEx.isHex.test(i)?s="rgb("+x.Values.hexToRgb(i).join(" ")+")":/^rgba?\(/i.test(i)||(s=a.black),o=(s||i).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=f||3!==o.split(" ").length||(o+=" 1"),o;case"inject":return 8>=f?4===i.split(" ").length&&(i=i.split(/\s+/).slice(0,3).join(" ")):3===i.split(" ").length&&(i+=" 1"),(8>=f?"rgb":"rgba")+"("+i.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})},SVGAttribute:function(e){var t="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(f||b.State.isAndroid&&!b.State.isChrome)&&(t+="|transform"),new RegExp("^("+t+")$","i").test(e)},prefixCheck:function(e){if(b.State.prefixMatches[e])return[b.State.prefixMatches[e],!0];for(var t=["","Webkit","Moz","ms","O"],n=0,r=t.length;r>n;n++){var i;if(i=0===n?e:t[n]+e.replace(/^\w/,function(e){return e.toUpperCase()}),g.isString(b.State.prefixElement.style[i]))return b.State.prefixMatches[e]=i,[i,!0]}return[e,!1]}},Values:{hexToRgb:function(e){var t,n=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return e=e.replace(n,function(e,t,n,r){return t+t+n+n+r+r}),t=r.exec(e),t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:[0,0,0]},isCSSNullValue:function(e){return 0==e||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)},getUnitType:function(e){return/^(rotate|skew)/i.test(e)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e)?"":"px"},getDisplayType:function(e){var t=e&&e.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t)?"inline":/^(li)$/i.test(t)?"list-item":/^(tr)$/i.test(t)?"table-row":/^(table)$/i.test(t)?"table":/^(tbody)$/i.test(t)?"table-row-group":"block"},addClass:function(e,t){e.classList?e.classList.add(t):e.className+=(e.className.length?" ":"")+t},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.toString().replace(new RegExp("(^|\\s)"+t.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(e,n,i,o){function a(e,n){function i(){c&&x.setPropertyValue(e,"display","none")}var l=0;if(8>=f)l=p.css(e,n);else{var c=!1;if(/^(width|height)$/.test(n)&&0===x.getPropertyValue(e,"display")&&(c=!0,x.setPropertyValue(e,"display",x.Values.getDisplayType(e))),!o){if("height"===n&&"border-box"!==x.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var u=e.offsetHeight-(parseFloat(x.getPropertyValue(e,"borderTopWidth"))||0)-(parseFloat(x.getPropertyValue(e,"borderBottomWidth"))||0)-(parseFloat(x.getPropertyValue(e,"paddingTop"))||0)-(parseFloat(x.getPropertyValue(e,"paddingBottom"))||0);return i(),u}if("width"===n&&"border-box"!==x.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var d=e.offsetWidth-(parseFloat(x.getPropertyValue(e,"borderLeftWidth"))||0)-(parseFloat(x.getPropertyValue(e,"borderRightWidth"))||0)-(parseFloat(x.getPropertyValue(e,"paddingLeft"))||0)-(parseFloat(x.getPropertyValue(e,"paddingRight"))||0);return i(),d}}var h;h=s(e)===r?t.getComputedStyle(e,null):s(e).computedStyle?s(e).computedStyle:s(e).computedStyle=t.getComputedStyle(e,null),"borderColor"===n&&(n="borderTopColor"),l=9===f&&"filter"===n?h.getPropertyValue(n):h[n],(""===l||null===l)&&(l=e.style[n]),i()}if("auto"===l&&/^(top|right|bottom|left)$/i.test(n)){var g=a(e,"position");("fixed"===g||"absolute"===g&&/top|left/i.test(n))&&(l=p(e).position()[n]+"px")}return l}var l;if(x.Hooks.registered[n]){var c=n,u=x.Hooks.getRoot(c);i===r&&(i=x.getPropertyValue(e,x.Names.prefixCheck(u)[0])),x.Normalizations.registered[u]&&(i=x.Normalizations.registered[u]("extract",e,i)),l=x.Hooks.extractValue(c,i)}else if(x.Normalizations.registered[n]){var d,h;d=x.Normalizations.registered[n]("name",e),"transform"!==d&&(h=a(e,x.Names.prefixCheck(d)[0]),x.Values.isCSSNullValue(h)&&x.Hooks.templates[n]&&(h=x.Hooks.templates[n][1])),l=x.Normalizations.registered[n]("extract",e,h)}if(!/^[\d-]/.test(l))if(s(e)&&s(e).isSVG&&x.Names.SVGAttribute(n))if(/^(height|width)$/i.test(n))try{l=e.getBBox()[n]}catch(g){l=0}else l=e.getAttribute(n);else l=a(e,x.Names.prefixCheck(n)[0]);return x.Values.isCSSNullValue(l)&&(l=0),b.debug>=2&&console.log("Get "+n+": "+l),l},setPropertyValue:function(e,n,r,i,o){var a=n;if("scroll"===n)o.container?o.container["scroll"+o.direction]=r:"Left"===o.direction?t.scrollTo(r,o.alternateValue):t.scrollTo(o.alternateValue,r);else if(x.Normalizations.registered[n]&&"transform"===x.Normalizations.registered[n]("name",e))x.Normalizations.registered[n]("inject",e,r),a="transform",r=s(e).transformCache[n];else{if(x.Hooks.registered[n]){var l=n,c=x.Hooks.getRoot(n);i=i||x.getPropertyValue(e,c),r=x.Hooks.injectValue(l,r,i),n=c}if(x.Normalizations.registered[n]&&(r=x.Normalizations.registered[n]("inject",e,r),n=x.Normalizations.registered[n]("name",e)),a=x.Names.prefixCheck(n)[0],8>=f)try{e.style[a]=r}catch(u){b.debug&&console.log("Browser does not support ["+r+"] for ["+a+"]")}else s(e)&&s(e).isSVG&&x.Names.SVGAttribute(n)?e.setAttribute(n,r):e.style[a]=r;b.debug>=2&&console.log("Set "+n+" ("+a+"): "+r)}return[a,r]},flushTransformCache:function(e){function t(t){return parseFloat(x.getPropertyValue(e,t))}var n="";if((f||b.State.isAndroid&&!b.State.isChrome)&&s(e).isSVG){var r={translate:[t("translateX"),t("translateY")],skewX:[t("skewX")],skewY:[t("skewY")],scale:1!==t("scale")?[t("scale"),t("scale")]:[t("scaleX"),t("scaleY")],rotate:[t("rotateZ"),0,0]};p.each(s(e).transformCache,function(e){/^translate/i.test(e)?e="translate":/^scale/i.test(e)?e="scale":/^rotate/i.test(e)&&(e="rotate"),r[e]&&(n+=e+"("+r[e].join(" ")+") ",delete r[e])})}else{var i,o;p.each(s(e).transformCache,function(t){return i=s(e).transformCache[t],"transformPerspective"===t?(o=i,!0):(9===f&&"rotateZ"===t&&(t="rotate"),void(n+=t+i+" "))}),o&&(n="perspective"+o+" "+n)}x.setPropertyValue(e,"transform",n)}};x.Hooks.register(),x.Normalizations.register(),b.hook=function(e,t,n){var i=r;return e=o(e),p.each(e,function(e,o){if(s(o)===r&&b.init(o),n===r)i===r&&(i=b.CSS.getPropertyValue(o,t));else{var a=b.CSS.setPropertyValue(o,t,n);"transform"===a[0]&&b.CSS.flushTransformCache(o),i=a}}),i};var C=function(){function e(){return a?O.promise||null:l}function i(){function e(e){function d(e,t){var n=r,i=r,s=r;return g.isArray(e)?(n=e[0],!g.isArray(e[1])&&/^[\d-]/.test(e[1])||g.isFunction(e[1])||x.RegEx.isHex.test(e[1])?s=e[1]:(g.isString(e[1])&&!x.RegEx.isHex.test(e[1])||g.isArray(e[1]))&&(i=t?e[1]:c(e[1],a.duration),e[2]!==r&&(s=e[2]))):n=e,t||(i=i||a.easing),g.isFunction(n)&&(n=n.call(o,S,k)),g.isFunction(s)&&(s=s.call(o,S,k)),[n||0,i,s]}function f(e,t){var n,r;return r=(t||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(e){return n=e,""}),n||(n=x.Values.getUnitType(e)),[r,n]}function v(){var e={myParent:o.parentNode||n.body,position:x.getPropertyValue(o,"position"),fontSize:x.getPropertyValue(o,"fontSize")},r=e.position===L.lastPosition&&e.myParent===L.lastParent,i=e.fontSize===L.lastFontSize;L.lastParent=e.myParent,L.lastPosition=e.position,L.lastFontSize=e.fontSize;var a=100,l={};if(i&&r)l.emToPx=L.lastEmToPx,l.percentToPxWidth=L.lastPercentToPxWidth,l.percentToPxHeight=L.lastPercentToPxHeight;else{var c=s(o).isSVG?n.createElementNS("http://www.w3.org/2000/svg","rect"):n.createElement("div");b.init(c),e.myParent.appendChild(c),p.each(["overflow","overflowX","overflowY"],function(e,t){b.CSS.setPropertyValue(c,t,"hidden")}),b.CSS.setPropertyValue(c,"position",e.position),b.CSS.setPropertyValue(c,"fontSize",e.fontSize),b.CSS.setPropertyValue(c,"boxSizing","content-box"),p.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(e,t){b.CSS.setPropertyValue(c,t,a+"%")}),b.CSS.setPropertyValue(c,"paddingLeft",a+"em"),l.percentToPxWidth=L.lastPercentToPxWidth=(parseFloat(x.getPropertyValue(c,"width",null,!0))||1)/a,l.percentToPxHeight=L.lastPercentToPxHeight=(parseFloat(x.getPropertyValue(c,"height",null,!0))||1)/a,l.emToPx=L.lastEmToPx=(parseFloat(x.getPropertyValue(c,"paddingLeft"))||1)/a,e.myParent.removeChild(c)}return null===L.remToPx&&(L.remToPx=parseFloat(x.getPropertyValue(n.body,"fontSize"))||16),null===L.vwToPx&&(L.vwToPx=parseFloat(t.innerWidth)/100,L.vhToPx=parseFloat(t.innerHeight)/100),l.remToPx=L.remToPx,l.vwToPx=L.vwToPx,l.vhToPx=L.vhToPx,b.debug>=1&&console.log("Unit ratios: "+JSON.stringify(l),o),l}if(a.begin&&0===S)try{a.begin.call(h,h)}catch(w){setTimeout(function(){throw w},1)}if("scroll"===P){var C,T,E,A=/^x$/i.test(a.axis)?"Left":"Top",D=parseFloat(a.offset)||0;a.container?g.isWrapped(a.container)||g.isNode(a.container)?(a.container=a.container[0]||a.container,C=a.container["scroll"+A],E=C+p(o).position()[A.toLowerCase()]+D):a.container=null:(C=b.State.scrollAnchor[b.State["scrollProperty"+A]],T=b.State.scrollAnchor[b.State["scrollProperty"+("Left"===A?"Top":"Left")]],E=p(o).offset()[A.toLowerCase()]+D),l={scroll:{rootPropertyValue:!1,startValue:C,currentValue:C,endValue:E,unitType:"",easing:a.easing,scrollData:{container:a.container,direction:A,alternateValue:T}},element:o},b.debug&&console.log("tweensContainer (scroll): ",l.scroll,o)}else if("reverse"===P){if(!s(o).tweensContainer)return void p.dequeue(o,a.queue);"none"===s(o).opts.display&&(s(o).opts.display="auto"),"hidden"===s(o).opts.visibility&&(s(o).opts.visibility="visible"),s(o).opts.loop=!1,s(o).opts.begin=null,s(o).opts.complete=null,y.easing||delete a.easing,y.duration||delete a.duration,a=p.extend({},s(o).opts,a);var N=p.extend(!0,{},s(o).tweensContainer);for(var j in N)if("element"!==j){var I=N[j].startValue;N[j].startValue=N[j].currentValue=N[j].endValue,N[j].endValue=I,g.isEmptyObject(y)||(N[j].easing=a.easing),b.debug&&console.log("reverse tweensContainer ("+j+"): "+JSON.stringify(N[j]),o)}l=N}else if("start"===P){var N;s(o).tweensContainer&&s(o).isAnimating===!0&&(N=s(o).tweensContainer),p.each(m,function(e,t){if(RegExp("^"+x.Lists.colors.join("$|^")+"$").test(e)){var n=d(t,!0),i=n[0],o=n[1],s=n[2];if(x.RegEx.isHex.test(i)){for(var a=["Red","Green","Blue"],l=x.Values.hexToRgb(i),c=s?x.Values.hexToRgb(s):r,u=0;u<a.length;u++){var p=[l[u]];o&&p.push(o),c!==r&&p.push(c[u]),m[e+a[u]]=p}delete m[e]}}});for(var F in m){var _=d(m[F]),H=_[0],z=_[1],q=_[2];F=x.Names.camelCase(F);var V=x.Hooks.getRoot(F),M=!1;if(s(o).isSVG||"tween"===V||x.Names.prefixCheck(V)[1]!==!1||x.Normalizations.registered[V]!==r){(a.display!==r&&null!==a.display&&"none"!==a.display||a.visibility!==r&&"hidden"!==a.visibility)&&/opacity|filter/.test(F)&&!q&&0!==H&&(q=0),a._cacheValues&&N&&N[F]?(q===r&&(q=N[F].endValue+N[F].unitType),M=s(o).rootPropertyValueCache[V]):x.Hooks.registered[F]?q===r?(M=x.getPropertyValue(o,V),q=x.getPropertyValue(o,F,M)):M=x.Hooks.templates[V][1]:q===r&&(q=x.getPropertyValue(o,F));var R,X,W,Y=!1;if(R=f(F,q),q=R[0],W=R[1],R=f(F,H),H=R[0].replace(/^([+-\/*])=/,function(e,t){return Y=t,""}),X=R[1],q=parseFloat(q)||0,H=parseFloat(H)||0,"%"===X&&(/^(fontSize|lineHeight)$/.test(F)?(H/=100,X="em"):/^scale/.test(F)?(H/=100,X=""):/(Red|Green|Blue)$/i.test(F)&&(H=H/100*255,X="")),/[\/*]/.test(Y))X=W;else if(W!==X&&0!==q)if(0===H)X=W;else{i=i||v();var B=/margin|padding|left|right|width|text|word|letter/i.test(F)||/X$/.test(F)||"x"===F?"x":"y";switch(W){case"%":q*="x"===B?i.percentToPxWidth:i.percentToPxHeight;break;case"px":break;default:q*=i[W+"ToPx"]}switch(X){case"%":q*=1/("x"===B?i.percentToPxWidth:i.percentToPxHeight);break;case"px":break;default:q*=1/i[X+"ToPx"]}}switch(Y){case"+":H=q+H;break;case"-":H=q-H;break;case"*":H=q*H;break;case"/":H=q/H}l[F]={rootPropertyValue:M,startValue:q,currentValue:q,endValue:H,unitType:X,easing:z},b.debug&&console.log("tweensContainer ("+F+"): "+JSON.stringify(l[F]),o)}else b.debug&&console.log("Skipping ["+V+"] due to a lack of browser support.")}l.element=o}l.element&&(x.Values.addClass(o,"velocity-animating"),$.push(l),""===a.queue&&(s(o).tweensContainer=l,s(o).opts=a),s(o).isAnimating=!0,S===k-1?(b.State.calls.push([$,h,a,null,O.resolver]),b.State.isTicking===!1&&(b.State.isTicking=!0,u())):S++)}var i,o=this,a=p.extend({},b.defaults,y),l={};switch(s(o)===r&&b.init(o),parseFloat(a.delay)&&a.queue!==!1&&p.queue(o,a.queue,function(e){b.velocityQueueEntryFlag=!0,s(o).delayTimer={setTimeout:setTimeout(e,parseFloat(a.delay)),next:e}}),a.duration.toString().toLowerCase()){case"fast":a.duration=200;break;case"normal":a.duration=v;break;case"slow":a.duration=600;break;default:a.duration=parseFloat(a.duration)||1}b.mock!==!1&&(b.mock===!0?a.duration=a.delay=1:(a.duration*=parseFloat(b.mock)||1,a.delay*=parseFloat(b.mock)||1)),a.easing=c(a.easing,a.duration),a.begin&&!g.isFunction(a.begin)&&(a.begin=null),a.progress&&!g.isFunction(a.progress)&&(a.progress=null),a.complete&&!g.isFunction(a.complete)&&(a.complete=null),a.display!==r&&null!==a.display&&(a.display=a.display.toString().toLowerCase(),"auto"===a.display&&(a.display=b.CSS.Values.getDisplayType(o))),a.visibility!==r&&null!==a.visibility&&(a.visibility=a.visibility.toString().toLowerCase()),a.mobileHA=a.mobileHA&&b.State.isMobile&&!b.State.isGingerbread,a.queue===!1?a.delay?setTimeout(e,a.delay):e():p.queue(o,a.queue,function(t,n){return n===!0?(O.promise&&O.resolver(h),!0):(b.velocityQueueEntryFlag=!0,void e(t))}),""!==a.queue&&"fx"!==a.queue||"inprogress"===p.queue(o)[0]||p.dequeue(o)}var a,l,f,h,m,y,w=arguments[0]&&(arguments[0].p||p.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||g.isString(arguments[0].properties));if(g.isWrapped(this)?(a=!1,f=0,h=this,l=this):(a=!0,f=1,h=w?arguments[0].elements||arguments[0].e:arguments[0]),h=o(h)){w?(m=arguments[0].properties||arguments[0].p,y=arguments[0].options||arguments[0].o):(m=arguments[f],y=arguments[f+1]);var k=h.length,S=0;if(!/^(stop|finish)$/i.test(m)&&!p.isPlainObject(y)){var T=f+1;y={};for(var E=T;E<arguments.length;E++)g.isArray(arguments[E])||!/^(fast|normal|slow)$/i.test(arguments[E])&&!/^\d/.test(arguments[E])?g.isString(arguments[E])||g.isArray(arguments[E])?y.easing=arguments[E]:g.isFunction(arguments[E])&&(y.complete=arguments[E]):y.duration=arguments[E]}var O={promise:null,resolver:null,rejecter:null};a&&b.Promise&&(O.promise=new b.Promise(function(e,t){O.resolver=e,O.rejecter=t}));var P;switch(m){case"scroll":P="scroll";break;case"reverse":P="reverse";break;case"finish":case"stop":p.each(h,function(e,t){s(t)&&s(t).delayTimer&&(clearTimeout(s(t).delayTimer.setTimeout),s(t).delayTimer.next&&s(t).delayTimer.next(),delete s(t).delayTimer)});var A=[];return p.each(b.State.calls,function(e,t){t&&p.each(t[1],function(n,i){var o=y===r?"":y;return o===!0||t[2].queue===o||y===r&&t[2].queue===!1?void p.each(h,function(n,r){r===i&&((y===!0||g.isString(y))&&(p.each(p.queue(r,g.isString(y)?y:""),function(e,t){g.isFunction(t)&&t(null,!0)}),p.queue(r,g.isString(y)?y:"",[])),"stop"===m?(s(r)&&s(r).tweensContainer&&o!==!1&&p.each(s(r).tweensContainer,function(e,t){t.endValue=t.currentValue}),A.push(e)):"finish"===m&&(t[2].duration=1))}):!0})}),"stop"===m&&(p.each(A,function(e,t){d(t,!0)}),O.promise&&O.resolver(h)),e();default:if(!p.isPlainObject(m)||g.isEmptyObject(m)){if(g.isString(m)&&b.Redirects[m]){var D=p.extend({},y),N=D.duration,j=D.delay||0;return D.backwards===!0&&(h=p.extend(!0,[],h).reverse()),p.each(h,function(e,t){parseFloat(D.stagger)?D.delay=j+parseFloat(D.stagger)*e:g.isFunction(D.stagger)&&(D.delay=j+D.stagger.call(t,e,k)),D.drag&&(D.duration=parseFloat(N)||(/^(callout|transition)/.test(m)?1e3:v),D.duration=Math.max(D.duration*(D.backwards?1-e/k:(e+1)/k),.75*D.duration,200)),b.Redirects[m].call(t,t,D||{},e,k,h,O.promise?O:r)}),e()}var I="Velocity: First argument ("+m+") was not a property map, a known action, or a registered redirect. Aborting.";return O.promise?O.rejecter(new Error(I)):console.log(I),e()}P="start"}var L={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},$=[];p.each(h,function(e,t){g.isNode(t)&&i.call(t)});var F,D=p.extend({},b.defaults,y);if(D.loop=parseInt(D.loop),F=2*D.loop-1,D.loop)for(var _=0;F>_;_++){var H={delay:D.delay,progress:D.progress};_===F-1&&(H.display=D.display,H.visibility=D.visibility,H.complete=D.complete),C(h,"reverse",H)}return e()}};b=p.extend(C,b),b.animate=C;

var k=t.requestAnimationFrame||h;return b.State.isMobile||n.hidden===r||n.addEventListener("visibilitychange",function(){n.hidden?(k=function(e){return setTimeout(function(){e(!0)},16)},u()):k=t.requestAnimationFrame||h}),e.Velocity=b,e!==t&&(e.fn.velocity=C,e.fn.velocity.defaults=b.defaults),p.each(["Down","Up"],function(e,t){b.Redirects["slide"+t]=function(e,n,i,o,s,a){var l=p.extend({},n),c=l.begin,u=l.complete,d={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},f={};l.display===r&&(l.display="Down"===t?"inline"===b.CSS.Values.getDisplayType(e)?"inline-block":"block":"none"),l.begin=function(){c&&c.call(s,s);for(var n in d){f[n]=e.style[n];var r=b.CSS.getPropertyValue(e,n);d[n]="Down"===t?[r,0]:[0,r]}f.overflow=e.style.overflow,e.style.overflow="hidden"},l.complete=function(){for(var t in f)e.style[t]=f[t];u&&u.call(s,s),a&&a.resolver(s)},b(e,d,l)}}),p.each(["In","Out"],function(e,t){b.Redirects["fade"+t]=function(e,n,i,o,s,a){var l=p.extend({},n),c={opacity:"In"===t?1:0},u=l.complete;l.complete=i!==o-1?l.begin=null:function(){u&&u.call(s,s),a&&a.resolver(s)},l.display===r&&(l.display="In"===t?"auto":"none"),b(this,c,l)}}),b}(window.jQuery||window.Zepto||window,window,document)}),function(e){"function"==typeof require&&"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(["velocity"],e):e()}(function(){return function(e,t,n,r){function i(e,t){var n=[];return e&&t?(s.each([e,t],function(e,t){var r=[];s.each(t,function(e,t){for(;t.toString().length<5;)t="0"+t;r.push(t)}),n.push(r.join(""))}),parseFloat(n[0])>parseFloat(n[1])):!1}if(!e.Velocity||!e.Velocity.Utilities)return void(t.console&&console.log("Velocity UI Pack: Velocity must be loaded first. Aborting."));var o=e.Velocity,s=o.Utilities,a=o.version,l={major:1,minor:1,patch:0};if(i(l,a)){var c="Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";throw alert(c),new Error(c)}o.RegisterEffect=o.RegisterUI=function(e,t){function n(e,t,n,r){var i,a=0;s.each(e.nodeType?[e]:e,function(e,t){r&&(n+=e*r),i=t.parentNode,s.each(["height","paddingTop","paddingBottom","marginTop","marginBottom"],function(e,n){a+=parseFloat(o.CSS.getPropertyValue(t,n))})}),o.animate(i,{height:("In"===t?"+":"-")+"="+a},{queue:!1,easing:"ease-in-out",duration:n*("In"===t?.6:1)})}return o.Redirects[e]=function(i,a,l,c,u,d){function p(){a.display!==r&&"none"!==a.display||!/Out$/.test(e)||s.each(u.nodeType?[u]:u,function(e,t){o.CSS.setPropertyValue(t,"display","none")}),a.complete&&a.complete.call(u,u),d&&d.resolver(u||i)}var f=l===c-1;t.defaultDuration="function"==typeof t.defaultDuration?t.defaultDuration.call(u,u):parseFloat(t.defaultDuration);for(var h=0;h<t.calls.length;h++){var g=t.calls[h],m=g[0],v=a.duration||t.defaultDuration||1e3,y=g[1],b=g[2]||{},w={};if(w.duration=v*(y||1),w.queue=a.queue||"",w.easing=b.easing||"ease",w.delay=parseFloat(b.delay)||0,w._cacheValues=b._cacheValues||!0,0===h){if(w.delay+=parseFloat(a.delay)||0,0===l&&(w.begin=function(){a.begin&&a.begin.call(u,u);var t=e.match(/(In|Out)$/);t&&"In"===t[0]&&m.opacity!==r&&s.each(u.nodeType?[u]:u,function(e,t){o.CSS.setPropertyValue(t,"opacity",0)}),a.animateParentHeight&&t&&n(u,t[0],v+w.delay,a.stagger)}),null!==a.display)if(a.display!==r&&"none"!==a.display)w.display=a.display;else if(/In$/.test(e)){var x=o.CSS.Values.getDisplayType(i);w.display="inline"===x?"inline-block":x}a.visibility&&"hidden"!==a.visibility&&(w.visibility=a.visibility)}h===t.calls.length-1&&(w.complete=function(){if(t.reset){for(var e in t.reset){var n=t.reset[e];o.CSS.Hooks.registered[e]!==r||"string"!=typeof n&&"number"!=typeof n||(t.reset[e]=[t.reset[e],t.reset[e]])}var s={duration:0,queue:!1};f&&(s.complete=p),o.animate(i,t.reset,s)}else f&&p()},"hidden"===a.visibility&&(w.visibility=a.visibility)),o.animate(i,m,w)}},o},o.RegisterEffect.packagedEffects={"callout.bounce":{defaultDuration:550,calls:[[{translateY:-30},.25],[{translateY:0},.125],[{translateY:-15},.125],[{translateY:0},.25]]},"callout.shake":{defaultDuration:800,calls:[[{translateX:-11},.125],[{translateX:11},.125],[{translateX:-11},.125],[{translateX:11},.125],[{translateX:-11},.125],[{translateX:11},.125],[{translateX:-11},.125],[{translateX:0},.125]]},"callout.flash":{defaultDuration:1100,calls:[[{opacity:[0,"easeInOutQuad",1]},.25],[{opacity:[1,"easeInOutQuad"]},.25],[{opacity:[0,"easeInOutQuad"]},.25],[{opacity:[1,"easeInOutQuad"]},.25]]},"callout.pulse":{defaultDuration:825,calls:[[{scaleX:1.1,scaleY:1.1},.5,{easing:"easeInExpo"}],[{scaleX:1,scaleY:1},.5]]},"callout.swing":{defaultDuration:950,calls:[[{rotateZ:15},.2],[{rotateZ:-10},.2],[{rotateZ:5},.2],[{rotateZ:-5},.2],[{rotateZ:0},.2]]},"callout.tada":{defaultDuration:1e3,calls:[[{scaleX:.9,scaleY:.9,rotateZ:-3},.1],[{scaleX:1.1,scaleY:1.1,rotateZ:3},.1],[{scaleX:1.1,scaleY:1.1,rotateZ:-3},.1],["reverse",.125],["reverse",.125],["reverse",.125],["reverse",.125],["reverse",.125],[{scaleX:1,scaleY:1,rotateZ:0},.2]]},"transition.fadeIn":{defaultDuration:500,calls:[[{opacity:[1,0]}]]},"transition.fadeOut":{defaultDuration:500,calls:[[{opacity:[0,1]}]]},"transition.flipXIn":{defaultDuration:700,calls:[[{opacity:[1,0],transformPerspective:[800,800],rotateY:[0,-55]}]],reset:{transformPerspective:0}},"transition.flipXOut":{defaultDuration:700,calls:[[{opacity:[0,1],transformPerspective:[800,800],rotateY:55}]],reset:{transformPerspective:0,rotateY:0}},"transition.flipYIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],rotateX:[0,-45]}]],reset:{transformPerspective:0}},"transition.flipYOut":{defaultDuration:800,calls:[[{opacity:[0,1],transformPerspective:[800,800],rotateX:25}]],reset:{transformPerspective:0,rotateX:0}},"transition.flipBounceXIn":{defaultDuration:900,calls:[[{opacity:[.725,0],transformPerspective:[400,400],rotateY:[-10,90]},.5],[{opacity:.8,rotateY:10},.25],[{opacity:1,rotateY:0},.25]],reset:{transformPerspective:0}},"transition.flipBounceXOut":{defaultDuration:800,calls:[[{opacity:[.9,1],transformPerspective:[400,400],rotateY:-10},.5],[{opacity:0,rotateY:90},.5]],reset:{transformPerspective:0,rotateY:0}},"transition.flipBounceYIn":{defaultDuration:850,calls:[[{opacity:[.725,0],transformPerspective:[400,400],rotateX:[-10,90]},.5],[{opacity:.8,rotateX:10},.25],[{opacity:1,rotateX:0},.25]],reset:{transformPerspective:0}},"transition.flipBounceYOut":{defaultDuration:800,calls:[[{opacity:[.9,1],transformPerspective:[400,400],rotateX:-15},.5],[{opacity:0,rotateX:90},.5]],reset:{transformPerspective:0,rotateX:0}},"transition.swoopIn":{defaultDuration:850,calls:[[{opacity:[1,0],transformOriginX:["100%","50%"],transformOriginY:["100%","100%"],scaleX:[1,0],scaleY:[1,0],translateX:[0,-700],translateZ:0}]],reset:{transformOriginX:"50%",transformOriginY:"50%"}},"transition.swoopOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformOriginX:["50%","100%"],transformOriginY:["100%","100%"],scaleX:0,scaleY:0,translateX:-700,translateZ:0}]],reset:{transformOriginX:"50%",transformOriginY:"50%",scaleX:1,scaleY:1,translateX:0}},"transition.whirlIn":{defaultDuration:850,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,0],scaleY:[1,0],rotateY:[0,160]},1,{easing:"easeInOutSine"}]]},"transition.whirlOut":{defaultDuration:750,calls:[[{opacity:[0,"easeInOutQuint",1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:0,scaleY:0,rotateY:160},1,{easing:"swing"}]],reset:{scaleX:1,scaleY:1,rotateY:0}},"transition.shrinkIn":{defaultDuration:750,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,1.5],scaleY:[1,1.5],translateZ:0}]]},"transition.shrinkOut":{defaultDuration:600,calls:[[{opacity:[0,1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:1.3,scaleY:1.3,translateZ:0}]],reset:{scaleX:1,scaleY:1}},"transition.expandIn":{defaultDuration:700,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,.625],scaleY:[1,.625],translateZ:0}]]},"transition.expandOut":{defaultDuration:700,calls:[[{opacity:[0,1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:.5,scaleY:.5,translateZ:0}]],reset:{scaleX:1,scaleY:1}},"transition.bounceIn":{defaultDuration:800,calls:[[{opacity:[1,0],scaleX:[1.05,.3],scaleY:[1.05,.3]},.4],[{scaleX:.9,scaleY:.9,translateZ:0},.2],[{scaleX:1,scaleY:1},.5]]},"transition.bounceOut":{defaultDuration:800,calls:[[{scaleX:.95,scaleY:.95},.35],[{scaleX:1.1,scaleY:1.1,translateZ:0},.35],[{opacity:[0,1],scaleX:.3,scaleY:.3},.3]],reset:{scaleX:1,scaleY:1}},"transition.bounceUpIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateY:[-30,1e3]},.6,{easing:"easeOutCirc"}],[{translateY:10},.2],[{translateY:0},.2]]},"transition.bounceUpOut":{defaultDuration:1e3,calls:[[{translateY:20},.2],[{opacity:[0,"easeInCirc",1],translateY:-1e3},.8]],reset:{translateY:0}},"transition.bounceDownIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateY:[30,-1e3]},.6,{easing:"easeOutCirc"}],[{translateY:-10},.2],[{translateY:0},.2]]},"transition.bounceDownOut":{defaultDuration:1e3,calls:[[{translateY:-20},.2],[{opacity:[0,"easeInCirc",1],translateY:1e3},.8]],reset:{translateY:0}},"transition.bounceLeftIn":{defaultDuration:750,calls:[[{opacity:[1,0],translateX:[30,-1250]},.6,{easing:"easeOutCirc"}],[{translateX:-10},.2],[{translateX:0},.2]]},"transition.bounceLeftOut":{defaultDuration:750,calls:[[{translateX:30},.2],[{opacity:[0,"easeInCirc",1],translateX:-1250},.8]],reset:{translateX:0}},"transition.bounceRightIn":{defaultDuration:750,calls:[[{opacity:[1,0],translateX:[-30,1250]},.6,{easing:"easeOutCirc"}],[{translateX:10},.2],[{translateX:0},.2]]},"transition.bounceRightOut":{defaultDuration:750,calls:[[{translateX:-30},.2],[{opacity:[0,"easeInCirc",1],translateX:1250},.8]],reset:{translateX:0}},"transition.slideUpIn":{defaultDuration:900,calls:[[{opacity:[1,0],translateY:[0,20],translateZ:0}]]},"transition.slideUpOut":{defaultDuration:900,calls:[[{opacity:[0,1],translateY:-20,translateZ:0}]],reset:{translateY:0}},"transition.slideDownIn":{defaultDuration:900,calls:[[{opacity:[1,0],translateY:[0,-20],translateZ:0}]]},"transition.slideDownOut":{defaultDuration:900,calls:[[{opacity:[0,1],translateY:20,translateZ:0}]],reset:{translateY:0}},"transition.slideLeftIn":{defaultDuration:1e3,calls:[[{opacity:[1,0],translateX:[0,-20],translateZ:0}]]},"transition.slideLeftOut":{defaultDuration:1050,calls:[[{opacity:[0,1],translateX:-20,translateZ:0}]],reset:{translateX:0}},"transition.slideRightIn":{defaultDuration:1e3,calls:[[{opacity:[1,0],translateX:[0,20],translateZ:0}]]},"transition.slideRightOut":{defaultDuration:1050,calls:[[{opacity:[0,1],translateX:20,translateZ:0}]],reset:{translateX:0}},"transition.slideUpBigIn":{defaultDuration:850,calls:[[{opacity:[1,0],translateY:[0,75],translateZ:0}]]},"transition.slideUpBigOut":{defaultDuration:800,calls:[[{opacity:[0,1],translateY:-75,translateZ:0}]],reset:{translateY:0}},"transition.slideDownBigIn":{defaultDuration:850,calls:[[{opacity:[1,0],translateY:[0,-75],translateZ:0}]]},"transition.slideDownBigOut":{defaultDuration:800,calls:[[{opacity:[0,1],translateY:75,translateZ:0}]],reset:{translateY:0}},"transition.slideLeftBigIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateX:[0,-75],translateZ:0}]]},"transition.slideLeftBigOut":{defaultDuration:750,calls:[[{opacity:[0,1],translateX:-75,translateZ:0}]],reset:{translateX:0}},"transition.slideRightBigIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateX:[0,75],translateZ:0}]]},"transition.slideRightBigOut":{defaultDuration:750,calls:[[{opacity:[0,1],translateX:75,translateZ:0}]],reset:{translateX:0}},"transition.perspectiveUpIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:["100%","100%"],rotateX:[0,-180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveUpOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:["100%","100%"],rotateX:-180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateX:0}},"transition.perspectiveDownIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:[0,0],rotateX:[0,180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveDownOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:[0,0],rotateX:180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateX:0}},"transition.perspectiveLeftIn":{defaultDuration:950,calls:[[{opacity:[1,0],transformPerspective:[2e3,2e3],transformOriginX:[0,0],transformOriginY:[0,0],rotateY:[0,-180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveLeftOut":{defaultDuration:950,calls:[[{opacity:[0,1],transformPerspective:[2e3,2e3],transformOriginX:[0,0],transformOriginY:[0,0],rotateY:-180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateY:0}},"transition.perspectiveRightIn":{defaultDuration:950,calls:[[{opacity:[1,0],transformPerspective:[2e3,2e3],transformOriginX:["100%","100%"],transformOriginY:[0,0],rotateY:[0,180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},"transition.perspectiveRightOut":{defaultDuration:950,calls:[[{opacity:[0,1],transformPerspective:[2e3,2e3],transformOriginX:["100%","100%"],transformOriginY:[0,0],rotateY:180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateY:0}}};for(var u in o.RegisterEffect.packagedEffects)o.RegisterEffect(u,o.RegisterEffect.packagedEffects[u]);o.RunSequence=function(e){var t=s.extend(!0,[],e);t.length>1&&(s.each(t.reverse(),function(e,n){var r=t[e+1];if(r){var i=n.o||n.options,a=r.o||r.options,l=i&&i.sequenceQueue===!1?"begin":"complete",c=a&&a[l],u={};u[l]=function(){var e=r.e||r.elements,t=e.nodeType?[e]:e;c&&c.call(t,t),o(n)},r.o?r.o=s.extend({},a,u):r.options=s.extend({},a,u)}}),t.reverse()),o(t[0])}}(window.jQuery||window.Zepto||window,window,document)}),function(e,t){function n(e,t,n){var r=e.children(),i=!1;e.empty();for(var s=0,a=r.length;a>s;s++){var l=r.eq(s);if(e.append(l),n&&e.append(n),o(e,t)){l.remove(),i=!0;break}n&&n.detach()}return i}function r(t,n,s,a,l){var c=!1,u="a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style",d="script, .dotdotdot-keep";return t.contents().detach().each(function(){var p=this,f=e(p);if("undefined"==typeof p)return!0;if(f.is(d))t.append(f);else{if(c)return!0;t.append(f),!l||f.is(a.after)||f.find(a.after).length||t[t.is(u)?"after":"append"](l),o(s,a)&&(c=3==p.nodeType?i(f,n,s,a,l):r(f,n,s,a,l),c||(f.detach(),c=!0)),c||l&&l.detach()}}),n.addClass("is-truncated"),c}function i(t,n,r,i,a){var u=t[0];if(!u)return!1;var p=c(u),f=-1!==p.indexOf(" ")?" ":"　",h="letter"==i.wrap?"":f,g=p.split(h),m=-1,v=-1,y=0,b=g.length-1;for(i.fallbackToLetter&&0==y&&0==b&&(h="",g=p.split(h),b=g.length-1);b>=y&&(0!=y||0!=b);){var w=Math.floor((y+b)/2);if(w==v)break;v=w,l(u,g.slice(0,v+1).join(h)+i.ellipsis),o(r,i)?(b=v,i.fallbackToLetter&&0==y&&0==b&&(h="",g=g[0].split(h),m=-1,v=-1,y=0,b=g.length-1)):(m=v,y=v)}if(-1==m||1==g.length&&0==g[0].length){var x=t.parent();t.detach();var C=a&&a.closest(x).length?a.length:0;x.contents().length>C?u=d(x.contents().eq(-1-C),n):(u=d(x,n,!0),C||x.detach()),u&&(p=s(c(u),i),l(u,p),C&&a&&e(u).parent().append(a))}else p=s(g.slice(0,m+1).join(h),i),l(u,p);return!0}function o(e,t){return e.innerHeight()>t.maxHeight}function s(t,n){for(;e.inArray(t.slice(-1),n.lastCharacter.remove)>-1;)t=t.slice(0,-1);return e.inArray(t.slice(-1),n.lastCharacter.noEllipsis)<0&&(t+=n.ellipsis),t}function a(e){return{width:e.innerWidth(),height:e.innerHeight()}}function l(e,t){e.innerText?e.innerText=t:e.nodeValue?e.nodeValue=t:e.textContent&&(e.textContent=t)}function c(e){return e.innerText?e.innerText:e.nodeValue?e.nodeValue:e.textContent?e.textContent:""}function u(e){do e=e.previousSibling;while(e&&1!==e.nodeType&&3!==e.nodeType);return e}function d(t,n,r){var i,o=t&&t[0];if(o){if(!r){if(3===o.nodeType)return o;if(e.trim(t.text()))return d(t.contents().last(),n)}for(i=u(o);!i;){if(t=t.parent(),t.is(n)||!t.length)return!1;i=u(t[0])}if(i)return d(e(i),n)}return!1}function p(t,n){return t?"string"==typeof t?(t=e(t,n),t.length?t:!1):t.jquery?t:!1:!1}function f(e){for(var t=e.innerHeight(),n=["paddingTop","paddingBottom"],r=0,i=n.length;i>r;r++){var o=parseInt(e.css(n[r]),10);isNaN(o)&&(o=0),t-=o}return t}if(!e.fn.dotdotdot){e.fn.dotdotdot=function(t){if(0==this.length)return e.fn.dotdotdot.debug('No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){e(this).dotdotdot(t)});var i=this;i.data("dotdotdot")&&i.trigger("destroy.dot"),i.data("dotdotdot-style",i.attr("style")||""),i.css("word-wrap","break-word"),"nowrap"===i.css("white-space")&&i.css("white-space","normal"),i.bind_events=function(){return i.bind("update.dot",function(t,a){i.removeClass("is-truncated"),t.preventDefault(),t.stopPropagation(),l.maxHeight="number"==typeof l.height?l.height:f(i),l.maxHeight+=l.tolerance,"undefined"!=typeof a&&(("string"==typeof a||"nodeType"in a&&1===a.nodeType)&&(a=e("<div />").append(a).contents()),a instanceof e&&(s=a)),g=i.wrapInner('<div class="dotdotdot" />').children(),g.contents().detach().end().append(s.clone(!0)).find("br").replaceWith("  <br />  ").end().css({height:"auto",width:"auto",border:"none",padding:0,margin:0});var u=!1,d=!1;return c.afterElement&&(u=c.afterElement.clone(!0),u.show(),c.afterElement.detach()),o(g,l)&&(d="children"==l.wrap?n(g,l,u):r(g,i,g,l,u)),g.replaceWith(g.contents()),g=null,e.isFunction(l.callback)&&l.callback.call(i[0],d,s),c.isTruncated=d,d}).bind("isTruncated.dot",function(e,t){return e.preventDefault(),e.stopPropagation(),"function"==typeof t&&t.call(i[0],c.isTruncated),c.isTruncated}).bind("originalContent.dot",function(e,t){return e.preventDefault(),e.stopPropagation(),"function"==typeof t&&t.call(i[0],s),s}).bind("destroy.dot",function(e){e.preventDefault(),e.stopPropagation(),i.unwatch().unbind_events().contents().detach().end().append(s).attr("style",i.data("dotdotdot-style")||"").data("dotdotdot",!1)}),i},i.unbind_events=function(){return i.unbind(".dot"),i},i.watch=function(){if(i.unwatch(),"window"==l.watch){var t=e(window),n=t.width(),r=t.height();t.bind("resize.dot"+c.dotId,function(){n==t.width()&&r==t.height()&&l.windowResizeFix||(n=t.width(),r=t.height(),d&&clearInterval(d),d=setTimeout(function(){i.trigger("update.dot")},100))})}else u=a(i),d=setInterval(function(){if(i.is(":visible")){var e=a(i);(u.width!=e.width||u.height!=e.height)&&(i.trigger("update.dot"),u=e)}},500);return i},i.unwatch=function(){return e(window).unbind("resize.dot"+c.dotId),d&&clearInterval(d),i};var s=i.contents(),l=e.extend(!0,{},e.fn.dotdotdot.defaults,t),c={},u={},d=null,g=null;return l.lastCharacter.remove instanceof Array||(l.lastCharacter.remove=e.fn.dotdotdot.defaultArrays.lastCharacter.remove),l.lastCharacter.noEllipsis instanceof Array||(l.lastCharacter.noEllipsis=e.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis),c.afterElement=p(l.after,i),c.isTruncated=!1,c.dotId=h++,i.data("dotdotdot",!0).bind_events().trigger("update.dot"),l.watch&&i.watch(),i},e.fn.dotdotdot.defaults={ellipsis:"... ",wrap:"word",fallbackToLetter:!0,lastCharacter:{},tolerance:0,callback:null,after:null,height:null,watch:!1,windowResizeFix:!0},e.fn.dotdotdot.defaultArrays={lastCharacter:{remove:[" ","　",",",";",".","!","?"],noEllipsis:[]}},e.fn.dotdotdot.debug=function(e){};var h=1,g=e.fn.html;e.fn.html=function(n){return n!=t&&!e.isFunction(n)&&this.data("dotdotdot")?this.trigger("update",[n]):g.apply(this,arguments)};var m=e.fn.text;e.fn.text=function(n){return n!=t&&!e.isFunction(n)&&this.data("dotdotdot")?(n=e("<div />").text(n).html(),this.trigger("update",[n])):m.apply(this,arguments)}}}(jQuery),function(e){function t(e,t,i){var o=e[0],s=/er/.test(i)?_indeterminate:/bl/.test(i)?h:p,a=i==_update?{checked:o[p],disabled:o[h],indeterminate:"true"==e.attr(_indeterminate)||"false"==e.attr(_determinate)}:o[s];if(/^(ch|di|in)/.test(i)&&!a)n(e,s);else if(/^(un|en|de)/.test(i)&&a)r(e,s);else if(i==_update)for(var l in a)a[l]?n(e,l,!0):r(e,l,!0);else t&&"toggle"!=i||(t||e[_callback]("ifClicked"),a?o[_type]!==d&&r(e,s):n(e,s))}function n(t,n,i){var u=t[0],g=t.parent(),m=n==p,v=n==_indeterminate,y=n==h,b=v?_determinate:m?f:"enabled",w=o(t,b+s(u[_type])),x=o(t,n+s(u[_type]));if(u[n]!==!0){if(!i&&n==p&&u[_type]==d&&u.name){var C=t.closest("form"),k='input[name="'+u.name+'"]';k=C.length?C.find(k):e(k),k.each(function(){this!==u&&e(this).data(l)&&r(e(this),n)})}v?(u[n]=!0,u[p]&&r(t,p,"force")):(i||(u[n]=!0),m&&u[_indeterminate]&&r(t,_indeterminate,!1)),a(t,m,n,i)}u[h]&&o(t,_cursor,!0)&&g.find("."+c).css(_cursor,"default"),g[_add](x||o(t,n)||""),g.attr("role")&&!v&&g.attr("aria-"+(y?h:p),"true"),g[_remove](w||o(t,b)||"")}function r(e,t,n){var r=e[0],i=e.parent(),l=t==p,u=t==_indeterminate,d=t==h,g=u?_determinate:l?f:"enabled",m=o(e,g+s(r[_type])),v=o(e,t+s(r[_type]));r[t]!==!1&&((u||!n||"force"==n)&&(r[t]=!1),a(e,l,g,n)),!r[h]&&o(e,_cursor,!0)&&i.find("."+c).css(_cursor,"pointer"),i[_remove](v||o(e,t)||""),i.attr("role")&&!u&&i.attr("aria-"+(d?h:p),"false"),i[_add](m||o(e,g)||"")}function i(t,n){t.data(l)&&(t.parent().html(t.attr("style",t.data(l).s||"")),n&&t[_callback](n),t.off(".i").unwrap(),e(_label+'[for="'+t[0].id+'"]').add(t.closest(_label)).off(".i"))}function o(e,t,n){return e.data(l)?e.data(l).o[t+(n?"":"Class")]:void 0}function s(e){return e.charAt(0).toUpperCase()+e.slice(1)}function a(e,t,n,r){r||(t&&e[_callback]("ifToggled"),e[_callback]("ifChanged")[_callback]("if"+s(n)))}var l="iCheck",c=l+"-helper",u="checkbox",d="radio",p="checked",f="un"+p,h="disabled";_determinate="determinate",_indeterminate="in"+_determinate,_update="update",_type="type",_click="click",_touch="touchbegin.i touchend.i",_add="addClass",_remove="removeClass",_callback="trigger",_label="label",_cursor="cursor",_mobile=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent),e.fn[l]=function(o,s){var a='input[type="'+u+'"], input[type="'+d+'"]',f=e(),g=function(t){t.each(function(){var t=e(this);f=f.add(t.is(a)?t:t.find(a))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(o))return o=o.toLowerCase(),g(this),f.each(function(){var n=e(this);"destroy"==o?i(n,"ifDestroyed"):t(n,!0,o),e.isFunction(s)&&s()});if("object"!=typeof o&&o)return this;var m=e.extend({checkedClass:p,disabledClass:h,indeterminateClass:_indeterminate,labelHover:!0},o),v=m.handle,y=m.hoverClass||"hover",b=m.focusClass||"focus",w=m.activeClass||"active",x=!!m.labelHover,C=m.labelHoverClass||"hover",k=0|(""+m.increaseArea).replace("%","");return(v==u||v==d)&&(a='input[type="'+v+'"]'),-50>k&&(k=-50),g(this),f.each(function(){var o=e(this);i(o);var s,a=this,f=a.id,g=-k+"%",v=100+2*k+"%",S={position:"absolute",top:g,left:g,display:"block",width:v,height:v,margin:0,padding:0,background:"#fff",border:0,opacity:0},T=_mobile?{position:"absolute",visibility:"hidden"}:k?S:{position:"absolute",opacity:0},E=a[_type]==u?m.checkboxClass||"i"+u:m.radioClass||"i"+d,O=e(_label+'[for="'+f+'"]').add(o.closest(_label)),P=!!m.aria,A=l+"-"+Math.random().toString(36).substr(2,6),D='<div class="'+E+'" '+(P?'role="'+a[_type]+'" ':"");P&&O.each(function(){D+='aria-labelledby="',this.id?D+=this.id:(this.id=A,D+=A),D+='"'}),D=o.wrap(D+"/>")[_callback]("ifCreated").parent().append(m.insert),s=e('<ins class="'+c+'"/>').css(S).appendTo(D),o.data(l,{o:m,s:o.attr("style")}).css(T),!!m.inheritClass&&D[_add](a.className||""),!!m.inheritID&&f&&D.attr("id",l+"-"+f),"static"==D.css("position")&&D.css("position","relative"),t(o,!0,_update),O.length&&O.on(_click+".i mouseover.i mouseout.i "+_touch,function(n){var r=n[_type],i=e(this);if(!a[h]){if(r==_click){if(e(n.target).is("a"))return;t(o,!1,!0)}else x&&(/ut|nd/.test(r)?(D[_remove](y),i[_remove](C)):(D[_add](y),i[_add](C)));if(!_mobile)return!1;n.stopPropagation()}}),o.on(_click+".i focus.i blur.i keyup.i keydown.i keypress.i",function(e){var t=e[_type],i=e.keyCode;return t==_click?!1:"keydown"==t&&32==i?(a[_type]==d&&a[p]||(a[p]?r(o,p):n(o,p)),!1):void("keyup"==t&&a[_type]==d?!a[p]&&n(o,p):/us|ur/.test(t)&&D["blur"==t?_remove:_add](b))}),s.on(_click+" mousedown mouseup mouseover mouseout "+_touch,function(e){var n=e[_type],r=/wn|up/.test(n)?w:y;if(!a[h]){if(n==_click?t(o,!1,!0):(/wn|er|in/.test(n)?D[_add](r):D[_remove](r+" "+w),O.length&&x&&r==y&&O[/ut|nd/.test(n)?_remove:_add](C)),!_mobile)return!1;e.stopPropagation()}})})}}(window.jQuery||window.Zepto),function(e,t){"function"==typeof define&&define.amd?define("sifter",t):"object"==typeof exports?module.exports=t():e.Sifter=t()}(this,function(){var e=function(e,t){this.items=e,this.settings=t||{diacritics:!0}};e.prototype.tokenize=function(e){if(e=r(String(e||"").toLowerCase()),!e||!e.length)return[];var t,n,o,a,l=[],c=e.split(/ +/);for(t=0,n=c.length;n>t;t++){if(o=i(c[t]),this.settings.diacritics)for(a in s)s.hasOwnProperty(a)&&(o=o.replace(new RegExp(a,"g"),s[a]));l.push({string:c[t],regex:new RegExp(o,"i")})}return l},e.prototype.iterator=function(e,t){var n;n=o(e)?Array.prototype.forEach||function(e){for(var t=0,n=this.length;n>t;t++)e(this[t],t,this)}:function(e){for(var t in this)this.hasOwnProperty(t)&&e(this[t],t,this)},n.apply(e,[t])},e.prototype.getScoreFunction=function(e,t){var n,r,i,o;n=this,e=n.prepareSearch(e,t),i=e.tokens,r=e.options.fields,o=i.length;var s=function(e,t){var n,r;return e?(e=String(e||""),r=e.search(t.regex),-1===r?0:(n=t.string.length/e.length,0===r&&(n+=.5),n)):0},a=function(){var e=r.length;return e?1===e?function(e,t){return s(t[r[0]],e)}:function(t,n){for(var i=0,o=0;e>i;i++)o+=s(n[r[i]],t);return o/e}:function(){return 0}}();return o?1===o?function(e){return a(i[0],e)}:"and"===e.options.conjunction?function(e){for(var t,n=0,r=0;o>n;n++){if(t=a(i[n],e),0>=t)return 0;r+=t}return r/o}:function(e){for(var t=0,n=0;o>t;t++)n+=a(i[t],e);return n/o}:function(){return 0}},e.prototype.getSortFunction=function(e,n){var r,i,o,s,a,l,c,u,d,p,f;if(o=this,e=o.prepareSearch(e,n),f=!e.query&&n.sort_empty||n.sort,d=function(e,t){return"$score"===e?t.score:o.items[t.id][e]},a=[],f)for(r=0,i=f.length;i>r;r++)(e.query||"$score"!==f[r].field)&&a.push(f[r]);if(e.query){for(p=!0,r=0,i=a.length;i>r;r++)if("$score"===a[r].field){p=!1;break}p&&a.unshift({field:"$score",direction:"desc"})}else for(r=0,i=a.length;i>r;r++)if("$score"===a[r].field){a.splice(r,1);break}for(u=[],r=0,i=a.length;i>r;r++)u.push("desc"===a[r].direction?-1:1);return l=a.length,l?1===l?(s=a[0].field,c=u[0],function(e,n){return c*t(d(s,e),d(s,n))}):function(e,n){var r,i,o;for(r=0;l>r;r++)if(o=a[r].field,i=u[r]*t(d(o,e),d(o,n)))return i;return 0}:null},e.prototype.prepareSearch=function(e,t){if("object"==typeof e)return e;t=n({},t);var r=t.fields,i=t.sort,s=t.sort_empty;return r&&!o(r)&&(t.fields=[r]),i&&!o(i)&&(t.sort=[i]),s&&!o(s)&&(t.sort_empty=[s]),{options:t,query:String(e||"").toLowerCase(),tokens:this.tokenize(e),total:0,items:[]}},e.prototype.search=function(e,t){var n,r,i,o,s=this;return r=this.prepareSearch(e,t),t=r.options,e=r.query,o=t.score||s.getScoreFunction(r),e.length?s.iterator(s.items,function(e,i){n=o(e),(t.filter===!1||n>0)&&r.items.push({score:n,id:i})}):s.iterator(s.items,function(e,t){r.items.push({score:1,id:t})}),i=s.getSortFunction(r,t),i&&r.items.sort(i),r.total=r.items.length,"number"==typeof t.limit&&(r.items=r.items.slice(0,t.limit)),r};var t=function(e,t){return"number"==typeof e&&"number"==typeof t?e>t?1:t>e?-1:0:(e=a(String(e||"")),t=a(String(t||"")),e>t?1:t>e?-1:0)},n=function(e,t){var n,r,i,o;for(n=1,r=arguments.length;r>n;n++)if(o=arguments[n])for(i in o)o.hasOwnProperty(i)&&(e[i]=o[i]);return e},r=function(e){return(e+"").replace(/^\s+|\s+$|/g,"")},i=function(e){return(e+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")},o=Array.isArray||$&&$.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},s={a:"[aÀÁÂÃÄÅàáâãäåĀāąĄ]",c:"[cÇçćĆčČ]",d:"[dđĐďĎ]",e:"[eÈÉÊËèéêëěĚĒēęĘ]",i:"[iÌÍÎÏìíîïĪī]",l:"[lłŁ]",n:"[nÑñňŇńŃ]",o:"[oÒÓÔÕÕÖØòóôõöøŌō]",r:"[rřŘ]",s:"[sŠšśŚ]",t:"[tťŤ]",u:"[uÙÚÛÜùúûüůŮŪū]",y:"[yŸÿýÝ]",z:"[zŽžżŻźŹ]"},a=function(){var e,t,n,r,i="",o={};for(n in s)if(s.hasOwnProperty(n))for(r=s[n].substring(2,s[n].length-1),i+=r,e=0,t=r.length;t>e;e++)o[r.charAt(e)]=n;var a=new RegExp("["+i+"]","g");return function(e){return e.replace(a,function(e){return o[e]}).toLowerCase()}}();return e}),function(e,t){"function"==typeof define&&define.amd?define("microplugin",t):"object"==typeof exports?module.exports=t():e.MicroPlugin=t()}(this,function(){var e={};e.mixin=function(e){e.plugins={},e.prototype.initializePlugins=function(e){var n,r,i,o=this,s=[];if(o.plugins={names:[],settings:{},requested:{},loaded:{}},t.isArray(e))for(n=0,r=e.length;r>n;n++)"string"==typeof e[n]?s.push(e[n]):(o.plugins.settings[e[n].name]=e[n].options,s.push(e[n].name));else if(e)for(i in e)e.hasOwnProperty(i)&&(o.plugins.settings[i]=e[i],s.push(i));for(;s.length;)o.require(s.shift())},e.prototype.loadPlugin=function(t){var n=this,r=n.plugins,i=e.plugins[t];if(!e.plugins.hasOwnProperty(t))throw new Error('Unable to find "'+t+'" plugin');r.requested[t]=!0,r.loaded[t]=i.fn.apply(n,[n.plugins.settings[t]||{}]),r.names.push(t)},e.prototype.require=function(e){var t=this,n=t.plugins;if(!t.plugins.loaded.hasOwnProperty(e)){if(n.requested[e])throw new Error('Plugin has circular dependency ("'+e+'")');t.loadPlugin(e)}return n.loaded[e]},e.define=function(t,n){e.plugins[t]={name:t,fn:n}}};var t={isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}};return e}),function(e,t){"function"==typeof define&&define.amd?define("selectize",["jquery","sifter","microplugin"],t):"object"==typeof exports?module.exports=t(require("jquery"),require("sifter"),require("microplugin")):e.Selectize=t(e.jQuery,e.Sifter,e.MicroPlugin)}(this,function(e,t,n){"use strict";var r=function(e,t){if("string"!=typeof t||t.length){var n="string"==typeof t?new RegExp(t,"i"):t,r=function(e){var t=0;if(3===e.nodeType){var i=e.data.search(n);if(i>=0&&e.data.length>0){var o=e.data.match(n),s=document.createElement("span");s.className="highlight";var a=e.splitText(i),l=(a.splitText(o[0].length),a.cloneNode(!0));s.appendChild(l),a.parentNode.replaceChild(s,a),t=1}}else if(1===e.nodeType&&e.childNodes&&!/(script|style)/i.test(e.tagName))for(var c=0;c<e.childNodes.length;++c)c+=r(e.childNodes[c]);return t};return e.each(function(){r(this)})}},i=function(){};i.prototype={on:function(e,t){this._events=this._events||{},this._events[e]=this._events[e]||[],this._events[e].push(t)},off:function(e,t){var n=arguments.length;return 0===n?delete this._events:1===n?delete this._events[e]:(this._events=this._events||{},void(e in this._events!=!1&&this._events[e].splice(this._events[e].indexOf(t),1)))},trigger:function(e){if(this._events=this._events||{},e in this._events!=!1)for(var t=0;t<this._events[e].length;t++)this._events[e][t].apply(this,Array.prototype.slice.call(arguments,1))}},i.mixin=function(e){for(var t=["on","off","trigger"],n=0;n<t.length;n++)e.prototype[t[n]]=i.prototype[t[n]]};var o=/Mac/.test(navigator.userAgent),s=65,a=13,l=27,c=37,u=38,d=80,p=39,f=40,h=78,g=8,m=46,v=16,y=o?91:17,b=o?18:17,w=9,x=1,C=2,k=!/android/i.test(window.navigator.userAgent)&&!!document.createElement("form").validity,S=function(e){return"undefined"!=typeof e},T=function(e){return"undefined"==typeof e||null===e?null:"boolean"==typeof e?e?"1":"0":e+""},E=function(e){return(e+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

},O=function(e){return(e+"").replace(/\$/g,"$$$$")},P={};P.before=function(e,t,n){var r=e[t];e[t]=function(){return n.apply(e,arguments),r.apply(e,arguments)}},P.after=function(e,t,n){var r=e[t];e[t]=function(){var t=r.apply(e,arguments);return n.apply(e,arguments),t}};var A=function(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}},D=function(e,t){var n;return function(){var r=this,i=arguments;window.clearTimeout(n),n=window.setTimeout(function(){e.apply(r,i)},t)}},N=function(e,t,n){var r,i=e.trigger,o={};e.trigger=function(){var n=arguments[0];return-1===t.indexOf(n)?i.apply(e,arguments):void(o[n]=arguments)},n.apply(e,[]),e.trigger=i;for(r in o)o.hasOwnProperty(r)&&i.apply(e,o[r])},j=function(e,t,n,r){e.on(t,n,function(t){for(var n=t.target;n&&n.parentNode!==e[0];)n=n.parentNode;return t.currentTarget=n,r.apply(this,[t])})},I=function(e){var t={};if("selectionStart"in e)t.start=e.selectionStart,t.length=e.selectionEnd-t.start;else if(document.selection){e.focus();var n=document.selection.createRange(),r=document.selection.createRange().text.length;n.moveStart("character",-e.value.length),t.start=n.text.length-r,t.length=r}return t},L=function(e,t,n){var r,i,o={};if(n)for(r=0,i=n.length;i>r;r++)o[n[r]]=e.css(n[r]);else o=e.css();t.css(o)},$=function(t,n){if(!t)return 0;var r=e("<test>").css({position:"absolute",top:-99999,left:-99999,width:"auto",padding:0,whiteSpace:"pre"}).text(t).appendTo("body");L(n,r,["letterSpacing","fontSize","fontFamily","fontWeight","textTransform"]);var i=r.width();return r.remove(),i},F=function(e){var t=null,n=function(n,r){var i,o,s,a,l,c,u,d;n=n||window.event||{},r=r||{},n.metaKey||n.altKey||(r.force||e.data("grow")!==!1)&&(i=e.val(),n.type&&"keydown"===n.type.toLowerCase()&&(o=n.keyCode,s=o>=97&&122>=o||o>=65&&90>=o||o>=48&&57>=o||32===o,o===m||o===g?(d=I(e[0]),d.length?i=i.substring(0,d.start)+i.substring(d.start+d.length):o===g&&d.start?i=i.substring(0,d.start-1)+i.substring(d.start+1):o===m&&"undefined"!=typeof d.start&&(i=i.substring(0,d.start)+i.substring(d.start+1))):s&&(c=n.shiftKey,u=String.fromCharCode(n.keyCode),u=c?u.toUpperCase():u.toLowerCase(),i+=u)),a=e.attr("placeholder"),!i&&a&&(i=a),l=$(i,e)+4,l!==t&&(t=l,e.width(l),e.triggerHandler("resize")))};e.on("keydown keyup update blur",n),n()},_=function(n,r){var i,o,s,a,l=this;a=n[0],a.selectize=l;var c=window.getComputedStyle&&window.getComputedStyle(a,null);if(s=c?c.getPropertyValue("direction"):a.currentStyle&&a.currentStyle.direction,s=s||n.parents("[dir]:first").attr("dir")||"",e.extend(l,{order:0,settings:r,$input:n,tabIndex:n.attr("tabindex")||"",tagType:"select"===a.tagName.toLowerCase()?x:C,rtl:/rtl/i.test(s),eventNS:".selectize"+ ++_.count,highlightedValue:null,isOpen:!1,isDisabled:!1,isRequired:n.is("[required]"),isInvalid:!1,isLocked:!1,isFocused:!1,isInputHidden:!1,isSetup:!1,isShiftDown:!1,isCmdDown:!1,isCtrlDown:!1,ignoreFocus:!1,ignoreBlur:!1,ignoreHover:!1,hasOptions:!1,currentResults:null,lastValue:"",caretPos:0,loading:0,loadedSearches:{},$activeOption:null,$activeItems:[],optgroups:{},options:{},userOptions:{},items:[],renderCache:{},onSearchChange:null===r.loadThrottle?l.onSearchChange:D(l.onSearchChange,r.loadThrottle)}),l.sifter=new t(this.options,{diacritics:r.diacritics}),l.settings.options){for(i=0,o=l.settings.options.length;o>i;i++)l.registerOption(l.settings.options[i]);delete l.settings.options}if(l.settings.optgroups){for(i=0,o=l.settings.optgroups.length;o>i;i++)l.registerOptionGroup(l.settings.optgroups[i]);delete l.settings.optgroups}l.settings.mode=l.settings.mode||(1===l.settings.maxItems?"single":"multi"),"boolean"!=typeof l.settings.hideSelected&&(l.settings.hideSelected="multi"===l.settings.mode),l.initializePlugins(l.settings.plugins),l.setupCallbacks(),l.setupTemplates(),l.setup()};return i.mixin(_),n.mixin(_),e.extend(_.prototype,{setup:function(){var t,n,r,i,s,a,l,c,u,d=this,p=d.settings,f=d.eventNS,h=e(window),g=e(document),m=d.$input;if(l=d.settings.mode,c=m.attr("class")||"",t=e("<div>").addClass(p.wrapperClass).addClass(c).addClass(l),n=e("<div>").addClass(p.inputClass).addClass("items").appendTo(t),r=e('<input type="text" autocomplete="off" />').appendTo(n).attr("tabindex",m.is(":disabled")?"-1":d.tabIndex),a=e(p.dropdownParent||t),i=e("<div>").addClass(p.dropdownClass).addClass(l).hide().appendTo(a),s=e("<div>").addClass(p.dropdownContentClass).appendTo(i),d.settings.copyClassesToDropdown&&i.addClass(c),t.css({width:m[0].style.width}),d.plugins.names.length&&(u="plugin-"+d.plugins.names.join(" plugin-"),t.addClass(u),i.addClass(u)),(null===p.maxItems||p.maxItems>1)&&d.tagType===x&&m.attr("multiple","multiple"),d.settings.placeholder&&r.attr("placeholder",p.placeholder),!d.settings.splitOn&&d.settings.delimiter){var w=d.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&");d.settings.splitOn=new RegExp("\\s*"+w+"+\\s*")}m.attr("autocorrect")&&r.attr("autocorrect",m.attr("autocorrect")),m.attr("autocapitalize")&&r.attr("autocapitalize",m.attr("autocapitalize")),d.$wrapper=t,d.$control=n,d.$control_input=r,d.$dropdown=i,d.$dropdown_content=s,i.on("mouseenter","[data-selectable]",function(){return d.onOptionHover.apply(d,arguments)}),i.on("mousedown click","[data-selectable]",function(){return d.onOptionSelect.apply(d,arguments)}),j(n,"mousedown","*:not(input)",function(){return d.onItemSelect.apply(d,arguments)}),F(r),n.on({mousedown:function(){return d.onMouseDown.apply(d,arguments)},click:function(){return d.onClick.apply(d,arguments)}}),r.on({mousedown:function(e){e.stopPropagation()},keydown:function(){return d.onKeyDown.apply(d,arguments)},keyup:function(){return d.onKeyUp.apply(d,arguments)},keypress:function(){return d.onKeyPress.apply(d,arguments)},resize:function(){d.positionDropdown.apply(d,[])},blur:function(){return d.onBlur.apply(d,arguments)},focus:function(){return d.ignoreBlur=!1,d.onFocus.apply(d,arguments)},paste:function(){return d.onPaste.apply(d,arguments)}}),g.on("keydown"+f,function(e){d.isCmdDown=e[o?"metaKey":"ctrlKey"],d.isCtrlDown=e[o?"altKey":"ctrlKey"],d.isShiftDown=e.shiftKey}),g.on("keyup"+f,function(e){e.keyCode===b&&(d.isCtrlDown=!1),e.keyCode===v&&(d.isShiftDown=!1),e.keyCode===y&&(d.isCmdDown=!1)}),g.on("mousedown"+f,function(e){if(d.isFocused){if(e.target===d.$dropdown[0]||e.target.parentNode===d.$dropdown[0])return!1;d.$control.has(e.target).length||e.target===d.$control[0]||d.blur(e.target)}}),h.on(["scroll"+f,"resize"+f].join(" "),function(){d.isOpen&&d.positionDropdown.apply(d,arguments)}),h.on("mousemove"+f,function(){d.ignoreHover=!1}),this.revertSettings={$children:m.children().detach(),tabindex:m.attr("tabindex")},m.attr("tabindex",-1).hide().after(d.$wrapper),e.isArray(p.items)&&(d.setValue(p.items),delete p.items),k&&m.on("invalid"+f,function(e){e.preventDefault(),d.isInvalid=!0,d.refreshState()}),d.updateOriginalInput(),d.refreshItems(),d.refreshState(),d.updatePlaceholder(),d.isSetup=!0,m.is(":disabled")&&d.disable(),d.on("change",this.onChange),m.data("selectize",d),m.addClass("selectized"),d.trigger("initialize"),p.preload===!0&&d.onSearchChange("")},setupTemplates:function(){var t=this,n=t.settings.labelField,r=t.settings.optgroupLabelField,i={optgroup:function(e){return'<div class="optgroup">'+e.html+"</div>"},optgroup_header:function(e,t){return'<div class="optgroup-header">'+t(e[r])+"</div>"},option:function(e,t){return'<div class="option">'+t(e[n])+"</div>"},item:function(e,t){return'<div class="item">'+t(e[n])+"</div>"},option_create:function(e,t){return'<div class="create">Add <strong>'+t(e.input)+"</strong>&hellip;</div>"}};t.settings.render=e.extend({},i,t.settings.render)},setupCallbacks:function(){var e,t,n={initialize:"onInitialize",change:"onChange",item_add:"onItemAdd",item_remove:"onItemRemove",clear:"onClear",option_add:"onOptionAdd",option_remove:"onOptionRemove",option_clear:"onOptionClear",optgroup_add:"onOptionGroupAdd",optgroup_remove:"onOptionGroupRemove",optgroup_clear:"onOptionGroupClear",dropdown_open:"onDropdownOpen",dropdown_close:"onDropdownClose",type:"onType",load:"onLoad",focus:"onFocus",blur:"onBlur"};for(e in n)n.hasOwnProperty(e)&&(t=this.settings[n[e]],t&&this.on(e,t))},onClick:function(e){var t=this;t.isFocused||(t.focus(),e.preventDefault())},onMouseDown:function(t){{var n=this,r=t.isDefaultPrevented();e(t.target)}if(n.isFocused){if(t.target!==n.$control_input[0])return"single"===n.settings.mode?n.isOpen?n.close():n.open():r||n.setActiveItem(null),!1}else r||window.setTimeout(function(){n.focus()},0)},onChange:function(){this.$input.trigger("change")},onPaste:function(t){var n=this;n.isFull()||n.isInputHidden||n.isLocked?t.preventDefault():n.settings.splitOn&&setTimeout(function(){for(var t=e.trim(n.$control_input.val()||"").split(n.settings.splitOn),r=0,i=t.length;i>r;r++)n.createItem(t[r])},0)},onKeyPress:function(e){if(this.isLocked)return e&&e.preventDefault();var t=String.fromCharCode(e.keyCode||e.which);return this.settings.create&&"multi"===this.settings.mode&&t===this.settings.delimiter?(this.createItem(),e.preventDefault(),!1):void 0},onKeyDown:function(e){var t=(e.target===this.$control_input[0],this);if(t.isLocked)return void(e.keyCode!==w&&e.preventDefault());switch(e.keyCode){case s:if(t.isCmdDown)return void t.selectAll();break;case l:return void(t.isOpen&&(e.preventDefault(),e.stopPropagation(),t.close()));case h:if(!e.ctrlKey||e.altKey)break;case f:if(!t.isOpen&&t.hasOptions)t.open();else if(t.$activeOption){t.ignoreHover=!0;var n=t.getAdjacentOption(t.$activeOption,1);n.length&&t.setActiveOption(n,!0,!0)}return void e.preventDefault();case d:if(!e.ctrlKey||e.altKey)break;case u:if(t.$activeOption){t.ignoreHover=!0;var r=t.getAdjacentOption(t.$activeOption,-1);r.length&&t.setActiveOption(r,!0,!0)}return void e.preventDefault();case a:return void(t.isOpen&&t.$activeOption&&(t.onOptionSelect({currentTarget:t.$activeOption}),e.preventDefault()));case c:return void t.advanceSelection(-1,e);case p:return void t.advanceSelection(1,e);case w:return t.settings.selectOnTab&&t.isOpen&&t.$activeOption&&(t.onOptionSelect({currentTarget:t.$activeOption}),t.isFull()||e.preventDefault()),void(t.settings.create&&t.createItem()&&e.preventDefault());case g:case m:return void t.deleteSelection(e)}return!t.isFull()&&!t.isInputHidden||(o?e.metaKey:e.ctrlKey)?void 0:void e.preventDefault()},onKeyUp:function(e){var t=this;if(t.isLocked)return e&&e.preventDefault();var n=t.$control_input.val()||"";t.lastValue!==n&&(t.lastValue=n,t.onSearchChange(n),t.refreshOptions(),t.trigger("type",n))},onSearchChange:function(e){var t=this,n=t.settings.load;n&&(t.loadedSearches.hasOwnProperty(e)||(t.loadedSearches[e]=!0,t.load(function(r){n.apply(t,[e,r])})))},onFocus:function(e){var t=this,n=t.isFocused;return t.isDisabled?(t.blur(),e&&e.preventDefault(),!1):void(t.ignoreFocus||(t.isFocused=!0,"focus"===t.settings.preload&&t.onSearchChange(""),n||t.trigger("focus"),t.$activeItems.length||(t.showInput(),t.setActiveItem(null),t.refreshOptions(!!t.settings.openOnFocus)),t.refreshState()))},onBlur:function(e,t){var n=this;if(n.isFocused&&(n.isFocused=!1,!n.ignoreFocus)){if(!n.ignoreBlur&&document.activeElement===n.$dropdown_content[0])return n.ignoreBlur=!0,void n.onFocus(e);var r=function(){n.close(),n.setTextboxValue(""),n.setActiveItem(null),n.setActiveOption(null),n.setCaret(n.items.length),n.refreshState(),(t||document.body).focus(),n.ignoreFocus=!1,n.trigger("blur")};n.ignoreFocus=!0,n.settings.create&&n.settings.createOnBlur?n.createItem(null,!1,r):r()}},onOptionHover:function(e){this.ignoreHover||this.setActiveOption(e.currentTarget,!1)},onOptionSelect:function(t){var n,r,i=this;t.preventDefault&&(t.preventDefault(),t.stopPropagation()),r=e(t.currentTarget),r.hasClass("create")?i.createItem(null,function(){i.settings.closeAfterSelect&&i.close()}):(n=r.attr("data-value"),"undefined"!=typeof n&&(i.lastQuery=null,i.setTextboxValue(""),i.addItem(n),i.settings.closeAfterSelect?i.close():!i.settings.hideSelected&&t.type&&/mouse/.test(t.type)&&i.setActiveOption(i.getOption(n))))},onItemSelect:function(e){var t=this;t.isLocked||"multi"===t.settings.mode&&(e.preventDefault(),t.setActiveItem(e.currentTarget,e))},load:function(e){var t=this,n=t.$wrapper.addClass(t.settings.loadingClass);t.loading++,e.apply(t,[function(e){t.loading=Math.max(t.loading-1,0),e&&e.length&&(t.addOption(e),t.refreshOptions(t.isFocused&&!t.isInputHidden)),t.loading||n.removeClass(t.settings.loadingClass),t.trigger("load",e)}])},setTextboxValue:function(e){var t=this.$control_input,n=t.val()!==e;n&&(t.val(e).triggerHandler("update"),this.lastValue=e)},getValue:function(){return this.tagType===x&&this.$input.attr("multiple")?this.items:this.items.join(this.settings.delimiter)},setValue:function(e,t){var n=t?[]:["change"];N(this,n,function(){this.clear(t),this.addItems(e,t)})},setActiveItem:function(t,n){var r,i,o,s,a,l,c,u,d=this;if("single"!==d.settings.mode){if(t=e(t),!t.length)return e(d.$activeItems).removeClass("active"),d.$activeItems=[],void(d.isFocused&&d.showInput());if(r=n&&n.type.toLowerCase(),"mousedown"===r&&d.isShiftDown&&d.$activeItems.length){for(u=d.$control.children(".active:last"),s=Array.prototype.indexOf.apply(d.$control[0].childNodes,[u[0]]),a=Array.prototype.indexOf.apply(d.$control[0].childNodes,[t[0]]),s>a&&(c=s,s=a,a=c),i=s;a>=i;i++)l=d.$control[0].childNodes[i],-1===d.$activeItems.indexOf(l)&&(e(l).addClass("active"),d.$activeItems.push(l));n.preventDefault()}else"mousedown"===r&&d.isCtrlDown||"keydown"===r&&this.isShiftDown?t.hasClass("active")?(o=d.$activeItems.indexOf(t[0]),d.$activeItems.splice(o,1),t.removeClass("active")):d.$activeItems.push(t.addClass("active")[0]):(e(d.$activeItems).removeClass("active"),d.$activeItems=[t.addClass("active")[0]]);d.hideInput(),this.isFocused||d.focus()}},setActiveOption:function(t,n,r){var i,o,s,a,l,c=this;c.$activeOption&&c.$activeOption.removeClass("active"),c.$activeOption=null,t=e(t),t.length&&(c.$activeOption=t.addClass("active"),(n||!S(n))&&(i=c.$dropdown_content.height(),o=c.$activeOption.outerHeight(!0),n=c.$dropdown_content.scrollTop()||0,s=c.$activeOption.offset().top-c.$dropdown_content.offset().top+n,a=s,l=s-i+o,s+o>i+n?c.$dropdown_content.stop().animate({scrollTop:l},r?c.settings.scrollDuration:0):n>s&&c.$dropdown_content.stop().animate({scrollTop:a},r?c.settings.scrollDuration:0)))},selectAll:function(){var e=this;"single"!==e.settings.mode&&(e.$activeItems=Array.prototype.slice.apply(e.$control.children(":not(input)").addClass("active")),e.$activeItems.length&&(e.hideInput(),e.close()),e.focus())},hideInput:function(){var e=this;e.setTextboxValue(""),e.$control_input.css({opacity:0,position:"absolute",left:e.rtl?1e4:-1e4}),e.isInputHidden=!0},showInput:function(){this.$control_input.css({opacity:1,position:"relative",left:0}),this.isInputHidden=!1},focus:function(){var e=this;e.isDisabled||(e.ignoreFocus=!0,e.$control_input[0].focus(),window.setTimeout(function(){e.ignoreFocus=!1,e.onFocus()},0))},blur:function(e){this.$control_input[0].blur(),this.onBlur(null,e)},getScoreFunction:function(e){return this.sifter.getScoreFunction(e,this.getSearchOptions())},getSearchOptions:function(){var e=this.settings,t=e.sortField;return"string"==typeof t&&(t=[{field:t}]),{fields:e.searchField,conjunction:e.searchConjunction,sort:t}},search:function(t){var n,r,i,o=this,s=o.settings,a=this.getSearchOptions();if(s.score&&(i=o.settings.score.apply(this,[t]),"function"!=typeof i))throw new Error('Selectize "score" setting must be a function that returns a function');if(t!==o.lastQuery?(o.lastQuery=t,r=o.sifter.search(t,e.extend(a,{score:i})),o.currentResults=r):r=e.extend(!0,{},o.currentResults),s.hideSelected)for(n=r.items.length-1;n>=0;n--)-1!==o.items.indexOf(T(r.items[n].id))&&r.items.splice(n,1);return r},refreshOptions:function(t){var n,i,o,s,a,l,c,u,d,p,f,h,g,m,v,y;"undefined"==typeof t&&(t=!0);var b=this,w=e.trim(b.$control_input.val()),x=b.search(w),C=b.$dropdown_content,k=b.$activeOption&&T(b.$activeOption.attr("data-value"));for(s=x.items.length,"number"==typeof b.settings.maxOptions&&(s=Math.min(s,b.settings.maxOptions)),a={},l=[],n=0;s>n;n++)for(c=b.options[x.items[n].id],u=b.render("option",c),d=c[b.settings.optgroupField]||"",p=e.isArray(d)?d:[d],i=0,o=p&&p.length;o>i;i++)d=p[i],b.optgroups.hasOwnProperty(d)||(d=""),a.hasOwnProperty(d)||(a[d]=[],l.push(d)),a[d].push(u);for(this.settings.lockOptgroupOrder&&l.sort(function(e,t){var n=b.optgroups[e].$order||0,r=b.optgroups[t].$order||0;return n-r}),f=[],n=0,s=l.length;s>n;n++)d=l[n],b.optgroups.hasOwnProperty(d)&&a[d].length?(h=b.render("optgroup_header",b.optgroups[d])||"",h+=a[d].join(""),f.push(b.render("optgroup",e.extend({},b.optgroups[d],{html:h})))):f.push(a[d].join(""));if(C.html(f.join("")),b.settings.highlight&&x.query.length&&x.tokens.length)for(n=0,s=x.tokens.length;s>n;n++)r(C,x.tokens[n].regex);if(!b.settings.hideSelected)for(n=0,s=b.items.length;s>n;n++)b.getOption(b.items[n]).addClass("selected");g=b.canCreate(w),g&&(C.prepend(b.render("option_create",{input:w})),y=e(C[0].childNodes[0])),b.hasOptions=x.items.length>0||g,b.hasOptions?(x.items.length>0?(v=k&&b.getOption(k),v&&v.length?m=v:"single"===b.settings.mode&&b.items.length&&(m=b.getOption(b.items[0])),m&&m.length||(m=y&&!b.settings.addPrecedence?b.getAdjacentOption(y,1):C.find("[data-selectable]:first"))):m=y,b.setActiveOption(m),t&&!b.isOpen&&b.open()):(b.setActiveOption(null),t&&b.isOpen&&b.close())},addOption:function(t){var n,r,i,o=this;if(e.isArray(t))for(n=0,r=t.length;r>n;n++)o.addOption(t[n]);else(i=o.registerOption(t))&&(o.userOptions[i]=!0,o.lastQuery=null,o.trigger("option_add",i,t))},registerOption:function(e){var t=T(e[this.settings.valueField]);return!t||this.options.hasOwnProperty(t)?!1:(e.$order=e.$order||++this.order,this.options[t]=e,t)},registerOptionGroup:function(e){var t=T(e[this.settings.optgroupValueField]);return t?(e.$order=e.$order||++this.order,this.optgroups[t]=e,t):!1},addOptionGroup:function(e,t){t[this.settings.optgroupValueField]=e,(e=this.registerOptionGroup(t))&&this.trigger("optgroup_add",e,t)},removeOptionGroup:function(e){this.optgroups.hasOwnProperty(e)&&(delete this.optgroups[e],this.renderCache={},this.trigger("optgroup_remove",e))},clearOptionGroups:function(){this.optgroups={},this.renderCache={},this.trigger("optgroup_clear")},updateOption:function(t,n){var r,i,o,s,a,l,c,u=this;if(t=T(t),o=T(n[u.settings.valueField]),null!==t&&u.options.hasOwnProperty(t)){if("string"!=typeof o)throw new Error("Value must be set in option data");c=u.options[t].$order,o!==t&&(delete u.options[t],s=u.items.indexOf(t),-1!==s&&u.items.splice(s,1,o)),n.$order=n.$order||c,u.options[o]=n,a=u.renderCache.item,l=u.renderCache.option,a&&(delete a[t],delete a[o]),l&&(delete l[t],delete l[o]),-1!==u.items.indexOf(o)&&(r=u.getItem(t),i=e(u.render("item",n)),r.hasClass("active")&&i.addClass("active"),r.replaceWith(i)),u.lastQuery=null,u.isOpen&&u.refreshOptions(!1)}},removeOption:function(e,t){var n=this;e=T(e);var r=n.renderCache.item,i=n.renderCache.option;r&&delete r[e],i&&delete i[e],delete n.userOptions[e],delete n.options[e],n.lastQuery=null,n.trigger("option_remove",e),n.removeItem(e,t)},clearOptions:function(){var e=this;e.loadedSearches={},e.userOptions={},e.renderCache={},e.options=e.sifter.items={},e.lastQuery=null,e.trigger("option_clear"),e.clear()},getOption:function(e){return this.getElementWithValue(e,this.$dropdown_content.find("[data-selectable]"))},getAdjacentOption:function(t,n){var r=this.$dropdown.find("[data-selectable]"),i=r.index(t)+n;return i>=0&&i<r.length?r.eq(i):e()},getElementWithValue:function(t,n){if(t=T(t),"undefined"!=typeof t&&null!==t)for(var r=0,i=n.length;i>r;r++)if(n[r].getAttribute("data-value")===t)return e(n[r]);return e()},getItem:function(e){return this.getElementWithValue(e,this.$control.children())},addItems:function(t,n){for(var r=e.isArray(t)?t:[t],i=0,o=r.length;o>i;i++)this.isPending=o-1>i,this.addItem(r[i],n)},addItem:function(t,n){var r=n?[]:["change"];N(this,r,function(){var r,i,o,s,a,l=this,c=l.settings.mode;return t=T(t),-1!==l.items.indexOf(t)?void("single"===c&&l.close()):void(l.options.hasOwnProperty(t)&&("single"===c&&l.clear(n),"multi"===c&&l.isFull()||(r=e(l.render("item",l.options[t])),a=l.isFull(),l.items.splice(l.caretPos,0,t),l.insertAtCaret(r),(!l.isPending||!a&&l.isFull())&&l.refreshState(),l.isSetup&&(o=l.$dropdown_content.find("[data-selectable]"),l.isPending||(i=l.getOption(t),s=l.getAdjacentOption(i,1).attr("data-value"),l.refreshOptions(l.isFocused&&"single"!==c),s&&l.setActiveOption(l.getOption(s))),!o.length||l.isFull()?l.close():l.positionDropdown(),l.updatePlaceholder(),l.trigger("item_add",t,r),l.updateOriginalInput({silent:n})))))})},removeItem:function(e,t){var n,r,i,o=this;n="object"==typeof e?e:o.getItem(e),e=T(n.attr("data-value")),r=o.items.indexOf(e),-1!==r&&(n.remove(),n.hasClass("active")&&(i=o.$activeItems.indexOf(n[0]),o.$activeItems.splice(i,1)),o.items.splice(r,1),o.lastQuery=null,!o.settings.persist&&o.userOptions.hasOwnProperty(e)&&o.removeOption(e,t),r<o.caretPos&&o.setCaret(o.caretPos-1),o.refreshState(),o.updatePlaceholder(),o.updateOriginalInput({silent:t}),o.positionDropdown(),o.trigger("item_remove",e,n))},createItem:function(t,n){var r=this,i=r.caretPos;t=t||e.trim(r.$control_input.val()||"");var o=arguments[arguments.length-1];if("function"!=typeof o&&(o=function(){}),"boolean"!=typeof n&&(n=!0),!r.canCreate(t))return o(),!1;r.lock();var s="function"==typeof r.settings.create?this.settings.create:function(e){var t={};return t[r.settings.labelField]=e,t[r.settings.valueField]=e,t},a=A(function(e){if(r.unlock(),!e||"object"!=typeof e)return o();var t=T(e[r.settings.valueField]);return"string"!=typeof t?o():(r.setTextboxValue(""),r.addOption(e),r.setCaret(i),r.addItem(t),r.refreshOptions(n&&"single"!==r.settings.mode),void o(e))}),l=s.apply(this,[t,a]);return"undefined"!=typeof l&&a(l),!0},refreshItems:function(){this.lastQuery=null,this.isSetup&&this.addItem(this.items),this.refreshState(),this.updateOriginalInput()},refreshState:function(){var e,t=this;t.isRequired&&(t.items.length&&(t.isInvalid=!1),t.$control_input.prop("required",e)),t.refreshClasses()},refreshClasses:function(){var t=this,n=t.isFull(),r=t.isLocked;t.$wrapper.toggleClass("rtl",t.rtl),t.$control.toggleClass("focus",t.isFocused).toggleClass("disabled",t.isDisabled).toggleClass("required",t.isRequired).toggleClass("invalid",t.isInvalid).toggleClass("locked",r).toggleClass("full",n).toggleClass("not-full",!n).toggleClass("input-active",t.isFocused&&!t.isInputHidden).toggleClass("dropdown-active",t.isOpen).toggleClass("has-options",!e.isEmptyObject(t.options)).toggleClass("has-items",t.items.length>0),t.$control_input.data("grow",!n&&!r)},isFull:function(){return null!==this.settings.maxItems&&this.items.length>=this.settings.maxItems},updateOriginalInput:function(e){var t,n,r,i,o=this;if(e=e||{},o.tagType===x){for(r=[],t=0,n=o.items.length;n>t;t++)i=o.options[o.items[t]][o.settings.labelField]||"",r.push('<option value="'+E(o.items[t])+'" selected="selected">'+E(i)+"</option>");r.length||this.$input.attr("multiple")||r.push('<option value="" selected="selected"></option>'),o.$input.html(r.join(""))}else o.$input.val(o.getValue()),o.$input.attr("value",o.$input.val());o.isSetup&&(e.silent||o.trigger("change",o.$input.val()))},updatePlaceholder:function(){if(this.settings.placeholder){var e=this.$control_input;this.items.length?e.removeAttr("placeholder"):e.attr("placeholder",this.settings.placeholder),e.triggerHandler("update",{force:!0})}},open:function(){var e=this;e.isLocked||e.isOpen||"multi"===e.settings.mode&&e.isFull()||(e.focus(),e.isOpen=!0,e.refreshState(),e.$dropdown.css({visibility:"hidden",display:"block"}),e.positionDropdown(),e.$dropdown.css({visibility:"visible"}),e.trigger("dropdown_open",e.$dropdown))},close:function(){var e=this,t=e.isOpen;"single"===e.settings.mode&&e.items.length&&e.hideInput(),e.isOpen=!1,e.$dropdown.hide(),e.setActiveOption(null),e.refreshState(),t&&e.trigger("dropdown_close",e.$dropdown)},positionDropdown:function(){var e=this.$control,t="body"===this.settings.dropdownParent?e.offset():e.position();t.top+=e.outerHeight(!0),this.$dropdown.css({width:e.outerWidth(),top:t.top,left:t.left})},clear:function(e){var t=this;t.items.length&&(t.$control.children(":not(input)").remove(),t.items=[],t.lastQuery=null,t.setCaret(0),t.setActiveItem(null),t.updatePlaceholder(),t.updateOriginalInput({silent:e}),t.refreshState(),t.showInput(),t.trigger("clear"))},insertAtCaret:function(t){var n=Math.min(this.caretPos,this.items.length);0===n?this.$control.prepend(t):e(this.$control[0].childNodes[n]).before(t),this.setCaret(n+1)},deleteSelection:function(t){var n,r,i,o,s,a,l,c,u,d=this;if(i=t&&t.keyCode===g?-1:1,o=I(d.$control_input[0]),d.$activeOption&&!d.settings.hideSelected&&(l=d.getAdjacentOption(d.$activeOption,-1).attr("data-value")),s=[],d.$activeItems.length){for(u=d.$control.children(".active:"+(i>0?"last":"first")),a=d.$control.children(":not(input)").index(u),i>0&&a++,n=0,r=d.$activeItems.length;r>n;n++)s.push(e(d.$activeItems[n]).attr("data-value"));t&&(t.preventDefault(),t.stopPropagation())}else(d.isFocused||"single"===d.settings.mode)&&d.items.length&&(0>i&&0===o.start&&0===o.length?s.push(d.items[d.caretPos-1]):i>0&&o.start===d.$control_input.val().length&&s.push(d.items[d.caretPos]));if(!s.length||"function"==typeof d.settings.onDelete&&d.settings.onDelete.apply(d,[s])===!1)return!1;for("undefined"!=typeof a&&d.setCaret(a);s.length;)d.removeItem(s.pop());return d.showInput(),d.positionDropdown(),d.refreshOptions(!0),l&&(c=d.getOption(l),c.length&&d.setActiveOption(c)),!0},advanceSelection:function(e,t){var n,r,i,o,s,a,l=this;0!==e&&(l.rtl&&(e*=-1),n=e>0?"last":"first",r=I(l.$control_input[0]),l.isFocused&&!l.isInputHidden?(o=l.$control_input.val().length,s=0>e?0===r.start&&0===r.length:r.start===o,s&&!o&&l.advanceCaret(e,t)):(a=l.$control.children(".active:"+n),a.length&&(i=l.$control.children(":not(input)").index(a),l.setActiveItem(null),l.setCaret(e>0?i+1:i))))},advanceCaret:function(e,t){var n,r,i=this;0!==e&&(n=e>0?"next":"prev",i.isShiftDown?(r=i.$control_input[n](),r.length&&(i.hideInput(),i.setActiveItem(r),t&&t.preventDefault())):i.setCaret(i.caretPos+e))},setCaret:function(t){var n=this;if(t="single"===n.settings.mode?n.items.length:Math.max(0,Math.min(n.items.length,t)),!n.isPending){var r,i,o,s;for(o=n.$control.children(":not(input)"),r=0,i=o.length;i>r;r++)s=e(o[r]).detach(),t>r?n.$control_input.before(s):n.$control.append(s)}n.caretPos=t},lock:function(){this.close(),this.isLocked=!0,this.refreshState()},unlock:function(){this.isLocked=!1,this.refreshState()},disable:function(){var e=this;e.$input.prop("disabled",!0),e.$control_input.prop("disabled",!0).prop("tabindex",-1),e.isDisabled=!0,e.lock()},enable:function(){var e=this;e.$input.prop("disabled",!1),e.$control_input.prop("disabled",!1).prop("tabindex",e.tabIndex),e.isDisabled=!1,e.unlock()},destroy:function(){var t=this,n=t.eventNS,r=t.revertSettings;t.trigger("destroy"),t.off(),t.$wrapper.remove(),t.$dropdown.remove(),t.$input.html("").append(r.$children).removeAttr("tabindex").removeClass("selectized").attr({tabindex:r.tabindex}).show(),t.$control_input.removeData("grow"),t.$input.removeData("selectize"),e(window).off(n),e(document).off(n),e(document.body).off(n),delete t.$input[0].selectize},render:function(e,t){var n,r,i="",o=!1,s=this,a=/^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;return("option"===e||"item"===e)&&(n=T(t[s.settings.valueField]),o=!!n),o&&(S(s.renderCache[e])||(s.renderCache[e]={}),s.renderCache[e].hasOwnProperty(n))?s.renderCache[e][n]:(i=s.settings.render[e].apply(this,[t,E]),("option"===e||"option_create"===e)&&(i=i.replace(a,"<$1 data-selectable")),"optgroup"===e&&(r=t[s.settings.optgroupValueField]||"",i=i.replace(a,'<$1 data-group="'+O(E(r))+'"')),("option"===e||"item"===e)&&(i=i.replace(a,'<$1 data-value="'+O(E(n||""))+'"')),o&&(s.renderCache[e][n]=i),i)},clearCache:function(e){var t=this;"undefined"==typeof e?t.renderCache={}:delete t.renderCache[e]},canCreate:function(e){var t=this;if(!t.settings.create)return!1;var n=t.settings.createFilter;return!(!e.length||"function"==typeof n&&!n.apply(t,[e])||"string"==typeof n&&!new RegExp(n).test(e)||n instanceof RegExp&&!n.test(e))}}),_.count=0,_.defaults={options:[],optgroups:[],plugins:[],delimiter:",",splitOn:null,persist:!0,diacritics:!0,create:!1,createOnBlur:!1,createFilter:null,highlight:!0,openOnFocus:!0,maxOptions:1e3,maxItems:null,hideSelected:null,addPrecedence:!1,selectOnTab:!1,preload:!1,allowEmptyOption:!1,closeAfterSelect:!1,scrollDuration:60,loadThrottle:300,loadingClass:"loading",dataAttr:"data-data",optgroupField:"optgroup",valueField:"value",labelField:"text",optgroupLabelField:"label",optgroupValueField:"value",lockOptgroupOrder:!1,sortField:"$order",searchField:["text"],searchConjunction:"and",mode:null,wrapperClass:"selectize-control",inputClass:"selectize-input",dropdownClass:"selectize-dropdown",dropdownContentClass:"selectize-dropdown-content",dropdownParent:null,copyClassesToDropdown:!0,render:{}},e.fn.selectize=function(t){var n=e.fn.selectize.defaults,r=e.extend({},n,t),i=r.dataAttr,o=r.labelField,s=r.valueField,a=r.optgroupField,l=r.optgroupLabelField,c=r.optgroupValueField,u=function(t,n){var a,l,c,u,d=t.attr(i);if(d)for(n.options=JSON.parse(d),a=0,l=n.options.length;l>a;a++)n.items.push(n.options[a][s]);else{var p=e.trim(t.val()||"");if(!r.allowEmptyOption&&!p.length)return;for(c=p.split(r.delimiter),a=0,l=c.length;l>a;a++)u={},u[o]=c[a],u[s]=c[a],n.options.push(u);n.items=c}},d=function(t,n){var u,d,p,f,h=n.options,g={},m=function(e){var t=i&&e.attr(i);return"string"==typeof t&&t.length?JSON.parse(t):null},v=function(t,i){t=e(t);var l=T(t.attr("value"));if(l||r.allowEmptyOption)if(g.hasOwnProperty(l)){if(i){var c=g[l][a];c?e.isArray(c)?c.push(i):g[l][a]=[c,i]:g[l][a]=i}}else{var u=m(t)||{};u[o]=u[o]||t.text(),u[s]=u[s]||l,u[a]=u[a]||i,g[l]=u,h.push(u),t.is(":selected")&&n.items.push(l)}},y=function(t){var r,i,o,s,a;for(t=e(t),o=t.attr("label"),o&&(s=m(t)||{},s[l]=o,s[c]=o,n.optgroups.push(s)),a=e("option",t),r=0,i=a.length;i>r;r++)v(a[r],o)};for(n.maxItems=t.attr("multiple")?null:1,f=t.children(),u=0,d=f.length;d>u;u++)p=f[u].tagName.toLowerCase(),"optgroup"===p?y(f[u]):"option"===p&&v(f[u])};return this.each(function(){if(!this.selectize){var i,o=e(this),s=this.tagName.toLowerCase(),a=o.attr("placeholder")||o.attr("data-placeholder");a||r.allowEmptyOption||(a=o.children('option[value=""]').text());var l={placeholder:a,options:[],optgroups:[],items:[]};"select"===s?d(o,l):u(o,l),i=new _(o,e.extend(!0,{},n,l,t))}})},e.fn.selectize.defaults=_.defaults,e.fn.selectize.support={validity:k},_.define("drag_drop",function(t){if(!e.fn.sortable)throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');if("multi"===this.settings.mode){var n=this;n.lock=function(){var e=n.lock;return function(){var t=n.$control.data("sortable");return t&&t.disable(),e.apply(n,arguments)}}(),n.unlock=function(){var e=n.unlock;return function(){var t=n.$control.data("sortable");return t&&t.enable(),e.apply(n,arguments)}}(),n.setup=function(){var t=n.setup;return function(){t.apply(this,arguments);var r=n.$control.sortable({items:"[data-value]",forcePlaceholderSize:!0,disabled:n.isLocked,start:function(e,t){t.placeholder.css("width",t.helper.css("width")),r.css({overflow:"visible"})},stop:function(){r.css({overflow:"hidden"});var t=n.$activeItems?n.$activeItems.slice():null,i=[];r.children("[data-value]").each(function(){i.push(e(this).attr("data-value"))}),n.setValue(i),n.setActiveItem(t)}})}}()}}),_.define("dropdown_header",function(t){var n=this;t=e.extend({title:"Untitled",headerClass:"selectize-dropdown-header",titleRowClass:"selectize-dropdown-header-title",labelClass:"selectize-dropdown-header-label",closeClass:"selectize-dropdown-header-close",html:function(e){return'<div class="'+e.headerClass+'"><div class="'+e.titleRowClass+'"><span class="'+e.labelClass+'">'+e.title+'</span><a href="javascript:void(0)" class="'+e.closeClass+'">&times;</a></div></div>';

}},t),n.setup=function(){var r=n.setup;return function(){r.apply(n,arguments),n.$dropdown_header=e(t.html(t)),n.$dropdown.prepend(n.$dropdown_header)}}()}),_.define("optgroup_columns",function(t){var n=this;t=e.extend({equalizeWidth:!0,equalizeHeight:!0},t),this.getAdjacentOption=function(t,n){var r=t.closest("[data-group]").find("[data-selectable]"),i=r.index(t)+n;return i>=0&&i<r.length?r.eq(i):e()},this.onKeyDown=function(){var e=n.onKeyDown;return function(t){var r,i,o,s;return!this.isOpen||t.keyCode!==c&&t.keyCode!==p?e.apply(this,arguments):(n.ignoreHover=!0,s=this.$activeOption.closest("[data-group]"),r=s.find("[data-selectable]").index(this.$activeOption),s=t.keyCode===c?s.prev("[data-group]"):s.next("[data-group]"),o=s.find("[data-selectable]"),i=o.eq(Math.min(o.length-1,r)),void(i.length&&this.setActiveOption(i)))}}();var r=function(){var e,t=r.width,n=document;return"undefined"==typeof t&&(e=n.createElement("div"),e.innerHTML='<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>',e=e.firstChild,n.body.appendChild(e),t=r.width=e.offsetWidth-e.clientWidth,n.body.removeChild(e)),t},i=function(){var i,o,s,a,l,c,u;if(u=e("[data-group]",n.$dropdown_content),o=u.length,o&&n.$dropdown_content.width()){if(t.equalizeHeight){for(s=0,i=0;o>i;i++)s=Math.max(s,u.eq(i).height());u.css({height:s})}t.equalizeWidth&&(c=n.$dropdown_content.innerWidth()-r(),a=Math.round(c/o),u.css({width:a}),o>1&&(l=c-a*(o-1),u.eq(o-1).css({width:l})))}};(t.equalizeHeight||t.equalizeWidth)&&(P.after(this,"positionDropdown",i),P.after(this,"refreshOptions",i))}),_.define("remove_button",function(t){if("single"!==this.settings.mode){t=e.extend({label:"&times;",title:"Remove",className:"remove",append:!0},t);var n=this,r='<a href="javascript:void(0)" class="'+t.className+'" tabindex="-1" title="'+E(t.title)+'">'+t.label+"</a>",i=function(e,t){var n=e.search(/(<\/[^>]+>\s*)$/);return e.substring(0,n)+t+e.substring(n)};this.setup=function(){var o=n.setup;return function(){if(t.append){var s=n.settings.render.item;n.settings.render.item=function(e){return i(s.apply(this,arguments),r)}}o.apply(this,arguments),this.$control.on("click","."+t.className,function(t){if(t.preventDefault(),!n.isLocked){var r=e(t.currentTarget).parent();n.setActiveItem(r),n.deleteSelection()&&n.setCaret(n.items.length)}})}}()}}),_.define("restore_on_backspace",function(e){var t=this;e.text=e.text||function(e){return e[this.settings.labelField]},this.onKeyDown=function(){var n=t.onKeyDown;return function(t){var r,i;return t.keyCode===g&&""===this.$control_input.val()&&!this.$activeItems.length&&(r=this.caretPos-1,r>=0&&r<this.items.length)?(i=this.options[this.items[r]],this.deleteSelection(t)&&(this.setTextboxValue(e.text.apply(this,[i])),this.refreshOptions(!0)),void t.preventDefault()):n.apply(this,arguments)}}()}),_}),function(){function e(t){var n=e.modules[t];if(!n)throw new Error('failed to require "'+t+'"');return"exports"in n||"function"!=typeof n.definition||(n.client=n.component=!0,n.definition.call(this,n.exports={},n),delete n.definition),n.exports}e.loader="component",e.helper={},e.helper.semVerSort=function(e,t){for(var n=e.version.split("."),r=t.version.split("."),i=0;i<n.length;++i){var o=parseInt(n[i],10),s=parseInt(r[i],10);if(o!==s)return o>s?1:-1;var a=n[i].substr((""+o).length),l=r[i].substr((""+s).length);if(""===a&&""!==l)return 1;if(""!==a&&""===l)return-1;if(""!==a&&""!==l)return a>l?1:-1}return 0},e.latest=function(t,n){function r(e){throw new Error('failed to find latest module of "'+e+'"')}var i=/(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/,o=/(.*)~(.*)/;o.test(t)||r(t);for(var s=Object.keys(e.modules),a=[],l=[],c=0;c<s.length;c++){var u=s[c];if(new RegExp(t+"@").test(u)){var d=u.substr(t.length+1),p=i.exec(u);null!=p?a.push({version:d,name:u}):l.push({version:d,name:u})}}if(0===a.concat(l).length&&r(t),a.length>0){var f=a.sort(e.helper.semVerSort).pop().name;return n===!0?f:e(f)}var f=l.sort(function(e,t){return e.name>t.name})[0].name;return n===!0?f:e(f)},e.modules={},e.register=function(t,n){e.modules[t]={definition:n}},e.define=function(t,n){e.modules[t]={exports:n}},e.register("abpetkov~transitionize@0.0.3",function(e,t){function n(e,t){return this instanceof n?(this.element=e,this.props=t||{},void this.init()):new n(e,t)}t.exports=n,n.prototype.isSafari=function(){return/Safari/.test(navigator.userAgent)&&/Apple Computer/.test(navigator.vendor)},n.prototype.init=function(){var e=[];for(var t in this.props)e.push(t+" "+this.props[t]);this.element.style.transition=e.join(", "),this.isSafari()&&(this.element.style.webkitTransition=e.join(", "))}}),e.register("ftlabs~fastclick@v0.6.11",function(e,t){function n(e){"use strict";var t,r=this;if(this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=10,this.layer=e,!e||!e.nodeType)throw new TypeError("Layer must be a document node");this.onClick=function(){return n.prototype.onClick.apply(r,arguments)},this.onMouse=function(){return n.prototype.onMouse.apply(r,arguments)},this.onTouchStart=function(){return n.prototype.onTouchStart.apply(r,arguments)},this.onTouchMove=function(){return n.prototype.onTouchMove.apply(r,arguments)},this.onTouchEnd=function(){return n.prototype.onTouchEnd.apply(r,arguments)},this.onTouchCancel=function(){return n.prototype.onTouchCancel.apply(r,arguments)},n.notNeeded(e)||(this.deviceIsAndroid&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,r){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,r):i.call(e,t,n,r)},e.addEventListener=function(t,n,r){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),r):i.call(e,t,n,r)}),"function"==typeof e.onclick&&(t=e.onclick,e.addEventListener("click",function(e){t(e)},!1),e.onclick=null))}n.prototype.deviceIsAndroid=navigator.userAgent.indexOf("Android")>0,n.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent),n.prototype.deviceIsIOS4=n.prototype.deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),n.prototype.deviceIsIOSWithBadTarget=n.prototype.deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),n.prototype.needsClick=function(e){"use strict";switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(this.deviceIsIOS&&"file"===e.type||e.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(e.className)},n.prototype.needsFocus=function(e){"use strict";switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!this.deviceIsAndroid;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},n.prototype.sendClick=function(e,t){"use strict";var n,r;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),r=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,r.screenX,r.screenY,r.clientX,r.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},n.prototype.determineEventType=function(e){"use strict";return this.deviceIsAndroid&&"select"===e.tagName.toLowerCase()?"mousedown":"click"},n.prototype.focus=function(e){"use strict";var t;this.deviceIsIOS&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},n.prototype.updateScrollParent=function(e){"use strict";var t,n;if(t=e.fastClickScrollParent,!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)},n.prototype.getTargetElementFromEventTarget=function(e){"use strict";return e.nodeType===Node.TEXT_NODE?e.parentNode:e},n.prototype.onTouchStart=function(e){"use strict";var t,n,r;if(e.targetTouches.length>1)return!0;if(t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0],this.deviceIsIOS){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!this.deviceIsIOS4){if(n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<200&&e.preventDefault(),!0},n.prototype.touchHasMoved=function(e){"use strict";var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n?!0:!1},n.prototype.onTouchMove=function(e){"use strict";return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},n.prototype.findControl=function(e){"use strict";return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},n.prototype.onTouchEnd=function(e){"use strict";var t,n,r,i,o,s=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<200)return this.cancelNextClick=!0,!0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,n=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,this.deviceIsIOSWithBadTarget&&(o=e.changedTouches[0],s=document.elementFromPoint(o.pageX-window.pageXOffset,o.pageY-window.pageYOffset)||s,s.fastClickScrollParent=this.targetElement.fastClickScrollParent),r=s.tagName.toLowerCase(),"label"===r){if(t=this.findControl(s)){if(this.focus(s),this.deviceIsAndroid)return!1;s=t}}else if(this.needsFocus(s))return e.timeStamp-n>100||this.deviceIsIOS&&window.top!==window&&"input"===r?(this.targetElement=null,!1):(this.focus(s),this.deviceIsIOS4&&"select"===r||(this.targetElement=null,e.preventDefault()),!1);return this.deviceIsIOS&&!this.deviceIsIOS4&&(i=s.fastClickScrollParent,i&&i.fastClickLastScrollTop!==i.scrollTop)?!0:(this.needsClick(s)||(e.preventDefault(),this.sendClick(s,e)),!1)},n.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},n.prototype.onMouse=function(e){"use strict";return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0},n.prototype.onClick=function(e){"use strict";var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===e.target.type&&0===e.detail?!0:(t=this.onMouse(e),t||(this.targetElement=null),t)},n.prototype.destroy=function(){"use strict";var e=this.layer;this.deviceIsAndroid&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},n.notNeeded=function(e){"use strict";var t,r;if("undefined"==typeof window.ontouchstart)return!0;if(r=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n.prototype.deviceIsAndroid)return!0;if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(r>31&&window.innerWidth<=window.screen.width)return!0}}return"none"===e.style.msTouchAction?!0:!1},n.attach=function(e){"use strict";return new n(e)},"undefined"!=typeof define&&define.amd?define(function(){"use strict";return n}):"undefined"!=typeof t&&t.exports?(t.exports=n.attach,t.exports.FastClick=n):window.FastClick=n}),e.register("component~indexof@0.0.3",function(e,t){t.exports=function(e,t){if(e.indexOf)return e.indexOf(t);for(var n=0;n<e.length;++n)if(e[n]===t)return n;return-1}}),e.register("component~classes@1.2.1",function(t,n){function r(e){if(!e)throw new Error("A DOM element reference is required");this.el=e,this.list=e.classList}var i=e("component~indexof@0.0.3"),o=/\s+/,s=Object.prototype.toString;n.exports=function(e){return new r(e)},r.prototype.add=function(e){if(this.list)return this.list.add(e),this;var t=this.array(),n=i(t,e);return~n||t.push(e),this.el.className=t.join(" "),this},r.prototype.remove=function(e){if("[object RegExp]"==s.call(e))return this.removeMatching(e);if(this.list)return this.list.remove(e),this;var t=this.array(),n=i(t,e);return~n&&t.splice(n,1),this.el.className=t.join(" "),this},r.prototype.removeMatching=function(e){for(var t=this.array(),n=0;n<t.length;n++)e.test(t[n])&&this.remove(t[n]);return this},r.prototype.toggle=function(e,t){return this.list?("undefined"!=typeof t?t!==this.list.toggle(e,t)&&this.list.toggle(e):this.list.toggle(e),this):("undefined"!=typeof t?t?this.add(e):this.remove(e):this.has(e)?this.remove(e):this.add(e),this)},r.prototype.array=function(){var e=this.el.className.replace(/^\s+|\s+$/g,""),t=e.split(o);return""===t[0]&&t.shift(),t},r.prototype.has=r.prototype.contains=function(e){return this.list?this.list.contains(e):!!~i(this.array(),e)}}),e.register("component~event@0.1.4",function(e,t){var n=window.addEventListener?"addEventListener":"attachEvent",r=window.removeEventListener?"removeEventListener":"detachEvent",i="addEventListener"!==n?"on":"";e.bind=function(e,t,r,o){return e[n](i+t,r,o||!1),r},e.unbind=function(e,t,n,o){return e[r](i+t,n,o||!1),n}}),e.register("component~query@0.0.3",function(e,t){function n(e,t){return t.querySelector(e)}e=t.exports=function(e,t){return t=t||document,n(e,t)},e.all=function(e,t){return t=t||document,t.querySelectorAll(e)},e.engine=function(t){if(!t.one)throw new Error(".one callback required");if(!t.all)throw new Error(".all callback required");return n=t.one,e.all=t.all,e}}),e.register("component~matches-selector@0.1.5",function(t,n){function r(e,t){if(!e||1!==e.nodeType)return!1;if(s)return s.call(e,t);for(var n=i.all(t,e.parentNode),r=0;r<n.length;++r)if(n[r]==e)return!0;return!1}var i=e("component~query@0.0.3"),o=Element.prototype,s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.msMatchesSelector||o.oMatchesSelector;n.exports=r}),e.register("component~closest@0.1.4",function(t,n){var r=e("component~matches-selector@0.1.5");n.exports=function(e,t,n,i){for(e=n?{parentNode:e}:e,i=i||document;(e=e.parentNode)&&e!==document;){if(r(e,t))return e;if(e===i)return}}}),e.register("component~delegate@0.2.3",function(t,n){var r=e("component~closest@0.1.4"),i=e("component~event@0.1.4");t.bind=function(e,t,n,o,s){return i.bind(e,n,function(n){var i=n.target||n.srcElement;n.delegateTarget=r(i,t,!0,e),n.delegateTarget&&o.call(e,n)},s)},t.unbind=function(e,t,n,r){i.unbind(e,t,n,r)}}),e.register("component~events@1.0.9",function(t,n){function r(e,t){if(!(this instanceof r))return new r(e,t);if(!e)throw new Error("element required");if(!t)throw new Error("object required");this.el=e,this.obj=t,this._events={}}function i(e){var t=e.split(/ +/);return{name:t.shift(),selector:t.join(" ")}}var o=e("component~event@0.1.4"),s=e("component~delegate@0.2.3");n.exports=r,r.prototype.sub=function(e,t,n){this._events[e]=this._events[e]||{},this._events[e][t]=n},r.prototype.bind=function(e,t){function n(){var e=[].slice.call(arguments).concat(u);l[t].apply(l,e)}var r=i(e),a=this.el,l=this.obj,c=r.name,t=t||"on"+c,u=[].slice.call(arguments,2);return r.selector?n=s.bind(a,r.selector,c,n):o.bind(a,c,n),this.sub(c,t,n),n},r.prototype.unbind=function(e,t){if(0==arguments.length)return this.unbindAll();if(1==arguments.length)return this.unbindAllOf(e);var n=this._events[e];if(n){var r=n[t];r&&o.unbind(this.el,e,r)}},r.prototype.unbindAll=function(){for(var e in this._events)this.unbindAllOf(e)},r.prototype.unbindAllOf=function(e){var t=this._events[e];if(t)for(var n in t)this.unbind(e,n)}}),e.register("switchery",function(t,n){function r(e,t){if(!(this instanceof r))return new r(e,t);this.element=e,this.options=t||{};for(var n in l)null==this.options[n]&&(this.options[n]=l[n]);null!=this.element&&"checkbox"==this.element.type&&this.init(),this.isDisabled()===!0&&this.disable()}var i=e("abpetkov~transitionize@0.0.3"),o=e("ftlabs~fastclick@v0.6.11"),s=e("component~classes@1.2.1"),a=e("component~events@1.0.9");n.exports=r;var l={color:"#64bd63",secondaryColor:"#dfdfdf",jackColor:"#fff",jackSecondaryColor:null,className:"switchery",disabled:!1,disabledOpacity:.5,speed:"0.4s",size:"default"};r.prototype.hide=function(){this.element.style.display="none"},r.prototype.show=function(){var e=this.create();this.insertAfter(this.element,e)},r.prototype.create=function(){return this.switcher=document.createElement("span"),this.jack=document.createElement("small"),this.switcher.appendChild(this.jack),this.switcher.className=this.options.className,this.events=a(this.switcher,this),this.switcher},r.prototype.insertAfter=function(e,t){e.parentNode.insertBefore(t,e.nextSibling)},r.prototype.setPosition=function(e){var t=this.isChecked(),n=this.switcher,r=this.jack;e&&t?t=!1:e&&!t&&(t=!0),t===!0?(this.element.checked=!0,r.style.left=window.getComputedStyle?parseInt(window.getComputedStyle(n).width)-parseInt(window.getComputedStyle(r).width)+"px":parseInt(n.currentStyle.width)-parseInt(r.currentStyle.width)+"px",this.options.color&&this.colorize(),this.setSpeed()):(r.style.left=0,this.element.checked=!1,this.switcher.style.boxShadow="inset 0 0 0 0 "+this.options.secondaryColor,this.switcher.style.borderColor=this.options.secondaryColor,this.switcher.style.backgroundColor=this.options.secondaryColor!==l.secondaryColor?this.options.secondaryColor:"#fff",this.jack.style.backgroundColor=this.options.jackSecondaryColor!==this.options.jackColor?this.options.jackSecondaryColor:this.options.jackColor,this.setSpeed())},r.prototype.setSpeed=function(){var e={},t={"background-color":this.options.speed,left:this.options.speed.replace(/[a-z]/,"")/2+"s"};e=this.isChecked()?{border:this.options.speed,"box-shadow":this.options.speed,"background-color":3*this.options.speed.replace(/[a-z]/,"")+"s"}:{border:this.options.speed,"box-shadow":this.options.speed},i(this.switcher,e),i(this.jack,t)},r.prototype.setSize=function(){var e="switchery-small",t="switchery-default",n="switchery-large";switch(this.options.size){case"small":s(this.switcher).add(e);break;case"large":s(this.switcher).add(n);break;default:s(this.switcher).add(t)}},r.prototype.colorize=function(){var e=this.switcher.offsetHeight/2;this.switcher.style.backgroundColor=this.options.color,this.switcher.style.borderColor=this.options.color,this.switcher.style.boxShadow="inset 0 0 0 "+e+"px "+this.options.color,this.jack.style.backgroundColor=this.options.jackColor},r.prototype.handleOnchange=function(e){if(document.dispatchEvent){var t=document.createEvent("HTMLEvents");t.initEvent("change",!0,!0),this.element.dispatchEvent(t)}else this.element.fireEvent("onchange")},r.prototype.handleChange=function(){var e=this,t=this.element;t.addEventListener?t.addEventListener("change",function(){e.setPosition()}):t.attachEvent("onchange",function(){e.setPosition()})},r.prototype.handleClick=function(){var e=this.switcher;o(e),this.events.bind("click","bindClick")},r.prototype.bindClick=function(){var e=this.element.parentNode.tagName.toLowerCase(),t="label"===e?!1:!0;this.setPosition(t),this.handleOnchange(this.element.checked)},r.prototype.markAsSwitched=function(){this.element.setAttribute("data-switchery",!0)},r.prototype.markedAsSwitched=function(){return this.element.getAttribute("data-switchery")},r.prototype.init=function(){this.hide(),this.show(),this.setSize(),this.setPosition(),this.markAsSwitched(),this.handleChange(),this.handleClick()},r.prototype.isChecked=function(){return this.element.checked},r.prototype.isDisabled=function(){return this.options.disabled||this.element.disabled||this.element.readOnly},r.prototype.destroy=function(){this.events.unbind()},r.prototype.enable=function(){this.options.disabled&&(this.options.disabled=!1),this.element.disabled&&(this.element.disabled=!1),this.element.readOnly&&(this.element.readOnly=!1),this.switcher.style.opacity=1,this.events.bind("click","bindClick")},r.prototype.disable=function(){this.options.disabled||(this.options.disabled=!0),this.element.disabled||(this.element.disabled=!0),this.element.readOnly||(this.element.readOnly=!0),this.switcher.style.opacity=this.options.disabledOpacity,this.destroy()}}),"object"==typeof exports?module.exports=e("switchery"):"function"==typeof define&&define.amd?define("Switchery",[],function(){return e("switchery")}):(this||window).Switchery=e("switchery")}(),self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{};var Prism=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{encode:function(e){return e instanceof n?new n(e.type,t.util.encode(e.content),e.alias):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var r={};for(var i in e)e.hasOwnProperty(i)&&(r[i]=t.util.clone(e[i]));return r;case"Array":return e.map(function(e){return t.util.clone(e)})}return e}},languages:{extend:function(e,n){var r=t.util.clone(t.languages[e]);for(var i in n)r[i]=n[i];return r},insertBefore:function(e,n,r,i){i=i||t.languages;var o=i[e];if(2==arguments.length){r=arguments[1];for(var s in r)r.hasOwnProperty(s)&&(o[s]=r[s]);return o}var a={};for(var l in o)if(o.hasOwnProperty(l)){if(l==n)for(var s in r)r.hasOwnProperty(s)&&(a[s]=r[s]);a[l]=o[l]}return t.languages.DFS(t.languages,function(t,n){n===i[e]&&t!=e&&(this[t]=a)}),i[e]=a},DFS:function(e,n,r){for(var i in e)e.hasOwnProperty(i)&&(n.call(e,i,e[i],r||i),"Object"===t.util.type(e[i])?t.languages.DFS(e[i],n):"Array"===t.util.type(e[i])&&t.languages.DFS(e[i],n,i))}},highlightAll:function(e,n){for(var r,i=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),o=0;r=i[o++];)t.highlightElement(r,e===!0,n)},highlightElement:function(r,i,o){for(var s,a,l=r;l&&!e.test(l.className);)l=l.parentNode;if(l&&(s=(l.className.match(e)||[,""])[1],a=t.languages[s]),r.className=r.className.replace(e,"").replace(/\s+/g," ")+" language-"+s,l=r.parentNode,/pre/i.test(l.nodeName)&&(l.className=l.className.replace(e,"").replace(/\s+/g," ")+" language-"+s),a){var c=r.textContent;if(c){c=c.replace(/^(?:\r?\n|\r)/,"");var u={element:r,language:s,grammar:a,code:c};if(t.hooks.run("before-highlight",u),i&&self.Worker){var d=new Worker(t.filename);d.onmessage=function(e){u.highlightedCode=n.stringify(JSON.parse(e.data),s),t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,o&&o.call(u.element),t.hooks.run("after-highlight",u)},d.postMessage(JSON.stringify({language:u.language,code:u.code}))}else u.highlightedCode=t.highlight(u.code,u.grammar,u.language),t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,o&&o.call(r),t.hooks.run("after-highlight",u)}}},highlight:function(e,r,i){var o=t.tokenize(e,r);return n.stringify(t.util.encode(o),i)},tokenize:function(e,n,r){var i=t.Token,o=[e],s=n.rest;if(s){for(var a in s)n[a]=s[a];delete n.rest}e:for(var a in n)if(n.hasOwnProperty(a)&&n[a]){var l=n[a];l="Array"===t.util.type(l)?l:[l];for(var c=0;c<l.length;++c){var u=l[c],d=u.inside,p=!!u.lookbehind,f=0,h=u.alias;u=u.pattern||u;for(var g=0;g<o.length;g++){var m=o[g];if(o.length>e.length)break e;if(!(m instanceof i)){u.lastIndex=0;var v=u.exec(m);if(v){p&&(f=v[1].length);var y=v.index-1+f,v=v[0].slice(f),b=v.length,w=y+b,x=m.slice(0,y+1),C=m.slice(w+1),k=[g,1];x&&k.push(x);var S=new i(a,d?t.tokenize(v,d):v,h);k.push(S),C&&k.push(C),Array.prototype.splice.apply(o,k)}}}}}return o},hooks:{all:{},add:function(e,n){var r=t.hooks.all;r[e]=r[e]||[],r[e].push(n)},run:function(e,n){var r=t.hooks.all[e];if(r&&r.length)for(var i,o=0;i=r[o++];)i(n)}}},n=t.Token=function(e,t,n){this.type=e,this.content=t,this.alias=n};if(n.stringify=function(e,r,i){if("string"==typeof e)return e;if("Array"===t.util.type(e))return e.map(function(t){return n.stringify(t,r,e)}).join("");var o={type:e.type,content:n.stringify(e.content,r,i),tag:"span",classes:["token",e.type],attributes:{},language:r,parent:i};if("comment"==o.type&&(o.attributes.spellcheck="true"),e.alias){var s="Array"===t.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(o.classes,s)}t.hooks.run("wrap",o);var a="";for(var l in o.attributes)a+=l+'="'+(o.attributes[l]||"")+'"';return"<"+o.tag+' class="'+o.classes.join(" ")+'" '+a+">"+o.content+"</"+o.tag+">"},!self.document)return self.addEventListener?(self.addEventListener("message",function(e){var n=JSON.parse(e.data),r=n.language,i=n.code;self.postMessage(JSON.stringify(t.util.encode(t.tokenize(i,t.languages[r])))),self.close()},!1),self.Prism):self.Prism;var r=document.getElementsByTagName("script");return r=r[r.length-1],r&&(t.filename=r.src,document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),Prism.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?.+?\?>/,doctype:/<!DOCTYPE.+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/=|>|"/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),Prism.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{punctuation:/[;:]/}},url:/url\((?:(["'])(\\\n|\\?.)*?\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/,string:/("|')(\\\n|\\?.)*?\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,punctuation:/[\{\};:]/,"function":/[-a-z0-9]+(?=\()/i},Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/i,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/i,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css},alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag)),Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:/("|')(\\[\s\S]|(?!\1)[^\\\r\n])*\1/,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":{pattern:/[a-z0-9_]+\(/i,inside:{punctuation:/\(/}},number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,ignore:/&(lt|gt|amp);/i,punctuation:/[{}[\];(),.:]/},Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/(?!\d)[a-z0-9_$]+(?=\()/i}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0}}),Prism.languages.insertBefore("javascript","class-name",{"template-string":{pattern:/`(?:\\`|\\?[^`])*`/,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/i,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/i,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript},alias:"language-javascript"}}),function(){self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",html:"markup",svg:"markup",xml:"markup",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell"};Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){for(var n,r=t.getAttribute("data-src"),i=t,o=/\blang(?:uage)?-(?!\*)(\w+)\b/i;i&&!o.test(i.className);)i=i.parentNode;if(i&&(n=(t.className.match(o)||[,""])[1]),!n){var s=(r.match(/\.(\w+)$/)||[,""])[1];n=e[s]||s}var a=document.createElement("code");a.className="language-"+n,t.textContent="",a.textContent="Loading…",t.appendChild(a);var l=new XMLHttpRequest;l.open("GET",r,!0),l.onreadystatechange=function(){4==l.readyState&&(l.status<400&&l.responseText?(a.textContent=l.responseText,Prism.highlightElement(a)):a.textContent=l.status>=400?"✖ Error "+l.status+" while fetching file: "+l.statusText:"✖ Error: File does not exist or is empty")},l.send(null)})},self.Prism.fileHighlight())}(),Prism.languages.php=Prism.languages.extend("clike",{keyword:/\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,constant:/\b[A-Z0-9_]{2,}\b/,comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/).*?(\r?\n|$))/,lookbehind:!0}}),Prism.languages.insertBefore("php","class-name",{"shell-comment":{pattern:/(^|[^\\])#.*?(\r?\n|$)/,lookbehind:!0,alias:"comment"}}),Prism.languages.insertBefore("php","keyword",{delimiter:/(\?>|<\?php|<\?)/i,variable:/(\$\w+)\b/i,"package":{pattern:/(\\|namespace\s+|use\s+)[\w\\]+/,lookbehind:!0,inside:{punctuation:/\\/}}}),Prism.languages.insertBefore("php","operator",{property:{pattern:/(->)[\w]+/,lookbehind:!0}}),Prism.languages.markup&&(Prism.hooks.add("before-highlight",function(e){"php"===e.language&&(e.tokenStack=[],e.backupCode=e.code,e.code=e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi,function(t){return e.tokenStack.push(t),"{{{PHP"+e.tokenStack.length+"}}}"}))}),Prism.hooks.add("before-insert",function(e){"php"===e.language&&(e.code=e.backupCode,
delete e.backupCode)}),Prism.hooks.add("after-highlight",function(e){if("php"===e.language){for(var t,n=0;t=e.tokenStack[n];n++)e.highlightedCode=e.highlightedCode.replace("{{{PHP"+(n+1)+"}}}",Prism.highlight(t,e.grammar,"php"));e.element.innerHTML=e.highlightedCode}}),Prism.hooks.add("wrap",function(e){"php"===e.language&&"markup"===e.type&&(e.content=e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g,'<span class="token php">$1</span>'))}),Prism.languages.insertBefore("php","comment",{markup:{pattern:/<[^?]\/?(.*?)>/,inside:Prism.languages.markup},php:/\{\{\{PHP[0-9]+\}\}\}/})),Prism.hooks.add("after-highlight",function(e){var t=e.element.parentNode,n=/\s*\bline-numbers\b\s*/;if(t&&/pre/i.test(t.nodeName)&&(n.test(t.className)||n.test(e.element.className))){n.test(e.element.className)&&(e.element.className=e.element.className.replace(n,"")),n.test(t.className)||(t.className+=" line-numbers");var r,i=1+e.code.split("\n").length,o=new Array(i);o=o.join("<span></span>"),r=document.createElement("span"),r.className="line-numbers-rows",r.innerHTML=o,t.hasAttribute("data-start")&&(t.style.counterReset="linenumber "+(parseInt(t.getAttribute("data-start"),10)-1)),e.element.appendChild(r)}}),function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var n={exports:{}};t(n.exports,n),e.autosize=n.exports}}(this,function(e,t){"use strict";function n(e){function t(){var t=window.getComputedStyle(e,null);"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),u="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),i()}function n(t){var n=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=n,d=t,c&&(e.style.overflowY=t),r()}function r(){var t=window.pageYOffset,n=document.body.scrollTop,r=e.style.height;e.style.height="auto";var i=e.scrollHeight+u;return 0===e.scrollHeight?void(e.style.height=r):(e.style.height=i+"px",document.documentElement.scrollTop=t,void(document.body.scrollTop=n))}function i(){var t=e.style.height;r();var i=window.getComputedStyle(e,null);if(i.height!==e.style.height?"visible"!==d&&n("visible"):"hidden"!==d&&n("hidden"),t!==e.style.height){var o=document.createEvent("Event");o.initEvent("autosize:resized",!0,!1),e.dispatchEvent(o)}}var o=void 0===arguments[1]?{}:arguments[1],s=o.setOverflowX,a=void 0===s?!0:s,l=o.setOverflowY,c=void 0===l?!0:l;if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!e.hasAttribute("data-autosize-on")){var u=null,d="hidden",p=function(t){window.removeEventListener("resize",i),e.removeEventListener("input",i),e.removeEventListener("keyup",i),e.removeAttribute("data-autosize-on"),e.removeEventListener("autosize:destroy",p),Object.keys(t).forEach(function(n){e.style[n]=t[n]})}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",p),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",i),window.addEventListener("resize",i),e.addEventListener("input",i),e.addEventListener("autosize:update",i),e.setAttribute("data-autosize-on",!0),c&&(e.style.overflowY="hidden"),a&&(e.style.overflowX="hidden",e.style.wordWrap="break-word"),t()}}function r(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:destroy",!0,!1),e.dispatchEvent(t)}}function i(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:update",!0,!1),e.dispatchEvent(t)}}var o=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(o=function(e){return e},o.destroy=function(e){return e},o.update=function(e){return e}):(o=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return n(e,t)}),e},o.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],r),e},o.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],i),e}),t.exports=o});
/*
*  Altair Admin
*  forms_advanced.js (forms_advanced.html)
*/


$(function() {
    // characters/words counter
    altair_form_adv.char_words_counter();
    // ionrangeSlider

    altair_form_adv.adv_selects();
    // masked_inputs
    altair_form_adv.masked_inputs();
});

altair_form_adv = {
    // characters/words counter
    char_words_counter: function() {
        var $imputCount = $('.input-count');
        if($imputCount.length) {
            /* http://qwertypants.github.io/jQuery-Word-and-Character-Counter-Plugin/ */
            (function($){"use strict";$.fn.extend({counter:function(options){var defaults={type:"char",count:"down",goal:140,text:true,target:false,append:true,translation:"",msg:"",container_class:""};var $countObj="",countIndex="",noLimit=false,options=$.extend({},defaults,options);var methods={init:function($obj){var objID=$obj.attr("id"),counterID=objID+"_count";methods.isLimitless();$countObj=$("<span id="+counterID+"/>");var counterDiv=$("<div/>").attr("id",objID+"_counter").append($countObj).append(" "+methods.setMsg());if(options.container_class&&options.container_class.length){counterDiv.addClass(options.container_class)}if(!options.target||!$(options.target).length){options.append?counterDiv.insertAfter($obj):counterDiv.insertBefore($obj)}else{options.append?$(options.target).append(counterDiv):$(options.target).prepend(counterDiv)}methods.bind($obj)},bind:function($obj){$obj.bind("keypress.counter keydown.counter keyup.counter blur.counter focus.counter change.counter paste.counter",methods.updateCounter);$obj.bind("keydown.counter",methods.doStopTyping);$obj.trigger("keydown")},isLimitless:function(){if(options.goal==="sky"){options.count="up";noLimit=true;return noLimit}},setMsg:function(){if(options.msg!==""){return options.msg}if(options.text===false){return""}if(noLimit){if(options.msg!==""){return options.msg}else{return""}}this.text=options.translation||"character word left max";this.text=this.text.split(" ");this.chars="s ( )".split(" ");this.msg=null;switch(options.type){case"char":if(options.count===defaults.count&&options.text){this.msg=this.text[0]+this.chars[1]+this.chars[0]+this.chars[2]+" "+this.text[2]}else if(options.count==="up"&&options.text){this.msg=this.text[0]+this.chars[0]+" "+this.chars[1]+options.goal+" "+this.text[3]+this.chars[2]}break;case"word":if(options.count===defaults.count&&options.text){this.msg=this.text[1]+this.chars[1]+this.chars[0]+this.chars[2]+" "+this.text[2]}else if(options.count==="up"&&options.text){this.msg=this.text[1]+this.chars[1]+this.chars[0]+this.chars[2]+" "+this.chars[1]+options.goal+" "+this.text[3]+this.chars[2]}break;default:}return this.msg},getWords:function(val){if(val!==""){return $.trim(val).replace(/\s+/g," ").split(" ").length}else{return 0}},updateCounter:function(e){var $this=$(this);if(countIndex<0||countIndex>options.goal){methods.passedGoal($this)}if(options.type===defaults.type){if(options.count===defaults.count){countIndex=options.goal-$this.val().length;if(countIndex<=0){$countObj.text("0")}else{$countObj.text(countIndex)}}else if(options.count==="up"){countIndex=$this.val().length;$countObj.text(countIndex)}}else if(options.type==="word"){if(options.count===defaults.count){countIndex=methods.getWords($this.val());if(countIndex<=options.goal){countIndex=options.goal-countIndex;$countObj.text(countIndex)}else{$countObj.text("0")}}else if(options.count==="up"){countIndex=methods.getWords($this.val());$countObj.text(countIndex)}}return},doStopTyping:function(e){var keys=[46,8,9,35,36,37,38,39,40,32];if(methods.isGoalReached(e)){if(e.keyCode!==keys[0]&&e.keyCode!==keys[1]&&e.keyCode!==keys[2]&&e.keyCode!==keys[3]&&e.keyCode!==keys[4]&&e.keyCode!==keys[5]&&e.keyCode!==keys[6]&&e.keyCode!==keys[7]&&e.keyCode!==keys[8]){if(options.type===defaults.type){return false}else if(e.keyCode!==keys[9]&&e.keyCode!==keys[1]&&options.type!=defaults.type){return true}else{return false}}}},isGoalReached:function(e,_goal){if(noLimit){return false}if(options.count===defaults.count){_goal=0;return countIndex<=_goal?true:false}else{_goal=options.goal;return countIndex>=_goal?true:false}},wordStrip:function(numOfWords,text){var wordCount=text.replace(/\s+/g," ").split(" ").length;text=$.trim(text);if(numOfWords<=0||numOfWords===wordCount){return text}else{text=$.trim(text).split(" ");text.splice(numOfWords,wordCount,"");return $.trim(text.join(" "))}},passedGoal:function($obj){var userInput=$obj.val();if(options.type==="word"){$obj.val(methods.wordStrip(options.goal,userInput))}if(options.type==="char"){$obj.val(userInput.substring(0,options.goal))}if(options.type==="down"){$countObj.val("0")}if(options.type==="up"){$countObj.val(options.goal)}}};return this.each(function(){methods.init($(this))})}})})(jQuery);

            $imputCount.each(function() {
                var $this = $(this);

                var $thisGoal = $(this).attr('maxlength') ? $(this).attr('maxlength') : 80 ;

                $this.counter({
                    container_class: 'text-count-wrapper',
                    msg: ' / '+$thisGoal,
                    goal: $thisGoal,
                    count: 'up'
                });

                if($this.closest('.md-input-wrapper').length) {
                    $this.closest('.md-input-wrapper').addClass('md-input-wrapper-count')
                }
            })
        }
    },

    // advanced selects (selectizejs)
    adv_selects: function() {
        $('#selec_adv_1').selectize({
            plugins: {
                'remove_button': {
                    label     : ''
                }
            },
           
            maxItems: null,
            valueField: 'id',
            labelField: 'title',
            searchField: 'title',
            create: false,
            render: {
                option: function(data, escape) {
                    return  '<div class="option">' +
                            '<span class="title">' + escape(data.title) + '</span>' +
                            '</div>';
                },
                item: function(data, escape) {
                    return '<div class="item"><a href="' + escape(data.url) + '" target="_blank">' + escape(data.title) + '</a></div>';
                }
            },
            onDropdownOpen: function($dropdown) {
                $dropdown
                    .hide()
                    .velocity('slideDown', {
                        begin: function() {
                            $dropdown.css({'margin-top':'0'})
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

        var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
            '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
        $('#selec_adv_2').selectize({
            persist: false,
            maxItems: null,
            valueField: 'email',
            labelField: 'name',
            searchField: ['name', 'email'],
            options: [
                {email: 'brian@thirdroute.com', name: 'Brian Reavis'},
                {email: 'nikola@tesla.com', name: 'Nikola Tesla'},
                {email: 'someone@gmail.com'}
            ],
            render: {
                item: function(item, escape) {
                    return '<div>' +
                        (item.name ? '<span class="name">' + escape(item.name) + '</span>' : '') +
                        (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                        '</div>';
                },
                option: function(item, escape) {
                    var label = item.name || item.email;
                    var caption = item.name ? item.email : null;
                    return '<div>' +
                        '<span class="label">' + escape(label) + '</span>' +
                        (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
                        '</div>';
                }
            },
            createFilter: function(input) {
                var match, regex;

                // email@address.com
                regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[0]);

                // name <email@address.com>
                regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[2]);

                return false;
            },
            create: function(input) {
                if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                    return {email: input};
                }
                var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
                if (match) {
                    return {
                        email : match[2],
                        name  : $.trim(match[1])
                    };
                }
                alert('Invalid email address.');
                return false;
            },
            onDropdownOpen: function($dropdown) {
                $dropdown
                    .hide()
                    .velocity('slideDown', {
                        begin: function() {
                            $dropdown.css({'margin-top':'0'})
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

    },
    // masked_inputs
    masked_inputs: function() {
        $maskedInput = $('.masked_input');
        if($maskedInput.length) {
            $maskedInput.inputmask();
        }
    }
};
/*!

 handlebars v3.0.3

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/

!function(a,b){"object"==typeof exports&&"object"==typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):"object"==typeof exports?exports.Handlebars=b():a.Handlebars=b()}(this,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){"use strict";function d(){var a=r();return a.compile=function(b,c){return k.compile(b,c,a)},a.precompile=function(b,c){return k.precompile(b,c,a)},a.AST=i["default"],a.Compiler=k.Compiler,a.JavaScriptCompiler=m["default"],a.Parser=j.parser,a.parse=j.parse,a}var e=c(8)["default"];b.__esModule=!0;var f=c(1),g=e(f),h=c(2),i=e(h),j=c(3),k=c(4),l=c(5),m=e(l),n=c(6),o=e(n),p=c(7),q=e(p),r=g["default"].create,s=d();s.create=d,q["default"](s),s.Visitor=o["default"],s["default"]=s,b["default"]=s,a.exports=b["default"]},function(a,b,c){"use strict";function d(){var a=new g.HandlebarsEnvironment;return m.extend(a,g),a.SafeString=i["default"],a.Exception=k["default"],a.Utils=m,a.escapeExpression=m.escapeExpression,a.VM=o,a.template=function(b){return o.template(b,a)},a}var e=c(8)["default"];b.__esModule=!0;var f=c(9),g=e(f),h=c(10),i=e(h),j=c(11),k=e(j),l=c(12),m=e(l),n=c(13),o=e(n),p=c(7),q=e(p),r=d();r.create=d,q["default"](r),r["default"]=r,b["default"]=r,a.exports=b["default"]},function(a,b){"use strict";b.__esModule=!0;var c={Program:function(a,b,c,d){this.loc=d,this.type="Program",this.body=a,this.blockParams=b,this.strip=c},MustacheStatement:function(a,b,c,d,e,f){this.loc=f,this.type="MustacheStatement",this.path=a,this.params=b||[],this.hash=c,this.escaped=d,this.strip=e},BlockStatement:function(a,b,c,d,e,f,g,h,i){this.loc=i,this.type="BlockStatement",this.path=a,this.params=b||[],this.hash=c,this.program=d,this.inverse=e,this.openStrip=f,this.inverseStrip=g,this.closeStrip=h},PartialStatement:function(a,b,c,d,e){this.loc=e,this.type="PartialStatement",this.name=a,this.params=b||[],this.hash=c,this.indent="",this.strip=d},ContentStatement:function(a,b){this.loc=b,this.type="ContentStatement",this.original=this.value=a},CommentStatement:function(a,b,c){this.loc=c,this.type="CommentStatement",this.value=a,this.strip=b},SubExpression:function(a,b,c,d){this.loc=d,this.type="SubExpression",this.path=a,this.params=b||[],this.hash=c},PathExpression:function(a,b,c,d,e){this.loc=e,this.type="PathExpression",this.data=a,this.original=d,this.parts=c,this.depth=b},StringLiteral:function(a,b){this.loc=b,this.type="StringLiteral",this.original=this.value=a},NumberLiteral:function(a,b){this.loc=b,this.type="NumberLiteral",this.original=this.value=Number(a)},BooleanLiteral:function(a,b){this.loc=b,this.type="BooleanLiteral",this.original=this.value="true"===a},UndefinedLiteral:function(a){this.loc=a,this.type="UndefinedLiteral",this.original=this.value=void 0},NullLiteral:function(a){this.loc=a,this.type="NullLiteral",this.original=this.value=null},Hash:function(a,b){this.loc=b,this.type="Hash",this.pairs=a},HashPair:function(a,b,c){this.loc=c,this.type="HashPair",this.key=a,this.value=b},helpers:{helperExpression:function(a){return!("SubExpression"!==a.type&&!a.params.length&&!a.hash)},scopedId:function(a){return/^\.|this\b/.test(a.original)},simpleId:function(a){return 1===a.parts.length&&!c.helpers.scopedId(a)&&!a.depth}}};b["default"]=c,a.exports=b["default"]},function(a,b,c){"use strict";function d(a,b){if("Program"===a.type)return a;g["default"].yy=o,o.locInfo=function(a){return new o.SourceLocation(b&&b.srcName,a)};var c=new k["default"];return c.accept(g["default"].parse(a))}var e=c(8)["default"];b.__esModule=!0,b.parse=d;var f=c(14),g=e(f),h=c(2),i=e(h),j=c(15),k=e(j),l=c(16),m=e(l),n=c(12);b.parser=g["default"];var o={};n.extend(o,m,i["default"])},function(a,b,c){"use strict";function d(){}function e(a,b,c){if(null==a||"string"!=typeof a&&"Program"!==a.type)throw new k["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+a);b=b||{},"data"in b||(b.data=!0),b.compat&&(b.useDepths=!0);var d=c.parse(a,b),e=(new c.Compiler).compile(d,b);return(new c.JavaScriptCompiler).compile(e,b)}function f(a,b,c){function d(){var b=c.parse(a,f),d=(new c.Compiler).compile(b,f),e=(new c.JavaScriptCompiler).compile(d,f,void 0,!0);return c.template(e)}function e(a,b){return g||(g=d()),g.call(this,a,b)}var f=void 0===arguments[1]?{}:arguments[1];if(null==a||"string"!=typeof a&&"Program"!==a.type)throw new k["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+a);"data"in f||(f.data=!0),f.compat&&(f.useDepths=!0);var g=void 0;return e._setup=function(a){return g||(g=d()),g._setup(a)},e._child=function(a,b,c,e){return g||(g=d()),g._child(a,b,c,e)},e}function g(a,b){if(a===b)return!0;if(l.isArray(a)&&l.isArray(b)&&a.length===b.length){for(var c=0;c<a.length;c++)if(!g(a[c],b[c]))return!1;return!0}}function h(a){if(!a.path.parts){var b=a.path;a.path=new n["default"].PathExpression(!1,0,[b.original+""],b.original+"",b.loc)}}var i=c(8)["default"];b.__esModule=!0,b.Compiler=d,b.precompile=e,b.compile=f;var j=c(11),k=i(j),l=c(12),m=c(2),n=i(m),o=[].slice;d.prototype={compiler:d,equals:function(a){var b=this.opcodes.length;if(a.opcodes.length!==b)return!1;for(var c=0;b>c;c++){var d=this.opcodes[c],e=a.opcodes[c];if(d.opcode!==e.opcode||!g(d.args,e.args))return!1}b=this.children.length;for(var c=0;b>c;c++)if(!this.children[c].equals(a.children[c]))return!1;return!0},guid:0,compile:function(a,b){this.sourceNode=[],this.opcodes=[],this.children=[],this.options=b,this.stringParams=b.stringParams,this.trackIds=b.trackIds,b.blockParams=b.blockParams||[];var c=b.knownHelpers;if(b.knownHelpers={helperMissing:!0,blockHelperMissing:!0,each:!0,"if":!0,unless:!0,"with":!0,log:!0,lookup:!0},c)for(var d in c)d in c&&(b.knownHelpers[d]=c[d]);return this.accept(a)},compileProgram:function(a){var b=new this.compiler,c=b.compile(a,this.options),d=this.guid++;return this.usePartial=this.usePartial||c.usePartial,this.children[d]=c,this.useDepths=this.useDepths||c.useDepths,d},accept:function(a){this.sourceNode.unshift(a);var b=this[a.type](a);return this.sourceNode.shift(),b},Program:function(a){this.options.blockParams.unshift(a.blockParams);for(var b=a.body,c=b.length,d=0;c>d;d++)this.accept(b[d]);return this.options.blockParams.shift(),this.isSimple=1===c,this.blockParams=a.blockParams?a.blockParams.length:0,this},BlockStatement:function(a){h(a);var b=a.program,c=a.inverse;b=b&&this.compileProgram(b),c=c&&this.compileProgram(c);var d=this.classifySexpr(a);"helper"===d?this.helperSexpr(a,b,c):"simple"===d?(this.simpleSexpr(a),this.opcode("pushProgram",b),this.opcode("pushProgram",c),this.opcode("emptyHash"),this.opcode("blockValue",a.path.original)):(this.ambiguousSexpr(a,b,c),this.opcode("pushProgram",b),this.opcode("pushProgram",c),this.opcode("emptyHash"),this.opcode("ambiguousBlockValue")),this.opcode("append")},PartialStatement:function(a){this.usePartial=!0;var b=a.params;if(b.length>1)throw new k["default"]("Unsupported number of partial arguments: "+b.length,a);b.length||b.push({type:"PathExpression",parts:[],depth:0});var c=a.name.original,d="SubExpression"===a.name.type;d&&this.accept(a.name),this.setupFullMustacheParams(a,void 0,void 0,!0);var e=a.indent||"";this.options.preventIndent&&e&&(this.opcode("appendContent",e),e=""),this.opcode("invokePartial",d,c,e),this.opcode("append")},MustacheStatement:function(a){this.SubExpression(a),this.opcode(a.escaped&&!this.options.noEscape?"appendEscaped":"append")},ContentStatement:function(a){a.value&&this.opcode("appendContent",a.value)},CommentStatement:function(){},SubExpression:function(a){h(a);var b=this.classifySexpr(a);"simple"===b?this.simpleSexpr(a):"helper"===b?this.helperSexpr(a):this.ambiguousSexpr(a)},ambiguousSexpr:function(a,b,c){var d=a.path,e=d.parts[0],f=null!=b||null!=c;this.opcode("getContext",d.depth),this.opcode("pushProgram",b),this.opcode("pushProgram",c),this.accept(d),this.opcode("invokeAmbiguous",e,f)},simpleSexpr:function(a){this.accept(a.path),this.opcode("resolvePossibleLambda")},helperSexpr:function(a,b,c){var d=this.setupFullMustacheParams(a,b,c),e=a.path,f=e.parts[0];if(this.options.knownHelpers[f])this.opcode("invokeKnownHelper",d.length,f);else{if(this.options.knownHelpersOnly)throw new k["default"]("You specified knownHelpersOnly, but used the unknown helper "+f,a);e.falsy=!0,this.accept(e),this.opcode("invokeHelper",d.length,e.original,n["default"].helpers.simpleId(e))}},PathExpression:function(a){this.addDepth(a.depth),this.opcode("getContext",a.depth);var b=a.parts[0],c=n["default"].helpers.scopedId(a),d=!a.depth&&!c&&this.blockParamIndex(b);d?this.opcode("lookupBlockParam",d,a.parts):b?a.data?(this.options.data=!0,this.opcode("lookupData",a.depth,a.parts)):this.opcode("lookupOnContext",a.parts,a.falsy,c):this.opcode("pushContext")},StringLiteral:function(a){this.opcode("pushString",a.value)},NumberLiteral:function(a){this.opcode("pushLiteral",a.value)},BooleanLiteral:function(a){this.opcode("pushLiteral",a.value)},UndefinedLiteral:function(){this.opcode("pushLiteral","undefined")},NullLiteral:function(){this.opcode("pushLiteral","null")},Hash:function(a){var b=a.pairs,c=0,d=b.length;for(this.opcode("pushHash");d>c;c++)this.pushParam(b[c].value);for(;c--;)this.opcode("assignToHash",b[c].key);this.opcode("popHash")},opcode:function(a){this.opcodes.push({opcode:a,args:o.call(arguments,1),loc:this.sourceNode[0].loc})},addDepth:function(a){a&&(this.useDepths=!0)},classifySexpr:function(a){var b=n["default"].helpers.simpleId(a.path),c=b&&!!this.blockParamIndex(a.path.parts[0]),d=!c&&n["default"].helpers.helperExpression(a),e=!c&&(d||b);if(e&&!d){var f=a.path.parts[0],g=this.options;g.knownHelpers[f]?d=!0:g.knownHelpersOnly&&(e=!1)}return d?"helper":e?"ambiguous":"simple"},pushParams:function(a){for(var b=0,c=a.length;c>b;b++)this.pushParam(a[b])},pushParam:function(a){var b=null!=a.value?a.value:a.original||"";if(this.stringParams)b.replace&&(b=b.replace(/^(\.?\.\/)*/g,"").replace(/\//g,".")),a.depth&&this.addDepth(a.depth),this.opcode("getContext",a.depth||0),this.opcode("pushStringParam",b,a.type),"SubExpression"===a.type&&this.accept(a);else{if(this.trackIds){var c=void 0;if(!a.parts||n["default"].helpers.scopedId(a)||a.depth||(c=this.blockParamIndex(a.parts[0])),c){var d=a.parts.slice(1).join(".");this.opcode("pushId","BlockParam",c,d)}else b=a.original||b,b.replace&&(b=b.replace(/^\.\//g,"").replace(/^\.$/g,"")),this.opcode("pushId",a.type,b)}this.accept(a)}},setupFullMustacheParams:function(a,b,c,d){var e=a.params;return this.pushParams(e),this.opcode("pushProgram",b),this.opcode("pushProgram",c),a.hash?this.accept(a.hash):this.opcode("emptyHash",d),e},blockParamIndex:function(a){for(var b=0,c=this.options.blockParams.length;c>b;b++){var d=this.options.blockParams[b],e=d&&l.indexOf(d,a);if(d&&e>=0)return[b,e]}}}},function(a,b,c){"use strict";function d(a){this.value=a}function e(){}function f(a,b,c,d){var e=b.popStack(),f=0,g=c.length;for(a&&g--;g>f;f++)e=b.nameLookup(e,c[f],d);return a?[b.aliasable("this.strict"),"(",e,", ",b.quotedString(c[f]),")"]:e}var g=c(8)["default"];b.__esModule=!0;var h=c(9),i=c(11),j=g(i),k=c(12),l=c(17),m=g(l);e.prototype={nameLookup:function(a,b){return e.isValidJavaScriptVariableName(b)?[a,".",b]:[a,"['",b,"']"]},depthedLookup:function(a){return[this.aliasable("this.lookup"),'(depths, "',a,'")']},compilerInfo:function(){var a=h.COMPILER_REVISION,b=h.REVISION_CHANGES[a];return[a,b]},appendToBuffer:function(a,b,c){return k.isArray(a)||(a=[a]),a=this.source.wrap(a,b),this.environment.isSimple?["return ",a,";"]:c?["buffer += ",a,";"]:(a.appendToBuffer=!0,a)},initializeBuffer:function(){return this.quotedString("")},compile:function(a,b,c,d){this.environment=a,this.options=b,this.stringParams=this.options.stringParams,this.trackIds=this.options.trackIds,this.precompile=!d,this.name=this.environment.name,this.isChild=!!c,this.context=c||{programs:[],environments:[]},this.preamble(),this.stackSlot=0,this.stackVars=[],this.aliases={},this.registers={list:[]},this.hashes=[],this.compileStack=[],this.inlineStack=[],this.blockParams=[],this.compileChildren(a,b),this.useDepths=this.useDepths||a.useDepths||this.options.compat,this.useBlockParams=this.useBlockParams||a.useBlockParams;var e=a.opcodes,f=void 0,g=void 0,h=void 0,i=void 0;for(h=0,i=e.length;i>h;h++)f=e[h],this.source.currentLocation=f.loc,g=g||f.loc,this[f.opcode].apply(this,f.args);if(this.source.currentLocation=g,this.pushSource(""),this.stackSlot||this.inlineStack.length||this.compileStack.length)throw new j["default"]("Compile completed with content left on stack");var k=this.createFunctionContext(d);if(this.isChild)return k;var l={compiler:this.compilerInfo(),main:k},m=this.context.programs;for(h=0,i=m.length;i>h;h++)m[h]&&(l[h]=m[h]);return this.environment.usePartial&&(l.usePartial=!0),this.options.data&&(l.useData=!0),this.useDepths&&(l.useDepths=!0),this.useBlockParams&&(l.useBlockParams=!0),this.options.compat&&(l.compat=!0),d?l.compilerOptions=this.options:(l.compiler=JSON.stringify(l.compiler),this.source.currentLocation={start:{line:1,column:0}},l=this.objectLiteral(l),b.srcName?(l=l.toStringWithSourceMap({file:b.destName}),l.map=l.map&&l.map.toString()):l=l.toString()),l},preamble:function(){this.lastContext=0,this.source=new m["default"](this.options.srcName)},createFunctionContext:function(a){var b="",c=this.stackVars.concat(this.registers.list);c.length>0&&(b+=", "+c.join(", "));var d=0;for(var e in this.aliases){var f=this.aliases[e];this.aliases.hasOwnProperty(e)&&f.children&&f.referenceCount>1&&(b+=", alias"+ ++d+"="+e,f.children[0]="alias"+d)}var g=["depth0","helpers","partials","data"];(this.useBlockParams||this.useDepths)&&g.push("blockParams"),this.useDepths&&g.push("depths");var h=this.mergeSource(b);return a?(g.push(h),Function.apply(this,g)):this.source.wrap(["function(",g.join(","),") {\n  ",h,"}"])},mergeSource:function(a){var b=this.environment.isSimple,c=!this.forceBuffer,d=void 0,e=void 0,f=void 0,g=void 0;return this.source.each(function(a){a.appendToBuffer?(f?a.prepend("  + "):f=a,g=a):(f&&(e?f.prepend("buffer += "):d=!0,g.add(";"),f=g=void 0),e=!0,b||(c=!1))}),c?f?(f.prepend("return "),g.add(";")):e||this.source.push('return "";'):(a+=", buffer = "+(d?"":this.initializeBuffer()),f?(f.prepend("return buffer + "),g.add(";")):this.source.push("return buffer;")),a&&this.source.prepend("var "+a.substring(2)+(d?"":";\n")),this.source.merge()},blockValue:function(a){var b=this.aliasable("helpers.blockHelperMissing"),c=[this.contextName(0)];this.setupHelperArgs(a,0,c);var d=this.popStack();c.splice(1,0,d),this.push(this.source.functionCall(b,"call",c))},ambiguousBlockValue:function(){var a=this.aliasable("helpers.blockHelperMissing"),b=[this.contextName(0)];this.setupHelperArgs("",0,b,!0),this.flushInline();var c=this.topStack();b.splice(1,0,c),this.pushSource(["if (!",this.lastHelper,") { ",c," = ",this.source.functionCall(a,"call",b),"}"])},appendContent:function(a){this.pendingContent?a=this.pendingContent+a:this.pendingLocation=this.source.currentLocation,this.pendingContent=a},append:function(){if(this.isInline())this.replaceStack(function(a){return[" != null ? ",a,' : ""']}),this.pushSource(this.appendToBuffer(this.popStack()));else{var a=this.popStack();this.pushSource(["if (",a," != null) { ",this.appendToBuffer(a,void 0,!0)," }"]),this.environment.isSimple&&this.pushSource(["else { ",this.appendToBuffer("''",void 0,!0)," }"])}},appendEscaped:function(){this.pushSource(this.appendToBuffer([this.aliasable("this.escapeExpression"),"(",this.popStack(),")"]))},getContext:function(a){this.lastContext=a},pushContext:function(){this.pushStackLiteral(this.contextName(this.lastContext))},lookupOnContext:function(a,b,c){var d=0;c||!this.options.compat||this.lastContext?this.pushContext():this.push(this.depthedLookup(a[d++])),this.resolvePath("context",a,d,b)},lookupBlockParam:function(a,b){this.useBlockParams=!0,this.push(["blockParams[",a[0],"][",a[1],"]"]),this.resolvePath("context",b,1)},lookupData:function(a,b){this.pushStackLiteral(a?"this.data(data, "+a+")":"data"),this.resolvePath("data",b,0,!0)},resolvePath:function(a,b,c,d){var e=this;if(this.options.strict||this.options.assumeObjects)return void this.push(f(this.options.strict,this,b,a));for(var g=b.length;g>c;c++)this.replaceStack(function(f){var g=e.nameLookup(f,b[c],a);return d?[" && ",g]:[" != null ? ",g," : ",f]})},resolvePossibleLambda:function(){this.push([this.aliasable("this.lambda"),"(",this.popStack(),", ",this.contextName(0),")"])},pushStringParam:function(a,b){this.pushContext(),this.pushString(b),"SubExpression"!==b&&("string"==typeof a?this.pushString(a):this.pushStackLiteral(a))},emptyHash:function(a){this.trackIds&&this.push("{}"),this.stringParams&&(this.push("{}"),this.push("{}")),this.pushStackLiteral(a?"undefined":"{}")},pushHash:function(){this.hash&&this.hashes.push(this.hash),this.hash={values:[],types:[],contexts:[],ids:[]}},popHash:function(){var a=this.hash;this.hash=this.hashes.pop(),this.trackIds&&this.push(this.objectLiteral(a.ids)),this.stringParams&&(this.push(this.objectLiteral(a.contexts)),this.push(this.objectLiteral(a.types))),this.push(this.objectLiteral(a.values))},pushString:function(a){this.pushStackLiteral(this.quotedString(a))},pushLiteral:function(a){this.pushStackLiteral(a)},pushProgram:function(a){this.pushStackLiteral(null!=a?this.programExpression(a):null)},invokeHelper:function(a,b,c){var d=this.popStack(),e=this.setupHelper(a,b),f=c?[e.name," || "]:"",g=["("].concat(f,d);this.options.strict||g.push(" || ",this.aliasable("helpers.helperMissing")),g.push(")"),this.push(this.source.functionCall(g,"call",e.callParams))},invokeKnownHelper:function(a,b){var c=this.setupHelper(a,b);this.push(this.source.functionCall(c.name,"call",c.callParams))},invokeAmbiguous:function(a,b){this.useRegister("helper");var c=this.popStack();this.emptyHash();var d=this.setupHelper(0,a,b),e=this.lastHelper=this.nameLookup("helpers",a,"helper"),f=["(","(helper = ",e," || ",c,")"];this.options.strict||(f[0]="(helper = ",f.push(" != null ? helper : ",this.aliasable("helpers.helperMissing"))),this.push(["(",f,d.paramsInit?["),(",d.paramsInit]:[],"),","(typeof helper === ",this.aliasable('"function"')," ? ",this.source.functionCall("helper","call",d.callParams)," : helper))"])},invokePartial:function(a,b,c){var d=[],e=this.setupParams(b,1,d,!1);a&&(b=this.popStack(),delete e.name),c&&(e.indent=JSON.stringify(c)),e.helpers="helpers",e.partials="partials",d.unshift(a?b:this.nameLookup("partials",b,"partial")),this.options.compat&&(e.depths="depths"),e=this.objectLiteral(e),d.push(e),this.push(this.source.functionCall("this.invokePartial","",d))},assignToHash:function(a){var b=this.popStack(),c=void 0,d=void 0,e=void 0;this.trackIds&&(e=this.popStack()),this.stringParams&&(d=this.popStack(),c=this.popStack());var f=this.hash;c&&(f.contexts[a]=c),d&&(f.types[a]=d),e&&(f.ids[a]=e),f.values[a]=b},pushId:function(a,b,c){"BlockParam"===a?this.pushStackLiteral("blockParams["+b[0]+"].path["+b[1]+"]"+(c?" + "+JSON.stringify("."+c):"")):"PathExpression"===a?this.pushString(b):this.pushStackLiteral("SubExpression"===a?"true":"null")},compiler:e,compileChildren:function(a,b){for(var c=a.children,d=void 0,e=void 0,f=0,g=c.length;g>f;f++){d=c[f],e=new this.compiler;var h=this.matchExistingProgram(d);null==h?(this.context.programs.push(""),h=this.context.programs.length,d.index=h,d.name="program"+h,this.context.programs[h]=e.compile(d,b,this.context,!this.precompile),this.context.environments[h]=d,this.useDepths=this.useDepths||e.useDepths,this.useBlockParams=this.useBlockParams||e.useBlockParams):(d.index=h,d.name="program"+h,this.useDepths=this.useDepths||d.useDepths,this.useBlockParams=this.useBlockParams||d.useBlockParams)}},matchExistingProgram:function(a){for(var b=0,c=this.context.environments.length;c>b;b++){var d=this.context.environments[b];if(d&&d.equals(a))return b}},programExpression:function(a){var b=this.environment.children[a],c=[b.index,"data",b.blockParams];return(this.useBlockParams||this.useDepths)&&c.push("blockParams"),this.useDepths&&c.push("depths"),"this.program("+c.join(", ")+")"},useRegister:function(a){this.registers[a]||(this.registers[a]=!0,this.registers.list.push(a))},push:function(a){return a instanceof d||(a=this.source.wrap(a)),this.inlineStack.push(a),a},pushStackLiteral:function(a){this.push(new d(a))},pushSource:function(a){this.pendingContent&&(this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent),this.pendingLocation)),this.pendingContent=void 0),a&&this.source.push(a)},replaceStack:function(a){var b=["("],c=void 0,e=void 0,f=void 0;if(!this.isInline())throw new j["default"]("replaceStack on non-inline");var g=this.popStack(!0);if(g instanceof d)c=[g.value],b=["(",c],f=!0;else{e=!0;var h=this.incrStack();b=["((",this.push(h)," = ",g,")"],c=this.topStack()}var i=a.call(this,c);f||this.popStack(),e&&this.stackSlot--,this.push(b.concat(i,")"))},incrStack:function(){return this.stackSlot++,this.stackSlot>this.stackVars.length&&this.stackVars.push("stack"+this.stackSlot),this.topStackName()},topStackName:function(){return"stack"+this.stackSlot},flushInline:function(){var a=this.inlineStack;this.inlineStack=[];for(var b=0,c=a.length;c>b;b++){var e=a[b];if(e instanceof d)this.compileStack.push(e);else{var f=this.incrStack();this.pushSource([f," = ",e,";"]),this.compileStack.push(f)}}},isInline:function(){return this.inlineStack.length},popStack:function(a){var b=this.isInline(),c=(b?this.inlineStack:this.compileStack).pop();if(!a&&c instanceof d)return c.value;if(!b){if(!this.stackSlot)throw new j["default"]("Invalid stack pop");this.stackSlot--}return c},topStack:function(){var a=this.isInline()?this.inlineStack:this.compileStack,b=a[a.length-1];return b instanceof d?b.value:b},contextName:function(a){return this.useDepths&&a?"depths["+a+"]":"depth"+a},quotedString:function(a){return this.source.quotedString(a)},objectLiteral:function(a){return this.source.objectLiteral(a)},aliasable:function(a){var b=this.aliases[a];return b?(b.referenceCount++,b):(b=this.aliases[a]=this.source.wrap(a),b.aliasable=!0,b.referenceCount=1,b)},setupHelper:function(a,b,c){var d=[],e=this.setupHelperArgs(b,a,d,c),f=this.nameLookup("helpers",b,"helper");return{params:d,paramsInit:e,name:f,callParams:[this.contextName(0)].concat(d)}},setupParams:function(a,b,c){var d={},e=[],f=[],g=[],h=void 0;d.name=this.quotedString(a),d.hash=this.popStack(),this.trackIds&&(d.hashIds=this.popStack()),this.stringParams&&(d.hashTypes=this.popStack(),d.hashContexts=this.popStack());var i=this.popStack(),j=this.popStack();(j||i)&&(d.fn=j||"this.noop",d.inverse=i||"this.noop");for(var k=b;k--;)h=this.popStack(),c[k]=h,this.trackIds&&(g[k]=this.popStack()),this.stringParams&&(f[k]=this.popStack(),e[k]=this.popStack());return this.trackIds&&(d.ids=this.source.generateArray(g)),this.stringParams&&(d.types=this.source.generateArray(f),d.contexts=this.source.generateArray(e)),this.options.data&&(d.data="data"),this.useBlockParams&&(d.blockParams="blockParams"),d},setupHelperArgs:function(a,b,c,d){var e=this.setupParams(a,b,c,!0);return e=this.objectLiteral(e),d?(this.useRegister("options"),c.push("options"),["options=",e]):(c.push(e),"")}},function(){for(var a="break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "),b=e.RESERVED_WORDS={},c=0,d=a.length;d>c;c++)b[a[c]]=!0}(),e.isValidJavaScriptVariableName=function(a){return!e.RESERVED_WORDS[a]&&/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(a)},b["default"]=e,a.exports=b["default"]},function(a,b,c){"use strict";function d(){this.parents=[]}var e=c(8)["default"];b.__esModule=!0;var f=c(11),g=e(f),h=c(2),i=e(h);d.prototype={constructor:d,mutating:!1,acceptKey:function(a,b){var c=this.accept(a[b]);if(this.mutating){if(c&&(!c.type||!i["default"][c.type]))throw new g["default"]('Unexpected node type "'+c.type+'" found when accepting '+b+" on "+a.type);a[b]=c}},acceptRequired:function(a,b){if(this.acceptKey(a,b),!a[b])throw new g["default"](a.type+" requires "+b)},acceptArray:function(a){for(var b=0,c=a.length;c>b;b++)this.acceptKey(a,b),a[b]||(a.splice(b,1),b--,c--)},accept:function(a){if(a){this.current&&this.parents.unshift(this.current),this.current=a;var b=this[a.type](a);return this.current=this.parents.shift(),!this.mutating||b?b:b!==!1?a:void 0}},Program:function(a){this.acceptArray(a.body)},MustacheStatement:function(a){this.acceptRequired(a,"path"),this.acceptArray(a.params),this.acceptKey(a,"hash")},BlockStatement:function(a){this.acceptRequired(a,"path"),this.acceptArray(a.params),this.acceptKey(a,"hash"),this.acceptKey(a,"program"),this.acceptKey(a,"inverse")},PartialStatement:function(a){this.acceptRequired(a,"name"),this.acceptArray(a.params),this.acceptKey(a,"hash")},ContentStatement:function(){},CommentStatement:function(){},SubExpression:function(a){this.acceptRequired(a,"path"),this.acceptArray(a.params),this.acceptKey(a,"hash")},PathExpression:function(){},StringLiteral:function(){},NumberLiteral:function(){},BooleanLiteral:function(){},UndefinedLiteral:function(){},NullLiteral:function(){},Hash:function(a){this.acceptArray(a.pairs)},HashPair:function(a){this.acceptRequired(a,"value")}},b["default"]=d,a.exports=b["default"]},function(a,b){(function(c){"use strict";b.__esModule=!0,b["default"]=function(a){var b="undefined"!=typeof c?c:window,d=b.Handlebars;a.noConflict=function(){b.Handlebars===a&&(b.Handlebars=d)}},a.exports=b["default"]}).call(b,function(){return this}())},function(a,b){"use strict";b["default"]=function(a){return a&&a.__esModule?a:{"default":a}},b.__esModule=!0},function(a,b,c){"use strict";function d(a,b){this.helpers=a||{},this.partials=b||{},e(this)}function e(a){a.registerHelper("helperMissing",function(){if(1===arguments.length)return void 0;throw new k["default"]('Missing helper: "'+arguments[arguments.length-1].name+'"')}),a.registerHelper("blockHelperMissing",function(b,c){var d=c.inverse,e=c.fn;if(b===!0)return e(this);if(b===!1||null==b)return d(this);if(o(b))return b.length>0?(c.ids&&(c.ids=[c.name]),a.helpers.each(b,c)):d(this);if(c.data&&c.ids){var g=f(c.data);g.contextPath=i.appendContextPath(c.data.contextPath,c.name),c={data:g}}return e(b,c)}),a.registerHelper("each",function(a,b){function c(b,c,e){j&&(j.key=b,j.index=c,j.first=0===c,j.last=!!e,l&&(j.contextPath=l+b)),h+=d(a[b],{data:j,blockParams:i.blockParams([a[b],b],[l+b,null])})}if(!b)throw new k["default"]("Must pass iterator to #each");var d=b.fn,e=b.inverse,g=0,h="",j=void 0,l=void 0;if(b.data&&b.ids&&(l=i.appendContextPath(b.data.contextPath,b.ids[0])+"."),p(a)&&(a=a.call(this)),b.data&&(j=f(b.data)),a&&"object"==typeof a)if(o(a))for(var m=a.length;m>g;g++)c(g,g,g===a.length-1);else{var n=void 0;for(var q in a)a.hasOwnProperty(q)&&(n&&c(n,g-1),n=q,g++);n&&c(n,g-1,!0)}return 0===g&&(h=e(this)),h}),a.registerHelper("if",function(a,b){return p(a)&&(a=a.call(this)),!b.hash.includeZero&&!a||i.isEmpty(a)?b.inverse(this):b.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})}),a.registerHelper("with",function(a,b){p(a)&&(a=a.call(this));var c=b.fn;if(i.isEmpty(a))return b.inverse(this);if(b.data&&b.ids){var d=f(b.data);d.contextPath=i.appendContextPath(b.data.contextPath,b.ids[0]),b={data:d}}return c(a,b)}),a.registerHelper("log",function(b,c){var d=c.data&&null!=c.data.level?parseInt(c.data.level,10):1;a.log(d,b)}),a.registerHelper("lookup",function(a,b){return a&&a[b]})}function f(a){var b=i.extend({},a);return b._parent=a,b}var g=c(8)["default"];b.__esModule=!0,b.HandlebarsEnvironment=d,b.createFrame=f;var h=c(12),i=g(h),j=c(11),k=g(j),l="3.0.1";b.VERSION=l;var m=6;b.COMPILER_REVISION=m;var n={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};b.REVISION_CHANGES=n;var o=i.isArray,p=i.isFunction,q=i.toString,r="[object Object]";d.prototype={constructor:d,logger:s,log:t,registerHelper:function(a,b){if(q.call(a)===r){if(b)throw new k["default"]("Arg not supported with multiple helpers");i.extend(this.helpers,a)}else this.helpers[a]=b},unregisterHelper:function(a){delete this.helpers[a]},registerPartial:function(a,b){if(q.call(a)===r)i.extend(this.partials,a);else{if("undefined"==typeof b)throw new k["default"]("Attempting to register a partial as undefined");this.partials[a]=b}},unregisterPartial:function(a){delete this.partials[a]}};var s={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:1,log:function(a,b){if("undefined"!=typeof console&&s.level<=a){var c=s.methodMap[a];(console[c]||console.log).call(console,b)}}};b.logger=s;var t=s.log;b.log=t},function(a,b){"use strict";function c(a){this.string=a}b.__esModule=!0,c.prototype.toString=c.prototype.toHTML=function(){return""+this.string},b["default"]=c,a.exports=b["default"]},function(a,b){"use strict";function c(a,b){var e=b&&b.loc,f=void 0,g=void 0;e&&(f=e.start.line,g=e.start.column,a+=" - "+f+":"+g);for(var h=Error.prototype.constructor.call(this,a),i=0;i<d.length;i++)this[d[i]]=h[d[i]];Error.captureStackTrace&&Error.captureStackTrace(this,c),e&&(this.lineNumber=f,this.column=g)}b.__esModule=!0;var d=["description","fileName","lineNumber","message","name","number","stack"];c.prototype=new Error,b["default"]=c,a.exports=b["default"]},function(a,b){"use strict";function c(a){return j[a]}function d(a){for(var b=1;b<arguments.length;b++)for(var c in arguments[b])Object.prototype.hasOwnProperty.call(arguments[b],c)&&(a[c]=arguments[b][c]);return a}function e(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1}function f(a){if("string"!=typeof a){if(a&&a.toHTML)return a.toHTML();if(null==a)return"";if(!a)return a+"";a=""+a}return l.test(a)?a.replace(k,c):a}function g(a){return a||0===a?o(a)&&0===a.length?!0:!1:!0}function h(a,b){return a.path=b,a}function i(a,b){return(a?a+".":"")+b}b.__esModule=!0,b.extend=d,b.indexOf=e,b.escapeExpression=f,b.isEmpty=g,b.blockParams=h,b.appendContextPath=i;var j={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},k=/[&<>"'`]/g,l=/[&<>"'`]/,m=Object.prototype.toString;b.toString=m;var n=function(a){return"function"==typeof a};n(/x/)&&(b.isFunction=n=function(a){return"function"==typeof a&&"[object Function]"===m.call(a)});var n;b.isFunction=n;var o=Array.isArray||function(a){return a&&"object"==typeof a?"[object Array]"===m.call(a):!1};b.isArray=o},function(a,b,c){"use strict";function d(a){var b=a&&a[0]||1,c=p.COMPILER_REVISION;if(b!==c){if(c>b){var d=p.REVISION_CHANGES[c],e=p.REVISION_CHANGES[b];throw new o["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+d+") or downgrade your runtime to an older version ("+e+").")}throw new o["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").")}}function e(a,b){function c(c,d,e){e.hash&&(d=m.extend({},d,e.hash)),c=b.VM.resolvePartial.call(this,c,d,e);var f=b.VM.invokePartial.call(this,c,d,e);if(null==f&&b.compile&&(e.partials[e.name]=b.compile(c,a.compilerOptions,b),f=e.partials[e.name](d,e)),null!=f){if(e.indent){for(var g=f.split("\n"),h=0,i=g.length;i>h&&(g[h]||h+1!==i);h++)g[h]=e.indent+g[h];f=g.join("\n")}return f}throw new o["default"]("The partial "+e.name+" could not be compiled when running in runtime-only mode")}function d(b){var c=void 0===arguments[1]?{}:arguments[1],f=c.data;
d._setup(c),!c.partial&&a.useData&&(f=j(b,f));var g=void 0,h=a.useBlockParams?[]:void 0;return a.useDepths&&(g=c.depths?[b].concat(c.depths):[b]),a.main.call(e,b,e.helpers,e.partials,f,h,g)}if(!b)throw new o["default"]("No environment passed to template");if(!a||!a.main)throw new o["default"]("Unknown template object: "+typeof a);b.VM.checkRevision(a.compiler);var e={strict:function(a,b){if(!(b in a))throw new o["default"]('"'+b+'" not defined in '+a);return a[b]},lookup:function(a,b){for(var c=a.length,d=0;c>d;d++)if(a[d]&&null!=a[d][b])return a[d][b]},lambda:function(a,b){return"function"==typeof a?a.call(b):a},escapeExpression:m.escapeExpression,invokePartial:c,fn:function(b){return a[b]},programs:[],program:function(a,b,c,d,e){var g=this.programs[a],h=this.fn(a);return b||e||d||c?g=f(this,a,h,b,c,d,e):g||(g=this.programs[a]=f(this,a,h)),g},data:function(a,b){for(;a&&b--;)a=a._parent;return a},merge:function(a,b){var c=a||b;return a&&b&&a!==b&&(c=m.extend({},b,a)),c},noop:b.VM.noop,compilerInfo:a.compiler};return d.isTop=!0,d._setup=function(c){c.partial?(e.helpers=c.helpers,e.partials=c.partials):(e.helpers=e.merge(c.helpers,b.helpers),a.usePartial&&(e.partials=e.merge(c.partials,b.partials)))},d._child=function(b,c,d,g){if(a.useBlockParams&&!d)throw new o["default"]("must pass block params");if(a.useDepths&&!g)throw new o["default"]("must pass parent depths");return f(e,b,a[b],c,0,d,g)},d}function f(a,b,c,d,e,f,g){function h(b){var e=void 0===arguments[1]?{}:arguments[1];return c.call(a,b,a.helpers,a.partials,e.data||d,f&&[e.blockParams].concat(f),g&&[b].concat(g))}return h.program=b,h.depth=g?g.length:0,h.blockParams=e||0,h}function g(a,b,c){return a?a.call||c.name||(c.name=a,a=c.partials[a]):a=c.partials[c.name],a}function h(a,b,c){if(c.partial=!0,void 0===a)throw new o["default"]("The partial "+c.name+" could not be found");return a instanceof Function?a(b,c):void 0}function i(){return""}function j(a,b){return b&&"root"in b||(b=b?p.createFrame(b):{},b.root=a),b}var k=c(8)["default"];b.__esModule=!0,b.checkRevision=d,b.template=e,b.wrapProgram=f,b.resolvePartial=g,b.invokePartial=h,b.noop=i;var l=c(12),m=k(l),n=c(11),o=k(n),p=c(9)},function(a,b){"use strict";b.__esModule=!0;var c=function(){function a(){this.yy={}}var b={trace:function(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,program_repetition0:6,statement:7,mustache:8,block:9,rawBlock:10,partial:11,content:12,COMMENT:13,CONTENT:14,openRawBlock:15,END_RAW_BLOCK:16,OPEN_RAW_BLOCK:17,helperName:18,openRawBlock_repetition0:19,openRawBlock_option0:20,CLOSE_RAW_BLOCK:21,openBlock:22,block_option0:23,closeBlock:24,openInverse:25,block_option1:26,OPEN_BLOCK:27,openBlock_repetition0:28,openBlock_option0:29,openBlock_option1:30,CLOSE:31,OPEN_INVERSE:32,openInverse_repetition0:33,openInverse_option0:34,openInverse_option1:35,openInverseChain:36,OPEN_INVERSE_CHAIN:37,openInverseChain_repetition0:38,openInverseChain_option0:39,openInverseChain_option1:40,inverseAndProgram:41,INVERSE:42,inverseChain:43,inverseChain_option0:44,OPEN_ENDBLOCK:45,OPEN:46,mustache_repetition0:47,mustache_option0:48,OPEN_UNESCAPED:49,mustache_repetition1:50,mustache_option1:51,CLOSE_UNESCAPED:52,OPEN_PARTIAL:53,partialName:54,partial_repetition0:55,partial_option0:56,param:57,sexpr:58,OPEN_SEXPR:59,sexpr_repetition0:60,sexpr_option0:61,CLOSE_SEXPR:62,hash:63,hash_repetition_plus0:64,hashSegment:65,ID:66,EQUALS:67,blockParams:68,OPEN_BLOCK_PARAMS:69,blockParams_repetition_plus0:70,CLOSE_BLOCK_PARAMS:71,path:72,dataName:73,STRING:74,NUMBER:75,BOOLEAN:76,UNDEFINED:77,NULL:78,DATA:79,pathSegments:80,SEP:81,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",13:"COMMENT",14:"CONTENT",16:"END_RAW_BLOCK",17:"OPEN_RAW_BLOCK",21:"CLOSE_RAW_BLOCK",27:"OPEN_BLOCK",31:"CLOSE",32:"OPEN_INVERSE",37:"OPEN_INVERSE_CHAIN",42:"INVERSE",45:"OPEN_ENDBLOCK",46:"OPEN",49:"OPEN_UNESCAPED",52:"CLOSE_UNESCAPED",53:"OPEN_PARTIAL",59:"OPEN_SEXPR",62:"CLOSE_SEXPR",66:"ID",67:"EQUALS",69:"OPEN_BLOCK_PARAMS",71:"CLOSE_BLOCK_PARAMS",74:"STRING",75:"NUMBER",76:"BOOLEAN",77:"UNDEFINED",78:"NULL",79:"DATA",81:"SEP"},productions_:[0,[3,2],[4,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[12,1],[10,3],[15,5],[9,4],[9,4],[22,6],[25,6],[36,6],[41,2],[43,3],[43,1],[24,3],[8,5],[8,5],[11,5],[57,1],[57,1],[58,5],[63,1],[65,3],[68,3],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1],[54,1],[54,1],[73,2],[72,1],[80,3],[80,1],[6,0],[6,2],[19,0],[19,2],[20,0],[20,1],[23,0],[23,1],[26,0],[26,1],[28,0],[28,2],[29,0],[29,1],[30,0],[30,1],[33,0],[33,2],[34,0],[34,1],[35,0],[35,1],[38,0],[38,2],[39,0],[39,1],[40,0],[40,1],[44,0],[44,1],[47,0],[47,2],[48,0],[48,1],[50,0],[50,2],[51,0],[51,1],[55,0],[55,2],[56,0],[56,1],[60,0],[60,2],[61,0],[61,1],[64,1],[64,2],[70,1],[70,2]],performAction:function(a,b,c,d,e,f){var g=f.length-1;switch(e){case 1:return f[g-1];case 2:this.$=new d.Program(f[g],null,{},d.locInfo(this._$));break;case 3:this.$=f[g];break;case 4:this.$=f[g];break;case 5:this.$=f[g];break;case 6:this.$=f[g];break;case 7:this.$=f[g];break;case 8:this.$=new d.CommentStatement(d.stripComment(f[g]),d.stripFlags(f[g],f[g]),d.locInfo(this._$));break;case 9:this.$=new d.ContentStatement(f[g],d.locInfo(this._$));break;case 10:this.$=d.prepareRawBlock(f[g-2],f[g-1],f[g],this._$);break;case 11:this.$={path:f[g-3],params:f[g-2],hash:f[g-1]};break;case 12:this.$=d.prepareBlock(f[g-3],f[g-2],f[g-1],f[g],!1,this._$);break;case 13:this.$=d.prepareBlock(f[g-3],f[g-2],f[g-1],f[g],!0,this._$);break;case 14:this.$={path:f[g-4],params:f[g-3],hash:f[g-2],blockParams:f[g-1],strip:d.stripFlags(f[g-5],f[g])};break;case 15:this.$={path:f[g-4],params:f[g-3],hash:f[g-2],blockParams:f[g-1],strip:d.stripFlags(f[g-5],f[g])};break;case 16:this.$={path:f[g-4],params:f[g-3],hash:f[g-2],blockParams:f[g-1],strip:d.stripFlags(f[g-5],f[g])};break;case 17:this.$={strip:d.stripFlags(f[g-1],f[g-1]),program:f[g]};break;case 18:var h=d.prepareBlock(f[g-2],f[g-1],f[g],f[g],!1,this._$),i=new d.Program([h],null,{},d.locInfo(this._$));i.chained=!0,this.$={strip:f[g-2].strip,program:i,chain:!0};break;case 19:this.$=f[g];break;case 20:this.$={path:f[g-1],strip:d.stripFlags(f[g-2],f[g])};break;case 21:this.$=d.prepareMustache(f[g-3],f[g-2],f[g-1],f[g-4],d.stripFlags(f[g-4],f[g]),this._$);break;case 22:this.$=d.prepareMustache(f[g-3],f[g-2],f[g-1],f[g-4],d.stripFlags(f[g-4],f[g]),this._$);break;case 23:this.$=new d.PartialStatement(f[g-3],f[g-2],f[g-1],d.stripFlags(f[g-4],f[g]),d.locInfo(this._$));break;case 24:this.$=f[g];break;case 25:this.$=f[g];break;case 26:this.$=new d.SubExpression(f[g-3],f[g-2],f[g-1],d.locInfo(this._$));break;case 27:this.$=new d.Hash(f[g],d.locInfo(this._$));break;case 28:this.$=new d.HashPair(d.id(f[g-2]),f[g],d.locInfo(this._$));break;case 29:this.$=d.id(f[g-1]);break;case 30:this.$=f[g];break;case 31:this.$=f[g];break;case 32:this.$=new d.StringLiteral(f[g],d.locInfo(this._$));break;case 33:this.$=new d.NumberLiteral(f[g],d.locInfo(this._$));break;case 34:this.$=new d.BooleanLiteral(f[g],d.locInfo(this._$));break;case 35:this.$=new d.UndefinedLiteral(d.locInfo(this._$));break;case 36:this.$=new d.NullLiteral(d.locInfo(this._$));break;case 37:this.$=f[g];break;case 38:this.$=f[g];break;case 39:this.$=d.preparePath(!0,f[g],this._$);break;case 40:this.$=d.preparePath(!1,f[g],this._$);break;case 41:f[g-2].push({part:d.id(f[g]),original:f[g],separator:f[g-1]}),this.$=f[g-2];break;case 42:this.$=[{part:d.id(f[g]),original:f[g]}];break;case 43:this.$=[];break;case 44:f[g-1].push(f[g]);break;case 45:this.$=[];break;case 46:f[g-1].push(f[g]);break;case 53:this.$=[];break;case 54:f[g-1].push(f[g]);break;case 59:this.$=[];break;case 60:f[g-1].push(f[g]);break;case 65:this.$=[];break;case 66:f[g-1].push(f[g]);break;case 73:this.$=[];break;case 74:f[g-1].push(f[g]);break;case 77:this.$=[];break;case 78:f[g-1].push(f[g]);break;case 81:this.$=[];break;case 82:f[g-1].push(f[g]);break;case 85:this.$=[];break;case 86:f[g-1].push(f[g]);break;case 89:this.$=[f[g]];break;case 90:f[g-1].push(f[g]);break;case 91:this.$=[f[g]];break;case 92:f[g-1].push(f[g])}},table:[{3:1,4:2,5:[2,43],6:3,13:[2,43],14:[2,43],17:[2,43],27:[2,43],32:[2,43],46:[2,43],49:[2,43],53:[2,43]},{1:[3]},{5:[1,4]},{5:[2,2],7:5,8:6,9:7,10:8,11:9,12:10,13:[1,11],14:[1,18],15:16,17:[1,21],22:14,25:15,27:[1,19],32:[1,20],37:[2,2],42:[2,2],45:[2,2],46:[1,12],49:[1,13],53:[1,17]},{1:[2,1]},{5:[2,44],13:[2,44],14:[2,44],17:[2,44],27:[2,44],32:[2,44],37:[2,44],42:[2,44],45:[2,44],46:[2,44],49:[2,44],53:[2,44]},{5:[2,3],13:[2,3],14:[2,3],17:[2,3],27:[2,3],32:[2,3],37:[2,3],42:[2,3],45:[2,3],46:[2,3],49:[2,3],53:[2,3]},{5:[2,4],13:[2,4],14:[2,4],17:[2,4],27:[2,4],32:[2,4],37:[2,4],42:[2,4],45:[2,4],46:[2,4],49:[2,4],53:[2,4]},{5:[2,5],13:[2,5],14:[2,5],17:[2,5],27:[2,5],32:[2,5],37:[2,5],42:[2,5],45:[2,5],46:[2,5],49:[2,5],53:[2,5]},{5:[2,6],13:[2,6],14:[2,6],17:[2,6],27:[2,6],32:[2,6],37:[2,6],42:[2,6],45:[2,6],46:[2,6],49:[2,6],53:[2,6]},{5:[2,7],13:[2,7],14:[2,7],17:[2,7],27:[2,7],32:[2,7],37:[2,7],42:[2,7],45:[2,7],46:[2,7],49:[2,7],53:[2,7]},{5:[2,8],13:[2,8],14:[2,8],17:[2,8],27:[2,8],32:[2,8],37:[2,8],42:[2,8],45:[2,8],46:[2,8],49:[2,8],53:[2,8]},{18:22,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{18:33,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{4:34,6:3,13:[2,43],14:[2,43],17:[2,43],27:[2,43],32:[2,43],37:[2,43],42:[2,43],45:[2,43],46:[2,43],49:[2,43],53:[2,43]},{4:35,6:3,13:[2,43],14:[2,43],17:[2,43],27:[2,43],32:[2,43],42:[2,43],45:[2,43],46:[2,43],49:[2,43],53:[2,43]},{12:36,14:[1,18]},{18:38,54:37,58:39,59:[1,40],66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{5:[2,9],13:[2,9],14:[2,9],16:[2,9],17:[2,9],27:[2,9],32:[2,9],37:[2,9],42:[2,9],45:[2,9],46:[2,9],49:[2,9],53:[2,9]},{18:41,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{18:42,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{18:43,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{31:[2,73],47:44,59:[2,73],66:[2,73],74:[2,73],75:[2,73],76:[2,73],77:[2,73],78:[2,73],79:[2,73]},{21:[2,30],31:[2,30],52:[2,30],59:[2,30],62:[2,30],66:[2,30],69:[2,30],74:[2,30],75:[2,30],76:[2,30],77:[2,30],78:[2,30],79:[2,30]},{21:[2,31],31:[2,31],52:[2,31],59:[2,31],62:[2,31],66:[2,31],69:[2,31],74:[2,31],75:[2,31],76:[2,31],77:[2,31],78:[2,31],79:[2,31]},{21:[2,32],31:[2,32],52:[2,32],59:[2,32],62:[2,32],66:[2,32],69:[2,32],74:[2,32],75:[2,32],76:[2,32],77:[2,32],78:[2,32],79:[2,32]},{21:[2,33],31:[2,33],52:[2,33],59:[2,33],62:[2,33],66:[2,33],69:[2,33],74:[2,33],75:[2,33],76:[2,33],77:[2,33],78:[2,33],79:[2,33]},{21:[2,34],31:[2,34],52:[2,34],59:[2,34],62:[2,34],66:[2,34],69:[2,34],74:[2,34],75:[2,34],76:[2,34],77:[2,34],78:[2,34],79:[2,34]},{21:[2,35],31:[2,35],52:[2,35],59:[2,35],62:[2,35],66:[2,35],69:[2,35],74:[2,35],75:[2,35],76:[2,35],77:[2,35],78:[2,35],79:[2,35]},{21:[2,36],31:[2,36],52:[2,36],59:[2,36],62:[2,36],66:[2,36],69:[2,36],74:[2,36],75:[2,36],76:[2,36],77:[2,36],78:[2,36],79:[2,36]},{21:[2,40],31:[2,40],52:[2,40],59:[2,40],62:[2,40],66:[2,40],69:[2,40],74:[2,40],75:[2,40],76:[2,40],77:[2,40],78:[2,40],79:[2,40],81:[1,45]},{66:[1,32],80:46},{21:[2,42],31:[2,42],52:[2,42],59:[2,42],62:[2,42],66:[2,42],69:[2,42],74:[2,42],75:[2,42],76:[2,42],77:[2,42],78:[2,42],79:[2,42],81:[2,42]},{50:47,52:[2,77],59:[2,77],66:[2,77],74:[2,77],75:[2,77],76:[2,77],77:[2,77],78:[2,77],79:[2,77]},{23:48,36:50,37:[1,52],41:51,42:[1,53],43:49,45:[2,49]},{26:54,41:55,42:[1,53],45:[2,51]},{16:[1,56]},{31:[2,81],55:57,59:[2,81],66:[2,81],74:[2,81],75:[2,81],76:[2,81],77:[2,81],78:[2,81],79:[2,81]},{31:[2,37],59:[2,37],66:[2,37],74:[2,37],75:[2,37],76:[2,37],77:[2,37],78:[2,37],79:[2,37]},{31:[2,38],59:[2,38],66:[2,38],74:[2,38],75:[2,38],76:[2,38],77:[2,38],78:[2,38],79:[2,38]},{18:58,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{28:59,31:[2,53],59:[2,53],66:[2,53],69:[2,53],74:[2,53],75:[2,53],76:[2,53],77:[2,53],78:[2,53],79:[2,53]},{31:[2,59],33:60,59:[2,59],66:[2,59],69:[2,59],74:[2,59],75:[2,59],76:[2,59],77:[2,59],78:[2,59],79:[2,59]},{19:61,21:[2,45],59:[2,45],66:[2,45],74:[2,45],75:[2,45],76:[2,45],77:[2,45],78:[2,45],79:[2,45]},{18:65,31:[2,75],48:62,57:63,58:66,59:[1,40],63:64,64:67,65:68,66:[1,69],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{66:[1,70]},{21:[2,39],31:[2,39],52:[2,39],59:[2,39],62:[2,39],66:[2,39],69:[2,39],74:[2,39],75:[2,39],76:[2,39],77:[2,39],78:[2,39],79:[2,39],81:[1,45]},{18:65,51:71,52:[2,79],57:72,58:66,59:[1,40],63:73,64:67,65:68,66:[1,69],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{24:74,45:[1,75]},{45:[2,50]},{4:76,6:3,13:[2,43],14:[2,43],17:[2,43],27:[2,43],32:[2,43],37:[2,43],42:[2,43],45:[2,43],46:[2,43],49:[2,43],53:[2,43]},{45:[2,19]},{18:77,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{4:78,6:3,13:[2,43],14:[2,43],17:[2,43],27:[2,43],32:[2,43],45:[2,43],46:[2,43],49:[2,43],53:[2,43]},{24:79,45:[1,75]},{45:[2,52]},{5:[2,10],13:[2,10],14:[2,10],17:[2,10],27:[2,10],32:[2,10],37:[2,10],42:[2,10],45:[2,10],46:[2,10],49:[2,10],53:[2,10]},{18:65,31:[2,83],56:80,57:81,58:66,59:[1,40],63:82,64:67,65:68,66:[1,69],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{59:[2,85],60:83,62:[2,85],66:[2,85],74:[2,85],75:[2,85],76:[2,85],77:[2,85],78:[2,85],79:[2,85]},{18:65,29:84,31:[2,55],57:85,58:66,59:[1,40],63:86,64:67,65:68,66:[1,69],69:[2,55],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{18:65,31:[2,61],34:87,57:88,58:66,59:[1,40],63:89,64:67,65:68,66:[1,69],69:[2,61],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{18:65,20:90,21:[2,47],57:91,58:66,59:[1,40],63:92,64:67,65:68,66:[1,69],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{31:[1,93]},{31:[2,74],59:[2,74],66:[2,74],74:[2,74],75:[2,74],76:[2,74],77:[2,74],78:[2,74],79:[2,74]},{31:[2,76]},{21:[2,24],31:[2,24],52:[2,24],59:[2,24],62:[2,24],66:[2,24],69:[2,24],74:[2,24],75:[2,24],76:[2,24],77:[2,24],78:[2,24],79:[2,24]},{21:[2,25],31:[2,25],52:[2,25],59:[2,25],62:[2,25],66:[2,25],69:[2,25],74:[2,25],75:[2,25],76:[2,25],77:[2,25],78:[2,25],79:[2,25]},{21:[2,27],31:[2,27],52:[2,27],62:[2,27],65:94,66:[1,95],69:[2,27]},{21:[2,89],31:[2,89],52:[2,89],62:[2,89],66:[2,89],69:[2,89]},{21:[2,42],31:[2,42],52:[2,42],59:[2,42],62:[2,42],66:[2,42],67:[1,96],69:[2,42],74:[2,42],75:[2,42],76:[2,42],77:[2,42],78:[2,42],79:[2,42],81:[2,42]},{21:[2,41],31:[2,41],52:[2,41],59:[2,41],62:[2,41],66:[2,41],69:[2,41],74:[2,41],75:[2,41],76:[2,41],77:[2,41],78:[2,41],79:[2,41],81:[2,41]},{52:[1,97]},{52:[2,78],59:[2,78],66:[2,78],74:[2,78],75:[2,78],76:[2,78],77:[2,78],78:[2,78],79:[2,78]},{52:[2,80]},{5:[2,12],13:[2,12],14:[2,12],17:[2,12],27:[2,12],32:[2,12],37:[2,12],42:[2,12],45:[2,12],46:[2,12],49:[2,12],53:[2,12]},{18:98,66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{36:50,37:[1,52],41:51,42:[1,53],43:100,44:99,45:[2,71]},{31:[2,65],38:101,59:[2,65],66:[2,65],69:[2,65],74:[2,65],75:[2,65],76:[2,65],77:[2,65],78:[2,65],79:[2,65]},{45:[2,17]},{5:[2,13],13:[2,13],14:[2,13],17:[2,13],27:[2,13],32:[2,13],37:[2,13],42:[2,13],45:[2,13],46:[2,13],49:[2,13],53:[2,13]},{31:[1,102]},{31:[2,82],59:[2,82],66:[2,82],74:[2,82],75:[2,82],76:[2,82],77:[2,82],78:[2,82],79:[2,82]},{31:[2,84]},{18:65,57:104,58:66,59:[1,40],61:103,62:[2,87],63:105,64:67,65:68,66:[1,69],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{30:106,31:[2,57],68:107,69:[1,108]},{31:[2,54],59:[2,54],66:[2,54],69:[2,54],74:[2,54],75:[2,54],76:[2,54],77:[2,54],78:[2,54],79:[2,54]},{31:[2,56],69:[2,56]},{31:[2,63],35:109,68:110,69:[1,108]},{31:[2,60],59:[2,60],66:[2,60],69:[2,60],74:[2,60],75:[2,60],76:[2,60],77:[2,60],78:[2,60],79:[2,60]},{31:[2,62],69:[2,62]},{21:[1,111]},{21:[2,46],59:[2,46],66:[2,46],74:[2,46],75:[2,46],76:[2,46],77:[2,46],78:[2,46],79:[2,46]},{21:[2,48]},{5:[2,21],13:[2,21],14:[2,21],17:[2,21],27:[2,21],32:[2,21],37:[2,21],42:[2,21],45:[2,21],46:[2,21],49:[2,21],53:[2,21]},{21:[2,90],31:[2,90],52:[2,90],62:[2,90],66:[2,90],69:[2,90]},{67:[1,96]},{18:65,57:112,58:66,59:[1,40],66:[1,32],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{5:[2,22],13:[2,22],14:[2,22],17:[2,22],27:[2,22],32:[2,22],37:[2,22],42:[2,22],45:[2,22],46:[2,22],49:[2,22],53:[2,22]},{31:[1,113]},{45:[2,18]},{45:[2,72]},{18:65,31:[2,67],39:114,57:115,58:66,59:[1,40],63:116,64:67,65:68,66:[1,69],69:[2,67],72:23,73:24,74:[1,25],75:[1,26],76:[1,27],77:[1,28],78:[1,29],79:[1,31],80:30},{5:[2,23],13:[2,23],14:[2,23],17:[2,23],27:[2,23],32:[2,23],37:[2,23],42:[2,23],45:[2,23],46:[2,23],49:[2,23],53:[2,23]},{62:[1,117]},{59:[2,86],62:[2,86],66:[2,86],74:[2,86],75:[2,86],76:[2,86],77:[2,86],78:[2,86],79:[2,86]},{62:[2,88]},{31:[1,118]},{31:[2,58]},{66:[1,120],70:119},{31:[1,121]},{31:[2,64]},{14:[2,11]},{21:[2,28],31:[2,28],52:[2,28],62:[2,28],66:[2,28],69:[2,28]},{5:[2,20],13:[2,20],14:[2,20],17:[2,20],27:[2,20],32:[2,20],37:[2,20],42:[2,20],45:[2,20],46:[2,20],49:[2,20],53:[2,20]},{31:[2,69],40:122,68:123,69:[1,108]},{31:[2,66],59:[2,66],66:[2,66],69:[2,66],74:[2,66],75:[2,66],76:[2,66],77:[2,66],78:[2,66],79:[2,66]},{31:[2,68],69:[2,68]},{21:[2,26],31:[2,26],52:[2,26],59:[2,26],62:[2,26],66:[2,26],69:[2,26],74:[2,26],75:[2,26],76:[2,26],77:[2,26],78:[2,26],79:[2,26]},{13:[2,14],14:[2,14],17:[2,14],27:[2,14],32:[2,14],37:[2,14],42:[2,14],45:[2,14],46:[2,14],49:[2,14],53:[2,14]},{66:[1,125],71:[1,124]},{66:[2,91],71:[2,91]},{13:[2,15],14:[2,15],17:[2,15],27:[2,15],32:[2,15],42:[2,15],45:[2,15],46:[2,15],49:[2,15],53:[2,15]},{31:[1,126]},{31:[2,70]},{31:[2,29]},{66:[2,92],71:[2,92]},{13:[2,16],14:[2,16],17:[2,16],27:[2,16],32:[2,16],37:[2,16],42:[2,16],45:[2,16],46:[2,16],49:[2,16],53:[2,16]}],defaultActions:{4:[2,1],49:[2,50],51:[2,19],55:[2,52],64:[2,76],73:[2,80],78:[2,17],82:[2,84],92:[2,48],99:[2,18],100:[2,72],105:[2,88],107:[2,58],110:[2,64],111:[2,11],123:[2,70],124:[2,29]},parseError:function(a){throw new Error(a)},parse:function(a){function b(){var a;return a=c.lexer.lex()||1,"number"!=typeof a&&(a=c.symbols_[a]||a),a}var c=this,d=[0],e=[null],f=[],g=this.table,h="",i=0,j=0,k=0;this.lexer.setInput(a),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,"undefined"==typeof this.lexer.yylloc&&(this.lexer.yylloc={});var l=this.lexer.yylloc;f.push(l);var m=this.lexer.options&&this.lexer.options.ranges;"function"==typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var n,o,p,q,r,s,t,u,v,w={};;){if(p=d[d.length-1],this.defaultActions[p]?q=this.defaultActions[p]:((null===n||"undefined"==typeof n)&&(n=b()),q=g[p]&&g[p][n]),"undefined"==typeof q||!q.length||!q[0]){var x="";if(!k){v=[];for(s in g[p])this.terminals_[s]&&s>2&&v.push("'"+this.terminals_[s]+"'");x=this.lexer.showPosition?"Parse error on line "+(i+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+v.join(", ")+", got '"+(this.terminals_[n]||n)+"'":"Parse error on line "+(i+1)+": Unexpected "+(1==n?"end of input":"'"+(this.terminals_[n]||n)+"'"),this.parseError(x,{text:this.lexer.match,token:this.terminals_[n]||n,line:this.lexer.yylineno,loc:l,expected:v})}}if(q[0]instanceof Array&&q.length>1)throw new Error("Parse Error: multiple actions possible at state: "+p+", token: "+n);switch(q[0]){case 1:d.push(n),e.push(this.lexer.yytext),f.push(this.lexer.yylloc),d.push(q[1]),n=null,o?(n=o,o=null):(j=this.lexer.yyleng,h=this.lexer.yytext,i=this.lexer.yylineno,l=this.lexer.yylloc,k>0&&k--);break;case 2:if(t=this.productions_[q[1]][1],w.$=e[e.length-t],w._$={first_line:f[f.length-(t||1)].first_line,last_line:f[f.length-1].last_line,first_column:f[f.length-(t||1)].first_column,last_column:f[f.length-1].last_column},m&&(w._$.range=[f[f.length-(t||1)].range[0],f[f.length-1].range[1]]),r=this.performAction.call(w,h,j,i,this.yy,q[1],e,f),"undefined"!=typeof r)return r;t&&(d=d.slice(0,-1*t*2),e=e.slice(0,-1*t),f=f.slice(0,-1*t)),d.push(this.productions_[q[1]][0]),e.push(w.$),f.push(w._$),u=g[d[d.length-2]][d[d.length-1]],d.push(u);break;case 3:return!0}}return!0}},c=function(){var a={EOF:1,parseError:function(a,b){if(!this.yy.parser)throw new Error(a);this.yy.parser.parseError(a,b)},setInput:function(a){return this._input=a,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var a=this._input[0];this.yytext+=a,this.yyleng++,this.offset++,this.match+=a,this.matched+=a;var b=a.match(/(?:\r\n?|\n).*/g);return b?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),a},unput:function(a){var b=a.length,c=a.split(/(?:\r\n?|\n)/g);this._input=a+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-b-1),this.offset-=b;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),c.length-1&&(this.yylineno-=c.length-1);var e=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:c?(c.length===d.length?this.yylloc.first_column:0)+d[d.length-c.length].length-c[0].length:this.yylloc.first_column-b},this.options.ranges&&(this.yylloc.range=[e[0],e[0]+this.yyleng-b]),this},more:function(){return this._more=!0,this},less:function(a){this.unput(this.match.slice(a))},pastInput:function(){var a=this.matched.substr(0,this.matched.length-this.match.length);return(a.length>20?"...":"")+a.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var a=this.match;return a.length<20&&(a+=this._input.substr(0,20-a.length)),(a.substr(0,20)+(a.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var a=this.pastInput(),b=new Array(a.length+1).join("-");return a+this.upcomingInput()+"\n"+b+"^"},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var a,b,c,d,e;this._more||(this.yytext="",this.match="");for(var f=this._currentRules(),g=0;g<f.length&&(c=this._input.match(this.rules[f[g]]),!c||b&&!(c[0].length>b[0].length)||(b=c,d=g,this.options.flex));g++);return b?(e=b[0].match(/(?:\r\n?|\n).*/g),e&&(this.yylineno+=e.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:e?e[e.length-1].length-e[e.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+b[0].length},this.yytext+=b[0],this.match+=b[0],this.matches=b,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._input=this._input.slice(b[0].length),this.matched+=b[0],a=this.performAction.call(this,this.yy,this,f[d],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),a?a:void 0):""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var a=this.next();return"undefined"!=typeof a?a:this.lex()},begin:function(a){this.conditionStack.push(a)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(a){this.begin(a)}};return a.options={},a.performAction=function(a,b,c,d){function e(a,c){return b.yytext=b.yytext.substr(a,b.yyleng-c)}switch(c){case 0:if("\\\\"===b.yytext.slice(-2)?(e(0,1),this.begin("mu")):"\\"===b.yytext.slice(-1)?(e(0,1),this.begin("emu")):this.begin("mu"),b.yytext)return 14;break;case 1:return 14;case 2:return this.popState(),14;case 3:return b.yytext=b.yytext.substr(5,b.yyleng-9),this.popState(),16;case 4:return 14;case 5:return this.popState(),13;case 6:return 59;case 7:return 62;case 8:return 17;case 9:return this.popState(),this.begin("raw"),21;case 10:return 53;case 11:return 27;case 12:return 45;case 13:return this.popState(),42;case 14:return this.popState(),42;case 15:return 32;case 16:return 37;case 17:return 49;case 18:return 46;case 19:this.unput(b.yytext),this.popState(),this.begin("com");break;case 20:return this.popState(),13;case 21:return 46;case 22:return 67;case 23:return 66;case 24:return 66;case 25:return 81;case 26:break;case 27:return this.popState(),52;case 28:return this.popState(),31;case 29:return b.yytext=e(1,2).replace(/\\"/g,'"'),74;case 30:return b.yytext=e(1,2).replace(/\\'/g,"'"),74;case 31:return 79;case 32:return 76;case 33:return 76;case 34:return 77;case 35:return 78;case 36:return 75;case 37:return 69;case 38:return 71;case 39:return 66;case 40:return 66;case 41:return"INVALID";case 42:return 5}},a.rules=[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]*?(?=(\{\{\{\{\/)))/,/^(?:[\s\S]*?--(~)?\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^\s*(~)?\}\})/,/^(?:\{\{(~)?\s*else\s*(~)?\}\})/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{(~)?!--)/,/^(?:\{\{(~)?![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)|])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:undefined(?=([~}\s)])))/,/^(?:null(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:as\s+\|)/,/^(?:\|)/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/],a.conditions={mu:{rules:[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42],inclusive:!1},emu:{rules:[2],inclusive:!1},com:{rules:[5],inclusive:!1},raw:{rules:[3,4],inclusive:!1},INITIAL:{rules:[0,1,42],inclusive:!0}},a}();return b.lexer=c,a.prototype=b,b.Parser=a,new a}();b["default"]=c,a.exports=b["default"]},function(a,b,c){"use strict";function d(){}function e(a,b,c){void 0===b&&(b=a.length);var d=a[b-1],e=a[b-2];return d?"ContentStatement"===d.type?(e||!c?/\r?\n\s*?$/:/(^|\r?\n)\s*?$/).test(d.original):void 0:c}function f(a,b,c){void 0===b&&(b=-1);var d=a[b+1],e=a[b+2];return d?"ContentStatement"===d.type?(e||!c?/^\s*?\r?\n/:/^\s*?(\r?\n|$)/).test(d.original):void 0:c}function g(a,b,c){var d=a[null==b?0:b+1];if(d&&"ContentStatement"===d.type&&(c||!d.rightStripped)){var e=d.value;d.value=d.value.replace(c?/^\s+/:/^[ \t]*\r?\n?/,""),d.rightStripped=d.value!==e}}function h(a,b,c){var d=a[null==b?a.length-1:b-1];if(d&&"ContentStatement"===d.type&&(c||!d.leftStripped)){var e=d.value;return d.value=d.value.replace(c?/\s+$/:/[ \t]+$/,""),d.leftStripped=d.value!==e,d.leftStripped}}var i=c(8)["default"];b.__esModule=!0;var j=c(6),k=i(j);d.prototype=new k["default"],d.prototype.Program=function(a){var b=!this.isRootSeen;this.isRootSeen=!0;for(var c=a.body,d=0,i=c.length;i>d;d++){var j=c[d],k=this.accept(j);if(k){var l=e(c,d,b),m=f(c,d,b),n=k.openStandalone&&l,o=k.closeStandalone&&m,p=k.inlineStandalone&&l&&m;k.close&&g(c,d,!0),k.open&&h(c,d,!0),p&&(g(c,d),h(c,d)&&"PartialStatement"===j.type&&(j.indent=/([ \t]+$)/.exec(c[d-1].original)[1])),n&&(g((j.program||j.inverse).body),h(c,d)),o&&(g(c,d),h((j.inverse||j.program).body))}}return a},d.prototype.BlockStatement=function(a){this.accept(a.program),this.accept(a.inverse);var b=a.program||a.inverse,c=a.program&&a.inverse,d=c,i=c;if(c&&c.chained)for(d=c.body[0].program;i.chained;)i=i.body[i.body.length-1].program;var j={open:a.openStrip.open,close:a.closeStrip.close,openStandalone:f(b.body),closeStandalone:e((d||b).body)};if(a.openStrip.close&&g(b.body,null,!0),c){var k=a.inverseStrip;k.open&&h(b.body,null,!0),k.close&&g(d.body,null,!0),a.closeStrip.open&&h(i.body,null,!0),e(b.body)&&f(d.body)&&(h(b.body),g(d.body))}else a.closeStrip.open&&h(b.body,null,!0);return j},d.prototype.MustacheStatement=function(a){return a.strip},d.prototype.PartialStatement=d.prototype.CommentStatement=function(a){var b=a.strip||{};return{inlineStandalone:!0,open:b.open,close:b.close}},b["default"]=d,a.exports=b["default"]},function(a,b,c){"use strict";function d(a,b){this.source=a,this.start={line:b.first_line,column:b.first_column},this.end={line:b.last_line,column:b.last_column}}function e(a){return/^\[.*\]$/.test(a)?a.substr(1,a.length-2):a}function f(a,b){return{open:"~"===a.charAt(2),close:"~"===b.charAt(b.length-3)}}function g(a){return a.replace(/^\{\{~?\!-?-?/,"").replace(/-?-?~?\}\}$/,"")}function h(a,b,c){c=this.locInfo(c);for(var d=a?"@":"",e=[],f=0,g="",h=0,i=b.length;i>h;h++){var j=b[h].part,k=b[h].original!==j;if(d+=(b[h].separator||"")+j,k||".."!==j&&"."!==j&&"this"!==j)e.push(j);else{if(e.length>0)throw new n["default"]("Invalid path: "+d,{loc:c});".."===j&&(f++,g+="../")}}return new this.PathExpression(a,f,e,d,c)}function i(a,b,c,d,e,f){var g=d.charAt(3)||d.charAt(2),h="{"!==g&&"&"!==g;return new this.MustacheStatement(a,b,c,h,e,this.locInfo(f))}function j(a,b,c,d){if(a.path.original!==c){var e={loc:a.path.loc};throw new n["default"](a.path.original+" doesn't match "+c,e)}d=this.locInfo(d);var f=new this.Program([b],null,{},d);return new this.BlockStatement(a.path,a.params,a.hash,f,void 0,{},{},{},d)}function k(a,b,c,d,e,f){if(d&&d.path&&a.path.original!==d.path.original){var g={loc:a.path.loc};throw new n["default"](a.path.original+" doesn't match "+d.path.original,g)}b.blockParams=a.blockParams;var h=void 0,i=void 0;return c&&(c.chain&&(c.program.body[0].closeStrip=d.strip),i=c.strip,h=c.program),e&&(e=h,h=b,b=e),new this.BlockStatement(a.path,a.params,a.hash,b,h,a.strip,i,d&&d.strip,this.locInfo(f))}var l=c(8)["default"];b.__esModule=!0,b.SourceLocation=d,b.id=e,b.stripFlags=f,b.stripComment=g,b.preparePath=h,b.prepareMustache=i,b.prepareRawBlock=j,b.prepareBlock=k;var m=c(11),n=l(m)},function(a,b,c){"use strict";function d(a,b,c){if(f.isArray(a)){for(var d=[],e=0,g=a.length;g>e;e++)d.push(b.wrap(a[e],c));return d}return"boolean"==typeof a||"number"==typeof a?a+"":a}function e(a){this.srcFile=a,this.source=[]}b.__esModule=!0;var f=c(12),g=void 0;try{}catch(h){}g||(g=function(a,b,c,d){this.src="",d&&this.add(d)},g.prototype={add:function(a){f.isArray(a)&&(a=a.join("")),this.src+=a},prepend:function(a){f.isArray(a)&&(a=a.join("")),this.src=a+this.src},toStringWithSourceMap:function(){return{code:this.toString()}},toString:function(){return this.src}}),e.prototype={prepend:function(a,b){this.source.unshift(this.wrap(a,b))},push:function(a,b){this.source.push(this.wrap(a,b))},merge:function(){var a=this.empty();return this.each(function(b){a.add(["  ",b,"\n"])}),a},each:function(a){for(var b=0,c=this.source.length;c>b;b++)a(this.source[b])},empty:function(){var a=void 0===arguments[0]?this.currentLocation||{start:{}}:arguments[0];return new g(a.start.line,a.start.column,this.srcFile)},wrap:function(a){var b=void 0===arguments[1]?this.currentLocation||{start:{}}:arguments[1];return a instanceof g?a:(a=d(a,this,b),new g(b.start.line,b.start.column,this.srcFile,a))},functionCall:function(a,b,c){return c=this.generateList(c),this.wrap([a,b?"."+b+"(":"(",c,")"])},quotedString:function(a){return'"'+(a+"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},objectLiteral:function(a){var b=[];for(var c in a)if(a.hasOwnProperty(c)){var e=d(a[c],this);"undefined"!==e&&b.push([this.quotedString(c),":",e])
}var f=this.generateList(b);return f.prepend("{"),f.add("}"),f},generateList:function(a,b){for(var c=this.empty(b),e=0,f=a.length;f>e;e++)e&&c.add(","),c.add(d(a[e],this,b));return c},generateArray:function(a,b){var c=this.generateList(a,b);return c.prepend("["),c.add("]"),c}},b["default"]=e,a.exports=b["default"]}])});
Handlebars.registerHelper("dateFormat",function(e,r){if(window.moment){var s=r.hash.format||"MMM DD, YYYY hh:mm:ss A";return moment(e).format(s)}return e}),Handlebars.registerHelper("ifCond",function(e,r,s,t){switch(r){case"==":return e==s?t.fn(this):t.inverse(this);case"===":return e===s?t.fn(this):t.inverse(this);case"!==":return e!==s?t.fn(this):t.inverse(this);case"<":return s>e?t.fn(this):t.inverse(this);case"<=":return s>=e?t.fn(this):t.inverse(this);case">":return e>s?t.fn(this):t.inverse(this);case">=":return e>=s?t.fn(this):t.inverse(this);case"&&":return e&&s?t.fn(this):t.inverse(this);case"||":return e||s?t.fn(this):t.inverse(this);default:return t.inverse(this)}});
/*!
* jquery.inputmask.bundle
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2015 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.1.63
*/

!function(a){function b(a){var b=document.createElement("input"),c="on"+a,d=c in b;return d||(b.setAttribute(c,"return;"),d="function"==typeof b[c]),b=null,d}function c(a){var b="text"==a||"tel"==a||"password"==a;if(!b){var c=document.createElement("input");c.setAttribute("type",a),b="text"===c.type,c=null}return b}function d(b,c,e){var f=e.aliases[b];return f?(f.alias&&d(f.alias,void 0,e),a.extend(!0,e,f),a.extend(!0,e,c),!0):!1}function e(b,c){function d(c){function d(a,b,c,d){this.matches=[],this.isGroup=a||!1,this.isOptional=b||!1,this.isQuantifier=c||!1,this.isAlternator=d||!1,this.quantifier={min:1,max:1}}function e(c,d,e){var f=b.definitions[d],g=0==c.matches.length;if(e=void 0!=e?e:c.matches.length,f&&!m){f.placeholder=a.isFunction(f.placeholder)?f.placeholder.call(this,b):f.placeholder;for(var h=f.prevalidator,i=h?h.length:0,j=1;j<f.cardinality;j++){var k=i>=j?h[j-1]:[],l=k.validator,n=k.cardinality;c.matches.splice(e++,0,{fn:l?"string"==typeof l?new RegExp(l):new function(){this.test=l}:new RegExp("."),cardinality:n?n:1,optionality:c.isOptional,newBlockMarker:g,casing:f.casing,def:f.definitionSymbol||d,placeholder:f.placeholder,mask:d})}c.matches.splice(e++,0,{fn:f.validator?"string"==typeof f.validator?new RegExp(f.validator):new function(){this.test=f.validator}:new RegExp("."),cardinality:f.cardinality,optionality:c.isOptional,newBlockMarker:g,casing:f.casing,def:f.definitionSymbol||d,placeholder:f.placeholder,mask:d})}else c.matches.splice(e++,0,{fn:null,cardinality:0,optionality:c.isOptional,newBlockMarker:g,casing:null,def:d,placeholder:void 0,mask:d}),m=!1}for(var f,g,h,i,j,k,l=/(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})\??|[^.?*+^${[]()|\\]+|./g,m=!1,n=new d,o=[],p=[];f=l.exec(c);)switch(g=f[0],g.charAt(0)){case b.optionalmarker.end:case b.groupmarker.end:if(h=o.pop(),o.length>0){if(i=o[o.length-1],i.matches.push(h),i.isAlternator){j=o.pop();for(var q=0;q<j.matches.length;q++)j.matches[q].isGroup=!1;o.length>0?(i=o[o.length-1],i.matches.push(j)):n.matches.push(j)}}else n.matches.push(h);break;case b.optionalmarker.start:o.push(new d(!1,!0));break;case b.groupmarker.start:o.push(new d(!0));break;case b.quantifiermarker.start:var r=new d(!1,!1,!0);g=g.replace(/[{}]/g,"");var s=g.split(","),t=isNaN(s[0])?s[0]:parseInt(s[0]),u=1==s.length?t:isNaN(s[1])?s[1]:parseInt(s[1]);if(("*"==u||"+"==u)&&(t="*"==u?0:1),r.quantifier={min:t,max:u},o.length>0){var v=o[o.length-1].matches;if(f=v.pop(),!f.isGroup){var w=new d(!0);w.matches.push(f),f=w}v.push(f),v.push(r)}else{if(f=n.matches.pop(),!f.isGroup){var w=new d(!0);w.matches.push(f),f=w}n.matches.push(f),n.matches.push(r)}break;case b.escapeChar:m=!0;break;case b.alternatormarker:o.length>0?(i=o[o.length-1],k=i.matches.pop()):k=n.matches.pop(),k.isAlternator?o.push(k):(j=new d(!1,!1,!1,!0),j.matches.push(k),o.push(j));break;default:if(o.length>0){if(i=o[o.length-1],i.matches.length>0&&!i.isAlternator&&(k=i.matches[i.matches.length-1],k.isGroup&&(k.isGroup=!1,e(k,b.groupmarker.start,0),e(k,b.groupmarker.end))),e(i,g),i.isAlternator){j=o.pop();for(var q=0;q<j.matches.length;q++)j.matches[q].isGroup=!1;o.length>0?(i=o[o.length-1],i.matches.push(j)):n.matches.push(j)}}else n.matches.length>0&&(k=n.matches[n.matches.length-1],k.isGroup&&(k.isGroup=!1,e(k,b.groupmarker.start,0),e(k,b.groupmarker.end))),e(n,g)}return n.matches.length>0&&(k=n.matches[n.matches.length-1],k.isGroup&&(k.isGroup=!1,e(k,b.groupmarker.start,0),e(k,b.groupmarker.end)),p.push(n)),p}function e(e,f){if(void 0==e||""==e)return void 0;if(1==e.length&&0==b.greedy&&0!=b.repeat&&(b.placeholder=""),b.repeat>0||"*"==b.repeat||"+"==b.repeat){var g="*"==b.repeat?0:"+"==b.repeat?1:b.repeat;e=b.groupmarker.start+e+b.groupmarker.end+b.quantifiermarker.start+g+","+b.repeat+b.quantifiermarker.end}var h;return void 0==a.inputmask.masksCache[e]||c===!0?(h={mask:e,maskToken:d(e),validPositions:{},_buffer:void 0,buffer:void 0,tests:{},metadata:f},c!==!0&&(a.inputmask.masksCache[e]=h)):h=a.extend(!0,{},a.inputmask.masksCache[e]),h}function f(a){if(a=a.toString(),b.numericInput){a=a.split("").reverse();for(var c=0;c<a.length;c++)a[c]==b.optionalmarker.start?a[c]=b.optionalmarker.end:a[c]==b.optionalmarker.end?a[c]=b.optionalmarker.start:a[c]==b.groupmarker.start?a[c]=b.groupmarker.end:a[c]==b.groupmarker.end&&(a[c]=b.groupmarker.start);a=a.join("")}return a}var g=void 0;if(a.isFunction(b.mask)&&(b.mask=b.mask.call(this,b)),a.isArray(b.mask)){if(b.mask.length>1){b.keepStatic=void 0==b.keepStatic?!0:b.keepStatic;var h="(";return a.each(b.mask,function(b,c){h.length>1&&(h+=")|("),h+=f(void 0==c.mask||a.isFunction(c.mask)?c:c.mask)}),h+=")",e(h,b.mask)}b.mask=b.mask.pop()}return b.mask&&(g=void 0==b.mask.mask||a.isFunction(b.mask.mask)?e(f(b.mask),b.mask):e(f(b.mask.mask),b.mask)),g}function f(d,e,f){function g(a,b,c){b=b||0;var d,e,f,g=[],h=0;do{if(a===!0&&l().validPositions[h]){var i=l().validPositions[h];e=i.match,d=i.locator.slice(),g.push(c===!0?i.input:G(h,e))}else f=q(h,d,h-1),e=f.match,d=f.locator.slice(),g.push(G(h,e));h++}while((void 0==da||da>h-1)&&null!=e.fn||null==e.fn&&""!=e.def||b>=h);return g.pop(),g}function l(){return e}function m(a){var b=l();b.buffer=void 0,b.tests={},a!==!0&&(b._buffer=void 0,b.validPositions={},b.p=0)}function n(a,b){var c=l(),d=-1,e=c.validPositions;void 0==a&&(a=-1);var f=d,g=d;for(var h in e){var i=parseInt(h);e[i]&&(b||null!=e[i].match.fn)&&(a>=i&&(f=i),i>=a&&(g=i))}return d=-1!=f&&a-f>1||a>g?f:g}function o(b,c,d){if(f.insertMode&&void 0!=l().validPositions[b]&&void 0==d){var e,g=a.extend(!0,{},l().validPositions),h=n();for(e=b;h>=e;e++)delete l().validPositions[e];l().validPositions[b]=c;var i,j=!0,k=l().validPositions;for(e=i=b;h>=e;e++){var m=g[e];if(void 0!=m)for(var o=i,p=-1;o<B()&&(null==m.match.fn&&k[e]&&(k[e].match.optionalQuantifier===!0||k[e].match.optionality===!0)||null!=m.match.fn);){if(null==m.match.fn||!f.keepStatic&&k[e]&&(void 0!=k[e+1]&&t(e+1,k[e].locator.slice(),e).length>1||void 0!=k[e].alternation)?o++:o=C(i),s(o,m.match.def)){j=z(o,m.input,!0,!0)!==!1,i=o;break}if(j=null==m.match.fn,p==o)break;p=o}if(!j)break}if(!j)return l().validPositions=a.extend(!0,{},g),!1}else l().validPositions[b]=c;return!0}function p(a,b,c,d){var e,g=a;l().p=a,void 0!=l().validPositions[a]&&l().validPositions[a].input==f.radixPoint&&(b++,g++);for(e=g;b>e;e++)void 0!=l().validPositions[e]&&(c===!0||0!=f.canClearPosition(l(),e,n(),d,f))&&delete l().validPositions[e];for(m(!0),e=g+1;e<=n();){for(;void 0!=l().validPositions[g];)g++;var h=l().validPositions[g];g>e&&(e=g+1);var i=l().validPositions[e];void 0!=i&&void 0==h?(s(g,i.match.def)&&z(g,i.input,!0)!==!1&&(delete l().validPositions[e],e++),g++):e++}var j=n(),k=B();for(j>=a&&void 0!=l().validPositions[j]&&l().validPositions[j].input==f.radixPoint&&delete l().validPositions[j],e=j+1;k>=e;e++)l().validPositions[e]&&delete l().validPositions[e];m(!0)}function q(a,b,c){var d=l().validPositions[a];if(void 0==d)for(var e=t(a,b,c),g=n(),h=l().validPositions[g]||t(0)[0],i=void 0!=h.alternation?h.locator[h.alternation].toString().split(","):[],j=0;j<e.length&&(d=e[j],!(d.match&&(f.greedy&&d.match.optionalQuantifier!==!0||(d.match.optionality===!1||d.match.newBlockMarker===!1)&&d.match.optionalQuantifier!==!0)&&(void 0==h.alternation||h.alternation!=d.alternation||void 0!=d.locator[h.alternation]&&y(d.locator[h.alternation].toString().split(","),i))));j++);return d}function r(a){return l().validPositions[a]?l().validPositions[a].match:t(a)[0].match}function s(a,b){for(var c=!1,d=t(a),e=0;e<d.length;e++)if(d[e].match&&d[e].match.def==b){c=!0;break}return c}function t(b,c,d,e){function f(c,d,e,g){function i(e,g,n){if(h>1e4)return alert("jquery.inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. "+l().mask),!0;if(h==b&&void 0==e.matches)return j.push({match:e,locator:g.reverse()}),!0;if(void 0!=e.matches){if(e.isGroup&&n!==!0){if(e=i(c.matches[m+1],g))return!0}else if(e.isOptional){var o=e;if(e=f(e,d,g,n)){var p=j[j.length-1].match,q=0==a.inArray(p,o.matches);if(!q)return!0;k=!0,h=b}}else if(e.isAlternator){var r,s=e,t=[],u=j.slice(),v=g.length,w=d.length>0?d.shift():-1;if(-1==w||"string"==typeof w){var x=h,y=d.slice(),z=[];"string"==typeof w&&(z=w.split(","));for(var A=0;A<s.matches.length;A++){if(j=[],e=i(s.matches[A],[A].concat(g),n)||e,e!==!0&&void 0!=e&&z[z.length-1]<s.matches.length){var B=c.matches.indexOf(e)+1;c.matches.length>B&&(e=i(c.matches[B],[B].concat(g.slice(1,g.length)),n),e&&(z.push(B.toString()),a.each(j,function(a,b){b.alternation=g.length-1})))}r=j.slice(),h=x,j=[];for(var C=0;C<y.length;C++)d[C]=y[C];for(var D=0;D<r.length;D++){var E=r[D];E.alternation=E.alternation||v;for(var F=0;F<t.length;F++){var G=t[F];if(E.match.mask==G.match.mask&&("string"!=typeof w||-1!=a.inArray(E.locator[E.alternation].toString(),z))){r.splice(D,1),D--,G.locator[E.alternation]=G.locator[E.alternation]+","+E.locator[E.alternation],G.alternation=E.alternation;break}}}t=t.concat(r)}"string"==typeof w&&(t=a.map(t,function(b,c){if(isFinite(c)){var d,e=b.alternation,f=b.locator[e].toString().split(",");b.locator[e]=void 0,b.alternation=void 0;for(var g=0;g<f.length;g++)d=-1!=a.inArray(f[g],z),d&&(void 0!=b.locator[e]?(b.locator[e]+=",",b.locator[e]+=f[g]):b.locator[e]=parseInt(f[g]),b.alternation=e);if(void 0!=b.locator[e])return b}})),j=u.concat(t),h=b,k=j.length>0}else e=s.matches[w]?i(s.matches[w],[w].concat(g),n):!1;if(e)return!0}else if(e.isQuantifier&&n!==!0)for(var H=e,I=d.length>0&&n!==!0?d.shift():0;I<(isNaN(H.quantifier.max)?I+1:H.quantifier.max)&&b>=h;I++){var J=c.matches[a.inArray(H,c.matches)-1];if(e=i(J,[I].concat(g),!0)){var p=j[j.length-1].match;p.optionalQuantifier=I>H.quantifier.min-1;var q=0==a.inArray(p,J.matches);if(q){if(I>H.quantifier.min-1){k=!0,h=b;break}return!0}return!0}}else if(e=f(e,d,g,n))return!0}else h++}for(var m=d.length>0?d.shift():0;m<c.matches.length;m++)if(c.matches[m].isQuantifier!==!0){var n=i(c.matches[m],[m].concat(e),g);if(n&&h==b)return n;if(h>b)break}}var g=l().maskToken,h=c?d:0,i=c||[0],j=[],k=!1;if(e===!0&&l().tests[b])return l().tests[b];if(void 0==c){for(var m,n=b-1;void 0==(m=l().validPositions[n])&&n>-1&&(!l().tests[n]||void 0==(m=l().tests[n][0]));)n--;void 0!=m&&n>-1&&(h=n,i=m.locator.slice())}for(var o=i.shift();o<g.length;o++){var p=f(g[o],i,[o]);if(p&&h==b||h>b)break}return(0==j.length||k)&&j.push({match:{fn:null,cardinality:0,optionality:!0,casing:null,def:""},locator:[]}),l().tests[b]=a.extend(!0,[],j),l().tests[b]}function u(){return void 0==l()._buffer&&(l()._buffer=g(!1,1)),l()._buffer}function v(){return void 0==l().buffer&&(l().buffer=g(!0,n(),!0)),l().buffer}function w(a,b,c){if(c=c||v().slice(),a===!0)m(),a=0,b=c.length;else for(var d=a;b>d;d++)delete l().validPositions[d],delete l().tests[d];for(var d=a;b>d;d++)c[d]!=f.skipOptionalPartCharacter&&z(d,c[d],!0,!0)}function x(a,b){switch(b.casing){case"upper":a=a.toUpperCase();break;case"lower":a=a.toLowerCase()}return a}function y(b,c){for(var d=f.greedy?c:c.slice(0,1),e=!1,g=0;g<b.length;g++)if(-1!=a.inArray(b[g],d)){e=!0;break}return e}function z(b,c,d,e){function g(b,c,d,e){var g=!1;return a.each(t(b),function(h,i){for(var j=i.match,k=c?1:0,q="",r=(v(),j.cardinality);r>k;r--)q+=E(b-(r-1));if(c&&(q+=c),g=null!=j.fn?j.fn.test(q,l(),b,d,f):c!=j.def&&c!=f.skipOptionalPartCharacter||""==j.def?!1:{c:j.def,pos:b},g!==!1){var s=void 0!=g.c?g.c:c;s=s==f.skipOptionalPartCharacter&&null===j.fn?j.def:s;var t=b,u=v();if(void 0!=g.remove&&(a.isArray(g.remove)||(g.remove=[g.remove]),a.each(g.remove.sort(function(a,b){return b-a}),function(a,b){p(b,b+1,!0)})),void 0!=g.insert&&(a.isArray(g.insert)||(g.insert=[g.insert]),a.each(g.insert.sort(function(a,b){return a-b}),function(a,b){z(b.pos,b.c,!0)})),g.refreshFromBuffer){var y=g.refreshFromBuffer;if(d=!0,w(y===!0?y:y.start,y.end,u),void 0==g.pos&&void 0==g.c)return g.pos=n(),!1;if(t=void 0!=g.pos?g.pos:b,t!=b)return g=a.extend(g,z(t,s,!0)),!1}else if(g!==!0&&void 0!=g.pos&&g.pos!=b&&(t=g.pos,w(b,t),t!=b))return g=a.extend(g,z(t,s,!0)),!1;return 1!=g&&void 0==g.pos&&void 0==g.c?!1:(h>0&&m(!0),o(t,a.extend({},i,{input:x(s,j)}),e)||(g=!1),!1)}}),g}function h(b,c,d,e){for(var g,h,i,j,k=a.extend(!0,{},l().validPositions),o=n();o>=0&&(j=l().validPositions[o],!j||void 0==j.alternation||(g=o,h=l().validPositions[g].alternation,q(g).locator[j.alternation]==j.locator[j.alternation]));o--);if(void 0!=h)for(var p in l().validPositions)if(j=l().validPositions[p],parseInt(p)>parseInt(g)&&void 0!=j.alternation){var r=l().validPositions[g].locator[h].toString().split(","),s=j.locator[h]||r[0];s.length>0&&(s=s.split(",")[0]);for(var t=0;t<r.length;t++)if(s<r[t]){for(var u,v,w=p-1;w>=0;w--)if(u=l().validPositions[w],void 0!=u){v=u.locator[h],u.locator[h]=parseInt(r[t]);break}if(s!=u.locator[h]){for(var x=[],y=p;y<n()+1;y++){var A=l().validPositions[y];A&&null!=A.match.fn&&x.push(A.input),delete l().validPositions[y],delete l().tests[y]}for(m(!0),f.keepStatic=!f.keepStatic,i=!0;x.length>0;){var B=x.shift();if(B!=f.skipOptionalPartCharacter&&!(i=z(n()+1,B,!1,!0)))break}if(u.alternation=h,u.locator[h]=v,i){var C=n(b)+1;i=z(b>C?C:b,c,d,e)}if(f.keepStatic=!f.keepStatic,i)return i;m(),l().validPositions=a.extend(!0,{},k)}}break}return!1}function i(b,c){for(var d=l().validPositions[c],e=d.locator,f=e.length,g=b;c>g;g++)if(!A(g)){var h=t(g),i=h[0],j=-1;a.each(h,function(a,b){for(var c=0;f>c;c++)b.locator[c]&&y(b.locator[c].toString().split(","),e[c].toString().split(","))&&c>j&&(j=c,i=b)}),o(g,a.extend({},i,{input:i.match.def}),!0)}}d=d===!0;for(var j=v(),k=b-1;k>-1&&!l().validPositions[k];k--);for(k++;b>k;k++)void 0==l().validPositions[k]&&((!A(k)||j[k]!=G(k))&&t(k).length>1||j[k]==f.radixPoint||"0"==j[k]&&a.inArray(f.radixPoint,j)<k)&&g(k,j[k],!0);var r=b,s=!1,u=a.extend(!0,{},l().validPositions);if(r<B()&&(s=g(r,c,d,e),(!d||e)&&s===!1)){var D=l().validPositions[r];if(!D||null!=D.match.fn||D.match.def!=c&&c!=f.skipOptionalPartCharacter){if((f.insertMode||void 0==l().validPositions[C(r)])&&!A(r))for(var F=r+1,H=C(r);H>=F;F++)if(s=g(F,c,d,e),s!==!1){i(r,F),r=F;break}}else s={caret:C(r)}}if(s===!1&&f.keepStatic&&O(j)&&(s=h(b,c,d,e)),s===!0&&(s={pos:r}),a.isFunction(f.postValidation)&&0!=s&&!d){m(!0);var I=f.postValidation(v(),f);if(!I)return m(!0),l().validPositions=a.extend(!0,{},u),!1}return s}function A(a){var b=r(a);if(null!=b.fn)return b.fn;if(!f.keepStatic&&void 0==l().validPositions[a]){for(var c=t(a),d=!0,e=0;e<c.length;e++)if(""!=c[e].match.def&&(void 0==c[e].alternation||c[e].locator[c[e].alternation].length>1)){d=!1;break}return d}return!1}function B(){var a;da=ca.prop("maxLength"),-1==da&&(da=void 0);var b,c=n(),d=l().validPositions[c],e=void 0!=d?d.locator.slice():void 0;for(b=c+1;void 0==d||null!=d.match.fn||null==d.match.fn&&""!=d.match.def;b++)d=q(b,e,b-1),e=d.locator.slice();var f=r(b-1);return a=""!=f.def?b:b-1,void 0==da||da>a?a:da}function C(a){var b=B();if(a>=b)return b;for(var c=a;++c<b&&!A(c)&&(f.nojumps!==!0||f.nojumpsThreshold>c););return c}function D(a){var b=a;if(0>=b)return 0;for(;--b>0&&!A(b););return b}function E(a){return void 0==l().validPositions[a]?G(a):l().validPositions[a].input}function F(b,c,d,e,g){if(e&&a.isFunction(f.onBeforeWrite)){var h=f.onBeforeWrite.call(b,e,c,d,f);if(h){if(h.refreshFromBuffer){var i=h.refreshFromBuffer;w(i===!0?i:i.start,i.end,h.buffer),m(!0),c=v()}d=h.caret||d}}b._valueSet(c.join("")),void 0!=d&&L(b,d),g===!0&&(ga=!0,a(b).trigger("input"))}function G(a,b){if(b=b||r(a),void 0!=b.placeholder)return b.placeholder;if(null==b.fn){if(!f.keepStatic&&void 0==l().validPositions[a]){for(var c=t(a),d=!0,e=0;e<c.length;e++)if(""!=c[e].match.def&&(null!==c[e].match.fn||void 0==c[e].alternation||c[e].locator[c[e].alternation].length>1)){d=!1;break}if(d)return f.placeholder.charAt(a%f.placeholder.length)}return b.def}return f.placeholder.charAt(a%f.placeholder.length)}function H(b,c,d,e){function f(){var a=!1,b=u().slice(i,C(i)).join("").indexOf(h);if(-1!=b&&!A(i)){a=!0;for(var c=u().slice(i,i+b),d=0;d<c.length;d++)if(" "!=c[d]){a=!1;break}}return a}var g=void 0!=e?e.slice():b._valueGet().split(""),h="",i=0;if(m(),l().p=C(-1),c&&b._valueSet(""),!d){var j=u().slice(0,C(-1)).join(""),k=g.join("").match(new RegExp("^"+I(j),"g"));k&&k.length>0&&(g.splice(0,k.length*j.length),i=C(i))}a.each(g,function(c,e){var g=a.Event("keypress");g.which=e.charCodeAt(0),h+=e;var j=n(void 0,!0),k=l().validPositions[j],m=q(j+1,k?k.locator.slice():void 0,j);if(!f()||d){var o=d?c:null==m.match.fn&&m.match.optionality&&j+1<l().p?j+1:l().p;U.call(b,g,!0,!1,d,o),i=o+1,h=""}else U.call(b,g,!0,!1,!0,j+1)}),c&&F(b,v(),a(b).is(":focus")?C(n(0)):void 0,a.Event("checkval"))}function I(b){return a.inputmask.escapeRegex(b)}function J(b){if(b.data("_inputmask")&&!b.hasClass("hasDatepicker")){var c=[],d=l().validPositions;for(var e in d)d[e].match&&null!=d[e].match.fn&&c.push(d[e].input);var g=(ea?c.reverse():c).join(""),h=(ea?v().slice().reverse():v()).join("");return a.isFunction(f.onUnMask)&&(g=f.onUnMask.call(b,h,g,f)||g),g}return b[0]._valueGet()}function K(a){if(ea&&"number"==typeof a&&(!f.greedy||""!=f.placeholder)){var b=v().length;a=b-a}return a}function L(b,c,d){var e,g=b.jquery&&b.length>0?b[0]:b;if("number"!=typeof c)return g.setSelectionRange?(c=g.selectionStart,d=g.selectionEnd):window.getSelection?(e=window.getSelection().getRangeAt(0),(e.commonAncestorContainer.parentNode==g||e.commonAncestorContainer==g)&&(c=e.startOffset,d=e.endOffset)):document.selection&&document.selection.createRange&&(e=document.selection.createRange(),c=0-e.duplicate().moveStart("character",-1e5),d=c+e.text.length),{begin:K(c),end:K(d)};if(c=K(c),d=K(d),d="number"==typeof d?d:c,a(g).is(":visible")){var h=a(g).css("font-size").replace("px","")*d;if(g.scrollLeft=h>g.scrollWidth?h:0,i||0!=f.insertMode||c!=d||d++,g.setSelectionRange)g.selectionStart=c,g.selectionEnd=d;else if(window.getSelection){if(e=document.createRange(),void 0==g.firstChild){var j=document.createTextNode("");g.appendChild(j)}e.setStart(g.firstChild,c<g._valueGet().length?c:g._valueGet().length),e.setEnd(g.firstChild,d<g._valueGet().length?d:g._valueGet().length),e.collapse(!0);var k=window.getSelection();k.removeAllRanges(),k.addRange(e)}else g.createTextRange&&(e=g.createTextRange(),e.collapse(!0),e.moveEnd("character",d),e.moveStart("character",c),e.select())}}function M(b){var c,d,e=v(),f=e.length,g=n(),h={},i=l().validPositions[g],j=void 0!=i?i.locator.slice():void 0;for(c=g+1;c<e.length;c++)d=q(c,j,c-1),j=d.locator.slice(),h[c]=a.extend(!0,{},d);var k=i&&void 0!=i.alternation?i.locator[i.alternation]:void 0;for(c=f-1;c>g&&(d=h[c],(d.match.optionality||d.match.optionalQuantifier||k&&(k!=h[c].locator[i.alternation]&&null!=d.match.fn||null==d.match.fn&&d.locator[i.alternation]&&y(d.locator[i.alternation].toString().split(","),k.split(","))&&""!=t(c)[0].def))&&e[c]==G(c,d.match));c--)f--;return b?{l:f,def:h[f]?h[f].match:void 0}:f}function N(a){for(var b=M(),c=a.length-1;c>b&&!A(c);c--);return a.splice(b,c+1-b),a}function O(b){if(a.isFunction(f.isComplete))return f.isComplete.call(ca,b,f);if("*"==f.repeat)return void 0;{var c=!1,d=M(!0),e=D(d.l);n()}if(void 0==d.def||d.def.newBlockMarker||d.def.optionality||d.def.optionalQuantifier){c=!0;for(var g=0;e>=g;g++){var h=q(g).match;if(null!=h.fn&&void 0==l().validPositions[g]&&h.optionality!==!0&&h.optionalQuantifier!==!0||null==h.fn&&b[g]!=G(g,h)){c=!1;break}}}return c}function P(a,b){return ea?a-b>1||a-b==1&&f.insertMode:b-a>1||b-a==1&&f.insertMode}function Q(b){var c=a._data(b).events,d=!1;a.each(c,function(b,c){a.each(c,function(b,c){if("inputmask"==c.namespace&&"setvalue"!=c.type){var e=c.handler;c.handler=function(b){if(!(this.disabled||this.readOnly&&!("keydown"==b.type&&b.ctrlKey&&67==b.keyCode||b.keyCode==a.inputmask.keyCode.TAB))){switch(b.type){case"input":if(ga===!0||d===!0)return ga=!1,b.preventDefault();break;case"keydown":fa=!1,d=!1;break;case"keypress":if(fa===!0)return b.preventDefault();fa=!0;break;case"compositionstart":d=!0;break;case"compositionupdate":ga=!0;break;case"compositionend":d=!1}return e.apply(this,arguments)}b.preventDefault()}}})})}function R(b){function c(b){if(void 0==a.valHooks[b]||1!=a.valHooks[b].inputmaskpatch){var c=a.valHooks[b]&&a.valHooks[b].get?a.valHooks[b].get:function(a){return a.value},d=a.valHooks[b]&&a.valHooks[b].set?a.valHooks[b].set:function(a,b){return a.value=b,a};a.valHooks[b]={get:function(b){var d=a(b);if(d.data("_inputmask")){if(d.data("_inputmask").opts.autoUnmask)return d.inputmask("unmaskedvalue");var e=c(b),f=d.data("_inputmask"),g=f.maskset,h=g._buffer;return h=h?h.join(""):"",e!=h?e:""}return c(b)},set:function(b,c){var e,f=a(b),g=f.data("_inputmask");return e=d(b,c),g&&f.triggerHandler("setvalue.inputmask"),e},inputmaskpatch:!0}}}function d(){var b=a(this),c=a(this).data("_inputmask");return c?c.opts.autoUnmask?b.inputmask("unmaskedvalue"):g.call(this)!=u().join("")?g.call(this):"":g.call(this)}function e(b){var c=a(this).data("_inputmask");h.call(this,b),c&&a(this).triggerHandler("setvalue.inputmask")}function f(b){a(b).bind("mouseenter.inputmask",function(b){var c=a(this),d=this,e=d._valueGet();""!=e&&e!=v().join("")&&c.triggerHandler("setvalue.inputmask")});
//!! the bound handlers are executed in the order they where bound
var c=a._data(b).events,d=c.mouseover;if(d){for(var e=d[d.length-1],f=d.length-1;f>0;f--)d[f]=d[f-1];d[0]=e}}var g,h;if(!b._valueGet){var i;Object.getOwnPropertyDescriptor&&void 0==b.value?(g=function(){return this.textContent},h=function(a){this.textContent=a},Object.defineProperty(b,"value",{get:d,set:e})):((i=Object.getOwnPropertyDescriptor&&Object.getOwnPropertyDescriptor(b,"value"))&&i.configurable,document.__lookupGetter__&&b.__lookupGetter__("value")?(g=b.__lookupGetter__("value"),h=b.__lookupSetter__("value"),b.__defineGetter__("value",d),b.__defineSetter__("value",e)):(g=function(){return b.value},h=function(a){b.value=a},c(b.type),f(b))),b._valueGet=function(a){return ea&&a!==!0?g.call(this).split("").reverse().join(""):g.call(this)},b._valueSet=function(a){h.call(this,ea?a.split("").reverse().join(""):a)}}}function S(b,c,d,e){function g(){if(f.keepStatic){m(!0);var c,d=[],e=a.extend(!0,{},l().validPositions);for(c=n();c>=0;c--){var g=l().validPositions[c];if(g){if(void 0!=g.alternation&&g.locator[g.alternation]==q(c).locator[g.alternation])break;null!=g.match.fn&&d.push(g.input),delete l().validPositions[c]}}if(c>0)for(;d.length>0;){l().p=C(n());var h=a.Event("keypress");h.which=d.pop().charCodeAt(0),U.call(b,h,!0,!1,!1,l().p)}else l().validPositions=a.extend(!0,{},e)}}if((f.numericInput||ea)&&(c==a.inputmask.keyCode.BACKSPACE?c=a.inputmask.keyCode.DELETE:c==a.inputmask.keyCode.DELETE&&(c=a.inputmask.keyCode.BACKSPACE),ea)){var h=d.end;d.end=d.begin,d.begin=h}if(c==a.inputmask.keyCode.BACKSPACE&&(d.end-d.begin<1||0==f.insertMode)?d.begin=D(d.begin):c==a.inputmask.keyCode.DELETE&&d.begin==d.end&&(d.end=A(d.end)?d.end+1:C(d.end)+1),p(d.begin,d.end,!1,e),e!==!0){g();var i=n(d.begin);i<d.begin?(-1==i&&m(),l().p=C(i)):l().p=d.begin}}function T(c){var d=this,e=a(d),g=c.keyCode,i=L(d);g==a.inputmask.keyCode.BACKSPACE||g==a.inputmask.keyCode.DELETE||h&&127==g||c.ctrlKey&&88==g&&!b("cut")?(c.preventDefault(),88==g&&(_=v().join("")),S(d,g,i),F(d,v(),l().p,c,_!=v().join("")),d._valueGet()==u().join("")?e.trigger("cleared"):O(v())===!0&&e.trigger("complete"),f.showTooltip&&e.prop("title",l().mask)):g==a.inputmask.keyCode.END||g==a.inputmask.keyCode.PAGE_DOWN?setTimeout(function(){var a=C(n());f.insertMode||a!=B()||c.shiftKey||a--,L(d,c.shiftKey?i.begin:a,a)},0):g==a.inputmask.keyCode.HOME&&!c.shiftKey||g==a.inputmask.keyCode.PAGE_UP?L(d,0,c.shiftKey?i.begin:0):(f.undoOnEscape&&g==a.inputmask.keyCode.ESCAPE||90==g&&c.ctrlKey)&&c.altKey!==!0?(H(d,!0,!1,_.split("")),e.click()):g!=a.inputmask.keyCode.INSERT||c.shiftKey||c.ctrlKey?0!=f.insertMode||c.shiftKey||(g==a.inputmask.keyCode.RIGHT?setTimeout(function(){var a=L(d);L(d,a.begin)},0):g==a.inputmask.keyCode.LEFT&&setTimeout(function(){var a=L(d);L(d,ea?a.begin+1:a.begin-1)},0)):(f.insertMode=!f.insertMode,L(d,f.insertMode||i.begin!=B()?i.begin:i.begin-1)),f.onKeyDown.call(this,c,v(),L(d).begin,f),ha=-1!=a.inArray(g,f.ignorables)}function U(b,c,d,e,g){var h=this,i=a(h),j=b.which||b.charCode||b.keyCode;if(!(c===!0||b.ctrlKey&&b.altKey)&&(b.ctrlKey||b.metaKey||ha))return!0;if(j){46==j&&0==b.shiftKey&&","==f.radixPoint&&(j=44);var k,n=c?{begin:g,end:g}:L(h),p=String.fromCharCode(j),q=P(n.begin,n.end);q&&(l().undoPositions=a.extend(!0,{},l().validPositions),S(h,a.inputmask.keyCode.DELETE,n,!0),n.begin=l().p,f.insertMode||(f.insertMode=!f.insertMode,o(n.begin,e),f.insertMode=!f.insertMode),q=!f.multi),l().writeOutBuffer=!0;var r=ea&&!q?n.end:n.begin,s=z(r,p,e);if(s!==!1){if(s!==!0&&(r=void 0!=s.pos?s.pos:r,p=void 0!=s.c?s.c:p),m(!0),void 0!=s.caret)k=s.caret;else{var u=l().validPositions;k=!f.keepStatic&&(void 0!=u[r+1]&&t(r+1,u[r].locator.slice(),r).length>1||void 0!=u[r].alternation)?r+1:C(r)}l().p=k}if(d!==!1){var x=this;if(setTimeout(function(){f.onKeyValidation.call(x,s,f)},0),l().writeOutBuffer&&s!==!1){var y=v();F(h,y,c?void 0:f.numericInput?D(k):k,b,c!==!0),c!==!0&&setTimeout(function(){O(y)===!0&&i.trigger("complete")},0)}else q&&(l().buffer=void 0,l().validPositions=l().undoPositions)}else q&&(l().buffer=void 0,l().validPositions=l().undoPositions);if(f.showTooltip&&i.prop("title",l().mask),c&&a.isFunction(f.onBeforeWrite)){var A=f.onBeforeWrite.call(this,b,v(),k,f);if(A&&A.refreshFromBuffer){var B=A.refreshFromBuffer;w(B===!0?B:B.start,B.end,A.buffer),m(!0),A.caret&&(l().p=A.caret)}}b.preventDefault()}}function V(b){var c=this,d=a(c),e=c._valueGet(!0),g=L(c);if("propertychange"==b.type&&c._valueGet().length<=B())return!0;if("paste"==b.type){var h=e.substr(0,g.begin),i=e.substr(g.end,e.length);h==u().slice(0,g.begin).join("")&&(h=""),i==u().slice(g.end).join("")&&(i=""),window.clipboardData&&window.clipboardData.getData?e=h+window.clipboardData.getData("Text")+i:b.originalEvent&&b.originalEvent.clipboardData&&b.originalEvent.clipboardData.getData&&(e=h+b.originalEvent.clipboardData.getData("text/plain")+i)}var j=e;if(a.isFunction(f.onBeforePaste)){if(j=f.onBeforePaste.call(c,e,f),j===!1)return b.preventDefault(),!1;j||(j=e)}return H(c,!0,!1,ea?j.split("").reverse():j.split("")),d.click(),O(v())===!0&&d.trigger("complete"),!1}function W(b){var c=this;H(c,!0,!1),O(v())===!0&&a(c).trigger("complete"),b.preventDefault()}function X(a){var b=this;_=v().join(""),(""==ba||0!=a.originalEvent.data.indexOf(ba))&&(aa=L(b))}function Y(b){var c=this,d=aa||L(c);0==b.originalEvent.data.indexOf(ba)&&(m(),d={begin:0,end:0});var e=b.originalEvent.data;L(c,d.begin,d.end);for(var g=0;g<e.length;g++){var h=a.Event("keypress");h.which=e.charCodeAt(g),fa=!1,ha=!1,U.call(c,h)}setTimeout(function(){var a=l().p;F(c,v(),f.numericInput?D(a):a)},0),ba=b.originalEvent.data}function Z(a){}function $(b){if(ca=a(b),ca.data("_inputmask",{maskset:e,opts:f,isRTL:!1}),f.showTooltip&&ca.prop("title",l().mask),("rtl"==b.dir||f.rightAlign)&&ca.css("text-align","right"),"rtl"==b.dir||f.numericInput){b.dir="ltr",ca.removeAttr("dir");var d=ca.data("_inputmask");d.isRTL=!0,ca.data("_inputmask",d),ea=!0}ca.unbind(".inputmask"),(ca.is(":input")&&c(ca.attr("type"))||b.isContentEditable)&&(ca.closest("form").bind("submit",function(a){_!=v().join("")&&ca.change(),ca[0]._valueGet&&ca[0]._valueGet()==u().join("")&&ca[0]._valueSet(""),f.removeMaskOnSubmit&&ca.inputmask("remove")}).bind("reset",function(){setTimeout(function(){ca.triggerHandler("setvalue.inputmask")},0)}),ca.bind("mouseenter.inputmask",function(){var b=a(this),c=this;!b.is(":focus")&&f.showMaskOnHover&&c._valueGet()!=v().join("")&&F(c,v())}).bind("blur.inputmask",function(b){var c=a(this),d=this;if(c.data("_inputmask")){var e=d._valueGet(),g=v().slice();ia=!0,_!=g.join("")&&setTimeout(function(){c.change(),_=g.join("")},0),""!=e&&(f.clearMaskOnLostFocus&&(e==u().join("")?g=[]:N(g)),O(g)===!1&&(c.trigger("incomplete"),f.clearIncomplete&&(m(),g=f.clearMaskOnLostFocus?[]:u().slice())),F(d,g,void 0,b))}}).bind("focus.inputmask",function(b){var c=(a(this),this),d=c._valueGet();f.showMaskOnFocus&&(!f.showMaskOnHover||f.showMaskOnHover&&""==d)&&c._valueGet()!=v().join("")&&F(c,v(),C(n())),_=v().join("")}).bind("mouseleave.inputmask",function(){var b=a(this),c=this;if(f.clearMaskOnLostFocus){var d=v().slice(),e=c._valueGet();b.is(":focus")||e==b.attr("placeholder")||""==e||(e==u().join("")?d=[]:N(d),F(c,d))}}).bind("click.inputmask",function(){var b=a(this),c=this;if(b.is(":focus")){var d=L(c);if(d.begin==d.end)if(f.radixFocus&&""!=f.radixPoint&&-1!=a.inArray(f.radixPoint,v())&&(ia||v().join("")==u().join("")))L(c,a.inArray(f.radixPoint,v())),ia=!1;else{var e=K(d.begin),g=C(n(e));g>e?L(c,A(e)?e:C(e)):L(c,g)}}}).bind("dblclick.inputmask",function(){var a=this;setTimeout(function(){L(a,0,C(n()))},0)}).bind(k+".inputmask dragdrop.inputmask drop.inputmask",V).bind("cut.inputmask",function(b){ga=!0;var c=this,d=a(c),e=L(c);S(c,a.inputmask.keyCode.DELETE,e),F(c,v(),l().p,b,_!=v().join("")),c._valueGet()==u().join("")&&d.trigger("cleared"),f.showTooltip&&d.prop("title",l().mask)}).bind("complete.inputmask",f.oncomplete).bind("incomplete.inputmask",f.onincomplete).bind("cleared.inputmask",f.oncleared),ca.bind("keydown.inputmask",T).bind("keypress.inputmask",U),j||ca.bind("compositionstart.inputmask",X).bind("compositionupdate.inputmask",Y).bind("compositionend.inputmask",Z),"paste"===k&&ca.bind("input.inputmask",W)),ca.bind("setvalue.inputmask",function(){var b=this,c=b._valueGet();b._valueSet(a.isFunction(f.onBeforeMask)?f.onBeforeMask.call(b,c,f)||c:c),H(b,!0,!1),_=v().join(""),(f.clearMaskOnLostFocus||f.clearIncomplete)&&b._valueGet()==u().join("")&&b._valueSet("")}),R(b);var g=a.isFunction(f.onBeforeMask)?f.onBeforeMask.call(b,b._valueGet(),f)||b._valueGet():b._valueGet();H(b,!0,!1,g.split(""));var h=v().slice();_=h.join("");var i;try{i=document.activeElement}catch(o){}O(h)===!1&&f.clearIncomplete&&m(),f.clearMaskOnLostFocus&&(h.join("")==u().join("")?h=[]:N(h)),F(b,h),i===b&&L(b,C(n())),Q(b)}var _,aa,ba,ca,da,ea=!1,fa=!1,ga=!1,ha=!1,ia=!0;if(void 0!=d)switch(d.action){case"isComplete":return ca=a(d.el),e=ca.data("_inputmask").maskset,f=ca.data("_inputmask").opts,O(d.buffer);case"unmaskedvalue":return ca=d.$input,e=ca.data("_inputmask").maskset,f=ca.data("_inputmask").opts,ea=d.$input.data("_inputmask").isRTL,J(d.$input);case"mask":_=v().join(""),$(d.el);break;case"format":ca=a({}),ca.data("_inputmask",{maskset:e,opts:f,isRTL:f.numericInput}),f.numericInput&&(ea=!0);var ja=(a.isFunction(f.onBeforeMask)?f.onBeforeMask.call(ca,d.value,f)||d.value:d.value).split("");return H(ca,!1,!1,ea?ja.reverse():ja),a.isFunction(f.onBeforeWrite)&&f.onBeforeWrite.call(this,void 0,v(),0,f),d.metadata?{value:ea?v().slice().reverse().join(""):v().join(""),metadata:ca.inputmask("getmetadata")}:ea?v().slice().reverse().join(""):v().join("");case"isValid":ca=a({}),ca.data("_inputmask",{maskset:e,opts:f,isRTL:f.numericInput}),f.numericInput&&(ea=!0);var ja=d.value.split("");H(ca,!1,!0,ea?ja.reverse():ja);for(var ka=v(),la=M(),ma=ka.length-1;ma>la&&!A(ma);ma--);return ka.splice(la,ma+1-la),O(ka)&&d.value==ka.join("");case"getemptymask":return ca=a(d.el),e=ca.data("_inputmask").maskset,f=ca.data("_inputmask").opts,u();case"remove":var na=d.el;ca=a(na),e=ca.data("_inputmask").maskset,f=ca.data("_inputmask").opts,na._valueSet(J(ca)),ca.unbind(".inputmask"),ca.removeData("_inputmask");var oa;Object.getOwnPropertyDescriptor&&(oa=Object.getOwnPropertyDescriptor(na,"value")),oa&&oa.get?na._valueGet&&Object.defineProperty(na,"value",{get:na._valueGet,set:na._valueSet}):document.__lookupGetter__&&na.__lookupGetter__("value")&&na._valueGet&&(na.__defineGetter__("value",na._valueGet),na.__defineSetter__("value",na._valueSet));try{delete na._valueGet,delete na._valueSet}catch(pa){na._valueGet=void 0,na._valueSet=void 0}break;case"getmetadata":if(ca=a(d.el),e=ca.data("_inputmask").maskset,f=ca.data("_inputmask").opts,a.isArray(e.metadata)){for(var qa,ra=n(),sa=ra;sa>=0;sa--)if(l().validPositions[sa]&&void 0!=l().validPositions[sa].alternation){qa=l().validPositions[sa].alternation;break}return void 0!=qa?e.metadata[l().validPositions[ra].locator[qa]]:e.metadata[0]}return e.metadata}}if(void 0===a.fn.inputmask){var g=navigator.userAgent,h=null!==g.match(new RegExp("iphone","i")),i=(null!==g.match(new RegExp("android.*safari.*","i")),null!==g.match(new RegExp("android.*chrome.*","i"))),j=null!==g.match(new RegExp("android.*firefox.*","i")),k=(/Kindle/i.test(g)||/Silk/i.test(g)||/KFTT/i.test(g)||/KFOT/i.test(g)||/KFJWA/i.test(g)||/KFJWI/i.test(g)||/KFSOWI/i.test(g)||/KFTHWA/i.test(g)||/KFTHWI/i.test(g)||/KFAPWA/i.test(g)||/KFAPWI/i.test(g),b("paste")?"paste":b("input")?"input":"propertychange");a.inputmask={defaults:{placeholder:"_",optionalmarker:{start:"[",end:"]"},quantifiermarker:{start:"{",end:"}"},groupmarker:{start:"(",end:")"},alternatormarker:"|",escapeChar:"\\",mask:null,oncomplete:a.noop,onincomplete:a.noop,oncleared:a.noop,repeat:0,greedy:!0,autoUnmask:!1,removeMaskOnSubmit:!1,clearMaskOnLostFocus:!0,insertMode:!0,clearIncomplete:!1,aliases:{},alias:null,onKeyDown:a.noop,onBeforeMask:void 0,onBeforePaste:void 0,onBeforeWrite:void 0,onUnMask:void 0,showMaskOnFocus:!0,showMaskOnHover:!0,onKeyValidation:a.noop,skipOptionalPartCharacter:" ",showTooltip:!1,numericInput:!1,rightAlign:!1,undoOnEscape:!0,radixPoint:"",radixFocus:!1,nojumps:!1,nojumpsThreshold:0,keepStatic:void 0,definitions:{9:{validator:"[0-9]",cardinality:1,definitionSymbol:"*"},a:{validator:"[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",cardinality:1,definitionSymbol:"*"},"*":{validator:"[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",cardinality:1}},ignorables:[8,9,13,19,27,33,34,35,36,37,38,39,40,45,46,93,112,113,114,115,116,117,118,119,120,121,122,123],isComplete:void 0,canClearPosition:a.noop,postValidation:void 0},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91},masksCache:{},escapeRegex:function(a){var b=["/",".","*","+","?","|","(",")","[","]","{","}","\\","$","^"];return a.replace(new RegExp("(\\"+b.join("|\\")+")","gim"),"\\$1")},format:function(b,c,g){var h=a.extend(!0,{},a.inputmask.defaults,c);return d(h.alias,c,h),f({action:"format",value:b,metadata:g},e(h,c&&void 0!==c.definitions),h)},isValid:function(b,c){var g=a.extend(!0,{},a.inputmask.defaults,c);return d(g.alias,c,g),f({action:"isValid",value:b},e(g,c&&void 0!==c.definitions),g)}},a.fn.inputmask=function(b,c){function g(b,c,e){var f=a(b);f.data("inputmask-alias")&&d(f.data("inputmask-alias"),a.extend(!0,{},c),c);for(var g in c){var h=f.data("inputmask-"+g.toLowerCase());void 0!=h&&(h="boolean"==typeof h?h:h.toString(),"mask"==g&&0==h.indexOf("[")?(c[g]=h.replace(/[\s[\]]/g,"").split("','"),c[g][0]=c[g][0].replace("'",""),c[g][c[g].length-1]=c[g][c[g].length-1].replace("'","")):c[g]=h,e&&(e[g]=c[g]))}return c}var h,i=a.extend(!0,{},a.inputmask.defaults,c);if("string"==typeof b)switch(b){case"mask":return d(i.alias,c,i),this.each(function(){return g(this,i),h=e(i,c&&void 0!==c.definitions),void 0==h?this:void f({action:"mask",el:this},h,i)});case"unmaskedvalue":var j=a(this);return j.data("_inputmask")?f({action:"unmaskedvalue",$input:j}):j.val();case"remove":return this.each(function(){var b=a(this);b.data("_inputmask")&&f({action:"remove",el:this})});case"getemptymask":return this.data("_inputmask")?f({action:"getemptymask",el:this}):"";case"hasMaskedValue":return this.data("_inputmask")?!this.data("_inputmask").opts.autoUnmask:!1;case"isComplete":return this.data("_inputmask")?f({action:"isComplete",buffer:this[0]._valueGet().split(""),el:this}):!0;case"getmetadata":return this.data("_inputmask")?f({action:"getmetadata",el:this}):void 0;default:return d(i.alias,c,i),d(b,c,i)||(i.mask=b),this.each(function(){return g(this,i),h=e(i,c&&void 0!==c.definitions),void 0==h?this:void f({action:"mask",el:this},h,i)})}else{if("object"==typeof b)return i=a.extend(!0,{},a.inputmask.defaults,b),d(i.alias,b,i),this.each(function(){return g(this,i),h=e(i,b&&void 0!==b.definitions),void 0==h?this:void f({action:"mask",el:this},h,i)});if(void 0==b)return this.each(function(){var b=a(this).attr("data-inputmask");if(b&&""!=b)try{b=b.replace(new RegExp("'","g"),'"');var e=a.parseJSON("{"+b+"}");a.extend(!0,e,c),i=a.extend(!0,{},a.inputmask.defaults,e),i=g(this,i),d(i.alias,e,i),i.alias=void 0,a(this).inputmask("mask",i)}catch(f){}if(a(this).attr("data-inputmask-mask")||a(this).attr("data-inputmask-alias")){i=a.extend(!0,{},a.inputmask.defaults,{});var h={};i=g(this,i,h),d(i.alias,h,i),i.alias=void 0,a(this).inputmask("mask",i)}})}}}return a.fn.inputmask}(jQuery),function(a){return a.extend(a.inputmask.defaults.definitions,{h:{validator:"[01][0-9]|2[0-3]",cardinality:2,prevalidator:[{validator:"[0-2]",cardinality:1}]},s:{validator:"[0-5][0-9]",cardinality:2,prevalidator:[{validator:"[0-5]",cardinality:1}]},d:{validator:"0[1-9]|[12][0-9]|3[01]",cardinality:2,prevalidator:[{validator:"[0-3]",cardinality:1}]},m:{validator:"0[1-9]|1[012]",cardinality:2,prevalidator:[{validator:"[01]",cardinality:1}]},y:{validator:"(19|20)\\d{2}",cardinality:4,prevalidator:[{validator:"[12]",cardinality:1},{validator:"(19|20)",cardinality:2},{validator:"(19|20)\\d",cardinality:3}]}}),a.extend(a.inputmask.defaults.aliases,{"dd/mm/yyyy":{mask:"1/2/y",placeholder:"dd/mm/yyyy",regex:{val1pre:new RegExp("[0-3]"),val1:new RegExp("0[1-9]|[12][0-9]|3[01]"),val2pre:function(b){var c=a.inputmask.escapeRegex.call(this,b);return new RegExp("((0[1-9]|[12][0-9]|3[01])"+c+"[01])")},val2:function(b){var c=a.inputmask.escapeRegex.call(this,b);return new RegExp("((0[1-9]|[12][0-9])"+c+"(0[1-9]|1[012]))|(30"+c+"(0[13-9]|1[012]))|(31"+c+"(0[13578]|1[02]))")}},leapday:"29/02/",separator:"/",yearrange:{minyear:1900,maxyear:2099},isInYearRange:function(a,b,c){if(isNaN(a))return!1;var d=parseInt(a.concat(b.toString().slice(a.length))),e=parseInt(a.concat(c.toString().slice(a.length)));return(isNaN(d)?!1:d>=b&&c>=d)||(isNaN(e)?!1:e>=b&&c>=e)},determinebaseyear:function(a,b,c){var d=(new Date).getFullYear();if(a>d)return a;if(d>b){for(var e=b.toString().slice(0,2),f=b.toString().slice(2,4);e+c>b;)e--;var g=e+f;return a>g?a:g}return d},onKeyDown:function(b,c,d,e){var f=a(this);if(b.ctrlKey&&b.keyCode==a.inputmask.keyCode.RIGHT){var g=new Date;f.val(g.getDate().toString()+(g.getMonth()+1).toString()+g.getFullYear().toString()),f.triggerHandler("setvalue.inputmask")}},getFrontValue:function(a,b,c){for(var d=0,e=0,f=0;f<a.length&&"2"!=a.charAt(f);f++){var g=c.definitions[a.charAt(f)];g?(d+=e,e=g.cardinality):e++}return b.join("").substr(d,e)},definitions:{1:{validator:function(a,b,c,d,e){var f=e.regex.val1.test(a);return d||f||a.charAt(1)!=e.separator&&-1=="-./".indexOf(a.charAt(1))||!(f=e.regex.val1.test("0"+a.charAt(0)))?f:(b.buffer[c-1]="0",{refreshFromBuffer:{start:c-1,end:c},pos:c,c:a.charAt(0)})},cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){var f=a;isNaN(b.buffer[c+1])||(f+=b.buffer[c+1]);var g=1==f.length?e.regex.val1pre.test(f):e.regex.val1.test(f);if(!d&&!g){if(g=e.regex.val1.test(a+"0"))return b.buffer[c]=a,b.buffer[++c]="0",{pos:c,c:"0"};if(g=e.regex.val1.test("0"+a))return b.buffer[c]="0",c++,{pos:c}}return g},cardinality:1}]},2:{validator:function(a,b,c,d,e){var f=e.getFrontValue(b.mask,b.buffer,e);-1!=f.indexOf(e.placeholder[0])&&(f="01"+e.separator);var g=e.regex.val2(e.separator).test(f+a);if(!d&&!g&&(a.charAt(1)==e.separator||-1!="-./".indexOf(a.charAt(1)))&&(g=e.regex.val2(e.separator).test(f+"0"+a.charAt(0))))return b.buffer[c-1]="0",{refreshFromBuffer:{start:c-1,end:c},pos:c,c:a.charAt(0)};if(e.mask.indexOf("2")==e.mask.length-1&&g){var h=b.buffer.join("").substr(4,4)+a;if(h!=e.leapday)return!0;var i=parseInt(b.buffer.join("").substr(0,4),10);return i%4===0?i%100===0?i%400===0?!0:!1:!0:!1}return g},cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){isNaN(b.buffer[c+1])||(a+=b.buffer[c+1]);var f=e.getFrontValue(b.mask,b.buffer,e);-1!=f.indexOf(e.placeholder[0])&&(f="01"+e.separator);var g=1==a.length?e.regex.val2pre(e.separator).test(f+a):e.regex.val2(e.separator).test(f+a);return d||g||!(g=e.regex.val2(e.separator).test(f+"0"+a))?g:(b.buffer[c]="0",c++,{pos:c})},cardinality:1}]},y:{validator:function(a,b,c,d,e){if(e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear)){var f=b.buffer.join("").substr(0,6);if(f!=e.leapday)return!0;var g=parseInt(a,10);return g%4===0?g%100===0?g%400===0?!0:!1:!0:!1}return!1},cardinality:4,prevalidator:[{validator:function(a,b,c,d,e){var f=e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear);if(!d&&!f){var g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a+"0").toString().slice(0,1);if(f=e.isInYearRange(g+a,e.yearrange.minyear,e.yearrange.maxyear))return b.buffer[c++]=g.charAt(0),{pos:c};if(g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a+"0").toString().slice(0,2),f=e.isInYearRange(g+a,e.yearrange.minyear,e.yearrange.maxyear))return b.buffer[c++]=g.charAt(0),b.buffer[c++]=g.charAt(1),{pos:c}}return f},cardinality:1},{validator:function(a,b,c,d,e){var f=e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear);if(!d&&!f){var g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a).toString().slice(0,2);if(f=e.isInYearRange(a[0]+g[1]+a[1],e.yearrange.minyear,e.yearrange.maxyear))return b.buffer[c++]=g.charAt(1),{pos:c};if(g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a).toString().slice(0,2),e.isInYearRange(g+a,e.yearrange.minyear,e.yearrange.maxyear)){var h=b.buffer.join("").substr(0,6);if(h!=e.leapday)f=!0;else{var i=parseInt(a,10);f=i%4===0?i%100===0?i%400===0?!0:!1:!0:!1}}else f=!1;if(f)return b.buffer[c-1]=g.charAt(0),b.buffer[c++]=g.charAt(1),b.buffer[c++]=a.charAt(0),{refreshFromBuffer:{start:c-3,end:c},pos:c}}return f},cardinality:2},{validator:function(a,b,c,d,e){return e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear)},cardinality:3}]}},insertMode:!1,autoUnmask:!1},"mm/dd/yyyy":{placeholder:"mm/dd/yyyy",alias:"dd/mm/yyyy",regex:{val2pre:function(b){var c=a.inputmask.escapeRegex.call(this,b);return new RegExp("((0[13-9]|1[012])"+c+"[0-3])|(02"+c+"[0-2])")},val2:function(b){var c=a.inputmask.escapeRegex.call(this,b);return new RegExp("((0[1-9]|1[012])"+c+"(0[1-9]|[12][0-9]))|((0[13-9]|1[012])"+c+"30)|((0[13578]|1[02])"+c+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},leapday:"02/29/",onKeyDown:function(b,c,d,e){var f=a(this);if(b.ctrlKey&&b.keyCode==a.inputmask.keyCode.RIGHT){var g=new Date;f.val((g.getMonth()+1).toString()+g.getDate().toString()+g.getFullYear().toString()),f.triggerHandler("setvalue.inputmask")}}},"yyyy/mm/dd":{mask:"y/1/2",placeholder:"yyyy/mm/dd",alias:"mm/dd/yyyy",leapday:"/02/29",onKeyDown:function(b,c,d,e){var f=a(this);if(b.ctrlKey&&b.keyCode==a.inputmask.keyCode.RIGHT){var g=new Date;f.val(g.getFullYear().toString()+(g.getMonth()+1).toString()+g.getDate().toString()),f.triggerHandler("setvalue.inputmask")}}},"dd.mm.yyyy":{mask:"1.2.y",placeholder:"dd.mm.yyyy",leapday:"29.02.",separator:".",alias:"dd/mm/yyyy"},"dd-mm-yyyy":{mask:"1-2-y",placeholder:"dd-mm-yyyy",leapday:"29-02-",separator:"-",alias:"dd/mm/yyyy"},"mm.dd.yyyy":{mask:"1.2.y",placeholder:"mm.dd.yyyy",leapday:"02.29.",separator:".",alias:"mm/dd/yyyy"},"mm-dd-yyyy":{mask:"1-2-y",placeholder:"mm-dd-yyyy",leapday:"02-29-",separator:"-",alias:"mm/dd/yyyy"},"yyyy.mm.dd":{mask:"y.1.2",placeholder:"yyyy.mm.dd",leapday:".02.29",separator:".",alias:"yyyy/mm/dd"},"yyyy-mm-dd":{mask:"y-1-2",placeholder:"yyyy-mm-dd",leapday:"-02-29",separator:"-",alias:"yyyy/mm/dd"},datetime:{mask:"1/2/y h:s",placeholder:"dd/mm/yyyy hh:mm",alias:"dd/mm/yyyy",regex:{hrspre:new RegExp("[012]"),hrs24:new RegExp("2[0-4]|1[3-9]"),hrs:new RegExp("[01][0-9]|2[0-4]"),ampm:new RegExp("^[a|p|A|P][m|M]"),mspre:new RegExp("[0-5]"),ms:new RegExp("[0-5][0-9]")},timeseparator:":",hourFormat:"24",definitions:{h:{validator:function(a,b,c,d,e){if("24"==e.hourFormat&&24==parseInt(a,10))return b.buffer[c-1]="0",b.buffer[c]="0",{refreshFromBuffer:{start:c-1,end:c},c:"0"};var f=e.regex.hrs.test(a);if(!d&&!f&&(a.charAt(1)==e.timeseparator||-1!="-.:".indexOf(a.charAt(1)))&&(f=e.regex.hrs.test("0"+a.charAt(0))))return b.buffer[c-1]="0",b.buffer[c]=a.charAt(0),c++,{refreshFromBuffer:{start:c-2,end:c},pos:c,c:e.timeseparator};if(f&&"24"!==e.hourFormat&&e.regex.hrs24.test(a)){var g=parseInt(a,10);return 24==g?(b.buffer[c+5]="a",b.buffer[c+6]="m"):(b.buffer[c+5]="p",b.buffer[c+6]="m"),g-=12,10>g?(b.buffer[c]=g.toString(),b.buffer[c-1]="0"):(b.buffer[c]=g.toString().charAt(1),b.buffer[c-1]=g.toString().charAt(0)),{refreshFromBuffer:{start:c-1,end:c+6},c:b.buffer[c]}}return f},cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){var f=e.regex.hrspre.test(a);return d||f||!(f=e.regex.hrs.test("0"+a))?f:(b.buffer[c]="0",c++,{pos:c})},cardinality:1}]},s:{validator:"[0-5][0-9]",cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){var f=e.regex.mspre.test(a);return d||f||!(f=e.regex.ms.test("0"+a))?f:(b.buffer[c]="0",c++,{pos:c})},cardinality:1}]},t:{validator:function(a,b,c,d,e){return e.regex.ampm.test(a+"m")},casing:"lower",cardinality:1}},insertMode:!1,autoUnmask:!1},datetime12:{mask:"1/2/y h:s t\\m",placeholder:"dd/mm/yyyy hh:mm xm",alias:"datetime",hourFormat:"12"},"hh:mm t":{mask:"h:s t\\m",placeholder:"hh:mm xm",alias:"datetime",hourFormat:"12"},"h:s t":{mask:"h:s t\\m",placeholder:"hh:mm xm",alias:"datetime",hourFormat:"12"},"hh:mm:ss":{mask:"h:s:s",placeholder:"hh:mm:ss",alias:"datetime",autoUnmask:!1},"hh:mm":{mask:"h:s",placeholder:"hh:mm",alias:"datetime",autoUnmask:!1},date:{alias:"dd/mm/yyyy"},"mm/yyyy":{mask:"1/y",placeholder:"mm/yyyy",leapday:"donotuse",separator:"/",alias:"mm/dd/yyyy"}}),a.fn.inputmask}(jQuery),function(a){return a.extend(a.inputmask.defaults.definitions,{A:{validator:"[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",cardinality:1,casing:"upper"},"#":{validator:"[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",cardinality:1,casing:"upper"}}),a.extend(a.inputmask.defaults.aliases,{url:{mask:"ir",placeholder:"",separator:"",defaultPrefix:"http://",regex:{urlpre1:new RegExp("[fh]"),urlpre2:new RegExp("(ft|ht)"),urlpre3:new RegExp("(ftp|htt)"),urlpre4:new RegExp("(ftp:|http|ftps)"),urlpre5:new RegExp("(ftp:/|ftps:|http:|https)"),urlpre6:new RegExp("(ftp://|ftps:/|http:/|https:)"),urlpre7:new RegExp("(ftp://|ftps://|http://|https:/)"),urlpre8:new RegExp("(ftp://|ftps://|http://|https://)")},definitions:{i:{validator:function(a,b,c,d,e){return!0},cardinality:8,prevalidator:function(){for(var a=[],b=8,c=0;b>c;c++)a[c]=function(){var a=c;return{validator:function(b,c,d,e,f){if(f.regex["urlpre"+(a+1)]){var g,h=b;a+1-b.length>0&&(h=c.buffer.join("").substring(0,a+1-b.length)+""+h);var i=f.regex["urlpre"+(a+1)].test(h);if(!e&&!i){for(d-=a,g=0;g<f.defaultPrefix.length;g++)c.buffer[d]=f.defaultPrefix[g],d++;for(g=0;g<h.length-1;g++)c.buffer[d]=h[g],d++;return{pos:d}}return i}return!1},cardinality:a}}();return a}()},r:{validator:".",cardinality:50}},insertMode:!1,autoUnmask:!1},ip:{mask:"i[i[i]].i[i[i]].i[i[i]].i[i[i]]",definitions:{i:{validator:function(a,b,c,d,e){return c-1>-1&&"."!=b.buffer[c-1]?(a=b.buffer[c-1]+a,a=c-2>-1&&"."!=b.buffer[c-2]?b.buffer[c-2]+a:"0"+a):a="00"+a,new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(a)},cardinality:1}}},email:{mask:"*{1,64}[.*{1,64}][.*{1,64}][.*{1,64}]@*{1,64}[.*{2,64}][.*{2,6}][.*{1,2}]",greedy:!1,onBeforePaste:function(a,b){return a=a.toLowerCase(),a.replace("mailto:","")},definitions:{"*":{validator:"[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",cardinality:1,casing:"lower"}}}}),a.fn.inputmask}(jQuery),function(a){return a.extend(a.inputmask.defaults.aliases,{numeric:{mask:function(a){function b(b){for(var c="",d=0;d<b.length;d++)c+=a.definitions[b[d]]?"\\"+b[d]:b[d];return c}if(0!==a.repeat&&isNaN(a.integerDigits)&&(a.integerDigits=a.repeat),a.repeat=0,a.groupSeparator==a.radixPoint&&("."==a.radixPoint?a.groupSeparator=",":","==a.radixPoint?a.groupSeparator=".":a.groupSeparator="")," "===a.groupSeparator&&(a.skipOptionalPartCharacter=void 0),a.autoGroup=a.autoGroup&&""!=a.groupSeparator,a.autoGroup&&("string"==typeof a.groupSize&&isFinite(a.groupSize)&&(a.groupSize=parseInt(a.groupSize)),isFinite(a.integerDigits))){var c=Math.floor(a.integerDigits/a.groupSize),d=a.integerDigits%a.groupSize;a.integerDigits=parseInt(a.integerDigits)+(0==d?c-1:c)}a.placeholder.length>1&&(a.placeholder=a.placeholder.charAt(0)),a.radixFocus=a.radixFocus&&"0"==a.placeholder,a.definitions[";"]=a.definitions["~"];var e=b(a.prefix);return e+="[+]",e+="~{1,"+a.integerDigits+"}",void 0!=a.digits&&(isNaN(a.digits)||parseInt(a.digits)>0)&&(e+=a.digitsOptional?"["+(a.decimalProtect?":":a.radixPoint)+";{"+a.digits+"}]":(a.decimalProtect?":":a.radixPoint)+";{"+a.digits+"}"),""!=a.negationSymbol.back&&(e+="[-]"),e+=b(a.suffix),a.greedy=!1,e},placeholder:"",greedy:!1,digits:"*",digitsOptional:!0,groupSeparator:"",radixPoint:".",radixFocus:!0,groupSize:3,autoGroup:!1,allowPlus:!0,allowMinus:!0,negationSymbol:{front:"-",back:""},integerDigits:"+",prefix:"",suffix:"",rightAlign:!0,decimalProtect:!0,min:void 0,max:void 0,postFormat:function(b,c,d,e){var f=!1;b.length>=e.suffix.length&&b.join("").indexOf(e.suffix)==b.length-e.suffix.length&&(b.length=b.length-e.suffix.length,f=!0),c=c>=b.length?b.length-1:c<e.prefix.length?e.prefix.length:c;var g=!1,h=b[c];if(""==e.groupSeparator||-1!=a.inArray(e.radixPoint,b)&&c>=a.inArray(e.radixPoint,b)||new RegExp("["+a.inputmask.escapeRegex(e.negationSymbol.front)+"+]").test(h)){if(f)for(var i=0,j=e.suffix.length;j>i;i++)b.push(e.suffix.charAt(i));return{pos:c}}var k=b.slice();h==e.groupSeparator&&(k.splice(c--,1),h=k[c]),d?k[c]="?":k.splice(c,0,"?");var l=k.join(""),m=l;if(l.length>0&&e.autoGroup||d&&-1!=l.indexOf(e.groupSeparator)){var n=a.inputmask.escapeRegex(e.groupSeparator);g=0==l.indexOf(e.groupSeparator),l=l.replace(new RegExp(n,"g"),"");var o=l.split(e.radixPoint);if(l=""==e.radixPoint?l:o[0],l!=e.prefix+"?0"&&l.length>=e.groupSize+e.prefix.length)for(var p=new RegExp("([-+]?[\\d?]+)([\\d?]{"+e.groupSize+"})");p.test(l);)l=l.replace(p,"$1"+e.groupSeparator+"$2"),l=l.replace(e.groupSeparator+e.groupSeparator,e.groupSeparator);""!=e.radixPoint&&o.length>1&&(l+=e.radixPoint+o[1])}g=m!=l,b.length=l.length;for(var i=0,j=l.length;j>i;i++)b[i]=l.charAt(i);var q=a.inArray("?",b);if(d?b[q]=h:b.splice(q,1),!g&&f)for(var i=0,j=e.suffix.length;j>i;i++)b.push(e.suffix.charAt(i));return{pos:q,refreshFromBuffer:g,buffer:b}},onBeforeWrite:function(b,c,d,e){if(b&&"blur"==b.type){var f=c.join(""),g=f.replace(e.prefix,"");if(g=g.replace(e.suffix,""),g=g.replace(new RegExp(a.inputmask.escapeRegex(e.groupSeparator),"g"),""),","===e.radixPoint&&(g=g.replace(a.inputmask.escapeRegex(e.radixPoint),".")),isFinite(g)&&isFinite(e.min)&&parseFloat(g)<parseFloat(e.min))return a.extend(!0,{refreshFromBuffer:!0,buffer:(e.prefix+e.min).split("")},e.postFormat((e.prefix+e.min).split(""),0,!0,e));var h=""!=e.radixPoint?c.join("").split(e.radixPoint):[c.join("")],i=h[0].match(e.regex.integerPart(e)),j=2==h.length?h[1].match(e.regex.integerNPart(e)):void 0;!i||i[0]!=e.negationSymbol.front+"0"&&i[0]!=e.negationSymbol.front&&"+"!=i[0]||void 0!=j&&!j[0].match(/^0+$/)||c.splice(i.index,1);var k=a.inArray(e.radixPoint,c);if(-1!=k&&isFinite(e.digits)&&!e.digitsOptional){for(var l=1;l<=e.digits;l++)(void 0==c[k+l]||c[k+l]==e.placeholder.charAt(0))&&(c[k+l]="0");return{refreshFromBuffer:!0,buffer:c}}}if(e.autoGroup){var m=e.postFormat(c,d-1,!0,e);return m.caret=d<=e.prefix.length?m.pos:m.pos+1,m}},regex:{integerPart:function(b){return new RegExp("["+a.inputmask.escapeRegex(b.negationSymbol.front)+"+]?\\d+")},integerNPart:function(b){return new RegExp("[\\d"+a.inputmask.escapeRegex(b.groupSeparator)+"]+")}},signHandler:function(a,b,c,d,e){if(!d&&e.allowMinus&&"-"===a||e.allowPlus&&"+"===a){var f=b.buffer.join("").match(e.regex.integerPart(e));if(f&&f[0].length>0)return b.buffer[f.index]==("-"===a?"+":e.negationSymbol.front)?"-"==a?""!=e.negationSymbol.back?{pos:f.index,c:e.negationSymbol.front,remove:f.index,caret:c,insert:{pos:b.buffer.length-e.suffix.length-1,c:e.negationSymbol.back}}:{pos:f.index,c:e.negationSymbol.front,remove:f.index,caret:c}:""!=e.negationSymbol.back?{pos:f.index,c:"+",remove:[f.index,b.buffer.length-e.suffix.length-1],caret:c}:{pos:f.index,c:"+",remove:f.index,caret:c}:b.buffer[f.index]==("-"===a?e.negationSymbol.front:"+")?"-"==a&&""!=e.negationSymbol.back?{remove:[f.index,b.buffer.length-e.suffix.length-1],caret:c-1}:{remove:f.index,caret:c-1}:"-"==a?""!=e.negationSymbol.back?{pos:f.index,c:e.negationSymbol.front,caret:c+1,insert:{pos:b.buffer.length-e.suffix.length,c:e.negationSymbol.back}}:{pos:f.index,c:e.negationSymbol.front,caret:c+1}:{pos:f.index,c:a,caret:c+1}}return!1},radixHandler:function(b,c,d,e,f){if(!e&&b===f.radixPoint&&f.digits>0){var g=a.inArray(f.radixPoint,c.buffer),h=c.buffer.join("").match(f.regex.integerPart(f));

if(-1!=g&&c.validPositions[g])return c.validPositions[g-1]?{caret:g+1}:{pos:h.index,c:h[0],caret:g+1};if(!h||"0"==h[0]&&h.index+1!=d)return c.buffer[h?h.index:d]="0",{pos:(h?h.index:d)+1}}return!1},leadingZeroHandler:function(b,c,d,e,f){var g=c.buffer.join("").match(f.regex.integerNPart(f)),h=a.inArray(f.radixPoint,c.buffer);if(g&&!e&&(-1==h||h>=d))if(0==g[0].indexOf("0")){d<f.prefix.length&&(d=g.index);var i=a.inArray(f.radixPoint,c._buffer),j=c._buffer&&c.buffer.slice(h).join("")==c._buffer.slice(i).join("")||0==parseInt(c.buffer.slice(h+1).join("")),k=c._buffer&&c.buffer.slice(g.index,h).join("")==c._buffer.slice(f.prefix.length,i).join("")||"0"==c.buffer.slice(g.index,h).join("");if(-1==h||j&&k)return c.buffer.splice(g.index,1),d=d>g.index?d-1:g.index,{pos:d,remove:g.index};if(g.index+1==d||"0"==b)return c.buffer.splice(g.index,1),d=g.index,{pos:d,remove:g.index}}else if("0"===b&&d<=g.index&&g[0]!=f.groupSeparator)return!1;return!0},postValidation:function(b,c){var d=!0,e=b.join(""),f=e.replace(c.prefix,"");return f=f.replace(c.suffix,""),f=f.replace(new RegExp(a.inputmask.escapeRegex(c.groupSeparator),"g"),""),","===c.radixPoint&&(f=f.replace(a.inputmask.escapeRegex(c.radixPoint),".")),f=f.replace(new RegExp("^"+a.inputmask.escapeRegex(c.negationSymbol.front)),"-"),f=f.replace(new RegExp(a.inputmask.escapeRegex(c.negationSymbol.back)+"$"),""),isFinite(f)&&isFinite(c.max)&&(d=parseFloat(f)<=parseFloat(c.max)),d},definitions:{"~":{validator:function(b,c,d,e,f){var g=f.signHandler(b,c,d,e,f);if(!g&&(g=f.radixHandler(b,c,d,e,f),!g&&(g=e?new RegExp("[0-9"+a.inputmask.escapeRegex(f.groupSeparator)+"]").test(b):new RegExp("[0-9]").test(b),g===!0&&(g=f.leadingZeroHandler(b,c,d,e,f),g===!0)))){var h=a.inArray(f.radixPoint,c.buffer);g=f.digitsOptional===!1&&d>h&&!e?{pos:d,remove:d}:{pos:d}}return g},cardinality:1,prevalidator:null},"+":{validator:function(a,b,c,d,e){var f=e.signHandler(a,b,c,d,e);return!f&&(d&&e.allowMinus&&a===e.negationSymbol.front||e.allowMinus&&"-"==a||e.allowPlus&&"+"==a)&&(f="-"==a?""!=e.negationSymbol.back?{pos:c,c:"-"===a?e.negationSymbol.front:"+",caret:c+1,insert:{pos:b.buffer.length,c:e.negationSymbol.back}}:{pos:c,c:"-"===a?e.negationSymbol.front:"+",caret:c+1}:!0),f},cardinality:1,prevalidator:null,placeholder:""},"-":{validator:function(a,b,c,d,e){var f=e.signHandler(a,b,c,d,e);return!f&&d&&e.allowMinus&&a===e.negationSymbol.back&&(f=!0),f},cardinality:1,prevalidator:null,placeholder:""},":":{validator:function(b,c,d,e,f){var g=f.signHandler(b,c,d,e,f);if(!g){var h="["+a.inputmask.escapeRegex(f.radixPoint)+"]";g=new RegExp(h).test(b),g&&c.validPositions[d]&&c.validPositions[d].match.placeholder==f.radixPoint&&(g={caret:d+1})}return g},cardinality:1,prevalidator:null,placeholder:function(a){return a.radixPoint}}},insertMode:!0,autoUnmask:!1,unmaskAsNumber:!1,onUnMask:function(b,c,d){var e=b.replace(d.prefix,"");return e=e.replace(d.suffix,""),e=e.replace(new RegExp(a.inputmask.escapeRegex(d.groupSeparator),"g"),""),d.unmaskAsNumber?(e=e.replace(a.inputmask.escapeRegex.call(this,d.radixPoint),"."),Number(e)):e},isComplete:function(b,c){var d=b.join(""),e=b.slice();if(c.postFormat(e,0,!0,c),e.join("")!=d)return!1;var f=d.replace(c.prefix,"");return f=f.replace(c.suffix,""),f=f.replace(new RegExp(a.inputmask.escapeRegex(c.groupSeparator),"g"),""),","===c.radixPoint&&(f=f.replace(a.inputmask.escapeRegex(c.radixPoint),".")),isFinite(f)},onBeforeMask:function(b,c){if(""!=c.radixPoint&&isFinite(b))b=b.toString().replace(".",c.radixPoint);else{var d=b.match(/,/g),e=b.match(/\./g);e&&d?e.length>d.length?(b=b.replace(/\./g,""),b=b.replace(",",c.radixPoint)):d.length>e.length?(b=b.replace(/,/g,""),b=b.replace(".",c.radixPoint)):b=b.indexOf(".")<b.indexOf(",")?b.replace(/\./g,""):b=b.replace(/,/g,""):b=b.replace(new RegExp(a.inputmask.escapeRegex(c.groupSeparator),"g"),"")}return 0==c.digits&&(-1!=b.indexOf(".")?b=b.substring(0,b.indexOf(".")):-1!=b.indexOf(",")&&(b=b.substring(0,b.indexOf(",")))),b},canClearPosition:function(b,c,d,e,f){var g=b.validPositions[c].input,h=g!=f.radixPoint&&isFinite(g)||c==d||g==f.groupSeparator||g==f.negationSymbol.front||g==f.negationSymbol.back;if(h&&isFinite(g)){var i;if(!e&&b.buffer){i=b.buffer.join("").substr(0,c).match(f.regex.integerNPart(f));var j=c+1,k=null==i||0==parseInt(i[0].replace(new RegExp(a.inputmask.escapeRegex(f.groupSeparator),"g"),""));if(k)for(;b.validPositions[j]&&(b.validPositions[j].input==f.groupSeparator||"0"==b.validPositions[j].input);)delete b.validPositions[j],j++}var l=[];for(var m in b.validPositions)l.push(b.validPositions[m].input);i=l.join("").match(f.regex.integerNPart(f));var n=a.inArray(f.radixPoint,b.buffer);if(i&&(-1==n||n>=c))if(0==i[0].indexOf("0"))h=i.index!=c||-1==n;else{var o=parseInt(i[0].replace(new RegExp(a.inputmask.escapeRegex(f.groupSeparator),"g"),""));-1!=n&&10>o&&"0"==f.placeholder.charAt(0)&&(b.validPositions[c].input="0",b.p=f.prefix.length+1,h=!1)}}return h}},currency:{prefix:"$ ",groupSeparator:",",alias:"numeric",placeholder:"0",autoGroup:!0,digits:2,digitsOptional:!1,clearMaskOnLostFocus:!1},decimal:{alias:"numeric"},integer:{alias:"numeric",digits:"0",radixPoint:""}}),a.fn.inputmask}(jQuery),function(a){return a.extend(a.inputmask.defaults.aliases,{phone:{url:"phone-codes/phone-codes.js",countrycode:"",mask:function(b){b.definitions["#"]=b.definitions[9];var c=[];return a.ajax({url:b.url,async:!1,dataType:"json",success:function(a){c=a},error:function(a,c,d){alert(d+" - "+b.url)}}),c=c.sort(function(a,b){return(a.mask||a)<(b.mask||b)?-1:1})},keepStatic:!1,nojumps:!0,nojumpsThreshold:1,onBeforeMask:function(a,b){var c=a.replace(/^0/g,"");return(c.indexOf(b.countrycode)>1||-1==c.indexOf(b.countrycode))&&(c="+"+b.countrycode+c),c}},phonebe:{alias:"phone",url:"phone-codes/phone-be.js",countrycode:"32",nojumpsThreshold:4}}),a.fn.inputmask}(jQuery),function(a){return a.extend(a.inputmask.defaults.aliases,{Regex:{mask:"r",greedy:!1,repeat:"*",regex:null,regexTokens:null,tokenizer:/\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,quantifierFilter:/[0-9]+[^,]/,isComplete:function(a,b){return new RegExp(b.regex).test(a.join(""))},definitions:{r:{validator:function(b,c,d,e,f){function g(a,b){this.matches=[],this.isGroup=a||!1,this.isQuantifier=b||!1,this.quantifier={min:1,max:1},this.repeaterPart=void 0}function h(){var a,b,c=new g,d=[];for(f.regexTokens=[];a=f.tokenizer.exec(f.regex);)switch(b=a[0],b.charAt(0)){case"(":d.push(new g(!0));break;case")":var e=d.pop();d.length>0?d[d.length-1].matches.push(e):c.matches.push(e);break;case"{":case"+":case"*":var h=new g(!1,!0);b=b.replace(/[{}]/g,"");var i=b.split(","),j=isNaN(i[0])?i[0]:parseInt(i[0]),k=1==i.length?j:isNaN(i[1])?i[1]:parseInt(i[1]);if(h.quantifier={min:j,max:k},d.length>0){var l=d[d.length-1].matches;if(a=l.pop(),!a.isGroup){var e=new g(!0);e.matches.push(a),a=e}l.push(a),l.push(h)}else{if(a=c.matches.pop(),!a.isGroup){var e=new g(!0);e.matches.push(a),a=e}c.matches.push(a),c.matches.push(h)}break;default:d.length>0?d[d.length-1].matches.push(b):c.matches.push(b)}c.matches.length>0&&f.regexTokens.push(c)}function i(b,c){var d=!1;c&&(k+="(",m++);for(var e=0;e<b.matches.length;e++){var f=b.matches[e];if(1==f.isGroup)d=i(f,!0);else if(1==f.isQuantifier){var g=a.inArray(f,b.matches),h=b.matches[g-1],j=k;if(isNaN(f.quantifier.max)){for(;f.repeaterPart&&f.repeaterPart!=k&&f.repeaterPart.length>k.length&&!(d=i(h,!0)););d=d||i(h,!0),d&&(f.repeaterPart=k),k=j+f.quantifier.max}else{for(var l=0,o=f.quantifier.max-1;o>l&&!(d=i(h,!0));l++);k=j+"{"+f.quantifier.min+","+f.quantifier.max+"}"}}else if(void 0!=f.matches)for(var p=0;p<f.length&&!(d=i(f[p],c));p++);else{var q;if("["==f.charAt(0)){q=k,q+=f;for(var r=0;m>r;r++)q+=")";var s=new RegExp("^("+q+")$");d=s.test(n)}else for(var t=0,u=f.length;u>t;t++)if("\\"!=f.charAt(t)){q=k,q+=f.substr(0,t+1),q=q.replace(/\|$/,"");for(var r=0;m>r;r++)q+=")";var s=new RegExp("^("+q+")$");if(d=s.test(n))break}k+=f}if(d)break}return c&&(k+=")",m--),d}null==f.regexTokens&&h();var j=c.buffer.slice(),k="",l=!1,m=0;j.splice(d,0,b);for(var n=j.join(""),o=0;o<f.regexTokens.length;o++){var g=f.regexTokens[o];if(l=i(g,g.isGroup))break}return l},cardinality:1}}}}),a.fn.inputmask}(jQuery);
//! moment.js
//! version : 2.10.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return Dc.apply(null,arguments)}function b(a){Dc=a}function c(a){return"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return za(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a);a._isValid=!isNaN(a._d.getTime())&&b.overflow<0&&!b.empty&&!b.invalidMonth&&!b.nullInput&&!b.invalidFormat&&!b.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(0/0);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a,b){var c,d,e;if("undefined"!=typeof b._isAMomentObject&&(a._isAMomentObject=b._isAMomentObject),"undefined"!=typeof b._i&&(a._i=b._i),"undefined"!=typeof b._f&&(a._f=b._f),"undefined"!=typeof b._l&&(a._l=b._l),"undefined"!=typeof b._strict&&(a._strict=b._strict),"undefined"!=typeof b._tzm&&(a._tzm=b._tzm),"undefined"!=typeof b._isUTC&&(a._isUTC=b._isUTC),"undefined"!=typeof b._offset&&(a._offset=b._offset),"undefined"!=typeof b._pf&&(a._pf=j(b)),"undefined"!=typeof b._locale&&(a._locale=b._locale),Fc.length>0)for(c in Fc)d=Fc[c],e=b[d],"undefined"!=typeof e&&(a[d]=e);return a}function n(b){m(this,b),this._d=new Date(+b._d),Gc===!1&&(Gc=!0,a.updateOffset(this),Gc=!1)}function o(a){return a instanceof n||null!=a&&null!=a._isAMomentObject}function p(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function q(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&p(a[d])!==p(b[d]))&&g++;return g+f}function r(){}function s(a){return a?a.toLowerCase().replace("_","-"):a}function t(a){for(var b,c,d,e,f=0;f<a.length;){for(e=s(a[f]).split("-"),b=e.length,c=s(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=u(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&q(e,c,!0)>=b-1)break;b--}f++}return null}function u(a){var b=null;if(!Hc[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=Ec._abbr,require("./locale/"+a),v(b)}catch(c){}return Hc[a]}function v(a,b){var c;return a&&(c="undefined"==typeof b?x(a):w(a,b),c&&(Ec=c)),Ec._abbr}function w(a,b){return null!==b?(b.abbr=a,Hc[a]||(Hc[a]=new r),Hc[a].set(b),v(a),Hc[a]):(delete Hc[a],null)}function x(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return Ec;if(!c(a)){if(b=u(a))return b;a=[a]}return t(a)}function y(a,b){var c=a.toLowerCase();Ic[c]=Ic[c+"s"]=Ic[b]=a}function z(a){return"string"==typeof a?Ic[a]||Ic[a.toLowerCase()]:void 0}function A(a){var b,c,d={};for(c in a)f(a,c)&&(b=z(c),b&&(d[b]=a[c]));return d}function B(b,c){return function(d){return null!=d?(D(this,b,d),a.updateOffset(this,c),this):C(this,b)}}function C(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function D(a,b,c){return a._d["set"+(a._isUTC?"UTC":"")+b](c)}function E(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=z(a),"function"==typeof this[a])return this[a](b);return this}function F(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function G(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(Mc[a]=e),b&&(Mc[b[0]]=function(){return F(e.apply(this,arguments),b[1],b[2])}),c&&(Mc[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function H(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function I(a){var b,c,d=a.match(Jc);for(b=0,c=d.length;c>b;b++)Mc[d[b]]?d[b]=Mc[d[b]]:d[b]=H(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function J(a,b){return a.isValid()?(b=K(b,a.localeData()),Lc[b]||(Lc[b]=I(b)),Lc[b](a)):a.localeData().invalidDate()}function K(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Kc.lastIndex=0;d>=0&&Kc.test(a);)a=a.replace(Kc,c),Kc.lastIndex=0,d-=1;return a}function L(a,b,c){_c[a]="function"==typeof b?b:function(a){return a&&c?c:b}}function M(a,b){return f(_c,a)?_c[a](b._strict,b._locale):new RegExp(N(a))}function N(a){return a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function O(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=p(a)}),c=0;c<a.length;c++)ad[a[c]]=d}function P(a,b){O(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function Q(a,b,c){null!=b&&f(ad,a)&&ad[a](b,c._a,c,a)}function R(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function S(a){return this._months[a.month()]}function T(a){return this._monthsShort[a.month()]}function U(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function V(a,b){var c;return"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),R(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function W(b){return null!=b?(V(this,b),a.updateOffset(this,!0),this):C(this,"Month")}function X(){return R(this.year(),this.month())}function Y(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[cd]<0||c[cd]>11?cd:c[dd]<1||c[dd]>R(c[bd],c[cd])?dd:c[ed]<0||c[ed]>24||24===c[ed]&&(0!==c[fd]||0!==c[gd]||0!==c[hd])?ed:c[fd]<0||c[fd]>59?fd:c[gd]<0||c[gd]>59?gd:c[hd]<0||c[hd]>999?hd:-1,j(a)._overflowDayOfYear&&(bd>b||b>dd)&&(b=dd),j(a).overflow=b),a}function Z(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function $(a,b){var c=!0,d=a+"\n"+(new Error).stack;return g(function(){return c&&(Z(d),c=!1),b.apply(this,arguments)},b)}function _(a,b){kd[a]||(Z(b),kd[a]=!0)}function aa(a){var b,c,d=a._i,e=ld.exec(d);if(e){for(j(a).iso=!0,b=0,c=md.length;c>b;b++)if(md[b][1].exec(d)){a._f=md[b][0]+(e[6]||" ");break}for(b=0,c=nd.length;c>b;b++)if(nd[b][1].exec(d)){a._f+=nd[b][0];break}d.match(Yc)&&(a._f+="Z"),ta(a)}else a._isValid=!1}function ba(b){var c=od.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(aa(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function ca(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function da(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function ea(a){return fa(a)?366:365}function fa(a){return a%4===0&&a%100!==0||a%400===0}function ga(){return fa(this.year())}function ha(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=Aa(a).add(f,"d"),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function ia(a){return ha(a,this._week.dow,this._week.doy).week}function ja(){return this._week.dow}function ka(){return this._week.doy}function la(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function ma(a){var b=ha(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function na(a,b,c,d,e){var f,g,h=da(a,0,1).getUTCDay();return h=0===h?7:h,c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:ea(a-1)+g}}function oa(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function pa(a,b,c){return null!=a?a:null!=b?b:c}function qa(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function ra(a){var b,c,d,e,f=[];if(!a._d){for(d=qa(a),a._w&&null==a._a[dd]&&null==a._a[cd]&&sa(a),a._dayOfYear&&(e=pa(a._a[bd],d[bd]),a._dayOfYear>ea(e)&&(j(a)._overflowDayOfYear=!0),c=da(e,0,a._dayOfYear),a._a[cd]=c.getUTCMonth(),a._a[dd]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[ed]&&0===a._a[fd]&&0===a._a[gd]&&0===a._a[hd]&&(a._nextDay=!0,a._a[ed]=0),a._d=(a._useUTC?da:ca).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[ed]=24)}}function sa(a){var b,c,d,e,f,g,h;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=pa(b.GG,a._a[bd],ha(Aa(),1,4).year),d=pa(b.W,1),e=pa(b.E,1)):(f=a._locale._week.dow,g=a._locale._week.doy,c=pa(b.gg,a._a[bd],ha(Aa(),f,g).year),d=pa(b.w,1),null!=b.d?(e=b.d,f>e&&++d):e=null!=b.e?b.e+f:f),h=na(c,d,e,g,f),a._a[bd]=h.year,a._dayOfYear=h.dayOfYear}function ta(b){if(b._f===a.ISO_8601)return void aa(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=K(b._f,b._locale).match(Jc)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(M(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),Mc[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),Q(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[ed]<=12&&b._a[ed]>0&&(j(b).bigHour=void 0),b._a[ed]=ua(b._locale,b._a[ed],b._meridiem),ra(b),Y(b)}function ua(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function va(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(0/0));for(e=0;e<a._f.length;e++)f=0,b=m({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],ta(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function wa(a){if(!a._d){var b=A(a._i);a._a=[b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],ra(a)}}function xa(a){var b,e=a._i,f=a._f;return a._locale=a._locale||x(a._l),null===e||void 0===f&&""===e?l({nullInput:!0}):("string"==typeof e&&(a._i=e=a._locale.preparse(e)),o(e)?new n(Y(e)):(c(f)?va(a):f?ta(a):d(e)?a._d=e:ya(a),b=new n(Y(a)),b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b))}function ya(b){var f=b._i;void 0===f?b._d=new Date:d(f)?b._d=new Date(+f):"string"==typeof f?ba(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),ra(b)):"object"==typeof f?wa(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function za(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,xa(f)}function Aa(a,b,c,d){return za(a,b,c,d,!1)}function Ba(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Aa();for(d=b[0],e=1;e<b.length;++e)b[e][a](d)&&(d=b[e]);return d}function Ca(){var a=[].slice.call(arguments,0);return Ba("isBefore",a)}function Da(){var a=[].slice.call(arguments,0);return Ba("isAfter",a)}function Ea(a){var b=A(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=x(),this._bubble()}function Fa(a){return a instanceof Ea}function Ga(a,b){G(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+F(~~(a/60),2)+b+F(~~a%60,2)})}function Ha(a){var b=(a||"").match(Yc)||[],c=b[b.length-1]||[],d=(c+"").match(td)||["-",0,0],e=+(60*d[1])+p(d[2]);return"+"===d[0]?e:-e}function Ia(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(o(b)||d(b)?+b:+Aa(b))-+e,e._d.setTime(+e._d+f),a.updateOffset(e,!1),e):Aa(b).local();return c._isUTC?Aa(b).zone(c._offset||0):Aa(b).local()}function Ja(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Ka(b,c){var d,e=this._offset||0;return null!=b?("string"==typeof b&&(b=Ha(b)),Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Ja(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?$a(this,Va(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Ja(this)}function La(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Ma(a){return this.utcOffset(0,a)}function Na(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Ja(this),"m")),this}function Oa(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Ha(this._i)),this}function Pa(a){return a=a?Aa(a).utcOffset():0,(this.utcOffset()-a)%60===0}function Qa(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Ra(){if(this._a){var a=this._isUTC?h(this._a):Aa(this._a);return this.isValid()&&q(this._a,a.toArray())>0}return!1}function Sa(){return!this._isUTC}function Ta(){return this._isUTC}function Ua(){return this._isUTC&&0===this._offset}function Va(a,b){var c,d,e,g=a,h=null;return Fa(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=ud.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:p(h[dd])*c,h:p(h[ed])*c,m:p(h[fd])*c,s:p(h[gd])*c,ms:p(h[hd])*c}):(h=vd.exec(a))?(c="-"===h[1]?-1:1,g={y:Wa(h[2],c),M:Wa(h[3],c),d:Wa(h[4],c),h:Wa(h[5],c),m:Wa(h[6],c),s:Wa(h[7],c),w:Wa(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=Ya(Aa(g.from),Aa(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Ea(g),Fa(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function Wa(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function Xa(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function Ya(a,b){var c;return b=Ia(b,a),a.isBefore(b)?c=Xa(a,b):(c=Xa(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c}function Za(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(_(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Va(c,d),$a(this,e,a),this}}function $a(b,c,d,e){var f=c._milliseconds,g=c._days,h=c._months;e=null==e?!0:e,f&&b._d.setTime(+b._d+f*d),g&&D(b,"Date",C(b,"Date")+g*d),h&&V(b,C(b,"Month")+h*d),e&&a.updateOffset(b,g||h)}function _a(a){var b=a||Aa(),c=Ia(b,this).startOf("day"),d=this.diff(c,"days",!0),e=-6>d?"sameElse":-1>d?"lastWeek":0>d?"lastDay":1>d?"sameDay":2>d?"nextDay":7>d?"nextWeek":"sameElse";return this.format(this.localeData().calendar(e,this,Aa(b)))}function ab(){return new n(this)}function bb(a,b){var c;return b=z("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=o(a)?a:Aa(a),+this>+a):(c=o(a)?+a:+Aa(a),c<+this.clone().startOf(b))}function cb(a,b){var c;return b=z("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=o(a)?a:Aa(a),+a>+this):(c=o(a)?+a:+Aa(a),+this.clone().endOf(b)<c)}function db(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)}function eb(a,b){var c;return b=z(b||"millisecond"),"millisecond"===b?(a=o(a)?a:Aa(a),+this===+a):(c=+Aa(a),+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))}function fb(a){return 0>a?Math.ceil(a):Math.floor(a)}function gb(a,b,c){var d,e,f=Ia(a,this),g=6e4*(f.utcOffset()-this.utcOffset());return b=z(b),"year"===b||"month"===b||"quarter"===b?(e=hb(this,f),"quarter"===b?e/=3:"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:fb(e)}function hb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function ib(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function jb(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():J(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):J(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function kb(b){var c=J(this,b||a.defaultFormat);return this.localeData().postformat(c)}function lb(a,b){return this.isValid()?Va({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function mb(a){return this.from(Aa(),a)}function nb(a,b){return this.isValid()?Va({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function ob(a){return this.to(Aa(),a)}function pb(a){var b;return void 0===a?this._locale._abbr:(b=x(a),null!=b&&(this._locale=b),this)}function qb(){return this._locale}function rb(a){switch(a=z(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function sb(a){return a=z(a),void 0===a||"millisecond"===a?this:this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms")}function tb(){return+this._d-6e4*(this._offset||0)}function ub(){return Math.floor(+this/1e3)}function vb(){return this._offset?new Date(+this):this._d}function wb(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function xb(){return k(this)}function yb(){return g({},j(this))}function zb(){return j(this).overflow}function Ab(a,b){G(0,[a,a.length],0,b)}function Bb(a,b,c){return ha(Aa([a,11,31+b-c]),b,c).week}function Cb(a){var b=ha(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==a?b:this.add(a-b,"y")}function Db(a){var b=ha(this,1,4).year;return null==a?b:this.add(a-b,"y")}function Eb(){return Bb(this.year(),1,4)}function Fb(){var a=this.localeData()._week;return Bb(this.year(),a.dow,a.doy)}function Gb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Hb(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function Ib(a){return this._weekdays[a.day()]}function Jb(a){return this._weekdaysShort[a.day()]}function Kb(a){return this._weekdaysMin[a.day()]}function Lb(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=Aa([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b}function Mb(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Hb(a,this.localeData()),this.add(a-b,"d")):b}function Nb(a){var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function Ob(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)}function Pb(a,b){G(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function Qb(a,b){return b._meridiemParse}function Rb(a){return"p"===(a+"").toLowerCase().charAt(0)}function Sb(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function Tb(a){G(0,[a,3],0,"millisecond")}function Ub(){return this._isUTC?"UTC":""}function Vb(){return this._isUTC?"Coordinated Universal Time":""}function Wb(a){return Aa(1e3*a)}function Xb(){return Aa.apply(null,arguments).parseZone()}function Yb(a,b,c){var d=this._calendar[a];return"function"==typeof d?d.call(b,c):d}function Zb(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b}function $b(){return this._invalidDate}function _b(a){return this._ordinal.replace("%d",a)}function ac(a){return a}function bc(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)}function cc(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)}function dc(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function ec(a,b,c,d){var e=x(),f=h().set(d,b);return e[c](f,a)}function fc(a,b,c,d,e){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return ec(a,b,c,e);var f,g=[];for(f=0;d>f;f++)g[f]=ec(a,f,c,e);return g}function gc(a,b){return fc(a,b,"months",12,"month")}function hc(a,b){return fc(a,b,"monthsShort",12,"month")}function ic(a,b){return fc(a,b,"weekdays",7,"day")}function jc(a,b){return fc(a,b,"weekdaysShort",7,"day")}function kc(a,b){return fc(a,b,"weekdaysMin",7,"day")}function lc(){var a=this._data;return this._milliseconds=Rd(this._milliseconds),this._days=Rd(this._days),this._months=Rd(this._months),a.milliseconds=Rd(a.milliseconds),a.seconds=Rd(a.seconds),a.minutes=Rd(a.minutes),a.hours=Rd(a.hours),a.months=Rd(a.months),a.years=Rd(a.years),this}function mc(a,b,c,d){var e=Va(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function nc(a,b){return mc(this,a,b,1)}function oc(a,b){return mc(this,a,b,-1)}function pc(){var a,b,c,d=this._milliseconds,e=this._days,f=this._months,g=this._data,h=0;return g.milliseconds=d%1e3,a=fb(d/1e3),g.seconds=a%60,b=fb(a/60),g.minutes=b%60,c=fb(b/60),g.hours=c%24,e+=fb(c/24),h=fb(qc(e)),e-=fb(rc(h)),f+=fb(e/30),e%=30,h+=fb(f/12),f%=12,g.days=e,g.months=f,g.years=h,this}function qc(a){return 400*a/146097}function rc(a){return 146097*a/400}function sc(a){var b,c,d=this._milliseconds;if(a=z(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+12*qc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(rc(this._months/12)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function tc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*p(this._months/12)}function uc(a){return function(){return this.as(a)}}function vc(a){return a=z(a),this[a+"s"]()}function wc(a){return function(){return this._data[a]}}function xc(){return fb(this.days()/7)}function yc(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function zc(a,b,c){var d=Va(a).abs(),e=fe(d.as("s")),f=fe(d.as("m")),g=fe(d.as("h")),h=fe(d.as("d")),i=fe(d.as("M")),j=fe(d.as("y")),k=e<ge.s&&["s",e]||1===f&&["m"]||f<ge.m&&["mm",f]||1===g&&["h"]||g<ge.h&&["hh",g]||1===h&&["d"]||h<ge.d&&["dd",h]||1===i&&["M"]||i<ge.M&&["MM",i]||1===j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,yc.apply(null,k)}function Ac(a,b){return void 0===ge[a]?!1:void 0===b?ge[a]:(ge[a]=b,!0)}function Bc(a){var b=this.localeData(),c=zc(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function Cc(){var a=he(this.years()),b=he(this.months()),c=he(this.days()),d=he(this.hours()),e=he(this.minutes()),f=he(this.seconds()+this.milliseconds()/1e3),g=this.asSeconds();return g?(0>g?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"}var Dc,Ec,Fc=a.momentProperties=[],Gc=!1,Hc={},Ic={},Jc=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,Kc=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Lc={},Mc={},Nc=/\d/,Oc=/\d\d/,Pc=/\d{3}/,Qc=/\d{4}/,Rc=/[+-]?\d{6}/,Sc=/\d\d?/,Tc=/\d{1,3}/,Uc=/\d{1,4}/,Vc=/[+-]?\d{1,6}/,Wc=/\d+/,Xc=/[+-]?\d+/,Yc=/Z|[+-]\d\d:?\d\d/gi,Zc=/[+-]?\d+(\.\d{1,3})?/,$c=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,_c={},ad={},bd=0,cd=1,dd=2,ed=3,fd=4,gd=5,hd=6;G("M",["MM",2],"Mo",function(){return this.month()+1}),G("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),G("MMMM",0,0,function(a){return this.localeData().months(this,a)}),y("month","M"),L("M",Sc),L("MM",Sc,Oc),L("MMM",$c),L("MMMM",$c),O(["M","MM"],function(a,b){b[cd]=p(a)-1}),O(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[cd]=e:j(c).invalidMonth=a});var id="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),jd="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),kd={};a.suppressDeprecationWarnings=!1;var ld=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,md=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],nd=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],od=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=$("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),G(0,["YY",2],0,function(){return this.year()%100}),G(0,["YYYY",4],0,"year"),G(0,["YYYYY",5],0,"year"),G(0,["YYYYYY",6,!0],0,"year"),y("year","y"),L("Y",Xc),L("YY",Sc,Oc),L("YYYY",Uc,Qc),L("YYYYY",Vc,Rc),L("YYYYYY",Vc,Rc),O(["YYYY","YYYYY","YYYYYY"],bd),O("YY",function(b,c){c[bd]=a.parseTwoDigitYear(b)}),a.parseTwoDigitYear=function(a){return p(a)+(p(a)>68?1900:2e3)};var pd=B("FullYear",!1);G("w",["ww",2],"wo","week"),G("W",["WW",2],"Wo","isoWeek"),y("week","w"),y("isoWeek","W"),L("w",Sc),L("ww",Sc,Oc),L("W",Sc),L("WW",Sc,Oc),P(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=p(a)});var qd={dow:0,doy:6};G("DDD",["DDDD",3],"DDDo","dayOfYear"),y("dayOfYear","DDD"),L("DDD",Tc),L("DDDD",Pc),O(["DDD","DDDD"],function(a,b,c){c._dayOfYear=p(a)}),a.ISO_8601=function(){};var rd=$("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Aa.apply(null,arguments);return this>a?this:a}),sd=$("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Aa.apply(null,arguments);return a>this?this:a});Ga("Z",":"),Ga("ZZ",""),L("Z",Yc),L("ZZ",Yc),O(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Ha(a)});var td=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var ud=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,vd=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;Va.fn=Ea.prototype;var wd=Za(1,"add"),xd=Za(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var yd=$("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});G(0,["gg",2],0,function(){return this.weekYear()%100}),G(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Ab("gggg","weekYear"),Ab("ggggg","weekYear"),Ab("GGGG","isoWeekYear"),Ab("GGGGG","isoWeekYear"),y("weekYear","gg"),y("isoWeekYear","GG"),L("G",Xc),L("g",Xc),L("GG",Sc,Oc),L("gg",Sc,Oc),L("GGGG",Uc,Qc),L("gggg",Uc,Qc),L("GGGGG",Vc,Rc),L("ggggg",Vc,Rc),P(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=p(a)}),P(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),G("Q",0,0,"quarter"),y("quarter","Q"),L("Q",Nc),O("Q",function(a,b){b[cd]=3*(p(a)-1)}),G("D",["DD",2],"Do","date"),y("date","D"),L("D",Sc),L("DD",Sc,Oc),L("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),O(["D","DD"],dd),O("Do",function(a,b){b[dd]=p(a.match(Sc)[0],10)});var zd=B("Date",!0);G("d",0,"do","day"),G("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),G("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),G("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),G("e",0,0,"weekday"),G("E",0,0,"isoWeekday"),y("day","d"),y("weekday","e"),y("isoWeekday","E"),L("d",Sc),L("e",Sc),L("E",Sc),L("dd",$c),L("ddd",$c),L("dddd",$c),P(["dd","ddd","dddd"],function(a,b,c){var d=c._locale.weekdaysParse(a);null!=d?b.d=d:j(c).invalidWeekday=a}),P(["d","e","E"],function(a,b,c,d){b[d]=p(a)});var Ad="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Bd="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Cd="Su_Mo_Tu_We_Th_Fr_Sa".split("_");G("H",["HH",2],0,"hour"),G("h",["hh",2],0,function(){return this.hours()%12||12}),Pb("a",!0),Pb("A",!1),y("hour","h"),L("a",Qb),L("A",Qb),L("H",Sc),L("h",Sc),L("HH",Sc,Oc),L("hh",Sc,Oc),O(["H","HH"],ed),O(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),O(["h","hh"],function(a,b,c){b[ed]=p(a),j(c).bigHour=!0});var Dd=/[ap]\.?m?\.?/i,Ed=B("Hours",!0);G("m",["mm",2],0,"minute"),y("minute","m"),L("m",Sc),L("mm",Sc,Oc),O(["m","mm"],fd);var Fd=B("Minutes",!1);G("s",["ss",2],0,"second"),y("second","s"),L("s",Sc),L("ss",Sc,Oc),O(["s","ss"],gd);var Gd=B("Seconds",!1);G("S",0,0,function(){return~~(this.millisecond()/100)}),G(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),Tb("SSS"),Tb("SSSS"),y("millisecond","ms"),L("S",Tc,Nc),L("SS",Tc,Oc),L("SSS",Tc,Pc),L("SSSS",Wc),O(["S","SS","SSS","SSSS"],function(a,b){b[hd]=p(1e3*("0."+a))});var Hd=B("Milliseconds",!1);G("z",0,0,"zoneAbbr"),G("zz",0,0,"zoneName");var Id=n.prototype;Id.add=wd,Id.calendar=_a,Id.clone=ab,Id.diff=gb,Id.endOf=sb,Id.format=kb,Id.from=lb,Id.fromNow=mb,Id.to=nb,Id.toNow=ob,Id.get=E,Id.invalidAt=zb,Id.isAfter=bb,Id.isBefore=cb,Id.isBetween=db,Id.isSame=eb,Id.isValid=xb,Id.lang=yd,Id.locale=pb,Id.localeData=qb,Id.max=sd,Id.min=rd,Id.parsingFlags=yb,Id.set=E,Id.startOf=rb,Id.subtract=xd,Id.toArray=wb,Id.toDate=vb,Id.toISOString=jb,Id.toJSON=jb,Id.toString=ib,Id.unix=ub,Id.valueOf=tb,Id.year=pd,Id.isLeapYear=ga,Id.weekYear=Cb,Id.isoWeekYear=Db,Id.quarter=Id.quarters=Gb,Id.month=W,Id.daysInMonth=X,Id.week=Id.weeks=la,Id.isoWeek=Id.isoWeeks=ma,Id.weeksInYear=Fb,Id.isoWeeksInYear=Eb,Id.date=zd,Id.day=Id.days=Mb,Id.weekday=Nb,Id.isoWeekday=Ob,Id.dayOfYear=oa,Id.hour=Id.hours=Ed,Id.minute=Id.minutes=Fd,Id.second=Id.seconds=Gd,Id.millisecond=Id.milliseconds=Hd,Id.utcOffset=Ka,Id.utc=Ma,Id.local=Na,Id.parseZone=Oa,Id.hasAlignedHourOffset=Pa,Id.isDST=Qa,Id.isDSTShifted=Ra,Id.isLocal=Sa,Id.isUtcOffset=Ta,Id.isUtc=Ua,Id.isUTC=Ua,Id.zoneAbbr=Ub,Id.zoneName=Vb,Id.dates=$("dates accessor is deprecated. Use date instead.",zd),Id.months=$("months accessor is deprecated. Use month instead",W),Id.years=$("years accessor is deprecated. Use year instead",pd),Id.zone=$("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",La);var Jd=Id,Kd={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Ld={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY LT",LLLL:"dddd, MMMM D, YYYY LT"},Md="Invalid date",Nd="%d",Od=/\d{1,2}/,Pd={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",
hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Qd=r.prototype;Qd._calendar=Kd,Qd.calendar=Yb,Qd._longDateFormat=Ld,Qd.longDateFormat=Zb,Qd._invalidDate=Md,Qd.invalidDate=$b,Qd._ordinal=Nd,Qd.ordinal=_b,Qd._ordinalParse=Od,Qd.preparse=ac,Qd.postformat=ac,Qd._relativeTime=Pd,Qd.relativeTime=bc,Qd.pastFuture=cc,Qd.set=dc,Qd.months=S,Qd._months=id,Qd.monthsShort=T,Qd._monthsShort=jd,Qd.monthsParse=U,Qd.week=ia,Qd._week=qd,Qd.firstDayOfYear=ka,Qd.firstDayOfWeek=ja,Qd.weekdays=Ib,Qd._weekdays=Ad,Qd.weekdaysMin=Kb,Qd._weekdaysMin=Cd,Qd.weekdaysShort=Jb,Qd._weekdaysShort=Bd,Qd.weekdaysParse=Lb,Qd.isPM=Rb,Qd._meridiemParse=Dd,Qd.meridiem=Sb,v("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===p(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=$("moment.lang is deprecated. Use moment.locale instead.",v),a.langData=$("moment.langData is deprecated. Use moment.localeData instead.",x);var Rd=Math.abs,Sd=uc("ms"),Td=uc("s"),Ud=uc("m"),Vd=uc("h"),Wd=uc("d"),Xd=uc("w"),Yd=uc("M"),Zd=uc("y"),$d=wc("milliseconds"),_d=wc("seconds"),ae=wc("minutes"),be=wc("hours"),ce=wc("days"),de=wc("months"),ee=wc("years"),fe=Math.round,ge={s:45,m:45,h:22,d:26,M:11},he=Math.abs,ie=Ea.prototype;ie.abs=lc,ie.add=nc,ie.subtract=oc,ie.as=sc,ie.asMilliseconds=Sd,ie.asSeconds=Td,ie.asMinutes=Ud,ie.asHours=Vd,ie.asDays=Wd,ie.asWeeks=Xd,ie.asMonths=Yd,ie.asYears=Zd,ie.valueOf=tc,ie._bubble=pc,ie.get=vc,ie.milliseconds=$d,ie.seconds=_d,ie.minutes=ae,ie.hours=be,ie.days=ce,ie.weeks=xc,ie.months=de,ie.years=ee,ie.humanize=Bc,ie.toISOString=Cc,ie.toString=Cc,ie.toJSON=Cc,ie.locale=pb,ie.localeData=qb,ie.toIsoString=$("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Cc),ie.lang=yd,G("X",0,0,"unix"),G("x",0,0,"valueOf"),L("x",Xc),L("X",Zc),O("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),O("x",function(a,b,c){c._d=new Date(p(a))}),a.version="2.10.3",b(Aa),a.fn=Jd,a.min=Ca,a.max=Da,a.utc=h,a.unix=Wb,a.months=gc,a.isDate=d,a.locale=v,a.invalid=l,a.duration=Va,a.isMoment=o,a.weekdays=ic,a.parseZone=Xb,a.localeData=x,a.isDuration=Fa,a.monthsShort=hc,a.weekdaysMin=kc,a.defineLocale=w,a.weekdaysShort=jc,a.normalizeUnits=z,a.relativeTimeThreshold=Ac;var je=a;return je});
$(function(){altair_invoices.init()});var $invoice_card=$("#invoice"),$invoice_preview=$("#invoice_preview"),$invoice_form=$("#invoice_form"),$invoices_list_main=$("#invoices_list"),invoice_list_class=".invoices_list",$invoice_add_btn=$("#invoice_add");altair_invoices={init:function(){altair_invoices.copy_list_sidebar(),altair_invoices.add_new(),altair_invoices.open_invoice(),altair_invoices.print_invoice(),$sidebar_secondary_toggle.addClass("uk-hidden-large")},add_new:function(){if($invoice_add_btn){var i=function(){var i=$("#invoice_form_template"),e=$invoice_card.height(),n=$invoice_card.find(".md-card-content").innerHeight(),t=i.html();$(invoice_list_class).find(".md-list-item-active").removeClass("md-list-item-active"),$invoice_card.height(e),$invoice_form.hide().html(t).find(".md-card-content").innerHeight(n);var o=function(){var i=$("#invoice_form_template_services"),e=$invoice_form.find("#form_invoice_services"),n=i.html(),t=Handlebars.compile(n),o=e.children().length?parseInt(e.children(".uk-grid:last").attr("data-service-number"))+1:1,c={invoice_service_id:o},a=t(c);e.append(a),altair_md.inputs(),altair_forms.textarea_autosize(),altair_uikit.reinitialize_grid_margin()};o(),$("#invoice_form_append_service_btn").on("click",function(i){i.preventDefault(),o()}),altair_md.checkbox_radio()},e=function(){$invoice_card.css({height:""}),$invoice_form.show(),$invoice_preview.html(""),setTimeout(function(){altair_uikit.reinitialize_grid_margin()},560)};$invoice_add_btn.on("click",function(n){n.preventDefault(),altair_md.card_show_hide($invoice_card,i,e,void 0)})}},open_invoice:function(){var i=function(i){var e=i,n=$("#invoice_template"),t=n.html(),o=Handlebars.compile(t),c=(parseInt(e.attr("data-invoice-id")),{invoice_id:{invoice_number:Math.floor(200*Math.random()+1)+"/2015",invoice_date:moment().format("DD.MM.YYYY"),invoice_due_date:moment().add(14,"days").format("DD.MM.YYYY"),invoice_from_company:"Bailey-Lynch",invoice_from_address_1:"2808 Robson St",invoice_from_address_2:"Vancouver, BC V6B 3K9",invoice_to_company:"Price Ltd",invoice_to_address_1:"2894 Bond Street",invoice_to_address_2:"Providence, RI 02908",invoice_total_value:"$3,751.50",invoice_vat_value:"$862.85",invoice_services:[{service_name:"Website design & development",service_description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit.",service_rate:"$25.00",service_hours:"32",service_vat:"23%",service_total:"$984.00"},{service_name:"Search engine optimization",service_description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab blanditiis cupiditate delectus deserunt.",service_rate:"$50.00",service_hours:"20",service_vat:"23%",service_total:"$1,230.00"},{service_name:"Consulting service",service_description:"Lorem ipsum dolor sit amet, consectetur.",service_rate:"$100.00",service_hours:"12.5",service_vat:"23%",service_total:"$1,537.50"}],invoice_payment_info:"BANK XYZ<br/>IBAN 123 123 123 123",invoice_payment_due:"14"}}),a=o(c);$invoice_preview.html(a),$invoice_form.html(""),$window.resize()};$(invoice_list_class).on("click","a",function(e){e.preventDefault(),e.stopPropagation(),altair_md.card_show_hide($invoice_card,void 0,i,$(this)),$(this).closest("li").siblings("li").removeClass("md-list-item-active").end().addClass("md-list-item-active"),setTimeout(function(){altair_uikit.reinitialize_grid_margin()},560)}).find("a").eq(2).click()},print_invoice:function(){$body.on("click","#invoice_print",function(i){i.preventDefault(),UIkit.modal.confirm("Do you want to print this invoice?",function(){setTimeout(function(){window.print()},300)},{labels:{Ok:"print"}})})},copy_list_sidebar:function(){var i=$invoices_list_main.clone();i.attr("id","invoices_list_sidebar"),$sidebar_secondary.find(".sidebar_secondary_wrapper").html(i).end()}};
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
!function(t){if("function"==typeof define&&define.amd&&define("uikit",function(){var e=window.UIkit||t(window,window.jQuery,window.document);return e.load=function(t,i,n,o){var s,a=t.split(","),r=[],l=(o.config&&o.config.uikit&&o.config.uikit.base?o.config.uikit.base:"").replace(/\/+$/g,"");if(!l)throw new Error("Please define base path to UIkit in the requirejs config.");for(s=0;s<a.length;s+=1){var u=a[s].replace(/\./g,"/");r.push(l+"/components/"+u)}i(r,function(){n(e)})},e}),!window.jQuery)throw new Error("UIkit requires jQuery");window&&window.jQuery&&t(window,window.jQuery,window.document)}(function(t,e,i){"use strict";var n={},o=t.UIkit?Object.create(t.UIkit):void 0;if(n.version="2.21.0",n.noConflict=function(){return o&&(t.UIkit=o,e.UIkit=o,e.fn.uk=o.fn),n},n.prefix=function(t){return t},n.$=e,n.$doc=n.$(document),n.$win=n.$(window),n.$html=n.$("html"),n.support={},n.support.transition=function(){var t=function(){var t,e=i.body||i.documentElement,n={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(t in n)if(void 0!==e.style[t])return n[t]}();return t&&{end:t}}(),n.support.animation=function(){var t=function(){var t,e=i.body||i.documentElement,n={WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"};for(t in n)if(void 0!==e.style[t])return n[t]}();return t&&{end:t}}(),function(){var e=0;t.requestAnimationFrame=t.requestAnimationFrame||t.webkitRequestAnimationFrame||function(i,n){var o=(new Date).getTime(),s=Math.max(0,16-(o-e)),a=t.setTimeout(function(){i(o+s)},s);return e=o+s,a},t.cancelAnimationFrame||(t.cancelAnimationFrame=function(t){clearTimeout(t)})}(),n.support.touch="ontouchstart"in document||t.DocumentTouch&&document instanceof t.DocumentTouch||t.navigator.msPointerEnabled&&t.navigator.msMaxTouchPoints>0||t.navigator.pointerEnabled&&t.navigator.maxTouchPoints>0||!1,n.support.mutationobserver=t.MutationObserver||t.WebKitMutationObserver||null,n.Utils={},n.Utils.isFullscreen=function(){return document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement||document.fullscreenElement||!1},n.Utils.str2json=function(t,e){try{return e?JSON.parse(t.replace(/([\$\w]+)\s*:/g,function(t,e){return'"'+e+'":'}).replace(/'([^']+)'/g,function(t,e){return'"'+e+'"'})):new Function("","var json = "+t+"; return JSON.parse(JSON.stringify(json));")()}catch(i){return!1}},n.Utils.debounce=function(t,e,i){var n;return function(){var o=this,s=arguments,a=function(){n=null,i||t.apply(o,s)},r=i&&!n;clearTimeout(n),n=setTimeout(a,e),r&&t.apply(o,s)}},n.Utils.removeCssRules=function(t){var e,i,n,o,s,a,r,l,u,c;t&&setTimeout(function(){try{for(c=document.styleSheets,o=0,r=c.length;r>o;o++){for(n=c[o],i=[],n.cssRules=n.cssRules,e=s=0,l=n.cssRules.length;l>s;e=++s)n.cssRules[e].type===CSSRule.STYLE_RULE&&t.test(n.cssRules[e].selectorText)&&i.unshift(e);for(a=0,u=i.length;u>a;a++)n.deleteRule(i[a])}}catch(d){}},0)},n.Utils.isInView=function(t,i){var o=e(t);if(!o.is(":visible"))return!1;var s=n.$win.scrollLeft(),a=n.$win.scrollTop(),r=o.offset(),l=r.left,u=r.top;return i=e.extend({topoffset:0,leftoffset:0},i),u+o.height()>=a&&u-i.topoffset<=a+n.$win.height()&&l+o.width()>=s&&l-i.leftoffset<=s+n.$win.width()?!0:!1},n.Utils.checkDisplay=function(t,i){var o=n.$("[data-uk-margin], [data-uk-grid-match], [data-uk-grid-margin], [data-uk-check-display]",t||document);return t&&!o.length&&(o=e(t)),o.trigger("display.uk.check"),i&&("string"!=typeof i&&(i='[class*="uk-animation-"]'),o.find(i).each(function(){var t=n.$(this),e=t.attr("class"),i=e.match(/uk\-animation\-(.+)/);t.removeClass(i[0]).width(),t.addClass(i[0])})),o},n.Utils.options=function(t){if(e.isPlainObject(t))return t;var i=t?t.indexOf("{"):-1,o={};if(-1!=i)try{o=n.Utils.str2json(t.substr(i))}catch(s){}return o},n.Utils.animate=function(t,i){var o=e.Deferred();return t=n.$(t),i=i,t.css("display","none").addClass(i).one(n.support.animation.end,function(){t.removeClass(i),o.resolve()}).width(),t.css("display",""),o.promise()},n.Utils.uid=function(t){return(t||"id")+(new Date).getTime()+"RAND"+Math.ceil(1e5*Math.random())},n.Utils.template=function(t,e){for(var i,n,o,s,a=t.replace(/\n/g,"\\n").replace(/\{\{\{\s*(.+?)\s*\}\}\}/g,"{{!$1}}").split(/(\{\{\s*(.+?)\s*\}\})/g),r=0,l=[],u=0;r<a.length;){if(i=a[r],i.match(/\{\{\s*(.+?)\s*\}\}/))switch(r+=1,i=a[r],n=i[0],o=i.substring(i.match(/^(\^|\#|\!|\~|\:)/)?1:0),n){case"~":l.push("for(var $i=0;$i<"+o+".length;$i++) { var $item = "+o+"[$i];"),u++;break;case":":l.push("for(var $key in "+o+") { var $val = "+o+"[$key];"),u++;break;case"#":l.push("if("+o+") {"),u++;break;case"^":l.push("if(!"+o+") {"),u++;break;case"/":l.push("}"),u--;break;case"!":l.push("__ret.push("+o+");");break;default:l.push("__ret.push(escape("+o+"));")}else l.push("__ret.push('"+i.replace(/\'/g,"\\'")+"');");r+=1}return s=new Function("$data",["var __ret = [];","try {","with($data){",u?'__ret = ["Not all blocks are closed correctly."]':l.join(""),"};","}catch(e){__ret = [e.message];}",'return __ret.join("").replace(/\\n\\n/g, "\\n");',"function escape(html) { return String(html).replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');}"].join("\n")),e?s(e):s},n.Utils.events={},n.Utils.events.click=n.support.touch?"tap":"click",t.UIkit=n,n.fn=function(t,i){var o=arguments,s=t.match(/^([a-z\-]+)(?:\.([a-z]+))?/i),a=s[1],r=s[2];return n[a]?this.each(function(){var t=e(this),s=t.data(a);s||t.data(a,s=n[a](this,r?void 0:i)),r&&s[r].apply(s,Array.prototype.slice.call(o,1))}):(e.error("UIkit component ["+a+"] does not exist."),this)},e.UIkit=n,e.fn.uk=n.fn,n.langdirection="rtl"==n.$html.attr("dir")?"right":"left",n.components={},n.component=function(t,i){var o=function(i,s){var a=this;return this.UIkit=n,this.element=i?n.$(i):null,this.options=e.extend(!0,{},this.defaults,s),this.plugins={},this.element&&this.element.data(t,this),this.init(),(this.options.plugins.length?this.options.plugins:Object.keys(o.plugins)).forEach(function(t){o.plugins[t].init&&(o.plugins[t].init(a),a.plugins[t]=!0)}),this.trigger("init.uk.component",[t,this]),this};return o.plugins={},e.extend(!0,o.prototype,{defaults:{plugins:[]},boot:function(){},init:function(){},on:function(t,e,i){return n.$(this.element||this).on(t,e,i)},one:function(t,e,i){return n.$(this.element||this).one(t,e,i)},off:function(t){return n.$(this.element||this).off(t)},trigger:function(t,e){return n.$(this.element||this).trigger(t,e)},find:function(t){return n.$(this.element?this.element:[]).find(t)},proxy:function(t,e){var i=this;e.split(" ").forEach(function(e){i[e]||(i[e]=function(){return t[e].apply(t,arguments)})})},mixin:function(t,e){var i=this;e.split(" ").forEach(function(e){i[e]||(i[e]=t[e].bind(i))})},option:function(){return 1==arguments.length?this.options[arguments[0]]||void 0:void(2==arguments.length&&(this.options[arguments[0]]=arguments[1]))}},i),this.components[t]=o,this[t]=function(){var i,o;if(arguments.length)switch(arguments.length){case 1:"string"==typeof arguments[0]||arguments[0].nodeType||arguments[0]instanceof jQuery?i=e(arguments[0]):o=arguments[0];break;case 2:i=e(arguments[0]),o=arguments[1]}return i&&i.data(t)?i.data(t):new n.components[t](i,o)},n.domready&&n.component.boot(t),o},n.plugin=function(t,e,i){this.components[t].plugins[e]=i},n.component.boot=function(t){n.components[t].prototype&&n.components[t].prototype.boot&&!n.components[t].booted&&(n.components[t].prototype.boot.apply(n,[]),n.components[t].booted=!0)},n.component.bootComponents=function(){for(var t in n.components)n.component.boot(t)},n.domObservers=[],n.domready=!1,n.ready=function(t){n.domObservers.push(t),n.domready&&t(document)},n.on=function(t,e,i){return t&&t.indexOf("ready.uk.dom")>-1&&n.domready&&e.apply(n.$doc),n.$doc.on(t,e,i)},n.one=function(t,e,i){return t&&t.indexOf("ready.uk.dom")>-1&&n.domready?(e.apply(n.$doc),n.$doc):n.$doc.one(t,e,i)},n.trigger=function(t,e){return n.$doc.trigger(t,e)},n.domObserve=function(t,e){n.support.mutationobserver&&(e=e||function(){},n.$(t).each(function(){var t=this,i=n.$(t);if(!i.data("observer"))try{var o=new n.support.mutationobserver(n.Utils.debounce(function(n){e.apply(t,[]),i.trigger("changed.uk.dom")},50));o.observe(t,{childList:!0,subtree:!0}),i.data("observer",o)}catch(s){}}))},n.init=function(t){t=t||document,n.domObservers.forEach(function(e){e(t)})},n.on("domready.uk.dom",function(){n.init(),n.domready&&n.Utils.checkDisplay()}),e(function(){n.$body=n.$("body"),n.ready(function(t){n.domObserve("[data-uk-observe]")}),n.on("changed.uk.dom",function(t){n.init(t.target),n.Utils.checkDisplay(t.target)}),n.trigger("beforeready.uk.dom"),n.component.bootComponents(),setInterval(function(){var t,e={x:window.pageXOffset,y:window.pageYOffset},i=function(){(e.x!=window.pageXOffset||e.y!=window.pageYOffset)&&(t={x:0,y:0},window.pageXOffset!=e.x&&(t.x=window.pageXOffset>e.x?1:-1),window.pageYOffset!=e.y&&(t.y=window.pageYOffset>e.y?1:-1),e={dir:t,x:window.pageXOffset,y:window.pageYOffset},n.$doc.trigger("scrolling.uk.document",[e]))};return n.support.touch&&n.$html.on("touchmove touchend MSPointerMove MSPointerUp pointermove pointerup",i),(e.x||e.y)&&i(),i}(),15),n.trigger("domready.uk.dom"),n.support.touch&&navigator.userAgent.match(/(iPad|iPhone|iPod)/g)&&n.$win.on("load orientationchange resize",n.Utils.debounce(function(){var t=function(){return e(".uk-height-viewport").css("height",window.innerHeight),t};return t()}(),100)),n.trigger("afterready.uk.dom"),n.domready=!0}),n.$html.addClass(n.support.touch?"uk-touch":"uk-notouch"),n.support.touch){var s,a=!1,r="uk-hover",l=".uk-overlay, .uk-overlay-hover, .uk-overlay-toggle, .uk-animation-hover, .uk-has-hover";n.$html.on("touchstart MSPointerDown pointerdown",l,function(){a&&e("."+r).removeClass(r),a=e(this).addClass(r)}).on("touchend MSPointerUp pointerup",function(t){s=e(t.target).parents(l),a&&a.not(s).removeClass(r)})}return n}),function(t){function e(t,e,i,n){return Math.abs(t-e)>=Math.abs(i-n)?t-e>0?"Left":"Right":i-n>0?"Up":"Down"}function i(){u=null,d.last&&(d.el.trigger("longTap"),d={})}function n(){u&&clearTimeout(u),u=null}function o(){a&&clearTimeout(a),r&&clearTimeout(r),l&&clearTimeout(l),u&&clearTimeout(u),a=r=l=u=null,d={}}function s(t){return t.pointerType==t.MSPOINTER_TYPE_TOUCH&&t.isPrimary}if(!t.fn.swipeLeft){var a,r,l,u,c,d={},h=750;t(function(){var p,f,m,g=0,v=0;"MSGesture"in window&&(c=new MSGesture,c.target=document.body),t(document).on("MSGestureEnd gestureend",function(t){var e=t.originalEvent.velocityX>1?"Right":t.originalEvent.velocityX<-1?"Left":t.originalEvent.velocityY>1?"Down":t.originalEvent.velocityY<-1?"Up":null;e&&(d.el.trigger("swipe"),d.el.trigger("swipe"+e))}).on("touchstart MSPointerDown pointerdown",function(e){("MSPointerDown"!=e.type||s(e.originalEvent))&&(m="MSPointerDown"==e.type||"pointerdown"==e.type?e:e.originalEvent.touches[0],p=Date.now(),f=p-(d.last||p),d.el=t("tagName"in m.target?m.target:m.target.parentNode),a&&clearTimeout(a),d.x1=m.pageX,d.y1=m.pageY,f>0&&250>=f&&(d.isDoubleTap=!0),d.last=p,u=setTimeout(i,h),!c||"MSPointerDown"!=e.type&&"pointerdown"!=e.type&&"touchstart"!=e.type||c.addPointer(e.originalEvent.pointerId))}).on("touchmove MSPointerMove pointermove",function(t){("MSPointerMove"!=t.type||s(t.originalEvent))&&(m="MSPointerMove"==t.type||"pointermove"==t.type?t:t.originalEvent.touches[0],n(),d.x2=m.pageX,d.y2=m.pageY,g+=Math.abs(d.x1-d.x2),v+=Math.abs(d.y1-d.y2))}).on("touchend MSPointerUp pointerup",function(i){("MSPointerUp"!=i.type||s(i.originalEvent))&&(n(),d.x2&&Math.abs(d.x1-d.x2)>30||d.y2&&Math.abs(d.y1-d.y2)>30?l=setTimeout(function(){d.el.trigger("swipe"),d.el.trigger("swipe"+e(d.x1,d.x2,d.y1,d.y2)),d={}},0):"last"in d&&(isNaN(g)||30>g&&30>v?r=setTimeout(function(){var e=t.Event("tap");e.cancelTouch=o,d.el.trigger(e),d.isDoubleTap?(d.el.trigger("doubleTap"),d={}):a=setTimeout(function(){a=null,d.el.trigger("singleTap"),d={}},250)},0):d={},g=v=0))}).on("touchcancel MSPointerCancel",o),t(window).on("scroll",o)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(e){t.fn[e]=function(i){return t(this).on(e,i)}})}}(jQuery),function(t){"use strict";var e=[];t.component("stackMargin",{defaults:{cls:"uk-margin-small-top"},boot:function(){t.ready(function(e){t.$("[data-uk-margin]",e).each(function(){var e,i=t.$(this);i.data("stackMargin")||(e=t.stackMargin(i,t.Utils.options(i.attr("data-uk-margin"))))})})},init:function(){var i=this;this.columns=this.element.children(),this.columns.length&&(t.$win.on("resize orientationchange",function(){var e=function(){i.process()};return t.$(function(){e(),t.$win.on("load",e)}),t.Utils.debounce(e,20)}()),t.$html.on("changed.uk.dom",function(t){i.columns=i.element.children(),i.process()}),this.on("display.uk.check",function(t){i.columns=i.element.children(),this.element.is(":visible")&&this.process()}.bind(this)),e.push(this))},process:function(){return t.Utils.stackMargin(this.columns,this.options),this},revert:function(){return this.columns.removeClass(this.options.cls),this}}),function(){var e=[],i=function(t){if(t.is(":visible")){var e=t.parent().width(),i=t.data("width"),n=e/i,o=Math.floor(n*t.data("height"));t.css({height:i>e?o:t.data("height")})}};t.component("responsiveElement",{defaults:{},boot:function(){t.ready(function(e){t.$("iframe.uk-responsive-width, [data-uk-responsive]",e).each(function(){var e,i=t.$(this);i.data("responsiveIframe")||(e=t.responsiveElement(i,{}))})})},init:function(){var t=this.element;t.attr("width")&&t.attr("height")&&(t.data({width:t.attr("width"),height:t.attr("height")}).on("display.uk.check",function(){i(t)}),i(t),e.push(t))}}),t.$win.on("resize load",t.Utils.debounce(function(){e.forEach(function(t){i(t)})},15))}(),t.Utils.stackMargin=function(e,i){i=t.$.extend({cls:"uk-margin-small-top"},i),i.cls=i.cls,e=t.$(e).removeClass(i.cls);var n=!1,o=e.filter(":visible:first"),s=o.length?o.position().top+o.outerHeight()-1:!1;s!==!1&&e.each(function(){var e=t.$(this);e.is(":visible")&&(n?e.addClass(i.cls):e.position().top>=s&&(n=e.addClass(i.cls)))})},t.Utils.matchHeights=function(e,i){e=t.$(e).css("min-height",""),i=t.$.extend({row:!0},i);var n=function(e){if(!(e.length<2)){var i=0;e.each(function(){i=Math.max(i,t.$(this).outerHeight())}).each(function(){var e=t.$(this),n=i-("border-box"==e.css("box-sizing")?0:e.outerHeight()-e.height());e.css("min-height",n+"px")})}};i.row?(e.first().width(),setTimeout(function(){var i=!1,o=[];e.each(function(){var e=t.$(this),s=e.offset().top;s!=i&&o.length&&(n(t.$(o)),o=[],s=e.offset().top),o.push(e),i=s}),o.length&&n(t.$(o))},0)):n(e)}}(UIkit),function(t){"use strict";function e(e,i){i=t.$.extend({duration:1e3,transition:"easeOutExpo",offset:0,complete:function(){}},i);var n=e.offset().top-i.offset,o=t.$doc.height(),s=window.innerHeight;n+s>o&&(n=o-s),t.$("html,body").stop().animate({scrollTop:n},i.duration,i.transition).promise().done(i.complete)}t.component("smoothScroll",{boot:function(){t.$html.on("click.smooth-scroll.uikit","[data-uk-smooth-scroll]",function(e){var i=t.$(this);if(!i.data("smoothScroll")){{t.smoothScroll(i,t.Utils.options(i.attr("data-uk-smooth-scroll")))}i.trigger("click")}return!1})},init:function(){var i=this;this.on("click",function(n){n.preventDefault(),e(t.$(t.$(this.hash).length?this.hash:"body"),i.options)})}}),t.Utils.scrollToElement=e,t.$.easing.easeOutExpo||(t.$.easing.easeOutExpo=function(t,e,i,n,o){return e==o?i+n:n*(-Math.pow(2,-10*e/o)+1)+i})}(UIkit),function(t){"use strict";var e=t.$win,i=t.$doc,n=[],o=function(){for(var t=0;t<n.length;t++)window.requestAnimationFrame.apply(window,[n[t].check])};t.component("scrollspy",{defaults:{target:!1,cls:"uk-scrollspy-inview",initcls:"uk-scrollspy-init-inview",topoffset:0,leftoffset:0,repeat:!1,delay:0},boot:function(){i.on("scrolling.uk.document",o),e.on("load resize orientationchange",t.Utils.debounce(o,50)),t.ready(function(e){t.$("[data-uk-scrollspy]",e).each(function(){var e=t.$(this);if(!e.data("scrollspy")){t.scrollspy(e,t.Utils.options(e.attr("data-uk-scrollspy")))}})})},init:function(){var e,i=this,o=this.options.cls.split(/,/),s=function(){var n=i.options.target?i.element.find(i.options.target):i.element,s=1===n.length?1:0,a=0;n.each(function(n){var r=t.$(this),l=r.data("inviewstate"),u=t.Utils.isInView(r,i.options),c=r.data("ukScrollspyCls")||o[a].trim();!u||l||r.data("scrollspy-idle")||(e||(r.addClass(i.options.initcls),i.offset=r.offset(),e=!0,r.trigger("init.uk.scrollspy")),r.data("scrollspy-idle",setTimeout(function(){r.addClass("uk-scrollspy-inview").toggleClass(c).width(),r.trigger("inview.uk.scrollspy"),r.data("scrollspy-idle",!1),r.data("inviewstate",!0)},i.options.delay*s)),s++),!u&&l&&i.options.repeat&&(r.data("scrollspy-idle")&&clearTimeout(r.data("scrollspy-idle")),r.removeClass("uk-scrollspy-inview").toggleClass(c),r.data("inviewstate",!1),r.trigger("outview.uk.scrollspy")),a=o[a+1]?a+1:0})};s(),this.check=s,n.push(this)}});var s=[],a=function(){for(var t=0;t<s.length;t++)window.requestAnimationFrame.apply(window,[s[t].check])};t.component("scrollspynav",{defaults:{cls:"uk-active",closest:!1,topoffset:0,leftoffset:0,smoothscroll:!1},boot:function(){i.on("scrolling.uk.document",a),e.on("resize orientationchange",t.Utils.debounce(a,50)),t.ready(function(e){t.$("[data-uk-scrollspy-nav]",e).each(function(){var e=t.$(this);if(!e.data("scrollspynav")){t.scrollspynav(e,t.Utils.options(e.attr("data-uk-scrollspy-nav")))}})})},init:function(){var i,n=[],o=this.find("a[href^='#']").each(function(){n.push(t.$(this).attr("href"))}),a=t.$(n.join(",")),r=this.options.cls,l=this.options.closest||this.options.closest,u=this,c=function(){i=[];for(var n=0;n<a.length;n++)t.Utils.isInView(a.eq(n),u.options)&&i.push(a.eq(n));if(i.length){var s,c=e.scrollTop(),d=function(){for(var t=0;t<i.length;t++)if(i[t].offset().top>=c)return i[t]}();if(!d)return;u.options.closest?(o.closest(l).removeClass(r),s=o.filter("a[href='#"+d.attr("id")+"']").closest(l).addClass(r)):s=o.removeClass(r).filter("a[href='#"+d.attr("id")+"']").addClass(r),u.element.trigger("inview.uk.scrollspynav",[d,s])}};this.options.smoothscroll&&t.smoothScroll&&o.each(function(){t.smoothScroll(this,u.options.smoothscroll)}),c(),this.element.data("scrollspynav",this),this.check=c,s.push(this)}})}(UIkit),function(t){"use strict";var e=[];t.component("toggle",{defaults:{target:!1,cls:"uk-hidden",animation:!1,duration:200},boot:function(){t.ready(function(i){t.$("[data-uk-toggle]",i).each(function(){var e=t.$(this);if(!e.data("toggle")){t.toggle(e,t.Utils.options(e.attr("data-uk-toggle")))}}),setTimeout(function(){e.forEach(function(t){t.getToggles()})},0)})},init:function(){var t=this;this.aria=-1!==this.options.cls.indexOf("uk-hidden"),this.getToggles(),this.on("click",function(e){t.element.is('a[href="#"]')&&e.preventDefault(),t.toggle()}),e.push(this)},toggle:function(){if(this.totoggle.length){if(this.options.animation&&t.support.animation){var e=this,i=this.options.animation.split(",");1==i.length&&(i[1]=i[0]),i[0]=i[0].trim(),i[1]=i[1].trim(),this.totoggle.css("animation-duration",this.options.duration+"ms"),this.totoggle.hasClass(this.options.cls)?(this.totoggle.toggleClass(this.options.cls),this.totoggle.each(function(){t.Utils.animate(this,i[0]).then(function(){t.$(this).css("animation-duration",""),t.Utils.checkDisplay(this)})})):this.totoggle.each(function(){t.Utils.animate(this,i[1]+" uk-animation-reverse").then(function(){t.$(this).toggleClass(e.options.cls).css("animation-duration",""),t.Utils.checkDisplay(this)}.bind(this))})}else this.totoggle.toggleClass(this.options.cls),t.Utils.checkDisplay(this.totoggle);this.updateAria()}},getToggles:function(){this.totoggle=this.options.target?t.$(this.options.target):[],this.updateAria()},updateAria:function(){this.aria&&this.totoggle.length&&this.totoggle.each(function(){t.$(this).attr("aria-hidden",t.$(this).hasClass("uk-hidden"))})}})}(UIkit),function(t){"use strict";t.component("alert",{defaults:{fade:!0,duration:200,trigger:".uk-alert-close"},boot:function(){t.$html.on("click.alert.uikit","[data-uk-alert]",function(e){var i=t.$(this);if(!i.data("alert")){var n=t.alert(i,t.Utils.options(i.attr("data-uk-alert")));t.$(e.target).is(n.options.trigger)&&(e.preventDefault(),n.close())}})},init:function(){var t=this;this.on("click",this.options.trigger,function(e){e.preventDefault(),t.close()})},close:function(){var t=this.trigger("close.uk.alert"),e=function(){this.trigger("closed.uk.alert").remove()}.bind(this);this.options.fade?t.css("overflow","hidden").css("max-height",t.height()).animate({height:0,opacity:0,"padding-top":0,"padding-bottom":0,"margin-top":0,"margin-bottom":0},this.options.duration,e):e()}})}(UIkit),function(t){"use strict";t.component("buttonRadio",{defaults:{target:".uk-button"},boot:function(){t.$html.on("click.buttonradio.uikit","[data-uk-button-radio]",function(e){var i=t.$(this);if(!i.data("buttonRadio")){var n=t.buttonRadio(i,t.Utils.options(i.attr("data-uk-button-radio"))),o=t.$(e.target);o.is(n.options.target)&&o.trigger("click")}})},init:function(){var e=this;this.find(e.options.target).attr("aria-checked","false").filter(".uk-active").attr("aria-checked","true"),this.on("click",this.options.target,function(i){var n=t.$(this);n.is('a[href="#"]')&&i.preventDefault(),e.find(e.options.target).not(n).removeClass("uk-active").blur(),n.addClass("uk-active"),e.find(e.options.target).not(n).attr("aria-checked","false"),n.attr("aria-checked","true"),e.trigger("change.uk.button",[n])})},getSelected:function(){return this.find(".uk-active")}}),t.component("buttonCheckbox",{defaults:{target:".uk-button"},boot:function(){t.$html.on("click.buttoncheckbox.uikit","[data-uk-button-checkbox]",function(e){var i=t.$(this);if(!i.data("buttonCheckbox")){var n=t.buttonCheckbox(i,t.Utils.options(i.attr("data-uk-button-checkbox"))),o=t.$(e.target);o.is(n.options.target)&&o.trigger("click")}})},init:function(){var e=this;this.find(e.options.target).attr("aria-checked","false").filter(".uk-active").attr("aria-checked","true"),this.on("click",this.options.target,function(i){var n=t.$(this);n.is('a[href="#"]')&&i.preventDefault(),n.toggleClass("uk-active").blur(),n.attr("aria-checked",n.hasClass("uk-active")),e.trigger("change.uk.button",[n])})},getSelected:function(){return this.find(".uk-active")}}),t.component("button",{defaults:{},boot:function(){t.$html.on("click.button.uikit","[data-uk-button]",function(e){var i=t.$(this);if(!i.data("button")){{t.button(i,t.Utils.options(i.attr("data-uk-button")))}i.trigger("click")}})},init:function(){var t=this;this.element.attr("aria-pressed",this.element.hasClass("uk-active")),this.on("click",function(e){t.element.is('a[href="#"]')&&e.preventDefault(),t.toggle(),t.trigger("change.uk.button",[t.element.blur().hasClass("uk-active")])})},toggle:function(){this.element.toggleClass("uk-active"),this.element.attr("aria-pressed",this.element.hasClass("uk-active"))}})}(UIkit),function(t){"use strict";var e,i=!1;t.component("dropdown",{defaults:{mode:"hover",remaintime:800,justify:!1,boundary:t.$win,delay:0,hoverDelayIdle:250},remainIdle:!1,boot:function(){var e=t.support.touch?"click":"mouseenter";t.$html.on(e+".dropdown.uikit","[data-uk-dropdown]",function(i){var n=t.$(this);if(!n.data("dropdown")){var o=t.dropdown(n,t.Utils.options(n.attr("data-uk-dropdown")));("click"==e||"mouseenter"==e&&"hover"==o.options.mode)&&o.element.trigger(e),o.element.find(".uk-dropdown").length&&i.preventDefault()}})},init:function(){var n=this;this.dropdown=this.find(".uk-dropdown"),this.centered=this.dropdown.hasClass("uk-dropdown-center"),this.justified=this.options.justify?t.$(this.options.justify):!1,this.boundary=t.$(this.options.boundary),this.flipped=this.dropdown.hasClass("uk-dropdown-flip"),this.boundary.length||(this.boundary=t.$win),this.element.attr("aria-haspopup","true"),this.element.attr("aria-expanded",this.element.hasClass("uk-open")),"click"==this.options.mode||t.support.touch?this.on("click.uikit.dropdown",function(e){var i=t.$(e.target);i.parents(".uk-dropdown").length||((i.is("a[href='#']")||i.parent().is("a[href='#']")||n.dropdown.length&&!n.dropdown.is(":visible"))&&e.preventDefault(),i.blur()),n.element.hasClass("uk-open")?(i.is("a:not(.js-uk-prevent)")||i.is(".uk-dropdown-close")||!n.dropdown.find(e.target).length)&&n.hide():n.show()}):this.on("mouseenter",function(t){n.remainIdle&&clearTimeout(n.remainIdle),e&&clearTimeout(e),i&&i==n||(e=i&&i!=n?setTimeout(function(){e=setTimeout(n.show.bind(n),n.options.delay)},n.options.hoverDelayIdle):setTimeout(n.show.bind(n),n.options.delay))}).on("mouseleave",function(){e&&clearTimeout(e),n.remainIdle=setTimeout(function(){i&&i==n&&n.hide()},n.options.remaintime)}).on("click",function(e){var i=t.$(e.target);n.remainIdle&&clearTimeout(n.remainIdle),(i.is("a[href='#']")||i.parent().is("a[href='#']"))&&e.preventDefault(),n.show()})},show:function(){t.$html.off("click.outer.dropdown"),i&&i!=this&&i.hide(),e&&clearTimeout(e),this.checkDimensions(),this.element.addClass("uk-open"),this.element.attr("aria-expanded","true"),this.trigger("show.uk.dropdown",[this]),t.Utils.checkDisplay(this.dropdown,!0),i=this,this.registerOuterClick()},hide:function(){this.element.removeClass("uk-open"),this.remainIdle&&clearTimeout(this.remainIdle),this.remainIdle=!1,this.element.attr("aria-expanded","false"),this.trigger("hide.uk.dropdown",[this]),i==this&&(i=!1)},registerOuterClick:function(){var n=this;t.$html.off("click.outer.dropdown"),setTimeout(function(){t.$html.on("click.outer.dropdown",function(o){e&&clearTimeout(e);var s=t.$(o.target);i!=n||!s.is("a:not(.js-uk-prevent)")&&!s.is(".uk-dropdown-close")&&n.dropdown.find(o.target).length||(n.hide(),t.$html.off("click.outer.dropdown"))})},10)},checkDimensions:function(){if(this.dropdown.length){this.justified&&this.justified.length&&this.dropdown.css("min-width","");var e=this,i=this.dropdown.css("margin-"+t.langdirection,""),n=i.show().offset(),o=i.outerWidth(),s=this.boundary.width(),a=this.boundary.offset()?this.boundary.offset().left:0;if(this.centered&&(i.css("margin-"+t.langdirection,-1*(parseFloat(o)/2-i.parent().width()/2)),n=i.offset(),(o+n.left>s||n.left<0)&&(i.css("margin-"+t.langdirection,""),n=i.offset())),this.justified&&this.justified.length){var r=this.justified.outerWidth();if(i.css("min-width",r),"right"==t.langdirection){var l=s-(this.justified.offset().left+r),u=s-(i.offset().left+i.outerWidth());i.css("margin-right",l-u)}else i.css("margin-left",this.justified.offset().left-n.left);n=i.offset()}o+(n.left-a)>s&&(i.addClass("uk-dropdown-flip"),n=i.offset()),n.left-a<0&&(i.addClass("uk-dropdown-stack"),i.hasClass("uk-dropdown-flip")&&(this.flipped||(i.removeClass("uk-dropdown-flip"),n=i.offset(),i.addClass("uk-dropdown-flip")),setTimeout(function(){(i.offset().left-a<0||!e.flipped&&i.outerWidth()+(n.left-a)<s)&&i.removeClass("uk-dropdown-flip")},0)),this.trigger("stack.uk.dropdown",[this])),i.css("display","")}}})}(UIkit),function(t){"use strict";var e=[];t.component("gridMatchHeight",{defaults:{target:!1,row:!0,ignorestacked:!1},boot:function(){t.ready(function(e){t.$("[data-uk-grid-match]",e).each(function(){var e,i=t.$(this);i.data("gridMatchHeight")||(e=t.gridMatchHeight(i,t.Utils.options(i.attr("data-uk-grid-match"))))})})},init:function(){var i=this;this.columns=this.element.children(),this.elements=this.options.target?this.find(this.options.target):this.columns,this.columns.length&&(t.$win.on("load resize orientationchange",function(){var e=function(){i.match()};return t.$(function(){e()}),t.Utils.debounce(e,50)}()),t.$html.on("changed.uk.dom",function(t){i.columns=i.element.children(),i.elements=i.options.target?i.find(i.options.target):i.columns,i.match()}),this.on("display.uk.check",function(t){this.element.is(":visible")&&this.match()}.bind(this)),e.push(this))},match:function(){var e=this.columns.filter(":visible:first");if(e.length){var i=Math.ceil(100*parseFloat(e.css("width"))/parseFloat(e.parent().css("width")))>=100;return i&&!this.options.ignorestacked?this.revert():t.Utils.matchHeights(this.elements,this.options),this}},revert:function(){return this.elements.css("min-height",""),this}}),t.component("gridMargin",{defaults:{cls:"uk-grid-margin"},boot:function(){t.ready(function(e){t.$("[data-uk-grid-margin]",e).each(function(){var e,i=t.$(this);i.data("gridMargin")||(e=t.gridMargin(i,t.Utils.options(i.attr("data-uk-grid-margin"))))})})},init:function(){t.stackMargin(this.element,this.options)}})}(UIkit),function(t){"use strict";function e(e,i){return i?("object"==typeof e?(e=e instanceof jQuery?e:t.$(e),e.parent().length&&(i.persist=e,i.persist.data("modalPersistParent",e.parent()))):e=t.$("<div></div>").html("string"==typeof e||"number"==typeof e?e:"UIkit.modal Error: Unsupported data type: "+typeof e),e.appendTo(i.element.find(".uk-modal-dialog")),i):void 0}var i,n=!1,o=0,s=t.$html;t.component("modal",{defaults:{keyboard:!0,bgclose:!0,minScrollHeight:150,center:!1,modal:!0},scrollable:!1,transition:!1,init:function(){if(i||(i=t.$("body")),this.element.length){var e=this;this.paddingdir="padding-"+("left"==t.langdirection?"right":"left"),this.dialog=this.find(".uk-modal-dialog"),this.active=!1,this.element.attr("aria-hidden",this.element.hasClass("uk-open")),this.on("click",".uk-modal-close",function(t){t.preventDefault(),e.hide()}).on("click",function(i){var n=t.$(i.target);n[0]==e.element[0]&&e.options.bgclose&&e.hide()})}},toggle:function(){return this[this.isActive()?"hide":"show"]()},show:function(){if(this.element.length){if(!this.isActive())return this.options.modal&&n&&n.hide(!0),this.element.removeClass("uk-open").show(),this.resize(),this.options.modal&&(n=this),this.active=!0,o++,this.element.addClass("uk-open"),s.addClass("uk-modal-page").height(),this.element.attr("aria-hidden","false"),this.element.trigger("show.uk.modal"),t.Utils.checkDisplay(this.dialog,!0),this}},hide:function(e){if(!e&&t.support.transition){var i=this;this.one(t.support.transition.end,function(){i._hide()}).removeClass("uk-open")}else this._hide();return this},resize:function(){var t=i.width();if(this.scrollbarwidth=window.innerWidth-t,i.css(this.paddingdir,this.scrollbarwidth),this.element.css("overflow-y",this.scrollbarwidth?"scroll":"auto"),!this.updateScrollable()&&this.options.center){var e=this.dialog.outerHeight(),n=parseInt(this.dialog.css("margin-top"),10)+parseInt(this.dialog.css("margin-bottom"),10);this.dialog.css(e+n<window.innerHeight?{top:window.innerHeight/2-e/2-n}:{top:""})}},updateScrollable:function(){var t=this.dialog.find(".uk-overflow-container:visible:first");if(t.length){t.css("height",0);var e=Math.abs(parseInt(this.dialog.css("margin-top"),10)),i=this.dialog.outerHeight(),n=window.innerHeight,o=n-2*(20>e?20:e)-i;return t.css("height",o<this.options.minScrollHeight?"":o),!0}return!1},_hide:function(){this.active=!1,o--,this.element.hide().removeClass("uk-open"),this.element.attr("aria-hidden","true"),o||(s.removeClass("uk-modal-page"),i.css(this.paddingdir,"")),n===this&&(n=!1),this.trigger("hide.uk.modal")},isActive:function(){return this.active}}),t.component("modalTrigger",{boot:function(){t.$html.on("click.modal.uikit","[data-uk-modal]",function(e){var i=t.$(this);if(i.is("a")&&e.preventDefault(),!i.data("modalTrigger")){var n=t.modalTrigger(i,t.Utils.options(i.attr("data-uk-modal")));n.show()}}),t.$html.on("keydown.modal.uikit",function(t){n&&27===t.keyCode&&n.options.keyboard&&(t.preventDefault(),n.hide())}),t.$win.on("resize orientationchange",t.Utils.debounce(function(){n&&n.resize()},150))},init:function(){var e=this;this.options=t.$.extend({target:e.element.is("a")?e.element.attr("href"):!1},this.options),this.modal=t.modal(this.options.target,this.options),this.on("click",function(t){t.preventDefault(),e.show()}),this.proxy(this.modal,"show hide isActive")}}),t.modal.dialog=function(i,n){
var o=t.modal(t.$(t.modal.dialog.template).appendTo("body"),n);return o.on("hide.uk.modal",function(){o.persist&&(o.persist.appendTo(o.persist.data("modalPersistParent")),o.persist=!1),o.element.remove()}),e(i,o),o},t.modal.dialog.template='<div class="uk-modal"><div class="uk-modal-dialog" style="min-height:0;"></div></div>',t.modal.alert=function(e,i){i=t.$.extend(!0,{bgclose:!1,keyboard:!1,modal:!1,labels:t.modal.labels},i);var n=t.modal.dialog(['<div class="uk-margin uk-modal-content">'+String(e)+"</div>",'<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-button-primary uk-modal-close">'+i.labels.Ok+"</button></div>"].join(""),i);n.on("show.uk.modal",function(){setTimeout(function(){n.element.find("button:first").focus()},50)}),n.show()},t.modal.confirm=function(e,i,n){i=t.$.isFunction(i)?i:function(){},n=t.$.extend(!0,{bgclose:!1,keyboard:!1,modal:!1,labels:t.modal.labels},n);var o=t.modal.dialog(['<div class="uk-margin uk-modal-content">'+String(e)+"</div>",'<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-button-primary js-modal-confirm">'+n.labels.Ok+'</button> <button class="uk-button uk-modal-close">'+n.labels.Cancel+"</button></div>"].join(""),n);o.element.find(".js-modal-confirm").on("click",function(){i(),o.hide()}),o.on("show.uk.modal",function(){setTimeout(function(){o.element.find("button:first").focus()},50)}),o.show()},t.modal.prompt=function(e,i,n,o){n=t.$.isFunction(n)?n:function(t){},o=t.$.extend(!0,{bgclose:!1,keyboard:!1,modal:!1,labels:t.modal.labels},o);var s=t.modal.dialog([e?'<div class="uk-modal-content uk-form">'+String(e)+"</div>":"",'<div class="uk-margin-small-top uk-modal-content uk-form"><p><input type="text" class="uk-width-1-1"></p></div>','<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-button-primary js-modal-ok">'+o.labels.Ok+'</button> <button class="uk-button uk-modal-close">'+o.labels.Cancel+"</button></div>"].join(""),o),a=s.element.find("input[type='text']").val(i||"").on("keyup",function(t){13==t.keyCode&&s.element.find(".js-modal-ok").trigger("click")});s.element.find(".js-modal-ok").on("click",function(){n(a.val())!==!1&&s.hide()}),s.on("show.uk.modal",function(){setTimeout(function(){a.focus()},50)}),s.show()},t.modal.blockUI=function(e,i){var n=t.modal.dialog(['<div class="uk-margin uk-modal-content">'+String(e||'<div class="uk-text-center">...</div>')+"</div>"].join(""),t.$.extend({bgclose:!1,keyboard:!1,modal:!1},i));return n.content=n.element.find(".uk-modal-content:first"),n.show(),n},t.modal.labels={Ok:"Ok",Cancel:"Cancel"}}(UIkit),function(t){"use strict";function e(e){var i=t.$(e),n="auto";if(i.is(":visible"))n=i.outerHeight();else{var o={position:i.css("position"),visibility:i.css("visibility"),display:i.css("display")};n=i.css({position:"absolute",visibility:"hidden",display:"block"}).outerHeight(),i.css(o)}return n}t.component("nav",{defaults:{toggle:">li.uk-parent > a[href='#']",lists:">li.uk-parent > ul",multiple:!1},boot:function(){t.ready(function(e){t.$("[data-uk-nav]",e).each(function(){var e=t.$(this);if(!e.data("nav")){t.nav(e,t.Utils.options(e.attr("data-uk-nav")))}})})},init:function(){var e=this;this.on("click.uikit.nav",this.options.toggle,function(i){i.preventDefault();var n=t.$(this);e.open(n.parent()[0]==e.element[0]?n:n.parent("li"))}),this.find(this.options.lists).each(function(){var i=t.$(this),n=i.parent(),o=n.hasClass("uk-active");i.wrap('<div style="overflow:hidden;height:0;position:relative;"></div>'),n.data("list-container",i.parent()[o?"removeClass":"addClass"]("uk-hidden")),n.attr("aria-expanded",n.hasClass("uk-open")),o&&e.open(n,!0)})},open:function(i,n){var o=this,s=this.element,a=t.$(i),r=a.data("list-container");this.options.multiple||s.children(".uk-open").not(i).each(function(){var e=t.$(this);e.data("list-container")&&e.data("list-container").stop().animate({height:0},function(){t.$(this).parent().removeClass("uk-open").end().addClass("uk-hidden")})}),a.toggleClass("uk-open"),a.attr("aria-expanded",a.hasClass("uk-open")),r&&(a.hasClass("uk-open")&&r.removeClass("uk-hidden"),n?(r.stop().height(a.hasClass("uk-open")?"auto":0),a.hasClass("uk-open")||r.addClass("uk-hidden"),this.trigger("display.uk.check")):r.stop().animate({height:a.hasClass("uk-open")?e(r.find("ul:first")):0},function(){a.hasClass("uk-open")?r.css("height",""):r.addClass("uk-hidden"),o.trigger("display.uk.check")}))}})}(UIkit),function(t){"use strict";var e={x:window.scrollX,y:window.scrollY},i=(t.$win,t.$doc,t.$html),n={show:function(n){if(n=t.$(n),n.length){var o=t.$("body"),s=n.find(".uk-offcanvas-bar:first"),a="right"==t.langdirection,r=s.hasClass("uk-offcanvas-bar-flip")?-1:1,l=r*(a?-1:1);e={x:window.pageXOffset,y:window.pageYOffset},n.addClass("uk-active"),o.css({width:window.innerWidth,height:window.innerHeight}).addClass("uk-offcanvas-page"),o.css(a?"margin-right":"margin-left",(a?-1:1)*s.outerWidth()*l).width(),i.css("margin-top",-1*e.y),s.addClass("uk-offcanvas-bar-show"),this._initElement(n),s.trigger("show.uk.offcanvas",[n,s]),n.attr("aria-hidden","false")}},hide:function(n){var o=t.$("body"),s=t.$(".uk-offcanvas.uk-active"),a="right"==t.langdirection,r=s.find(".uk-offcanvas-bar:first"),l=function(){o.removeClass("uk-offcanvas-page").css({width:"",height:"","margin-left":"","margin-right":""}),s.removeClass("uk-active"),r.removeClass("uk-offcanvas-bar-show"),i.css("margin-top",""),window.scrollTo(e.x,e.y),r.trigger("hide.uk.offcanvas",[s,r]),s.attr("aria-hidden","true")};s.length&&(t.support.transition&&!n?(o.one(t.support.transition.end,function(){l()}).css(a?"margin-right":"margin-left",""),setTimeout(function(){r.removeClass("uk-offcanvas-bar-show")},0)):l())},_initElement:function(e){e.data("OffcanvasInit")||(e.on("click.uk.offcanvas swipeRight.uk.offcanvas swipeLeft.uk.offcanvas",function(e){var i=t.$(e.target);if(!e.type.match(/swipe/)&&!i.hasClass("uk-offcanvas-close")){if(i.hasClass("uk-offcanvas-bar"))return;if(i.parents(".uk-offcanvas-bar:first").length)return}e.stopImmediatePropagation(),n.hide()}),e.on("click","a[href^='#']",function(e){var i=t.$(this),o=i.attr("href");"#"!=o&&(t.$doc.one("hide.uk.offcanvas",function(){var e;try{e=t.$(o)}catch(n){e=""}e.length||(e=t.$('[name="'+o.replace("#","")+'"]')),e.length&&i.attr("data-uk-smooth-scroll")&&t.Utils.scrollToElement?t.Utils.scrollToElement(e,t.Utils.options(i.attr("data-uk-smooth-scroll")||"{}")):window.location.href=o}),n.hide())}),e.data("OffcanvasInit",!0))}};t.component("offcanvasTrigger",{boot:function(){i.on("click.offcanvas.uikit","[data-uk-offcanvas]",function(e){e.preventDefault();var i=t.$(this);if(!i.data("offcanvasTrigger")){{t.offcanvasTrigger(i,t.Utils.options(i.attr("data-uk-offcanvas")))}i.trigger("click")}}),i.on("keydown.uk.offcanvas",function(t){27===t.keyCode&&n.hide()})},init:function(){var e=this;this.options=t.$.extend({target:e.element.is("a")?e.element.attr("href"):!1},this.options),this.on("click",function(t){t.preventDefault(),n.show(e.options.target)})}}),t.offcanvas=n}(UIkit),function(t){"use strict";function e(e,i,n){var o,s=t.$.Deferred(),a=e,r=e;return n[0]===i[0]?(s.resolve(),s.promise()):("object"==typeof e&&(a=e[0],r=e[1]||e[0]),o=function(){i&&i.hide().removeClass("uk-active "+r+" uk-animation-reverse"),n.addClass(a).one(t.support.animation.end,function(){n.removeClass(""+a).css({opacity:"",display:""}),s.resolve(),i&&i.css({opacity:"",display:""})}.bind(this)).show()},n.css("animation-duration",this.options.duration+"ms"),i&&i.length?(i.css("animation-duration",this.options.duration+"ms"),i.css("display","none").addClass(r+" uk-animation-reverse").one(t.support.animation.end,function(){o()}.bind(this)).css("display","")):(n.addClass("uk-active"),o()),s.promise())}var i;t.component("switcher",{defaults:{connect:!1,toggle:">*",active:0,animation:!1,duration:200},animating:!1,boot:function(){t.ready(function(e){t.$("[data-uk-switcher]",e).each(function(){var e=t.$(this);if(!e.data("switcher")){t.switcher(e,t.Utils.options(e.attr("data-uk-switcher")))}})})},init:function(){var e=this;if(this.on("click.uikit.switcher",this.options.toggle,function(t){t.preventDefault(),e.show(this)}),this.options.connect){this.connect=t.$(this.options.connect),this.connect.find(".uk-active").removeClass(".uk-active"),this.connect.length&&(this.connect.children().attr("aria-hidden","true"),this.connect.on("click","[data-uk-switcher-item]",function(i){i.preventDefault();var n=t.$(this).attr("data-uk-switcher-item");if(e.index!=n)switch(n){case"next":case"previous":e.show(e.index+("next"==n?1:-1));break;default:e.show(parseInt(n,10))}}).on("swipeRight swipeLeft",function(t){t.preventDefault(),window.getSelection().toString()||e.show(e.index+("swipeLeft"==t.type?1:-1))}));var i=this.find(this.options.toggle),n=i.filter(".uk-active");if(n.length)this.show(n,!1);else{if(this.options.active===!1)return;n=i.eq(this.options.active),this.show(n.length?n:i.eq(0),!1)}i.not(n).attr("aria-expanded","false"),n.attr("aria-expanded","true"),this.on("changed.uk.dom",function(){e.connect=t.$(e.options.connect)})}},show:function(n,o){if(!this.animating){if(isNaN(n))n=t.$(n);else{var s=this.find(this.options.toggle);n=0>n?s.length-1:n,n=s.eq(s[n]?n:0)}var a=this,s=this.find(this.options.toggle),r=t.$(n),l=i[this.options.animation]||function(t,n){if(!a.options.animation)return i.none.apply(a);var o=a.options.animation.split(",");return 1==o.length&&(o[1]=o[0]),o[0]=o[0].trim(),o[1]=o[1].trim(),e.apply(a,[o,t,n])};o!==!1&&t.support.animation||(l=i.none),r.hasClass("uk-disabled")||(s.attr("aria-expanded","false"),r.attr("aria-expanded","true"),s.filter(".uk-active").removeClass("uk-active"),r.addClass("uk-active"),this.options.connect&&this.connect.length&&(this.index=this.find(this.options.toggle).index(r),-1==this.index&&(this.index=0),this.connect.each(function(){var e=t.$(this),i=t.$(e.children()),n=t.$(i.filter(".uk-active")),o=t.$(i.eq(a.index));a.animating=!0,l.apply(a,[n,o]).then(function(){n.removeClass("uk-active"),o.addClass("uk-active"),n.attr("aria-hidden","true"),o.attr("aria-hidden","false"),t.Utils.checkDisplay(o,!0),a.animating=!1})})),this.trigger("show.uk.switcher",[r]))}}}),i={none:function(){var e=t.$.Deferred();return e.resolve(),e.promise()},fade:function(t,i){return e.apply(this,["uk-animation-fade",t,i])},"slide-bottom":function(t,i){return e.apply(this,["uk-animation-slide-bottom",t,i])},"slide-top":function(t,i){return e.apply(this,["uk-animation-slide-top",t,i])},"slide-vertical":function(t,i,n){var o=["uk-animation-slide-top","uk-animation-slide-bottom"];return t&&t.index()>i.index()&&o.reverse(),e.apply(this,[o,t,i])},"slide-left":function(t,i){return e.apply(this,["uk-animation-slide-left",t,i])},"slide-right":function(t,i){return e.apply(this,["uk-animation-slide-right",t,i])},"slide-horizontal":function(t,i,n){var o=["uk-animation-slide-right","uk-animation-slide-left"];return t&&t.index()>i.index()&&o.reverse(),e.apply(this,[o,t,i])},scale:function(t,i){return e.apply(this,["uk-animation-scale-up",t,i])}},t.switcher.animations=i}(UIkit),function(t){"use strict";t.component("tab",{defaults:{target:">li:not(.uk-tab-responsive, .uk-disabled)",connect:!1,active:0,animation:!1,duration:200},boot:function(){t.ready(function(e){t.$("[data-uk-tab]",e).each(function(){var e=t.$(this);if(!e.data("tab")){t.tab(e,t.Utils.options(e.attr("data-uk-tab")))}})})},init:function(){var e=this;this.current=!1,this.on("click.uikit.tab",this.options.target,function(i){if(i.preventDefault(),!e.switcher||!e.switcher.animating){var n=e.find(e.options.target).not(this);n.removeClass("uk-active").blur(),e.trigger("change.uk.tab",[t.$(this).addClass("uk-active"),e.current]),e.current=t.$(this),e.options.connect||(n.attr("aria-expanded","false"),t.$(this).attr("aria-expanded","true"))}}),this.options.connect&&(this.connect=t.$(this.options.connect)),this.responsivetab=t.$('<li class="uk-tab-responsive uk-active"><a></a></li>').append('<div class="uk-dropdown uk-dropdown-small"><ul class="uk-nav uk-nav-dropdown"></ul><div>'),this.responsivetab.dropdown=this.responsivetab.find(".uk-dropdown"),this.responsivetab.lst=this.responsivetab.dropdown.find("ul"),this.responsivetab.caption=this.responsivetab.find("a:first"),this.element.hasClass("uk-tab-bottom")&&this.responsivetab.dropdown.addClass("uk-dropdown-up"),this.responsivetab.lst.on("click.uikit.tab","a",function(i){i.preventDefault(),i.stopPropagation();var n=t.$(this);e.element.children("li:not(.uk-tab-responsive)").eq(n.data("index")).trigger("click")}),this.on("show.uk.switcher change.uk.tab",function(t,i){e.responsivetab.caption.html(i.text())}),this.element.append(this.responsivetab),this.options.connect&&(this.switcher=t.switcher(this.element,{toggle:">li:not(.uk-tab-responsive)",connect:this.options.connect,active:this.options.active,animation:this.options.animation,duration:this.options.duration})),t.dropdown(this.responsivetab,{mode:"click"}),e.trigger("change.uk.tab",[this.element.find(this.options.target).not(".uk-tab-responsive").filter(".uk-active")]),this.check(),t.$win.on("resize orientationchange",t.Utils.debounce(function(){e.element.is(":visible")&&e.check()},100)),this.on("display.uk.check",function(){e.element.is(":visible")&&e.check()})},check:function(){var e=this.element.children("li:not(.uk-tab-responsive)").removeClass("uk-hidden");if(!e.length)return void this.responsivetab.addClass("uk-hidden");var i,n,o,s=e.eq(0).offset().top+Math.ceil(e.eq(0).height()/2),a=!1;if(this.responsivetab.lst.empty(),e.each(function(){t.$(this).offset().top>s&&(a=!0)}),a)for(var r=0;r<e.length;r++)i=t.$(e.eq(r)),n=i.find("a"),"none"==i.css("float")||i.attr("uk-dropdown")||(i.hasClass("uk-disabled")||(o=i[0].outerHTML.replace("<a ",'<a data-index="'+r+'" '),this.responsivetab.lst.append(o)),i.addClass("uk-hidden"));this.responsivetab[this.responsivetab.lst.children("li").length?"removeClass":"addClass"]("uk-hidden")}})}(UIkit),function(t){"use strict";t.component("cover",{defaults:{automute:!0},boot:function(){t.ready(function(e){t.$("[data-uk-cover]",e).each(function(){var e=t.$(this);if(!e.data("cover")){t.cover(e,t.Utils.options(e.attr("data-uk-cover")))}})})},init:function(){if(this.parent=this.element.parent(),t.$win.on("load resize orientationchange",t.Utils.debounce(function(){this.check()}.bind(this),100)),this.on("display.uk.check",function(t){this.element.is(":visible")&&this.check()}.bind(this)),this.check(),this.element.is("iframe")&&this.options.automute){var e=this.element.attr("src");this.element.attr("src","").on("load",function(){this.contentWindow.postMessage('{ "event": "command", "func": "mute", "method":"setVolume", "value":0}',"*")}).attr("src",[e,e.indexOf("?")>-1?"&":"?","enablejsapi=1&api=1"].join(""))}},check:function(){this.element.css({width:"",height:""}),this.dimension={w:this.element.width(),h:this.element.height()},this.element.attr("width")&&!isNaN(this.element.attr("width"))&&(this.dimension.w=this.element.attr("width")),this.element.attr("height")&&!isNaN(this.element.attr("height"))&&(this.dimension.h=this.element.attr("height")),this.ratio=this.dimension.w/this.dimension.h;var t,e,i=this.parent.width(),n=this.parent.height();i/this.ratio<n?(t=Math.ceil(n*this.ratio),e=n):(t=i,e=Math.ceil(i/this.ratio)),this.element.css({width:t,height:e})}})}(UIkit),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-accordion",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";function e(e){var i=t.$(e),n="auto";if(i.is(":visible"))n=i.outerHeight();else{var o={position:i.css("position"),visibility:i.css("visibility"),display:i.css("display")};n=i.css({position:"absolute",visibility:"hidden",display:"block"}).outerHeight(),i.css(o)}return n}return t.component("accordion",{defaults:{showfirst:!0,collapse:!0,animate:!0,easing:"swing",duration:300,toggle:".uk-accordion-title",containers:".uk-accordion-content",clsactive:"uk-active"},boot:function(){t.ready(function(e){setTimeout(function(){t.$("[data-uk-accordion]",e).each(function(){var e=t.$(this);e.data("accordion")||t.accordion(e,t.Utils.options(e.attr("data-uk-accordion")))})},0)})},init:function(){var e=this;this.element.on("click.uikit.accordion",this.options.toggle,function(i){i.preventDefault(),e.toggleItem(t.$(this).data("wrapper"),e.options.animate,e.options.collapse)}),this.update(),this.options.showfirst&&this.toggleItem(this.toggle.eq(0).data("wrapper"),!1,!1)},toggleItem:function(i,n,o){var s=this;i.data("toggle").toggleClass(this.options.clsactive);var a=i.data("toggle").hasClass(this.options.clsactive);o&&(this.toggle.not(i.data("toggle")).removeClass(this.options.clsactive),this.content.not(i.data("content")).parent().stop().css("overflow","hidden").animate({height:0},{easing:this.options.easing,duration:n?this.options.duration:0}).attr("aria-expanded","false")),i.stop().css("overflow","hidden"),n?i.animate({height:a?e(i.data("content")):0},{easing:this.options.easing,duration:this.options.duration,complete:function(){a&&(i.css({overflow:"",height:"auto"}),t.Utils.checkDisplay(i.data("content"))),s.trigger("display.uk.check")}}):(i.height(a?"auto":0),a&&(i.css({overflow:""}),t.Utils.checkDisplay(i.data("content"))),this.trigger("display.uk.check")),i.attr("aria-expanded",a),this.element.trigger("toggle.uk.accordion",[a,i.data("toggle"),i.data("content")])},update:function(){var e,i,n,o=this;this.toggle=this.find(this.options.toggle),this.content=this.find(this.options.containers),this.content.each(function(s){e=t.$(this),e.parent().data("wrapper")?i=e.parent():(i=t.$(this).wrap('<div data-wrapper="true" style="overflow:hidden;height:0;position:relative;"></div>').parent(),i.attr("aria-expanded","false")),n=o.toggle.eq(s),i.data("toggle",n),i.data("content",e),n.data("wrapper",i),e.data("wrapper",i)}),this.element.trigger("update.uk.accordion",[this])}}),t.accordion}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-autocomplete",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";var e;return t.component("autocomplete",{defaults:{minLength:3,param:"search",method:"post",delay:300,loadingClass:"uk-loading",flipDropdown:!1,skipClass:"uk-skip",hoverClass:"uk-active",source:null,renderer:null,template:'<ul class="uk-nav uk-nav-autocomplete uk-autocomplete-results">{{~items}}<li data-value="{{$item.value}}"><a>{{$item.value}}</a></li>{{/items}}</ul>'},visible:!1,value:null,selected:null,boot:function(){t.$html.on("focus.autocomplete.uikit","[data-uk-autocomplete]",function(e){var i=t.$(this);if(!i.data("autocomplete")){t.autocomplete(i,t.Utils.options(i.attr("data-uk-autocomplete")))}}),t.$html.on("click.autocomplete.uikit",function(t){e&&t.target!=e.input[0]&&e.hide()})},init:function(){var e=this,i=!1,n=t.Utils.debounce(function(t){return i?i=!1:void e.handle()},this.options.delay);this.dropdown=this.find(".uk-dropdown"),this.template=this.find('script[type="text/autocomplete"]').html(),this.template=t.Utils.template(this.template||this.options.template),this.input=this.find("input:first").attr("autocomplete","off"),this.dropdown.length||(this.dropdown=t.$('<div class="uk-dropdown"></div>').appendTo(this.element)),this.options.flipDropdown&&this.dropdown.addClass("uk-dropdown-flip"),this.dropdown.attr("aria-expanded","false"),this.input.on({keydown:function(t){if(t&&t.which&&!t.shiftKey)switch(t.which){case 13:i=!0,e.selected&&(t.preventDefault(),e.select());break;case 38:t.preventDefault(),e.pick("prev",!0);break;case 40:t.preventDefault(),e.pick("next",!0);break;case 27:case 9:e.hide()}},keyup:n}),this.dropdown.on("click",".uk-autocomplete-results > *",function(){e.select()}),this.dropdown.on("mouseover",".uk-autocomplete-results > *",function(){e.pick(t.$(this))}),this.triggercomplete=n},handle:function(){var t=this,e=this.value;return this.value=this.input.val(),this.value.length<this.options.minLength?this.hide():(this.value!=e&&t.request(),this)},pick:function(e,i){var n=this,o=t.$(this.dropdown.find(".uk-autocomplete-results").children(":not(."+this.options.skipClass+")")),s=!1;if("string"==typeof e||e.hasClass(this.options.skipClass)){if("next"==e||"prev"==e){if(this.selected){var a=o.index(this.selected);s=o.eq("next"==e?a+1<o.length?a+1:0:0>a-1?o.length-1:a-1)}else s=o["next"==e?"first":"last"]();s=t.$(s)}}else s=e;if(s&&s.length&&(this.selected=s,o.removeClass(this.options.hoverClass),this.selected.addClass(this.options.hoverClass),i)){var r=s.position().top,l=n.dropdown.scrollTop(),u=n.dropdown.height();(r>u||0>r)&&n.dropdown.scrollTop(l+r)}},select:function(){if(this.selected){var t=this.selected.data();this.trigger("selectitem.uk.autocomplete",[t,this]),t.value&&this.input.val(t.value).trigger("change"),this.hide()}},show:function(){return this.visible?void 0:(this.visible=!0,this.element.addClass("uk-open"),e&&e!==this&&e.hide(),e=this,this.dropdown.attr("aria-expanded","true"),this)},hide:function(){return this.visible?(this.visible=!1,this.element.removeClass("uk-open"),e===this&&(e=!1),this.dropdown.attr("aria-expanded","false"),this):void 0},request:function(){var e=this,i=function(t){t&&e.render(t),e.element.removeClass(e.options.loadingClass)};if(this.element.addClass(this.options.loadingClass),this.options.source){var n=this.options.source;switch(typeof this.options.source){case"function":this.options.source.apply(this,[i]);break;case"object":if(n.length){var o=[];n.forEach(function(t){t.value&&-1!=t.value.toLowerCase().indexOf(e.value.toLowerCase())&&o.push(t)}),i(o)}break;case"string":var s={};s[this.options.param]=this.value,t.$.ajax({url:this.options.source,data:s,type:this.options.method,dataType:"json"}).done(function(t){i(t||[])});break;default:i(null)}}else this.element.removeClass(e.options.loadingClass)},render:function(t){return this.dropdown.empty(),this.selected=!1,this.options.renderer?this.options.renderer.apply(this,[t]):t&&t.length&&(this.dropdown.append(this.template({items:t})),this.show(),this.trigger("show.uk.autocomplete")),this}}),t.autocomplete}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-datepicker",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";var e,i=!1;return t.component("datepicker",{defaults:{mobile:!1,weekstart:1,i18n:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},format:"DD.MM.YYYY",offsettop:5,maxDate:!1,minDate:!1,pos:"auto",addClass:!1,template:function(e,i){var n,o,s,a="";if(i.maxDate!==!1&&(n=isNaN(i.maxDate)?moment(i.maxDate,i.format):moment().add(i.maxDate,"days")),i.minDate!==!1&&(o=isNaN(i.minDate)?moment(i.minDate,i.format):moment().add(i.minDate-1,"days")),a+='<div class="uk-datepicker-nav uk-clearfix">',a+='<a href="" class="uk-datepicker-previous"></a>',a+='<a href="" class="uk-datepicker-next"></a>',t.formSelect){var r,l,u,c,d=(new Date).getFullYear(),h=[];for(s=0;s<i.i18n.months.length;s++)h.push(s==e.month?'<option value="'+s+'" selected>'+i.i18n.months[s]+"</option>":'<option value="'+s+'">'+i.i18n.months[s]+"</option>");for(r='<span class="uk-form-select">'+i.i18n.months[e.month]+'<select class="update-picker-month">'+h.join("")+"</select></span>",h=[],u=o?o.year():d-50,c=n?n.year():d+20,s=u;c>=s;s++)h.push(s==e.year?'<option value="'+s+'" selected>'+s+"</option>":'<option value="'+s+'">'+s+"</option>");l='<span class="uk-form-select">'+e.year+'<select class="update-picker-year">'+h.join("")+"</select></span>",a+='<div class="uk-datepicker-heading">'+r+" "+l+"</div>"}else a+='<div class="uk-datepicker-heading">'+i.i18n.months[e.month]+" "+e.year+"</div>";for(a+="</div>",a+='<table class="uk-datepicker-table">',a+="<thead>",s=0;s<e.weekdays.length;s++)e.weekdays[s]&&(a+="<th>"+e.weekdays[s]+"</th>");for(a+="</thead>",a+="<tbody>",s=0;s<e.days.length;s++)if(e.days[s]&&e.days[s].length){a+="<tr>";for(var p=0;p<e.days[s].length;p++)if(e.days[s][p]){var f=e.days[s][p],m=[];f.inmonth||m.push("uk-datepicker-table-muted"),f.selected&&m.push("uk-active"),n&&f.day>n&&m.push("uk-datepicker-date-disabled uk-datepicker-table-muted"),o&&o>f.day&&m.push("uk-datepicker-date-disabled uk-datepicker-table-muted"),a+='<td><a href="" class="'+m.join(" ")+'" data-date="'+f.day.format()+'">'+f.day.format("D")+"</a></td>"}a+="</tr>"}return a+="</tbody>",a+="</table>"}},boot:function(){t.$win.on("resize orientationchange",function(){i&&i.hide()}),t.$html.on("focus.datepicker.uikit","[data-uk-datepicker]",function(e){var i=t.$(this);if(!i.data("datepicker")){e.preventDefault();{t.datepicker(i,t.Utils.options(i.attr("data-uk-datepicker")))}i.trigger("focus")}}),t.$html.on("click.datepicker.uikit",function(n){var o=t.$(n.target);!i||o[0]==e[0]||o.data("datepicker")||o.parents(".uk-datepicker:first").length||i.hide()})},init:function(){if(t.support.touch&&!this.options.mobile&&this.element.attr("type","date"),!t.support.touch||"date"!=this.element.attr("type")||this.options.mobile){var n=this;this.current=this.element.val()?moment(this.element.val(),this.options.format):moment(),this.on("click focus",function(){i!==n&&n.pick(this.value?this.value:n.options.minDate?n.options.minDate:"")}).on("change",function(){n.element.val()&&!moment(n.element.val(),n.options.format).isValid()&&n.element.val(moment().format(n.options.format))}),e||(e=t.$('<div class="uk-dropdown uk-datepicker"></div>'),this.options.addClass&&e.addClass(this.options.addClass),e.on("click",".uk-datepicker-next, .uk-datepicker-previous, [data-date]",function(n){n.stopPropagation(),n.preventDefault();var o=t.$(this);return o.hasClass("uk-datepicker-date-disabled")?!1:void(o.is("[data-date]")?(i.element.val(moment(o.data("date")).format(i.options.format)).trigger("change"),e.removeClass("uk-dropdown-shown"),setTimeout(function(){e.removeClass("uk-dropdown-active")},280),i=!1):i.add(1*(o.hasClass("uk-datepicker-next")?1:-1),"months"))}),e.on("change",".update-picker-month, .update-picker-year",function(){var e=t.$(this);i[e.is(".update-picker-year")?"setYear":"setMonth"](Number(e.val()))}),$page_content.append(e))}},pick:function(n){var o=this.element.offset(),s=o.left-parseInt($page_content.css("margin-left")),a=o.top+$page_content.scrollTop()-$page_content.position().top,r={left:s,right:""};this.current=n?moment(n,this.options.format):moment(),this.initdate=this.current.format("YYYY-MM-DD"),this.update(),"right"==t.langdirection&&(r.right=window.innerWidth-(r.left+this.element.outerWidth()),r.left="");var l=a-this.element.outerHeight()+this.element.height()-this.options.offsettop-e.outerHeight(),u=a+this.element.outerHeight()+this.options.offsettop;r.top=u,"top"==this.options.pos?(r.top=l,e.addClass("uk-dropdown-up")):"auto"==this.options.pos&&$page_content.innerHeight()+$page_content.scrollTop()-u-e.outerHeight()<0&&l>=0&&(r.top=l,e.addClass("uk-dropdown-up")),r.minWidth=e.actual("outerWidth"),e.css(r).addClass("uk-dropdown-active uk-dropdown-shown"),this.trigger("show.uk.datepicker"),i=this},add:function(t,e){this.current.add(t,e),this.update()},setMonth:function(t){this.current.month(t),this.update()},setYear:function(t){this.current.year(t),this.update()},update:function(){var t=this.getRows(this.current.year(),this.current.month()),i=this.options.template(t,this.options);e.html(i),this.trigger("update.uk.datepicker")},getRows:function(t,e){var i=this.options,n=moment().format("YYYY-MM-DD"),o=[31,t%4===0&&t%100!==0||t%400===0?29:28,31,30,31,30,31,31,30,31,30,31][e],s=new Date(t,e,1).getDay(),a={month:e,year:t,weekdays:[],days:[]},r=[];a.weekdays=function(){for(var t=0,e=[];7>t;t++){for(var n=t+(i.weekstart||0);n>=7;)n-=7;e.push(i.i18n.weekdays[n])}return e}(),i.weekstart&&i.weekstart>0&&(s-=i.weekstart,0>s&&(s+=7));for(var l=o+s,u=l;u>7;)u-=7;l+=7-u;for(var c,d,h,p,f,m=0,g=0;l>m;m++)c=new Date(t,e,1+(m-s)),d=i.mindate&&c<i.mindate||i.maxdate&&c>i.maxdate,f=!(s>m||m>=o+s),c=moment(c),h=this.initdate==c.format("YYYY-MM-DD"),p=n==c.format("YYYY-MM-DD"),r.push({selected:h,today:p,disabled:d,day:c,inmonth:f}),7===++g&&(a.days.push(r),r=[],g=0);return a},hide:function(){i&&i===this&&(e.removeClass("uk-dropdown-shown"),setTimeout(function(){e.removeClass("uk-dropdown-active uk-dropdown-up")},280),i=!1,this.trigger("hide.uk.datepicker"))}}),t.Utils.moment=moment(),t.datepicker}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-form-password",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";return t.component("formPassword",{defaults:{lblShow:"Show",lblHide:"Hide"},boot:function(){t.$html.on("click.formpassword.uikit","[data-uk-form-password]",function(e){var i=t.$(this);if(!i.data("formPassword")){e.preventDefault();{t.formPassword(i,t.Utils.options(i.attr("data-uk-form-password")))}i.trigger("click")}})},init:function(){var t=this;this.on("click",function(e){if(e.preventDefault(),t.input.length){var i=t.input.attr("type");t.input.attr("type","text"==i?"password":"text"),t.element.text(t.options["text"==i?"lblShow":"lblHide"])}}),this.input=this.element.next("input").length?this.element.next("input"):this.element.prev("input"),this.element.text(this.options[this.input.is("[type='password']")?"lblShow":"lblHide"]),this.element.data("formPassword",this)}}),t.formPassword}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-form-select",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";return t.component("formSelect",{defaults:{target:">span:first",activeClass:"uk-active"},boot:function(){t.ready(function(e){t.$("[data-uk-form-select]",e).each(function(){var e=t.$(this);if(!e.data("formSelect")){t.formSelect(e,t.Utils.options(e.attr("data-uk-form-select")))}})})},init:function(){var t=this;this.target=this.find(this.options.target),this.select=this.find("select"),this.select.on("change",function(){var e=t.select[0],i=function(){try{t.target.text(e.options[e.selectedIndex].text)}catch(n){}return t.element[t.select.val()?"addClass":"removeClass"](t.options.activeClass),i};return i()}()),this.element.data("formSelect",this)}}),t.formSelect}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-grid",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";function e(t){return i(t)}t.component("grid",{defaults:{colwidth:"auto",animation:!0,duration:300,gutter:0,controls:!1,filter:!1},boot:function(){t.ready(function(e){t.$("[data-uk-grid]",e).each(function(){var e=t.$(this);if(!e.data("grid")){t.grid(e,t.Utils.options(e.attr("data-uk-grid")))}})})},init:function(){var e=this,i=String(this.options.gutter).trim().split(" ");this.gutterv=parseInt(i[0],10),this.gutterh=parseInt(i[1]||i[0],10),this.element.css({position:"relative"}),this.controls=null,this.options.controls&&(this.controls=t.$(this.options.controls),this.controls.on("click","[data-uk-filter]",function(i){i.preventDefault(),e.filter(t.$(this).data("ukFilter"))}),this.controls.on("click","[data-uk-sort]",function(i){i.preventDefault();var n=t.$(this).attr("data-uk-sort").split(":");e.sort(n[0],n[1])})),t.$win.on("load resize orientationchange",t.Utils.debounce(function(){e.currentfilter?e.filter(e.currentfilter):this.updateLayout()}.bind(this),100)),this.on("display.uk.check",function(){e.element.is(":visible")&&e.updateLayout()}),t.$html.on("changed.uk.dom",function(t){e.updateLayout()}),this.options.filter!==!1?this.filter(this.options.filter):this.updateLayout()},_prepareElements:function(){var t,e=this.element.children(":not([data-grid-prepared])");e.length&&(t={position:"absolute","box-sizing":"border-box",width:"auto"==this.options.colwidth?"":this.options.colwidth},this.options.gutter&&(t["padding-left"]=this.gutterh,t["padding-bottom"]=this.gutterv,this.element.css("margin-left",-1*this.gutterh)),e.attr("data-grid-prepared","true").css(t))},updateLayout:function(i){this._prepareElements(),
i=i||this.element.children(":visible");var n,o,s,a,r,l,u,c,d=i,h=this.element.width()+2*this.gutterh+2,p=0,f=0,m=[];this.trigger("beforeupdate.uk.grid",[d]),d.each(function(i){for(c=e(this),n=t.$(this),o=c.outerWidth,s=c.outerHeight,p=0,f=0,r=0,u=m.length;u>r;r++)a=m[r],p<=a.aX&&(p=a.aX),p+o>h&&(p=0),f<=a.aY&&(f=a.aY);m.push({ele:n,top:f,left:p,width:o,height:s,aY:f+s,aX:p+o})});var g,v=0;for(r=0,u=m.length;u>r;r++){for(a=m[r],f=0,l=0;r>l;l++)g=m[l],a.left<g.aX&&g.left+1<a.aX&&(f=g.aY);a.top=f,a.aY=f+a.height,v=Math.max(v,a.aY)}v-=this.gutterv,this.options.animation?(this.element.stop().animate({height:v},100),m.forEach(function(t){t.ele.stop().animate({top:t.top,left:t.left,opacity:1},this.options.duration)}.bind(this))):(this.element.css("height",v),m.forEach(function(t){t.ele.css({top:t.top,left:t.left,opacity:1})}.bind(this))),setTimeout(function(){t.$doc.trigger("scrolling.uk.document")},2*this.options.duration*(this.options.animation?1:0)),this.trigger("afterupdate.uk.grid",[d])},filter:function(e){this.currentfilter=e,e=e||[],"string"==typeof e&&(e=e.split(/,/).map(function(t){return t.trim()}));var i=this,n=this.element.children(),o={visible:[],hidden:[]};n.each(function(i){var n=t.$(this),s=n.attr("data-uk-filter"),a=e.length?!1:!0;s&&(s=s.split(/,/).map(function(t){return t.trim()}),e.forEach(function(t){s.indexOf(t)>-1&&(a=!0)})),o[a?"visible":"hidden"].push(n)}),o.hidden=t.$(o.hidden).map(function(){return this[0]}),o.visible=t.$(o.visible).map(function(){return this[0]}),o.hidden.attr("aria-hidden","true").filter(":visible").fadeOut(this.options.duration),o.visible.attr("aria-hidden","false").filter(":hidden").css("opacity",0).show(),i.updateLayout(o.visible),this.controls&&this.controls.length&&this.controls.find("[data-uk-filter]").removeClass("uk-active").filter('[data-uk-filter="'+e+'"]').addClass("uk-active")},sort:function(e,i){i=i||1,"string"==typeof i&&(i="desc"==i.toLowerCase()?-1:1);var n=this.element.children();n.sort(function(n,o){return n=t.$(n),o=t.$(o),(o.data(e)||"")<(n.data(e)||"")?i:-1*i}).appendTo(this.element),this.updateLayout(n.filter(":visible")),this.controls&&this.controls.length&&this.controls.find("[data-uk-sort]").removeClass("uk-active").filter('[data-uk-sort="'+e+":"+(-1==i?"desc":"asc")+'"]').addClass("uk-active")}});var i=function(){function t(t){if(t){if("string"==typeof c[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,i=0,n=u.length;n>i;i++)if(e=u[i]+t,"string"==typeof c[e])return e}}function e(t){var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);return i&&e}function i(){}function n(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=h.length;i>e;e++){var n=h[e];t[n]=0}return t}function o(){if(!p){p=!0;var i=window.getComputedStyle;if(a=function(){var t=i?function(t){return i(t,null)}:function(t){return t.currentStyle};return function(e){var i=t(e);return i||d("Style returned "+i+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),i}}(),r=t("boxSizing")){var n=document.createElement("div");n.style.width="200px",n.style.padding="1px 2px 3px 4px",n.style.borderStyle="solid",n.style.borderWidth="1px 2px 3px 4px",n.style[r]="border-box";var o=document.body||document.documentElement;o.appendChild(n);var s=a(n);l=200===e(s.width),o.removeChild(n)}}}function s(t){if(o(),"string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var i=a(t);if("none"===i.display)return n();var s={};s.width=t.offsetWidth,s.height=t.offsetHeight;for(var u=s.isBorderBox=!(!r||!i[r]||"border-box"!==i[r]),c=0,d=h.length;d>c;c++){var p=h[c],f=i[p],m=parseFloat(f);s[p]=isNaN(m)?0:m}var g=s.paddingLeft+s.paddingRight,v=s.paddingTop+s.paddingBottom,k=s.marginLeft+s.marginRight,w=s.marginTop+s.marginBottom,b=s.borderLeftWidth+s.borderRightWidth,y=s.borderTopWidth+s.borderBottomWidth,$=u&&l,C=e(i.width);C!==!1&&(s.width=C+($?0:g+b));var x=e(i.height);return x!==!1&&(s.height=x+($?0:v+y)),s.innerWidth=s.width-(g+b),s.innerHeight=s.height-(v+y),s.outerWidth=s.width+k,s.outerHeight=s.height+w,s}}var a,r,l,u="Webkit Moz ms Ms O".split(" "),c=document.documentElement.style,d="undefined"==typeof console?i:function(t){console.error(t)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],p=!1;return s}()}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-nestable",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";var e,i="ontouchstart"in window,n=t.$html,o=[],s=t.$win,a=i?"touchstart":"mousedown",r=i?"touchmove":"mousemove",l=i?"touchend":"mouseup",u=i?"touchcancel":"mouseup";return t.component("nestable",{defaults:{listBaseClass:"uk-nestable",listClass:"uk-nestable-list",listItemClass:"uk-nestable-item",dragClass:"uk-nestable-dragged",movingClass:"uk-nestable-moving",handleClass:"",collapsedClass:"uk-collapsed",placeholderClass:"uk-nestable-placeholder",noDragClass:"uk-nestable-nodrag",group:!1,maxDepth:10,threshold:20,idlethreshold:10},boot:function(){t.$html.on("mousemove touchmove",function(i){if(e){var n=e.offset().top;n<t.$win.scrollTop()?t.$win.scrollTop(t.$win.scrollTop()-Math.ceil(e.height()/2)):n+e.height()>window.innerHeight+t.$win.scrollTop()&&t.$win.scrollTop(t.$win.scrollTop()+Math.ceil(e.height()/2))}}),t.ready(function(e){t.$("[data-uk-nestable]",e).each(function(){var e=t.$(this);e.data("nestable")||t.nestable(e,t.Utils.options(e.attr("data-uk-nestable")))})})},init:function(){var n=this;Object.keys(this.options).forEach(function(t){-1!=String(t).indexOf("Class")&&(n.options["_"+t]="."+n.options[t])}),this.find(this.options._listItemClass).find(">ul").addClass(this.options.listClass),this.checkEmptyList(),this.reset(),this.element.data("nestable-group",this.options.group||t.Utils.uid("nestable-group")),this.find(this.options._listItemClass).each(function(){n.setParent(t.$(this))}),this.on("click","[data-nestable-action]",function(e){if(!n.dragEl&&(i||0===e.button)){e.preventDefault();var o=t.$(e.currentTarget),s=o.data("nestableAction"),a=o.closest(n.options._listItemClass);"collapse"===s&&n.collapseItem(a),"expand"===s&&n.expandItem(a),"toggle"===s&&n.toggleItem(a)}});var o=function(e){var o=t.$(e.target);e.target!==n.element[0]&&(o.is(n.options._noDragClass)||o.closest(n.options._noDragClass).length||o.is("[data-nestable-action]")||o.closest("[data-nestable-action]").length||(n.options.handleClass&&!o.hasClass(n.options.handleClass)&&n.options.handleClass&&(o=o.closest(n.options._handleClass)),!o.length||n.dragEl||!i&&0!==e.button||i&&1!==e.touches.length||(e.originalEvent&&e.originalEvent.touches&&(e=evt.originalEvent.touches[0]),n.delayMove=function(t){t.preventDefault(),n.dragStart(e),n.trigger("start.uk.nestable",[n]),n.delayMove=!1},n.delayMove.x=parseInt(e.pageX,10),n.delayMove.y=parseInt(e.pageY,10),n.delayMove.threshold=n.options.idlethreshold,e.preventDefault())))},c=function(t){t.originalEvent&&t.originalEvent.touches&&(t=t.originalEvent.touches[0]),n.delayMove&&(Math.abs(t.pageX-n.delayMove.x)>n.delayMove.threshold||Math.abs(t.pageY-n.delayMove.y)>n.delayMove.threshold)&&(window.getSelection().toString()?n.delayMove=!1:n.delayMove(t)),n.dragEl&&(t.preventDefault(),n.dragMove(t),n.trigger("move.uk.nestable",[n]))},d=function(t){n.dragEl&&(t.preventDefault(),n.dragStop(i?t.touches[0]:t)),e=!1,n.delayMove=!1};i?(this.element[0].addEventListener(a,o,!1),window.addEventListener(r,c,!1),window.addEventListener(l,d,!1),window.addEventListener(u,d,!1)):(this.on(a,o),s.on(r,c),s.on(l,d))},serialize:function(){var e,i=0,n=this,o=function(e,i){var s=[],a=e.children(n.options._listItemClass);return a.each(function(){for(var e,a=t.$(this),r={},l=a.children(n.options._listClass),u=0;u<a[0].attributes.length;u++)e=a[0].attributes[u],0===e.name.indexOf("data-")&&(r[e.name.substr(5)]=t.Utils.str2json(e.value));l.length&&(r.children=o(l,i+1)),s.push(r)}),s};return e=o(n.element,i)},list:function(e){var i=[],n=this,o=0,s=function(n,o,a){var r=n.children(e._listItemClass);r.each(function(n){var r=t.$(this),l=t.$.extend({parent_id:a?a:null,depth:o,order:n},r.data()),u=r.children(e._listClass);i.push(l),u.length&&s(u,o+1,r.data(e.idProperty||"id"))})};return e=t.$.extend({},n.options,e),s(n.element,o),i},reset:function(){this.mouse={offsetX:0,offsetY:0,startX:0,startY:0,lastX:0,lastY:0,nowX:0,nowY:0,distX:0,distY:0,dirAx:0,dirX:0,dirY:0,lastDirX:0,lastDirY:0,distAxX:0,distAxY:0},this.moving=!1,this.dragEl=null,this.dragRootEl=null,this.dragDepth=0,this.hasNewRoot=!1,this.pointEl=null;for(var t=0;t<o.length;t++)this.checkEmptyList(o[t]);o=[]},toggleItem:function(t){this[t.hasClass(this.options.collapsedClass)?"expandItem":"collapseItem"](t)},expandItem:function(t){t.removeClass(this.options.collapsedClass)},collapseItem:function(t){var e=t.children(this.options._listClass);e.length&&t.addClass(this.options.collapsedClass)},expandAll:function(){var e=this;this.find(e.options._listItemClass).each(function(){e.expandItem(t.$(this))})},collapseAll:function(){var e=this;this.find(e.options._listItemClass).each(function(){e.collapseItem(t.$(this))})},setParent:function(t){t.children(this.options._listClass).length&&t.addClass("uk-parent")},unsetParent:function(t){t.removeClass("uk-parent "+this.options.collapsedClass),t.children(this.options._listClass).remove()},dragStart:function(i){var o=this.mouse,s=t.$(i.target),a=s.closest(this.options._listItemClass),r=a.offset();this.placeEl=a,o.offsetX=i.pageX-r.left,o.offsetY=i.pageY-r.top,o.startX=o.lastX=r.left,o.startY=o.lastY=r.top,this.dragRootEl=this.element,this.dragEl=t.$("<ul></ul>").addClass(this.options.listClass+" "+this.options.dragClass).append(a.clone()),this.dragEl.css("width",a.width()),this.placeEl.addClass(this.options.placeholderClass),e=this.dragEl,this.tmpDragOnSiblings=[a[0].previousSibling,a[0].nextSibling],t.$body.append(this.dragEl),this.dragEl.css({left:r.left,top:r.top});var l,u,c=this.dragEl.find(this.options._listItemClass);for(l=0;l<c.length;l++)u=t.$(c[l]).parents(this.options._listClass+","+this.options._listBaseClass).length,u>this.dragDepth&&(this.dragDepth=u);n.addClass(this.options.movingClass)},dragStop:function(t){var e=this.placeEl,i=this.placeEl.parents(this.options._listBaseClass+":first");this.placeEl.removeClass(this.options.placeholderClass),this.dragEl.remove(),this.element[0]!==i[0]?(i.trigger("change.uk.nestable",[e,"added",i,i.data("nestable")]),this.element.trigger("change.uk.nestable",[e,"removed",this.element,this])):this.element.trigger("change.uk.nestable",[e,"moved",this.element,this]),this.trigger("stop.uk.nestable",[this,e]),this.reset(),n.removeClass(this.options.movingClass)},dragMove:function(e){var i,n,s,a,r,l=this.options,u=this.mouse,c=this.dragRootEl?this.dragRootEl.data("nestable").options.maxDepth:l.maxDepth;this.dragEl.css({left:e.pageX-u.offsetX,top:e.pageY-u.offsetY}),u.lastX=u.nowX,u.lastY=u.nowY,u.nowX=e.pageX,u.nowY=e.pageY,u.distX=u.nowX-u.lastX,u.distY=u.nowY-u.lastY,u.lastDirX=u.dirX,u.lastDirY=u.dirY,u.dirX=0===u.distX?0:u.distX>0?1:-1,u.dirY=0===u.distY?0:u.distY>0?1:-1;var d=Math.abs(u.distX)>Math.abs(u.distY)?1:0;if(!u.moving)return u.dirAx=d,void(u.moving=!0);u.dirAx!==d?(u.distAxX=0,u.distAxY=0):(u.distAxX+=Math.abs(u.distX),0!==u.dirX&&u.dirX!==u.lastDirX&&(u.distAxX=0),u.distAxY+=Math.abs(u.distY),0!==u.dirY&&u.dirY!==u.lastDirY&&(u.distAxY=0)),u.dirAx=d,u.dirAx&&u.distAxX>=l.threshold&&(u.distAxX=0,s=this.placeEl.prev("li"),u.distX>0&&s.length&&!s.hasClass(l.collapsedClass)&&(i=s.find(l._listClass).last(),r=this.placeEl.parents(l._listClass+","+l._listBaseClass).length,r+this.dragDepth<=c&&(i.length?(i=s.children(l._listClass).last(),i.append(this.placeEl)):(i=t.$("<ul/>").addClass(l.listClass),i.append(this.placeEl),s.append(i),this.setParent(s)))),u.distX<0&&(a=this.placeEl.next("li"),a.length||(n=this.placeEl.parent(),this.placeEl.closest(l._listItemClass).after(this.placeEl),n.children().length||this.unsetParent(n.parent()))));var h=!1,p=this.dragEl.offset().left-(window.pageXOffset||document.scrollLeft||0),f=e.pageY-(window.pageYOffset||document.documentElement.scrollTop);if(this.pointEl=t.$(document.elementFromPoint(p,f)),l.handleClass&&this.pointEl.hasClass(l.handleClass))this.pointEl=this.pointEl.closest(l._listItemClass);else{var m=this.pointEl.closest(l._listItemClass);m.length&&(this.pointEl=m)}if(!this.placeEl.find(this.pointEl).length){if(this.pointEl.data("nestable")&&!this.pointEl.children().length)h=!0,this.checkEmptyList(this.pointEl);else if(!this.pointEl.length||!this.pointEl.hasClass(l.listItemClass))return;var g=this.element,v=this.pointEl.closest(this.options._listBaseClass),k=g[0]!==this.pointEl.closest(this.options._listBaseClass)[0];if(!u.dirAx||k||h){if(k&&l.group!==v.data("nestable-group"))return;if(o.push(g),r=this.dragDepth-1+this.pointEl.parents(l._listClass+","+l._listBaseClass).length,r>c)return;var w=e.pageY<this.pointEl.offset().top+this.pointEl.height()/2;n=this.placeEl.parent(),h?this.pointEl.append(this.placeEl):w?this.pointEl.before(this.placeEl):this.pointEl.after(this.placeEl),n.children().length||n.data("nestable")||this.unsetParent(n.parent()),this.checkEmptyList(this.dragRootEl),this.checkEmptyList(g),k&&(this.dragRootEl=v,this.hasNewRoot=this.element[0]!==this.dragRootEl[0])}}},checkEmptyList:function(e){e=e?t.$(e):this.element,e.children().length||e.html("")}}),t.nestable}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-notify",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";var e={},i={},n=function(e){return"string"==t.$.type(e)&&(e={message:e}),arguments[1]&&(e=t.$.extend(e,"string"==t.$.type(arguments[1])?{status:arguments[1]}:arguments[1])),new s(e).show()},o=function(t,e){var n;if(t)for(n in i)t===i[n].group&&i[n].close(e);else for(n in i)i[n].close(e)},s=function(n){this.options=t.$.extend({},s.defaults,n),this.uuid=t.Utils.uid("notifymsg"),this.element=t.$(['<div class="uk-notify-message">','<a class="uk-close"></a>',"<div></div>","</div>"].join("")).data("notifyMessage",this),this.content(this.options.message),this.options.status&&(this.element.addClass("uk-notify-message-"+this.options.status),this.currentstatus=this.options.status),this.group=this.options.group,i[this.uuid]=this,e[this.options.pos]||(e[this.options.pos]=t.$('<div class="uk-notify uk-notify-'+this.options.pos+'"></div>').appendTo("body").on("click",".uk-notify-message",function(){var e=t.$(this).data("notifyMessage");e.element.trigger("manualclose.uk.notify",[e]),e.close()}))};return t.$.extend(s.prototype,{uuid:!1,element:!1,timout:!1,currentstatus:"",group:!1,show:function(){if(!this.element.is(":visible")){var t=this;e[this.options.pos].show().prepend(this.element);var i=parseInt(this.element.css("margin-bottom"),10);return this.element.css({opacity:0,"margin-top":-1*this.element.outerHeight(),"margin-bottom":0}).animate({opacity:1,"margin-top":0,"margin-bottom":i},function(){if(t.options.timeout){var e=function(){t.close()};t.timeout=setTimeout(e,t.options.timeout),t.element.hover(function(){clearTimeout(t.timeout)},function(){t.timeout=setTimeout(e,t.options.timeout)})}}),this}},close:function(t){var n=this,o=function(){n.element.remove(),e[n.options.pos].children().length||e[n.options.pos].hide(),n.options.onClose.apply(n,[]),n.element.trigger("close.uk.notify",[n]),delete i[n.uuid]};this.timeout&&clearTimeout(this.timeout),t?o():this.element.animate({opacity:0,"margin-top":-1*this.element.outerHeight(),"margin-bottom":0},function(){o()})},content:function(t){var e=this.element.find(">div");return t?(e.html(t),this):e.html()},status:function(t){return t?(this.element.removeClass("uk-notify-message-"+this.currentstatus).addClass("uk-notify-message-"+t),this.currentstatus=t,this):this.currentstatus}}),s.defaults={message:"",status:"",timeout:5e3,group:null,pos:"top-center",onClose:function(){}},t.notify=n,t.notify.message=s,t.notify.closeAll=o,n}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-sortable",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";function e(e){e=t.$(e);do{if(e.data("sortable"))return e;e=t.$(e).parent()}while(e.length);return e}function i(t,e){var i=t.parentNode;if(e.parentNode!=i)return!1;for(var n=t.previousSibling;n&&9!==n.nodeType;){if(n===e)return!0;n=n.previousSibling}return!1}function n(t,e){var i=e;if(i==t)return null;for(;i;){if(i.parentNode===t)return i;if(i=i.parentNode,!i||!i.ownerDocument||11===i.nodeType)break}return null}function o(t){t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault(),t.returnValue=!1}var s,a,r,l,u,c,d,h,p,f="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch;return t.component("sortable",{defaults:{animation:150,threshold:10,childClass:"uk-sortable-item",placeholderClass:"uk-sortable-placeholder",overClass:"uk-sortable-over",draggingClass:"uk-sortable-dragged",dragMovingClass:"uk-sortable-moving",baseClass:"uk-sortable",noDragClass:"uk-sortable-nodrag",dragCustomClass:"",handleClass:!1,group:!1,stop:function(){},start:function(){},change:function(){}},boot:function(){t.ready(function(e){t.$("[data-uk-sortable]",e).each(function(){var e=t.$(this);if(!e.data("sortable")){t.sortable(e,t.Utils.options(e.attr("data-uk-sortable")))}})}),t.$html.on("mousemove touchmove",function(e){if(d){var i=e.originalEvent.targetTouches?e.originalEvent.targetTouches[0]:e;(Math.abs(i.pageX-d.pos.x)>d.threshold||Math.abs(i.pageY-d.pos.y)>d.threshold)&&d.apply(i)}if(s){u||(u=!0,s.show(),s.$current.addClass(s.$sortable.options.placeholderClass),s.$sortable.element.children().addClass(s.$sortable.options.childClass),t.$html.addClass(s.$sortable.options.dragMovingClass));var n=s.data("mouse-offset"),o=parseInt(e.originalEvent.pageX,10)+n.left,a=parseInt(e.originalEvent.pageY,10)+n.top;s.css({left:o,top:a}),a<t.$win.scrollTop()?t.$win.scrollTop(t.$win.scrollTop()-Math.ceil(s.height()/2)):a+s.height()>window.innerHeight+t.$win.scrollTop()&&t.$win.scrollTop(t.$win.scrollTop()+Math.ceil(s.height()/2))}}),t.$html.on("mouseup touchend",function(t){if(d=c=!1,!a||!s)return void(a=s=null);var i=e(t.target),n=s.$sortable,o={type:t.type};i[0]&&n.dragDrop(o,n.element),n.dragEnd(o,n.element)})},init:function(){function e(){f?c.addEventListener("touchmove",v,!1):(c.addEventListener("mouseover",m,!1),c.addEventListener("mouseout",g,!1))}function i(){f?c.removeEventListener("touchmove",v,!1):(c.removeEventListener("mouseover",m,!1),c.removeEventListener("mouseout",g,!1))}function s(t){a&&u.dragMove(t,u)}function l(e){return function(i){var o,s,a;i&&(o=f&&i.touches&&i.touches[0]||{},s=o.target||i.target,f&&document.elementFromPoint&&(s=document.elementFromPoint(i.pageX-document.body.scrollLeft,i.pageY-document.body.scrollTop))),t.$(s).hasClass(u.options.childClass)?e.apply(s,[i]):s!==c&&(a=n(c,s),a&&e.apply(a,[i]))}}var u=this,c=this.element[0];h=[],0===this.element.children().length&&this.element.html(""),this.element.data("sortable-group",this.options.group?this.options.group:t.Utils.uid("sortable-group"));var d=l(function(e){var i=t.$(e.target),n=i.is("a[href]")?i:i.parents("a[href]");if(!i.is(":input"))return e.preventDefault(),!f&&n.length&&n.one("click",function(t){t.preventDefault()}).one("mouseup",function(){p||n.trigger("click")}),u.dragStart(e,this)}),m=(l(function(t){return a?(t.preventDefault&&t.preventDefault(),!1):!0}),l(t.Utils.debounce(function(t){return u.dragEnter(t,this)}),40)),g=l(function(e){var i=u.dragenterData(this);u.dragenterData(this,i-1),u.dragenterData(this)||(t.$(this).removeClass(u.options.overClass),u.dragenterData(this,!1))}),v=l(function(t){return a&&a!==this&&r!==this?(u.element.children().removeClass(u.options.overClass),r=this,u.moveElementNextTo(a,this),o(t)):!0});this.addDragHandlers=e,this.removeDragHandlers=i,window.addEventListener(f?"touchmove":"mousemove",s,!1),c.addEventListener(f?"touchstart":"mousedown",d,!1)},dragStart:function(e,i){p=!1,u=!1,l=!1;{var n=this,o=t.$(e.target);n.element.children()}if(f||2!=e.button){if(n.options.handleClass){var r=o.hasClass(n.options.handleClass)?o:o.closest("."+n.options.handleClass,n.element);if(!r.length)return}if(!o.is("."+n.options.noDragClass)&&!o.closest("."+n.options._noDragClass).length&&!o.is(":input")){a=i,s&&s.remove();var c=t.$(a),h=c.offset();d={pos:{x:e.pageX,y:e.pageY},threshold:n.options.threshold,apply:function(e){s=t.$('<div class="'+[n.options.draggingClass,n.options.dragCustomClass].join(" ")+'"></div>').css({display:"none",top:h.top,left:h.left,width:c.width(),height:c.height(),padding:c.css("padding")}).data({"mouse-offset":{left:h.left-parseInt(e.pageX,10),top:h.top-parseInt(e.pageY,10)},origin:n.element,index:c.index()}).append(c.html()).appendTo("body"),s.$current=c,s.$sortable=n,c.data("sortable-group",n.options.group),n.addDragHandlers(),n.options.start(this,a),n.trigger("start.uk.sortable",[n,a]),p=!0,d=!1}}}}},dragMove:function(e,i){var n,o=t.$(document.elementFromPoint(e.pageX-document.body.scrollLeft,e.pageY-(window.pageYOffset||document.documentElement.scrollTop))),s=o.closest("."+this.options.baseClass),r=s.data("sortable-group"),l=t.$(a),u=l.parent(),c=l.data("sortable-group");s[0]!==u[0]&&void 0!==c&&r===c&&(s.data("sortable").addDragHandlers(),h.push(s),s.children().addClass(this.options.childClass),s.children().length>0?(n=o.closest("."+this.options.childClass),n.before(l)):o.append(l),0===u.children().length&&u.html(""),UIkit.$doc.trigger("mouseover"))},dragEnter:function(e,i){if(!a||a===i)return!0;var n=this.dragenterData(i);return this.dragenterData(i,n+1),0===n&&(t.$(i).addClass(this.options.overClass),this.moveElementNextTo(a,i)),!1},dragEnd:function(e,i){var n=this;a&&(this.options.stop(i),this.trigger("stop.uk.sortable",[this])),a=null,r=null,h.push(this.element),h.forEach(function(e,i){t.$(e).children().each(function(){1===this.nodeType&&(t.$(this).removeClass(n.options.overClass).removeClass(n.options.placeholderClass).removeClass(n.options.childClass),n.dragenterData(this,!1))})}),h=[],t.$html.removeClass(this.options.dragMovingClass),this.removeDragHandlers(),s&&(s.remove(),s=null)},dragDrop:function(t,e){"drop"===t.type&&(t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault()),this.triggerChangeEvents()},triggerChangeEvents:function(){if(a){var e=t.$(a),i=s.data("origin"),n=e.closest("."+this.options.baseClass),o=[];i[0]===n[0]&&s.data("index")!=e.index()?o.push({el:this,mode:"moved"}):i[0]!=n[0]&&o.push({el:n,mode:"added"},{el:i,mode:"removed"}),o.forEach(function(t,e){t.el.trigger("change.uk.sortable",[t.el,a,t.mode])})}},dragenterData:function(e,i){return e=t.$(e),1==arguments.length?parseInt(e.data("child-dragenter"),10)||0:void(i?e.data("child-dragenter",Math.max(0,i)):e.removeData("child-dragenter"))},moveElementNextTo:function(e,n){l=!0;var o=this,s=t.$(e).parent().css("min-height",""),a=i(e,n)?n:n.nextSibling,r=s.children(),u=r.length;return o.options.animation?(s.css("min-height",s.height()),r.stop().each(function(){var e=t.$(this),i=e.position();i.width=e.width(),e.data("offset-before",i)}),n.parentNode.insertBefore(e,a),t.Utils.checkDisplay(o.element.parent()),r=s.children().each(function(){var e=t.$(this);e.data("offset-after",e.position())}).each(function(){var e=t.$(this),i=e.data("offset-before");e.css({position:"absolute",top:i.top,left:i.left,"min-width":i.width})}),void r.each(function(){var e=t.$(this),i=(e.data("offset-before"),e.data("offset-after"));e.css("pointer-events","none").width(),setTimeout(function(){e.animate({top:i.top,left:i.left},o.options.animation,function(){e.css({position:"",top:"",left:"","min-width":"","pointer-events":""}).removeClass(o.options.overClass).removeData("child-dragenter"),u--,u||(s.css("min-height",""),t.Utils.checkDisplay(o.element.parent()))})},0)})):(n.parentNode.insertBefore(e,a),void t.Utils.checkDisplay(o.element.parent()))},serialize:function(){var e,i,n=[];return this.element.children().each(function(o,s){e={};for(var a=0;a<s.attributes.length;a++)i=s.attributes[a],0===i.name.indexOf("data-")&&(e[i.name.substr(5)]=t.Utils.str2json(i.value));n.push(e)}),n}}),t.sortable}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-sticky",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";function e(){var e=arguments.length?arguments:o;if(e.length&&!(i.scrollTop()<0))for(var s,a,r,l,u=i.scrollTop(),c=n.height(),d=i.height(),h=c-d,p=u>h?h-u:0,f=0;f<e.length;f++)if(l=e[f],l.element.is(":visible")&&!l.animate){if(l.check()){if(l.options.top<0?s=0:(r=l.element.outerHeight(),s=c-r-l.options.top-l.options.bottom-u-p,s=0>s?s+l.options.top:l.options.top),l.boundary&&l.boundary.length){var m=l.boundary.offset().top;a=l.boundtoparent?c-(m+l.boundary.outerHeight())+parseInt(l.boundary.css("padding-bottom")):c-m-parseInt(l.boundary.css("margin-top")),s=u+r>c-a-(l.options.top<0?0:l.options.top)?c-a-(u+r):s}if(l.currentTop!=s){if(l.element.css({position:"fixed",top:s,width:"undefined"!=typeof l.getWidthFrom?t.$(l.getWidthFrom).width():l.element.width(),left:l.wrapper.offset().left}),!l.init&&(l.element.addClass(l.options.clsinit),location.hash&&u>0&&l.options.target)){var g=t.$(location.hash);g.length&&setTimeout(function(t,e){return function(){e.element.width();var i=t.offset(),n=i.top+t.outerHeight(),o=e.element.offset(),s=e.element.outerHeight(),a=o.top+s;o.top<n&&i.top<a&&(u=i.top-s-e.options.target,window.scrollTo(0,u))}}(g,l),0)}l.element.addClass(l.options.clsactive),l.element.css("margin",""),l.options.animation&&l.init&&l.element.addClass(l.options.animation),l.currentTop=s}}else null!==l.currentTop&&l.reset();l.init=!0}}var i=t.$win,n=t.$doc,o=[];return t.component("sticky",{defaults:{top:0,bottom:0,animation:"",clsinit:"uk-sticky-init",clsactive:"uk-active",getWidthFrom:"",boundary:!1,media:!1,target:!1,disabled:!1},boot:function(){$("#page_content").on("scroll",function(){e()}),t.$win.on("resize orientationchange",t.Utils.debounce(function(){if(o.length){for(var t=0;t<o.length;t++)o[t].reset(!0),o[t].self.computeWrapper();e()}},100)),t.ready(function(i){setTimeout(function(){t.$("[data-uk-sticky]",i).each(function(){var e=t.$(this);e.data("sticky")||t.sticky(e,t.Utils.options(e.attr("data-uk-sticky")))}),e()},0)})},init:function(){var e,s=t.$('<div class="uk-sticky-placeholder"></div>'),a=this.options.boundary;this.wrapper=this.element.css("margin",0).wrap(s).parent(),this.computeWrapper(),a&&(a===!0?(a=this.wrapper.parent(),e=!0):"string"==typeof a&&(a=t.$(a))),this.sticky={self:this,options:this.options,element:this.element,currentTop:null,wrapper:this.wrapper,init:!1,getWidthFrom:this.options.getWidthFrom||this.wrapper,boundary:a,boundtoparent:e,reset:function(e){var i=function(){this.element.css({position:"",top:"",width:"",left:"",margin:"0"}),this.element.removeClass([this.options.animation,"uk-animation-reverse",this.options.clsactive].join(" ")),this.currentTop=null,this.animate=!1}.bind(this);!e&&this.options.animation&&t.support.animation?(this.animate=!0,this.element.removeClass(this.options.animation).one(t.support.animation.end,function(){i()}).width(),this.element.addClass(this.options.animation+" uk-animation-reverse")):i()},check:function(){if(this.options.disabled)return!1;if(this.options.media)switch(typeof this.options.media){case"number":if(window.innerWidth<this.options.media)return!1;break;case"string":if(window.matchMedia&&!window.matchMedia(this.options.media).matches)return!1}var t=i.scrollTop(),e=n.height(),o=e-window.innerHeight,s=t>o?o-t:0,a=this.wrapper.offset().top,r=a-this.options.top-s;return t>=r}},o.push(this.sticky)},update:function(){e(this.sticky)},enable:function(){this.options.disabled=!1,this.update()},disable:function(t){this.options.disabled=!0,this.sticky.reset(t)},computeWrapper:function(){this.wrapper.css({height:"absolute"!=this.element.css("position")?this.element.outerHeight():"","float":"none"!=this.element.css("float")?this.element.css("float"):"",margin:this.element.css("margin")})}}),t.sticky}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-tooltip",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";var e,i,n;return t.component("tooltip",{defaults:{offset:5,pos:"top",animation:!1,delay:0,cls:"",activeClass:"uk-active",src:function(t,e){return e=t.attr("title"),e&&t.data("cached-title",e).removeAttr("title"),t.data("cached-title")}},tip:"",boot:function(){t.$html.on("mouseenter.tooltip.uikit focus.tooltip.uikit","[data-uk-tooltip]",function(e){var i=t.$(this);if(!i.data("tooltip")){{t.tooltip(i,t.Utils.options(i.attr("data-uk-tooltip")))}i.trigger("mouseenter")}})},init:function(){var i=this;e||(e=t.$('<div class="uk-tooltip"></div>').appendTo("body")),this.on({focus:function(t){i.show()},blur:function(t){i.hide()},mouseenter:function(t){i.show()},mouseleave:function(t){i.hide()}})},show:function(){if(this.tip="function"==typeof this.options.src?this.options.src(this.element):this.options.src,i&&clearTimeout(i),n&&clearTimeout(n),this.tip.length){e.stop().css({top:-2e3,visibility:"hidden"}).removeClass(this.options.activeClass).show(),e.html('<div class="uk-tooltip-inner">'+this.tip+"</div>");var o=this,s=t.$.extend({},this.element.offset(),{width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}),a=e[0].offsetWidth,r=e[0].offsetHeight,l="function"==typeof this.options.offset?this.options.offset.call(this.element):this.options.offset,u="function"==typeof this.options.pos?this.options.pos.call(this.element):this.options.pos,c=u.split("-"),d={display:"none",visibility:"visible",top:s.top+s.height+r,left:s.left};if("fixed"==t.$html.css("position")||"fixed"==t.$body.css("position")){var h=t.$("body").offset(),p=t.$("html").offset(),f={top:p.top+h.top,left:p.left+h.left};s.left-=f.left,s.top-=f.top}"left"!=c[0]&&"right"!=c[0]||"right"!=t.langdirection||(c[0]="left"==c[0]?"right":"left");var m={bottom:{top:s.top+s.height+l,left:s.left+s.width/2-a/2},top:{top:s.top-r-l,left:s.left+s.width/2-a/2},left:{top:s.top+s.height/2-r/2,left:s.left-a-l},right:{top:s.top+s.height/2-r/2,left:s.left+s.width+l}};t.$.extend(d,m[c[0]]),2==c.length&&(d.left="left"==c[1]?s.left:s.left+s.width-a);var g=this.checkBoundary(d.left,d.top,a,r);if(g){switch(g){case"x":u=2==c.length?c[0]+"-"+(d.left<0?"left":"right"):d.left<0?"right":"left";break;case"y":u=2==c.length?(d.top<0?"bottom":"top")+"-"+c[1]:d.top<0?"bottom":"top";break;case"xy":u=2==c.length?(d.top<0?"bottom":"top")+"-"+(d.left<0?"left":"right"):d.left<0?"right":"left"}c=u.split("-"),t.$.extend(d,m[c[0]]),2==c.length&&(d.left="left"==c[1]?s.left:s.left+s.width-a)}d.left-=t.$body.position().left,i=setTimeout(function(){e.css(d).attr("class",["uk-tooltip","uk-tooltip-"+u,o.options.cls].join(" ")),o.options.animation?e.css({opacity:0,display:"block"}).addClass(o.options.activeClass).animate({opacity:1},parseInt(o.options.animation,10)||400):e.show().addClass(o.options.activeClass),i=!1,n=setInterval(function(){o.element.is(":visible")||o.hide()},150)},parseInt(this.options.delay,10)||0)}},hide:function(){if(!this.element.is("input")||this.element[0]!==document.activeElement)if(i&&clearTimeout(i),n&&clearTimeout(n),e.stop(),this.options.animation){var t=this;e.fadeOut(parseInt(this.options.animation,10)||400,function(){e.removeClass(t.options.activeClass)})}else e.hide().removeClass(this.options.activeClass)},content:function(){return this.tip},checkBoundary:function(e,i,n,o){var s="";return(0>e||e-t.$win.scrollLeft()+n>window.innerWidth)&&(s+="x"),(0>i||i-t.$win.scrollTop()+o>window.innerHeight)&&(s+="y"),s}}),t.tooltip}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-search",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";

function e(t,e){t=t||0,e=e||24;var i,n,o={"12h":[],"24h":[]};for(i=t,n="";e>i;i++)n=""+i,10>i&&(n="0"+n),o["24h"].push({value:n+":00"}),o["24h"].push({value:n+":30"}),0===i&&(n=12,o["12h"].push({value:n+":00 AM"}),o["12h"].push({value:n+":30 AM"})),i>0&&13>i&&12!==i&&(o["12h"].push({value:n+":00 AM"}),o["12h"].push({value:n+":30 AM"})),i>=12&&(n-=12,0===n&&(n=12),10>n&&(n="0"+String(n)),o["12h"].push({value:n+":00 PM"}),o["12h"].push({value:n+":30 PM"}));return o}t.component("timepicker",{defaults:{format:"24h",delay:0,start:0,end:24},boot:function(){t.$html.on("focus.timepicker.uikit","[data-uk-timepicker]",function(e){var i=t.$(this);if(!i.data("timepicker")){var n=t.timepicker(i,t.Utils.options(i.attr("data-uk-timepicker")));setTimeout(function(){n.autocomplete.input.focus()},40)}})},init:function(){var i,n=this,o=e(this.options.start,this.options.end);this.options.minLength=0,this.options.template='<ul class="uk-nav uk-nav-autocomplete uk-autocomplete-results">{{~items}}<li data-value="{{$item.value}}"><a>{{$item.value}}</a></li>{{/items}}</ul>',this.options.source=function(t){t(o[n.options.format]||o["12h"])},this.element.is("input")?(this.element.wrap('<div class="uk-autocomplete"></div>'),i=this.element.parent()):i=this.element.addClass("uk-autocomplete"),this.autocomplete=t.autocomplete(i,this.options),this.autocomplete.dropdown.addClass("uk-dropdown-small uk-dropdown-scrollable"),this.autocomplete.on("show.uk.autocomplete",function(){var t=n.autocomplete.dropdown.find('[data-value="'+n.autocomplete.input.val()+'"]');setTimeout(function(){n.autocomplete.pick(t,!0)},10)}),this.autocomplete.input.on("focus",function(){n.autocomplete.value=Math.random(),n.autocomplete.triggercomplete()}).on("blur",function(){n.checkTime()}),this.element.data("timepicker",this)},checkTime:function(){var t,e,i,n,o="AM",s=this.autocomplete.input.val();"12h"==this.options.format?(t=s.split(" "),e=t[0].split(":"),o=t[1]):e=s.split(":"),i=parseInt(e[0],10),n=parseInt(e[1],10),isNaN(i)&&(i=0),isNaN(n)&&(n=0),"12h"==this.options.format?(i>12?i=12:0>i&&(i=12),"am"===o||"a"===o?o="AM":("pm"===o||"p"===o)&&(o="PM"),"AM"!==o&&"PM"!==o&&(o="AM")):i>=24?i=23:0>i&&(i=0),0>n?n=0:n>=60&&(n=0),this.autocomplete.input.val(this.formatTime(i,n,o)).trigger("change")},formatTime:function(t,e,i){return t=10>t?"0"+t:t,e=10>e?"0"+e:e,t+":"+e+("12h"==this.options.format?" "+i:"")}})}),function(t){var e;window.UIkit&&(e=t(UIkit)),"function"==typeof define&&define.amd&&define("uikit-upload",["uikit"],function(){return e||t(UIkit)})}(function(t){"use strict";function e(n,o){function s(e,i){var n=new FormData,o=new XMLHttpRequest;if(i.before(i,e)!==!1){for(var s,a=0;s=e[a];a++)n.append(i.param,s);for(var r in i.params)n.append(r,i.params[r]);o.upload.addEventListener("progress",function(t){var e=t.loaded/t.total*100;i.progress(e,t)},!1),o.addEventListener("loadstart",function(t){i.loadstart(t)},!1),o.addEventListener("load",function(t){i.load(t)},!1),o.addEventListener("loadend",function(t){i.loadend(t)},!1),o.addEventListener("error",function(t){i.error(t)},!1),o.addEventListener("abort",function(t){i.abort(t)},!1),o.open(i.method,i.action,!0),o.onreadystatechange=function(){if(i.readystatechange(o),4==o.readyState){var e=o.responseText;if("json"==i.type)try{e=t.$.parseJSON(e)}catch(n){e=!1}i.complete(e,o)}},i.beforeSend(o),o.send(n)}}if(!t.support.ajaxupload)return this;if(o=t.$.extend({},e.defaults,o),n.length){if("*.*"!==o.allow)for(var a,r=0;a=n[r];r++)if(!i(o.allow,a.name))return void("string"==typeof o.notallowed?alert(o.notallowed):o.notallowed(a,o));var l=o.complete;if(o.single){var u=n.length,c=0,d=!0;o.beforeAll(n),o.complete=function(t,e){c+=1,l(t,e),o.filelimit&&c>=o.filelimit&&(d=!1),d&&u>c?s([n[c]],o):o.allcomplete(t,e)},s([n[0]],o)}else o.complete=function(t,e){l(t,e),o.allcomplete(t,e)},s(n,o)}}function i(t,e){var i="^"+t.replace(/\//g,"\\/").replace(/\*\*/g,"(\\/[^\\/]+)*").replace(/\*/g,"[^\\/]+").replace(/((?!\\))\?/g,"$1.")+"$";return i="^"+i+"$",null!==e.match(new RegExp(i,"i"))}return t.component("uploadSelect",{init:function(){var t=this;this.on("change",function(){e(t.element[0].files,t.options);var i=t.element.clone(!0).data("uploadSelect",t);t.element.replaceWith(i),t.element=i})}}),t.component("uploadDrop",{defaults:{dragoverClass:"uk-dragover"},init:function(){var t=this,i=!1;this.on("drop",function(i){i.dataTransfer&&i.dataTransfer.files&&(i.stopPropagation(),i.preventDefault(),t.element.removeClass(t.options.dragoverClass),t.element.trigger("dropped.uk.upload",[i.dataTransfer.files]),e(i.dataTransfer.files,t.options))}).on("dragenter",function(t){t.stopPropagation(),t.preventDefault()}).on("dragover",function(e){e.stopPropagation(),e.preventDefault(),i||(t.element.addClass(t.options.dragoverClass),i=!0)}).on("dragleave",function(e){e.stopPropagation(),e.preventDefault(),t.element.removeClass(t.options.dragoverClass),i=!1})}}),t.support.ajaxupload=function(){function t(){var t=document.createElement("INPUT");return t.type="file","files"in t}function e(){var t=new XMLHttpRequest;return!!(t&&"upload"in t&&"onprogress"in t.upload)}function i(){return!!window.FormData}return t()&&e()&&i()}(),t.support.ajaxupload&&t.$.event.props.push("dataTransfer"),e.defaults={action:"",single:!0,method:"POST",param:"files[]",params:{},allow:"*.*",type:"text",filelimit:!1,before:function(t){},beforeSend:function(t){},beforeAll:function(){},loadstart:function(){},load:function(){},loadend:function(){},error:function(){},abort:function(){},progress:function(){},complete:function(){},allcomplete:function(){},readystatechange:function(){},notallowed:function(t,e){alert("Only the following file types are allowed: "+e.allow)}},t.Utils.xhrupload=e,e});
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




