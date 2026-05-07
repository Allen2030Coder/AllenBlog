import {A as AstroError,L as LiveContentConfigError,p as AstroUserError,o as objectType,k as dateType,q as numberType,j as arrayType,s as stringType,R as RenderUndefinedEntryError,c as createComponent,u as unescapeHTML,a as renderTemplate,U as UnknownContentCollectionError,t as escape,v as renderUniqueStylesheet,w as renderScriptElement,x as createHeadAndContent,r as renderComponent}from'./chunk-Div6EpxG.js';/**
 * Base64 Encodes an arraybuffer
 * @param {ArrayBuffer} arraybuffer
 * @returns {string}
 */

/**
 * Decodes a base64 string into an arraybuffer
 * @param {string} string
 * @returns {ArrayBuffer}
 */
function decode64(string) {
  const binaryString = asciiToBinary(string);
  const arraybuffer = new ArrayBuffer(binaryString.length);
  const dv = new DataView(arraybuffer);

  for (let i = 0; i < arraybuffer.byteLength; i++) {
    dv.setUint8(i, binaryString.charCodeAt(i));
  }

  return arraybuffer;
}

const KEY_STRING =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/**
 * Substitute for atob since it's deprecated in node.
 * Does not do any input validation.
 *
 * @see https://github.com/jsdom/abab/blob/master/lib/atob.js
 *
 * @param {string} data
 * @returns {string}
 */
function asciiToBinary(data) {
  if (data.length % 4 === 0) {
    data = data.replace(/==?$/, "");
  }

  let output = "";
  let buffer = 0;
  let accumulatedBits = 0;

  for (let i = 0; i < data.length; i++) {
    buffer <<= 6;
    buffer |= KEY_STRING.indexOf(data[i]);
    accumulatedBits += 6;
    if (accumulatedBits === 24) {
      output += String.fromCharCode((buffer & 0xff0000) >> 16);
      output += String.fromCharCode((buffer & 0xff00) >> 8);
      output += String.fromCharCode(buffer & 0xff);
      buffer = accumulatedBits = 0;
    }
  }
  if (accumulatedBits === 12) {
    buffer >>= 4;
    output += String.fromCharCode(buffer);
  } else if (accumulatedBits === 18) {
    buffer >>= 2;
    output += String.fromCharCode((buffer & 0xff00) >> 8);
    output += String.fromCharCode(buffer & 0xff);
  }
  return output;
}const UNDEFINED = -1;
const HOLE = -2;
const NAN = -3;
const POSITIVE_INFINITY = -4;
const NEGATIVE_INFINITY = -5;
const NEGATIVE_ZERO = -6;/**
 * Revive a value flattened with `devalue.stringify`
 * @param {number | any[]} parsed
 * @param {Record<string, (value: any) => any>} [revivers]
 */
function unflatten(parsed, revivers) {
	if (typeof parsed === 'number') return hydrate(parsed, true);

	if (!Array.isArray(parsed) || parsed.length === 0) {
		throw new Error('Invalid input');
	}

	const values = /** @type {any[]} */ (parsed);

	const hydrated = Array(values.length);

	/**
	 * @param {number} index
	 * @returns {any}
	 */
	function hydrate(index, standalone = false) {
		if (index === UNDEFINED) return undefined;
		if (index === NAN) return NaN;
		if (index === POSITIVE_INFINITY) return Infinity;
		if (index === NEGATIVE_INFINITY) return -Infinity;
		if (index === NEGATIVE_ZERO) return -0;

		if (standalone || typeof index !== 'number') {
			throw new Error(`Invalid input`);
		}

		if (index in hydrated) return hydrated[index];

		const value = values[index];

		if (!value || typeof value !== 'object') {
			hydrated[index] = value;
		} else if (Array.isArray(value)) {
			if (typeof value[0] === 'string') {
				const type = value[0];

				switch (type) {
					case 'Date':
						hydrated[index] = new Date(value[1]);
						break;

					case 'Set':
						const set = new Set();
						hydrated[index] = set;
						for (let i = 1; i < value.length; i += 1) {
							set.add(hydrate(value[i]));
						}
						break;

					case 'Map':
						const map = new Map();
						hydrated[index] = map;
						for (let i = 1; i < value.length; i += 2) {
							map.set(hydrate(value[i]), hydrate(value[i + 1]));
						}
						break;

					case 'RegExp':
						hydrated[index] = new RegExp(value[1], value[2]);
						break;

					case 'Object':
						hydrated[index] = Object(value[1]);
						break;

					case 'BigInt':
						hydrated[index] = BigInt(value[1]);
						break;

					case 'null':
						const obj = Object.create(null);
						hydrated[index] = obj;
						for (let i = 1; i < value.length; i += 2) {
							obj[value[i]] = hydrate(value[i + 1]);
						}
						break;

					case 'Int8Array':
					case 'Uint8Array':
					case 'Uint8ClampedArray':
					case 'Int16Array':
					case 'Uint16Array':
					case 'Int32Array':
					case 'Uint32Array':
					case 'Float32Array':
					case 'Float64Array':
					case 'BigInt64Array':
					case 'BigUint64Array': {
						if (values[value[1]][0] !== 'ArrayBuffer') {
							// without this, if we receive malformed input we could
							// end up trying to hydrate in a circle or allocate
							// huge amounts of memory when we call `new TypedArrayConstructor(buffer)`
							throw new Error('Invalid data');
						}

						const TypedArrayConstructor = globalThis[type];
						const buffer = hydrate(value[1]);
						const typedArray = new TypedArrayConstructor(buffer);

						hydrated[index] =
							value[2] !== undefined
								? typedArray.subarray(value[2], value[3])
								: typedArray;

						break;
					}

					case 'ArrayBuffer': {
						const base64 = value[1];
						if (typeof base64 !== 'string') {
							throw new Error('Invalid ArrayBuffer encoding');
						}
						const arraybuffer = decode64(base64);
						hydrated[index] = arraybuffer;
						break;
					}

					case 'Temporal.Duration':
					case 'Temporal.Instant':
					case 'Temporal.PlainDate':
					case 'Temporal.PlainTime':
					case 'Temporal.PlainDateTime':
					case 'Temporal.PlainMonthDay':
					case 'Temporal.PlainYearMonth':
					case 'Temporal.ZonedDateTime': {
						const temporalName = type.slice(9);
						// @ts-expect-error TS doesn't know about Temporal yet
						hydrated[index] = Temporal[temporalName].from(value[1]);
						break;
					}

					case 'URL': {
						const url = new URL(value[1]);
						hydrated[index] = url;
						break;
					}

					case 'URLSearchParams': {
						const url = new URLSearchParams(value[1]);
						hydrated[index] = url;
						break;
					}

					default:
						throw new Error(`Unknown type ${type}`);
				}
			} else {
				const array = new Array(value.length);
				hydrated[index] = array;

				for (let i = 0; i < value.length; i += 1) {
					const n = value[i];
					if (n === HOLE) continue;

					array[i] = hydrate(n);
				}
			}
		} else {
			/** @type {Record<string, any>} */
			const object = {};
			hydrated[index] = object;

			for (const key in value) {
				if (key === '__proto__') {
					throw new Error('Cannot parse an object with a `__proto__` property');
				}

				const n = value[key];
				object[key] = hydrate(n);
			}
		}

		return hydrated[index];
	}

	return hydrate(0);
}var e=e=>Object.prototype.toString.call(e),t=e=>ArrayBuffer.isView(e)&&!(e instanceof DataView),o=t=>"[object Date]"===e(t),n=t=>"[object RegExp]"===e(t),r=t=>"[object Error]"===e(t),s=t=>"[object Boolean]"===e(t),l=t=>"[object Number]"===e(t),i=t=>"[object String]"===e(t),c=Array.isArray,u=Object.getOwnPropertyDescriptor,a=Object.prototype.propertyIsEnumerable,f=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,h=Object.keys;function d(e){const t=h(e),o=f(e);for(let n=0;n<o.length;n++)a.call(e,o[n])&&t.push(o[n]);return t}function b(e,t){return !u(e,t)?.writable}function y(e,u){if("object"==typeof e&&null!==e){let a;if(c(e))a=[];else if(o(e))a=new Date(e.getTime?e.getTime():e);else if(n(e))a=new RegExp(e);else if(r(e))a={message:e.message};else if(s(e)||l(e)||i(e))a=Object(e);else {if(t(e))return e.slice();a=Object.create(Object.getPrototypeOf(e));}const f=u.includeSymbols?d:h;for(const t of f(e))a[t]=e[t];return a}return e}var g={includeSymbols:false,immutable:false};function m(e,t,o=g){const n=[],r=[];let s=true;const l=o.includeSymbols?d:h,i=!!o.immutable;return function e(u){const a=i?y(u,o):u,f={};let h=true;const d={node:a,node_:u,path:[].concat(n),parent:r[r.length-1],parents:r,key:n[n.length-1],isRoot:0===n.length,level:n.length,circular:void 0,isLeaf:false,notLeaf:true,notRoot:true,isFirst:false,isLast:false,update:function(e,t=false){d.isRoot||(d.parent.node[d.key]=e),d.node=e,t&&(h=false);},delete:function(e){delete d.parent.node[d.key],e&&(h=false);},remove:function(e){c(d.parent.node)?d.parent.node.splice(d.key,1):delete d.parent.node[d.key],e&&(h=false);},keys:null,before:function(e){f.before=e;},after:function(e){f.after=e;},pre:function(e){f.pre=e;},post:function(e){f.post=e;},stop:function(){s=false;},block:function(){h=false;}};if(!s)return d;function g(){if("object"==typeof d.node&&null!==d.node){d.keys&&d.node_===d.node||(d.keys=l(d.node)),d.isLeaf=0===d.keys.length;for(let e=0;e<r.length;e++)if(r[e].node_===u){d.circular=r[e];break}}else d.isLeaf=true,d.keys=null;d.notLeaf=!d.isLeaf,d.notRoot=!d.isRoot;}g();const m=t(d,d.node);if(void 0!==m&&d.update&&d.update(m),f.before&&f.before(d,d.node),!h)return d;if("object"==typeof d.node&&null!==d.node&&!d.circular){r.push(d),g();for(const[t,o]of Object.entries(d.keys??[])){n.push(o),f.pre&&f.pre(d,d.node[o],o);const r=e(d.node[o]);i&&p.call(d.node,o)&&!b(d.node,o)&&(d.node[o]=r.node),r.isLast=!!d.keys?.length&&+t==d.keys.length-1,r.isFirst=0==+t,f.post&&f.post(d,r),n.pop();}r.pop();}return f.after&&f.after(d,d.node),d}(e).node}var j=class{#e;#t;constructor(e,t=g){this.#e=e,this.#t=t;}get(e){let t=this.#e;for(let o=0;t&&o<e.length;o++){const n=e[o];if(!p.call(t,n)||!this.#t.includeSymbols&&"symbol"==typeof n)return;t=t[n];}return t}has(e){let t=this.#e;for(let o=0;t&&o<e.length;o++){const n=e[o];if(!p.call(t,n)||!this.#t.includeSymbols&&"symbol"==typeof n)return  false;t=t[n];}return  true}set(e,t){let o=this.#e,n=0;for(n=0;n<e.length-1;n++){const t=e[n];p.call(o,t)||(o[t]={}),o=o[t];}return o[e[n]]=t,t}map(e){return m(this.#e,e,{immutable:true,includeSymbols:!!this.#t.includeSymbols})}forEach(e){return this.#e=m(this.#e,e,this.#t),this.#e}reduce(e,t){const o=1===arguments.length;let n=o?this.#e:t;return this.forEach(((t,r)=>{t.isRoot&&o||(n=e(t,n,r));})),n}paths(){const e=[];return this.forEach((t=>{e.push(t.path);})),e}nodes(){const e=[];return this.forEach((t=>{e.push(t.node);})),e}clone(){const e=[],o=[],n=this.#t;return t(this.#e)?this.#e.slice():function t(r){for(let t=0;t<e.length;t++)if(e[t]===r)return o[t];if("object"==typeof r&&null!==r){const s=y(r,n);e.push(r),o.push(s);const l=n.includeSymbols?d:h;for(const e of l(r))s[e]=t(r[e]);return e.pop(),o.pop(),s}return r}(this.#e)}};/*
How it works:
`this.#head` is an instance of `Node` which keeps track of its current value and nests another instance of `Node` that keeps the value that comes after it. When a value is provided to `.enqueue()`, the code needs to iterate through `this.#head`, going deeper and deeper to find the last value. However, iterating through every single item is slow. This problem is solved by saving a reference to the last value as `this.#tail` so that it can reference it to add a new value.
*/

class Node {
	value;
	next;

	constructor(value) {
		this.value = value;
	}
}

class Queue {
	#head;
	#tail;
	#size;

	constructor() {
		this.clear();
	}

	enqueue(value) {
		const node = new Node(value);

		if (this.#head) {
			this.#tail.next = node;
			this.#tail = node;
		} else {
			this.#head = node;
			this.#tail = node;
		}

		this.#size++;
	}

	dequeue() {
		const current = this.#head;
		if (!current) {
			return;
		}

		this.#head = this.#head.next;
		this.#size--;

		// Clean up tail reference when queue becomes empty
		if (!this.#head) {
			this.#tail = undefined;
		}

		return current.value;
	}

	peek() {
		if (!this.#head) {
			return;
		}

		return this.#head.value;

		// TODO: Node.js 18.
		// return this.#head?.value;
	}

	clear() {
		this.#head = undefined;
		this.#tail = undefined;
		this.#size = 0;
	}

	get size() {
		return this.#size;
	}

	* [Symbol.iterator]() {
		let current = this.#head;

		while (current) {
			yield current.value;
			current = current.next;
		}
	}

	* drain() {
		while (this.#head) {
			yield this.dequeue();
		}
	}
}function pLimit(concurrency) {
	validateConcurrency(concurrency);

	const queue = new Queue();
	let activeCount = 0;

	const resumeNext = () => {
		if (activeCount < concurrency && queue.size > 0) {
			queue.dequeue()();
			// Since `pendingCount` has been decreased by one, increase `activeCount` by one.
			activeCount++;
		}
	};

	const next = () => {
		activeCount--;

		resumeNext();
	};

	const run = async (function_, resolve, arguments_) => {
		const result = (async () => function_(...arguments_))();

		resolve(result);

		try {
			await result;
		} catch {}

		next();
	};

	const enqueue = (function_, resolve, arguments_) => {
		// Queue `internalResolve` instead of the `run` function
		// to preserve asynchronous context.
		new Promise(internalResolve => {
			queue.enqueue(internalResolve);
		}).then(
			run.bind(undefined, function_, resolve, arguments_),
		);

		(async () => {
			// This function needs to wait until the next microtask before comparing
			// `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
			// after the `internalResolve` function is dequeued and called. The comparison in the if-statement
			// needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
			await Promise.resolve();

			if (activeCount < concurrency) {
				resumeNext();
			}
		})();
	};

	const generator = (function_, ...arguments_) => new Promise(resolve => {
		enqueue(function_, resolve, arguments_);
	});

	Object.defineProperties(generator, {
		activeCount: {
			get: () => activeCount,
		},
		pendingCount: {
			get: () => queue.size,
		},
		clearQueue: {
			value() {
				queue.clear();
			},
		},
		concurrency: {
			get: () => concurrency,

			set(newConcurrency) {
				validateConcurrency(newConcurrency);
				concurrency = newConcurrency;

				queueMicrotask(() => {
					// eslint-disable-next-line no-unmodified-loop-condition
					while (activeCount < concurrency && queue.size > 0) {
						resumeNext();
					}
				});
			},
		},
	});

	return generator;
}

function validateConcurrency(concurrency) {
	if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
		throw new TypeError('Expected `concurrency` to be a number from 1 and up');
	}
}function prependForwardSlash(path) {
  return path[0] === "/" ? path : "/" + path;
}
function removeTrailingForwardSlash(path) {
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path;
}
function removeLeadingForwardSlash(path) {
  return path.startsWith("/") ? path.substring(1) : path;
}
function trimSlashes(path) {
  return path.replace(/^\/|\/$/g, "");
}
function isString(path) {
  return typeof path === "string" || path instanceof String;
}
function joinPaths(...paths) {
  return paths.filter(isString).map((path, i) => {
    if (i === 0) {
      return removeTrailingForwardSlash(path);
    } else if (i === paths.length - 1) {
      return removeLeadingForwardSlash(path);
    } else {
      return trimSlashes(path);
    }
  }).join("/");
}
const URL_PROTOCOL_REGEX = /^(?:(?:http|ftp|https|ws):?\/\/|\/\/)/;
function isRemotePath(src) {
  return URL_PROTOCOL_REGEX.test(src) || src.startsWith("data:");
}
function removeBase(path, base) {
  if (path.startsWith(base)) {
    return path.slice(removeTrailingForwardSlash(base).length);
  }
  return path;
}const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";
const CONTENT_LAYER_TYPE = "content_layer";const VALID_INPUT_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const DEFAULT_OUTPUT_FORMAT = "webp";
const DEFAULT_HASH_PROPS = [
  "src",
  "width",
  "height",
  "format",
  "quality",
  "fit",
  "position"
];function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}function getImporterFilename() {
  const stackLine = new Error().stack?.split("\n").find(
    (line) => !line.includes("defineCollection") && !line.includes("defineLiveCollection") && !line.includes("getImporterFilename") && !line.startsWith("Error")
  );
  if (!stackLine) {
    return void 0;
  }
  const match = /\/((?:src|chunks)\/.*?):\d+:\d+/.exec(stackLine);
  return match?.[1] ?? void 0;
}
function defineCollection$1(config) {
  const importerFilename = getImporterFilename();
  if (importerFilename?.includes("live.config")) {
    throw new AstroError({
      ...LiveContentConfigError,
      message: LiveContentConfigError.message(
        "Collections in a live config file must use `defineLiveCollection`.",
        importerFilename
      )
    });
  }
  if ("loader" in config) {
    if (config.type && config.type !== CONTENT_LAYER_TYPE) {
      throw new AstroUserError(
        `Collections that use the Content Layer API must have a \`loader\` defined and no \`type\` set. Check your collection definitions in ${importerFilename ?? "your content config file"}.`
      );
    }
    if (typeof config.loader === "object" && typeof config.loader.load !== "function" && ("loadEntry" in config.loader || "loadCollection" in config.loader)) {
      throw new AstroUserError(
        `Live content collections must be defined in "src/live.config.ts" file. Check your collection definitions in "${importerFilename ?? "your content config file"}" to ensure you are not using a live loader.`
      );
    }
    config.type = CONTENT_LAYER_TYPE;
  }
  if (!config.type) config.type = "content";
  return config;
}class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./chunk-BtWPZNRX.js');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://blog.fis.ink/", "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
objectType({
  tags: arrayType(stringType()).optional(),
  maxAge: numberType().optional(),
  lastModified: dateType().optional()
});
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection,
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./chunk-z8PDYxLW.js');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (entry.legacyId) {
          entry = emulateLegacyEntry(entry);
        }
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function emulateLegacyEntry({ legacyId, ...entry }) {
  const legacyEntry = {
    ...entry,
    id: legacyId,
    slug: entry.id
  };
  return {
    ...legacyEntry,
    // Define separately so the render function isn't included in the object passed to `renderEntry()`
    render: () => renderEntry(legacyEntry)
  };
}
function createGetEntry({
  getEntryImport,
  getRenderEntryImport,
  collectionNames,
  liveCollections
}) {
  return async function getEntry(collectionOrLookupObject, lookup) {
    let collection, lookupId;
    if (typeof collectionOrLookupObject === "string") {
      collection = collectionOrLookupObject;
      if (!lookup)
        throw new AstroError({
          ...UnknownContentCollectionError,
          message: "`getEntry()` requires an entry identifier as the second argument."
        });
      lookupId = lookup;
    } else {
      collection = collectionOrLookupObject.collection;
      lookupId = "id" in collectionOrLookupObject ? collectionOrLookupObject.id : collectionOrLookupObject.slug;
    }
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveEntry() instead of getEntry().`
      });
    }
    if (typeof lookupId === "object") {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `The entry identifier must be a string. Received object.`
      });
    }
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const entry2 = store.get(collection, lookupId);
      if (!entry2) {
        console.warn(`Entry ${collection} → ${lookupId} was not found.`);
        return;
      }
      const { default: imageAssetMap } = await import('./chunk-z8PDYxLW.js');
      entry2.data = updateImageReferencesInData(entry2.data, entry2.filePath, imageAssetMap);
      if (entry2.legacyId) {
        return emulateLegacyEntry({ ...entry2, collection });
      }
      return {
        ...entry2,
        collection
      };
    }
    if (!collectionNames.has(collection)) {
      console.warn(
        `The collection ${JSON.stringify(collection)} does not exist. Please ensure it is defined in your content config.`
      );
      return void 0;
    }
    const entryImport = await getEntryImport(collection, lookupId);
    if (typeof entryImport !== "function") return void 0;
    const entry = await entryImport();
    if (entry._internal.type === "content") {
      return {
        id: entry.id,
        slug: entry.slug,
        body: entry.body,
        collection: entry.collection,
        data: entry.data,
        async render() {
          return render({
            collection: entry.collection,
            id: entry.id,
            renderEntryImport: await getRenderEntryImport(collection, lookupId)
          });
        }
      };
    } else if (entry._internal.type === "data") {
      return {
        id: entry.id,
        collection: entry.collection,
        data: entry.data
      };
    }
    return void 0;
  };
}
const CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
  const { default: imageAssetMap } = await import('./chunk-z8PDYxLW.js');
  const imageObjects = /* @__PURE__ */ new Map();
  const { getImage } = await import('./chunk-CrPWmWAc.js').then(n=>n._);
  for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) {
    try {
      const decodedImagePath = JSON.parse(imagePath.replaceAll("&#x22;", '"'));
      let image;
      if (URL.canParse(decodedImagePath.src)) {
        image = await getImage(decodedImagePath);
      } else {
        const id = imageSrcToImportId(decodedImagePath.src, fileName);
        const imported = imageAssetMap.get(id);
        if (!id || imageObjects.has(id) || !imported) {
          continue;
        }
        image = await getImage({ ...decodedImagePath, src: imported });
      }
      imageObjects.set(imagePath, image);
    } catch {
      throw new Error(`Failed to parse image reference: ${imagePath}`);
    }
  }
  return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
    const image = imageObjects.get(imagePath);
    if (!image) {
      return full;
    }
    const { index, ...attributes } = image.attributes;
    return Object.entries({
      ...attributes,
      src: image.src,
      srcset: image.srcSet.attribute,
      // This attribute is used by the toolbar audit
      ...Object.assign(__vite_import_meta_env__, { _: process.env._ }).DEV ? { "data-image-component": "true" } : {}
    }).map(([key, value]) => value ? `${key}="${escape(value)}"` : "").join(" ");
  });
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new j(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function renderEntry(entry) {
  if (!entry) {
    throw new AstroError(RenderUndefinedEntryError);
  }
  if ("render" in entry && !("legacyId" in entry)) {
    return entry.render();
  }
  if (entry.deferredRender) {
    try {
      const { default: contentModules } = await import('./chunk-C48v0qLP.js');
      const renderEntryImport = contentModules.get(entry.filePath);
      return render({
        collection: "",
        id: entry.id,
        renderEntryImport
      });
    } catch (e) {
      console.error(e);
    }
  }
  const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
  const Content = createComponent(() => renderTemplate`${unescapeHTML(html)}`);
  return {
    Content,
    headings: entry?.rendered?.metadata?.headings ?? [],
    remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}
function defineCollection(config) {
  if (config.type === "live") {
    throw new AstroError({
      ...LiveContentConfigError,
      message: LiveContentConfigError.message(
        "Collections with type `live` must be defined in a `src/live.config.ts` file."
      )
    });
  }
  return defineCollection$1(config);
}// astro-head-inject

const liveCollections = {};

const contentDir = '/src/content/';

const contentEntryGlob = "";
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = "";
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {};

const collectionNames = new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = "";
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
	liveCollections,
});

const getEntry = createGetEntry({
	getEntryImport: createGlobLookup(collectionToEntryMap),
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	collectionNames,
	liveCollections,
});var I18nKey = /* @__PURE__ */ ((I18nKey2) => {
  I18nKey2["home"] = "home";
  I18nKey2["about"] = "about";
  I18nKey2["archive"] = "archive";
  I18nKey2["search"] = "search";
  I18nKey2["tags"] = "tags";
  I18nKey2["categories"] = "categories";
  I18nKey2["recentPosts"] = "recentPosts";
  I18nKey2["comments"] = "comments";
  I18nKey2["untitled"] = "untitled";
  I18nKey2["uncategorized"] = "uncategorized";
  I18nKey2["noTags"] = "noTags";
  I18nKey2["wordCount"] = "wordCount";
  I18nKey2["wordsCount"] = "wordsCount";
  I18nKey2["minuteCount"] = "minuteCount";
  I18nKey2["minutesCount"] = "minutesCount";
  I18nKey2["postCount"] = "postCount";
  I18nKey2["postsCount"] = "postsCount";
  I18nKey2["themeColor"] = "themeColor";
  I18nKey2["lightMode"] = "lightMode";
  I18nKey2["darkMode"] = "darkMode";
  I18nKey2["systemMode"] = "systemMode";
  I18nKey2["more"] = "more";
  I18nKey2["author"] = "author";
  I18nKey2["publishedAt"] = "publishedAt";
  I18nKey2["license"] = "license";
  I18nKey2["friends"] = "friends";
  I18nKey2["circle"] = "circle";
  I18nKey2["friendsCircle"] = "friendsCircle";
  I18nKey2["friendsNum"] = "friendsNum";
  I18nKey2["activeNum"] = "activeNum";
  I18nKey2["errorNum"] = "errorNum";
  I18nKey2["articleNum"] = "articleNum";
  I18nKey2["lastUpdated"] = "lastUpdated";
  I18nKey2["loading"] = "loading";
  I18nKey2["loadError"] = "loadError";
  I18nKey2["retry"] = "retry";
  I18nKey2["noArticles"] = "noArticles";
  I18nKey2["refresh"] = "refresh";
  I18nKey2["refreshTip"] = "refreshTip";
  return I18nKey2;
})(I18nKey || {});const i18nKey=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,default:I18nKey},Symbol.toStringTag,{value:'Module'}));const PAGE_SIZE = 12;
const LIGHT_MODE = "light", DARK_MODE = "dark", AUTO_MODE = "auto";
const DEFAULT_THEME = AUTO_MODE;
const BANNER_HEIGHT = 45;
const BANNER_HEIGHT_EXTEND = 35;
const BANNER_HEIGHT_HOME = BANNER_HEIGHT + BANNER_HEIGHT_EXTEND;
const MAIN_PANEL_OVERLAPS_BANNER_HEIGHT = 3.5;
const PAGE_WIDTH = 90;const constants=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,AUTO_MODE,BANNER_HEIGHT,BANNER_HEIGHT_EXTEND,BANNER_HEIGHT_HOME,DARK_MODE,DEFAULT_THEME,LIGHT_MODE,MAIN_PANEL_OVERLAPS_BANNER_HEIGHT,PAGE_SIZE,PAGE_WIDTH},Symbol.toStringTag,{value:'Module'}));const siteConfig = {
  title: "Allen2030's Blog",
  lang: "zh_CN",
  // 可选值: 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
  themeColor: {
    hue: 260},
  theme: AUTO_MODE,
  // 主题模式: AUTO_MODE(默认), LIGHT_MODE(强制浅色), DARK_MODE(强制深色)
  banner: {
    enable: true,
    // 'image' 或 'video'，指定banner类型
    src: "https://api.fis.ink/mc",
    // 相对于/src目录的路径。如果以'/'开头则表示相对于/public目录
    //背景在src\layouts\Layout.astro中
    position: "center",
    // 等同于CSS的object-position属性，仅支持'top','center','bottom'。默认为'center'
    credit: {
      enable: false},
    text: {
      // 是否在banner中显示文字
      title: "Engine Ready!",
      // banner主标题
      subtitle: "A Better You,A Bigger World!"
      // banner副标题
    }
  },
  pageBackground: {
    type: "image",
    // 'image' 或 'video'
    src: "https://api.fis.ink/mc"
    //https://www.fis.ink/wj/video/mc.mp4
    //https://www.fis.ink/wj/video/xingjianya.mp4
  },
  toc: {
    // 在文章右侧显示目录
    depth: 2
    // 目录中显示的最大标题层级，取值范围1-3
  },
  post: {
    showCover: false
    // 是否在文章页面显示封面
  },
  favicon: [
    // 保留空数组则使用默认favicon
    {
      src: "https://img.scdn.io/i/696e0f2b20919_1768820523.webp"
      // favicon路径，相对于/public目录
      //theme: 'light',              // (可选) 'light'或'dark'，仅在为浅色和深色模式设置了不同favicon时使用
      //sizes: '32x32',              // (可选) favicon尺寸，仅在设置了不同尺寸的favicon时使用
    }
  ]
};
const navBarConfig = {
  links: [
    {
      name: "归档",
      url: "/archive/",
      icon: "fa6-solid:box-archive"
    },
    {
      name: "友链",
      url: "#",
      icon: "fa6-solid:link",
      children: [
        {
          name: "友链",
          url: "/friends/",
          icon: "fa6-solid:user-group"
        },
        {
          name: "朋友圈",
          url: "/circle/",
          icon: "fa6-solid:circle-nodes"
        },
        {
          name: "留言板",
          url: "/comments/",
          icon: "fa6-solid:message"
        }
      ]
    },
    {
      name: "其他",
      url: "#",
      icon: "fa6-solid:chart-line",
      children: [
        {
          name: "服务监控",
          url: "https://status.allen2030.com/status/web",
          external: true,
          icon: "fa6-solid:chart-line"
        },
        {
          name: "节点监控",
          url: "https://monitor.allen2030.com",
          external: true,
          icon: "fa6-solid:chart-line"
        }
      ]
    },
    {
      name: "我的",
      url: "#",
      icon: "fa6-solid:user",
      children: [
        {
          name: "相册",
          url: "/album/",
          icon: "material-symbols:photo-library"
        },
        {
          name: "瞬间",
          url: "/essay/",
          icon: "material-symbols:photo-camera"
        },
        {
          name: "关于",
          url: "/about/",
          icon: "fa6-solid:user"
        },
        {
          name: "主页",
          url: "https://www.allen2030.com",
          external: true,
          icon: "material-symbols:home"
        }
      ]
    }
  ],
  showHomeIcon: false,
  // 控制是否显示home图标
  searchLeftIcons: [
    {
      name: "travellings",
      url: "https://www.travellings.cn/go.html",
      icon: "fa6-solid:train-subway",
      external: true
    },
    {
      name: "rss",
      url: "/rss.xml",
      icon: "ic:twotone-rss-feed",
      external: true
    }
  ]
};
const profileConfig = {
  avatar: "https://img.scdn.io/i/69451d727217f_1766137202.png",
  // 相对于/src目录的路径。如果以'/'开头则表示相对于/public目录
  name: "Allen2030",
  bio: "ROG Prime",
  links: [
    {
      name: "RSS",
      icon: "ic:twotone-rss-feed",
      // 图标代码请访问 https://icones.js.org/
      // 如果尚未包含相应的图标集，您需要先安装
      // `pnpm add @iconify-json/<icon-set-name>`
      // 例如：`pnpm add @iconify-json/ic`
      url: "/rss.xml"
    },
    {
      name: "GitHub",
      icon: "fa6-brands:github",
      url: "https://github.com/duancyblog"
    }
  ]};
const licenseConfig = {
  name: "CC BY-NC-SA 4.0",
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
};
const commentConfig = {
  enable: true,
  type: "artalk",
  twikoo: {
    envId: "https://twikoo.allen2030.com"
  },
  artalk: {
    server: "https://artalk.allen2030.com",
    site: "AllenBlog",
    darkMode: false
    // 强制浅色模式，不跟随浏览器主题
  }
};
const cardConfig = {
  opacity: 0.85
  // 卡片半透明度，取值范围0-1
};
const layoutConfig = {
  postList: {
    // "grid" 或 "list"，网格布局或列表布局
    grid: {
      columns: {
        sm: 1,
        // 小屏幕列数
        md2: 2,
        // 726px以上显示2列
        md: 2,
        // 中屏幕列数
        lg: 3
        // 大屏幕列数，最大为3，超出会变成2个每行
      },
      gap: "gap-4"
      // 网格间距，对应Tailwind的gap-4
    }
  },
  friends: {
    grid: {
      columns: {
        sm: 1,
        // 小屏幕列数
        md: 2,
        // 中屏幕列数
        lg: 3
        // 大屏幕列数
      },
      gap: "gap-x-6 gap-y-8"
      // 网格间距
    }
  }
};
const beautifyConfig = {
  titlePrefixIcon: "",
  titlePrefixIconColor: "#ff7849",
  animation: {
    speed: 1.6},
  hover: {
    slowSpeed: 3.2,
    color: "#49b1f5"
  },
  colors: {
    h1: "#ef50a8",
    h2: "#fb7061",
    h3: "#ffbf00",
    h4: "#a9e000",
    h5: "#57c850",
    h6: "#5ec1e0"
  },
  sizes: {
    h1: "1.3rem",
    h2: "1.1rem",
    h3: "0.95rem",
    h4: "0.8rem",
    h5: "0.7rem",
    h6: "0.66rem"
  }
};
const sidebarConfig = {
  // 侧边栏总开关，控制整个侧边栏是否显示
  cards: {
    // 一言卡片
    advertisement: false
    // 广告卡片
  }};const config=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,beautifyConfig,cardConfig,commentConfig,layoutConfig,licenseConfig,navBarConfig,profileConfig,sidebarConfig,siteConfig},Symbol.toStringTag,{value:'Module'}));const en = {
  [I18nKey.home]: "Home",
  [I18nKey.about]: "About",
  [I18nKey.archive]: "Archive",
  [I18nKey.search]: "Search",
  [I18nKey.tags]: "Tags",
  [I18nKey.categories]: "Categories",
  [I18nKey.recentPosts]: "Recent Posts",
  [I18nKey.comments]: "Comments",
  [I18nKey.untitled]: "Untitled",
  [I18nKey.uncategorized]: "Uncategorized",
  [I18nKey.noTags]: "No Tags",
  [I18nKey.wordCount]: "word",
  [I18nKey.wordsCount]: "words",
  [I18nKey.minuteCount]: "minute",
  [I18nKey.minutesCount]: "minutes",
  [I18nKey.postCount]: "post",
  [I18nKey.postsCount]: "posts",
  [I18nKey.themeColor]: "Theme Color",
  [I18nKey.lightMode]: "Light",
  [I18nKey.darkMode]: "Dark",
  [I18nKey.systemMode]: "System",
  [I18nKey.more]: "More",
  [I18nKey.author]: "Author",
  [I18nKey.publishedAt]: "Published at",
  [I18nKey.license]: "License",
  [I18nKey.friends]: "Friends",
  [I18nKey.circle]: "Circle",
  [I18nKey.friendsCircle]: "Friends Circle",
  [I18nKey.friendsNum]: "Friends Count",
  [I18nKey.activeNum]: "Active Count",
  [I18nKey.errorNum]: "Error Count",
  [I18nKey.articleNum]: "Article Count",
  [I18nKey.lastUpdated]: "Last Updated",
  [I18nKey.loading]: "Loading...",
  [I18nKey.loadError]: "Load Failed",
  [I18nKey.retry]: "Retry",
  [I18nKey.noArticles]: "No Articles",
  [I18nKey.refresh]: "Refresh",
  [I18nKey.refreshTip]: "If it takes too long to load, please try refreshing the page"
};const en$1=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,en},Symbol.toStringTag,{value:'Module'}));const es = {
  [I18nKey.home]: "Inicio",
  [I18nKey.about]: "Sobre mí",
  [I18nKey.archive]: "Archivo",
  [I18nKey.search]: "Buscar",
  [I18nKey.tags]: "Etiquetas",
  [I18nKey.categories]: "Categorías",
  [I18nKey.recentPosts]: "Publicaciones recientes",
  [I18nKey.comments]: "Comentarios",
  [I18nKey.untitled]: "Sin título",
  [I18nKey.uncategorized]: "Sin categoría",
  [I18nKey.noTags]: "Sin etiquetas",
  [I18nKey.wordCount]: "palabra",
  [I18nKey.wordsCount]: "palabras",
  [I18nKey.minuteCount]: "minuto",
  [I18nKey.minutesCount]: "minutos",
  [I18nKey.postCount]: "publicación",
  [I18nKey.postsCount]: "publicaciones",
  [I18nKey.themeColor]: "Color del tema",
  [I18nKey.lightMode]: "Claro",
  [I18nKey.darkMode]: "Oscuro",
  [I18nKey.systemMode]: "Sistema",
  [I18nKey.more]: "Más",
  [I18nKey.author]: "Autor",
  [I18nKey.publishedAt]: "Publicado el",
  [I18nKey.license]: "Licencia",
  [I18nKey.friends]: "Amigos",
  [I18nKey.friendsCircle]: "Círculo de Amigos",
  [I18nKey.friendsNum]: "Número de Amigos",
  [I18nKey.activeNum]: "Número Activo",
  [I18nKey.errorNum]: "Número de Errores",
  [I18nKey.articleNum]: "Número de Artículos",
  [I18nKey.lastUpdated]: "Última Actualización",
  [I18nKey.loading]: "Cargando...",
  [I18nKey.loadError]: "Error de Carga",
  [I18nKey.retry]: "Reintentar",
  [I18nKey.noArticles]: "Sin Artículos",
  [I18nKey.refresh]: "Actualizar",
  [I18nKey.refreshTip]: "Si tarda mucho en cargar, intenta actualizar la página"
};const es$1=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,es},Symbol.toStringTag,{value:'Module'}));const ja = {
  [I18nKey.home]: "Home",
  [I18nKey.about]: "About",
  [I18nKey.archive]: "Archive",
  [I18nKey.search]: "検索",
  [I18nKey.tags]: "タグ",
  [I18nKey.categories]: "カテゴリ",
  [I18nKey.recentPosts]: "最近の投稿",
  [I18nKey.comments]: "コメント",
  [I18nKey.untitled]: "タイトルなし",
  [I18nKey.uncategorized]: "カテゴリなし",
  [I18nKey.noTags]: "タグなし",
  [I18nKey.wordCount]: "文字",
  [I18nKey.wordsCount]: "文字",
  [I18nKey.minuteCount]: "分",
  [I18nKey.minutesCount]: "分",
  [I18nKey.postCount]: "件の投稿",
  [I18nKey.postsCount]: "件の投稿",
  [I18nKey.themeColor]: "テーマカラー",
  [I18nKey.lightMode]: "ライト",
  [I18nKey.darkMode]: "ダーク",
  [I18nKey.systemMode]: "システム",
  [I18nKey.more]: "もっと",
  [I18nKey.author]: "作者",
  [I18nKey.publishedAt]: "公開日",
  [I18nKey.license]: "ライセンス",
  [I18nKey.friends]: "友達",
  [I18nKey.friendsCircle]: "友達サークル",
  [I18nKey.friendsNum]: "友達数",
  [I18nKey.activeNum]: "アクティブ数",
  [I18nKey.errorNum]: "エラー数",
  [I18nKey.articleNum]: "記事数",
  [I18nKey.lastUpdated]: "最終更新",
  [I18nKey.loading]: "読み込み中...",
  [I18nKey.loadError]: "読み込み失敗",
  [I18nKey.retry]: "再試行",
  [I18nKey.noArticles]: "記事がありません",
  [I18nKey.refresh]: "更新",
  [I18nKey.refreshTip]: "読み込みに時間がかかる場合は、ページを更新してください"
};const ja$1=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,ja},Symbol.toStringTag,{value:'Module'}));const ko = {
  [I18nKey.home]: "홈",
  [I18nKey.about]: "소개",
  [I18nKey.archive]: "아카이브",
  [I18nKey.search]: "검색",
  [I18nKey.tags]: "태그",
  [I18nKey.categories]: "카테고리",
  [I18nKey.recentPosts]: "최근 게시물",
  [I18nKey.comments]: "댓글",
  [I18nKey.untitled]: "제목 없음",
  [I18nKey.uncategorized]: "분류되지 않음",
  [I18nKey.noTags]: "태그 없음",
  [I18nKey.wordCount]: "단어",
  [I18nKey.wordsCount]: "단어",
  [I18nKey.minuteCount]: "분",
  [I18nKey.minutesCount]: "분",
  [I18nKey.postCount]: "게시물",
  [I18nKey.postsCount]: "게시물",
  [I18nKey.themeColor]: "테마 색상",
  [I18nKey.lightMode]: "밝은 모드",
  [I18nKey.darkMode]: "어두운 모드",
  [I18nKey.systemMode]: "시스템 모드",
  [I18nKey.more]: "더 보기",
  [I18nKey.author]: "저자",
  [I18nKey.publishedAt]: "게시일",
  [I18nKey.license]: "라이선스",
  [I18nKey.friends]: "친구",
  [I18nKey.friendsCircle]: "친구 서클",
  [I18nKey.friendsNum]: "친구 수",
  [I18nKey.activeNum]: "활성 수",
  [I18nKey.errorNum]: "오류 수",
  [I18nKey.articleNum]: "글 수",
  [I18nKey.lastUpdated]: "마지막 업데이트",
  [I18nKey.loading]: "로딩 중...",
  [I18nKey.loadError]: "로딩 실패",
  [I18nKey.retry]: "다시 시도",
  [I18nKey.noArticles]: "글이 없습니다",
  [I18nKey.refresh]: "새로고침",
  [I18nKey.refreshTip]: "로딩이 오래 걸리면 페이지를 새로고침해 주세요"
};const ko$1=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,ko},Symbol.toStringTag,{value:'Module'}));const th = {
  [I18nKey.home]: "หน้าแรก",
  [I18nKey.about]: "เกี่ยวกับ",
  [I18nKey.archive]: "คลัง",
  [I18nKey.search]: "ค้นหา",
  [I18nKey.tags]: "ป้ายกำกับ",
  [I18nKey.categories]: "หมวดหมู่",
  [I18nKey.recentPosts]: "โพสต์ล่าสุด",
  [I18nKey.comments]: "ความคิดเห็น",
  [I18nKey.untitled]: "ไม่ได้ตั้งชื่อ",
  [I18nKey.uncategorized]: "ไม่ได้จัดหมวดหมู่",
  [I18nKey.noTags]: "ไม่มีป้ายกำกับ",
  [I18nKey.wordCount]: "คำ",
  [I18nKey.wordsCount]: "คำ",
  [I18nKey.minuteCount]: "นาที",
  [I18nKey.minutesCount]: "นาที",
  [I18nKey.postCount]: "โพสต์",
  [I18nKey.postsCount]: "โพสต์",
  [I18nKey.themeColor]: "สีของธีม",
  [I18nKey.lightMode]: "สว่าง",
  [I18nKey.darkMode]: "มืด",
  [I18nKey.systemMode]: "ตามระบบ",
  [I18nKey.more]: "ดูเพิ่ม",
  [I18nKey.author]: "ผู้เขียน",
  [I18nKey.publishedAt]: "เผยแพร่เมื่อ",
  [I18nKey.license]: "สัญญาอนุญาต",
  [I18nKey.friends]: "เพื่อน",
  [I18nKey.friendsCircle]: "วงเพื่อน",
  [I18nKey.friendsNum]: "จำนวนเพื่อน",
  [I18nKey.activeNum]: "จำนวนที่ใช้งาน",
  [I18nKey.errorNum]: "จำนวนข้อผิดพลาด",
  [I18nKey.articleNum]: "จำนวนบทความ",
  [I18nKey.lastUpdated]: "อัปเดตล่าสุด",
  [I18nKey.loading]: "กำลังโหลด...",
  [I18nKey.loadError]: "โหลดไม่สำเร็จ",
  [I18nKey.retry]: "ลองใหม่",
  [I18nKey.noArticles]: "ไม่มีบทความ",
  [I18nKey.refresh]: "รีเฟรช",
  [I18nKey.refreshTip]: "หากโหลดนานเกินไป กรุณาลองรีเฟรชหน้า"
};const th$1=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,th},Symbol.toStringTag,{value:'Module'}));const zh_CN = {
  [I18nKey.home]: "主页",
  [I18nKey.about]: "关于",
  [I18nKey.archive]: "归档",
  [I18nKey.search]: "搜索",
  [I18nKey.tags]: "标签",
  [I18nKey.categories]: "分类",
  [I18nKey.recentPosts]: "最新文章",
  [I18nKey.comments]: "评论",
  [I18nKey.untitled]: "无标题",
  [I18nKey.uncategorized]: "未分类",
  [I18nKey.noTags]: "无标签",
  [I18nKey.wordCount]: "字",
  [I18nKey.wordsCount]: "字",
  [I18nKey.minuteCount]: "分钟",
  [I18nKey.minutesCount]: "分钟",
  [I18nKey.postCount]: "篇文章",
  [I18nKey.postsCount]: "篇文章",
  [I18nKey.themeColor]: "主题色",
  [I18nKey.lightMode]: "亮色",
  [I18nKey.darkMode]: "暗色",
  [I18nKey.systemMode]: "跟随系统",
  [I18nKey.more]: "更多",
  [I18nKey.author]: "作者",
  [I18nKey.publishedAt]: "发布于",
  [I18nKey.license]: "许可协议",
  [I18nKey.friends]: "友链",
  [I18nKey.circle]: "朋友圈",
  [I18nKey.friendsCircle]: "朋友圈",
  [I18nKey.friendsNum]: "友链数量",
  [I18nKey.activeNum]: "活跃数量",
  [I18nKey.errorNum]: "异常数量",
  [I18nKey.articleNum]: "文章数量",
  [I18nKey.lastUpdated]: "最后更新",
  [I18nKey.loading]: "加载中...",
  [I18nKey.loadError]: "加载失败",
  [I18nKey.retry]: "重试",
  [I18nKey.noArticles]: "暂无文章",
  [I18nKey.refresh]: "刷新",
  [I18nKey.refreshTip]: "如果长时间加载不出来，请尝试刷新页面"
};const zh_CN$1=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,zh_CN},Symbol.toStringTag,{value:'Module'}));const zh_TW = {
  [I18nKey.home]: "首頁",
  [I18nKey.about]: "關於",
  [I18nKey.archive]: "彙整",
  [I18nKey.search]: "搜尋",
  [I18nKey.tags]: "標籤",
  [I18nKey.categories]: "分類",
  [I18nKey.recentPosts]: "最新文章",
  [I18nKey.comments]: "評論",
  [I18nKey.untitled]: "無標題",
  [I18nKey.uncategorized]: "未分類",
  [I18nKey.noTags]: "無標籤",
  [I18nKey.wordCount]: "字",
  [I18nKey.wordsCount]: "字",
  [I18nKey.minuteCount]: "分鐘",
  [I18nKey.minutesCount]: "分鐘",
  [I18nKey.postCount]: "篇文章",
  [I18nKey.postsCount]: "篇文章",
  [I18nKey.themeColor]: "主題色",
  [I18nKey.lightMode]: "亮色",
  [I18nKey.darkMode]: "暗色",
  [I18nKey.systemMode]: "跟隨系統",
  [I18nKey.more]: "更多",
  [I18nKey.author]: "作者",
  [I18nKey.publishedAt]: "發佈於",
  [I18nKey.license]: "許可協議",
  [I18nKey.friends]: "友鏈",
  [I18nKey.friendsCircle]: "朋友圈",
  [I18nKey.friendsNum]: "友鏈數量",
  [I18nKey.activeNum]: "活躍數量",
  [I18nKey.errorNum]: "異常數量",
  [I18nKey.articleNum]: "文章數量",
  [I18nKey.lastUpdated]: "最後更新",
  [I18nKey.loading]: "載入中...",
  [I18nKey.loadError]: "載入失敗",
  [I18nKey.retry]: "重試",
  [I18nKey.noArticles]: "暫無文章",
  [I18nKey.refresh]: "重新整理",
  [I18nKey.refreshTip]: "如果長時間載入不出來，請嘗試重新整理頁面"
};const zh_TW$1=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,zh_TW},Symbol.toStringTag,{value:'Module'}));const defaultTranslation = en;
const map = {
  es,
  en,
  en_us: en,
  en_gb: en,
  en_au: en,
  zh_cn: zh_CN,
  zh_tw: zh_TW,
  ja,
  ja_jp: ja,
  ko,
  ko_kr: ko,
  th,
  th_th: th
};
function getTranslation(lang) {
  return map[lang.toLowerCase()] || defaultTranslation;
}
function i18n(key) {
  const lang = siteConfig.lang;
  return getTranslation(lang)[key];
}const translation=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,getTranslation,i18n},Symbol.toStringTag,{value:'Module'}));function pathsEqual(path1, path2) {
  const normalizedPath1 = path1.replace(/^\/|\/$/g, "").toLowerCase();
  const normalizedPath2 = path2.replace(/^\/|\/$/g, "").toLowerCase();
  return normalizedPath1 === normalizedPath2;
}
function joinUrl(...parts) {
  const joined = parts.join("/");
  return joined.replace(/\/+/g, "/");
}
function getPostUrlBySlug(slug) {
  return url(`/posts/${slug}/`);
}
function getPostUrl(entry) {
  const finalSlug = entry.data?.customSlug || entry.slug;
  return url(`/posts/${finalSlug}/`);
}
function getTagUrl(tag) {
  if (!tag) return url("/archive/");
  return url(`/archive/?tag=${encodeURIComponent(tag.trim())}`);
}
function getCategoryUrl(category) {
  if (!category || category.trim() === "" || category.trim().toLowerCase() === i18n(I18nKey.uncategorized).toLowerCase())
    return url("/archive/?uncategorized=true");
  return url(`/archive/?category=${encodeURIComponent(category.trim())}`);
}
function getDir(path) {
  const lastSlashIndex = path.lastIndexOf("/");
  if (lastSlashIndex < 0) {
    return "/";
  }
  return path.substring(0, lastSlashIndex + 1);
}
function url(path) {
  return joinUrl("", "/", path);
}const urlUtils=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,getCategoryUrl,getDir,getPostUrl,getPostUrlBySlug,getTagUrl,pathsEqual,url},Symbol.toStringTag,{value:'Module'}));async function getSortedPosts() {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return data.draft !== true ;
  });
  const sorted = allBlogPosts.sort((a, b) => {
    if (a.data.sticky && !b.data.sticky) return -1;
    if (!a.data.sticky && b.data.sticky) return 1;
    const dateA = new Date(a.data.published);
    const dateB = new Date(b.data.published);
    return dateA > dateB ? -1 : 1;
  });
  for (let i = 1; i < sorted.length; i++) {
    const nextSlug = sorted[i - 1].data.customSlug || sorted[i - 1].slug;
    sorted[i].data.nextSlug = nextSlug;
    sorted[i].data.nextTitle = sorted[i - 1].data.title;
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    const prevSlug = sorted[i + 1].data.customSlug || sorted[i + 1].slug;
    sorted[i].data.prevSlug = prevSlug;
    sorted[i].data.prevTitle = sorted[i + 1].data.title;
  }
  return sorted;
}
async function getTagList() {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return data.draft !== true ;
  });
  const countMap = {};
  allBlogPosts.map((post) => {
    post.data.tags.map((tag) => {
      if (!countMap[tag]) countMap[tag] = 0;
      countMap[tag]++;
    });
  });
  const keys = Object.keys(countMap).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
  return keys.map((key) => ({ name: key, count: countMap[key] }));
}
async function getCategoryList() {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return data.draft !== true ;
  });
  const count = {};
  allBlogPosts.map((post) => {
    if (!post.data.category) {
      const ucKey = i18n(I18nKey.uncategorized);
      count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1;
      return;
    }
    const categoryName = typeof post.data.category === "string" ? post.data.category.trim() : String(post.data.category).trim();
    count[categoryName] = count[categoryName] ? count[categoryName] + 1 : 1;
  });
  const lst = Object.keys(count).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
  const ret = [];
  for (const c of lst) {
    ret.push({
      name: c,
      count: count[c],
      url: getCategoryUrl(c)
    });
  }
  return ret;
}const contentUtils=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,getCategoryList,getSortedPosts,getTagList},Symbol.toStringTag,{value:'Module'}));export{AUTO_MODE as A,pathsEqual as B,PAGE_WIDTH as C,DARK_MODE as D,BANNER_HEIGHT_EXTEND as E,DEFAULT_THEME as F,BANNER_HEIGHT as G,BANNER_HEIGHT_HOME as H,I18nKey as I,i18nKey as J,constants as K,LIGHT_MODE as L,MAIN_PANEL_OVERLAPS_BANNER_HEIGHT as M,config as N,en$1 as O,PAGE_SIZE as P,es$1 as Q,ja$1 as R,ko$1 as S,th$1 as T,zh_CN$1 as U,VALID_SUPPORTED_FORMATS as V,zh_TW$1 as W,translation as X,urlUtils as Y,contentUtils as Z,getEntry as a,getSortedPosts as b,getCategoryList as c,cardConfig as d,licenseConfig as e,commentConfig as f,getPostUrlBySlug as g,getCategoryUrl as h,i18n as i,getTagUrl as j,getTagList as k,layoutConfig as l,getPostUrl as m,getDir as n,defineCollection as o,profileConfig as p,joinPaths as q,renderEntry as r,siteConfig as s,DEFAULT_OUTPUT_FORMAT as t,url as u,isRemotePath as v,DEFAULT_HASH_PROPS as w,navBarConfig as x,sidebarConfig as y,beautifyConfig as z};